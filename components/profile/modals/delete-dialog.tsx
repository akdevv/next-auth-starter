"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DeleteDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function DeleteDialog({ open, onOpenChange }: DeleteDialogProps) {
	const [confirmText, setConfirmText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteAccount = async () => {
		try {
			setIsDeleting(true);
			const res = await fetch("/api/user/delete", { method: "DELETE" });

			if (!res.ok) {
				throw new Error("Failed to delete account!");
			}

			await signOut();
			toast.success("Account deleted successfully!");
			window.location.href = "/";
		} catch (error) {
			console.error("Error deleting account:", error);
			toast.error("Failed to delete account. Please try again.");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="space-y-2 py-4">
					<Label>
						<p className="text-xs md:text-base">
							<span>Please type</span>{" "}
							<span className="text-chart-4">
								"delete my account"
							</span>{" "}
							<span>to confirm</span>
						</p>
					</Label>
					<Input
						value={confirmText}
						onChange={(e) => setConfirmText(e.target.value)}
						className="py-5"
					/>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel className="hover:text-foreground/80 transition-all duration-300 cursor-pointer">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className="bg-red-400 text-white hover:bg-red-400/80 transition-all duration-300 cursor-pointer"
						onClick={handleDeleteAccount}
						disabled={
							confirmText !== "delete my account" || isDeleting
						}
					>
						{isDeleting ? "Deleting..." : "Delete account"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
