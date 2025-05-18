import { Resend } from "resend";
import VerifyEmail from "@/emails/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
	email: string,
	verificationToken: string,
	verificationCode: string
) {
	console.log("sending verification email");
	console.log("email:", email);
	console.log("verificationToken:", verificationToken);
	console.log("verificationCode:", verificationCode);
	const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${verificationToken}`;

	const { data, error } = await resend.emails.send({
		from: "buildlabs <no-reply@buildlabs.me>",
		to: email,
		subject: "Verify your email address",
		react: VerifyEmail({
			code: verificationCode,
			verificationUrl,
		}),
	});

	if (error) {
		throw new Error(`Failed to send verification email: ${error.message}`);
	}

	return data;
}
