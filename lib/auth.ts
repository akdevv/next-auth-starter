import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { db } from "@/lib/prisma";
import google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

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
	// events: {
	// 	async signIn({ user }) {
	// 		console.log("signIn", user);
	// 	},
	// },
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/logout",
		error: "/auth/error",
	},
	session: { strategy: "jwt" },
});
