/*
  Warnings:

  - You are about to drop the column `imagem` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categorias" DROP COLUMN "imagem";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "age";

-- CreateTable
CREATE TABLE "mesas" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mesas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mesas_code_key" ON "mesas"("code");
