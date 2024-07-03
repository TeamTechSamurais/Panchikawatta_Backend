/*
  Warnings:

  - Added the required column `adress` to the `OrderSparePart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `OrderSparePart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OrderSparePart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNO` to the `OrderSparePart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderSparePart" ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNO" TEXT NOT NULL;
