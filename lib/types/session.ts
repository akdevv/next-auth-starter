export interface SessionInfo {
	id: string;
	deviceName: string | null;
	location: string | null;
	ipAddress: string | null;
	lastActive: Date;
	createdAt: Date;
	isCurrent: boolean;
	userAgent: string | null;
	expires: Date;
	isRevoked: boolean;
	revokedAt: Date | null;
	revokedBy: string | null;
}
