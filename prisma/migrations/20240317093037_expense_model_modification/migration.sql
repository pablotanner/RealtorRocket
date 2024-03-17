/*
  Warnings:

  - Added the required column `realtor_id` to the `expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expense" ADD COLUMN     "realtor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "realtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
