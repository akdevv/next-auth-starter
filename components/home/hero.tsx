"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

import { FaCheck } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";

export default function Hero() {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		const code = `git clone https://github.com/akdevv/next-auth-starter.git

bun install

bun dev`;
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section className="py-20 md:py-32 relative">
			<div className="absolute inset-0 z-0">
				<div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/15 rounded-full filter blur-3xl"></div>
				<div className="absolute bottom-1/3 right-1/3 w-64 h-64 md:w-80 md:h-80 bg-accent/10 rounded-full filter blur-3xl"></div>
				<div className="absolute top-1/2 right-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
			</div>

			<div className="container relative z-10">
				{/* Heading & Subheading */}
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
						<span className="text-primary">next</span>-auth-starter
					</h1>
					<p className="text-lg md:text-2xl mb-12 mt-6 text-secondary/90 max-w-2xl mx-auto leading-relaxed">
						A beautiful authentication system for your Next.js
						applications!
					</p>
				</div>

				{/* CTA Buttons */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
					<Button
						className="w-full bg-primary text-primary-foreground h-14 text-base font-medium shadow-md hover:shadow-lg transition-all"
						asChild
					>
						<Link href="/auth/register">Get started</Link>
					</Button>
					<Button
						className="w-full h-14 text-base bg-background/50 backdrop-blur-sm text-secondary border border-secondary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
						asChild
					>
						<a
							href="https://github.com/akdevv/next-auth-starter"
							target="_blank"
							rel="noopener noreferrer"
						>
							View on GitHub
						</a>
					</Button>
				</div>

				{/* Download Instructions */}
				<div className="mt-16 py-8 px-4 md:px-6 rounded-xl bg-card/40 backdrop-blur-md border border-border/30 shadow-lg relative overflow-hidden">
					{/* Terminal header */}
					<div className="absolute top-0 left-0 right-0 h-8 bg-background/90 border-b border-border/30 flex items-center px-4">
						<div className="flex gap-2">
							<div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
							<div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
							<div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
						</div>
						<div className="text-xs text-secondary/80 mx-auto font-medium">
							Terminal
						</div>
					</div>
					<div className="relative">
						<pre className="text-left text-xs md:text-sm mt-8 font-mono p-2 overflow-x-auto whitespace-pre-wrap break-words">
							<code className="">
								<span className="text-secondary">
									# Clone the repository
								</span>
								<br />
								<span className="text-accent">$</span>{" "}
								<span className="text-primary/90">git</span>{" "}
								clone
								https://github.com/akdevv/next-auth-starter.git
								<br />
								<br />
								<span className="text-secondary">
									# Install dependencies
								</span>
								<br />
								<span className="text-accent">$</span>{" "}
								<span className="text-primary/90">bun</span>{" "}
								install
								<br />
								<br />
								<span className="text-secondary">
									# Start the development server
								</span>
								<br />
								<span className="text-accent">$</span>{" "}
								<span className="text-primary/90">bun</span> dev
							</code>
						</pre>
						<button
							onClick={handleCopy}
							className="absolute -top-2 right-2 p-2 rounded-md bg-background/90 hover:bg-accent/5 border border-border/30 transition-all group cursor-pointer"
							aria-label="Copy code"
						>
							{copied ? (
								<FaCheck className="h-4 w-4 text-chart-3" />
							) : (
								<MdOutlineContentCopy className="h-4 w-4 text-secondary group-hover:text-accent/30" />
							)}
						</button>
					</div>
					{/* Terminal reflection effect */}
					<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 pointer-events-none"></div>
					<div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-20 pointer-events-none"></div>
				</div>
			</div>
		</section>
	);
}
