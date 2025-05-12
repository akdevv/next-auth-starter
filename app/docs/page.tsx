import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default function Docs() {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<main className="flex-1 flex flex-col items-center justify-center mx-auto max-w-screen-2xl px-4">
				<h1 className="text-4xl font-bold">Docs</h1>
			</main>
			<Footer />
		</div>
	);
}
