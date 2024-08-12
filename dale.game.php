<?php
 /**
  *------
  * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
  * Dale implementation : © Bart Swinkels bart-man99@hotmail.com
  * 
  * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
  * See http://en.boardgamearena.com/#!doc/Studio for more information.
  * -----
  * 
  * dale.game.php
  *
  * This is the main file for your game logic.
  *
  * In this PHP file, you are going to defines the rules of the game.
  *
  */


require_once "modules/DaleTableBasic.php";


class Dale extends DaleTableBasic
{
    var DaleDeck $cards;
    var DaleEffects $effects;
    var $card_types;

	function __construct( )
	{
        // Your global variables labels:
        //  Here, you can assign labels to global variables you are using for this game.
        //  You can use any number of global variables with IDs between 10 and 99.
        //  If your game has options (variants), you also have to associate here a label to
        //  the corresponding ID in gameoptions.inc.php.
        // Note: afterwards, you can get/set the global variables with getGameStateValue/setGameStateInitialValue/setGameStateValue
        parent::__construct();
        
        $this->initGameStateLabels( array(
            "selectedCard" => 10,
            "resolvingCard" => 11,
            "cancelableChameleon" => 12,
            "cancelableChameleonTypeId" => 13
        ) );

        $this->cards = new DaleDeck($this, "onLocationExhausted");
        $this->cards->init("card");
        $this->effects = new DaleEffects($this);
	}
	
    protected function getGameName( )
    {
		// Used for translations and stuff. Please do not modify.
        return "dale";
    }	

    /*
        setupNewGame:
        
        This method is called only once, when a new game is launched.
        In this method, you must setup the game according to the game rules, so that
        the game is ready to be played.
    */
    protected function setupNewGame( $players, $options = array() )
    {    
        // Set the colors of the players with HTML color code
        // The default below is red/green/blue/orange/brown
        // The number of colors defined here must correspond to the maximum number of players allowed for the gams
        $gameinfos = $this->getGameinfos();
        $default_colors = $gameinfos['player_colors'];
 
        // Create players
        // Note: if you added some extra field on "player" table in the database (dbmodel.sql), you can initialize it there.
        $sql = "INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar) VALUES ";
        $values = array();
        foreach( $players as $player_id => $player )
        {
            $color = array_shift( $default_colors );
            $values[] = "('".$player_id."','$color','".$player['player_canal']."','".addslashes( $player['player_name'] )."','".addslashes( $player['player_avatar'] )."')";
        }
        $sql .= implode( ',', $values );
        $this->DbQuery( $sql );
        $this->reattributeColorsBasedOnPreferences( $players, $gameinfos['player_colors'] );
        $this->reloadPlayersBasicInfos();
        
        /************ Start the game initialization *****/

        // Init global values with their initial values
        //$this->setGameStateInitialValue( 'my_first_global_variable', 0 );
        $this->setGameStateInitialValue("selectedCard", -1);
        $this->setGameStateInitialValue("resolvingCard", -1);
        $this->setGameStateInitialValue("cancelableChameleon", -1);
        $this->setGameStateInitialValue("cancelableChameleonTypeId", -1);
        
        // Init game statistics
        // (note: statistics used in this file must be defined in your stats.inc.php file)
        //$this->initStat( 'table', 'table_teststat1', 0 );    // Init a table statistics
        //$this->initStat( 'player', 'player_teststat1', 0 );  // Init a player statistics (for all players)

        // TODO: decide which animalfolk sets to play with
        //Create the market deck
        $cards = array();
        foreach ($this->card_types as $type_id => $card_type) {
            $cards[] = array ('type' => 'null', 'type_arg' => $type_id, 'nbr' => $card_type['nbr']);
            if (count($cards) > 11) break; //todo: remove this
        }
        $this->cards->createCards($cards, DECK.MARKET);
        $this->cards->shuffle(DECK.MARKET);

        //TODO: set-up ACTUAL initial player decks
        $junk = array(array('type' => 'null', 'type_arg' => 1, 'nbr' => 5));
        foreach( $players as $player_id => $player ){
            $this->cards->createCards($junk, DECK.$player_id);
            $this->cards->createCards($cards, DECK.$player_id);
            $this->cards->shuffle(DECK.$player_id);
        }

        //TODO: move this to a setup game state
        //each player draws an initial hand of 5 cards
        foreach($players as $player_id => $player) {
            $cards = $this->cards->pickCardsForLocation(5, DECK.$player_id, HAND.$player_id);
            $this->notifyAllPlayersWithPrivateArguments('drawMultiple', clienttranslate('${player_name} draws their initial hand of ${nbr} cards'), array(
                "player_id" => $player_id,
                "player_name" => $this->getPlayerNameById($player_id),
                "nbr" => count($cards),
                "_private" => array(
                    "cards" => $cards
                )
            ));
        }

        //fill the initial market
        $this->refillMarket(true);

        // Activate first player (which is in general a good idea :) )
        $this->activeNextPlayer();

        /************ End of the game initialization *****/
    }

    /*
        getAllDatas: 
        
        Gather all informations about current game situation (visible by the current player).
        
        The method is called each time the game interface is displayed to a player, ie:
        _ when the game starts
        _ when a player refreshes the game page (F5)
    */
    protected function getAllDatas()
    {
        $result = array();
        $current_player_id = $this->getCurrentPlayerId();

        //assert deck location prefixes are of length 4 (otherwise auto shuffling in the DaleDeck will not work as intended)
        if (strlen(MARKET) != 4 || strlen(DECK) != 4 || strlen(DISCARD) != 4 || strlen(HAND) != 4 || strlen(STALL) != 4 || strlen(JUNKRESERVE) != 4 || strlen(SCHEDULE) != 4 || strlen(TEMPORARY) != 4) {
            throw new AssertionError("All location prefixes must be of length 4");
        }
    
        // Get information about players
        // Note: you can retrieve some extra field you added for "player" table in "dbmodel.sql" if you need it.
        $players = $this->loadPlayersBasicInfos();
        $sql = "SELECT player_id id, player_score score FROM player ";
        $result['players'] = $this->getCollectionFromDb( $sql );

        //count the cards in each hand, but don't send the content (that information is hidden)
        $result['handSizes'] = array();
        foreach ( $players as $player_id => $player ) {
            $result['handSizes'][$player_id] = $this->cards->countCardInLocation(HAND.$player_id);
        }

        //count the cards in each deck, but don't send the content (that information is hidden)
        $result['deckSizes'] = array(
            'market' => $this->cards->countCardInLocation(DECK.MARKET)
        );
        foreach ( $players as $player_id => $player ) {
            $result['deckSizes'][$player_id] = $this->cards->countCardInLocation(DECK.$player_id);
        }

        //all discard piles are public information
        $result['discardPiles'] = array(
            'market' => $this->cards->getCardsInLocation(DISCARD.MARKET, null, 'location_arg')
        );
        foreach ( $players as $player_id => $player ) {
            $result['discardPiles'][$player_id] = $this->cards->getCardsInLocation(DISCARD.$player_id, null, 'location_arg');
        }

        //get stalls
        foreach ( $players as $player_id => $player ) {
            $result['stalls'][$player_id] = $this->cards->getCardsInLocation(STALL.$player_id, null, 'location_arg');
        }

        //get schedules
        foreach ( $players as $player_id => $player ) {
            $result['schedules'][$player_id] = $this->cards->getCardsInLocation(SCHEDULE.$player_id, null, 'location_arg');
        }

        //other
        $result['market'] = $this->cards->getCardsInLocation(MARKET);
        $result['hand'] = $this->cards->getCardsInLocation(HAND.$current_player_id);
        $result['temporary'] = $this->cards->getCardsInLocation(TEMPORARY.$current_player_id);
        
        $result['cardTypes'] = $this->card_types;

        $result['effects'] = $this->effects->loadFromDb();
  
        return $result;
    }

