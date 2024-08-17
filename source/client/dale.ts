/*
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * Dale implementation : © Bart Swinkels
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */
/// <amd-module name="bgagame/dale"/>

//needed for the IDE
import Gamegui = require('ebg/core/gamegui');
import Stock = require('ebg/stock'); 
import Counter = require('ebg/counter'); 

//needed for BGA
import "ebg/counter";
import "ebg/stock"; 
import "ebg/counter"; 

import { DaleStock } from './components/DaleStock'
import { Pile } from './components/Pile';
import { HiddenPile } from './components/HiddenPile';
import { DaleCard } from './components/DaleCard';
import { MarketBoard } from './components/MarketBoard'
import { Stall } from './components/Stall'
import { DbCard } from './components/types/DbCard';
import { ChameleonClientStateArgs } from './components/types/ChameleonClientStateArgs';
import { CardSlot } from './components/CardSlot';
import { DaleLocation } from './components/types/DaleLocation';
import { DaleHand } from './components/DaleHand';
import { MainClientState } from './components/types/MainClientState'

/** The root for all of your game code. */
class Dale extends Gamegui
{
	n: number = 1000;
	quick() {
		this.myHand2.addCard(new DaleCard(this.n+3, this.n-1000));
		//this.myHand2.addCard(new DaleCard(this.n+3, this.n-1000), "deck-2371802-top-card");
		//this.myHand2.removeCard(new DaleCard(this.n));
		this.n++;
	}

	/** For conveniene, each new Pile will add a reference to itself in this array*/
	allPiles: Pile[] = [];

	/** For conveniene, each new DaleStock will add a reference to itself in this array*/
	allDaleStocks: DaleStock[] = [];

	/** For conveniene, each new DaleStock will add a reference to itself in this array*/
	allCardSlots: CardSlot[] = [];

	/** Pile of hidden cards representing the market deck. */
	marketDeck: Pile = new HiddenPile(this, 'market-deck', 'Supply');

	/** Ordered pile of known cards representing the market discard deck. */
	marketDiscard: Pile = new Pile(this, 'market-discard', 'Bin');

	/** A hand size counter at the overall player board for each player  */
	playerHandSizes: Record<number, Counter> = {};

	/** A hidden draw pile for each player */
	playerDecks: Record<number, Pile> = {};

	/** An open discard pile for each player */
	playerDiscards: Record<number, Pile> = {};

	/** A stall for each player */
	playerStalls: Record<number, Stall> = {};

	/** A schedule for each player */
	playerSchedules: Record<number, DaleStock> = {};

	/** Current player's draw pile (this client's draw pil) */
	get myDeck(): Pile {
		return this.playerDecks[this.player_id]!;
	}

	/** Current player's discard pile (this client's discard pile) */
	get myDiscard(): Pile {
		return this.playerDiscards[this.player_id]!;
	}

	/** Current player's stall (this client's discard pile) */
	get myStall(): Stall {
		return this.playerStalls[this.player_id]!;
	}

	/** Current player's schedule (this client's discard pile) */
	get mySchedule(): DaleStock {
		return this.playerSchedules[this.player_id]!;
	}

	/** Ordered pile of known cards representing the market discard deck. */
	market: MarketBoard | null = null;

	/** Cards in this client's player hand */
	myHand: DaleStock = new DaleStock();
	myHand2: DaleHand = undefined as unknown as DaleHand;

	/** Cards in this client's temporary card stock */
	myTemporary: DaleStock = new DaleStock();

	/** Arguments for chameleon client states. This card needs to be highlighted while selecting a valid target for it. */
	chameleonArgs: ChameleonClientStateArgs | undefined;

	/** Current client state */
	mainClientState: MainClientState = new MainClientState(this);

	/** @gameSpecific See {@link Gamegui} for more information. */
	constructor(){
		super();
		console.log('dale constructor');
	}

	/** @gameSpecific See {@link Gamegui.setup} for more information. */
	override setup(gamedatas: Gamedatas): void
	{
		console.log( "Starting game setup" );
		console.log("------ GAME DATAS ------ !")
		console.log(this.gamedatas)
		console.log("------------------------")

		//initialize the card types
		DaleCard.init(gamedatas.cardTypes);

		//display any effects on the client-side
		console.log("DbEffects:");
		for (let i in gamedatas.effects) {
			const effect = gamedatas.effects[i]!;
			DaleCard.addEffect(effect);
		}

		//initialize the player boards
		for(let player_id in gamedatas.players ){
			let player = gamedatas.players[player_id];

			//handsize per player
			const player_board_div = $('player_board_'+player_id)?.querySelector(".player_score")!;
			dojo.place( this.format_block('jstpl_hand_size', {
				player: player
			} ), player_board_div, 'first');
			this.playerHandSizes[player_id] = new ebg.counter();
			this.playerHandSizes[player_id].create('handsize-'+player_id);
			this.playerHandSizes[player_id].setValue(gamedatas.handSizes[player_id]!);
			this.addTooltip('dale-myhandsize-icon-'+player_id, _("Number of cards in hand."), '');
			this.addTooltip('icon_point_'+player_id, _("Number of stacks built."), '');

			//deck per player
			this.playerDecks[player_id] = new HiddenPile(this, 'deck-'+player_id, 'Deck', +player_id);
			this.playerDecks[player_id].pushHiddenCards(gamedatas.deckSizes[player_id]!);

			//discard pile per player
			this.playerDiscards[player_id] = new Pile(this, 'discard-'+player_id, 'Discard', +player_id);
			for (let i in gamedatas.discardPiles[player_id]) {
				let card = gamedatas.discardPiles[player_id][+i]!;
				this.playerDiscards[player_id].push(DaleCard.of(card));
			}

			//stall per player
			this.playerStalls[player_id] = new Stall(this, +player_id);
			for (let i in gamedatas.stalls[player_id]) {
				let card = gamedatas.stalls[player_id][+i]!;
				this.playerStalls[player_id].insertDbCard(card);
			}
		}

		//initialize the market deck
		this.marketDeck.pushHiddenCards(gamedatas.deckSizes.market);

		//initialize the market discard pile
		for (let i in gamedatas.discardPiles.market) {
			let card = gamedatas.discardPiles.market[i]!;
			this.marketDiscard.push(DaleCard.of(card));
		}
		
		//initialize the market board
		this.market = new MarketBoard(this);
		for (let i in gamedatas.market) {
			let card = gamedatas.market[i]!;
			this.market.insertCard(DaleCard.of(card), +card.location_arg);
		}

		//initialize the hand
		this.myHand2 = new DaleHand(this, $('dale-myhand-wrap-2')!, $("dale-myhand-2")!);
		this.myHand.init(this, $('dale-myhand')!);
		this.myHand.initActionLabelWrap($('dale-myhand-wrap')!);
		this.myHand.centerItems = true;
		for (let i in gamedatas.hand) {
			let card = gamedatas.hand[i]!;
			this.myHand.addDaleCardToStock(DaleCard.of(card));
		}
		this.myHand.setSelectionMode(0);
		dojo.connect( this.myHand, 'onChangeSelection', this, 'onHandSelectionChanged' );
		const myHand = this.myHand;
		const myHandUpdateDisplay = ()=>{setTimeout(function() {myHand.updateDisplay()}, 1)}; //TODO: only update display on hide/appear?

		//initialize the temporary zone
		this.myTemporary.init(this, $('mytemporary')!, $('mytemporary-wrap')!, myHandUpdateDisplay, myHandUpdateDisplay);
		for (let i in gamedatas.temporary) {
			const card = gamedatas.temporary[i]!;
			this.myTemporary.addDaleCardToStock(DaleCard.of(card));
		}
		this.myTemporary.setSelectionMode(0);
		this.myTemporary.autowidth = true;
		dojo.connect( this.myTemporary, 'onChangeSelection', this, 'onTemporarySelectionChanged' );

		//initialize the schedules
		for (let player_id in gamedatas.schedules) {
			const container = $('schedule-'+player_id)!
			const wrap = $('schedule-wrap-'+player_id)!
			this.playerSchedules[player_id] = new DaleStock();
			this.playerSchedules[player_id].init(this, container, wrap);
			this.playerSchedules[player_id].setSelectionMode(0);
			this.playerSchedules[player_id].autowidth = true;
			this.playerSchedules[player_id].duration = 500;
			for (let card_id in gamedatas.schedules[player_id]) {
				const card = gamedatas.schedules[+player_id]![+card_id]!;
				this.playerSchedules[player_id]!.addDaleCardToStock(DaleCard.of(card));
			}
		}

		// Setup game notifications to handle (see "setupNotifications" method below)
		this.setupNotifications();

		console.log( "Ending game setup" );
	}

