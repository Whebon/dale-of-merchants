
-- ------
-- BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
-- Dale implementation : © Bart Swinkels bart-man99@hotmail.com
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-- -----

-- dbmodel.sql

-- Create a standard "card" table to be used with the "Deck" tools

CREATE TABLE IF NOT EXISTS `card` (
  `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `card_type` varchar(16) NOT NULL,
  `card_type_arg` int(11) NOT NULL,
  `card_location` varchar(16) NOT NULL,
  `card_location_arg` int(11) NOT NULL,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- Create a table for the "DaleEffects" class

CREATE TABLE IF NOT EXISTS `effect` (
  `effect_id` int(10) unsigned NOT NULL,
  `effect_class` int(10) unsigned NOT NULL,
  `card_id` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `arg` int(10) unsigned,
  `chameleon_target_id` int(10) unsigned,
  PRIMARY KEY (`effect_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

-- Create a table for the deck selection 

CREATE TABLE IF NOT EXISTS `deckselection` (
  `preference_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `player_id` int(10) unsigned NOT NULL,
  `animalfolk_id` varchar(16) NOT NULL,
  `score` int(10) unsigned NOT NULL,
  PRIMARY KEY (`preference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create a table for character cards (future compatibility)

CREATE TABLE IF NOT EXISTS `character` (
  `character_id` int(10) unsigned NOT NULL,
  `player_id` int(10) unsigned NOT NULL,
  `arg` int(10) unsigned NOT NULL,
  PRIMARY KEY (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

-- Add a custom field to the standard "player" table

ALTER TABLE `player` ADD `player_coins` INT UNSIGNED NOT NULL DEFAULT '0';
