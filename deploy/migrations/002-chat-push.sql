-- Подписки на пуши чата (Web Push): у пользователя может быть несколько - телефон, компьютер
CREATE TABLE IF NOT EXISTS `chat_push_subscription` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(64) NOT NULL,
    `endpoint` VARCHAR(512) NOT NULL,
    `p256dh` VARCHAR(255) NOT NULL,
    `auth` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `endpoint` (`endpoint`),
    KEY `login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
