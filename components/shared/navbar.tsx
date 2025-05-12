"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 flex items-center justify-between w-full p-4 border-b border-border/50 transition-all duration-300",
				scrolled
					? "bg-background/90 backdrop-blur-md"
					: "bg-transparent"
			)}
		>
			<div className="flex items-center justify-between mx-auto w-full max-w-screen-2xl">
				<div className="text-2xl font-bold w-full md:w-auto text-center md:text-left">
					<Link href="/">
						<span className="text-primary">next</span>
						<span className="text-foreground">-auth</span>
					</Link>
				</div>

				<div className="hidden md:flex gap-2">
					<nav className="hidden md:flex gap-4">
						<Link
							href="/"
							className="hover:text-accent hover:underline underline-offset-4 transition-all duration-300"
						>
							Home
						</Link>
						<Link
							href="/docs"
							className="hover:text-accent hover:underline underline-offset-4 transition-all duration-300"
						>
							Docs
						</Link>
						<Link
							href="/profile"
							className="hover:text-accent hover:underline underline-offset-4 transition-all duration-300"
						>
							Profile
						</Link>
					</nav>
				</div>

				<div className="hidden md:flex gap-2">
					<Button
						className="bg-background text-secondary border border-secondary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
						asChild
					>
						<Link href="/auth/login">Login</Link>
					</Button>
					<Button asChild>
						<Link href="/auth/register">Register</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
