-- CreateEnum
CREATE TYPE "LoadType" AS ENUM ('full', 'complement', 'full_complement');

-- AlterTable
ALTER TABLE "load" ADD COLUMN     "type" "LoadType" NOT NULL DEFAULT 'full';
