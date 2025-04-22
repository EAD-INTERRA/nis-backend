/*
  Warnings:

  - You are about to drop the column `letter_from_relevant_agency_or_mou_on_cultural_exchange_status_` on the `visa_documents_cstm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "visa_documents_cstm" DROP COLUMN "letter_from_relevant_agency_or_mou_on_cultural_exchange_status_",
ADD COLUMN     "letter_from_relevant_agency_or_mou_on_cultural_exchange_status_c" TEXT;
