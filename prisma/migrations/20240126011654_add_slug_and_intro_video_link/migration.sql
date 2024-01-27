/*
  Warnings:

  - Added the required column `slug` to the `Church` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Church" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ChurchMedia" ADD COLUMN     "intro_video_link" TEXT;
