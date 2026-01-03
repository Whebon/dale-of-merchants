<?php
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

class action_daleofmerchants extends APP_GameAction
{
	/** @var daleofmerchants $game */
	protected $game; // Enforces functions exist on Table class

	// Constructor: please do not modify
	public function __default()
	{
		if (self::isArg('notifwindow')) {
			$this->view = "common_notifwindow";
			$this->viewArgs['table'] = self::getArg("table", AT_posint, true);
		} else {
			$this->view = "daleofmerchants_daleofmerchants";
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

	public function actEnableDebugMode()
	{
		self::setAjaxMode();

		$this->game->actEnableDebugMode(  );
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

	public function actBonusBuildSkip()
	{
		self::setAjaxMode();

		$this->game->actBonusBuildSkip(  );
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
		/** @var string $args */
		$args = self::getArg('args', AT_json, true);

		$this->game->actBuild( $chameleons_json, $stack_card_ids, $stack_card_ids_from_discard, $args );
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

	public function actSpawn()
	{
		self::setAjaxMode();

		/** @var string $card_name */
		$card_name = self::getArg('card_name', AT_json, true);

		$this->game->actSpawn( $card_name );
		self::ajaxResponse();
	}

	public function actRoyalPrivilege()
	{
		self::setAjaxMode();

		/** @var int $toss_card_id */
		$toss_card_id = self::getArg('toss_card_id', AT_int, true);
		/** @var int $market_card_id */
		$market_card_id = self::getArg('market_card_id', AT_int, true);

		$this->game->actRoyalPrivilege( $toss_card_id, $market_card_id );
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

	public function actDEPRECATED_Blindfold()
	{
		self::setAjaxMode();

		/** @var int $value */
		$value = self::getArg('value', AT_int, true);

		$this->game->actDEPRECATED_Blindfold( $value );
		self::ajaxResponse();
	}

	public function actDEPRECATED_BlindfoldDecideValue()
	{
		self::setAjaxMode();

		/** @var int $value */
		$value = self::getArg('value', AT_int, true);

		$this->game->actDEPRECATED_BlindfoldDecideValue( $value );
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

	public function actGiveCardsFromLimboToPlayers()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);
		/** @var string $player_ids */
		$player_ids = self::getArg('player_ids', AT_numberlist, true);

		$this->game->actGiveCardsFromLimboToPlayers( $card_ids, $player_ids );
		self::ajaxResponse();
	}

	public function actTasters()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);
		/** @var string $player_ids */
		$player_ids = self::getArg('player_ids', AT_numberlist, true);

		$this->game->actTasters( $card_ids, $player_ids );
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

	public function actNaturalSurvivor()
	{
		self::setAjaxMode();

		/** @var string $hand_card_ids */
		$hand_card_ids = self::getArg('hand_card_ids', AT_numberlist, true);
		/** @var string $deck_card_ids */
		$deck_card_ids = self::getArg('deck_card_ids', AT_numberlist, true);

		$this->game->actNaturalSurvivor( $hand_card_ids, $deck_card_ids );
		self::ajaxResponse();
	}

	public function actDuplicateEntry()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actDuplicateEntry( $card_ids );
		self::ajaxResponse();
	}

	public function actDEPRECATED_CulturalPreservation()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actDEPRECATED_CulturalPreservation( $card_ids );
		self::ajaxResponse();
	}

	public function actRefreshingDrink()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actRefreshingDrink( $card_id );
		self::ajaxResponse();
	}

