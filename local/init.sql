CREATE TABLE IF NOT EXISTS `user` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(64) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `current_avatar` INT UNSIGNED NULL,
    `lastvisit` DATETIME NULL,
    `chat_allowed` TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `avatar` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `character_id` VARCHAR(64) NULL,
    `coins_count` INT NOT NULL DEFAULT 0,
    `level` INT NOT NULL DEFAULT 1,
    `score` INT NOT NULL DEFAULT 0,
    `speed` FLOAT NULL,
    `normal_speed` FLOAT NULL,
    `attack_speed` FLOAT NULL,
    `room_id` VARCHAR(64) NULL,
    `x` FLOAT NULL,
    `y` FLOAT NULL,
    `maxHealth` FLOAT NULL,
    `health` FLOAT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `chat_message` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(64) NOT NULL,
    `text` VARCHAR(500) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `edited_at` DATETIME NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
