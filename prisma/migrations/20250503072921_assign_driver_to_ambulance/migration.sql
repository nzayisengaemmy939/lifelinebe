/*
  Warnings:

  - Added the required column `driverId` to the `Ambulance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ambulance" ADD COLUMN     "driverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ambulance" ADD CONSTRAINT "Ambulance_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
