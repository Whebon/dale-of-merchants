<?php

require_once(APP_GAMEMODULE_PATH.'module/table/table.game.php');

//TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//decide what to do with the whole 'until_end_of_turn' and 'until_end_of_build' effect lifetimes

if (!defined('EXPIRES_NEVER')) {
    define('EXPIRES_NEVER', 0);
    define('EXPIRES_ON_END_OF_TURN', 1);
}

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
        $this->loadFromDb();
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
     * @param int $expires (optonal) default EXPIRES_ON_END_OF_TURN. Describes when this effect will wear off
     */
    function insert(int $card_id, int $type_id, int $target = -1, int $expires = EXPIRES_ON_END_OF_TURN) {
        $sql = "INSERT INTO effect (card_id, type_id, target, expires) VALUES ($card_id, $type_id, $target, $expires) ";
        $this->game->DbQuery($sql);
        $this->cache[] = array(
            "card_id" => $card_id,
            "type_id" => $type_id,
            "target" => $target,
            "expires" => $expires
        );
    }

    /**
     * Update the card effect's target
     * @param int $card_id the card that caused the effect
     * @param int $type_id the type of effect
     * @param int $target new value for the target
     */
    function updateTarget(int $card_id, int $type_id, int $target) {
        $sql = "UPDATE effect SET target=$target WHERE card_id=$card_id AND type_id=$type_id";
        $this->game->DbQuery($sql);
        $found = false;
        foreach ($this->cache as $index => $row) {
            if ($row["card_id"] == $card_id && $row["type_id"] == $type_id) {
                $this->cache[$index]["target"] = $target;
                $found = true;
            }
        }
        if ($found == false) {
            throw new BgaVisibleSystemException("Card id $card_id has no active effect with type_id $type_id, so the effect cannot be updated");
        }
    }

    /**
     * Return the target of the FIRST effect of the given card id. If none was found, return null
     * @param int $card_id
     * @param int $type_id (optional) - if provided, the effect must be of exactly the given type id
     */
    function getTarget(int $card_id, int $type_id = null) {
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id && ($type_id == null || $type_id == $row["type_id"])) {
                return $row["target"];
            }
        }
        return null;
    }

    /**
     * Return true if a row with the given type_id exists
     * @param int $type_id
     * @param int $target (optional) the card must have target exactly this target
     */
    function containsEffectOfTypeId(int $type_id, int $target = null) {
        foreach ($this->cache as $row) {
            if ($row["type_id"] == $type_id && ($target == null || $target == $row["target"])) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return the number of active effects of the given card type
     */
    function countEffectsOfTypeId(int $type_id) {
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
     * @param int $type_id
     * @param int $target (optional) the card must have target exactly this target
     */
    function getEffectsByTypeId(int $type_id, int $target = null) {
        $effects = array();
        foreach ($this->cache as $row) {
            if ($row["type_id"] == $type_id && ($target == null || $target == $row["target"])) {
                $effects[] = $row;
            }
        }
        return $effects;
    }

    /**
     * Return all the targets of a given card type (includes invalid targets (-1)).
     * @param int $type_id
     */
    function getTargetsByTypeId(int $type_id) {
        $targets = array();
        foreach ($this->cache as $row) {
            if ($row["type_id"] == $type_id) {
                $targets[] = $row["target"];
            }
        }
        return $targets;
    }

    /**
     * Delete the chameleon binding effect for the specified card
     * @param int $card_id
     * @param int $type_id
     */
    function unbindChameleon(int $card_id) {
        $chameleon_type_ids = implode(",", array(CT_FLEXIBLESHOPKEEPER, CT_REFLECTION, CT_GOODOLDTIMES, CT_TRENDSETTING, CT_SEEINGDOUBLES));
        $sql = "DELETE FROM effect WHERE card_id = $card_id AND target >= 0 AND type_id IN ($chameleon_type_ids)";
        $this->game->DbQuery($sql);
        $this->loadFromDb();
    }

    /**
     * Expire all effects with EXPIRES_ON_END_OF_TURN
     */
    function expireEndOfTurn() {
        $sql = "DELETE FROM effect WHERE expires = ".EXPIRES_ON_END_OF_TURN;
        $this->game->DbQuery($sql);
        $this->loadFromDb();
    }
}
