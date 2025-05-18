-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastPasswordUpdate" TIMESTAMP(3),
ADD COLUMN     "passwordUpdateCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "VerificationAttempt" ADD COLUMN     "success" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'PASSWORD_RESET';

-- CreateIndex
CREATE INDEX "VerificationAttempt_type_timestamp_idx" ON "VerificationAttempt"("type", "timestamp");
