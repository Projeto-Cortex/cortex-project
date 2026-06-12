-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_cardapioId_fkey` FOREIGN KEY (`cardapioId`) REFERENCES `cardapios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
