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
    define('CT_GIFTVOUCHER', 15);
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
    define('CT_SOUNDDETECTORS', 39);
    define('CT_TRENDSETTING', 40);
    define('CT_SEEINGDOUBLES', 41);
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
    define('CT_MASTERBUILDER', 78);
    define('CT_SNACK', 79);
    define('CT_WINDOFCHANGE', 80);
    define('CT_OVERTIME', 81);
    define('CT_ORDERINCHAOS', 82);
    define('CT_PRACTICE', 83);
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
    define('CT_PRISTINEOWNER', 168);
    define('CT_BONSAI', 169);
    define('CT_RAKE', 170);
    define('CT_SLOTMACHINE', 171);
    define('CT_GENERATIONCHANGE', 172);
    define('CT_WARMEMBRACE', 173);
    define('CT_SWIFTMEMBER', 174);
    define('CT_LOYALMEMBER', 175);
    define('CT_WILYMEMBER', 176);
    define('CT_STASHINGMEMBER', 177);
    define('CT_BOLDMEMBER', 178);
    define('CT_FLEXIBLEMEMBER', 179);
    define('CT_TIRELESSMEMBER', 180);
    define('CT_STEADYMEMBER', 181);
    define('CT_LITTLEMEMBER', 182);
    define('CT_CUNNINGMEMBER', 183);
    define('CT_DARINGMEMBER', 184);
    define('CT_WISEMEMBER', 185);
    define('CT_MASTERMEMBER', 186);
    define('CT_RIGOROUSMEMBER', 187);
    define('CT_VORACIOUSMEMBER', 188);
    define('CT_POMPOUSMEMBER', 189);
    define('CT_CAREFREEMEMBER', 190);
    define('CT_ARCANEMEMBER', 191);
    define('CT_CLEVERMEMBER', 192);
    define('CT_RESOURCEFULMEMBER', 193);
    define('CT_AVIDMEMBER', 194);
    define('CT_IMPULSIVEMEMBER', 195);
    define('CT_SHREWDMEMBER', 196);
    define('CT_FUMBLINGMEMBER', 197);
    define('CT_MEDDLINGMEMBER', 198);
    define('CT_DRAMATICMEMBER', 199);
    define('CT_STEALTHYMEMBER', 200);
    define('CT_PRISTINEMEMBER', 201);
    define('CT_DEPRECATED_MARKETDISCOVERY', 202);
    define('CT_DEPRECATED_CHEER', 203);
    define('CT_DEPRECATED_TASTERS', 204);
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
    define('ANIMALFOLK_HARES', 18);
    define('ANIMALFOLK_TREEKANGAROOS', 19);

    //DoMC
    define('ANIMALFOLK_PENGUINS', 20);
    define('ANIMALFOLK_TUATARAS', 21);
    define('ANIMALFOLK_WOODTURTLES', 22);
    define('ANIMALFOLK_TASMANIANDEVILS', 23);
    define('ANIMALFOLK_PANGOLINS', 24);
    define('ANIMALFOLK_GULLS', 25);
    define('ANIMALFOLK_MONGOOSES', 26);
    define('ANIMALFOLK_BATS', 27);

    //10th anniversary
    define('ANIMALFOLK_SNOWMACAQUES', 28);
    define('ANIMALFOLK_DODOS', 29);
    define('ANIMALFOLK_CAPUCHINMONKIES', 30);
    define('ANIMALFOLK_MARKETMANIPULATION', 31);
    define('ANIMALFOLK_ENDOFTURN', 32);
    define('ANIMALFOLK_REPEAT', 33);
    define('ANIMALFOLK_GORILLA', 34);
    define('ANIMALFOLK_MORNING', 35);
    define('ANIMALFOLK_UNKNOWN', 36);
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
    define('DIE_COMET', 10);
    define('DIE_DISCARD', 11);
    define('DIE_DECK', 12);
    define('DIE_HAND', 13);
    define('DIE_DISCARD2', 14);
    define('DIE_DECK2', 15);
    define('DIE_HAND2', 16);
}

//define triggers
if (!defined('TRIGGER_ONTURNSTART')) {
    define('TRIGGER_INSTANT', null);
    define('TRIGGER_ONTURNSTART', 'onTurnStart');
    define('TRIGGER_ONMARKETCARD', 'onMarketCard');
    define('TRIGGER_ONSHUFFLE', 'onShuffle');
    define('TRIGGER_ONPURCHASE', 'onPurchase');
    define('TRIGGER_ONRESOLVE', 'onResolve');
    define('TRIGGER_ONPREBUILD', 'onPreBuild');
    define('TRIGGER_ONBUILD', 'onBuild');
    define('TRIGGER_ONFINISH', 'onFinish');
}

//define clock constants (for ANIMALFOLK_MONGOOSES AND ANIMALFOLK_BATS)
if (!defined('CLOCK_DAWN')) {
    define('CLOCK_DAWN', 0);
    define('CLOCK_DAY', 1);
    define('CLOCK_NIGHT', 2);
}

//define constants for Mono
if (!defined('MONO_PLAYER_ID')) {
    define('MONO_PLAYER_ID', 1);

    define('MONO_TECHNIQUE_NONE', 0);
    define('MONO_TECHNIQUE_ACQUIRE', 1);
    define('MONO_TECHNIQUE_NO_ACQUIRE', 2);
    define('MONO_TECHNIQUE_NO_PLUS', 3);
}

//automatically resolve these choiceless triggers if they are the only one that needs to be resolved
$this->AUTORESOLVE_TRIGGERS = array(
    CT_OVERTIME,
    CT_PRACTICE
);

//disable these animalfolks in the deck selection (and random selection)
$this->DISABLED_ANIMALFOLK_IDS = array(
    ANIMALFOLK_CHAMELEONS,          //... chameleons ...
    ANIMALFOLK_PANDAS,              //effect not finalized
    ANIMALFOLK_OCELOTS,             //effect not finalized
    ANIMALFOLK_ECHIDNAS,            //effect not finalized
    ANIMALFOLK_BEAVERS,             //effect not finalized
    //ANIMALFOLK_LEMURS,            //effect not finalized (but the text is correct)
    ANIMALFOLK_BATS,                //not implemented
    ANIMALFOLK_OWLS,                //not implemented
    ANIMALFOLK_TASMANIANDEVILS,     //not implemented
    ANIMALFOLK_DODOS,               //does not exist
    ANIMALFOLK_CAPUCHINMONKIES,     //does not exist
    ANIMALFOLK_MARKETMANIPULATION,  //does not exist
    ANIMALFOLK_ENDOFTURN,           //does not exist
    ANIMALFOLK_REPEAT,              //does not exist
    ANIMALFOLK_GORILLA,             //does not exist
    ANIMALFOLK_MORNING,             //does not exist
    ANIMALFOLK_UNKNOWN              //does not exist
);

