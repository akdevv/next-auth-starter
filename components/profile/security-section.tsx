"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MdLockOpen, MdOutlineShield } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { UpdatePasswordDialog } from "./dialogs/update-password-dialog";
import { useState } from "react";

export default function SecuritySection() {
	const { data: session } = useSession();
	const [updatePasswordDialogOpen, setUpdatePasswordDialogOpen] =
		useState(false);

	const openUpdatePasswordDialog = () => {
		setUpdatePasswordDialogOpen(true);
	};

	return (
		<section className="flex flex-col w-full space-y-4 lg:space-y-6">
			<div className="flex flex-col border border-border rounded-lg p-3 sm:p-4 lg:p-5 w-full h-full bg-secondary/10">
				<div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
					<div className="flex flex-col space-y-2">
						<h2 className="text-base sm:text-lg lg:text-xl font-semibold">
							Update Password
						</h2>
						<p className="text-xs sm:text-sm text-muted-foreground">
							Update your password to keep your account secure.
						</p>
					</div>
					<Button
						onClick={openUpdatePasswordDialog}
						className="w-full sm:w-auto flex items-center justify-center gap-2 bg-background text-foreground border border-border hover:bg-foreground/5 hover:text-foreground/60 cursor-pointer"
					>
						<MdLockOpen className="w-4 h-4" />
						Change Password
					</Button>
				</div>

				<div className="bg-muted/30 rounded-xl p-3 sm:p-4 mt-4">
					<div className="flex items-center space-x-3">
						<div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/10 flex items-center justify-center">
							<MdLockOpen className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
						</div>
						<div>
							<p className="text-xs sm:text-sm font-medium">
								Password strength
							</p>
							<p className="text-[10px] sm:text-xs text-muted-foreground">
								Your password was last updated{" "}
								{session?.user?.lastPasswordUpdate
									? formatDistanceToNow(
											new Date(
												session?.user?.lastPasswordUpdate
											)
										)
									: "never"}
								.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col border border-border rounded-lg p-3 sm:p-4 lg:p-5 w-full h-full bg-secondary/10">
				<div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
					<div className="flex flex-col space-y-2">
						<h2 className="text-base sm:text-lg lg:text-xl font-semibold">
							Two-Factor Authentication
						</h2>
						<p className="text-xs sm:text-sm text-muted-foreground">
							Add an extra layer of security to your account.
						</p>
					</div>
					{!true ? (
						<Button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer">
							<MdOutlineShield className="w-4 h-4" />
							Enable 2FA
						</Button>
					) : (
						<Button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-background text-foreground border border-border hover:bg-foreground/5 hover:text-foreground/60 cursor-pointer">
							<MdOutlineShield className="w-4 h-4" />
							Disable 2FA
						</Button>
					)}
				</div>

				{!true ? (
					<div className="bg-muted/30 rounded-xl p-3 sm:p-4 mt-4">
						<div className="flex items-center space-x-3">
							<div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-chart-3/20 flex items-center justify-center">
								<MdOutlineShield className="h-4 w-4 sm:h-5 sm:w-5 text-chart-3" />
							</div>
							<div>
								<p className="text-xs sm:text-sm font-medium">
									Two-factor authentication is active
								</p>
								<p className="text-[10px] sm:text-xs text-muted-foreground">
									Your account is protected by an
									authentication app
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className="bg-muted/30 rounded-xl p-3 sm:p-4 mt-4">
						<div className="flex items-center space-x-3">
							<div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/10 flex items-center justify-center">
								<MdOutlineShield className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
							</div>
							<div>
								<p className="text-xs sm:text-sm font-medium">
									Two-factor authentication is not enabled
								</p>
								<p className="text-[10px] sm:text-xs text-muted-foreground">
									Add an extra layer of security to your
									account
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Dialogs */}
			<UpdatePasswordDialog
				open={updatePasswordDialogOpen}
				onOpenChange={setUpdatePasswordDialogOpen}
			/>
		</section>
	);
}
