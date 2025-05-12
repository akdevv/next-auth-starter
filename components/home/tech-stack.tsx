import Image from "next/image";

export default function TechStack() {
	const techStack = [
		{
			name: "Next.js",
			link: "https://nextjs.org/",
			icon: "/icons/nextjs_logo_dark.svg",
		},
		{
			name: "TypeScript",
			link: "https://www.typescriptlang.org/",
			icon: "/icons/typescript.svg",
		},
		{
			name: "Prisma",
			link: "https://www.prisma.io/",
			icon: "/icons/prisma_dark.svg",
		},
		{
			name: "Bun",
			link: "https://bun.sh/",
			icon: "/icons/bun.svg",
		},
		{
			name: "Supabase",
			link: "https://supabase.com/",
			icon: "/icons/supabase.svg",
		},
		{
			name: "shadcn/ui",
			link: "https://ui.shadcn.com/",
			icon: "/icons/shadcn-ui_dark.svg",
		},
	];

	return (
		<section className="py-16 md:py-24 bg-gradient-to-b from-background to-background/50">
			<div className="container px-4 md:px-6">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
						Tech Stack
					</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
						{techStack.map((tech) => (
							<a
								key={tech.name}
								href={tech.link}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-col items-center justify-center p-4 rounded-lg transition-colors duration-200 hover:bg-accent/10"
							>
								<div className="relative w-14 h-14 md:w-16 md:h-16 mb-3">
									<Image
										src={tech.icon}
										alt={`${tech.name} logo`}
										fill
										className="object-contain"
										sizes="(max-width: 768px) 56px, 64px"
									/>
								</div>
								<span className="text-sm md:text-base font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground text-center">
									{tech.name}
								</span>
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
