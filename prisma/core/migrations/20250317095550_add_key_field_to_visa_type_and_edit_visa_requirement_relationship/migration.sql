/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `port_of_entry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "port_of_entry_name_key" ON "port_of_entry"("name");
