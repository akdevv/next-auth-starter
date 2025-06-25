import crypto from "crypto";
import { db } from "@/lib/prisma";
import { format } from "date-fns";

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

export const formatLastActive = (date: Date) => {
	const now = new Date();
	const diffInMinutes = Math.floor(
		(now.getTime() - date.getTime()) / (1000 * 60)
	);

	if (diffInMinutes < 1) return "Just now";
	if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
	if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
	return format(date, "MMM d, yyyy");
};

export const clearSessionCookie = () => {
	const hostname = window.location.hostname;
	const cookieOptions = [
		`authjs.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,
		`authjs.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`,
		`authjs.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`,
		`authjs.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,
		`authjs.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`,
		`authjs.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`,
	];

	cookieOptions.forEach((cookie) => {
		document.cookie = cookie;
	});
};

