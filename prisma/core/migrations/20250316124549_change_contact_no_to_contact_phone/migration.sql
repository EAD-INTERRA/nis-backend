/*
  Warnings:

  - You are about to drop the column `contact_no` on the `contact_detail` table. All the data in the column will be lost.
  - Added the required column `contact_phone` to the `contact_detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact_detail" DROP COLUMN "contact_no",
ADD COLUMN     "contact_phone" TEXT NOT NULL;