    /*
        getGameProgression:
        
        Compute and return the current game progression.
        The number returned must be an integer beween 0 (=the game just started) and
        100 (= the game is finished or almost finished).
    
        This method is called each time we are in a game state with the "updateGameProgression" property set to true 
        (see states.inc.php)
    */
    function getGameProgression()
    {
        $highest_stack_index = 0;
        $players = $this->loadPlayersBasicInfos();
        foreach ( $players as $player_id => $player ) {
            $next_stack_index = $this->cards->getNextStackIndex($player_id);
            $highest_stack_index = max($highest_stack_index, $next_stack_index);
        }
        return 100 * $highest_stack_index / MAX_STACKS;
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Utility functions
////////////    

    /**
     * @param string $AT_numberlist
     * @return array
     * @example example
     * numberListToArray("1;2;3;4;") = array(1, 2, 3, 4)
     * @example example
     * numberListToArray("1;2;3;4") = array(1, 2, 3, 4)
     */
    function numberListToArray(string $AT_numberlist){
        if( $AT_numberlist == '' )
            return array();
        if( substr( $AT_numberlist, -1 ) == ';' )
            $AT_numberlist = substr( $AT_numberlist, 0, -1 );
        return explode(';', $AT_numberlist);
    }

    /**
     * Concatenate any number of $AT_numberlists and convert them to an array
     * @param string[] ...$AT_numberlist
     */
    function numberListsToArray(string ...$AT_numberlists) {
        if (count($AT_numberlists) === 1) {
            return $this->numberListToArray($AT_numberlists[0]);
        }
        $arrays = array();
        foreach ($AT_numberlists as $AT_numberlist) {
            $arrays[] = $this->numberListToArray($AT_numberlist);
        }
        return array_merge(...$arrays);
    }

    /**
     * $a <= $b
     * @param array $a array with unique values
     * @param array $b array with unique values
     * @return `true` if $a is a subset of $b
     */
    function isSubset(array $a, array $b) {
        return empty(array_diff($a, $b));
    }

    /**
     * Converts an array of dbcards to an array of card ids
     * @param array $dbcards `$dbcards`
     * @return array `$card_ids`
     */
    function toCardIds(array $dbcards){
        $card_ids = array();
        foreach ($dbcards as $card) {
            $card_ids[] = $card["id"];
        }
        return $card_ids;
    }

    /**
     * Updates the score for the specified player
     * @param mixed $player_id player to modify the score of
     * @param int $new_score new score to assign to this player
     * @return bool `true` if the player is now the WINNER of the game
     */
    function updateScore(mixed $player_id, int $new_score) {
        $sql = "UPDATE player SET player_score=$new_score WHERE player_id='$player_id'";
        $this->DbQuery($sql);
        return $new_score >= MAX_STACKS;
    }

    /**
     * Send a notification to all players, but only player args["player_id"] receives args["_private"]
     * @param string $type
     * @param string $message
     * @param array $args requires at least "player_id" and "_private" keys
     */
    function notifyAllPlayersWithPrivateArguments($type, $message, $args) {
        //the active player receives the notification with the private arguments
        $private_player_id = $args["player_id"];
        $this->notifyPlayer($private_player_id, $type, $message, $args);

        //all the other players receive the notification without the private arguments
        unset($args["_private"]);
        $players = $this->loadPlayersBasicInfos();
        foreach ( $players as $player_id => $player ) {
            if ($player_id != $private_player_id) {
                $this->notifyPlayer($player_id, $type, $message, $args);
            }
        }
    }

    /**
     * Place multiple cards on top of a player's deck
     * @param int $deck_player_id player that will receive the cards on top of the deck
     * @param string $msg notification message for all players
     * @param array $card_ids cards_ids to be placed on top in that order
     * @param array $cards array with exactly the same keys as $card_ids
     * @param array $unordered_cards (optional) - if provided, first place this collection of unordered cards on top of the deck
     * @param bool $from_temporary (optional) - default false. If `false`, place from hand. If `true`, place from temporary.
     */
    function placeOnDeckMultiple(int $deck_player_id, string $msg, array $card_ids, array $cards, array $unordered_cards = null, bool $from_temporary = false) {
        //1: move the unordered cards on top of the deck (no message)
        $nbr_unordered_cards = 0;
        if ($unordered_cards) {
            $nbr_unordered_cards = count($unordered_cards);
            $unordered_card_ids = array_keys($unordered_cards);
            $this->cards->moveCardsOnTop($unordered_card_ids, DECK.$deck_player_id);
            $this->notifyAllPlayersWithPrivateArguments('placeOnDeckMultiple', $cards ? '' : $msg, array (
                'player_id' => $this->getActivePlayerId(),
                'player_name' => $this->getActivePlayerName(),
                "_private" => array(
                    'card_ids' => $unordered_card_ids,
                    'cards' => $unordered_cards,
                ),
                'deck_player_id' => $deck_player_id,
                'nbr' => $nbr_unordered_cards,
                'from_temporary' => $from_temporary
            ));
        }
        
        //2: move the ordered cards on top of the deck
        if ($cards) {
            $this->cards->moveCardsOnTop($card_ids, DECK.$deck_player_id);
            $this->notifyAllPlayersWithPrivateArguments('placeOnDeckMultiple', $msg, array (
                'player_id' => $this->getActivePlayerId(),
                'player_name' => $this->getActivePlayerName(),
                "_private" => array(
                    'card_ids' => $card_ids,
                    'cards' => $cards,
                ),
                'deck_player_id' => $deck_player_id,
                'nbr' => count($cards) + $nbr_unordered_cards,
                'from_temporary' => $from_temporary
            ));
        }
    }

    /**
     * Discard multiple cards for a player in the given order
     * @param int $player_id player that will discard the cards from hand
     * @param string $msg notification message for all players
     * @param array $card_ids cards_ids to be discarded in that order
     * @param array $cards array with exactly the same keys as $card_ids
     * @param array $unordered_cards (optional) - if provided, first discard this collection of unordered cards
     * @param bool $from_temporary (optional) - default false. If `false`, discard from hand. If `true`, discard from temporary.
     */
    function discardMultiple(int $player_id, string $msg, array $card_ids, array $cards, array $unordered_cards = null, bool $from_temporary = false) {
        //1: move the unordered cards to the discard pile (no message)
        $nbr_unordered_cards = 0;
        if ($unordered_cards) {
            $nbr_unordered_cards = count($unordered_cards);
            $unordered_card_ids = array_keys($unordered_cards);
            $this->cards->moveCardsOnTop($unordered_card_ids, DISCARD.$player_id);
            $this->notifyAllPlayers('discardMultiple', $cards ? '' : $msg, array (
                'player_id' => $player_id,
                'player_name' => $this->getActivePlayerName(),
                'card_ids' => $unordered_card_ids,
                'cards' => $unordered_cards,
                'nbr' => $nbr_unordered_cards,
                'from_temporary' => $from_temporary
            ));
        }
        
        //2: move the ordered cards to the discard pile
        if ($cards) {
            $this->cards->moveCardsOnTop($card_ids, DISCARD.$player_id);
            $this->notifyAllPlayers('discardMultiple', $msg, array (
                'player_id' => $player_id,
                'player_name' => $this->getActivePlayerName(),
                'card_ids' => $card_ids,
                'cards' => $cards,
                'nbr' => count($cards) + $nbr_unordered_cards,
                'from_temporary' => $from_temporary
            ));
        }
    }

    /**
     * The active player throws away a card from the market deck and notifies all players
     * @param string $msg notification message
     */
    function throwAwayFromMarketDeck(string $msg) {
        $dbcard = $this->cards->pickCardForLocation(DECK.MARKET, 'unstable');
        if ($dbcard) {
            $this->cards->moveCardOnTop($dbcard["id"], DISCARD.MARKET);
            $this->notifyAllPlayers('throwAwayFromMarketDeck', $msg, array (
                'player_name' => $this->getActivePlayerName(),
                'card' => $dbcard
            ));
        }
    }


    /**
     * Callback method for when cards need to be drawn from a location, but the location is empty.
     * This method is expected to increase in number of cards at the specified location.
     * @param string location location in the deck that needs to be supplied with cards.
     */
    function onLocationExhausted($location) {
        $prefix = substr($location, 0, 4);
        if ($prefix == DECK) {
            $player_id = substr($location, 4);
            $discard_pile = DISCARD.$player_id;
            $nbr = $this->cards->countCardsInLocation($discard_pile);
            if ($nbr > 0) {
                $this->cards->moveAllCardsInLocation($discard_pile, $location);
                $this->cards->shuffle($location);
                if ($player_id == MARKET) {
                    $this->notifyAllPlayers('reshuffleDeck', clienttranslate('Shuffling the market discard pile to form a new market deck'), array(
                        "market" => true
                    ));
                }
                else {
                    $this->notifyAllPlayers('reshuffleDeck', clienttranslate('${player_name} shuffles their discard pile to form a new deck'), array(
                        "market" => false,
                        "player_id" => $player_id,
                        "player_name" => $this->getPlayerNameById($player_id)
                    ));
                }
            }
        }
    }

    /**
     * @param mixed $player_id
     * @param array $hand_cards array of dbcards that are currently in the player's hand
     * @return int maximum hand size
     */
    function getMaximumHandSize($player_id, array $hand_cards): int {
        return 5 + $this->countTypeId($hand_cards, CT_COOKIES);
    }

    /**
     * Refills your hand to the maximum hand size.
    */
    function refillHand() {
        $player_id = $this->getActivePlayerId();
        $hand_cards = $this->cards->getCardsInLocation(HAND.$player_id);
        $maximum_hand_size = $this->getMaximumHandSize($player_id, $hand_cards);
        $new_hand_cards = array();
        while (count($hand_cards) < $maximum_hand_size) {
            //draw cards from deck
            $nbr = $maximum_hand_size - count($hand_cards);
            $cards = $this->cards->pickCardsForLocation($nbr, DECK.$player_id, HAND.$player_id);
            $new_hand_cards = array_merge($new_hand_cards, $cards);
            $hand_cards = array_merge($hand_cards, $cards);
            
            //recompute the maximum hand size
            $new_maximum_hand_size = $this->getMaximumHandSize($player_id, $hand_cards);
            if ($maximum_hand_size == $new_maximum_hand_size) {
                break;
            }
            $maximum_hand_size = $new_maximum_hand_size;
        }

        //notify players about cookies
        $number_of_cookies = $this->countTypeId($hand_cards, CT_COOKIES);
        if ($number_of_cookies > 0) {
            $this->notifyAllPlayers('message', clienttranslate('Cookies: ${player_name} increases their hand size by ${nbr}'), array(
                "player_name" => $this->getPlayerNameById($player_id),
                "nbr" => $number_of_cookies
            ));
        }

        //notify about the new cards from deck
        $this->notifyAllPlayersWithPrivateArguments('drawMultiple', clienttranslate('${player_name} draws ${nbr} cards to refill their hand'), array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "nbr" => count($new_hand_cards),
            "_private" => array(
                "cards" => $new_hand_cards
            )
        ));

        //draw missing cards from junk reserve
        $nbr_junk_cards = $maximum_hand_size - count($hand_cards);
        if ($nbr_junk_cards > 0) {
            $junk_cards = $this->cards->getJunk($nbr_junk_cards);
            $junk_ids = array_keys($junk_cards);
            $this->cards->moveCards($junk_ids, HAND.$player_id);
            $this->notifyAllPlayers('obtainNewJunkInHand', clienttranslate('${player_name} ran out of cards and receives ${nbr} junk cards'), array(
                "player_id" => $player_id,
                "player_name" => $this->getPlayerNameById($player_id),
                "cards" => $junk_cards,
                "nbr" => $nbr_junk_cards,
            ));
        }
    }

