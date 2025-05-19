import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

import { FaDatabase } from "react-icons/fa6";
import { FaUnlock, FaTools } from "react-icons/fa";
import { IoExtensionPuzzle } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";

interface CommandSearchProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

const docLinks: {
	label: string;
	href: string;
	icon: React.ReactNode;
}[] = [
	{
		label: "Getting Started",
		href: "/docs/getting-started",
		icon: <FaTools className="mr-2 h-4 w-4 hover:text-foreground" />,
	},
	{
		label: "Authentication",
		href: "/docs/auth",
		icon: <FaUnlock className="mr-2 h-4 w-4 hover:text-foreground" />,
	},
	{
		label: "Database & Backend",
		href: "/docs/db-and-backend",
		icon: <FaDatabase className="mr-2 h-4 w-4 hover:text-foreground" />,
	},
	{
		label: "Auth Logic & Middleware",
		href: "/docs/auth-logic-middleware",
		icon: (
			<IoExtensionPuzzle className="mr-2 h-4 w-4 hover:text-foreground" />
		),
	},
	{
		label: "Email Features",
		href: "/docs/email-features",
		icon: (
			<MdMarkEmailUnread className="mr-2 h-4 w-4 hover:text-foreground" />
		),
	},
];

export default function CommandSearch({
	open,
	onOpenChange,
}: CommandSearchProps) {
	const router = useRouter();
	const [internalOpen, setInternalOpen] = useState(false);

	// Use the controlled open state if provided, otherwise use internal state
	const isOpen = open !== undefined ? open : internalOpen;
	const setIsOpen = onOpenChange || setInternalOpen;

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsOpen(!isOpen);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [isOpen, setIsOpen]);

	const runCommand = useCallback(
		(command: () => void) => {
			setIsOpen(false);
			command();
		},
		[setIsOpen]
	);

	return (
		<CommandDialog open={isOpen} onOpenChange={setIsOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandGroup heading="Links">
				{docLinks.map((link) => (
					<CommandItem
						key={link.href}
						onSelect={() =>
							runCommand(() => router.push(link.href))
						}
					>
						{link.icon}
						<span>{link.label}</span>
					</CommandItem>
				))}
			</CommandGroup>
		</CommandDialog>
	);
}
