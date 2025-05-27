import crypto from "crypto";
import { db } from "@/lib/prisma";

export async function createSessionForUser(
	userId: string,
	ipAddress: string,
	userAgent: string
) {
	try {
		const deviceName = parseDeviceName(userAgent);
		const location = await getLocationFromIP(ipAddress);

		// create new session
		const sessionToken = crypto.randomUUID();
		const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

		const newSession = await db.session.create({
			data: {
				sessionToken,
				userId,
				expires,
				ipAddress,
				userAgent,
				deviceName,
				location,
				lastActive: new Date(),
			},
		});
		return newSession;
	} catch (error) {
		console.error("Error creating session:", error);
		throw error;
	}
}

export async function updateOrCreateSessionForUser(
	userId: string,
	ipAddress: string,
	userAgent: string
) {
	try {
		// check if there are any existing sessions
		const existingSessions = await db.session.findMany({
			where: {
				userId,
				expires: { gt: new Date() },
			},
		});

		if (existingSessions.length === 0) {
			return await createSessionForUser(userId, ipAddress, userAgent);
		} else {
			const deviceName = parseDeviceName(userAgent);
			const location = await getLocationFromIP(ipAddress);

			// update existing session
			const updatedSession = await db.session.updateMany({
				where: {
					userId,
					expires: { gt: new Date() },
				},
				data: {
					lastActive: new Date(),
					ipAddress,
					userAgent,
					deviceName,
					location,
				},
			});
			return updatedSession;
		}
	} catch (error) {
		console.error("Error updating or creating session:", error);
		throw error;
	}
}

function parseDeviceName(userAgent: string): string {
	if (!userAgent) return "Unknown Device";
	const ua = userAgent.toLowerCase();

	if (ua.includes("mobile") || ua.includes("android")) return "Mobile Device";
	if (ua.includes("iphone")) return "iPhone";
	if (ua.includes("ipad")) return "iPad";
	if (ua.includes("mac")) return "Mac";
	if (ua.includes("windows")) return "Windows PC";

	return "Desktop";
}

async function getLocationFromIP(ipAddress: string): Promise<string | null> {
	if (ipAddress === "127.0.0.1" || ipAddress.startsWith("192.168.")) {
		return "Local Network";
	}

	try {
		const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
		const data = await response.json();

		if (data.city && data.country_name) {
			return `${data.city}, ${data.country_name}`;
		}
		return data.country_name || null;
	} catch {
		return null;
	}
}
