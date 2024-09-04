<?php

require_once "DaleTableBasic.php";

if (!defined('EC_GLOBAL')) {
    define('EC_GLOBAL', 0);
    define('EC_MODIFICATION', 1);
}

/**
 * Card Effect Management
 * 
 * This class is responsible for managing card effects that last until end of turn.
 */
class DaleEffects {
    public DaleTableBasic $game;
    public array $cache;
    public int $last_effect_id;

    function __construct(DaleTableBasic $game) {
        $this->game = $game;
        $this->loadFromDb();
    }

    /**
     * Fetch and cache all rows from the db.
     */
    function loadFromDb() {
        $sql = "SELECT * FROM effect";
        $this->cache = $this->game->getCollectionFromDB($sql);
        if (count($this->cache) == 0) {
            $this->last_effect_id = 0;
        }
        else {
            $this->last_effect_id = max(array_keys($this->cache));
        }
        return $this->cache;
    }

    /**
     * Insert an effect into the db
     * @param int $effect_class either `EC_GLOBAL` or `EC_MODIFICATION`
     * @param int $card_id either the source of an global effect or the receiver of a modification effect
     * @param int $type_id uniquely defined by the physical card, used to determine the type of effect
     * @param int $arg (optional) additional information of the effect
     * @param int $chameleon_target_id (optional) only used by chameleon copying effects, stores the copied card_id
     * @return array newly added effect
     */
    private function insert(int $effect_class, int $card_id, int $type_id, ?int $arg, ?int $chameleon_target_id) {
        $this->last_effect_id += 1;
        $effect_id = $this->last_effect_id;
        $nullable_arg = ($arg == null) ? "NULL" : $arg;
        $nullable_chameleon_target_id = ($chameleon_target_id == null) ? "NULL" : $chameleon_target_id;
        $sql = "INSERT INTO effect (effect_id, effect_class, card_id, type_id, arg, chameleon_target_id) VALUES ($effect_id, $effect_class, $card_id, $type_id, $nullable_arg, $nullable_chameleon_target_id)";
        $this->game->DbQuery($sql);
        $row = array(
            "effect_id" => $effect_id,
            "effect_class" => $effect_class,
            "card_id" => $card_id,
            "type_id" => $type_id,
            "arg" => $arg,
            "chameleon_target_id" => $chameleon_target_id,
        );
        $this->cache[] = $row;
        $this->game->notifyAllPlayers('addEffect', '', array("effect" => $row));
        return $row;
    }

    /**
     * Insert a card modification effect into the db
     * @param int $card_id the card that will be modified by the effect
     * @param int $type_id the effective type of the effect (CT).
     * @param int $arg (optional) default null. additional information about the effect.
     * @param int $chameleon_target_id (optional) only used by chameleon copying effects, stores the copied card_id
     * @return array newly added effect
     */
    function insertModification(int $card_id, int $type_id, ?int $arg = null, ?int $chameleon_target_id = null) {
        return $this->insert(EC_MODIFICATION, $card_id, $type_id, $arg, $chameleon_target_id);
    }

    /**
     * Insert a card modification effect into the db
     * @param int $card_id the card that caused the global effect
     * @param int $type_id the effective type of the effect (CT).
     * @param int $arg (optional) default null. additional information about the effect.
     * @return array newly added effect
     */
    function insertGlobal(int $card_id, int $type_id, ?int $arg = null) {
        return $this->insert(EC_GLOBAL, $card_id, $type_id, $arg, null);
    }

    //TODO: safely delete this
    // /**
    //  * Update the card effect's target
    //  * @param int $card_id the card that caused the effect
    //  * @param int $type_id the type of effect
    //  * @param int $target new value for the target
    //  */
    // function updateTarget(int $card_id, int $type_id, int $target) {
    //     $sql = "UPDATE effect SET target=$target WHERE card_id=$card_id AND type_id=$type_id";
    //     $this->game->DbQuery($sql);
    //     $found = false;
    //     foreach ($this->cache as $index => $row) {
    //         if ($row["card_id"] == $card_id && $row["type_id"] == $type_id) {
    //             $this->cache[$index]["target"] = $target;
    //             $found = true;
    //         }
    //     }
    //     if ($found == false) {
    //         throw new BgaVisibleSystemException("Card id $card_id has no active effect with type_id $type_id, so the effect cannot be updated");
    //     }
    // }

    //////////////////////////////////////
    ///////     Public Getters     ///////
    //////////////////////////////////////

