"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/shared/footer";
import DocsNavbar from "@/components/docs/docs-navbar";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	// Close sidebar on md and larger screens
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setSidebarOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // Initial check

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<div className="sticky top-0 z-50">
				<DocsNavbar toggleSidebar={toggleSidebar} />
			</div>
			<div className="flex flex-row">
				<DocsSidebar isOpen={sidebarOpen} />
				<main className="flex-1 w-full min-h-[calc(100vh-3rem)]">
					<div className="mx-auto px-4 py-8">{children}</div>
				</main>
			</div>
			<Footer />
		</div>
	);
}
