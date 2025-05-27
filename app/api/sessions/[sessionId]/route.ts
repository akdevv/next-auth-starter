import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { sessionId: string } }) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const sessionId = await params.sessionId;

		// First, verify the session belongs to the current user
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

		// Don't allow revoking current session (optional safety check)
		// We'll determine current session by comparing session tokens or IDs
		const currentUserSessions = await db.session.findMany({
			where: {
				userId: session.user.id,
				expires: { gt: new Date() },
			},
			orderBy: { lastActive: "desc" },
		});

		const isCurrentSession = currentUserSessions[0]?.id === sessionId;

		if (isCurrentSession) {
			return NextResponse.json(
				{
					error: "Cannot revoke current session. Please use regular logout.",
				},
				{ status: 400 }
			);
		}

		// Delete the session (this effectively expires the token)
		await db.session.delete({
			where: {
				id: sessionId,
			},
		});

		// Invalidate cache
		revalidateTag("sessions");

		return NextResponse.json({
			success: true,
			message: "Session revoked successfully",
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