    /**
     * Fills all the empty slots in the market
     * @param bool $move if true, first move all cards to the right, then refillMarket
    */
    function refillMarket(bool $move){
        $cards = $this->cards->getCardsInLocation(MARKET, null, 'location_arg');
        if (count($cards) > 5) {
            throw new BgaVisibleSystemException("The market has more than 5 cards");
        }
        $free_slots = array();
        $first_free_slot = 0;
        if ($move) {
            //move all cards to the right
            $shouldNotifyMarketSlideRight = false;
            foreach ($cards as $card) {
                if ($card["location_arg"] != $first_free_slot) {
                    $this->cards->moveCard($card['id'], MARKET, $first_free_slot);
                    $shouldNotifyMarketSlideRight = true;
                }
                $first_free_slot++;
            }
            if ($shouldNotifyMarketSlideRight) {
                $this->notifyAllPlayers('marketSlideRight', clienttranslate('Cards in the market move to the right'), array());
            }
        }
        else {
            //store gaps in $free_slots
            foreach ($cards as $card) {
                if ($card['location_arg'] >= 5) {
                    throw new BgaVisibleSystemException("Some card in the market is at an illegal position");
                }
                while($first_free_slot < $card['location_arg']) {
                    $free_slots[] = $first_free_slot;
                    $first_free_slot++;
                }
                $first_free_slot++;
            }
        }
        //store leading $free_slots
        for($i = $first_free_slot; $i < 5; $i++) {
            $free_slots[] = $i;
        }
        //put a card in each free slot (1 by 1, because (a) the location arg matters; and (b) picking cards must trigger reshuffle;)
        $new_cards = [];
        foreach ($free_slots as $index => $location_arg) {
            $card = $this->cards->pickCardForLocation(DECK.MARKET, MARKET, $location_arg);
            if ($card === null) {
                //unfortunately, not all free slots can be filled
                $free_slots = array_slice($free_slots, 0, $index);
                break;
            } else {
                $new_cards[] = $card;
            }
        }
        if (count($new_cards) > 0) {
            $this->notifyAllPlayers('fillEmptyMarketSlots', clienttranslate('Empty market slots get filled'), array(
                "positions" => $free_slots,
                "cards" => $new_cards
            ));
        }
    }

