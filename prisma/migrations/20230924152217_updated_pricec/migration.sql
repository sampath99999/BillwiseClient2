/*
 Warnings:
 - You are about to alter the column `price` on the `package` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
 */

-- AlterTable

ALTER TABLE `Package` MODIFY `price` DOUBLE NOT NULL;