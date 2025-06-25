import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { db } from "@/lib/prisma";
import google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { generateTwoFactorSessionToken } from "@/server/actions/2fa";

declare module "next-auth" {
	interface User {
		emailVerified: Date | null;
		lastPasswordUpdate: Date | null;
		twoFactorEnabled: boolean;
		createdAt: Date;
		updatedAt: Date;
	}

	interface Session {
		sessionToken?: string;
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
				token.lastPasswordUpdate = user.lastPasswordUpdate;
				token.twoFactorEnabled = user.twoFactorEnabled;
				token.createdAt = user.createdAt;
				token.updatedAt = user.updatedAt;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.emailVerified = token.emailVerified as Date | null;
				session.user.lastPasswordUpdate =
					token.lastPasswordUpdate as Date | null;
				session.user.twoFactorEnabled =
					token.twoFactorEnabled as boolean;
				session.user.createdAt = token.createdAt as Date;
				session.user.updatedAt = token.updatedAt as Date;
			}
			return session;
		},
		async signIn({ user }) {
			// If the user is not email verified, we still allow sign in
			// But middleware will handle redirecting to verification page

			// check if user had 2fa enabled
			const dbUser = await db.user.findUnique({
				where: { id: user.id },
			});
			if (dbUser?.twoFactorEnabled) {
				const token = generateTwoFactorSessionToken();
				const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

				if (!user.id) {
					return false;
				}

				await db.twoFactorToken.create({
					data: {
						token,
						userId: user.id,
						expires,
					},
				});

				return `/auth/2fa?token=${token}`;
			}

			return true;
		},
		async redirect({ url, baseUrl }) {
			// Handle 2FA redirects
			if (url.startsWith("/auth/2fa")) {
				return `${baseUrl}${url}`;
			}

			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/logout",
		error: "/auth/error",
	},
	session: { strategy: "jwt" },
});
