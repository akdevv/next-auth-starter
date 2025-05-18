import { Resend } from "resend";
import VerifyEmail from "@/emails/verify-email";
import ForgotPasswordEmail from "@/emails/forgot-password-email";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

async function sendVerificationEmail(
	email: string,
	verificationToken: string,
	verificationCode: string
) {
	try {
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
			throw new Error(
				`Failed to send verification email: ${error.message}`
			);
		}

		return data;
	} catch (error) {
		console.error("Failed to send verification email:", error);
		throw error;
	}
}

async function sendForgotPasswordEmail(email: string, secureUrl: string) {
	try {
		const { data, error } = await resend.emails.send({
			from: "buildlabs <no-reply@buildlabs.me>",
			to: email,
			subject: "Password Reset Request",
			react: ForgotPasswordEmail({ resetUrl: secureUrl }),
		});

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error("Failed to send email:", error);
		throw error;
	}
}

export { sendVerificationEmail, sendForgotPasswordEmail };