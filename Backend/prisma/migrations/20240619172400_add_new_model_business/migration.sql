-- CreateTable
CREATE TABLE "Business" (
    "BusinessID" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "BusinessName" TEXT NOT NULL,
    "BusinessAddress" TEXT NOT NULL,
    "BusinessContactno" TEXT NOT NULL,
    "Businessdescrption" TEXT NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("BusinessID")
);

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
