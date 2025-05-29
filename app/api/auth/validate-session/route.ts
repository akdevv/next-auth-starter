import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({
				valid: false,
				reason: "No session found",
				shouldLogout: true,
			});
		}

		// Find the current session in database
		const dbSession = await db.session.findFirst({
			where: {
				userId: session.user.id,
				expires: { gt: new Date() }, // Not expired
				isRevoked: false, // Not revoked
			},
			orderBy: { lastActive: "desc" },
		});

		if (!dbSession) {
			console.log(
				`Session validation failed for user ${session.user.id}: Session expired or revoked`
			);
			return NextResponse.json({
				valid: false,
				reason: "Session expired or revoked",
				shouldLogout: true,
			});
		}

		// Update last active time (optional - shows the device is still active)
		await db.session.update({
			where: { id: dbSession.id },
			data: { lastActive: new Date() },
		});

		return NextResponse.json({
			valid: true,
			sessionId: dbSession.id,
		});
	} catch (error) {
		console.error("Session validation error:", error);
		return NextResponse.json({
			valid: false,
			reason: "Server error during validation",
			shouldLogout: true,
		});
	}
}
