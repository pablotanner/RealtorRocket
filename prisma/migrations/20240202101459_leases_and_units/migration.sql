/*
  Warnings:

  - The values [DEMO,RENTER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `icon` on the `amenity` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `amenity` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `amenity` table. All the data in the column will be lost.
  - You are about to drop the column `rental_id` on the `document` table. All the data in the column will be lost.
  - You are about to drop the column `rental_id` on the `maintenance_request` table. All the data in the column will be lost.
  - You are about to drop the column `bathrooms` on the `real_estate_object` table. All the data in the column will be lost.
  - You are about to drop the column `bedrooms` on the `real_estate_object` table. All the data in the column will be lost.
  - You are about to drop the column `garages` on the `real_estate_object` table. All the data in the column will be lost.
  - You are about to drop the column `listing_status` on the `real_estate_object` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `real_estate_object` table. All the data in the column will be lost.
  - You are about to drop the column `num_of_rooms` on the `real_estate_object` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `real_estate_object` table. All the data in the column will be lost.
  - You are about to drop the column `square_feet` on the `real_estate_object` table. All the data in the column will be lost.
  - You are about to drop the column `stories` on the `real_estate_object` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rental` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `renter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lease_id` to the `maintenance_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realtor_id` to the `maintenance_request` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AmenityCategory" AS ENUM ('RECREATIONAL', 'TECHNICAL', 'SERVICE', 'SAFETY', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('REALTOR', 'TENANT', 'ADMIN', 'GUEST');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'REALTOR';
COMMIT;

-- DropForeignKey
ALTER TABLE "document" DROP CONSTRAINT "document_rental_id_fkey";

-- DropForeignKey
ALTER TABLE "document" DROP CONSTRAINT "document_user_id_fkey";

-- DropForeignKey
ALTER TABLE "maintenance_request" DROP CONSTRAINT "maintenance_request_rental_id_fkey";

-- DropForeignKey
ALTER TABLE "maintenance_request" DROP CONSTRAINT "maintenance_request_reporter_id_fkey";

-- DropForeignKey
ALTER TABLE "real_estate_object" DROP CONSTRAINT "real_estate_object_locationId_fkey";

-- DropForeignKey
ALTER TABLE "real_estate_object" DROP CONSTRAINT "real_estate_object_realtor_id_fkey";

-- DropForeignKey
ALTER TABLE "realtor" DROP CONSTRAINT "realtor_user_id_fkey";

-- DropForeignKey
ALTER TABLE "rental" DROP CONSTRAINT "rental_real_estate_object_id_fkey";

-- DropForeignKey
ALTER TABLE "rental" DROP CONSTRAINT "rental_realtor_id_fkey";

-- DropForeignKey
ALTER TABLE "rental" DROP CONSTRAINT "rental_renter_id_fkey";

-- DropForeignKey
ALTER TABLE "renter" DROP CONSTRAINT "renter_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_location_id_fkey";

-- AlterTable
ALTER TABLE "AmenitiesOnRealEstate" ADD COLUMN     "unitId" INTEGER;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "unit_id" INTEGER;

-- AlterTable
ALTER TABLE "amenity" DROP COLUMN "icon",
DROP COLUMN "type",
DROP COLUMN "value",
ADD COLUMN     "category" "AmenityCategory",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "document" DROP COLUMN "rental_id",
ADD COLUMN     "lease_id" INTEGER,
ADD COLUMN     "unit_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "maintenance_request" DROP COLUMN "rental_id",
ADD COLUMN     "lease_id" INTEGER NOT NULL,
ADD COLUMN     "realtor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "real_estate_object" DROP COLUMN "bathrooms",
DROP COLUMN "bedrooms",
DROP COLUMN "garages",
DROP COLUMN "listing_status",
DROP COLUMN "locationId",
DROP COLUMN "num_of_rooms",
DROP COLUMN "price",
DROP COLUMN "square_feet",
DROP COLUMN "stories",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "currency" "CurrencyCode" DEFAULT 'USD',
ADD COLUMN     "market_price" DOUBLE PRECISION,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "zip" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "location_id",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "zip" TEXT;

-- DropTable
DROP TABLE "location";

-- DropTable
DROP TABLE "rental";

-- DropTable
DROP TABLE "renter";

-- DropEnum
DROP TYPE "AmenityType";

-- CreateTable
CREATE TABLE "tenant" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "civil_status" TEXT,
    "occupation" TEXT,
    "income" DOUBLE PRECISION,
    "credit_score" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unit_number" TEXT,
    "floor" INTEGER,
    "unit_size" DOUBLE PRECISION,
    "num_of_floors" INTEGER,
    "num_of_rooms" INTEGER,
    "num_of_bedrooms" INTEGER,
    "num_of_bathrooms" INTEGER,
    "garages" INTEGER,
    "rental_price" DOUBLE PRECISION,
    "currency" "CurrencyCode" DEFAULT 'USD',
    "status" "ListingStatus" DEFAULT 'ACTIVE',
    "real_estate_object_id" INTEGER NOT NULL,
    "realtor_id" INTEGER NOT NULL,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lease" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "rental_price" DOUBLE PRECISION,
    "lease_length" INTEGER,
    "lease_terms" TEXT,
    "currency" "CurrencyCode" DEFAULT 'USD',
    "total_rent_due" DOUBLE PRECISION,
    "rent_paid" DOUBLE PRECISION,
    "last_payment_date" TIMESTAMP(3),
    "tenant_id" INTEGER NOT NULL,
    "realtor_id" INTEGER NOT NULL,
    "unit_id" INTEGER,

    CONSTRAINT "lease_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_user_id_key" ON "tenant"("user_id");

-- AddForeignKey
ALTER TABLE "realtor" ADD CONSTRAINT "realtor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "real_estate_object" ADD CONSTRAINT "real_estate_object_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "realtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesOnRealEstate" ADD CONSTRAINT "AmenitiesOnRealEstate_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_real_estate_object_id_fkey" FOREIGN KEY ("real_estate_object_id") REFERENCES "real_estate_object"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "realtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lease" ADD CONSTRAINT "lease_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lease" ADD CONSTRAINT "lease_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "realtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lease" ADD CONSTRAINT "lease_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_lease_id_fkey" FOREIGN KEY ("lease_id") REFERENCES "lease"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_lease_id_fkey" FOREIGN KEY ("lease_id") REFERENCES "lease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "realtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
