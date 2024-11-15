/*
  Warnings:

  - The primary key for the `SurfSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dateTime` on the `SurfSession` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `SurfSession` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `SurfSession` table. All the data in the column will be lost.
  - Added the required column `isDraft` to the `SurfSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SurfSession" DROP CONSTRAINT "SurfSession_pkey",
DROP COLUMN "dateTime",
DROP COLUMN "location",
DROP COLUMN "rating",
ADD COLUMN     "isDraft" BOOLEAN NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ADD CONSTRAINT "SurfSession_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SurfSession_id_seq";
