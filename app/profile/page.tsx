"use client";

import { useSession, signOut } from "next-auth/react";

export default function Profile() {
	const { data: session, status } = useSession();

	return (
		<div>
			<h1>Profile</h1>
			<p>{session?.user?.name}</p>
			<p className="text-gray-600">{session?.user?.email}</p>
			<button onClick={() => signOut()}>Sign out</button>
		</div>
	);
}
