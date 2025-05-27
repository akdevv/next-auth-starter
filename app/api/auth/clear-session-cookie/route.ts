import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { sessionToken } = await request.json();

		if (!sessionToken) {
			return NextResponse.json(
				{ error: "Session token required" },
				{ status: 400 }
			);
		}

		// Create response
		const res = NextResponse.json({ success: true });

		// Clear the session cookie by setting it to expire immediately
		res.cookies.set("authjs.session-token", "", {
			expires: new Date(0),
			path: "/",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});

		// Also clear the CSRF token if it exists
		res.cookies.set("authjs.csrf-token", "", {
			expires: new Date(0),
			path: "/",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});

		return res;
	} catch (error) {
		console.error("Failed to clear session cookie:", error);
		return NextResponse.json(
			{
				error: "Failed to clear session cookie",
			},
			{ status: 500 }
		);
	}
}
