"use server";

import QRCode from "qrcode";
import { authenticator } from "otplib";
import { createHash, randomBytes } from "crypto";

// TOTP configuration
authenticator.options = {
	step: 30, // 30-second time window
	window: 1, // Allow 1 step tolerance
};

// ================================
// Main Functions
// ================================

interface TwoFactorSetup {
	secret: string;
	qrCodeUrl: string;
	manualEntryKey: string;
	backupCodes: string[];
}

/**
 * Generate a new 2FA secret and setup data
 */
const generateTwoFactorSetup = async (
	email: string,
	serviceName: string = "next-auth-starter"
): Promise<TwoFactorSetup> => {
	// generate secret
	const secret = authenticator.generateSecret();

	// create service name
	const service = encodeURIComponent(serviceName);
	const account = encodeURIComponent(email);

	// create uri
	const uri = authenticator.keyuri(account, service, secret);

	// generate qr code url
	const qrCodeUrl = await QRCode.toDataURL(uri);

	// generate backup codes
	const backupCodes = generateBackupCodes();

	return {
		secret,
		qrCodeUrl,
		manualEntryKey: formatSecretForManualEntry(secret),
		backupCodes,
	};
};

/**
 * Verify a TOTP token
 */
const verifyTwoFactorToken = (token: string, secret: string): boolean => {
	try {
		return authenticator.verify({ token, secret });
	} catch (error) {
		console.error("2FA verification error:", error);
		return false;
	}
};

// ================================
// Helper Functions
// ================================

/**
 * Format secret for manual entry (groups of 4 characters)
 */
const formatSecretForManualEntry = (secret: string): string => {
	return secret.match(/.{1,4}/g)?.join(" ") || secret;
};

/**
 * Generate backup codes
 */
const generateBackupCodes = (count: number = 10): string[] => {
	const codes: string[] = [];

	for (let i = 0; i < count; i++) {
		// Generate 8-character alphanumeric code
		const code = randomBytes(4).toString("hex").toUpperCase();
		codes.push(code);
	}

	return codes;
};

/**
 * Hash backup codes for secure storage
 */
const hashBackupCodes = (codes: string[]): string[] => {
	return codes.map((code) => createHash("sha256").update(code).digest("hex"));
};

/**
 * Verify a backup code against hashed codes
 */
const verifyBackupCode = (
	inputCode: string,
	hashedCodes: string[]
): boolean => {
	const hashedInput = createHash("sha256")
		.update(inputCode.toUpperCase())
		.digest("hex");
	return hashedCodes.includes(hashedInput);
};

/**
 * Encrypt secret for database storage
 */
const encryptSecret = (secret: string): string => {
	// In production, use proper encryption with a key from environment variables
	// For now, we'll use base64 encoding (NOT secure for production)
	return Buffer.from(secret).toString("base64");
};

/**
 * Decrypt secret from database
 */
const decryptSecret = (encryptedSecret: string): string => {
	// In production, use proper decryption
	// For now, we'll use base64 decoding
	return Buffer.from(encryptedSecret, "base64").toString();
};

/**
 * Generate a temporary 2FA token for session management
 */
const generateTwoFactorSessionToken = (): string => {
	return randomBytes(32).toString("hex");
};

// ================================
// Export Functions
// ================================

export {
	generateTwoFactorSetup,
	verifyTwoFactorToken,
	generateBackupCodes,
	hashBackupCodes,
	verifyBackupCode,
	encryptSecret,
	decryptSecret,
	generateTwoFactorSessionToken,
};
