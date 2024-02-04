/*
  Warnings:

  - You are about to drop the column `realEstateObjectId` on the `Image` table. All the data in the column will be lost.
  - Made the column `user_id` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_realEstateObjectId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_user_id_fkey";

-- DropIndex
DROP INDEX "Image_user_id_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "realEstateObjectId",
ADD COLUMN     "real_estate_object_id" INTEGER,
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "avatar" TEXT;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_real_estate_object_id_fkey" FOREIGN KEY ("real_estate_object_id") REFERENCES "real_estate_object"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
