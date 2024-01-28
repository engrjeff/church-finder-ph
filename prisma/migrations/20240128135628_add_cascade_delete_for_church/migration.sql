-- DropForeignKey
ALTER TABLE "ChurchContact" DROP CONSTRAINT "ChurchContact_church_id_fkey";

-- DropForeignKey
ALTER TABLE "ChurchMap" DROP CONSTRAINT "ChurchMap_church_id_fkey";

-- DropForeignKey
ALTER TABLE "ChurchMedia" DROP CONSTRAINT "ChurchMedia_church_id_fkey";

-- DropForeignKey
ALTER TABLE "ChurchProfile" DROP CONSTRAINT "ChurchProfile_church_id_fkey";

-- DropForeignKey
ALTER TABLE "Pastor" DROP CONSTRAINT "Pastor_church_id_fkey";

-- AddForeignKey
ALTER TABLE "ChurchProfile" ADD CONSTRAINT "ChurchProfile_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchContact" ADD CONSTRAINT "ChurchContact_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pastor" ADD CONSTRAINT "Pastor_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchMap" ADD CONSTRAINT "ChurchMap_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchMedia" ADD CONSTRAINT "ChurchMedia_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;