    /**
     * @param array $dbcards array of dbcards to scan
     * @param string $card_type effective card type to look for
     * @return boolean true if the card_type was found
     */
    function containsTypeId(array $dbcards, int $card_type): int {
        foreach ($dbcards as $dbcard) {
            if ($this->getTypeId($dbcard) == $card_type) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param array $dbcards array of dbcards to scan
     * @param string $card_type effective card type to look for
     * @return int number of occurrences
     */
    function countTypeId(array $dbcards, int $card_type): int {
        $count = 0;
        foreach ($dbcards as $dbcard) {
            if ($this->getTypeId($dbcard) == $card_type) {
                $count += 1;
            }
        }
        return $count;
    }

    /**
     * Returns the effective animalfolk of a dbcard. null represents rubbish/junk.
     * @param array $dbcard dbcard object
    */
    function getAnimalfolk(array $dbcard): string | null {
        $type_id = $this->getTypeId($dbcard);
        return $this->card_types[$type_id]['animalfolk'];
    }

    /**
     * Returns the effective card type of a dbcard. "effective" suggests the chameleons might have modified the type_id.
     * @param array $dbcard dbcard object
    */
    function getTypeId(array $dbcard): string {
        $type_id = $dbcard['type_arg'];
        $is_bindable = $type_id == CT_FLEXIBLESHOPKEEPER || 
                        $type_id == CT_REFLECTION ||  
                        $type_id == CT_GOODOLDTIMES || 
                        $type_id == CT_TRENDSETTING || 
                        $type_id == CT_SEEINGDOUBLES;
        if ($is_bindable) {
            $target = $this->effects->getTarget($dbcard["id"], $type_id);
            if ($target == CT_GOODOLDTIMES) {
                $good_old_times_target = $this->effects->getTarget($dbcard["id"], CT_GOODOLDTIMES);
                if ($good_old_times_target != null && $good_old_times_target != -1) {
                    $target = $good_old_times_target;
                }
            }
            if ($target != null && $target != -1) {
                return $target;
            }
        }
        return $type_id;
    }

    /**
     * Returns the effective cost of a given dbcard. Asserts that the card is at the market.
     * @param array $dbcard card to calculate the cost of
    */
    function getCost(array $dbcard) {
        $type_id = $this->getTypeId($dbcard);
        if ($dbcard['location'] != MARKET) {
            //TODO: market discovery
            $name = $this->card_types[$type_id]['name'];
            throw new BgaVisibleSystemException("'$name' is not in the market! Therefore, the cost cannot be calculated!");
        }
        $base_cost = $this->card_types[$type_id]['value'];
        $additional_cost = $dbcard['location_arg'];
        return $base_cost + $additional_cost;
    }

    /**
     * Returns the effective value sum of an array of cards
     * @param array $dbcards
     * @return int sum of the values of the dbcards
     */
    function getValueSum(array $dbcards) {
        $sum = 0;
        foreach ($dbcards as $card) {
            $sum += $this->getValue($card);
        }
        return $sum;
    }

    /**
     * Returns the effective value of a card (accounts for modifications such as 'Flashy Show').
     * @param array $dbcard card to get the value of
    */
    function getValue(array $dbcard): int {
        $type_id = $this->getTypeId($dbcard);
        $flashy_show = $this->effects->countEffectsOfTypeId(CT_FLASHYSHOW);
        return $this->card_types[$type_id]['value'] + $flashy_show;
    }

    /**
     * Returns the effective name of the card.
     * @param array $dbcard card to get the name of
    */
    function getCardName(array $dbcard): string {
        $type_id = $this->getTypeId($dbcard);
        return $this->card_types[$type_id]['name'];
    }


    /**
     * Returns true iff the card is a junk card
     */
    function isJunk(array $dbcard): bool {
        $card_id = $dbcard["id"];
        return ($card_id >= 1) && ($card_id <= 5);
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Chameleon functions
////////////  

    /*
        Here I place all function related to chameleon bindings
    */

    /**
     * Returns true if the specified chameleon type is currently able to bind to the specified type. (does a dfs)
     * @param int chameleon_type_id the chameleon type that is attempting to (re)bind
     * @param int type_id the type it wishes to bind to
     * @param array $_visited chameleon types that have already been attempted and are known to be invalid
     */
    function isValidBinding(int $chameleon_type_id, int $type_id, array $_visited = array()) {
        if (in_array($chameleon_type_id, $_visited)) {
            //chameleon cards are allowed to bind to themselves in case of infinite recursion
            return $chameleon_type_id == $type_id;
        }
        $has_valid_target = false;
        switch($chameleon_type_id) {
            case CT_FLEXIBLESHOPKEEPER:
                array_push($_visited, CT_FLEXIBLESHOPKEEPER);
                $player_id = $this->getCurrentPlayerId();
                $rightmost_stack_index = $this->cards->getNextStackIndex($player_id) - 1;
                $valid_targets = $this->cards->getCardsInLocation(STALL.$player_id);
                foreach ($valid_targets as $target) {
                    if (intdiv($target["location_arg"], MAX_STACK_SIZE) == $rightmost_stack_index) {
                        $has_valid_target = true;
                        if ($this->isValidBinding($this->getTypeId($target), $type_id, $_visited)) {
                            return true;
                        }
                    }
                }
                break;
            case CT_REFLECTION:
                array_push($_visited, CT_REFLECTION);
                $active_player_id = $this->getActivePlayerId();
                $players = $this->loadPlayersBasicInfos();
                foreach ($players as $player_id => $player) {
                    if ($player_id != $active_player_id) {
                        $target = $this->cards->getCardOnTop(DISCARD.$player_id);
                        if ($target) {
                            $has_valid_target = true;
                            if ($this->isValidBinding($this->getTypeId($target), $type_id, $_visited)) {
                                return true;
                            }
                        }
                    }
                }
                break;
            case CT_GOODOLDTIMES:
                array_push($_visited, CT_GOODOLDTIMES);
                $target = $this->cards->getCardOnTop(DISCARD.MARKET);
                if ($target) {
                    $has_valid_target = true;
                    if (count($_visited) >= 2) {
                        return true; //other chameleons can copy this for its passive
                    }
                    if ($this->isValidBinding($this->getTypeId($target), $type_id, $_visited)) {
                        return true;
                    }
                }
                break;
            case CT_TRENDSETTING:
                array_push($_visited, CT_TRENDSETTING);
                $valid_targets = $this->cards->getCardsInLocation(MARKET);
                foreach ($valid_targets as $target) {
                    $has_valid_target = true;
                    if ($this->isValidBinding($this->getTypeId($target), $type_id, $_visited)) {
                        return true;
                    }
                }
                break;
            default:
                break;
        }
        if ($has_valid_target) {
            //chameleons with valid targets cannot bind to themselves
            return false;
        }
        //non-chameleon card can always bind to themselves
        return $chameleon_type_id == $type_id;
    }

    /**
     * Add a collection of `card_id => type_id` chameleon binding effects
     * @param string $raw_chameleon_card_ids AT_numberlist - representing an array of chameleon `card_id`s. Must be a subset of the 'used' cards
     * @param string $raw_chameleon_type_ids AT_numberlist - representing an array of `type_id`s to bind the cards to
     * @param string $raw_used_card_ids AT_numberlist or AT_int - representing a collection of card_ids that is being 'used' in this action
     */
    function addChameleonBindings(string $raw_chameleon_card_ids, string $raw_chameleon_type_ids, string ...$raw_used_card_ids) {
        //convert the raw strings to arrays
        $card_ids = $this->numberListToArray($raw_chameleon_card_ids);
        if (count($card_ids) == 0) return;
        $type_ids = $this->numberListToArray($raw_chameleon_type_ids);
        $used_card_ids = $this->numberListsToArray(...$raw_used_card_ids);

        //enforce the (chameleon) card_ids are a subset of the used_card_ids
        if (!$this->isSubset($card_ids, $used_card_ids)) {
            throw new BgaVisibleSystemException("Bound chameleon cards must be used in the action");
        }
        
        //enforce the card_ids and type_ids are of equal length
        $player_id = $this->getActivePlayerId();
        $length = count($card_ids);
        $length2 = count($type_ids);
        if ($length != $length2) {
            throw new BgaVisibleSystemException("Attempted to bind $length cards to $length2 types");
        }

        $cards = $this->cards->getCards($card_ids);
        for($i = 0; $i < $length; $i++) {
            //enforce the target type id is reachable (dfs)
            $card_id = $card_ids[$i];
            $card = $cards[$card_id];
            $new_type_id = $type_ids[$i];
            $original_type_id = $this->getTypeId($card);
            $original_name = $this->getCardName($card);
            $new_name = $this->card_types[$new_type_id]['name'];
            if (!$this->isValidBinding($original_type_id, $new_type_id)) {
                throw new BgaVisibleSystemException("Unable to bind '$original_name' to '$new_name'");
            }

            //TODO: enforce the card is being 'used' from the correct location
            //$location_prefix = substr($card["location"], 0, 4); 

            //enforce the card has not been bound before
            $previous_target = $this->effects->getTarget($card_id, $original_type_id);
            if ($previous_target != null && $previous_target != -1 && $previous_target != CT_GOODOLDTIMES) {
                $previous_name = $this->card_types[$previous_target]['name'];
                throw new BgaVisibleSystemException("'$original_name' (card_id = $card_id) is already bound to '$previous_name'");
            }

            //set the new binding in the db
            if ($previous_target == null) {
                $this->effects->insert($card_id, $original_type_id, $new_type_id);
            }
            else {
                $this->effects->updateTarget($card_id, $original_type_id, $new_type_id);
            }

            //notify the players about the binding
            $this->notifyAllPlayers('bindChameleon', clienttranslate('${player_name} lets ${original_name} copy ${new_name}'), array(
                "player_name" => $this->getPlayerNameById($player_id),
                "original_name" => $original_name,
                "new_name" => $new_name,
                "card_id" => $card_id,
                "type_id" => $new_type_id
            ));
        }
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Resolving functions / Scheduling functions
////////////  

    /*
        Here I place all function related to resolving and/or scheduling techniques
    */

    /**
     * Schedule a card from hand for a player and notify all players. 
     * IMPORTANT: the caller is responsible for assuring that the card is currently in hand.
     * @param string $player_id player to schedule a card for
     * @param array $dbcard card to be scheduled
     */
    function scheduleCard(string $player_id, array $dbcard){
        $this->cards->moveCard($dbcard["id"], SCHEDULE.$player_id);
        $this->notifyAllPlayers('scheduleTechnique', clienttranslate('${player_name} schedules their ${card_name}'), array(
            'player_id' => $player_id,
            'player_name' => $this->getPlayerNameById($player_id),
            'card_name' => $this->getCardName($dbcard),
            'card' => $dbcard,
        ));
    }

    /**
     * Begin resolving a scheduled card by storing it in "resolvingCard" and notifying all players. Makes 2 db calls.
     * IMPORTANT: the caller is responsible for assuring that the card is currently in the schedule. Typically called after a "scheduleCard".
     * @param array $dbcard card to be scheduled
    */
    function beginToResolveCard(string $player_id, array $dbcard) {
        $previous = $this->getGameStateValue("resolvingCard");
        if ($previous != -1) {
            throw new Error("Cannot resolve two cards at the same time! Finish resolving the first card before resolving the second.");
        }
        $this->notifyAllPlayers('message', clienttranslate('${player_name} begins to resolve their ${card_name}'), array(
            'player_name' => $this->getPlayerNameById($player_id),
            'card_name' => $this->getCardName($dbcard),
        ));
        $this->setGameStateValue("resolvingCard", $dbcard["id"]);
    }

    /**
     * Discard the resolved card stored in "resolvingCard" and notify all players. Makes 3 db calls.
     * @param mixed $player_id id of the owner of the scheduled card
     * @param int $ct card that that is expected to resolve at this moment
     * @return array dbcard that just resolved
     */
    function fullyResolveCard(string $player_id) {
        //fully resolve the card from the schedule
        $card_id = $this->getGameStateValue("resolvingCard");
        if ($card_id == -1) {
            throw new Error("Trying to 'fullyResolveCard' without 'beginToResolveCard'");
        }
        $dbcard = $this->cards->getCard($card_id);
        $this->cards->moveCardOnTop($dbcard["id"], DISCARD.$player_id);
        $this->notifyAllPlayers('resolveTechnique', clienttranslate('${player_name} fully resolves their ${card_name}'), array(
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'card_name' => $this->getCardName($dbcard),
            'card' => $dbcard,
        ));
        $this->setGameStateValue("resolvingCard", -1);
        return $dbcard;
    }

    /**
     * If there is an ongoing resolving card, abort the resolving process.
     */
    function abortResolvingCard() {
        $card_id = $this->getGameStateValue("resolvingCard");
        if ($card_id != -1) {
            //cancelling involves aborting an already initiated resolving card
            $player_id = $this->getActivePlayerId();
            $dbcard = $this->cards->getCard($card_id);
            $this->cards->moveCard($dbcard["id"], HAND.$player_id);
            $this->notifyAllPlayers('cancelTechnique', clienttranslate('${player_name} cancels resolving their ${card_name}'), array(
                'player_id' => $player_id,
                'player_name' => $this->getActivePlayerName(),
                'card_name' => $this->getCardName($dbcard),
                'card' => $dbcard,
            ));
            if ($card_id == $this->getGameStateValue("cancelableChameleon")) {
                //the resolving (chameleon) card was bound for this reason. undo this.
                $type_id = $this->getGameStateValue("cancelableChameleonTypeId");
                $bindings = $this->effects->unbindChameleon($card_id, $type_id);
                $this->notifyAllPlayers('unbindChameleon', clienttranslate('${original_name} takes back its original form'), array(
                    "original_name" => $this->getCardName($dbcard),
                    "card_id" => $card_id
                ));
                if (count($bindings) > 2) {
                    throw new BgaVisibleSystemException("A chameleon has more than 2 bindings. This should not be possible");
                }
                else if (count($bindings) == 2) {
                    //edge case: chameleon -> good old times (passive) -> technique
                    //"technique -> good old times" is cancelable
                    //"good old times -> original chameleon" is not. rebind.
                    $original_type_id = $this->getTypeId($dbcard);
                    foreach ($bindings as $binding) {
                        if ($binding["type_id"] != CT_GOODOLDTIMES) {
                            $this->effects->insert($card_id, $original_type_id, $binding["target"]);
                            $this->notifyAllPlayers('bindChameleon', '', array(
                                "card_id" => $card_id,
                                "type_id" => $binding["target"]
                            ));
                        }
                    }
                }
            }
            $this->setGameStateValue("resolvingCard", -1);
        }
    }


//////////////////////////////////////////////////////////////////////////////
//////////// Building functions
////////////

    /*
        Here I place all the functions related to building a stack
    */

    /**
     * Enforces the specified collection of cards suffices to build the stack of the provided index
     * @param int $stack_index index of the stack that needs to be build (e.g. stack_index = 3 is the 4th stack)
     * @param array $cards cards that will be used to build the stack
     * @param array $cards_from_discard additional (optional) additional cards to include in the stack, but selected by CT_NOSTALGICITEM
     */
    function enforceValidStack(int $stack_index, array $cards, array $cards_from_discard = null) {
        //Check if the animalfolk sets are correct
        $multiple_sets_used = false;
        $junk_used = false;
        $set = null;
        foreach ($cards as $card) {
            $animalfolk = $this->getAnimalfolk($card);
            if ($animalfolk == null) {
                $junk_used = true;
            }
            else if ($set == null) {
                $set = $animalfolk;
            }
            else if ($set != $animalfolk) {
                $multiple_sets_used = true;
            }
        }

        //cards from discard bypass the basic rules, but will be included from this point onwards
        if ($cards_from_discard) {
            $cards = array_merge($cards, $cards_from_discard);
        }
    
        //Enforce no junk cards are used
        if ($junk_used && !$this->containsTypeId($cards, CT_STASHINGVENDOR)) {
            throw new BgaUserException($this->_("Junk cards cannot be included in a stack"));
        }

        //Enforce only a single animalfolk set is used
        if ($multiple_sets_used && !$this->containsTypeId($cards, CT_EMPTYCHEST)) {
            throw new BgaUserException($this->_("Cards in the stack must be of the same animalfolk set"));
        }

        //Enforce the stack value is correct
        $nbr_accordion = $this->countTypeId($cards, CT_ACCORDION);
        $total_value = $this->getValueSum($cards);
        $min_value = $stack_index + 1 - $nbr_accordion;
        $max_value = $stack_index + 1 + $nbr_accordion;
        if ($total_value < $min_value || $total_value > $max_value) {
            throw new BgaUserException($this->_("Stack value is incorrect")." ($total_value)");
        }
    }

    /**
     * Add new cards to the specified stack. Returns the state transition to take after building the stack.
     * @param int $stack_index the index of the stack to build
     * @param array $cards_from_hand cards to add to the stack from hand
     * @param array $cards_from_discard (optional) - cards to add to the stack from discard
     * @return string game state transition to take after building. One of:
     * * trGameEnd
     * * trNextPlayer
     */
    function build(int $stack_index, array $cards_from_hand, array $cards_from_discard = null) {
        //Get the current player
        $player_id = $this->getActivePlayerId();

        //Apply the rules for a valid stack
        $this->enforceValidStack($stack_index, $cards_from_hand, $cards_from_discard);

        //Add the cards to the stack
        if ($cards_from_discard) {
            $this->cards->moveCardsToStall($this->toCardIds($cards_from_discard), STALL.$player_id, $stack_index);
        }
        $this->cards->moveCardsToStall($this->toCardIds($cards_from_hand), STALL.$player_id, $stack_index);

        //Notify players about the complete build
        if ($cards_from_discard) {
            $this->notifyAllPlayers('buildStack', clienttranslate('Nostalgic Item: ${player_name} includes ${nbr} card(s) from their discard pile in their stack.'), array(
                "player_id" => $player_id,
                "player_name" => $this->getPlayerNameById($player_id),
                "nbr" => count($cards_from_discard),
                "stack_index_plus_1" => $stack_index + 1, //+1, because stack indices are 0-indexed
                "stack_index" => $stack_index,
                "cards" => $cards_from_discard,
                "from" => DISCARD
            ));
        }
        $this->notifyAllPlayers('buildStack', clienttranslate('${player_name} builds stack ${stack_index_plus_1}'), array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "stack_index_plus_1" => $stack_index + 1, //+1, because stack indices are 0-indexed
            "stack_index" => $stack_index,
            "cards" => $cards_from_hand,
            "from" => HAND
        ));

        //Update the player score and end turn
        $win = $this->updateScore($player_id, $stack_index + 1);
        if ($win) {
            return "trGameEnd";
        }
        return "trNextPlayer";
    }


//////////////////////////////////////////////////////////////////////////////
//////////// Debug functions
////////////    

    /*
        In this space, you can put debugging tools
    */
    
    function testRemoveCardsFromPile() {
        //manual test was executed by
        //1. manually setting up rows in the table
        //2. looking at the rows in the table after executing this function
        //$this->removeCardsFromPile(DISCARD.'test');
        $player_id = $this->getCurrentPlayerId();
        $this->destroyAll();
        $spawned_cards = $this->spawnDiscard("nos", 10); //10 cards in the discard pile
        $cards = $this->cards->getCardsFromLocation($this->toCardIds($spawned_cards), DISCARD.$player_id);
        $card_ids = $this->toCardIds($cards);
        $target_card_ids = array(
            $card_ids[1],
            $card_ids[5],
            $card_ids[9],
            $card_ids[0],
            $card_ids[4],
            $card_ids[8],
        );
        $this->cards->removeCardsFromPile($target_card_ids, DISCARD.$player_id); //remove 6 cards
        $this->cards->moveCards($target_card_ids, 'destroyed');
        $cards = $this->cards->getCardsInLocation(DISCARD.$player_id); //4 cards remain
        $location_args = array(1, 2, 3, 4); //4 cards remain
        if (count($cards) != count($location_args)) {
            $c1 = count($cards);
            $c2 = count($location_args);
            die("TEST FAILED: count(cards) == $c1 != $c2 == count(location_args)");
        }
        foreach ($cards as $card) {
            if(array_search($card["location_arg"], $location_args) === false) {
                die("TEST FAILED: unexpected index ".$card["location_arg"]);
            }
        }
        die("SUCCESS ! TESTS PASSED !");
        die(print_r($location_args));
    }

    function testUnbindChameleon() {
        $this->effects->expireEndOfTurn();
        $this->effects->insert(1, CT_FLEXIBLESHOPKEEPER, 23);
        $this->effects->insert(2, CT_GOODOLDTIMES, 34);
        $this->effects->insert(3, CT_GOODOLDTIMES, -1);
        $this->effects->insert(4, CT_SEEINGDOUBLES, 63);
        $this->effects->unbindChameleon(2); //has a valid target that should be unbinded
        $this->effects->unbindChameleon(3); //has an invalid target, don't remove this effect
        $target1 = $this->effects->getTarget(1, CT_FLEXIBLESHOPKEEPER);
        $target2 = $this->effects->getTarget(2, CT_GOODOLDTIMES);
        $target3 = $this->effects->getTarget(3, CT_GOODOLDTIMES);
        $target4 = $this->effects->getTarget(4, CT_SEEINGDOUBLES);
        if ($target1 != 23) {
            die("TEST FAILED: $target1 != 23");
        }
        if ($target2 != null) {
            die("TEST FAILED: $target2 != null, card_id 2 should have been unbounded");
        }
        if ($target3 != -1) {
            die("TEST FAILED: $target3 != -1, card_id 3 should still have an effect with [target == -1]");
        }
        if ($target4 != 63) {
            die("TEST FAILED: $target4 != null");
        }
        die("SUCCESS ! TESTS PASSED !");
    }

    function testEffects() {
        foreach (array(false, true) as $reload) { //reloading yes or no should not make a difference
            $reload_msg = $reload ? " (reload TRUE)" : " (reload FALSE)";
            $this->effects->expireEndOfTurn();
            $target = 33;
            $this->effects->insert(41, 0);
            $this->effects->insert(42, 0);
            if ($reload) $this->effects->loadFromDb();
            $this->effects->insert(43, 7);
            $this->effects->insert(44, 0);
            if ($reload) $this->effects->loadFromDb();
            $this->effects->insert(101, 7);
            $this->effects->insert(102, 7);
            $this->effects->insert(103, 0);
            $this->effects->updateTarget(43, 7, $target);
            if ($reload) $this->effects->loadFromDb();

            $target = $this->effects->getTarget(42);
            if ($target != -1) {
                die("TEST FAILED: getEffectByCardId(42), the default target should be -1".$reload_msg);
            }
            $target = $this->effects->getTarget(43);
            if ($target != $target) {
                die("TEST FAILED: updateTarget(43, 7, target) and getEffectByCardId(43), target not updated".$reload_msg);
            }
            $effects = $this->effects->getEffectsByTypeId(7);
            if (count($effects) != 3) {
                $actual = count($effects);
                die("TEST FAILED: getEffectsByTypeId(7), expected 3, actually $actual".$reload_msg);
            }
            $count = $this->effects->countEffectsOfTypeId(7);
            if ($count != 3) {
                die("TEST FAILED: countEffectsOfTypeId(7), expected 3, actually $count".$reload_msg);
            }
        }
        die("SUCCESS ! TESTS PASSED !");
        die(print_r($this->effects->cache));
    }

    function testSchedule() {
        $player_id = $this->getCurrentPlayerId();
        $cards = $this->spawn("Swift");
        $card = reset($cards);
        $this->scheduleCard($player_id, $card);
        $this->beginToResolveCard($player_id, $card);
        $this->fullyResolveCard($player_id);
    }

    function spawnStall(int $pos, string $name = "emptychest") {
        //spawn a card in a stall position
        $player_id = $this->getCurrentPlayerId();
        $index = $pos % MAX_STACK_SIZE;
        $stack_index = ($pos - $index) / MAX_STACK_SIZE;
        $spawned_cards = $this->spawn($name);
        foreach ($spawned_cards as $index => $card) {
            $this->cards->moveCard($card["id"], STALL.$player_id, $pos);
        }
        $this->notifyAllPlayers('buildStack', clienttranslate('${player_name} builds stack ${stack_index_plus_1}'), array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "stack_index_plus_1" => $stack_index + 1,
            "stack_index" => $stack_index,
            "cards" => $spawned_cards,
            "from" => HAND
        ));
    }

    function destroySchedule() {
        //requires refresh
        $players = $this->loadPlayersBasicInfos();
        foreach ( $players as $player_id => $player ) {
            $this->cards->moveAllCardsInLocation(SCHEDULE.$player_id, 'destroyed');
        }   
    }

    function destroyHand() {
        //requires refresh
        $player_id = $this->getCurrentPlayerId();
        $this->cards->moveAllCardsInLocation(HAND.$player_id, 'destroyed');
    }

    function destroyDeck() {
        //requires refresh
        $player_id = $this->getCurrentPlayerId();
        $this->cards->moveAllCardsInLocation(DECK.$player_id, 'destroyed');
    }

    function destroyAll() {
        //requires refresh
        $location_dict = $this->cards->countCardsInLocations();
        foreach($location_dict as $location => $count ) {
            $this->cards->moveAllCardsInLocation($location, 'destroyed');
        }
    }

    /**
     * Spawn and immediately discard the spawned cards
     * @param string $name prefix of the card name
     * @param int $nbr (optional) amount of cards to spawn
     * @return array spawned cards
     */
    function spawnDiscard(string $name, int $nbr = 1) {
        $player_id = $this->getCurrentPlayerId();
        $cards = $this->spawn($name, $nbr);
        $this->discardMultiple(
            $player_id, 
            clienttranslate('DEBUG: discard'),
            $this->toCardIds($cards),
            $cards
        );
        return $cards;
    }

    /**
     * Spawn a number of new cards out of thin air and place it in the current player's hand
     * @param string $name prefix of the card name
     * @param int $nbr (optional) amount of cards to spawn
     * @return array spawned cards
     */
    function spawn(string $name, int $nbr = 1) {
        //spawn a card in hand (warning: breaks deck size counter)
        $player_id = $this->getCurrentPlayerId();
        $type_id = $this->nameToTypeId($name);
        $cards = array(array('type' => 'null', 'type_arg' => $type_id, 'nbr' => $nbr));
        $this->cards->createCards($cards, 'spawned');
        $cards = $this->cards->getCardsInLocation('spawned');
        $this->cards->moveAllCardsInLocation('spawned', HAND.$player_id);
        $this->notifyAllPlayers('debugClient', 'DEBUG: increase deck size', array(
            'arg' => 'increaseDeckSize', 
            'player_id' => $player_id,
            'nbr' => count($cards)
        ));
        $this->notifyAllPlayersWithPrivateArguments('drawMultiple', clienttranslate('DEBUG: spawn cards in hand'), array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "nbr" => count($cards),
            "_private" => array(
                "cards" => $cards
            )
        ));
        return $cards;
    }

    /**
     * Return the first type id of a card type with the given prefix
     * @example example
     * stringToTypeId("coo") = CT_COOKIES
     */
    function nameToTypeId(string $prefix): int {
        $len = strlen($prefix);
        $f = function($name) use ($len) {
            $uppercase = strtoupper(preg_replace('/\s+/', '', $name));
            return substr($uppercase, 0, $len);
        };
        foreach ($this->card_types as $type_id => $card) {
            if ($f($card['name']) == $f($prefix)) {
                return $type_id;
            }
        }
        die("No card name matches prefix '$prefix'");
        return -1;
    }

    /**
     * Information about the card that is currently being resolving
     */
    function getResolvingCard(){
        $resolvingCard = $this->getGameStateValue("resolvingCard");
        $card = $this->cards->getCard($resolvingCard);
        $name = $this->getCardName($card);
        $this->clientConsoleLog("Currently resolving a $name (card $resolvingCard)");
    }

    /**
     * Print a message in the client's console
     */
    function clientConsoleLog($msg) {
        $this->notifyAllPlayers('debugClient', 'clientConsoleLog', array('arg' => 'clientConsoleLog', 'msg' => $msg));
    }

    function d($arg) {
        //debugClient
        $this->notifyAllPlayers('debugClient', clienttranslate('Debugging (arg = ${arg})...'), array('arg' => $arg));
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Player actions
//////////// 

    /*
        Each time a player is doing some game action, one of the methods below is called.
        (note: each method below must match an input method in dale.action.php)
    */

    function actRequestMarketAction(int $market_card_id) {
        $this->checkAction("actRequestMarketAction");
        $this->cards->getCardsFromLocation([$market_card_id], MARKET);

        //TODO: check if maximum available funds are sufficient

        $this->setGameStateValue( "selectedCard", $market_card_id );
        $this->gamestate->nextState("trPurchase");
    }
    
    function actCancel() {
        $this->checkAction("actCancel");
        $this->abortResolvingCard();
        $this->gamestate->nextState("trCancel");
    }

    function actPurchase(string $chameleon_card_ids, string $chameleon_type_ids, string $funds_card_ids) {
        $this->addChameleonBindings($chameleon_card_ids, $chameleon_type_ids, $funds_card_ids);
        $this->checkAction("actPurchase");
        $funds_card_ids = $this->numberListToArray($funds_card_ids);

        //Get information about the funds
        $player_id = $this->getActivePlayerId();
        $funds_cards = $this->cards->getCardsFromLocation($funds_card_ids, HAND.$player_id);
        $total_value = 0;
        $lowest_value = 1000;
        foreach ($funds_cards as $card) {
            $value = $this->getValue($card);
            $lowest_value = min($lowest_value, $value);
            $total_value += $value;
        }

        //Get information about the market card
        $market_card_id = $this->getGameStateValue("selectedCard");
        $market_card = $this->cards->getCard($market_card_id);
        $cost = $this->getCost($market_card);

        //Check if funds are sufficient
        if ($total_value < $cost) {
            throw new BgaUserException($this->_("Insufficient funds")." ($total_value)");
        }

        //Check for overpaying
        if (($total_value - $lowest_value) >= $cost) {
            //TODO: 'Stock Clearance'
            throw new BgaUserException($this->_("Overpaying is not allowed")." ($total_value)");
        }

        //Discard the funds
        $this->cards->moveCardsOnTop($funds_card_ids, DISCARD.$player_id);
        $this->notifyAllPlayers('discardMultiple', clienttranslate('${player_name} pays ${nbr} card(s)'), array (
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'card_ids' => $funds_card_ids,
            'cards' => $funds_cards,
            'nbr' => count($funds_cards)
        ));

        //Obtain the market card
        $this->cards->moveCard($market_card_id, HAND.$player_id);
        $this->notifyAllPlayers('marketToHand', clienttranslate('${player_name} bought a ${card_name}'), array (
            'i18n' => array('card_name'),
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'card_name' => $this->getCardName($market_card),
            'market_card_id' => $market_card_id,
            'pos' => $market_card["location_arg"],
        ));

        //end turn
        $this->gamestate->nextState("trNextPlayer");
    }

    function actPlayCard($chameleon_card_ids, $chameleon_type_ids, $card_id) {
        $this->addChameleonBindings($chameleon_card_ids, $chameleon_type_ids, $card_id);
        $this->checkAction("actPlayCard");
        $player_id = $this->getActivePlayerId();
        $card = $this->cards->getCardFromLocation($card_id, HAND.$player_id);
        $type_id = $this->getTypeId($card);
        if ($this->card_types[$type_id]['playable'] == false) {
            throw new BgaUserException($this->_("That card is not playable!"));
        }
        
        //technique
        $this->setGameStateValue("cancelableChameleon", intval($chameleon_card_ids));
        $this->scheduleCard($player_id, $card);
        switch($type_id) {
            case CT_SWIFTBROKER:
                $this->beginToResolveCard($player_id, $card);
                $this->gamestate->nextState("trSwiftBroker");
                break;
            case CT_SHATTEREDRELIC:
                $this->beginToResolveCard($player_id, $card);
                $this->gamestate->nextState("trShatteredRelic");
                break;
            case CT_SPYGLASS:
                $cards = $this->cards->pickCardsForLocation(3, DECK.$player_id, TEMPORARY.$player_id);
                $this->notifyAllPlayersWithPrivateArguments('drawMultiple', clienttranslate('Spyglass: ${player_name} draws 3 card'), array(
                    "player_id" => $player_id,
                    "player_name" => $this->getPlayerNameById($player_id),
                    "nbr" => count($cards),
                    "_private" => array(
                        "cards" => $cards
                    ),
                    "to_temporary" => true
                ));
                $this->beginToResolveCard($player_id, $card);
                if (count($cards) == 0) {
                    //skyglass has no effect
                    $this->gamestate->nextState("trFullyResolveTechnique");
                }
                else {
                    //resolve spyglass
                    $this->gamestate->nextState("trSpyglass");
                }
                break;
            case CT_FLASHYSHOW:
                $this->beginToResolveCard($player_id, $card);
                $this->effects->insert($card["id"], CT_FLASHYSHOW);
                $this->notifyAllPlayers('message', clienttranslate('Flashy Show: ${player_name} increases the value of all cards they use by 1 for this turn'), array(
                    "player_name" => $this->getPlayerNameById($player_id),
                ));
                $this->gamestate->nextState("trFullyResolveTechnique");
                break;
            case CT_FAVORITETOY:
                $this->beginToResolveCard($player_id, $card);
                $recovered_card = $this->cards->getCardOnTop(DISCARD.$player_id);
                if ($recovered_card != null) {
                    $this->cards->moveCard($recovered_card["id"], HAND.$player_id);
                    $this->notifyAllPlayers('discardToHand', clienttranslate('Favorite Toy: ${player_name} places their ${card_name} from their discard pile into their hand'), array(
                        "player_id" => $player_id,
                        "player_name" => $this->getPlayerNameById($player_id),
                        "card_name" => $this->getCardName($recovered_card),
                        "card" => $recovered_card
                    ));
                }
                $this->gamestate->nextState("trFullyResolveTechnique");
                break;
            default:
                $name = $this->getCardName($card);
                throw new BgaVisibleSystemException("TECHNIQUE NOT IMPLEMENTED: '$name'");
        }
    }
    
    function actUseActiveAbility($chameleon_card_ids, $chameleon_type_ids, $card_id) {
        $this->addChameleonBindings($chameleon_card_ids, $chameleon_type_ids, $card_id);
        $this->checkAction("actUseActiveAbility");

        $player_id = $this->getActivePlayerId();
        $card = $this->cards->getCardFromLocation($card_id, HAND.$player_id);
        $type_id = $this->getTypeId($card);
        if ($this->card_types[$type_id]['has_active'] == false) {
            throw new BgaUserException($this->_("That card has no active ability!"));
        }

        $target = $this->effects->getTarget($card_id, $type_id);
        if ($target != null && ($type_id != CT_GOODOLDTIMES || $target != CT_GOODOLDTIMES)) {
            throw new BgaUserException($this->_("That card's active ability has already been used this turn!"));
        }

        switch($type_id) {
            case CT_GOODOLDTIMES:
                $this->throwAwayFromMarketDeck(clienttranslate('${player_name} uses their Good Old Times to throw away a card from the market deck'));
                $effect = $this->effects->insert($card_id, $type_id);
                $this->notifyAllPlayers('addEffect', '', array("effect" => $effect));
                break;
            default:
                $name = $this->getCardName($card);
                throw new BgaVisibleSystemException("ACTIVE ABILITY NOT IMPLEMENTED: '$name'");
        }

        $this->gamestate->nextState("trActiveAbility");
    }

    function actSwiftBroker(string $card_ids) {
        $this->checkAction("actSwiftBroker");
        $card_ids = $this->numberListToArray($card_ids);
        $player_id = $this->getCurrentPlayerId();

        //get the non-selected cards and selected cards
        $non_selected_cards = $this->cards->getCardsInLocation(HAND.$player_id);
        $selected_cards = $this->cards->getCardsFromLocation($card_ids, HAND.$player_id);
        foreach ($selected_cards as $card_id => $card) {
            unset($non_selected_cards[$card_id]);
        }

        //discard all
        $this->discardMultiple(
            $player_id, 
            clienttranslate('Swift Broker: ${player_name} discards their hand'),
            $card_ids, 
            $selected_cards, 
            $non_selected_cards
        );

        //draw an equal amount of new cards
        $nbr = count($selected_cards) + count($non_selected_cards);
        $new_cards = $this->cards->pickCardsForLocation($nbr, DECK.$player_id, HAND.$player_id);
        if ($nbr != count($new_cards)) {
            throw new Error("Swift Broker Invariant Exception: unable to pick enough cards from deck, even though this is guaranteed to be possible");
        }
        $this->notifyAllPlayersWithPrivateArguments('drawMultiple', clienttranslate('${player_name} draws ${nbr} cards'), array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "nbr" => $nbr,
            "_private" => array(
                "cards" => $new_cards
            )
        ));
        
        $this->gamestate->nextState("trFullyResolveTechnique");
    }

    function actShatteredRelic($card_id) {
        $this->checkAction("actShatteredRelic");
        $player_id = $this->getActivePlayerId();
        $card = $this->cards->getCardFromLocation($card_id, HAND.$player_id);

        //throw away a card
        $destination = $this->isJunk($card) ? JUNKRESERVE : DISCARD.MARKET;
        $this->cards->moveCardOnTop($card_id, $destination);
        $this->notifyAllPlayers('throwAway', clienttranslate('Shattered Relic: ${player_name} throws away a ${card_name}'), array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "card_name" => $this->getCardName($card), //TODO: i18n for card names
            "card" => $card
        ));

        //draw a card
        $card = $this->cards->pickCardForLocation(DECK.$player_id, HAND.$player_id);
        $this->notifyAllPlayersWithPrivateArguments('draw', clienttranslate('Shattered Relic: ${player_name} draws 1 card'), array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "_private" => array(
                "card" => $card
            )
        ));

