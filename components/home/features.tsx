import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
		<Card className="bg-card text-card-foreground border border-border rounded-xl shadow-md hover:shadow-lg hover:border-primary transition-all duration-300 group">
			<CardHeader className="flex flex-row items-start gap-4 p-6 pb-2">
				<div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/30 group-hover:border-primary/60 transition-colors">
					{icon}
				</div>
				<div>
					<h3 className="text-lg font-bold leading-tight mb-1">
						{title}
					</h3>
				</div>
			</CardHeader>
			<CardContent className="pt-0 pb-6 px-6">
				<p className="text-sm text-muted-foreground leading-relaxed">
					{description}
				</p>
			</CardContent>
		</Card>
	);
};

export default function Features() {
	return (
		<section className="py-16 md:py-24">
			<div className="mx-auto max-w-3xl mb-12 px-4">
				<h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
					Key Features
				</h2>
				<p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto">
					Everything you need for robust authentication in your
					Next.js application, beautifully designed and ready to use
				</p>
			</div>

			{/* Cards */}
			<div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
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
