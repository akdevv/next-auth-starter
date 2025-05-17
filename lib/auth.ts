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
	callbacks: {
		async signIn({ user, account }) {
			const existingUser = await db.user.findUnique({
				where: { id: user.id },
			});

			if (existingUser && !existingUser.emailVerified) {
				if (account?.provider === "google") {
					await db.user.update({
						where: { id: user.id },
						data: { emailVerified: new Date() },
					});
				} else if (account?.provider === "credentials") {
					return "/auth/error?error=EmailNotVerified";
				}
			}
			return true;
		},
	},
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/logout",
		error: "/auth/error",
	},
	session: { strategy: "jwt" },
});


// import bcrypt from "bcryptjs";
// import NextAuth from "next-auth";
// import { db } from "@/lib/prisma";
// import google from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import Credentials from "next-auth/providers/credentials";
// import { User } from "@prisma/client";

// const checkPassword = async (password: string, hashedPassword: string) => {
// 	return await bcrypt.compare(password, hashedPassword);
// };

// export const { handlers, signIn, signOut, auth } = NextAuth({
// 	adapter: PrismaAdapter(db),
// 	providers: [
// 		google({
// 			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
// 		}),
// 		Credentials({
// 			name: "Credentials",
// 			credentials: {
// 				name: { label: "Name", type: "text" },
// 				email: { label: "Email", type: "email" },
// 				password: { label: "Password", type: "password" },
// 			},
// 			async authorize(credentials) {
// 				const { email, password } = credentials as {
// 					email: string;
// 					password: string;
// 				};
// 				if (!email || !password) return null;

// 				// check if user exists
// 				const user = await db.user.findUnique({
// 					where: { email },
// 				});
// 				if (!user) return null;

// 				// check if password is correct
// 				const isPasswordCorrect = await checkPassword(
// 					password,
// 					user.password as string
// 				);
// 				if (!isPasswordCorrect) return null;

// 				// check if user is verified
// 				if (!user.emailVerified) {
// 					throw new Error("Please verify your email!");
// 				}

// 				return user;
// 			},
// 		}),
// 	],
// 	callbacks: {
// 		async signIn({ user, account }) {
// 			// Allow OAuth login without email verification
// 			if (account?.provider !== "credentials") return true;

// 			const existingUser = await db.user.findUnique({
// 				where: { id: user.id },
// 			});
// 			if (!existingUser) return false;

// 			// Prevent sign in without email verification
// 			if (!existingUser.emailVerified) return false;

// 			return true;
// 		},
// 		async session({ session, token }) {
// 			if (token.sub && session.user) {
// 				session.user.id = token.sub;
// 			}

// 			if (session.user) {
// 				session.user.name = token.name;
// 				session.user.email = token.email as string;
// 				session.user.image = token.picture;
// 			}

// 			return session;
// 		},
// 		async jwt({ token }) {
// 			if (!token.sub) return token;

// 			const existingUser = await db.user.findUnique({
// 				where: { id: token.sub },
// 			});

// 			if (!existingUser) return token;

// 			token.name = existingUser.name;
// 			token.email = existingUser.email;
// 			token.picture = existingUser.image;

// 			return token;
// 		},
// 	},
// 	events: {
// 		async linkAccount({ user }) {
// 			await db.user.update({
// 				where: { id: user.id },
// 				data: { emailVerified: true },
// 			});
// 		},
// 	},
// 	pages: {
// 		signIn: "/auth/login",
// 		signOut: "/auth/logout",
// 		error: "/auth/error",
// 	},
// 	session: { strategy: "jwt" },
// });
