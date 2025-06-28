import { Skeleton } from "@/components/ui/skeleton";

export default function TwoFactorLoading() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="mx-auto w-full max-w-md">
				<div className="space-y-8">
					{/* Header section with shield icon */}
					<div className="text-center md:text-left space-y-4">
						<Skeleton className="w-16 h-16 mx-auto md:mx-0 rounded-full bg-gray-700/50" />
						<div>
							<Skeleton className="h-10 w-80 mb-2 mx-auto md:mx-0 bg-gray-700/50" />
							<Skeleton className="h-5 w-72 mx-auto md:mx-0 bg-gray-700/50" />
						</div>
					</div>

					{/* Form section */}
					<div className="space-y-6">
						{/* Input label with icon */}
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Skeleton className="w-5 h-5 rounded bg-gray-600/50" />
								<Skeleton className="h-4 w-32 bg-gray-600/50" />
							</div>

							{/* Input field */}
							<Skeleton className="w-full h-12 rounded-md bg-gray-700/50" />

							{/* Helper text */}
							<Skeleton className="h-3 w-64 mx-auto bg-gray-600/40" />
						</div>

						{/* Submit button */}
						<Skeleton className="w-full h-14 rounded-md bg-gray-700/50" />
					</div>

					{/* Toggle button section */}
					<div className="space-y-6">
						<Skeleton className="w-full h-10 rounded-md bg-gray-700/40" />
					</div>
				</div>
			</div>
		</div>
	);
}
