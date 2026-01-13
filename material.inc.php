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
    define('CT_EXCLUSIVECONTACTS', 17);
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
    define('CT_RIGOROUSCHRONICLER', 78);
    define('CT_REFRESHINGDRINK', 79);
    define('CT_DUPLICATEENTRY', 80);
    define('CT_HISTORYLESSON', 81);
    define('CT_CULTURALPRESERVATION', 82);
    define('CT_SLICEOFLIFE', 83);
    define('CT_VORACIOUSCONSUMER', 84);
    define('CT_DELIGHTFULSURPRISE', 85);
    define('CT_FORTUNATEUPGRADE', 86);
    define('CT_REPLACEMENT', 87);
    define('CT_FASHIONHINT', 88);
    define('CT_ROYALPRIVILEGE', 89);
    define('CT_POMPOUSPROFESSIONAL', 90);
    define('CT_BRIBE', 91);
    define('CT_BURGLARY', 92);
    define('CT_GRASP', 93);
    define('CT_PERISCOPE', 94);
    define('CT_SUDDENNAP', 95);
    define('CT_CAREFREESWAPPER', 96);
    define('CT_BARGAINSEEKER', 97);
    define('CT_DELICACY', 98);
    define('CT_UMBRELLA', 99);
    define('CT_VELOCIPEDE', 100);
    define('CT_COLOURSWAP', 101);
    define('CT_ARCANESCHOLAR', 102);
    define('CT_BAROMETER', 103);
    define('CT_BADOMEN', 104);
    define('CT_FESTIVAL', 105);
    define('CT_CELESTIALGUIDANCE', 106);
    define('CT_CALENDAR', 107);
    define('CT_CLEVERGUARDIAN', 108);
    define('CT_BARRICADE', 109);
    define('CT_WHEELBARROW', 110);
    define('CT_VIGILANCE', 111);
    define('CT_SUPPLYDEPOT', 112);
    define('CT_TACTICALMEASUREMENT', 113);
    define('CT_AVIDFINANCIER', 114);
    define('CT_GREED', 115);
    define('CT_GOLDENOPPORTUNITY', 116);
    define('CT_CACHE', 117);
    define('CT_DISPLAYOFPOWER', 118);
    define('CT_SAFEPROFITS', 119);
    define('CT_DODOS1', 120);
    define('CT_DODOS2', 121);
    define('CT_DODOS3', 122);
    define('CT_DODOS4', 123);
    define('CT_DODOS5A', 124);
    define('CT_DODOS5B', 125);
    define('CT_CAPUCHINS1', 126);
    define('CT_CAPUCHINS2', 127);
    define('CT_CAPUCHINS3', 128);
    define('CT_CAPUCHINS4', 129);
    define('CT_CAPUCHINS5A', 130);
    define('CT_CAPUCHINS5B', 131);
    define('CT_OLMS1', 132);
    define('CT_OLMS2', 133);
    define('CT_OLMS3', 134);
    define('CT_OLMS4', 135);
    define('CT_OLMS5A', 136);
    define('CT_OLMS5B', 137);
    define('CT_RESOURCEFULALLY', 138);
    define('CT_ICETRADE', 139);
    define('CT_TRAVELINGEQUIPMENT', 140);
    define('CT_STOVE', 141);
    define('CT_FISHING', 142);
    define('CT_PRACTICALVALUES', 143);
    define('CT_IMPULSIVEVISIONARY', 144);
    define('CT_COLLECTORSDESIRE', 145);
    define('CT_GROUNDBREAKINGIDEA', 146);
    define('CT_INSPIRATION', 147);
    define('CT_INSIGHT', 148);
    define('CT_PERFECTMOVE', 149);
    define('CT_SKINKS1', 150);
    define('CT_SKINKS2', 151);
    define('CT_SKINKS3', 152);
    define('CT_SKINKS4', 153);
    define('CT_SKINKS5A', 154);
    define('CT_SKINKS5B', 155);
    define('CT_MASTERBUILDER', 156);
    define('CT_SNACK', 157);
    define('CT_WINDOFCHANGE', 158);
    define('CT_OVERTIME', 159);
    define('CT_ORDERINCHAOS', 160);
    define('CT_PRACTICE', 161);
    define('CT_PRISTINEOWNER', 162);
    define('CT_BONSAI', 163);
    define('CT_RAKE', 164);
    define('CT_SLOTMACHINE', 165);
    define('CT_GENERATIONCHANGE', 166);
    define('CT_WARMEMBRACE', 167);
    define('CT_MEDDLINGMARKETEER', 168);
    define('CT_GOODWILLPRESENTS', 169);
    define('CT_ALTERNATIVEPLAN', 170);
    define('CT_ANCHOR', 171);
    define('CT_MANUFACTUREDJOY', 172);
    define('CT_SHAKYENTERPRISE', 173);
    define('CT_FUMBLINGDREAMER', 174);
    define('CT_COFFEEGRINDER', 175);
    define('CT_ACCIDENT', 176);
    define('CT_LOOSEMARBLES', 177);
    define('CT_ANOTHERFINEMESS', 178);
    define('CT_SOUVENIRS', 179);
    define('CT_GLASSFROGS1', 180);
    define('CT_GLASSFROGS2', 181);
    define('CT_GLASSFROGS3', 182);
    define('CT_GLASSFROGS4', 183);
    define('CT_GLASSFROGS5A', 184);
    define('CT_GLASSFROGS5B', 185);
    define('CT_GORILLAS1', 186);
    define('CT_GORILLAS2', 187);
    define('CT_GORILLAS3', 188);
    define('CT_GORILLAS4', 189);
    define('CT_GORILLAS5A', 190);
    define('CT_GORILLAS5B', 191);
    define('CT_WALRUSES1', 192);
    define('CT_WALRUSES2', 193);
    define('CT_WALRUSES3', 194);
    define('CT_WALRUSES4', 195);
    define('CT_WALRUSES5A', 196);
    define('CT_WALRUSES5B', 197);
    define('CT_TASMANIANDEVILS1', 198);
    define('CT_TASMANIANDEVILS2', 199);
    define('CT_TASMANIANDEVILS3', 200);
    define('CT_TASMANIANDEVILS4', 201);
    define('CT_TASMANIANDEVILS5A', 202);
    define('CT_TASMANIANDEVILS5B', 203);
    define('CT_JUNGLEFOWLS1', 204);
    define('CT_JUNGLEFOWLS2', 205);
    define('CT_JUNGLEFOWLS3', 206);
    define('CT_JUNGLEFOWLS4', 207);
    define('CT_JUNGLEFOWLS5A', 208);
    define('CT_JUNGLEFOWLS5B', 209);
    define('CT_DRAMATICROMANTIC', 210);
    define('CT_SERENADE', 211);
    define('CT_SELECTINGCONTRACTS', 212);
    define('CT_BOUQUETS', 213);
    define('CT_SPINNINGWHEEL', 214);
    define('CT_INHERITANCE', 215);
    define('CT_SNEAKYSCOUT', 216);
    define('CT_FALSEALARM', 217);
    define('CT_HEROICDEED', 218);
    define('CT_SECRETMISSION', 219);
    define('CT_CAPTURE', 220);
    define('CT_PROVOCATION', 221);
    define('CT_SWIFTMEMBER', 222);
    define('CT_LOYALMEMBER', 223);
    define('CT_WILYMEMBER', 224);
    define('CT_STASHINGMEMBER', 225);
    define('CT_BOLDMEMBER', 226);
    define('CT_FLEXIBLEMEMBER', 227);
    define('CT_TIRELESSMEMBER', 228);
    define('CT_STEADYMEMBER', 229);
    define('CT_LITTLEMEMBER', 230);
    define('CT_CUNNINGMEMBER', 231);
    define('CT_DARINGMEMBER', 232);
    define('CT_WISEMEMBER', 233);
    define('CT_RIGOROUSMEMBER', 234);
    define('CT_VORACIOUSMEMBER', 235);
    define('CT_POMPOUSMEMBER', 236);
    define('CT_CAREFREEMEMBER', 237);
    define('CT_ARCANEMEMBER', 238);
    define('CT_CLEVERMEMBER', 239);
    define('CT_AVIDMEMBER', 240);
    define('CT_DODOSMONO', 241);
    define('CT_CAPUCHINSMONO', 242);
    define('CT_OLMSMONO', 243);
    define('CT_RESOURCEFULMEMBER', 244);
    define('CT_IMPULSIVEMEMBER', 245);
    define('CT_SKINKSMONO', 246);
    define('CT_MASTERMEMBER', 247);
    define('CT_PRISTINEMEMBER', 248);
    define('CT_MEDDLINGMEMBER', 249);
    define('CT_FUMBLINGMEMBER', 250);
    define('CT_GLASSFROGSMONO', 251);
    define('CT_GORILLASMONO', 252);
    define('CT_WALRUSESMONO', 253);
    define('CT_TASMANIANDEVILSMONO', 254);
    define('CT_JUNGLEFOWLSMONO', 255);
    define('CT_DRAMATICMEMBER', 256);
    define('CT_STEALTHYMEMBER', 257);
    define('CT_DEPRECATED_MARKETDISCOVERY', 258);
    define('CT_DEPRECATED_CHEER', 259);
    define('CT_DEPRECATED_TASTERS', 260);
    define('CT_DEPRECATED_ESSENTIALPURCHASE', 261);
    define('CT_DEPRECATED_STOCKCLEARANCE', 262);
    define('CT_DEPRECATED_BLINDFOLD', 263);
    define('CT_DEPRECATED_HISTORYLESSON', 264);
    define('CT_DEPRECATED_CULTURALPRESERVATION', 265);
    define('CT_DEPRECATED_SLICEOFLIFE', 266);
    define('CT_DEPRECATED_VORACIOUSCONSUMER', 267);
    define('CT_DEPRECATED_ROYALPRIVILEGE', 269);
    define('CT_DEPRECATED_VELOCIPEDE', 270);
    define('CT_DEPRECATED_INSIGHT', 271);
    define('CT_DEPRECATED_WHIRLIGIG', 272);
    define('CT_DEPRECATED_FRESHSTART', 273);
}

