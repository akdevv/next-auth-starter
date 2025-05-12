import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="py-6 border-t border-border/50 bg-background/90 backdrop-blur-md">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="text-xl font-bold">
						<Link href="/">
							<span className="text-primary">next</span>
							<span className="text-foreground">-auth</span>
						</Link>
					</div>

					<div className="text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} next-auth-starter. All
						rights reserved.
					</div>

					<div className="flex items-center gap-2 text-sm">
						<span className="text-muted-foreground">
							made by @akdevv
						</span>
						<a
							href="https://github.com/akdevv/next-auth-starter"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-accent transition-colors p-2"
							aria-label="GitHub"
						>
							<FaGithub className="h-5 w-5" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
