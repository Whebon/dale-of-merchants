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
 * dale.view.php
 *
 * This is your "view" file.
 *
 * The method "build_page" below is called each time the game interface is displayed to a player, ie:
 * _ when the game starts
 * _ when a player refreshes the game page (F5)
 *
 * "build_page" method allows you to dynamically modify the HTML generated for the game interface. In
 * particular, you can set here the values of variables elements defined in dale_dale.tpl (elements
 * like {MY_VARIABLE_ELEMENT}), and insert HTML block elements (also defined in your HTML template file)
 *
 * Note: if the HTML of your game interface is always the same, you don't have to place anything here.
 *
 */
  
require_once( APP_BASE_PATH."view/common/game.view.php" );
  
class view_dale_dale extends game_view
{
    protected function getGameName()
    {
        // Used for translations and stuff. Please do not modify.
        return "dale";
    }
    
  	function build_page( $viewArgs )
  	{		
  	    // Get players & players number
        $players = $this->game->loadPlayersBasicInfos();
        $players_nbr = count( $players );
        $template = $this->getGameName() . "_" . $this->getGameName();

        // Your stall
        global $g_user;
        $current_player = $g_user->get_id();
        $this->page->begin_block($template, "stall");
        $this->page->insert_block("stall", array (
            "PLAYER_ID" => $current_player,
            "PLAYER_NAME_POSSESSIVE" => $this->_("Your"),
            "PLAYER_COLOR" => $players[$current_player]['player_color']
        ));

        // Other players' stalls
        foreach ($players as $player) {
            if ($player['player_id'] != $current_player) {
                $this->page->insert_block("stall", array(
                    "PLAYER_ID" => $player['player_id'],
                    "PLAYER_NAME_POSSESSIVE" => $player['player_name']."'s",
                    "PLAYER_COLOR" => $player['player_color']
                ));
            }
        }

        //Other variables
        $this->tpl['MARKET'] = $this->_("Market");
        $this->tpl['YOUR_HAND'] = $this->_("Your Hand");
        $this->tpl['BOARD'] = $this->_("Board");
        $this->tpl['CURRENT_PLAYER_COLOR'] = $players[$current_player]['player_color'];

        /*
        
        // Examples: set the value of some element defined in your tpl file like this: {MY_VARIABLE_ELEMENT}

        // Display a specific number / string
        $this->tpl['MY_VARIABLE_ELEMENT'] = $number_to_display;

        // Display a string to be translated in all languages: 
        $this->tpl['MY_VARIABLE_ELEMENT'] = $this->_("A string to be translated");

        // Display some HTML content of your own:
        $this->tpl['MY_VARIABLE_ELEMENT'] = $this->raw( $some_html_code );
        
        */
        
        /*
        
        // Example: display a specific HTML block for each player in this game.
        // (note: the block is defined in your .tpl file like this:
        //      <!-- BEGIN myblock --> 
        //          ... my HTML code ...
        //      <!-- END myblock --> 
        

        $this->page->begin_block( "dale_dale", "myblock" );
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
