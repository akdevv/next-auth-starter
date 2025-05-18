-- AlterTable
ALTER TABLE "VerificationAttempt" ADD COLUMN     "token" TEXT;

-- CreateIndex
CREATE INDEX "VerificationAttempt_token_idx" ON "VerificationAttempt"("token");
