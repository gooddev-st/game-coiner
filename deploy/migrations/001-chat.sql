-- Чат: доступ по флагу пользователя и хранение сообщений
ALTER TABLE `user` ADD COLUMN IF NOT EXISTS `chat_allowed` TINYINT(1) NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS `chat_message` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(64) NOT NULL,
    `text` VARCHAR(500) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `edited_at` DATETIME NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
