"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
// import ImageUpload from "../shared/image-upload";

interface ProfileFormValues {
	name: string;
	email: string;
	avatar: string;
}

export default function ProfileSection() {
	const { data: session } = useSession();
	const [editProfileOpen, setEditProfileOpen] = useState<boolean>(false);

	const form = useForm<ProfileFormValues>({
		defaultValues: {
			name: session?.user?.name || "",
			email: session?.user?.email || "",
			avatar: session?.user?.image || "",
		},
	});

	const { register, handleSubmit, setValue } = form;

	const handleProfileUpdate = handleSubmit(() => {
		// Handle profile update logic here
		setEditProfileOpen(false);
	});

	const handleAvatarUpload = (url: string) => {
		setValue("avatar", url);
	};

	return (
		<section className="flex flex-col w-full">
			<div className="flex w-full items-center justify-between gap-2 mb-5">
				<h2 className="text-xl font-semibold">Profile Information</h2>
				<Button
					className="bg-transparent hover:bg-accent/10 rounded-full h-9 w-9 p-0 shadow-none text-muted-foreground cursor-pointer transition-all duration-300"
					disabled={editProfileOpen}
					onClick={() => setEditProfileOpen(true)}
				>
					<Pencil className="h-4 w-4" />
				</Button>
			</div>

			{/* Profile Information */}
			{!editProfileOpen ? (
				<div className="flex flex-col md:flex-row items-start gap-6">
					<div className="w-full md:w-1/4 max-w-[180px]">
						<div className="overflow-hidden rounded-xl aspect-square w-full bg-muted/20 border-2 border-border/50 flex items-center justify-center">
							<Image
								src={session?.user?.image ?? ""}
								alt={session?.user?.name ?? ""}
								width={100}
								height={100}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>

					<div className="flex-grow space-y-4">
						<div>
							<h3 className="text-2xl font-semibold">
								{session?.user?.name}
							</h3>
							<p className="text-muted-foreground">
								{session?.user?.email}
							</p>
							{session?.user && (
								<span className="inline-flex items-center mt-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
									<span className="w-1 h-1 bg-green-400 rounded-full mr-1"></span>
									Email verified
								</span>
							)}
						</div>

						<div className="pt-2">
							<p className="text-sm text-muted-foreground">
								Account created on{" "}
								{new Date("12-12-2024").toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
							</p>
						</div>
					</div>
				</div>
			) : (
				<form onSubmit={handleProfileUpdate} className="space-y-6">
					<div className="flex flex-col md:flex-row items-start gap-6">
						{/* <ImageUpload
							currentImage={watch("avatar")}
							onUpload={handleAvatarUpload}
							className="w-full md:w-1/4 max-w-[200px]"
						/> */}
						<Button onClick={() => handleAvatarUpload("")}>
							Upload Avatar
						</Button>

						<div className="flex-grow space-y-4 w-full">
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-sm font-medium"
								>
									Full Name
								</label>
								<Input id="name" {...register("name")} />
							</div>

							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium flex items-center justify-between"
								>
									<span>Email</span>
									{session?.user && (
										<span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
											Verified
										</span>
									)}
								</label>
								<Input
									id="email"
									type="email"
									{...register("email")}
								/>
							</div>

							<div className="pt-2 flex justify-end">
								<Button
									type="button"
									variant="outline"
									onClick={() => setEditProfileOpen(false)}
									className="mr-2"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-primary text-primary-foreground hover:bg-primary/90"
								>
									Save changes
								</Button>
							</div>
						</div>
					</div>
				</form>
			)}
		</section>
	);
}
