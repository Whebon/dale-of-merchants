<?php

require_once(APP_GAMEMODULE_PATH.'module/common/deck.game.php');

if (!defined('HAND')) {
    //deck location prefixes
    //IMPORTANT: all locations must have length 4
    //IMPORTANT: all literals must be exactly the same as on the client-side (DbLocationPrefix.ts)
    define('MARKET', 'mark');
    define('HAND', 'hand');
    define('DISCARD', 'disc');
    define('DECK', 'deck');
    define('STALL', 'stal');
    define('JUNKRESERVE', 'junk');
    define('SCHEDULE', 'sche');
    define('SCHEDULE_COOLDOWN', 'cool');
    define('STORED_CARDS', 'stor');
    define('LIMBO', 'limb');

    //global variables
    define('MAX_STACK_SIZE', 1000); //must be the same as on the client side
    define('MAX_STACKS', 8); //must be the same as on the client side
}

class DaleDeck extends Deck {
    private $game;
    private DaleEffects $effects;
    public string $on_location_exhausted_method;

    function __construct($game, $effects, string $on_location_exhausted_method) {
        parent::__construct();
        $this->game = $game;
        $this->effects = $effects;
        $this->on_location_exhausted_method = $on_location_exhausted_method;
    }

    /**
     * Count the sum of cards from the specified player's deck- and discard piles
     * @param mixed $player_id specified player
     */
    function countCardsInDrawAndDiscardOfPlayer($player_id) {
        return $this->countCardsInLocation(DECK.$player_id) + $this->countCardsInLocation(DISCARD.$player_id);
    }

    /**
     * Get all cards in the specified stack of the specified stall
     * @param string $stall_location location to move to cards to (must be a stall)
     * @param int $stack_index index of a stack in the stall to put the cards on
     */
    function getCardsInStall(string $stall_location, int $stack_index) {
        $prefix = substr($stall_location, 0, 4);
        if ($prefix != STALL) {
            throw new BgaVisibleSystemException("getCardsInStall must be called with a stall location");
        }
        $min = MAX_STACK_SIZE * $stack_index;
        $max = MAX_STACK_SIZE * ($stack_index + 1);
        $order_by = 'location_arg';
        $result = array();

        $sql = "SELECT card_id id, card_type type, card_type_arg type_arg, card_location location, card_location_arg location_arg ";
        $sql .= "FROM " . $this->table;
        $sql .= " WHERE card_location='" . addslashes($stall_location) . "' ";
        $sql .= " AND card_location_arg >= $min AND card_location_arg < $max ";
        $sql .= " ORDER BY $order_by";
        $dbres = self::DbQuery($sql);
        while ($row = mysql_fetch_assoc($dbres)) {
            $result[$row['id']] = $row;
        }
        if ($order_by !== null) {
            $result = array_merge(array(), $result); // Note: this trick resets the array keys to 0, 1, 2 in order to keep this order in JS
        }
        return $result;
    }

    /**
     * Build a new stack in a stall
     * @param mixed $card_ids cards to move
     * @param string $stall_location location to move to cards to (must be a stall)
     * @param int $stack_index index of a stack in the stall to put the cards on
     * @param int $index (optional) default 0. starting index within the stack
     */
    function moveCardsToStall(array $card_ids, string $stall_location, int $stack_index, int $index = 0){
        $prefix = substr($stall_location, 0, 4);
        if ($prefix != STALL) {
            throw new BgaVisibleSystemException("moveCardsToStall must be called with a stall location");
        }
        for ($i = 0; $i < count($card_ids); $i++) {
            $pos = $stack_index * MAX_STACK_SIZE + $index + $i;
            $this->moveCard($card_ids[$i], $stall_location, $pos);
        }
    }

    /**
     * Get cards from a specific "pile" location where cards are ordered. Decrements the indices of cards to ensure the pile indices remain adjacent
     * IMPORTANT: the cards still exists in the table should be moved to a different location by another function.
     * @param mixed $card_ids multiple card ids to get
     * @param string $location location to remove the card from
     * @return array `dbcards`
     * @example example
     * Let a pair (A, 1) denote `(card_id, location_arg)`
     * 
     * pile before: [(F, 1), (B, 2), (A, 3), (C, 4), (E, 5), (D, 6)]
     * 
     * removeCardsFromPile([B, C], pile) --> [(B, 2), (C, 4)]
     * 
     * pile after: [(F, 1), (B, 2), (A, 2), (C, 3), (E, 3), (D, 4)]
     * 
     * Objects B and C are now expected to be moved away from the pile by another function
     */
    function removeCardsFromPile(array $card_ids, string $location): array {
        $cards = $this->getCardsFromLocation($card_ids, $location);
        foreach ($card_ids as $card_id) {
            $this->removeCardFromPile($card_id, $location);
        }
        return $cards;
    }

