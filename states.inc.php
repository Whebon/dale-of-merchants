<?php
declare(strict_types=1);
/*
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. ANY CHANGES MADE DIRECTLY MAY BE OVERWRITTEN.
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * DaleOfMerchants implementation : © Bart Swinkels
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */

/**
 * TYPE CHECKING ONLY, this function is never called.
 * If there are any undefined function errors here, you MUST rename the action within the game states file, or create the function in the game class.
 * If the function does not match the parameters correctly, you are either calling an invalid function, or you have incorrectly added parameters to a state function.
 */
if (false) {
	/** @var daleofmerchants $game */
	$game->stDeckSelection();
	$game->stStartGame();
	$game->stTrigger();
	$game->stChangeActivePlayer();
	$game->stTurnStart();
	$game->stFullyResolve();
	$game->stCleanUpPhase();
	$game->stSpyglass();
	$game->stSpecialOffer();
	$game->stDirtyExchange();
	$game->stSabotage();
	$game->stBlindfold();
	$game->stDangerousTest();
	$game->stNightShift();
	$game->stRuthlessCompetition();
	$game->stCunningNeighbour();
	$game->stCharity();
	$game->stTasters();
	$game->stDaringAdventurer();
	$game->stRefreshingDrink();
	$game->stDelightfulSurprise();
	$game->stAccident();
	$game->stPompousProfessional();
	$game->stDelicacy();
	$game->stUmbrella();
	$game->stRumours();
	$game->stWheelbarrow();
	$game->stTacticalMeasurement();
	$game->stMeddlingMarketeer();
	$game->stAnchor();
	$game->stCharmStove();
	$game->stTravelingEquipment();
	$game->stInsight();
	$game->stBadOmen();
	$game->stFinalStatistics();
	$game->stDeprecatedCheer();
}

