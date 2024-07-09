/*
  Warnings:

  - You are about to drop the column `District` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Province` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the column `serviceName` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleType` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `Avg_distance_per_week` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `Battery_Condition` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `Last_Service_date` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `Make` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `Vehicle_Name` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessAddress` to the `seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessDescription` to the `seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessPhoneNo` to the `seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `serviceStation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `sparePart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuel` to the `sparePart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `make` to the `sparePart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `sparePart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batteryCondition` to the `vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastServiceDate` to the `vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `make` to the `vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "District",
DROP COLUMN "Province",
DROP COLUMN "Username",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "district" TEXT,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "seller" DROP COLUMN "address",
DROP COLUMN "companyName",
ADD COLUMN     "businessAddress" TEXT NOT NULL,
ADD COLUMN     "businessDescription" TEXT NOT NULL,
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "businessPhoneNo" TEXT NOT NULL;

-- AlterTable
CREATE SEQUENCE service_serviceid_seq;
ALTER TABLE "service" DROP COLUMN "serviceName",
DROP COLUMN "vehicleType",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" BYTEA,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "serviceId" SET DEFAULT nextval('service_serviceid_seq');
ALTER SEQUENCE service_serviceid_seq OWNED BY "service"."serviceId";

-- AlterTable
ALTER TABLE "serviceServiceStation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "serviceStation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
CREATE SEQUENCE sparepart_sparepartid_seq;
ALTER TABLE "sparePart" ADD COLUMN     "condition" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "fuel" TEXT NOT NULL,
ADD COLUMN     "make" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "sparePartId" SET DEFAULT nextval('sparepart_sparepartid_seq');
ALTER SEQUENCE sparepart_sparepartid_seq OWNED BY "sparePart"."sparePartId";

-- AlterTable
ALTER TABLE "userService" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "userSparePart" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "vehicle" DROP COLUMN "Avg_distance_per_week",
DROP COLUMN "Battery_Condition",
DROP COLUMN "Last_Service_date",
DROP COLUMN "Make",
DROP COLUMN "Type",
DROP COLUMN "Vehicle_Name",
ADD COLUMN     "batteryCondition" TEXT NOT NULL,
ADD COLUMN     "lastServiceDate" TEXT NOT NULL,
ADD COLUMN     "make" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "Business";

-- CreateTable
CREATE TABLE "admin" (
    "adminID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adminUsername" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminID")
);

-- AddForeignKey
ALTER TABLE "sparePart" ADD CONSTRAINT "sparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
