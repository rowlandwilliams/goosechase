/*
  Warnings:

  - You are about to drop the column `location` on the `SurfSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SurfSession" DROP COLUMN "location",
ADD COLUMN     "locationId" TEXT;

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surfForecastUrlString" TEXT NOT NULL,
    "breakType" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurfSession" ADD CONSTRAINT "SurfSession_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