        $this->gamestate->nextState("trFullyResolveTechnique");
    }

    function actSpyglass($card_ids) {
        $this->checkAction("actSpyglass");
        $card_ids = $this->numberListToArray($card_ids);
        $player_id = $this->getActivePlayerId();

        //get the card to draw (first card from the card_ids array)
        if (count($card_ids) == 0) {
            throw new BgaUserException($this->_("You must select at least 1 card to place into your hand"));
        }
        $draw_card_id = array_shift($card_ids);
        $draw_card = $this->cards->getCardFromLocation($draw_card_id, TEMPORARY.$player_id);

        //get the non-selected cards and selected cards to discard
        $non_selected_cards = $this->cards->getCardsInLocation(TEMPORARY.$player_id);
        $selected_cards = $this->cards->getCardsFromLocation($card_ids, TEMPORARY.$player_id);
        foreach ($selected_cards as $card_id => $card) {
            unset($non_selected_cards[$card_id]);
        }
        unset($non_selected_cards[$draw_card_id]);

        //TODO !!!!!!!!!!!!!!! BUG WITH THIS NOTIFICATION!
        //1. place the selected card into the hand
        $this->cards->moveCard($draw_card_id, HAND.$player_id);
        $this->notifyAllPlayersWithPrivateArguments('temporaryToHand', clienttranslate('Spyglass: ${player_name} places 1 card into their hand'), array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "_private" => array(
                "card" => $draw_card
            )
        ));

        //2. place the rest on top of the deck
        $this->placeOnDeckMultiple(
            $player_id, 
            clienttranslate('Spyglass: ${player_name} places ${nbr} cards on top of their deck'),
            $card_ids, 
            $selected_cards, 
            $non_selected_cards,
            true
        );

        $this->gamestate->nextState("trFullyResolveTechnique");
    }

    function actRequestStallAction() {
        $this->checkAction("actRequestStallAction");
        $this->gamestate->nextState("trBuild");
    }

    function actBuild(string $chameleon_card_ids, string $chameleon_type_ids, string $stack_card_ids, string $stack_card_ids_from_discard) {
        $this->addChameleonBindings($chameleon_card_ids, $chameleon_type_ids, $stack_card_ids, $stack_card_ids_from_discard);
        $this->checkAction("actBuild");
        $stack_card_ids = $this->numberListToArray($stack_card_ids);
        $stack_card_ids_from_discard = $this->numberListToArray($stack_card_ids_from_discard);

        //Get information about the stack cards from hand
        $player_id = $this->getActivePlayerId();
        $stack_cards = $this->cards->getCardsFromLocation($stack_card_ids, HAND.$player_id);
        $stack_index = $this->cards->getNextStackIndex($player_id);

        //Get information about the stack cards from discard (CT_NOSTALGICITEM)
        $stack_cards_from_discard = null;
        $nbr_from_discard = count($stack_card_ids_from_discard);
        if ($nbr_from_discard > 0) {
            $stack_cards_from_discard = $this->cards->removeCardsFromPile($stack_card_ids_from_discard, DISCARD.$player_id);
            $nbr_nostalgic_item = $this->countTypeId($stack_cards, CT_NOSTALGICITEM);
            if ($nbr_nostalgic_item > 0) {
                //you need at least 1 nostalgic item in hand to start counting nostalgic items from discard
                $nbr_nostalgic_item += $this->countTypeId($stack_cards_from_discard, CT_NOSTALGICITEM);
            }
            if ($nbr_from_discard > $nbr_nostalgic_item) {
                throw new BgaUserException($this->_("You cannot include cards from your discard pile."));
            }
        }

        //Build the stack
        $transition = $this->build($stack_index, $stack_cards, $stack_cards_from_discard);
        $this->gamestate->nextState($transition);
    }

    function actRequestInventoryAction() {
        $this->checkAction("actRequestInventoryAction");
        $this->gamestate->nextState("trInventory");
    }

    function actInventoryAction(string $card_ids) {
        $this->checkAction("actInventoryAction");
        $card_ids = $this->numberListToArray($card_ids);
        $player_id = $this->getActivePlayerId();

        //verify that these cards are actually in the player's hand
        $cards = $this->cards->getCardsFromLocation($card_ids, HAND.$player_id);

        //move the cards to the discard pile (ordering matters)
        $this->cards->moveCardsOnTop($card_ids, DISCARD.$player_id);

        //notify all players
        $this->notifyAllPlayers('discardMultiple', clienttranslate('${player_name} discards ${nbr} cards'), array (
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'card_ids' => $card_ids,
            'cards' => $cards,
            'nbr' => count($card_ids)
        ));
        
        
        $this->gamestate->nextState("trNextPlayer");
    }

    