//define all special effects
if (!defined('EFFECT_CHAMELEON_TYPE')) {
    define('EFFECT_CHAMELEON_TYPE', 1000);
    define('EFFECT_CHAMELEON_VALUE', 1001);
    define('EFFECT_INCREASE_HAND_SIZE', 1002);
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

    //DoM3
    define('ANIMALFOLK_DESERTMONITORS', 13);
    define('ANIMALFOLK_LEMURS', 14);
    define('ANIMALFOLK_MAGPIES', 15);
    define('ANIMALFOLK_ECHIDNAS', 16);
    define('ANIMALFOLK_HARES', 17);
    define('ANIMALFOLK_TREEKANGAROOS', 18);

    //DoM4
    define('ANIMALFOLK_TUATARAS', 19);
    define('ANIMALFOLK_DODOS', 20);
    define('ANIMALFOLK_CAPUCHINS', 21);
    define('ANIMALFOLK_OLMS', 22);
    define('ANIMALFOLK_PENGUINS', 23);
    define('ANIMALFOLK_WOODTURTLES', 24);

    //DoM5
    define('ANIMALFOLK_SKINKS', 25);
    define('ANIMALFOLK_BEAVERS', 26);
    define('ANIMALFOLK_SNOWMACAQUES', 27);
    define('ANIMALFOLK_GULLS', 28);
    define('ANIMALFOLK_PANGOLINS', 29);
    define('ANIMALFOLK_GLASSFROGS', 30);

    //DoM6
    define('ANIMALFOLK_GORILLAS', 31);
    define('ANIMALFOLK_WALRUSES', 32);
    define('ANIMALFOLK_TASMANIANDEVILS', 33);
    define('ANIMALFOLK_JUNGLEFOWLS', 34);
    define('ANIMALFOLK_MONGOOSES', 35);
    define('ANIMALFOLK_BATS', 36);
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
    define('TRIGGER_ONCLEANUP', 'onCleanUp');
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
    CT_PRACTICE
);

//disable these animalfolks in the deck selection (and random selection)
$this->DISABLED_ANIMALFOLK_IDS = array(
    //ANIMALFOLK_PANDAS,            //reworked
    //ANIMALFOLK_OCELOTS,           //reworked
    //ANIMALFOLK_DESERTMONITORS,    //reworked
    //ANIMALFOLK_LEMURS,            //reworked
    //ANIMALFOLK_ECHIDNAS,          //reworked
    //ANIMALFOLK_WOODTURTLES,       //reworked
    //ANIMALFOLK_PANGOLINS,         //CT_ANOTHERFINEMESS requires an effect rework.
    
    ANIMALFOLK_BATS,                //new
    ANIMALFOLK_DODOS,               //new
    ANIMALFOLK_CAPUCHINS,           //new
    ANIMALFOLK_OLMS,                //new
    ANIMALFOLK_SKINKS,              //new
    ANIMALFOLK_GORILLAS,            //new
    ANIMALFOLK_WALRUSES,            //new
    ANIMALFOLK_TASMANIANDEVILS,     //new
    ANIMALFOLK_JUNGLEFOWLS,         //new

    // Won't have
    ANIMALFOLK_BEAVERS,
    ANIMALFOLK_OWLS,
    ANIMALFOLK_GLASSFROGS,
);