    /**
     * Applies all card modifications to calculate the value of the card
     */
    function getValue(array $dbcard) {
        $card_id = $dbcard["id"];
        $type_id = $this->getTypeId($dbcard);
        $value = $this->game->card_types[$type_id]['value'];
        $chameleonEffect = $this->getChameleonEffect($card_id);
        foreach ($this->cache as $row) {
            $is_copied_effect =  ($chameleonEffect != null) && ($row["card_id"] == $chameleonEffect["chameleon_target_id"]) && ($row["effect_id"] < $chameleonEffect["effect_id"]);
            if ($row["card_id"] == $card_id || $row["effect_class"] == EC_GLOBAL || $is_copied_effect) {
                switch($row["type_id"]) {
                    case CT_FLASHYSHOW:
                        $value += 1;
                        break;
                    case CT_BOLDHAGGLER:
                        $value += $row["arg"];
                        break;
                }
            }
        }
        return $value;
    }

    /**
     * Applies the chain of chameleon copying effects
     * @return int `effective_type_id` of the given card_id
     */
    function getTypeId(array $dbcard) {
        $card_id = $dbcard["id"];
        $type_id = $dbcard["type_arg"];
        if (
            $type_id == CT_FLEXIBLESHOPKEEPER || 
            $type_id == CT_REFLECTION ||  
            $type_id == CT_GOODOLDTIMES || 
            $type_id == CT_TRENDSETTING || 
            $type_id == CT_SEEINGDOUBLES
        ) {
            foreach ($this->cache as $row) {
                if ($row["card_id"] == $card_id && $row["type_id"] == $type_id && $row["chameleon_target_id"] != null && $row["chameleon_target_id"] != "NULL") {
                    $type_id = $row["arg"];
                }
            }
        }
        return $type_id;
    }

    /**
     * @return `true` if the passive ability of this card has been used already
     */
    function isPassiveUsed(array $dbcard) {
        $card_id = $dbcard["id"];
        $type_id = $this->getTypeId($dbcard);
        $chameleonEffect = $this->getChameleonEffect($card_id);
        foreach ($this->cache as $row) {
            $is_copied_effect =  ($chameleonEffect != null) && ($row["card_id"] == $chameleonEffect["chameleon_target_id"]) && ($row["effect_id"] < $chameleonEffect["effect_id"]);
            if (($row["card_id"] == $card_id || $is_copied_effect) && $row["type_id"] == $type_id && $row["chameleon_target_id"] == null) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return the first non-null arg of the specified card_id and type_id. If none was found, return null.
     * @return int
     */
    function getArg(int $card_id, int $type_id) {
        //WARNING: unused and incompatible with chameleon copying
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id && $row["type_id"] == $type_id && $row["arg"] != null && $row["arg"] != "NULL") {
                return $row["arg"];
            }
        }
        return null;
    }

