-- CreateTable
CREATE TABLE "Assign" (
    "id" TEXT NOT NULL,
    "hospitalId" TEXT,
    "ambulanceId" TEXT NOT NULL,
    "alertId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assign_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assign" ADD CONSTRAINT "Assign_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "HealthFacility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assign" ADD CONSTRAINT "Assign_ambulanceId_fkey" FOREIGN KEY ("ambulanceId") REFERENCES "Ambulance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assign" ADD CONSTRAINT "Assign_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "AccidentAlerts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
