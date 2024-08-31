/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `categorias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categorias_name_key" ON "categorias"("name");
