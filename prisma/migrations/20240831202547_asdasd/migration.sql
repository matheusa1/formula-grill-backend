/*
  Warnings:

  - Made the column `phone` on table `reservas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "reservas" ALTER COLUMN "phone" SET NOT NULL;
