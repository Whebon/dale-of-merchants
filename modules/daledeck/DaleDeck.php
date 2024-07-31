<?php

require_once(APP_GAMEMODULE_PATH.'module/common/deck.game.php');

//deck locations
if (!defined('HAND')) {
    //location
    define('MARKET', 'market');

    //prefixes (IMPORTANT: prefixes must be of length 4)
    define('HAND', 'hand');
    define('DISCARD', 'disc');
    define('DECK', 'deck');
    define('STALL', 'stal');

    //global variables
    define('MAX_STACK_SIZE', 1000); //must be the same as on the client side
    define('MAX_STACKS', 8); //must be the same as on the client side
}

class DaleDeck extends Deck {
    private $game;
    public string $on_location_exhausted_method;

    function __construct($game, string $on_location_exhausted_method) {
        parent::__construct();
        $this->game = $game;
        $this->on_location_exhausted_method = $on_location_exhausted_method;
    }

    /**
     * Move 1 card on top of the provided location
     * @param mixed $card_id string or int representing the card id of the card to move
     * @param string $location location to put the card
     */
    function moveCardOnTop($card_id, string $location) {
        $this->insertCardOnExtremePosition($card_id, $location, true);
    }

    /**
     * Move cards on top of the provided location
     * @param array $card_ids cards to move
     * @param string $location location to put the card
     */
    function moveCardsOnTop(array $card_ids, string $location) {
        foreach ($card_ids as $card_id) {
            $this->moveCardOnTop($card_id, $location);
        }
    }

    /**
     * Get a specified number of unassigned junk cards
     * @return array associative array of $nbr free junk cards from the db
    */
    function getJunk($nbr = 1) {
        $junk_cards = $this->getCardsInLocation('junk');
        $found = count($junk_cards);
        if ($found >= $nbr) {
            //found a sufficient amount of free junk cards, return them
            if ($nbr == 1) {
                return array_pop($junk_cards); //1 card
            }
            while ($found > $nbr) {
                array_pop($junk_cards);
                $nbr--;
            }
            return $junk_cards; //array of cards
        }

        //not enough free junk cards exist, create a sufficient amount of new junk cards, then try again
        $cards = array(array(
            'type' => 'null', 
            'type_arg' => CT_JUNK,
            'nbr' => $nbr - $found
        ));
        $this->createCards($cards, 'junk');
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
