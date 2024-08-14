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
	$game->stFullyResolveTechnique();
	$game->stFullyResolveTechniqueNoDiscard();
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
		'possibleactions' => ['actRequestMarketAction', 'actPlayTechniqueCard', 'actUseActiveAbility', 'actRequestStallAction', 'actRequestInventoryAction'],
		'transitions' => array(
			'trActiveAbility' => 30,
			'trPurchase' => 31,
			'trFullyResolveTechnique' => 33,
			'trBuild' => 35,
			'trInventory' => 40,
			'trNextPlayer' => 41,
			'trSwiftBroker' => 50,
			'trShatteredRelic' => 51,
			'trSpyglass' => 52,
			'trAcorn' => 53,
			'trGiftVoucher' => 54,
			'trLoyalPartner' => 55,
			'trPrepaidGood' => 56,
		),
	),
	31 => array(
		'name' => 'purchase',
		'description' => clienttranslate('${actplayer} must pay ${cost} for ${card_name}'),
		'descriptionmyturn' => clienttranslate('${you} must pay ${cost} for ${card_name}'),
		'type' => 'activeplayer',
		'args' => 'argSelectedCardInMarket',
		'possibleactions' => ['actPurchase', 'actUseActiveAbility', 'actCancel'],
		'transitions' => array(
			'trActiveAbility' => 31,
			'trCancel' => 30,
			'trNextPlayer' => 41,
		),
	),
	33 => array(
		'name' => 'fullyResolveTechnique',
		'description' => '',
		'type' => 'game',
		'action' => 'stFullyResolveTechnique',
		'transitions' => array(
			'trSamePlayer' => 30,
			'trNextPlayer' => 41,
		),
	),
	34 => array(
		'name' => 'fullyResolveTechniqueNoDiscard',
		'description' => '',
		'type' => 'game',
		'action' => 'stFullyResolveTechniqueNoDiscard',
		'transitions' => array(
			'trSamePlayer' => 30,
			'trNextPlayer' => 41,
		),
	),
	35 => array(
		'name' => 'build',
		'description' => clienttranslate('${actplayer} must select cards to build in stack ${stack_index_plus_1}'),
		'descriptionmyturn' => clienttranslate('${you} must select cards to build in stack ${stack_index_plus_1}'),
		'type' => 'activeplayer',
		'args' => 'argStackIndex',
		'possibleactions' => ['actBuild', 'actUseActiveAbility', 'actCancel', 'actWinterIsComingSkip'],
		'transitions' => array(
			'trActiveAbility' => 35,
			'trCancel' => 30,
			'trWinterIsComing' => 35,
			'trNextPlayer' => 41,
			'trGameEnd' => 99,
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
	50 => array(
		'name' => 'swiftBroker',
		'description' => clienttranslate('Swift Broker: ${actplayer} must discard their hand'),
		'descriptionmyturn' => clienttranslate('Swift Broker: ${you} must discard your hand. You may select which card(s) to put on top of your discard pile.'),
		'type' => 'activeplayer',
		'possibleactions' => ['actSwiftBroker', 'actCancel'],
		'transitions' => array(
			'trCancel' => 30,
			'trFullyResolveTechnique' => 33,
		),
	),
	51 => array(
		'name' => 'shatteredRelic',
		'description' => clienttranslate('Shattered Relic: ${actplayer} must throw away a card from their hand'),
		'descriptionmyturn' => clienttranslate('Shattered Relic: ${you} must throw away a card from your hand'),
		'type' => 'activeplayer',
		'possibleactions' => ['actShatteredRelic', 'actCancel'],
		'transitions' => array(
			'trCancel' => 30,
			'trFullyResolveTechnique' => 33,
		),
	),
	52 => array(
		'name' => 'spyglass',
		'description' => clienttranslate('Spyglass: ${actplayer} must choose a card to place into their hand'),
		'descriptionmyturn' => clienttranslate('Spyglass: ${you} must choose a card to place into your hand'),
		'type' => 'activeplayer',
		'possibleactions' => ['actSpyglass'],
		'transitions' => array(
			'trFullyResolveTechnique' => 33,
		),
	),
	53 => array(
		'name' => 'acorn',
		'description' => clienttranslate('Acorn: ${actplayer} must select a card from an opponent\'s stall to swap with'),
		'descriptionmyturn' => clienttranslate('Acorn: ${you} must select a card from an opponent\'s stall to swap with'),
		'type' => 'activeplayer',
		'possibleactions' => ['actAcorn', 'actCancel'],
		'transitions' => array(
			'trCancel' => 30,
			'trFullyResolveTechniqueNoDiscard' => 34,
		),
	),
	54 => array(
		'name' => 'giftVoucher',
		'description' => clienttranslate('Gift Voucher: ${actplayer} must select a card in the market to swap with'),
		'descriptionmyturn' => clienttranslate('Gift Voucher: ${you} must select a card in the market to swap with'),
		'type' => 'activeplayer',
		'possibleactions' => ['actGiftVoucher', 'actCancel'],
		'transitions' => array(
			'trCancel' => 30,
			'trFullyResolveTechniqueNoDiscard' => 34,
		),
	),
	55 => array(
		'name' => 'loyalPartner',
		'description' => clienttranslate('Loyal Partner: ${actplayer} must throw away all cards from the market'),
		'descriptionmyturn' => clienttranslate('Loyal Partner: ${you} must throw away all cards from the market. Click on any cards to determine the order on the market discard pile'),
		'type' => 'activeplayer',
		'possibleactions' => ['actLoyalPartner', 'actCancel'],
		'transitions' => array(
			'trCancel' => 30,
			'trFullyResolveTechnique' => 33,
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
			'trFullyResolveTechnique' => 33,
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