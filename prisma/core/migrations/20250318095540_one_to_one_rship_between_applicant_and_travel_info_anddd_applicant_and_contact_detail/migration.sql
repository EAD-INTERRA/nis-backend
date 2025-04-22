/*
  Warnings:

  - A unique constraint covering the columns `[applicant_id]` on the table `contact_detail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicant_id]` on the table `travel_info` will be added. If there are existing duplicate values, this will fail.
  - Made the column `applicant_id` on table `contact_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicant_id` on table `travel_info` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contact_detail" DROP CONSTRAINT "contact_detail_applicant_id_fkey";

-- DropForeignKey
ALTER TABLE "travel_info" DROP CONSTRAINT "travel_info_applicant_id_fkey";

-- AlterTable
ALTER TABLE "contact_detail" ALTER COLUMN "applicant_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "travel_info" ALTER COLUMN "applicant_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contact_detail_applicant_id_key" ON "contact_detail"("applicant_id");

-- CreateIndex
CREATE UNIQUE INDEX "travel_info_applicant_id_key" ON "travel_info"("applicant_id");

-- AddForeignKey
ALTER TABLE "travel_info" ADD CONSTRAINT "travel_info_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_detail" ADD CONSTRAINT "contact_detail_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
