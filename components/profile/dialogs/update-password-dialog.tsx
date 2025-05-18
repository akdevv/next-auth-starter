"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

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
	} = useForm<UpdatePasswordForm>();

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

	const onSubmit = async (data: { password: string }) => {
		console.log(data);
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
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4 mt-4"
				>
					{/* Current Password */}
					<div className="space-y-1">
						<div className="w-full flex items-center justify-between border border-border p-3 gap-2 rounded-md focus:outline-none focus:none focus:ring-transparent">
							<input
								{...register("currentPassword")}
								type={showPassword ? "text" : "password"}
								placeholder="Current Password"
								disabled={isPending}
								className={cn(
									"w-full focus:outline-none focus:none focus:ring-transparent",
									errors.currentPassword && "border-red-700"
								)}
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
							<p className="text-red-700 text-xs">
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
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								disabled={isPending}
								className={cn(
									"w-full focus:outline-none focus:none focus:ring-transparent",
									errors.password && "border-red-700"
								)}
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
							<p className="text-red-700 text-xs">
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
								type={showPassword ? "text" : "password"}
								placeholder="Confirm Password"
								disabled={isPending}
								className={cn(
									"w-full focus:outline-none focus:none focus:ring-transparent",
									errors.passwordConfirmation &&
										"border-red-700"
								)}
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
							<p className="text-red-700 text-xs">
								{(errors.passwordConfirmation
									?.message as string) ||
									"Password is required"}
							</p>
						)}
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel className="hover:text-foreground/80 transition-all duration-300 cursor-pointer">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							type="submit"
							disabled={isPending}
							className="cursor-pointer"
						>
							{isPending ? "Updating..." : "Update Password"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
