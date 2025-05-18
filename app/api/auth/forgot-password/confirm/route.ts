import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/server/actions/forgot-password";

export async function POST(req: NextRequest) {
	try {
		const { token, password } = await req.json();

		const result = await resetPassword(token, password);
		if (result.error) {
			return NextResponse.json({ error: result.error }, { status: 400 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Reset password error:", error);
		return NextResponse.json(
			{ error: "Failed to reset password" },
			{ status: 500 }
		);
	}
}