$machinestates = array(
	1 => array(
		'name' => 'gameSetup',
		'description' => '',
		'type' => 'manager',
		'action' => 'stGameSetup',
		'transitions' => array(
			'' => 2,
		),
	),
	2 => array(
		'name' => 'deckSelection',
		'description' => clienttranslate('Other players may vote for up to ${n_plus_1} animalfolk sets to play with'),
		'descriptionmyturn' => clienttranslate('${you} may vote for up to ${n_plus_1} animalfolk sets to play with'),
		'args' => 'argNumberOfPlayers',
		'type' => 'multipleactiveplayer',
		'action' => 'stDeckSelection',
		'possibleactions' => ['actSubmitPreference', 'actEnableDebugMode'],
		'transitions' => array(
			'trStartGame' => 3,
		),
	),
	3 => array(
		'name' => 'startGame',
		'description' => '',
		'type' => 'game',
		'action' => 'stStartGame',
		'transitions' => array(
			'trStartGame' => 31,
		),
	),
	28 => array(
		'name' => 'trigger',
		'description' => clienttranslate('${actplayer} must resolve triggered techniques'),
		'descriptionmyturn' => clienttranslate('${you} must resolve triggered techniques'),
		'type' => 'activeplayer',
		'action' => 'stTrigger',
		'possibleactions' => ['actFullyResolveTechniqueCard'],
		'transitions' => array(
			'trSamePlayer' => 28,
			'trChangeActivePlayer' => 29,
			'trBonusBuild' => 36,
		),
	),
	29 => array(
		'name' => 'changeActivePlayer',
		'description' => '',
		'type' => 'game',
		'action' => 'stChangeActivePlayer',
		'transitions' => array(
			'trSamePlayer' => 30,
			'trBlindfold' => 56,
			'trBlindfoldIncorrectGuess' => 57,
			'trFullyResolve' => 33,
			'trDeprecatedTasters' => 6500,
		),
	),
	30 => array(
		'name' => 'playerTurn',
		'description' => clienttranslate('${actplayer} must take an action'),
		'descriptionmyturn' => clienttranslate('${you} must take an action'),
		'type' => 'activeplayer',
		'possibleactions' => ['actPurchase', 'actPlayTechniqueCard', 'actUsePassiveAbility', 'actFullyResolveTechniqueCard', 'actBonusBuildSkip', 'actBuild', 'actInventoryAction', 'actSpawn'],
		'transitions' => array(
			'trChangeActivePlayer' => 29,
			'trPassiveAbility' => 30,
			'trBonusBuild' => 36,
			'trRoyalPrivilege' => 37,
			'trSamePlayer' => 30,
			'trNextPlayer' => 41,
			'trGameEnd' => 98,
			'trSpyglass' => 52,
			'trSpecialOffer' => 53,
			'trDirtyExchange' => 54,
			'trSabotage' => 55,
			'trMagnet' => 58,
			'trDangerousTest' => 59,
			'trNightShift' => 60,
			'trRuthlessCompetition' => 61,
			'trCunningNeighbour' => 62,
			'trDeprecatedCheer' => 6300,
			'trCharity' => 64,
			'trDeprecatedTasters' => 6500,
			'trTasters' => 65,
			'trDaringAdventurer' => 66,
			'trNaturalSurvivor' => 67,
			'trDuplicateEntry' => 68,
			'trCulturalPreservation' => 69,
			'trRefreshingDrink' => 70,
			'trDelightfulSurprise' => 71,
			'trReplacement' => 72,
			'trFashionHint' => 73,
			'trAccident' => 74,
			'trPompousProfessional' => 75,
			'trDelicacy' => 76,
			'trUmbrella' => 77,
			'trRumours' => 78,
			'trWheelbarrow' => 79,
			'trVigilance' => 80,
			'trTacticalMeasurement' => 81,
			'trMeddlingMarketeer' => 82,
			'trAnchor' => 83,
			'trManufacturedJoy' => 84,
			'trShakyEnterprise' => 85,
			'trCharmStove' => 86,
			'trResourcefulAlly' => 87,
			'trTravelingEquipment' => 88,
			'trFishing' => 89,
			'trGroundbreakingIdea' => 90,
			'trInsight' => 91,
			'trBadOmen' => 92,
			'trCelestialGuidanceMarket' => 93,
			'trCelestialGuidanceDiscard' => 94,
			'trFumblingDreamer' => 95,
			'trLooseMarbles' => 96,
			'trAnotherFineMess' => 97,
			'trCoffeeGrinder' => 101,
			'trBouquets' => 102,
			'trRake' => 103,
		),
	),
	31 => array(
		'name' => 'turnStart',
		'description' => clienttranslate('${actplayer} must take an action'),
		'descriptionmyturn' => clienttranslate('${you} must resolve scheduled techniques'),
		'type' => 'activeplayer',
		'action' => 'stTurnStart',
		'possibleactions' => ['actFullyResolveTechniqueCard'],
		'transitions' => array(
			'trSamePlayer' => 31,
			'trSkipTurnStart' => 30,
		),
	),
	33 => array(
		'name' => 'fullyResolve',
		'description' => '',
		'type' => 'game',
		'action' => 'stFullyResolve',
		'transitions' => array(
			'trSamePlayer' => 30,
			'trNextPlayer' => 41,
		),
	),
	36 => array(
		'name' => 'bonusBuild',
		'description' => clienttranslate('${bonus_build_name}: ${actplayer} may select cards to build in stack ${stack_index_plus_1}'),
		'descriptionmyturn' => clienttranslate('${bonus_build_name}: ${you} may select cards to build in stack ${stack_index_plus_1}'),
		'type' => 'activeplayer',
		'args' => 'argStackIndex',
		'possibleactions' => ['actBuild', 'actUsePassiveAbility', 'actBonusBuildSkip'],
		'transitions' => array(
			'trPassiveAbility' => 36,
			'trBonusBuild' => 36,
			'trNextPlayer' => 41,
			'trSamePlayer' => 30,
			'trGameEnd' => 98,
		),
	),
	37 => array(
		'name' => 'royalPrivilege',
		'description' => clienttranslate('Royal Privilege: ${actplayer} may toss an animalfolk card to purchase an additional card for free'),
		'descriptionmyturn' => clienttranslate('Royal Privilege: ${you} may toss an animalfolk card to purchase an additional card for free'),
		'type' => 'activeplayer',
		'possibleactions' => ['actRoyalPrivilege'],
		'transitions' => array(
			'trNextPlayer' => 41,
		),
	),
	41 => array(
		'name' => 'cleanUpPhase',
		'description' => '',
		'type' => 'game',
		'action' => 'stCleanUpPhase',
		'updateGameProgression' => true,
		'transitions' => array(
			'trNextPlayer' => 31,
			'trPostCleanUpPhase' => 42,
		),
	),
	42 => array(
		'name' => 'postCleanUpPhase',
		'description' => clienttranslate('${actplayer} must take an action'),
		'descriptionmyturn' => clienttranslate('${you} may use passive abilities'),
		'type' => 'activeplayer',
		'possibleactions' => ['actUsePassiveAbility', 'actPostCleanUpPhase'],
		'transitions' => array(
			'trNextPlayer' => 41,
			'trPassiveAbility' => 41,
			'trRefreshingDrink' => 70,
		),
	),
	52 => array(
		'name' => 'spyglass',
		'description' => clienttranslate('Spyglass: ${actplayer} must choose a card to place into their hand'),
		'descriptionmyturn' => clienttranslate('Spyglass: ${you} must choose a card to place into your hand'),
		'type' => 'activeplayer',
		'action' => 'stSpyglass',
		'possibleactions' => ['actSpyglass'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	53 => array(
		'name' => 'specialOffer',
		'description' => clienttranslate('${resolving_card_name}: ${actplayer} must choose a card to take'),
		'descriptionmyturn' => clienttranslate('${resolving_card_name}: ${you} must choose a card to take'),
		'type' => 'activeplayer',
		'action' => 'stSpecialOffer',
		'args' => 'argResolvingCardName',
		'possibleactions' => ['actSpecialOffer'],
		'transitions' => array(
			'trNextPlayer' => 41,
		),
	),
	54 => array(
		'name' => 'dirtyExchange',
		'description' => clienttranslate('Dirty Exchange: ${actplayer} must choose a card to give to ${opponent_name}'),
		'descriptionmyturn' => clienttranslate('Dirty Exchange: ${you} must choose a card to give to ${opponent_name}'),
		'type' => 'activeplayer',
		'action' => 'stDirtyExchange',
		'args' => 'argOpponentName',
		'possibleactions' => ['actDirtyExchange'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	55 => array(
		'name' => 'sabotage',
		'description' => clienttranslate('Sabotage: ${actplayer} must choose a card to toss for ${opponent_name}'),
		'descriptionmyturn' => clienttranslate('Sabotage: ${you} must choose a card to toss for ${opponent_name}'),
		'type' => 'activeplayer',
		'action' => 'stSabotage',
		'args' => 'argOpponentName',
		'possibleactions' => ['actSabotage'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	56 => array(
		'name' => 'blindfold',
		'description' => clienttranslate('Blindfold: ${actplayer} must guess the value of ${opponent_name}\'s card'),
		'descriptionmyturn' => clienttranslate('Blindfold: ${you} must guess the value of ${opponent_name}\'s card'),
		'type' => 'activeplayer',
		'action' => 'stBlindfold',
		'args' => 'argBlindfold',
		'possibleactions' => ['actBlindfold'],
		'transitions' => array(
			'trChangeActivePlayer' => 29,
		),
	),
	57 => array(
		'name' => 'blindfoldDecideValue',
		'description' => clienttranslate('Blindfold: ${actplayer} must decide the value of ${card_name}'),
		'descriptionmyturn' => clienttranslate('Blindfold: ${you} must decide the value of ${card_name}'),
		'type' => 'activeplayer',
		'args' => 'argBlindfoldDecideValue',
		'possibleactions' => ['actBlindfoldDecideValue'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	58 => array(
		'name' => 'magnet',
		'description' => clienttranslate('Magnet: ${actplayer} must search their deck for a card'),
		'descriptionmyturn' => clienttranslate('Magnet: ${you} must search your deck for a card'),
		'type' => 'activeplayer',
		'args' => 'argMyDeckContent',
		'possibleactions' => ['actMagnet'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	59 => array(
		'name' => 'dangerousTest',
		'description' => clienttranslate('Dangerous Test: ${actplayer} must discard 3 card(s)'),
		'descriptionmyturn' => clienttranslate('Dangerous Test: ${you} must discard 3 card(s)'),
		'type' => 'activeplayer',
		'action' => 'stDangerousTest',
		'possibleactions' => ['actDangerousTest'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	60 => array(
		'name' => 'nightShift',
		'description' => clienttranslate('Night Shift: ${actplayer} must place a card on top of each player\'s deck'),
		'descriptionmyturn' => clienttranslate('Night Shift: ${you} must place a card on top of each player\'s deck'),
		'type' => 'activeplayer',
		'action' => 'stNightShift',
		'args' => 'argPlayerIds',
		'possibleactions' => ['actNightShift'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	61 => array(
		'name' => 'ruthlessCompetition',
		'description' => clienttranslate('Ruthless Competition: ${actplayer} must place a card on top of ${opponent_name}\'s deck'),
		'descriptionmyturn' => clienttranslate('Ruthless Competition: ${you} must place a card on top of ${opponent_name}\'s deck'),
		'type' => 'activeplayer',
		'action' => 'stRuthlessCompetition',
		'args' => 'argOpponentName',
		'possibleactions' => ['actRuthlessCompetition'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	62 => array(
		'name' => 'cunningNeighbour',
		'description' => clienttranslate('Cunning Neighbour: ${actplayer} is looking at ${opponent_name}\'s hand'),
		'descriptionmyturn' => clienttranslate('Cunning Neighbour: ${you} are looking at ${opponent_name}\'s hand'),
		'type' => 'activeplayer',
		'action' => 'stCunningNeighbour',
		'args' => 'argOpponentNameAndPassiveCardId',
		'possibleactions' => ['actCunningNeighbour'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	64 => array(
		'name' => 'charity',
		'description' => clienttranslate('Charity: ${actplayer} must give back all drawn cards'),
		'descriptionmyturn' => clienttranslate('Charity: ${you} must choose a card and a player'),
		'type' => 'activeplayer',
		'action' => 'stCharity',
		'args' => 'argPlayerIds',
		'possibleactions' => ['actGiveCardsFromLimboToPlayers'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	65 => array(
		'name' => 'tasters',
		'description' => clienttranslate('Tasters: ${actplayer} must give each player a card from the market'),
		'descriptionmyturn' => clienttranslate('Tasters: ${you} must choose a card from the market and a player'),
		'type' => 'activeplayer',
		'args' => 'argPlayerIds',
		'action' => 'stTasters',
		'possibleactions' => ['actTasters'],
		'transitions' => array(
			'trSamePlayer' => 30,
			'trChangeActivePlayer' => 29,
		),
	),
	66 => array(
		'name' => 'daringAdventurer',
		'description' => clienttranslate('Daring Adventurer: ${actplayer} must discard ${die_value} card(s)'),
		'descriptionmyturn' => clienttranslate('Daring Adventurer: ${you} must discard ${die_value} card(s)'),
		'type' => 'activeplayer',
		'args' => 'argDie',
		'action' => 'stDaringAdventurer',
		'possibleactions' => ['actDaringAdventurer'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	67 => array(
		'name' => 'naturalSurvivor',
		'description' => clienttranslate('Natural Survivor: ${actplayer} must search their hand and deck for ${die_value} card(s)'),
		'descriptionmyturn' => clienttranslate('Natural Survivor: ${you} must search your hand and deck for ${die_value} card(s)'),
		'type' => 'activeplayer',
		'args' => 'argNaturalSurvivor',
		'possibleactions' => ['actNaturalSurvivor'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	68 => array(
		'name' => 'duplicateEntry',
		'description' => clienttranslate('Duplicate Entry: ${actplayer} must search your deck for 2 cards'),
		'descriptionmyturn' => clienttranslate('Duplicate Entry: ${you} must search your deck for 2 cards'),
		'type' => 'activeplayer',
		'args' => 'argMyDeckContent',
		'possibleactions' => ['actDuplicateEntry'],
		'transitions' => array(
			'trBadOmen' => 92,
		),
	),
	69 => array(
		'name' => 'culturalPreservation',
		'description' => clienttranslate('Cultural Preservation: ${actplayer} must search their deck for 3 cards'),
		'descriptionmyturn' => clienttranslate('Cultural Preservation: ${you} must search your deck for 3 cards'),
		'type' => 'activeplayer',
		'args' => 'argMyDeckContent',
		'possibleactions' => ['actCulturalPreservation'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	70 => array(
		'name' => 'refreshingDrink',
		'description' => clienttranslate('Refreshing Drink: ${actplayer} must discard a card'),
		'descriptionmyturn' => clienttranslate('Refreshing Drink: ${you} must discard a card'),
		'type' => 'activeplayer',
		'action' => 'stRefreshingDrink',
		'possibleactions' => ['actRefreshingDrink'],
		'transitions' => array(
			'trSamePlayer' => 30,
			'trCleanUpPhase' => 41,
		),
	),
	71 => array(
		'name' => 'delightfulSurprise',
		'description' => clienttranslate('Delightful Surprise: ${actplayer} must take a card'),
		'descriptionmyturn' => clienttranslate('Delightful Surprise: ${you} must take a card'),
		'type' => 'activeplayer',
		'action' => 'stDelightfulSurprise',
		'possibleactions' => ['actDelightfulSurprise'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	72 => array(
		'name' => 'replacement',
		'description' => clienttranslate('Replacement: ${actplayer} must choose a card from the market valued ${value_minus_1}, ${value} or ${value_plus_1}'),
		'descriptionmyturn' => clienttranslate('Replacement: ${you} must choose a card from the market valued ${value_minus_1}, ${value} or ${value_plus_1}'),
		'type' => 'activeplayer',
		'args' => 'argReplacement',
		'possibleactions' => ['actReplacement'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	73 => array(
		'name' => 'fashionHint',
		'description' => clienttranslate('Fashion Hint: ${actplayer} may choose an animalfolk card from their hand to swap with ${card_name}'),
		'descriptionmyturn' => clienttranslate('Fashion Hint: ${you} may choose an animalfolk card from your hand to swap with ${card_name}'),
		'type' => 'activeplayer',
		'args' => 'argTopCardBin',
		'possibleactions' => ['actFashionHint'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	74 => array(
		'name' => 'accident',
		'description' => clienttranslate('Accident: ${actplayer} may look at their drawn cards'),
		'descriptionmyturn' => clienttranslate('Accident: ${you} may look at your drawn cards'),
		'type' => 'activeplayer',
		'action' => 'stAccident',
		'possibleactions' => ['actAccident'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	75 => array(
		'name' => 'pompousProfessional',
		'description' => clienttranslate('Pompous Professional: ${actplayer} must choose a \'${animalfolk_name}\' card to place in their hand'),
		'descriptionmyturn' => clienttranslate('Pompous Professional: ${you} must choose a \'${animalfolk_name}\' card to place in your hand'),
		'type' => 'activeplayer',
		'args' => 'argAnimalfolk',
		'action' => 'stPompousProfessional',
		'possibleactions' => ['actPompousProfessional'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	76 => array(
		'name' => 'delicacy',
		'description' => clienttranslate('Delicacy: ${actplayer} may swap with a card from ${opponent_name}\'s deck'),
		'descriptionmyturn' => clienttranslate('Delicacy: ${you} may swap with a card from ${opponent_name}\'s deck'),
		'type' => 'activeplayer',
		'action' => 'stDelicacy',
		'args' => 'argOpponentName',
		'possibleactions' => ['actDelicacy'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	77 => array(
		'name' => 'umbrella',
		'description' => clienttranslate('Umbrella: ${actplayer} may swap with a card from ${opponent_name}\'s hand'),
		'descriptionmyturn' => clienttranslate('Umbrella: ${you} may swap with a card from ${opponent_name}\'s hand'),
		'type' => 'activeplayer',
		'action' => 'stUmbrella',
		'args' => 'argOpponentName',
		'possibleactions' => ['actUmbrella'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	78 => array(
		'name' => 'rumours',
		'description' => clienttranslate('Rumours: ${actplayer} must give back all drawn cards'),
		'descriptionmyturn' => clienttranslate('Rumours: ${you} must choose a card and a player'),
		'type' => 'activeplayer',
		'action' => 'stRumours',
		'args' => 'argPlayerIds',
		'possibleactions' => ['actGiveCardsFromLimboToPlayers'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	79 => array(
		'name' => 'wheelbarrow',
		'description' => clienttranslate('Wheelbarrow: ${actplayer} must choose to toss or store ${card_name}'),
		'descriptionmyturn' => clienttranslate('Wheelbarrow: ${you} must choose to toss or store ${card_name}'),
		'type' => 'activeplayer',
		'action' => 'stWheelbarrow',
		'args' => 'argCardName',
		'possibleactions' => ['actWheelbarrow'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	80 => array(
		'name' => 'vigilance',
		'description' => clienttranslate('Vigilance: ${actplayer} must search their deck for a card'),
		'descriptionmyturn' => clienttranslate('Vigilance: ${you} must search your deck for a card'),
		'type' => 'activeplayer',
		'args' => 'argMyDeckContent',
		'possibleactions' => ['actVigilance'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	81 => array(
		'name' => 'tacticalMeasurement',
		'description' => clienttranslate('Tactical Measurement: ${actplayer} must place 2 cards on their deck'),
		'descriptionmyturn' => clienttranslate('Tactical Measurement: ${you} must place 2 cards on your deck'),
		'type' => 'activeplayer',
		'action' => 'stTacticalMeasurement',
		'possibleactions' => ['actTacticalMeasurement'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	82 => array(
		'name' => 'meddlingMarketeer',
		'description' => clienttranslate('Meddling Marketeer: ${actplayer} may discard any number of cards'),
		'descriptionmyturn' => clienttranslate('Meddling Marketeer: ${you} may discard any number of cards'),
		'type' => 'activeplayer',
		'action' => 'stMeddlingMarketeer',
		'possibleactions' => ['actMeddlingMarketeer'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	83 => array(
		'name' => 'anchor',
		'description' => clienttranslate('Anchor: ${actplayer} must place a card on any player\'s discard pile'),
		'descriptionmyturn' => clienttranslate('Anchor: ${you} must place a card on any player\'s discard pile'),
		'type' => 'activeplayer',
		'action' => 'stAnchor',
		'possibleactions' => ['actAnchor'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	84 => array(
		'name' => 'manufacturedJoy',
		'description' => clienttranslate('Manufactured Joy: ${actplayer} must search their deck for a card'),
		'descriptionmyturn' => clienttranslate('Manufactured Joy: ${you} must search your deck for a card'),
		'type' => 'activeplayer',
		'args' => 'argMyDeckContent',
		'possibleactions' => ['actManufacturedJoy'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	85 => array(
		'name' => 'shakyEnterprise',
		'description' => clienttranslate('Shaky Enterprise: ${actplayer} must place a card on any player\'s discard pile'),
		'descriptionmyturn' => clienttranslate('Shaky Enterprise: ${you} must place a card on any player\'s discard pile'),
		'type' => 'activeplayer',
		'possibleactions' => ['actAnchor'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	86 => array(
		'name' => 'charmStove',
		'description' => clienttranslate('Stove: ${actplayer} may spend x to change the Stove\'s value'),
		'descriptionmyturn' => clienttranslate('Stove: ${you} may spend x to change the Stove\'s value'),
		'type' => 'activeplayer',
		'action' => 'stCharmStove',
		'possibleactions' => ['actCharmStove'],
		'transitions' => array(
			'trSamePlayer' => 30,
			'trGameEnd' => 98,
		),
	),
	87 => array(
		'name' => 'resourcefulAlly',
		'description' => clienttranslate('Resourceful Ally: ${actplayer} must place ${nbr} cards from your discard on the bottom of their deck'),
		'descriptionmyturn' => clienttranslate('Resourceful Ally: ${you} must place ${nbr} cards from your discard on the bottom of your deck'),
		'type' => 'activeplayer',
		'args' => 'argResourcefulAlly',
		'possibleactions' => ['actResourcefulAlly'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	88 => array(
		'name' => 'travelingEquipment',
		'description' => clienttranslate('Traveling Equipment: ${actplayer} must choose cards to toss and discard'),
		'descriptionmyturn' => clienttranslate('Traveling Equipment: ${you} must choose cards to toss and discard'),
		'type' => 'activeplayer',
		'action' => 'stTravelingEquipment',
		'possibleactions' => ['actTravelingEquipment'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	89 => array(
		'name' => 'fishing',
		'description' => clienttranslate('Fishing: ${actplayer} must place 1-3 cards from your discard on your deck'),
		'descriptionmyturn' => clienttranslate('Fishing: ${you} must place 1-3 cards from your discard on your deck'),
		'type' => 'activeplayer',
		'possibleactions' => ['actFishing'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	90 => array(
		'name' => 'groundbreakingIdea',
		'description' => clienttranslate('Groundbreaking Idea: ${actplayer} must place a card from their discard on their deck'),
		'descriptionmyturn' => clienttranslate('Groundbreaking Idea: ${you} must place a card from your discard on your deck'),
		'type' => 'activeplayer',
		'possibleactions' => ['actGroundbreakingIdea'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	91 => array(
		'name' => 'insight',
		'description' => clienttranslate('Insight: ${actplayer} must choose the order to place all cards back on top of their deck'),
		'descriptionmyturn' => clienttranslate('Insight: ${you} must choose the order to place all cards back on top of your deck'),
		'type' => 'activeplayer',
		'action' => 'stInsight',
		'possibleactions' => ['actInsight'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	92 => array(
		'name' => 'badOmen',
		'description' => clienttranslate('${resolving_card_name}: ${actplayer} may toss a card'),
		'descriptionmyturn' => clienttranslate('${resolving_card_name}: ${you} may toss a card'),
		'type' => 'activeplayer',
		'action' => 'stBadOmen',
		'args' => 'argResolvingCardName',
		'possibleactions' => ['actBadOmen'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	93 => array(
		'name' => 'celestialGuidanceMarket',
		'description' => clienttranslate('Celestial Guidance: ${actplayer} must take a card from the market'),
		'descriptionmyturn' => clienttranslate('Celestial Guidance: ${you} must take a card from the market'),
		'type' => 'activeplayer',
		'possibleactions' => ['actCelestialGuidanceMarket'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	94 => array(
		'name' => 'celestialGuidanceDiscard',
		'description' => clienttranslate('Celestial Guidance: ${actplayer} must take a card from their discard pile'),
		'descriptionmyturn' => clienttranslate('Celestial Guidance: ${you} must take a card from your discard pile'),
		'type' => 'activeplayer',
		'possibleactions' => ['actCelestialGuidanceDiscard'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	95 => array(
		'name' => 'fumblingDreamer',
		'description' => clienttranslate('Fumbling Dreamer: ${actplayer} must choose a player to move a card from their ${die_label_source} (${die_icon_source}) to their ${die_label} (${die_icon})'),
		'descriptionmyturn' => clienttranslate('Fumbling Dreamer: ${you} must choose a player to move a card from their ${die_label_source} (${die_icon_source}) to their ${die_label} (${die_icon})'),
		'type' => 'activeplayer',
		'args' => 'argPangolinDice',
		'possibleactions' => ['actFumblingDreamer'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	96 => array(
		'name' => 'looseMarbles',
		'description' => clienttranslate('Loose Marbles: ${actplayer} must move a card from a ${die_label_source} (${die_icon_source}) to another player\'s ${die_label} (${die_icon})'),
		'descriptionmyturn' => clienttranslate('Loose Marbles: ${you} must move a card from a ${die_label_source} (${die_icon_source}) to another player\'s ${die_label} (${die_icon})'),
		'type' => 'activeplayer',
		'args' => 'argPangolinDice',
		'possibleactions' => ['actLooseMarbles'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	97 => array(
		'name' => 'anotherFineMess',
		'description' => clienttranslate('Another Fine Mess: ${actplayer} must move cards from a ${die_label_source} (${die_icon_source}) to another player\'s ${die_label} (${die_icon})'),
		'descriptionmyturn' => clienttranslate('Another Fine Mess: ${you} must move cards from a ${die_label_source} (${die_icon_source}) to another player\'s ${die_label} (${die_icon})'),
		'type' => 'activeplayer',
		'args' => 'argPangolinDice',
		'possibleactions' => ['actAnotherFineMess'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	98 => array(
		'name' => 'finalStatistics',
		'description' => '',
		'type' => 'game',
		'action' => 'stFinalStatistics',
		'transitions' => array(
			'trGameEnd' => 99,
		),
	),
	99 => array(
		'name' => 'gameEnd',
		'description' => clienttranslate('End of game'),
		'type' => 'manager',
		'action' => 'stGameEnd',
		'args' => 'argGameEnd',
		'updateGameProgression' => true,
	),
	101 => array(
		'name' => 'coffeeGrinder',
		'description' => clienttranslate('Coffee Grinder: ${actplayer} may discard another card from ${opponent_name}\'s deck'),
		'descriptionmyturn' => clienttranslate('Coffee Grinder: ${you} may discard another card from ${opponent_name}\'s deck'),
		'type' => 'activeplayer',
		'args' => 'argOpponentNameAndPassiveCardId',
		'possibleactions' => ['actCoffeeGrinder'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	102 => array(
		'name' => 'bouquets',
		'description' => clienttranslate('Bouquets: ${actplayer} must choose a card to place on their deck'),
		'descriptionmyturn' => clienttranslate('Bouquets: ${you} must choose a card to place on their deck'),
		'type' => 'activeplayer',
		'possibleactions' => ['actBouquets'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	103 => array(
		'name' => 'rake',
		'description' => clienttranslate('${resolving_card_name}: ${actplayer} may toss 0-1 cards and discard 0-2 cards from their deck'),
		'descriptionmyturn' => clienttranslate('${resolving_card_name}: ${you} may toss (ICON) 0-1 cards and discard (ICON) 0-2 cards from their deck'),
		'type' => 'activeplayer',
		'args' => 'argMyDeckContentAndResolvingCardName',
		'possibleactions' => ['actRake'],
		'transitions' => array(
			'trSamePlayer' => 30,
		),
	),
	6300 => array(
		'name' => 'deprecated_cheer',
		'description' => clienttranslate('Other players are still searching their decks'),
		'descriptionmyturn' => clienttranslate('${you} must search your deck for a card'),
		'type' => 'multipleactiveplayer',
		'action' => 'stDeprecatedCheer',
		'args' => 'argDeckContent',
		'possibleactions' => ['actDeprecatedCheer'],
		'transitions' => array(
			'trChangeActivePlayer' => 29,
		),
	),
	6500 => array(
		'name' => 'deprecated_tasters',
		'description' => clienttranslate('Tasters: ${actplayer} must take a card from the market'),
		'descriptionmyturn' => clienttranslate('Tasters: ${you} must take a card from the market'),
		'type' => 'activeplayer',
		'possibleactions' => ['actDeprecatedTasters'],
		'transitions' => array(
			'trChangeActivePlayer' => 29,
		),
	),
);