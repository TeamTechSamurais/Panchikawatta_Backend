/*
  Warnings:

  - Added the required column `district` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "phoneNo" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
