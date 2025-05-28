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

		// Get all active sessions to revoke
		const sessionsToRevoke = await db.session.findMany({
			where: {
				userId: session.user.id,
				expires: { gt: new Date() },
			},
		});

		if (sessionsToRevoke.length === 0) {
			return NextResponse.json(
				{
					error: "No active sessions found",
				},
				{ status: 400 }
			);
		}

		// delete the session
		const deleteResult = await db.session.deleteMany({
			where: {
				userId: session.user.id,
			},
		});

		// Clear session cookies for all sessions
		for (const sessionToRevoke of sessionsToRevoke) {
			try {
				await fetch(
					new URL("/api/auth/clear-session-cookie", req.url),
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							sessionToken: sessionToRevoke.sessionToken,
						}),
					}
				);
			} catch (cookieError) {
				console.error("Failed to clear session cookie:", cookieError);
			}
		}

		// Invalidate cache
		revalidateTag("sessions");

		console.log(
			`Expired, cleared cookies, and revoked ${deleteResult.count} sessions for user ${session.user.id}`
		);

		// Create response that also clears cookies
		const res = NextResponse.json({
			success: true,
			revokedCount: deleteResult.count,
			message: `Successfully signed out of all devices`,
		});

		// Clear session cookie from response headers
		res.cookies.set("authjs.session-token", "", {
			expires: new Date(0),
			path: "/",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});

		return res;
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
