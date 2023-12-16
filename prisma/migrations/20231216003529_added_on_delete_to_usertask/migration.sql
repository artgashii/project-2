-- DropForeignKey
ALTER TABLE `UserTask` DROP FOREIGN KEY `UserTask_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTask` DROP FOREIGN KEY `UserTask_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserTask` ADD CONSTRAINT `UserTask_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTask` ADD CONSTRAINT `UserTask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `tasks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
