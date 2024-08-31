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
 * material.inc.php
 *
 * Dale game material description
 *
 * Here, you can describe the material of your game with PHP variables.
 *   
 * This file is loaded in your game logic class constructor, ie these variables
 * are available everywhere in your game logic code.
 *
 */

 //define all Card Types (CT)
if (!defined('CT_CARDBACK')) {
  define('CT_CARDBACK', 0);
  define('CT_JUNK', 1);
  define('CT_JUNK2', 2);
  define('CT_JUNK3', 3);
  define('CT_JUNK4', 4);
  define('CT_JUNK5', 5);
  define('CT_SWIFTBROKER', 6);
  define('CT_COOKIES', 7);
  define('CT_SHATTEREDRELIC', 8);
  define('CT_SPYGLASS', 9);
  define('CT_FLASHYSHOW', 10);
  define('CT_FAVORITETOY', 11);
  define('CT_LOYALPARTNER', 12);
  define('CT_PREPAIDGOOD', 13);
  define('CT_ESSENTIALPURCHASE', 14);
  define('CT_MARKETDISCOVERY', 15);
  define('CT_SPECIALOFFER', 16);
  define('CT_STOCKCLEARANCE', 17);
  define('CT_WILYFELLOW', 18);
  define('CT_NUISANCE', 19);
  define('CT_ROTTENFOOD', 20);
  define('CT_DIRTYEXCHANGE', 21);
  define('CT_SABOTAGE', 22);
  define('CT_TREASUREHUNTER', 23);
  define('CT_STASHINGVENDOR', 24);
  define('CT_EMPTYCHEST', 25);
  define('CT_NOSTALGICITEM', 26);
  define('CT_ACORN', 27);
  define('CT_ACCORDION', 28);
  define('CT_WINTERISCOMING', 29);
  define('CT_BOLDHAGGLER', 30);
  define('CT_NEWSEASON', 31);
  define('CT_WHIRLIGIG', 32);
  define('CT_CHARM', 33);
  define('CT_GAMBLE', 34);
  define('CT_BLINDFOLD', 35);
  define('CT_FLEXIBLESHOPKEEPER', 36);
  define('CT_REFLECTION', 37);
  define('CT_GOODOLDTIMES', 38);
  define('CT_GIFTVOUCHER', 39);
  define('CT_TRENDSETTING', 40);
  define('CT_SEEINGDOUBLES', 41);
}

//define all animalfolk
if (!defined('ANIMALFOLK_MACAWS')) {
    define('ANIMALFOLK_NONE', 0);
    define('ANIMALFOLK_MACAWS', 1);
    define('ANIMALFOLK_PANDAS', 2);
    define('ANIMALFOLK_RACCOONS', 3);
    define('ANIMALFOLK_SQUIRRELS', 4);
    define('ANIMALFOLK_OCELOTS', 5);
    define('ANIMALFOLK_CHAMELEONS', 6);
}

