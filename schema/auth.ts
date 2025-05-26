import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});


// Validation schemas
export const totpSchema = z.object({
	code: z.string().length(6, "Code must be 6 digits"),
});

export const backupSchema = z.object({
	code: z.string().length(8, "Backup code must be 8 characters"),
});