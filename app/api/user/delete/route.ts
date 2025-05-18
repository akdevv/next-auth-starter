import { auth } from "@/lib/auth";
import { deleteUser } from "@/lib/db/user";
import { NextResponse } from "next/server";

export async function DELETE() {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const user = await deleteUser(session.user.id);

		return NextResponse.json({ success: true, user });
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json(
			{ error: "Failed to delete user" },
			{ status: 500 }
		);
	}
}
