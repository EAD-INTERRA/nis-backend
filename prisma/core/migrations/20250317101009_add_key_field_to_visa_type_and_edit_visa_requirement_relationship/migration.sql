/*
  Warnings:

  - You are about to drop the column `visa_type_id` on the `visa_requirement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "visa_requirement" DROP CONSTRAINT "visa_requirement_visa_type_id_fkey";

-- AlterTable
ALTER TABLE "visa_requirement" DROP COLUMN "visa_type_id";

-- CreateTable
CREATE TABLE "_VisaRequirementToVisaType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_VisaRequirementToVisaType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VisaRequirementToVisaType_B_index" ON "_VisaRequirementToVisaType"("B");

-- AddForeignKey
ALTER TABLE "_VisaRequirementToVisaType" ADD CONSTRAINT "_VisaRequirementToVisaType_A_fkey" FOREIGN KEY ("A") REFERENCES "visa_requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VisaRequirementToVisaType" ADD CONSTRAINT "_VisaRequirementToVisaType_B_fkey" FOREIGN KEY ("B") REFERENCES "visa_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
