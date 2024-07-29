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

	public function actRequestMarketAction()
	{
		self::setAjaxMode();

		/** @var int $market_card_id */
		$market_card_id = self::getArg('market_card_id', AT_int, true);

		$this->game->actRequestMarketAction( $market_card_id );
		self::ajaxResponse();
	}

	public function actRequestInventoryAction()
	{
		self::setAjaxMode();

		$this->game->actRequestInventoryAction(  );
		self::ajaxResponse();
	}

	public function actPurchase()
	{
		self::setAjaxMode();

		/** @var string $funds_card_ids */
		$funds_card_ids = self::getArg('funds_card_ids', AT_numberlist, true);

		$this->game->actPurchase( $funds_card_ids );
		self::ajaxResponse();
	}

	public function actCancel()
	{
		self::setAjaxMode();

		$this->game->actCancel(  );
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
}