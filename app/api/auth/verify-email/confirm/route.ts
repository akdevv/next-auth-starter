import { NextRequest, NextResponse } from "next/server";
import {
	validateVerificationCode,
	verifyEmail,
} from "@/server/actions/verification";

export async function POST(req: NextRequest) {
	try {
		const { token, code } = await req.json();
		if (!token || !code) {
			return NextResponse.json(
				{ error: "Token and code are required" },
				{ status: 400 }
			);
		}

		// validate the code
		const validation = await validateVerificationCode(token, code);

		if (!validation.valid) {
			if (validation.attempts && validation.maxAttempts) {
				if (validation.attempts >= validation.maxAttempts) {
					return NextResponse.json(
						{
							error: "Maximum attempts reached. Generate a new code.",
							attemptsExceeded: true,
						},
						{ status: 403 }
					);
				}

				return NextResponse.json(
					{
						error: "Invalid verification code.",
						attempts: validation.attempts,
						maxAttempts: validation.maxAttempts,
					},
					{ status: 400 }
				);
			}

			return NextResponse.json(
				{ error: "Invalid or expired code." },
				{ status: 400 }
			);
		}

		// if code is valid, verify user's email
		await verifyEmail(token, code);
		return NextResponse.json({ success: true, verified: true });
	} catch (error) {
		console.error("Error verifying email:", error);
		return NextResponse.json(
			{ error: (error as Error).message || "Internal server error" },
			{ status: 500 }
		);
	}
}
