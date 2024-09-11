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
    //Junk
    define('CT_CARDBACK', 0);
    define('CT_JUNK', 1);
    define('CT_JUNK2', 2);
    define('CT_JUNK3', 3);
    define('CT_JUNK4', 4);
    define('CT_JUNK5', 5);

    //DoM1
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

    //DoM2
    define('CT_TIRELESSTINKERER', 42);
    define('CT_CALCULATIONS', 43);
    define('CT_SAFETYPRECAUTION', 44);
    define('CT_MAGNET', 45);
    define('CT_DANGEROUSTEST', 46);
    define('CT_GLUE', 47);
    define('CT_STEADYACHIEVER', 48);
    define('CT_SHOPPINGJOURNEY', 49);
    define('CT_HOUSECLEANING', 50);
    define('CT_SIESTA', 51);
    define('CT_LUNCHBREAK', 52);
    define('CT_IRONING', 53);
    define('CT_LITTLEVILLAIN', 54);
    define('CT_SCARYGUNFIGHT', 55);
    define('CT_NIGHTSHIFT', 56);
    define('CT_RUTHLESSCOMPETITION', 57);
    define('CT_NASTYTHREAT', 58);
    define('CT_LOSTSHIPMENTS', 59);
    define('CT_CUNNINGNEIGHBOUR', 60);
    define('CT_CHEER', 61);
    define('CT_RAFFLE', 62);
    define('CT_CHARITY', 63);
    define('CT_TASTERS', 64);
    define('CT_RUMOURS', 65);
    define('CT_DARINGADVENTURER', 66);
    define('CT_RAREARTEFACT', 67);
    define('CT_SWANK', 68);
    define('CT_RISKYBUSINESS', 69);
    define('CT_NATURALSURVIVOR', 70);
    define('CT_SOFA', 71);
    define('CT_WISESPY', 72);
    define('CT_ANCIENTKNOWLEDGE', 73);
    define('CT_QUALITYINSPECTION', 74);
    define('CT_BINOCULARS', 75);
    define('CT_BALANCING', 76);
    define('CT_EXTRAREMARKS', 77);

    //Beavers
    define('CT_MASTERBUILDER', 78);
    define('CT_SNACK', 79);
    define('CT_WINDOFCHANGE', 80);
    define('CT_OVERTIME', 81);
    define('CT_ORDERINCHAOS', 82);
    define('CT_PRACTICE', 83);

    //DoM3
    define('CT_RIGOROUSCHRONICLER', 84);
    define('CT_REFRESHINGDRINK', 85);
    define('CT_DUPLICATEENTRY', 86);
    define('CT_HISTORYLESSON', 87);
    define('CT_CULTURALPRESERVATION', 88);
    define('CT_SLICEOFLIFE', 89);
    define('CT_VORACIOUSCONSUMER', 90);
    define('CT_DELIGHTFULSURPRISE', 91);
    define('CT_FORTUNATEUPGRADE', 92);
    define('CT_REPLACEMENT', 93);
    define('CT_FASHIONHINT', 94);
    define('CT_ROYALPRIVILEGE', 95);
    define('CT_POMPOUSPROFESSIONAL', 96);
    define('CT_BRIBE', 97);
    define('CT_BURGLARY', 98);
    define('CT_GRASP', 99);
    define('CT_PERISCOPE', 100);
    define('CT_SUDDENNAP', 101);
    define('CT_CAREFREESWAPPER', 102);
    define('CT_BARGAINSEEKER', 103);
    define('CT_DELICACY', 104);
    define('CT_UMBRELLA', 105);
    define('CT_VELOCIPEDE', 106);
    define('CT_MATCHINGCOLOURS', 107);
    define('CT_ARCANESCHOLAR', 108);
    define('CT_BAROMETER', 109);
    define('CT_BADOMEN', 110);
    define('CT_FESTIVAL', 111);
    define('CT_CELESTIALGUIDANCE', 112);
    define('CT_CALENDAR', 113);
    define('CT_CLEVERGUARDIAN', 114);
    define('CT_BARRICADE', 115);
    define('CT_WHEELBARROW', 116);
    define('CT_VIGILANCE', 117);
    define('CT_SUPPLYDEPOT', 118);
    define('CT_TACTICALMEASUREMENT', 119);

    //DoMC
    define('CT_RESOURCEFULALLY', 120);
    define('CT_ICETRADE', 121);
    define('CT_TRAVELINGEQUIPMENT', 122);
    define('CT_STOVE', 123);
    define('CT_FISHING', 124);
    define('CT_PRACTICALVALUES', 125);
    define('CT_AVIDFINANCIER', 126);
    define('CT_GREED', 127);
    define('CT_GOLDENOPPORTUNITY', 128);
    define('CT_CACHE', 129);
    define('CT_DISPLAYOFPOWER', 130);
    define('CT_SAFEPROFITS', 131);
    define('CT_IMPULSIVEVISIONARY', 132);
    define('CT_COLLECTORSDESIRE', 133);
    define('CT_GROUNDBREAKINGIDEA', 134);
    define('CT_INSPIRATION', 135);
    define('CT_INSIGHT', 136);
    define('CT_PERFECTMOVE', 137);
    define('CT_SHREWDTRICKSTER', 138);
    define('CT_DISRUPTIVESPEECH', 139);
    define('CT_TITFORTAT', 140);
    define('CT_SHAMELESSRUMMAGE', 141);
    define('CT_PUBLICHUMILIATION', 142);
    define('CT_EQUALITY', 143);
    define('CT_FUMBLINGDREAMER', 144);
    define('CT_COFFEEGRINDER', 145);
    define('CT_ACCIDENT', 146);
    define('CT_LOOSEMARBLES', 147);
    define('CT_ANOTHERFINEMESS', 148);
    define('CT_FRESHSTART', 149);
    define('CT_MEDDLINGMARKETEER', 150);
    define('CT_GOODWILLPRESENTS', 151);
    define('CT_ALTERNATIVEPLAN', 152);
    define('CT_ANCHOR', 153);
    define('CT_MANUFACTUREDJOY', 154);
    define('CT_SHAKYENTERPRISE', 155);
    define('CT_DRAMATICROMANTIC', 156);
    define('CT_BOUQUETS', 157);
    define('CT_SELECTINGCONTRACTS', 158);
    define('CT_SERENADE', 159);
    define('CT_SPINNINGWHEEL', 160);
    define('CT_INHERITANCE', 161);
    define('CT_SNEAKYSCOUT', 162);
    define('CT_FALSEALARM', 163);
    define('CT_HEROICDEED', 164);
    define('CT_SECRETMISSION', 165);
    define('CT_CAPTURE', 166);
    define('CT_PROVOCATION', 167);
}

