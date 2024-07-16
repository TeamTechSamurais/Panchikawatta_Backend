/*
  Warnings:

  - You are about to drop the `UserFavoriteSparePart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_spare_part` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_service_station` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spare_part` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test_model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_spare_part` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserFavoriteSparePart" DROP CONSTRAINT "UserFavoriteSparePart_sparePartId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteSparePart" DROP CONSTRAINT "UserFavoriteSparePart_userId_fkey";

-- DropForeignKey
ALTER TABLE "order_spare_part" DROP CONSTRAINT "order_spare_part_sparePartId_fkey";

-- DropForeignKey
ALTER TABLE "order_spare_part" DROP CONSTRAINT "order_spare_part_userId_fkey";

-- DropForeignKey
ALTER TABLE "spare_part" DROP CONSTRAINT "spare_part_sellerId_fkey";

-- DropTable
DROP TABLE "UserFavoriteSparePart";

-- DropTable
DROP TABLE "order_spare_part";

-- DropTable
DROP TABLE "service_service_station";

-- DropTable
DROP TABLE "spare_part";

-- DropTable
DROP TABLE "test_model";

-- DropTable
DROP TABLE "user_service";

-- DropTable
DROP TABLE "user_spare_part";

-- CreateTable
CREATE TABLE "sparePart" (
    "sparePartId" SERIAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "fuel" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "imageUrls" TEXT[],
    "type" TEXT NOT NULL,

    CONSTRAINT "sparePart_pkey" PRIMARY KEY ("sparePartId")
);

-- CreateTable
CREATE TABLE "serviceServiceStation" (
    "sellerId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "serviceServiceStation_pkey" PRIMARY KEY ("sellerId","serviceId")
);

-- CreateTable
CREATE TABLE "userSparePart" (
    "userId" INTEGER NOT NULL,
    "sparePartId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userSparePart_pkey" PRIMARY KEY ("userId","sparePartId")
);

-- CreateTable
CREATE TABLE "userService" (
    "userId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userService_pkey" PRIMARY KEY ("userId","serviceId")
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
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- AddForeignKey
ALTER TABLE "sparePart" ADD CONSTRAINT "sparePart_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavoriteSparePart" ADD CONSTRAINT "userFavoriteSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "sparePart"("sparePartId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavoriteSparePart" ADD CONSTRAINT "userFavoriteSparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderSparePart" ADD CONSTRAINT "orderSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "sparePart"("sparePartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderSparePart" ADD CONSTRAINT "orderSparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
