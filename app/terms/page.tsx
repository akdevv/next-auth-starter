import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function TermsPage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="flex flex-col items-center justify-center mx-auto max-w-4xl px-4 py-12">
				<div className="w-full space-y-8">
					<div className="text-center space-y-4">
						<h1 className="text-4xl font-bold tracking-tight mt-8">
							Terms of Service and Privacy Policy
						</h1>
						<p className="text-muted-foreground text-lg">
							Effective Date: {new Date().toLocaleDateString()} |
							Last Updated: {new Date().toLocaleDateString()}
						</p>
						<p className="text-sm text-muted-foreground italic">
							Please read these terms carefully before using our
							services
						</p>
					</div>

					<div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-justify">
						<section className="space-y-6">
							<h2 className="text-2xl font-semibold border-b pb-2">
								1. Data Collection and Information Gathering
							</h2>

							<div className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									By accessing and using our authentication
									platform (the{" "}
									<strong>&quot;Service&quot;</strong>), you
									acknowledge and consent to our comprehensive
									data collection practices as outlined
									herein. We collect, process, and store
									various categories of personal and technical
									information to provide, maintain, and
									improve our services, ensure security
									compliance, and fulfill our legal
									obligations under applicable data protection
									regulations including but not limited to the{" "}
									<strong>
										General Data Protection Regulation
										(GDPR)
									</strong>
									,{" "}
									<strong>
										California Consumer Privacy Act (CCPA)
									</strong>
									, and other relevant privacy laws.
								</p>

								<h3 className="text-xl font-medium text-foreground">
									Account and Authentication Data
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									When you create an account or authenticate
									with our Service, we collect and process
									your <strong>email address</strong>, which
									serves as your primary identifier and
									communication channel. Your{" "}
									<strong>password</strong> is securely
									processed using industry-standard bcrypt
									hashing algorithms with a minimum of 12 salt
									rounds, ensuring that plaintext passwords
									are never stored in our systems. We also
									collect any{" "}
									<strong>profile information</strong> you
									voluntarily provide, including but not
									limited to display names, profile pictures,
									and biographical information. In the event
									you enable{" "}
									<strong>
										two-factor authentication (2FA)
									</strong>
									, we store your authentication preferences,
									backup recovery codes (encrypted using
									AES-256 encryption), and time-based one-time
									password (TOTP) secrets in accordance with{" "}
									<a
										href="https://tools.ietf.org/rfc/rfc6238.txt"
										className="text-blue-600 dark:text-blue-400 hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										RFC 6238 specifications
									</a>
									.
								</p>

								<h3 className="text-xl font-medium text-foreground">
									Device and Technical Information
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									Our Service automatically collects
									comprehensive technical information about
									your device and browsing environment to
									ensure optimal functionality, security
									monitoring, and fraud prevention. This
									includes detailed{" "}
									<strong>device fingerprinting data</strong>{" "}
									such as your device type, model, operating
									system version, hardware specifications
									including CPU architecture, available
									memory, and screen resolution. We capture
									your complete{" "}
									<strong>browser information</strong>{" "}
									including the user agent string, browser
									version, installed plugins, supported MIME
									types, and language preferences.
									Additionally, we collect{" "}
									<strong>network-level data</strong>{" "}
									including your Internet Protocol (IP)
									address, Internet Service Provider (ISP)
									information, connection type (broadband,
									mobile, satellite), approximate geographical
									location derived from IP geolocation
									services, and timezone settings. This
									information is processed in accordance with
									our legitimate interests for service
									provision and security purposes as defined
									under Article 6(1)(f) of the GDPR.
								</p>

								<h3 className="text-xl font-medium text-foreground">
									Session and Usage Analytics
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									We maintain detailed logs of your
									interactions with our Service to ensure
									security, provide customer support, and
									improve our platform&apos;s functionality.
									This encompasses{" "}
									<strong>session management data</strong>{" "}
									including login timestamps, logout events,
									session duration, concurrent session
									tracking, and session termination reasons.
									Our systems record{" "}
									<strong>user activity patterns</strong> such
									as page views, feature utilization,
									click-through rates, navigation paths, and
									interaction frequencies. We also collect{" "}
									<strong>performance metrics</strong>{" "}
									including page load times, API response
									times, error rates, and system performance
									indicators. All{" "}
									<strong>security events</strong> are logged
									including failed authentication attempts,
									suspicious login patterns, potential
									security threats, account lockouts, and
									password reset requests. This data is
									retained for security monitoring and
									compliance purposes in accordance with our
									data retention policies outlined in Section
									4 of this document.
								</p>

								<h3 className="text-xl font-medium text-foreground">
									HTTP Headers and Communication Protocols
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									Our Service processes various HTTP headers
									and communication metadata to ensure proper
									functionality, security, and compliance with
									web standards. This includes the complete{" "}
									<strong>User-Agent string</strong>{" "}
									containing detailed information about your
									browser, operating system, device
									capabilities, and rendering engine. We
									process{" "}
									<strong>Accept-Language headers</strong> to
									provide localized content and services,{" "}
									<strong>Accept-Encoding preferences</strong>{" "}
									for optimal content delivery, and{" "}
									<strong>Content-Type specifications</strong>{" "}
									for proper data handling.{" "}
									<strong>Referrer information</strong> is
									collected to understand traffic sources and
									user navigation patterns, while{" "}
									<strong>Origin headers</strong> are
									processed for Cross-Origin Resource Sharing
									(CORS) security implementations. Additional{" "}
									<strong>custom security headers</strong> may
									be processed including Content Security
									Policy (CSP) directives, X-Frame-Options,
									and Strict-Transport-Security headers as
									defined in{" "}
									<a
										href="https://tools.ietf.org/rfc/rfc6797.txt"
										className="text-blue-600 dark:text-blue-400 hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										RFC 6797
									</a>{" "}
									and related security specifications.
								</p>
							</div>
						</section>

						<section className="space-y-6">
							<h2 className="text-2xl font-semibold border-b pb-2">
								2. Data Processing and Utilization
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								The personal and technical data we collect is
								processed for specific, explicit, and legitimate
								purposes as required by applicable data
								protection laws. Our{" "}
								<strong>primary processing activities</strong>{" "}
								include providing secure authentication
								services, maintaining user accounts,
								facilitating secure access to protected
								resources, and ensuring the integrity and
								availability of our platform. We utilize
								collected data for{" "}
								<strong>security and fraud prevention</strong>{" "}
								purposes, including but not limited to detecting
								suspicious activities, preventing unauthorized
								access attempts, identifying potential security
								threats, implementing rate limiting mechanisms,
								and maintaining comprehensive audit trails for
								compliance and forensic analysis.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								Additionally, we process data for{" "}
								<strong>
									service improvement and analytics
								</strong>{" "}
								purposes, analyzing usage patterns to enhance
								user experience, optimize system performance,
								identify and resolve technical issues, and
								develop new features and functionalities. Our{" "}
								<strong>communication processing</strong>{" "}
								activities include sending transactional emails
								such as account verification messages, security
								alerts, password reset notifications, and
								important service announcements. All data
								processing activities are conducted in
								accordance with our Privacy by Design principles
								and comply with the data minimization
								requirements under Article 5(1)(c) of the GDPR.
							</p>
						</section>

						<section className="space-y-6">
							<h2 className="text-2xl font-semibold border-b pb-2">
								3. Security Measures and Data Protection
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We implement comprehensive{" "}
								<strong>
									technical and organizational security
									measures
								</strong>{" "}
								to protect your personal data against
								unauthorized access, accidental loss,
								destruction, or damage. Our security
								infrastructure includes{" "}
								<strong>end-to-end encryption</strong> for all
								data in transit using Transport Layer Security
								(TLS) version 1.3 or higher, as specified in{" "}
								<a
									href="https://tools.ietf.org/rfc/rfc8446.txt"
									className="text-blue-600 dark:text-blue-400 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									RFC 8446
								</a>
								. All sensitive data at rest is encrypted using
								Advanced Encryption Standard (AES) with 256-bit
								keys, and cryptographic keys are managed through
								hardware security modules (HSMs) or equivalent
								key management systems.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								Our <strong>access control mechanisms</strong>{" "}
								implement the principle of least privilege,
								ensuring that personnel access to personal data
								is limited to what is necessary for their
								specific job functions. We maintain
								comprehensive <strong>audit logging</strong> of
								all data access and processing activities,
								conduct regular security assessments and
								penetration testing, and have implemented
								incident response procedures in accordance with
								Article 33 and 34 of the GDPR. Our systems
								include{" "}
								<strong>
									Cross-Site Request Forgery (CSRF) protection
								</strong>
								, input validation and sanitization, SQL
								injection prevention measures, and comprehensive
								rate limiting to prevent abuse and ensure
								service availability.
							</p>
						</section>

						<section className="space-y-6">
							<h2 className="text-2xl font-semibold border-b pb-2">
								4. Data Retention and Deletion Policies
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We retain personal data only for as long as
								necessary to fulfill the purposes for which it
								was collected, comply with legal obligations,
								resolve disputes, and enforce our agreements.{" "}
								<strong>Active account data</strong> including
								profile information, authentication credentials,
								and preference settings are retained for the
								duration of your account&apos;s active status
								and for a period of{" "}
								<strong>thirty (30) days</strong> following
								account deactivation to allow for account
								recovery.{" "}
								<strong>Session and authentication logs</strong>{" "}
								are retained for{" "}
								<strong>ninety (90) days</strong> to facilitate
								security monitoring, fraud detection, and
								incident response activities.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								<strong>Security event logs</strong> including
								failed authentication attempts, suspicious
								activities, and potential security incidents are
								retained for <strong>one (1) year</strong> to
								support ongoing security analysis and compliance
								with regulatory requirements.{" "}
								<strong>Technical and performance logs</strong>{" "}
								are retained for{" "}
								<strong>thirty (30) days</strong> for
								troubleshooting and system optimization
								purposes. Upon expiration of the applicable
								retention period, data is securely deleted using
								cryptographic erasure methods or secure deletion
								algorithms that meet or exceed{" "}
								<a
									href="https://www.nist.gov/publications/guidelines-media-sanitization"
									className="text-blue-600 dark:text-blue-400 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									NIST SP 800-88 Rev. 1
								</a>{" "}
								guidelines for media sanitization.
							</p>
						</section>

						<section className="space-y-6">
							<h2 className="text-2xl font-semibold border-b pb-2">
								5. Third-Party Service Providers and Data
								Sharing
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								In the course of providing our services, we may
								engage carefully vetted{" "}
								<strong>third-party service providers</strong>{" "}
								who assist us in delivering, maintaining, and
								improving our platform. These service providers
								include{" "}
								<strong>cloud infrastructure providers</strong>{" "}
								for hosting and data storage services,{" "}
								<strong>email service providers</strong> for
								transactional email delivery,{" "}
								<strong>
									content delivery networks (CDNs)
								</strong>{" "}
								for performance optimization, and{" "}
								<strong>analytics services</strong> for usage
								monitoring and service improvement. All
								third-party service providers are required to
								enter into comprehensive{" "}
								<strong>
									data processing agreements (DPAs)
								</strong>{" "}
								that ensure adequate data protection measures
								and compliance with applicable privacy laws.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								We may also integrate with{" "}
								<strong>OAuth authentication providers</strong>{" "}
								such as Google, GitHub, or other social login
								services when you choose to use these
								authentication methods. In such cases, we
								receive only the minimum necessary information
								required for authentication purposes, and we
								encourage you to review the privacy policies of
								these third-party providers. We do not sell,
								rent, or otherwise commercialize your personal
								data to third parties for marketing purposes,
								and any data sharing is conducted solely to
								facilitate service provision or comply with
								legal obligations.
							</p>
						</section>

						<section className="space-y-6">
							<h2 className="text-2xl font-semibold border-b pb-2">
								6. Your Rights and Legal Protections
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								As a data subject, you possess comprehensive
								rights regarding your personal data as
								established under applicable data protection
								regulations. You have the{" "}
								<strong>right of access</strong> to obtain
								confirmation of whether we process your personal
								data and, if so, to receive a copy of such data
								along with supplementary information about the
								processing activities. The{" "}
								<strong>right to rectification</strong> allows
								you to request correction of inaccurate personal
								data and completion of incomplete data. You may
								exercise your <strong>right to erasure</strong>{" "}
								(also known as the &quot;right to be
								forgotten&quot;) under specific circumstances,
								including when the data is no longer necessary
								for the original purposes or when you withdraw
								consent for processing based on consent.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								Additionally, you have the{" "}
								<strong>right to restrict processing</strong> in
								certain situations, the{" "}
								<strong>right to data portability</strong> to
								receive your personal data in a structured,
								commonly used, and machine-readable format, and
								the <strong>right to object</strong> to
								processing based on legitimate interests or for
								direct marketing purposes. If you have provided
								consent for specific processing activities, you
								maintain the{" "}
								<strong>right to withdraw consent</strong> at
								any time without affecting the lawfulness of
								processing based on consent before withdrawal.
								To exercise any of these rights, please contact
								our Data Protection Officer using the contact
								information provided in Section 7 of this
								document.
							</p>
						</section>

						<section className="space-y-6">
							<h2 className="text-2xl font-semibold border-b pb-2">
								7. Contact Information and Data Protection
								Officer
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								For any questions, concerns, or requests
								regarding these Terms of Service, our privacy
								practices, or your personal data, please contact
								our{" "}
								<strong>Data Protection Officer (DPO)</strong>{" "}
								who serves as your primary point of contact for
								all data protection matters. You may reach our
								DPO via email at{" "}
								<a
									href="mailto:privacy@company.com"
									className="text-blue-600 dark:text-blue-400 hover:underline"
								>
									privacy@company.com
								</a>{" "}
								or through our secure support portal accessible
								at{" "}
								<a
									href="/support"
									className="text-blue-600 dark:text-blue-400 hover:underline"
								>
									our support center
								</a>
								. We are committed to responding to all
								inquiries within{" "}
								<strong>thirty (30) days</strong> as required by
								applicable data protection regulations, and we
								will provide updates on the status of your
								request if additional time is needed for complex
								inquiries.
							</p>
						</section>

						<section className="space-y-6">
							<h2 className="text-2xl font-semibold border-b pb-2">
								8. Modifications and Updates to Terms
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We reserve the right to modify, update, or
								replace these Terms of Service at our sole
								discretion to reflect changes in our services,
								legal requirements, or business practices.{" "}
								<strong>Material changes</strong> to these terms
								will be communicated to you via email
								notification sent to your registered email
								address and through prominent notices on our
								platform at least{" "}
								<strong>thirty (30) days</strong> prior to the
								effective date of such changes.{" "}
								<strong>Non-material changes</strong> such as
								clarifications, formatting improvements, or
								minor administrative updates may be implemented
								immediately upon posting. Your continued use of
								our Service following the effective date of any
								modifications constitutes your acceptance of the
								updated terms. If you do not agree to the
								modified terms, you must discontinue use of our
								Service and may request account deletion in
								accordance with Section 6 of this document.
							</p>
							<p className="text-muted-foreground leading-relaxed text-sm italic border-t pt-4 mt-8">
								This document was last reviewed and updated on{" "}
								{new Date().toLocaleDateString()}. For the most
								current version of our Terms of Service, please
								visit{" "}
								<a
									href="/terms"
									className="text-blue-600 dark:text-blue-400 hover:underline"
								>
									this page
								</a>
								. Previous versions of this document are
								available upon request for transparency and
								compliance purposes.
							</p>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
