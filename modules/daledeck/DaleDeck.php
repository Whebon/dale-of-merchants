<?php

require_once(APP_GAMEMODULE_PATH.'module/common/deck.game.php');

class DaleDeck extends Deck {
    private $game;
    public string $on_location_exhausted_method;

    function __construct($game, string $on_location_exhausted_method) {
        parent::__construct();
        $this->game = $game;
        $this->on_location_exhausted_method = $on_location_exhausted_method;
    }

    /**
    * Override the original pickCardsForLocation method, but with the $on_location_exhausted_method hook
    * Pick the first card on top of specified deck and give it to specified player
    * Return card infos or null if no card in the specified location
    */
    function pickCardForLocation($from_location, $to_location, $location_arg=0) {
        $card = self::getCardOnTop( $from_location );

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
