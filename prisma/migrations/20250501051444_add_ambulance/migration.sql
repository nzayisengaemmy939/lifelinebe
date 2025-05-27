/*
  Warnings:

  - The values [AGENT,CLIENT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `status` to the `AccidentAlerts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NEW', 'PENDING', 'ATTENDED', 'CLOSED');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'DISPATCHER', 'AMBTEAM');
ALTER TABLE "UserRoles" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "AccidentAlerts" ADD COLUMN     "assignTo" TEXT,
ADD COLUMN     "status" "Status" NOT NULL;

-- CreateTable
CREATE TABLE "HealthFacility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "availableAmbulances" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ambulance" (
    "id" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ambulance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ambulance" ADD CONSTRAINT "Ambulance_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "HealthFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
