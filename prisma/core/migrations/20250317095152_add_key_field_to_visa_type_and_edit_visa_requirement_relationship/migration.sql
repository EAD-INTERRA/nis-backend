/*
  Warnings:

  - You are about to drop the `_VisaRequirementToVisaType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[key]` on the table `visa_type` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_VisaRequirementToVisaType" DROP CONSTRAINT "_VisaRequirementToVisaType_A_fkey";

-- DropForeignKey
ALTER TABLE "_VisaRequirementToVisaType" DROP CONSTRAINT "_VisaRequirementToVisaType_B_fkey";

-- AlterTable
ALTER TABLE "visa_requirement" ADD COLUMN     "field" TEXT,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visa_type_id" TEXT;

-- AlterTable
ALTER TABLE "visa_type" ADD COLUMN     "key" TEXT;

-- DropTable
DROP TABLE "_VisaRequirementToVisaType";

-- CreateIndex
CREATE UNIQUE INDEX "visa_type_key_key" ON "visa_type"("key");

-- AddForeignKey
ALTER TABLE "visa_requirement" ADD CONSTRAINT "visa_requirement_visa_type_id_fkey" FOREIGN KEY ("visa_type_id") REFERENCES "visa_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
