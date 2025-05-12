import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FaKey,
	FaGithub,
	FaShieldAlt,
	FaEnvelope,
	FaHistory,
	FaUsers,
} from "react-icons/fa";

const FeatureCard = ({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) => {
	return (
		<Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 hover:border-primary/50">
			<CardHeader className="pb-2">
				<div className="h-12 w-12 flex items-center justify-center mb-3 text-primary bg-accent/10 rounded-full">
					{icon}
				</div>
				<CardTitle className="text-xl">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="text-base text-muted-foreground/70">
					{description}
				</CardDescription>
			</CardContent>
		</Card>
	);
};

export default function Features() {
	return (
		<section className="py-16 md:py-24">
			<div className="mx-auto max-w-3xl mb-12">
				<h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
					Key Features
				</h2>
				<p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto">
					Everything you need for robust authentication in your
					Next.js application, beautifully designed and ready to use
				</p>
			</div>

			{/* Cards */}
			<div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<FeatureCard
					icon={<FaKey className="text-xl" />}
					title="Email/Password Login"
					description="Secure authentication with properly hashed passwords and salt"
				/>

				<FeatureCard
					icon={<FaGithub className="text-xl" />}
					title="OAuth with Google & GitHub"
					description="One-click social login for frictionless user experience"
				/>

				<FeatureCard
					icon={<FaShieldAlt className="text-xl" />}
					title="2FA Support"
					description="Time-based one-time passwords (TOTP) for added security"
				/>

				<FeatureCard
					icon={<FaEnvelope className="text-xl" />}
					title="Email Verification"
					description="Confirm user identity during registration process"
				/>

				<FeatureCard
					icon={<FaHistory className="text-xl" />}
					title="Password Reset & Update"
					description="Simple and secure password management flows"
				/>

				<FeatureCard
					icon={<FaUsers className="text-xl" />}
					title="Session Management"
					description="View and revoke active login sessions on different devices"
				/>
			</div>
		</section>
	);
}
