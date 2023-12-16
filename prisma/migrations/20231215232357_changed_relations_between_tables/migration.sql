/*
  Warnings:

  - You are about to drop the column `userId` on the `tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_userId_fkey`;

-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `UserTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `taskId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_tasksTousers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_tasksTousers_AB_unique`(`A`, `B`),
    INDEX `_tasksTousers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserTask` ADD CONSTRAINT `UserTask_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTask` ADD CONSTRAINT `UserTask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `tasks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_tasksTousers` ADD CONSTRAINT `_tasksTousers_A_fkey` FOREIGN KEY (`A`) REFERENCES `tasks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_tasksTousers` ADD CONSTRAINT `_tasksTousers_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
