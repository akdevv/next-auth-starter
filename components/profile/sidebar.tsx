import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Button } from "../ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar({
	activeSection,
	setActiveSection,
}: {
	activeSection: "profile" | "security" | "devices";
	setActiveSection: (section: "profile" | "security" | "devices") => void;
}) {
	const router = useRouter();
	const { data: session } = useSession();

	const handleLogout = () => {
		signOut();
		router.push("/");
	};

	return (
		<aside className="max-w-64 space-y-6">
			<div className="p-5 border border-border rounded-lg space-y-6">
				{/* Profile */}
				<div className="flex items-center gap-4">
					<Avatar className="h-14 w-14 border-2 border-primary/50">
						<AvatarImage
							src={session?.user?.image ?? ""}
							alt={session?.user?.name ?? ""}
						/>
						<AvatarFallback>
							{session?.user?.name?.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div>
						<h2 className="font-medium text-base">
							{session?.user?.name ?? "Guest"}
						</h2>
						<p className="text-xs text-muted-foreground">
							{session?.user?.email ?? "guest@gmail.com"}
						</p>
						{session?.user && (
							<span className="inline-flex items-center mt-1 text-xs bg-green-500/20 text-chart-3 px-2 py-0.5 rounded-full">
								<span className="w-1 h-1 bg-chart-3 rounded-full mr-1"></span>
								Verified
							</span>
						)}
					</div>
				</div>

				{/* Settings */}
				<div>
					<div className="space-y-2">
						<h2 className="text-sm text-muted-foreground/70">
							ACCOUNT
						</h2>
						<Button
							variant={
								activeSection === "profile"
									? "secondary"
									: "ghost"
							}
							onClick={() => setActiveSection("profile")}
							className="py-5 w-full justify-start transition-all duration-300 cursor-pointer"
						>
							Profile Information
						</Button>
						<Button
							variant={
								activeSection === "security"
									? "secondary"
									: "ghost"
							}
							onClick={() => setActiveSection("security")}
							className="py-5 w-full justify-start transition-all duration-300 cursor-pointer"
						>
							Security Settings
						</Button>
						<Button
							variant={
								activeSection === "devices"
									? "secondary"
									: "ghost"
							}
							onClick={() => setActiveSection("devices")}
							className="py-5 w-full justify-start transition-all duration-300 cursor-pointer"
						>
							Connected Devices
						</Button>
					</div>
				</div>
			</div>

			{/* Delete Account & Logout */}
			<div className="p-5 border border-border rounded-lg space-y-2">
				<button className="w-full flex items-center gap-2 p-3 text-chart-4 hover:text-chart-4/80 hover:bg-chart-4/10 rounded-lg cursor-pointer">
					<FaRegTrashAlt className="w-4 h-4" />
					Delete Account
				</button>
				<button
					className="w-full flex items-center gap-2 p-3 text-foreground hover:text-foreground/80 hover:bg-foreground/10 rounded-md cursor-pointer"
					onClick={handleLogout}
				>
					<MdOutlineLogout className="w-4 h-4" />
					Logout
				</button>
			</div>
		</aside>
	);
}
