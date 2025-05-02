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
    public DaleOfMerchants $game;
    public array $cache;
    public int $last_effect_id;

    function __construct(DaleOfMerchants $game) {
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
     * @param int $card_id the card that caused the global effect (use `0` to ensure the effect expires at the end of the turn)
     * @param int $type_id the effective type of the effect (CT).
     * @param int $arg (optional) default null. additional information about the effect.
     * @return array newly added effect
     */
    function insertGlobal(int $card_id, int $type_id, ?int $arg = null) {
        return $this->insert(EC_GLOBAL, $card_id, $type_id, $arg, null);
    }

    //////////////////////////////////////
    ///////     Public Getters     ///////
    //////////////////////////////////////

    /**
     * Returns the amount of EC_GLOBAL effects of the given type id
     * @param int $type_id the type of effect
     */
    function countGlobalEffects(int $type_id) {
        $count = 0;
        foreach ($this->cache as $row) {
            if ($row["effect_class"] == EC_GLOBAL && $row["type_id"] == $type_id) {
                $count += 1;
            }
        }
        return $count;
    }

    /**
     * Returns the amount of EC_GLOBAL effects of the given type id that do not have the specific arg
     * @param int $type_id the type of effect
     * @param int $exclude_arg exclude this specific arg
     */
    function countGlobalEffectsExcludeArg(int $type_id, int $exclude_arg) {
        $count = 0;
        foreach ($this->cache as $row) {
            if ($row["effect_class"] == EC_GLOBAL && $row["type_id"] == $type_id && $row["arg"] != $exclude_arg) {
                $count += 1;
            }
        }
        return $count;
    }

    /**
     * Applies all card modifications to calculate the additional cost card in the market (CT_SCARYGUNFIGHT only)
     */
    function getAdditionalCost() {
        $additional_cost = 0;
        $player_id = $this->game->getActivePlayerId();
        foreach ($this->cache as $row) {
            if ($row["effect_class"] == EC_GLOBAL) {
                switch($row["type_id"]) {
                    case CT_SCARYGUNFIGHT:
                        if ($row["arg"] != $player_id) {
                            $additional_cost += 2;
                        } 
                        break;
                }
            }
        }
        return $additional_cost;
    }

    /**
     * Applies all card modifications to calculate the value of the card
     */
    function getValue(array $dbcard) {
        $card_id = $dbcard["id"];
        $type_id = $this->getTypeId($dbcard);
        $value = $this->game->card_types[$type_id]['value'];
        $chameleonEffects = array();
        $chameleonEffect = $this->getChameleonEffect($card_id);
        while ($chameleonEffect !== null) {
            $chameleonEffects[] = $chameleonEffect;
            $chameleonEffect = $this->getChameleonEffect($chameleonEffect["chameleon_target_id"]);
        }
        foreach ($this->cache as $row) {
            $isCopiedEffect = false;
            foreach ($chameleonEffects as $chameleonEffect) {
                if ($row["card_id"] == $chameleonEffect["chameleon_target_id"] && $row["effect_id"] < $chameleonEffect["effect_id"]) {
                    $isCopiedEffect = true;
                    break;
                }
            }
            if ($row["card_id"] == $card_id || $row["effect_class"] == EC_GLOBAL || $isCopiedEffect) {
                switch($row["type_id"]) {
                    case CT_FLASHYSHOW:
                        $value += 1;
                        break;
                    case CT_BOLDHAGGLER:
                        $value += $row["arg"];
                        break;
                    case CT_BLINDFOLD:
                        $value = $row["arg"];
                        break;
                    case CT_RAREARTEFACT:
                        $value *= $row["arg"];
                        break;
                    case CT_STOVE:
                        $value = $row["arg"];
                        break;
                }
            }
        }
        return $value;
    }

    /**
     * @return array all card_ids with an active EC_MODIFICATION
     */
    function getModifiedCardIds() {
        $card_ids = array();
        foreach ($this->cache as $row) {
            if ($row["effect_class"] == EC_MODIFICATION) {
                $card_id = $row["card_id"];
                if (!in_array($card_id, $card_ids)) {
                    $card_ids[] = $card_id;
                }
            }
        }
        return $card_ids;
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
     * @param array $dbcard
     * @param bool $argNonNull (optional) default false. If true, only count passives with non-null args (e.g. bold haggler)
     */
    function isPassiveUsed(array $dbcard, bool $argNonNull = false) {
        $card_id = $dbcard["id"];
        $type_id = $this->getTypeId($dbcard);
        $chameleonEffect = $this->getChameleonEffect($card_id);
        if ($chameleonEffect) {
            $fakedbcard = array("id" => $chameleonEffect["chameleon_target_id"], "type_arg" => $dbcard["type_arg"]);
            if ($this->isPassiveUsed($fakedbcard, true)) {
                return true;
            }
        }
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id && $row["type_id"] == $type_id && $row["chameleon_target_id"] == null) {
                if ($argNonNull && ($row["arg"] == null || $row["arg"] == "NULL")) {
                    continue;
                }
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
     * Update the arg of the effect with the given card_id and type_id
     * @param int $card_id the card that caused the effect
     * @param int $type_id the type of effect
     * @param int $arg new value for the arg
     */
    function updateArg(int $card_id, int $type_id, int $arg) {
        $sql = "UPDATE effect SET arg=$arg WHERE card_id=$card_id AND type_id=$type_id";
        $this->game->DbQuery($sql);
        $found = false;
        foreach ($this->cache as $index => $row) {
            if ($row["card_id"] == $card_id && $row["type_id"] == $type_id) {
                if ($found) {
                    throw new BgaVisibleSystemException("updateArg found multiple effects of the same card_id $card_id and type_id $type_id. Is this intended...?");
                }
                $this->cache[$index]["arg"] = $arg;
                $this->game->notifyAllPlayers('updateEffect', '', array("effect" => $this->cache[$index]));
                $found = true;
            }
        }
        if ($found == false) {
            throw new BgaVisibleSystemException("Card id $card_id has no active effect with type_id $type_id, so the effect cannot be updated");
        }
    }

    /**
     * Return the last chameleon copy effect that affects the specified card_id
     * @return array|null
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
            //skip chameleons in schedules
            $expired_effects = [];
            $effect_id = $chameleon_effect["effect_id"];
            $chameleon_card_id = $chameleon_effect["card_id"];
            $dbcard = $this->game->cards->getCard($chameleon_effect["card_id"]);
            $prefix = substr($dbcard["location"], 0, 4);
            if ($prefix == SCHEDULE) {
                continue; 
            }

            //for the clients
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
     * Expire a specific EC_MODIFICATION effects that applies to the specified `$card_id`
     */
    function expireSingleModification(int $card_id, int $type_id) {
        //for the clients
        $expired_effects = [];
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id && $row["type_id"] == $type_id && $row["effect_class"] == EC_MODIFICATION) {
                $expired_effects[] = $row;
            }
        }
        if (count($expired_effects) != 1) {
            $count = count($expired_effects);
            throw new BgaVisibleSystemException("expireSingleModification expected 1 effect, but found $count effects of type_id $type_id.");
        }
        $this->notifyExpireEffects($expired_effects);
        //for the db
        $sql = "DELETE FROM effect WHERE card_id = $card_id AND type_id = $type_id AND effect_class = ".EC_MODIFICATION;
        $this->game->DbQuery($sql);
        $this->loadFromDb();
    }

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
     * Expire a specific global effect
     */
    function expireGlobal(int $card_id, int $type_id) {
        //for the clients
        $expired_effects = [];
        foreach ($this->cache as $row) {
            if ($row["card_id"] == $card_id && $row["type_id"] == $type_id && $row["effect_class"] == EC_GLOBAL) {
                $expired_effects[] = $row;
            }
        }
        if (count($expired_effects) == 0) {
            return;
        }
        $this->notifyExpireEffects($expired_effects);
        //for the db
        $sql = "DELETE FROM effect WHERE card_id = $card_id AND type_id = $type_id AND effect_class = ".EC_GLOBAL;
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
}
