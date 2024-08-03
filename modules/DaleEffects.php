<?php

require_once(APP_GAMEMODULE_PATH.'module/table/table.game.php');

// `effect_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
// `card_id` int(10) unsigned NOT NULL,
// `type_id` int(11) NOT NULL,
// `target` int(11) NOT NULL,

/**
 * Card Effect Management
 * 
 * This class is responsible for managing card effects that last until end of turn.
 */
class DaleEffects {
    public Table $game;
    public array $cache;

    function __construct(Table $game) {
        $this->game = $game;
    }

    /**
     * Fetch and cache all rows from the db.
     */
    function loadFromDb() {
        $sql = "SELECT * FROM effect";
        $this->cache = $this->game->getCollectionFromDB($sql);
        return $this->cache;
    }

    /**
     * Insert a card effect into the db
     * @param int $card_id the card that caused the effect
     * @param int $type_id the effective type of the card that caused the effect (CT).
     * @param int $target (optional) default -1. If the card effect has some kind of target (typically another card_id), use this column to store that information
     * @param bool $delete_on_turn_end (optonal) default true. If true, delete this effect at the end of the turn
     */
    function insert(int $card_id, int $type_id, int $target=-1, bool $until_end_of_turn = true) {
        $sql = "INSERT INTO effect (card_id, type_id, target, until_end_of_turn) VALUES ($card_id, $type_id, $target, $until_end_of_turn) ";
        $this->game->DbQuery($sql);
        $this->cache[] = array(
            "card_id" => $card_id,
            "type_id" => $type_id,
            "target" => $target,
            "until_end_of_turn" => $until_end_of_turn
        );
    }

    /**
     * Update the card effect into the db
     * @param int $card_id the card that caused the effect
     * @param int $target new value for the target
     */
    function updateTargetByCardId(int $card_id, int $target) {
        $sql = "UPDATE effect SET target=$target WHERE card_id=$card_id";
        $found = false;
        $this->game->DbQuery($sql);
        foreach ($this->cache as $index => $row) {
            if ($row["card_id"] == $card_id) {
                $this->cache[$index]["target"] = $target;
                $found = true;
            }
        }
        if ($found == false) {
            throw new BgaVisibleSystemException("Card id $card_id has no active effect, so the effect cannot be updated");
        }
    }

    /**
     * Return true if a row with the given card_id exists
     */
    function containsCardId($card_id) {
        //Linear scan over the cache to find rows with the desired card_id
        //Is this faster than a SELECT query...? The wiki says db queries are very slow. 
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return the FIRST effect of the given card id. If none was found, return null
     */
    function getEffectByCardId($card_id) {
        //Linear scan over the cache to find rows with the desired type_id
        //Is this faster than a SELECT query...? The wiki says db queries are very slow. 
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id) {
                return $row;
            }
        }
        return null;
    }

    /**
     * Return the number of active effects of the given card type
     */
    function countEffectsOfTypeId($type_id) {
        //Linear scan over the cache to find rows with the desired type_id
        //Is this faster than a SELECT query...? The wiki says db queries are very slow. 
        $nbr = 0;
        foreach ($this->cache as $row) {
            if ($row["type_id"] == $type_id) {
                $nbr++;
            }
        }
        return $nbr;
    }

    /**
     * Return all the active effects of the given card type
     */
    function getEffectsByTypeId($type_id) {
        //Linear scan over the cache to find rows with the desired type_id
        //Is this faster than a SELECT query...? The wiki says db queries are very slow. 
        $effects = array();
        foreach ($this->cache as $row) {
            if ($row["type_id"] == $type_id) {
                $effects[] = $row;
            }
        }
        return $effects;
    }

    /**
     * Delete all "until_end_of_turn" effects
     */
    function endTurn() {
        $sql = "DELETE FROM effect WHERE until_end_of_turn = true";
        $this->game->DbQuery($sql);
        $this->loadFromDb();
    }
}
