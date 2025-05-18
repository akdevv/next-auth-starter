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
import { signOut } from "next-auth/react";

interface LogoutDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
	const handleLogout = async () => {
		await signOut();
		toast.success("Logged out successfully!");
		window.location.href = "/";
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Logout</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to logout?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="hover:text-foreground/80 transition-all duration-300 cursor-pointer">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className="cursor-pointer"
						onClick={handleLogout}
					>
						Logout
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
