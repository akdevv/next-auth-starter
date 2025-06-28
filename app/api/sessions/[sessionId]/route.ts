import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ sessionId: string }> }
) {
	try {
		const { sessionId } = await params;
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const { expireNow } = await request.json();

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

		// STEP 1: Mark session as revoked
		await db.session.update({
			where: {
				id: sessionId,
			},
			data: {
				isRevoked: true,
				revokedAt: new Date(),
				revokedBy: currentSession?.id || "unknown",
				expires: expireNow ? new Date() : undefined,
			},
		});

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
