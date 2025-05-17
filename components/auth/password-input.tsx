"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function PasswordInput({
	register,
	isPending,
	errors,
}: {
	register: UseFormRegister<any>;
	isPending: boolean;
	errors: FieldErrors<any>;
}) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="w-full flex items-center justify-between border border-border p-3 gap-2 rounded-md focus:outline-none focus:none focus:ring-transparent">
			<input
				{...register("password")}
				type={showPassword ? "text" : "password"}
				placeholder="Password"
				disabled={isPending}
				className={cn(
					"w-full focus:outline-none focus:none focus:ring-transparent",
					errors.password && "border-red-700"
				)}
			/>
			<button
				type="button"
				onClick={() => setShowPassword(!showPassword)}
				className="text-muted-foreground cursor-pointer"
			>
				{showPassword ? (
					<LuEyeClosed className="w-5 h-5" />
				) : (
					<LuEye className="w-5 h-5" />
				)}
			</button>
		</div>
	);
}
