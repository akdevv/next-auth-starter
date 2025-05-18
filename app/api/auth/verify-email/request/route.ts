import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";
import {
	createVerificationToken,
	getTotalVerificationAttempts,
} from "@/lib/actions/verification";

export async function POST() {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const { email } = session.user;
		if (!email) {
			return NextResponse.json(
				{ error: "Email not found" },
				{ status: 400 }
			);
		}

		// attempts in last 24 hours
		const attempts = await getTotalVerificationAttempts(email);
		if (attempts >= 10) {
			return NextResponse.json(
				{
					error: "Too many attempts. Please try after 24 hours.",
					attempts,
					maxAttempts: 10,
				},
				{ status: 429 }
			);
		}

		// create verification token & send email
		const { token, code } = await createVerificationToken(email);
		await sendVerificationEmail(email, token, code);

		return NextResponse.json({
			success: true,
			attemptsUsed: attempts + 1,
			maxAttempts: 10,
			redirectUrl: `/auth/verify-email/${token}`,
		});
	} catch (error) {
		console.error("Error sending verification code:", error);
		return NextResponse.json(
			{ error: (error as Error).message || "Internal server error" },
			{ status: 500 }
		);
	}
}
