"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
	MdOutlineKeyboardArrowRight,
	MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { docLinks } from "@/content";

interface DocsSidebarProps {
	isOpen: boolean;
	className?: string;
}

export function DocsSidebar({ isOpen, className }: DocsSidebarProps) {
	const pathname = usePathname();
	const [openSections, setOpenSections] = useState<string[]>([]);

	const toggleSection = (href: string) => {
		setOpenSections((prev) =>
			prev.includes(href)
				? prev.filter((item) => item !== href)
				: [...prev, href]
		);
	};

	useEffect(() => {
		if (pathname) {
			const parentPath = `/${pathname.split("/").slice(1, 3).join("/")}`;
			if (!openSections.includes(parentPath)) {
				setOpenSections((prev) => [...prev, parentPath]);
			}
		}
	}, [pathname]);

	return (
		<>
			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden"
					onClick={() => toggleSection("")}
				/>
			)}
			{/* Sidebar */}
			<aside
				className={cn(
					"fixed md:sticky top-0 left-0 z-30 w-64 h-full transform bg-background border-r transition-transform duration-300 ease-in-out",
					isOpen
						? "translate-x-0"
						: "-translate-x-full md:translate-x-0",
					className
				)}
			>
				<div className="flex flex-col h-[calc(100vh-3rem)] mt-18">
					<div className="px-4 py-4 border-b">
						<h2 className="text-lg font-semibold">Documentation</h2>
					</div>
					<nav className="flex-1 overflow-y-auto px-2 py-4">
						<div className="space-y-1">
							{docLinks.map((section) => (
								<div key={section.href} className="pb-1">
									{section.subsections ? (
										<Collapsible
											open={openSections.includes(
												section.href
											)}
											onOpenChange={() =>
												toggleSection(section.href)
											}
										>
											<CollapsibleTrigger asChild>
												<Button
													variant="ghost"
													className={cn(
														"w-full justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
														pathname ===
															section.href &&
															"bg-accent text-accent-foreground"
													)}
												>
													<div className="flex items-center">
														{section.icon}
														<span className="ml-2">
															{section.label}
														</span>
													</div>
													{openSections.includes(
														section.href
													) ? (
														<MdOutlineKeyboardArrowDown className="h-4 w-4" />
													) : (
														<MdOutlineKeyboardArrowRight className="h-4 w-4" />
													)}
												</Button>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<div className="pl-6 space-y-1 mt-1">
													{section.subsections.map(
														(subsection) => (
															<Link
																key={
																	subsection.href
																}
																href={
																	subsection.href
																}
															>
																<Button
																	variant="ghost"
																	className={cn(
																		"w-full justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
																		pathname ===
																			subsection.href &&
																			"bg-accent/5 text-muted-foreground"
																	)}
																>
																	{
																		subsection.label
																	}
																</Button>
															</Link>
														)
													)}
												</div>
											</CollapsibleContent>
										</Collapsible>
									) : (
										<Link href={section.href}>
											<Button
												variant="ghost"
												className={cn(
													"w-full justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
													pathname === section.href &&
														"bg-accent text-accent-foreground"
												)}
											>
												<div className="flex items-center">
													{section.icon}
													<span className="ml-2">
														{section.label}
													</span>
												</div>
											</Button>
										</Link>
									)}
								</div>
							))}
						</div>
					</nav>
				</div>
			</aside>
		</>
	);
}
