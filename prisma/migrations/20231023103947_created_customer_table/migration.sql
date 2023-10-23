-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `father_name` VARCHAR(191) NULL,
    `mother_name` VARCHAR(191) NULL,
    `phone_no` VARCHAR(191) NOT NULL,
    `street_id` INTEGER NOT NULL,
    `village_id` INTEGER NOT NULL,
    `network_id` INTEGER NOT NULL,
    `box_no` VARCHAR(191) NOT NULL,
    `mso_id` VARCHAR(191) NULL,
    `note` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_street_id_fkey` FOREIGN KEY (`street_id`) REFERENCES `Street`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_village_id_fkey` FOREIGN KEY (`village_id`) REFERENCES `Village`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_network_id_fkey` FOREIGN KEY (`network_id`) REFERENCES `Network`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
