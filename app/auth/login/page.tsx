"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/auth";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthSeparator from "@/components/auth/auth-seprator";
import { FaGoogle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { toast } from "sonner";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

export default function Login() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const [rememberMe, setRememberMe] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [callbackUrl, setCallbackUrl] = useState<string>("/profile");

	const updateSessionInfo = async () => {
		try {
			await fetch("/api/sessions/update", {
				method: "POST",
			});
		} catch (error) {
			console.error("Failed to update session info:", error);
		}
	};

	// Get callback URL from search params
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const callback = params.get("callbackUrl");
		if (callback) {
			setCallbackUrl(decodeURIComponent(callback));
		}
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: { email: string; password: string }) => {
		setError(null);
		setIsPending(true);

		try {
			const res = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (res?.error) {
				const errorMessage =
					`Error: ${res?.error}` || "Invalid email or password";
				setError(errorMessage);
				if (res?.error === "EmailNotVerified") {
					router.push("/auth/error?error=EmailNotVerified");
				} else {
					toast.error(errorMessage);
				}
			} else {
				await updateSessionInfo();
				router.push(callbackUrl);
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

	const handleGoogleLogin = async () => {
		await signIn("google", { callbackUrl });
		await updateSessionInfo();
	};

	return (
		<div className="mx-auto w-full max-w-md">
			<div className="text-center md:text-left mb-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-2">
					Welcome back
				</h1>
				<p className="text-muted-foreground">
					Please enter your details to sign in
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

				{/* Email */}
				<div className="space-y-1">
					<input
						{...register("email")}
						type="email"
						placeholder="Email"
						disabled={isPending}
						className={cn(
							"w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent",
							errors.email && "border-red-700"
						)}
					/>
					{errors.email && (
						<p className="text-red-700 text-xs">
							{errors.email.message}
						</p>
					)}
				</div>

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

				{/* Remember me & Forgot password */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Checkbox
							id="remember"
							checked={rememberMe}
							onCheckedChange={(checked) =>
								setRememberMe(checked as boolean)
							}
							className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary cursor-pointer"
						/>
						<label
							htmlFor="remember"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
						>
							Remember me
						</label>
					</div>

					<Link
						href="/auth/forgot-password"
						className="text-sm text-primary hover:underline"
					>
						Forgot password?
					</Link>
				</div>

				{/* Login Button */}
				<Button
					type="submit"
					disabled={isPending}
					className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
				>
					{isPending ? "Logging in..." : "Log in"}
				</Button>

				<AuthSeparator text="Or continue with" />

				{/* Social Login Buttons */}
				<div className="flex items-center justify-center space-x-4">
					<Button
						type="button"
						onClick={handleGoogleLogin}
						className="w-full py-5 bg-secondary/30 text-secondary-foreground border border-secondary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 cursor-pointer"
					>
						<FaGoogle className="w-5 h-5" /> Continue with Google
					</Button>
				</div>

				{/* Register Link */}
				<div className="text-center mt-6">
					<p className="text-sm text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link
							href={`/auth/register?callbackUrl=${callbackUrl}`}
							className="text-primary hover:underline"
						>
							Register
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
}
