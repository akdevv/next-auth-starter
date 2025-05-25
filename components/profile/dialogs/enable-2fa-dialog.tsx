"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { MdOutlineContentCopy } from "react-icons/md";
import { FiSmartphone } from "react-icons/fi";
import { CiCircleCheck } from "react-icons/ci";
import { FaDownload, FaKey } from "react-icons/fa";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import { LuLoaderCircle } from "react-icons/lu";

interface TwoFactorSetupData {
	secret: string;
	qrCodeUrl: string;
	manualEntryKey: string;
	backupCodes: string[];
}

interface Enable2FADialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function Enable2FADialog({ open, onOpenChange }: Enable2FADialogProps) {
	const { data: session, update: updateSession } = useSession();

	const [setupData, setSetupData] = useState<TwoFactorSetupData | null>(null);
	const [showBackupCodes, setShowBackupCodes] = useState(false);
	const [backupCodesDownloaded, setBackupCodesDownloaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [verificationCode, setVerificationCode] = useState("");
	const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);

	useEffect(() => {
		if (open) {
			initializeSetup();
		}
	}, [open]);

	const initializeSetup = async () => {
		setIsLoading(true);

		try {
			const res = await fetch("/api/auth/2fa/setup", { method: "POST" });

			if (!res.ok) {
				toast.error("Failed to initialize setup!");
				throw new Error("Failed to initialize setup!");
			}

			const data = await res.json();
			setSetupData(data);
		} catch (error) {
			toast.error("Failed to initialize setup!");
			throw new Error("Failed to initialize setup!");
		} finally {
			setIsLoading(false);
		}
	};

