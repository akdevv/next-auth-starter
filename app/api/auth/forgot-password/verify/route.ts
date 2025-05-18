import { NextRequest, NextResponse } from "next/server";
import { verifyResetToken } from "@/server/actions/forgot-password";

export async function POST(req: NextRequest) {
	const { token } = await req.json();

	const result = await verifyResetToken(token);
	if (result.error) {
		return NextResponse.json({ error: result.error }, { status: 400 });
	}

	return NextResponse.json({ valid: true, user: result.user });
}