	///////////////////////////////////////////////////
	//// Game & client states
	
	/** @gameSpecific See {@link Gamegui.onEnteringState} for more information. */
	override onEnteringState(stateName: GameStateName, args: CurrentStateArgs): void
	{
		console.log( 'Entering state: '+stateName );

		if (stateName == 'nextPlayer') {
			console.log("nextPlayer, expire all effects that last until end of turn");
			DaleCard.removeEndOfTurnEffects();
			this.mainClientState.exit();
			this.updateHTML();
		}

		if (!this.isCurrentPlayerActive()) {
			return;
		}

		//turn on selection mode(s)
		switch( stateName ){
			case 'playerTurn':
				this.mainClientState.enterClientState();
				break;
			case 'client_purchase':
				const client_purchase_args = (this.mainClientState.args as ClientGameState['client_purchase'])
				this.myHand.setSelectionMode(2, 'pileYellow', 'dale-label-purchase');
				this.market!.setSelectionMode(1);
				if (client_purchase_args.on_market_board) {
					this.market!.setSelected(client_purchase_args.pos, true);
				}
				this.myStall.setLeftPlaceholderClickable(true);
				break;
			case 'client_technique':
				this.myHand.setSelectionMode(1, 'pileBlue', 'dale-label-technique');
				this.market!.setSelectionMode(1);
				this.myStall.setLeftPlaceholderClickable(true);
				break;
			case 'client_build':
				this.myHand.setSelectionMode(2, 'build', 'dale-label-build');
				this.market!.setSelectionMode(1);
				this.myStall.selectLeftPlaceholder();
				this.onBuildSelectionChanged(); //check for nostalgic item
				break;
			case 'client_inventory':
				this.myHand.setSelectionMode(2, 'pileBlue', 'dale-label-discard');
				this.market!.setSelectionMode(1);
				this.myStall.setLeftPlaceholderClickable(true);
				break;
			case 'winterIsComing':
				this.myHand.setSelectionMode(2, 'build', 'dale-label-build');
				this.myStall.selectLeftPlaceholder();
				this.onBuildSelectionChanged(); //check for nostalgic item
				break;
			case 'swiftBroker':
				this.myHand.setSelectionMode(2, 'pileBlue', 'dale-label-text', _("Choose the order to discard your hand"));
				break;
			case 'shatteredRelic':
				this.myHand.setSelectionMode(1, 'none', 'dale-label-text', _("Choose a card to <strong>ditch</strong>"));
				break;
			case 'spyglass':
				this.myTemporary.setSelectionMode(2, 'hand');
				break;
			case 'acorn':
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id) {
						this.playerStalls[player_id]!.setSelectionMode('single');
					}
				}
				break;
			case 'giftVoucher':
				this.market!.setSelectionMode(1);
				break;
			case 'loyalPartner':
				this.market!.setSelectionMode(2, 'pileBlue');
				break;
			case 'prepaidGood':
				this.market!.setSelectionMode(1);
				break;
			case 'chameleon_flexibleShopkeeper':
				this.myStall!.setSelectionMode('rightmoststack');
				this.chameleonArgs?.selectChameleonCard();
				break;
			case 'chameleon_reflection':
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id) {
						this.playerDiscards[player_id]!.setSelectionMode('top');
					}
				}
				this.chameleonArgs?.selectChameleonCard();
				break;
			case 'chameleon_goodoldtimes':
				this.marketDiscard.setSelectionMode('top');
				if (this.chameleonArgs!.card.hasActiveAbility()) {
					this.marketDeck.setSelectionMode('top');
				}
				this.chameleonArgs?.selectChameleonCard();
				break;
			case 'chameleon_trendsetting':
				this.market!.setSelectionMode(1);
				this.chameleonArgs?.selectChameleonCard();
				break;
			case 'chameleon_seeingdoubles':
				this.chameleonArgs?.selectChameleonCard();
		}
	}

	/** @gameSpecific See {@link Gamegui.onLeavingState} for more information. */
	override onLeavingState(stateName: GameStateName): void
	{
		console.log( 'Leaving state: '+stateName );
		
		if (this.chameleonArgs && stateName.substring(0, 9) != 'chameleon') {
			console.log("this.chameleonArgs => don't turn off selection modes");
			return;
		}

		//turn off selection mode(s)
		switch( stateName )
		{
			case 'playerTurn':
				// this.market!.setSelectionMode(0);
				// this.myHand2.setSelectionMode('none');
				// this.myHand.setSelectionMode(0);
				// this.myStall.setLeftPlaceholderClickable(false);
				break;
			case 'client_purchase':
				this.market!.unselectAll();
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode(0);
				this.myStall.setLeftPlaceholderClickable(false);
				DaleCard.unbindAllChameleonsLocal();
				this.updateHTML();
				break;
			case 'client_technique':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode(0);
				this.myStall.setLeftPlaceholderClickable(false);
				DaleCard.unbindAllChameleonsLocal()
				this.updateHTML();
				break;
			case 'client_build':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode(0);
				this.myStall.unselectLeftPlaceholder();
				this.myDiscard.setSelectionMode('none');
				DaleCard.unbindAllChameleonsLocal();
				this.updateHTML();
				break;
			case 'client_inventory':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode(0);
				this.myStall.setLeftPlaceholderClickable(false);
				DaleCard.unbindAllChameleonsLocal()
				this.updateHTML();
				break;
			case 'winterIsComing':
				this.myHand.setSelectionMode(0);
				this.myStall.unselectLeftPlaceholder();
				this.myDiscard.setSelectionMode('none');
				break;
			case 'swiftBroker':
				this.myHand.setSelectionMode(0);
				break;
			case 'shatteredRelic':
				this.myHand.setSelectionMode(0);
				break;
			case 'spyglass':
				this.myTemporary.setSelectionMode(0);
				break;
			case 'acorn':
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id) {
						this.playerStalls[player_id]!.setSelectionMode('none');
					}
				}
				break;
			case 'giftVoucher':
				this.market!.setSelectionMode(0);
				break;
			case 'loyalPartner':
				this.market!.setSelectionMode(0);
				break;
			case 'prepaidGood':
				this.market!.setSelectionMode(0);
				break;
			case 'chameleon_flexibleShopkeeper':
				this.myStall!.setSelectionMode('none');
				this.chameleonArgs?.unselectChameleonCard();
				break;
			case 'chameleon_reflection':
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id) {
						this.playerDiscards[player_id]!.setSelectionMode('none');
					}
				}
				this.chameleonArgs?.unselectChameleonCard();
				break;
			case 'chameleon_goodoldtimes':
				this.marketDiscard.setSelectionMode('none');
				this.marketDeck.setSelectionMode('none');
				this.chameleonArgs?.unselectChameleonCard();
				break;
			case 'chameleon_trendsetting':
				this.market!.setSelectionMode(0);
				this.chameleonArgs?.unselectChameleonCard();
				break;
			case 'chameleon_seeingdoubles':
				this.chameleonArgs?.unselectChameleonCard();
		}
	}

	/** @gameSpecific See {@link Gamegui.onUpdateActionButtons} for more information. */
	override onUpdateActionButtons(stateName: GameStateName, args: AnyGameStateArgs | null): void
	{
		console.log( 'onUpdateActionButtons: ' + stateName, args );

		if(!this.isCurrentPlayerActive())
			return;

		switch( stateName )
		{
			case 'playerTurn':
				//this.addActionButton("confirm-button", _("Inventory Action"), "onRequestInventoryAction");
				break;
			case 'client_technique':
				this.addActionButton("confirm-button", _("Inventory Action"), "onRequestInventoryAction");
				break;
			case 'client_purchase':
				this.addActionButton("confirm-button", _("Confirm Funds"), "onPurchase");
				this.addActionButtonCancelClient();
				break;
			case 'client_build':
				this.addActionButton("confirm-button", _("Confirm Selection"), "onBuild");
				this.addActionButtonCancelClient();
				break;
			case 'client_inventory':
				this.addActionButton("confirm-button", _("Discard Selection"), "onInventoryAction");
				this.addActionButtonCancelClient();
				break;
			case 'winterIsComing':
				this.addActionButton("skip-button", _("Skip"), "onWinterIsComingSkip", undefined, false, 'gray');
				break;
			case 'swiftBroker':
				this.addActionButton("confirm-button", _("Discard All"), "onSwiftBroker");
				this.addActionButtonCancel();
				break;
			case 'shatteredRelic':
				this.addActionButtonCancel();
				break;
			case 'spyglass':
				this.addActionButton("confirm-button", _("Confirm Selection"), "onSpyglass");
				break;
			case 'acorn':
				this.addActionButtonCancel();
				break;
			case 'giftVoucher':
				this.addActionButtonCancel();
				break;
			case 'loyalPartner':
				this.addActionButton("confirm-button", _("Ditch All"), "onLoyalPartner");
				this.addActionButtonCancel();
				break;
			case 'prepaidGood':
				this.addActionButtonCancel();
				break;
			case 'chameleon_flexibleShopkeeper':
				this.addActionButtonCancelChameleon();
				break;
			case 'chameleon_reflection':
				this.addActionButtonCancelChameleon();
				break;
			case 'chameleon_goodoldtimes':
				if (this.chameleonArgs!.card.hasActiveAbility()) {
					this.addActionButton("throw-away-button", _("Ditch"), "onGoodOldTimesPassive");
				}
				this.addActionButton("copy-button", _("Copy"), "onGoodOldTimesBind");
				this.addActionButtonCancelChameleon();
				break;
			case 'chameleon_trendsetting':
				this.addActionButtonCancelChameleon();
				break;
			case 'chameleon_seeingdoubles':
				this.addActionButtonCancelChameleon();
				break;
		}
	}

	///////////////////////////////////////////////////
	//// Utility methods
	
	/*
		Here, you can defines some utility methods that you can use everywhere in your typescript
		script.
	*/

	/**
	 * If the card is an UNBOUND chameleon card, first set the client state to bind the chameleon, then call the `callback` with the bound `card`.
	 * 
	 * Otherwise, simply call the `callback` function with `card`.
	 * 
	 * @param card the card that potentially needs to be be bound. If null, immediately call the callback function without arguments
	 * @param from where is this card currently located?
	 * @param callback function is call if the card is bound. (non-chameleon cards are always 'bound')
	 * @param requiresPlayable (optional) default false. If true, when copying, the target must be a playable card
	 * @param isChain (optional) default false. If true, this chameleon just copied another chameleon and now searches for another target
	 */
	handleChameleonCard(card: DaleCard | undefined, from: DaleLocation, callback: (card?: DaleCard) => void, requiresPlayable: boolean = false, isChain: boolean = false) {
		callback = callback.bind(this);
		if (!card || !this.checkLock()) {
			callback();
			return;
		}
		if (!isChain && card.isBoundChameleon() && card.effective_type_id != DaleCard.CT_GOODOLDTIMES) {
			card.unbindChameleonLocal();
			from.updateHTML(card);
			callback(card);
			return;
		}
		switch(card.effective_type_id) {
			case DaleCard.CT_FLEXIBLESHOPKEEPER:
				if (this.myStall.getNumberOfStacks() == 0) {
					console.log("No valid targets for CT_FLEXIBLESHOPKEEPER");
					callback(card);
					return;
				}
				this.chameleonArgs = new ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain);
				this.setClientState('chameleon_flexibleShopkeeper', {
					descriptionmyturn: requiresPlayable ? 
						_("Flexible Shopkeeper: ${you} must copy a technique card from your rightmost stack") : 
						_("Flexible Shopkeeper: ${you} must copy a card from your rightmost stack")
				});
				break;
			case DaleCard.CT_REFLECTION:
				let has_valid_target = false;
				for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
					if (+player_id != +this.player_id && pile.size > 0) {
						has_valid_target = true;
						break;
					}
				}
				if (!has_valid_target) {
					console.log("No valid targets for CT_REFLECTION");
					callback(card);
					return;
				}
				this.chameleonArgs = new ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain);
				this.setClientState('chameleon_reflection', {
					descriptionmyturn: requiresPlayable ?
						_("Reflection: ${you} must copy a playable card from the top of another player's discard pile") :
						_("Reflection: ${you} must copy a card from the top of another player's discard pile")
				});
				break;
			case DaleCard.CT_GOODOLDTIMES:
				this.chameleonArgs = new ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain);
				if (card.hasActiveAbility() && from == this.myHand) {
					if (!isChain && !this.myHand.isSelected(card.id)) {
						console.log("Deselected CT_GOODOLDTIMES");
						callback(card);
						return;
					}
					this.setClientState('chameleon_goodoldtimes', {
						descriptionmyturn: _("Good Old Times: ${you} may ditch the supply's top card or copy bin's top card")
					});
				}
				else {
					if (this.marketDiscard.size == 0) {
						console.log("No valid targets for CT_GOODOLDTIMES");
						callback(card);
						return;
					}
					this.setClientState('chameleon_goodoldtimes', {
						descriptionmyturn: requiresPlayable ?
							_("Good Old Times: ${you} must copy the bin's top card") :
							_("Good Old Times: ${you} must copy the bin's top card")
					});
				}
				break;
			case DaleCard.CT_TRENDSETTING:
				if (this.market!.size == 0) {
					console.log("No valid targets for CT_TRENDSETTING");
					callback(card);
					return;
				}
				this.chameleonArgs = new ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain);
				this.setClientState('chameleon_trendsetting', {
					descriptionmyturn: requiresPlayable ? 
						_("Trendsetting: ${you} must copy a playable card in the market") : 
						_("Trendsetting: ${you} must copy a card in the market")
				});
				break;
			case DaleCard.CT_SEEINGDOUBLES:
				const items = this.myHand.getAllItems()
				let has_another_card_in_hand = false;
				for (let item of items) {
					if (item.id != card.id) {
						has_another_card_in_hand = true;
						break;
					}
				}
				if (!has_another_card_in_hand) {
					console.log("No valid targets for CT_SEEINGDOUBLES");
					callback(card);
					return;
				}
				this.chameleonArgs = new ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain);
				this.setClientState('chameleon_seeingdoubles', {
					descriptionmyturn: requiresPlayable ? 
						_("Seeing Doubles: ${you} must copy a playable card from your hand") : 
						_("Trendsetting: ${you} must copy another card in your hand")
				});
				break;
			default:
				//card is not a chameleon card, immediately execute the callback function
				callback(card);
				break;
		}
	}

	/**
	 * Update the state prompt message displayed
	 * Code copied from https://studio.boardgamearena.com/doc/BGA_Studio_Cookbook
	 * @param text new string to display at the main title
	 */
	setMainTitle(text: string) {
		$('pagemaintitletext')!.innerHTML = text;
	}

	/**
	 * Refreshes all html elements that represent cards. Should be called after chameleon bindings are changed.
	 * @param location (optional) - if provided, only update this location
	 * @param card (optional) - if provided, only update this html elements of this card
	 */
	updateHTML(location?: DaleLocation, card?: DaleCard) {
		if (location) {
			location.updateHTML(card);
		}
		else {
			this.market!.updateHTML(card);
			for (let pile of this.allPiles) {
				pile.updateHTML(card);
			}
			for (let stock of this.allDaleStocks) {
				stock.updateHTML(card);
			}
			for (let stall of Object.values(this.playerStalls)) {
				stall.updateHTML(card);
			}
		}
	}

	/**
	 * Move a card from the specified stock to the specified pile
	 * @param card card to move
	 * @param stock stock to move from
	 * @param pile pile to move to
	 * @param delay
	*/
	stockToPile(card: DbCard, stock: DaleStock, pile: Pile, delay: number = 0) {
		const card_id = card.id;
		const item_name = stock.control_name + '_item_' + card_id;
		if ($(item_name)) {
			pile.push(new DaleCard(card_id), item_name, undefined, undefined, delay);
			stock.removeFromStockByIdNoAnimation(+card_id);
		}
		else {
			throw new Error(`Card ${card_id} does not exist in `+stock.control_name);
		}
	}

	/**
	 * Move a card from the overall player board to the specified pile
	 * @param card card to move
	 * @param player_id specific
	 * @param pile pile to move to
	 * @param delay
	*/
	overallPlayerBoardToPile(card: DbCard, player_id: number, pile: Pile, delay: number = 0) {
		pile.push(DaleCard.of(card), 'overall_player_board_'+player_id);
	}

	/**
	 * Move a card from the player-specific stock to the specified pile
	 * @param card card to move
	 * @param stock player-specific stock. this should be a stock that each client has only 1 of (e.g. hand or temporary). 
	 * @param player_id owner of the stock
	 * @param pile pile to move to
	 * @param delay
	*/
	playerStockToPile(card: DbCard, stock: DaleStock, player_id: number, pile: Pile, delay: number = 0) {
		if (+player_id == this.player_id) {
			this.stockToPile(card, stock, pile, delay);
		}
		else {
			this.overallPlayerBoardToPile(card, player_id, pile);
		}
	}

	/**
	 * Remove a card from a player-specific stock (fade out)
	 * @param card card to remove from hand
	 * @param stock player-specific stock. this should be a stock that each client has only 1 of (e.g. hand or temporary). 
	 * @param player_id owner of the hand
	*/
	playerStockRemove(card: DbCard, stock: DaleStock, player_id: number){
		if (+player_id == this.player_id) {
			stock.removeFromStockById(+card.id);
		}
	}

	/**
	 * Move a card from the top of the specified pile to a stock
	 * @param card card to move
	 * @param pile pile to move from
	 * @param stock stock to move to
	 * @param location_arg (optional) the card needs to be retrieved from a specific location of the pile
	*/
	pileToStock(card: DbCard, pile: Pile, stock: DaleStock, location_arg?: number) {
		stock.addDaleCardToStock(DaleCard.of(card), pile.placeholderHTML);
		if (location_arg !== undefined) {
			//remove from index
			if (pile.removeAt(location_arg).id != +card.id) {
				throw new Error(`Card ${+card.id} was not found at index ${location_arg} in the pile of size ${pile.size}`);
			}
		}
		else {
			//remove from top
			if(pile.pop().id != +card.id) {
				throw new Error(`Card ${+card.id} was not found on top of the pile`);
			}
		}
	}

	/**
	 * Move a card from the top of the specified pile to a player-specific stock
	 * @param card card to move
	 * @param pile pile to move from
	 * @param stock player-specific stock. this should be a stock that each client has only 1 of (e.g. hand or temporary). 
	 * @param player_id owner of the stock
	 * @param location_arg (optional) the card needs to be retrieved from a specific location of the pile
	*/
	pileToPlayerStock(card: DbCard, pile: Pile, stock: DaleStock, player_id: number, location_arg?: number) {
		if (+player_id == this.player_id) {
			console.log("TO MY HAND!");
			this.pileToStock(card, pile, stock);
		}
		else {
			pile.pop('overall_player_board_'+player_id);
		}
	}

    /**
	 * If array is not a number array, extract the `id` properties of a list of objects.
     * @param array
     * @return AT_numberlist
     * @example
     * arrayToNumberList([1, 2, 3, 4]) = "1;2;3;4"
	 * @example
     * arrayToNumberList([DbCard(1), DbCard(2), DbCard(3), DbCard(4)]) = "1;2;3;4"
	 * @example
     * arrayToNumberList([DaleCard(1), DaleCard(2), DaleCard(3), DaleCard(4)]) = "1;2;3;4"
	 * @example
     * arrayToNumberList([StockItem(1), StockItem(2), StockItem(3), StockItem(4)]) = "1;2;3;4"
     */
    arrayToNumberList(array: number[] | {id: number}[]): string {
		if (array.length == 0) return "";
		if (typeof array[0] !== "number") {
			array = array.map(item => (item as {id: number}).id)
		}
		return array.join(";");
	}

	/**
	 * Add a cancel button (The state must have an "actCancel" action and "trCancel" transition)
	*/
	addActionButtonCancel() {
		this.addActionButton("cancel-button", _("Cancel"), "onCancel", undefined, false, 'gray');
	}

	/**
	 * Add a cancel button to return from the main client state
	*/
	addActionButtonCancelClient() {
		this.addActionButton("cancel-button", _("Cancel"), "onCancelClient", undefined, false, 'gray');
	}

	/**
	 * Add a button to cancel any locally assigned chameleon targets. Also restores back to the server game state.
	*/
	addActionButtonCancelChameleon() {
		this.addActionButton("cancel-chameleons-button", _("Cancel"), "onCancelChameleon", undefined, false, 'gray');
	}
	
	///////////////////////////////////////////////////
	//// Player's action
	
	/*
		Here, you are defining methods to handle player's action (ex: results of mouse click on game objects).
		
		Most of the time, these methods:
		- check the action is possible at this game state.
		- make a call to the game server
	*/

	onStallCardClick(stall: Stall, card: DaleCard, stack_index: number, index: number) {
        console.log(`Clicked on CardStack[${stack_index}, ${index}]`);

		switch(this.gamedatas.gamestate.name) {
			case 'acorn':
				for (const [player_id, player_stall] of Object.entries(this.playerStalls)) {
					if (stall == player_stall) {
						if(this.checkAction("actAcorn")) {
							this.bgaPerformAction('actAcorn', {
								stall_player_id: +player_id,
								stall_card_id: card.id
							})
						}
						break;
					}
				}
				break;
			case 'chameleon_flexibleShopkeeper':
				this.onConfirmChameleon(card);
				break;
		}
	}

	onMarketCardClick(card: DaleCard, pos: number) {
		pos = this.market!.getValidPos(pos);
		console.log("onMarketCardClick");
		console.log(this.gamedatas.gamestate.name);

		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
				const client_purchase_args = this.mainClientState.args as ClientGameState['client_purchase'];
				console.log("AAAAAAAAAAAAAAAA");
				console.log(client_purchase_args);
				if (client_purchase_args.pos == pos) {
					this.mainClientState.exit();
				}
				else {
					this.mainClientState.enterClientState('client_purchase', {
						pos: pos,
						on_market_board: true
					});
				}
				break;
			case 'client_technique':
			case 'client_build':
			case 'client_inventory':
				console.log(`${this.gamedatas.gamestate.name} --> client_purchase`);
				this.mainClientState.enterClientState('client_purchase', {
					pos: pos,
					on_market_board: true
				});
				break;
			case 'giftVoucher':
				if(this.checkAction("actGiftVoucher")) {
					this.bgaPerformAction('actGiftVoucher', {
						market_card_id: card.id
					})
				}
				break;
			case 'prepaidGood':
				if(this.checkAction("actPrepaidGood")) {
					this.bgaPerformAction('actPrepaidGood', {
						card_id: card.id
					})
				}
				break;
			case 'chameleon_trendsetting':
				this.onConfirmChameleon(card);
				break;
		}
	}
	
	onScheduleSelectionChanged() {
		//should not be possible at the moment
		console.log("You click on a card in the... schedule...?");
	}

	onPileSelectionChanged(pile: Pile, card: DaleCard) {
		console.log("onPileSelectionChanged");
		if (pile === this.myDiscard) {
			this.onMyDiscardPileSelectionChanged(pile, card);
		}
		else if (pile === this.marketDiscard) {
			this.onMarketDiscardPileSelectionChanged(pile, card);
		}
		else if (pile === this.marketDeck) {
			this.onMarketDeckSelectionChanged(pile, card);
		}
		else {
			this.onOtherDiscardPileSelectionChanged(pile, card);
		}
	}

	onMyDiscardPileSelectionChanged(pile: Pile, card: DaleCard) {
		console.log("onMyDiscardPileSelectionChanged");
		switch(this.gamedatas.gamestate.name) {
			case 'client_build':
				//TODO: automatically close the popin?
				//const isUnboundChameleon = card.isUnboundChameleon();
				this.handleChameleonCard(card, pile, this.onBuildSelectionChanged);
				// if (isUnboundChameleon) {
				// 	pile.closePopin();
				// }
				break;
		}
	}

	onMarketDiscardPileSelectionChanged(pile: Pile, card: DaleCard) {
		console.log("onMarketDiscardPileSelectionChanged");
		switch(this.gamedatas.gamestate.name) {
			case 'chameleon_goodoldtimes':
				this.onGoodOldTimesBind();
				break;
		}
	}

	onMarketDeckSelectionChanged(pile: Pile, card: DaleCard) {
		console.log("onMarketDeckSelectionChanged");
		switch(this.gamedatas.gamestate.name) {
			case 'chameleon_goodoldtimes':
				this.onGoodOldTimesPassive();
				break;
		}
	}

	onOtherDiscardPileSelectionChanged(pile: Pile, card: DaleCard) {
		switch(this.gamedatas.gamestate.name) {
			case 'chameleon_reflection':
				this.onConfirmChameleon(card);
				break;
		}
	}

	onHandSelectionChanged(control_name: string, card_id?: number) {
		if (!card_id) return;
		const card = new DaleCard(card_id);
		const isAdded = this.myHand.isSelected(card_id);

		switch(this.gamedatas.gamestate.name) {
			case 'client_technique':
				//play card action (technique or active passive)
				this.handleChameleonCard(card, this.myHand, this.onPlayCard, true);
				this.myHand.unselectAll();
				break;
			case 'client_purchase':
				this.handleChameleonCard(card, this.myHand, this.onFundsSelectionChanged);
				break;
			case 'client_build':
				this.handleChameleonCard(card, this.myHand, this.onBuildSelectionChanged);
				break;
			case 'winterIsComing':
				this.handleChameleonCard(card, this.myHand, this.onBuildSelectionChanged);
				break;
			case 'shatteredRelic':
				if(this.checkAction('actShatteredRelic')) {
					this.bgaPerformAction('actShatteredRelic', {
						card_id: card!.id
					})
				}
				this.myHand.unselectAll();
				break;
			case 'chameleon_flexibleShopkeeper':
			case 'chameleon_reflection':
			case 'chameleon_goodoldtimes':
			case 'chameleon_trendsetting':
			case 'chameleon_seeingdoubles':
				const args = this.chameleonArgs!;
				if (args.card.id == card.id) {
					this.onCancelChameleon();
				}
				else {
					if (this.gamedatas.gamestate.name == 'chameleon_seeingdoubles') {
						this.onConfirmChameleon(card);
					}
					else {
						this.showMessage(_("Please select a valid target for ")+`'${args.card.name}'`, "error");
					}
					if (isAdded) {
						this.myHand.unselectItem(card_id);
					}
					else {
						this.myHand.selectItem(card_id);
					}
				}
				break;
			case null:
				throw new Error("gamestate.name is null")
		}
	}

	onTemporarySelectionChanged() {
		let items = this.myHand.getSelectedItems();
		if (!items[0]) return;
		const card = new DaleCard(items[0].id);
		
		switch(this.gamedatas.gamestate.name) {
			case null:
				throw new Error("gamestate.name is null")
		}
	}

	onFundsSelectionChanged() {
		//TODO: pandas
	}

	onPurchase() {
		if (this.gamedatas.gamestate.name != 'client_purchase') {
			this.showMessage(_("You cannot purchase a card from this gamestate")+` (${this.gamedatas.gamestate})`, 'error');
		}
		const args = (this.mainClientState.args as ClientGameState['client_purchase'])
		var card_id;
		if (args.on_market_board) {
			card_id = this.market!.getCardId(args.pos);
			console.log(card_id);
		}
		else {
			const card = this.marketDiscard.peek();
			if (!card) {
				throw new Error("Cannot purchase from the bin, as it is empty")
			}
			card_id = card.id;
			throw new Error("NOT IMPLEMENTED: CT_MARKETDISCOVERY")
		}
		if(this.checkAction('actPurchase')) {
			this.bgaPerformAction('actPurchase', {
				funds_card_ids: this.arrayToNumberList(this.myHand.orderedSelection.get()),
				market_card_id: card_id,
				...DaleCard.getLocalChameleons()
			})
		}
	}

	onPlayCard(card?: DaleCard) {
		if (!card) {
			console.warn("Attempted to play 'undefined' card");
		}
		else if (!card.isPlayable()) {
			this.showMessage(_("This card cannot be played"), 'error');
		}
		else if (card.isTechnique()) {
			if(this.checkAction('actPlayTechniqueCard')) {
				this.bgaPerformAction('actPlayTechniqueCard', {
					card_id: card.id, 
					...DaleCard.getLocalChameleons()
				});
			}
		}
		else if (card.hasActiveAbility()) {
			this.onUseActiveAbility(card);
		}
		else {
			this.showMessage(_("This card's ability was already used"), 'error');
		}
		this.myHand.unselectAll();
	}

	/**
	 * Use the active ability of a card, then return to the current game state
	 * @param card the card that wants to use its active ability
	 */
	onUseActiveAbility(card: DaleCard){
		if (!card.hasActiveAbility()) {
			throw new Error(`Card '${card.name}' has no active ability remaining`)
		}
		this.bgaPerformAction('actUseActiveAbility', {
			card_id: card.id, 
			...DaleCard.getLocalChameleons()
		});
	}

	onBuildSelectionChanged(card?: DaleCard){
		console.log("onBuildSelectionChanged");
		const items = this.myHand.getSelectedItems();
		let count_nostalgic_items = 0;
		for (let item of items) {
			const card = new DaleCard(item.id);
			if (card.effective_type_id == DaleCard.CT_NOSTALGICITEM) {
				count_nostalgic_items++;
			}
		}
		if (count_nostalgic_items > 0) {
			//you need at least 1 nostalgic item in hand to start counting nostalgic items from discard
			for (let card_id of this.myDiscard.orderedSelectedCardIds) {
				const card = new DaleCard(card_id);
				if (card.effective_type_id == DaleCard.CT_NOSTALGICITEM) {
					count_nostalgic_items++;
				}
			}
		}
		console.log("count_nostalgic_items = "+count_nostalgic_items);
		this.myDiscard.setSelectionMode('multiple', count_nostalgic_items);
	}

	onBuild() {
		const autoSortedCards = this.myHand.getSelectedItems();
		if(this.checkAction('actBuild')) {
			this.bgaPerformAction('actBuild', {
				stack_card_ids: this.arrayToNumberList(autoSortedCards),
				stack_card_ids_from_discard: this.arrayToNumberList(this.myDiscard.orderedSelectedCardIds),
				...DaleCard.getLocalChameleons()
			});
		}
	}
	
	onWinterIsComingSkip() {
		if(this.checkAction('actWinterIsComingSkip')) {
			this.bgaPerformAction('actWinterIsComingSkip', {})
		}
	}

	onCancel() {
		if (DaleCard.unbindAllChameleonsLocal()) {
			//undo chameleon client state
			this.restoreServerGameState();
			this.chameleonArgs = undefined;
			this.updateHTML();
		}
		else {
			//undo server state
			if(this.checkAction('actCancel')) {
				this.bgaPerformAction('actCancel', {})
			}
		}
	}

	onCancelClient() {
		console.log("onCancelClient");
		if (DaleCard.unbindAllChameleonsLocal()) {
			//exit chameleon state
			this.chameleonArgs = undefined;
			for (let stock of this.allDaleStocks) {
				stock.unselectAll();
			}
			this.updateHTML();
		}
		else {
			//exit main client state
			this.mainClientState.exit();
		}
		this.updateHTML();
	}
	
	/**
	 * To be called from within a chameleon client state. Cancels finding a target for the chameleon bind
	 * @param unselect (optional) default true. If true, automatically deselect the chameleon card
	 */
	onCancelChameleon(unselect: boolean = true) {
		console.log("onCancelChameleon");
		console.log(this.chameleonArgs!);
		//return from the chameleon client state
		const args = this.chameleonArgs!
		if (unselect) {
			args.location.unselectItem(args.card.id);
		}
		args.card.unbindChameleonLocal();
		this.restoreServerGameState();
		this.chameleonArgs = undefined;
		this.updateHTML();
	}

	/**
	 * To be called from within a chameleon client state. Confirms the user selection for the chameleon card and restores the server state.
	 * @param target target card to bind to
	 * @returns 
	 */
	onConfirmChameleon(target: DaleCard) {
		console.log("onConfirmChameleon");
		//return from the chameleon client state, but keep the local bindings
		const args = this.chameleonArgs!;
		const type_id = target.effective_type_id;
		const isDifferentUnboundChameleon = target.isUnboundChameleon() && type_id != args.card.effective_type_id;
		if (args.requiresPlayable && !DaleCard.isPlayable(type_id) && !isDifferentUnboundChameleon) {
			this.showMessage(_("Copy failed: this card cannot be played"), 'error');
			this.onCancelChameleon();
		}
		else {
			this.restoreServerGameState();
			if (isDifferentUnboundChameleon) {
				//chameleon chaining! the new target is also a chameleon.
				console.log("isDifferentUnboundChameleon");
				console.log("type_id = "+args.card.effective_type_id);
				console.log("target_type_id = "+type_id);
				args.card.bindChameleonLocal(type_id);
				console.log("type_id = "+args.card.effective_type_id);
				console.log(args.card);
				this.chameleonArgs = undefined;
				this.handleChameleonCard(args.card, args.location, args.callback, args.requiresPlayable, true);
			}
			else {
				//chameleon will be bound to the target
				args.card.bindChameleonLocal(type_id);
				args.callback(args.card);
				this.chameleonArgs = undefined;
			}
			this.updateHTML(args.location, args.card);
		}
	}

	onGoodOldTimesPassive() {
		this.onUseActiveAbility(this.chameleonArgs!.card);
		this.onCancelChameleon();
	}

	onGoodOldTimesBind() {
		console.log("onGoodOldTimesBind");
		const topCard = this.marketDiscard.peek();
		console.log(topCard);
		if (!topCard) {
			if (this.chameleonArgs!.requiresPlayable) {
				this.showMessage(_("Good Old Times has no valid target"), 'error');
			}
			this.onCancelChameleon(false);
			return;
		}
		this.onConfirmChameleon(topCard);
	}

	onRequestBuildAction() {
		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
			case 'client_technique':
			case 'client_build':
			case 'client_inventory':
				this.mainClientState.enterClientState('client_build');
				break;
		}
	}

	onRequestInventoryAction() {
		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
			case 'client_technique':
			case 'client_build':
			case 'client_inventory':
				this.mainClientState.enterClientState('client_inventory');
				break;
		}
	}

	onInventoryAction() {
		if(this.checkAction("actInventoryAction")) {
			this.bgaPerformAction('actInventoryAction', {
				ids: this.arrayToNumberList(this.myHand.orderedSelection.get())
			})
		}
	}

	onSwiftBroker() {
		if(this.checkAction("actSwiftBroker")) {
			this.bgaPerformAction('actSwiftBroker', {
				card_ids: this.arrayToNumberList(this.myHand.orderedSelection.get())
			})
		}
	}

	onSpyglass() {
		const card_ids = this.myTemporary.orderedSelection.get();
		console.log("Sending "+this.arrayToNumberList(card_ids));
		if (card_ids.length == 0) {
			this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
			return;
		}
		if(this.checkAction("actSpyglass")) {
			this.bgaPerformAction('actSpyglass', {
				card_ids: this.arrayToNumberList(card_ids)
			})
		}
	}

	onLoyalPartner() {
		if(this.checkAction("actLoyalPartner")) {
			this.bgaPerformAction('actLoyalPartner', {
				card_ids: this.arrayToNumberList(this.market!.orderedSelection.get())
			})
		}
	}

	///////////////////////////////////////////////////
	//// Reaction to cometD notifications

	/** @gameSpecific See {@link Gamegui.setupNotifications} for more information. */
	override setupNotifications()
	{
		console.log( 'notifications subscriptions setup42' );
		
		const notifs: [keyof NotifTypes, number][] = [
			['scheduleTechnique', 1000],
			['resolveTechnique', 1000],
			['cancelTechnique', 1000],
			['buildStack', 1500],
			['fillEmptyMarketSlots', 1],
			['marketSlideRight', 1000],
			['marketToHand', 1500],
			['swapScheduleStall', 1],
			['swapScheduleMarket', 1],
			['discardToHand', 1000],
			['discardToHandMultiple', 1000],
			['draw', 1000],
			['drawMultiple', 1000],
			['temporaryToHand', 1000],
			['obtainNewJunkInHand', 1000],
			['ditch', 1000],
			['ditchMultiple', 1000],
			['discard', 1000],
			['discardMultiple', 1000],
			['placeOnDeckMultiple', 1000],
			['reshuffleDeck', 1500],
			['ditchFromMarketDeck', 1000],
			['ditchFromMarketBoard', 1000],
			['addEffect', 1],
			['bindChameleon', 1],
			['unbindChameleon', 1],
			['message', 1],
			['debugClient', 1],
		];

		notifs.forEach((notif) => {
			dojo.subscribe(notif[0], this, `notif_${notif[0]}`);
			this.notifqueue.setSynchronous(notif[0], notif[1]);
		});
		
		console.log( 'notifications subscriptions setup done' );

		// With base Gamegui class...
		// dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );

		// With GameguiCookbook::Common class...
		// this.subscribeNotif( 'cardPlayed', this.notif_cardPlayed ); // Adds type safety to the subscription
	}

	/*
	Example:
	
	// The argument here should be one of there things:
	// - `Notif`: A notification with all possible arguments defined by the NotifTypes interface. See {@link Notif}.
	// - `NotifFrom<'cardPlayed'>`: A notification matching any other notification with the same arguments as 'cardPlayed' (A type can be used here instead). See {@link NotifFrom}.
	// - `NotifAs<'cardPlayed'>`: A notification that is explicitly a 'cardPlayed' Notif. See {@link NotifAs}.
	notif_cardPlayed( notif: NotifFrom<'cardPlayed'> )
	{
		console.log( 'notif_cardPlayed', notif );
		// Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
	}
	*/

	notif_scheduleTechnique(notif: NotifAs<'scheduleTechnique'>) {
		//hand to schedule
		if (notif.args.player_id == this.player_id) {
			//animate from my hand
			const card_id = +notif.args.card.id;
			if ($(this.myHand.control_name+'_item_' + card_id)) {
				this.mySchedule.addDaleCardToStock(DaleCard.of(notif.args.card), this.myHand.control_name+'_item_' + card_id)
				this.myHand.removeFromStockByIdNoAnimation(+card_id);
			}
			else {
				throw new Error(`Card ${card_id} does not exist in my hand`);
			}
		}
		else {
			//animate from player board
			const schedule = this.playerSchedules[notif.args.player_id]!;
			schedule.addDaleCardToStock(DaleCard.of(notif.args.card), 'overall_player_board_'+notif.args.player_id)
		}
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(-1);
	}

	notif_cancelTechnique(notif: NotifAs<'cancelTechnique'>) {
		//schedule to hand
		if (notif.args.player_id == this.player_id) {
			//animate from my hand
			const card_id = +notif.args.card.id;
			if ($(this.mySchedule.control_name+'_item_' + card_id)) {
				this.myHand.addDaleCardToStock(DaleCard.of(notif.args.card), this.mySchedule.control_name+'_item_' + card_id)
				this.mySchedule.removeFromStockByIdNoAnimation(+card_id);
			}
			else {
				throw new Error(`Unable to cancel a techqniue. Techqniue card ${card_id} does not exist in the schedule.`);
			}
		}
		else {
			//animate from player board
			const schedule = this.playerSchedules[notif.args.player_id]!;
			schedule.removeFromStockById(+notif.args.card.id, 'overall_player_board_'+notif.args.player_id);
		}
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(1);
	}

	notif_resolveTechnique(notif: NotifAs<'resolveTechnique'>) {
		//schedule to discard
		console.log(this.playerSchedules);
		const schedule = this.playerSchedules[notif.args.player_id]!;
		const card = DaleCard.of(notif.args.card);
		const from = schedule.control_name+'_item_'+card.id;
		this.playerDiscards[notif.args.player_id]!.push(card, from, null, schedule.duration);
		schedule.removeFromStockByIdNoAnimation(card.id);
	}

	notif_buildStack(notif: NotifAs<'buildStack'>) {
		console.log("notif_buildStack");
		const stall = this.playerStalls[notif.args.player_id]!;
		for (let i in notif.args.cards) {
			const dbcard = notif.args.cards[i]!
			const card = DaleCard.of(dbcard);
			switch(notif.args.from){
				case 'hand':
					if (notif.args.player_id == this.player_id) {
						if ($(this.myHand.control_name+'_item_' + card.id)) {
							stall.insertCard(card, notif.args.stack_index, undefined, this.myHand.control_name+'_item_' + card.id)
							this.myHand.removeFromStockByIdNoAnimation(+card.id);
						}
						else {
							throw new Error(`Cannot build a stack. Card ${card.id} does not exist in hand.`);
						}
					}
					else {
						stall.insertCard(card, notif.args.stack_index, undefined, 'overall_player_board_'+notif.args.player_id)
					}
					break;
				case 'disc':
					//WARNING: dbcard.location_arg does not correspond to absolute indices in a pile.
					//[1, 3, 5, 6, 8] is a valid sequence of location_args, but location arg 5 is at pile index 2.
					const discard = this.playerDiscards[notif.args.player_id]!;
					const index = +dbcard.location_arg - 1; //-1 because location_args are 1-indexed and piles are 0-indexed
					stall.insertCard(card, notif.args.stack_index, undefined, discard.placeholderHTML)
					console.log("index = "+index);
					discard.removeAt(index); 
					break;
			}

		}
		this.scoreCtrl[notif.args.player_id]?.toValue(notif.args.stack_index_plus_1);
		//update the hand sizes
		if (notif.args.from == 'hand') {
			const nbr = Object.keys(notif.args.cards).length;
			this.playerHandSizes[notif.args.player_id]!.incValue(-nbr);
		}
	}

	notif_fillEmptyMarketSlots(notif: NotifAs<'fillEmptyMarketSlots'>) {
		console.log("notif_fillEmptyMarketSlots");
		console.log(notif.args);
		const cards = notif.args.cards;
		const positions = notif.args.positions;
		if (cards.length != positions.length) {
			throw new Error("notif_fillEmptyMarketSlots got invalid arguments")
		}
		for (let i = 0; i < cards.length; i++) {
			this.market!.insertCard(DaleCard.of(cards[i]!), positions[i]!, this.marketDeck.placeholderHTML);
			this.marketDeck.pop();
		}
	}

	notif_marketSlideRight(notif: NotifAs<'marketSlideRight'>) {
		this.market!.slideRight();
	}

	notif_marketToHand(notif: NotifAs<'marketToHand'>) {
		const daleCard = new DaleCard(notif.args.market_card_id);
		const slotId = this.market!.getSlotId(notif.args.pos);
		this.market!.unselectAll();
		if (notif.args.player_id == this.player_id) {
			//move card from market to hand
			this.market!.removeCard(notif.args.pos);
			this.myHand.addDaleCardToStock(daleCard, slotId)
		}
		else {
			//move card to the overall player board
			this.market!.removeCard(notif.args.pos, 'overall_player_board_'+notif.args.player_id);
		}
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(1);
	}

	notif_swapScheduleStall(notif: NotifAs<'swapScheduleStall'>) {
		const schedule = this.playerSchedules[notif.args.schedule_player_id]!
		const stall = this.playerStalls[notif.args.stall_player_id]!;
		stall.swapWithStock(notif.args.stall_card_id, schedule, notif.args.schedule_card_id);
	}

	notif_swapScheduleMarket(notif: NotifAs<'swapScheduleMarket'>) {
		const schedule = this.playerSchedules[notif.args.schedule_player_id]!
		this.market!.swapWithStock(notif.args.market_card_id, schedule, notif.args.schedule_card_id);
	}

	notif_temporaryToHand(notif: NotifAs<'temporaryToHand'>) {
		console.log("notif_temporaryToHand");
		if (notif.args._private) {
			const card_id = +notif.args._private.card.id;
			if ($(this.myTemporary.control_name+'_item_' + card_id)) {
				console.log(notif.args);
				this.myHand.addDaleCardToStock(DaleCard.of(notif.args._private.card), this.myTemporary.control_name+'_item_' + card_id)
				this.myTemporary.removeFromStockByIdNoAnimation(+card_id);
			}
			else {
				throw new Error(`Card ${card_id} does not exist in myTemporary.`);
			}
		}
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(1);
	}
	
	notif_obtainNewJunkInHand(notif: NotifAs<'obtainNewJunkInHand'>) {
		if (notif.args.player_id == this.player_id) {
			//junk to hand
			for (let i in notif.args.cards) {
				let card = notif.args.cards[i]!;
				this.myHand.addDaleCardToStock(DaleCard.of(card), 'overall_player_board_'+notif.args.player_id);
			}
		}
		//update the hand sizes
		const nbr = Object.keys(notif.args.cards).length;
		this.playerHandSizes[notif.args.player_id]!.incValue(nbr);
	}

	notif_ditch(notif: NotifAs<'ditch'>) {
		const stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
		if (DaleCard.of(notif.args.card).isJunk()) {
			this.playerStockRemove(notif.args.card, stock, notif.args.player_id);
		}
		else {
			this.playerStockToPile(notif.args.card, stock, notif.args.player_id, this.marketDiscard);
		}
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(-1);
		}
	}

	notif_ditchMultiple(notif: NotifAs<'ditchMultiple'>) {
		let delay = 0;
		const stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
		for (let id of notif.args.card_ids) {
			const card = notif.args.cards[id]!;
			if (DaleCard.of(card).isJunk()) {
				this.playerStockRemove(card, stock, notif.args.player_id);
			}
			else {
				this.playerStockToPile(card, stock, notif.args.player_id, this.marketDiscard, delay);
			}
			delay += 75; //delay indicates that ordering matters
		}
		//update the hand sizes
		if (stock === this.myHand) {
			const nbr = Object.keys(notif.args.cards).length;
			this.playerHandSizes[notif.args.player_id]!.incValue(-nbr);
		}
	}

	notif_discard(notif: NotifAs<'discard'>) {
		const discard_id = notif.args.discard_id ?? notif.args.player_id;
		const discardPile = this.playerDiscards[discard_id]!;
		const stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
		this.playerStockToPile(notif.args.card, stock, notif.args.player_id, discardPile);
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(-1);
	}

	notif_discardMultiple(notif: NotifAs<'discardMultiple'>) {
		const discard_id = notif.args.discard_id ?? notif.args.player_id;
		const discardPile = this.playerDiscards[discard_id]!;
		const stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
		let delay = 0;
		for (let id of notif.args.card_ids) {
			let card = notif.args.cards[id]!;
			this.playerStockToPile(card, stock, notif.args.player_id, discardPile, delay);
			delay += 75; //delay indicates that ordering matters
		}
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(-notif.args.nbr);
	}

	notif_placeOnDeckMultiple(notif: NotifAs<'placeOnDeckMultiple'>) {
		console.log("placeOnDeckMultiple");
		const stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
		if (notif.args._private) {
			//you GIVE the cards
			for (let id of notif.args._private.card_ids) {
				const card = notif.args._private.cards[id]!;
				const deck = this.playerDecks[notif.args.deck_player_id]!;
				this.stockToPile(card, stock, deck);
			}
		}
		else {
			//increase deck size
			this.playerDecks[notif.args.player_id]!.pushHiddenCards(notif.args.nbr);
		}
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(-notif.args.nbr);
		}
	} 

	notif_discardToHand(notif: NotifAs<'discardToHand'>) {
		console.log("notif_discardToHand");
		const stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
		const discardPile = this.playerDiscards[notif.args.discard_id ?? this.player_id]!;
		this.pileToPlayerStock(notif.args.card, discardPile, stock, notif.args.player_id);
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(1);
	}
	
	notif_discardToHandMultiple(notif: NotifAs<'discardToHandMultiple'>) {
		console.log("notif_discardToHandMultiple");
		const stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
		const discardPile = this.playerDiscards[notif.args.discard_id ?? this.player_id]!;
		for (let i in notif.args.cards) {
			const card = notif.args.cards[i]!;
			this.pileToPlayerStock(card, discardPile, stock, notif.args.player_id, +card.location_arg);
		}
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(notif.args.nbr);
	}

	notif_draw(notif: NotifAs<'draw'>) {
		console.log("notif_draw");
		const stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
		const deck = notif.args.deck_player_id ? this.playerDecks[notif.args.deck_player_id] ?? this.marketDeck : this.myDeck;
		if (notif.args._private) {
			//you drew the cards
			let card = notif.args._private.card
			stock.addDaleCardToStock(DaleCard.of(card), deck.placeholderHTML);
			deck.pop();
		}
		else {
			//another player drew cards
			this.playerDecks[notif.args.player_id]!.pop('overall_player_board_'+notif.args.player_id);
		}
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(1);
		}
	}
	
	notif_drawMultiple(notif: NotifAs<'drawMultiple'>) {
		console.log("notif_drawMultiple");
		console.log(notif.args);
		const stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
		const deck = notif.args.deck_player_id ? this.playerDecks[notif.args.deck_player_id] ?? this.marketDeck : this.myDeck;
		console.log(deck.size);
		if (notif.args._private) {
			//you drew the cards
			for (let i in notif.args._private?.cards) {
				let card = notif.args._private.cards[i]!;
				stock.addDaleCardToStock(DaleCard.of(card), deck.placeholderHTML);
				deck.pop();
			}
		}
		else {
			//another player drew cards
			for (let i = 0; i < notif.args.nbr; i++) {
				this.playerDecks[notif.args.player_id]!.pop('overall_player_board_'+notif.args.player_id);
			}
		}
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(notif.args.nbr);
		}
	}

	notif_reshuffleDeck(notif: NotifAs<'reshuffleDeck'>) {
		console.log(`reshuffleDeck [market=${notif.args.market}, player_id=${notif.args.player_id}]`);
		if (notif.args.market) {
			this.marketDiscard.shuffleToDrawPile(this.marketDeck!);
		}
		else {
			this.playerDiscards[notif.args.player_id]!.shuffleToDrawPile(this.playerDecks[notif.args.player_id]!);
		}
	}

	notif_ditchFromMarketDeck(notif: NotifAs<'ditchFromMarketDeck'>) {
		this.marketDeck.pop!();
		this.marketDiscard.push(DaleCard.of(notif.args.card), this.marketDeck.placeholderHTML);
	}

	notif_ditchFromMarketBoard(notif: NotifAs<'ditchFromMarketBoard'>) {
		let delay = 0;
		for (let id of notif.args.card_ids) {
			const pos = this.market!.posOf(id);
			const slot_id = this.market!.getSlotId(pos);
			this.marketDiscard.push(new DaleCard(id), slot_id, undefined, undefined, delay);
			this.market!.removeCard(pos);
			delay += 75; //delay indicates that ordering matters
		}
	}

	notif_addEffect(notif: NotifAs<'addEffect'>) {
		console.log("notif_addEffect");
		console.log(notif.args.effect);
		DaleCard.addEffect(notif.args.effect);
	}

	notif_bindChameleon(notif: NotifAs<'bindChameleon'>) {
		DaleCard.bindChameleonFromServer(+notif.args.card_id, +notif.args.type_id);
		DaleCard.unbindAllChameleonsLocal();
		this.updateHTML();
	}

	notif_unbindChameleon(notif: NotifAs<'unbindChameleon'>) {
		DaleCard.unbindChameleonFromServer(+notif.args.card_id);
		this.updateHTML();
	}

	notif_message(notif: NotifAs<'message'>) {
		return;
	}

	notif_debugClient(notif: NotifAs<'debugClient'>) {
		//this notification only exists for debugging purposes
		let arg = notif.args.arg;
		console.log(`Debug with argument ${arg}`)
		if (arg == 'log') {
			console.log("RECEIVED A DEBUG NOTIFICATION !");
		}
		else if (arg == 'shuffleToDiscard') {
			this.marketDeck.shuffleToDrawPile(this.marketDiscard!)
		}
		else if (arg == 'shuffleToDraw') {
			this.marketDiscard.shuffleToDrawPile(this.marketDeck!)
		}
		else if (arg == 'slideRight') {
			this.market!.slideRight();
		}
		else if (arg == 'addCard') {
			this.myHand.addDaleCardToStock(new DaleCard(0, 0));
		}
		else if (arg == 'clientConsoleLog') {
			console.log(notif.args.msg);
		}
		else if (arg == 'increaseDeckSize') {
			this.playerDecks[notif.args.player_id]!.pushHiddenCards(notif.args.nbr);
		}
		else if (arg == 'bindings') {
			const bindings = DaleCard.getLocalChameleons()
			console.log("(Chameleon) cards_ids");
			console.log(bindings.chameleon_card_ids);
			console.log("Target type_ids");
			console.log(bindings.chameleon_type_ids);
		}
		else if (arg == '') {
			
		}
		else if (arg == '') {
			
		}
		else {
			throw new Error(`Unknown argument ${notif.args.arg}`)
		}	
	}
}


// The global 'bgagame.dale' class is instantiated when the page is loaded. The following code sets this variable to your game class.
dojo.setObject( "bgagame.dale", Dale );
// Same as: (window.bgagame ??= {}).dale = Dale;