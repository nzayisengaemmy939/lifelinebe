/*
  Warnings:

  - Added the required column `latitude` to the `AccidentAlerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `AccidentAlerts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccidentAlerts" ADD COLUMN     "email" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;
