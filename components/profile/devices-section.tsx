"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { SessionInfo } from "@/lib/types/session";
import { useState, useEffect, useTransition } from "react";
import { formatLastActive, clearSessionCookie } from "@/lib/session-helper";

import {
	FiMonitor,
	FiTablet,
	FiSmartphone,
	FiLoader,
	FiMapPin,
} from "react-icons/fi";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IoMdRefresh } from "react-icons/io";

export default function DevicesSection() {
	const router = useRouter();

	const [logoutSessionDialogOpen, setLogoutSessionDialogOpen] =
		useState(false);
	const [logoutAllDevicesDialogOpen, setLogoutAllDevicesDialogOpen] =
		useState(false);
	const [sessions, setSessions] = useState<SessionInfo[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [revokingSessionId, setRevokingSessionId] = useState<string | null>(
		null
	);
	const [pollingInterval, setPollingInterval] =
		useState<NodeJS.Timeout | null>(null);

	const [isPending, startTransition] = useTransition();

	const fetchSessions = async () => {
		try {
			const response = await fetch("/api/sessions", {
				cache: "no-store",
			});
			if (!response.ok) throw new Error("Failed to fetch sessions");

			const data = await response.json();
			const processedSessions = data.sessions.map((session: any) => ({
				...session,
				lastActive: new Date(session.lastActive),
				createdAt: new Date(session.createdAt),
			}));

			if (processedSessions.length > 0) {
				processedSessions[0].isCurrent = true;
			}

			setSessions(processedSessions);
		} catch (error) {
			console.error("Failed to fetch sessions:", error);
			throw error;
		}
	};

	useEffect(() => {
		const loadSessions = async () => {
			setIsLoading(true);
			await fetchSessions();
			setIsLoading(false);
		};
		loadSessions();
	}, []);

	const refreshSessions = async () => {
		setIsRefreshing(true);
		await fetchSessions();
		setIsRefreshing(false);
		toast.success("Sessions refreshed");
	};

	const getDeviceIcon = (
		deviceName: string | null,
		userAgent: string | null
	) => {
		const device =
			deviceName?.toLowerCase() || userAgent?.toLowerCase() || "";

		if (
			device.includes("mobile") ||
			device.includes("android") ||
			device.includes("iphone")
		) {
			return <FiSmartphone className="h-4 w-4" />;
		}
		if (device.includes("ipad") || device.includes("tablet")) {
			return <FiTablet className="h-4 w-4" />;
		}
		return <FiMonitor className="h-4 w-4" />;
	};

	const checkSessionValidity = async () => {
		try {
			const response = await fetch("/api/sessions/check", {
				cache: "no-store",
			});

			if (!response.ok) {
				// Session is invalid or expired, clear cookies and stop polling
				clearSessionCookie();
				if (pollingInterval) {
					clearInterval(pollingInterval);
					setPollingInterval(null);
				}
				router.refresh();
				toast.error("Your session has expired. Please log in again.");
				return false;
			}
			return true;
		} catch (error) {
			console.error("Failed to check session validity:", error);
			return false;
		}
	};

	const startPolling = () => {
		// Clear any existing interval
		if (pollingInterval) {
			clearInterval(pollingInterval);
		}

		// Start new polling interval
		const interval = setInterval(checkSessionValidity, 30000); // 30 seconds
		setPollingInterval(interval);
	};

	// Cleanup polling on component unmount
	useEffect(() => {
		return () => {
			if (pollingInterval) {
				clearInterval(pollingInterval);
			}
		};
	}, [pollingInterval]);

	// Revoke specific session
	const handleRevokeSession = async (sessionId: string) => {
		setRevokingSessionId(sessionId);
		startTransition(async () => {
			try {
				const res = await fetch(`/api/sessions/${sessionId}`, {
					method: "DELETE",
					body: JSON.stringify({
						expireNow: true,
					}),
				});

				const result = await res.json();

				if (!res.ok) {
					throw new Error(result.error || "Failed to revoke session");
				}

				toast.success("Session revoked successfully");
				await fetchSessions(); // Refresh the list

				// Start polling after revoking a session
				startPolling();
			} catch (error) {
				console.error("Failed to revoke session:", error);
				toast.error(
					error instanceof Error
						? error.message
						: "Failed to revoke session"
				);
			} finally {
				setRevokingSessionId(null);
			}
		});
	};

	// Revoke all other sessions
	const handleLogoutAllDevices = async () => {
		startTransition(async () => {
			try {
				const res = await fetch("/api/sessions/revoke-all", {
					method: "POST",
					body: JSON.stringify({
						expireNow: true,
					}),
				});

				const result = await res.json();

				if (!res.ok) {
					throw new Error(
						result.error || "Failed to revoke sessions"
					);
				}

				toast.success(
					result.message || "All other sessions revoked successfully"
				);

				// Start polling after revoking all sessions
				startPolling();

				router.refresh();
			} catch (error) {
				console.error("Failed to revoke all sessions:", error);
				toast.error(
					error instanceof Error
						? error.message
						: "Failed to revoke sessions"
				);
			}
		});
	};

	const getSessionStatus = (session: SessionInfo) => {
		if (session.isCurrent) return "current";
		if (session.isRevoked) return "expired";
		return "active";
	};

	const formatRevocationInfo = (session: SessionInfo) => {
		if (!session.isRevoked || !session.revokedAt) return null;

		const revokedDate = new Date(session.revokedAt);
		const now = new Date();
		const diffInMinutes = Math.floor(
			(now.getTime() - revokedDate.getTime()) / (1000 * 60)
		);

		if (diffInMinutes < 1) return "Just now";
		if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
		if (diffInMinutes < 1440)
			return `${Math.floor(diffInMinutes / 60)}h ago`;
		return format(revokedDate, "MMM d, yyyy");
	};

	if (isLoading) {
		return (
			<div className="rounded-xl border bg-background w-full">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-3">Device</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Last Active</TableHead>
							<TableHead className="text-right pr-3">
								Action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableRow>
						<TableCell colSpan={4} className="text-center p-5">
							<div className="flex flex-col items-center gap-1 mt-5">
								<FiLoader className="h-4 w-4 animate-spin text-muted-foreground" />
								<p className="text-muted-foreground text-sm">
									Loading sessions...
								</p>
							</div>
						</TableCell>
					</TableRow>
				</Table>
			</div>
		);
	}

	return (
		<div className="bg-muted/40 rounded-xl p-4 sm:p-6 w-full">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
				<div>
					<h2 className="text-xl font-bold">Active sessions</h2>
					<p className="text-muted-foreground text-sm">
						These are the devices where you&apos;re currently logged
						in
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						onClick={() => refreshSessions()}
						disabled={isRefreshing}
						className="hover:text-muted-foreground/80 hover:bg-background cursor-pointer"
					>
						{isRefreshing ? (
							<FiLoader className="h-4 w-4 animate-spin" />
						) : (
							<IoMdRefresh className="h-4 w-4" />
						)}
					</Button>
					<AlertDialog
						open={logoutAllDevicesDialogOpen}
						onOpenChange={setLogoutAllDevicesDialogOpen}
					>
						<AlertDialogTrigger asChild>
							<Button
								disabled={isPending}
								className="text-chart-4 bg-background border border-chart-4/20 hover:text-chart-4/80 hover:bg-chart-4/10 cursor-pointer text-sm sm:text-base"
							>
								{isPending ? (
									<FiLoader className="h-4 w-4 animate-spin" />
								) : (
									"Logout of all devices"
								)}
							</Button>
						</AlertDialogTrigger>

						<AlertDialogContent className="max-w-[90vw] sm:max-w-md">
							<AlertDialogHeader>
								<AlertDialogTitle>
									Logout of all devices
								</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogDescription>
								Are you sure you want to logout of all devices?
							</AlertDialogDescription>
							<AlertDialogFooter>
								<AlertDialogCancel className="hover:text-foreground/80 transition-all duration-300 cursor-pointer">
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleLogoutAllDevices}
									className="bg-chart-4 text-white hover:bg-chart-4/80 cursor-pointer"
								>
									Logout
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
			<div className="rounded-xl border bg-background overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-3">Device</TableHead>
							<TableHead className="hidden sm:table-cell">
								Location
							</TableHead>
							<TableHead className="hidden sm:table-cell">
								Last Active
							</TableHead>
							<TableHead className="text-right pr-3">
								Action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sessions.length === 0 ? (
							<TableCell colSpan={4} className="text-center p-5">
								<p className="text-muted-foreground">
									No active sessions
								</p>
								<p className="text-xs text-muted-foreground">
									You&apos;re only signed in on this device.
								</p>
							</TableCell>
						) : (
							<>
								{/* Active Sessions */}
								{sessions
									.filter(
										(session) =>
											getSessionStatus(session) ===
												"active" ||
											getSessionStatus(session) ===
												"current"
									)
									.map((session) => (
										<TableRow key={session.id}>
											<TableCell className="pl-3">
												<div className="flex flex-col gap-1">
													<div className="flex items-center gap-2">
														{getDeviceIcon(
															session.deviceName,
															session.userAgent
														)}
														<span className="font-medium">
															{session.deviceName}
														</span>
													</div>
													<div className="flex flex-col sm:hidden text-xs text-muted-foreground">
														<span>
															{session.location ||
																"Unknown"}
														</span>
														<span>
															{formatLastActive(
																session.lastActive
															)}
														</span>
													</div>
													<span className="text-xs text-muted-foreground">
														{session.location && (
															<span className="flex items-center gap-1">
																<FiMapPin className="h-3 w-3" />
																{
																	session.location
																}
															</span>
														)}
													</span>
													{session.isCurrent && (
														<Badge
															variant="secondary"
															className="mt-1 bg-yellow-100 text-yellow-800 border-none px-2 py-0.5 rounded"
														>
															Current
														</Badge>
													)}
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												{session.location || "Unknown"}
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												{formatLastActive(
													session.lastActive
												)}
											</TableCell>
											<TableCell className="text-right">
												{!session.isCurrent && (
													<AlertDialog
														open={
															logoutSessionDialogOpen
														}
														onOpenChange={
															setLogoutSessionDialogOpen
														}
													>
														<AlertDialogTrigger
															asChild
														>
															<Button
																disabled={
																	isPending
																}
																className="text-chart-4 bg-transparent hover:bg-transparent hover:underline hover:underline-offset-4 px-2 cursor-pointer"
															>
																{revokingSessionId ===
																session.id ? (
																	<FiLoader className="h-4 w-4 animate-spin" />
																) : (
																	"Logout"
																)}
															</Button>
														</AlertDialogTrigger>

														<AlertDialogContent className="max-w-[90vw] sm:max-w-md">
															<AlertDialogHeader>
																<AlertDialogTitle>
																	Logout
																</AlertDialogTitle>
																<AlertDialogDescription>
																	Are you sure
																	you want to
																	logout?
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel className="hover:text-foreground/80 transition-all duration-300 cursor-pointer">
																	Cancel
																</AlertDialogCancel>
																<AlertDialogAction
																	onClick={() =>
																		handleRevokeSession(
																			session.id
																		)
																	}
																	className="cursor-pointer"
																>
																	Logout
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												)}
											</TableCell>
										</TableRow>
									))}

								{/* Expired Sessions */}
								{sessions.filter(
									(session) =>
										getSessionStatus(session) === "expired"
								).length > 0 && (
									<>
										<TableRow>
											<TableCell
												colSpan={4}
												className="bg-muted/30"
											>
												<p className="text-sm text-muted-foreground py-2">
													Revoked Sessions
												</p>
											</TableCell>
										</TableRow>
										{sessions
											.filter(
												(session) =>
													getSessionStatus(
														session
													) === "expired"
											)
											.map((session) => (
												<TableRow
													key={session.id}
													className="opacity-60 hover:opacity-80 transition-opacity"
												>
													<TableCell className="pl-3">
														<div className="flex flex-col gap-1">
															<div className="flex items-center gap-2">
																{getDeviceIcon(
																	session.deviceName,
																	session.userAgent
																)}
																<span className="font-medium text-muted-foreground">
																	{
																		session.deviceName
																	}
																</span>
															</div>
															<div className="flex flex-col sm:hidden text-xs text-muted-foreground">
																<span>
																	{session.location ||
																		"Unknown"}
																</span>
																<span>
																	{formatLastActive(
																		session.lastActive
																	)}
																</span>
																{formatRevocationInfo(
																	session
																) && (
																	<span>
																		Revoked{" "}
																		{formatRevocationInfo(
																			session
																		)}
																	</span>
																)}
															</div>
															<span className="text-xs text-muted-foreground">
																{session.location && (
																	<span className="flex items-center gap-1">
																		<FiMapPin className="h-3 w-3" />
																		{
																			session.location
																		}
																	</span>
																)}
															</span>
															<Badge
																variant="secondary"
																className="mt-1 bg-gray-100 text-gray-600 border-none px-2 py-0.5 rounded"
															>
																Revoked
															</Badge>
														</div>
													</TableCell>
													<TableCell className="hidden sm:table-cell text-muted-foreground">
														{session.location ||
															"Unknown"}
													</TableCell>
													<TableCell className="hidden sm:table-cell text-muted-foreground">
														<div className="flex flex-col gap-1">
															<span>
																{formatLastActive(
																	session.lastActive
																)}
															</span>
															{formatRevocationInfo(
																session
															) && (
																<span className="text-xs">
																	Revoked{" "}
																	{formatRevocationInfo(
																		session
																	)}
																</span>
															)}
														</div>
													</TableCell>
													<TableCell className="text-right">
														<span className="text-xs text-muted-foreground">
															Session revoked
														</span>
													</TableCell>
												</TableRow>
											))}
									</>
								)}
							</>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
