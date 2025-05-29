import "./globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { SessionValidator } from "@/components/session-validator";

export const metadata: Metadata = {
	title: "next-auth-starter",
	description: "Simple starter for next-auth using Next.js 14",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="dark">
				<SessionProvider>
					{children}
					<SessionValidator />
				</SessionProvider>
				<Toaster />
			</body>
		</html>
	);
}
