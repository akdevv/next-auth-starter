"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ForgotPassword() {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const { register, handleSubmit } = useForm<{ email: string }>();

	const onSubmit = async (data: { email: string }) => {
		setError(null);
		setIsPending(true);

		try {
			console.log("sending request");
			const res = await fetch("/api/auth/forgot-password/request", {
				method: "POST",
				body: JSON.stringify(data),
			});
			const result = await res.json();
			if (!res.ok) {
				throw new Error(result.error);
			}

			if (result.success) {
				toast.success(
					"Password reset email sent! Please check your inbox."
				);
			}
		} catch (error: any) {
			console.error(error);
			setError(error.message || "Failed to reset password");
			toast.error(error.message || "Failed to reset password");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="mx-auto w-full max-w-md">
			<div className="text-center md:text-left mb-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-2">
					Forgot Password
				</h1>
				<p className="text-muted-foreground">
					Please enter your email to reset your password.
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<div className="space-y-1">
					<input
						{...register("email", { required: true })}
						type="email"
						placeholder="Email"
						disabled={isPending}
						className={cn(
							"w-full p-4 border border-border rounded-md focus:outline-none focus:none focus:ring-transparent",
							error && "border-red-700"
						)}
					/>
					{error && (
						<p className="text-red-700 text-xs">
							{error || "Please enter your email"}
						</p>
					)}
				</div>

				<Button
					type="submit"
					disabled={isPending}
					className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
				>
					{isPending ? "Sending..." : "Reset Password"}
				</Button>
			</form>
		</div>
	);
}
