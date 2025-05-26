import { db } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
	decryptSecret,
	verifyBackupCode,
	verifyTwoFactorToken,
} from "@/server/actions/2fa";
import { encode } from "next-auth/jwt";

export async function POST(req: NextRequest) {
	try {
		const { token, code, isBackupCode } = await req.json();

		if (!token) {
			return NextResponse.json(
				{ error: "Missing token" },
				{ status: 400 }
			);
		}

		// Find the 2FA token
		const twoFactorToken = await db.twoFactorToken.findUnique({
			where: { token },
			include: { user: true },
		});

		// Check if the token is valid
		if (
			!twoFactorToken ||
			twoFactorToken.used ||
			twoFactorToken.expires < new Date()
		) {
			return NextResponse.json(
				{ error: "Invalid or expired token" },
				{ status: 400 }
			);
		}

		// Check if the user has 2FA enabled
		const user = twoFactorToken.user;
		if (!user.twoFactorEnabled) {
			return NextResponse.json(
				{ error: "2FA not enabled for this user" },
				{ status: 400 }
			);
		}

		let isValid = false;
		if (isBackupCode) {
			// Verify backup code
			isValid = verifyBackupCode(code, user.backupCodes);

			if (isValid) {
				// Remove used backup code
				const newBackupCodes = user.backupCodes.filter(
					(hashedCode) => !verifyBackupCode(code, [hashedCode])
				);

				await db.user.update({
					where: { id: user.id },
					data: { backupCodes: newBackupCodes },
				});
			}
		} else {
			// Verify TOTP code
			if (!user.twoFactorSecret) {
				return NextResponse.json(
					{ error: "2FA secret not found" },
					{ status: 400 }
				);
			}

			const secret = decryptSecret(user.twoFactorSecret);
			isValid = verifyTwoFactorToken(code, secret);
		}

		if (!isValid) {
			return NextResponse.json(
				{ error: "Invalid verification code" },
				{ status: 400 }
			);
		}

		// Mark token as used
		await db.twoFactorToken.update({
			where: { id: twoFactorToken.id },
			data: { used: true },
		});

		// Create session
		const sessionToken = crypto.randomUUID();
		const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

		// Create JWT token with user details
		const jwtToken = await encode({
			token: {
				email: user.email,
				name: user.name,
				sub: user.id,
				id: user.id,
				emailVerified: user.emailVerified,
				lastPasswordUpdate: user.lastPasswordUpdate,
				twoFactorEnabled: user.twoFactorEnabled,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				iat: Math.floor(Date.now() / 1000),
				exp: Math.floor(expires.getTime() / 1000),
				jti: sessionToken,
			},
			secret: process.env.AUTH_SECRET!,
			salt: "authjs.session-token",
		});

		await db.session.create({
			data: {
				sessionToken,
				userId: user.id,
				expires,
			},
		});

		// Set session cookie
		const cookieStore = await cookies();
		cookieStore.set("authjs.session-token", jwtToken, {
			expires,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("2FA verification error:", error);
		return NextResponse.json(
			{ error: "Failed to verify 2FA" },
			{ status: 500 }
		);
	}
}
