import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { db } from "@/lib/prisma";
import google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { createVerificationToken } from "./actions/verification";
import { sendVerificationEmail } from "./email";

declare module "next-auth" {
	interface User {
		emailVerified: Date | null;
	}
}

const checkPassword = async (password: string, hashedPassword: string) => {
	return await bcrypt.compare(password, hashedPassword);
};

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		google({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
		Credentials({
			name: "Credentials",
			credentials: {
				name: { label: "Name", type: "text" },
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				if (!email || !password) return null;

				// check if user exists
				const user = await db.user.findUnique({
					where: { email },
				});
				if (!user) return null;

				// check if password is correct
				const isPasswordCorrect = await checkPassword(
					password,
					user.password as string
				);
				if (!isPasswordCorrect) return null;

				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.emailVerified = user.emailVerified;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.emailVerified = token.emailVerified as Date | null;
			}
			return session;
		},
		async signIn() {
			// If the user is not email verified, we still allow sign in
			// But middleware will handle redirecting to verification page
			return true;
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	events: {
		async signIn({ user, isNewUser }) {
			try {
				// If it's a new user or email not verified, automatically send verification email
				if (isNewUser || (!user.emailVerified && user.email)) {
					// create a verification token and send email
					const { token, code } = await createVerificationToken(
						user.email as string
					);
					if (token) {
						await sendVerificationEmail(
							user.email as string,
							token,
							code
						);
					}
				}
			} catch (error) {
				console.error("Error sending verification email:", error);
			}
		},
	},
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/logout",
		error: "/auth/error",
	},
	session: { strategy: "jwt" },
});
