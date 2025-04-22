-- AlterTable
ALTER TABLE "applicant" ADD COLUMN     "passport_type_id" TEXT,
ADD COLUMN     "visa_type_id" TEXT;

-- AddForeignKey
ALTER TABLE "applicant" ADD CONSTRAINT "applicant_visa_type_id_fkey" FOREIGN KEY ("visa_type_id") REFERENCES "visa_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicant" ADD CONSTRAINT "applicant_passport_type_id_fkey" FOREIGN KEY ("passport_type_id") REFERENCES "passport_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
