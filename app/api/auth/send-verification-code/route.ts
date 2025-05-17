import { NextRequest, NextResponse } from "next/server";
import { validateVerificationCode } from "@/lib/actions/verification";

export async function POST(req: NextRequest) {
	try {
		const { token, code } = await req.json();
		if (!token || !code) {
			return NextResponse.json(
				{ error: "Missing token or code" },
				{ status: 400 }
			);
		}

		// validate the code
		const validation = await validateVerificationCode(token, code);

		if (!validation.valid) {
			return NextResponse.json(
				{ error: "Invalid code" },
				{ status: 400 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error sending verification code:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
