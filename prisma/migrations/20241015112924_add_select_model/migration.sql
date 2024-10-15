-- CreateTable
CREATE TABLE "Select" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "hrLabel" TEXT NOT NULL,
    "enLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Select_pkey" PRIMARY KEY ("id")
);
