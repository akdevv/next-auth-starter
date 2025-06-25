import { auth } from "@/lib/auth";
import {
	verifyTwoFactorToken,
	generateBackupCodes,
	hashBackupCodes,
	encryptSecret,
} from "@/server/actions/2fa";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
	try {
		const session = await auth();

		if (!session || !session.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const { token, secret } = await req.json();
		if (!token || !secret) {
			return NextResponse.json(
				{ error: "Missing token or secret" },
				{ status: 400 }
			);
		}

		// verify the token
		const isValid = verifyTwoFactorToken(token, secret);
		if (!isValid) {
			return NextResponse.json(
				{ error: "Invalid token" },
				{ status: 400 }
			);
		}

		// Check if user exists
		const existingUser = await db.user.findUnique({
			where: { id: session.user.id },
		});

		if (!existingUser) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		// generate backup codes & hash them
		const backupCodes = generateBackupCodes();
		const hashedBackupCodes = hashBackupCodes(backupCodes);

		// save backup codes to database
		await db.user.update({
			where: { id: session.user.id },
			data: {
				twoFactorEnabled: true,
				twoFactorSecret: encryptSecret(secret),
				backupCodes: hashedBackupCodes,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("2FA verification error:", error);
		return NextResponse.json(
			{ error: "Failed to verify 2FA setup" },
			{ status: 500 }
		);
	}
}
