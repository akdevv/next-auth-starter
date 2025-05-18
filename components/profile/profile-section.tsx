"use client";

import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function ProfileSection() {
	const { data: session } = useSession();

	return (
		<section className="flex flex-col w-full">
			<h2 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-5">
				Profile Information
			</h2>

			{/* Profile Information */}

			<div className="flex flex-col md:flex-row items-start gap-4 lg:gap-6">
				<div className="w-full md:w-1/4 max-w-[140px] lg:max-w-[180px]">
					<div className="overflow-hidden rounded-xl aspect-square w-full bg-muted/20 border-2 border-border/50 flex items-center justify-center">
						{session?.user?.image ? (
							<Image
								src={session?.user?.image ?? ""}
								alt={session?.user?.name ?? ""}
								width={500}
								height={500}
								className="w-full h-full object-cover"
							/>
						) : (
							<FaUser className="h-8 w-8 lg:h-10 lg:w-10 text-muted-foreground" />
						)}
					</div>
				</div>

				<div className="flex-grow space-y-3 lg:space-y-4">
					<div>
						<h3 className="text-xl lg:text-2xl font-semibold">
							{session?.user?.name}
						</h3>
						<p className="text-muted-foreground">
							{session?.user?.email}
						</p>
						{session?.user && (
							<span
								className={`inline-flex items-center mt-1 text-xs px-2 py-0.5 rounded-full ${
									session?.user?.emailVerified
										? "bg-green-500/20 text-chart-3"
										: "bg-red-500/20 text-chart-4"
								}`}
							>
								<span
									className={`w-1 h-1 rounded-full mr-1 ${
										session?.user?.emailVerified
											? "bg-chart-3"
											: "bg-chart-4"
									}`}
								></span>
								{session?.user?.emailVerified
									? "Email Verified"
									: "Email Unverified"}
							</span>
						)}
					</div>

					<div className="pt-2">
						<p className="text-sm text-muted-foreground">
							Account created on{" "}
							{new Date(
								session?.user?.createdAt as Date
							).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
