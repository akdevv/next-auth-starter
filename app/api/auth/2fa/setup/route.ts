import { auth } from "@/lib/auth";
import { generateTwoFactorSetup } from "@/server/actions/2fa";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		const session = await auth();

		if (!session || !session.user?.email) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const setup = await generateTwoFactorSetup(session.user.email);
		return NextResponse.json(setup);
	} catch (error) {
		console.error("2FA setup error:", error);
		return NextResponse.json(
			{ error: "Failed to generate 2FA setup" },
			{ status: 500 }
		);
	}
}
