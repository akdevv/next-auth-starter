"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";

export function useSessionValidator() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const hasShownLogoutMessage = useRef(false);
	const isValidating = useRef(false);

	// Check if user is on authentication pages where validation should be skipped
	const isOnAuthPages = () => {
		const authPaths = [
			"/auth/login",
			"/auth/register",
			"/auth/verify-email",
			"/auth/forgot-password",
			"/auth/2fa",
			"/auth/error",
		];

		return authPaths.some((path) => pathname?.startsWith(path));
	};

	const validateSession = async () => {
		// Prevent multiple simultaneous validations
		if (isValidating.current) return;
		if (status !== "authenticated" || !session?.user) return;

		// Skip validation if user is on authentication pages
		if (isOnAuthPages()) {
			return;
		}

		// Skip validation for users who haven't verified their email yet
		// They are in a legitimate intermediate state during registration
		if (!session.user.emailVerified) {
			return;
		}

		isValidating.current = true;

		try {
			const response = await fetch("/api/auth/validate-session", {
				method: "GET",
				cache: "no-store",
				headers: {
					"Cache-Control": "no-cache, no-store, must-revalidate",
					Pragma: "no-cache",
				},
			});

			const result = await response.json();

			if (!result.valid && result.shouldLogout) {
				// Show logout message only once
				if (!hasShownLogoutMessage.current) {
					hasShownLogoutMessage.current = true;
					toast.error(
						"You have been signed out from another device",
						{
							duration: 5000,
						}
					);
				}

				// Clear the session cookies immediately
				clearSessionCookies();

				// Sign out and redirect
				await signOut({
					redirect: false, // We'll handle redirect manually
				});

				// Redirect to login with message
				router.push("/auth/login?message=session-revoked");
			}
		} catch (error) {
			console.error("Session validation failed:", error);
			// Don't logout on network errors - could be temporary
		} finally {
			isValidating.current = false;
		}
	};

	// Function to clear session cookies
	const clearSessionCookies = () => {
		const hostname = window.location.hostname;

		// Try multiple cookie clearing approaches
		const cookieConfigs = [
			// Standard clearing
			`authjs.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,
			`authjs.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,

			// With domain
			`authjs.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`,
			`authjs.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`,

			// With dot domain (for subdomains)
			`authjs.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`,
			`authjs.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`,
		];

		cookieConfigs.forEach((cookie) => {
			document.cookie = cookie;
		});
	};

	useEffect(() => {
		if (status === "authenticated" && session?.user) {
			// Skip session validation setup if user is on authentication pages
			if (isOnAuthPages()) {
				return;
			}

			// Only start session validation for email-verified users
			if (!session.user.emailVerified) {
				return;
			}

			// Validate immediately on mount
			validateSession();

			// Set up polling every 15 seconds
			intervalRef.current = setInterval(() => {
				validateSession();
			}, 15000); // Check every 15 seconds

			// Validate when page becomes visible (user switches back to tab)
			const handleVisibilityChange = () => {
				if (!document.hidden) {
					validateSession();
				}
			};

			// Validate when window gains focus
			const handleFocus = () => {
				validateSession();
			};

			// Add event listeners
			document.addEventListener(
				"visibilitychange",
				handleVisibilityChange
			);
			window.addEventListener("focus", handleFocus);

			// Cleanup function
			return () => {
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
				}
				document.removeEventListener(
					"visibilitychange",
					handleVisibilityChange
				);
				window.removeEventListener("focus", handleFocus);
			};
		}
	}, [status, session?.user?.id, session?.user?.emailVerified, pathname]);

	return { validateSession };
}
