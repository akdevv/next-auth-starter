import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
	email: string,
	verificationToken: string,
	verificationCode: string
) {
	const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email/${verificationToken}`;

	const { data, error } = await resend.emails.send({
		from: "YourApp <verification@yourdomain.com>",
		to: email,
		subject: "Verify your email address",
		html: `
      <h1>Email Verification</h1>
      <p>Thank you for registering. Please verify your email address to continue.</p>
      <p>Your verification code is: <strong>${verificationCode}</strong></p>
      <p>This code will expire in 5 minutes.</p>
      <p>Or, click the link below to verify your email address:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `,
	});

	if (error) {
		throw new Error(`Failed to send verification email: ${error.message}`);
	}

	return data;
}
