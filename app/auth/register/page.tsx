"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function Register() {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register("email")} />
				<input {...register("password")} />
				<button type="submit">Register</button>

				<button
					type="button"
					onClick={() =>
						signIn("google", { callbackUrl: "/profile" })
					}
				>
					Register with Google
				</button>
			</form>
		</div>
	);
}
