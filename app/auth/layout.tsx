export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen">
			<div className="hidden md:flex md:w-1/2 h-full p-5">
				<div className="h-full w-full bg-secondary rounded-md"></div>
			</div>
			<div className="flex-1 flex p-4 md:p-10 items-center justify-center">
				{children}
			</div>
		</div>
	);
}
