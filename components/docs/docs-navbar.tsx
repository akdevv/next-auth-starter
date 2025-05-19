"use client";

import Link from "next/link";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import CommandSearch from "./command-search";
import { FiCommand } from "react-icons/fi";

export default function DocsNavbar() {
	const [searchOpen, setSearchOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full p-4 bg-background/40 backdrop-blur-2xl border-b border-border/50 transition-all duration-300">
			<div className="flex items-center justify-between gap-3 mx-auto w-full max-w-screen-2xl">
				{/* Left section - Mobile menu and Logo */}
				<div className="flex items-center justify-between gap-10">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => {}}
						>
							<FiMenu className="h-5 w-5" />
							<span className="sr-only">Toggle sidebar</span>
						</Button>
						<div className="text-md md:text-xl font-bold w-full md:w-auto text-center md:text-left md:block">
							<Link href="/">
								<span className="text-primary">next</span>
								<span className="text-foreground">-auth</span>
							</Link>
						</div>
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

				{/* Right section - Search */}
				<div className="flex items-center">
					<button
						onClick={() => setSearchOpen(true)}
						type="button"
						className="flex items-center bg-muted/30 hover:bg-muted border border-border text-muted-foreground rounded-lg p-2 shadow-none focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors w-full md:w-auto cursor-pointer"
					>
						<span className="font-sans text-sm whitespace-nowrap opacity-80 mx-2 hidden md:inline-block">
							Search documentation...
						</span>
						<span className="font-sans text-sm whitespace-nowrap opacity-80 mx-2 inline-block md:hidden">
							Search...
						</span>
						<kbd className="ml-2 flex h-5 px-2 select-none items-center rounded bg-muted font-mono text-[10px] font-normal gap-0.5 opacity-100">
							<FiCommand className="w-2 h-2" />K
						</kbd>
					</button>
					<CommandSearch
						open={searchOpen}
						onOpenChange={setSearchOpen}
					/>
				</div>
			</div>
		</header>
	);
}
