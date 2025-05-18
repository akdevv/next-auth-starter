import { db } from "@/lib/prisma";

const getUserByEmail = async (email: string) => {
	return await db.user.findUnique({ where: { email } });
};

const getUserById = async (id: string) => {
	return await db.user.findUnique({ where: { id } });
};

const deleteUser = async (id: string) => {
	return await db.user.delete({ where: { id } });
};

const updatePassword = async (id: string, password: string) => {
	return await db.user.update({
		where: { id },
		data: {
			password,
			lastPasswordUpdate: new Date(),
			passwordUpdateCount: { increment: 1 },
		},
	});
};

export { getUserByEmail, getUserById, deleteUser, updatePassword };
