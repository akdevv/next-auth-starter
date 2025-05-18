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

export default function ForgotPasswordEmail({
	resetUrl = "#",
}: {
	resetUrl?: string;
}) {
	return (
		<Html>
			<Head />
			<Preview>Reset your password</Preview>
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
							Forgot your password?
						</Text>
						<Text
							style={{
								fontSize: "14px",
								color: "#333",
								lineHeight: "1.5",
							}}
						>
							We received a request to reset your password. Click
							the button below to choose a new one. If you
							didn&apos;t request this, you can safely ignore this
							email.
						</Text>
					</Section>

					<Section style={{ textAlign: "center" }}>
						<Button
							href={resetUrl}
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
							Reset Password
						</Button>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}
