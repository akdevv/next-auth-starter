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
		"/auth/login",
		"/auth/register",
		"/auth/error",
		"/auth/reset-password",
	];

	// handle verification routes
	const isVerificationRoute = pathname.startsWith("/auth/verify-email");

	// if user is not authenticated
	if (!token) {
		// allow access to public routes
		if (publicRoutes.includes(pathname)) {
			return NextResponse.next();
		}

		// redirect to login page
		return NextResponse.redirect(new URL("/auth/login", req.url));
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
			pathname.startsWith("/auth/reset-password") ||
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
