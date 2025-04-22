/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `visa_type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "visa_type_name_key" ON "visa_type"("name");
