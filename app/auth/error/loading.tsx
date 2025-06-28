import { Skeleton } from "@/components/ui/skeleton";

export default function AuthErrorLoading() {
	return (
		<div className="mx-auto w-full max-w-md">
			{/* Header section skeleton */}
			<div className="text-center md:text-left mb-8">
				<Skeleton className="h-10 w-80 mb-2 mx-auto md:mx-0 bg-gray-700/50" />
				<Skeleton className="h-5 w-72 mx-auto md:mx-0 bg-gray-700/50" />
			</div>

			{/* Error message box skeleton */}
			<div className="bg-gray-800/30 border border-gray-700/50 p-6 rounded-lg mb-8">
				<div className="flex items-start gap-3">
					<Skeleton className="w-6 h-6 mt-0.5 flex-shrink-0 rounded-full bg-gray-600/50" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-full bg-gray-600/50" />
						<Skeleton className="h-4 w-3/4 bg-gray-600/50" />
					</div>
				</div>
			</div>

			{/* Buttons section skeleton */}
			<div className="space-y-4">
				<Skeleton className="w-full h-14 rounded-md bg-gray-700/50" />
				<Skeleton className="w-full h-14 rounded-md bg-gray-700/50" />
			</div>
		</div>
	);
}
