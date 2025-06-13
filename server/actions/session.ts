"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { SessionInfo } from "@/lib/types/session";

export const getUserSessions = async (): Promise<SessionInfo[]> => {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			throw new Error("Unauthorized");
		}

		// Get the current session from the database
		const currentSession = await db.session.findFirst({
			where: { userId: session.user.id },
		});

		const sessions = await db.session.findMany({
			where: { userId: session.user.id },
		});

		return sessions.map((sess) => ({
			id: sess.id,
			deviceName: sess.deviceName,
			location: sess.location,
			ipAddress: sess.ipAddress,
			lastActive: sess.lastActive,
			createdAt: sess.createdAt,
			isCurrent: sess.id === currentSession?.id,
			userAgent: sess.userAgent,
			expires: sess.expires,
			isRevoked: sess.isRevoked,
			revokedAt: sess.revokedAt,
			revokedBy: sess.revokedBy,
		}));
	} catch (error) {
		console.error("Error fetching user sessions:", error);
		return [];
	}
};
