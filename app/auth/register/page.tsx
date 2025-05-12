"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthSeparator from "@/components/auth/auth-seprator";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Register() {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<div className="mx-auto w-full max-w-md">
			<div className="text-center md:text-left mb-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-2">
					Create an account
				</h1>
				<p className="text-muted-foreground">
					Please enter your details to create an account
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-2">
					<input
						{...register("name")}
						placeholder="Name"
						className="w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent"
					/>
				</div>
				<div className="space-y-2">
					<input
						{...register("email")}
						placeholder="Email"
						className="w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent"
					/>
				</div>

				<div className="space-y-2">
					<input
						{...register("password")}
						placeholder="Create a password"
						className="w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox
						id="remember"
						checked={true}
						onCheckedChange={() => {}}
						className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary cursor-pointer"
					/>
					<label htmlFor="terms">
						I agree to the{" "}
						<Link
							href="/terms"
							target="_blank"
							className="text-primary hover:underline"
						>
							Terms & Conditions
						</Link>
					</label>
				</div>

				{/* Register Button */}
				<Button
					type="submit"
					className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
				>
					Create account
				</Button>

				<AuthSeparator text="Or continue with" />

				{/* Social Login Buttons */}
				<div className="flex items-center justify-center space-x-4">
					<Button
						type="button"
						onClick={() =>
							signIn("google", { callbackUrl: "/profile" })
						}
						className="w-1/2 py-5 bg-secondary/30 text-secondary-foreground border border-secondary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 cursor-pointer"
					>
						<FaGoogle className="w-5 h-5" /> Google
					</Button>

					<Button className="w-1/2 py-5 bg-secondary/30 text-secondary-foreground border border-secondary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 cursor-pointer">
						<FaGithub className="w-5 h-5" /> Github
					</Button>
				</div>

				{/* Login Link */}
				<div className="text-center mt-6">
					<p className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link
							href="/auth/login"
							className="text-primary hover:underline"
						>
							Login
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
}


// <div>
		// 	<form onSubmit={handleSubmit(onSubmit)}>
		// 		<input {...register("email")} cl />
		// 		<input {...register("password")} />
		// 		<button type="submit">Register</button>

		// 		<button
		// 			type="button"
		// 			onClick={() =>
		// 				signIn("google", { callbackUrl: "/profile" })
		// 			}
		// 		>
		// 			Register with Google
		// 		</button>
		// 	</form>
		// </div>