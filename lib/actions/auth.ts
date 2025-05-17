"use server";

import { hash } from "bcryptjs";
import { db } from "@/lib/prisma";

type RegisterData = {
	name: string;
	email: string;
	password: string;
};

export const registerUser = async (data: RegisterData) => {
	try {
		const { name, email, password } = data;

		// validate fields
		if (!name || !email || !password) {
			throw new Error("Missing required fields!");
		}

		// check if user already exists
		const existingUser = await db.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			throw new Error("User already exists!");
		}

		// hash password
		const hashedPassword = await hash(password, 10);

		// create user
		const user = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		return user;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : "An error occurred!"
		);
	}
};
