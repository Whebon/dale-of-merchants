<?php
 /**
  *------
  * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
  * Dale implementation : © <Your name here> <Your email address here>
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
    var $card_types;

    function f($n){
        $this->cards->getJunk($n);
    }

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
            "selectedCard" => 10
            //    "my_first_global_variable" => 10,
            //    "my_second_global_variable" => 11,
            //      ...
            //    "my_first_game_variant" => 100,
            //    "my_second_game_variant" => 101,
            //      ...
        ) );

        $this->cards = new DaleDeck($this, "onLocationExhausted");
        $this->cards->init("card");
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
        $this->setGameStateInitialValue( 'selectedCard', 0 );
        
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
            $this->notifyAllPlayersWithPrivateArguments('draw', clienttranslate('${player_name} draws their initial hand of ${nbr} cards'), array(
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
        if (strlen(DECK) != 4 || strlen(DISCARD) != 4 || strlen(HAND) != 4) {
            throw new AssertionError("DECK, DISCARD and HAND prefixes must be of length 4");
        }
    
        // Get information about players
        // Note: you can retrieve some extra field you added for "player" table in "dbmodel.sql" if you need it.
        $players = $this->loadPlayersBasicInfos();
        $sql = "SELECT player_id id, player_score score FROM player ";
        $result['players'] = $this->getCollectionFromDb( $sql );

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

        //other
        $result['market'] = $this->cards->getCardsInLocation(MARKET);
        $result['hand'] = $this->cards->getCardsInLocation(HAND.$current_player_id);
        
        $result['cardTypes'] = $this->card_types;
  
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
//////////// Enforcement functions (unofficial)
////////////   

    /**
     * DEPRECATED: this is not needed anymore
     * Enforces the associative array of cards include the given array of ids.
     * WARNING: for performance reasons, the check is superficial and only enforces the arrays to be of equal length.
     * @param string $location_arg Optional. If and only if provided, the cards exactly appear at this location_arg.
     */
    function enforceCardsInclude(array $cards, array $card_ids) {
        $actual = count($cards);
        $expected = count($card_ids);
        if($expected != $actual) {
            $missing_ids_string = "";
            foreach( $cards as $card ) {
                $missing = true;
                foreach ($card_ids as $id) {
                    if ($id == $card['id']) {
                        $missing = false;
                        break;
                    }
                }
                if ($missing) {
                    $missing_ids_string .= $id;
                    $missing_ids_string .= ", ";
                }
            }
            $missing_ids_string = substr($missing_ids_string, 0, -2);
            throw new BgaVisibleSystemException("Cards with ids [$missing_ids_string] don't exist.");
        }
    }

    /**
     * DEPRECATED: this is not needed anymore
     * Enforces all provided cards are in the expected location.
     * @param array $cards Optional. If and only if provided, the cards exactly appear at this location_arg.
     * @param string $location All cards must be in at this location.
     * @param string $location_arg Optional. If and only if provided, the cards exactly appear at this location_arg.
     */
    function enforceCardsAreInLocation(array $cards, string $location, string $location_arg = null) {
        foreach( $cards as $card ) {
            if( $card['location'] != $location) {
                $card_id = $card['id'];
                $actual_location = $card['location'];
                $msg = "Card $card_id was expected in location '$location', but is actually in location '$actual_location'";
                throw new BgaVisibleSystemException($msg);
            }
            if ($location_arg != null && $card['location_arg'] != $location_arg) {
                $card_id = $card['id'];
                $actual_location_arg = $card['location_arg'];
                $msg = "Card $card_id was expected in location '$location@$location_arg', but is actually in location '$location@$actual_location_arg'";
                throw new BgaVisibleSystemException($msg);
            }
        }
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
    function numberListToArray($AT_numberlist){
        if( $AT_numberlist == '' )
            return array();
        if( substr( $AT_numberlist, -1 ) == ';' )
            $AT_numberlist = substr( $AT_numberlist, 0, -1 );
        return explode(';', $AT_numberlist);
    }


    /**
     * Send a notification to all players, but only the active player receives args["_private"]
     * @param mixed $type
     * @param mixed $message
     * @param mixed $args
     */
    function notifyAllPlayersWithPrivateArguments($type, $message, $args) {
        //the active player receives the notification with the private arguments
        $active_player_id = $this->getActivePlayerId();
        $this->notifyPlayer($active_player_id, $type, $message, $args);

        //all the other players receive the notification without the private arguments
        unset($args["_private"]);
        $players = $this->loadPlayersBasicInfos();
        foreach ( $players as $player_id => $player ) {
            if ($player_id != $active_player_id) {
                $this->notifyPlayer($player_id, $type, $message, $args);
            }
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
                        "player_id" => $player_id
                    ));
                }
                else {
                    $this->notifyAllPlayers('reshuffleDeck', clienttranslate('${player_name} shuffles their discard pile to form a new deck'), array(
                        "player_id" => $player_id,
                        "player_name" => $this->getPlayerNameById($player_id)
                    ));
                }
            }
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
            foreach ($cards as $card) {
                $this->cards->moveCard($card['id'], MARKET, $first_free_slot);
                $first_free_slot++;
            }
            $this->notifyAllPlayers('marketSlideRight', clienttranslate('Cards in the market move to the right'), array());
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
        //TODO: chameleons
        return $dbcard['type_arg'];
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
     * Returns the effective value of a card (accounts for modifications such as 'Flashy Show').
     * @param array $dbcard card to get the value of
    */
    function getValue(array $dbcard): int {
        $type_id = $this->getTypeId($dbcard);
        return $this->card_types[$type_id]['value'];
    }

    /**
     * Returns the effective name of the card.
     * @param array $dbcard card to get the name of
    */
    function getCardName(array $dbcard): string {
        $type_id = $this->getTypeId($dbcard);
        return $this->card_types[$type_id]['name'];
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Debug functions
////////////    

    /*
        In this space, you can put debugging tools
    */

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
            "cards" => $spawned_cards
        ));
    }

    function destroyDeck() {
        //requires refresh
        $player_id = $this->getCurrentPlayerId();
        $this->cards->moveAllCardsInLocation(DECK.$player_id, 'destroyed');
    }

    function destroyAllCards() {
        //requires refresh
        $location_dict = $this->cards->countCardsInLocations();
        foreach($location_dict as $location => $count ) {
            $this->cards->moveAllCardsInLocation($location, 'destroyed');
        }
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
        $this->notifyAllPlayersWithPrivateArguments('draw', clienttranslate('DEBUG: spawn in a card in hand'), array(
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
     * Print a message in the client's console
     */
    function clientConsoleLog($msg) {
        $this->notifyAllPlayers('debugClient', $msg, array('arg' => 'clientConsoleLog', 'msg' => $msg));
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
        $this->gamestate->nextState("trCancel");
    }

    function actPurchase(string $funds_card_ids) {
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
        $market_card_id = $this->getGameStateValue('selectedCard');
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
        $this->notifyAllPlayers('discard', clienttranslate('${player_name} pays ${nbr} card(s)'), array (
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

    function actRequestStallAction() {
        $this->checkAction("actRequestStallAction");
        $this->gamestate->nextState("trBuild");
    }

    function actBuild(string $stack_card_ids) {
        $this->checkAction("actBuild");
        $stack_card_ids = $this->numberListToArray($stack_card_ids);

        //Get information about the stack cards
        $player_id = $this->getActivePlayerId();
        $stack_cards = $this->cards->getCardsFromLocation($stack_card_ids, HAND.$player_id);
        $total_value = 0;
        foreach ($stack_cards as $card) {
            $value = $this->getValue($card);
            $total_value += $value;
        }

        //Check if the animalfolk sets are correct
        $multiple_sets_used = false;
        $junk_used = false;
        $set = null;
        $contains_stashingvendor = false;
        $contains_emptychest = false;
        foreach ($stack_cards as $card) {
            $type = $this->getTypeId($card);
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
            switch($type) {
                case CT_STASHINGVENDOR:
                    $contains_stashingvendor = true;
                    break;
                case CT_EMPTYCHEST:
                    $contains_emptychest = true;
                    break;
            }
        }
        if ($junk_used && !$contains_stashingvendor) {
            throw new BgaUserException("Junk cards cannot be included in a stack");
        }
        if ($multiple_sets_used && !$contains_emptychest) {
            throw new BgaUserException("Cards in the stack must be of the same animalfolk set");
        }

        //Check if the value is correct
        $stack_index = $this->cards->getNextStackIndex($player_id);
        if ($total_value != $stack_index + 1) {
            //TODO: Squirrelzzz
            throw new BgaUserException($this->_("Stack value is incorrect")." ($total_value)");
        }

        //Move the cards into the stall
        for ($i=0; $i < count($stack_card_ids); $i++) {
            $pos = $stack_index * MAX_STACK_SIZE + $i;
            $this->cards->moveCard($stack_card_ids[$i], STALL.$player_id, $pos);
        }

        //Update the player score
        $stack_index_plus_1 = $stack_index + 1;
        $sql = "UPDATE player SET player_score=$stack_index_plus_1 WHERE player_id='$player_id'";
        $this->DbQuery($sql);

        //Notify players
        $this->notifyAllPlayers('buildStack', clienttranslate('${player_name} builds stack ${stack_index_plus_1}'), array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "stack_index_plus_1" => $stack_index_plus_1,
            "stack_index" => $stack_index,
            "cards" => $stack_cards
        ));

        //End turn
        //TODO: alternative win conditions: charm and winter is coming
        if ($stack_index_plus_1 >= MAX_STACKS) { //+1, because stack indices are 0-indexed
            $this->gamestate->nextState("trGameEnd");
        }
        else {
            $this->gamestate->nextState("trNextPlayer");
        }
    }

    function actRequestInventoryAction() {
        $this->checkAction("actRequestInventoryAction");
        $this->gamestate->nextState("trInventory");
    }

    function actInventoryAction(string $card_ids) {
        $this->checkAction("actInventoryAction");
        $card_ids = $this->numberListToArray($card_ids);
        $player_id = self::getCurrentPlayerId();

        //verify that these cards are actually in the player's hand
        $cards = $this->cards->getCardsFromLocation($card_ids, HAND.$player_id);

        //move the cards to the discard pile (ordering matters)
        $this->cards->moveCardsOnTop($card_ids, DISCARD.$player_id);

        //notify all players
        $this->notifyAllPlayers('discard', clienttranslate('${player_name} discards ${nbr} cards'), array (
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'card_ids' => $card_ids,
            'cards' => $cards,
            'nbr' => count($card_ids)
        ));
        
        
        $this->gamestate->nextState("trNextPlayer");
    }

    /*
    
    Example:

    function playCard( $card_id )
    {
        // Check that this is the player's turn and that it is a "possible action" at this game state (see states.inc.php)
        $this->checkAction( 'playCard' ); 
        
        $player_id = $this->getActivePlayerId();
        
        // Add your game logic to play a card there 
        ...
        
        // Notify all players about the card played
        $this->notifyAllPlayers( "cardPlayed", clienttranslate( '${player_name} plays ${card_name}' ), array(
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'card_name' => $card_name,
            'card_id' => $card_id
        ) );
          
    }
    
    */

    
//////////////////////////////////////////////////////////////////////////////
//////////// Game state arguments
////////////

    /*
        Here, you can create methods defined as "game state arguments" (see "args" property in states.inc.php).
        These methods function is to return some additional information that is specific to the current
        game state.
    */

    function argSelectedCardInMarket(){
        $card_id = $this->getGameStateValue('selectedCard');
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
        return array(
            'stack_index_plus_1' => $this->cards->getNextStackIndex($player_id) + 1
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

    function stNextPlayer() {
        //aka the "clean-up phase"

        //1. fill your hand to the maximum hand size
        $player_id = $this->getActivePlayerId();
        $hand_size = $this->cards->countCardsInLocation(HAND.$player_id);
        $maximum_hand_size = 5;
        $nbr = max(0, $maximum_hand_size - $hand_size);
        if ($nbr > 0) {
            //draw cards from deck
            $cards = $this->cards->pickCardsForLocation($nbr, DECK.$player_id, HAND.$player_id);
            $nbr_from_deck = count($cards);
            $this->notifyAllPlayersWithPrivateArguments('draw', clienttranslate('${player_name} draws ${nbr} cards to refill their hand'), array(
                "player_id" => $player_id,
                "player_name" => $this->getPlayerNameById($player_id),
                "nbr" => $nbr_from_deck,
                "_private" => array(
                    "cards" => $cards
                )
            ));

            //draw cards from junk reserve
            $nbr_junk_cards = $nbr - $nbr_from_deck;
            if ($nbr_junk_cards > 0) {
                $junk_cards = $this->cards->getJunk($nbr_junk_cards);
                $junk_ids = array_keys($junk_cards);
                $this->cards->moveCards($junk_ids, HAND.$player_id);
                $this->notifyAllPlayers('obtainNewJunkInHand', clienttranslate('${player_name} ran out of cards and obtains ${nbr} junk cards'), array(
                    "player_id" => $player_id,
                    "player_name" => $this->getPlayerNameById($player_id),
                    "cards" => $junk_cards,
                    "nbr" => count($junk_cards),
                ));
            }
        }

        //2. fill empty market slots
        $this->refillMarket(true);

        //activate the next player
        $next_player_id = $this->activeNextPlayer();
        $this->giveExtraTime($next_player_id);
        $this->gamestate->nextState("trNextPlayer");
    }
    
    /*
    
    Example for game state "MyGameState":

    function stMyGameState()
    {
        // Do some stuff ...
        
        // (very often) go to another gamestate
        $this->gamestate->nextState( 'some_gamestate_transition' );
    }    
    */

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
