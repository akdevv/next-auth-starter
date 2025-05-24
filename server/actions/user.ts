import bcrypt from "bcryptjs";
import { getUserById, updateUser } from "@/server/db/user";

const updatePassword = async (
	id: string,
	currentPassword: string,
	password: string
) => {
	const user = await getUserById(id);

	// Check if user exists
	if (!user) {
		return { error: "User not found." };
	}

	// Check if current password is correct
	const isPasswordCorrect = await bcrypt.compare(
		currentPassword,
		user.password as string
	);
	if (!isPasswordCorrect) {
		return { error: "Current password is incorrect." };
	}

	// Check if new password is the same as the current password
	if (password === currentPassword) {
		return {
			error: "Current password and new password cannot be the same.",
		};
	}

	// Check for last password update
	if (
		user.lastPasswordUpdate &&
		user.lastPasswordUpdate > new Date(Date.now() - 1000 * 60 * 60)
	) {
		return {
			error: "Already updated password. Try again in 1 hour.",
		};
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const result = await updateUser(id, {
		password: hashedPassword,
		lastPasswordUpdate: new Date(),
	});

	return { success: true, result };
};

export { updatePassword };
