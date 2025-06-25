import { auth } from "@/lib/auth";
import { getUserById } from "@/server/db/user";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await auth();

	if (!session || !session?.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const user = await getUserById(session.user.id);
	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}

	// return the user's security settings
	return NextResponse.json({
		twoFactorEnabled: user.twoFactorEnabled,
		lastPasswordUpdate: user.lastPasswordUpdate,
	});
}