//////////////////////////////////////////////////////////////////////////////
//////////// Game state arguments
////////////

    /*
        Here, you can create methods defined as "game state arguments" (see "args" property in states.inc.php).
        These methods function is to return some additional information that is specific to the current
        game state.
    */

    function argSelectedCardInMarket(){
        $card_id = $this->getGameStateValue("selectedCard");
        $card = $this->cards->getCard($card_id);
        $type_id = $card['type_arg'];
        return array(
            'i18n' => array('card_name'),
            'card_name' => $this->card_types[$type_id]['name'],
            'card_id' => $card['type_arg'],
            'cost' => $this->getCost($card),
            'pos' => $card['location_arg']
        );
    }

    function argStackIndex(){
        $player_id = $this->getActivePlayerId();
        $stack_index = $this->cards->getNextStackIndex($player_id);
        return array(
            'stack_index' => $stack_index,
            'stack_index_plus_1' => $stack_index + 1
        );
    }

    /*
    
    Example for game state "MyGameState":
    
    function argMyGameState()
    {
        // Get some values from the current game situation in database...
    
        // return values:
        return array(
            'variable1' => $value1,
            'variable2' => $value2,
            ...
        );
    }    
    */

//////////////////////////////////////////////////////////////////////////////
//////////// Game state actions
////////////

    /*
        Here, you can create methods defined as "game state actions" (see "action" property in states.inc.php).
        The action method of state X is called everytime the current game state is set to X.
    */

    function stFullyResolveTechnique() {
        //resolve the current resolvingCard
        $player_id = $this->getActivePlayerId();
        $dbcard = $this->fullyResolveCard($player_id);
        
        //decide if the player can go again
        $type_id = $this->getTypeId($dbcard);
        if ($this->card_types[$type_id]["has_plus"]) {
            $this->gamestate->nextState("trSamePlayer");
        }
        else {
            $this->gamestate->nextState("trNextPlayer");
        }
    }

    function stNextPlayer() {
        //aka the "clean-up phase"

        //1. fill your hand to the maximum hand size
        $this->refillHand();

        //2. fill empty market slots
        $this->refillMarket(true);

        //delete all effects that last until end of turn
        $this->effects->expireEndOfTurn();

        //activate the next player
        $next_player_id = $this->activeNextPlayer();
        $this->giveExtraTime($next_player_id);
        $this->gamestate->nextState("trNextPlayer");
    }