    /**
     * Get cards from a specific "pile" location where cards are ordered. Decrements the indices of cards on the right by 1
     * IMPORTANT: the cards still exists in the table should be moved to a different location by another function.
     * @param mixed $card_ids multiple card ids to get
     * @param string $location location to remove the card from
     * @return array dbcard
     */
    function removeCardFromPile(mixed $card_id, string $location) {
        $card = $this->getCardFromLocation($card_id, $location);
        $location_arg = $card["location_arg"];
        $sql = "UPDATE ".$this->table." ";
        $sql .= "SET card_location_arg=card_location_arg-1 ";
        $sql .= "WHERE card_location='".addslashes( $location )."' ";
        $sql .= "AND card_location_arg>=".$location_arg;
        self::DbQuery( $sql );
        return $card;
    }

    /**
     * @return bool `true` if the specified location is outside the union of locations `{HAND, LIMBO, SCHEDULE}`
     */
    function isOuterLocation($location) {
        $prefix = substr($location, 0, 4);
        return $prefix != HAND && $prefix != LIMBO && $prefix != SCHEDULE && $prefix != SCHEDULE_COOLDOWN;
    }

    /**
     * This function should be called if the top card a location will be changed.
     * If the provided location is a discard pile, expire CT_REFLECTION or CT_GOODOLDTIMES card modifications.
     */
    function expireChameleonTargetInDiscard(string $location) {
        $prefix = substr($location, 0, 4);
        if ($prefix == DISCARD) {
            $player_id = substr($location, 4);
            //TODO: safely remove this
            // if ($player_id == MARKET) {
            //     foreach ($this->effects->getChameleonIdsByTypeId(CT_GOODOLDTIMES) as $chameleon_card_id) {
            //         $this->effects->expireModifications($chameleon_card_id);
            //         $this->effects->insertModification($chameleon_card_id, CT_GOODOLDTIMES); //passive used
            //     }
            // }
            if ($player_id != $this->game->getActivePlayerId()) {
                $target = $this->getCardOnTop($location);
                if ($target) {
                    $this->effects->expireChameleonTarget($target["id"]);
                }
            }
        }
    }

    /**
     * Move cards to specific location
     */
    function moveCards($card_ids, $location, $location_arg=0) {
        foreach ($card_ids as $card) {
            $this->effects->expireChameleonTarget($card); //is this really needed?
        }
        parent::moveCards($card_ids, $location, $location_arg);
        if ($this->isOuterLocation($location)) {
            $this->effects->expireModificationsMultiple($card_ids);
        }
    }

    /**
     * Same as `moveCard`, but without expiring effects
     * Move a card from the `$location` to `$location`, updating the location arg
     * IMPORTANT: The caller is responsible for ensuring the card is already in location `$location`
     */
    function moveCardWithinLocation($card_id, $location, $location_arg) {
        parent::moveCard($card_id, $location, $location_arg);
    }

    /**
     * Move a card to specific location
     */
    function moveCard($card_id, $location, $location_arg=0) {
        $this->effects->expireChameleonTarget($card_id);
        parent::moveCard($card_id, $location, $location_arg);
        if ($this->isOuterLocation($location)) {
            $this->effects->expireModifications($card_id);
        }
    }

    /**
     * Move 1 card on top of the provided location
     * @param mixed $card_id string or int representing the card id of the card to move
     * @param string $location location to put the card
     * @param bool $expire_chameleon if true, expire the chameleon target that was on top of this pile
     */
    function moveCardOnTop($card_id, string $location, bool $expire_chameleon_target = true) {
        if ($expire_chameleon_target) {
            $this->expireChameleonTargetInDiscard($location);
        }
        $this->insertCardOnExtremePosition($card_id, $location, true);
        if ($this->isOuterLocation($location)) {
            $this->effects->expireModifications($card_id);
        }
    }

    /**
     * Move cards on top of the provided location
     * @param array $card_ids cards to move
     * @param string $location location to put the card
     */
    function moveCardsOnTop(array $card_ids, string $location) {
        $this->expireChameleonTargetInDiscard($location); //only once
        foreach ($card_ids as $card_id) {
            $this->moveCardOnTop($card_id, $location, false);
        }
    }

    /**
     * Get cards from the top of the provided location WITHIN the top $nbr of cards on that pile.
     * Verifies that the cards come from the top $nbr of the discard pile
     * IMPORTANT: the cards still exists in the table should be moved to a different location by another function.
     * @param array $card_ids cards to get from the top of the given pile
     * @param array $nbr maximum depth to look within the top of the given pile
     * @param string $location pile
     */
    function removeCardsFromTop(array $card_ids, int $nbr, string $location) {
        if (count($card_ids) < 1 || count($card_ids) > $nbr) {
            throw new BgaUserException("Please select the expected number of cards"."(1-".$nbr.")"); //0 cards should be a fizzle instead
        }
        $top3_dbcards = $this->getCardsOnTop($nbr, $location);
        foreach ($card_ids as $card_id) {
            $within_top3 = false;
            foreach ($top3_dbcards as $i => $top3_dbcard) { //$i in [0, 1, 2, ..., $nbr]
                if ($card_id == $top3_dbcard["id"]) {
                    $within_top3 = true;
                    break;
                }
            }
            if (!$within_top3) {
                throw new BgaUserException("Please only select cards within the top ".$nbr." cards of the discard pile");
            }
        }
        return $this->removeCardsFromPile($card_ids, $location);
    }

