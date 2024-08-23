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

	public function actPurchase()
	{
		self::setAjaxMode();

		/** @var string $chameleons_json */
		$chameleons_json = self::getArg('chameleons_json', AT_json, true);
		/** @var string $funds_card_ids */
		$funds_card_ids = self::getArg('funds_card_ids', AT_numberlist, true);
		/** @var int $market_card_id */
		$market_card_id = self::getArg('market_card_id', AT_int, true);
		/** @var string $essential_purchase_ids */
		$essential_purchase_ids = self::getArg('essential_purchase_ids', AT_numberlist, true);

		$this->game->actPurchase( $chameleons_json, $funds_card_ids, $market_card_id, $essential_purchase_ids );
		self::ajaxResponse();
	}

	public function actPlayTechniqueCard()
	{
		self::setAjaxMode();

		/** @var string $chameleons_json */
		$chameleons_json = self::getArg('chameleons_json', AT_json, true);
		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actPlayTechniqueCard( $chameleons_json, $card_id );
		self::ajaxResponse();
	}

	public function actUseActiveAbility()
	{
		self::setAjaxMode();

		/** @var string $chameleons_json */
		$chameleons_json = self::getArg('chameleons_json', AT_json, true);
		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actUseActiveAbility( $chameleons_json, $card_id );
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

	public function actSwiftBroker()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actSwiftBroker( $card_ids );
		self::ajaxResponse();
	}

	public function actCancel()
	{
		self::setAjaxMode();

		$this->game->actCancel(  );
		self::ajaxResponse();
	}

	public function actShatteredRelic()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actShatteredRelic( $card_id );
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

	public function actAcorn()
	{
		self::setAjaxMode();

		/** @var int $stall_player_id */
		$stall_player_id = self::getArg('stall_player_id', AT_int, true);
		/** @var int $stall_card_id */
		$stall_card_id = self::getArg('stall_card_id', AT_int, true);

		$this->game->actAcorn( $stall_player_id, $stall_card_id );
		self::ajaxResponse();
	}

	public function actGiftVoucher()
	{
		self::setAjaxMode();

		/** @var int $market_card_id */
		$market_card_id = self::getArg('market_card_id', AT_int, true);

		$this->game->actGiftVoucher( $market_card_id );
		self::ajaxResponse();
	}

	public function actLoyalPartner()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actLoyalPartner( $card_ids );
		self::ajaxResponse();
	}

	public function actPrepaidGood()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actPrepaidGood( $card_id );
		self::ajaxResponse();
	}
}