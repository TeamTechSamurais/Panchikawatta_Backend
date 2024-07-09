/*
  Warnings:

  - You are about to drop the column `image` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `sparePart` table. All the data in the column will be lost.
  - Added the required column `price` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "image",
ADD COLUMN     "clickCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sparePart" DROP COLUMN "image",
ADD COLUMN     "clickCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "data" BYTEA NOT NULL,
    "userId" INTEGER,
    "vehicleId" INTEGER,
    "sparePartId" INTEGER,
    "serviceId" INTEGER,
    "adminID" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavoriteSparePart" (
    "userId" INTEGER NOT NULL,
    "sparePartId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavoriteSparePart_pkey" PRIMARY KEY ("userId","sparePartId")
);

-- CreateTable
CREATE TABLE "OrderSparePart" (
    "orderId" SERIAL NOT NULL,
    "sparePartId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "OrderSparePart_pkey" PRIMARY KEY ("orderId")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("vehicleId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "sparePart"("sparePartId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("serviceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "admin"("adminID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteSparePart" ADD CONSTRAINT "UserFavoriteSparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteSparePart" ADD CONSTRAINT "UserFavoriteSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "sparePart"("sparePartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderSparePart" ADD CONSTRAINT "OrderSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "sparePart"("sparePartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderSparePart" ADD CONSTRAINT "OrderSparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
