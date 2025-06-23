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
		<Card className="bg-card border border-border p-6 h-full">
			<div className="flex flex-col h-full">
				<div className="mb-4">
					<div className="bg-primary/10 rounded-full p-4 flex items-center w-fit mb-4">
						<div className="text-muted-foreground text-lg">
							{icon}
						</div>
					</div>
					<h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
						{title}
					</h3>
					<p className="text-muted-foreground leading-relaxed">
						{description}
					</p>
				</div>
			</div>
		</Card>
	);
};

export default function Features() {
	return (
		<section className="py-16 md:py-24">
			<div className="container mx-auto px-4">
				<div className="max-w-2xl mx-auto text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
						Key Features
					</h2>
					<p className="text-muted-foreground text-lg">
						Everything you need for robust authentication in your
						Next.js application
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					<FeatureCard
						icon={<FaKey />}
						title="Email/Password Login"
						description="Secure authentication with properly hashed passwords and salt."
					/>

					<FeatureCard
						icon={<FaGithub />}
						title="OAuth with Google & GitHub"
						description="One-click social login for a frictionless user experience."
					/>

					<FeatureCard
						icon={<FaShieldAlt />}
						title="2FA Support"
						description="Time-based one-time passwords (TOTP) for added security."
					/>

					<FeatureCard
						icon={<FaEnvelope />}
						title="Email Verification"
						description="Confirm user identity during the registration process."
					/>

					<FeatureCard
						icon={<FaHistory />}
						title="Password Reset & Update"
						description="Simple and secure password management flows."
					/>

					<FeatureCard
						icon={<FaUsers />}
						title="Session Management"
						description="View and revoke active login sessions on different devices."
					/>
				</div>
			</div>
		</section>
	);
}
