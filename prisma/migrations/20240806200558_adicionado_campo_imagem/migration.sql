/*
  Warnings:

  - Added the required column `imagem` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categorias" ADD COLUMN     "imagem" TEXT NOT NULL;