	const verifyAndEnable = async () => {
		if (!verificationCode || !setupData) return;

		setIsLoading(true);
		try {
			console.log("verifying and enabling");
			const res = await fetch("/api/auth/2fa/verify-setup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					token: verificationCode,
					secret: setupData.secret,
				}),
			});
			console.log("res", res);

			const data = await res.json();
			console.log("data", data);
			if (data.error) {
				toast.error(data.error);
				throw new Error(data.error);
			}

			// Update session with twoFactorEnabled status
			await updateSession({
				...session,
				user: {
					...session?.user,
					twoFactorEnabled: true,
				},
			});

			// Close setup dialog and open complete dialog
			onOpenChange(false);
			setIsCompleteDialogOpen(true);
			toast.success("2FA enabled successfully!");
		} catch (error) {
			console.error("Error in verifyAndEnable:", error);
			toast.error("Failed to verify code!");
			throw new Error("Failed to verify code!");
		} finally {
			setIsLoading(false);
		}
	};

	const downloadBackupCodes = () => {
		if (!setupData) return;

		const content = setupData.backupCodes.join("\n");
		const blob = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "2fa-backup-codes.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		setBackupCodesDownloaded(true);
		toast.success("Backup codes downloaded!");
	};

	const completeSetup = () => {
		setIsCompleteDialogOpen(false);
		setSetupData(null);
		setVerificationCode("");
		setBackupCodesDownloaded(false);
		setShowBackupCodes(false);
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success("Copied to clipboard");
	};

	return (
		<>
			{/* Setup Dialog */}
			<AlertDialog open={open} onOpenChange={onOpenChange}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="font-bold">
							Setup Two-Factor Authentication
						</AlertDialogTitle>
						<AlertDialogDescription className="text-sm text-muted-foreground">
							Enable 2FA to add an additional layer of security to
							your account.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<div className="space-y-6">
						{setupData && (
							<>
								<div className="space-y-5">
									<div className="text-center space-y-1">
										<h3 className="text-lg font-semibold text-foreground/90">
											Step 1: Scan QR Code
										</h3>
										<div className="bg-white p-2 overflow-hidden rounded-2xl inline-block shadow-sm border border-border/50">
											<img
												src={
													setupData?.qrCodeUrl ||
													"https://placehold.co/400"
												}
												alt="2FA QR Code"
												className="w-48 h-48"
											/>
										</div>
									</div>

									<Separator />

									<div className="space-y-2">
										<h3 className="text-lg font-semibold text-foreground/90 flex items-center gap-2">
											<FiSmartphone className="h-5 w-5 text-primary" />
											Or enter manually
										</h3>
										<div className="space-y-1">
											<Label className="text-sm text-muted-foreground">
												Manual entry key:
											</Label>
											<div className="flex gap-2">
												<Input
													value={
														setupData?.manualEntryKey
													}
													readOnly
													className="font-mono text-sm bg-muted/50"
												/>
												<Button
													variant="outline"
													size="icon"
													onClick={() =>
														copyToClipboard(
															setupData?.secret
														)
													}
													className="shrink-0 hover:bg-muted/80 hover:text-foreground/80 cursor-pointer"
												>
													<MdOutlineContentCopy className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</div>

									<Separator />

									<div className="space-y-2">
										<h3 className="text-lg font-semibold text-foreground/90">
											Step 2: Enter verification code
										</h3>
										<div className="space-y-1">
											<Label className="text-sm text-muted-foreground">
												Enter the 6-digit code from your
												authenticator app:
											</Label>
											<Input
												placeholder="123456"
												maxLength={6}
												className="text-center font-mono text-lg tracking-widest bg-muted/50"
												value={verificationCode}
												onChange={(e) =>
													setVerificationCode(
														e.target.value
													)
												}
											/>
										</div>
									</div>
								</div>

								<AlertDialogFooter className="mt-6 gap-2">
									<AlertDialogCancel className="hover:bg-muted/80 hover:text-foreground/80 cursor-pointer">
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										className="cursor-pointer"
										onClick={verifyAndEnable}
										disabled={isLoading}
									>
										{isLoading ? (
											<>
												<LuLoaderCircle className="h-4 w-4 animate-spin" />
												Verifying...
											</>
										) : (
											"Enable 2FA"
										)}
									</AlertDialogAction>
								</AlertDialogFooter>
							</>
						)}
					</div>
				</AlertDialogContent>
			</AlertDialog>

			{/* Complete Dialog */}
			<AlertDialog
				open={isCompleteDialogOpen}
				onOpenChange={setIsCompleteDialogOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="font-bold">
							Two-Factor Authentication Enabled
						</AlertDialogTitle>
						<AlertDialogDescription className="text-sm text-muted-foreground">
							Your account is now protected with two-factor
							authentication
						</AlertDialogDescription>
					</AlertDialogHeader>

					<div className="space-y-6">
						<div className="text-center space-y-2">
							<CiCircleCheck className="h-12 w-12 text-green-600 mx-auto" />
							<h3 className="font-semibold text-lg">
								2FA Enabled Successfully!
							</h3>
						</div>
						<div className="space-y-4">
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<h4 className="font-semibold flex items-center gap-2">
										<FaKey className="h-4 w-4" />
										Backup Codes
									</h4>
									<Button
										variant="ghost"
										size="sm"
										className="cursor-pointer"
										onClick={() =>
											setShowBackupCodes(!showBackupCodes)
										}
									>
										{showBackupCodes ? (
											<LuEyeClosed className="h-4 w-4" />
										) : (
											<LuEye className="h-4 w-4" />
										)}
									</Button>
								</div>
								<p className="text-sm text-muted-foreground">
									Save these backup codes in a safe place. You
									can use them to access your account if you
									lose your authenticator device.
								</p>

								{showBackupCodes && setupData && (
									<div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg">
										{setupData.backupCodes.map(
											(code, index) => (
												<code
													key={index}
													className="text-sm font-mono"
												>
													{code}
												</code>
											)
										)}
									</div>
								)}
							</div>

							{!backupCodesDownloaded && (
								<p className="text-xs text-muted-foreground">
									Please download your backup codes before
									completing setup
								</p>
							)}
						</div>

						<AlertDialogFooter className="mt-6 gap-2">
							<Button
								variant="outline"
								onClick={downloadBackupCodes}
								className="hover:bg-muted/80 hover:text-foreground/80 cursor-pointer"
							>
								<FaDownload className="h-4 w-4 mr-2" />
								Download Backup Codes
							</Button>
							<AlertDialogAction
								onClick={completeSetup}
								className="cursor-pointer"
								disabled={!backupCodesDownloaded}
							>
								Complete Setup
							</AlertDialogAction>
						</AlertDialogFooter>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
