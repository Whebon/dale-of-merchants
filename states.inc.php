<?php
declare(strict_types=1);
/*
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. ANY CHANGES MADE DIRECTLY MAY BE OVERWRITTEN.
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * Dale implementation : © Bart Swinkels
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
	/** @var dale $game */
	$game->stDeckSelection();
	$game->stStartGame();
	$game->stChangeActivePlayer();
	$game->stTurnStart();
	$game->stCleanUpPhase();
	$game->stSpyglass();
	$game->stSpecialOffer();
	$game->stDirtyExchange();
	$game->stSabotage();
	$game->stBlindfold();
	$game->stDangerousTest();
	$game->stNightShift();
	$game->stFinalStatistics();
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
		'possibleactions' => ['actSubmitPreference'],
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
	29 => array(
		'name' => 'changeActivePlayer',
		'description' => '',
		'type' => 'game',
		'action' => 'stChangeActivePlayer',
		'transitions' => array(
			'trSamePlayer' => 30,
			'trBlindfold' => 56,
			'trBlindfoldIncorrectGuess' => 57,
		),
	),
	30 => array(
		'name' => 'playerTurn',
		'description' => clienttranslate('${actplayer} must take an action'),
		'descriptionmyturn' => clienttranslate('${you} must take an action'),
		'type' => 'activeplayer',
		'possibleactions' => ['actPurchase', 'actPlayTechniqueCard', 'actUsePassiveAbility', 'actFullyResolveTechniqueCard', 'actWinterIsComingSkip', 'actBuild', 'actInventoryAction'],
		'transitions' => array(
			'trChangeActivePlayer' => 29,
			'trPassiveAbility' => 30,
			'trWinterIsComing' => 36,
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
	36 => array(
		'name' => 'winterIsComing',
		'description' => clienttranslate('Winter is Coming: ${actplayer} may select cards to build in stack ${stack_index_plus_1}'),
		'descriptionmyturn' => clienttranslate('Winter is Coming: ${you} may select cards to build in stack ${stack_index_plus_1}'),
		'type' => 'activeplayer',
		'args' => 'argStackIndex',
		'possibleactions' => ['actBuild', 'actUsePassiveAbility', 'actWinterIsComingSkip'],
		'transitions' => array(
			'trPassiveAbility' => 36,
			'trWinterIsComing' => 36,
			'trNextPlayer' => 41,
			'trSamePlayer' => 30,
			'trGameEnd' => 98,
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
		'description' => clienttranslate('Special Offer: ${actplayer} must choose a card to take'),
		'descriptionmyturn' => clienttranslate('Special Offer: ${you} must choose a card to take'),
		'type' => 'activeplayer',
		'action' => 'stSpecialOffer',
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
		'description' => clienttranslate('Sabotage: ${actplayer} must choose a card to ditch for ${opponent_name}'),
		'descriptionmyturn' => clienttranslate('Sabotage: ${you} must choose a card to ditch for ${opponent_name}'),
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
		'description' => clienttranslate('Dangerous Test: ${actplayer} must discard 3 cards'),
		'descriptionmyturn' => clienttranslate('Dangerous Test: ${you} must discard 3 cards'),
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
);