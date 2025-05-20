import { FaDatabase } from "react-icons/fa6";
import { FaUnlock, FaTools } from "react-icons/fa";
import { IoExtensionPuzzle } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";

export const docLinks: {
	label: string;
	href: string;
	icon: React.ReactNode;
	subsections?: { label: string; href: string }[];
}[] = [
	{
		label: "Getting Started",
		href: "/docs/getting-started",
		icon: <FaTools className="mr-2 h-4 w-4 hover:text-foreground" />,
		subsections: [
			{
				label: "Local Setup",
				href: "/docs/getting-started/local-setup",
			},
			{
				label: "Project Structure Overview",
				href: "/docs/getting-started/project-structure",
			},
			{
				label: "Environment Variables Guide",
				href: "/docs/getting-started/environment-variables",
			},
			{
				label: "Project Configuration",
				href: "/docs/getting-started/project-configuration",
			},
		],
	},
	{
		label: "Authentication",
		href: "/docs/auth",
		icon: <FaUnlock className="mr-2 h-4 w-4 hover:text-foreground" />,
		subsections: [
			{
				label: "Setting Up Google Auth",
				href: "/docs/auth/setting-up-google-auth",
			},
			{
				label: "Using Credentials Auth",
				href: "/docs/auth/setting-up-credentials-auth",
			},
			{
				label: "Adding 2FA",
				href: "/docs/auth/adding-2fa",
			},
		],
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
