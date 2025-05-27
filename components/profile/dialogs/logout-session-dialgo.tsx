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

interface LogoutSessionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function LogoutSessionDialog({
	open,
	onOpenChange,
}: LogoutSessionDialogProps) {
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
					<AlertDialogAction className="cursor-pointer">
						Logout
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
