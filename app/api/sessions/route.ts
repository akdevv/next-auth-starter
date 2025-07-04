import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";

// Cached function to get user sessions
const getCachedUserSessions = unstable_cache(
	async (userId: string, currentSessionToken?: string) => {
		const sessions = await db.session.findMany({
			where: { userId },
			orderBy: { lastActive: "desc" },
		});

		return sessions.map((sess) => ({
			id: sess.id,
			deviceName: sess.deviceName,
			location: sess.location,
			ipAddress: sess.ipAddress,
			lastActive: sess.lastActive,
			createdAt: sess.createdAt,
			isCurrent: sess.sessionToken === currentSessionToken,
			isRevoked: sess.isRevoked,
			revokedAt: sess.revokedAt,
			revokedBy: sess.revokedBy,
			userAgent: sess.userAgent,
		}));
	},
	["user-sessions"],
	{
		revalidate: 1, // Cache for 1 sec
		tags: ["sessions"],
	}
);

export async function GET() {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const sessions = await getCachedUserSessions(
			session.user.id,
			session.sessionToken
		);

		return NextResponse.json({ sessions });
	} catch (error) {
		console.error("Error fetching user sessions:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
