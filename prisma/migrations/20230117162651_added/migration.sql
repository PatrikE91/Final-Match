/*
  Warnings:

  - You are about to drop the column `contactId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Profile_contactId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "contactId";

-- CreateTable
CREATE TABLE "Rejected" (
    "userIdA" INTEGER NOT NULL,
    "userIdB" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Match" (
    "userIdA" INTEGER NOT NULL,
    "userIdB" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Rejected_userIdA_userIdB_key" ON "Rejected"("userIdA", "userIdB");

-- CreateIndex
CREATE UNIQUE INDEX "Match_userIdA_userIdB_key" ON "Match"("userIdA", "userIdB");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToUser_AB_unique" ON "_RoomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToUser_B_index" ON "_RoomToUser"("B");

-- AddForeignKey
ALTER TABLE "Rejected" ADD CONSTRAINT "Rejected_userIdA_fkey" FOREIGN KEY ("userIdA") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rejected" ADD CONSTRAINT "Rejected_userIdB_fkey" FOREIGN KEY ("userIdB") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userIdA_fkey" FOREIGN KEY ("userIdA") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userIdB_fkey" FOREIGN KEY ("userIdB") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
