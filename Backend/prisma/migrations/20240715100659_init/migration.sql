/*
  Warnings:

  - You are about to drop the `OrderSparePart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `serviceServiceStation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `serviceStation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sparePart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `testModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userSparePart` table. If the table is not empty, all the data it contains will be lost.

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
DROP TABLE "serviceServiceStation";

-- DropTable
DROP TABLE "serviceStation";

-- DropTable
DROP TABLE "sparePart";

-- DropTable
DROP TABLE "testModel";

-- DropTable
DROP TABLE "userService";

-- DropTable
DROP TABLE "userSparePart";

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
CREATE TABLE "spare_part" (
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

    CONSTRAINT "spare_part_pkey" PRIMARY KEY ("sparePartId")
);

-- CreateTable
CREATE TABLE "service_service_station" (
    "sellerId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_service_station_pkey" PRIMARY KEY ("sellerId","serviceId")
);

-- CreateTable
CREATE TABLE "user_spare_part" (
    "userId" INTEGER NOT NULL,
    "sparePartId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_spare_part_pkey" PRIMARY KEY ("userId","sparePartId")
);

-- CreateTable
CREATE TABLE "user_service" (
    "userId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_service_pkey" PRIMARY KEY ("userId","serviceId")
);

-- CreateTable
CREATE TABLE "order_spare_part" (
    "orderId" SERIAL NOT NULL,
    "sparePartId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "order_spare_part_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "test_model" (
    "id" SERIAL NOT NULL,
    "photo1" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_model_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spare_part" ADD CONSTRAINT "spare_part_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteSparePart" ADD CONSTRAINT "UserFavoriteSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "spare_part"("sparePartId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteSparePart" ADD CONSTRAINT "UserFavoriteSparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_spare_part" ADD CONSTRAINT "order_spare_part_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "spare_part"("sparePartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_spare_part" ADD CONSTRAINT "order_spare_part_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
