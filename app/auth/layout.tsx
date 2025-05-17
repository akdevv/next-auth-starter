import Image from "next/image";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen py-20 max-w-7xl mx-auto">
			<div className="hidden md:flex md:w-1/2 h-full p-5">
				<Image
					src="/images/auth-cover.png"
					alt="Auth Background"
					width={1000}
					height={1000}
					priority={true}
					className="object-cover rounded-lg"
				/>
			</div>
			<div className="flex-1 flex p-4 md:p-10 items-center justify-center">
				{children}
			</div>
		</div>
	);
}
