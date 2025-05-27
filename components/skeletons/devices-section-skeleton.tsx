import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function DevicesSectionSkeleton() {
	return (
		<div className="bg-muted/40 rounded-xl p-6 w-full">
			<div className="flex items-center justify-between mb-6">
				<div>
					<Skeleton className="h-7 w-40 mb-2 bg-muted" />
					<Skeleton className="h-4 w-64 bg-muted" />
				</div>
				<Skeleton className="h-10 w-32 bg-muted" />
			</div>
			<div className="rounded-xl border bg-background">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-3">Device</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Last Active</TableHead>
							<TableHead className="text-right pr-3">
								Action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[1, 2, 3].map((index) => (
							<TableRow key={index}>
								<TableCell className="pl-3">
									<div className="flex flex-col gap-1">
										<Skeleton className="h-5 w-32 bg-muted" />
										<Skeleton className="h-3 w-24 bg-muted" />
										<Skeleton className="h-4 w-16 mt-1 bg-muted" />
									</div>
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-24 bg-muted" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-28 bg-muted" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-8 w-16 ml-auto bg-muted" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
