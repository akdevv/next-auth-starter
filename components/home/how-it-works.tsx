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
		<Card className="border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
			<CardContent className="pt-6">
				<div className="flex flex-col items-center">
					<div className="h-14 w-14 rounded-full bg-primary/10 border-2 border-primary text-primary flex items-center justify-center text-xl font-bold mb-4">
						{number}
					</div>
					<h3 className="text-xl font-semibold mb-3">{title}</h3>
					<p className="text-muted-foreground text-center">
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
