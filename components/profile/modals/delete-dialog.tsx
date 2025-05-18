"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getUserById } from "@/server/user.actions";

interface DeleteDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function DeleteDialog({ open, onOpenChange }: DeleteDialogProps) {
	const [confirmText, setConfirmText] = useState("");
	const { data: session } = useSession();

	const handleDeleteAccount = async () => {
		console.log("trying to delete account");
		const user = await getUserById(session?.user?.id as string);
		console.log("user:", user);
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
						<span>Please type</span>
						<span className="text-chart-4">
							"delete my account"
						</span>
						<span>to confirm</span>
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
						disabled={confirmText !== "delete my account"}
					>
						Delete account
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
