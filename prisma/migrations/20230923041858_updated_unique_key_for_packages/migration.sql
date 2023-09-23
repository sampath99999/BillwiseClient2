/*
  Warnings:

  - A unique constraint covering the columns `[network_id,name]` on the table `Package` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Package_network_id_name_key` ON `Package`(`network_id`, `name`);
