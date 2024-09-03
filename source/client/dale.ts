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
import { ChameleonArgs } from './components/types/ChameleonArgs';
import { CardSlot } from './components/CardSlot';
import { DaleLocation } from './components/types/DaleLocation';
import { MainClientState } from './components/types/MainClientState'
import { Images } from './components/Images';
import { TargetingLine } from './components/TargetingLine'
import { ChameleonChain } from './components/types/ChameleonChain';
import { ChameleonTree } from './components/types/ChameleonTree';
import { DbEffect } from './components/types/DbEffect';
import { DaleDeckSelection } from './components/DaleDeckSelection'
import { DaleDie } from './components/DaleDie';
import { DaleIcons } from './components/DaleIcons';

/** The root for all of your game code. */
class Dale extends Gamegui
{
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

	/** A hidden draw pile for each player AND the market */
	allDecks: Record<number | 'mark', Pile> = {'mark': this.marketDeck};

	/** The Counter component for my handsize */
	get myHandSize(): Counter {
		return this.playerHandSizes[this.player_id]!;
	}

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

	/** Cards in this client's limbo card stock */
	myLimbo: DaleStock = new DaleStock();

	/** Arguments for chameleon client states. This card needs to be highlighted while selecting a valid target for it. */
	chameleonArgs: ChameleonArgs | undefined;

	/** the main targetingLine used as the current selection mode. */
	targetingLine: TargetingLine | undefined;

	/** Current client state */
	mainClientState: MainClientState = new MainClientState(this);

	/** Class responsible for managing the deck selection page */
	deckSelection: DaleDeckSelection | undefined;

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

		//positioning the svg container
		const svgContainer = $("dale-svg-container") as HTMLElement;
		$("overall-content")?.appendChild(svgContainer);
		addEventListener("mousemove", function(this: Window, evt: MouseEvent) { TargetingLine.previousMouseEvent = evt; });

		//initialize the deck selection
		this.deckSelection = new DaleDeckSelection(
			this,
			$("dale-page-deck-selection") as HTMLElement,
			$("dale-page-game") as HTMLElement,
			gamedatas.inDeckSelection
		);

		//initialize the card types
		DaleCard.init(this, gamedatas.cardTypes);