	public function actDelightfulSurprise()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actDelightfulSurprise( $card_id );
		self::ajaxResponse();
	}

	public function actReplacement()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actReplacement( $card_id );
		self::ajaxResponse();
	}

	public function actFashionHint()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actFashionHint( $card_id );
		self::ajaxResponse();
	}

	public function actAccident()
	{
		self::setAjaxMode();

		$this->game->actAccident(  );
		self::ajaxResponse();
	}

	public function actPompousProfessional()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);
		/** @var bool $is_taking_card */
		$is_taking_card = self::getArg('is_taking_card', AT_bool, true);

		$this->game->actPompousProfessional( $card_ids, $is_taking_card );
		self::ajaxResponse();
	}

	public function actDelicacy()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actDelicacy( $card_id );
		self::ajaxResponse();
	}

	public function actUmbrella()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actUmbrella( $card_id );
		self::ajaxResponse();
	}

	public function actWheelbarrow()
	{
		self::setAjaxMode();

		/** @var bool $is_tossing */
		$is_tossing = self::getArg('is_tossing', AT_bool, true);

		$this->game->actWheelbarrow( $is_tossing );
		self::ajaxResponse();
	}

	public function actVigilance()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actVigilance( $card_id );
		self::ajaxResponse();
	}

	public function actTacticalMeasurement()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actTacticalMeasurement( $card_ids );
		self::ajaxResponse();
	}

	public function actMeddlingMarketeer()
	{
		self::setAjaxMode();

		/** @var string $discard_card_ids */
		$discard_card_ids = self::getArg('discard_card_ids', AT_numberlist, true);
		/** @var string $deck_card_ids */
		$deck_card_ids = self::getArg('deck_card_ids', AT_numberlist, true);

		$this->game->actMeddlingMarketeer( $discard_card_ids, $deck_card_ids );
		self::ajaxResponse();
	}

	public function actAnchor()
	{
		self::setAjaxMode();

		/** @var int $opponent_id */
		$opponent_id = self::getArg('opponent_id', AT_int, true);
		/** @var int $discard_card_id */
		$discard_card_id = self::getArg('discard_card_id', AT_int, true);
		/** @var string $deck_card_ids */
		$deck_card_ids = self::getArg('deck_card_ids', AT_numberlist, true);

		$this->game->actAnchor( $opponent_id, $discard_card_id, $deck_card_ids );
		self::ajaxResponse();
	}

	public function actManufacturedJoy()
	{
		self::setAjaxMode();

		/** @var int $draw_card_id */
		$draw_card_id = self::getArg('draw_card_id', AT_int, true);
		/** @var int $discard_card_id */
		$discard_card_id = self::getArg('discard_card_id', AT_int, true);
		/** @var int $opponent_id */
		$opponent_id = self::getArg('opponent_id', AT_int, true);

		$this->game->actManufacturedJoy( $draw_card_id, $discard_card_id, $opponent_id );
		self::ajaxResponse();
	}

	public function actCharmStove()
	{
		self::setAjaxMode();

		/** @var string $spend_card_ids */
		$spend_card_ids = self::getArg('spend_card_ids', AT_numberlist, true);
		/** @var int $spend_coins */
		$spend_coins = self::getArg('spend_coins', AT_int, true);

		$this->game->actCharmStove( $spend_card_ids, $spend_coins );
		self::ajaxResponse();
	}

	public function actResourcefulAlly()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actResourcefulAlly( $card_ids );
		self::ajaxResponse();
	}

	public function actTravelingEquipment()
	{
		self::setAjaxMode();

		/** @var int $toss_card_id */
		$toss_card_id = self::getArg('toss_card_id', AT_int, true);

		$this->game->actTravelingEquipment( $toss_card_id );
		self::ajaxResponse();
	}

	public function actFishing()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actFishing( $card_ids );
		self::ajaxResponse();
	}

	public function actGroundbreakingIdea()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actGroundbreakingIdea( $card_id );
		self::ajaxResponse();
	}

	public function actInsight()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actInsight( $card_ids );
		self::ajaxResponse();
	}

	public function actBadOmen()
	{
		self::setAjaxMode();

		/** @var int $toss_card_id */
		$toss_card_id = self::getArg('toss_card_id', AT_int, true);
		/** @var string $deck_card_ids */
		$deck_card_ids = self::getArg('deck_card_ids', AT_numberlist, true);

		$this->game->actBadOmen( $toss_card_id, $deck_card_ids );
		self::ajaxResponse();
	}

	public function actCelestialGuidanceMarket()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actCelestialGuidanceMarket( $card_id );
		self::ajaxResponse();
	}

	public function actCelestialGuidanceDiscard()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actCelestialGuidanceDiscard( $card_id );
		self::ajaxResponse();
	}

	public function actFumblingDreamer()
	{
		self::setAjaxMode();

		/** @var int $opponent_id */
		$opponent_id = self::getArg('opponent_id', AT_int, true);

		$this->game->actFumblingDreamer( $opponent_id );
		self::ajaxResponse();
	}

	public function actLooseMarbles()
	{
		self::setAjaxMode();

		/** @var int $source_id */
		$source_id = self::getArg('source_id', AT_int, true);
		/** @var int $destination_id */
		$destination_id = self::getArg('destination_id', AT_int, true);

		$this->game->actLooseMarbles( $source_id, $destination_id );
		self::ajaxResponse();
	}

	public function actAnotherFineMess()
	{
		self::setAjaxMode();

		/** @var int $source_id */
		$source_id = self::getArg('source_id', AT_int, true);
		/** @var int $destination_id */
		$destination_id = self::getArg('destination_id', AT_int, true);

		$this->game->actAnotherFineMess( $source_id, $destination_id );
		self::ajaxResponse();
	}

	public function actCoffeeGrinder()
	{
		self::setAjaxMode();

		/** @var bool $skip */
		$skip = self::getArg('skip', AT_bool, true);

		$this->game->actCoffeeGrinder( $skip );
		self::ajaxResponse();
	}

	public function actSerenade()
	{
		self::setAjaxMode();

		/** @var string $card_ids */
		$card_ids = self::getArg('card_ids', AT_numberlist, true);

		$this->game->actSerenade( $card_ids );
		self::ajaxResponse();
	}

	public function actRake()
	{
		self::setAjaxMode();

		/** @var string $toss_card_ids */
		$toss_card_ids = self::getArg('toss_card_ids', AT_numberlist, true);
		/** @var string $discard_card_ids */
		$discard_card_ids = self::getArg('discard_card_ids', AT_numberlist, true);

		$this->game->actRake( $toss_card_ids, $discard_card_ids );
		self::ajaxResponse();
	}

	public function actDeprecatedCheer()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actDeprecatedCheer( $card_id );
		self::ajaxResponse();
	}

	public function actDeprecatedTasters()
	{
		self::setAjaxMode();

		/** @var int $card_id */
		$card_id = self::getArg('card_id', AT_int, true);

		$this->game->actDeprecatedTasters( $card_id );
		self::ajaxResponse();
	}
}