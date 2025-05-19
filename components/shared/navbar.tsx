"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

import { Button } from "../ui/button";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
	const { data: session, status } = useSession();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	if (status === "loading") return null;

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full p-4 bg-background/40 backdrop-blur-2xl border-b border-border/50 transition-all duration-300">
				<div className="flex items-center justify-between gap-3 mx-auto w-full max-w-screen-2xl">
					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2 cursor-pointer"
						onClick={toggleMobileMenu}
						aria-label="Toggle menu"
					>
						{isMobileMenuOpen ? (
							<FiX className="h-6 w-6" />
						) : (
							<FiMenu className="h-6 w-6" />
						)}
					</button>

					<div className="flex items-center justify-between gap-10">
						{/* Logo - Hidden on mobile when menu is closed */}
						<div
							className={cn(
								"text-md md:text-xl font-bold w-full md:w-auto text-center md:text-left",
								"md:block",
								isMobileMenuOpen ? "block" : "hidden"
							)}
						>
							<Link href="/">
								<span className="text-primary">next</span>
								<span className="text-foreground">-auth</span>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex gap-2 text-sm">
							<nav className="hidden md:flex gap-5">
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
					</div>

					<div
						className={cn(
							"gap-2",
							session?.user ? "hidden" : "flex"
						)}
					>
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

			{/* Mobile Menu Overlay */}
			<div
				className={cn(
					"fixed inset-0 z-[60] md:hidden transition-opacity duration-300",
					isMobileMenuOpen
						? "opacity-100"
						: "opacity-0 pointer-events-none"
				)}
			>
				{/* Backdrop */}
				<div
					className={cn(
						"fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
						isMobileMenuOpen ? "opacity-100" : "opacity-0"
					)}
					onClick={toggleMobileMenu}
				/>

				{/* Menu Content */}
				<div
					className={cn(
						"fixed inset-y-0 left-0 w-3/4 max-w-sm bg-background border-r border-border transition-transform duration-300 ease-in-out",
						isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
					)}
				>
					{/* Header with Logo and Close Button */}
					<div className="flex items-center justify-between p-6 border-b border-border">
						<Link href="/" onClick={toggleMobileMenu}>
							<span className="text-primary text-xl font-bold">
								next
							</span>
							<span className="text-foreground text-xl font-bold">
								-auth
							</span>
						</Link>
						<button
							onClick={toggleMobileMenu}
							className="p-2 cursor-pointer"
							aria-label="Close menu"
						>
							<FiX className="h-6 w-6" />
						</button>
					</div>

					{/* Navigation Links */}
					<div className="p-6">
						<nav className="flex flex-col gap-4 text-sm">
							<Link
								href="/"
								className="text-lg hover:text-accent hover:underline underline-offset-4 transition-all duration-300"
								onClick={toggleMobileMenu}
							>
								Home
							</Link>
							<Link
								href="/docs"
								className="text-lg hover:text-accent hover:underline underline-offset-4 transition-all duration-300"
								onClick={toggleMobileMenu}
							>
								Docs
							</Link>
							<Link
								href="/profile"
								className="text-lg hover:text-accent hover:underline underline-offset-4 transition-all duration-300"
								onClick={toggleMobileMenu}
							>
								Profile
							</Link>
						</nav>

						{!session?.user && (
							<div className="flex flex-col gap-2 mt-10">
								<Button
									className="w-full bg-background text-secondary border border-secondary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
									asChild
								>
									<Link
										href="/auth/login"
										onClick={toggleMobileMenu}
									>
										Login
									</Link>
								</Button>
								<Button className="w-full" asChild>
									<Link
										href="/auth/register"
										onClick={toggleMobileMenu}
									>
										Register
									</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
