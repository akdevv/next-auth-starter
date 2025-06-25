import Link from "next/link";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FaPlay,
	FaCube,
	FaCode,
	FaFingerprint,
	FaKey,
	FaUser,
	FaDatabase,
	FaPalette,
	FaGlobe,
	FaLayerGroup,
} from "react-icons/fa";

export default function Docs() {
	return (
		<div className="min-h-screen bg-background">
			{/* Add padding for navbar */}
			<div className="pt-20">
				<div className="container mx-auto px-4 py-16 max-w-7xl">
					{/* Header Section */}
					<div className="text-center mb-16">
						<h1 className="text-5xl font-bold mb-6 text-foreground">
							Welcome to Next Auth Starter Docs
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Find all the guides and resources you need to
							develop with Next Auth Starter.
						</p>
					</div>

					{/* Main Feature Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
						<Link href="/docs/getting-started" className="group">
							<Card className="h-full bg-card hover:bg-card/80 border-border transition-all duration-300 hover:scale-105 hover:shadow-lg">
								<CardHeader className="pb-6">
									<div className="flex items-center mb-4">
										<div className="p-3 bg-primary/10 rounded-lg mr-4">
											<FaPlay className="h-6 w-6 text-primary" />
										</div>
									</div>
									<CardTitle className="text-2xl mb-3 text-card-foreground">
										Quickstarts & Tutorials
									</CardTitle>
									<CardDescription className="text-muted-foreground leading-relaxed">
										Explore our end-to-end tutorials and
										getting started guides for different
										application stacks using Next Auth
										Starter.
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>

						<Link href="/docs/auth" className="group">
							<Card className="h-full bg-card hover:bg-card/80 border-border transition-all duration-300 hover:scale-105 hover:shadow-lg">
								<CardHeader className="pb-6">
									<div className="flex items-center mb-4">
										<div className="p-3 bg-primary/10 rounded-lg mr-4">
											<FaCube className="h-6 w-6 text-primary" />
										</div>
									</div>
									<CardTitle className="text-2xl mb-3 text-card-foreground">
										Auth Components
									</CardTitle>
									<CardDescription className="text-muted-foreground leading-relaxed">
										Next Auth Starter&apos;s prebuilt
										authentication components give you a
										beautiful, fully-functional user
										management experience in minutes.
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>

						<Link href="/docs/api" className="group">
							<Card className="h-full bg-card hover:bg-card/80 border-border transition-all duration-300 hover:scale-105 hover:shadow-lg">
								<CardHeader className="pb-6">
									<div className="flex items-center mb-4">
										<div className="p-3 bg-primary/10 rounded-lg mr-4">
											<FaCode className="h-6 w-6 text-primary" />
										</div>
									</div>
									<CardTitle className="text-2xl mb-3 text-card-foreground">
										API Reference
									</CardTitle>
									<CardDescription className="text-muted-foreground leading-relaxed">
										Dig into our API reference documentation
										and SDKs. We have everything you need to
										get started setting up authentication
										with Next Auth Starter.
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>

						<Link href="/docs/security-features" className="group">
							<Card className="h-full bg-card hover:bg-card/80 border-border transition-all duration-300 hover:scale-105 hover:shadow-lg">
								<CardHeader className="pb-6">
									<div className="flex items-center mb-4">
										<div className="p-3 bg-primary/10 rounded-lg mr-4">
											<FaFingerprint className="h-6 w-6 text-primary" />
										</div>
									</div>
									<CardTitle className="text-2xl mb-3 text-card-foreground">
										Security
									</CardTitle>
									<CardDescription className="text-muted-foreground leading-relaxed">
										Account security is the top concern of
										every feature we build. This
										documentation lists some of the many
										protections included with Next Auth
										Starter.
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>
					</div>

					{/* Explore by Feature Section */}
					<div className="mb-16">
						<h2 className="text-4xl font-bold mb-12 text-foreground">
							Explore by feature
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="space-y-8">
								<Link href="/docs/auth" className="group block">
									<div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-card/50 transition-colors">
										<div className="p-2 bg-primary/10 rounded-lg">
											<FaKey className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
												Authentication
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Next Auth Starter supports
												multiple authentication
												strategies so you can implement
												the strategy that makes sense
												for your users.
											</p>
										</div>
									</div>
								</Link>

								<Link
									href="/docs/db-and-backend"
									className="group block"
								>
									<div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-card/50 transition-colors">
										<div className="p-2 bg-primary/10 rounded-lg">
											<FaDatabase className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
												Database integrations
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Enable Next Auth Starter-managed
												users to authenticate and
												interact directly with your
												database with Next Auth
												Starter&apos;s integrations.
											</p>
										</div>
									</div>
								</Link>

								<Link
									href="/docs/auth-logic-middleware"
									className="group block"
								>
									<div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-card/50 transition-colors">
										<div className="p-2 bg-primary/10 rounded-lg">
											<FaGlobe className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
												Middleware & Logic
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Middleware and authentication
												logic are shared accounts,
												useful for project and team
												leaders. Members with elevated
												privileges can manage member
												access to the middleware data
												and resources.
											</p>
										</div>
									</div>
								</Link>
							</div>

							<div className="space-y-8">
								<Link
									href="/docs/getting-started"
									className="group block"
								>
									<div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-card/50 transition-colors">
										<div className="p-2 bg-primary/10 rounded-lg">
											<FaUser className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
												User management
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Complete user management. Add
												sign up, sign in, and profile
												management to your application
												in minutes.
											</p>
										</div>
									</div>
								</Link>

								<Link
									href="/docs/email-features"
									className="group block"
								>
									<div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-card/50 transition-colors">
										<div className="p-2 bg-primary/10 rounded-lg">
											<FaPalette className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
												Email features
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Next Auth Starter&apos;s email
												features can be customized to
												match the look and feel of your
												application.
											</p>
										</div>
									</div>
								</Link>

								<Link href="/docs/api" className="group block">
									<div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-card/50 transition-colors">
										<div className="p-2 bg-primary/10 rounded-lg">
											<FaLayerGroup className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
												APIs
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Next Auth Starter&apos;s APIs
												allow you to call the Next Auth
												Starter server API without
												having to implement the calls
												yourself.
											</p>
										</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
