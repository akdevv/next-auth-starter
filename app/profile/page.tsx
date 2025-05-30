"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Sidebar from "@/components/profile/sidebar";
import ProfileSection from "@/components/profile/profile-section";
import SecuritySection from "@/components/profile/security-section";
import DevicesSectionWrapper from "@/components/profile/devices-section-wrapper";

export default function Profile() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const activeSection = (searchParams.get("tab") || "profile") as
		| "profile"
		| "security"
		| "devices";

	useEffect(() => {
		if (!["profile", "security", "devices"].includes(activeSection)) {
			router.push("/profile?tab=profile");
		}
	}, [activeSection, router]);

	const setActiveSection = (section: "profile" | "security" | "devices") => {
		router.push(`/profile?tab=${section}`);
	};

	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<main className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-10 mx-auto w-full max-w-screen-2xl px-4 pt-24 pb-10">
				<Sidebar
					activeSection={activeSection}
					setActiveSection={setActiveSection}
				/>

				{/* Main Content */}
				<div className="flex border border-border rounded-lg p-4 lg:p-8 w-full max-w-4xl h-fit">
					{activeSection === "profile" && <ProfileSection />}
					{activeSection === "security" && <SecuritySection />}
					{activeSection === "devices" && <DevicesSectionWrapper />}
				</div>
			</main>
			<Footer />
		</div>
	);
}
