import Link from "next/link";
import { docLinks } from "@/content";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Docs() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			{/* Header Section */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold mb-4">Documentation</h1>
				<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
					Complete guide to using and customizing your Next.js
					authentication starter. Get started quickly with our
					comprehensive documentation.
				</p>
			</div>

			{/* Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{docLinks.map((section, index) => (
					<Link key={index} href={section.href} className="group">
						<Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-border/50">
							<CardHeader className="pb-4">
								<div className="flex items-center mb-2">
									<div className="text-primary group-hover:text-primary/80 transition-colors">
										{section.icon}
									</div>
									<CardTitle className="text-xl">
										{section.label}
									</CardTitle>
								</div>
								<CardDescription className="text-sm">
									{getDescriptionForSection(section.label)}
								</CardDescription>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="space-y-1">
									{section.subsections
										?.slice(0, 4)
										.map((subsection, subIndex) => (
											<div
												key={subIndex}
												className="text-sm text-muted-foreground flex items-center"
											>
												<div className="w-1 h-1 bg-muted-foreground/50 rounded-full mr-2"></div>
												{subsection.label}
											</div>
										))}
									{section.subsections &&
										section.subsections.length > 4 && (
											<div className="text-sm text-muted-foreground flex items-center">
												<div className="w-1 h-1 bg-muted-foreground/50 rounded-full mr-2"></div>
												+
												{section.subsections.length - 4}{" "}
												more topics
											</div>
										)}
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			{/* Quick Start Section */}
			<div className="mt-16 text-center">
				<h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
				<p className="text-muted-foreground mb-6">
					New to this project? Start with these essential guides.
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<Link href="/docs/getting-started/local-setup">
						<div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
							Local Setup Guide
						</div>
					</Link>
					<Link href="/docs/getting-started/environment-variables">
						<div className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors">
							Environment Setup
						</div>
					</Link>
					<Link href="/docs/auth/setting-up-google-auth">
						<div className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors">
							Authentication Setup
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

function getDescriptionForSection(sectionLabel: string): string {
	const descriptions: Record<string, string> = {
		"Getting Started":
			"Setup, configuration, and initial project structure to get you up and running.",
		Authentication:
			"Complete authentication system with OAuth, 2FA, email verification, and more.",
		"Database & Backend":
			"Database schema, Prisma configuration, migrations, and backend architecture.",
		"Auth Logic & Middleware":
			"Route protection, session management, and authentication middleware.",
		"Email Features":
			"Email verification, password resets, and notification system configuration.",
		"Security Features":
			"Two-factor authentication, password hashing, session security, and best practices.",
		"API Documentation":
			"Complete API reference for all authentication and user management endpoints.",
	};

	return (
		descriptions[sectionLabel] ||
		"Documentation and guides for this section."
	);
}
