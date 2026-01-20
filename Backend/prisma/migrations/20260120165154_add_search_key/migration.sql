-- AlterTable
ALTER TABLE `Product` ADD COLUMN `searchKey` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Product_searchKey_idx` ON `Product`(`searchKey`);
