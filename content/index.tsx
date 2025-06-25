import { FaDatabase } from "react-icons/fa6";
import { FaUnlock, FaTools, FaPlus } from "react-icons/fa";
import { IoExtensionPuzzle } from "react-icons/io5";
import { FaShieldAlt } from "react-icons/fa";

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
				label: "Overview",
				href: "/docs/getting-started/overview",
			},
			{
				label: "Local Setup",
				href: "/docs/getting-started/local-setup",
			},
			{
				label: "Environment Variables",
				href: "/docs/getting-started/environment-variables",
			},
			{
				label: "Tech Stack",
				href: "/docs/getting-started/tech-stack",
			},
			{
				label: "Project Structure",
				href: "/docs/getting-started/project-structure",
			},
		],
	},
	{
		label: "Authentication",
		href: "/docs/auth",
		icon: <FaUnlock className="mr-2 h-4 w-4 hover:text-foreground" />,
		subsections: [
			{
				label: "Credentials Auth",
				href: "/docs/auth/credentials-auth",
			},
			{
				label: "Google OAuth Setup",
				href: "/docs/auth/google-oauth",
			},
			{
				label: "2FA Setup",
				href: "/docs/auth/two-factor-auth",
			},
			{
				label: "Email Verification Flow",
				href: "/docs/auth/email-verification",
			},
			{
				label: "Password Reset Flow",
				href: "/docs/auth/password-reset",
			},
			{
				label: "Session & Device Management",
				href: "/docs/auth/session-management",
			},
			{
				label: "Auth Error Handling",
				href: "/docs/auth/error-handling",
			},
			{
				label: "Social Logins (Optional)",
				href: "/docs/auth/social-logins",
			},
		],
	},
	{
		label: "Database",
		href: "/docs/database",
		icon: <FaDatabase className="mr-2 h-4 w-4 hover:text-foreground" />,
		subsections: [
			{
				label: "DB Schema Overview",
				href: "/docs/database/schema-overview",
			},
			{
				label: "Prisma Configuration",
				href: "/docs/database/prisma-config",
			},
			{
				label: "Database Migrations",
				href: "/docs/database/migrations",
			},
			{
				label: "User Model Structure",
				href: "/docs/database/user-model",
			},
			{
				label: "Session Management",
				href: "/docs/database/session-management",
			},
			{
				label: "Backup Codes System",
				href: "/docs/database/backup-codes",
			},
			{
				label: "2FA Storage",
				href: "/docs/database/2fa-storage",
			},
		],
	},
	{
		label: "Security Features",
		href: "/docs/security-features",
		icon: <FaShieldAlt className="mr-2 h-4 w-4 hover:text-foreground" />,
		subsections: [
			{
				label: "2FA",
				href: "/docs/security-features/2fa",
			},
			{
				label: "Password Hashing",
				href: "/docs/security-features/password-hashing",
			},
			{
				label: "Session Security",
				href: "/docs/security-features/session-security",
			},
			{
				label: "Backup Codes",
				href: "/docs/security-features/backup-codes",
			},
		],
	},
	{
		label: "Additional",
		href: "/docs/additional",
		icon: <FaPlus className="mr-2 h-4 w-4 hover:text-foreground" />,
		subsections: [
			{
				label: "JWT Tokens",
				href: "/docs/additional/jwt-tokens",
			},
			{
				label: "CSRF Protection",
				href: "/docs/additional/csrf-protection",
			},
			{
				label: "Rate Limiting",
				href: "/docs/additional/rate-limiting",
			},
			{
				label: "Session Management",
				href: "/docs/additional/session-management",
			},
			{
				label: "Middleware",
				href: "/docs/additional/middleware",
			},
			{
				label: "API Polling",
				href: "/docs/additional/api-polling",
			},
		],
	},
];
