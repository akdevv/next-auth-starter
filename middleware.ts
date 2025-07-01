import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.AUTH_SECRET });
	const { pathname } = req.nextUrl;

	// skip middleware for API routes, static files, etc.
	if (
		pathname.startsWith("/_next") ||
		pathname.includes("/api") ||
		pathname.includes("/static") ||
		pathname.includes(".")
	) {
		return NextResponse.next();
	}

	// define public routes that don't require authentication
	const publicRoutes = [
		"/",
		"/docs",
		"/terms",
		"/auth/login",
		"/auth/register",
		"/auth/error",
		"/auth/forgot-password",
		"/auth/2fa",
	];

	// handle verification routes
	const isDocsRoute = pathname.startsWith("/docs");
	const isVerificationRoute = pathname.startsWith("/auth/verify-email");
	const isForgotPasswordRoute = pathname.startsWith("/auth/forgot-password");
	const isTwoFactorRoute = pathname.startsWith("/auth/2fa");

	// if user is not authenticated
	if (!token) {
		// allow access to public routes and forgot password routes
		if (
			publicRoutes.includes(pathname) ||
			isDocsRoute ||
			isForgotPasswordRoute ||
			isTwoFactorRoute
		) {
			return NextResponse.next();
		}

		// Get the full URL including search params
		const fullUrl = req.nextUrl.pathname + req.nextUrl.search;
		const encodedCallbackUrl = encodeURIComponent(fullUrl);

		// redirect to login page with callback URL
		return NextResponse.redirect(
			new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, req.url)
		);
	}

	// user is authenticated but not verified
	if (token && !token.emailVerified) {
		// allow access to verification routes
		if (isVerificationRoute) {
			return NextResponse.next();
		}

		// allow access to auth routes
		if (
			pathname === "/" ||
			pathname.startsWith("/api/auth") ||
			pathname === "/api/auth/signout" ||
			pathname === "/auth/signout"
		) {
			return NextResponse.next();
		}

		// redirect to verification page
		return NextResponse.redirect(new URL("/auth/verify-email", req.url));
	}

	// user is authenticated and verified
	if (token && token.emailVerified) {
		// redirect away from auth routes
		if (
			pathname.startsWith("/auth/login") ||
			pathname.startsWith("/auth/register") ||
			pathname.startsWith("/auth/error") ||
			pathname.startsWith("/auth/forgot-password") ||
			pathname.startsWith("/auth/verify-email")
		) {
			return NextResponse.redirect(new URL("/", req.url));
		}

		// allow access to other routes
		return NextResponse.next();
	}
}

// This ensures middleware config only applies to appropriate routes
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
