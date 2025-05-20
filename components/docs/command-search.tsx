import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

import { docLinks } from "@/content";
import { BsFileText } from "react-icons/bs";

interface CommandSearchProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

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
			{docLinks.map((link) => (
				<CommandGroup key={link.href} heading={link.label}>
					{link.subsections?.map((subsection) => (
						<CommandItem
							key={subsection.href}
							onSelect={() =>
								runCommand(() => router.push(subsection.href))
							}
						>
							<BsFileText className="mr-2 h-4 w-4 hover:text-foreground" />
							<span>{subsection.label}</span>
						</CommandItem>
					))}
				</CommandGroup>
			))}
		</CommandDialog>
	);
}
