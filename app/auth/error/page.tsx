"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";

export default function AuthError() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error");
	const [isPending, setIsPending] = useState(false);

	const errorMessages: Record<string, string> = {
		EmailNotVerified: "Please verify your email before signing in.",
		CredentialsSignin: "Invalid email or password.",
		AccessDenied: "You do not have permission to access this resource.",
		Verification: "The verification link is invalid or has expired.",
		Configuration: "There is a problem with the server configuration.",
		OAuthSignin: "Error in OAuth sign in process.",
		OAuthCallback: "Error in OAuth callback process.",
		OAuthCreateAccount: "Could not create OAuth provider user.",
		EmailCreateAccount: "Could not create email provider user.",
		Callback: "Error in callback process.",
		OAuthAccountNotLinked: "Email already exists with different provider.",
		EmailSignin: "Check your email for the sign in link.",
		SessionRequired: "Please sign in to access this page.",
		default: "An error occurred during authentication.",
	};

	const errorMessage = error
		? errorMessages[error] || errorMessages.default
		: errorMessages.default;

	const handleSendVerificationEmail = async () => {
		setIsPending(true);
		try {
			// TODO: Implement resend verification email logic
			toast.success("Verification email sent successfully!");
		} catch (error) {
			console.error(error);
			toast.error("Failed to send verification email");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="mx-auto w-full max-w-md">
			<div className="text-center md:text-left mb-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-2">
					Authentication Error
				</h1>
				<p className="text-muted-foreground">
					We encountered an issue while processing your request
				</p>
			</div>

			<div className="bg-red-800/30 border border-red-700 text-white p-6 rounded-lg mb-8">
				<div className="flex items-start gap-3">
					<MdErrorOutline className="w-6 h-6 mt-0.5 flex-shrink-0" />
					<p className="text-sm leading-relaxed">{errorMessage}</p>
				</div>
			</div>

			<div className="space-y-4">
				{error === "EmailNotVerified" ? (
					<>
						<Button
							onClick={handleSendVerificationEmail}
							disabled={isPending}
							className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
						>
							{isPending
								? "Sending..."
								: "Get Verification Email"}
						</Button>
						<Button
							asChild
							variant="outline"
							className="w-full py-6 border-2 hover:bg-accent hover:text-foreground/80 transition-all duration-300 cursor-pointer"
						>
							<Link href="/auth/login">Back to Login</Link>
						</Button>
					</>
				) : (
					<Button
						asChild
						className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
					>
						<Link href="/auth/login">Back to Login</Link>
					</Button>
				)}
			</div>
		</div>
	);
}
