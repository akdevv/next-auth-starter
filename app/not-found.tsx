import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-6xl font-bold mb-4">404</h1>
				<h2 className="text-2xl font-semibold mb-8">Page Not Found</h2>

				<Button asChild className="px-10 py-5">
					<Link href="/">
						<IoIosArrowRoundBack className="text-xl" />
						Back to Home
					</Link>
				</Button>
			</div>
		</div>
	);
}
