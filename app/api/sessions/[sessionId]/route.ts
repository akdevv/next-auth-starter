import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
	req: Request,
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

		// Delete the session
		await db.session.delete({
			where: {
				id: sessionId,
			},
		});

		// Clear the session cookie
		try {
			await fetch("/api/auth/clear-session-cookie", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					sessionToken: sessionToRevoke.sessionToken,
				}),
			});
		} catch (cookieError) {
			console.error("Failed to clear session cookie:", cookieError);
		}

		// Invalidate cache
		revalidateTag("sessions");

		const res = NextResponse.json({
			success: true,
			message: "Session revoked successfully",
		});

		// also clear cookie from response
		res.cookies.set("authjs.session-token", "", {
			expires: new Date(0),
			path: "/",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});

		return res;
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
