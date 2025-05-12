import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
			<body className="bg-black text-white">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
