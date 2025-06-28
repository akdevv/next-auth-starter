"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LuEyeClosed, LuEye } from "react-icons/lu";

export default function ResetPasswordPage({
	params,
}: {
	params: Promise<{ secureUrl: string }>;
}) {
	const { secureUrl } = use(params);
	const [isValid, setIsValid] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const router = useRouter();
	const { register, handleSubmit } = useForm<{
		password: string;
		confirmPassword: string;
	}>();

	useEffect(() => {
		const verifyToken = async () => {
			try {
				const res = await fetch("/api/auth/forgot-password/verify", {
					method: "POST",
					body: JSON.stringify({ token: secureUrl }),
				});
				const result = await res.json();
				if (result.valid) {
					setIsValid(true);
				} else {
					setError(result.error);
					toast.error(result.error);
				}
			} catch (error) {
				setError(
					error instanceof Error ? error.message : "An error occurred"
				);
				toast.error(
					error instanceof Error ? error.message : "An error occurred"
				);
			}
		};

		verifyToken();
	}, [secureUrl]);

	const onSubmit = async (data: {
		password: string;
		confirmPassword: string;
	}) => {
		if (data.password !== data.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setError(null);
		setIsPending(true);

		try {
			const res = await fetch("/api/auth/forgot-password/confirm", {
				method: "POST",
				body: JSON.stringify({
					token: secureUrl,
					password: data.password,
				}),
			});
			const result = await res.json();
			if (result.success) {
				toast.success(
					"Password reset successful! Please login with your new password."
				);
				router.push("/auth/login");
			} else {
				setError(result.error);
				toast.error(result.error);
			}
			router.push("/auth/login");
		} catch (error) {
			console.error(error);
			setError(
				error instanceof Error
					? error.message
					: "Failed to reset password"
			);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to reset password"
			);
		} finally {
			setIsPending(false);
		}
	};

	if (!isValid) {
		return (
			<div className="mx-auto w-full max-w-md">
				<div className="text-center md:text-left mb-8">
					<h1 className="text-3xl md:text-4xl font-bold mb-2">
						Invalid Reset Link
					</h1>
					<p className="text-chart-4">
						{error || "This reset link is invalid or has expired."}
					</p>
				</div>
				<Button
					size="lg"
					onClick={() => router.push("/auth/forgot-password")}
					className="mt-4 py-6 cursor-pointer"
				>
					Request New Link
				</Button>
			</div>
		);
	}

	return (
		<div className="mx-auto w-full max-w-md">
			<div className="text-center md:text-left mb-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-2">
					Reset Password
				</h1>
				<p className="text-muted-foreground">
					Please enter your new password.
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				{/* Password */}
				<div className="space-y-1">
					<div className="w-full flex items-center justify-between border border-border p-3 gap-2 rounded-md focus:outline-none focus:none focus:ring-transparent">
						<input
							{...register("password")}
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							disabled={isPending}
							className={cn(
								"w-full focus:outline-none focus:none focus:ring-transparent",
								error && "border-red-700"
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
					{error && (
						<p className="text-red-700 text-xs">
							{error || "Password is required"}
						</p>
					)}
				</div>

				{/* Confirm Password */}
				<div className="space-y-1">
					<div className="w-full flex items-center justify-between border border-border p-3 gap-2 rounded-md focus:outline-none focus:none focus:ring-transparent">
						<input
							{...register("confirmPassword")}
							type={showConfirmPassword ? "text" : "password"}
							placeholder="Confirm Password"
							disabled={isPending}
							className={cn(
								"w-full focus:outline-none focus:none focus:ring-transparent",
								error && "border-red-700"
							)}
						/>
						<button
							type="button"
							onClick={() =>
								setShowConfirmPassword(!showConfirmPassword)
							}
							className="text-muted-foreground cursor-pointer"
						>
							{showConfirmPassword ? (
								<LuEyeClosed className="w-5 h-5" />
							) : (
								<LuEye className="w-5 h-5" />
							)}
						</button>
					</div>
					{error && (
						<p className="text-red-700 text-xs">
							{error || "Confirm Password is required"}
						</p>
					)}
				</div>

				<Button
					type="submit"
					disabled={isPending}
					className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
				>
					{isPending ? "Resetting..." : "Reset Password"}
				</Button>
			</form>
		</div>
	);
}
