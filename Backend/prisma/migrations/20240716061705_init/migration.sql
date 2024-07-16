/*
  Warnings:

  - You are about to drop the `OrderSparePart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFavoriteSparePart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `serviceStation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `testModel` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "OrderSparePart" DROP CONSTRAINT "OrderSparePart_sparePartId_fkey";

-- DropForeignKey
ALTER TABLE "OrderSparePart" DROP CONSTRAINT "OrderSparePart_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteSparePart" DROP CONSTRAINT "UserFavoriteSparePart_sparePartId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteSparePart" DROP CONSTRAINT "UserFavoriteSparePart_userId_fkey";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_userId_fkey";

-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_userId_fkey";

-- DropForeignKey
ALTER TABLE "sparePart" DROP CONSTRAINT "sparePart_userId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_userId_fkey";

-- DropTable
DROP TABLE "OrderSparePart";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserFavoriteSparePart";

-- DropTable
DROP TABLE "serviceStation";

-- DropTable
DROP TABLE "testModel";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "district" TEXT,
    "phoneNo" TEXT NOT NULL,
    "province" TEXT,
    "userName" TEXT NOT NULL,
    "imageUrls" TEXT[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_station" (
    "sellerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_station_pkey" PRIMARY KEY ("sellerId","name")
);

-- CreateTable
CREATE TABLE "userFavoriteSparePart" (
    "userId" INTEGER NOT NULL,
    "sparePartId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userFavoriteSparePart_pkey" PRIMARY KEY ("userId","sparePartId")
);

-- CreateTable
CREATE TABLE "orderSparePart" (
    "orderId" SERIAL NOT NULL,
    "sparePartId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "orderSparePart_pkey" PRIMARY KEY ("orderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sparePart" ADD CONSTRAINT "sparePart_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavoriteSparePart" ADD CONSTRAINT "userFavoriteSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "sparePart"("sparePartId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavoriteSparePart" ADD CONSTRAINT "userFavoriteSparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderSparePart" ADD CONSTRAINT "orderSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "sparePart"("sparePartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderSparePart" ADD CONSTRAINT "orderSparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
