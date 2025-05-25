"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

export function Disable2FADialog({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const disable2FA = async () => {
		setIsLoading(true);
		try {
			const res = await fetch("/api/auth/2fa/disable", {
				method: "POST",
			});
			const data = await res.json();
			if (data.error) {
				toast.error(data.error);
				throw new Error(data.error);
			}

			toast.success("2FA disabled successfully!");
			onOpenChange(false);
			router.refresh();
		} catch (error) {
			toast.error("Failed to disable 2FA");
			console.error("Failed to disable 2FA", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="font-bold">
						Disable Two-Factor Authentication
					</AlertDialogTitle>
					<AlertDialogDescription className="text-sm text-muted-foreground">
						Are you sure you want to disable 2FA? This will make
						your account less secure.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel
						className="hover:bg-muted/80 hover:text-foreground/80 cursor-pointer"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={disable2FA}
						disabled={isLoading}
						className="bg-destructive hover:bg-destructive/80 hover:text-destructive-foreground/80 cursor-pointer"
					>
						{isLoading ? "Disabling..." : "Disable 2FA"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
