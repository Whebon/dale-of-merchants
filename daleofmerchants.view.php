<?php
/**
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * DaleOfMerchants implementation : © Bart Swinkels bart-man99@hotmail.com
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * daleofmerchants.view.php
 *
 * This is your "view" file.
 *
 * The method "build_page" below is called each time the game interface is displayed to a player, ie:
 * _ when the game starts
 * _ when a player refreshes the game page (F5)
 *
 * "build_page" method allows you to dynamically modify the HTML generated for the game interface. In
 * particular, you can set here the values of variables elements defined in daleofmerchants_daleofmerchants.tpl (elements
 * like {MY_VARIABLE_ELEMENT}), and insert HTML block elements (also defined in your HTML template file)
 *
 * Note: if the HTML of your game interface is always the same, you don't have to place anything here.
 *
 */
  
require_once( APP_BASE_PATH."view/common/game.view.php" );
  
class view_daleofmerchants_daleofmerchants extends game_view
{
    protected function getGameName()
    {
        // Used for translations and stuff. Please do not modify.
        return "daleofmerchants";
    }
    
  	function build_page( $viewArgs )
  	{		
  	    // Get players & players number
        /** @var mixed $game */
        $players = $game->loadPlayersBasicInfosInclMono();
        $template = $this->getGameName() . "_" . $this->getGameName();

        // Your stall and schedule
        $current_player = $this->getCurrentPlayerId();
        $this->page->begin_block($template, "stall");
        if (isset($players[$current_player])) {
            $this->page->insert_block("stall", array (
                "PLAYER_ID" => $current_player,
                "PLAYER_NAME_POSSESSIVE" => clienttranslate("Your"),
                "PLAYER_COLOR" => $players[$current_player]['player_color'],
                "SCHEDULE" => "Schedule",
                "STORED_CARDS" => "Stored Cards"
            ));
        }

        // Other players' stalls and schedules
        foreach ($players as $player) {
            if ($player['player_id'] != $current_player) {
                $this->page->insert_block("stall", array(
                    "PLAYER_ID" => $player['player_id'],
                    "PLAYER_NAME_POSSESSIVE" => $player['player_name']."'s",
                    "PLAYER_COLOR" => $player['player_color'],
                    "SCHEDULE" => "Schedule",
                    "STORED_CARDS" => "Stored Cards"
                ));
            }
        }

        //Filter titles
        $this->tpl['RESET_FILTERS'] = clienttranslate("Reset"); //clienttranslate("Reset Filters");
        $this->tpl['FILTER_DECKS'] = clienttranslate("Filter Decks");
        $this->tpl['COMPLEXITY'] = clienttranslate("Complexity");
        $this->tpl['INTERACTIVITY'] = clienttranslate("Interactivity");
        $this->tpl['NASTINESS'] = clienttranslate("Nastiness");
        $this->tpl['RANDOMNESS'] = clienttranslate("Randomness");
        $this->tpl['GAME'] = clienttranslate("Game");
        $this->tpl['PICK_RANDOM'] = clienttranslate("Pick random from filtered");
        $this->tpl['TITLE_UNAVAILABLE_DECKS'] = clienttranslate("Physical games have even more decks available");

        //Filter toggles
        $this->tpl['NONE'] = clienttranslate("None");
        $this->tpl['LOW'] = clienttranslate("Low");
        $this->tpl['MEDIUM'] = clienttranslate("Medium");
        $this->tpl['HIGH'] = clienttranslate("High");
        $this->tpl['DECK_SELECTION_WARNING'] = clienttranslate("Choose one to display decks.");

        //Other variables
        // $this->tpl['YOUR_HAND'] = clienttranslate("Your hand");
        $this->tpl['MARKET'] = clienttranslate("Market");
        $this->tpl['PLAY_AREA'] = clienttranslate("play area");
        $this->tpl['STALL'] = clienttranslate("Stall");

        /*
        
        // Examples: set the value of some element defined in your tpl file like this: {MY_VARIABLE_ELEMENT}

        // Display a specific number / string
        $this->tpl['MY_VARIABLE_ELEMENT'] = $number_to_display;

        // Display a string to be translated in all languages: 
        $this->tpl['MY_VARIABLE_ELEMENT'] = clienttranslate("A string to be translated");

        // Display some HTML content of your own:
        $this->tpl['MY_VARIABLE_ELEMENT'] = $this->raw( $some_html_code );
        
        */
        
        /*
        
        // Example: display a specific HTML block for each player in this game.
        // (note: the block is defined in your .tpl file like this:
        //      <!-- BEGIN myblock --> 
        //          ... my HTML code ...
        //      <!-- END myblock --> 
        

        $this->page->begin_block( "daleofmerchants_daleofmerchants", "myblock" );
        foreach( $players as $player )
        {
            $this->page->insert_block( "myblock", array( 
                                                    "PLAYER_NAME" => $player['player_name'],
                                                    "SOME_VARIABLE" => $some_value
                                                    ...
                                                     ) );
        }
        
        */



        /*********** Do not change anything below this line  ************/
  	}
}
