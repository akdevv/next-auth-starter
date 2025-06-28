import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function ProfileLoading() {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<main className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-10 mx-auto w-full max-w-screen-2xl px-4 pt-24 pb-10">
				{/* Sidebar skeleton */}
				<div className="w-full lg:w-64 lg:flex-shrink-0">
					<div className="bg-gray-800/20 border border-gray-700/30 rounded-lg p-4 space-y-3">
						{/* Sidebar navigation items */}
						<Skeleton className="w-full h-10 rounded-md bg-gray-700/50" />
						<Skeleton className="w-full h-10 rounded-md bg-gray-700/40" />
						<Skeleton className="w-full h-10 rounded-md bg-gray-700/40" />
					</div>
				</div>

				{/* Main Content skeleton */}
				<div className="flex border border-gray-700/30 rounded-lg p-4 lg:p-8 w-full max-w-4xl h-fit bg-gray-800/10">
					<div className="w-full space-y-6">
						{/* Header section */}
						<div className="space-y-4">
							<Skeleton className="h-8 w-48 bg-gray-700/50" />
							<Skeleton className="h-4 w-96 bg-gray-600/40" />
						</div>

						{/* Form/Content section */}
						<div className="space-y-6">
							{/* Input group 1 */}
							<div className="space-y-2">
								<Skeleton className="h-4 w-24 bg-gray-600/50" />
								<Skeleton className="h-10 w-full bg-gray-700/50 rounded-md" />
							</div>

							{/* Input group 2 */}
							<div className="space-y-2">
								<Skeleton className="h-4 w-32 bg-gray-600/50" />
								<Skeleton className="h-10 w-full bg-gray-700/50 rounded-md" />
							</div>

							{/* Input group 3 */}
							<div className="space-y-2">
								<Skeleton className="h-4 w-28 bg-gray-600/50" />
								<Skeleton className="h-10 w-full bg-gray-700/50 rounded-md" />
							</div>

							{/* Button section */}
							<div className="flex gap-4 pt-4">
								<Skeleton className="h-10 w-24 bg-gray-700/50 rounded-md" />
								<Skeleton className="h-10 w-20 bg-gray-600/40 rounded-md" />
							</div>
						</div>

						{/* Additional content sections */}
						<div className="space-y-4 pt-6 border-t border-gray-700/30">
							<Skeleton className="h-6 w-40 bg-gray-700/50" />
							<div className="space-y-3">
								<Skeleton className="h-16 w-full bg-gray-700/40 rounded-lg" />
								<Skeleton className="h-16 w-full bg-gray-700/40 rounded-lg" />
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
