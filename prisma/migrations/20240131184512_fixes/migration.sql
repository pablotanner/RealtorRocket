/*
  Warnings:

  - You are about to drop the column `picture_id` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rental" ALTER COLUMN "end_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "picture_id",
ALTER COLUMN "currency_code" SET DEFAULT 'USD';
