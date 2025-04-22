/*
  Warnings:

  - You are about to drop the column `country_id` on the `travel_info` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_arrrival` on the `travel_info` table. All the data in the column will be lost.
  - Added the required column `country_of_departure_id` to the `travel_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_arrival` to the `travel_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "travel_info" DROP CONSTRAINT "travel_info_country_id_fkey";

-- DropIndex
DROP INDEX "travel_info_applicant_id_country_id_port_id_idx";

-- AlterTable
ALTER TABLE "travel_info" DROP COLUMN "country_id",
DROP COLUMN "date_of_arrrival",
ADD COLUMN     "country_of_departure_id" TEXT NOT NULL,
ADD COLUMN     "date_of_arrival" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "travel_info_applicant_id_country_of_departure_id_port_id_idx" ON "travel_info"("applicant_id", "country_of_departure_id", "port_id");

-- AddForeignKey
ALTER TABLE "travel_info" ADD CONSTRAINT "travel_info_country_of_departure_id_fkey" FOREIGN KEY ("country_of_departure_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
