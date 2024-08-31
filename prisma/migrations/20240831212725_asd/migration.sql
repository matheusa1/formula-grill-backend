/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `chef` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chef_name_key" ON "chef"("name");
