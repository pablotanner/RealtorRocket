/*
  Warnings:

  - You are about to drop the column `subject` on the `message` table. All the data in the column will be lost.
  - Added the required column `type` to the `message` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `content` on the `message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "subject",
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL;

-- CreateIndex
CREATE INDEX "idx_message_conversation_timestamp" ON "message"("senderId", "receiverId", "time_stamp");