		//set the unique opponent id
		if (gamedatas.playerorder.length == 2) {
			for (let player_id of gamedatas.playerorder) {
				if (player_id != this.player_id) {
					this.unique_opponent_id = player_id;
				} 
			}
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

			//maximum stack size
			player_board_div.querySelector(".player_score_value")?.insertAdjacentText('afterend', "/8")

			//deck per player
			this.playerDecks[player_id] = new HiddenPile(this, 'deck-'+player_id, 'Deck', +player_id);
			this.playerDecks[player_id].pushHiddenCards(gamedatas.deckSizes[player_id]!);
			this.allDecks[player_id] = this.playerDecks[player_id];

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
		this.myHand.init(this, $('dale-myhand')!, $('dale-myhand-wrap')!, _("Your hand"));
		this.myHand.centerItems = true;
		for (let i in gamedatas.hand) {
			let card = gamedatas.hand[i]!;
			this.myHand.addDaleCardToStock(DaleCard.of(card));
		}
		this.myHand.setSelectionMode('none');
		dojo.connect(this.myHand, 'onClick', this, 'onSelectHandCard');
		dojo.connect(this.myHand.orderedSelection, 'onSelect', this, 'onSelectHandCard');
		dojo.connect(this.myHand.orderedSelection, 'onUnselect', this, 'onUnselectHandCard');

		//limbo transition
		const thiz = this;
		const limboTransitionUpdateDisplay = () => {
			console.log("limboTransitionUpdateDisplay");
			setTimeout(function() {thiz.myLimbo.updateDisplay()}, 1)
			setTimeout(function() {thiz.myHand.updateDisplay()}, 1)
		}
		const onLimboItemCreate = () => {
			const classList = thiz.myLimbo.wrap!.classList;
			if (classList.contains("dale-hidden")) {
				classList.remove("dale-hidden");
				limboTransitionUpdateDisplay();
			}
		}
		const onLimboItemDelete = () => {
			const classList = thiz.myLimbo.wrap!.classList;
			if (thiz.myLimbo.count() <= 1) {
				if (!classList.contains("dale-hidden")) {
					classList.add("dale-hidden");
					limboTransitionUpdateDisplay();
				}
			}
		}

		//initialize limbo
		this.myLimbo.init(this, $('dale-mylimbo')!, $('dale-mylimbo-wrap')!, _("Limbo"), onLimboItemCreate, onLimboItemDelete);
		this.myLimbo.wrap!.classList.add("dale-hidden");
		this.myLimbo.centerItems = true;
		for (let i in gamedatas.limbo) {
			const card = gamedatas.limbo[i]!;
			this.myLimbo.addDaleCardToStock(DaleCard.of(card));
		}
		this.myLimbo.setSelectionMode('none');
		dojo.setStyle(this.myLimbo.wrap!, 'min-width', 3*Images.CARD_WIDTH_S+'px'); //overrides the #dale-mylimbo-wrap style
		dojo.connect( this.myLimbo, 'onClick', this, 'onSelectLimboCard' );
		dojo.connect( this.myLimbo.orderedSelection, 'onSelect', this, 'onSelectLimboCard' );

		//initialize the schedules
		for (let player_id in gamedatas.schedules) {
			const container = $('schedule-'+player_id)!
			const wrap = $('schedule-wrap-'+player_id)!
			dojo.setStyle(wrap, 'width', `${1.5*Images.CARD_WIDTH_S}px`);
			this.playerSchedules[player_id] = new DaleStock();
			this.playerSchedules[player_id].init(this, container);
			this.playerSchedules[player_id].setSelectionMode('none');
			this.playerSchedules[player_id].centerItems = true;
			for (let card_id in gamedatas.schedules[player_id]) {
				const card = gamedatas.schedules[+player_id]![+card_id]!;
				this.playerSchedules[player_id]!.addDaleCardToStock(DaleCard.of(card));
			}
		}

		//display any effects on the client-side
		console.log("DbEffects:");
		for (let i in gamedatas.effects) {
			const effect = gamedatas.effects[i]!;
			DaleCard.addEffect(new DbEffect(effect));
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

		// if (stateName == 'cleanUpPhase') {
		// 	console.log("cleanUpPhase, expire all effects that last until end of turn");
		// 	this.mainClientState.cancelAll();
		// }

		if (stateName.substring(0, 6) != 'client' && stateName.substring(0, 9) != 'chameleon') {
			console.log("Revalidate all local chameleons");
			this.validateChameleonsLocal();
		}

		if (!this.isCurrentPlayerActive()) {
			if (stateName == 'playerTurn') {
				DaleCard.unbindAllChameleonsLocal();
				this.mainClientState.leaveAll();
			}
			return;
		}

		//turn on selection mode(s)
		switch( stateName ){
			case 'postCleanUpPhase':
				this.myHand.setSelectionMode('clickAbility', 'pileBlue', 'dale-wrap-technique', _("Click cards to use <strong>passive abilities</strong>"));
				break;
			case 'playerTurn':
				this.mainClientState.enter();
				break;
			case 'client_purchase':
				const client_purchase_args = (this.mainClientState.args as ClientGameStates['client_purchase'])
				this.myHand.setSelectionMode('multiple', 'pileYellow', 'dale-wrap-purchase', _("Click cards to use for <strong>purchasing</strong>"));
				this.market!.setSelectionMode(1, undefined, "dale-wrap-purchase");
				if (client_purchase_args.market_discovery_card_id === undefined) {
					this.market!.setSelected(client_purchase_args.pos, true);
				}
				else {
					if (this.myHand.orderedSelection.getSize() == 0) {
						this.myHand.selectItem(client_purchase_args.market_discovery_card_id);
					}
					this.marketDiscard.selectTopCard();
					this.marketDiscard.setSelectionMode("top");
				}
				this.myStall.setLeftPlaceholderClickable(true);
				break;
			case 'client_technique':
				this.myHand.setSelectionMode('clickTechnique', 'pileBlue', 'dale-wrap-technique', _("Click cards to play <strong>techniques</strong>"));
				this.market!.setSelectionMode(1, undefined, "dale-wrap-purchase");
				this.myStall.setLeftPlaceholderClickable(true);
				break;
			case 'client_build':
				this.myHand.setSelectionMode('multiple', 'build', 'dale-wrap-build', _("Click cards to <strong>build stacks</strong>"));
				this.market!.setSelectionMode(1, undefined, "dale-wrap-purchase");
				this.myStall.selectLeftPlaceholder();
				this.onBuildSelectionChanged(); //check for nostalgic item
				break;
			case 'client_inventory':
				this.myHand.setSelectionMode('multiple', 'pileRed', 'dale-wrap-discard', _("Click cards to <strong>discard</strong>"));
				this.market!.setSelectionMode(1, undefined, "dale-wrap-purchase");
				this.myStall.setLeftPlaceholderClickable(true);
				break;
			case 'client_essentialPurchase':
				const client_essentialPurchase_args = (this.mainClientState.args as ClientGameStates['client_essentialPurchase']);
				if (client_essentialPurchase_args.market_discovery_card_id) {
					throw new Error("NOT IMPLEMENTED: interaction market discovery + essential purchase")
				}
				else {
					this.market!.setSelected(client_essentialPurchase_args.pos, true);
				}
				this.myHand.setSelectionMode('essentialPurchase', 'ditch', 'dale-wrap-purchase', _("Choose up to 3 junk cards to <strong>ditch</strong>"), 'pileYellow');
				let junk_selected = 0;
				for (let card_id of client_essentialPurchase_args.funds_card_ids.slice().reverse()) {
					this.myHand.selectItem(card_id, true);
					if (junk_selected < 3 && new DaleCard(card_id).isJunk()) {
						this.myHand.selectItem(card_id);
						junk_selected++;
					}
				}
				break;
			case 'winterIsComing':
				this.myHand.setSelectionMode('multiple', 'build', 'dale-wrap-build', _("Click cards to <strong>build additional stacks</strong>"));
				this.myStall.selectLeftPlaceholder();
				this.onBuildSelectionChanged(); //check for nostalgic item
				break;
			case 'client_swiftBroker':
				this.myHand.setSelectionMode('multiple', 'pileBlue', 'dale-wrap-technique', _("Choose the order to discard your hand"));
				break;
			case 'client_shatteredRelic':
				this.myHand.setSelectionMode('click', undefined, 'dale-wrap-technique', _("Choose a card to <strong>ditch</strong>"));
				break;
			case 'spyglass':
				this.myLimbo.setSelectionMode('multiple', 'spyglass', 'dale-wrap-technique', _("Choose a card to take"));
				break;
			case 'client_acorn':
				let client_acorn_targets: DaleCard[] = [];
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id) {
						client_acorn_targets = client_acorn_targets.concat(this.playerStalls[player_id]!.getCardsInStall());
					}
				}
				const client_acorn_args = (this.mainClientState.args as ClientGameStates['client_acorn']);
				this.targetingLine = new TargetingLine(
					new DaleCard(client_acorn_args.technique_card_id),
					client_acorn_targets,
					"dale-line-source-technique",
					"dale-line-target-technique",
					"dale-line-technique",
					(source_id: number) => this.onCancelClient(),
					(source_id: number, target_id: number) => this.onAcorn(source_id, target_id)
				)
				break;
			case 'client_giftVoucher':
				const client_giftVoucher_args = (this.mainClientState.args as ClientGameStates['client_acorn']);
				this.targetingLine = new TargetingLine(
					new DaleCard(client_giftVoucher_args.technique_card_id),
					this.market!.getCards(),
					"dale-line-source-technique",
					"dale-line-target-technique",
					"dale-line-technique",
					(source_id: number) => this.onCancelClient(),
					(source_id: number, target_id: number) => this.onGiftVoucher(source_id, target_id)
				)
				break;
			case 'client_loyalPartner':
				this.market!.setSelectionMode(2, 'pileBlue', "dale-wrap-technique");
				break;
			case 'client_prepaidGood':
				this.market!.setSelectionMode(1, undefined, "dale-wrap-technique");
				break;
			case 'specialOffer':
				this.myLimbo.setSelectionMode('multiple', 'spyglass', 'dale-wrap-technique', _("Choose a card to take"));
				break;
			case 'client_rottenFood':
				for (const [player_id, deck] of Object.entries(this.allDecks)) {
					if (+player_id != this.player_id) {
						deck.setSelectionMode('noneCantViewContent');
					}
				}
				this.myHand.setSelectionMode('click', undefined, 'dale-wrap-technique', _("Choose a card to give"));
				break;
			case 'dirtyExchange':
				this.myHand.setSelectionMode('click', undefined, 'dale-wrap-technique', _("Choose a card to give"));
				break;
			case 'sabotage':
				this.myLimbo.setSelectionMode('click', undefined, 'dale-wrap-technique', _("Choose a card to <strong>ditch</strong>"));
				break;
			case 'client_treasureHunter':
				const client_treasureHunter_args = (this.mainClientState.args as ClientGameStates['client_treasureHunter']);
				const targets: DaleCard[] = [];
				for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
					if (+player_id != +this.player_id && pile.size > 0) {
						pile.setSelectionMode('noneCantViewContent');
						targets.push(pile.peek()!);
					}
				}
				if (targets.length == 0) {
					throw new Error("No valid targets for Treasure Hunter ('client_fizzle' should have been entered instead of 'client_treasureHunter')");
				}
				setTimeout((() => {
					this.targetingLine = new TargetingLine(
						new DaleCard(client_treasureHunter_args.technique_card_id),
						targets,
						"dale-line-source-technique",
						"dale-line-target-technique",
						"dale-line-technique",
						(source_id: number) => this.onCancelClient(),
						(source_id: number, target_id: number) => this.onTreasureHunter(target_id)
					)
				}).bind(this), 500);
				break;
			case 'chameleon_flexibleShopkeeper':
			case 'chameleon_reflection':
			case 'chameleon_goodoldtimes':
			case 'chameleon_trendsetting':
			case 'chameleon_seeingdoubles':
				if (stateName == 'chameleon_reflection') {
					for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
						if (+player_id != +this.player_id) {
							pile.setSelectionMode('noneCantViewContent');
						}
					}
				}
				else if (stateName == 'chameleon_goodoldtimes') {
					this.marketDeck.setSelectionMode('noneCantViewContent');
					this.marketDiscard.setSelectionMode('noneCantViewContent');
				}
				this.myHand.setSelectionMode('noneRetainSelection', undefined, 'previous');
				this.targetingLine = new TargetingLine(
					this.chameleonArgs!.firstSource,
					this.chameleonArgs!.currentTargets,
					"dale-line-source-chameleon",
					"dale-line-target-chameleon",
					"dale-line-chameleon",
					(source_id: number) => this.onCancelClient(),
					(source_id: number, target_id: number) => this.onConfirmChameleon(target_id),
					this.chameleonArgs!.pile
				)
				break;
			case 'client_marketDiscovery':
				this.marketDeck.setSelectionMode('top', undefined, 'dale-wrap-technique');
				this.marketDiscard.setSelectionMode('top', undefined, 'dale-wrap-purchase');
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
			case 'postCleanUpPhase':
				this.myHand.setSelectionMode('none');
				break;
			case 'playerTurn':
				break;
			case 'client_purchase':
				this.market!.unselectAll();
				this.market!.setSelectionMode(0);
				this.marketDiscard.unselectTopCard();
				this.marketDiscard.setSelectionMode('none');
				this.myHand.setSelectionMode('none');
				this.myStall.setLeftPlaceholderClickable(false);
				break;
			case 'client_technique':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode('none');
				this.myStall.setLeftPlaceholderClickable(false);
				break;
			case 'client_build':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode('none');
				this.myStall.unselectLeftPlaceholder();
				this.myDiscard.setSelectionMode('none');
				break;
			case 'client_inventory':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode('none');
				this.myStall.setLeftPlaceholderClickable(false);
				break;
			case 'client_essentialPurchase':	
				this.market!.setSelectionMode(0);
				this.myHand.orderedSelection.secondaryToPrimary();
				//this.myHand.setSelectionMode('none'); //purchase state will be restored
				break;
			case 'winterIsComing':
				this.myHand.setSelectionMode('none');
				this.myStall.unselectLeftPlaceholder();
				this.myDiscard.setSelectionMode('none');
				break;
			case 'client_swiftBroker':
				this.myHand.setSelectionMode('none');
				break;
			case 'client_shatteredRelic':
				this.myHand.setSelectionMode('none');
				break;
			case 'spyglass':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'client_acorn':
				this.targetingLine?.remove();
				break;
			case 'client_giftVoucher':
				this.targetingLine?.remove();
				break;
			case 'client_loyalPartner':
				this.market!.setSelectionMode(0);
				break;
			case 'client_prepaidGood':
				this.market!.setSelectionMode(0);
				break;
			case 'specialOffer':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'client_rottenFood':
				for (const [player_id, deck] of Object.entries(this.allDecks)) {
					if (+player_id != this.player_id) {
						deck.setSelectionMode('none');
					}
				}
				this.myHand.setSelectionMode('none');
				this.targetingLine?.remove();
				break;
			case 'dirtyExchange':
				this.myHand.setSelectionMode('none');
				break;
			case 'sabotage':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'client_treasureHunter':
				for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
					if (+player_id != +this.player_id && pile.size > 0) {
						pile.setSelectionMode('none');
					}
				}
				this.targetingLine?.remove();
				break;
			case 'chameleon_reflection':
				this.targetingLine?.remove();
				for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
					if (+player_id != +this.player_id) {
						pile.setSelectionMode('none');
					}
				}
				break;
			case 'chameleon_goodoldtimes':
				this.targetingLine?.remove();
				this.marketDeck.setSelectionMode('none');
				this.marketDiscard.setSelectionMode('none');
				break;
			case 'chameleon_flexibleShopkeeper':
			case 'chameleon_trendsetting':
			case 'chameleon_seeingdoubles':
				this.targetingLine?.remove();
				break;
			//TODO: safely remove this
			// case 'client_fizzle':
			// 	document.querySelector(".dale-fizzle")?.classList.remove("dale-fizzle");
			// 	break;
			case 'client_marketDiscovery':
				this.marketDeck.setSelectionMode('none');
				this.marketDiscard.setSelectionMode('none');
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
			case 'deckSelection':
				this.addActionButton("submit-button", _("Vote"), "onSubmitPreference");
				this.addActionButton("abstain-button", _("Abstain"), "onSubmitPreferenceAbstain", undefined, false, 'gray');
				break;
			case 'postCleanUpPhase':
				this.addActionButton("end-turn-button", _("End turn"), "onPostCleanUpPhase");
				if (DaleCard.countChameleonsLocal() > 0) {
					this.addActionButton("undo-chameleon-button", _("Undo"), "onUnbindChameleons", undefined, false, 'gray');
				}
				break;
			case 'playerTurn':
				//this.addActionButton("confirm-button", _("Inventory Action"), "onRequestInventoryAction");
				break;
			case 'client_technique':
				this.addActionButton("confirm-button", _("Take an inventory action"), "onRequestInventoryAction");
				if (DaleCard.countChameleonsLocal() > 0) {
					this.addActionButton("undo-chameleon-button", _("Undo"), "onUnbindChameleons", undefined, false, 'gray');
				}
				break;
			case 'client_purchase':
				this.addActionButton("confirm-button", _("Confirm funds"), "onPurchase");
				this.addActionButtonCancelClient();
				break;
			case 'client_build':
				this.addActionButton("confirm-button", _("Build with selected"), "onBuild");
				this.addActionButtonCancelClient();
				break;
			case 'client_inventory':
				this.addActionButton("confirm-button", _("Discard selected"), "onInventoryAction");
				this.addActionButtonCancelClient();
				break;
			case 'client_essentialPurchase':
				this.addActionButton("confirm-button", _("Ditch selected junk"), "onPurchase");
				this.addActionButtonCancelClient();
				break;
			case 'winterIsComing':
				this.addActionButton("confirm-button", _("Build with selected"), "onBuild");
				this.addActionButton("skip-button", _("Skip"), "onWinterIsComingSkip", undefined, false, 'gray');
				break;
			case 'client_swiftBroker':
				this.addActionButton("confirm-button", _("Discard all"), "onSwiftBroker");
				this.addActionButtonCancelClient();
				break;
			case 'client_shatteredRelic':
				this.addActionButtonCancelClient();
				break;
			case 'spyglass':
				this.addActionButton("confirm-button", _("Confirm selection"), "onSpyglass");
				break;
			case 'client_acorn':
				this.addActionButtonCancelClient();
				break;
			case 'client_giftVoucher':
				this.addActionButtonCancelClient();
				break;
			case 'client_loyalPartner':
				this.addActionButton("confirm-button", _("Ditch all"), "onLoyalPartner");
				this.addActionButtonCancelClient();
				break;
			case 'client_prepaidGood':
				this.addActionButtonCancelClient();
				break;
			case 'client_nuisance':
				this.addActionButtonsOpponentSelection(2);
				this.addActionButton("confirm-button", '', "onNuisance");
				this.updateConfirmOpponentsButton();
				this.addActionButtonCancelClient();
				break;
			case 'client_rottenFood':
				this.addActionButtonCancelClient();
				break;
			case 'client_dirtyExchange':
				this.addActionButtonsOpponent(this.onDirtyExchange.bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'client_sabotage':
				this.addActionButtonsOpponent(this.onSabotage.bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'client_treasureHunter':
				this.addActionButtonCancelClient();
				break;
			case 'chameleon_flexibleShopkeeper':
				this.addActionButtonCancelClient();
				break;
			case 'chameleon_reflection':
				this.addActionButtonCancelClient();
				break;
			case 'chameleon_goodoldtimes':
				switch ((this.mainClientState.args as ClientGameStates['chameleon_goodoldtimes']).mode) {
					case 'copy':
						this.addActionButton("copy-button", _("Copy"), "onGoodOldTimesBind");
						this.addActionButtonCancelClient();
						break;
					case 'ditchOrCopy':
						this.addActionButton("copy-button", _("Copy"), "onGoodOldTimesBind");
						this.addActionButton("ditch-button", _("Ditch"), "onGoodOldTimesPassive");
						this.addActionButtonCancelClient();
						break;
					case 'ditchOptional':
						this.addActionButton("ditch-button", _("Ditch"), "onGoodOldTimesPassive");
						this.addActionButton("skip-button", _("Skip"), "onGoodOldTimesPassiveSkip", undefined, false, 'gray');
						break;
					case 'ditchMandatory':
						this.addActionButton("ditch-button", _("Ditch"), "onGoodOldTimesPassive");
						this.addActionButtonCancelClient();
						break;
				}
				break;
			case 'chameleon_trendsetting':
				this.addActionButtonCancelClient();
				break;
			case 'chameleon_seeingdoubles':
				this.addActionButtonCancelClient();
				break;
			case 'client_choicelessTechniqueCard':
				this.onChoicelessTechniqueCard(); //immediately leave this state
				break;
			case 'client_fizzle':
				this.addActionButton("fizzle-button", _("Confirm"), "onFizzle");
				this.addActionButtonCancelClient();
				break;
			case 'client_choicelessPassiveCard':
				this.onChoicelessPassiveCard(); //immediately leave this state
				break;
			case 'client_marketDiscovery':
				this.addActionButton("ditch-button", _("Ditch"), "onMarketDiscoveryDitch");
				this.addActionButton("buy-button", _("Purchase"), "onMarketDiscoveryPurchase");
				this.addActionButtonCancelClient();
				break;
			case 'specialOffer':
				this.addActionButton("confirm-button", _("Confirm selection"), "onSpecialOffer");
				break;
		}
	}

	///////////////////////////////////////////////////
	//// Chameleon functions
	
	/*
		Here I put all functions related to the chameleons
	*/

	/**
	 * If the card is an unbound chameleon card, set the client state to bind the chameleon and return `false`
	 * 
	 * @param card the card that potentially needs to be be bound.
	 * @param pile (optional) if provided, the chameleon card is currently inside a pile popin
	 */
	verifyChameleon(card: DaleCard, pile?: Pile): boolean {
		if (!card.isChameleon()) {
			return true;
		}
		if (!this.checkLock()) {
			return false;
		}

		if (this.chameleonArgs) {
			//pick a target in the pre-computed tree
			this.chameleonArgs.pickTarget(card);
		}
		
		//set the chameleon client state name and args
		let chameleonStatename: keyof ClientGameStates;
		let args: ClientGameStates['chameleon_goodoldtimes'] = { mode: undefined };
		let ditchAvailable = true;
		switch(card.effective_type_id) {
			case DaleCard.CT_FLEXIBLESHOPKEEPER:
				chameleonStatename = 'chameleon_flexibleShopkeeper'
				break;
			case DaleCard.CT_REFLECTION:
				chameleonStatename = 'chameleon_reflection'
				break;
			case DaleCard.CT_GOODOLDTIMES:
				ditchAvailable = (this.chameleonArgs || !card.isPassiveUsed()) && (this.marketDeck.size > 0 || this.marketDiscard.size > 0);
				if (!ditchAvailable) {
					args.mode = 'copy'
				}
				else if ((!this.chameleonArgs && this.marketDiscard.size == 0) || this.chameleonArgs?.onlyContainsGoodOldTimes) {
					args.mode = 'ditchOptional'
				}
				else if ((!this.chameleonArgs || this.chameleonArgs.currentTargets.length == 2) && this.marketDiscard.size > 0) {
					args.mode = 'ditchOrCopy'
				}
				else {
					args.mode = 'ditchMandatory'
				}
				chameleonStatename = 'chameleon_goodoldtimes'
				break;
			case DaleCard.CT_TRENDSETTING:
				chameleonStatename = 'chameleon_trendsetting'
				break;
			case DaleCard.CT_SEEINGDOUBLES:
				chameleonStatename = 'chameleon_seeingdoubles'
				break;
			default:
				throw new Error(`Unknown chameleon card: '${card.name}'`)
		}

		if (!this.chameleonArgs) {
			//create a new chameleon tree and enter the chameleon client state on the stack
			this.chameleonArgs = new ChameleonArgs(this.createChameleonTree(card), pile);
			const targets = this.chameleonArgs.getAllTargets();
			console.log(`'${card.name}' has ${this.chameleonArgs.currentTargets.length} direct target(s)`);
			console.log(`'${card.name}' has ${targets.size} total target(s)`);
			console.log(Array.from(targets).map(target => target instanceof HTMLElement ? target : target.div));
			if (targets.size == 0) {
				this.chameleonArgs = undefined;
				return true;
			}
			else if (this.chameleonArgs.onlyContainsGoodOldTimes) {
				if (ditchAvailable) {
					args.mode = 'ditchOptional'
				}
				else if (card.effective_type_id != DaleCard.CT_GOODOLDTIMES) {
					this.chameleonArgs = undefined;
					return true;
				}
			}
			this.mainClientState.enterOnStack(chameleonStatename, args);
		}
		else {
			this.mainClientState.enter(chameleonStatename, args);
		}
		return false;
	}

	createChameleonTree(card: DaleCard | HTMLElement, visited_ids?: number[]): ChameleonTree {
		const tree: ChameleonTree = {
			card: card, 
			children: []
		};
		if (card instanceof HTMLElement) {
			return tree;
		}
		visited_ids = visited_ids ?? [];
		visited_ids.push(card.id);
		for (let target of this.getChameleonTargets(card, visited_ids.length == 1)) {
			if (target instanceof HTMLElement || !visited_ids.includes(target.id)) {
				const child = this.createChameleonTree(target, visited_ids);
				tree.children.push(child);
			}
		}
		visited_ids.pop();
		return tree;
	}

	/**
	 * @param card chameleon card
	 * @param isRoot is this the first chameleon in the chain? (needed for good old times)
	 * @param type_id (optional) pretend the chameleon card has this type_id
	 * @returns All direct targets (`DaleCard`) and/or the top card of the market discard pile (`HTMLElement`)
	 */
	getChameleonTargets(card: DaleCard, isRoot: boolean, type_id?: number): (DaleCard | HTMLElement)[] {
		console.log(card);
		console.log(card.effective_type_id);
		let targets: (DaleCard|HTMLElement)[] = [];
		switch(type_id ?? card.effective_type_id) {
			case DaleCard.CT_FLEXIBLESHOPKEEPER:
				targets = this.myStall.getCardsInStack(this.myStall.getNumberOfStacks() - 1);
				break;
			case DaleCard.CT_REFLECTION:
				for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
					if (+player_id != +this.player_id && pile.size > 0) {
						targets.push(pile.peek()!)
					}
				}
				break;
			case DaleCard.CT_GOODOLDTIMES:
				if (this.marketDiscard.size > 0) {
					targets.push(this.marketDiscard.peek()!);
				}
				if ((this.marketDeck.size > 0 || this.marketDiscard.size > 0) && (!isRoot || !card.isPassiveUsed())) {
					const target = this.marketDeck.topCardHTML ?? this.marketDeck.placeholderHTML;
					target.dataset['target_id'] = '0';
					targets.push(target);
					// const cardBack = this.marketDeck.peek();
					// if (cardBack) {
					// 	cardBack.attachDiv(this.marketDeck.topCardHTML!);
					// 	targets.push(cardBack);
					// }
				}
				break;
			case DaleCard.CT_TRENDSETTING:
				for (let card of this.market!.getCards()) {
					targets.push(card)
				}
				break;
			case DaleCard.CT_SEEINGDOUBLES:
				const items = this.myHand.getAllItems()
				for (let item of items) {
					if (item.id != card.id) {
						targets.push(new DaleCard(item.id));
					}
				}
				break;
		}
		return targets;
	}

	/**
	 * Validate if all local chameleons are still targeting a valid target. Unbind any that lost its target.
	 */
	validateChameleonsLocal() {
		for (const [chameleon_card_id, chain] of DaleCard.getLocalChameleonsEntries()) {
			let isValid = false;
			let isRoot = true;
			let card_id = chameleon_card_id;
			let type_id = new DaleCard(chameleon_card_id).original_type_id;
			for (let i = 0; i < chain.length; i++) {
				const target_id = chain.card_ids[i]!;
				const valid_target_ids = this.getChameleonTargets(new DaleCard(card_id), isRoot, type_id);
				isValid = false;
				for (let valid_target of valid_target_ids) {
					if (target_id == valid_target.id) {
						isValid = true;
						break;
					}
				}
				card_id = chain.card_ids[i]!; //next chameleon card_id
				type_id = chain.type_ids[i]!; //next chameleon type_id
				isRoot = false;
				if (!isValid) break;
			}
			if (!isValid) {
				new DaleCard(chameleon_card_id).unbindChameleonLocal();
			}
		}
	}

	///////////////////////////////////////////////////
	//// Utility methods
	
	/*
		Here, you can defines some utility methods that you can use everywhere in your typescript
		script.
	*/

	/**
	 * Parse custom placeholders in strings
	 */
	override format_string_recursive(log: string, args: Record<string, any>): string {
		if (log && args && !args['processed']) {
			args['processed'] = true;
			
			//parse opponent name
			if ('opponent_name' in args) {
				let opponent_name = args['opponent_name'];
				let opponent_color = "000000";
				for (let player_id in this.gamedatas.players) {
					if (this.gamedatas.players[player_id]?.name == opponent_name) {
						opponent_color = this.gamedatas.players[player_id]!.color;
					}
				}
				args['opponent_name'] = `<span class="playername" style="color:#${opponent_color};">${opponent_name}</span>`;
			}

			//parse die icon
			if ('die_icon' in args) {
				const iconTpl = DaleDie.getIconTpl(args['die_icon']);
				args['die_icon'] = `<span class="dale-log-span">${iconTpl}</span>`;
			}

			//parse ocelot die
			if (log.includes('${ocelot}')) {
				args['ocelot'] = 'OCELOT_DIE_ICON';
				//args['ocelot'] = `<span class="dale-log-span">${DaleIcons.getChameleonIcon().outerHTML}</span>`;
			}
		}
		return super.format_string_recursive(log, args)
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
	 * @param stock player-specific stock. this should be a stock that each client has only 1 of (e.g. hand or limbo). 
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
	 * @param stock player-specific stock. this should be a stock that each client has only 1 of (e.g. hand or limbo). 
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
			console.log("GOT HERE!");
			if(pile.pop().id != +card.id) {
				throw new Error(`Card ${+card.id} was not found on top of the pile`);
			}
		}
	}

	/**
	 * Move a card from the top of the specified pile to a player-specific stock
	 * @param card card to move
	 * @param pile pile to move from
	 * @param stock player-specific stock. this should be a stock that each client has only 1 of (e.g. hand or limbo). 
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
	 * Add a cancel button to return from the main client state
	 * @param label (optional) default "Cancel". Label to display on the cancel button.
	*/
	addActionButtonCancelClient(label?: string) {
		this.addActionButton("cancel-button", label ?? _("Cancel"), "onCancelClient", undefined, false, 'gray');
	}

	//TODO: safely remove this
	// /**
	//  * Add a button to cancel any locally assigned chameleon targets. Also restores back to the server game state.
	// */
	// addActionButtonCancelChameleon() {
	// 	this.addActionButton("cancel-chameleons-button", _("Cancel"), "onCancelChameleon", undefined, false, 'gray');
	// }

	///////////////////////////////////////////////////
	//// Opponent selection utilities 

	/*
		Here, I put all methods related to selecting opponents
	*/

	/** In a 2-player game, store the unique opponent here */
	unique_opponent_id: number | undefined;

	/**
	 * Add selection buttons to select a single opponent
	 */
	addActionButtonsOpponent(onOpponentHandler: (opponent_id: number) => void) {
		for(let opponent_id of this.gamedatas.playerorder) {
			if (opponent_id != this.player_id) {
				const name = this.gamedatas.players[opponent_id]!.name;
				const color = this.gamedatas.players[opponent_id]!.color;
				const label = `<span style="font-weight:bold;color:#${color};">${name}</span>`;
				this.addActionButton("opponent-selection-button-"+opponent_id, label, () => {onOpponentHandler(opponent_id)}, undefined, false, 'gray');
			}
		}
	}

	/** Selected opponents */
	opponent_ids: number[] = [];
	max_opponents: number = 4;

	/**
	 * Add selection button to select up to `maxSize` opponents
	 */
	addActionButtonsOpponentSelection(maxSize?: number) {
		this.opponent_ids = [];
		this.max_opponents = maxSize ?? this.gamedatas.playerorder.length;
		for(let opponent_id of this.gamedatas.playerorder) {
			if (opponent_id != this.player_id) {
				const name = this.gamedatas.players[opponent_id]!.name;
				const color = this.gamedatas.players[opponent_id]!.color;
				const label = `<span style="font-weight:bold;color:#${color};">${name}</span>`;
				this.addActionButton("opponent-selection-button-"+opponent_id, label, "onToggleOpponent", undefined, false, 'gray');
				if (this.opponent_ids.length < this.max_opponents) {
					this.opponent_ids.push(opponent_id);
					$("opponent-selection-button-"+opponent_id)?.classList.add("dale-bga-button-selected");
				}
			}
		}
	}

	onToggleOpponent(evt: PointerEvent) {
		let target = evt.target as HTMLElement;
		if ((target.parentElement as HTMLElement).id.startsWith("opponent-selection-button-")) {
			target = target.parentElement as HTMLElement;
		}
		if ((target as HTMLElement).id.startsWith("opponent-selection-button-")) {
			const match = (target as HTMLElement).id.match(/\d+/);
			if (match) {
				const opponent_id = parseInt(match[0], 10);
				const index = this.opponent_ids.indexOf(opponent_id);
				if (index == -1) {
					if (this.opponent_ids.length >= this.max_opponents) {
						$("opponent-selection-button-"+this.opponent_ids.pop())?.classList.remove("dale-bga-button-selected");
					}
					this.opponent_ids.push(opponent_id);
					target.classList.add("dale-bga-button-selected");
				}
				else {
					this.opponent_ids.splice(index, 1);
					target.classList.remove("dale-bga-button-selected");
				}
				this.updateConfirmOpponentsButton();
				console.log(this.opponent_ids);
			}
		}
	}

	updateConfirmOpponentsButton() {
		const confirm_button = $("confirm-button");
		if (confirm_button) {
			(confirm_button as HTMLElement).innerText = _("Confirm Selection ")+`(${this.opponent_ids.length})`;
		}
	}

	
	///////////////////////////////////////////////////
	//// Player's action
	
	/*
		Here, you are defining methods to handle player's action (ex: results of mouse click on game objects).
		
		Most of the time, these methods:
		- check the action is possible at this game state.
		- make a call to the game server
	*/

	onSubmitPreference() {
		let animalfolk_ids = this.deckSelection!.orderedSelection.get().reverse();
		if (animalfolk_ids.length == 0) {
			this.showMessage(_("Please select at least 1 animalfolk to vote"), 'error');
			return;
		}
		this.bgaPerformAction('actSubmitPreference', {
			animalfolk_ids: this.arrayToNumberList(animalfolk_ids)
		})
	}

	onSubmitPreferenceAbstain() {
		this.bgaPerformAction('actSubmitPreference', {
			animalfolk_ids: '' 
		})
	}

	onPostCleanUpPhase() {
		this.bgaPerformAction('actPostCleanUpPhase', {
			chameleons_json: DaleCard.getLocalChameleonsJSON()
		})
	}

	onStallCardClick(stall: Stall, card: DaleCard, stack_index: number, index: number) {
        console.log(`Clicked on CardStack[${stack_index}, ${index}]`);

		switch(this.gamedatas.gamestate.name) {

		}
	}

	onMarketCardClick(card: DaleCard, pos: number) {
		pos = this.market!.getValidPos(pos);
		console.log("onMarketCardClick");
		console.log(this.gamedatas.gamestate.name);

		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
				const client_purchase_args = this.mainClientState.args as ClientGameStates['client_purchase'];
				if (client_purchase_args.pos == pos) {
					//user click on the same card again, return to the default client state
					this.mainClientState.leave();
				}
				else if (this.checkLock()) {
					//user clicked on a different card, enter a new client state
					this.mainClientState.enter('client_purchase', {
						pos: pos,
						market_discovery_card_id: undefined,
						card_name: card.name,
						cost: card.getCost(pos)
					});
				}
				break;
			case 'client_technique':
			case 'client_build':
			case 'client_inventory':
				if (this.checkLock()) {
					this.mainClientState.enter('client_purchase', {
						pos: pos,
						market_discovery_card_id: undefined,
						card_name: card.name,
						cost: card.getCost(pos)
					});
				}
				break;
			case 'client_prepaidGood':
				this.playTechniqueCard<'client_prepaidGood'>({
					card_id: card.id
				});
				break;
		}
	}
	
	onScheduleSelectionChanged() {
		//should not be possible at the moment
		console.log("You click on a card in the... schedule...?");
	}

	onUnselectPileCard(pile: Pile, card_id: number) {
		console.log("onUnselectPileCard");
		switch(this.gamedatas.gamestate.name) {
			case 'client_build':
				this.onBuildSelectionChanged();
				break;
		}
	}

	onSelectPileCard(pile: Pile, card_id: number) {
		console.log("onSelectPileCard");
		const card = new DaleCard(card_id);
		if (pile === this.myDiscard) {
			this.onSelectMyDiscardPileCard(pile, card);
		}
		else if (pile === this.marketDiscard || pile === this.marketDeck) {
			this.onSelectMarketPileCard(pile, card);
		}
		else {
			this.onOtherDiscardPileSelectionChanged(pile, card);
		}
	}

	onSelectMyDiscardPileCard(pile: Pile, card: DaleCard) {
		console.log("onSelectMyDiscardPileCard");
		switch(this.gamedatas.gamestate.name) {
			case 'client_build':
				if (this.verifyChameleon(card, pile)) {
					this.onBuildSelectionChanged();
				}
				break;
		}
	}

	onSelectMarketPileCard(pile: Pile, card: DaleCard) {
		console.log("onSelectMarketPileCard");
		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
				this.mainClientState.leave();
				break;
			case 'client_marketDiscovery':
				if (pile === this.marketDeck) {
					this.onMarketDiscoveryDitch();
				}
				else if (pile === this.marketDiscard) {
					this.onMarketDiscoveryPurchase();
				}
		}
	}

	onOtherDiscardPileSelectionChanged(pile: Pile, card: DaleCard) {
		console.log("onOtherDiscardPileSelectionChanged");
		switch(this.gamedatas.gamestate.name) {

		}
	}

	onUnselectHandCard(card_id: number) {
		console.log("onUnselectHandCard: "+card_id);
		const card = new DaleCard(card_id);

		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
				this.onFundsSelectionChanged();
				break;
			case 'client_build':
				this.onBuildSelectionChanged();
				break;
			case 'winterIsComing':
				this.onBuildSelectionChanged();
				break;
		}
	}

	onSelectHandCard(card_id: number) {
		console.log("onSelectHandCard: "+card_id);
		const card = new DaleCard(card_id);

		switch(this.gamedatas.gamestate.name) {
			case 'postCleanUpPhase':
				if (this.verifyChameleon(card)) {
					this.onClickPassive(card);
				}
				break;
			case 'client_technique':
				//play card action (technique or active passive)
				if (this.verifyChameleon(card)) {
					if (card.isTechnique()) {
						this.onClickTechnique(card);
					}
					else {
						this.onClickPassive(card);
					}
				}
				break;
			case 'client_purchase':
				if (this.verifyChameleon(card)) {
					this.onFundsSelectionChanged();
				}
				break;
			case 'client_build':
				if (this.verifyChameleon(card)) {
					this.onBuildSelectionChanged();
				}
				break;
			case 'winterIsComing':
				if (this.verifyChameleon(card)) {
					this.onBuildSelectionChanged();
				}
				break;
			case 'client_shatteredRelic':
				this.playTechniqueCard<'client_shatteredRelic'>({
					card_id: card!.id
				})
				break;
			case 'client_rottenFood':
				const client_rottenFood_targets = [];
				for (const [player_id, deck] of Object.entries(this.playerDecks)) {
					if (+player_id != this.player_id) {
						const target = deck.topCardHTML ?? deck.placeholderHTML
						target.dataset['target_id'] = player_id;
						client_rottenFood_targets.push(target);
					}
				}
				const label = _("Place '") + card.name + _("' on another player\'s deck");
				this.setMainTitle(label);
				this.myHand.setSelectionMode('none', undefined, 'dale-wrap-default', label);
				this.targetingLine = new TargetingLine(
					card,
					client_rottenFood_targets,
					"dale-line-source-technique",
					"dale-line-target-technique",
					"dale-line-technique",
					(source_id: number) => this.onCancelClient(),
					(source_id: number, target_id: number) => this.onRottenFood(source_id, target_id)
				)
				break;
			case 'dirtyExchange':
				this.bgaPerformAction('actDirtyExchange', {
					card_id: card.id
				})
				break;
			case null:
				throw new Error("gamestate.name is null")
		}
	}

	onSelectLimboCard(card_id: number) {
		console.log("onSelectLimboCard: "+card_id);
		const card = new DaleCard(card_id);

		switch(this.gamedatas.gamestate.name) {
			case 'sabotage':
				this.bgaPerformAction('actSabotage', {
					card_id: card.id
				})
				break;
		}
	}

	onFundsSelectionChanged() {
		//TODO: pandas
	}

	onPurchase() {
		var args;
		var funds_card_ids: number[];
		var essential_purchase_ids: number[];
		switch (this.gamedatas.gamestate.name) {
			case 'client_purchase':
				args = (this.mainClientState.args as ClientGameStates['client_purchase'])
				funds_card_ids = this.myHand.orderedSelection.get();
				essential_purchase_ids = [];
				break;
			case 'client_essentialPurchase':
				args = (this.mainClientState.args as ClientGameStates['client_essentialPurchase'])
				funds_card_ids = args.funds_card_ids;
				essential_purchase_ids = this.myHand.orderedSelection.get()
				break;
			default:
				throw new Error(`You cannot purchase a card from gamestate '${this.gamedatas.gamestate}'`)
		}
		var card_id;
		if (args.market_discovery_card_id === undefined) {
			card_id = this.market!.getCardId(args.pos);
			console.log(card_id);
		}
		else {
			const card = this.marketDiscard.peek();
			if (!card) {
				throw new Error("Cannot purchase from the bin, as it is empty")
			}
			card_id = card.id;
		}
		if (this.gamedatas.gamestate.name != 'client_essentialPurchase' && new DaleCard(card_id).effective_type_id == DaleCard.CT_ESSENTIALPURCHASE) {
			this.mainClientState.enterOnStack('client_essentialPurchase', {
				funds_card_ids: funds_card_ids,
				...args
			});
		}
		else {
			this.bgaPerformAction('actPurchase', {
				funds_card_ids: this.arrayToNumberList(funds_card_ids),
				market_card_id: card_id,
				essential_purchase_ids: this.arrayToNumberList(essential_purchase_ids),
				chameleons_json: DaleCard.getLocalChameleonsJSON()
			})
		}
	}

	onMarketDiscoveryDitch() {
		this.playPassiveCard<'client_marketDiscovery'>({});
	}

	onMarketDiscoveryPurchase(market_discovery_card_id?: number | PointerEvent) {
		if (market_discovery_card_id == undefined || market_discovery_card_id instanceof PointerEvent) { //for dojo.connect
			market_discovery_card_id = (this.mainClientState.args as ClientGameStates['client_marketDiscovery']).passive_card_id
		}
		const card = this.marketDiscard.peek();
		if (!card) {
			this.showMessage(_("The bin is empty"), 'error');
			return;
		}
		if (this.checkLock()) {
			this.mainClientState.enter('client_purchase', {
				pos: -1,
				market_discovery_card_id: market_discovery_card_id,
				card_name: card.name,
				cost: card.getCost(0)
			});
		}
	}

	onFizzle() {
		this.playTechniqueCard<'client_fizzle'>({
			fizzle: true
		})
	}

	onChoicelessTechniqueCard() {
		this.playTechniqueCard<'client_choicelessTechniqueCard'>({
			choiceless: true
		})
	}

	onChoicelessPassiveCard() {
		this.playPassiveCard<'client_choicelessPassiveCard'>({})
	}

	/**
	 * Use a passive for its ability
	 */
	playPassiveCard<K extends keyof ClientPassiveChoice>(args: ClientPassiveChoice[K]) {
		this.bgaPerformAction('actUsePassiveAbility', {
			card_id: (this.mainClientState.args as ClientGameStates[K]).passive_card_id, 
			chameleons_json: DaleCard.getLocalChameleonsJSON(),
			args: JSON.stringify(args)
		});
		this.mainClientState.leave();
	}

	/**
	 * Play a technique card that is already locally inside your schedule for an open-information choice. Then proceed to an hidden-information server choice state.
	 * @param args result of the open-infomation choice to send to the server
	 */
	playTechniqueCardWithServerState<K extends keyof ClientTechniqueChoice>(args: ClientTechniqueChoice[K]) {
		this.bgaPerformAction('actPlayTechniqueCard', {
			card_id: (this.mainClientState.args as ClientGameStates[K]).technique_card_id,
			chameleons_json: DaleCard.getLocalChameleonsJSON(),
			args: JSON.stringify(args)
		});
		this.mainClientState.leaveAndDontReturn();
	}

	/**
	 * Play a technique card that is already locally inside your schedule for an open-information choice
	 * @param args result of the open-infomation choice to send to the server
	 */
	playTechniqueCard<K extends keyof ClientTechniqueChoice>(args: ClientTechniqueChoice[K]) {
		this.bgaPerformAction('actPlayTechniqueCard', {
			card_id: (this.mainClientState.args as ClientGameStates[K]).technique_card_id,
			chameleons_json: DaleCard.getLocalChameleonsJSON(),
			args: JSON.stringify(args)
		});
		this.mainClientState.leave();
	}

	/**
	 * Locally schedule a technique, then open the related client technique choice state
	 */
	clientScheduleTechnique<K extends keyof ClientTechniqueChoice>(stateName: K, technique_card_id: number) {
		if (this.checkLock()) {
			if ($(this.myHand.control_name+'_item_' + technique_card_id)) {
				this.mySchedule.addDaleCardToStock(new DaleCard(technique_card_id), this.myHand.control_name+'_item_'+technique_card_id)
				this.myHand.removeFromStockByIdNoAnimation(+technique_card_id);
			}
			else {
				throw new Error(`Cannot schedule the technique card. Card ${technique_card_id} does not exist in my hand`);
			}
			this.myHandSize.incValue(-1);
			this.mainClientState.enterOnStack(stateName, { technique_card_id: technique_card_id });
		}
	}
	

	onAcorn(source_id: number, target_id: number) {
		for (const [player_id, player_stall] of Object.entries(this.playerStalls)) {
			if (player_stall.contains(target_id)) {
				this.playTechniqueCard<'client_acorn'>({
					stall_player_id: +player_id,
					stall_card_id: target_id
				})
				//TODO: safely delete this
				// this.bgaPerformAction('actPlayTechniqueCard', {
				// 	card_id: source.id, 
				// 	chameleons_json: DaleCard.getLocalChameleonsJSON(),
				// 	args: JSON.stringify({
				// 		stall_player_id: +player_id,
				// 		stall_card_id: target.id
				// 	})
				// });
				// this.mainClientState.leave();
				break;
			}
		}
	}

	onGiftVoucher(source_id: number, target_id: number) {
		if (this.market!.contains(target_id)) {
			this.playTechniqueCard<'client_giftVoucher'>({
				market_card_id: target_id
			})
			//TODO: safely delete this
			// card_id: source.id, 
			// chameleons_json: DaleCard.getLocalChameleonsJSON(),
			// args: JSON.stringify({
			// 	market_card_id: target.id
			// })
			//this.mainClientState.leave();
		}
	}

	/**
	 * The player want to use a technique card as a technique. Locally schedule that card.
	 */
	onClickTechnique(card: DaleCard) {
		let fizzle = true;
		switch(card.effective_type_id) {
			case DaleCard.CT_SWIFTBROKER:
				this.clientScheduleTechnique('client_swiftBroker', card.id);
				break;
			case DaleCard.CT_SHATTEREDRELIC:
				if (this.myHand.count() == 1) {
					//the hand only consists of the shatteredRelic itself
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				else {
					this.clientScheduleTechnique('client_shatteredRelic', card.id);
				}
				break;
			case DaleCard.CT_ACORN:
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id) {
						if (this.playerStalls[player_id]!.getNumberOfStacks() > 0) {
							fizzle = false;
							break;
						}
					}
				}
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.mainClientState.enterOnStack('client_acorn', { technique_card_id: card.id });
				}
				break;
			case DaleCard.CT_GIFTVOUCHER:
				fizzle = this.market!.getCards().length == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.mainClientState.enterOnStack('client_giftVoucher', { technique_card_id: card.id });
				}
				break;
			case DaleCard.CT_LOYALPARTNER:
				this.clientScheduleTechnique('client_loyalPartner', card.id);
				break;
			case DaleCard.CT_PREPAIDGOOD:
				fizzle = this.market!.getCards().length == 0;
				this.clientScheduleTechnique(fizzle ? 'client_fizzle' : 'client_prepaidGood', card.id);
				break;
			case DaleCard.CT_NUISANCE:
				this.clientScheduleTechnique('client_nuisance', card.id);
				break;
			case DaleCard.CT_ROTTENFOOD:
				fizzle = this.myHand.count() == 1;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_rottenFood', card.id);
				}
				break;
			case DaleCard.CT_DIRTYEXCHANGE:
				if (this.unique_opponent_id) {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				else {
					this.clientScheduleTechnique('client_dirtyExchange', card.id);
				}
				break;
			case DaleCard.CT_SABOTAGE:
				if (this.unique_opponent_id) {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				else {
					this.clientScheduleTechnique('client_sabotage', card.id);
				}
				break;
			case DaleCard.CT_TREASUREHUNTER:
				fizzle = true;
				for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
					if (+player_id != +this.player_id && pile.size > 0) {
						fizzle = false;
					}
				}
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_treasureHunter', card.id);
				}
				break;
			default:
				this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				break;
		}
	}

	/**
	 * The user clicked on a card with a passive ability. Jump to the related choice state
	 * @param card the card that wants to use its passive ability
	 */
	onClickPassive(card: DaleCard, postCleanUp: boolean = false) {
		const type_id = card.effective_type_id;
		if (type_id != DaleCard.CT_GOODOLDTIMES && type_id != DaleCard.CT_MARKETDISCOVERY) {
			if (card.isChameleon()) {
				this.showMessage(_("This chameleon card has no valid targets"), 'error');
				return;
			}
			if (card.isPassiveUsed()) {
				this.showMessage(_("This passive's ability was already used"), 'error');
				return;
			}
		}
		switch(card.effective_type_id) {
			case DaleCard.CT_GOODOLDTIMES:
				if (card.isPassiveUsed()) {
					this.showMessage(_("This passive's ability was already used"), 'error');
				}
				else {
					this.showMessage(_("This passive's ability has no valid target"), 'error');
				}
				break;
			case DaleCard.CT_MARKETDISCOVERY:
				if (this.gamedatas.gamestate.name == 'postCleanUpPhase') {
					if (card.isPassiveUsed()) {
						this.showMessage(_("This passive's ability was already used"), 'error');
					}
					else {
						this.mainClientState.enterOnStack('client_marketDiscovery', {passive_card_id: card.id});
						this.onMarketDiscoveryDitch();
					}
				}
				else if (card.isPassiveUsed()) {
					this.onMarketDiscoveryPurchase(card.id);
				}
				else {
					this.mainClientState.enterOnStack('client_marketDiscovery', {passive_card_id: card.id});
				}
				break;
			default:
				this.mainClientState.enterOnStack('client_choicelessPassiveCard', {passive_card_id: card.id});
				break;
		}
	}

	onBuildSelectionChanged(card?: DaleCard){
		console.log("onBuildSelectionChanged");
		const card_ids = this.myHand.orderedSelection.get();
		let count_nostalgic_items = 0;
		for (let card_id of card_ids) {
			const card = new DaleCard(card_id);
			if (card.effective_type_id == DaleCard.CT_NOSTALGICITEM) {
				count_nostalgic_items++;
			}
		}
		if (count_nostalgic_items > 0) {
			//you need at least 1 nostalgic item in hand to start counting nostalgic items from discard
			for (let card_id of this.myDiscard.orderedSelection.get()) {
				const card = new DaleCard(card_id);
				if (card.effective_type_id == DaleCard.CT_NOSTALGICITEM) {
					count_nostalgic_items++;
				}
			}
		}
		console.log("count_nostalgic_items = "+count_nostalgic_items);
		if (count_nostalgic_items == 0) {
			this.myDiscard.setSelectionMode('none');
		}
		else {
			this.myDiscard.setSelectionMode('multiple', 'build', "dale-wrap-build", count_nostalgic_items);
		}
		
	}

	onBuild() {
		if(this.checkAction('actBuild')) {
			this.bgaPerformAction('actBuild', {
				stack_card_ids: this.arrayToNumberList(this.myHand.orderedSelection.get()),
				stack_card_ids_from_discard: this.arrayToNumberList(this.myDiscard.orderedSelection.get()),
				chameleons_json: DaleCard.getLocalChameleonsJSON()
			});
		}
	}
	
	onWinterIsComingSkip() {
		if (this.myHand.orderedSelection.getSize() > 0) {
			//help players to not accidentally skip winter is coming if they intend to cancel their selection instead of skipping
			this.myHand.unselectAll();
		}
		else if(this.checkAction('actWinterIsComingSkip')) {
			this.bgaPerformAction('actWinterIsComingSkip', {})
		}
	}

	onCancelClient() {
		console.log("onCancelClient");
		TargetingLine.removeAll();
		if (this.chameleonArgs) {
			//undo the chameleon state
			this.chameleonArgs.firstSource.unbindChameleonLocal();
			if (this.chameleonArgs.pile) {
				this.chameleonArgs.pile.unselectItem(this.chameleonArgs.firstSource.id);
			}
			else {
				this.myHand.unselectItem(this.chameleonArgs.firstSource.id);
			}
			this.chameleonArgs = undefined;
		}
		console.log(this.mainClientState.args);
		if ('technique_card_id' in this.mainClientState.args) {
			//undo the technique choice state
			const card_id = this.mainClientState.args.technique_card_id
			const card = new DaleCard(card_id);
			const type_id = card.effective_type_id;
			if ((type_id != DaleCard.CT_ACORN && type_id != DaleCard.CT_GIFTVOUCHER) || this.mainClientState.name == 'client_fizzle') {
				this.myHand.addDaleCardToStock(card, this.mySchedule.control_name+'_item_'+card_id)
				this.mySchedule.removeFromStockByIdNoAnimation(card_id);
				this.myHandSize.incValue(1);
			}
		}
		this.mainClientState.leave();
	}

	//TODO: safely remove this
	// /**
	//  * To be called from within a chameleon client state. Cancels finding a target for the chameleon bind
	//  * @param unselect (optional) default true. If true, automatically deselect the chameleon card
	//  */
	// onCancelChameleon(unselect: boolean = true) {
	// 	console.log("onCancelChameleon");
	// 	console.log(this.chameleonArgs!);
	// 	//return from the chameleon client state
	// 	const args = this.chameleonArgs!
	// 	if (unselect) {
	// 		args.from.unselectItem(args.card.id);
	// 	}
	// 	args.card.unbindChameleonLocal();
	// 	this.restoreServerGameState();
	// 	this.chameleonArgs?.remove();
	// 	this.chameleonArgs = undefined;
	// }

	/**
	 * To be called from within a chameleon client state. Confirms the user selection for the chameleon card and restores the server state.
	 * @param target target card to bind to
	 * @returns 
	 */
	onConfirmChameleon(target_id: number) {
		console.log("onConfirmChameleon");
		const target = new DaleCard(target_id);
		const args = this.chameleonArgs!;
		console.log(args);
		
		if (target.isCardBack()) {
			//good old times is used for its passive ability
			if (args.currentSource.effective_type_id != DaleCard.CT_GOODOLDTIMES) {
				throw new Error("Only 'Good Old Times' can use the 'Good Old Times' ability");
			}
			this.onGoodOldTimesPassive();
		}
		else if (this.verifyChameleon(target)) {
			//chameleon targeted itself or a non-chameleon. bind the chameleon chain.
			args.pickTarget(target);
			TargetingLine.removeAll();
			this.chameleonArgs = undefined;
			this.mainClientState.leave();
		}
	}

	onGoodOldTimesPassive() {
		this.bgaPerformAction('actUsePassiveAbility', {
			card_id: this.chameleonArgs!.firstSource.id, 
			chameleons_json: DaleCard.getLocalChameleonsJSON(),
			args: JSON.stringify({})
		});
		this.onCancelClient();
	}

	onGoodOldTimesPassiveSkip() {
		//the chameleon is allowed to be itself
		TargetingLine.removeAll();
		this.chameleonArgs?.firstSource.unbindChameleonLocal();
		this.chameleonArgs = undefined;
		this.mainClientState.leave();
	}

	onGoodOldTimesBind() {
		const discardTopCard = this.marketDiscard.peek();
		if (discardTopCard) {
			TargetingLine.removeAll();
			this.onConfirmChameleon(discardTopCard.id);
		}
		else {
			this.onCancelClient();
		}
	}

	onUnbindChameleons() {
		DaleCard.unbindAllChameleonsLocal();
		this.restoreServerGameState();
	}

	onRequestBuildAction() {
		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
			case 'client_technique':
			case 'client_build':
			case 'client_inventory':
				this.mainClientState.enter('client_build', {
					stack_index_plus_1: this.myStall!.getNumberOfStacks()+1
				});
				break;
		}
	}

	onRequestInventoryAction() {
		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
			case 'client_technique':
			case 'client_build':
			case 'client_inventory':
				this.mainClientState.enter('client_inventory');
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
		//TODO: check if convertion to number list is needed
		//this.arrayToNumberList(this.myHand.orderedSelection.get())
		this.playTechniqueCard<'client_swiftBroker'>({
			card_ids: this.myHand.orderedSelection.get()
		})
	}

	onSpyglass() {
		const card_ids = this.myLimbo.orderedSelection.get();
		console.log("Sending "+this.arrayToNumberList(card_ids));
		if (card_ids.length == 0) {
			this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
			return;
		}
		this.bgaPerformAction('actSpyglass', {
			card_ids: this.arrayToNumberList(card_ids)
		})
	}

	onLoyalPartner() {
		this.playTechniqueCard<'client_loyalPartner'>({
			card_ids: this.market!.orderedSelection.get()
		})
	}

	onSpecialOffer() {
		const card_ids = this.myLimbo.orderedSelection.get();
		console.log("Sending "+this.arrayToNumberList(card_ids));
		if (card_ids.length == 0) {
			this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
			return;
		}
		this.bgaPerformAction('actSpecialOffer', {
			card_ids: this.arrayToNumberList(card_ids)
		})
	}

	onNuisance() {
		this.playTechniqueCard<'client_nuisance'>({
			opponent_ids: this.opponent_ids
		})
	}

	onRottenFood(card_id: number, opponent_id: number) {
		this.playTechniqueCard<'client_rottenFood'>({
			card_id: card_id,
			opponent_id: opponent_id
		})
	}

	onDirtyExchange(opponent_id: number) {
		this.playTechniqueCardWithServerState<'client_dirtyExchange'>({
			opponent_id: opponent_id
		})
	}

	onSabotage(opponent_id: number) {
		this.playTechniqueCardWithServerState<'client_sabotage'>({
			opponent_id: opponent_id
		})
	}

	onTreasureHunter(card_id: number) {
		this.playTechniqueCard<'client_treasureHunter'>({
			card_id: card_id,
		})
	}

	///////////////////////////////////////////////////
	//// Reaction to cometD notifications

	/** @gameSpecific See {@link Gamegui.setupNotifications} for more information. */
	override setupNotifications()
	{
		console.log( 'notifications subscriptions setup42' );
		
		const notifs: [keyof NotifTypes, number][] = [
			['deckSelectionResult', 500],
			['delay', 500],
			['startGame', 500],
			['instant_scheduleTechnique', 1],
			['scheduleTechnique', 500],
			['resolveTechnique', 500],
			['cancelTechnique', 500],
			['buildStack', 500],
			['fillEmptyMarketSlots', 1],
			['marketSlideRight', 500],
			['marketToHand', 500],
			['swapHandStall', 1],
			['swapHandMarket', 1],
			['marketDiscardToHand', 500],
			['discardToHand', 500],
			['discardToHandMultiple', 500],
			['draw', 500],
			['drawMultiple', 500],
			['limboToHand', 500],
			['playerHandToOpponentHand', 500],
			['opponentHandToPlayerHand', 500],
			['obtainNewJunkInHand', 500],
			['ditch', 500],
			['ditchMultiple', 500],
			['discard', 500],
			['discardMultiple', 500],
			['placeOnDeckMultiple', 500],
			['reshuffleDeck', 1500],
			['wilyFellow', 500],
			['ditchFromMarketDeck', 500],
			['ditchFromMarketBoard', 500],
			['rollDie', 1000],
			['addEffect', 1],
			['expireEffects', 1],
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

	notif_delay(notif: NotifAs<'delay'>) {
		console.log("notif_delay (500ms)");
	}

	notif_deckSelectionResult(notif: NotifAs<'deckSelectionResult'>) {
		this.deckSelection!.setResult(notif.args.animalfolk_id);
	}

	notif_startGame(notif: NotifAs<'startGame'>) {
		this.deckSelection!.remove();
		const n = Object.keys(this.gamedatas.players).length;
		this.marketDeck.pushHiddenCards(11*(n+1));
		for (let player_id in this.gamedatas.players) {
			this.playerDecks[+player_id]!.pushHiddenCards(10);
		}
	}

	notif_instant_scheduleTechnique(notif: NotifAs<'scheduleTechnique'>) {
		this.notif_scheduleTechnique(notif); //same as scheduleTechnique, but without a delay
	}

	notif_scheduleTechnique(notif: NotifAs<'scheduleTechnique'>) {
		//hand to schedule
		if (notif.args.player_id == this.player_id) {
			//animate from my hand (if not done already by the client state)
			const card_id = +notif.args.card.id;
			if ($(this.myHand.control_name+'_item_' + card_id)) {
				this.mySchedule.addDaleCardToStock(DaleCard.of(notif.args.card), this.myHand.control_name+'_item_'+card_id)
				this.myHand.removeFromStockByIdNoAnimation(+card_id);
			}
			else {
				console.log("SKIP scheduling the technique: already done by client")
				return;
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
				throw new Error(`Unable to cancel a technique. Technique card ${card_id} does not exist in the schedule.`);
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

	notif_swapHandStall(notif: NotifAs<'swapHandStall'>) {
		console.log("swapHandStall");
		const stall = this.playerStalls[notif.args.stall_player_id]!;
		if (notif.args.player_id == this.player_id) {
			stall.swapWithStock(notif.args.stall_card_id, this.myHand, DaleCard.of(notif.args.card));
		}
		else {
			stall.swapWithOverallPlayerBoard(notif.args.stall_card_id, this.player_id, DaleCard.of(notif.args.card));
		}
	}

	notif_swapHandMarket(notif: NotifAs<'swapHandMarket'>) {
		console.log("swapHandMarket");
		if (notif.args.player_id == this.player_id) {
			this.market!.swapWithStock(notif.args.market_card_id, this.myHand, DaleCard.of(notif.args.card));
		}
		else {
			this.market!.swapWithOverallPlayerBoard(notif.args.market_card_id, this.player_id, DaleCard.of(notif.args.card));
		}
	}

	notif_limboToHand(notif: NotifAs<'limboToHand'>) {
		console.log("notif_limboToHand");
		if (notif.args._private) {
			const card_id = +notif.args._private.card.id;
			if ($(this.myLimbo.control_name+'_item_' + card_id)) {
				console.log(notif.args);
				this.myHand.addDaleCardToStock(DaleCard.of(notif.args._private.card), this.myLimbo.control_name+'_item_' + card_id)
				this.myLimbo.removeFromStockByIdNoAnimation(+card_id);
			}
			else {
				throw new Error(`Card ${card_id} does not exist in myLimbo.`);
			}
		}
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(1);
	}
	
	notif_playerHandToOpponentHand(notif: NotifAs<'playerHandToOpponentHand'>) {
		//Move a card from a `player_id`'s hand/limbo to an `opponent_id`'s hand/limbo
		const temp1 = notif.args.player_id;
		notif.args.player_id = notif.args.opponent_id;
		notif.args.opponent_id = temp1;
		const temp2 = notif.args.from_limbo;
		notif.args.from_limbo = notif.args.to_limbo;
		notif.args.to_limbo = temp2;
		this.notif_opponentHandToPlayerHand(notif);
	}

	notif_opponentHandToPlayerHand(notif: NotifFrom<'opponentHandToPlayerHand'>) {
		//Move a card from an `opponent_id`'s hand/limbo to a `player_id`'s hand/limbo
		if (notif.args._private) {
			if (this.player_id == notif.args.opponent_id) {
				//opponent's view
				const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
				const card = DaleCard.of(notif.args._private.card);
				stock.removeFromStockById(card.id, 'overall_player_board_' + notif.args.player_id);
			}
			else if (this.player_id == notif.args.player_id) {
				//player's view
				const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
				const card = DaleCard.of(notif.args._private.card);
				stock.addDaleCardToStock(card, 'overall_player_board_' + notif.args.opponent_id);
			}
			else {
				throw new Error(`Accidentally received private arguments intended for ${notif.args.opponent_id} and ${notif.args.player_id}`)
			}
		}
		else if (this.player_id == notif.args.opponent_id || this.player_id == notif.args.player_id) {
			throw new Error("Expected private arguments for 'opponentHandToPlayerHand'");
		}
		this.playerHandSizes[notif.args.opponent_id]!.incValue(-1);
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
		const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
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
		const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
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
		const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
		this.playerStockToPile(notif.args.card, stock, notif.args.player_id, discardPile);
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(-1);
	}

	notif_discardMultiple(notif: NotifAs<'discardMultiple'>) {
		console.log("discardMultiple");
		console.log(notif.args);
		const discard_id = notif.args.discard_id ?? notif.args.player_id;
		const discardPile = this.playerDiscards[discard_id]!;
		const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
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
		const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
		if (notif.args._private) {
			//you GIVE the cards
			for (let id of notif.args._private.card_ids) {
				const card = notif.args._private.cards[id]!;
				const deck = this.allDecks[notif.args.deck_player_id ?? notif.args.player_id]!;
				this.stockToPile(card, stock, deck);
			}
		}
		else if (notif.args.deck_player_id != notif.args.player_id)  {
			//animate cards to deck
			for (let i = 0; i < notif.args.nbr; i++) {
				this.allDecks[notif.args.deck_player_id!]!.push(new DaleCard(0, 0), 'overall_player_board_' + notif.args.player_id);
			}
		}
		else {
			//increase deck size
			this.allDecks[notif.args.deck_player_id ?? notif.args.player_id]!.pushHiddenCards(notif.args.nbr);
		}
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(-notif.args.nbr);
		}
	}

	notif_marketDiscardToHand(notif: NotifAs<'marketDiscardToHand'>) {
		console.log("notif_marketDiscardToHand");
		const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
		this.pileToPlayerStock(notif.args.card, this.marketDiscard, stock, notif.args.player_id);
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(1);
	}

	notif_discardToHand(notif: NotifAs<'discardToHand'>) {
		console.log("notif_discardToHand");
		const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
		const discardPile = this.playerDiscards[notif.args.discard_id ?? notif.args.player_id]!;
		this.pileToPlayerStock(notif.args.card, discardPile, stock, notif.args.player_id);
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(1);
	}
	
	notif_discardToHandMultiple(notif: NotifAs<'discardToHandMultiple'>) {
		console.log("notif_discardToHandMultiple");
		const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
		const discardPile = this.playerDiscards[notif.args.discard_id ?? notif.args.player_id]!;
		for (let i in notif.args.cards) {
			const card = notif.args.cards[i]!;
			this.pileToPlayerStock(card, discardPile, stock, notif.args.player_id, +card.location_arg);
		}
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(notif.args.nbr);
	}

	notif_draw(notif: NotifAs<'draw'>) {
		console.log("notif_draw");
		const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
		const deck = this.allDecks[notif.args.deck_player_id ?? notif.args.player_id]!
		if (notif.args._private) {
			//you drew the cards
			let card = notif.args._private.card
			stock.addDaleCardToStock(DaleCard.of(card), deck.placeholderHTML);
			deck.pop();
		}
		else {
			//another player drew cards
			deck.pop('overall_player_board_'+notif.args.player_id);
		}
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(1);
		}
	}
	
	notif_drawMultiple(notif: NotifAs<'drawMultiple'>) {
		console.log("notif_drawMultiple");
		console.log(notif.args);
		const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
		const deck = this.allDecks[notif.args.deck_player_id ?? notif.args.player_id]!
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
				deck.pop('overall_player_board_'+notif.args.player_id);
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

	notif_wilyFellow(notif: NotifAs<'wilyFellow'>) {
		const discard = this.playerDiscards[notif.args.player_id]!;
		const deck = this.playerDecks[notif.args.player_id]!
		let decksize = deck.size;
		let discardsize = discard.size;
		if (notif.args.card_ids.length != decksize) {
			this.showMessage(_("Wily Fellow detected that the client and server have different deck sizes. Please refresh."), 'error');
			return;
		}
		const newDiscardTop = decksize > 0 ? DaleCard.of(notif.args.cards[notif.args.card_ids[notif.args.card_ids.length-1]!]!) : undefined;
		const newDeckTop = discard.peek(true);
		//empty all piles
		while (discard.size > 0) {
			discard.pop();
		}
		while (deck.size > 0) {
			deck.pop();
		}
		//fill the new piles
		let numberOfAnimations = 0;
		const dataSwap = () => {
			if (numberOfAnimations > 0) {
				numberOfAnimations -= 1;
				return;
			}
			if (newDiscardTop) {
				discard.pop();
			}
			if (newDeckTop) {
				deck.pop();
			}
			for (let i = 0; i < discardsize; i++) {
				deck.push(new DaleCard(0, 0));
			}
			for (let i = 0; i < decksize; i++) {
				const card_id = notif.args.card_ids[i]!;
				const card = DaleCard.of(notif.args.cards[card_id]!);
				discard.push(card);
			}
		}
		//animate swapping the top cards (and after the animation, do the dataSwap)
		const duration = 400;
		if (newDiscardTop) {
			numberOfAnimations++;
			discard.push(newDiscardTop, deck.placeholderHTML, dataSwap, duration);
		}
		if (newDeckTop) {
			numberOfAnimations++;
			deck.push(newDeckTop, discard.placeholderHTML, dataSwap, duration);
		}
		dataSwap();
		//TODO: safely delete this
		// //animated swap
		// const duration = 400;
		// if (newDiscardTop) {
		// 	discard.push(currentDeckCard, deck.placeholderHTML, undefined, duration);
		// }
		// if (animToDeck) {
		// 	const currentDiscardCard = ;
		// 	deck.push(currentDiscardCard, discard.placeholderHTML, undefined, duration);
		// }
		// setTimeout(dataSwap, duration);
		// discard.shuffleToDrawPile(deck, undefined, discardsize);
		// const step = 1000/size;
		// const anim = () => {
		// 	discard.pop(deck.placeholderHTML, () => { 
		// 		deck.push(new DaleCard(0, 0))
		// 		if (discardsize > 0) {
		// 			anim();
		// 		}
		// 		else {
		// 			for (let i = 0; i < decksize - 1; i++) {
		// 				const card_id = notif.args.card_ids[i]!;
		// 				const card = DaleCard.of(notif.args.cards[card_id]!);
		// 				discard.push(card);
		// 				deck.pop();
		// 			}
		// 			const card_id = notif.args.card_ids[decksize-1]!;
		// 			const card = DaleCard.of(notif.args.cards[card_id]!);
		// 			discard.push(card, deck.placeholderHTML, undefined, step);
		// 			deck.pop();
		// 		}
		// 	}, step/2, step);
		// }
		// anim();
		// for (let i = 0; i < discardsize; i++) {
		// 	console.log(deck.placeholderHTML);
		// 	discard.pop(deck.placeholderHTML, () => { deck.push(new DaleCard(0, 0)) }, step/2, delay);
		// 	delay += step;
		// }
		// for (let i = 0; i < decksize; i++) {
		// 	const card_id = notif.args.card_ids[i]!;
		// 	const card = DaleCard.of(notif.args.cards[card_id]!);
		// 	discard.push(card, deck.placeholderHTML, () => { deck.pop() }, step/2, delay);
		// 	delay += step;
		// }
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

	notif_rollDie(notif: NotifAs<'rollDie'>) {
		const card = DaleCard.of(notif.args.card);
		const parent = DaleCard.divs.get(card.id); //only show die rolls of visible cards
		if (parent) {
			new DaleDie(notif.args.animalfolk_id, notif.args.d6, notif.args.die_label, parent);
		}
	}

	notif_addEffect(notif: NotifAs<'addEffect'>) {
		console.log("notif_addEffect");
		console.log(notif.args.effect);
		const effect = new DbEffect(notif.args.effect);
		console.log(effect);
		DaleCard.addEffect(effect);
	}

	notif_expireEffects(notif: NotifAs<'expireEffects'>){
		console.log("notif_expireEffects");
		const effects = notif.args.effects.map(effect => new DbEffect(effect));
		console.log(effects);
		DaleCard.expireEffects(effects);
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
		else if (arg == 'shuffleToDraw' || arg == 'shuffleToDeck') {
			this.marketDiscard.shuffleToDrawPile(this.marketDeck!)
		}
		else if (arg == 'shuffle') {
			if (this.marketDeck.size < this.marketDiscard.size) {
				this.marketDiscard.shuffleToDrawPile(this.marketDeck!);
			}
			else {
				this.marketDeck.shuffleToDrawPile(this.marketDiscard!);
			}
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
			console.log(DaleCard.getLocalChameleonsJSON());
		}
		else if (arg == 'debugDaleCard') {
			console.log(new DaleCard(notif.args.card_id));
		}
		else if (arg == '') {
			
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