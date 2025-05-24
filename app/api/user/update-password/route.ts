import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { updatePassword } from "@/server/actions/user";

export async function PATCH(req: Request) {
	try {
		const { currentPassword, password } = await req.json();

		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const result = await updatePassword(
			session.user.id,
			currentPassword,
			password
		);

		if (result.error) {
			return NextResponse.json({ error: result.error }, { status: 400 });
		}

		return NextResponse.json({ success: true, result });
	} catch (error) {
		console.error("Error updating password:", error);
		return NextResponse.json(
			{ error: "Failed to update password" },
			{ status: 500 }
		);
	}
}
