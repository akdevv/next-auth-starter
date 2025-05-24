import crypto from "crypto";
import { db } from "@/lib/prisma";

// generate a random 6 digit code
const generateVerificationCode = (): string => {
	return crypto.randomInt(100000, 999999).toString();
};

// generate a random token
const generateVerificationToken = (): string => {
	return crypto.randomBytes(32).toString("hex");
};

const createVerificationToken = async (
	email: string
): Promise<{ token: string; code: string }> => {
	// check rate limiting - 10 emails per day
	const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

	// find user and count verification attempts in the last 24 hours
	const user = await db.user.findUnique({
		where: { email },
		include: {
			verificationAttempts: {
				where: { timestamp: { gte: yesterday } },
			},
		},
	});

	if (!user) {
		throw new Error("User not found!");
	}

	if (user.verificationAttempts.length >= 10) {
		throw new Error("Rate limit exceeded. Please try again in 24 hours.");
	}

	// generate a new token and code
	const verificationToken = generateVerificationToken();
	const verificationCode = generateVerificationCode();

	// set expiration - 5 minutes
	const expires = new Date(Date.now() + 5 * 60 * 1000);

	// save the token to the database
	await db.verificationToken.create({
		data: {
			email,
			token: verificationToken,
			code: verificationCode,
			expires,
		},
	});

	// record verification attempt
	await db.verificationAttempt.create({
		data: { userId: user.id, email },
	});

	return { token: verificationToken, code: verificationCode };
};

const verifyEmail = async (token: string, code?: string) => {
	const verificationToken = await db.verificationToken.findUnique({
		where: { token },
	});

	if (!verificationToken) {
		throw new Error("Invalid verification token.");
	}

	if (verificationToken.expires < new Date()) {
		throw new Error("Verification token has expired.");
	}

	// if code is provided, validate it
	if (code && verificationToken.code !== code) {
		throw new Error("Invalid verification code.");
	}

	// update user's emailVerified field
	const user = await db.user.findUnique({
		where: { email: verificationToken.email },
	});

	if (!user) {
		throw new Error("User not found.");
	}

	await db.user.update({
		where: { id: user.id },
		data: { emailVerified: new Date() },
	});

	// delete the verification token
	await db.verificationToken.delete({
		where: { token },
	});

	return true;
};

const getTotalVerificationAttempts = async (email: string): Promise<number> => {
	const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

	const attempts = await db.verificationAttempt.count({
		where: { email, timestamp: { gte: yesterday } },
	});

	return attempts;
};

const validateVerificationCode = async (
	token: string,
	code: string
): Promise<{ valid: boolean; attempts?: number; maxAttempts?: number }> => {
	// find the token
	const verificationToken = await db.verificationToken.findUnique({
		where: { token },
	});

	if (!verificationToken) {
		return { valid: false };
	}

	if (verificationToken.expires < new Date()) {
		return { valid: false };
	}

	// max attempts - 5 times
	const MAX_ATTEMPTS = 5;

	// Get the user
	const user = await db.user.findUnique({
		where: { email: verificationToken.email },
	});

	if (!user) {
		return { valid: false };
	}

	// Get current attempts from database
	const attempts =
		(await db.verificationAttempt.count({
			where: {
				email: verificationToken.email,
				timestamp: {
					gte: new Date(Date.now() - 5 * 60 * 1000), // Only count attempts in last 5 minutes
				},
			},
		})) + 1;

	// Record this attempt
	await db.verificationAttempt.create({
		data: {
			userId: user.id,
			email: verificationToken.email,
		},
	});

	if (attempts >= MAX_ATTEMPTS) {
		return { valid: false, attempts, maxAttempts: MAX_ATTEMPTS };
	}

	// check if the code is correct
	if (code && verificationToken.code === code) {
		// Clear attempts for this email on successful verification
		await db.verificationAttempt.deleteMany({
			where: {
				email: verificationToken.email,
				timestamp: {
					gte: new Date(Date.now() - 5 * 60 * 1000),
				},
			},
		});
		return { valid: true };
	}

	return { valid: false, attempts, maxAttempts: MAX_ATTEMPTS };
};

export {
	createVerificationToken,
	verifyEmail,
	getTotalVerificationAttempts,
	validateVerificationCode,
};