    /**
     * Return the last chameleon copy effect that affects the specified card_id
     * @return array
     */
    function getChameleonEffect(int $card_id) {
        $effect = null;
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id && $row["chameleon_target_id"] != null && $row["chameleon_target_id"] != "NULL") {
                $effect = $row;
            }
        }
        return $effect;
    }

    /**
     * This function should be called if the card of the given target_id becomes an invalid target.
     * If it was the target of some chameleon card, expire all modifications made to that chameleon card during and after the copying the invalid target.
     * @param $target_id the now invalid target
     */
    function expireChameleonTarget(int $target_id) {
        //get all chameleon effects with this target
        $chameleon_effects = [];
        foreach ($this->cache as $row) {
            if ($row["chameleon_target_id"] == $target_id) {
                $chameleon_effects[] = $row;
            }
        }
        if (count($chameleon_effects) == 0) {
            return;
        }

        //for each found chameleon effect, expire all modifications made to that chameleon card during and after the copying the invalid target
        foreach ($chameleon_effects as $chameleon_effect) {
            //for the clients
            $expired_effects = [];
            $effect_id = $chameleon_effect["effect_id"];
            $chameleon_card_id = $chameleon_effect["card_id"];
            foreach ($this->cache as $row) {
                if ($row["effect_id"] >= $effect_id && $row["card_id"] == $chameleon_card_id && $row["effect_class"] == EC_MODIFICATION) {
                    $expired_effects[] = $row;
                }
            }
            $this->notifyExpireEffects($expired_effects);
            //for the db
            $sql = "DELETE FROM effect WHERE effect_id >= $effect_id AND card_id = $chameleon_card_id AND effect_class = ".EC_MODIFICATION;
            $this->game->DbQuery($sql);

            //mark the CT_GOODOLDTIMES passive as used
            if ($chameleon_effect["type_id"] == CT_GOODOLDTIMES) {
                $this->insertModification($chameleon_card_id, CT_GOODOLDTIMES); 
            }
        }
        $this->loadFromDb();
    }

    /////////////////////////////////////////////////
    ///////     Expiry-related functions      ///////
    /////////////////////////////////////////////////

    /**
     * Expire all EC_MODIFICATION effects that apply to the specified `$card_id`
     */
    function expireModifications(int $card_id) {
        //for the clients
        $expired_effects = [];
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id && $row["effect_class"] == EC_MODIFICATION) {
                $expired_effects[] = $row;
            }
        }
        if (count($expired_effects) == 0) {
            return;
        }
        $this->notifyExpireEffects($expired_effects);
        //for the db
        $sql = "DELETE FROM effect WHERE card_id = $card_id AND effect_class = ".EC_MODIFICATION;
        $this->game->DbQuery($sql);
        $this->loadFromDb();
    }

    /**
     * Expire all EC_MODIFICATION effects that apply to the specified `$card_ids`
     */
    function expireModificationsMultiple(array $card_ids) {
        if (count($card_ids) == 0) {
            return;
        }
        //for the clients
        $expired_effects = [];
        foreach ($this->cache as $row) {
            if (in_array($row["card_id"], $card_ids) && $row["effect_class"] == EC_MODIFICATION) {
                $expired_effects[] = $row;
            }
        }
        if (count($expired_effects) == 0) {
            return;
        }
        $this->notifyExpireEffects($expired_effects);
        //for the db
        $card_ids_string = implode(",", $card_ids);
        $sql = "DELETE FROM effect WHERE card_id IN ($card_ids_string) AND effect_class = ".EC_MODIFICATION;
        $this->game->DbQuery($sql);
        $this->loadFromDb();
    }

    /**
     * Expire ALL effects (EC_MODIFICATION and EC_GLOBAL), except ones that apply to the specified `$card_ids`
     */
    function expireAllExcept(array $card_ids) {
        //for the clients
        $expired_effects = [];
        foreach ($this->cache as $row) {
            if (!in_array($row["card_id"], $card_ids)) {
                $expired_effects[] = $row;
            }
        }
        if (count($expired_effects) == 0) {
            return;
        }
        $this->notifyExpireEffects($expired_effects);
        //for the db
        if (count($card_ids) > 0) {
            $card_ids_string = implode(",", $card_ids);
            $sql = "DELETE FROM effect WHERE card_id NOT IN ($card_ids_string)";
        }
        else {
            $sql = "DELETE FROM effect";
        }
        $this->game->DbQuery($sql);
        $this->loadFromDb();
    }

    /**
     * Send a notification to all players
     */
    private function notifyExpireEffects(array $expired_effects) {
        $count = count($expired_effects);
        $msg = "DEBUG MESSAGE: $count effect(s) expired";
        $this->game->notifyAllPlayers('expireEffects', $msg, array(
            'effects' => $expired_effects
        ));
    }

    //TODO: safely delete this
    // /**
    //  * Delete and return the chameleon binding effects for the specified card
    //  * @param int $card_id
    //  */
    // function unbindChameleon(int $card_id) {
    //     $chameleon_type_ids = implode(",", array(CT_FLEXIBLESHOPKEEPER, CT_REFLECTION, CT_GOODOLDTIMES, CT_TRENDSETTING, CT_SEEINGDOUBLES));
    //     $sql = "DELETE FROM effect WHERE card_id = $card_id AND target >= 0 AND type_id IN ($chameleon_type_ids)";
    //     $deleted_rows = array();
    //     foreach ($this->cache as $row) {
    //         if ($row["card_id"] == $card_id) {
    //             $deleted_rows[] = $row;
    //         }
    //     }
    //     $this->game->DbQuery($sql);
    //     $this->loadFromDb();
    //     return $deleted_rows;
    // }
    // /**
    //  * Expire all effects with EXPIRES_ON_END_OF_TURN
    //  */
    // function expireEndOfTurn() {
    //     $sql = "DELETE FROM effect WHERE expires = ".EXPIRES_ON_END_OF_TURN;
    //     $this->game->DbQuery($sql);
    //     $this->loadFromDb();
    // }
}
