import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// Get the session token from the cookie
		const sessionToken = session.sessionToken;

		if (!sessionToken) {
			return new NextResponse("No session token", { status: 401 });
		}

		// Check if the session exists in the database and is not expired
		const dbSession = await db.session.findFirst({
			where: {
				userId: session.user.id,
				sessionToken: sessionToken,
				expires: {
					gt: new Date(), // Check if session hasn't expired
				},
			},
		});

		if (!dbSession) {
			return new NextResponse("Session expired or not found", {
				status: 401,
			});
		}

		return new NextResponse("Session valid", { status: 200 });
	} catch (error) {
		console.error("Error checking session:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
