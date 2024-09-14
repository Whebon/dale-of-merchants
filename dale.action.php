<?php
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

class action_dale extends APP_GameAction
{
	/** @var dale $game */
	protected $game; // Enforces functions exist on Table class

	// Constructor: please do not modify
	public function __default()
	{
		if (self::isArg('notifwindow')) {
			$this->view = "common_notifwindow";
			$this->viewArgs['table'] = self::getArg("table", AT_posint, true);
		} else {
			$this->view = "dale_dale";
			self::trace("Complete reinitialization of board game");
		}
	}

	public function actSubmitPreference()
	{
		self::setAjaxMode();

		/** @var string $animalfolk_ids */
		$animalfolk_ids = self::getArg('animalfolk_ids', AT_numberlist, true);

		$this->game->actSubmitPreference( $animalfolk_ids );
		self::ajaxResponse();
	}

	public function actPurchase()
	{
		self::setAjaxMode();

		/** @var string $chameleons_json */
		$chameleons_json = self::getArg('chameleons_json', AT_json, true);
		/** @var string $funds_card_ids */
		$funds_card_ids = self::getArg('funds_card_ids', AT_numberlist, true);
		/** @var int $market_card_id */
		$market_card_id = self::getArg('market_card_id', AT_int, true);
		/** @var string $args */
		$args = self::getArg('args', AT_json, true);

		$this->game->actPurchase( $chameleons_json, $funds_card_ids, $market_card_id, $args );
		self::ajaxResponse();
	}

	public function actPlayTechniqueCard()
	{
		self::setAjaxMode();

		/** @var string $chameleons_json */
		$chameleons_json = self::getArg('chameleons_json', AT_json, true);
		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);
		/** @var string $args */
		$args = self::getArg('args', AT_json, true);

		$this->game->actPlayTechniqueCard( $chameleons_json, $card_id, $args );
		self::ajaxResponse();
	}

	public function actUsePassiveAbility()
	{
		self::setAjaxMode();

		/** @var string $chameleons_json */
		$chameleons_json = self::getArg('chameleons_json', AT_json, true);
		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);
		/** @var string $args */
		$args = self::getArg('args', AT_json, true);

		$this->game->actUsePassiveAbility( $chameleons_json, $card_id, $args );
		self::ajaxResponse();
	}

	public function actFullyResolveTechniqueCard()
	{
		self::setAjaxMode();

		/** @var string $chameleons_json */
		$chameleons_json = self::getArg('chameleons_json', AT_json, true);
		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);
		/** @var string $args */
		$args = self::getArg('args', AT_json, true);

		$this->game->actFullyResolveTechniqueCard( $chameleons_json, $card_id, $args );
		self::ajaxResponse();
	}

	public function actWinterIsComingSkip()
	{
		self::setAjaxMode();

		$this->game->actWinterIsComingSkip(  );
		self::ajaxResponse();
	}

	public function actBuild()
	{
		self::setAjaxMode();

		/** @var string $chameleons_json */
		$chameleons_json = self::getArg('chameleons_json', AT_json, true);
		/** @var string $stack_card_ids */
		$stack_card_ids = self::getArg('stack_card_ids', AT_numberlist, true);
		/** @var string $stack_card_ids_from_discard */
		$stack_card_ids_from_discard = self::getArg('stack_card_ids_from_discard', AT_numberlist, true);

		$this->game->actBuild( $chameleons_json, $stack_card_ids, $stack_card_ids_from_discard );
		self::ajaxResponse();
	}

	public function actInventoryAction()
	{
		self::setAjaxMode();

		/** @var string $ids */
		$ids = self::getArg('ids', AT_numberlist, true);

		$this->game->actInventoryAction( $ids );
		self::ajaxResponse();
	}

	public function actPostCleanUpPhase()
	{
		self::setAjaxMode();

		/** @var string $chameleons_json */
		$chameleons_json = self::getArg('chameleons_json', AT_json, true);

		$this->game->actPostCleanUpPhase( $chameleons_json );
		self::ajaxResponse();
	}

	public function actSpyglass()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actSpyglass( $card_ids );
		self::ajaxResponse();
	}

	public function actSpecialOffer()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actSpecialOffer( $card_ids );
		self::ajaxResponse();
	}

	public function actDirtyExchange()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actDirtyExchange( $card_id );
		self::ajaxResponse();
	}

	public function actSabotage()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actSabotage( $card_id );
		self::ajaxResponse();
	}

	public function actBlindfold()
	{
		self::setAjaxMode();

		/** @var int $value */
		$value = self::getArg('value', AT_int, true);

		$this->game->actBlindfold( $value );
		self::ajaxResponse();
	}

	public function actBlindfoldDecideValue()
	{
		self::setAjaxMode();

		/** @var int $value */
		$value = self::getArg('value', AT_int, true);

		$this->game->actBlindfoldDecideValue( $value );
		self::ajaxResponse();
	}

	public function actMagnet()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actMagnet( $card_id );
		self::ajaxResponse();
	}

	public function actDangerousTest()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actDangerousTest( $card_ids );
		self::ajaxResponse();
	}

	public function actNightShift()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);
		/** @var string $player_ids */
		$player_ids = self::getArg('player_ids', AT_numberlist, true);

		$this->game->actNightShift( $card_ids, $player_ids );
		self::ajaxResponse();
	}

	public function actRuthlessCompetition()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actRuthlessCompetition( $card_id );
		self::ajaxResponse();
	}

	public function actCunningNeighbour()
	{
		self::setAjaxMode();

		/** @var bool $place_on_deck */
		$place_on_deck = self::getArg('place_on_deck', AT_bool, true);

		$this->game->actCunningNeighbour( $place_on_deck );
		self::ajaxResponse();
	}

	public function actCheer()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actCheer( $card_id );
		self::ajaxResponse();
	}

	public function actCharity()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);
		/** @var string $player_ids */
		$player_ids = self::getArg('player_ids', AT_numberlist, true);

		$this->game->actCharity( $card_ids, $player_ids );
		self::ajaxResponse();
	}

	public function actTasters()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actTasters( $card_id );
		self::ajaxResponse();
	}

	public function actDaringAdventurer()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actDaringAdventurer( $card_ids );
		self::ajaxResponse();
	}
}