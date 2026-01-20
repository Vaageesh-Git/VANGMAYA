/*
  Warnings:

  - Made the column `searchKey` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `searchKey` VARCHAR(191) NOT NULL;
