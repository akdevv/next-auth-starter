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

interface LogoutAllDevicesDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function LogoutAllDevicesDialog({
	open,
	onOpenChange,
}: LogoutAllDevicesDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Logout of all devices</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					Are you sure you want to logout of all devices?
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel className="hover:text-foreground/80 transition-all duration-300 cursor-pointer">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction className="bg-chart-4 text-white hover:bg-chart-4/80 cursor-pointer">
						Logout
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
