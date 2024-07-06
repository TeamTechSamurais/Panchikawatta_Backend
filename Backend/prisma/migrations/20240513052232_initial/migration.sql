-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
 -- Add columns to User table
 

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "vehicleId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "milagePerWeek" INTEGER NOT NULL,
    "licenceDate" TEXT NOT NULL,
    "insuranceDate" TEXT NOT NULL,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("vehicleId")
);

-- CreateTable
CREATE TABLE "seller" (
    "userId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "seller_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "serviceStation" (
    "sellerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "serviceStation_pkey" PRIMARY KEY ("sellerId","name")
);

-- CreateTable
CREATE TABLE "sparePart" (
    "sparePartId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "sparePart_pkey" PRIMARY KEY ("sparePartId")
);

-- CreateTable
CREATE TABLE "service" (
    "serviceId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "serviceName" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("serviceId")
);

-- CreateTable
CREATE TABLE "serviceServiceStation" (
    "sellerId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "serviceServiceStation_pkey" PRIMARY KEY ("sellerId","serviceId")
);

-- CreateTable
CREATE TABLE "userSparePart" (
    "userId" INTEGER NOT NULL,
    "sparePartId" INTEGER NOT NULL,

    CONSTRAINT "userSparePart_pkey" PRIMARY KEY ("userId","sparePartId")
);

-- CreateTable
CREATE TABLE "userService" (
    "userId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "userService_pkey" PRIMARY KEY ("userId","serviceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
