-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'INACTIVE');

-- CreateTable
CREATE TABLE "Church" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "welcome_message" TEXT,
    "region" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "barangay" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "full_address" TEXT NOT NULL,
    "status" "PublishStatus" NOT NULL,
    "user_id" TEXT NOT NULL,
    "steps_completed" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchProfile" (
    "id" TEXT NOT NULL,
    "mission" TEXT,
    "vision" TEXT,
    "church_size" INTEGER NOT NULL,
    "communion_frequency" TEXT NOT NULL,
    "church_id" TEXT NOT NULL,
    "services" JSONB[],
    "ministries" JSONB[],
    "public_services" JSONB[],
    "confessions" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChurchProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchContact" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "contact_numbers" JSONB[],
    "social_links" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_id" TEXT NOT NULL,

    CONSTRAINT "ChurchContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pastor" (
    "id" TEXT NOT NULL,
    "photo" TEXT,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_id" TEXT NOT NULL,

    CONSTRAINT "Pastor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchMap" (
    "id" TEXT NOT NULL,
    "landmarks" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_id" TEXT NOT NULL,

    CONSTRAINT "ChurchMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchMedia" (
    "id" TEXT NOT NULL,
    "gallery" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_id" TEXT NOT NULL,

    CONSTRAINT "ChurchMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChurchProfile_church_id_key" ON "ChurchProfile"("church_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChurchContact_church_id_key" ON "ChurchContact"("church_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pastor_church_id_key" ON "Pastor"("church_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChurchMap_church_id_key" ON "ChurchMap"("church_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChurchMedia_church_id_key" ON "ChurchMedia"("church_id");

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchProfile" ADD CONSTRAINT "ChurchProfile_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchContact" ADD CONSTRAINT "ChurchContact_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pastor" ADD CONSTRAINT "Pastor_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchMap" ADD CONSTRAINT "ChurchMap_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchMedia" ADD CONSTRAINT "ChurchMedia_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
