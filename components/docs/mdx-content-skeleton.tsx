import { Skeleton } from "@/components/ui/skeleton";

export function MDXContentSkeleton() {
	return (
		<article className="max-w-5xl mx-auto px-2 mt-15">
			<div className="prose dark:prose-invert max-w-none">
				{/* Title skeleton */}
				<Skeleton className="h-10 w-3/4 mb-4 bg-muted" />

				{/* Description skeleton */}
				<Skeleton className="h-6 w-1/2 mb-8 bg-muted" />

				{/* Tags skeleton */}
				<div className="flex gap-2 mb-8">
					<Skeleton className="h-6 w-20 rounded-full bg-muted" />
					<Skeleton className="h-6 w-24 rounded-full bg-muted" />
					<Skeleton className="h-6 w-16 rounded-full bg-muted" />
				</div>

				<hr className="my-6" />

				{/* Content skeletons */}
				<div className="space-y-6">
					<Skeleton className="h-4 w-full bg-muted" />
					<Skeleton className="h-4 w-5/6 bg-muted" />
					<Skeleton className="h-4 w-4/6 bg-muted" />

					{/* Code block skeleton */}
					<div className="relative">
						<Skeleton className="h-32 w-full rounded-lg bg-muted" />
						<Skeleton className="absolute top-2 right-2 h-8 w-8 rounded-md bg-muted" />
					</div>

					<Skeleton className="h-4 w-3/4 bg-muted" />
					<Skeleton className="h-4 w-5/6 bg-muted" />

					{/* List skeletons */}
					<div className="space-y-2">
						<Skeleton className="h-4 w-4/5 bg-muted" />
						<Skeleton className="h-4 w-3/5 bg-muted" />
						<Skeleton className="h-4 w-2/5 bg-muted" />
					</div>
				</div>
			</div>
		</article>
	);
}
