import { Suspense } from "react";

import DevicesSection from "./devices-section";
import DevicesSectionSkeleton from "@/components/skeletons/devices-section-skeleton";

export default function SessionsWrapper() {
	return (
		<Suspense fallback={<DevicesSectionSkeleton />}>
			<DevicesSection />
		</Suspense>
	);
}
