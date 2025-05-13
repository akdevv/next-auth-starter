import Link from "next/link";
import { Button } from "../ui/button";
import { IoMdArrowForward } from "react-icons/io";


export default function CTA() {
	return (
		<section className="py-16 md:py-24">
			<div className="container">
				<div className="mx-auto text-center max-w-3xl p-2 rounded-lg relative overflow-hidden border border-border/30 shadow-lg bg-card/40 backdrop-blur-md group">
					{/* Gradient background elements */}
					<div className="absolute inset-0 z-0 transition-all duration-500">
						<div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20"></div>
						<div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl group-hover:bg-primary/30 group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-700"></div>
						<div className="absolute -bottom-32 -right-16 w-80 h-80 bg-accent/15 rounded-full filter blur-3xl group-hover:bg-accent/25 group-hover:-translate-x-3 group-hover:translate-y-3 transition-all duration-700"></div>
						<div className="absolute top-1/2 right-1/4 w-64 h-64 bg-destructive/10 rounded-full filter blur-3xl group-hover:bg-destructive/15 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-700"></div>
					</div>

					{/* Content */}
					<div className="relative z-10 p-8 rounded-md border border-white/10 bg-white/5 backdrop-blur-sm shadow-inner transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
						<h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
							Ready to build your app?
						</h2>
						<p className="mb-10 text-muted-foreground text-lg">
							Join the growing community of developers using
							next-auth-starter to build secure, production-ready
							applications.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-44 py-6 px-12"
								asChild
							>
								<Link href="/auth/register">
									Get Started{" "}
									<IoMdArrowForward className="ml-2" />
								</Link>
							</Button>

							<Button
								size="lg"
								className="min-w-44 bg-background/50 backdrop-blur-sm text-muted-foreground/70 border border-muted-foreground/70 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 py-6 px-12"
								asChild
							>
								<Link href="/docs">Read the Docs</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
