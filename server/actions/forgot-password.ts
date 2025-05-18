"use server";

import crypto from "crypto";
import { hash } from "bcryptjs";
import { addDays } from "date-fns";
import { sendForgotPasswordEmail } from "@/lib/email";

import {
	createVerificationAttempt,
	getPasswordResetAttempts,
	getVerificationAttemptByToken,
	markAttemptAsSuccessful,
} from "@/server/db/verificationAttempt";
import { getUserByEmail, updatePassword } from "@/server/db/user";

const generateToken = (): string => {
	return crypto.randomBytes(32).toString("hex");
};

const hashPassword = async (password: string): Promise<string> => {
	return await hash(password, 10);
};

const forgotPassword = async (email: string) => {
	try {
		const user = await getUserByEmail(email);
		if (!user) {
			return { error: "No account found with this email!" };
		}

		if (!user.emailVerified) {
			return { error: "Please verify your email first!" };
		}

		// check number of attempts in last 24 hours
		const attempts = await getPasswordResetAttempts(email);
		if (attempts >= 5) {
			return {
				error: "Too many password reset attempts. Please try again tomorrow.",
			};
		}

		// generate secure token
		const token = generateToken();

		// update user with reset token
		await createVerificationAttempt(email, user.id, token);

		// generate reset URL
		const secureUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password/${token}`;
		console.log("secureUrl", secureUrl);

		// send email
		await sendForgotPasswordEmail(email, secureUrl);

		return { success: true };
	} catch (error) {
		console.error("Forgot password error:", error);
		throw error;
	}
};

const verifyResetToken = async (token: string) => {
	try {
		const attempt = await getVerificationAttemptByToken(token);
		if (!attempt) {
			return { error: "Invalid or expired reset link!" };
		}

		return { valid: true, user: attempt.user };
	} catch (error) {
		console.error("Verify reset token error:", error);
		throw error;
	}
};

const resetPassword = async (token: string, newPassword: string) => {
	try {
		const attempt = await getVerificationAttemptByToken(token);
		if (!attempt) {
			return { error: "Invalid or expired reset link!" };
		}

		const user = attempt.user;

		// check if user has already reset password in last 24 hours
		const lastPasswordUpdate = user.lastPasswordUpdate;
		if (
			lastPasswordUpdate &&
			lastPasswordUpdate > addDays(new Date(), -1)
		) {
			return {
				error: "You can only reset your password once per day",
			};
		}

		const hashedPassword = await hashPassword(newPassword);

		// update password & tracking fields
		await updatePassword(user.id, hashedPassword);

		// mark the attempt as successful
		await markAttemptAsSuccessful(attempt.id);

		return { success: true };
	} catch (error) {
		console.error("Reset password error:", error);
		throw error;
	}
};

export { forgotPassword, verifyResetToken, resetPassword };
