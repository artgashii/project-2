/*
  Warnings:

  - The values [employ] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('administrator', 'employee') NOT NULL;
