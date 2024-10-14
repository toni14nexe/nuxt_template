-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "mobile" INTEGER,
    "country" TEXT,
    "MIBPG" TEXT,
    "businessName" TEXT,
    "organizationType" TEXT,
    "county" TEXT,
    "place" TEXT,
    "address" TEXT,
    "activities" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
