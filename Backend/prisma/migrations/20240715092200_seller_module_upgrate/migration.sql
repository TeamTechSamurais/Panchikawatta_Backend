-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "imageUrls" TEXT;

-- AlterTable
ALTER TABLE "vehicle" ALTER COLUMN "imageUrls" DROP NOT NULL,
ALTER COLUMN "imageUrls" SET DATA TYPE TEXT;
