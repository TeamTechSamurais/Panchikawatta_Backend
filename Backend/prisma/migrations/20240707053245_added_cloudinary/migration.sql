/*
  Warnings:

  - You are about to drop the column `adress` on the `OrderSparePart` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `OrderSparePart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `sparePart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_adminID_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_sparePartId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteSparePart" DROP CONSTRAINT "UserFavoriteSparePart_sparePartId_fkey";

-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_userId_fkey";

-- DropForeignKey
ALTER TABLE "sparePart" DROP CONSTRAINT "sparePart_userId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_userId_fkey";

-- AlterTable
ALTER TABLE "OrderSparePart" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service" ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "sparePart" ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "imageUrls" TEXT[];

-- DropTable
DROP TABLE "Image";

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sparePart" ADD CONSTRAINT "sparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteSparePart" ADD CONSTRAINT "UserFavoriteSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "sparePart"("sparePartId") ON DELETE CASCADE ON UPDATE CASCADE;