    /**
     * Get a specified number of unassigned junk cards
     * @return array associative array of $nbr free junk cards from the db
    */
    function getJunk($nbr = 1) {
        $junk_cards = $this->getCardsInLocation(JUNKRESERVE);
        $found = count($junk_cards);
        if ($found >= $nbr) {
            //found a sufficient amount of free junk cards, return them
            while ($found > $nbr) {
                array_pop($junk_cards);
                $found--;
            }
            return $junk_cards;
        }

        //not enough free junk cards exist, create a sufficient amount of new junk cards, then try again
        $cards = array(array(
            'type' => 'null', 
            'type_arg' => CT_JUNK,
            'nbr' => $nbr - $found
        ));
        $this->createCards($cards, JUNKRESERVE);
        return $this->getJunk($nbr);
    }

    /**
     * Get the index of the next empty stack
     * @param mixed $player_id
     * @return int 0 <= stack_index <= 8 (8 means the player won)
    */
    function getNextStackIndex(string $player_id) {
        // Example: 
        // Suppose a stall has cards at locations: [0, 1, 2, 1000, 1001, 2000] with MAX_STACK_SIZE = 1000
        // This means this player has 3 stacks: [0, 1, 2], [0, 1] and [0]
        // The next stall_index will be 3
        $topCard = $this->getCardOnTop(STALL.$player_id);
        if ($topCard == null) {
            return 0;
        }
        $extremePos = $topCard["location_arg"];
        $index = $extremePos % MAX_STACK_SIZE;
        $stack_index = ($extremePos - $index) / MAX_STACK_SIZE;
        return $stack_index + 1;
    }

    /**
     * getCards, but with a location specified. Raises an exception if the cards are not in the specified location.
     */
    function getCardFromLocation($card_id, $location) {
        $card = $this->getCard($card_id);
        if ($card["location"] != $location) {
            throw new BgaVisibleSystemException("getCardFromLocation: some card was not found at its expected location");
        }
        return $card;
    }

    /**
    * Override the original pickCardsForLocation method, but with the $on_location_exhausted_method hook
    * Pick the first card on top of specified deck and give it to specified player
    * Return card infos or null if no card in the specified location
    */
    function pickCardForLocation($from_location, $to_location, $location_arg=0) {
        $card = self::getCardOnTop($from_location);

        //hook
        if($card == null) {
            //callback
            $obj = $this->game;
            $method = $this->on_location_exhausted_method;
            $obj->$method($from_location);

            //try again
            $card = self::getCardOnTop($from_location);
        }

        //copied from deck.php
        if($card){
            $sql = "UPDATE ".$this->table." SET card_location='".addslashes($to_location)."', card_location_arg='$location_arg' ";
            $sql .= "WHERE card_id='".$card['id']."'";
            self::DbQuery( $sql );
            $card['location'] = $to_location;
            $card['location_arg'] = $location_arg;
            unset( $card['res'] );
            return $card;
        }
        return null;
    }

    /**
     * Override the original pickCardsForLocation method, but with the $on_location_exhausted_method hook
     * Pick the first "$nbr" cards on top of specified deck and place it in target location
     */
    function pickCardsForLocation($nbr, $from_location, $to_location, $location_arg=0, $no_deck_reform=false){
        //copied from deck.php
        $cards = self::getCardsOnTop( $nbr, $from_location );
        $cards_ids = array();
        foreach($cards as $i => $card) {
            $cards_ids[] = $card['id'];
            $cards[$i]['location'] = $to_location;
            $cards[$i]['location_arg'] = $location_arg;
        }
        $sql = "UPDATE ".$this->table." SET card_location='".addslashes($to_location)."', card_location_arg='$location_arg' ";
        $sql .= "WHERE card_id IN ('".implode( "','", $cards_ids )."') ";
        self::DbQuery( $sql );

        //hook
        if (count($cards) < $nbr && !$no_deck_reform) {
            //callback
            $obj = $this->game;
            $method = $this->on_location_exhausted_method;
            $obj->$method($from_location);

            //try again
            $nbr_card_missing = $nbr - count($cards);
            $newcards = self::pickCardsForLocation($nbr_card_missing, $from_location, $to_location, $location_arg, true ); // Note: block another deck reform
            foreach( $newcards as $card ){
                $cards[] = $card;
            }
        }
        return $cards;
    }

    function pickCard($location, $player_id) { die("DISABLED"); }
    function pickCards($nbr, $location, $player_id) { die("DISABLED"); }
}
