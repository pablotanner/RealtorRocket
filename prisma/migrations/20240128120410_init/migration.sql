-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('REALTOR', 'DEMO', 'RENTER');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('INACTIVE', 'ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "RealEstateType" AS ENUM ('SINGLE_FAMILY_HOME', 'MULTI_FAMILY_HOME', 'CONDO', 'APARTMENT', 'TOWNHOUSE', 'LUXURY', 'OFFICE', 'RETAIL', 'INDUSTRIAL', 'LAND', 'FARM');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'RENTED', 'NOT_RENTED', 'RESERVED', 'SOLD', 'PENDING', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('USD', 'CAD', 'EUR', 'GBP', 'AUD', 'NZD', 'JPY', 'CNY', 'INR', 'RUB', 'BRL', 'CHF', 'KRW', 'MXN', 'SGD', 'TRY', 'NGN', 'PHP', 'SEK', 'ARS', 'NOK', 'DKK', 'ILS', 'CLP', 'COP', 'ZAR', 'HKD', 'TWD', 'PLN', 'THB', 'IDR', 'HUF', 'CZK', 'AED', 'SAR', 'MYR', 'RON', 'PEN', 'KWD', 'QAR', 'CRC', 'DOP', 'HRK', 'HNL', 'ISK', 'PKR', 'EGP', 'XCD', 'MAD', 'OMR', 'BOB', 'LKR', 'BGN', 'BHD', 'VND', 'UAH', 'IQD', 'JOD', 'BDT', 'KES', 'UYU', 'AZN', 'LBP', 'DZD', 'UZS', 'TND', 'GHS', 'BWP', 'TZS', 'BYN', 'KZT', 'RSD', 'TTD', 'UGX', 'AOA', 'COPPER', 'XAU', 'XAG', 'XPD', 'XPT', 'XDR', 'XOF', 'XPF', 'XAF', 'XFU', 'XBA', 'XBB', 'XBC', 'XBD', 'XTS', 'XXX', 'ZMW');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('API', 'EMAIL', 'PASSWORD_RESET', 'EMAIL_CONFIRMATION', 'EMAIL_CHANGE');

-- CreateEnum
CREATE TYPE "AmenityType" AS ENUM ('BOOLEAN', 'NUMBER', 'STRING');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "MaintenanceStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('LEASE', 'APPLICATION', 'OTHER', 'INVOICE', 'REPORT');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "name" TEXT,
    "dob" TIMESTAMP(3),
    "currency_code" "CurrencyCode",
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "plaid_link_token" TEXT,
    "title" TEXT,
    "location_id" INTEGER,
    "picture_id" INTEGER,
    "phone" TEXT,
    "website" TEXT,
    "company" TEXT,
    "bio" TEXT,
    "status" "AccountStatus" NOT NULL DEFAULT 'OFFLINE',
    "role" "UserRole" DEFAULT 'REALTOR',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realtor" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "realtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "renter" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "civil_status" TEXT,
    "occupation" TEXT,
    "income" DOUBLE PRECISION,
    "credit_score" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "renter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "type" "TokenType" NOT NULL,
    "email_token" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "expiration" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "real_estate_object" (
    "id" SERIAL NOT NULL,
    "listing_status" "ListingStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "num_of_rooms" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "square_feet" DOUBLE PRECISION,
    "lot_size" DOUBLE PRECISION,
    "year_built" INTEGER,
    "garages" INTEGER,
    "stories" INTEGER,
    "locationId" INTEGER,
    "real_estate_type" "RealEstateType",
    "realtor_id" INTEGER NOT NULL,

    CONSTRAINT "real_estate_object_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "country" TEXT,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT DEFAULT 'true',
    "type" "AmenityType" DEFAULT 'BOOLEAN',
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenitiesOnRealEstate" (
    "amenity_id" INTEGER NOT NULL,
    "real_estate_object_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "AmenitiesOnRealEstate_pkey" PRIMARY KEY ("amenity_id","real_estate_object_id")
);

-- CreateTable
CREATE TABLE "preference" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN,

    CONSTRAINT "preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferencesOnRealEstate" (
    "preference_id" INTEGER NOT NULL,
    "real_estate_object_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "PreferencesOnRealEstate_pkey" PRIMARY KEY ("preference_id","real_estate_object_id")
);

-- CreateTable
CREATE TABLE "rental" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3) NOT NULL,
    "rental_price" DOUBLE PRECISION,
    "lease_length" INTEGER,
    "lease_terms" TEXT,
    "total_rent_due" DOUBLE PRECISION,
    "rent_paid" DOUBLE PRECISION,
    "last_payment_date" TIMESTAMP(3),
    "renter_id" INTEGER NOT NULL,
    "real_estate_object_id" INTEGER NOT NULL,
    "realtor_id" INTEGER NOT NULL,

    CONSTRAINT "rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "realEstateObjectId" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document" (
    "id" SERIAL NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "file_path" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "real_estate_object_id" INTEGER,
    "rental_id" INTEGER,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "time_stamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_request" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMPTZ(6) NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "status" "MaintenanceStatus",
    "priority" "Priority",
    "rental_id" INTEGER NOT NULL,
    "reporter_id" INTEGER NOT NULL,

    CONSTRAINT "maintenance_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "realtor_user_id_key" ON "realtor"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "renter_user_id_key" ON "renter"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "token_email_token_key" ON "token"("email_token");

-- CreateIndex
CREATE UNIQUE INDEX "amenity_name_key" ON "amenity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "preference_name_key" ON "preference"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_user_id_key" ON "Image"("user_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor" ADD CONSTRAINT "realtor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renter" ADD CONSTRAINT "renter_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "real_estate_object" ADD CONSTRAINT "real_estate_object_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "real_estate_object" ADD CONSTRAINT "real_estate_object_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesOnRealEstate" ADD CONSTRAINT "AmenitiesOnRealEstate_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesOnRealEstate" ADD CONSTRAINT "AmenitiesOnRealEstate_real_estate_object_id_fkey" FOREIGN KEY ("real_estate_object_id") REFERENCES "real_estate_object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferencesOnRealEstate" ADD CONSTRAINT "PreferencesOnRealEstate_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "preference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferencesOnRealEstate" ADD CONSTRAINT "PreferencesOnRealEstate_real_estate_object_id_fkey" FOREIGN KEY ("real_estate_object_id") REFERENCES "real_estate_object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_real_estate_object_id_fkey" FOREIGN KEY ("real_estate_object_id") REFERENCES "real_estate_object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_realEstateObjectId_fkey" FOREIGN KEY ("realEstateObjectId") REFERENCES "real_estate_object"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_real_estate_object_id_fkey" FOREIGN KEY ("real_estate_object_id") REFERENCES "real_estate_object"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "rental"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