//////////////////////////////////////////////////////////////////////////////
//////////// Zombie
////////////

    /*
        zombieTurn:
        
        This method is called each time it is the turn of a player who has quit the game (= "zombie" player).
        You can do whatever you want in order to make sure the turn of this player ends appropriately
        (ex: pass).
        
        Important: your zombie code will be called when the player leaves the game. This action is triggered
        from the main site and propagated to the gameserver from a server, not from a browser.
        As a consequence, there is no current player associated to this action. In your zombieTurn function,
        you must _never_ use getCurrentPlayerId() or getCurrentPlayerName(), otherwise it will fail with a "Not logged" error message. 
    */

    function zombieTurn( $state, $active_player )
    {
    	$statename = $state['name'];
    	
        if ($state['type'] === "activeplayer") {
            switch ($statename) {
                default:
                    $this->gamestate->nextState( "zombiePass" );
                	break;
            }

            return;
        }

        if ($state['type'] === "multipleactiveplayer") {
            // Make sure player is in a non blocking status for role turn
            $this->gamestate->setPlayerNonMultiactive( $active_player, '' );
            
            return;
        }

        throw new feException( "Zombie mode not supported at this game state: ".$statename );
    }
    
///////////////////////////////////////////////////////////////////////////////////:
////////// DB upgrade
//////////

    /*
        upgradeTableDb:
        
        You don't have to care about this until your game has been published on BGA.
        Once your game is on BGA, this method is called everytime the system detects a game running with your old
        Database scheme.
        In this case, if you change your Database scheme, you just have to apply the needed changes in order to
        update the game database and allow the game to continue to run with your new version.
    
    */
    
    function upgradeTableDb( $from_version )
    {
        // $from_version is the current version of this game database, in numerical form.
        // For example, if the game was running with a release of your game named "140430-1345",
        // $from_version is equal to 1404301345
        
        // Example:
//        if( $from_version <= 1404301345 )
//        {
//            // ! important ! Use DBPREFIX_<table_name> for all tables
//
//            $sql = "ALTER TABLE DBPREFIX_xxxxxxx ....";
//            $this->applyDbUpgradeToAllDB( $sql );
//        }
//        if( $from_version <= 1405061421 )
//        {
//            // ! important ! Use DBPREFIX_<table_name> for all tables
//
//            $sql = "CREATE TABLE DBPREFIX_xxxxxxx ....";
//            $this->applyDbUpgradeToAllDB( $sql );
//        }
//        // Please add your future database scheme changes here
//
//


    }    
}
