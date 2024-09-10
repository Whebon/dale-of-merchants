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


require_once "modules/DaleEffects.php";
require_once "modules/DaleDeckSelection.php";

class Dale extends DaleTableBasic
{
    var DaleDeckSelection $deckSelection;
    var DaleDeck $cards;
    var DaleEffects $effects;
    var $chameleon_targets_cache = array();
    var bool $inactUsePassiveAbility;

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
            "inDeckSelection" => 10,
            "resolvingCard" => 11,
            "isPostCleanUpPhase" => 12,
            "opponent_id" => 13,
            "card_id" => 14,
            "changeActivePlayer_player_id" => 15,
            "changeActivePlayer_state_id" => 16
        ) );

        $this->effects = new DaleEffects($this);
        $this->cards = new DaleDeck($this, $this->effects, "onLocationExhausted");
        $this->cards->init("card");
        $this->deckSelection = new DaleDeckSelection($this);
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
        $sql = "INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar, player_coins) VALUES ";
        $values = array();
        foreach( $players as $player_id => $player )
        {
            $color = array_shift( $default_colors );
            $values[] = "('".$player_id."','$color','".$player['player_canal']."','".addslashes( $player['player_name'] )."','".addslashes( $player['player_avatar'] )."',0)";
        }
        $sql .= implode( ',', $values );
        $this->DbQuery( $sql );
        $this->reattributeColorsBasedOnPreferences( $players, $gameinfos['player_colors'] );
        $this->reloadPlayersBasicInfos();
        
        /************ Start the game initialization *****/

        // Init global values with their initial values
        $this->setGameStateInitialValue("resolvingCard", -1);
        $this->setGameStateInitialValue("inDeckSelection", 1);
        $this->setGameStateInitialValue("isPostCleanUpPhase", 0);
        $this->setGameStateInitialValue("opponent_id", -1);
        $this->setGameStateInitialValue("card_id", -1);
        $this->setGameStateInitialValue("changeActivePlayer_player_id", -1);
        $this->setGameStateInitialValue("changeActivePlayer_state_id", -1);
        
        // Init game statistics
        $this->initStat("player", "number_of_turns", 0);
        $this->initStat("player", "actions_purchase", 0);
        $this->initStat("player", "actions_technique", 0);
        $this->initStat("player", "actions_build", 0);
        $this->initStat("player", "actions_inventory", 0);
        $this->initStat("player", "cards_remaining", 0);

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
        if (strlen(MARKET) != 4 || strlen(DECK) != 4 || strlen(DISCARD) != 4 || strlen(HAND) != 4 || strlen(STALL) != 4 || strlen(JUNKRESERVE) != 4 || strlen(SCHEDULE) != 4 || strlen(LIMBO) != 4) {
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
        $result['limbo'] = $this->cards->getCardsInLocation(LIMBO.$current_player_id);
        $result['cardTypes'] = $this->card_types;
        $result['effects'] = $this->effects->loadFromDb();
        $result['inDeckSelection'] = $this->getGameStateValue("inDeckSelection") == '1';
  
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
     * transition to the next state and make `$player_id` the active player
     */
    function nextStateChangeActivePlayer(string $transition, int $player_id) {
        if (!array_key_exists($transition, $this->gamestate->states[29]['transitions'])) {
            throw new BgaVisibleSystemException("'$transition' is not a valid transition in 'changeActivePlayer'");
        }
        $state_id = $this->gamestate->states[29]['transitions'][$transition];
        $this->setGameStateValue("changeActivePlayer_player_id", $player_id);
        $this->setGameStateValue("changeActivePlayer_state_id", $state_id);
        $this->gamestate->nextState("trChangeActivePlayer");
    }

    /**
     * Delay client notifications by 500ms multiple times
     */
    function delay500ms(int $times = 1) {
        for ($i = 0; $i < $times; $i++) { 
            $this->notifyAllPlayers('delay', '', array());
        }
    }

    /**
     * Return the unique `opponent_id`. (only available in a 2-player game)
     */
    function getUniqueOpponentId() {
        $player_id = $this->getActivePlayerId();
        $players = $this->loadPlayersBasicInfos();
        if (count($players) != 2) {
            throw new BgaVisibleSystemException("getUniqueOpponentId is not defined for non-2-player games");
        }
        foreach ($players as $opponent_id => $opponent) {
            if ($opponent_id != $player_id) {
                return $opponent_id;
            }
        }
    }

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
     * Send a notification to all players, but only player args["player_id"] and args["opponent_id"] receive args["_private"]
     * @param string $type
     * @param string $message
     * @param array $args requires at least "player_id" and "_private" keys
     * @param string $private_message (optional) bt default, send the public message - if provided, send a special private message
     */
    function notifyAllPlayersWithPrivateArguments(string $type, string $message, array $args, string $private_message = null) {
        $suffix = ""; //clienttranslate(" (private information)");

        //the active player receives the notification with the private arguments
        $private_player_id = $args["player_id"];
        $this->notifyPlayer($private_player_id, $type, $private_message ? $private_message.$suffix : $message, array_merge($args, $args["_private"]));

        //(optional) the involved opponent also receives the notification with the private arguments
        $private_opponent_id = isset($args["opponent_id"]) ? $args["opponent_id"] : null;
        if ($private_opponent_id) {
            $private_opponent_id = $args["opponent_id"];
            $this->notifyPlayer($private_opponent_id, $type, $private_message ? $private_message.$suffix : $message, array_merge($args, $args["_private"]));
        }

        //all players receive the notification without the private arguments. (the player and opponent will ignore this on the client-side)
        unset($args["_private"]);
        $this->notifyAllPlayers($type, $message, $args);
    }

    /**
     * Place multiple cards on top of a player's deck
     * @param int $deck_player_id player that will receive the cards on top of the deck or `MARKET`
     * @param string $msg notification message for all players
     * @param array $card_ids cards_ids to be placed on top in that order
     * @param array $cards array with exactly the same keys as $card_ids
     * @param array $unordered_cards (optional) - if provided, first place this collection of unordered cards on top of the deck
     * @param bool $from_limbo (optional) - default false. If `false`, place from hand. If `true`, place from limbo.
     */
    function placeOnDeckMultiple(mixed $deck_player_id, string $msg, array $card_ids, array $cards, array $unordered_cards = null, bool $from_limbo = false) {
        //1: move the unordered cards on top of the deck (no message)
        $nbr_unordered_cards = 0;
        if ($unordered_cards) {
            $nbr_unordered_cards = count($unordered_cards);
            $unordered_card_ids = array_keys($unordered_cards);
            $this->cards->moveCardsOnTop($unordered_card_ids, DECK.$deck_player_id);
            $this->notifyAllPlayersWithPrivateArguments('placeOnDeckMultiple', '', array (
                'player_id' => $this->getActivePlayerId(),
                'player_name' => $this->getActivePlayerName(),
                "_private" => array(
                    'card_ids' => $unordered_card_ids,
                    'cards' => $unordered_cards,
                ),
                'deck_player_id' => $deck_player_id,
                'nbr' => $nbr_unordered_cards,
                'from_limbo' => $from_limbo
            ));
        }
        
        //2: move the ordered cards on top of the deck
        if ($cards) {
            $this->cards->moveCardsOnTop($card_ids, DECK.$deck_player_id);
            $this->notifyAllPlayersWithPrivateArguments('placeOnDeckMultiple', '', array (
                'player_id' => $this->getActivePlayerId(),
                'player_name' => $this->getActivePlayerName(),
                "_private" => array(
                    'card_ids' => $card_ids,
                    'cards' => $cards,
                ),
                'deck_player_id' => $deck_player_id,
                'nbr' => count($cards),
                'from_limbo' => $from_limbo
            ));
        }

        //only send a single message to the players
        $this->notifyAllPlayers('message', $msg, array (
            'player_id' => $this->getActivePlayerId(),
            'player_name' => $this->getActivePlayerName(),
            'opponent_name' => $this->getPlayerNameById($deck_player_id),
            'nbr' => count($cards) + $nbr_unordered_cards,
        ));
    }

    /**
     * Draw $nbr cards from your deck and place them into your hand.
     * @param string $msg notification message for all players
     * @param int $nbr (optional) default 1. number of cards to draw from the specified player's draw pile
     * @param bool $to_limbo (optional) default false. If true, the cards are placed in limbo. If false, the cards are placed in hand.
     * @param string $from_player_id (optional) default active player. If provided, draw cards from this player's deck instead. May also be MARKET.
     * @param string $to_player_id (optional) default active player. If provided, draw cards for this player instead.
     * @return int how much cards were actually drawn (`<= $nbr`)
     */
    function draw(string $msg, int $nbr = 1, bool $to_limbo = false, string $from_player_id = null, string $to_player_id = null) {
        if ($from_player_id == null) {
            $from_player_id = $this->getActivePlayerId();
        }
        if ($to_player_id == null) {
            $to_player_id = $this->getActivePlayerId();
        }
        $to_location = $to_limbo ? LIMBO.$to_player_id : HAND.$to_player_id;
        if ($nbr == 1) {
            $card = $this->cards->pickCardForLocation(DECK.$from_player_id, $to_location);
            if ($card) {
                $this->notifyAllPlayersWithPrivateArguments('draw', $msg, array(
                    "player_id" => $to_player_id,
                    "player_name" => $this->getPlayerNameById($to_player_id),
                    "opponent_name" => ($from_player_id == MARKET) ? MARKET : $this->getPlayerNameById($from_player_id),
                    "nbr" => 1,
                    "_private" => array(
                        "card" => $card
                    ),
                    "deck_player_id" => $from_player_id,
                    "to_limbo" => $to_limbo
                ));
                return 1;
            }
            return 0;
        }
        else {
            $cards = $this->cards->pickCardsForLocation($nbr, DECK.$from_player_id, $to_location);
            $actual_nbr = count($cards);
            if ($actual_nbr > 0)
            $this->notifyAllPlayersWithPrivateArguments('drawMultiple', $msg, array(
                "player_id" => $to_player_id,
                "player_name" => $this->getPlayerNameById($to_player_id),
                "opponent_name" => ($from_player_id == MARKET) ? MARKET : $this->getPlayerNameById($from_player_id),
                "nbr" => $actual_nbr,
                "_private" => array(
                    "cards" => $cards
                ),
                "deck_player_id" => $from_player_id,
                "to_limbo" => $to_limbo
            ));
            return $actual_nbr;
        }
    }

    /**
     * Draw a specific card from your deck and place it into your hand. Then, shuffle the deck
     * @param string $msg notification message for all players
     * @param int $card_id the card to draw from the specified player's draw pile
     * @param bool $to_limbo (optional) default false. If true, the cards are placed in limbo. If false, the cards are placed in hand.
     * @param string $from_player_id (optional) default active player. If provided, draw cards from this player's deck instead. May also be MARKET.
     * @param string $to_player_id (optional) default active player. If provided, draw cards for this player instead.
     */
    function drawCardId(string $msg, int $card_id, bool $to_limbo = false, string $from_player_id = null, string $to_player_id = null) {
        if ($from_player_id == null) {
            $from_player_id = $this->getActivePlayerId();
        }
        if ($to_player_id == null) {
            $to_player_id = $this->getActivePlayerId();
        }
        $card = $this->cards->getCardFromLocation($card_id, DECK.$from_player_id);
        $this->cards->moveCard($card_id, HAND.$to_player_id);
        $this->notifyAllPlayersWithPrivateArguments('draw', $msg, array(
            "player_id" => $to_player_id,
            "player_name" => $this->getPlayerNameById($to_player_id),
            "opponent_name" => ($from_player_id == MARKET) ? MARKET : $this->getPlayerNameById($from_player_id),
            "nbr" => 1,
            "_private" => array(
                "card" => $card
            ),
            "deck_player_id" => $from_player_id,
            "to_limbo" => $to_limbo
        ));
        $this->cards->shuffle(DECK.$from_player_id);
    }

    /**
     * Ditch a single specified card from the hand of the active player
     * @param string $msg notification message for all players
     * @param array $dbcard card that needs to be ditched
     * @param bool $from_limbo (optional) - default false. If `false`, ditch from hand. If `true`, ditch from limbo.
     * @param array $msg_args (optional) - additional args to display in the `$msg`
     */
    function ditch(string $msg, array $dbcard, bool $from_limbo = false, $msg_args = array()) {
        $player_id = $this->getActivePlayerId();
        $destination = $this->isJunk($dbcard) ? JUNKRESERVE : DISCARD.MARKET;
        $this->cards->moveCardOnTop($dbcard["id"], $destination);
        $this->notifyAllPlayers('ditch', $msg, array_merge(array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "card_name" => $this->getCardName($dbcard),
            "card" => $dbcard,
            "from_limbo" => $from_limbo
        ), $msg_args));
    }

    /**
     * Ditch multiple cards from the hand of the active player (only sends 1 notification for all ditched cards)
     * @param string $msg notification message for all players
     * @param array $dbcards cards that need to be ditched
     * @param bool $from_limbo (optional) - default false. If `false`, ditch from hand. If `true`, ditch from limbo.
     * @param array $ordered_card_ids (optional) - if provided, ditch these cards last
     */
    function ditchMultiple(string $msg, array $dbcards, bool $from_limbo = false, mixed $ordered_card_ids = array()) {
        $player_id = $this->getActivePlayerId();
        $this->notifyAllPlayers('message', $msg, array (
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'nbr' => count($dbcards)
        ));
        //ditch the unordered cards
        foreach ($dbcards as $dbcard) {
            if (!in_array($dbcard["id"], $ordered_card_ids)) {
                $this->ditch('', $dbcard, $from_limbo);
            }
        }
        //ditch the ordered cards
        foreach ($ordered_card_ids as $ordered_card_id) {
            foreach ($dbcards as $dbcard) {
                if ($dbcard["id"] == $ordered_card_id) {
                    $this->ditch('', $dbcard, $from_limbo);
                    break;
                }
            }
        }
    }

    /**
     * The active player ditches a card from their discard pile and notifies all players
     * @param string $msg notification message
     * @param int $card_id the id of a card in the discard pile to ditch
     * @param array $msg_args
     */
    function ditchFromDiscard(string $msg, int $card_id, array $msg_args = array()) {
        //1. remove the card from the discard pile
        $player_id = $this->getActivePlayerId();
        $dbcards = $this->cards->removeCardsFromPile(array($card_id), DISCARD.$player_id);
        if (count($dbcards) != 1) {
            throw new BgaVisibleSystemException("'ditchFromDiscard' could not find unique card_id $card_id");
        }
        $dbcard = $dbcards[0];

        //2. ditch it
        $destination = $this->isJunk($dbcard) ? JUNKRESERVE : DISCARD.MARKET;
        $this->cards->moveCardOnTop($dbcard["id"], $destination);
        $this->notifyAllPlayers('ditchFromDiscard', $msg, array_merge(array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "card_name" => $this->getCardName($dbcard),
            "card" => $dbcard
        ), $msg_args));
    }

    /**
     * Discard multiple cards for a player in the given order
     * @param string $msg notification message for all players
     * @param int $player_id player that will discard the cards from hand
     * @param array $card_ids cards_ids to be discarded in that order
     * @param array $cards array with exactly the same keys as $card_ids
     * @param array $unordered_cards (optional) - if provided, first discard this collection of unordered cards
     * @param bool $from_limbo (optional) - default false. If `false`, discard from hand. If `true`, discard from limbo.
     */
    function discardMultiple(string $msg, int $player_id, array $card_ids, array $cards, array $unordered_cards = null, bool $from_limbo = false) {
        //1: move the unordered cards to the discard pile (no message)
        $nbr_unordered_cards = 0;
        if ($unordered_cards) {
            $nbr_unordered_cards = count($unordered_cards);
            $unordered_card_ids = array_keys($unordered_cards);
            $this->cards->moveCardsOnTop($unordered_card_ids, DISCARD.$player_id);
            $this->notifyAllPlayers('discardMultiple', '', array (
                'player_id' => $player_id,
                'player_name' => $this->getActivePlayerName(),
                'card_ids' => $unordered_card_ids,
                'cards' => $unordered_cards,
                'nbr' => $nbr_unordered_cards,
                'from_limbo' => $from_limbo
            ));
        }
        
        //2: move the ordered cards to the discard pile
        if ($cards) {
            $this->cards->moveCardsOnTop($card_ids, DISCARD.$player_id);
            $this->notifyAllPlayers('discardMultiple', '', array (
                'player_id' => $player_id,
                'player_name' => $this->getActivePlayerName(),
                'card_ids' => $card_ids,
                'cards' => $cards,
                'nbr' => count($cards),
                'from_limbo' => $from_limbo
            ));
        }

        //only leave a single log message to the players
        $this->notifyAllPlayers('message', $msg, array (
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'nbr' => count($cards) + $nbr_unordered_cards,
        ));
    }

    /**
     * The active player ditches a card from the market deck and notifies all players
     * @param string $msg notification message
     */
    function ditchFromMarketDeck(string $msg) {
        $dbcard = $this->cards->pickCardForLocation(DECK.MARKET, 'unstable');
        if ($dbcard) {
            $this->cards->moveCardOnTop($dbcard["id"], DISCARD.MARKET);
            $this->notifyAllPlayers('ditchFromMarketDeck', $msg, array (
                'player_name' => $this->getActivePlayerName(),
                'card' => $dbcard
            ));
        }
        return $dbcard;
    }

    /**
     * The active player ditches multiple cards from the market board
     * @param string $msg notification message for all players
     * @param array $card_ids cards_ids to be thrown away in that order
     * @param array $cards array with exactly the same keys as $card_ids
     * @param array $unordered_cards (optional) - if provided, first ditch these cards
     */
    function ditchFromMarketBoard(string $msg, array $card_ids, array $cards, array $unordered_cards = null) {
        //1: move the unordered cards to the market discard pile (no message)
        $nbr_unordered_cards = 0;
        if ($unordered_cards) {
            $nbr_unordered_cards = count($unordered_cards);
            $unordered_card_ids = array_keys($unordered_cards);
            $this->cards->moveCardsOnTop($unordered_card_ids, DISCARD.MARKET);
            $this->notifyAllPlayers('ditchFromMarketBoard', $cards ? '' : $msg, array (
                'player_name' => $this->getActivePlayerName(),
                'card_ids' => $unordered_card_ids,
                'cards' => $unordered_cards,
                'nbr' => $nbr_unordered_cards,
            ));
        }
        
        //2: move the ordered cards to the market discard pile 
        if ($cards) {
            $this->cards->moveCardsOnTop($card_ids, DISCARD.MARKET);
            $this->notifyAllPlayers('ditchFromMarketBoard', $msg, array (
                'player_name' => $this->getActivePlayerName(),
                'card_ids' => $card_ids,
                'cards' => $cards,
                'nbr' => count($cards) + $nbr_unordered_cards,
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
                $this->cards->expireChameleonTargetInDiscard($discard_pile);
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
     * @return `true` if any cards were drawn
    */
    function refillHand() {
        $player_id = $this->getActivePlayerId();
        $hand_cards = $this->cards->getCardsInLocation(HAND.$player_id);
        $maximum_hand_size = $this->getMaximumHandSize($player_id, $hand_cards);
        $new_hand_cards = array();
        $hand_size_before = count($hand_cards);
        while (true) {
            //draw cards from deck
            $nbr = $maximum_hand_size - count($hand_cards);
            if ($nbr > 0) {
                $cards = $this->cards->pickCardsForLocation($nbr, DECK.$player_id, HAND.$player_id);
                $new_hand_cards = array_merge($new_hand_cards, $cards);
                $hand_cards = array_merge($hand_cards, $cards);
            }

            //autobind chameleons to cookies
            foreach ($hand_cards as $hand_card) {
                $type_id = $this->getTypeId($hand_card);
                if ($this->isChameleonTypeId($type_id)) {
                    $target_ids = $this->getChameleonTargets($hand_card["id"], $type_id);
                    $targets = $this->cards->getCards($target_ids);
                    $onlyCookies = count($targets) > 0;
                    foreach ($targets as $target) {
                        if ($this->getTypeId($target) != CT_COOKIES) {
                            $onlyCookies = false;
                            break;
                        }
                    }
                    if ($onlyCookies) {
                        if ($this->getTypeId(current($targets)) == CT_COOKIES) {
                            $this->effects->insertModification($hand_card["id"], $type_id, CT_COOKIES, current($target_ids));
                            $this->notifyAllPlayers('message', clienttranslate('${player_name}\'s ${chameleon_card_name} automatically copies Cookies'), array(
                                'chameleon_card_name' => $this->card_types[$type_id]['name'],
                                'player_name' => $this->getActivePlayerName()
                            ));
                        }
                    }
                }
            }
            
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
        if (count($new_hand_cards) > 0) {
            $this->notifyAllPlayersWithPrivateArguments('drawMultiple', clienttranslate('${player_name} draws ${nbr} cards to refill their hand'), array(
                "player_id" => $player_id,
                "player_name" => $this->getPlayerNameById($player_id),
                "nbr" => count($new_hand_cards),
                "_private" => array(
                    "cards" => $new_hand_cards
                )
            ));
        }

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

        //return true if any cards were drawn
        return ($hand_size_before < $maximum_hand_size);
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
     * @return bool indicating if the given `type_id` is one of the 5 chameleon type ids
     */
    function isChameleonTypeId(int $type_id) {
        return (
            $type_id == CT_FLEXIBLESHOPKEEPER ||
            $type_id == CT_REFLECTION ||
            $type_id == CT_GOODOLDTIMES ||
            $type_id == CT_TRENDSETTING ||
            $type_id == CT_SEEINGDOUBLES
        );
    }

    /**
     * @param array $dbcards array of dbcards to scan
     * @param string $card_type effective card type to look for
     * @return ?array first `dbcard` with the desired type id. returns `null` if none was found.
     */
    function getCardWithTypeId(array $dbcards, int $card_type): ?array {
        foreach ($dbcards as $dbcard) {
            if ($this->getTypeId($dbcard) == $card_type) {
                return $dbcard;
            }
        }
        return null;
    }

    /**
     * @param array $dbcards array of dbcards to scan
     * @param string $card_type effective card type to look for
     * @return bool true if the card_type was found
     */
    function containsTypeId(array $dbcards, int $card_type): bool {
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
     * Returns the effective animalfolk of a dbcard. 0 represents rubbish/junk.
     * @param array $dbcard dbcard object
    */
    function getAnimalfolk(array $dbcard): int {
        $type_id = $this->getTypeId($dbcard);
        return $this->card_types[$type_id]['animalfolk_id'];
    }

    /**
     * Converts an animalfolk id into its displayed name
     */
    function getAnimalfolkDisplayedName(int $animalfolk_id): string {
        foreach ($this->card_types as $card_type) {
            if ($card_type['animalfolk_id'] == $animalfolk_id) {
                return $card_type['animalfolk_displayed'];
            }
        }
        return "MISSING ANIMALFOLK NAME";
    }

    /**
     * Returns the effective card type of a dbcard. "effective" suggests the chameleons might have modified the type_id.
     * @param array $dbcard dbcard object
    */
    function getTypeId(array $dbcard): string {
        return $this->effects->getTypeId($dbcard);
        // $type_id = $dbcard['type_arg'];
        // $is_bindable = $type_id == CT_FLEXIBLESHOPKEEPER || 
        //                 $type_id == CT_REFLECTION ||  
        //                 $type_id == CT_GOODOLDTIMES || 
        //                 $type_id == CT_TRENDSETTING || 
        //                 $type_id == CT_SEEINGDOUBLES;
        // if ($is_bindable) {
        //     $target = $this->effects->getTarget($dbcard["id"], $type_id);
        //     if ($target == CT_GOODOLDTIMES) {
        //         $good_old_times_target = $this->effects->getTarget($dbcard["id"], CT_GOODOLDTIMES);
        //         if ($good_old_times_target != null && $good_old_times_target != -1) {
        //             $target = $good_old_times_target;
        //         }
        //     }
        //     if ($target != null && $target != -1) {
        //         return $target;
        //     }
        // }
        // return $type_id;
    }

    /**
     * Returns the effective cost of a given dbcard. Asserts that the card is at the market.
     * @param array $dbcard card to calculate the cost of
    */
    function getCost(array $dbcard) {
        //TODO: scary gunfight
        $type_id = $this->getTypeId($dbcard);
        $base_cost = $this->card_types[$type_id]['value'];
        $additional_cost = $dbcard['location'] == MARKET ? $dbcard['location_arg'] : 0;
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
        return $this->effects->getValue($dbcard);
        // $type_id = $this->getTypeId($dbcard);
        // $flashy_show = $this->effects->countEffectsOfTypeId(CT_FLASHYSHOW);
        // return $this->card_types[$type_id]['value'] + $flashy_show;
    }

    /**
     * @return array array of all modified base values
     * @example example no effects: `[1, 2, 3, 4, 5]`
     * @example example flashy show: `[2, 3, 4, 5, 6]`
     */
    function getBaseEffectiveValues() {
        $values = [];
        for ($i=0; $i < 5; $i++) { 
            $fakedbcard = array(
                "id" => 0,
                "type_arg" => CT_SWIFTBROKER + $i
            );
            $values[] = $this->effects->getValue($fakedbcard);
        }
        return $values;
    }

    /**
     * @return array array of all modified base values, appended with any possible effective values out of the base value range
     * @example example no effects: `[1, 2, 3, 4, 5]`
     * @example example flashy show: `[2, 3, 4, 5, 6]`
     * @example example rare artefact 3 on a 5-valued card: `[1, 2, 3, 4, 5, 15]`
     * @example example [rare artefact 3 on a 5-valued card] -> [flashy show]: `[2, 3, 4, 5, 6, 16]`
     * @example example [flashy show] -> [rare artefact 3 on a 6-valued card]: `[2, 3, 4, 5, 6, 20]`
     */
    function getPossibleEffectiveValues(): array {
        $values = $this->getBaseEffectiveValues();
        $modified_card_ids = $this->effects->getModifiedCardIds();
        $modified_cards = $this->cards->getCards($modified_card_ids);
        foreach ($modified_cards as $modified_card) {
            $modified_value = $this->effects->getValue($modified_card);
            if (!in_array($modified_value, $values)) {
                $values[] = $modified_value;
            }
        }
        return $values;
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
     * Returns true iff the original card is a junk card
     */
    function isJunk(array $dbcard): bool {
        $type_id = intval($dbcard["type_arg"]);
        return ($type_id >= 1) && ($type_id <= 5);
    }

        
    /**
     * Returns true iff the original card is an animalfolk card
     * @param array $dbcard dbcard object
    */
    function isAnimalfolk(array $dbcard): int {
        return $this->card_types[$dbcard["type_arg"]]['animalfolk_id'] != 0;
    }


//////////////////////////////////////////////////////////////////////////////
//////////// Dice functions
////////////  

    /*
        Here I place all function related to rolling dice
    */

    /**
     * Roll the die of the given `animalfolk_id`
     * @param string $msg log message to display
     * @param int $animalfolk_id die type
     * @param array $dbcard the card to land the die on (for the client)
     * @param array $msg_args (optional) additional args
     * @return int result of the die roll
     */
    function rollDie(string $msg, int $animalfolk_id, array $dbcard, array $msg_args = array()) {
        $d6 = rand(0, 5);
        $die_value = null;
        $die_label = null;
        $die_icon = null;
        $player_id = $this->getActivePlayerId();
        switch($animalfolk_id) {
            case ANIMALFOLK_OCELOTS:
                switch($d6) {
                    case 0:
                        $die_value = 0;
                        $die_label = '0';
                        $die_icon = DIE_OCELOT_0;
                        break;
                    case 1:
                    case 2:
                        $die_value = 1;
                        $die_label = '1';
                        $die_icon = DIE_OCELOT_1;
                        break;
                    case 3:
                    case 4:
                        $die_value = 2;
                        $die_label = '2';
                        $die_icon = DIE_OCELOT_2;
                        break;
                    case 5:
                        $die_value = 3;
                        $die_label = '3';
                        $die_icon = DIE_OCELOT_3;
                        break;
                }
                break;
            case ANIMALFOLK_POLECATS:
                switch($d6) {
                    case 0:
                    case 1:
                        $die_value = 1;
                        $die_label = '1';
                        $die_icon = DIE_POLECAT_1;
                        break;
                    case 2:
                    case 3:
                        $die_value = 2;
                        $die_label = '2';
                        $die_icon = DIE_POLECAT_2;
                        break;
                    case 4:
                    case 5:
                        $die_value = 3;
                        $die_label = '3';
                        $die_icon = DIE_POLECAT_3;
                        break;
                }
                break;
            case ANIMALFOLK_HARES:
                switch($d6) {
                    case 0:
                    case 1:
                        $die_value = DIE_STARS;
                        $die_label = clienttranslate('stars');
                        $die_icon = DIE_STARS;
                        break;
                    case 2:
                    case 3:
                        $die_value = DIE_PLANET;
                        $die_label = clienttranslate('planet');
                        $die_icon = DIE_PLANET;
                        break;
                    case 4:
                        $die_value = DIE_PLANET_REROLL;
                        $die_label = clienttranslate('planet (reroll)');
                        $die_icon = DIE_PLANET_REROLL;
                        break;
                    case 5:
                        $die_value = DIE_COMET;
                        $die_label = clienttranslate('comet');
                        $die_icon = DIE_COMET;
                        break;
                }
                break;
            case ANIMALFOLK_PANGOLINS:
                switch($d6) {
                    case 0:
                    case 1:
                        $die_value = DIE_DECK;
                        $die_label = clienttranslate('deck');
                        $die_icon = DIE_DECK;
                        break;
                    case 2:
                    case 3:
                    case 4:
                        $die_value = DIE_DISCARD;
                        $die_label = clienttranslate('discard');
                        $die_icon = DIE_DISCARD;
                        break;
                    case 5:
                        $die_value = DIE_HAND;
                        $die_label = clienttranslate('hand');
                        $die_icon = DIE_HAND;
                        break;
                }
                break;
            case ANIMALFOLK_PANGOLINS+1:
                switch($d6) {
                    case 0:
                    case 1:
                        $die_value = DIE_DECK2;
                        $die_label = clienttranslate('deck');
                        $die_icon = DIE_DECK2;
                        break;
                    case 2:
                    case 3:
                    case 4:
                        $die_value = DIE_DISCARD2;
                        $die_label = clienttranslate('discard');
                        $die_icon = DIE_DISCARD2;
                        break;
                    case 5:
                        $die_value = DIE_HAND2;
                        $die_label = clienttranslate('hand');
                        $die_icon = DIE_HAND2;
                        break;
                }
                break;
            default:
                throw new BgaVisibleSystemException("No die exists for animalfolk $animalfolk_id");
        }
        //animate the roll
        $this->notifyAllPlayers('rollDie', '', array_merge( array(
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'animalfolk_id' => $animalfolk_id,
            'die_value' => $die_value,
            'die_label' => $die_label,
            'die_icon' => $die_icon,
            'd6' => $d6,
            'card' => $dbcard
        ), $msg_args));
        //show the log after the animation finished (otherwise the result is spoiled)
        $this->notifyAllPlayers('message', $msg, array_merge( array(
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'animalfolk_id' => $animalfolk_id,
            'die_value' => $die_value,
            'die_label' => $die_label,
            'die_icon' => $die_icon,
            'd6' => $d6,
            'card' => $dbcard
        ), $msg_args));
        return $die_value;
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Chameleon functions
////////////  

    /*
        Here I place all function related to chameleon bindings
    */

    /**
     * Returns all the possible non-chameleon targets that can be reached by the provided card
     * @param int card_id of the card that is attempting to copy
     * @param int type_id of the card that is attempting to copy
     * @param array $visited_chameleons (passed by reference) chameleon types that have already been visited and should not be searched again
     */
    function getChameleonTargets(int $card_id, int $type_id, array & $visited_chameleons = array()) {
        $targets = array();
        if (in_array($type_id, $visited_chameleons)) {
            return $targets;
        }
        switch($type_id) {
            case CT_FLEXIBLESHOPKEEPER:
                array_push($visited_chameleons, CT_FLEXIBLESHOPKEEPER);
                $player_id = $this->getCurrentPlayerId();
                $rightmost_stack_index = $this->cards->getNextStackIndex($player_id) - 1;
                $valid_targets = $this->cards->getCardsInLocation(STALL.$player_id);
                foreach ($valid_targets as $target) {
                    if (intdiv($target["location_arg"], MAX_STACK_SIZE) == $rightmost_stack_index) {
                        $targets = array_merge($targets, $this->getChameleonTargets($target["id"], $this->getTypeId($target), $visited_chameleons));
                    }
                }
                break;
            case CT_REFLECTION:
                array_push($visited_chameleons, CT_REFLECTION);
                $active_player_id = $this->getActivePlayerId();
                $players = $this->loadPlayersBasicInfos();
                foreach ($players as $player_id => $player) {
                    if ($player_id != $active_player_id) {
                        $target = $this->cards->getCardOnTop(DISCARD.$player_id);
                        if ($target) {
                            $targets = array_merge($targets, $this->getChameleonTargets($target["id"], $this->getTypeId($target), $visited_chameleons));
                        }
                    }
                }
                break;
            case CT_GOODOLDTIMES:
                array_push($visited_chameleons, CT_GOODOLDTIMES);
                $target = $this->cards->getCardOnTop(DISCARD.MARKET);
                if ($target) {
                    $targets = array_merge($targets, $this->getChameleonTargets($target["id"], $this->getTypeId($target), $visited_chameleons));
                }
                break;
            case CT_TRENDSETTING:
                array_push($visited_chameleons, CT_TRENDSETTING);
                $valid_targets = $this->cards->getCardsInLocation(MARKET);
                foreach ($valid_targets as $target) {
                    $targets = array_merge($targets, $this->getChameleonTargets($target["id"], $this->getTypeId($target), $visited_chameleons));
                }
                break;
            case CT_SEEINGDOUBLES:
                array_push($visited_chameleons, CT_SEEINGDOUBLES);
                $active_player_id = $this->getActivePlayerId();
                $valid_targets = $this->cards->getCardsInLocation(HAND.$active_player_id);
                foreach ($valid_targets as $target) {
                    if ($target["id"] != $card_id) { //seeing doubles cannot bind to itself
                        $targets = array_merge($targets, $this->getChameleonTargets($target["id"], $this->getTypeId($target), $visited_chameleons));
                    }
                }
                break;
            default:
                $targets[] = $card_id;
                break;
        }
        return $targets;
    }

    /**
     * Returns true if the specified chameleon type is currently able to bind to the specified type. (does a dfs)
     * @param int $chameleon_card_id the chameleon card id that is attempting to bind
     * @param int $chameleon_type_id the chameleon type that is attempting to bind
     * @param int $target_id the card_id of the card it wishes to bind to
     * @return `true` if the target_id is valid for the specified chameleon type
     */
    function isValidChameleonTarget(int $chameleon_card_id, int $chameleon_type_id, int $target_id) {
        switch($chameleon_type_id) {
            case CT_FLEXIBLESHOPKEEPER:
                $player_id = $this->getCurrentPlayerId();
                $rightmost_stack_index = $this->cards->getNextStackIndex($player_id) - 1;
                $valid_targets = $this->cards->getCardsInLocation(STALL.$player_id);
                foreach ($valid_targets as $target) {
                    if (intdiv($target["location_arg"], MAX_STACK_SIZE) == $rightmost_stack_index) {
                        if ($target["id"] == $target_id) {
                            return true;
                        }
                    }
                }
                break;
            case CT_REFLECTION:
                $active_player_id = $this->getActivePlayerId();
                $players = $this->loadPlayersBasicInfos();
                foreach ($players as $player_id => $player) {
                    if ($player_id != $active_player_id) {
                        $target = $this->cards->getCardOnTop(DISCARD.$player_id);
                        if ($target) {
                            if ($target["id"] == $target_id) {
                                return true;
                            }
                        }
                    }
                }
                break;
            case CT_GOODOLDTIMES:
                $target = $this->cards->getCardOnTop(DISCARD.MARKET);
                if ($target) {
                    if ($target["id"] == $target_id) {
                        return true;
                    }
                }
                $fakedbcard = array("id" => $chameleon_card_id, "type_arg" => $chameleon_type_id);
                if (!$this->effects->isPassiveUsed($fakedbcard)) {
                    return true;
                }
                break;
            case CT_TRENDSETTING:
                $valid_targets = $this->cards->getCardsInLocation(MARKET);
                foreach ($valid_targets as $target) {
                    if ($target["id"] == $target_id) {
                        return true;
                    }
                }
                break;
            case CT_SEEINGDOUBLES:
                $active_player_id = $this->getActivePlayerId();
                $valid_targets = $this->cards->getCardsInLocation(HAND.$active_player_id);
                foreach ($valid_targets as $target) {
                    if ($target["id"] != $chameleon_card_id) { //seeing doubles cannot bind to itself
                        if ($target["id"] == $target_id) {
                            return true;
                        }
                    }
                }
                break;
            default:
                break;
        }
        return false;
    }

    //TODO: safely remove this
    // /**
    //  * Commit all local chameleons in the player's hand
    //  */
    // function addChameleonBindingsInHand($chameleons_json) {
    //     $player_id = $this->getActivePlayerId();
    //     $cards = $this->cards->getCardsInLocation(HAND.$player_id);
    //     $card_ids = $this->toCardIds($cards);
    //     $raw_card_ids = implode(';', $card_ids);
    //     $this->addChameleonBindings($chameleons_json, $raw_card_ids);
    // }

    /**
     * Ensures that all used chameleon cards have a binding. Then commit those bindings.
     * @param mixed $chameleons_json `AT_json`. representing local chameleon bindings  array of chameleon `card_id`s. Must be a subset of the 'used' cards
     * @param string $raw_used_card_ids `AT_numberlist` or `AT_int`. representing a collection of card_ids that is being 'used' in this action
     */
    function addChameleonBindings(mixed $chameleons_json, string ...$raw_used_card_ids) {
        // chameleons_json is of the following format:
        // Array (
        //     [0] => Array
        //     (
        //         [card_id] => 44
        //         [chameleon_target_ids] => Array
        //             (
        //                 [0] => 1
        //                 [1] => 2
        //                 [2] => 3
        //             )
    
        //         [target_type_ids] => Array
        //             (
        //                 [0] => 1
        //                 [1] => 2
        //                 [2] => 3
        //             )
        //     )
    
        // [1] => Array
        //     (
        //         [card_id] => 45
        //         [chameleon_target_ids] => Array
        //             (
        //                 [0] => 1
        //                 [1] => 2
        //                 [2] => 3
        //             )
    
        //         [target_type_ids] => Array
        //             (
        //                 [0] => 1
        //                 [1] => 2
        //                 [2] => 3
        //             )
        //     )
        //     //...
        // )

        //iterate over all cards the player attempts to use. any chameleon with at least 1 valid target, must copy a valid target.
        $used_card_ids = $this->numberListsToArray(...$raw_used_card_ids);
        $dbcards = $this->cards->getCards($used_card_ids);
        foreach ($dbcards as $dbcard) {
            $type_id = $this->getTypeId($dbcard); //apply the existing binding for this dbcard
            if ($type_id == CT_FLEXIBLESHOPKEEPER ||
                $type_id == CT_REFLECTION ||
                $type_id == CT_GOODOLDTIMES ||
                $type_id == CT_TRENDSETTING ||
                $type_id == CT_SEEINGDOUBLES
            ) {
                //get the local client-defined chameleon binding for this dbcard.
                $card_id = $dbcard["id"];
                $chameleon_target_ids = [];
                $target_type_ids = [];
                $length = 0;
                foreach ($chameleons_json as $local_chain) {
                    if ($local_chain["card_id"] == $card_id) {
                        $chameleon_target_ids = $local_chain["chameleon_target_ids"];
                        $target_type_ids = $local_chain["target_type_ids"];
                        $length = count($local_chain["chameleon_target_ids"]);
                        if ($length != count($local_chain["target_type_ids"])) {
                            throw new BgaVisibleSystemException("chameleon_target_ids and target_type_ids should have an equal length");
                        }
                        break;
                    }
                }

                if ($length == 0) {
                    //the client did not provide a chameleon chain, we must verify if the chameleon indeed has no valid targets
                    $visited_chameleons = array();
                    $targets = $this->getChameleonTargets($card_id, $type_id, $visited_chameleons);
                    $number_of_targets = count($targets);
                    $goodoldtimes = (isset($this->inactUsePassiveAbility) && in_array(CT_GOODOLDTIMES, $visited_chameleons));
                    if ($number_of_targets > 0 && !$goodoldtimes) {
                        $name = $this->getCardName($dbcard);
                        throw new BgaVisibleSystemException("Client did not provide a target for '$name', but $number_of_targets valid target(s) exist(s)");
                    }
                }
                else {
                    //verify if the non-empty chameleon chain provided the client is valid.
                    $curr_card_id = $card_id;
                    $curr_type_id = $type_id;
                    for ($i=0; $i < $length; $i++) {
                        $chameleon_target_id = $chameleon_target_ids[$i];
                        $target_type_id = $target_type_ids[$i];
                        if (!$this->isValidChameleonTarget($curr_card_id, $curr_type_id, $chameleon_target_id)) {
                            $name = $this->getCardName($dbcard);
                            throw new BgaVisibleSystemException("Unable to bind '$name' [card_id = $card_id] to [chameleon_target_id = $chameleon_target_id]");
                        }
                        $this->effects->insertModification($card_id, $curr_type_id, $target_type_id, $chameleon_target_id); //commit
                        $curr_card_id = $chameleon_target_id;
                        $curr_type_id = $target_type_id;
                    }
                    $this->notifyAllPlayers('message', clienttranslate('${player_name} lets their ${chameleon_card_name} copy a ${target_card_name}'), array(
                        'chameleon_card_name' => $this->card_types[$type_id]['name'],
                        'target_card_name' => $this->getCardName($dbcard),
                        'player_name' => $this->getActivePlayerName()
                    ));
                }
            }
        }
    }

    //TODO: safely remove this
    // /**
    //  * (Called by DaleDeck) This function should be called if the top card a location will be changed.
    //  * If the provided location is a discard pile, expire CT_REFLECTION or CT_GOODOLDTIMES card modifications.
    //  */
    // function expireChameleonTargetInDiscard(string $location) {
    //     $prefix = substr($location, 0, 4);
    //     if ($prefix == DISCARD) {
    //         $player_id = substr($location, 4);
    //         //TODO: safely remove this
    //         // if ($player_id == MARKET) {
    //         //     foreach ($this->effects->getChameleonIdsByTypeId(CT_GOODOLDTIMES) as $chameleon_card_id) {
    //         //         $this->effects->expireModifications($chameleon_card_id);
    //         //         $this->effects->insertModification($chameleon_card_id, CT_GOODOLDTIMES); //passive used
    //         //     }
    //         // }
    //         if ($player_id != $this->getActivePlayerId()) {
    //             $target = $this->cards->getCardOnTop($location);
    //             if ($target) {
    //                 $this->effects->expireChameleonTarget($target["id"]);
    //             }
    //         }
    //     }
    // }

    //TODO: safely remove this
    // /**
    //  * This function should be called if the card of the given target_id stops being a valid chameleon target.
    //  * If the target_id is a target of some chameleon card, expire all effects of that chameleon card.
    //  * If the original chameleon card was a CT_GOODOLDTIMES, mark its passive as used.
    //  * @param $target_id the now invalid target
    //  */
    // function expireChameleonTarget(int $target_id) {
    //     $effects = $this->effects->getEffectsByChameleonTargetId($target_id);
    //     foreach ($effects as $effect) {
    //         $chameleon_card_id = $effect["card_id"];
    //         $effect_id = $effect["effect_id"];
    //         $this->effects->expireModifications($chameleon_card_id, $effect_id);
    //         $this->effects->insertModification($chameleon_card_id, CT_GOODOLDTIMES); //passive used
    //     }
    // }
    // /**
    //  * This function should be called if the card of the given target_id stops being a valid chameleon target.
    //  * If the target_id is a target of some chameleon card, expire all effects of that chameleon card.
    //  * If the original chameleon card was a CT_GOODOLDTIMES, mark its passive as used.
    //  * @param $target_id the now invalid target
    //  */
    // function expireChameleonTarget(int $target_id) {
    //     $chameleon_card_ids = $this->effects->getChameleonIdsByTargetId($target_id);
    //     foreach ($chameleon_card_ids as $chameleon_card_id) {
    //         $this->effects->expireModifications($chameleon_card_id);
    //         $chamelon_card = $this->cards->getCard($chameleon_card_id);
    //         if ($chamelon_card["type_arg"] == CT_GOODOLDTIMES) {
    //             $this->effects->insertModification($chameleon_card_id, CT_GOODOLDTIMES); //passive used
    //         }
    //     }
    // }

//////////////////////////////////////////////////////////////////////////////
//////////// Resolving functions / Scheduling functions
////////////  

    /*
        Here I place all function related to resolving and/or scheduling techniques
    */

    /**
     * Schedule a card from hand for a player and notify all other players (the active player locally scheduled the card already).
     * IMPORTANT: the caller is responsible for assuring that the card is currently in hand.
     * @param string $player_id player to schedule a card for
     * @param array $dbcard card to be scheduled
     * @param bool $choiceless (optional) default false. If true, add a synchronization delay to scheduling
     */
    function scheduleCard(string $player_id, array $dbcard, bool $choiceless = false){
        //for replays, notify ALL players about the scheduled card, even the active player, who already locally scheduled the card
        $this->cards->moveCard($dbcard["id"], SCHEDULE.$player_id);
        $this->notifyAllPlayers('scheduleTechnique', '${player_name} schedules their ${card_name}', array(
            'player_id' => $player_id,
            'player_name' => $this->getPlayerNameById($player_id),
            'card_name' => $this->getCardName($dbcard),
            'card' => $dbcard,
        ));
        //all clients that did not locally schedule the card will get a synchronization delay
        if ($choiceless) {
            $this->notifyAllPlayers('scheduleTechniqueDelay', '', array(
                'player_id' => $player_id,
                '_private' => true //in case of a choiceless card, the active player also needs a delay
            ));
        }
        else {
            $this->notifyAllPlayers('scheduleTechniqueDelay', '', array(
                'player_id' => $player_id
            ));
        }
    }

    /**
     * Begin resolving a scheduled card by storing it in "resolvingCard". This is needed for techniques with hidden information.
     * IMPORTANT: the caller is responsible for assuring that the card is currently in the schedule.
     * @param int $card_id the card id of the card to resolve
     */
    function beginResolvingCard(int $card_id){
        $previous = $this->getGameStateValue("resolvingCard");
        if ($previous != -1) {
            throw new Error("Cannot resolve two cards at the same time! Finish resolving the first card before resolving the second.");
        }
        $this->setGameStateValue("resolvingCard", $card_id);
    }

    //TODO: safely delete this
    // /**
    //  * Begin resolving a scheduled card by storing it in "resolvingCard" and notifying all players. Makes 2 db calls.
    //  * IMPORTANT: the caller is responsible for assuring that the card is currently in the schedule. Typically called after a "scheduleCard".
    //  * @param array $dbcard card to be scheduled
    // */
    // function beginToResolveCard(string $player_id, array $dbcard) {
    //     $previous = $this->getGameStateValue("resolvingCard");
    //     if ($previous != -1) {
    //         throw new Error("Cannot resolve two cards at the same time! Finish resolving the first card before resolving the second.");
    //     }
    //     $this->notifyAllPlayers('message', clienttranslate('${player_name} begins to resolve their ${card_name}'), array(
    //         'player_name' => $this->getPlayerNameById($player_id),
    //         'card_name' => $this->getCardName($dbcard),
    //     ));
    //     $this->setGameStateValue("resolvingCard", $dbcard["id"]);
    // }

    /**
     * Discard the resolving card, notify all players and transition to the next state. 
     * @param mixed $player_id id of the owner of the scheduled card
     * @param ?array $technique_card (optional) by default, resolve the card stored in "resolvingCard" - otherwise, resolve the specified card
     */
    function fullyResolveCard(mixed $player_id, array $technique_card = null) {
        //get the resolving card
        if ($technique_card != null) {
            $technique_card_id = $technique_card["id"];
        }
        else {
            $technique_card_id = $this->getGameStateValue("resolvingCard");
            $technique_card = $this->cards->getCard($technique_card_id);
            if ($technique_card_id == -1) {
                throw new Error("Trying to 'fullyResolveCard' without 'beginResolvingCard'");
            }
            $this->setGameStateValue("resolvingCard", -1);
        }
        $type_id = $this->getTypeId($technique_card);

        //move the card from the schedule to the discard pile
        $this->cards->moveCardOnTop($technique_card_id, DISCARD.$player_id);
        $this->notifyAllPlayers('resolveTechnique', clienttranslate('${player_name} fully resolves their ${card_name}'), array(
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'card_name' => $this->getCardName($technique_card),
            'card' => $technique_card
        ));

        //decide if the player can go again
        if ($this->card_types[$type_id]["has_plus"]) {
            if ($this->getActivePlayerId() != $player_id) {
                $this->nextStateChangeActivePlayer("trSamePlayer", $player_id);
            }
            else {
                $this->gamestate->nextState("trSamePlayer");
            }
        }
        else {
            $this->gamestate->nextState("trNextPlayer");
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
     * @param ?string $from (optional) - if provided, `$cards_from_hand` come from `from` instead of `HAND`
     * @return string game state transition to take after building. One of:
     * * trGameEnd
     * * trWinterIsComing
     * * trNextPlayer
     * * trSamePlayer
     */
    function build(int $stack_index, array $cards_from_hand, array $cards_from_discard = null, ?string $from = null) {
        //Get the current player
        $player_id = $this->getActivePlayerId();

        //Apply the rules for a valid stack
        $this->enforceValidStack($stack_index, $cards_from_hand, $cards_from_discard);

        //Check for winter is coming (before effects expire)
        $cards = $cards_from_discard ? array_merge($cards_from_hand, $cards_from_discard) : $cards_from_hand;
        $winter_is_coming = $this->containsTypeId($cards, CT_WINTERISCOMING);

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
            "from" => $from ? $from : HAND
        ));

        //Add the cards to the stack (after the notification, so that the modified values are still shown during the animation)
        $index = 0;
        if ($cards_from_discard) {
            $this->cards->moveCardsToStall($this->toCardIds($cards_from_discard), STALL.$player_id, $stack_index);
            $index += count($cards_from_discard);
        }
        $this->cards->moveCardsToStall($this->toCardIds($cards_from_hand), STALL.$player_id, $stack_index, $index);

        //Check if the player has won
        $win = $this->updateScore($player_id, $stack_index + 1);
        if ($win) {
            return "trGameEnd";
        }

        //Winter is coming
        if ($winter_is_coming) {
            $this->notifyAllPlayers('message', clienttranslate('Winter Is Coming: ${player_name} may build an additional stack'), array(
                "player_name" => $this->getPlayerNameById($player_id)
            ));
            return "trWinterIsComing";
        }

        //Charm (free build action)
        $resolving_card_id = $this->getGameStateValue("resolvingCard");
        if ($resolving_card_id != -1) {
            $resolving_card = $this->cards->getCard($resolving_card_id);
            $resolving_type_id = $this->getTypeId($resolving_card);
            if ($resolving_type_id == CT_CHARM) {
                $this->fullyResolveCard($player_id);
                return "trSamePlayer";
            }
        }

        //Next player
        return "trNextPlayer";
    }


//////////////////////////////////////////////////////////////////////////////
//////////// Test functions
////////////    

    /*
        In this space, I will put some testing functions
    */

    function assertEquals(mixed $expected, mixed $actual, string $testname) {
        if ($expected != $actual) {
            die("TEST FAILED '$testname': expected: '$expected', actual: '$actual'");
        }
    }

    function testDeckSelection() {
        $this->deckSelection->submitPreference(123124, array(
            ANIMALFOLK_MACAWS,
            ANIMALFOLK_PANDAS, #3
            ANIMALFOLK_SQUIRRELS
        ));
        $this->deckSelection->submitPreference(231512, array(
            ANIMALFOLK_CHAMELEONS, #2
            ANIMALFOLK_OCELOTS, #5
            ANIMALFOLK_PANDAS
        ));
        $this->deckSelection->submitPreference(345123, array(
            ANIMALFOLK_MACAWS, #1
            ANIMALFOLK_SQUIRRELS, #4
            ANIMALFOLK_PANDAS
        ));
        $animalfolks = $this->deckSelection->getPreferences();
        $this->assertEquals(ANIMALFOLK_MACAWS, current($animalfolks), "selection #1");
        $this->assertEquals(ANIMALFOLK_CHAMELEONS, next($animalfolks), "selection #2");
        $this->assertEquals(ANIMALFOLK_PANDAS, next($animalfolks), "selection #3");
        $this->assertEquals(ANIMALFOLK_SQUIRRELS, next($animalfolks), "selection #4");
        $this->assertEquals(ANIMALFOLK_OCELOTS, next($animalfolks), "selection #5");
        die("SUCCESS ! TESTS PASSED !");
    }
    
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
    }

    //TODO: safely delete this
    // function testUnbindChameleon() {
    //     $this->effects->expireEndOfTurn();
    //     $this->effects->insert(1, CT_FLEXIBLESHOPKEEPER, 23);
    //     $this->effects->insert(2, CT_GOODOLDTIMES, 34);
    //     $this->effects->insert(3, CT_GOODOLDTIMES, -1);
    //     $this->effects->insert(4, CT_SEEINGDOUBLES, 63);
    //     $this->effects->unbindChameleon(2); //has a valid target that should be unbinded
    //     $this->effects->unbindChameleon(3); //has an invalid target, don't remove this effect
    //     $target1 = $this->effects->getTarget(1, CT_FLEXIBLESHOPKEEPER);
    //     $target2 = $this->effects->getTarget(2, CT_GOODOLDTIMES);
    //     $target3 = $this->effects->getTarget(3, CT_GOODOLDTIMES);
    //     $target4 = $this->effects->getTarget(4, CT_SEEINGDOUBLES);
    //     if ($target1 != 23) {
    //         die("TEST FAILED: $target1 != 23");
    //     }
    //     if ($target2 != null) {
    //         die("TEST FAILED: $target2 != null, card_id 2 should have been unbounded");
    //     }
    //     if ($target3 != -1) {
    //         die("TEST FAILED: $target3 != -1, card_id 3 should still have an effect with [target == -1]");
    //     }
    //     if ($target4 != 63) {
    //         die("TEST FAILED: $target4 != null");
    //     }
    //     die("SUCCESS ! TESTS PASSED !");
    // }

    function testEffects() {
        foreach (array(false, true) as $reload) { //reloading yes or no should not make a difference
            $reload_msg = $reload ? " (reload TRUE)" : " (reload FALSE)";
            $this->effects->expireAllExcept([]);
            $this->effects->insertModification(41, 1);
            $this->effects->insertModification(42, 2);
            if ($reload) $this->effects->loadFromDb();
            $this->effects->insertModification(43, 3);
            $this->effects->insertModification(44, 4, 10);
            if ($reload) $this->effects->loadFromDb();
            $this->effects->insertModification(45, 5);
            $this->effects->insertModification(46, 6);
            if ($reload) $this->effects->loadFromDb();

            //getArg
            $this->assertEquals($this->effects->getArg(43, 3),  null, "getArg(43)".$reload_msg);
            $this->assertEquals($this->effects->getArg(44, 0),  10, "getArg(43)".$reload_msg);

            //isPassiveUsed
            $this->assertEquals($this->effects->isPassiveUsed(array("id"=> 43, "type_arg" => 3)), true, "passive(43, 3)".$reload_msg);
            $this->assertEquals($this->effects->isPassiveUsed(array("id"=> 43, "type_arg" => 4)), false, "passive(43, 4)".$reload_msg);
            $this->assertEquals($this->effects->isPassiveUsed(array("id"=> 44, "type_arg" => 3)), false, "passive(44, 3)".$reload_msg);
            $this->assertEquals($this->effects->isPassiveUsed(array("id"=> 44, "type_arg" => 4)), true, "passive(44, 4)".$reload_msg);

            //expire
            $this->effects->expireModificationsMultiple([41, 42, 46]);
            $this->effects->expireModifications(44);
            $this->assertEquals($this->effects->isPassiveUsed(array("id"=> 41, "type_arg" => 1)), false, "expire(41)".$reload_msg);
            $this->assertEquals($this->effects->isPassiveUsed(array("id"=> 42, "type_arg" => 2)), false, "expire(42)".$reload_msg);
            $this->assertEquals($this->effects->isPassiveUsed(array("id"=> 43, "type_arg" => 3)), true, "expire(43)".$reload_msg);
            $this->assertEquals($this->effects->isPassiveUsed(array("id"=> 44, "type_arg" => 4)), false, "expire(44)".$reload_msg);
            $this->assertEquals($this->effects->isPassiveUsed(array("id"=> 45, "type_arg" => 5)), true, "expire(45)".$reload_msg);
            $this->assertEquals($this->effects->isPassiveUsed(array("id"=> 46, "type_arg" => 6)), false, "expire(46)".$reload_msg);
        }
        die("SUCCESS ! TESTS PASSED !");
    }

    function testSchedule() {
        $player_id = $this->getCurrentPlayerId();
        $cards = $this->spawn("Swift");
        $card = reset($cards);
        $this->scheduleCard($player_id, $card);
        $this->fullyResolveCard($player_id, $card);
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
            clienttranslate('DEBUG: discard'),
            $player_id, 
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
        throw new BgaVisibleSystemException("No card name matches prefix '$prefix'");
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

    /**
     * Get information about a dale card from the client's perspective
     */
    function debugDaleCard($card_id) {
        $this->notifyAllPlayers('debugClient', 'debugDaleCard', array('arg' => 'debugDaleCard', 'card_id' => $card_id));
    }

    function d($arg) {
        //debugClient
        $this->notifyAllPlayers('debugClient', clienttranslate('Debugging (arg = ${arg})...'), array('arg' => $arg));
    }

    function debugPlayers() {
        die(print_r($this->loadPlayersBasicInfos()));
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Player actions
//////////// 

    /*
        Each time a player is doing some game action, one of the methods below is called.
        (note: each method below must match an input method in dale.action.php)
    */

    function actSubmitPreference($animalfolk_ids) {
        $this->checkAction("actSubmitPreference");
        $animalfolk_ids = $this->numberListToArray($animalfolk_ids);
        $player_id = $this->getCurrentPlayerId();
        $this->deckSelection->submitPreference($player_id, $animalfolk_ids);
        if (count($animalfolk_ids) > 0) {
            $this->notifyAllPlayers('message', clienttranslate('Deck Selection: ${player_name} voted'), array(
                "player_name" => $this->getPlayerNameById($player_id)
            ));
        }
        else {
            $this->notifyAllPlayers('message', clienttranslate('Deck Selection: ${player_name} abstained'), array(
                "player_name" => $this->getPlayerNameById($player_id)
            ));
        }
        $this->gamestate->setPlayerNonMultiactive($player_id, "trStartGame");
    }

    function actPurchase($chameleons_json, $funds_card_ids, $market_card_id, $args) {
        $this->addChameleonBindings($chameleons_json, $funds_card_ids);
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
        $this->incStat(1, "actions_purchase", $player_id);

        //Apply CT_CALCULATIONS
        if (isset($args["calculations_card_ids"])) {
            if (!$this->containsTypeId($funds_cards, CT_CALCULATIONS)) {
                throw new BgaUserException("To rearrange the market, 'Calculations' must be included in the funds");
            }
            $calculations_card_ids = $args["calculations_card_ids"];
            $market_card_ids = $this->toCardIds($this->cards->getCardsInLocation(MARKET));
            if (!$this->isSubset($calculations_card_ids, $market_card_ids) || !$this->isSubset($calculations_card_ids, $market_card_ids)) {
                throw new BgaVisibleSystemException("The provided CT_CALCULATIONS arrangement is invalid");
            }
            $pos = 0;
            foreach ($calculations_card_ids as $calculations_card_id) {
                $this->cards->moveCard($calculations_card_id, MARKET, $pos);
                $pos += 1;
            }
            $this->notifyAllPlayers('rearrangeMarket', clienttranslate('Calculations: ${player_name} rearranged the market'), array (
                'player_id' => $player_id,
                'player_name' => $this->getActivePlayerName(),
                'card_ids' => $calculations_card_ids,
            ));
    
        }

        //Get information about the market card
        //$market_card_id = $this->getGameStateValue("selectedCard");
        $market_card = $this->cards->getCard($market_card_id);
        if ($market_card['location'] != MARKET && $market_card['location'] != DISCARD.MARKET) {
            $invalid_location = $market_card['location'];
            throw new BgaVisibleSystemException($this->_("Cards cannot be purchased from '$invalid_location'"));
        }
        $from_bin = $market_card['location'] == DISCARD.MARKET;
        if ($from_bin) {
            $market_card = $this->cards->getCardOnTop(DISCARD.MARKET);
            if (!$this->containsTypeId($funds_cards, CT_MARKETDISCOVERY)) {
                throw new BgaUserException($this->_("To purchase from the bin, 'Market Discovery' must be included in the funds"));
            }
        }
        $cost = $this->getCost($market_card);

        //Check if funds are sufficient
        if ($total_value < $cost) {
            throw new BgaUserException($this->_("Insufficient funds")." ($total_value)");
        }

        //Check for overpaying
        if (($total_value - $lowest_value) >= $cost && !$this->containsTypeId($funds_cards, CT_STOCKCLEARANCE)) {
            throw new BgaUserException($this->_("Overpaying is not allowed")." ($total_value)");
        }

        //Apply CT_ESSENTIALPURCHASE
        if ($this->getTypeId($market_card) == CT_ESSENTIALPURCHASE) {
            $essential_purchase_ids = $args["essential_purchase_ids"];
            if (!$this->isSubset($essential_purchase_ids, $funds_card_ids)) {
                throw new BgaVisibleSystemException("CT_ESSENTIALPURCHASE: Selected junk cards must be a subset of the selected fund cards");
            }
            //Move cards from funds to essential purchase
            $funds_card_ids = array_values(array_diff($funds_card_ids, $essential_purchase_ids));
            $essential_purchase_cards = array();
            foreach ($essential_purchase_ids as $essential_purchase_id) {
                $essential_purchase_cards[] = $funds_cards[$essential_purchase_id];
                unset($funds_cards[$essential_purchase_id]);
            }
            $this->ditchMultiple(
                clienttranslate('Essential Purchase: ${player_name} ditches ${nbr} junk card(s)'), 
                $essential_purchase_cards
            );
        }

        //Discard the funds
        $this->cards->moveCardsOnTop($funds_card_ids, DISCARD.$player_id);
        $this->notifyAllPlayers('discardMultiple', clienttranslate('${player_name} pays with ${nbr} card(s)'), array (
            'player_id' => $player_id,
            'player_name' => $this->getActivePlayerName(),
            'card_ids' => $funds_card_ids,
            'cards' => $funds_cards,
            'nbr' => count($funds_cards)
        ));

        //Obtain the market card
        $this->cards->moveCard($market_card_id, HAND.$player_id);
        if ($from_bin) {
            $this->notifyAllPlayers('marketDiscardToHand', clienttranslate('Market Discovery: ${player_name} bought a ${card_name}'), array (
                'i18n' => array('card_name'),
                'player_id' => $player_id,
                'player_name' => $this->getActivePlayerName(),
                'card_name' => $this->getCardName($market_card),
                'card' => $market_card,
            ));
        }
        else {
            $this->notifyAllPlayers('marketToHand', clienttranslate('${player_name} bought a ${card_name}'), array (
                'i18n' => array('card_name'),
                'player_id' => $player_id,
                'player_name' => $this->getActivePlayerName(),
                'card_name' => $this->getCardName($market_card),
                'market_card_id' => $market_card_id,
                'pos' => $market_card["location_arg"],
            ));
        }


        //end turn
        $this->gamestate->nextState("trNextPlayer");
    }

    function actPlayTechniqueCard($chameleons_json, $technique_card_id, $args) {
        $this->addChameleonBindings($chameleons_json, $technique_card_id);
        $this->checkAction("actPlayTechniqueCard");
        $player_id = $this->getActivePlayerId();
        $technique_card = $this->cards->getCardFromLocation($technique_card_id, HAND.$player_id);
        $technique_type_id = $this->getTypeId($technique_card);
        if ($this->card_types[$technique_type_id]['playable'] == false) {
            throw new BgaUserException($this->_("That card is not playable!"));
        }
        $this->incStat(1, "actions_technique", $player_id);

        //Fizzle
        if (array_key_exists("fizzle", $args)) {
            switch($technique_type_id) {
                case CT_ACORN:
                    $players = $this->loadPlayersBasicInfos();
                    $cards = array();
                    foreach ($players as $other_player_id => $player) {
                        if ($other_player_id != $player_id) {
                            $cards = array_merge($cards, $this->cards->getCardsInLocation(STALL.$other_player_id));
                        }
                    }
                    if (count($cards) >= 1) {
                        throw new BgaVisibleSystemException("Unable to fizzle CT_ACORN. Some players have cards in their stall");
                    }
                    break;
                case CT_GIFTVOUCHER:
                    $cards = $this->cards->getCardsInLocation(MARKET);
                    if (count($cards) >= 1) {
                        $name = $this->getCardName($technique_card);
                        throw new BgaVisibleSystemException("Unable to fizzle CT_GIFTVOUCHER. The market is nonempty.");
                    }
                    break;
                case CT_TREASUREHUNTER:
                    $players = $this->loadPlayersBasicInfos();
                    foreach ($players as $opponent_id => $opponent) {
                        if ($player_id != $opponent_id) {
                            $target = $this->cards->getCardOnTop(DISCARD.$player_id);
                            if ($target) {
                                throw new BgaVisibleSystemException("Unable to fizzle CT_TREASUREHUNTER. There exists a card to take.");
                            }
                        }
                    }
                    break;
                case CT_NEWSEASON:
                    $cards = $this->cards->getCardsInLocation(DISCARD.$player_id);
                    foreach ($cards as $card) {
                        if ($this->isAnimalfolk($card)) {
                            throw new BgaVisibleSystemException("Unable to fizzle CT_NEWSEASON. There exists an animalfolk in the discard pile.");
                        }
                    }
                    break;
                case CT_CHARM:
                    $nbr = $this->cards->countCardsInLocation(DECK.MARKET);
                    $nbr += $this->cards->countCardsInLocation(DISCARD.MARKET);
                    if ($nbr > 0) {
                        throw new BgaVisibleSystemException("Unable to fizzle CT_CHARM. The market deck/discard contains card(s).");
                    }
                    break;
                case CT_TIRELESSTINKERER:
                    $nbr = $this->cards->countCardsInLocation(DISCARD.$player_id);
                    if ($nbr > 0) {
                        throw new BgaVisibleSystemException("Unable to fizzle CT_TIRELESSTINKERER. The player's discard pile contains card(s).");
                    }
                    break;
                case CT_SAFETYPRECAUTION:
                    $cards = $this->cards->getCardsInLocation(STALL.$player_id);
                    if (count($cards) >= 1) {
                        throw new BgaVisibleSystemException("Unable to fizzle CT_SAFETYPRECAUTION. You have cards in your stall");
                    }
                    break;
                case CT_MAGNET:
                    $cards = $this->cards->getCardsInLocation(DECK.$player_id);
                    if (count($cards) >= 1) {
                        throw new BgaVisibleSystemException("Unable to fizzle CT_MAGNET. There exists a card in the deck.");
                    }
                    break;
                default:
                    $cards = $this->cards->getCardsInLocation(HAND.$player_id);
                    if (count($cards) >= 2) {
                        $name = $this->getCardName($technique_card);
                        throw new BgaVisibleSystemException("Unable to fizzle '$name'. The player still has other cards in their hand.");
                    }
                    break;
            }
            $this->scheduleCard($player_id, $technique_card);
            $this->fullyResolveCard($player_id, $technique_card);
            return;
        }

        //Schedule Technique
        if ($technique_type_id != CT_ACORN && $technique_type_id != CT_GIFTVOUCHER && $technique_type_id != CT_SAFETYPRECAUTION) {
            $this->scheduleCard($player_id, $technique_card, array_key_exists("choiceless", $args));
        }

        //Resolve Technique
        switch($technique_type_id) {
            case CT_SWIFTBROKER:
                $card_ids = $args["card_ids"];
                //get the non-selected cards and selected cards
                $non_selected_cards = $this->cards->getCardsInLocation(HAND.$player_id);
                $selected_cards = $this->cards->getCardsFromLocation($card_ids, HAND.$player_id);
                foreach ($selected_cards as $card_id => $card) {
                    unset($non_selected_cards[$card_id]);
                }
                //discard all
                $this->discardMultiple(
                    clienttranslate('Swift Broker: ${player_name} discards their hand'),
                    $player_id, 
                    $card_ids, 
                    $selected_cards, 
                    $non_selected_cards
                );
                //draw an equal amount of new cards
                $nbr = count($selected_cards) + count($non_selected_cards);
                $this->draw(
                    clienttranslate('Swift Broker: ${player_name} draws ${nbr} cards'), 
                    $nbr
                );
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_SHATTEREDRELIC:
                $handsize = $this->cards->countCardInLocation(HAND.$player_id);
                if ($handsize > 0) {
                    if (!array_key_exists("card_id", $args)) {
                        throw new BgaVisibleSystemException("Shattered Relic: the player did not select a card to ditch");
                    }
                    $card_id = $args["card_id"];
                    $card = $this->cards->getCardFromLocation($card_id, HAND.$player_id);
                    $this->ditch(clienttranslate('Shattered Relic: ${player_name} ditches a ${card_name}'), $card);
                }
                else {
                    $this->notifyAllPlayers('message', clienttranslate('Shattered Relic: ${player_name} has no cards to ditch'), array(
                        "player_name" => $this->getActivePlayerName()
                    ));
                }
                $this->draw(clienttranslate('Shattered Relic: ${player_name} draws 1 card'));
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_SPYGLASS:
                $this->beginResolvingCard($technique_card_id);
                $this->gamestate->nextState("trSpyglass");
                break;
            case CT_FLASHYSHOW:
                $this->effects->insertGlobal($technique_card_id, CT_FLASHYSHOW);
                $this->notifyAllPlayers('message', clienttranslate('Flashy Show: ${player_name} increases the value of all cards they use by 1 for this turn'), array(
                    "player_name" => $this->getPlayerNameById($player_id),
                ));
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_FAVORITETOY:
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
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_ACORN:
                $stall_card_id = $args["stall_card_id"];
                $stall_player_id = $args["stall_player_id"];
                $stall_card = $this->cards->getCardFromLocation($stall_card_id, STALL.$stall_player_id);
                $this->cards->moveCard($technique_card_id, STALL.$stall_player_id, $stall_card["location_arg"]);
                $this->cards->moveCard($stall_card_id, HAND.$player_id);
                $this->notifyAllPlayers('swapHandStall', clienttranslate('Acorn: ${player_name} swaps with a ${card_name}'), array(
                    "player_name" => $this->getActivePlayerName(),
                    "card_name" => $this->getCardName($stall_card),
                    "player_id" => $player_id,
                    "card" => $technique_card,
                    "stall_player_id" => $stall_player_id,
                    "stall_card_id" => $stall_card_id
                ));
                $this->gamestate->nextState("trSamePlayer");
                break;
            case CT_GIFTVOUCHER:
                $market_card_id = $args["market_card_id"];
                $market_card = $this->cards->getCardFromLocation($market_card_id, MARKET);
                $this->cards->moveCard($technique_card_id, MARKET, $market_card["location_arg"]);
                $this->cards->moveCard($market_card_id, HAND.$player_id);
                $this->notifyAllPlayers('swapHandMarket', clienttranslate('Gift Voucher: ${player_name} swaps with a ${card_name}'), array(
                    "player_name" => $this->getActivePlayerName(),
                    "card_name" => $this->getCardName($market_card),
                    "player_id" => $player_id,
                    "card" => $technique_card,
                    "market_card_id" => $market_card_id
                ));
                $this->gamestate->nextState("trSamePlayer");
                break;
            case CT_LOYALPARTNER:
                //get the non-selected cards and selected cards
                $card_ids = $args["card_ids"];
                $non_selected_cards = $this->cards->getCardsInLocation(MARKET);
                $selected_cards = $this->cards->getCardsFromLocation($card_ids, MARKET);
                foreach ($selected_cards as $card_id => $card) {
                    unset($non_selected_cards[$card_id]);
                }
                //1. ditch all cards from the market board
                $this->ditchFromMarketBoard(
                    clienttranslate('Loyal Partner: ${player_name} ditches all cards from the market'),
                    $card_ids, 
                    $selected_cards, 
                    $non_selected_cards
                );
                //2. refill the market
                $this->refillMarket(false);
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_PREPAIDGOOD:
                //Get the card from the market
                $card_id = $args["card_id"];
                $card = $this->cards->getCardFromLocation($card_id, MARKET);
                //Place the card into the player's hand
                $this->cards->moveCard($card_id, HAND.$player_id);
                $this->notifyAllPlayers('marketToHand', clienttranslate('Prepaid Good: ${player_name} placed a ${card_name} into their hand'), array (
                    'i18n' => array('card_name'),
                    'player_id' => $player_id,
                    'player_name' => $this->getActivePlayerName(),
                    'card_name' => $this->getCardName($card),
                    'market_card_id' => $card_id,
                    'pos' => $card["location_arg"],
                ));
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_SPECIALOFFER:
                $this->beginResolvingCard($technique_card_id);
                $this->gamestate->nextState("trSpecialOffer");
                break;
            case CT_WILYFELLOW:
                $original_discard_cards = $this->cards->getCardsInLocation(DISCARD.$player_id);
                $original_deck_cards = $this->cards->getCardsInLocation(DECK.$player_id);
                $this->cards->moveCards($this->toCardIds($original_discard_cards), DECK.$player_id);
                $this->cards->moveCards($this->toCardIds($original_deck_cards), DISCARD.$player_id);
                $this->cards->shuffle(DECK.$player_id);
                $this->cards->shuffle(DISCARD.$player_id);
                $discard_card_ids = array();
                $discard_cards = $this->cards->getCardsInLocation(DISCARD.$player_id);
                foreach ($discard_cards as $discard_card) {
                    $discard_card_ids[(int)$discard_card["location_arg"]] = $discard_card["id"];
                }
                ksort($discard_card_ids);
                $this->notifyAllPlayers('wilyFellow', clienttranslate('Wily Fellow: ${player_name} swaps their discard pile and deck'), array (
                    'player_id' => $player_id,
                    'player_name' => $this->getActivePlayerName(),
                    'cards' => $discard_cards,
                    'card_ids' => $discard_card_ids
                ));
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_NUISANCE:
                $opponent_ids = $args["opponent_ids"];
                if (count($opponent_ids) > 2) {
                    throw new BgaVisibleSystemException("Nuisance cannot have more than 2 targets");
                }
                foreach ($opponent_ids as $opponent_id) {
                    if ($opponent_id == $player_id) {
                        throw new BgaVisibleSystemException("Nuisance cannot target the active player");
                    }
                    $cards = $this->cards->getCardsInLocation(HAND.$opponent_id);
                    if (count($cards) > 0) {
                        $card_id = array_rand($cards);
                        $card = $cards[$card_id];
                        $this->cards->moveCardOnTop($card_id, DISCARD.$opponent_id);
                        $this->notifyAllPlayers('discard', clienttranslate('Nuisance: ${player_name} lets ${opponent_name} discard their ${card_name}'), array(
                            "player_id" => $opponent_id,
                            "card" => $card,
                            "player_name" => $this->getPlayerNameById($player_id),
                            "opponent_name" => $this->getPlayerNameById($opponent_id),
                            "card_name" => $this->getCardName($card)
                        ));
                    }
                }
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_ROTTENFOOD:
                $opponent_id = $args["opponent_id"];
                $card_id = $args["card_id"];
                $card = $this->cards->getCardFromLocation($card_id, HAND.$player_id);
                if ($opponent_id == $player_id) {
                    throw new BgaVisibleSystemException("Rotten food cannot be used to place cards on top of your own deck");
                }
                $this->placeOnDeckMultiple(
                    $opponent_id, 
                    clienttranslate('Rotten food: ${player_name} places a card on top of ${opponent_name}\'s deck'),
                    array($card_id), 
                    array($card_id => $card)
                );
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_DIRTYEXCHANGE:
                $opponent_id = isset($args["opponent_id"]) ? $args["opponent_id"] : $this->getUniqueOpponentId();
                $this->setGameStateValue("opponent_id", $opponent_id);
                $this->beginResolvingCard($technique_card_id);
                $this->gamestate->nextState("trDirtyExchange");
                break;
            case CT_SABOTAGE:
                $opponent_id = isset($args["opponent_id"]) ? $args["opponent_id"] : $this->getUniqueOpponentId();
                $this->setGameStateValue("opponent_id", $opponent_id);
                $this->beginResolvingCard($technique_card_id);
                $this->gamestate->nextState("trSabotage");
                break;
            case CT_TREASUREHUNTER:
                $card_id = $args["card_id"];
                $card = $this->cards->getCard($card_id);
                $prefix = substr($card["location"], 0, 4);
                $opponent_id = substr($card["location"], 4);
                if ($prefix != DISCARD || $opponent_id == MARKET) {
                    throw new BgaVisibleSystemException("CT_TREASUREHUNTER can only take cards from player discard piles");
                }
                $top_card = $this->cards->getCardOnTop(DISCARD.$opponent_id);
                if ($card["id"] != $top_card["id"]) {
                    throw new BgaVisibleSystemException("CT_TREASUREHUNTER can only take the top card of a discard pile (card $card_id is not on top)");
                }
                $this->cards->moveCard($card_id, HAND.$player_id);
                $this->notifyAllPlayers('discardToHand', clienttranslate('Treasure Hunter: ${player_name} takes a ${card_name} from ${opponent_name}\'s discard pile'), array(
                    "player_id" => $player_id,
                    "discard_id" => $opponent_id,
                    "opponent_name" => $this->getPlayerNameById($opponent_id),
                    "player_name" => $this->getPlayerNameById($player_id),
                    "card_name" => $this->getCardName($card),
                    "card" => $card
                ));
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_NEWSEASON:
                $card_id = $args["card_id"];
                $this->ditchFromDiscard(
                    clienttranslate('New Season: ${player_name} ditches a ${card_name}'),
                    $card_id
                );
                $this->draw(
                    clienttranslate('New Season: ${player_name} draws a card from the supply'),
                    1,
                    false,
                    MARKET
                );
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_WHIRLIGIG:
                //get args
                $opponent_id = isset($args["opponent_id"]) ? $args["opponent_id"] : $this->getUniqueOpponentId();
                $card_ids = $args["card_ids"];
                //get the non-selected cards and selected cards
                $non_selected_cards = $this->cards->getCardsInLocation(HAND.$player_id);
                $selected_cards = $this->cards->getCardsFromLocation($card_ids, HAND.$player_id);
                foreach ($selected_cards as $card_id => $card) {
                    unset($non_selected_cards[$card_id]);
                }
                //discard all
                $nbr = count($selected_cards) + count($non_selected_cards);
                $this->discardMultiple(
                    clienttranslate('Whirligig: ${player_name} discards their hand'),
                    $player_id, 
                    $card_ids, 
                    $selected_cards, 
                    $non_selected_cards
                );
                //place all whirligig cards in the opponent's hand
                $player_cards = $this->cards->pickCardsForLocation($nbr, DECK.$player_id, HAND.$opponent_id);
                $opponent_cards = $this->cards->getCardsInLocation(HAND.$opponent_id);
                $this->notifyAllPlayers('whirligigShuffle', 
                    clienttranslate('Whirligig: shuffling ${player_nbr} cards from ${player_name}\'s deck with ${opponent_nbr} cards from ${opponent_name}\'s hand'), array(
                    "player_id" => $player_id,
                    "player_name" => $this->getActivePlayerName(),
                    "player_nbr" => count($player_cards),
                    "opponent_id" => $opponent_id,
                    "opponent_name" => $this->getPlayerNameById($opponent_id),
                    "opponent_nbr" => count($opponent_cards) - count($player_cards)
                ));
                //shuffle and proportionally redistribute the cards
                $player_nbr = count($player_cards);
                $player_cards = array();
                $player_card_ids = (array) array_rand($opponent_cards, $player_nbr);
                $this->cards->moveCards($player_card_ids, HAND.$player_id);
                foreach ($player_card_ids as $card_id) {
                    $player_cards[$card_id] = $opponent_cards[$card_id];
                    unset($opponent_cards[$card_id]);
                }
                //notify: give cards to the player
                $this->notifyAllPlayersWithPrivateArguments('whirligigTakeBack', clienttranslate('Whirligig: ${player_name} takes back ${nbr} cards'), array(
                    "player_id" => $player_id,
                    "player_name" => $this->getPlayerNameById($player_id),
                    "nbr" => count($player_cards),
                    "_private" => array(
                        "cards" => $player_cards
                    )
                ));
                //notify: give cards to the opponent
                $this->notifyAllPlayersWithPrivateArguments('whirligigTakeBack', clienttranslate('Whirligig: ${player_name} takes back ${nbr} cards'), array(
                    "player_id" => $opponent_id,
                    "player_name" => $this->getPlayerNameById($opponent_id),
                    "nbr" => count($opponent_cards),
                    "_private" => array(
                        "cards" => $opponent_cards
                    )
                ));
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_CHARM:
                $this->beginResolvingCard($technique_card_id);
                $stack_index = $this->cards->getNextStackIndex($player_id);
                $dbcards = $this->cards->pickCardsForLocation(1, DECK.MARKET, HAND.$player_id);
                if (count($dbcards) != 1) {
                    throw new BgaVisibleSystemException("Expected CT_CHARM to fizzle");
                }
                $dbcard = $dbcards[0];
                try {
                    //auto-bind a chameleon to all possible targets
                    $type_id = $this->getTypeId($dbcard);
                    if ($this->isChameleonTypeId($type_id)) {
                        $target_ids = $this->getChameleonTargets($dbcard["id"], $type_id);
                        $targets = $this->cards->getCards($target_ids);
                        foreach ($targets as $target) {
                            if ($this->getTypeId($target) == CT_WINTERISCOMING) {
                                //prioritize binding to CT_WINTERISCOMING
                                $targets = array($target['id'] => $target) + $targets; 
                                break;
                            }
                        }
                        $chameleon_failed = false;
                        foreach ($targets as $target) {
                            try {
                                $this->enforceValidStack($stack_index, array($target));
                                $target_type_id = $this->getTypeId($target);
                                $this->effects->insertModification($dbcard["id"], $type_id, $target_type_id, $target["id"]);
                                $this->notifyAllPlayers('message', clienttranslate('${player_name}\'s ${chameleon_card_name} automatically copies ${card_name}'), array(
                                    'chameleon_card_name' => $this->card_types[$type_id]['name'],
                                    'card_name' => $this->getCardName($dbcard),
                                    'player_name' => $this->getActivePlayerName()
                                ));
                                $chameleon_failed = false;
                                break;
                            }
                            catch(BgaUserException $e) {
                                $chameleon_failed = true;
                            }
                        }
                        if ($chameleon_failed) {
                            throw new BgaUserException("Charm is unable to find a buildable target for the drawn chameleon card");
                        }
                    }
                    //build with a regular card
                    $transition = $this->build($stack_index, $dbcards, null, DECK);
                    $this->gamestate->nextState($transition);
                }
                catch(BgaUserException $e) {
                    //building failed: ditch the card instead
                    $this->cards->moveCardOnTop($dbcard["id"], DISCARD.MARKET);
                    $this->notifyAllPlayers('ditchFromMarketDeck', clienttranslate('Charm: ${player_name} ditches ${card_name}'), array (
                        'player_name' => $this->getActivePlayerName(),
                        'card_name' => $this->getCardName($dbcard),
                        'card' => $dbcard
                    ));
                    $this->fullyResolveCard($player_id);
                }
                break;
            case CT_GAMBLE:
                $opponent_id = isset($args["opponent_id"]) ? $args["opponent_id"] : $this->getUniqueOpponentId();
                $nbr = $this->rollDie(
                    clienttranslate('Gamble: ${player_name} rolls ${die_icon}'),
                    ANIMALFOLK_OCELOTS,
                    $technique_card,
                );
                $player_cards = $this->cards->getCardsInLocation(HAND.$player_id);
                $opponent_cards = $this->cards->getCardsInLocation(HAND.$opponent_id);
                $nbr = min($nbr, count($player_cards), count($opponent_cards));

                if ($nbr > 0) {
                    //player -> opponent
                    for ($i = 0; $i < $nbr; $i++) { 
                        $player_card_id = array_rand($player_cards);
                        $player_card = $player_cards[$player_card_id];
                        unset($player_cards[$player_card_id]);
                        $this->cards->moveCard($player_card_id, HAND.$opponent_id);
                        $this->notifyAllPlayersWithPrivateArguments('playerHandToOpponentHand', clienttranslate('Gamble: ${player_name} takes a card from ${opponent_name}'), array(
                            "player_id" => $player_id,
                            "opponent_id" => $opponent_id,
                            "player_name" => $this->getPlayerNameById($player_id),
                            "opponent_name" => $this->getPlayerNameById($opponent_id),
                            "_private" => array(
                                "card" => $player_card,
                                "card_name" => $this->getCardName($player_card)
                            )
                        ), clienttranslate('Gamble: ${player_name} takes a ${card_name} from ${opponent_name}'));
                    }
                    //opponent -> player
                    for ($i = 0; $i < $nbr; $i++) { 
                        $opponent_card_id = array_rand($opponent_cards);
                        $opponent_card = $opponent_cards[$opponent_card_id];
                        unset($opponent_cards[$opponent_card_id]);
                        $this->cards->moveCard($opponent_card_id, HAND.$player_id);
                        $this->notifyAllPlayersWithPrivateArguments('opponentHandToPlayerHand', clienttranslate('Gamble: ${opponent_name} takes a card from ${player_name}'), array(
                            "player_id" => $player_id,
                            "opponent_id" => $opponent_id,
                            "player_name" => $this->getPlayerNameById($player_id),
                            "opponent_name" => $this->getPlayerNameById($opponent_id),
                            "_private" => array(
                                "card" => $opponent_card,
                                "card_name" => $this->getCardName($opponent_card)
                            )
                        ), clienttranslate('Gamble: ${opponent_name} takes a ${card_name} from ${player_name}'));
                    }
                }
                else {
                    $this->notifyAllPlayers('message', clienttranslate('Gamble: 0 cards were exchanged'), array());
                }
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_BLINDFOLD:
                $this->beginResolvingCard($technique_card_id);
                $opponent_id = isset($args["opponent_id"]) ? $args["opponent_id"] : $this->getUniqueOpponentId();
                $card_id = $args["card_id"];
                $card = $this->cards->getCardFromLocation($card_id, HAND.$player_id);
                $this->addChameleonBindings($chameleons_json, $card_id); //the opponent will be notified of this, but that's ok I guess (see issue #92)
                $this->setGameStateValue("opponent_id", $player_id); //player_id is the opponent_id from the opponent's perspective
                $this->setGameStateValue("card_id", $card_id);
                $this->nextStateChangeActivePlayer("trBlindfold", $opponent_id);
                break;
            case CT_TIRELESSTINKERER:
                $dbcard = $this->cards->getCardOnTop(DISCARD.$player_id);
                if ($dbcard == null) {
                    throw new BgaVisibleSystemException("TirelessTinkerer should have been fizzled");
                }
                $this->cards->moveCardOnTop($dbcard["id"], DECK.$player_id);
                $this->notifyAllPlayers('discardToDeck', clienttranslate('Tireless Tinkerer: ${player_name} places their ${card_name} on top of their deck'), array(
                    "player_id" => $player_id,
                    "player_name" => $this->getPlayerNameById($player_id),
                    "card_name" => $this->getCardName($dbcard),
                    "card" => $dbcard
                ));
                $this->fullyResolveCard($player_id, $technique_card);
                break;
            case CT_SAFETYPRECAUTION:
                $card_id = $args["card_id"];
                $stall_card = $this->cards->getCardFromLocation($card_id, STALL.$player_id);
                $this->cards->moveCard($technique_card_id, STALL.$player_id, $stall_card["location_arg"]);
                $this->cards->moveCard($card_id, HAND.$player_id);
                $this->notifyAllPlayers('swapHandStall', clienttranslate('Safety Precaution: ${player_name} swaps with a ${card_name}'), array(
                    "player_name" => $this->getActivePlayerName(),
                    "card_name" => $this->getCardName($stall_card),
                    "player_id" => $player_id,
                    "card" => $technique_card,
                    "stall_player_id" => $player_id,
                    "stall_card_id" => $card_id
                ));
                $this->gamestate->nextState("trSamePlayer");
                break;
            case CT_MAGNET:
                $this->beginResolvingCard($technique_card_id);
                $this->gamestate->nextState("trMagnet");
                break;
            default:
                $name = $this->getCardName($technique_card);
                throw new BgaVisibleSystemException("TECHNIQUE NOT IMPLEMENTED: '$name'");
        }
    }
    
    function actUsePassiveAbility($chameleons_json, $card_id, $args) {
        $this->inactUsePassiveAbility = true;
        $this->addChameleonBindings($chameleons_json, $card_id);
        $this->checkAction("actUsePassiveAbility");

        $player_id = $this->getActivePlayerId();
        $card = $this->cards->getCardFromLocation($card_id, HAND.$player_id);
        $type_id = $this->getTypeId($card);
        if ($this->card_types[$type_id]['has_ability'] == false) {
            throw new BgaUserException($this->_("That card has no ability!"));
        }

        if ($this->effects->isPassiveUsed($card) && ($type_id != CT_GOODOLDTIMES || $this->effects->getArg($card_id, $type_id) == null)) {
            throw new BgaUserException($this->_("That card's ability has already been used this turn!"));
        }

        switch($type_id) {
            case CT_GOODOLDTIMES:
                $dbcard = $this->ditchFromMarketDeck(clienttranslate('${player_name} uses their Good Old Times to ditch a card from the market deck'));
                $target_type_id = $this->getTypeId($dbcard);
                $chameleon_target_id = $dbcard["id"];
                $goodoldtimes_type_id = $this->getTypeId($card);
                if ($goodoldtimes_type_id == CT_GOODOLDTIMES) {
                    //if the chain was not broken by the ditch effect, immediately copy the new card
                    $this->effects->insertModification($card_id, CT_GOODOLDTIMES, $target_type_id, $chameleon_target_id);
                }
                break;
            case CT_MARKETDISCOVERY:
                $this->ditchFromMarketDeck(clienttranslate('${player_name} uses their Market Discovery to ditch a card from the market deck'));
                $this->effects->insertModification($card_id, CT_MARKETDISCOVERY);
                break;
            case CT_BOLDHAGGLER:
                $value = $this->rollDie(
                    clienttranslate('Bold Haggler: ${player_name} rolls ${die_icon} and adds ${die_label} to the card\'s value'),
                    ANIMALFOLK_OCELOTS,
                    $card
                );
                $this->effects->insertModification($card_id, CT_BOLDHAGGLER, $value);
                break;
            default:
                $name = $this->getCardName($card);
                throw new BgaVisibleSystemException("PASSIVE ABILITY NOT IMPLEMENTED: '$name'");
        }

        $this->gamestate->nextState("trPassiveAbility");
    }

    function actSpyglass($card_ids) {
        $this->checkAction("actSpyglass");
        $card_ids = $this->numberListToArray($card_ids);
        $player_id = $this->getActivePlayerId();

        //get the card to draw (first card from the card_ids array)
        if (count($card_ids) == 0) {
            throw new BgaUserException($this->_("You must select at least 1 card to place into your hand"));
        }
        $draw_card_id = array_pop($card_ids); //the last index is the card to draw
        $draw_card = $this->cards->getCardFromLocation($draw_card_id, LIMBO.$player_id);

        //get the non-selected cards and selected cards to discard
        $non_selected_cards = $this->cards->getCardsInLocation(LIMBO.$player_id);
        $selected_cards = $this->cards->getCardsFromLocation($card_ids, LIMBO.$player_id);
        foreach ($selected_cards as $card_id => $card) {
            unset($non_selected_cards[$card_id]);
        }
        unset($non_selected_cards[$draw_card_id]);

        //1. place the selected card into the hand
        $this->cards->moveCard($draw_card_id, HAND.$player_id);
        $this->notifyAllPlayersWithPrivateArguments('limboToHand', clienttranslate('Spyglass: ${player_name} places 1 card into their hand'), array(
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

        $this->fullyResolveCard($player_id);
    }

    function actSpecialOffer($card_ids) {
        $this->checkAction("actSpecialOffer");
        $card_ids = $this->numberListToArray($card_ids);
        $player_id = $this->getActivePlayerId();

        //get the card to draw (first card from the card_ids array)
        if (count($card_ids) == 0) {
            throw new BgaUserException($this->_("You must select at least 1 card to place into your hand"));
        }
        $draw_card_id = array_pop($card_ids); //the last index is the card to draw
        $draw_card = $this->cards->getCardFromLocation($draw_card_id, LIMBO.$player_id);

        //get the non-selected cards and selected cards to discard
        $non_selected_cards = $this->cards->getCardsInLocation(LIMBO.$player_id);
        $selected_cards = $this->cards->getCardsFromLocation($card_ids, LIMBO.$player_id);
        foreach ($selected_cards as $card_id => $card) {
            unset($non_selected_cards[$card_id]);
        }
        unset($non_selected_cards[$draw_card_id]);
        
        //1. place the selected card into the hand
        $this->cards->moveCard($draw_card_id, HAND.$player_id);
        $this->notifyAllPlayersWithPrivateArguments('limboToHand', clienttranslate('Special Offer: ${player_name} places 1 card into their hand'), array(
            "player_id" => $player_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "_private" => array(
                "card" => $draw_card
            )
        ));

        //2. ditch the rest
        $this->ditchMultiple(
            clienttranslate('Special Offer: ${player_name} ditches the other ${nbr} cards'),
            array_merge($non_selected_cards, $selected_cards), 
            true,
            $card_ids
        );

        $this->fullyResolveCard($player_id);
    }

    function actDirtyExchange($card_id) {
        $this->checkAction("actDirtyExchange");
        $player_id = $this->getActivePlayerId();
        $opponent_id = $this->getGameStateValue("opponent_id");

        $card = $this->cards->getCardFromLocation($card_id, HAND.$player_id);
        $this->cards->moveCard($card_id, HAND.$opponent_id);
        $this->notifyAllPlayersWithPrivateArguments('playerHandToOpponentHand', clienttranslate('Dirty Exchange: ${player_name} gives a card to ${opponent_name}'), array(
            "player_id" => $player_id,
            "opponent_id" => $opponent_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "opponent_name" => $this->getPlayerNameById($opponent_id),
            "_private" => array(
                "card" => $card,
                "card_name" => $this->getCardName($card)
            )
        ), clienttranslate('Dirty Exchange: ${player_name} gives a ${card_name} to ${opponent_name}')
        );

        $this->fullyResolveCard($player_id);
    }

    function actSabotage($card_id) {
        $this->checkAction("actSabotage");
        $player_id = $this->getActivePlayerId();
        $opponent_id = $this->getGameStateValue("opponent_id");

        $cards = $this->cards->getCardsInLocation(LIMBO.$player_id);
        foreach ($cards as $card) {
            if ($card["id"] == $card_id) {
                $this->ditch(clienttranslate('Sabotage: ${player_name} ditches ${opponent_name}\'s ${card_name}'), $card, true, array(
                    "opponent_name" => $this->getPlayerNameById($opponent_id)
                ));
            }
        }
        foreach ($cards as $card) {
            if ($card["id"] != $card_id) {
                $this->cards->moveCardOnTop($card["id"], DISCARD.$opponent_id);
                $this->notifyAllPlayers('discard', clienttranslate('Sabotage: ${player_name} discards ${opponent_name}\'s ${card_name}'), array(
                    "player_id" => $player_id,
                    "discard_id" => $opponent_id,
                    "from_limbo" => true,
                    "card" => $card,
                    "player_name" => $this->getPlayerNameById($player_id),
                    "opponent_name" => $this->getPlayerNameById($opponent_id),
                    "card_name" => $this->getCardName($card)
                ));
            }
        }
        $this->fullyResolveCard($player_id);
    }

    function actBlindfold($value) {
        $this->checkAction("actBlindfold");
        $player_id = $this->getActivePlayerId();
        $opponent_id = $this->getGameStateValue("opponent_id");
        $card_id = $this->getGameStateValue("card_id");
        $dbcard = $this->cards->getCardFromLocation($card_id, HAND.$opponent_id);
        $actual_value = $this->getValue($dbcard);
        if ($value == $actual_value) {
            //the guess was correct: discard the card
            $this->cards->moveCardOnTop($dbcard["id"], DISCARD.$opponent_id);
            $this->notifyAllPlayers('message', clienttranslate('Blindfold: ${player_name} correctly guessed ${value}'), array(
                "player_name" => $this->getPlayerNameById($player_id),
                "card_name" => $this->getCardName($dbcard),
                "value" => $value
            ));
            $this->notifyAllPlayers('discard', clienttranslate('Blindfold: ${player_name} discards their ${card_name}'), array(
                "player_id" => $opponent_id,
                "player_name" => $this->getPlayerNameById($opponent_id),
                "card" => $dbcard,
                "card_name" => $this->getCardName($dbcard)
            ));
            $this->fullyResolveCard($opponent_id);
        }
        else {
            //the guess was correct: modify the card value
            $this->notifyAllPlayers('message', clienttranslate('Blindfold: ${player_name} guessed ${value}, but the actual value was ${actual_value}'), array(
                "player_name" => $this->getPlayerNameById($player_id),
                "card_name" => $this->getCardName($dbcard),
                "value" => $value,
                "actual_value" => $actual_value
            ));
            $this->nextStateChangeActivePlayer("trBlindfoldIncorrectGuess", $opponent_id);
        }
    }

    function actBlindfoldDecideValue($value) {
        $this->checkAction("actBlindfoldDecideValue");
        $values = $this->getBaseEffectiveValues();
        if (!in_array($value, $values)) {
            throw new BgaVisibleSystemException("actBlindfoldDecideValue: value $value is not a valid value");
        }
        $player_id = $this->getActivePlayerId();
        $card_id = $this->getGameStateValue("card_id");
        $dbcard = $this->cards->getCardFromLocation($card_id, HAND.$player_id);
        $this->effects->insertModification($card_id, CT_BLINDFOLD, $value);
        $this->notifyAllPlayers('message', clienttranslate('Blindfold: ${player_name} sets their ${card_name}\'s value to ${value}'), array(
            "player_name" => $this->getPlayerNameById($player_id),
            "card_name" => $this->getCardName($dbcard),
            "value" => $value,
        ));
        $this->fullyResolveCard($player_id);
    }

    function actMagnet($card_id) {
        $this->checkAction("actMagnet");
        $player_id = $this->getActivePlayerId();
        $this->drawCardId(clienttranslate('Magnet: ${player_name} draws a card from their deck'), $card_id);
        $this->fullyResolveCard($player_id);
    }

    function actBuild($chameleons_json, $stack_card_ids, $stack_card_ids_from_discard) {
        $this->addChameleonBindings($chameleons_json, $stack_card_ids, $stack_card_ids_from_discard);
        $this->checkAction("actBuild");
        $stack_card_ids = $this->numberListToArray($stack_card_ids);
        $stack_card_ids_from_discard = $this->numberListToArray($stack_card_ids_from_discard);

        //Get information about the stack cards from hand
        $player_id = $this->getActivePlayerId();
        $stack_cards = $this->cards->getCardsFromLocation($stack_card_ids, HAND.$player_id);
        $stack_index = $this->cards->getNextStackIndex($player_id);
        $this->incStat(1, "actions_build", $player_id);

        //die(print_r($this->effects->cache));
        //die("type id ".$this->getTypeId($stack_cards[46]));

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

    function actWinterIsComingSkip() {
        $this->checkAction("actWinterIsComingSkip");
        $this->notifyAllPlayers('message', clienttranslate('Winter is Coming: ${player_name} skips building an additional stack.'), array(
            "player_name" => $this->getActivePlayerName()
        ));
        //Charm (free build action)
        $resolving_card_id = $this->getGameStateValue("resolvingCard");
        if ($resolving_card_id != -1) {
            $resolving_card = $this->cards->getCard($resolving_card_id);
            $resolving_type_id = $this->getTypeId($resolving_card);
            if ($resolving_type_id == CT_CHARM) {
                $this->fullyResolveCard($this->getActivePlayerId());
                return "trSamePlayer";
            }
        }
        $this->gamestate->nextState("trNextPlayer");
    }

    function actInventoryAction(string $card_ids) {
        $this->checkAction("actInventoryAction");
        $card_ids = $this->numberListToArray($card_ids);
        $player_id = $this->getActivePlayerId();
        $this->incStat(1, "actions_inventory", $player_id);

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

    function actPostCleanUpPhase($chameleons_json) {
        $this->checkAction("actPostCleanUpPhase");
        $chameleon_ids = array();
        foreach ($chameleons_json as $local_chain) {
            $target_type_ids = $local_chain["target_type_ids"];
            if ($target_type_ids > 0) {
                if ($target_type_ids[count($target_type_ids)-1] == CT_COOKIES) {
                    $chameleon_ids[] = $local_chain["card_id"];
                }
            }
        }
        $this->setGameStateValue("isPostCleanUpPhase", 1); //don't go into post clean-up phase again
        $this->addChameleonBindings($chameleons_json, implode(';', $chameleon_ids));
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

    //TODO: safely delete this
    // function argSelectedCardInMarket(){
    //     $card_id = $this->getGameStateValue("selectedCard");
    //     $card = $this->cards->getCard($card_id);
    //     $type_id = $card['type_arg'];
    //     return array(
    //         'i18n' => array('card_name'),
    //         'card_name' => $this->card_types[$type_id]['name'],
    //         'card_id' => $card['type_arg'],
    //         'cost' => $this->getCost($card),
    //         'pos' => $card['location_arg']
    //     );
    // }

    function argNumberOfPlayers() {
        $n = $this->getPlayersNumber();
        return array(
            'n' => $n,
            'n_plus_1' => $n + 1
        );
    }

    function argStackIndex() {
        $player_id = $this->getActivePlayerId();
        $stack_index = $this->cards->getNextStackIndex($player_id);
        return array(
            'stack_index' => $stack_index,
            'stack_index_plus_1' => $stack_index + 1
        );
    }

    function argOpponentName() {
        $opponent_id = $this->getGameStateValue("opponent_id");
        return array(
            'opponent_id' => $opponent_id,
            'opponent_name' => $this->getPlayerNameById($opponent_id)
        );
    }

    function argBlindfold() {
        //only the opponent gets the card_id
        $player_id = $this->getActivePlayerId();
        $opponent_id = $this->getGameStateValue("opponent_id");
        $card_id = $this->getGameStateValue("card_id");
        return array(
            'opponent_id' => $opponent_id,
            'opponent_name' => $this->getPlayerNameById($opponent_id),
            '_private' => array( 
                $opponent_id => array(
                    'card_id' => $card_id,
                )
            ),
            'possible_values' => $this->getPossibleEffectiveValues()
        );
    }

    function argBlindfoldDecideValue() {
        $card_id = $this->getGameStateValue("card_id");
        $dbcard = $this->cards->getCard($card_id);
        return array(
            'card_id' => $card_id,
            'card_name' => $this->getCardName($dbcard),
            'possible_values' => $this->getBaseEffectiveValues()
        );
    }

    function argMyDeckContent() {
        $_private = array();
        $player_id = $this->getActivePlayerId();
        $dbcards = $this->cards->getCardsInLocation(DECK.$player_id, null, 'location_arg');
        $_private[$player_id] = array('cards' => array_values($dbcards));
        return array('_private' => $_private);
    }

    function argDeckContent() {
        $_private = array();
        $players = $this->loadPlayersBasicInfos();
        foreach ($players as $player_id => $player) {
            $dbcards = array_values($this->cards->getCardsInLocation(DECK.$player_id, null, 'location_arg'));
            $_private[$player_id] = array('cards' => array_values($dbcards));
        }
        return array('_private' => $_private);
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Game state actions
////////////

    /*
        Here, you can create methods defined as "game state actions" (see "action" property in states.inc.php).
        The action method of state X is called everytime the current game state is set to X.
    */

    function stDeckSelection() {
        $this->gamestate->setAllPlayersMultiactive();
    }

    function stStartGame() {
        //Complete the deck selection and get the results
        $this->setGameStateValue("inDeckSelection", 0);
        $players = $this->loadPlayersBasicInfos();
        $animalfolk_ids = $this->deckSelection->getAnimalfolkIds();
        foreach ($animalfolk_ids as $animalfolk_id) {
            $this->initStat("table", "deck_selection_".$animalfolk_id, true);
            $this->notifyAllPlayers('deckSelectionResult', clienttranslate('${animalfolk_displayed_name} have been selected'), array(
                "animalfolk_displayed_name" => $this->getAnimalfolkDisplayedName($animalfolk_id),
                "animalfolk_id" => $animalfolk_id
            ));
        }
        $this->delay500ms(3);
        $this->notifyAllPlayers('startGame', '', array());

        //Create the market deck
        $cards = array();
        foreach ($this->card_types as $type_id => $card_type) {
            if (in_array($card_type['animalfolk_id'], $animalfolk_ids)) {
                $cards[] = array('type' => 'null', 'type_arg' => $type_id, 'nbr' => $card_type['nbr']);
            }
        }
        $this->cards->createCards($cards, DECK.MARKET);
        $this->cards->shuffle(DECK.MARKET);

        //Create the initial player decks
        $nbr_junk = 10 - count($animalfolk_ids);
        $player_cards = array(array('type' => 'null', 'type_arg' => 1, 'nbr' => $nbr_junk));
        foreach ($this->card_types as $type_id => $card_type) {
            if (in_array($card_type['animalfolk_id'], $animalfolk_ids) && $card_type['value'] == 1) {
                $player_cards[] = array('type' => 'null', 'type_arg' => $type_id, 'nbr' => 1);
            }
        }
        foreach ($players as $player_id => $player) {
            $this->cards->createCards($player_cards, DECK.$player_id);
            $this->cards->shuffle(DECK.$player_id);
        }

        //Each player draws an initial hand of 5 cards
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

        //Fill the initial market
        $this->refillMarket(true);

        //Activate the first player and start the game
        $next_player_id = $this->activeNextPlayer();
        $this->giveExtraTime($next_player_id);
        $this->incStat(1, "number_of_turns", $next_player_id);
        $this->gamestate->nextState("trStartGame");
    }

    function stCleanUpPhase() {
        //1. fill your hand to the maximum hand size
        $hasDrawnCards = $this->refillHand();

        //2. fill empty market slots
        $this->refillMarket(true);

        //3. check for post clean-up phase
        $isPostCleanUpPhase = $this->getGameStateValue("isPostCleanUpPhase");
        $usesPostCleanUp = array(CT_MARKETDISCOVERY, CT_GOODOLDTIMES);
        if ($hasDrawnCards || !$isPostCleanUpPhase) {
            $player_id = $this->getActivePlayerId();
            $dbcards = $this->cards->getCardsInLocation(HAND.$player_id);
            foreach ($dbcards as $card_id => $card) {
                $type_id = $this->getTypeId($card);
                if (in_array($type_id, $usesPostCleanUp) && !$this->effects->isPassiveUsed($card)) {
                    //the hand contains a card that uses the post clean up phase
                    $this->gamestate->nextState("trPostCleanUpPhase");
                    return;
                }
                $target_ids = $this->getChameleonTargets($card_id, $type_id);
                $dbtargets = $this->cards->getCards($target_ids);
                foreach ($dbtargets as $dbtarget) {
                    $target_type_id = $this->getTypeId($dbtarget);
                    $optional_cookies = ($target_type_id == CT_COOKIES && count($dbtargets) >= 2);
                    if ($optional_cookies || (in_array($target_type_id, $usesPostCleanUp) && !$this->effects->isPassiveUsed($card))) {
                        //the hand contains a chameleon card that can reach a card that uses the post clean up phase
                        $this->gamestate->nextState("trPostCleanUpPhase");
                        return; 
                    }
                }
            }
        }
        $this->setGameStateValue("isPostCleanUpPhase", 0);

        //4. expire all effects, except global effects with their corresponding card in a schedule
        $schedule_card_ids = array();
        $players = $this->loadPlayersBasicInfos();
        foreach($players as $player_id => $player) {
            $schedule_dbcards = $this->cards->getCardsInLocation(SCHEDULE.$player_id);
            foreach ($schedule_dbcards as $dbcard) {
                $schedule_card_ids[] = $dbcard["id"];
            }
        }
        $this->effects->expireAllExcept($schedule_card_ids);

        //5. activate the next player
        $next_player_id = $this->activeNextPlayer();
        $this->giveExtraTime($next_player_id);
        $this->incStat(1, "number_of_turns", $next_player_id);
        $this->gamestate->nextState("trNextPlayer");
    }

    function stChangeActivePlayer() {
        $player_id = $this->getGameStateValue("changeActivePlayer_player_id");
        $state_id = $this->getGameStateValue("changeActivePlayer_state_id");
        $this->gamestate->changeActivePlayer($player_id);
        $this->giveExtraTime($player_id);
        $this->gamestate->jumpToState($state_id);
    }

    function stFinalStatistics() {
        $players = $this->loadPlayersBasicInfos();
        foreach($players as $player_id => $player) {
            $nbr = $this->cards->countCardsInLocation(HAND.$player_id);
            $nbr += $this->cards->countCardsInLocation(DISCARD.$player_id);
            $nbr += $this->cards->countCardsInLocation(DECK.$player_id);
            $this->setStat($nbr, "cards_remaining", $player_id);
        }
        $this->gamestate->nextState("trGameEnd");
    }

    function stSpyglass() {
        $nbr = $this->draw(clienttranslate('Spyglass: ${player_name} draws 3 card'), 3, true);
        if ($nbr == 0) {
            //skyglass has no effect
            $this->fullyResolveCard($this->getActivePlayerId());
        }
    }

    function stSpecialOffer() {
        $nbr = $this->draw(clienttranslate('Special Offer: ${player_name} draws 3 card'), 3, true, MARKET);
        if ($nbr == 0) {
            //special offer has no effect
            $this->fullyResolveCard($this->getActivePlayerId());
        }
    }
    
    function stDirtyExchange() {
        $player_id = $this->getActivePlayerId();
        $opponent_id = $this->getGameStateValue("opponent_id");
        $cards = $this->cards->getCardsInLocation(HAND.$opponent_id);
        if (count($cards) == 0) {
            //dirty exchange has no effect
            $this->notifyAllPlayers('message', clienttranslate('Dirty Exchange: ${player_name} tried to take a card from ${opponent_name}, but their hand was empty'), array(
                "player_name" => $this->getPlayerNameById($player_id),
                "opponent_name" => $this->getPlayerNameById($opponent_id)
            ));
            return;
        }
        $card_id = array_rand($cards);
        $card = $cards[$card_id];
        $this->cards->moveCard($card_id, HAND.$player_id);
        $this->notifyAllPlayersWithPrivateArguments('opponentHandToPlayerHand', clienttranslate('Dirty Exchange: ${player_name} takes a card from ${opponent_name}'), array(
            "player_id" => $player_id,
            "opponent_id" => $opponent_id,
            "player_name" => $this->getPlayerNameById($player_id),
            "opponent_name" => $this->getPlayerNameById($opponent_id),
            "_private" => array(
                "card" => $card,
                "card_name" => $this->getCardName($card)
            )
        ), clienttranslate('Dirty Exchange: ${player_name} takes a ${card_name} from ${opponent_name}'));
    }

    function stSabotage() {
        $opponent_id = $this->getGameStateValue("opponent_id");
        $nbr = $this->draw(clienttranslate('Sabotage: ${player_name} draws 2 cards from ${opponent_name}\'s deck'), 2, true, $opponent_id);
        if ($nbr == 0) {
            //sabotage has no effect
            $this->fullyResolveCard($this->getActivePlayerId());
        }
    }

    function stBlindfold() {
        $opponent_id = $this->getGameStateValue("opponent_id");
        $card_id = $this->getGameStateValue("card_id");
        $dbcard = $this->cards->getCard($card_id);
        $this->notifyAllPlayersWithPrivateArguments('selectBlindfold', 
            clienttranslate('Blindfold: ${player_name} secretly selected a card'), array(
            "player_id" => $opponent_id,
            "player_name" => $this->getPlayerNameById($opponent_id),
            "_private" => array(
                "card_id" => $card_id,
                "card_name" =>$this->getCardName($dbcard)
            )
        ), clienttranslate('Blindfold: ${player_name} secretly selected ${card_name}'));
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
                case 'blindfold':
                    $values = $this->getPossibleEffectiveValues();
                    $key = array_rand($values);
                    $value = $values[$key];
                    $this->actBlindfold($value);
                    break;
                case 'tasters':
                    throw new BgaVisibleSystemException("NotImplementedException: 'zombieTurn' for 'tasters'");
                    break;
                case 'postCleanUpPhase':
                    $this->actPostCleanUpPhase(array());
                    break;
                default:
                    //By default, zombies will jump to the "cleanUpPhase" (state 41) when given the chance.
                    $this->gamestate->jumpToState(41);
                	break;
            }
            return;
        }

        if ($state['type'] === "multipleactiveplayer") {
            // Make sure player is in a non blocking status for role turn
            $this->gamestate->setPlayerNonMultiactive($active_player, '');
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
