/*
  Warnings:

  - Added the required column `phone` to the `reservas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatCount` to the `reservas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservas" ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "seatCount" INTEGER NOT NULL;
