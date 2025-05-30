/*
  Warnings:

  - You are about to drop the column `expires` on the `VerificationToken` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `VerificationToken` table. All the data in the column will be lost.
  - Added the required column `code` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `VerificationToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "VerificationToken_identifier_token_key";

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "expires",
DROP COLUMN "identifier",
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "VerificationRequestLog" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationRequestLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VerificationRequestLog_email_createdAt_idx" ON "VerificationRequestLog"("email", "createdAt");

-- CreateIndex
CREATE INDEX "VerificationToken_email_createdAt_idx" ON "VerificationToken"("email", "createdAt");
