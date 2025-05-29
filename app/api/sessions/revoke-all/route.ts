import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		// Get current session to preserve it
		const currentSession = await db.session.findFirst({
			where: {
				userId: session.user.id,
				expires: { gt: new Date() },
			},
			orderBy: { lastActive: "desc" },
		});

		if (!currentSession) {
			return NextResponse.json(
				{
					error: "No current session found",
				},
				{ status: 400 }
			);
		}

		// STEP 1: Mark all other sessions as revoked
		const revokeResult = await db.session.updateMany({
			where: {
				userId: session.user.id,
				id: {
					not: currentSession.id,
				},
				isRevoked: false, // Only revoke sessions that aren't already revoked
			},
			data: {
				isRevoked: true,
				revokedAt: new Date(),
				revokedBy: currentSession.id,
				expires: new Date(Date.now() - 1000), // Also expire them
			},
		});

		console.log(
			`Marked ${revokeResult.count} sessions as revoked for user ${session.user.id}`
		);

		// STEP 2: Schedule cleanup (delete revoked sessions after 60 seconds)
		setTimeout(async () => {
			try {
				const cleanupResult = await db.session.deleteMany({
					where: {
						userId: session?.user?.id ?? "",
						isRevoked: true,
						revokedAt: {
							lt: new Date(Date.now() - 30000), // Delete sessions revoked more than 30 seconds ago
						},
					},
				});
				console.log(
					`Cleaned up ${cleanupResult.count} revoked sessions`
				);
			} catch (error) {
				console.error("Failed to cleanup revoked sessions:", error);
			}
		}, 60000); // 60 seconds delay

		// Invalidate cache
		revalidateTag("sessions");

		return NextResponse.json({
			success: true,
			revokedCount: revokeResult.count,
			message: `Successfully signed out of ${revokeResult.count} other device${revokeResult.count !== 1 ? "s" : ""}.`,
		});
	} catch (error) {
		console.error("Failed to revoke all sessions:", error);
		return NextResponse.json(
			{
				error: "Failed to revoke sessions",
				details:
					error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
