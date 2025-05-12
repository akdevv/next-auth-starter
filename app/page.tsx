import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import Navbar from "@/components/shared/navbar";
import TechStack from "@/components/home/tech-stack";
import CTA from "@/components/home/cta";
import Footer from "@/components/shared/footer";

export default function Home() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="flex flex-col items-center justify-center mx-auto max-w-screen-2xl px-4">
				<Hero />
				<Features />
				<HowItWorks />
				<TechStack />
				<CTA />
			</main>
			<Footer />
		</div>
	);
}