//additionally, also disable these animalfolks in solo-mode
$this->DISABLED_SOLO_ANIMALFOLK_IDS = array(
    //available
    //ANIMALFOLK_MACAWS,
    //ANIMALFOLK_PANDAS,
    //ANIMALFOLK_SQUIRRELS,
    //ANIMALFOLK_OCELOTS,
    //ANIMALFOLK_SLOTHS,
    //ANIMALFOLK_CROCODILES,
    //ANIMALFOLK_POLECATS,
    //ANIMALFOLK_DESERTMONITORS,
    //ANIMALFOLK_HARES,
    //ANIMALFOLK_PANGOLINS,
    //ANIMALFOLK_GULLS,
    //ANIMALFOLK_RACCOONS,              //v0.1.0
    //ANIMALFOLK_CHAMELEONS,            //v0.1.0
    //ANIMALFOLK_PLATYPUSES,            //v0.1.0
    //ANIMALFOLK_FOXES,                 //v0.1.0
    //ANIMALFOLK_MAGPIES,               //v0.1.0
    //ANIMALFOLK_ECHIDNAS,              //v0.1.0
    //ANIMALFOLK_TREEKANGAROOS,         //v0.1.0
    //ANIMALFOLK_TUATARAS,              //v0.1.0
    //ANIMALFOLK_PENGUINS,              //v0.1.0
    //ANIMALFOLK_WOODTURTLES,           //v0.1.0
    //ANIMALFOLK_SNOWMACAQUES,          //v0.1.0
    //ANIMALFOLK_MONGOOSES,             //v0.1.0
    
    ANIMALFOLK_DODOS,                   //new
    ANIMALFOLK_CAPUCHINS,               //new
    ANIMALFOLK_OLMS,                    //new
    ANIMALFOLK_SKINKS,                  //new
    ANIMALFOLK_GORILLAS,                //new
    ANIMALFOLK_WALRUSES,                //new
    ANIMALFOLK_TASMANIANDEVILS,         //new
    ANIMALFOLK_JUNGLEFOWLS,             //new
    ANIMALFOLK_BATS,                    //new

    // Effect not finalized
    ANIMALFOLK_LEMURS,

    // Won't have
    ANIMALFOLK_BEAVERS,
    ANIMALFOLK_OWLS,
    ANIMALFOLK_GLASSFROGS,
);

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
      'animalfolk_displayed' => clienttranslate("Junk"),
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  1 => array(
      'type_id' => 1,
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
      'animalfolk_displayed' => clienttranslate("Junk"),
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  2 => array(
      'type_id' => 2,
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
      'animalfolk_displayed' => clienttranslate("Junk"),
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  3 => array(
      'type_id' => 3,
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
      'animalfolk_displayed' => clienttranslate("Junk"),
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  4 => array(
      'type_id' => 4,
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
      'animalfolk_displayed' => clienttranslate("Junk"),
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  5 => array(
      'type_id' => 5,
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
      'animalfolk_displayed' => clienttranslate("Junk"),
      'animalfolk_id' => 0,
      'is_mono' => false
  ),
  6 => array(
      'type_id' => 6,
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
      'type_id' => 7,
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
      'type_id' => 8,
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
      'type_id' => 9,
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
      'type_id' => 10,
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
      'type_id' => 11,
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
      'type_id' => 12,
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
      'type_id' => 13,
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
      'type_id' => 14,
      'name' => clienttranslate("Essential Purchase"),
      'text' => clienttranslate("Toss 1 CARD.  CARDS3 in the market have -2 cost for this turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Pandas"),
      'animalfolk_id' => 2,
      'is_mono' => false
  ),
  15 => array(
      'type_id' => 15,
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
      'type_id' => 16,
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
      'type_id' => 17,
      'name' => clienttranslate("Exclusive Contacts"),
      'text' => clienttranslate("CARDS3 in the market have +2 cost for you this turn. Hand size +2 for this turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Pandas"),
      'animalfolk_id' => 2,
      'is_mono' => false
  ),
  18 => array(
      'type_id' => 18,
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
      'type_id' => 19,
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
      'type_id' => 20,
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
      'type_id' => 21,
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
      'type_id' => 22,
      'name' => clienttranslate("Sabotage"),
      'text' => clienttranslate("Look at the top 2 CARDS2 of another player's deck. Toss 1 and discard the other."),
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
      'type_id' => 23,
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
      'type_id' => 24,
      'name' => clienttranslate("Stashing Vendor"),
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
      'type_id' => 25,
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
      'type_id' => 26,
      'name' => clienttranslate("Nostalgic Item"),
      'text' => clienttranslate("When used to build, you can include any 1 animalfolk or junk CARD from your discard."),
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
      'type_id' => 27,
      'name' => clienttranslate("Acorn"),
      'text' => clienttranslate("Swap this CARD with CARD in an opponent's stall."),
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
      'type_id' => 28,
      'name' => clienttranslate("Accordion"),
      'text' => clienttranslate("When used to build, decide this CARD value (4-6)."),
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
      'animalfolk_id' => 4,
      'is_mono' => false
  ),
  30 => array(
      'type_id' => 30,
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
      'type_id' => 31,
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
      'type_id' => 32,
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
      'type_id' => 33,
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
      'type_id' => 34,
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
      'type_id' => 35,
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
      'type_id' => 36,
      'name' => clienttranslate("Flexible Shopkeeper"),
      'text' => clienttranslate("Copy 1 CARD in your rightmost stack."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  37 => array(
      'type_id' => 37,
      'name' => clienttranslate("Reflection"),
      'text' => clienttranslate("Discard 0-1 CARD from another player's deck. Copy the top CARD of their discard."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  38 => array(
      'type_id' => 38,
      'name' => clienttranslate("Good Old Times"),
      'text' => clienttranslate("Toss 0-1 CARD from the supply. Copy the top CARD of the bin."),
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
      'type_id' => 39,
      'name' => clienttranslate("Sound Detectors"),
      'text' => clienttranslate("Look at 2 random CARDS2 from another player. Copy 1 of them."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  40 => array(
      'type_id' => 40,
      'name' => clienttranslate("Trendsetting"),
      'text' => clienttranslate("Copy 1 CARD in the market."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  41 => array(
      'type_id' => 41,
      'name' => clienttranslate("Seeing Doubles"),
      'text' => clienttranslate("Show 1 CARD and copy it."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Chameleons"),
      'animalfolk_id' => 6,
      'is_mono' => false
  ),
  42 => array(
      'type_id' => 42,
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
      'type_id' => 43,
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
      'type_id' => 44,
      'name' => clienttranslate("Safety Precaution"),
      'text' => clienttranslate("Swap this CARD with CARD in your stall."),
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
      'type_id' => 45,
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
      'type_id' => 46,
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
      'type_id' => 47,
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
      'type_id' => 48,
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
      'type_id' => 49,
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
      'type_id' => 50,
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
      'type_id' => 51,
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
      'type_id' => 52,
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
      'type_id' => 53,
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
      'type_id' => 54,
      'name' => clienttranslate("Little Villain"),
      'text' => clienttranslate("Opponents discard 2 CARDS2 from their decks."),
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
      'type_id' => 55,
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
      'type_id' => 56,
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
      'type_id' => 57,
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
      'type_id' => 58,
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
      'type_id' => 59,
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
      'type_id' => 60,
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
      'type_id' => 61,
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
      'type_id' => 62,
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
      'type_id' => 63,
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
      'type_id' => 64,
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
      'type_id' => 65,
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
      'type_id' => 66,
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
      'type_id' => 67,
      'name' => clienttranslate("Rare Artefact"),
      'text' => clienttranslate("Show 1 CARD. Roll DIE_POLECAT and multiply the shown CARD value by the rolled value for this turn."),
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
      'type_id' => 68,
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
      'type_id' => 69,
      'name' => clienttranslate("Risky Business"),
      'text' => clienttranslate("If you guess the value of the top CARD of the supply, take it. Otherwise toss it."),
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
      'type_id' => 70,
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
      'type_id' => 71,
      'name' => clienttranslate("Sofa"),
      'text' => clienttranslate("While this CARD is in your stall, hand size +1."),
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
      'type_id' => 72,
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
      'type_id' => 73,
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
      'type_id' => 74,
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
      'type_id' => 75,
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
      'type_id' => 76,
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
      'type_id' => 77,
      'name' => clienttranslate("Extra Remarks"),
      'text' => clienttranslate("Discard 2 CARDS2 to draw 2 CARDS2."),
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
      'type_id' => 78,
      'name' => clienttranslate("Rigorous Chronicler"),
      'text' => clienttranslate("Shuffle your discard and place it on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  79 => array(
      'type_id' => 79,
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
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  80 => array(
      'type_id' => 80,
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
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  81 => array(
      'type_id' => 81,
      'name' => clienttranslate("History Lesson"),
      'text' => clienttranslate("Look at the top 3 CARDS3 of your deck and take 1 of them. Discard the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  82 => array(
      'type_id' => 82,
      'name' => clienttranslate("Cultural Preservation"),
      'text' => clienttranslate("When you build this turn, you may only use CARDS3 from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  83 => array(
      'type_id' => 83,
      'name' => clienttranslate("Slice of Life"),
      'text' => clienttranslate("While this CARD is in your discard at the end of your turn, draw 1 CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Desert Monitors"),
      'animalfolk_id' => 13,
      'is_mono' => false
  ),
  84 => array(
      'type_id' => 84,
      'name' => clienttranslate("Voracious Consumer"),
      'text' => clienttranslate("When used to purchase, decide this CARD value (1-3)."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  85 => array(
      'type_id' => 85,
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
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  86 => array(
      'type_id' => 86,
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
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  87 => array(
      'type_id' => 87,
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
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  88 => array(
      'type_id' => 88,
      'name' => clienttranslate("Fashion Hint"),
      'text' => clienttranslate("Draw 1 CARD from the supply. Toss it or end your action phase."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  89 => array(
      'type_id' => 89,
      'name' => clienttranslate("Royal Privilege"),
      'text' => clienttranslate("At the end of your turn, discard 1 animalfolk CARD to draw 2 CARDS2."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 14,
      'is_mono' => false
  ),
  90 => array(
      'type_id' => 90,
      'name' => clienttranslate("Pompous Professional"),
      'text' => clienttranslate("Name a set. Look at the top 4 CARDS3 of your deck. Take 1 CARD of the named set and discard the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Magpies"),
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  91 => array(
      'type_id' => 91,
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
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  92 => array(
      'type_id' => 92,
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
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  93 => array(
      'type_id' => 93,
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
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  94 => array(
      'type_id' => 94,
      'name' => clienttranslate("Periscope"),
      'text' => clienttranslate("Name a set and value. Discard 2 CARDS2 from another player's deck, taking matching cards."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Magpies"),
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  95 => array(
      'type_id' => 95,
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
      'animalfolk_id' => 15,
      'is_mono' => false
  ),
  96 => array(
      'type_id' => 96,
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
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  97 => array(
      'type_id' => 97,
      'name' => clienttranslate("Bargain Seeker"),
      'text' => clienttranslate("Replace the rightmost CARD in the market with 1 CARD from the supply. Toss the replaced CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  98 => array(
      'type_id' => 98,
      'name' => clienttranslate("Delicacy"),
      'text' => clienttranslate("Look at the top 2 CARDS2 of another player's deck. You may swap this CARD with 1 of them. Shuffle their deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  99 => array(
      'type_id' => 99,
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
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  100 => array(
      'type_id' => 100,
      'name' => clienttranslate("Velocipede"),
      'text' => clienttranslate("You may toss 1 CARD from the supply. You may swap 1 animalfolk CARD with the top CARD of the bin."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  101 => array(
      'type_id' => 101,
      'name' => clienttranslate("Colour Swap"),
      'text' => clienttranslate("Swap 1 animalfolk CARD with 1 CARD of equal value from any player's stall."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 16,
      'is_mono' => false
  ),
  102 => array(
      'type_id' => 102,
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
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  103 => array(
      'type_id' => 103,
      'name' => clienttranslate("Barometer"),
      'text' => clienttranslate("Toss 1 CARD from the supply to change this CARD value to be equal to the value of the tossed CARD."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Hares"),
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  104 => array(
      'type_id' => 104,
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
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  105 => array(
      'type_id' => 105,
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
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  106 => array(
      'type_id' => 106,
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
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  107 => array(
      'type_id' => 107,
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
      'animalfolk_id' => 17,
      'is_mono' => false
  ),
  108 => array(
      'type_id' => 108,
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
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  109 => array(
      'type_id' => 109,
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
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  110 => array(
      'type_id' => 110,
      'name' => clienttranslate("Wheelbarrow"),
      'text' => clienttranslate("Look the top CARD of your deck. Toss or store it."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  111 => array(
      'type_id' => 111,
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
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  112 => array(
      'type_id' => 112,
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
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  113 => array(
      'type_id' => 113,
      'name' => clienttranslate("Tactical Measurement"),
      'text' => clienttranslate("At the end of your turn, draw 2 CARDS2. Place 2 CARDS2 on your deck."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
      'animalfolk_id' => 18,
      'is_mono' => false
  ),
  114 => array(
      'type_id' => 114,
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
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  115 => array(
      'type_id' => 115,
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
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  116 => array(
      'type_id' => 116,
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
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  117 => array(
      'type_id' => 117,
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
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  118 => array(
      'type_id' => 118,
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
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  119 => array(
      'type_id' => 119,
      'name' => clienttranslate("Safe Profits"),
      'text' => clienttranslate("Spend X (1-10) to gain X/2 COIN (rounded up)."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Tuataras"),
      'animalfolk_id' => 19,
      'is_mono' => false
  ),
  120 => array(
      'type_id' => 120,
      'name' => clienttranslate("Dodos 1"),
      'text' => clienttranslate("Get 2 COIN. Finish 2."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Dodos"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  121 => array(
      'type_id' => 121,
      'name' => clienttranslate("Dodos 2"),
      'text' => clienttranslate("When used to build, spend X (1-3): Add X to this CARD value."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Dodos"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  122 => array(
      'type_id' => 122,
      'name' => clienttranslate("Dodos 3"),
      'text' => clienttranslate("Toss 1 CARD. Get 2 COIN. Finish 3."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Dodos"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  123 => array(
      'type_id' => 123,
      'name' => clienttranslate("Dodos 4"),
      'text' => clienttranslate("Draw 2 CARDS2. Finish 3."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Dodos"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  124 => array(
      'type_id' => 124,
      'name' => clienttranslate("Dodos 5A"),
      'text' => clienttranslate("Spend 1: Draw 2 CARDS2. Get 3 COIN. Finish 4."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Dodos"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  125 => array(
      'type_id' => 125,
      'name' => clienttranslate("Dodos 5B"),
      'text' => clienttranslate("Hand size +2 for this turn. Finish 3."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Dodos"),
      'animalfolk_id' => 20,
      'is_mono' => false
  ),
  126 => array(
      'type_id' => 126,
      'name' => clienttranslate("Capuchins 1"),
      'text' => clienttranslate("Get 2 COIN. Choose an opponent to get 1 COIN."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Capuchins"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  127 => array(
      'type_id' => 127,
      'name' => clienttranslate("Capuchins 2"),
      'text' => clienttranslate("Get 1 COIN."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Capuchins"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  128 => array(
      'type_id' => 128,
      'name' => clienttranslate("Capuchins 3"),
      'text' => clienttranslate("Give another player 1 CARD. Take 1 COIN from them."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Capuchins"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  129 => array(
      'type_id' => 129,
      'name' => clienttranslate("Capuchins 4"),
      'text' => clienttranslate("Spend 2: Look at 1 random CARD from another player. You may take it."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Capuchins"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  130 => array(
      'type_id' => 130,
      'name' => clienttranslate("Capuchins 5A"),
      'text' => clienttranslate("Spend 2: Look at the top 2 CARDS2 of another player's deck. You may take 1 of them. Discard the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Capuchins"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  131 => array(
      'type_id' => 131,
      'name' => clienttranslate("Capuchins 5B"),
      'text' => clienttranslate("Spend 2: Take any 1 CARD of the top 2 CARDS2 of another player's discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Capuchins"),
      'animalfolk_id' => 21,
      'is_mono' => false
  ),
  132 => array(
      'type_id' => 132,
      'name' => clienttranslate("Olms 1"),
      'text' => clienttranslate("You may toss 1 CARD from the supply. When used to purchase, you may purchase the top CARD of the bin."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Olms"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  133 => array(
      'type_id' => 133,
      'name' => clienttranslate("Olms 2"),
      'text' => clienttranslate("Toss any 1 animalfolk CARD from your discard to take the centre CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Olms"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  134 => array(
      'type_id' => 134,
      'name' => clienttranslate("Olms 3"),
      'text' => clienttranslate("Toss 1 CARD. Toss 0-2 CARDS2 in the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Olms"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  135 => array(
      'type_id' => 135,
      'name' => clienttranslate("Olms 4"),
      'text' => clienttranslate("Look at the top 3 CARDS3 of an opponent's deck. You may toss 1 of them to take 1 CARD from the market. Place all 3 CARDS3 on their discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Olms"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  136 => array(
      'type_id' => 136,
      'name' => clienttranslate("Olms 5A"),
      'text' => clienttranslate("Look at 3 random CARDS3 from an opponent. You may toss 1 of them to give 1 CARD from the market to them."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Olms"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  137 => array(
      'type_id' => 137,
      'name' => clienttranslate("Olms 5B"),
      'text' => clienttranslate("Place 1 CARD from the market on each player's deck."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Olms"),
      'animalfolk_id' => 22,
      'is_mono' => false
  ),
  138 => array(
      'type_id' => 138,
      'name' => clienttranslate("Resourceful Ally"),
      'text' => clienttranslate("Spend 1: Place any 1-2 CARDS2 from your discard on the bottom of your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  139 => array(
      'type_id' => 139,
      'name' => clienttranslate("Ice Trade"),
      'text' => clienttranslate("Spend 1+: Draw 1 CARD from the supply."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  140 => array(
      'type_id' => 140,
      'name' => clienttranslate("Traveling Equipment"),
      'text' => clienttranslate("Spend 2: Draw 2 CARDS2. Toss 1 CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  141 => array(
      'type_id' => 141,
      'name' => clienttranslate("Stove"),
      'text' => clienttranslate("When used to build, spend X (1+): This CARD value is X/2 (rounded up)."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  142 => array(
      'type_id' => 142,
      'name' => clienttranslate("Fishing"),
      'text' => clienttranslate("Spend X (1+): Place any X CARDS3 from your discard on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  143 => array(
      'type_id' => 143,
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
      'animalfolk_id' => 23,
      'is_mono' => false
  ),
  144 => array(
      'type_id' => 144,
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
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  145 => array(
      'type_id' => 145,
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
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  146 => array(
      'type_id' => 146,
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
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  147 => array(
      'type_id' => 147,
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
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  148 => array(
      'type_id' => 148,
      'name' => clienttranslate("Insight"),
      'text' => clienttranslate("Discard 1-3 CARDS3 from your deck. Finish 3: Take any 1 CARD from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onFinish",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Turtles"),
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  149 => array(
      'type_id' => 149,
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
      'animalfolk_id' => 24,
      'is_mono' => false
  ),
  150 => array(
      'type_id' => 150,
      'name' => clienttranslate("Skinks 1"),
      'text' => clienttranslate("At the end of your turn, place the top 0-2 CARDS2 of your discard on your deck in any order."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Skinks"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  151 => array(
      'type_id' => 151,
      'name' => clienttranslate("Skinks 2"),
      'text' => clienttranslate("Draw 1 CARD from the supply. At the end of your turn, toss 1 animalfolk CARD or this CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Skinks"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  152 => array(
      'type_id' => 152,
      'name' => clienttranslate("Skinks 3"),
      'text' => clienttranslate("Draw 2 CARDS2. At the end of your turn, toss 1 CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Skinks"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  153 => array(
      'type_id' => 153,
      'name' => clienttranslate("Skinks 4"),
      'text' => clienttranslate("At the end of your turn, search your deck for 1 CARD. Shuffle your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Skinks"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  154 => array(
      'type_id' => 154,
      'name' => clienttranslate("Skinks 5A"),
      'text' => clienttranslate("Draw 3 CARDS3. At the end of your turn, discard 2 CARDS2."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Skinks"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  155 => array(
      'type_id' => 155,
      'name' => clienttranslate("Skinks 5B"),
      'text' => clienttranslate("At the end of your turn, swap 1 CARD with the top CARD of your discard."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => "onCleanUp",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Skinks"),
      'animalfolk_id' => 25,
      'is_mono' => false
  ),
  156 => array(
      'type_id' => 156,
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
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  157 => array(
      'type_id' => 157,
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
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  158 => array(
      'type_id' => 158,
      'name' => clienttranslate("Wind of Change"),
      'text' => clienttranslate("Next time you have gained a new CARD from the market, toss any 0-1 CARD from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onPurchase",
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  159 => array(
      'type_id' => 159,
      'name' => clienttranslate("Overtime"),
      'text' => clienttranslate("Next time before you build, take any 1 CARD from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onBuild",
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  160 => array(
      'type_id' => 160,
      'name' => clienttranslate("Order in Chaos"),
      'text' => clienttranslate("Next time you would form a new deck, do so with any 3 CARDS3 from your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onShuffle",
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  161 => array(
      'type_id' => 161,
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
      'animalfolk_id' => 26,
      'is_mono' => false
  ),
  162 => array(
      'type_id' => 162,
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
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  163 => array(
      'type_id' => 163,
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
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  164 => array(
      'type_id' => 164,
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
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  165 => array(
      'type_id' => 165,
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
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  166 => array(
      'type_id' => 166,
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
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  167 => array(
      'type_id' => 167,
      'name' => clienttranslate("Warm Embrace"),
      'text' => clienttranslate("While this CARD is in your stall, you can include 1 junk CARD in each new stack."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Snow Macaques"),
      'animalfolk_id' => 27,
      'is_mono' => false
  ),
  168 => array(
      'type_id' => 168,
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
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  169 => array(
      'type_id' => 169,
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
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  170 => array(
      'type_id' => 170,
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
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  171 => array(
      'type_id' => 171,
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
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  172 => array(
      'type_id' => 172,
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
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  173 => array(
      'type_id' => 173,
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
      'animalfolk_id' => 28,
      'is_mono' => false
  ),
  174 => array(
      'type_id' => 174,
      'name' => clienttranslate("Fumbling Dreamer"),
      'text' => clienttranslate("Roll DIE_PANGOLINS until you have different results. Place 1 CARD from any player's SOURCE into their DESTINATION."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 29,
      'is_mono' => false
  ),
  175 => array(
      'type_id' => 175,
      'name' => clienttranslate("Coffee Grinder"),
      'text' => clienttranslate("Discard 1-3 CARDS2 from any player's deck."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 29,
      'is_mono' => false
  ),
  176 => array(
      'type_id' => 176,
      'name' => clienttranslate("Accident"),
      'text' => clienttranslate("Draw 1 CARD from the supply. Toss 1 animalfolk CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 29,
      'is_mono' => false
  ),
  177 => array(
      'type_id' => 177,
      'name' => clienttranslate("Loose Marbles"),
      'text' => clienttranslate("Roll DIE_PANGOLINS. Place 1 CARD from any player's SOURCE into a different player's DESTINATION."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 29,
      'is_mono' => false
  ),
  178 => array(
      'type_id' => 178,
      'name' => clienttranslate("Another Fine Mess"),
      'text' => clienttranslate("Roll DIE_PANGOLINS. Swap 2 CARDS2 from any player's SOURCE with as many CARDS2 from a different player's DESTINATION."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 29,
      'is_mono' => false
  ),
  179 => array(
      'type_id' => 179,
      'name' => clienttranslate("Souvenirs"),
      'text' => clienttranslate("Draw CARDS3 from the supply equal to the number of players. Give 1 of them to each player."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 29,
      'is_mono' => false
  ),
  180 => array(
      'type_id' => 180,
      'name' => clienttranslate("Glassfrogs 1"),
      'text' => clienttranslate("Repeat. Discard 1 CARD to draw 1 CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Glassfrogs"),
      'animalfolk_id' => 30,
      'is_mono' => false
  ),
  181 => array(
      'type_id' => 181,
      'name' => clienttranslate("Glassfrogs 2"),
      'text' => clienttranslate("Repeat. Look at the top CARD of the supply. Toss 1 CARD in the market and place the new CARD in its place."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Glassfrogs"),
      'animalfolk_id' => 30,
      'is_mono' => false
  ),
  182 => array(
      'type_id' => 182,
      'name' => clienttranslate("Glassfrogs 3"),
      'text' => clienttranslate("When this CARD is placed on your discard, toss any 1 CARD from there."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Glassfrogs"),
      'animalfolk_id' => 30,
      'is_mono' => false
  ),
  183 => array(
      'type_id' => 183,
      'name' => clienttranslate("Glassfrogs 4"),
      'text' => clienttranslate("Repeat. Search your deck for 1 CARD to put aside. Shuffle your deck. Place the CARD on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Glassfrogs"),
      'animalfolk_id' => 30,
      'is_mono' => false
  ),
  184 => array(
      'type_id' => 184,
      'name' => clienttranslate("Glassfrogs 5A"),
      'text' => clienttranslate("Repeat. 1 random CARD in your hand gets +1 to its value for this turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Glassfrogs"),
      'animalfolk_id' => 30,
      'is_mono' => false
  ),
  185 => array(
      'type_id' => 185,
      'name' => clienttranslate("Glassfrogs 5B"),
      'text' => clienttranslate("Look at the top CARD of you deck. You may swap it with the top CARD of your discard."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Glassfrogs"),
      'animalfolk_id' => 30,
      'is_mono' => false
  ),
  186 => array(
      'type_id' => 186,
      'name' => clienttranslate("Gorillas 1"),
      'text' => clienttranslate("Flip and place your deck on your discard. Take the top or bottom CARD of your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Gorillas"),
      'animalfolk_id' => 31,
      'is_mono' => false
  ),
  187 => array(
      'type_id' => 187,
      'name' => clienttranslate("Gorillas 2"),
      'text' => clienttranslate("Discard your hand. Take 1 CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Gorillas"),
      'animalfolk_id' => 31,
      'is_mono' => false
  ),
  188 => array(
      'type_id' => 188,
      'name' => clienttranslate("Gorillas 3"),
      'text' => clienttranslate("Toss the top CARD of your deck. If it was an animalfolk CARD, draw 1 CARD from the supply."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Gorillas"),
      'animalfolk_id' => 31,
      'is_mono' => false
  ),
  189 => array(
      'type_id' => 189,
      'name' => clienttranslate("Gorillas 4"),
      'text' => clienttranslate("CARDS3 you use this turn are valued 4."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Gorillas"),
      'animalfolk_id' => 31,
      'is_mono' => false
  ),
  190 => array(
      'type_id' => 190,
      'name' => clienttranslate("Gorillas 5A"),
      'text' => clienttranslate("Draw 5 CARDS3. Discard 6 CARDS3."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Gorillas"),
      'animalfolk_id' => 31,
      'is_mono' => false
  ),
  191 => array(
      'type_id' => 191,
      'name' => clienttranslate("Gorillas 5B"),
      'text' => clienttranslate("Toss all CARDS3 in the market, fill it, and take 1 CARD from there."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Gorillas"),
      'animalfolk_id' => 31,
      'is_mono' => false
  ),
  192 => array(
      'type_id' => 192,
      'name' => clienttranslate("Walruses 1"),
      'text' => clienttranslate("When used to build, decide this CARD value (1-3)."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Walruses"),
      'animalfolk_id' => 32,
      'is_mono' => false
  ),
  193 => array(
      'type_id' => 193,
      'name' => clienttranslate("Walruses 2"),
      'text' => clienttranslate("When you build this turn, you may include any animalfolk CARDS3."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Walruses"),
      'animalfolk_id' => 32,
      'is_mono' => false
  ),
  194 => array(
      'type_id' => 194,
      'name' => clienttranslate("Walruses 3"),
      'text' => clienttranslate("When you build this turn, you may include 1 CARD junk."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Walruses"),
      'animalfolk_id' => 32,
      'is_mono' => false
  ),
  195 => array(
      'type_id' => 195,
      'name' => clienttranslate("Walruses 4"),
      'text' => clienttranslate("Take any 1 CARD of the bottom 3 CARDS3 of your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Walruses"),
      'animalfolk_id' => 32,
      'is_mono' => false
  ),
  196 => array(
      'type_id' => 196,
      'name' => clienttranslate("Walruses 5A"),
      'text' => clienttranslate("If you don't build this turn, hand size +2 for this turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Walruses"),
      'animalfolk_id' => 32,
      'is_mono' => false
  ),
  197 => array(
      'type_id' => 197,
      'name' => clienttranslate("Walruses 5B"),
      'text' => clienttranslate("While this CARD is in your rightmost stack, your next stack can be 1 smaller or larger than usual."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => false,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Walruses"),
      'animalfolk_id' => 32,
      'is_mono' => false
  ),
  198 => array(
      'type_id' => 198,
      'name' => clienttranslate("Tasmanian Devils 1"),
      'text' => clienttranslate("Look at the top CARD of any player's deck. You may discard it."),
      'type_displayed' => clienttranslate("Passive"),
      'is_technique' => false,
      'has_plus' => false,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
      'animalfolk_id' => 33,
      'is_mono' => false
  ),
  199 => array(
      'type_id' => 199,
      'name' => clienttranslate("Tasmanian Devils 2"),
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
      'animalfolk_id' => 33,
      'is_mono' => false
  ),
  200 => array(
      'type_id' => 200,
      'name' => clienttranslate("Tasmanian Devils 3"),
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
      'animalfolk_id' => 33,
      'is_mono' => false
  ),
  201 => array(
      'type_id' => 201,
      'name' => clienttranslate("Tasmanian Devils 4"),
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
      'animalfolk_id' => 33,
      'is_mono' => false
  ),
  202 => array(
      'type_id' => 202,
      'name' => clienttranslate("Tasmanian Devils 5A"),
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
      'animalfolk_id' => 33,
      'is_mono' => false
  ),
  203 => array(
      'type_id' => 203,
      'name' => clienttranslate("Tasmanian Devils 5B"),
      'text' => clienttranslate("Shuffle any player's discard. They swap 5 random CARDS3 with the top CARDS3 of their discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
      'animalfolk_id' => 33,
      'is_mono' => false
  ),
  204 => array(
      'type_id' => 204,
      'name' => clienttranslate("Junglefowls 1"),
      'text' => clienttranslate("Draw 1 CARD [DAWN +1 CARD]."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Junglefowls"),
      'animalfolk_id' => 34,
      'is_mono' => false
  ),
  205 => array(
      'type_id' => 205,
      'name' => clienttranslate("Junglefowls 2"),
      'text' => clienttranslate("Draw 1 CARD from the supply. [DAWN Hand size +3 for this turn.]"),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Junglefowls"),
      'animalfolk_id' => 34,
      'is_mono' => false
  ),
  206 => array(
      'type_id' => 206,
      'name' => clienttranslate("Junglefowls 3"),
      'text' => clienttranslate("Toss 1 CARD. [DAWN Draw 2 CARDS2.]"),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 3,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Junglefowls"),
      'animalfolk_id' => 34,
      'is_mono' => false
  ),
  207 => array(
      'type_id' => 207,
      'name' => clienttranslate("Junglefowls 4"),
      'text' => clienttranslate("Look at the top 2 CARDS2 [DAWN +2 CARDS2] of your deck and take 1 of them. You may reorder the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 4,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Junglefowls"),
      'animalfolk_id' => 34,
      'is_mono' => false
  ),
  208 => array(
      'type_id' => 208,
      'name' => clienttranslate("Junglefowls 5A"),
      'text' => clienttranslate("Shuffle your discard. Take any 1 CARD of the top 2 CARDS2 [DAWN or 4 CARDS3] of your discard."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Junglefowls"),
      'animalfolk_id' => 34,
      'is_mono' => false
  ),
  209 => array(
      'type_id' => 209,
      'name' => clienttranslate("Junglefowls 5B"),
      'text' => clienttranslate("Draw 1 CARD. It gets [DAWN +2] [DAY +1] [NIGHT -1] to its value for this turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Junglefowls"),
      'animalfolk_id' => 34,
      'is_mono' => false
  ),
  210 => array(
      'type_id' => 210,
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
      'animalfolk_id' => 35,
      'is_mono' => false
  ),
  211 => array(
      'type_id' => 211,
      'name' => clienttranslate("Serenade"),
      'text' => clienttranslate("Draw [DAWN 2 CARDS2] [DAY 3 CARDS3] [NIGHT 1 CARD]. Place 2 CARDS2 on your deck."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Mongooses"),
      'animalfolk_id' => 35,
      'is_mono' => false
  ),
  212 => array(
      'type_id' => 212,
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
      'animalfolk_id' => 35,
      'is_mono' => false
  ),
  213 => array(
      'type_id' => 213,
      'name' => clienttranslate("Bouquets"),
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
      'animalfolk_id' => 35,
      'is_mono' => false
  ),
  214 => array(
      'type_id' => 214,
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
      'animalfolk_id' => 35,
      'is_mono' => false
  ),
  215 => array(
      'type_id' => 215,
      'name' => clienttranslate("Inheritance"),
      'text' => clienttranslate("Look at the top [DAWN 2 CARDS2] [DAY 5 CARDS3] [NIGHT 1 CARD] of the supply and take 1 of them. Toss the rest."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Mongooses"),
      'animalfolk_id' => 35,
      'is_mono' => false
  ),
  216 => array(
      'type_id' => 216,
      'name' => clienttranslate("Sneaky Scout"),
      'text' => clienttranslate("Look at the top 2 CARDS2 of your [NIGHT or another player's] deck. You may reorder them."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 1,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 36,
      'is_mono' => false
  ),
  217 => array(
      'type_id' => 217,
      'name' => clienttranslate("False Alarm"),
      'text' => clienttranslate("Draw 1 CARD [NIGHT or take the bottom CARD of your discard]."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 3,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 36,
      'is_mono' => false
  ),
  218 => array(
      'type_id' => 218,
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
      'animalfolk_id' => 36,
      'is_mono' => false
  ),
  219 => array(
      'type_id' => 219,
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
      'animalfolk_id' => 36,
      'is_mono' => false
  ),
  220 => array(
      'type_id' => 220,
      'name' => clienttranslate("Capture"),
      'text' => clienttranslate("Take the top CARD of the supply, bin, [NIGHT or another player's deck or discard]."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 36,
      'is_mono' => false
  ),
  221 => array(
      'type_id' => 221,
      'name' => clienttranslate("Provocation"),
      'text' => clienttranslate("Discard 1 random CARD from you [NIGHT or another player]. You may toss the discarded CARD."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 5,
      'nbr' => 1,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 36,
      'is_mono' => false
  ),
  222 => array(
      'type_id' => 222,
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
  223 => array(
      'type_id' => 223,
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
  224 => array(
      'type_id' => 224,
      'name' => clienttranslate("Wily Member"),
      'text' => clienttranslate("Mono swaps 1 random CARD from you with 1 junk CARD from it. Acquire."),
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
  225 => array(
      'type_id' => 225,
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
  226 => array(
      'type_id' => 226,
      'name' => clienttranslate("Bold Member"),
      'text' => clienttranslate("Roll DIE_OCELOT. Swap that many CARDS3 between the tops of your and Mono's decks. Acquire."),
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
  227 => array(
      'type_id' => 227,
      'name' => clienttranslate("Flexible Member"),
      'text' => clienttranslate("If Mono's discard has no Mono CARDS3, discard its deck. Mono plays 1 Mono CARD from its discard."),
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
  228 => array(
      'type_id' => 228,
      'name' => clienttranslate("Tireless Member"),
      'text' => clienttranslate("Order CARDS3 in the market from the highest to lowest value. Mono ignores the market's added costs this turn. Acquire."),
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
  229 => array(
      'type_id' => 229,
      'name' => clienttranslate("Steady Member"),
      'text' => clienttranslate("At the start of Mono's next turn, it takes the leftmost CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Sloths"),
      'animalfolk_id' => 8,
      'is_mono' => true
  ),
  230 => array(
      'type_id' => 230,
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
  231 => array(
      'type_id' => 231,
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
  232 => array(
      'type_id' => 232,
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
  233 => array(
      'type_id' => 233,
      'name' => clienttranslate("Wise Member"),
      'text' => clienttranslate("If you purchased on your last turn, Mono draws 4 CARDS3. Otherwise, it draws 2 CARDS2. Acquire."),
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
  234 => array(
      'type_id' => 234,
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
      'animalfolk_id' => 13,
      'is_mono' => true
  ),
  235 => array(
      'type_id' => 235,
      'name' => clienttranslate("Voracious Member"),
      'text' => clienttranslate("Mono tosses its lowest valued animalfolk CARD. Mono takes the highest valued CARD from the market. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Lemurs"),
      'animalfolk_id' => 14,
      'is_mono' => true
  ),
  236 => array(
      'type_id' => 236,
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
      'animalfolk_id' => 15,
      'is_mono' => true
  ),
  237 => array(
      'type_id' => 237,
      'name' => clienttranslate("Carefree Member"),
      'text' => clienttranslate("Swap Mono's lowest animalfolk CARD with 1 random animalfolk CARD of higher value from you. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Echidnas"),
      'animalfolk_id' => 16,
      'is_mono' => true
  ),
  238 => array(
      'type_id' => 238,
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
      'animalfolk_id' => 17,
      'is_mono' => true
  ),
  239 => array(
      'type_id' => 239,
      'name' => clienttranslate("Clever Member"),
      'text' => clienttranslate("Mono stores the top 3 CARDS3 of its deck. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => "onTurnStart",
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Tree-kangaroos"),
      'animalfolk_id' => 18,
      'is_mono' => true
  ),
  240 => array(
      'type_id' => 240,
      'name' => clienttranslate("Avid Member"),
      'text' => clienttranslate("Mono gains 10 COIN. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Tuataras"),
      'animalfolk_id' => 19,
      'is_mono' => true
  ),
  241 => array(
      'type_id' => 241,
      'name' => clienttranslate("Dodos Mono"),
      'text' => clienttranslate("Mono gains 12 COIN. Acquire. At the end of its turn, Mono discards 2 CARDS2."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Dodos"),
      'animalfolk_id' => 20,
      'is_mono' => true
  ),
  242 => array(
      'type_id' => 242,
      'name' => clienttranslate("Capuchins Mono"),
      'text' => clienttranslate("Mono takes 1 COIN from you. Discard 1 CARD from your deck. If it is not junk, Mono takes it. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Capuchins"),
      'animalfolk_id' => 21,
      'is_mono' => true
  ),
  243 => array(
      'type_id' => 243,
      'name' => clienttranslate("Olms Mono"),
      'text' => clienttranslate("You toss 1 random animalfolk CARD valued 2+ to take the lowest valued CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Olms"),
      'animalfolk_id' => 22,
      'is_mono' => true
  ),
  244 => array(
      'type_id' => 244,
      'name' => clienttranslate("Resourceful Member"),
      'text' => clienttranslate("Add +1 to Mono's highest valued animalfolk CARD for each junk CARD in its hand."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Penguins"),
      'animalfolk_id' => 23,
      'is_mono' => true
  ),
  245 => array(
      'type_id' => 245,
      'name' => clienttranslate("Impulsive Member"),
      'text' => clienttranslate("Next time Mono starts its turn with no Mono CARDS3, it takes the leftmost CARD from the market."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Turtles"),
      'animalfolk_id' => 24,
      'is_mono' => true
  ),
  246 => array(
      'type_id' => 246,
      'name' => clienttranslate("Skinks Mono"),
      'text' => clienttranslate("Mono draws 2 CARDS2. Acquire. At the end of Mono's turn, it draws 2 CARDS2."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Skinks"),
      'animalfolk_id' => 25,
      'is_mono' => true
  ),
  247 => array(
      'type_id' => 247,
      'name' => clienttranslate("Master Member"),
      'text' => clienttranslate("Next time Mono fails to build, it takes the highest CARD from the market and tries to build again."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => false,
      'has_ability' => false,
      'playable' => true,
      'trigger' => "onMonoFailsToBuild",
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Beavers"),
      'animalfolk_id' => 26,
      'is_mono' => true
  ),
  248 => array(
      'type_id' => 248,
      'name' => clienttranslate("Pristine Member"),
      'text' => clienttranslate("Mono draws 4 CARDS3. Mono places 2 junk CARDS2 on its deck. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Snow Macaques"),
      'animalfolk_id' => 27,
      'is_mono' => true
  ),
  249 => array(
      'type_id' => 249,
      'name' => clienttranslate("Meddling Member"),
      'text' => clienttranslate("Place 1 junk CARD from Mono's discard and 1 junk CARD from the junkyard on your discard. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Gulls"),
      'animalfolk_id' => 28,
      'is_mono' => true
  ),
  250 => array(
      'type_id' => 250,
      'name' => clienttranslate("Fumbling Member"),
      'text' => clienttranslate("Roll DIE_PANGOLINS. Look at 1 CARD from your SOURCE. If it is not junk, place it into Mono's DESTINATION. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Pangolins"),
      'animalfolk_id' => 29,
      'is_mono' => true
  ),
  251 => array(
      'type_id' => 251,
      'name' => clienttranslate("Glassfrogs Mono"),
      'text' => clienttranslate("Mono draws 2 CARDS2 and discards its 2 lowest CARDS2. Twice. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Glassfrogs"),
      'animalfolk_id' => 30,
      'is_mono' => true
  ),
  252 => array(
      'type_id' => 252,
      'name' => clienttranslate("Gorillas Mono"),
      'text' => clienttranslate("CARDS3 Mono uses this turn are valued 4. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Gorillas"),
      'animalfolk_id' => 31,
      'is_mono' => true
  ),
  253 => array(
      'type_id' => 253,
      'name' => clienttranslate("Walruses Mono"),
      'text' => clienttranslate("Mono can use a single animalfolk CARD to build a stack this turn."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => false,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Walruses"),
      'animalfolk_id' => 32,
      'is_mono' => true
  ),
  254 => array(
      'type_id' => 254,
      'name' => clienttranslate("Tasmanian Devils Mono"),
      'text' => clienttranslate("You discard 1 random CARD. Shuffle 2 junk CARDS2 from your discard into your deck. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Tasmanian Devils"),
      'animalfolk_id' => 33,
      'is_mono' => true
  ),
  255 => array(
      'type_id' => 255,
      'name' => clienttranslate("Junglefowls Mono"),
      'text' => clienttranslate("Mono's hand size [DAWN +4] [DAY +3] [NIGHT -1] for this turn. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Junglefowls"),
      'animalfolk_id' => 34,
      'is_mono' => true
  ),
  256 => array(
      'type_id' => 256,
      'name' => clienttranslate("Dramatic Member"),
      'text' => clienttranslate("Mono draws [DAWN 3 CARDS3] [DAY 4 CARDS3] [NIGHT 2 CARDS2]. Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Mongooses"),
      'animalfolk_id' => 35,
      'is_mono' => true
  ),
  257 => array(
      'type_id' => 257,
      'name' => clienttranslate("Stealthy Member"),
      'text' => clienttranslate("[DAY Mono draws 1 CARD from your deck.] [NIGHT Mono takes 1 random animalfolk CARD from you.] Acquire."),
      'type_displayed' => clienttranslate("Technique"),
      'is_technique' => true,
      'has_plus' => true,
      'has_ability' => true,
      'playable' => true,
      'trigger' => null,
      'value' => 2,
      'nbr' => 0,
      'animalfolk_displayed' => clienttranslate("Bats"),
      'animalfolk_id' => 36,
      'is_mono' => true
  )
);
