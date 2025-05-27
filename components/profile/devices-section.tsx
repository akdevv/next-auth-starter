"use client";

import { useState, useEffect } from "react";
import { SessionInfo } from "@/server/actions/session";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoutSessionDialog } from "./dialogs/logout-session-dialgo";
import LogoutAllDevicesDialog from "./dialogs/logout-all-devices-dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { IoMdRefresh } from "react-icons/io";

export default function DevicesSection() {
	const [logoutSessionDialogOpen, setLogoutSessionDialogOpen] =
		useState(false);
	const [logoutAllDevicesDialogOpen, setLogoutAllDevicesDialogOpen] =
		useState(false);
	const [sessions, setSessions] = useState<SessionInfo[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

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

	const formatLastActive = (date: Date) => {
		const now = new Date();
		const diffInMinutes = Math.floor(
			(now.getTime() - date.getTime()) / (1000 * 60)
		);

		if (diffInMinutes < 1) return "Just now";
		if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
		if (diffInMinutes < 1440)
			return `${Math.floor(diffInMinutes / 60)}h ago`;
		return format(date, "MMM d, yyyy");
	};

	const activeSessions = sessions.filter((session) => !session.isCurrent);
	const currentSession = sessions.find((session) => session.isCurrent);

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
		<div className="bg-muted/40 rounded-xl p-6 w-full">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-xl font-bold">Active sessions</h2>
					<p className="text-muted-foreground text-sm">
						These are the devices where you're currently logged in
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
					<Button
						onClick={() => setLogoutAllDevicesDialogOpen(true)}
						className="text-chart-4 bg-background border border-chart-4/20 hover:text-chart-4/80 hover:bg-chart-4/10 cursor-pointer"
					>
						Logout of all devices
					</Button>
				</div>
			</div>
			<div className="rounded-xl border bg-background">
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
					<TableBody>
						{sessions.length === 0 ? (
							<TableCell colSpan={4} className="text-center p-5">
								<p className="text-muted-foreground">
									No active sessions
								</p>
								<p className="text-xs text-muted-foreground">
									You're only signed in on this device.
								</p>
							</TableCell>
						) : (
							sessions?.map((session) => (
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
											<span className="text-xs text-muted-foreground">
												{currentSession?.location && (
													<span className="flex items-center gap-1">
														<FiMapPin className="h-3 w-3" />
														{
															currentSession.location
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
									<TableCell>
										{session.location || "Unknown"}
									</TableCell>
									<TableCell>
										{formatLastActive(session.lastActive)}
									</TableCell>
									<TableCell className="text-right">
										{!session.isCurrent && (
											<Button
												onClick={() =>
													setLogoutSessionDialogOpen(
														true
													)
												}
												className="text-chart-4 bg-transparent hover:bg-transparent hover:underline hover:underline-offset-4 px-2 cursor-pointer"
											>
												Logout
											</Button>
										)}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<LogoutAllDevicesDialog
				open={logoutAllDevicesDialogOpen}
				onOpenChange={setLogoutAllDevicesDialogOpen}
			/>
			<LogoutSessionDialog
				open={logoutSessionDialogOpen}
				onOpenChange={setLogoutSessionDialogOpen}
			/>
		</div>
	);
}
