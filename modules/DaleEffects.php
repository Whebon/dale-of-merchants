<?php

require_once(APP_GAMEMODULE_PATH.'module/table/table.game.php');

//TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//decide what to do with the whole 'until_end_of_turn' and 'until_end_of_build' effect lifetimes

if (!defined('EXPIRES_NEVER')) {
    define('EXPIRES_NEVER', 0);
    define('EXPIRES_ON_END_OF_TURN', 1);
    define('EXPIRES_ON_END_OF_BUILD', 2);
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
    function contains(int $card_id) {
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return true if a row with the given card_id exists
     * @param int $card_id
     * @param int $target (optional) the card must have target exactly this target
     */
    function containsEffectOfCardId(int $card_id, int $target = null) {
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id && ($target == null || $target == $row["target"])) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return the FIRST effect of the given card id. If none was found, return null
     */
    function getEffectByCardId(int $card_id) {
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id) {
                return $row;
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
     * Expire all effects with EXPIRES_ON_END_OF_TURN
     */
    function expireEndOfTurn() {
        $sql = "DELETE FROM effect WHERE expires = ".EXPIRES_ON_END_OF_TURN;
        $this->game->DbQuery($sql);
        $this->loadFromDb();
    }

    /**
     * Expire all effects with EXPIRES_ON_END_OF_BUILD.
     * @param bool $return (optional) default false. If true, return the deleted effects.
     */
    function expireEndOfBuild(bool $return = false) {
        if ($return) {
            $deleted_effects = array();
            foreach ($this->cache as $row) {
                if ($row["expires"] == EXPIRES_ON_END_OF_BUILD) {
                    $deleted_effects[] = $row;
                }
            }
        }
        else {
            $deleted_effects = null;
        }
        $sql = "DELETE FROM effect WHERE expires = ".EXPIRES_ON_END_OF_BUILD;
        $this->game->DbQuery($sql);
        $this->loadFromDb();
        return $deleted_effects;
    }
}
