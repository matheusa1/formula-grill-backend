/*
  Warnings:

  - You are about to drop the column `nome` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `pratos` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `pratos` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `pratos` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `pratos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `pratos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `pratos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `pratos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `pratos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `pratos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pratos" DROP CONSTRAINT "pratos_categoriaId_fkey";

-- DropIndex
DROP INDEX "pratos_nome_key";

-- AlterTable
ALTER TABLE "categorias" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pratos" DROP COLUMN "categoriaId",
DROP COLUMN "descricao",
DROP COLUMN "imagem",
DROP COLUMN "nome",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pratos_name_key" ON "pratos"("name");

-- AddForeignKey
ALTER TABLE "pratos" ADD CONSTRAINT "pratos_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
