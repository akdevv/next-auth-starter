import { NextRequest, NextResponse } from "next/server";
import { forgotPassword } from "@/server/actions/forgot-password";

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();

		const result = await forgotPassword(email);
		if (result.error) {
			return NextResponse.json({ error: result.error }, { status: 400 });
		}

		return NextResponse.json({ success: true, email });
	} catch (error) {
		console.error("Forgot password error:", error);
		return NextResponse.json(
			{ error: "Failed to reset password" },
			{ status: 500 }
		);
	}
}
