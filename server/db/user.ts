import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const getUserByEmail = async (email: string) => {
	return await db.user.findUnique({ where: { email } });
};

const getUserById = async (id: string) => {
	return await db.user.findUnique({ where: { id } });
};

const deleteUser = async (id: string) => {
	return await db.user.delete({ where: { id } });
};

const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
	return await db.user.update({ where: { id }, data });
};

export { getUserByEmail, getUserById, deleteUser, updateUser };
