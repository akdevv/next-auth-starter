"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthSeparator from "@/components/auth/auth-seprator";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="mx-auto w-full max-w-md">
			<div className="text-center md:text-left mb-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-2">
					Welcome back
				</h1>
				<p className="text-muted-foreground">
					Please enter your details to sign in
				</p>
			</div>

			<form action="" className="space-y-6">
				<div className="space-y-2">
					<input
						id="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent"
					/>
				</div>

				<div className="space-y-2">
					<input
						id="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full border border-border p-3 rounded-md focus:outline-none focus:none focus:ring-transparent"
					/>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Checkbox
							id="remember"
							checked={true}
							onCheckedChange={() => {}}
							className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary cursor-pointer"
						/>
						<label
							htmlFor="remember"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
						>
							Remember me
						</label>
					</div>

					<Link
						href="/auth/forgot-password"
						className="text-sm text-primary hover:underline"
					>
						Forgot password?
					</Link>
				</div>

				<Button
					type="submit"
					className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
				>
					Log in
				</Button>

				<AuthSeparator text="Or continue with" />

				{/* Social Login Buttons */}
				<div className="flex items-center justify-center space-x-4">
					<Button className="w-1/2 py-5 bg-secondary/30 text-secondary-foreground border border-secondary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 cursor-pointer">
						<FaGoogle className="w-5 h-5" /> Google
					</Button>

					<Button className="w-1/2 py-5 bg-secondary/30 text-secondary-foreground border border-secondary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 cursor-pointer">
						<FaGithub className="w-5 h-5" /> Github
					</Button>
				</div>

				{/* Register Link */}
				<div className="text-center mt-6">
					<p className="text-sm text-muted-foreground">
						Don't have an account?{" "}
						<Link
							href="/auth/register"
							className="text-primary hover:underline"
						>
							Register
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
}