//define all animalfolk
if (!defined('ANIMALFOLK_MACAWS')) {
    //Non-animalfolk
    define('ANIMALFOLK_NONE', 0);

    //DoM1
    define('ANIMALFOLK_MACAWS', 1);
    define('ANIMALFOLK_PANDAS', 2);
    define('ANIMALFOLK_RACCOONS', 3);
    define('ANIMALFOLK_SQUIRRELS', 4);
    define('ANIMALFOLK_OCELOTS', 5);
    define('ANIMALFOLK_CHAMELEONS', 6);

    //DoM2
    define('ANIMALFOLK_PLATYPUSES', 7);
    define('ANIMALFOLK_SLOTHS', 8);
    define('ANIMALFOLK_CROCODILES', 9);
    define('ANIMALFOLK_FOXES', 10);
    define('ANIMALFOLK_POLECATS', 11);
    define('ANIMALFOLK_OWLS', 12);

    //Beavers
    define('ANIMALFOLK_BEAVERS', 13);

    //DoM3
    define('ANIMALFOLK_DESERTMONITORS', 14);
    define('ANIMALFOLK_LEMURS', 15);
    define('ANIMALFOLK_MAGPIES', 16);
    define('ANIMALFOLK_ECHIDNAS', 17);
    define('ANIMALFOLK_HARES', 17);
    define('ANIMALFOLK_TREEKANGAROOS', 18);

    //DoMC
    define('ANIMALFOLK_PENGUINS', 19);
    define('ANIMALFOLK_TUATARAS', 20);
    define('ANIMALFOLK_WOODTURTLES', 21);
    define('ANIMALFOLK_TASMANIANDEVILS', 22);
    define('ANIMALFOLK_PANGOLINS', 23);
    define('ANIMALFOLK_GULLS', 24);
    define('ANIMALFOLK_MONGOOSES', 25);
    define('ANIMALFOLK_BATS', 26);
}

//define dice results
if (!defined('DIE_STARS')) {
    define('DIE_OCELOT_0', 1);
    define('DIE_OCELOT_1', 2);
    define('DIE_OCELOT_2', 3);
    define('DIE_OCELOT_3', 4);
    define('DIE_POLECAT_1', 5);
    define('DIE_POLECAT_2', 6);
    define('DIE_POLECAT_3', 7);
    define('DIE_STARS', 8);
    define('DIE_PLANET', 9);
    define('DIE_PLANET_REROLL', 10);
    define('DIE_COMET', 11);
    define('DIE_DECK', 12);
    define('DIE_DISCARD', 13);
    define('DIE_HAND', 14);
    define('DIE_DECK2', 15);
    define('DIE_DISCARD2', 16);
    define('DIE_HAND2', 17);
}

