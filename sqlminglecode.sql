CREATE SCHEMA IF NOT EXISTS `TinderCloneDB_MalekOuaida` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `TinderCloneDB_MalekOuaida`;

-- Users Table
CREATE TABLE IF NOT EXISTS `Users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` CHAR(60) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
  `birthdate` DATE NOT NULL,
  `profile_picture_url` VARCHAR(255),
  `bio` TEXT,
  `registration_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username`),
  UNIQUE INDEX `email_UNIQUE` (`email`)
) ENGINE = InnoDB;

-- Interest Table
CREATE TABLE IF NOT EXISTS `Interest` (
  `InterestID` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `interest` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`InterestID`),
  INDEX `fk_user_id_idx` (`user_id` ASC),
  CONSTRAINT `interest_user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `Users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Photos Table
CREATE TABLE IF NOT EXISTS `Photos` (
  `photo_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `photo_url` VARCHAR(255) NOT NULL,
  `upload_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`photo_id`),
  INDEX `fk_photos_user_id_idx` (`user_id` ASC),
  CONSTRAINT `photos_user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `Users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Likes Table
CREATE TABLE IF NOT EXISTS `Likes` (
  `like_id` INT NOT NULL AUTO_INCREMENT,
  `liker_user_id` INT NOT NULL,
  `liked_user_id` INT NOT NULL,
  `is_match` TINYINT(1) NOT NULL DEFAULT 0,
  `like_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  INDEX `fk_liker_user_id_idx` (`liker_user_id`),
  INDEX `fk_liked_user_id_idx` (`liked_user_id`),
  CONSTRAINT `likes_liker_user_id_fk`
    FOREIGN KEY (`liker_user_id`)
    REFERENCES `Users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `likes_liked_user_id_fk`
    FOREIGN KEY (`liked_user_id`)
    REFERENCES `Users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Matches Table
CREATE TABLE IF NOT EXISTS `Matches` (
  `match_id` INT NOT NULL AUTO_INCREMENT,
  `liker_user_id` INT NOT NULL,
  `liked_user_id` INT NOT NULL,
  `match_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`match_id`),
  INDEX `fk_matches_liker_user_id_idx` (`liker_user_id`),
  INDEX `fk_matches_liked_user_id_idx` (`liked_user_id`),
  CONSTRAINT `matches_liker_user_id_fk`
    FOREIGN KEY (`liker_user_id`)
    REFERENCES `Users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `matches_liked_user_id_fk`
    FOREIGN KEY (`liked_user_id`)
    REFERENCES `Users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

DELIMITER //

CREATE TRIGGER after_like_insert 
AFTER INSERT ON Likes
FOR EACH ROW
BEGIN
    DECLARE match_exists INT DEFAULT 0;

    -- Check if there's already a like from the liked user to the liker user
    SELECT COUNT(*)
    INTO match_exists
    FROM Likes
    WHERE liker_user_id = NEW.liked_user_id AND liked_user_id = NEW.liker_user_id AND is_match = 0;

    -- If mutual like is found, update both like entries to is_match = 1 and insert into Matches table
    IF match_exists > 0 THEN
        -- Update the is_match field for both like records
        UPDATE Likes SET is_match = 1 WHERE liker_user_id = NEW.liked_user_id AND liked_user_id = NEW.liker_user_id;
        UPDATE Likes SET is_match = 1 WHERE liker_user_id = NEW.liker_user_id AND liked_user_id = NEW.liked_user_id;

        -- Insert the match record
        INSERT INTO Matches (liker_user_id, liked_user_id, match_date)
        VALUES (NEW.liker_user_id, NEW.liked_user_id, NOW());
    END IF;
END //

DELIMITER ;
