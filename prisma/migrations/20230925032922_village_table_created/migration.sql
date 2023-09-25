-- CreateTable
CREATE TABLE `Village` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shortcode` VARCHAR(191) NOT NULL,
    `network_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Village` ADD CONSTRAINT `Village_network_id_fkey` FOREIGN KEY (`network_id`) REFERENCES `Network`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
