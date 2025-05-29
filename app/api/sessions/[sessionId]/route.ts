import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { sessionId: string } }
) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const sessionId = await params.sessionId;

		// Verify the session belongs to the current user
		const sessionToRevoke = await db.session.findFirst({
			where: {
				id: sessionId,
				userId: session.user.id,
			},
		});
		if (!sessionToRevoke) {
			return NextResponse.json(
				{ error: "Session not found" },
				{ status: 404 }
			);
		}

		// Get current session info for tracking who revoked it
		const currentSession = await db.session.findFirst({
			where: {
				userId: session.user.id,
				expires: { gt: new Date() },
			},
			orderBy: { lastActive: "desc" },
		});

		// Don't allow revoking current session
		const isCurrentSession = currentSession?.id === sessionId;

		if (isCurrentSession) {
			return NextResponse.json(
				{
					error: "Cannot revoke current session. Please use regular logout.",
				},
				{ status: 400 }
			);
		}

		// STEP 1: Mark session as revoked (don't delete immediately)
		await db.session.update({
			where: {
				id: sessionId,
			},
			data: {
				isRevoked: true,
				revokedAt: new Date(),
				revokedBy: currentSession?.id || "unknown",
				expires: new Date(Date.now() - 1000), // Also expire it
			},
		});

		console.log(
			`Session ${sessionId} marked as revoked by user ${session.user.id}`
		);

		// STEP 2: Schedule cleanup (delete revoked session after 60 seconds)
		setTimeout(async () => {
			try {
				await db.session.delete({
					where: { id: sessionId },
				});
				console.log(`Deleted revoked session ${sessionId}`);
			} catch (error) {
				console.error("Failed to cleanup revoked session:", error);
			}
		}, 60000); // 60 seconds delay

		// Invalidate cache
		revalidateTag("sessions");

		return NextResponse.json({
			success: true,
			message:
				"Session revoked successfully. The device will be signed out within 15 seconds.",
		});
	} catch (error) {
		console.error("Failed to revoke session:", error);
		return NextResponse.json(
			{
				error: "Failed to revoke session",
				details:
					error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
