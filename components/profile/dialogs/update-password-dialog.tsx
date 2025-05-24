"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema } from "@/schema/user";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";

interface UpdatePasswordDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

interface UpdatePasswordForm {
	currentPassword: string;
	password: string;
	passwordConfirmation: string;
}

export function UpdatePasswordDialog({
	open,
	onOpenChange,
}: UpdatePasswordDialogProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdatePasswordForm>({
		resolver: zodResolver(updatePasswordSchema),
	});

	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState<{
		currentPassword: boolean;
		password: boolean;
		passwordConfirmation: boolean;
	}>({
		currentPassword: false,
		password: false,
		passwordConfirmation: false,
	});

	const onSubmit = async (data: {
		currentPassword: string;
		password: string;
		passwordConfirmation: string;
	}) => {
		if (data.password !== data.passwordConfirmation) {
			setError("Passwords do not match");
			return;
		}

		try {
			setIsPending(true);

			const res = await fetch("/api/user/update-password", {
				method: "PATCH",
				body: JSON.stringify({
					currentPassword: data.currentPassword,
					password: data.password,
				}),
			});

			const result = await res.json();
			if (result.error) {
				setError(result.error);
				return;
			}

			toast.success("Password updated successfully");
			onOpenChange(false); // Only close on successful update
		} catch (error) {
			console.error("Error updating password:", error);
			setError("Failed to update password");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Change password</AlertDialogTitle>
					<AlertDialogDescription>
						Enter your new password below.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Error */}
					{error && (
						<div className="flex items-center gap-2 bg-red-500/10 px-3 py-4 rounded-md">
							<MdErrorOutline className="w-4 h-4 text-red-500" />
							<p className="text-red-500 text-xs">{error}</p>
						</div>
					)}

					{/* Current Password */}
					<div className="space-y-1">
						<div className="w-full flex items-center justify-between border border-border p-3 gap-2 rounded-md focus:outline-none focus:none focus:ring-transparent">
							<input
								{...register("currentPassword")}
								type={
									showPassword.currentPassword
										? "text"
										: "password"
								}
								placeholder="Current Password"
								disabled={isPending}
								className={cn(
									"w-full focus:outline-none focus:none focus:ring-transparent",
									errors.currentPassword && "border-red-700"
								)}
								tabIndex={1}
							/>
							<button
								type="button"
								onClick={() =>
									setShowPassword((prev) => ({
										...prev,
										currentPassword: !prev.currentPassword,
									}))
								}
								className="text-muted-foreground cursor-pointer"
							>
								{showPassword.currentPassword ? (
									<LuEyeClosed className="w-5 h-5" />
								) : (
									<LuEye className="w-5 h-5" />
								)}
							</button>
						</div>
						{errors.currentPassword && (
							<p className="text-red-500 text-xs">
								{(errors.currentPassword?.message as string) ||
									"Password is required"}
							</p>
						)}
					</div>

					{/* Password */}
					<div className="space-y-1">
						<div className="w-full flex items-center justify-between border border-border p-3 gap-2 rounded-md focus:outline-none focus:none focus:ring-transparent">
							<input
								{...register("password")}
								type={
									showPassword.password ? "text" : "password"
								}
								placeholder="Password"
								disabled={isPending}
								className={cn(
									"w-full focus:outline-none focus:none focus:ring-transparent",
									errors.password && "border-red-700"
								)}
								tabIndex={2}
							/>
							<button
								type="button"
								onClick={() =>
									setShowPassword((prev) => ({
										...prev,
										password: !prev.password,
									}))
								}
								className="text-muted-foreground cursor-pointer"
							>
								{showPassword.password ? (
									<LuEyeClosed className="w-5 h-5" />
								) : (
									<LuEye className="w-5 h-5" />
								)}
							</button>
						</div>
						{errors.password && (
							<p className="text-red-500 text-xs">
								{(errors.password?.message as string) ||
									"Password is required"}
							</p>
						)}
					</div>

					{/* Confirm Password */}
					<div className="space-y-1">
						<div className="w-full flex items-center justify-between border border-border p-3 gap-2 rounded-md focus:outline-none focus:none focus:ring-transparent">
							<input
								{...register("passwordConfirmation")}
								type={
									showPassword.passwordConfirmation
										? "text"
										: "password"
								}
								placeholder="Confirm Password"
								disabled={isPending}
								className={cn(
									"w-full focus:outline-none focus:none focus:ring-transparent",
									errors.passwordConfirmation &&
										"border-red-700"
								)}
								tabIndex={3}
							/>
							<button
								type="button"
								onClick={() =>
									setShowPassword((prev) => ({
										...prev,
										passwordConfirmation:
											!prev.passwordConfirmation,
									}))
								}
								className="text-muted-foreground cursor-pointer"
							>
								{showPassword.passwordConfirmation ? (
									<LuEyeClosed className="w-5 h-5" />
								) : (
									<LuEye className="w-5 h-5" />
								)}
							</button>
						</div>
						{errors.passwordConfirmation && (
							<p className="text-red-500 text-xs">
								{(errors.passwordConfirmation
									?.message as string) ||
									"Password is required"}
							</p>
						)}
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel
							className="hover:text-foreground/80 transition-all duration-300 cursor-pointer"
							tabIndex={4}
						>
							Cancel
						</AlertDialogCancel>
						<Button
							type="submit"
							disabled={isPending}
							className="cursor-pointer"
							tabIndex={5}
						>
							{isPending ? "Updating..." : "Update Password"}
						</Button>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
