/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `nationality` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "nationality_external_id_key" ON "nationality"("external_id");
