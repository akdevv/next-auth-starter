"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [isPending, setIsPending] = useState(false);

	const handleResendVerificationEmail = async () => {
		if (status === "unauthenticated" || !session?.user?.email) {
			toast.error("Please sign in to get a verification email");
			router.push("/auth/login");
			return;
		}

		try {
			setIsPending(true);
			const res = await fetch("/api/auth/verify-email/request", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (!res.ok) {
				if (data.attemptsUsed && data.maxAttempts) {
					toast.error("Rate Limit", {
						description: `You have used ${data.attemptsUsed} of ${data.maxAttempts} attempts. Try after 24 hours.`,
					});
				}
				throw new Error(data.error || "Failed to request verification");
			}

			toast.success("Verification email sent", {
				description: `We've sent a new verification email to ${session.user.email}.`,
			});

			if (data.redirectUrl) {
				router.push(data.redirectUrl);
			}
		} catch (error) {
			console.error(error);
			toast.error("Failed to send verification email");
		} finally {
			setIsPending(false);
		}
	};

	const cancelVerification = () => {
		router.push("/auth/login");
		signOut();
	};

	return (
		<div className="mx-auto w-full max-w-md">
			<div className="text-center md:text-left mb-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-2">
					Verify Email
				</h1>
				<p className="text-muted-foreground">
					Please verify your email to continue.
				</p>
			</div>

			<div className="space-y-4">
				<Button
					onClick={handleResendVerificationEmail}
					disabled={isPending}
					className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
				>
					{isPending ? "Sending..." : "Get Verification Email"}
				</Button>
				<Button
					variant="outline"
					onClick={cancelVerification}
					className="w-full py-6 border-2 hover:bg-accent hover:text-foreground/80 transition-all duration-300 cursor-pointer"
				>
					Back to Login
				</Button>
			</div>
		</div>
	);
}
