/*
  Warnings:

  - Added the required column `userA` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userB` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "userA" INTEGER NOT NULL,
ADD COLUMN     "userB" INTEGER NOT NULL;
