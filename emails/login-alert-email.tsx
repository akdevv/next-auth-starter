import {
	Html,
	Head,
	Preview,
	Body,
	Container,
	Text,
	Section,
	Button,
} from "@react-email/components";

export default function LoginAlertEmail({
	deviceName = "Chrome on Windows",
	checkActivityUrl = "#",
}: {
	deviceName?: string;
	checkActivityUrl?: string;
}) {
	return (
		<Html>
			<Head />
			<Preview>New login detected on your account</Preview>
			<Body
				style={{
					backgroundColor: "#f4f4f5",
					fontFamily: "'Helvetica', 'Arial', 'Segoe UI', sans-serif",
				}}
			>
				<Container
					style={{
						backgroundColor: "#ffffff",
						padding: "40px",
						maxWidth: "480px",
						margin: "40px auto",
						borderRadius: "8px",
						boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
					}}
				>
					<Section style={{ marginBottom: "24px" }}>
						<Text
							style={{
								fontWeight: 700,
								fontSize: "20px",
								margin: 0,
							}}
						>
							<span style={{ color: "#bbb2ff" }}>next</span>
							-auth-starter
						</Text>
					</Section>

					<Section style={{ marginBottom: "16px" }}>
						<Text
							style={{
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "10px",
							}}
						>
							A new login on {deviceName} detected!
						</Text>
						<Text
							style={{
								fontSize: "14px",
								color: "#333",
								lineHeight: "1.5",
							}}
						>
							We noticed a new sign-in to your account from a{" "}
							<strong>{deviceName}</strong> device. If this was
							you, you don&apos;t need to do anything. If not,
							we&apos;ll help you secure your account.
						</Text>
					</Section>

					<Section style={{ textAlign: "center" }}>
						<Button
							href={checkActivityUrl}
							style={{
								backgroundColor: "#bbb2ff",
								borderRadius: "6px",
								padding: "10px 28px",
								fontSize: "14px",
								color: "#000",
								textDecoration: "none",
								display: "inline-block",
							}}
						>
							Check Activity
						</Button>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}
