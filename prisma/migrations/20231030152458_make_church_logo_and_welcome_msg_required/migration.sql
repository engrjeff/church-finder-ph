/*
  Warnings:

  - Made the column `logo` on table `Church` required. This step will fail if there are existing NULL values in that column.
  - Made the column `welcome_message` on table `Church` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Church" ALTER COLUMN "logo" SET NOT NULL,
ALTER COLUMN "welcome_message" SET NOT NULL;
