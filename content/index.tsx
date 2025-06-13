import { FaDatabase } from "react-icons/fa6";
import { FaUnlock, FaTools } from "react-icons/fa";
import { IoExtensionPuzzle } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import { FaServer } from "react-icons/fa";

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
			{
				label: "Understanding Tech Stack",
				href: "/docs/getting-started/tech-stack",
			},
			{
				label: "Development Workflow",
				href: "/docs/getting-started/development-workflow",
			},
			{
				label: "Common Dev Commands",
				href: "/docs/getting-started/common-commands",
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
			{
				label: "Email Verification System",
				href: "/docs/auth/email-verification",
			},
			{
				label: "Session Management",
				href: "/docs/auth/session-management",
			},
			{
				label: "Password Reset Flow",
				href: "/docs/auth/password-reset",
			},
			{
				label: "Social Login Integration",
				href: "/docs/auth/social-login",
			},
			{
				label: "Authentication Error Handling",
				href: "/docs/auth/error-handling",
			},
			{
				label: "Security Best Practices",
				href: "/docs/auth/security-best-practices",
			},
		],
	},
	{
		label: "Database & Backend",
		href: "/docs/db-and-backend",
		icon: <FaDatabase className="mr-2 h-4 w-4 hover:text-foreground" />,
		subsections: [
			{
				label: "Database Schema Overview",
				href: "/docs/db-and-backend/schema-overview",
			},
			{
				label: "Prisma Configuration",
				href: "/docs/db-and-backend/prisma-config",
			},
			{
				label: "Database Migrations",
				href: "/docs/db-and-backend/migrations",
			},
			{
				label: "User Model Structure",
				href: "/docs/db-and-backend/user-model",
			},
			{
				label: "Session Management",
				href: "/docs/db-and-backend/session-management",
			},
			{
				label: "Backup Codes System",
				href: "/docs/db-and-backend/backup-codes",
			},
			{
				label: "Two-Factor Authentication Storage",
				href: "/docs/db-and-backend/2fa-storage",
			},
		],
	},
	{
		label: "Auth Logic & Middleware",
		href: "/docs/auth-logic-middleware",
		icon: (
			<IoExtensionPuzzle className="mr-2 h-4 w-4 hover:text-foreground" />
		),
		subsections: [
			{
				label: "Route Protection",
				href: "/docs/auth-logic-middleware/route-protection",
			},
			{
				label: "Authentication Flow",
				href: "/docs/auth-logic-middleware/auth-flow",
			},
			{
				label: "Session Validation",
				href: "/docs/auth-logic-middleware/session-validation",
			},
			{
				label: "Token Management",
				href: "/docs/auth-logic-middleware/token-management",
			},
			{
				label: "Error Handling",
				href: "/docs/auth-logic-middleware/error-handling",
			},
			{
				label: "Security Headers",
				href: "/docs/auth-logic-middleware/security-headers",
			},
			{
				label: "Rate Limiting",
				href: "/docs/auth-logic-middleware/rate-limiting",
			},
		],
	},
	{
		label: "Email Features",
		href: "/docs/email-features",
		icon: (
			<MdMarkEmailUnread className="mr-2 h-4 w-4 hover:text-foreground" />
		),
		subsections: [
			{
				label: "Email Verification System",
				href: "/docs/email-features/verification-system",
			},
			{
				label: "Password Reset Emails",
				href: "/docs/email-features/password-reset-emails",
			},
			{
				label: "Two-Factor Authentication Emails",
				href: "/docs/email-features/2fa-emails",
			},
			{
				label: "Email Templates",
				href: "/docs/email-features/email-templates",
			},
			{
				label: "Email Service Configuration",
				href: "/docs/email-features/service-config",
			},
			{
				label: "Email Rate Limiting",
				href: "/docs/email-features/rate-limiting",
			},
		],
	},
	{
		label: "Security Features",
		href: "/docs/security-features",
		icon: <FaShieldAlt className="mr-2 h-4 w-4 hover:text-foreground" />,
		subsections: [
			{
				label: "Two-Factor Authentication",
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
			{
				label: "Rate Limiting",
				href: "/docs/security-features/rate-limiting",
			},
			{
				label: "Security Headers",
				href: "/docs/security-features/security-headers",
			},
			{
				label: "CSRF Protection",
				href: "/docs/security-features/csrf-protection",
			},
		],
	},
	{
		label: "API Documentation",
		href: "/docs/api",
		icon: <FaServer className="mr-2 h-4 w-4 hover:text-foreground" />,
		subsections: [
			{
				label: "Authentication Endpoints",
				href: "/docs/api/auth-endpoints",
			},
			{
				label: "User Management Endpoints",
				href: "/docs/api/user-endpoints",
			},
			{
				label: "Two-Factor Authentication Endpoints",
				href: "/docs/api/2fa-endpoints",
			},
			{
				label: "Email Verification Endpoints",
				href: "/docs/api/email-verification-endpoints",
			},
			{
				label: "Session Management Endpoints",
				href: "/docs/api/session-endpoints",
			},
		],
	},
];
