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
	$game->stNextPlayer();
	$game->stSpyglass();
}

$machinestates = array(
	1 => array(
		'name' => 'gameSetup',
		'description' => '',
		'type' => 'manager',
		'action' => 'stGameSetup',
		'transitions' => array(
			'' => 30,
		),
	),
	30 => array(
		'name' => 'playerTurn',
		'description' => clienttranslate('${actplayer} must take an action'),
		'descriptionmyturn' => clienttranslate('${you} must take an action'),
		'type' => 'activeplayer',
		'possibleactions' => ['actPurchase', 'actPlayTechniqueCard', 'actUseActiveAbility', 'actWinterIsComingSkip', 'actBuild', 'actInventoryAction'],
		'transitions' => array(
			'trCancel' => 30,
			'trActiveAbility' => 30,
			'trWinterIsComing' => 36,
			'trSamePlayer' => 30,
			'trNextPlayer' => 41,
			'trGameEnd' => 99,
			'trSpyglass' => 52,
			'trLoyalPartner' => 55,
			'trPrepaidGood' => 56,
		),
	),
	36 => array(
		'name' => 'winterIsComing',
		'description' => clienttranslate('Winter is Coming: ${actplayer} may select cards to build in stack ${stack_index_plus_1}'),
		'descriptionmyturn' => clienttranslate('Winter is Coming: ${you} may select cards to build in stack ${stack_index_plus_1}'),
		'type' => 'activeplayer',
		'args' => 'argStackIndex',
		'possibleactions' => ['actBuild', 'actUseActiveAbility', 'actWinterIsComingSkip'],
		'transitions' => array(
			'trActiveAbility' => 36,
			'trWinterIsComing' => 36,
			'trNextPlayer' => 41,
			'trGameEnd' => 99,
		),
	),
	41 => array(
		'name' => 'nextPlayer',
		'description' => '',
		'type' => 'game',
		'action' => 'stNextPlayer',
		'updateGameProgression' => true,
		'transitions' => array(
			'trNextPlayer' => 30,
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
	55 => array(
		'name' => 'loyalPartner',
		'description' => clienttranslate('Loyal Partner: ${actplayer} must <stronger>ditch</stronger> all cards from the market'),
		'descriptionmyturn' => clienttranslate('Loyal Partner: ${you} must <stronger>ditch</stronger> all cards from the market. Click on any cards to determine the order on the market discard pile'),
		'type' => 'activeplayer',
		'possibleactions' => ['actLoyalPartner', 'actCancel'],
		'transitions' => array(
			'trCancel' => 30,
			'trSamePlayer' => 30,
		),
	),
	56 => array(
		'name' => 'prepaidGood',
		'description' => clienttranslate('Prepaid Good: ${actplayer} must choose a card from the market'),
		'descriptionmyturn' => clienttranslate('Prepaid Good: ${you} must choose a card from the market'),
		'type' => 'activeplayer',
		'possibleactions' => ['actPrepaidGood', 'actCancel'],
		'transitions' => array(
			'trCancel' => 30,
			'trSamePlayer' => 30,
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