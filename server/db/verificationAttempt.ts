import { db } from "@/lib/prisma";
import { addDays } from "date-fns";

const getPasswordResetAttempts = async (email: string) => {
	return await db.verificationAttempt.count({
		where: {
			email,
			type: "PASSWORD_RESET",
			timestamp: { gte: addDays(new Date(), -1) },
		},
	});
};

const createVerificationAttempt = async (
	email: string,
	userId: string,
	token: string
) => {
	return await db.verificationAttempt.create({
		data: {
			userId,
			email,
			token,
			type: "PASSWORD_RESET",
			success: false,
		},
	});
};

const getVerificationAttemptByToken = async (token: string) => {
	return await db.verificationAttempt.findFirst({
		where: {
			token,
			type: "PASSWORD_RESET",
			timestamp: { gte: addDays(new Date(), -1) },
		},
		include: { user: true },
	});
};

const markAttemptAsSuccessful = async (id: string) => {
	return await db.verificationAttempt.update({
		where: { id },
		data: { success: true, token: null },
	});
};

export {
	getPasswordResetAttempts,
	createVerificationAttempt,
	getVerificationAttemptByToken,
	markAttemptAsSuccessful,
};
