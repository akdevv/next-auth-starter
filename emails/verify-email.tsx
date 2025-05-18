// emails/OtpEmail.tsx
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

export default function VerifyEmail({
	code,
	verificationUrl,
}: {
	code: string;
	verificationUrl: string;
}) {
	return (
		<Html>
			<Preview>Your one-time verification code</Preview>
			<Body
				style={{
					backgroundColor: "#f4f4f5",
					fontFamily: "Helvetica, Arial, sans-serif",
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
					{/* Logo */}
					<Section style={{ marginBottom: "24px" }}>
						<Text
							style={{
								fontSize: "20px",
								fontWeight: "bold",
								margin: 0,
							}}
						>
							<span style={{ color: "#7e5bef" }}>next</span>
							-auth-starter
						</Text>
					</Section>

					{/* Greeting and Message */}
					<Section style={{ marginBottom: "24px" }}>
						<Text
							style={{
								fontSize: "18px",
								fontWeight: "500",
								marginBottom: "10px",
							}}
						>
							Hi there,
						</Text>
						<Text
							style={{
								fontSize: "16px",
								color: "#333",
								margin: 0,
							}}
						>
							This is your one time verification code.
						</Text>
					</Section>

					{/* OTP Code Display */}
					<Section
						style={{
							backgroundColor: "#f4f4f5",
							padding: "20px 0",
							borderRadius: "6px",
							textAlign: "center",
							margin: "24px 0",
						}}
					>
						<Text
							style={{
								fontSize: "36px",
								letterSpacing: "6px",
								fontWeight: "bold",
								fontFamily:
									"'Courier New', 'Consolas', monospace",
								color: "#000",
								margin: 0,
							}}
						>
							{code || "123456"}
						</Text>
					</Section>

					{/* Expiry Message */}
					<Section style={{ marginBottom: "24px" }}>
						<Text
							style={{
								fontSize: "14px",
								color: "#555",
								lineHeight: "1.5",
							}}
						>
							This code is only active for the next 5 minutes.
							Once this code expires you will have to request a
							new code.
						</Text>
					</Section>

					{/* CTA Button */}
					<Section style={{ textAlign: "center" }}>
						<Button
							href={verificationUrl || "#"}
							style={{
								backgroundColor: "#bbb2ff",
								borderRadius: "6px",
								padding: "10px 30px",
								fontSize: "14px",
								color: "#1c2433",
								textDecoration: "none",
								display: "inline-block",
							}}
						>
							Verify Now
						</Button>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}
