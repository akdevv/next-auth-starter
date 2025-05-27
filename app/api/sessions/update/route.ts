import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSessionForUser } from "@/lib/session-helper";

function getClientIP(req: NextRequest): string {
	return (
		req.headers.get("x-forwarded-for")?.split(",")[0] ||
		req.headers.get("x-real-ip") ||
		"127.0.0.1"
	);
}

export async function POST(req: NextRequest) {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const ipAddress = getClientIP(req);
		const userAgent = req.headers.get("user-agent") || "";

		await createSessionForUser(session.user.id, ipAddress, userAgent);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to update session:", error);
		return NextResponse.json(
			{ error: "Failed to update session" },
			{ status: 500 }
		);
	}
}