//define triggers
if (!defined('TRIGGER_ONTURNSTART')) {
    define('TRIGGER_INSTANT', null);
    define('TRIGGER_ONTURNSTART', 'onTurnStart');
    define('TRIGGER_ONSHUFFLE', 'onShuffle');
    define('TRIGGER_ONPURCHASE', 'onPurchase');
    define('TRIGGER_ONRESOLVE', 'onResolve');
    define('TRIGGER_ONBUILD', 'onBuild');
    define('TRIGGER_ONFINISH', 'onFinish');
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
        'trigger' => null,
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
        'trigger' => null,
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
        'trigger' => null,
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
        'trigger' => null,
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
        'trigger' => null,
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
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => "",
        'animalfolk_id' => 0
    ),
    6 => array(
        'type_id' => 6,
        'name' => clienttranslate("Swift Broker"),
        'text' => clienttranslate("Discard your hand. Draw as many cards."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    7 => array(
        'type_id' => 7,
        'name' => clienttranslate("Cookies"),
        'text' => clienttranslate("Hand size +1."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    8 => array(
        'type_id' => 8,
        'name' => clienttranslate("Shattered Relic"),
        'text' => clienttranslate("Ditch 1 card. Draw 1 card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    9 => array(
        'type_id' => 9,
        'name' => clienttranslate("Spyglass"),
        'text' => clienttranslate("Draw 3 cards. Take 1 and place the rest back in any order."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    10 => array(
        'type_id' => 10,
        'name' => clienttranslate("Flashy Show"),
        'text' => clienttranslate("Cards you use this round get +1 to their value."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    11 => array(
        'type_id' => 11,
        'name' => clienttranslate("Favorite Toy"),
        'text' => clienttranslate("Take your discard pile's top card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Macaws"),
        'animalfolk_id' => 1
    ),
    12 => array(
        'type_id' => 12,
        'name' => clienttranslate("Loyal Partner"),
        'text' => clienttranslate("Ditch all cards in the market. Fill the market."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    13 => array(
        'type_id' => 13,
        'name' => clienttranslate("Prepaid Good"),
        'text' => clienttranslate("Take 1 card from the market."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    14 => array(
        'type_id' => 14,
        'name' => clienttranslate("Essential Purchase"),
        'text' => clienttranslate("When purchased, ditch 0-3 junk used in the purchase."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    15 => array(
        'type_id' => 15,
        'name' => clienttranslate("Market Discovery"),
        'text' => clienttranslate("You may ditch the supply's top card. May be used to purchase the bin's top card."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    16 => array(
        'type_id' => 16,
        'name' => clienttranslate("Special Offer"),
        'text' => clienttranslate("Draw 3 cards from the supply. Take 1 and ditch the rest."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    17 => array(
        'type_id' => 17,
        'name' => clienttranslate("Stock Clearance"),
        'text' => clienttranslate("When used to purchase, you may overpay as much as you want."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Pandas"),
        'animalfolk_id' => 2
    ),
    18 => array(
        'type_id' => 18,
        'name' => clienttranslate("Wily Fellow"),
        'text' => clienttranslate("Swap your discard pile and deck. Shuffle your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    19 => array(
        'type_id' => 19,
        'name' => clienttranslate("Nuisance"),
        'text' => clienttranslate("Discard 1 random card from 0-2 other players."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    20 => array(
        'type_id' => 20,
        'name' => clienttranslate("Rotten Food"),
        'text' => clienttranslate("Place 1 card on another player's deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    21 => array(
        'type_id' => 21,
        'name' => clienttranslate("Dirty Exchange"),
        'text' => clienttranslate("Take 1 random card from another player. Give 1 card back."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    22 => array(
        'type_id' => 22,
        'name' => clienttranslate("Sabotage"),
        'text' => clienttranslate("Draw 2 cards from another player's deck. Ditch 1 and discard the other."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    23 => array(
        'type_id' => 23,
        'name' => clienttranslate("Treasure Hunter"),
        'text' => clienttranslate("Take another player's discard pile's top card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Raccoons"),
        'animalfolk_id' => 3
    ),
    24 => array(
        'type_id' => 24,
        'name' => clienttranslate("Stashing vendor"),
        'text' => clienttranslate("When used to build, you may include junk."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    25 => array(
        'type_id' => 25,
        'name' => clienttranslate("Empty Chest"),
        'text' => clienttranslate("When used to build, you may include cards from any animalfolk sets."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    26 => array(
        'type_id' => 26,
        'name' => clienttranslate("Nostalgic Item"),
        'text' => clienttranslate("When used to build, you may include a junk or an animalfolk card from any set from your discard pile."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    27 => array(
        'type_id' => 27,
        'name' => clienttranslate("Acorn"),
        'text' => clienttranslate("Take any card from an opponent's stall. Place this in its place."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    28 => array(
        'type_id' => 28,
        'name' => clienttranslate("Accordion"),
        'text' => clienttranslate("When used to build, you may +1 or -1 from this card's value."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    29 => array(
        'type_id' => 29,
        'name' => clienttranslate("Winter is coming"),
        'text' => clienttranslate("When used to build, you may immediately build another stack."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Squirrels"),
        'animalfolk_id' => 4
    ),
    30 => array(
        'type_id' => 30,
        'name' => clienttranslate("Bold Haggler"),
        'text' => clienttranslate("You may roll DIE_OCELOT and add the rolled value to this card's value for this turn."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    31 => array(
        'type_id' => 31,
        'name' => clienttranslate("New Season"),
        'text' => clienttranslate("Ditch any animalfolk card from your discard pile to draw 1 card from the supply."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    32 => array(
        'type_id' => 32,
        'name' => clienttranslate("Whirligig"),
        'text' => clienttranslate("Discard your hand. Draw as many cards and shuffle them with another player's hand. Randomly give both their original number of cards back."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    33 => array(
        'type_id' => 33,
        'name' => clienttranslate("Charm"),
        'text' => clienttranslate("Draw 1 card from the supply. Build a stack with it if you can or ditch it."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    34 => array(
        'type_id' => 34,
        'name' => clienttranslate("Gamble"),
        'text' => clienttranslate("Roll DIE_OCELOT and randomly swap that many cards with another player."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    35 => array(
        'type_id' => 35,
        'name' => clienttranslate("Blindfold"),
        'text' => clienttranslate("If an opponent guesses your chosen card's value, discard it. Otherwise decide its value (1-5)."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Ocelots"),
        'animalfolk_id' => 5
    ),
    36 => array(
        'type_id' => 36,
        'name' => clienttranslate("Flexible Shopkeeper"),
        'text' => clienttranslate("This is a copy of any card in your rightmost stack."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    37 => array(
        'type_id' => 37,
        'name' => clienttranslate("Reflection"),
        'text' => clienttranslate("This is a copy of another player's discard pile's top card."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    38 => array(
        'type_id' => 38,
        'name' => clienttranslate("Good Old Times"),
        'text' => clienttranslate("You may ditch the supply's top card. This is a copy of the bin's top card."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    39 => array(
        'type_id' => 39,
        'name' => clienttranslate("Gift Voucher"),
        'text' => clienttranslate("Take any card from the market. Place this in its place."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    40 => array(
        'type_id' => 40,
        'name' => clienttranslate("Trendsetting"),
        'text' => clienttranslate("This is a copy of any card in the market."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    41 => array(
        'type_id' => 41,
        'name' => clienttranslate("Seeing Doubles"),
        'text' => clienttranslate("This is a copy of a card in your hand. Show the copied card to other players."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Chameleons"),
        'animalfolk_id' => 6
    ),
    42 => array(
        'type_id' => 42,
        'name' => clienttranslate("Tireless Tinkerer"),
        'text' => clienttranslate("Place your discard pile's top card on your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Platypuses"),
        'animalfolk_id' => 7
    ),
    43 => array(
        'type_id' => 43,
        'name' => clienttranslate("Calculations"),
        'text' => clienttranslate("When used to purchase, rearrange any cards in the market."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Platypuses"),
        'animalfolk_id' => 7
    ),
    44 => array(
        'type_id' => 44,
        'name' => clienttranslate("Safety Precaution"),
        'text' => clienttranslate("Take any card from your stall. Place this in its place."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Platypuses"),
        'animalfolk_id' => 7
    ),
    45 => array(
        'type_id' => 45,
        'name' => clienttranslate("Magnet"),
        'text' => clienttranslate("Search your deck for 1 card. Shuffle your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Platypuses"),
        'animalfolk_id' => 7
    ),
    46 => array(
        'type_id' => 46,
        'name' => clienttranslate("Dangerous Test"),
        'text' => clienttranslate("Draw 3 cards. Discard 3 cards."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Platypuses"),
        'animalfolk_id' => 7
    ),
    47 => array(
        'type_id' => 47,
        'name' => clienttranslate("Glue"),
        'text' => clienttranslate("When used to purchase, you may keep this in your hand."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Platypuses"),
        'animalfolk_id' => 7
    ),
    48 => array(
        'type_id' => 48,
        'name' => clienttranslate("Steady Achiever"),
        'text' => clienttranslate("Your next turn, draw 1 card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Sloths"),
        'animalfolk_id' => 8
    ),
    49 => array(
        'type_id' => 49,
        'name' => clienttranslate("Shopping Journey"),
        'text' => clienttranslate("Your next turn, take 1 card from the market."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Sloths"),
        'animalfolk_id' => 8
    ),
    50 => array(
        'type_id' => 50,
        'name' => clienttranslate("Housecleaning"),
        'text' => clienttranslate("Take 0-3 junk from your discard pile. Your next turn, you may ditch 1 card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Sloths"),
        'animalfolk_id' => 8
    ),
    51 => array(
        'type_id' => 51,
        'name' => clienttranslate("Siesta"),
        'text' => clienttranslate("Your next turn, you may take 1 card from your discard pile."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Sloths"),
        'animalfolk_id' => 8
    ),
    52 => array(
        'type_id' => 52,
        'name' => clienttranslate("Lunch Break"),
        'text' => clienttranslate("Draw 1 card. Your next turn, draw 1 card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Sloths"),
        'animalfolk_id' => 8
    ),
    53 => array(
        'type_id' => 53,
        'name' => clienttranslate("Ironing"),
        'text' => clienttranslate("Your next turn, all cards you use get +1 to their value for that turn."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Sloths"),
        'animalfolk_id' => 8
    ),
    54 => array(
        'type_id' => 54,
        'name' => clienttranslate("Little Villain"),
        'text' => clienttranslate("Opponents discard 2 cards from their decks one by one."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Crocodiles"),
        'animalfolk_id' => 9
    ),
    55 => array(
        'type_id' => 55,
        'name' => clienttranslate("Scary Gunfight"),
        'text' => clienttranslate("Cards in the market have +2 cost for opponents until your next turn."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Crocodiles"),
        'animalfolk_id' => 9
    ),
    56 => array(
        'type_id' => 56,
        'name' => clienttranslate("Night Shift"),
        'text' => clienttranslate("Draw 1 card from each player's deck. Place 1 of them back on each player's deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Crocodiles"),
        'animalfolk_id' => 9
    ),
    57 => array(
        'type_id' => 57,
        'name' => clienttranslate("Ruthless Competition"),
        'text' => clienttranslate("Draw 1 card from another player's deck. Place 1 card back."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Crocodiles"),
        'animalfolk_id' => 9
    ),
    58 => array(
        'type_id' => 58,
        'name' => clienttranslate("Nasty Threat"),
        'text' => clienttranslate("Stacks opponents build require +1 value until your next turn."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Crocodiles"),
        'animalfolk_id' => 9
    ),
    59 => array(
        'type_id' => 59,
        'name' => clienttranslate("Lost Shipments"),
        'text' => clienttranslate("Opponents can draw at most 1 card while filling their hands until your next turn."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Crocodiles"),
        'animalfolk_id' => 9
    ),
    60 => array(
        'type_id' => 60,
        'name' => clienttranslate("Cunning Neighbour"),
        'text' => clienttranslate("Look at another player's hand. You may place this card on your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Foxes"),
        'animalfolk_id' => 10
    ),
    61 => array(
        'type_id' => 61,
        'name' => clienttranslate("Cheer"),
        'text' => clienttranslate("All players search their decks for 1 card. All players shuffle their decks."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Foxes"),
        'animalfolk_id' => 10
    ),
    62 => array(
        'type_id' => 62,
        'name' => clienttranslate("Raffle"),
        'text' => clienttranslate("Choose left or right. All players take 1 random card from a player in the chosen direction."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Foxes"),
        'animalfolk_id' => 10
    ),
    63 => array(
        'type_id' => 63,
        'name' => clienttranslate("Charity"),
        'text' => clienttranslate("Take 1 random card from each player. Give 1 of those back to each player."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Foxes"),
        'animalfolk_id' => 10
    ),
    64 => array(
        'type_id' => 64,
        'name' => clienttranslate("Tasters"),
        'text' => clienttranslate("Choose left or right. Starting with you and proceeding to the chosen direction, all players take 1 card from the market."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Foxes"),
        'animalfolk_id' => 10
    ),
    65 => array(
        'type_id' => 65,
        'name' => clienttranslate("Rumours"),
        'text' => clienttranslate("All players place the top 2 cards from their discard piles on their decks."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Foxes"),
        'animalfolk_id' => 10
    ),
    66 => array(
        'type_id' => 66,
        'name' => clienttranslate("Daring Adventurer"),
        'text' => clienttranslate("Roll DIE_POLECAT. Ditch the rolled number of cards in the market. Fill the market."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Polecats"),
        'animalfolk_id' => 11
    ),
    67 => array(
        'type_id' => 67,
        'name' => clienttranslate("Rare Artefact"),
        'text' => clienttranslate("Show 1 card. Roll DIE_POLECAT and multiply the card's value with the rolled value."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Polecats"),
        'animalfolk_id' => 11
    ),
    68 => array(
        'type_id' => 68,
        'name' => clienttranslate("Swank"),
        'text' => clienttranslate("Ditch 1 card. If it was an animalfolk card, draw 1 card from the supply."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Polecats"),
        'animalfolk_id' => 11
    ),
    69 => array(
        'type_id' => 69,
        'name' => clienttranslate("Risky Business"),
        'text' => clienttranslate("If you guess the top card's value from the supply, take it. Otherwise ditch the card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Polecats"),
        'animalfolk_id' => 11
    ),
    70 => array(
        'type_id' => 70,
        'name' => clienttranslate("Natural Survivor"),
        'text' => clienttranslate("Roll DIE_POLECAT. Search your deck and exchange the rolled number of cards between your hand and deck. Shuffle your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Polecats"),
        'animalfolk_id' => 11
    ),
    71 => array(
        'type_id' => 71,
        'name' => clienttranslate("Sofa"),
        'text' => clienttranslate("While in your stall, hand size +1."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Polecats"),
        'animalfolk_id' => 11
    ),
    72 => array(
        'type_id' => 72,
        'name' => clienttranslate("Wise Spy"),
        'text' => clienttranslate("You may draw 3 cards and place them back in any order once in your turn."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Owls"),
        'animalfolk_id' => 12
    ),
    73 => array(
        'type_id' => 73,
        'name' => clienttranslate("Ancient Knowledge"),
        'text' => clienttranslate("After another player has resolved a technique, you may search your deck and discard 0-1 cards from there. Shuffle your deck."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => "onResolve",
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Owls"),
        'animalfolk_id' => 12
    ),
    74 => array(
        'type_id' => 74,
        'name' => clienttranslate("Quality Inspection"),
        'text' => clienttranslate("After this card gets into your hand, you may ditch 1 card and draw 1 card."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => "onDraw",
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Owls"),
        'animalfolk_id' => 12
    ),
    75 => array(
        'type_id' => 75,
        'name' => clienttranslate("Binoculars"),
        'text' => clienttranslate("After another player purchases, you may draw 1 card and discard 1 card."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => "onPurchase",
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Owls"),
        'animalfolk_id' => 12
    ),
    76 => array(
        'type_id' => 76,
        'name' => clienttranslate("Balancing"),
        'text' => clienttranslate("After another player shuffles their deck, you may swap an animalfolk card with any card in your discard pile."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => "onShuffle",
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Owls"),
        'animalfolk_id' => 12
    ),
    77 => array(
        'type_id' => 77,
        'name' => clienttranslate("Extra Remarks"),
        'text' => clienttranslate("After another player builds, you may place 1 card from your discard pile on your deck."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => "onBuild",
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Owls"),
        'animalfolk_id' => 12
    ),
    78 => array(
        'type_id' => 78,
        'name' => clienttranslate("Master Builder"),
        'text' => clienttranslate("Next time you purchase, you may place 1 card used in the purchase on your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Beavers"),
        'animalfolk_id' => 13
    ),
    79 => array(
        'type_id' => 79,
        'name' => clienttranslate("Snack"),
        'text' => clienttranslate("Next time before you build, you may take 1 card from the market."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Beavers"),
        'animalfolk_id' => 13
    ),
    80 => array(
        'type_id' => 80,
        'name' => clienttranslate("Wind of Change"),
        'text' => clienttranslate("Next time you have purchased, you may throw away 1 card from your discard pile."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onPurchase",
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Beavers"),
        'animalfolk_id' => 13
    ),
    81 => array(
        'type_id' => 81,
        'name' => clienttranslate("Overtime"),
        'text' => clienttranslate("Next time you build, you may include cards from your discard pile."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Beavers"),
        'animalfolk_id' => 13
    ),
    82 => array(
        'type_id' => 82,
        'name' => clienttranslate("Order in Chaos"),
        'text' => clienttranslate("Next time before you shuffle your deck, you may draw your deck and discard pile. Discard down to the number of cards you had."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onShuffle",
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Beavers"),
        'animalfolk_id' => 13
    ),
    83 => array(
        'type_id' => 83,
        'name' => clienttranslate("Practice"),
        'text' => clienttranslate("Next time you discard a resolved technique card, you may take it."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onResolve",
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Beavers"),
        'animalfolk_id' => 13
    ),
    84 => array(
        'type_id' => 84,
        'name' => clienttranslate("Rigorous Chronicler"),
        'text' => clienttranslate("When used to purchase, decide this card's value (1-3)."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Desert Monitors"),
        'animalfolk_id' => 14
    ),
    85 => array(
        'type_id' => 85,
        'name' => clienttranslate("Refreshing Drink"),
        'text' => clienttranslate("On your turn, you may discard 1 card."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Desert Monitors"),
        'animalfolk_id' => 14
    ),
    86 => array(
        'type_id' => 86,
        'name' => clienttranslate("Duplicate Entry"),
        'text' => clienttranslate("Search your deck and ditch 0-1 cards from there. Shuffle your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Desert Monitors"),
        'animalfolk_id' => 14
    ),
    87 => array(
        'type_id' => 87,
        'name' => clienttranslate("History Lesson"),
        'text' => clienttranslate("Shuffle 0-3 cards from the top of your discard pile into your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Desert Monitors"),
        'animalfolk_id' => 14
    ),
    88 => array(
        'type_id' => 88,
        'name' => clienttranslate("Cultural Preservation"),
        'text' => clienttranslate("Search your deck for 0-3 cards. Take 1 and discard the rest. Shuffle your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Desert Monitors"),
        'animalfolk_id' => 14
    ),
    89 => array(
        'type_id' => 89,
        'name' => clienttranslate("Slice of Life"),
        'text' => clienttranslate("On your turn, you may draw 1 card and discard 1 card."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Desert Monitors"),
        'animalfolk_id' => 14
    ),
    90 => array(
        'type_id' => 90,
        'name' => clienttranslate("Voracious Consumer"),
        'text' => clienttranslate("Shuffle your discard pile into your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Lemurs"),
        'animalfolk_id' => 15
    ),
    91 => array(
        'type_id' => 91,
        'name' => clienttranslate("Delightful Surprise"),
        'text' => clienttranslate("Draw 2 cards from the supply and take 1. Ditch the other and this card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Lemurs"),
        'animalfolk_id' => 15
    ),
    92 => array(
        'type_id' => 92,
        'name' => clienttranslate("Fortunate Upgrade"),
        'text' => clienttranslate("Ditch 1 card. Draw 1 card from the supply."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Lemurs"),
        'animalfolk_id' => 15
    ),
    93 => array(
        'type_id' => 93,
        'name' => clienttranslate("Replacement"),
        'text' => clienttranslate("Ditch 1 animalfolk card. Take 1 card from the market within 1 of that card's value."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Lemurs"),
        'animalfolk_id' => 15
    ),
    94 => array(
        'type_id' => 94,
        'name' => clienttranslate("Fashion Hint"),
        'text' => clienttranslate("You may ditch 1 card from the supply. You may exchange 1 animalfolk card with the top card of the bin."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Lemurs"),
        'animalfolk_id' => 15
    ),
    95 => array(
        'type_id' => 95,
        'name' => clienttranslate("Royal Privilege"),
        'text' => clienttranslate("When used to purchase, you may ditch 1 animalfolk card to purchase another card for free."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Lemurs"),
        'animalfolk_id' => 15
    ),
    96 => array(
        'type_id' => 96,
        'name' => clienttranslate("Pompous Professional"),
        'text' => clienttranslate("Name a set. Draw and show 3 cards. Take 1 card of the named set and shuffle the rest back."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Magpies"),
        'animalfolk_id' => 16
    ),
    97 => array(
        'type_id' => 97,
        'name' => clienttranslate("Bribe"),
        'text' => clienttranslate("When used to purchase, hand size +1 for this turn."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Magpies"),
        'animalfolk_id' => 16
    ),
    98 => array(
        'type_id' => 98,
        'name' => clienttranslate("Burglary"),
        'text' => clienttranslate("If you guess the top card's value from another player's deck, take it. Otherwise discard it."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Magpies"),
        'animalfolk_id' => 16
    ),
    99 => array(
        'type_id' => 99,
        'name' => clienttranslate("Grasp"),
        'text' => clienttranslate("If you guess the value of 1 random card from another player's hand, take it."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Magpies"),
        'animalfolk_id' => 16
    ),
    100 => array(
        'type_id' => 100,
        'name' => clienttranslate("Periscope"),
        'text' => clienttranslate("Name a card. Discard 2 cards from another player's deck one by one, taking named cards."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Magpies"),
        'animalfolk_id' => 16
    ),
    101 => array(
        'type_id' => 101,
        'name' => clienttranslate("Sudden Nap"),
        'text' => clienttranslate("Ditch 1 random card from another player's hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Magpies"),
        'animalfolk_id' => 16
    ),
    102 => array(
        'type_id' => 102,
        'name' => clienttranslate("Carefree Swapper"),
        'text' => clienttranslate("Swap this card with the top card from another player's discard pile."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Echidnas"),
        'animalfolk_id' => 17
    ),
    103 => array(
        'type_id' => 103,
        'name' => clienttranslate("Bargain Seeker"),
        'text' => clienttranslate("On your turn, you may ditch the rightmost card from the market and fill the market."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Echidnas"),
        'animalfolk_id' => 17
    ),
    104 => array(
        'type_id' => 104,
        'name' => clienttranslate("Delicacy"),
        'text' => clienttranslate("Draw 2 cards from another player's deck. You may swap this card with 1 of them. Shuffle the cards into their deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Echidnas"),
        'animalfolk_id' => 17
    ),
    105 => array(
        'type_id' => 105,
        'name' => clienttranslate("Umbrella"),
        'text' => clienttranslate("Look at 2 random cards from another player's hand. You may swap this card with 1 of them."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Echidnas"),
        'animalfolk_id' => 17
    ),
    106 => array(
        'type_id' => 106,
        'name' => clienttranslate("Velocipede"),
        'text' => clienttranslate("Swap this card with any card from any player's stall."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Echidnas"),
        'animalfolk_id' => 17
    ),
    107 => array(
        'type_id' => 107,
        'name' => clienttranslate("Matching Colours"),
        'text' => clienttranslate("Swap an animalfolk card with a card of equal value from an opponent's stall."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Echidnas"),
        'animalfolk_id' => 17
    ),
    108 => array(
        'type_id' => 108,
        'name' => clienttranslate("Arcane Scholar"),
        'text' => clienttranslate("Draw 1 card. Roll  DIE_HARE and discard 2 cards from [A: your hand] [B: nowhere] [C: your deck]."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Hares"),
        'animalfolk_id' => 18
    ),
    109 => array(
        'type_id' => 109,
        'name' => clienttranslate("Barometer"),
        'text' => clienttranslate("On your turn, you may ditch 1 card from the supply to change this card's value to be equal to that card's value."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Hares"),
        'animalfolk_id' => 18
    ),
    110 => array(
        'type_id' => 110,
        'name' => clienttranslate("Bad Omen"),
        'text' => clienttranslate("Draw 3 cards. You may ditch 1 of them. Place the rest back in any order."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Hares"),
        'animalfolk_id' => 18
    ),
    111 => array(
        'type_id' => 111,
        'name' => clienttranslate("Festival"),
        'text' => clienttranslate("Roll  DIE_HARE. Draw a card from [A: the supply] [B: your deck] [C: nowhere]."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Hares"),
        'animalfolk_id' => 18
    ),
    112 => array(
        'type_id' => 112,
        'name' => clienttranslate("Celestial Guidance"),
        'text' => clienttranslate("Roll  DIE_HARE. Search for a card from [A: nowhere] [B: your deck] [C: your discard pile]. [B: Shuffle your deck.]"),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Hares"),
        'animalfolk_id' => 18
    ),
    113 => array(
        'type_id' => 113,
        'name' => clienttranslate("Calendar"),
        'text' => clienttranslate("On your turn, you may shuffle the top card from your discard pile into your deck."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Hares"),
        'animalfolk_id' => 18
    ),
    114 => array(
        'type_id' => 114,
        'name' => clienttranslate("Clever Guardian"),
        'text' => clienttranslate("Store 1 card. At the start of your next turn, take the stored card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
        'animalfolk_id' => 19
    ),
    115 => array(
        'type_id' => 115,
        'name' => clienttranslate("Barricade"),
        'text' => clienttranslate("After filling your hand, take 0-2 junk from your your discard pile."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
        'animalfolk_id' => 19
    ),
    116 => array(
        'type_id' => 116,
        'name' => clienttranslate("Wheelbarrow"),
        'text' => clienttranslate("Draw 1 card and store it. At the start of your next turn, ditch the stored card or take it."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
        'animalfolk_id' => 19
    ),
    117 => array(
        'type_id' => 117,
        'name' => clienttranslate("Vigilance"),
        'text' => clienttranslate("Search your deck for 1 card and store it. Shuffle your deck. At the start of your next turn, take the stored card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
        'animalfolk_id' => 19
    ),
    118 => array(
        'type_id' => 118,
        'name' => clienttranslate("Supply Depot"),
        'text' => clienttranslate("Store 0-2 cards. At the start of your next turn, take the stored cards."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onTurnStart",
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
        'animalfolk_id' => 19
    ),
    119 => array(
        'type_id' => 119,
        'name' => clienttranslate("Tactical Measurement"),
        'text' => clienttranslate("On your turn, you may draw 1 card and place 1 card on your deck."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
        'animalfolk_id' => 19
    ),
    120 => array(
        'type_id' => 120,
        'name' => clienttranslate("Resourceful Ally"),
        'text' => clienttranslate("Place a card from your discard pile on the bottom of your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Penguins"),
        'animalfolk_id' => 20
    ),
    121 => array(
        'type_id' => 121,
        'name' => clienttranslate("Ice Trade"),
        'text' => clienttranslate("Spend x (1+) to draw 1 card from the market deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Penguins"),
        'animalfolk_id' => 20
    ),
    122 => array(
        'type_id' => 122,
        'name' => clienttranslate("Traveling Equipment"),
        'text' => clienttranslate("Spend 1 to draw 2 cards from your deck. Ditch 1 card and discard 1 card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Penguins"),
        'animalfolk_id' => 20
    ),
    123 => array(
        'type_id' => 123,
        'name' => clienttranslate("Stove"),
        'text' => clienttranslate("When used to build, you may spend x (1+) to change this card's value to x/2 (rounded up)."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Penguins"),
        'animalfolk_id' => 20
    ),
    124 => array(
        'type_id' => 124,
        'name' => clienttranslate("Fishing"),
        'text' => clienttranslate("Spend 1 to place 0-3 cards from your discard pile on top of your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Penguins"),
        'animalfolk_id' => 20
    ),
    125 => array(
        'type_id' => 125,
        'name' => clienttranslate("Practical Values"),
        'text' => clienttranslate("Each card valued 1 you use is valued 5, each 2 is 4, and vice versa."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Penguins"),
        'animalfolk_id' => 20
    ),
    126 => array(
        'type_id' => 126,
        'name' => clienttranslate("Avid Financier"),
        'text' => clienttranslate("Place 2 COIN on this card. Your next 2 turns, take 1 COIN from this card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Tuataras"),
        'animalfolk_id' => 21
    ),
    127 => array(
        'type_id' => 127,
        'name' => clienttranslate("Greed"),
        'text' => clienttranslate("Spend 1 to draw 2 cards. Discard 1 card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Tuataras"),
        'animalfolk_id' => 21
    ),
    128 => array(
        'type_id' => 128,
        'name' => clienttranslate("Golden Opportunity"),
        'text' => clienttranslate("Ditch 1 card. Gain 1 COIN."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Tuataras"),
        'animalfolk_id' => 21
    ),
    129 => array(
        'type_id' => 129,
        'name' => clienttranslate("Cache"),
        'text' => clienttranslate("Spend 2 to take 1 card from your discard pile."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Tuataras"),
        'animalfolk_id' => 21
    ),
    130 => array(
        'type_id' => 130,
        'name' => clienttranslate("Display of Power"),
        'text' => clienttranslate("Spend 2 to get hand size +2 for this turn."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Tuataras"),
        'animalfolk_id' => 21
    ),
    131 => array(
        'type_id' => 131,
        'name' => clienttranslate("Safe Profits"),
        'text' => clienttranslate("Spend x (1-8) to gain x/2 COIN (rounded up)."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Tuataras"),
        'animalfolk_id' => 21
    ),
    132 => array(
        'type_id' => 132,
        'name' => clienttranslate("Impulsive Visionary"),
        'text' => clienttranslate("Finish 1. Draw 1 card."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onFinish",
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Turtles"),
        'animalfolk_id' => 22
    ),
    133 => array(
        'type_id' => 133,
        'name' => clienttranslate("Collector's Desire"),
        'text' => clienttranslate("Finish 2. Take the leftmost card from the market."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onFinish",
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Turtles"),
        'animalfolk_id' => 22
    ),
    134 => array(
        'type_id' => 134,
        'name' => clienttranslate("Groundbreaking Idea"),
        'text' => clienttranslate("Ditch any 1 card from your discard pile and place 1 from there on top of your deck. Finish 2."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onFinish",
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Turtles"),
        'animalfolk_id' => 22
    ),
    135 => array(
        'type_id' => 135,
        'name' => clienttranslate("Inspiration"),
        'text' => clienttranslate("Draw 2 cards. Finish 3."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onFinish",
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Turtles"),
        'animalfolk_id' => 22
    ),
    136 => array(
        'type_id' => 136,
        'name' => clienttranslate("Insight"),
        'text' => clienttranslate("Draw 2 cards and place them back in any order. Finish 2. Draw 2 cards."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onFinish",
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Turtles"),
        'animalfolk_id' => 22
    ),
    137 => array(
        'type_id' => 137,
        'name' => clienttranslate("Perfect Move"),
        'text' => clienttranslate("Finish x (1+). Place the top x cards from your discard pile on top of your deck in any order."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => "onFinish",
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Turtles"),
        'animalfolk_id' => 22
    ),
    138 => array(
        'type_id' => 138,
        'name' => clienttranslate("Shrewd Trickster"),
        'text' => clienttranslate("Discard 2 random cards from another player's hand one by one. That player draws 2 cards."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
        'animalfolk_id' => 23
    ),
    139 => array(
        'type_id' => 139,
        'name' => clienttranslate("Disruptive Speech"),
        'text' => clienttranslate("Swap another player's discard pile and deck. Shuffle their deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
        'animalfolk_id' => 23
    ),
    140 => array(
        'type_id' => 140,
        'name' => clienttranslate("Tit for Tat"),
        'text' => clienttranslate("Shuffle 0-2 cards from another player's discard pile into their deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
        'animalfolk_id' => 23
    ),
    141 => array(
        'type_id' => 141,
        'name' => clienttranslate("Shameless Rummage"),
        'text' => clienttranslate("Draw 3 cards from another player's deck. Place 0-3 on their discard pile and shuffle the rest into their deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
        'animalfolk_id' => 23
    ),
    142 => array(
        'type_id' => 142,
        'name' => clienttranslate("Public Humiliation"),
        'text' => clienttranslate("Discard 2 random cards from another player's hand one by one. Place any 2 cards from their discard pile into their hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
        'animalfolk_id' => 23
    ),
    143 => array(
        'type_id' => 143,
        'name' => clienttranslate("Equality"),
        'text' => clienttranslate("Your chosen another player draws 3 cards. Discard as many random cards from them one by one."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
        'animalfolk_id' => 23
    ),
    144 => array(
        'type_id' => 144,
        'name' => clienttranslate("Fumbling Dreamer"),
        'text' => clienttranslate("Roll DIE_PANGOLIN1 and DIE_PANGOLIN2 until you have a different results. Place 1 card from any player's SOURCE into their DESTINATION."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Pangolins"),
        'animalfolk_id' => 24
    ),
    145 => array(
        'type_id' => 145,
        'name' => clienttranslate("Coffee Grinder"),
        'text' => clienttranslate("On your turn, you may discard 0-2 cards from any player's deck one by one."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Pangolins"),
        'animalfolk_id' => 24
    ),
    146 => array(
        'type_id' => 146,
        'name' => clienttranslate("Accident"),
        'text' => clienttranslate("Look at the top card of your deck. Exchange it with 1 random card from any player's hand."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Pangolins"),
        'animalfolk_id' => 24
    ),
    147 => array(
        'type_id' => 147,
        'name' => clienttranslate("Loose Marbles"),
        'text' => clienttranslate("Roll DIE_PANGOLIN1 and DIE_PANGOLIN2. Place a card from any player's SOURCE into a different player's DESTINATION."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Pangolins"),
        'animalfolk_id' => 24
    ),
    148 => array(
        'type_id' => 148,
        'name' => clienttranslate("Another Fine Mess"),
        'text' => clienttranslate("Roll DIE_PANGOLIN1 and DIE_PANGOLIN2. Shuffle 2 cards from any player's SOURCE into a different player's DESTINATION. Repeat with DESTINATION and SOURCE swapped without shuffling."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Pangolins"),
        'animalfolk_id' => 24
    ),
    149 => array(
        'type_id' => 149,
        'name' => clienttranslate("Fresh Start"),
        'text' => clienttranslate("Shuffle any player's discard pile into their deck. Draw 1 from any player's deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Pangolins"),
        'animalfolk_id' => 24
    ),
    150 => array(
        'type_id' => 150,
        'name' => clienttranslate("Meddling Marketeer"),
        'text' => clienttranslate("Draw 2 cards. Discard 0-2 of them and place the rest back in any order."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Gulls"),
        'animalfolk_id' => 25
    ),
    151 => array(
        'type_id' => 151,
        'name' => clienttranslate("Goodwill Presents"),
        'text' => clienttranslate("Place 1 junk from the junk pile on 0-2 other players' discard piles."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Gulls"),
        'animalfolk_id' => 25
    ),
    152 => array(
        'type_id' => 152,
        'name' => clienttranslate("Alternative Plan"),
        'text' => clienttranslate("Ditch any 1 card from your discard pile."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Gulls"),
        'animalfolk_id' => 25
    ),
    153 => array(
        'type_id' => 153,
        'name' => clienttranslate("Anchor"),
        'text' => clienttranslate("Draw 3 cards. Place 0-1 on another player's discard pile and the rest back in any order."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Gulls"),
        'animalfolk_id' => 25
    ),
    154 => array(
        'type_id' => 154,
        'name' => clienttranslate("Manufactured Joy"),
        'text' => clienttranslate("Search your deck for 1 card. Shuffle your deck. You may place 1 card on another player's discard pile."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Gulls"),
        'animalfolk_id' => 25
    ),
    155 => array(
        'type_id' => 155,
        'name' => clienttranslate("Shaky Enterprise"),
        'text' => clienttranslate("Take the top 2 cards from your discard pile. Place 0-1 on another player's discard pile and the rest on top of your deck in any order."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Gulls"),
        'animalfolk_id' => 25
    ),
    156 => array(
        'type_id' => 156,
        'name' => clienttranslate("Dramatic Romantic"),
        'text' => clienttranslate("On your turn, you may advance the clock one space."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => true,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Mongooses"),
        'animalfolk_id' => 26
    ),
    157 => array(
        'type_id' => 157,
        'name' => clienttranslate("Bouquets"),
        'text' => clienttranslate("Draw [DAY 2] [NIGHT 1] cards from the supply. Take 1 and ditch the rest."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Mongooses"),
        'animalfolk_id' => 26
    ),
    158 => array(
        'type_id' => 158,
        'name' => clienttranslate("Selecting Contracts"),
        'text' => clienttranslate("Take [DAY 0-3] [NIGHT 0-1] cards from the top of your discard pile. Ditch 1 and place the rest on top of your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Mongooses"),
        'animalfolk_id' => 26
    ),
    159 => array(
        'type_id' => 159,
        'name' => clienttranslate("Serenade"),
        'text' => clienttranslate("Draw [DAY 3] [NIGHT 1] cards. Place [DAY 2] [NIGHT 1] cards on top of your deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Mongooses"),
        'animalfolk_id' => 26
    ),
    160 => array(
        'type_id' => 160,
        'name' => clienttranslate("Spinning Wheel"),
        'text' => clienttranslate("Discard x cards. Draw [DAY x + 1] [NIGHT x] cards."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Mongooses"),
        'animalfolk_id' => 26
    ),
    161 => array(
        'type_id' => 161,
        'name' => clienttranslate("Inheritance"),
        'text' => clienttranslate("When filling your hand, you may draw [DAY 0-2] [NIGHT 0-1] cards from the top of your discard pile instead of your deck."),
        'type_displayed' => clienttranslate("Passive"),
        'is_technique' => false,
        'has_plus' => false,
        'has_ability' => false,
        'playable' => false,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Mongooses"),
        'animalfolk_id' => 26
    ),
    162 => array(
        'type_id' => 162,
        'name' => clienttranslate("Sneaky Scout"),
        'text' => clienttranslate("Draw 2 cards from your [NIGHT or another player's] deck and place them back in any order."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 1,
        'nbr' => 0,
        'animalfolk_displayed' => clienttranslate("Bats"),
        'animalfolk_id' => 27
    ),
    163 => array(
        'type_id' => 163,
        'name' => clienttranslate("False Alarm"),
        'text' => clienttranslate("Take the top 2 cards from your [NIGHT or another player's] discard pile and shuffle them into their deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 2,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Bats"),
        'animalfolk_id' => 27
    ),
    164 => array(
        'type_id' => 164,
        'name' => clienttranslate("Heroic Deed"),
        'text' => clienttranslate("Draw 1 card from your [NIGHT or another player's] deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 3,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Bats"),
        'animalfolk_id' => 27
    ),
    165 => array(
        'type_id' => 165,
        'name' => clienttranslate("Secret Mission"),
        'text' => clienttranslate("Take the bottom card of your discard pile [NIGHT or 1 random card from another player's hand]."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 4,
        'nbr' => 3,
        'animalfolk_displayed' => clienttranslate("Bats"),
        'animalfolk_id' => 27
    ),
    166 => array(
        'type_id' => 166,
        'name' => clienttranslate("Capture"),
        'text' => clienttranslate("Draw 2 cards from your [NIGHT or another player's] deck. Take 1 and shuffle the other into their deck."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Bats"),
        'animalfolk_id' => 27
    ),
    167 => array(
        'type_id' => 167,
        'name' => clienttranslate("Provocation"),
        'text' => clienttranslate("Choose 1 card [NIGHT and look at 1 random card from another player's hand]. Ditch 1 of them."),
        'type_displayed' => clienttranslate("Technique"),
        'is_technique' => true,
        'has_plus' => true,
        'has_ability' => false,
        'playable' => true,
        'trigger' => null,
        'value' => 5,
        'nbr' => 1,
        'animalfolk_displayed' => clienttranslate("Bats"),
        'animalfolk_id' => 27
    )
  );
  