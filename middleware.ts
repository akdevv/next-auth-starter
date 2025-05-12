import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
	const { nextUrl, auth } = req;
	const isLoggedIn = !!auth;

	// Protected routes
	const isProfilePage = nextUrl.pathname.startsWith("/profile");

	// If the user is not logged in and trying to access a protected route
	if (!isLoggedIn && isProfilePage) {
		return NextResponse.redirect(new URL("/auth/login", nextUrl));
	}

	// If the user is logged in and trying to access auth routes
	if (
		isLoggedIn &&
		(nextUrl.pathname.startsWith("/auth/login") ||
			nextUrl.pathname.startsWith("/auth/register"))
	) {
		return NextResponse.redirect(new URL("/profile", nextUrl));
	}

	return NextResponse.next();
});

// This ensures middleware config only applies to appropriate routes
export const config = {
	matcher: ["/profile/:path*", "/auth/:path*"],
};
