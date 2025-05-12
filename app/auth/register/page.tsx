"use client";

import { signIn } from "next-auth/react";

export default function Register() {
	const googleRegister = async () => {
		await signIn("google", { callbackUrl: "/profile" });
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-black text-white">
			<button onClick={googleRegister}>Register with Google</button>
		</div>
	);
}
