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

    function quick($n) {
        $player_id = self::getCurrentPlayerId();
        $this->cards->pickCardForLocation('hand'.$player_id, 'deck'.MARKET);
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
        
        // Init game statistics
        // (note: statistics used in this file must be defined in your stats.inc.php file)
        //$this->initStat( 'table', 'table_teststat1', 0 );    // Init a table statistics
        //$this->initStat( 'player', 'player_teststat1', 0 );  // Init a player statistics (for all players)

        // TODO: setup the initial game situation here
       
        //Create the market deck
        $cards = array();
        foreach ($this->card_types as $type_id => $card_type) {
            // TODO: #animalfolk_sets = #players + 1
            $cards[] = array ('type' => 'UNUSED','type_arg' => $type_id, 'nbr' => $card_type['nbr']);
        }
        $this->cards->createCards($cards, 'deck'.MARKET, );
        $this->cards->shuffle('deck'.MARKET);

        // // Todo: should be handled by a setup game state

        // $players = $this->loadPlayersBasicInfos();
        // foreach ( $players as $player_id => $player ) {
            
        //     // Notify player about his cards
        //     $this->notifyPlayer($player_id, 'newHand', '', array ('cards' => $cards ));
        // }

        // $cards = $this->cards->pickCards(3, 'deck'.MARKET, $player_id);

        // //TODOOOOOOOOO

        // $this->cards->moveCards('deck'.MARKET, 'hand'.$player_id);

        // //$this->pickCardForLocation($from_location, $to_location, $location_arg=0 );

        // //$this->deckMove('')

        $this->cards->moveCard(16, 'market', 0);
        $this->cards->moveCard(17, 'market', 1);
        $this->cards->moveCard(18, 'market', 2);
        $this->cards->moveCard(19, 'market', 3);
        $this->cards->moveCard(20, 'market', 4);




        $i = 0;
        foreach( $players as $player_id => $player )
        {
            $this->cards->moveCard(27+$i, 'hand'.$player_id);
            $this->cards->moveCard(28+$i, 'hand'.$player_id);
            $this->cards->moveCard(29+$i, 'hand'.$player_id);
            $i += 3;
        }


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
    
        $current_player_id = $this->getCurrentPlayerId();    // !! We must only return informations visible by this player !!
    
        // Get information about players
        // Note: you can retrieve some extra field you added for "player" table in "dbmodel.sql" if you need it.
        $sql = "SELECT player_id id, player_score score FROM player ";
        $result['players'] = $this->getCollectionFromDb( $sql );

        $result['marketDeckSize'] = $this->cards->countCardInLocation('deck'.MARKET); //count the cards in market deck, but don't send them (that information is hidden)
        $result['marketDiscard'] = $this->cards->getCardsInLocation('disc'.MARKET);

        $result['market'] = $this->cards->getCardsInLocation( 'market');
        $result['hand'] = $this->cards->getCardsInLocation('hand'.$current_player_id);
        
        $result['cardTypes'] = $this->card_types;

        //TODO: player decks, discards and hands

        //TODO: stacks and stalls
  
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
        // TODO: compute and return the game progression

        return 0;
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

    /*
        In this space, you can put any utility methods useful for your game logic
    */

    function numberListToArray($AT_numberlist){
        if( $AT_numberlist == '' )
            return array();
        if( substr( $AT_numberlist, -1 ) == ';' )
            $AT_numberlist = substr( $AT_numberlist, 0, -1 );
        return explode( ';', $AT_numberlist );
    }

    /**
     * Callback method for when cards need to be drawn from a location, but the location is empty.
     * This method is expected to increase in number of cards at the specified location.
     * @param location location in the deck that needs to be supplied with cards.
     */
    function onLocationExhausted($location) {
        $prefix = substr($location, 0, 4);
        if ($prefix == "deck") {
            $player_id = substr($location, 4);
            $discard_pile = "disc".$player_id;
            $this->cards->moveAllCardsInLocation($discard_pile, $location);
            $this->cards->shuffle($location);
        }
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Debug functions
////////////    

    /*
        In this space, you can put debugging tools
    */

    function d($arg) {
        //debugClient
        $this->notifyAllPlayers('debugClient', clienttranslate('Debugging (arg = ${arg})...'), array('arg' => $arg));
    }

    function reshuffleMarketDeck() {
        $this->notifyAllPlayers('reshuffleMarketDeck', clienttranslate('Shuffling the market discard pile to form a new market deck.'), array());
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Player actions
//////////// 

    /*
        Each time a player is doing some game action, one of the methods below is called.
        (note: each method below must match an input method in dale.action.php)
    */

    function actRequestInventoryAction() {
        $this->checkAction("actRequestInventoryAction");
        $this->gamestate->nextState("trInventory");
    }

    function actInventoryAction($card_ids) {
        $this->checkAction("actInventoryAction");
        $card_ids = $this->numberListToArray($card_ids);
        $player_id = self::getCurrentPlayerId();

        //verify that these cards are actually in the player's hand
        $cards = $this->cards->getCardsFromLocation($card_ids, 'hand'.$player_id);

        //move the cards to the discard pile (ordering matters)
        foreach ($card_ids as $card_id) {
            $this->cards->insertCardOnExtremePosition($card_id, "disc".$player_id, true);
        }


        //notify all players
        $this->notifyAllPlayers('discardCards', clienttranslate('${player_name} discards ${nbr} cards'), array (
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
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
