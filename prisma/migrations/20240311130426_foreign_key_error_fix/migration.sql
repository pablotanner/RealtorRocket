-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_user_id_fkey";

-- DropForeignKey
ALTER TABLE "lease" DROP CONSTRAINT "lease_realtor_id_fkey";

-- DropForeignKey
ALTER TABLE "lease_payment_schedules" DROP CONSTRAINT "lease_payment_schedules_lease_id_fkey";

-- AlterTable
ALTER TABLE "lease_payment_schedules" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "lease" ADD CONSTRAINT "lease_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "realtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lease_payment_schedules" ADD CONSTRAINT "lease_payment_schedules_lease_id_fkey" FOREIGN KEY ("lease_id") REFERENCES "lease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
