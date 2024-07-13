-- CreateTable
CREATE TABLE "User" (
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
    "batteryCondition" TEXT NOT NULL,
    "lastServiceDate" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "createdAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("vehicleId")
);

-- CreateTable
CREATE TABLE "seller" (
    "userId" INTEGER NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "businessDescription" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessPhoneNo" TEXT NOT NULL,

    CONSTRAINT "seller_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "serviceStation" (
    "sellerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "serviceStation_pkey" PRIMARY KEY ("sellerId","name")
);

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
CREATE TABLE "service" (
    "serviceId" SERIAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL,
    "imageUrls" TEXT[],
    "type" TEXT,

    CONSTRAINT "service_pkey" PRIMARY KEY ("serviceId")
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
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNO" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "OrderSparePart_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "admin" (
    "adminID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adminUsername" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminID")
);

-- CreateTable
CREATE TABLE "testModel" (
    "id" SERIAL NOT NULL,
    "photo1" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sparePart" ADD CONSTRAINT "sparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteSparePart" ADD CONSTRAINT "UserFavoriteSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "sparePart"("sparePartId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteSparePart" ADD CONSTRAINT "UserFavoriteSparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderSparePart" ADD CONSTRAINT "OrderSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "sparePart"("sparePartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderSparePart" ADD CONSTRAINT "OrderSparePart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
