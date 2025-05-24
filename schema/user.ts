import { z } from "zod";

const updatePasswordSchema = z.object({
	currentPassword: z
		.string()
		.min(8, { message: "Current password must be at least 8 characters" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
	passwordConfirmation: z.string().min(8, {
		message: "Password confirmation must be at least 8 characters",
	}),
});

export { updatePasswordSchema };
