import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const session = await auth();

		if (!session || !session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		await db.user.update({
			where: { id: session.user.id },
			data: {
				twoFactorEnabled: false,
				twoFactorSecret: null,
				backupCodes: [],
			},
		});

		// Clean up any existing 2FA tokens
		await db.twoFactorToken.deleteMany({
			where: { userId: session.user.id },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to disable 2FA", error);
		return NextResponse.json(
			{ error: "Failed to disable 2FA" },
			{ status: 500 }
		);
	}
}

