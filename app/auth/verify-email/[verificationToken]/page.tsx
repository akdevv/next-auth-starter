"use client";

import { useState, useEffect, use } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
// import { MdErrorOutline } from "react-icons/md";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
// import { cn } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function VerifyEmailPage({
	params,
}: {
	params: Promise<{ verificationToken: string }>;
}) {
	const router = useRouter();
	const { verificationToken } = use(params);

	const [code, setCode] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
	const [countdown, setCountdown] = useState(60); // 1 minute
	const [attempts, setAttempts] = useState(0);
	const [maxAttempts, setMaxAttempts] = useState(10);
	// const [isExpired, setIsExpired] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { data: session, status } = useSession();
	const [callbackUrl, setCallbackUrl] = useState<string>("/profile");

	// Get callback URL from sessionStorage (for post-registration flow)
	useEffect(() => {
		const storedCallbackUrl = sessionStorage.getItem(
			"postVerificationCallbackUrl"
		);
		if (storedCallbackUrl) {
			setCallbackUrl(decodeURIComponent(storedCallbackUrl));
		}
	}, []);

	// timer for countdown
	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	// timer for timeLeft
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleVerify = async () => {
		if (!code || code.length !== 6) {
			toast.error("Please enter a valid 6-digit code");
			return;
		}

		try {
			setIsSubmitting(true);
			const res = await fetch("/api/auth/verify-email/confirm", {
				method: "POST",
				body: JSON.stringify({ token: verificationToken, code }),
			});

			const data = await res.json();
			if (!res.ok) {
				if (data.attempts) {
					setAttempts(data.attempts);
					setMaxAttempts(data.maxAttempts);
				}
				if (data.attemptsExceeded) {
					setError("Maximum attempts reached. Request a new code.");
					toast.error(
						"Maximum attempts reached. Request a new code."
					);
					return;
				}
				setError(data.error || "An error occurred");
				throw new Error(data.error || "An error occurred");
			}

			// After successful verification, sign in the user
			const signInResult = await signIn("credentials", {
				email: session?.user?.email,
				redirect: false,
			});

			if (signInResult?.error) {
				toast.error(
					"Email verified but failed to sign in. Please try logging in."
				);
				router.push("/auth/login");
				return;
			}

			toast.success("Email verified successfully!");
			// Clear stored callback URL after successful verification
			sessionStorage.removeItem("postVerificationCallbackUrl");
			router.push(callbackUrl);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An error occurred";
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResend = async () => {
		try {
			setIsSubmitting(true);
			const res = await fetch("/api/auth/verify-email/request", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			if (!res.ok) {
				if (data.attemptsUsed && data.maxAttempts) {
					setError(
						`You have used ${data.attemptsUsed} of ${data.maxAttempts} attempts. Try again after 24 hours.`
					);
					toast.error(
						`You have used ${data.attemptsUsed} of ${data.maxAttempts} attempts. Try again after 24 hours.`
					);
					throw new Error(data.error || "Failed to resend code");
				}
				// Redirect to the new verification page
				if (data.redirectUrl) {
					router.push(data.redirectUrl);
				}
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An error occurred";
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (status === "unauthenticated") {
		router.push("/auth/login");
		return null;
	}

	if (!session?.user?.email) {
		return (
			<div className="w-full max-w-md mx-auto">
				<div className="text-center md:text-left mb-8">
					<h1 className="text-3xl md:text-4xl font-bold mb-2">
						Error
					</h1>
					<p className="text-muted-foreground">
						No email found in your session
					</p>
				</div>
				<Button
					onClick={() => router.push("/auth/signin")}
					className="w-full py-5 cursor-pointer"
				>
					Go to Sign In
				</Button>
			</div>
		);
	}

	return (
		<div className="mx-auto w-full max-w-md">
			<div className="text-center mb-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-2">
					Verify your email
				</h1>
				<p className="text-muted-foreground">
					Enter the verification code sent to your email
				</p>
			</div>

			<div className="space-y-8">
				<div className="flex flex-col gap-3 items-center">
					<InputOTP
						value={code}
						maxLength={6}
						onChange={setCode}
						onKeyDown={(e) => {
							if (e.key === "Enter" && code.length === 6) {
								handleVerify();
							}
						}}
						pattern={REGEXP_ONLY_DIGITS}
						disabled={isSubmitting}
						className="w-full"
					>
						<InputOTPGroup>
							<InputOTPSlot
								index={0}
								className="h-14 w-14 text-xl"
							/>
							<InputOTPSlot
								index={1}
								className="h-14 w-14 text-xl"
							/>
							<InputOTPSlot
								index={2}
								className="h-14 w-14 text-xl"
							/>
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot
								index={3}
								className="h-14 w-14 text-xl"
							/>
							<InputOTPSlot
								index={4}
								className="h-14 w-14 text-xl"
							/>
							<InputOTPSlot
								index={5}
								className="h-14 w-14 text-xl"
							/>
						</InputOTPGroup>
					</InputOTP>
					{error && (
						<p className="text-red-500 text-xs">
							{error || "An error occurred"}
						</p>
					)}
				</div>

				<div className="flex flex-col gap-3 max-w-[240px] mx-auto">
					<Button
						onClick={handleVerify}
						disabled={isSubmitting}
						className="w-full py-5 cursor-pointer"
					>
						{isSubmitting ? "Verifying..." : "Verify Email"}
					</Button>
					<Button
						onClick={handleResend}
						disabled={isSubmitting || countdown > 0}
						className="w-full py-5 bg-transparent text-foreground hover:underline hover:underline-offset-4 hover:bg-transparent cursor-pointer"
					>
						{countdown > 0
							? `Resend code in ${countdown}s`
							: "Resend code"}
					</Button>
				</div>
			</div>
		</div>
	);
}
