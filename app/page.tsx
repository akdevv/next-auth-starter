import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1>Hello</h1>
			<Link href="/profile">Profile</Link>
			<Link href="/auth/login">Login</Link>
			<Link href="/auth/register">Register</Link>
		</div>
	);
}
