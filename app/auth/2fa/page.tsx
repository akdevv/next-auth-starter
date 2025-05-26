"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MdErrorOutline } from "react-icons/md";
import { LuShield, LuSmartphone, LuKey, LuArrowLeft } from "react-icons/lu";
import { toast } from "sonner";
import Link from "next/link";
import { totpSchema, backupSchema } from "@/schema/auth";

type VerificationMode = "totp" | "backup";

export default function TwoFactorPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const [mode, setMode] = useState<VerificationMode>("totp");

	const token = searchParams.get("token");
	const callbackUrl = searchParams.get("callbackUrl") || "/profile";

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		resolver: zodResolver(mode === "totp" ? totpSchema : backupSchema),
	});

	const code = watch("code") || "";

	// Auto-format input based on mode
	useEffect(() => {
		const cleaned =
			mode === "totp"
				? code.replace(/\D/g, "")
				: code.toUpperCase().replace(/[^A-F0-9]/g, "");

		if (cleaned !== code) {
			setValue("code", cleaned);
		}
	}, [code, setValue, mode]);

	const handleVerification = async (code: string) => {
		setError(null);
		setIsPending(true);

		try {
			const response = await fetch("/api/auth/2fa/verify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					token,
					code,
					isBackupCode: mode === "backup",
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Verification failed");
			}

			toast.success("Successfully verified!");
			router.push(callbackUrl);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Verification failed";
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsPending(false);
		}
	};

	const onSubmit = async (data: { code: string }) => {
		await handleVerification(data.code);
	};

	if (!token) {
		return (
			<div className="text-center space-y-6">
				<LuShield className="w-16 h-16 mx-auto text-muted-foreground" />
				<div>
					<h1 className="text-3xl md:text-4xl font-bold mb-2">
						Invalid Request
					</h1>
					<p className="text-muted-foreground">
						This verification link is invalid or has expired.
					</p>
				</div>

				<div className="bg-red-800/30 border border-red-700 text-white p-3 rounded-md flex items-center gap-2">
					<MdErrorOutline className="w-5 h-5" />
					<p className="text-sm">Please sign in again to continue.</p>
				</div>

				<Link href="/auth/login">
					<Button className="w-full py-6">
						<LuArrowLeft className="w-5 h-5 mr-2" />
						Back to Sign In
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="mx-auto w-full max-w-md">
				<div className="space-y-8">
					<div className="text-center md:text-left space-y-4">
						<LuShield className="w-16 h-16 text-primary mx-auto md:mx-0" />
						<div>
							<h1 className="text-3xl md:text-4xl font-bold mb-2">
								Two-Factor Authentication
							</h1>
							<p className="text-muted-foreground">
								{mode === "backup"
									? "Enter one of your backup codes to continue"
									: "Enter the verification code from your authenticator app"}
							</p>
						</div>
					</div>

					{error && (
						<div className="bg-red-800/30 border border-red-700 text-white p-3 rounded-md flex items-center gap-2">
							<MdErrorOutline className="w-5 h-5" />
							<p className="text-sm">{error}</p>
						</div>
					)}

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								{mode === "totp" ? (
									<LuSmartphone className="w-5 h-5 text-primary" />
								) : (
									<LuKey className="w-5 h-5 text-primary" />
								)}
								<label className="text-sm font-medium">
									{mode === "totp"
										? "Verification Code"
										: "Backup Code"}
								</label>
							</div>

							<input
								{...register("code")}
								type="text"
								placeholder={
									mode === "totp" ? "123456" : "XXXXXXXX"
								}
								maxLength={mode === "totp" ? 6 : 8}
								disabled={isPending}
								autoComplete="off"
								onKeyDown={(e) => {
									if (
										e.key === "Enter" &&
										code.length ===
											(mode === "totp" ? 6 : 8)
									) {
										e.preventDefault();
										handleSubmit(onSubmit)();
									}
								}}
								className={cn(
									"w-full border border-border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-center font-mono text-lg tracking-widest",
									errors.code && "border-red-700"
								)}
							/>

							{errors.code && (
								<p className="text-red-700 text-xs">
									{errors.code.message}
								</p>
							)}

							<p className="text-xs text-muted-foreground text-center">
								{mode === "totp"
									? "Enter the 6-digit code from your authenticator app"
									: "Enter one of your 8-character backup codes"}
							</p>
						</div>

						<Button
							type="submit"
							disabled={
								isPending ||
								code.length !== (mode === "totp" ? 6 : 8)
							}
							className="w-full py-6 cursor-pointer"
						>
							{isPending ? "Verifying..." : "Verify"}
						</Button>
					</form>

					<div className="space-y-6">
						<Button
							type="button"
							onClick={() => {
								setMode(mode === "totp" ? "backup" : "totp");
								setError(null);
								setValue("code", "");
							}}
							className="w-full bg-transparent hover:bg-transparent text-foreground hover:text-muted-foreground cursor-pointer hover:underline hover:underline-offset-4 "
						>
							{mode === "backup" ? (
								<>
									<LuSmartphone className="w-4 h-4 mr-2" />
									Use authenticator app instead
								</>
							) : (
								<>
									<LuKey className="w-4 h-4 mr-2" />
									Use backup code instead
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
