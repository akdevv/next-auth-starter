import { Card, CardContent } from "@/components/ui/card";

const StepCard = ({
	number,
	title,
	description,
}: {
	number: string;
	title: string;
	description: string;
}) => {
	return (
		<Card className="bg-card text-card-foreground border border-border rounded-xl shadow-md hover:shadow-lg hover:border-primary transition-all duration-300 group">
			<CardContent className="flex flex-row items-start gap-4 p-6">
				<div className="p-4 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/30 font-bold text-lg group-hover:border-primary/60 transition-colors">
					{number}
				</div>
				<div>
					<h3 className="text-lg font-bold leading-tight mb-3">
						{title}
					</h3>
					<p className="text-sm text-muted-foreground leading-relaxed mt-1">
						{description}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default function HowItWorks() {
	return (
		<section className="py-16 md:py-24">
			<div className="container px-4 md:px-6">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
						How It Works
					</h2>
					<p className="mb-12 text-muted-foreground text-center text-lg ">
						Get started with next-auth-starter in just a few simple
						steps
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
						<StepCard
							number="1"
							title="Clone the repo"
							description="Download or clone the starter repository from GitHub to your local machine"
						/>

						<StepCard
							number="2"
							title="Configure .env"
							description="Add your Supabase credentials and OAuth provider keys to the environment"
						/>

						<StepCard
							number="3"
							title="Add your routes"
							description="Create your application routes and components using the authentication system"
						/>

						<StepCard
							number="4"
							title="Deploy"
							description="Push your application to production using Vercel, Netlify, or any hosting platform"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
