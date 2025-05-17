"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FaGoogle } from "react-icons/fa";
import AuthSeparator from "@/components/auth/auth-seprator";

export default function Register() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: any) => {
		setError(null);
		setIsPending(true);

		try {
			const res = await signIn("credentials", {
				name: data.name,
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (res?.ok) {
				toast.success("Account created successfully!");
				router.push("/profile");
			} else {
				setError("Failed to create account");
				toast.error("Failed to create account");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred!");
			toast.error(error);
		} finally {
			setIsPending(false);
		}
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
				{error && <div className="text-red-500 text-sm">{error}</div>}
				{errors.name && (
					<div className="text-red-500 text-sm">
						{errors.name.message}
					</div>
				)}
				{errors.email && (
					<div className="text-red-500 text-sm">
						{errors.email.message}
					</div>
				)}
				{errors.password && (
					<div className="text-red-500 text-sm">
						{errors.password.message}
					</div>
				)}

				<div className="space-y-2">
					<input
						{...register("name")}
						type="text"
						placeholder="Name"
						disabled={isPending}
						className="w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent"
					/>
				</div>
				<div className="space-y-2">
					<input
						{...register("email")}
						type="email"
						placeholder="Email"
						disabled={isPending}
						className="w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent"
					/>
				</div>

				<div className="space-y-2">
					<input
						{...register("password")}
						type="password"
						placeholder="Create a password"
						disabled={isPending}
						className="w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox
						id="terms"
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
					disabled={isPending}
					className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
				>
					{isPending ? "Creating account..." : "Create account"}
				</Button>

				<AuthSeparator text="Or continue with" />

				{/* Social Login Buttons */}
				<div className="flex items-center justify-center space-x-4">
					<Button
						type="button"
						onClick={() =>
							signIn("google", { callbackUrl: "/profile" })
						}
						className="w-full py-5 bg-secondary/30 text-secondary-foreground border border-secondary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 cursor-pointer"
					>
						<FaGoogle className="w-5 h-5" /> Continue with Google
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