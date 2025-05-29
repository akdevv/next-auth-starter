"use client";

import { useSessionValidator } from "@/hooks/use-session-validator";

export function SessionValidator() {
	useSessionValidator();
	return null; // This component doesn't render anything
}
