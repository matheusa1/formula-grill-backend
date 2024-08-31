/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `pratos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "pratos_descricao_key";

-- CreateIndex
CREATE UNIQUE INDEX "pratos_nome_key" ON "pratos"("nome");
