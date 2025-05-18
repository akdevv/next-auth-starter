import { db } from "@/lib/prisma";

async function getUserById(userId: string) {
	return await db.user.findUnique({ where: { id: userId } });
}

async function deleteUser(userId: string) {
	return await db.user.delete({ where: { id: userId } });
}

export { getUserById, deleteUser };
