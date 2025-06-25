import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { expireNow } = await request.json();

		// Get current session
		const currentSession = await db.session.findFirst({
			where: {
				userId: session.user.id,
				sessionToken: session.sessionToken,
			},
		});

		if (!currentSession) {
			return new NextResponse("Current session not found", {
				status: 404,
			});
		}

		// Update all other sessions to expire now
		await db.session.updateMany({
			where: {
				userId: session.user.id,
				id: {
					not: currentSession.id, // Don't update current session
				},
			},
			data: {
				expires: expireNow ? new Date() : undefined,
			},
		});

		return new NextResponse("All other sessions revoked successfully", {
			status: 200,
		});
	} catch (error) {
		console.error("Error revoking all sessions:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