$this->card_types = array(
    0 => array(
        'type_id' => 0,
        'name' => clienttranslate("Cardback"),
        'text' => clienttranslate("No Text."),
        'type_displayed' => clienttranslate("Rubbish"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 0,
        'nbr' => 0,
        'animalfolk_displayed' => "",
        'animalfolk_id' => 0
    ),
    1 => array(
        'type_id' => 1,
        'name' => clienttranslate("Junk"),
        'text' => clienttranslate("This card cannot usually be included in a stack."),
        'type_displayed' => clienttranslate("Rubbish"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => "",
        'animalfolk_id' => 0
    ),
    2 => array(
        'type_id' => 2,
        'name' => clienttranslate("Junk"),
        'text' => clienttranslate("This card cannot usually be included in a stack."),
        'type_displayed' => clienttranslate("Rubbish"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => "",
        'animalfolk_id' => 0
    ),
    3 => array(
        'type_id' => 3,
        'name' => clienttranslate("Junk"),
        'text' => clienttranslate("This card cannot usually be included in a stack."),
        'type_displayed' => clienttranslate("Rubbish"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => "",
        'animalfolk_id' => 0
    ),
    4 => array(
        'type_id' => 4,
        'name' => clienttranslate("Junk"),
        'text' => clienttranslate("This card cannot usually be included in a stack."),
        'type_displayed' => clienttranslate("Rubbish"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => "",
        'animalfolk_id' => 0
    ),
    5 => array(
        'type_id' => 5,
        'name' => clienttranslate("Junk"),
        'text' => clienttranslate("This card cannot usually be included in a stack."),
        'type_displayed' => clienttranslate("Rubbish"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => "",
        'animalfolk_id' => 0
    ),
    6 => array(
        'type_id' => 6,
        'name' => clienttranslate("Swift Broker"),
        'text' => clienttranslate("Discard your hand. Draw as many cards from your deck and place them into your hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    7 => array(
        'type_id' => 7,
        'name' => clienttranslate("Cookies"),
        'text' => clienttranslate("Your hand size is increased by 1."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    8 => array(
        'type_id' => 8,
        'name' => clienttranslate("Shattered Relic"),
        'text' => clienttranslate("Throw away a card from your hand. Draw a card from your deck and place it into your hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    9 => array(
        'type_id' => 9,
        'name' => clienttranslate("Spyglass"),
        'text' => clienttranslate("Draw 3 cards from your deck. Place 1 into your hand and the rest back in any order."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    10 => array(
        'type_id' => 10,
        'name' => clienttranslate("Flashy Show"),
        'text' => clienttranslate("All cards you use get +1 to their value for this turn."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    11 => array(
        'type_id' => 11,
        'name' => clienttranslate("Favorite Toy"),
        'text' => clienttranslate("Place the top card from your discard pile into your hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    12 => array(
        'type_id' => 12,
        'name' => clienttranslate("Loyal Partner"),
        'text' => clienttranslate("Throw away all cards from the market. Fill the market by drawing cards from the market."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    13 => array(
        'type_id' => 13,
        'name' => clienttranslate("Prepaid Good"),
        'text' => clienttranslate("Choose a card from the market and place it into your hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    14 => array(
        'type_id' => 14,
        'name' => clienttranslate("Essential Purchase"),
        'text' => clienttranslate("When you purchase this card, throw away up to 3 junk cards used in the purchase."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    15 => array(
        'type_id' => 15,
        'name' => clienttranslate("Market Discovery"),
        'text' => clienttranslate("You may throw away 1 card from the market deck once in your turn.  When you use this card to purchase, you may purchase the top card of the market's discard pile."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    16 => array(
        'type_id' => 16,
        'name' => clienttranslate("Special Offer"),
        'text' => clienttranslate("Draw 3 cards from the market deck. Place 1 into your hand and throw away the rest."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    17 => array(
        'type_id' => 17,
        'name' => clienttranslate("Stock Clearance"),
        'text' => clienttranslate("When you purchase with this card, you may include junk cards."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    18 => array(
        'type_id' => 18,
        'name' => clienttranslate("Wily Fellow"),
        'text' => clienttranslate("Swap your discard pile and deck. Shuffle your new deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    19 => array(
        'type_id' => 19,
        'name' => clienttranslate("Nuisance"),
        'text' => clienttranslate("Discard 1 random card from up to 2 other player's hands."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    20 => array(
        'type_id' => 20,
        'name' => clienttranslate("Rotten Food"),
        'text' => clienttranslate("Place a card from your hand on top of another player's deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    21 => array(
        'type_id' => 21,
        'name' => clienttranslate("Dirty Exchange"),
        'text' => clienttranslate("Take 1 random card from another player's hand and place it into your hand. Then choose 1 card from your hand to give back."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    22 => array(
        'type_id' => 22,
        'name' => clienttranslate("Sabotage"),
        'text' => clienttranslate("Draw 2 cards from another player's deck. Throw away 1 and place the other on that player's discard pile"),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    23 => array(
        'type_id' => 23,
        'name' => clienttranslate("Treasure Hunter"),
        'text' => clienttranslate("Take the top card from another player's discard pile and place it into your hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    24 => array(
        'type_id' => 24,
        'name' => clienttranslate("Stashing vendor"),
        'text' => clienttranslate("When you build a stack with this card, you may include junk cards."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    25 => array(
        'type_id' => 25,
        'name' => clienttranslate("Empty Chest"),
        'text' => clienttranslate("When you build a stack with this card, you may include cards from any animalfolk sets."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    26 => array(
        'type_id' => 26,
        'name' => clienttranslate("Nostalgic Item"),
        'text' => clienttranslate("When you build a stack with this card, you may include a junk card or a card from any animalfolk set from your discard pile."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    27 => array(
        'type_id' => 27,
        'name' => clienttranslate("Acorn"),
        'text' => clienttranslate("Swap this card with any card from an opponent's stall. Place the new card into your hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    28 => array(
        'type_id' => 28,
        'name' => clienttranslate("Accordion"),
        'text' => clienttranslate("When you build a stack with this card, you may add or substract 1 from this card's value for this turn."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    29 => array(
        'type_id' => 29,
        'name' => clienttranslate("Winter is coming"),
        'text' => clienttranslate("When you build a stack with this card, you may immediately build an additional stack."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    30 => array(
        'type_id' => 30,
        'name' => clienttranslate("Bold Haggler"),
        'text' => clienttranslate("You may roll <OCELOT_DICE> once in your turn and add the rolled value to this card's value for this turn."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    31 => array(
        'type_id' => 31,
        'name' => clienttranslate("New Season"),
        'text' => clienttranslate("Search your discard pile and throw away an animalfolk card from there. If you do so, draw 1 card from the market deck and place it into your hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    32 => array(
        'type_id' => 32,
        'name' => clienttranslate("Whirligig"),
        'text' => clienttranslate("Discard your hand. Draw as many cards from your deck and shuffle them with another player's hand. Randomly give both players their original number of cards back."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    33 => array(
        'type_id' => 33,
        'name' => clienttranslate("Charm"),
        'text' => clienttranslate("Draw 1 card from the market deck. If you can build a stack using only that card, do so. Otherwise throw away the card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    34 => array(
        'type_id' => 34,
        'name' => clienttranslate("Gamble"),
        'text' => clienttranslate("Choose another player. Roll <OCELOT_DICE> and randomly exchange that many cards between your hand and the hand of the chosen player."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    35 => array(
        'type_id' => 35,
        'name' => clienttranslate("Blindfold"),
        'text' => clienttranslate("Choose a card from your hand. If an opponent you choose guesses the card's value, discard it. Otherwise you decide its value (1-5) for this turn."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    36 => array(
        'type_id' => 36,
        'name' => clienttranslate("Flexible Shopkeeper"),
        'text' => clienttranslate("This card is a copy of any card in the rightmost stack in your stall."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    37 => array(
        'type_id' => 37,
        'name' => clienttranslate("Reflection"),
        'text' => clienttranslate("This card is a copy of the top card of another player's discard pile."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    38 => array(
        'type_id' => 38,
        'name' => clienttranslate("Good Old Times"),
        'text' => clienttranslate("You may throw away 1 card from the market deck once in your turn. This card is a copy of the top card of the market's discard pile."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    39 => array(
        'type_id' => 39,
        'name' => clienttranslate("Gift Voucher"),
        'text' => clienttranslate("Swap this card with any card in the market. Place the new card into your hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    40 => array(
        'type_id' => 40,
        'name' => clienttranslate("Trendsetting"),
        'text' => clienttranslate("This card is a copy of any card in the market."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    41 => array(
        'type_id' => 41,
        'name' => clienttranslate("Seeing Doubles"),
        'text' => clienttranslate("This card is a copy of another card in your hand. Show the copied card whenever you show this card."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    )
  );
  
  