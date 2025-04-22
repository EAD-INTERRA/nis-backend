/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `passport_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `visa_requirement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `visa_type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "passport_type_name_key" ON "passport_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "visa_requirement_name_key" ON "visa_requirement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "visa_type_name_key" ON "visa_type"("name");
