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
		'descriptionmyturn' => clienttranslate('${you} must (a) purchase a card, (b) play a technique, (c) build a stack, or (d) pass'),
		'type' => 'activeplayer',
		'possibleactions' => ['actRequestMarketAction', 'actRequestInventoryAction'],
		'transitions' => array(
			'trPurchase' => 31,
			'trInventory' => 40,
		),
	),
	31 => array(
		'name' => 'purchase',
		'description' => clienttranslate('${actplayer} must pay ${cost} for ${card_name}'),
		'descriptionmyturn' => clienttranslate('${you} must pay ${cost} for ${card_name}'),
		'type' => 'activeplayer',
		'args' => 'argSelectedCardInMarket',
		'possibleactions' => ['actPurchase', 'actCancel'],
		'transitions' => array(
			'trCancel' => 30,
			'trNextPlayer' => 41,
		),
	),
	40 => array(
		'name' => 'inventory',
		'description' => clienttranslate('${actplayer} may discard any number of cards'),
		'descriptionmyturn' => clienttranslate('${you} may discard any number of cards'),
		'type' => 'activeplayer',
		'possibleactions' => ['actInventoryAction', 'actCancel'],
		'transitions' => array(
			'trCancel' => 30,
			'trNextPlayer' => 41,
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
	99 => array(
		'name' => 'gameEnd',
		'description' => clienttranslate('End of game'),
		'type' => 'manager',
		'action' => 'stGameEnd',
		'args' => 'argGameEnd',
	),
);