$this->card_types = array(
  0 => array(
      'type_id' => CT_CARDBACK,
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
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  1 => array(
      'type_id' => CT_JUNK,
      'name' => clienttranslate("Junk"),
      'text' => clienttranslate("This CARD cannot usually be included in a stack."),
      'type_displayed' => clienttranslate("Rubbish"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => "",
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  2 => array(
      'type_id' => CT_JUNK,
      'name' => clienttranslate("Junk"),
      'text' => clienttranslate("This CARD cannot usually be included in a stack."),
      'type_displayed' => clienttranslate("Rubbish"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => "",
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  3 => array(
      'type_id' => CT_JUNK,
      'name' => clienttranslate("Junk"),
      'text' => clienttranslate("This CARD cannot usually be included in a stack."),
      'type_displayed' => clienttranslate("Rubbish"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => "",
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  4 => array(
      'type_id' => CT_JUNK,
      'name' => clienttranslate("Junk"),
      'text' => clienttranslate("This CARD cannot usually be included in a stack."),
      'type_displayed' => clienttranslate("Rubbish"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => "",
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  5 => array(
      'type_id' => CT_JUNK,
      'name' => clienttranslate("Junk"),
      'text' => clienttranslate("This CARD cannot usually be included in a stack."),
      'type_displayed' => clienttranslate("Rubbish"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => "",
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  6 => array(
      'type_id' => CT_SWIFTBROKER,
      'name' => clienttranslate("Swift Broker"),
      'text' => clienttranslate("Discard your hand. Draw as many CARDS3."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Macaws"),
      'animalfolk_id' => 1,
      'is_mono' => false
  ),
  7 => array(
      'type_id' => CT_COOKIES,
      'name' => clienttranslate("Cookies"),
      'text' => clienttranslate("At the end of your turn, draw 1 CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Macaws"),
      'animalfolk_id' => 1,
      'is_mono' => false
  ),
  8 => array(
      'type_id' => CT_SHATTEREDRELIC,
      'name' => clienttranslate("Shattered Relic"),
      'text' => clienttranslate("Toss 1 CARD. Draw 1 CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Macaws"),
      'animalfolk_id' => 1,
      'is_mono' => false
  ),
  9 => array(
      'type_id' => CT_SPYGLASS,
      'name' => clienttranslate("Spyglass"),
      'text' => clienttranslate("Look at the top 3 CARDS3 of your deck and take 1 of them. You may reorder the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Macaws"),
      'animalfolk_id' => 1,
      'is_mono' => false
  ),
  10 => array(
      'type_id' => CT_FLASHYSHOW,
      'name' => clienttranslate("Flashy Show"),
      'text' => clienttranslate("CARDS3 you use this turn get +1 to their value."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Macaws"),
      'animalfolk_id' => 1,
      'is_mono' => false
  ),
  11 => array(
      'type_id' => CT_FAVORITETOY,
      'name' => clienttranslate("Favorite Toy"),
      'text' => clienttranslate("Take the top CARD of your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Macaws"),
      'animalfolk_id' => 1,
      'is_mono' => false
  ),
  12 => array(
      'type_id' => CT_LOYALPARTNER,
      'name' => clienttranslate("Loyal Partner"),
      'text' => clienttranslate("Toss any CARDS3 in the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Pandas"),
      'animalfolk_id' => 2,
      'is_mono' => false
  ),
  13 => array(
      'type_id' => CT_PREPAIDGOOD,
      'name' => clienttranslate("Prepaid Good"),
      'text' => clienttranslate("Take 1 CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Pandas"),
      'animalfolk_id' => 2,
      'is_mono' => false
  ),
  14 => array(
      'type_id' => CT_ESSENTIALPURCHASE,
      'name' => clienttranslate("Essential Purchase"),
      'text' => clienttranslate("When purchased, toss 1-3 junk CARDS3 used in the purchase."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Pandas"),
      'animalfolk_id' => 2,
      'is_mono' => false
  ),
  15 => array(
      'type_id' => CT_GIFTVOUCHER,
      'name' => clienttranslate("Gift Voucher"),
      'text' => clienttranslate("Take 1 CARD from the market. Place this CARD in its place."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Pandas"),
      'animalfolk_id' => 2,
      'is_mono' => false
  ),
  16 => array(
      'type_id' => CT_SPECIALOFFER,
      'name' => clienttranslate("Special Offer"),
      'text' => clienttranslate("Look at the top 3 CARDS3 of the supply and take 1 of them. Toss the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Pandas"),
      'animalfolk_id' => 2,
      'is_mono' => false
  ),
  17 => array(
      'type_id' => CT_STOCKCLEARANCE,
      'name' => clienttranslate("Stock Clearance"),
      'text' => clienttranslate("CARDS3 in the market have +2 cost for this turn. Hand size +2 for this turn."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Pandas"),
      'animalfolk_id' => 2,
      'is_mono' => false
  ),
  18 => array(
      'type_id' => CT_WILYFELLOW,
      'name' => clienttranslate("Wily Fellow"),
      'text' => clienttranslate("Flip your deck and discard. Swap them. Shuffle your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Raccoons"),
      'animalfolk_id' => 3,
      'is_mono' => false
  ),
  19 => array(
      'type_id' => CT_NUISANCE,
      'name' => clienttranslate("Nuisance"),
      'text' => clienttranslate("Discard 1 random CARD from 1-2 other players."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Raccoons"),
      'animalfolk_id' => 3,
      'is_mono' => false
  ),
  20 => array(
      'type_id' => CT_ROTTENFOOD,
      'name' => clienttranslate("Rotten Food"),
      'text' => clienttranslate("Place 1 CARD on another player's deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Raccoons"),
      'animalfolk_id' => 3,
      'is_mono' => false
  ),
  21 => array(
      'type_id' => CT_DIRTYEXCHANGE,
      'name' => clienttranslate("Dirty Exchange"),
      'text' => clienttranslate("Take 1 random CARD from another player. Give 1 CARD back."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Raccoons"),
      'animalfolk_id' => 3,
      'is_mono' => false
  ),
  22 => array(
      'type_id' => CT_SABOTAGE,
      'name' => clienttranslate("Sabotage"),
      'text' => clienttranslate("Discard 2 CARDS2 from another player's deck. Toss 1 of them."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Raccoons"),
      'animalfolk_id' => 3,
      'is_mono' => false
  ),
  23 => array(
      'type_id' => CT_TREASUREHUNTER,
      'name' => clienttranslate("Treasure Hunter"),
      'text' => clienttranslate("Take the top CARD of another player's deck or discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Raccoons"),
      'animalfolk_id' => 3,
      'is_mono' => false
  ),
  24 => array(
      'type_id' => CT_STASHINGVENDOR,
      'name' => clienttranslate("Stashing vendor"),
      'text' => clienttranslate("When used to build, you can include junk CARDS3."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Squirrels"),
      'animalfolk_id' => 4,
      'is_mono' => false
  ),
  25 => array(
      'type_id' => CT_EMPTYCHEST,
      'name' => clienttranslate("Empty Chest"),
      'text' => clienttranslate("When used to build, you can include any animalfolk CARDS3."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Squirrels"),
      'animalfolk_id' => 4,
      'is_mono' => false
  ),
  26 => array(
      'type_id' => CT_NOSTALGICITEM,
      'name' => clienttranslate("Nostalgic Item"),
      'text' => clienttranslate("When used to build, you can include 1 junk CARD or any 1 animalfolk CARD from your discard."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Squirrels"),
      'animalfolk_id' => 4,
      'is_mono' => false
  ),
  27 => array(
      'type_id' => CT_ACORN,
      'name' => clienttranslate("Acorn"),
      'text' => clienttranslate("Take 1 CARD from an opponent's stall. Place this CARD in its place."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Squirrels"),
      'animalfolk_id' => 4,
      'is_mono' => false
  ),
  28 => array(
      'type_id' => CT_ACCORDION,
      'name' => clienttranslate("Accordion"),
      'text' => clienttranslate("When used to build, you may +1 or -1 from this CARD value."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Squirrels"),
      'animalfolk_id' => 4,
      'is_mono' => false
  ),
  29 => array(
      'type_id' => CT_WINTERISCOMING,
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
      'animalfolk_id' => 4,
      'is_mono' => false
  ),
  30 => array(
      'type_id' => CT_BOLDHAGGLER,
      'name' => clienttranslate("Bold Haggler"),
      'text' => clienttranslate("Roll DIE_OCELOT. Add the rolled value to this CARD value for this turn."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Ocelots"),
      'animalfolk_id' => 5,
      'is_mono' => false
  ),
  31 => array(
      'type_id' => CT_NEWSEASON,
      'name' => clienttranslate("New Season"),
      'text' => clienttranslate("Toss any 1 animalfolk CARD from your discard to draw 1 CARD from the supply."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Ocelots"),
      'animalfolk_id' => 5,
      'is_mono' => false
  ),
  32 => array(
      'type_id' => CT_WHIRLIGIG,
      'name' => clienttranslate("Whirligig"),
      'text' => clienttranslate("Roll DIE_OCELOT. Swap that many CARDS3 between the tops of your and another player's decks."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Ocelots"),
      'animalfolk_id' => 5,
      'is_mono' => false
  ),
  33 => array(
      'type_id' => CT_CHARM,
      'name' => clienttranslate("Charm"),
      'text' => clienttranslate("Look at the top CARD of the supply. Build a stack with only that CARD if you can or toss it."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Ocelots"),
      'animalfolk_id' => 5,
      'is_mono' => false
  ),
  34 => array(
      'type_id' => CT_GAMBLE,
      'name' => clienttranslate("Gamble"),
      'text' => clienttranslate("Roll DIE_OCELOT. Swap that many random CARDS3 with another player."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Ocelots"),
      'animalfolk_id' => 5,
      'is_mono' => false
  ),
  35 => array(
      'type_id' => CT_BLINDFOLD,
      'name' => clienttranslate("Blindfold"),
      'text' => clienttranslate("If you guess the top CARD value of your deck, take it and decide its value (1-5). Otherwise discard it."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Ocelots"),
      'animalfolk_id' => 5,
      'is_mono' => false
  ),
  36 => array(
      'type_id' => CT_FLEXIBLESHOPKEEPER,
      'name' => clienttranslate("Flexible Shopkeeper"),
      'text' => clienttranslate("Copy 1 CARD in your rightmost stack."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  37 => array(
      'type_id' => CT_REFLECTION,
      'name' => clienttranslate("Reflection"),
      'text' => clienttranslate("Discard 0-1 CARD from another player's deck. Copy the top CARD of their discard."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  38 => array(
      'type_id' => CT_GOODOLDTIMES,
      'name' => clienttranslate("Good Old Times"),
      'text' => clienttranslate("Toss 0-1 CARD from the supply. Copy of the top CARD of the bin."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  39 => array(
      'type_id' => CT_SOUNDDETECTORS,
      'name' => clienttranslate("Sound Detectors"),
      'text' => clienttranslate("Look at 2 random CARD cards from another player. Copy 1 of them."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  40 => array(
      'type_id' => CT_TRENDSETTING,
      'name' => clienttranslate("Trendsetting"),
      'text' => clienttranslate("Copy 1 CARD in the market."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  41 => array(
      'type_id' => CT_SEEINGDOUBLES,
      'name' => clienttranslate("Seeing Doubles"),
      'text' => clienttranslate("Show 1 CARD and copy it."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  42 => array(
      'type_id' => CT_TIRELESSTINKERER,
      'name' => clienttranslate("Tireless Tinkerer"),
      'text' => clienttranslate("Place the top CARD of your discard on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Platypuses"),
      'animalfolk_id' => 7,
      'is_mono' => false
  ),
  43 => array(
      'type_id' => CT_CALCULATIONS,
      'name' => clienttranslate("Calculations"),
      'text' => clienttranslate("Before used to purchase, rearrange any CARDS3 in the market."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Platypuses"),
      'animalfolk_id' => 7,
      'is_mono' => false
  ),
  44 => array(
      'type_id' => CT_SAFETYPRECAUTION,
      'name' => clienttranslate("Safety Precaution"),
      'text' => clienttranslate("Take 1 CARD from your stall. Place this CARD in its place."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Platypuses"),
      'animalfolk_id' => 7,
      'is_mono' => false
  ),
  45 => array(
      'type_id' => CT_MAGNET,
      'name' => clienttranslate("Magnet"),
      'text' => clienttranslate("Search your deck for 1 CARD. Shuffle your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Platypuses"),
      'animalfolk_id' => 7,
      'is_mono' => false
  ),
  46 => array(
      'type_id' => CT_DANGEROUSTEST,
      'name' => clienttranslate("Dangerous Test"),
      'text' => clienttranslate("Draw 3 CARDS3. Discard 3 CARDS3."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Platypuses"),
      'animalfolk_id' => 7,
      'is_mono' => false
  ),
  47 => array(
      'type_id' => CT_GLUE,
      'name' => clienttranslate("Glue"),
      'text' => clienttranslate("When used to purchase, you may keep this CARD in your hand."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Platypuses"),
      'animalfolk_id' => 7,
      'is_mono' => false
  ),
  48 => array(
      'type_id' => CT_STEADYACHIEVER,
      'name' => clienttranslate("Steady Achiever"),
      'text' => clienttranslate("At the start of your next turn, draw 1 CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Sloths"),
      'animalfolk_id' => 8,
      'is_mono' => false
  ),
  49 => array(
      'type_id' => CT_SHOPPINGJOURNEY,
      'name' => clienttranslate("Shopping Journey"),
      'text' => clienttranslate("At the start of your next turn, take 1 CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Sloths"),
      'animalfolk_id' => 8,
      'is_mono' => false
  ),
  50 => array(
      'type_id' => CT_HOUSECLEANING,
      'name' => clienttranslate("Housecleaning"),
      'text' => clienttranslate("Take 0-3 junk CARD from your discard. At the start of your next turn, toss 0-1 CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Sloths"),
      'animalfolk_id' => 8,
      'is_mono' => false
  ),
  51 => array(
      'type_id' => CT_SIESTA,
      'name' => clienttranslate("Siesta"),
      'text' => clienttranslate("At the start of your next turn, take any 1 CARD from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Sloths"),
      'animalfolk_id' => 8,
      'is_mono' => false
  ),
  52 => array(
      'type_id' => CT_LUNCHBREAK,
      'name' => clienttranslate("Lunch Break"),
      'text' => clienttranslate("Draw 1 CARD. At the start of your next turn, draw 1 CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Sloths"),
      'animalfolk_id' => 8,
      'is_mono' => false
  ),
  53 => array(
      'type_id' => CT_IRONING,
      'name' => clienttranslate("Ironing"),
      'text' => clienttranslate("At the start of your next turn, CARDS3 you use get +1 to their value for that turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Sloths"),
      'animalfolk_id' => 8,
      'is_mono' => false
  ),
  54 => array(
      'type_id' => CT_LITTLEVILLAIN,
      'name' => clienttranslate("Little Villain"),
      'text' => clienttranslate("Opponents discard 2 CARDS2 from their decks one by one."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Crocodiles"),
      'animalfolk_id' => 9,
      'is_mono' => false
  ),
  55 => array(
      'type_id' => CT_SCARYGUNFIGHT,
      'name' => clienttranslate("Scary Gunfight"),
      'text' => clienttranslate("CARDS3 in the market have +2 cost for opponents until the start of your next turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Crocodiles"),
      'animalfolk_id' => 9,
      'is_mono' => false
  ),
  56 => array(
      'type_id' => CT_NIGHTSHIFT,
      'name' => clienttranslate("Night Shift"),
      'text' => clienttranslate("Draw 1 CARD from each player's deck. Place 1 of them back on each player's deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Crocodiles"),
      'animalfolk_id' => 9,
      'is_mono' => false
  ),
  57 => array(
      'type_id' => CT_RUTHLESSCOMPETITION,
      'name' => clienttranslate("Ruthless Competition"),
      'text' => clienttranslate("Draw 1 CARD from another player's deck. Place 1 CARD back."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Crocodiles"),
      'animalfolk_id' => 9,
      'is_mono' => false
  ),
  58 => array(
      'type_id' => CT_NASTYTHREAT,
      'name' => clienttranslate("Nasty Threat"),
      'text' => clienttranslate("Stacks opponents build require +1 value until the start of your next turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Crocodiles"),
      'animalfolk_id' => 9,
      'is_mono' => false
  ),
  59 => array(
      'type_id' => CT_LOSTSHIPMENTS,
      'name' => clienttranslate("Lost Shipments"),
      'text' => clienttranslate("Opponents can draw at most 1 CARD while filling their hands until the start of your next turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Crocodiles"),
      'animalfolk_id' => 9,
      'is_mono' => false
  ),
  60 => array(
      'type_id' => CT_CUNNINGNEIGHBOUR,
      'name' => clienttranslate("Cunning Neighbour"),
      'text' => clienttranslate("Look at another player's hand."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Foxes"),
      'animalfolk_id' => 10,
      'is_mono' => false
  ),
  61 => array(
      'type_id' => CT_CHEER,
      'name' => clienttranslate("Cheer"),
      'text' => clienttranslate("Each player places the top CARD of their discard on their deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Foxes"),
      'animalfolk_id' => 10,
      'is_mono' => false
  ),
  62 => array(
      'type_id' => CT_RAFFLE,
      'name' => clienttranslate("Raffle"),
      'text' => clienttranslate("Choose left or right. Each player takes 1 random CARD from a player in the chosen direction."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Foxes"),
      'animalfolk_id' => 10,
      'is_mono' => false
  ),
  63 => array(
      'type_id' => CT_CHARITY,
      'name' => clienttranslate("Charity"),
      'text' => clienttranslate("Take 1 random CARD from each player. Give 1 of those back to each player."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Foxes"),
      'animalfolk_id' => 10,
      'is_mono' => false
  ),
  64 => array(
      'type_id' => CT_TASTERS,
      'name' => clienttranslate("Tasters"),
      'text' => clienttranslate("Give 1 CARD from the market to each player."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Foxes"),
      'animalfolk_id' => 10,
      'is_mono' => false
  ),
  65 => array(
      'type_id' => CT_RUMOURS,
      'name' => clienttranslate("Rumours"),
      'text' => clienttranslate("Look at the top CARD of each player's deck and give 1 of them to each player."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Foxes"),
      'animalfolk_id' => 10,
      'is_mono' => false
  ),
  66 => array(
      'type_id' => CT_DARINGADVENTURER,
      'name' => clienttranslate("Daring Adventurer"),
      'text' => clienttranslate("Roll DIE_POLECAT. Draw that many CARDS3. Discard that many CARDS3."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Polecats"),
      'animalfolk_id' => 11,
      'is_mono' => false
  ),
  67 => array(
      'type_id' => CT_RAREARTEFACT,
      'name' => clienttranslate("Rare Artefact"),
      'text' => clienttranslate("Show 1 CARD. Roll DIE_POLECAT and multiply the shown CARD value by the rolled value."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Polecats"),
      'animalfolk_id' => 11,
      'is_mono' => false
  ),
  68 => array(
      'type_id' => CT_SWANK,
      'name' => clienttranslate("Swank"),
      'text' => clienttranslate("Toss 1 CARD. If it was an animalfolk CARD, draw 1 CARD from the supply."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Polecats"),
      'animalfolk_id' => 11,
      'is_mono' => false
  ),
  69 => array(
      'type_id' => CT_RISKYBUSINESS,
      'name' => clienttranslate("Risky Business"),
      'text' => clienttranslate("If you guess the top CARD value of the supply, take it. Otherwise toss it."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Polecats"),
      'animalfolk_id' => 11,
      'is_mono' => false
  ),
  70 => array(
      'type_id' => CT_NATURALSURVIVOR,
      'name' => clienttranslate("Natural Survivor"),
      'text' => clienttranslate("Roll DIE_POLECAT. Search your deck and swap that many CARDS3 between your hand and deck. Shuffle your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Polecats"),
      'animalfolk_id' => 11,
      'is_mono' => false
  ),
  71 => array(
      'type_id' => CT_SOFA,
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
      'animalfolk_id' => 11,
      'is_mono' => false
  ),
  72 => array(
      'type_id' => CT_WISESPY,
      'name' => clienttranslate("Wise Spy"),
      'text' => clienttranslate("Look at the top 3 CARDS3 of your deck. You may reorder them."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Owls"),
      'animalfolk_id' => 12,
      'is_mono' => false
  ),
  73 => array(
      'type_id' => CT_ANCIENTKNOWLEDGE,
      'name' => clienttranslate("Ancient Knowledge"),
      'text' => clienttranslate("After another player has played a technique, draw 2 CARDS2 and discard this CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => "onResolve",
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Owls"),
      'animalfolk_id' => 12,
      'is_mono' => false
  ),
  74 => array(
      'type_id' => CT_QUALITYINSPECTION,
      'name' => clienttranslate("Quality Inspection"),
      'text' => clienttranslate("After this CARD gets into your hand, toss 1 CARD and draw 1 CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => "onDraw",
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Owls"),
      'animalfolk_id' => 12,
      'is_mono' => false
  ),
  75 => array(
      'type_id' => CT_BINOCULARS,
      'name' => clienttranslate("Binoculars"),
      'text' => clienttranslate("After another player has purchased, search your deck for 2 CARDS2. Shuffle your deck and discard this CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => "onPurchase",
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Owls"),
      'animalfolk_id' => 12,
      'is_mono' => false
  ),
  76 => array(
      'type_id' => CT_BALANCING,
      'name' => clienttranslate("Balancing"),
      'text' => clienttranslate("After another player has built, take any 2 CARDS2 from your discard and discard this CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => "onShuffle",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Owls"),
      'animalfolk_id' => 12,
      'is_mono' => false
  ),
  77 => array(
      'type_id' => CT_EXTRAREMARKS,
      'name' => clienttranslate("Extra Remarks"),
      'text' => clienttranslate("At the end of your turn, draw 2 CARDS2 and discard this CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => "onBuild",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Owls"),
      'animalfolk_id' => 12,
      'is_mono' => false
  ),
  78 => array(
      'type_id' => CT_MASTERBUILDER,
      'name' => clienttranslate("Master Builder"),
      'text' => clienttranslate("Next time you have gained a new CARD from the market, take any 1 CARD from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onMarketCard",
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  79 => array(
      'type_id' => CT_SNACK,
      'name' => clienttranslate("Snack"),
      'text' => clienttranslate("Next time before you build, take 1 CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onPreBuild",
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  80 => array(
      'type_id' => CT_WINDOFCHANGE,
      'name' => clienttranslate("Wind of Change"),
      'text' => clienttranslate("Next time you have purchased, toss any 0-1 CARD from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onPurchase",
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  81 => array(
      'type_id' => CT_OVERTIME,
      'name' => clienttranslate("Overtime"),
      'text' => clienttranslate("Next time you build, you can include CARDS3 from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onBuild",
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  82 => array(
      'type_id' => CT_ORDERINCHAOS,
      'name' => clienttranslate("Order in Chaos"),
      'text' => clienttranslate("Next time you have taken the inventory action, take 1 CARD from the market and get a bonus action."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onShuffle",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  83 => array(
      'type_id' => CT_PRACTICE,
      'name' => clienttranslate("Practice"),
      'text' => clienttranslate("Next time you discard a resolved technique CARD, you may take it."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onResolve",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  84 => array(
      'type_id' => CT_RIGOROUSCHRONICLER,
      'name' => clienttranslate("Rigorous Chronicler"),
      'text' => clienttranslate("When used to purchase, decide this CARD value (1-3)."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  85 => array(
      'type_id' => CT_REFRESHINGDRINK,
      'name' => clienttranslate("Refreshing Drink"),
      'text' => clienttranslate("Draw 1 CARD. Discard 1 CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  86 => array(
      'type_id' => CT_DUPLICATEENTRY,
      'name' => clienttranslate("Duplicate Entry"),
      'text' => clienttranslate("Search your deck for 2 CARDS2 to put aside. Shuffle your deck. Toss 0-1 of them. Place the rest on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  87 => array(
      'type_id' => CT_HISTORYLESSON,
      'name' => clienttranslate("History Lesson"),
      'text' => clienttranslate("Shuffle any of the top 3 CARDS3 of your discard into your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  88 => array(
      'type_id' => CT_CULTURALPRESERVATION,
      'name' => clienttranslate("Cultural Preservation"),
      'text' => clienttranslate("Search your deck for 1 CARD to take and 2 CARDS2 to discard. Shuffle your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  89 => array(
      'type_id' => CT_SLICEOFLIFE,
      'name' => clienttranslate("Slice of Life"),
      'text' => clienttranslate("Discard 2 CARDS2 to draw 2 CARDS2."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  90 => array(
      'type_id' => CT_VORACIOUSCONSUMER,
      'name' => clienttranslate("Voracious Consumer"),
      'text' => clienttranslate("Shuffle your discard into your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  91 => array(
      'type_id' => CT_DELIGHTFULSURPRISE,
      'name' => clienttranslate("Delightful Surprise"),
      'text' => clienttranslate("Look at the top 2 CARDS2 of the supply and take 1 of them. Toss the other and this CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  92 => array(
      'type_id' => CT_FORTUNATEUPGRADE,
      'name' => clienttranslate("Fortunate Upgrade"),
      'text' => clienttranslate("Toss 1 CARD. Draw 1 CARD from the supply."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  93 => array(
      'type_id' => CT_REPLACEMENT,
      'name' => clienttranslate("Replacement"),
      'text' => clienttranslate("Toss 1 animalfolk CARD. Take 1 CARD from the market within 1 of that CARD value."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  94 => array(
      'type_id' => CT_FASHIONHINT,
      'name' => clienttranslate("Fashion Hint"),
      'text' => clienttranslate("You may toss 1 CARD from the supply. You may swap 1 animalfolk CARD with the top CARD of the bin."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  95 => array(
      'type_id' => CT_ROYALPRIVILEGE,
      'name' => clienttranslate("Royal Privilege"),
      'text' => clienttranslate("When used to purchase, you may toss 1 animalfolk CARD to take another CARD from the market."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  96 => array(
      'type_id' => CT_POMPOUSPROFESSIONAL,
      'name' => clienttranslate("Pompous Professional"),
      'text' => clienttranslate("Name a set. Discard 3 CARDS3 and take 1 CARD of the named set from those."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Magpies"),
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  97 => array(
      'type_id' => CT_BRIBE,
      'name' => clienttranslate("Bribe"),
      'text' => clienttranslate("When purchased or used to purchase, hand size +1 for this turn."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Magpies"),
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  98 => array(
      'type_id' => CT_BURGLARY,
      'name' => clienttranslate("Burglary"),
      'text' => clienttranslate("If you guess the top CARD value from another player's deck, take it. Otherwise discard it."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Magpies"),
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  99 => array(
      'type_id' => CT_GRASP,
      'name' => clienttranslate("Grasp"),
      'text' => clienttranslate("If you guess the value of 1 random CARD from another player, take it. Otherwise discard it."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Magpies"),
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  100 => array(
      'type_id' => CT_PERISCOPE,
      'name' => clienttranslate("Periscope"),
      'text' => clienttranslate("Name a set and value. Discard 2 CARDS2 from another player's deck one by one, taking matching cards."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Magpies"),
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  101 => array(
      'type_id' => CT_SUDDENNAP,
      'name' => clienttranslate("Sudden Nap"),
      'text' => clienttranslate("Toss 1 random CARD from another player."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Magpies"),
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  102 => array(
      'type_id' => CT_CAREFREESWAPPER,
      'name' => clienttranslate("Carefree Swapper"),
      'text' => clienttranslate("Swap this CARD with the top CARD from another player's discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  103 => array(
      'type_id' => CT_BARGAINSEEKER,
      'name' => clienttranslate("Bargain Seeker"),
      'text' => clienttranslate("Toss the rightmost CARD from the market and fill the empty market slot from the supply."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  104 => array(
      'type_id' => CT_DELICACY,
      'name' => clienttranslate("Delicacy"),
      'text' => clienttranslate("Look at the top 2 CARDS2 of another player's deck. You may swap this CARD with 1 of them. Shuffle the 2 CARDS2 into their deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  105 => array(
      'type_id' => CT_UMBRELLA,
      'name' => clienttranslate("Umbrella"),
      'text' => clienttranslate("Look at 2 random CARDS2 from another player. You may swap this CARD with 1 of them."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  106 => array(
      'type_id' => CT_VELOCIPEDE,
      'name' => clienttranslate("Velocipede"),
      'text' => clienttranslate("Swap this CARD with any 1 CARD from another player's discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  107 => array(
      'type_id' => CT_MATCHINGCOLOURS,
      'name' => clienttranslate("Matching Colours"),
      'text' => clienttranslate("Swap an animalfolk CARD with 1 CARD of equal value from an opponent's stall."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  108 => array(
      'type_id' => CT_ARCANESCHOLAR,
      'name' => clienttranslate("Arcane Scholar"),
      'text' => clienttranslate("Roll DIE_HARE. Take the top CARD of [COMET: your discard] [PLANET: your deck] [STARS: nowhere]."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Hares"),
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  109 => array(
      'type_id' => CT_BAROMETER,
      'name' => clienttranslate("Barometer"),
      'text' => clienttranslate("Toss 1 CARD from the supply to change this CARD value to be equal to the tossed CARD value."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Hares"),
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  110 => array(
      'type_id' => CT_BADOMEN,
      'name' => clienttranslate("Bad Omen"),
      'text' => clienttranslate("Look at the top 3 CARDS3 of your deck. Toss 0-1 of them and reorder the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Hares"),
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  111 => array(
      'type_id' => CT_FESTIVAL,
      'name' => clienttranslate("Festival"),
      'text' => clienttranslate("Roll DIE_HARE. Draw 1 CARD from [COMET: the supply] [PLANET: your deck] [STARS: nowhere]."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Hares"),
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  112 => array(
      'type_id' => CT_CELESTIALGUIDANCE,
      'name' => clienttranslate("Celestial Guidance"),
      'text' => clienttranslate("Roll DIE_HARE. Take any 1 CARD from [COMET: the market] [PLANET: your discard pile] [STARS: nowhere]."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Hares"),
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  113 => array(
      'type_id' => CT_CALENDAR,
      'name' => clienttranslate("Calendar"),
      'text' => clienttranslate("Shuffle the top CARD of your discard into your deck."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Hares"),
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  114 => array(
      'type_id' => CT_CLEVERGUARDIAN,
      'name' => clienttranslate("Clever Guardian"),
      'text' => clienttranslate("Store 1 CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  115 => array(
      'type_id' => CT_BARRICADE,
      'name' => clienttranslate("Barricade"),
      'text' => clienttranslate("At the end of your turn, take 1-2 CARDS2 junk from your discard."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  116 => array(
      'type_id' => CT_WHEELBARROW,
      'name' => clienttranslate("Wheelbarrow"),
      'text' => clienttranslate("Look at the top CARD of your deck. Toss or store it."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  117 => array(
      'type_id' => CT_VIGILANCE,
      'name' => clienttranslate("Vigilance"),
      'text' => clienttranslate("Search your deck for 1 CARD to store. Shuffle your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  118 => array(
      'type_id' => CT_SUPPLYDEPOT,
      'name' => clienttranslate("Supply Depot"),
      'text' => clienttranslate("Store the top 2 CARDS2 of your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  119 => array(
      'type_id' => CT_TACTICALMEASUREMENT,
      'name' => clienttranslate("Tactical Measurement"),
      'text' => clienttranslate("Draw 2 CARDS2. Place 2 CARDS2 on your deck."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  120 => array(
      'type_id' => CT_RESOURCEFULALLY,
      'name' => clienttranslate("Resourceful Ally"),
      'text' => clienttranslate("Spend 2 to place any 2 CARDS2 from your discard on the bottom of your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  121 => array(
      'type_id' => CT_ICETRADE,
      'name' => clienttranslate("Ice Trade"),
      'text' => clienttranslate("Spend X (1+) to draw 1 CARD from the supply."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  122 => array(
      'type_id' => CT_TRAVELINGEQUIPMENT,
      'name' => clienttranslate("Traveling Equipment"),
      'text' => clienttranslate("Spend 1 to draw 2 CARDS2. Toss 1 CARD and discard 1 CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  123 => array(
      'type_id' => CT_STOVE,
      'name' => clienttranslate("Stove"),
      'text' => clienttranslate("When used to build, spend X (1+) to change this CARD value to X/2 (rounded up)."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  124 => array(
      'type_id' => CT_FISHING,
      'name' => clienttranslate("Fishing"),
      'text' => clienttranslate("Spend 1 to place any 1-3 CARDS3 from your discard on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  125 => array(
      'type_id' => CT_PRACTICALVALUES,
      'name' => clienttranslate("Practical Values"),
      'text' => clienttranslate("Each CARD valued 1 you use is valued 5, each 2 is 4, and vice versa, for this turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  126 => array(
      'type_id' => CT_AVIDFINANCIER,
      'name' => clienttranslate("Avid Financier"),
      'text' => clienttranslate("Gain 2 COIN on this CARD. Your next 2 turns, take 1 COIN from this CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Tuataras"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  127 => array(
      'type_id' => CT_GREED,
      'name' => clienttranslate("Greed"),
      'text' => clienttranslate("Spend 1 to draw 1 CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Tuataras"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  128 => array(
      'type_id' => CT_GOLDENOPPORTUNITY,
      'name' => clienttranslate("Golden Opportunity"),
      'text' => clienttranslate("Toss 1 CARD. Gain 1 COIN."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Tuataras"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  129 => array(
      'type_id' => CT_CACHE,
      'name' => clienttranslate("Cache"),
      'text' => clienttranslate("Spend 2 to take any 1 CARD from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Tuataras"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  130 => array(
      'type_id' => CT_DISPLAYOFPOWER,
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
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  131 => array(
      'type_id' => CT_SAFEPROFITS,
      'name' => clienttranslate("Safe Profits"),
      'text' => clienttranslate("Spend X (1-10) to gain x/2 COIN (rounded up)."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Tuataras"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  132 => array(
      'type_id' => CT_IMPULSIVEVISIONARY,
      'name' => clienttranslate("Impulsive Visionary"),
      'text' => clienttranslate("Finish 1: Draw 1 CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Turtles"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  133 => array(
      'type_id' => CT_COLLECTORSDESIRE,
      'name' => clienttranslate("Collector's Desire"),
      'text' => clienttranslate("Finish 2: Take the leftmost CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Turtles"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  134 => array(
      'type_id' => CT_GROUNDBREAKINGIDEA,
      'name' => clienttranslate("Groundbreaking Idea"),
      'text' => clienttranslate("Toss any 1 CARD from your discard. Finish 2: place any 1 CARD from your discard on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Turtles"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  135 => array(
      'type_id' => CT_INSPIRATION,
      'name' => clienttranslate("Inspiration"),
      'text' => clienttranslate("Finish 2: Draw 2 CARDS2."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Turtles"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  136 => array(
      'type_id' => CT_INSIGHT,
      'name' => clienttranslate("Insight"),
      'text' => clienttranslate("Look at the top 2 CARDS2 of your deck. You may reorder them. Finish 2: Draw 2 CARDS2."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Turtles"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  137 => array(
      'type_id' => CT_PERFECTMOVE,
      'name' => clienttranslate("Perfect Move"),
      'text' => clienttranslate("Finish 3: CARDS3 you use this turn get +1 to their value."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Turtles"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  138 => array(
      'type_id' => CT_SHREWDTRICKSTER,
      'name' => clienttranslate("Shrewd Trickster"),
      'text' => clienttranslate("Look at the top CARD of any player's deck. You may discard it."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  139 => array(
      'type_id' => CT_DISRUPTIVESPEECH,
      'name' => clienttranslate("Disruptive Speech"),
      'text' => clienttranslate("Discard 2 random CARDS2 from any player. They draw as many CARDS2."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  140 => array(
      'type_id' => CT_TITFORTAT,
      'name' => clienttranslate("Tit for Tat"),
      'text' => clienttranslate("Shuffle any 2 CARDS2 from any player's discard into their deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  141 => array(
      'type_id' => CT_SHAMELESSRUMMAGE,
      'name' => clienttranslate("Shameless Rummage"),
      'text' => clienttranslate("Look at the top 3 CARDS3 of any player's deck and discard any of them. Shuffle their deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  142 => array(
      'type_id' => CT_PUBLICHUMILIATION,
      'name' => clienttranslate("Public Humiliation"),
      'text' => clienttranslate("Discard 1 random CARD from any player."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  143 => array(
      'type_id' => CT_EQUALITY,
      'name' => clienttranslate("Equality"),
      'text' => clienttranslate("Shuffle any player’s discard. They swap 2 random CARDS2 with the top 2 CARDS2 of their discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  144 => array(
      'type_id' => CT_FUMBLINGDREAMER,
      'name' => clienttranslate("Fumbling Dreamer"),
      'text' => clienttranslate("Roll DIE_PANGOLIN1 and DIE_PANGOLIN2 until you have different results. Move 1 CARD from any player's SOURCE into their DESTINATION."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  145 => array(
      'type_id' => CT_COFFEEGRINDER,
      'name' => clienttranslate("Coffee Grinder"),
      'text' => clienttranslate("Discard 1-2 CARDS2 from any player's deck one by one."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  146 => array(
      'type_id' => CT_ACCIDENT,
      'name' => clienttranslate("Accident"),
      'text' => clienttranslate("Discard your hand. Draw as many CARD and shuffle them with another player's hand. Randomly give both their original number back."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  147 => array(
      'type_id' => CT_LOOSEMARBLES,
      'name' => clienttranslate("Loose Marbles"),
      'text' => clienttranslate("Roll DIE_PANGOLIN1 and DIE_PANGOLIN2. Place 1 CARD from any player's SOURCE into a different player's DESTINATION."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  148 => array(
      'type_id' => CT_ANOTHERFINEMESS,
      'name' => clienttranslate("Another Fine Mess"),
      'text' => clienttranslate("Roll DIE_PANGOLIN1 and DIE_PANGOLIN2. Shuffle 2 cards from any player's SOURCE into a different player's DESTINATION. Repeat reversed without shuffling."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  149 => array(
      'type_id' => CT_FRESHSTART,
      'name' => clienttranslate("Fresh Start"),
      'text' => clienttranslate("Shuffle any player's discard into their deck. Draw 1 CARD from their deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  150 => array(
      'type_id' => CT_MEDDLINGMARKETEER,
      'name' => clienttranslate("Meddling Marketeer"),
      'text' => clienttranslate("Look at the top 3 CARDS3 of your deck and discard any of them. You may reorder the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Gulls"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  151 => array(
      'type_id' => CT_GOODWILLPRESENTS,
      'name' => clienttranslate("Goodwill Presents"),
      'text' => clienttranslate("Place 1 junk CARD from the junkyard on any 1-2 players' discards."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Gulls"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  152 => array(
      'type_id' => CT_ALTERNATIVEPLAN,
      'name' => clienttranslate("Alternative Plan"),
      'text' => clienttranslate("Toss any 1 CARD from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Gulls"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  153 => array(
      'type_id' => CT_ANCHOR,
      'name' => clienttranslate("Anchor"),
      'text' => clienttranslate("Look at the top 3 CARDS3 of your deck and place 1 of them on any player's discard. You may reorder the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Gulls"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  154 => array(
      'type_id' => CT_MANUFACTUREDJOY,
      'name' => clienttranslate("Manufactured Joy"),
      'text' => clienttranslate("Search your deck for 1 CARD. Shuffle your deck. Place 1 CARD on any player's discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Gulls"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  155 => array(
      'type_id' => CT_SHAKYENTERPRISE,
      'name' => clienttranslate("Shaky Enterprise"),
      'text' => clienttranslate("Take any of the top 3 CARDS3 of your discard. Place 1 on any player's discard and the rest on your deck in any order."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Gulls"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  156 => array(
      'type_id' => CT_DRAMATICROMANTIC,
      'name' => clienttranslate("Dramatic Romantic"),
      'text' => clienttranslate("Move your CLOCK 1 forward or backward."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Mongooses"),
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  157 => array(
      'type_id' => CT_BOUQUETS,
      'name' => clienttranslate("Bouquets"),
      'text' => clienttranslate("Draw [DAWN 1 CARD] [DAY 2 CARDS2] [NIGHT 1 CARD]. Place 1 CARD on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Mongooses"),
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  158 => array(
      'type_id' => CT_SELECTINGCONTRACTS,
      'name' => clienttranslate("Selecting Contracts"),
      'text' => clienttranslate("Toss any 1 CARD of the top [DAWN 2 CARDS2] [DAY 4 CARDS3] [NIGHT 1 CARD] of your discard. Place the rest on your deck in any order."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Mongooses"),
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  159 => array(
      'type_id' => CT_SERENADE,
      'name' => clienttranslate("Serenade"),
      'text' => clienttranslate("Take 1 CARD from [DAWN your stall] [DAY an opponent's stall] [NIGHT the market]. Place this CARD in its place."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Mongooses"),
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  160 => array(
      'type_id' => CT_SPINNINGWHEEL,
      'name' => clienttranslate("Spinning Wheel"),
      'text' => clienttranslate("Discard X (1-3) CARDS3. Draw [DAWN 1 CARD] [DAY X CARDS3] [NIGHT 1 CARD]."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Mongooses"),
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  161 => array(
      'type_id' => CT_INHERITANCE,
      'name' => clienttranslate("Inheritance"),
      'text' => clienttranslate("Look at the top [DAWN 2 CARDS2] [DAY 5 CARDS3] [NIGHT 1 CARD] of the supply and take 1 CARD of them. Toss the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Mongooses"),
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  162 => array(
      'type_id' => CT_SNEAKYSCOUT,
      'name' => clienttranslate("Sneaky Scout"),
      'text' => clienttranslate("Look at the top 3 CARDS3 of your [NIGHT or another player's] deck. You may reorder them."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  163 => array(
      'type_id' => CT_FALSEALARM,
      'name' => clienttranslate("False Alarm"),
      'text' => clienttranslate("Draw 1 CARD [NIGHT or take the top CARD of your discard]."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  164 => array(
      'type_id' => CT_HEROICDEED,
      'name' => clienttranslate("Heroic Deed"),
      'text' => clienttranslate("Draw 1 CARD from your [NIGHT or another player's] deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  165 => array(
      'type_id' => CT_SECRETMISSION,
      'name' => clienttranslate("Secret Mission"),
      'text' => clienttranslate("Draw 1 CARD [NIGHT or take 1 random CARD from another player]."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  166 => array(
      'type_id' => CT_CAPTURE,
      'name' => clienttranslate("Capture"),
      'text' => clienttranslate("Look at the top 2 CARDS2 of your [NIGHT or another player's] deck and take 1 of them. Discard the other."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  167 => array(
      'type_id' => CT_PROVOCATION,
      'name' => clienttranslate("Provocation"),
      'text' => clienttranslate("Choose 1 CARD [NIGHT and look at 1 random CARD from another player]. Toss 1 of them."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  168 => array(
      'type_id' => CT_PRISTINEOWNER,
      'name' => clienttranslate("Pristine Owner"),
      'text' => clienttranslate("Draw 2 CARDS2. Place 1 CARD junk from the junkyard on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Snow Macaques"),
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  169 => array(
      'type_id' => CT_BONSAI,
      'name' => clienttranslate("Bonsai"),
      'text' => clienttranslate("At the end of your turn, discard 2 junk CARDS2 to draw 3 CARDS3."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Snow Macaques"),
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  170 => array(
      'type_id' => CT_RAKE,
      'name' => clienttranslate("Rake"),
      'text' => clienttranslate("Search your deck for 0-1 CARD to toss and 0-2 CARDS2 to discard. Shuffle your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Snow Macaques"),
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  171 => array(
      'type_id' => CT_SLOTMACHINE,
      'name' => clienttranslate("Slot Machine"),
      'text' => clienttranslate("Draw CARDS3 until you draw 1 non-junk CARD. Discard any junk CARDS3 drawn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Snow Macaques"),
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  172 => array(
      'type_id' => CT_GENERATIONCHANGE,
      'name' => clienttranslate("Generation Change"),
      'text' => clienttranslate("Take any 2 CARDS2 from your discard. Place 2 junk CARDS2 from the junkyard on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Snow Macaques"),
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  173 => array(
      'type_id' => CT_WARMEMBRACE,
      'name' => clienttranslate("Warm Embrace"),
      'text' => clienttranslate("While in your stall, you can include 1 junk CARD in each new stack."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Snow Macaques"),
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  174 => array(
      'type_id' => CT_SWIFTMEMBER,
      'name' => clienttranslate("Swift Member"),
      'text' => clienttranslate("Mono draws 3 CARDS3. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Macaws"),
      'animalfolk_id' => 1,
      'is_mono' => true
  ),
  175 => array(
      'type_id' => CT_LOYALMEMBER,
      'name' => clienttranslate("Loyal Member"),
      'text' => clienttranslate("Mono takes the highest printed valued CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Pandas"),
      'animalfolk_id' => 2,
      'is_mono' => true
  ),
  176 => array(
      'type_id' => CT_WILYMEMBER,
      'name' => clienttranslate("Wily Member"),
      'text' => clienttranslate("You discard 1 random CARD. If it is an animalfolk CARD, Mono takes it. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Raccoons"),
      'animalfolk_id' => 3,
      'is_mono' => true
  ),
  177 => array(
      'type_id' => CT_STASHINGMEMBER,
      'name' => clienttranslate("Stashing Member"),
      'text' => clienttranslate("Mono can use junk CARDS3 to build this turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Squirrels"),
      'animalfolk_id' => 4,
      'is_mono' => true
  ),
  178 => array(
      'type_id' => CT_BOLDMEMBER,
      'name' => clienttranslate("Bold Member"),
      'text' => clienttranslate("Roll DIE_OCELOT. Swap that many CARDS3 between the tops of your and Mono’s decks. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Ocelots"),
      'animalfolk_id' => 5,
      'is_mono' => true
  ),
  179 => array(
      'type_id' => CT_FLEXIBLEMEMBER,
      'name' => clienttranslate("Flexible Member"),
      'text' => clienttranslate("If Mono's discard has no Mono CARDS3, discard Mono’s deck. Mono plays 1 Mono CARD from its discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => true
  ),
  180 => array(
      'type_id' => CT_TIRELESSMEMBER,
      'name' => clienttranslate("Tireless Member"),
      'text' => clienttranslate("Mono swaps its lowest valued animalfolk CARD with the highest valued CARD in its stall. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Platypuses"),
      'animalfolk_id' => 7,
      'is_mono' => true
  ),
  181 => array(
      'type_id' => CT_STEADYMEMBER,
      'name' => clienttranslate("Steady Member"),
      'text' => clienttranslate("At the start of Mono’s next turn, it takes the leftmost CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Sloths"),
      'animalfolk_id' => 8,
      'is_mono' => true
  ),
  182 => array(
      'type_id' => CT_LITTLEMEMBER,
      'name' => clienttranslate("Little Member"),
      'text' => clienttranslate("Mono draws 1 CARD from your deck. It places back its lowest CARD. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Crocodiles"),
      'animalfolk_id' => 9,
      'is_mono' => true
  ),
  183 => array(
      'type_id' => CT_CUNNINGMEMBER,
      'name' => clienttranslate("Cunning Member"),
      'text' => clienttranslate("Mono draws 1 CARD from its and your deck. It gives you the lower valued CARD of those. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Foxes"),
      'animalfolk_id' => 10,
      'is_mono' => true
  ),
  184 => array(
      'type_id' => CT_DARINGMEMBER,
      'name' => clienttranslate("Daring Member"),
      'text' => clienttranslate("Roll DIE_POLECAT. Multiply the value of each CARD Mono uses this turn by the rolled value. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Polecats"),
      'animalfolk_id' => 11,
      'is_mono' => true
  ),
  185 => array(
      'type_id' => CT_WISEMEMBER,
      'name' => clienttranslate("Wise Member"),
      'text' => clienttranslate("If you purchased on your last turn, Mono draws 5 CARDS3. Otherwise, it draws 1 CARD. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Owls"),
      'animalfolk_id' => 12,
      'is_mono' => true
  ),
  186 => array(
      'type_id' => CT_MASTERMEMBER,
      'name' => clienttranslate("Master Member"),
      'text' => clienttranslate("Next time Mono fails to build, it takes 2 rightmost CARDS2 from the market and ends its action phase."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onMonoFailsToBuild",
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 13,
      'is_mono' => true
  ),
  187 => array(
      'type_id' => CT_RIGOROUSMEMBER,
      'name' => clienttranslate("Rigorous Member"),
      'text' => clienttranslate("Mono discards all junk CARDS3. It draws as many CARDS3 +1. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 14,
      'is_mono' => true
  ),
  188 => array(
      'type_id' => CT_VORACIOUSMEMBER,
      'name' => clienttranslate("Voracious Member"),
      'text' => clienttranslate("Mono tosses its lowest valued animalfolk CARD. Mono takes the highest valued CARD from the market.  Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 15,
      'is_mono' => true
  ),
  189 => array(
      'type_id' => CT_POMPOUSMEMBER,
      'name' => clienttranslate("Pompous Member"),
      'text' => clienttranslate("Discard 1 random CARD from your hand. If the CARD value matches any CARDS3 in the market, Mono takes it. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Magpies"),
      'animalfolk_id' => 16,
      'is_mono' => true
  ),
  190 => array(
      'type_id' => CT_CAREFREEMEMBER,
      'name' => clienttranslate("Carefree Member"),
      'text' => clienttranslate("Swap 1 animalfolk CARD from Mono with 1 random animalfolk CARD from you. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 17,
      'is_mono' => true
  ),
  191 => array(
      'type_id' => CT_ARCANEMEMBER,
      'name' => clienttranslate("Arcane Member"),
      'text' => clienttranslate("Roll DIE_HARE. Mono draws 1 CARD from [COMET: nowhere] [PLANET: the supply] [STARS: its deck]. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Hares"),
      'animalfolk_id' => 18,
      'is_mono' => true
  ),
  192 => array(
      'type_id' => CT_CLEVERMEMBER,
      'name' => clienttranslate("Clever Member"),
      'text' => clienttranslate("Store the top 3 CARDS3 of Mono’s deck. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
      'animalfolk_id' => 19,
      'is_mono' => true
  ),
  193 => array(
      'type_id' => CT_RESOURCEFULMEMBER,
      'name' => clienttranslate("Resourceful Member"),
      'text' => clienttranslate("Add +1 to Mono’s highest valued CARD for each junk CARD in its hand."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 20,
      'is_mono' => true
  ),
  194 => array(
      'type_id' => CT_AVIDMEMBER,
      'name' => clienttranslate("Avid Member"),
      'text' => clienttranslate("Mono gains 10 COIN. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => "onMonoFailsToBuild",
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Tuataras"),
      'animalfolk_id' => 21,
      'is_mono' => true
  ),
  195 => array(
      'type_id' => CT_IMPULSIVEMEMBER,
      'name' => clienttranslate("Impulsive Member"),
      'text' => clienttranslate("Next time Mono fails to build, it draws 3 CARDS3 and tries to build again. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Turtles"),
      'animalfolk_id' => 22,
      'is_mono' => true
  ),
  196 => array(
      'type_id' => CT_SHREWDMEMBER,
      'name' => clienttranslate("Shrewd Member"),
      'text' => clienttranslate("Discard 1 random CARD. Shuffle 2 junk CARDS2 from your discard into your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
      'animalfolk_id' => 23,
      'is_mono' => true
  ),
  197 => array(
      'type_id' => CT_FUMBLINGMEMBER,
      'name' => clienttranslate("Fumbling Member"),
      'text' => clienttranslate("Roll DIE_PANGOLIN1 and DIE_PANGOLIN2. Look at 1 CARD from your SOURCE. If it is not junk, move it into Mono's DESTINATION. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 24,
      'is_mono' => true
  ),
  198 => array(
      'type_id' => CT_MEDDLINGMEMBER,
      'name' => clienttranslate("Meddling Member"),
      'text' => clienttranslate("Place 1 junk CARD from Mono’s discard and 1 junk CARD from the junkyard on your discard. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Gulls"),
      'animalfolk_id' => 25,
      'is_mono' => true
  ),
  199 => array(
      'type_id' => CT_DRAMATICMEMBER,
      'name' => clienttranslate("Dramatic Member"),
      'text' => clienttranslate("[DAWN Move Mono's CLOCK 1 forward.] Mono draws [DAY 4 CARDS3] [NIGHT 1 CARD]."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Mongooses"),
      'animalfolk_id' => 26,
      'is_mono' => true
  ),
  200 => array(
      'type_id' => CT_STEALTHYMEMBER,
      'name' => clienttranslate("Stealthy Member"),
      'text' => clienttranslate("[DAY Move Mono's CLOCK 1 forward.] [DAWN Mono draws 1 CARD.] [NIGHT Mono takes 1 random CARD from you.] Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 27,
      'is_mono' => true
  ),
  201 => array(
      'type_id' => CT_PRISTINEMEMBER,
      'name' => clienttranslate("Pristine Member"),
      'text' => clienttranslate("Mono takes 1 junk CARD from the junkyard and draws 5 CARDS3. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Snow Macaques"),
      'animalfolk_id' => 28,
      'is_mono' => true
  )
);
