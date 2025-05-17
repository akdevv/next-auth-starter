"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions/auth";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FaGoogle } from "react-icons/fa";
import AuthSeparator from "@/components/auth/auth-seprator";
import { MdErrorOutline } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { cn } from "@/lib/utils";

export default function Register() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState<boolean>(false);
	const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState(false);

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

	const onSubmit = async (data: {
		name: string;
		email: string;
		password: string;
	}) => {
		// validate terms & conditions
		if (!agreeToTerms) {
			toast.error("Please agree to the terms & conditions!");
			return;
		}

		// validate fields
		const { name, email, password } = data;
		if (!name || !email || !password) {
			toast.error("Missing required fields!");
			return;
		}

		try {
			setError(null);
			setIsPending(true);

			await registerUser(data);
			toast.success("Account created successfully!");

			// Sign in the user after successful registration
			const signInResult = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (!signInResult?.error) {
				router.push("/profile");
			} else {
				setError(
					"Account created but failed to sign in. Please try logging in."
				);
				toast.error(
					"Account created but failed to sign in. Please try logging in."
				);
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "An error occurred!";
			setError(errorMessage);
			toast.error(errorMessage);
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
				{/* Error Message */}
				{error && (
					<div className="bg-red-800/30 border border-red-700 text-white p-3 rounded-md flex items-center gap-2">
						<MdErrorOutline className="w-5 h-5" />
						<p className="text-sm">{error}</p>
					</div>
				)}

				{/* Name */}
				<div className="space-y-1">
					<input
						{...register("name")}
						type="text"
						placeholder="Name"
						disabled={isPending}
						className="w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent"
					/>
					{errors.name && (
						<p className="text-red-700 text-xs">
							{errors.name.message}
						</p>
					)}
				</div>

				{/* Email */}
				<div className="space-y-1">
					<input
						{...register("email")}
						type="email"
						placeholder="Email"
						disabled={isPending}
						className="w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent"
					/>
					{errors.email && (
						<p className="text-red-700 text-xs">
							{errors.email.message}
						</p>
					)}
				</div>

				{/* Password */}
				<div className="space-y-2">
					<div className="w-full flex items-center justify-between border border-border p-3 gap-2 rounded-md focus:outline-none focus:none focus:ring-transparent">
						<input
							{...register("password")}
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							disabled={isPending}
							className={cn(
								"w-full focus:outline-none focus:none focus:ring-transparent",
								errors.password && "border-red-700"
							)}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="text-muted-foreground cursor-pointer"
						>
							{showPassword ? (
								<LuEyeClosed className="w-5 h-5" />
							) : (
								<LuEye className="w-5 h-5" />
							)}
						</button>
					</div>
					{errors.password && (
						<p className="text-red-700 text-xs">
							{errors.password.message}
						</p>
					)}
				</div>

				{/* Terms & Conditions */}
				<div className="flex items-center space-x-2">
					<Checkbox
						id="terms"
						checked={agreeToTerms}
						onCheckedChange={() => setAgreeToTerms(!agreeToTerms)}
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
						onClick={() => {
							if (agreeToTerms) {
								signIn("google", {
									callbackUrl: "/profile",
								});
							} else {
								toast.error(
									"Please agree to the terms & conditions!"
								);
							}
						}}
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