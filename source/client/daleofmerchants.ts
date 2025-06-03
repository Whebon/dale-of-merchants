/*
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * DaleOfMerchants implementation : © Bart Swinkels
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */
/// <amd-module name="bgagame/daleofmerchants"/>

//needed for the IDE
import Gamegui = require('ebg/core/gamegui');
import Counter = require('ebg/counter'); 

//needed for BGA
import "ebg/counter";
import "ebg/stock"; 

import { DaleStock } from './components/DaleStock'
import { Pile } from './components/Pile';
import { HiddenPile } from './components/HiddenPile';
import { DaleCard } from './components/DaleCard';
import { MarketBoard } from './components/MarketBoard'
import { Stall } from './components/Stall'
import { DbCard } from './components/types/DbCard';
import { ChameleonArgs } from './components/types/ChameleonArgs';
import { CardSlot } from './components/CardSlot';
import { MainClientState } from './components/types/MainClientState'
import { Images } from './components/Images';
import { TargetingLine } from './components/TargetingLine'
import { ChameleonTree } from './components/types/ChameleonTree';
import { DbEffect } from './components/types/DbEffect';
import { DaleDeckSelection } from './components/DaleDeckSelection'
import { DaleDie } from './components/DaleDie';
import { DaleIcons } from './components/DaleIcons';
import { CoinManager } from './components/CoinManager';
import { PlayerClock } from './components/PlayerClock';
import { PrivateNotification } from './components/types/PrivateNotification'
import { TranslatableStrings } from './components/types/TranslatableStrings'

/** The root for all of your game code. */
class DaleOfMerchants extends Gamegui
{
	/** For conveniene, each new Pile will add a reference to itself in this array*/
	allPiles: Pile[] = [];

	/** For conveniene, each new DaleStock will add a reference to itself in this array*/
	allDaleStocks: DaleStock[] = [];

	/** For conveniene, each new DaleStock will add a reference to itself in this array*/
	allCardSlots: CardSlot[] = [];

	/** Pile of hidden cards representing the market deck. */
	marketDeck: Pile = new HiddenPile(this, "daleofmerchants-market-deck", 'Supply');

	/** Ordered pile of known cards representing the market discard deck. */
	marketDiscard: Pile = new Pile(this, "daleofmerchants-market-discard", 'Bin');

	/** A clock for each player  */
	playerClocks: Record<number, PlayerClock> = {};

	/** A hand size counter at the overall player board for each player  */
	playerHandSizes: Record<number, Counter> = {};

	/** A hidden draw pile for each player */
	playerDecks: Record<number, HiddenPile> = {};

	/** An open discard pile for each player */
	playerDiscards: Record<number, Pile> = {};

	/** A stall for each player */
	playerStalls: Record<number, Stall> = {};

	/** A schedule for each player */
	playerSchedules: Record<number, DaleStock> = {};

	/** A "stored cards" location for each player */
	playerStoredCards: Record<number, DaleStock> = {};

	/** A hidden draw pile for each player AND the market */
	allDecks: Record<number | 'mark', Pile> = {'mark': this.marketDeck};

	/** Boolean that indicates if myLimbo is currently representing Mono's hand */
	mono_hand_is_visible = false;

	/** The PlayerClock component for this player */
	get myClock(): PlayerClock {
		return this.playerClocks[this.player_id]!;
	}

	/** The Counter component for my handsize */
	get myHandSize(): Counter {
		return this.playerHandSizes[this.player_id]!;
	}

	/** Current player's draw pile (this client's draw pil) */
	get myDeck(): HiddenPile {
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

	/** Current player's schedule (this client's schedule) */
	get mySchedule(): DaleStock {
		return this.playerSchedules[this.player_id]!;
	}

	/** Current player's schedule (this client's stored cards) */
	get myStoredCards(): DaleStock {
		return this.playerStoredCards[this.player_id]!;
	}

	/** Manages everything related to coins and spending */
	coinManager: CoinManager = new CoinManager();

	/** Ordered pile of known cards representing the market discard deck. */
	market: MarketBoard | null = null;

	/** Cards in this client's player hand */
	myHand: DaleStock = new DaleStock();

	/** Cards in this client's limbo card stock */
	myLimbo: DaleStock = new DaleStock();

	/** Arguments for chameleon client states. This card needs to be highlighted while selecting a valid target for it. */
	chameleonArgs: ChameleonArgs | undefined;

	/** Current client state */
	mainClientState: MainClientState = new MainClientState(this);

	/** Class responsible for managing the deck selection page */
	deckSelection: DaleDeckSelection | undefined;

	/** @gameSpecific See {@link Gamegui} for more information. */
	constructor(){
		super();
		console.warn('dale constructor');
	}

	/** @gameSpecific See {@link Gamegui.setup} for more information. */
	override setup(gamedatas: Gamedatas): void
	{
		console.warn( "Starting game setup" );
		console.warn("------ GAME DATAS ------ !")
		console.warn(this.gamedatas)
		console.warn("------------------------")

		//Move play area on top
		if (gamedatas.gamestate.type == 'activeplayer') {
			this.movePlayAreaOnTop(gamedatas.gamestate.active_player);
		}

		//add debug tools
		if (gamedatas.debugMode) {
			this.addCardNameInputField(document.querySelector('.daleofmerchants-debugtools')!, _("Spawn Card"), this.spawnCard.bind(this));
		}

		//hide the "daleofmerchants-hand-limbo-flex" for spectators
		if (this.isSpectator) {
			$("daleofmerchants-hand-limbo-flex")?.classList.add("daleofmerchants-hidden");
		}

		//positioning the svg container
		const svgContainer = $("daleofmerchants-svg-container") as HTMLElement;
		$("overall-content")?.appendChild(svgContainer);
		addEventListener("mousemove", function(this: Window, evt: MouseEvent) { TargetingLine.previousMouseEvent = evt; });

		//initialize the deck selection
		this.deckSelection = new DaleDeckSelection(
			this,
			$("daleofmerchants-page-deck-selection") as HTMLElement,
			$("daleofmerchants-page-game") as HTMLElement,
			gamedatas.inDeckSelection
		);

		//initialize the card types
		DaleCard.init(this, gamedatas.cardTypes);

		//initialize mono (this adds mono to the gamedatas.playerorder)
		this.setupMono(gamedatas);

		//set the unique opponent id
		if (gamedatas.playerorder.length == 2) {
			for (let player_id of gamedatas.playerorder) {
				if (player_id != this.player_id) {
					this.unique_opponent_id = player_id;
				} 
			}
		}

		//initialize the coin counters
		this.coinManager.init(this);

		//initialize the player boards
		for(let player_id in gamedatas.players ){
			let player = gamedatas.players[player_id];

			//clock per player
			this.playerClocks[player_id] = new PlayerClock(this, +player_id);

			//handsize per player
			const handsize_span = document.createElement('span'); 
			const handsize_icon = DaleIcons.getHandIcon();
			const player_board_div = $('player_board_'+player_id)?.querySelector(".player_score")!;
			handsize_icon.id = 'daleofmerchants-myhandsize-icon-'+player_id;
			player_board_div.prepend(handsize_icon);
			player_board_div.prepend(handsize_span);
			handsize_span.innerText = '0';
			// dojo.place( this.format_block('jstpl_hand_size', {
			// 	player: player,
			// 	icon: 
			// } ), player_board_div, 'first');
			this.playerHandSizes[player_id] = new ebg.counter();
			this.playerHandSizes[player_id].create(handsize_span);
			this.playerHandSizes[player_id].setValue(gamedatas.handSizes[player_id]!);
			this.addTooltip('daleofmerchants-myhandsize-icon-'+player_id, _("Number of cards in hand."), '');
			this.addTooltip('icon_point_'+player_id, _("Number of stacks built."), '');

			//maximum stack size
			player_board_div.querySelector(".player_score_value")?.insertAdjacentText('afterend', "/8")
			
			//deck per player
			console.log("Create deck for player "+player_id);
			this.playerDecks[player_id] = new HiddenPile(this, "daleofmerchants-deck-"+player_id, 'Deck', +player_id);
			this.playerDecks[player_id].pushHiddenCards(gamedatas.deckSizes[player_id]!);
			this.allDecks[player_id] = this.playerDecks[player_id];

			//discard pile per player
			this.playerDiscards[player_id] = new Pile(this, "daleofmerchants-discard-"+player_id, 'Discard', +player_id);
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

		if (!this.isSpectator) {
			//initialize the hand
			this.myHand.init(this, $('daleofmerchants-myhand')!, $('daleofmerchants-myhand-wrap')!, _("Your hand"));
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
				console.warn("limboTransitionUpdateDisplay");
				setTimeout(function() {thiz.myLimbo.updateDisplay()}, 1)
				setTimeout(function() {thiz.myHand.updateDisplay()}, 1)
			}
			const onLimboItemCreate = () => {
				const classList = thiz.myLimbo.wrap!.classList;
				if (classList.contains("daleofmerchants-hidden")) {
					classList.remove("daleofmerchants-hidden");
					limboTransitionUpdateDisplay();
				}
			}
			const onLimboItemDelete = () => {
				const classList = thiz.myLimbo.wrap!.classList;
				if (thiz.myLimbo.count() <= 1) {
					setTimeout(() => {
						if (!classList.contains("daleofmerchants-hidden")) {
							classList.add("daleofmerchants-hidden");
							limboTransitionUpdateDisplay();
						}
					}, thiz.myLimbo.duration);
				}
			}

			//initialize limbo
			this.myLimbo.init(this, $('daleofmerchants-mylimbo')!, $('daleofmerchants-mylimbo-wrap')!, _("Limbo"), onLimboItemCreate, onLimboItemDelete);
			this.myLimbo.enableSortItems = false; //this is needed for Mono
			this.myLimbo.wrap!.classList.add("daleofmerchants-hidden");
			this.myLimbo.centerItems = true;
			for (let i in gamedatas.limbo) {
				const card = gamedatas.limbo[i]!;
				this.myLimbo.addDaleCardToStock(DaleCard.of(card));
			}
			this.myLimbo.setSelectionMode('none');
			dojo.setStyle(this.myLimbo.wrap!, 'min-width', 3*Images.CARD_WIDTH_S+'px'); //overrides the #daleofmerchants-mylimbo-wrap style
			dojo.connect( this.myLimbo, 'onClick', this, 'onSelectLimboCard' );
			dojo.connect( this.myLimbo.orderedSelection, 'onSelect', this, 'onSelectLimboCard' );
			dojo.connect( this.myLimbo.orderedSelection, 'onUnselect', this, 'onUnselectLimboCard' );
		}

		//initialize the schedules
		for (let player_id in gamedatas.schedules) {
			const container = $('daleofmerchants-schedule-'+player_id)!
			const wrap = $('daleofmerchants-schedule-wrap-'+player_id)!
			dojo.setStyle(wrap, 'min-width', `${1.75*Images.CARD_WIDTH_S}px`);
			this.playerSchedules[player_id] = new DaleStock();
			this.playerSchedules[player_id].init(this, container, wrap, _("Schedule"));
			this.playerSchedules[player_id].setSelectionMode('none');
			this.playerSchedules[player_id].centerItems = true;
			for (let card_id in gamedatas.schedules[player_id]) {
				const card = gamedatas.schedules[+player_id]![+card_id]!;
				this.playerSchedules[player_id]!.addDaleCardToStock(DaleCard.of(card));
			}
			for (let card_id in gamedatas.schedulesCooldown[player_id]) {
				const card = gamedatas.schedulesCooldown[+player_id]![+card_id]!;
				this.playerSchedules[player_id]!.addDaleCardToStock(DaleCard.of(card));
				DaleCard.scheduleCooldownCardIds.add(+card.id);
			}
		}
		if (!this.isSpectator) {
			dojo.connect(this.mySchedule, 'onClick', this, 'onSelectScheduleCard');
			dojo.connect(this.mySchedule.orderedSelection, 'onSelect', this, 'onSelectScheduleCard');
		}

		//initialize the stored cards
		for (let player_id in gamedatas.storedCards) {
			const container = $('daleofmerchants-stored-cards-'+player_id);
			const wrap = $('daleofmerchants-stored-cards-wrap-'+player_id);
			if (!container || !wrap) {
				console.warn(`Skipped stored cards for ${player_id} (probably a spectator)`);
				console.warn('daleofmerchants-stored-cards-wrap-'+player_id);
				continue;
			}
			dojo.setStyle(wrap, 'min-width', `${1.5*Images.CARD_WIDTH_S}px`);
			this.playerStoredCards[player_id] = new DaleStock();
			this.playerStoredCards[player_id].init(this, container, wrap, _("Stored Cards"));
			this.playerStoredCards[player_id].setSelectionMode('none');
			this.playerStoredCards[player_id].centerItems = true;
			if (typeof gamedatas.storedCards[player_id] == "number") {
				//facedown cards
				const n = gamedatas.storedCards[player_id];
				gamedatas.storedCards[player_id] = {};
				for (let i = 0; i < n; i++) {
					const cardBack = new DaleCard(-i, 0);
					this.playerStoredCards[player_id]!.addDaleCardToStock(cardBack);
					wrap.classList.remove("daleofmerchants-hidden"); //show this section if at least 1 card exists
				}
			}
			else {
				//faceup cards
				const storedCards = gamedatas.storedCards[player_id] as {[card_id: number]: DbCard;};
				for (let card_id in storedCards) {
					const card = storedCards[+card_id]!;
					this.playerStoredCards[player_id]!.addDaleCardToStock(DaleCard.of(card));
					wrap.classList.remove("daleofmerchants-hidden"); //show this section if at least 1 card exists
				}
			}
		}

		//display any effects on the client-side
		console.warn("DbEffects:");
		for (let i in gamedatas.effects) {
			const effect = gamedatas.effects[i]!;
			DaleCard.addEffect(new DbEffect(effect));
		}

		//TODO: safely remove this
		// //fix the zoom for popins
		// const overallContent = $("overall-content")
		// if (overallContent) {
		// 	const zoomValue = getComputedStyle(overallContent).getPropertyValue('--bga-game-zoom');
		// 	if (zoomValue) {
		// 		document.documentElement.style.setProperty('--bga-game-zoom', zoomValue);
		// 	}
		// }

		this.showAnimalfolkSpecificGameComponents();

		// Setup game notifications to handle (see "setupNotifications" method below)
		this.setupNotifications();

		console.warn( "Ending game setup" );
	}

	/**
	 * In solo-mode, create a player panel for Mono and add it to the playerorder
	 */
	setupMono(gamedatas: Gamedatas) {
		//only setup mono in solo games
		if (gamedatas.playerorder.length > 1) {
			console.warn("setupMono skipped (multiplayer game)");
			return;
		}

		//get an existing player panel
		const player_id = gamedatas.playerorder[0] ?? this.getActivePlayers()[0]!;
		const player_panel = $('overall_player_board_' + player_id);
		if (!player_panel) {
			throw new Error("Unable to setup a player panel for Mono");
		}

		//find the mono player, and add it to the playerorder
		let mono = undefined;
		for (let mono_player_id in this.gamedatas.players) {
			if (player_id != +mono_player_id) {
				mono = gamedatas.players[mono_player_id]!;
				gamedatas.playerorder.push(+mono_player_id);
			}
		}
		if (gamedatas.playerorder.length != 2) {
			console.warn(gamedatas.playerorder.length);
			throw new Error(`A solo-game should consists of only 1 player and 1 Mono, found ${gamedatas.playerorder.length} players instead`);
		}
		if (!mono) {
			throw new Error("Mono not found");
		}

		//copy the panel and replace the content with Mono's info
		let xclone = player_panel.outerHTML;
		const player = gamedatas.players[player_id]!;
		xclone = xclone.replaceAll(String(player.id), String(mono.id));
		xclone = xclone.replaceAll(player.name, mono.name);
		xclone = xclone.replaceAll(player.color, mono.color);
		dojo.place(xclone, 'player_boards');
		const avatar = $(`avatar_${mono.id}`);
		if (avatar) {
			avatar.classList.add("daleofmerchants-mono-avatar");
			this.updateTagName(avatar, "div");
		}
	}

	/**
	 * Should be called on refresh and on game start
	 */
	showAnimalfolkSpecificGameComponents() {
		//hacky way of moving the top bar
		if (!this.gamedatas.inDeckSelection) {
			$("daleofmerchants-market-wrap")?.insertAdjacentElement('afterend', $("page-title")!);
		}

		for (let player_id in this.gamedatas.players) {
			//show the storedCards if tree kangaroos are in play
			if (this.gamedatas.animalfolkIds.includes(DaleDeckSelection.ANIMALFOLK_TREEKANGAROOS)) {
				const stored_cards_wrap = $('daleofmerchants-stored-cards-wrap-'+player_id)!;
				stored_cards_wrap.classList.remove("daleofmerchants-hidden");
			}
			//show coins if coin-based animalfolk are in play
			if (this.gamedatas.animalfolkIds.includes(DaleDeckSelection.ANIMALFOLK_TUATARAS)) {
				const coins_wrap = $('daleofmerchants-coins-wrap-'+player_id)!;
				coins_wrap.classList.remove("daleofmerchants-hidden");
			}
			//show clock if coin-based animalfolk are in play
			if (this.gamedatas.animalfolkIds.includes(DaleDeckSelection.ANIMALFOLK_MONGOOSES) ||
				this.gamedatas.animalfolkIds.includes(DaleDeckSelection.ANIMALFOLK_BATS)) {
				const clock_wrap = $('daleofmerchants-clock-wrap-'+player_id)!;
				clock_wrap.classList.remove("daleofmerchants-hidden");
			}
		}
	}

	///////////////////////////////////////////////////
	//// Game & client states
	
	/** @gameSpecific See {@link Gamegui.onEnteringState} for more information. */
	override onEnteringState(stateName: GameStateName, args: CurrentStateArgs): void
	{
		console.warn( 'Entering state: '+stateName );

		if (stateName == 'turnStart' || stateName == 'postCleanUpPhase') {
			this.movePlayAreaOnTop(args.active_player);
		}

		if (this.isSpectator) {
			return;
		}

		if (stateName.substring(0, 6) != 'client' && stateName.substring(0, 9) != 'chameleon') {
			console.warn("Revalidate all local chameleons");
			this.validateChameleonsLocal();
		}

		//IMPORTANT: the following switch-case is for NON-active players
		if (!this.isCurrentPlayerActive()) {
			switch( stateName ){
				case 'playerTurn':
					DaleCard.unbindAllChameleonsLocal();
					this.mainClientState.leaveAll();
					break;
				case 'blindfold':
					const blindfold_args = args.args as { _private?: { card_id?: number } };
					if (blindfold_args._private?.card_id) {
						const card = new DaleCard(blindfold_args._private.card_id);
						this.myHand.setSelectionMode('noneRetainSelection', undefined, 'daleofmerchants-wrap-default', _("Your opponent is guessing the value of ")+card.name);
						this.myHand.orderedSelection.setMaxSize(1);
						this.myHand.selectItem(blindfold_args._private.card_id);
					}
					break;
			}
			return;
		}

		//turn on selection mode(s)
		switch( stateName ){
			case 'turnStart':
				this.mySchedule.setSelectionMode('clickOnTurnStart', undefined, 'daleofmerchants-wrap-technique');
				// The code below automatically plays the only resolvable card in the schedule
				// However, automatic actions lead to the "Move Recorded, Waiting for Update" issue spotted by Sir Thecos
				// const turnStart_unique_card_id = this.mySchedule.getUniqueClickableCardId();
				// if (turnStart_unique_card_id) {
				// 	setTimeout((()=>this.onTriggerTechnique(turnStart_unique_card_id)).bind(this), 1);
				// 	//this.onTriggerTechnique(turnStart_unique_card_id);
				// }
				break;
			case 'postCleanUpPhase':
				this.myHand.setSelectionMode('clickAbilityPostCleanup', 'pileBlue', 'daleofmerchants-wrap-technique', _("Click cards to use <strong>passive abilities</strong>"));
				break;
			case 'playerTurn':
				this.mainClientState.enter();
				break;
			case 'client_purchase':
				this.coinManager.setSelectionMode('implicit', 'daleofmerchants-wrap-purchase', _("Coins in this purchase"));
				this.coinManager.setCoinsToSpendImplicitly(this.myHand.getSelectedDaleCards(), (this.mainClientState.args as ClientGameStates['client_purchase']).cost, true)
				this.myHand.setSelectionMode('multiple', 'pileYellow', 'daleofmerchants-wrap-purchase', _("Click cards to use for <strong>purchasing</strong>"));
				this.market!.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
				this.setPurchaseSelectionModes(this.mainClientState.args as ClientGameStates['client_purchase']);
				this.myStall.setLeftPlaceholderClickable(true);
				break;
			case 'client_technique':
				this.myHand.setSelectionMode('clickTechnique', 'pileBlue', 'daleofmerchants-wrap-technique', _("Click cards to play <strong>techniques</strong>"));
				this.market!.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
				this.myStall.setLeftPlaceholderClickable(true);
				this.mySchedule.setSelectionMode('clickOnFinishAndSnack', undefined, 'daleofmerchants-wrap-technique');
				break;
			case 'client_build':
				this.myHand.setSelectionMode('multiple', 'build', 'daleofmerchants-wrap-build', _("Click cards to <strong>build stacks</strong>"));
				this.market!.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
				this.myStall.selectLeftPlaceholder();
				this.mySchedule.setSelectionMode('clickOvertime');
				this.onBuildSelectionChanged(); //check for nostalgic item
				break;
			case 'client_inventory':
				this.myHand.setSelectionMode('multiple', 'pileRed', 'daleofmerchants-wrap-discard', _("Click cards to <strong>discard</strong>"));
				this.market!.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
				this.myStall.setLeftPlaceholderClickable(true);
				break;
			case 'client_essentialPurchase':
				const client_essentialPurchase_args = (this.mainClientState.args as ClientGameStates['client_essentialPurchase']);	
				this.setPurchaseSelectionModes(client_essentialPurchase_args);
				this.myHand.unselectAll();
				this.myHand.setSelectionMode('essentialPurchase', 'toss', 'daleofmerchants-wrap-purchase', _("Choose up to 3 junk cards to <strong>toss</strong>"), 'pileYellow');
				let junk_selected = 0;
				let client_essentialPurchase_skip = true;
				for (let card_id of client_essentialPurchase_args.funds_card_ids!.slice().reverse()) {
					this.myHand.selectItem(card_id, true);
					if (junk_selected < 3 && new DaleCard(card_id).isJunk()) {
						this.myHand.selectItem(card_id);
						junk_selected++;
					}
					if (new DaleCard(card_id).isEffectiveJunk()) {
						client_essentialPurchase_skip = false;
					}
				}
				if (client_essentialPurchase_skip) {
					this.onPurchase();
				}
				break;
			case 'client_glue':	
				const client_glue_args = (this.mainClientState.args as ClientGameStates['client_glue']);
				this.setPurchaseSelectionModes(client_glue_args);
				this.myHand.unselectAll();
				this.myHand.setSelectionMode('glue', 'hand', 'daleofmerchants-wrap-purchase', _("Choose Glue cards to keep in your hand"), 'pileYellow');
				for (let card_id of client_glue_args.funds_card_ids!.slice().reverse()) {
					this.myHand.selectItem(card_id, true);
					if (new DaleCard(card_id).effective_type_id == DaleCard.CT_GLUE) {
						this.myHand.selectItem(card_id);
					}
				}
				break;
			case 'bonusBuild':
				const bonusBuild_args = args.args as { is_first_build: number };
				const bonusBuildLabel = bonusBuild_args.is_first_build ? 
					_("Click cards to <strong>build stacks</strong>") :
					_("Click cards to <strong>build additional stacks</strong>");
				this.myHand.setSelectionMode('multiple', 'build', 'daleofmerchants-wrap-build', bonusBuildLabel);
				this.myStall.selectLeftPlaceholder();
				this.onBuildSelectionChanged(); //check for nostalgic item
				break;
			case 'client_swiftBroker':
				this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose the order to discard your hand"));
				break;
			case 'client_shatteredRelic':
				this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
				break;
			case 'spyglass':
				this.myLimbo.setSelectionMode('multiple', 'spyglass', 'daleofmerchants-wrap-technique',
					this.format_dale_icons(_("Choose a card to take (ICON)"), DaleIcons.getSpyglassIcon())
				);
				break;
			case 'client_acorn':
			case 'client_velocipede':
				let client_acorn_targets: DaleCard[] = [];
				for (let player_id in this.gamedatas.players) {
					if (stateName == 'client_velocipede' || +player_id != this.player_id) {
						client_acorn_targets = client_acorn_targets.concat(this.playerStalls[player_id]!.getCardsInStall());
					}
				}
				const client_acorn_args = (this.mainClientState.args as ClientGameStates['client_acorn']);
				new TargetingLine(
					new DaleCard(client_acorn_args.technique_card_id),
					client_acorn_targets,
					"daleofmerchants-line-source-technique",
					"daleofmerchants-line-target-technique",
					"daleofmerchants-line-technique",
					(source_id: number) => this.onCancelClient(),
					(source_id: number, target_id: number) => this.onAcorn(source_id, target_id)
				)
				break;
			case 'client_giftVoucher':
				const client_giftVoucher_args = (this.mainClientState.args as ClientGameStates['client_giftVoucher']);
				new TargetingLine(
					new DaleCard(client_giftVoucher_args.technique_card_id),
					this.market!.getCards(),
					"daleofmerchants-line-source-technique",
					"daleofmerchants-line-target-technique",
					"daleofmerchants-line-technique",
					(source_id: number) => this.onCancelClient(),
					(source_id: number, target_id: number) => this.onGiftVoucher(source_id, target_id)
				)
				break;
			case 'client_loyalPartner':
				this.market!.setSelectionMode(2, 'pileBlue', "daleofmerchants-wrap-technique");
				break;
			case 'client_prepaidGood':
				this.market!.setSelectionMode(1, undefined, "daleofmerchants-wrap-technique");
				break;
			case 'specialOffer':
				this.myLimbo.setSelectionMode('multiple', 'cheese', 'daleofmerchants-wrap-technique', 
					this.format_dale_icons(_("Choose a card to take (ICON)"), DaleIcons.getCheeseIcon())
				);
				break;
			case 'client_rottenFood':
				for (const [player_id, deck] of Object.entries(this.allDecks)) {
					if (+player_id != this.player_id) {
						deck.setSelectionMode('noneCantViewContent');
					}
				}
				this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to give"));
				break;
			case 'dirtyExchange':
				this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to give"));
				break;
			case 'sabotage':
				this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
				break;
			case 'client_treasureHunter':
				const client_treasureHunter_args = (this.mainClientState.args as ClientGameStates['client_treasureHunter']);
				const client_treasureHunter_targets: DaleCard[] = [];
				for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
					if (+player_id != +this.player_id && pile.size > 0) {
						pile.setSelectionMode('noneCantViewContent');
						client_treasureHunter_targets.push(pile.peek()!);
					}
				}
				if (client_treasureHunter_targets.length == 0) {
					throw new Error("No valid targets for Treasure Hunter ('client_fizzle' should have been entered instead of 'client_treasureHunter')");
				}
				setTimeout((() => {
					new TargetingLine(
						new DaleCard(client_treasureHunter_args.technique_card_id),
						client_treasureHunter_targets,
						"daleofmerchants-line-source-technique",
						"daleofmerchants-line-target-technique",
						"daleofmerchants-line-technique",
						(source_id: number) => this.onCancelClient(),
						(source_id: number, target_id: number) => this.onTreasureHunter(target_id)
					)
				}).bind(this), 500);
				break;
			case 'client_newSeason':
				this.myDiscard.setSelectionMode('singleAnimalfolk', undefined, 'daleofmerchants-wrap-technique');
				break;
			case 'client_accident':
				this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose the order to discard your hand"));
				break;
			case 'client_blindfold':
				if (this.unique_opponent_id) {
					this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card"));
				}
				else {
					this.myHand.setSelectionMode('single', undefined, 'daleofmerchants-wrap-technique', _("Choose a card"));
				}
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
				new TargetingLine(
					this.chameleonArgs!.firstSource,
					this.chameleonArgs!.currentTargets,
					"daleofmerchants-line-source-chameleon",
					"daleofmerchants-line-target-chameleon",
					"daleofmerchants-line-chameleon",
					(source_id: number) => this.onCancelClient(),
					(source_id: number, target_id: number) => this.onConfirmChameleon(target_id),
					this.chameleonArgs!.pile
				)
				break;
			case 'client_marketDiscovery':
				this.marketDeck.setSelectionMode('top', undefined, 'daleofmerchants-wrap-technique');
				this.marketDiscard.setSelectionMode('top', undefined, 'daleofmerchants-wrap-purchase');
				break;
			case 'client_calculations':
				this.market!.setSelectionMode(1, undefined, 'daleofmerchants-wrap-technique');
				break;
			case 'client_safetyPrecaution':
				const client_safetyPrecaution_args = (this.mainClientState.args as ClientGameStates['client_safetyPrecaution']);
				new TargetingLine(
					new DaleCard(client_safetyPrecaution_args.technique_card_id),
					this.myStall.getCardsInStall(),
					"daleofmerchants-line-source-technique",
					"daleofmerchants-line-target-technique",
					"daleofmerchants-line-technique",
					(source_id: number) => this.onCancelClient(),
					(source_id: number, target_id: number) => this.onSafetyPrecaution(source_id, target_id)
				)
				break;
			case 'magnet':
				const magnet_args = args.args as { _private: { cards: DbCard[] } };
				this.myDeck.setContent(magnet_args._private.cards.map(DaleCard.of));
				this.myDeck.setSelectionMode('single');
				break;
			case 'dangerousTest':
				this.myHand.setSelectionMode('multiple3', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 3 cards to discard"));
				break;
			case 'client_shoppingJourney':
				this.market!.setSelectionMode(1, undefined, "daleofmerchants-wrap-technique");
				break;
			case 'client_houseCleaning':
				const client_houseCleaning_args = (this.mainClientState.args as ClientGameStates['client_houseCleaning']);
				this.myDiscard.setSelectionMode('multipleJunk', 'hand', "daleofmerchants-wrap-technique", client_houseCleaning_args.nbr_junk);
				if (client_houseCleaning_args.nbr_junk > 0) {
					this.myDiscard.openPopin();
				}
				break;
			case 'client_houseCleaningToss':
				this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
				break;
			case 'client_siesta':
				this.myDiscard.setSelectionMode('single', 'hand', "daleofmerchants-wrap-technique");
				break;
			case 'nightShift':
				for (const deck of Object.values(this.playerDecks)) {
					deck.setSelectionMode('noneCantViewContent');
				}
				this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to place back"));
				break;
			case 'client_ruthlessCompetition':
				const client_ruthlessCompetition_args = (this.mainClientState.args as ClientGameStates['client_ruthlessCompetition']);
				const client_ruthlessCompetition_targets: HTMLElement[] = [];
				for (let player_id of this.gamedatas.playerorder) {
					if ((player_id != this.player_id) && this.playerDiscards[player_id]!.size + this.playerDecks[player_id]!.size > 0) {
						const deck = this.playerDecks[player_id]!;
						deck.setSelectionMode('noneCantViewContent');
						const client_ruthlessCompetition_target = deck.topCardHTML ?? deck.placeholderHTML;
						client_ruthlessCompetition_targets.push(client_ruthlessCompetition_target);
						client_ruthlessCompetition_target.dataset['target_id'] = String(player_id);
					}
				}
				if (client_ruthlessCompetition_targets.length == 0) {
					throw new Error("No valid targets ('client_fizzle' should have been entered instead of 'client_ruthlessCompetition')");
				}
				else if (client_ruthlessCompetition_targets.length == 1) {
					this.onRuthlessCompetition(+client_ruthlessCompetition_targets[0]!.dataset['target_id']!);
				}
				else {
					setTimeout((() => {
						new TargetingLine(
							new DaleCard(client_ruthlessCompetition_args.technique_card_id),
							client_ruthlessCompetition_targets,
							"daleofmerchants-line-source-technique",
							"daleofmerchants-line-target-technique",
							"daleofmerchants-line-technique",
							(source_id: number) => this.onCancelClient(),
							(source_id: number, target_id: number) => this.onRuthlessCompetition(target_id)
						)
					}).bind(this), 500);
				}
				break;
			case 'ruthlessCompetition':
				this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to place back"));
				break;
			case 'cunningNeighbour':
				this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', _("Opponent's hand"));
				break;
			case 'charity':
			case 'rumours':
				this.myLimbo.setSelectionMode('single', undefined, 'daleofmerchants-wrap-technique', _("Choose a card"));
				break;
			case 'deprecated_tasters':
				this.market!.setSelectionMode(1, undefined, "daleofmerchants-wrap-technique");
				break;
			case 'tasters':
				this.market!.setSelectionMode(2, 'cheese', "daleofmerchants-wrap-technique");
				this.market!.orderedSelection.setMaxSize(1);
				break;
			case 'daringAdventurer':
				const daringAdventurer_args = args.args as { die_value: number };
				this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to discard"));
				this.myHand.orderedSelection.setMaxSize(daringAdventurer_args.die_value);
				break;
			case 'client_rareArtefact':
				const client_rareArtefact_args = (this.mainClientState.args as ClientGameStates['client_rareArtefact']);
				setTimeout((() => {
					new TargetingLine(
						new DaleCard(client_rareArtefact_args.technique_card_id),
						this.myHand.getAllItems().map(item => new DaleCard(item.id)),
						"daleofmerchants-line-source-technique",
						"daleofmerchants-line-target-technique",
						"daleofmerchants-line-technique",
						(source_id: number) => this.onCancelClient(),
						(source_id: number, target_id: number) => this.onRareArtefact(target_id)
					)
				}).bind(this), 500);
				break;
			case 'client_swank':
				this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
				break;
			case 'naturalSurvivor':
				const naturalSurvivor_args = args.args as { _private: { cards: DbCard[] }, die_value: number };
				this.myDeck.setContent(naturalSurvivor_args._private.cards.map(DaleCard.of));
				this.myDeck.setSelectionMode('multiple', 'naturalSurvivor', 'daleofmerchants-wrap-technique', naturalSurvivor_args.die_value);
				this.myHand.setSelectionMode('multiple', 'naturalSurvivor', 'daleofmerchants-wrap-technique', undefined, undefined, naturalSurvivor_args.die_value);
				break;
			case 'duplicateEntry':
				const duplicateEntry_args = args.args as { _private: { cards: DbCard[] } };
				this.myDeck.setContent(duplicateEntry_args._private.cards.map(DaleCard.of));
				this.myDeck.setSelectionMode('multiple', 'duplicateEntry', 'daleofmerchants-wrap-technique', 2);
				this.myDeck.openPopin();
				//early setup for badOmen
				this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>")); 
				break;
			case 'client_historyLesson':
				this.myDiscard.setSelectionMode('multipleFromTopWithGaps', 'historyLesson', 'daleofmerchants-wrap-technique', 3);
				this.myDiscard.openPopin();
				break;
			case 'culturalPreservation':
				const culturalPreservation_args = args.args as { _private: { cards: DbCard[] } };
				this.myDeck.setContent(culturalPreservation_args._private.cards.map(DaleCard.of));
				this.myDeck.setSelectionMode('multiple', 'spyglass', 'daleofmerchants-wrap-technique', 3);
				this.myDeck.openPopin();
				break;
			case 'client_sliceoflife':
				this.myHand.setSelectionMode('multiple2', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 2 cards to discard"));
				break;
			case 'client_spinningWheel':
				this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 1-3 cards to discard"), undefined, 3);
				break;
			case 'refreshingDrink':
				this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to discard"));
				break;
			case 'delightfulSurprise':
				this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to take"));
				break;
			case 'client_replacement':
				this.myHand.setSelectionMode('clickAnimalfolk', undefined, 'daleofmerchants-wrap-technique', _("Choose an animalfolk card to <strong>toss</strong>"));
				break;
			case 'replacement':
				const replacement_args = args.args as { value: number };
				this.market!.setSelectionMode(1, undefined, 'daleofmerchants-wrap-technique');
				this.market!.setClickableForReplacement(replacement_args.value);
				break;
			case 'client_fashionHint':
				this.marketDeck.setSelectionMode('top', undefined, 'daleofmerchants-wrap-technique');
				this.marketDiscard.setSelectionMode('top', undefined, 'daleofmerchants-wrap-technique');
				break;
			case 'fashionHint':
				const fashionHint_args = args.args as { card_id: number, card_name: string };
				new TargetingLine(
					new DaleCard(fashionHint_args.card_id),
					this.myHand.getAllItems().map(item => new DaleCard(item.id)).filter(card => card.isAnimalfolk()),
					"daleofmerchants-line-source-technique",
					"daleofmerchants-line-target-technique",
					"daleofmerchants-line-technique",
					(source_id: number) => this.onFashionHintSwapSkip(),
					(source_id: number, target_id: number) => this.onFashionHintSwap(target_id)
				)
				this.myDiscard.setSelectionMode('noneCantViewContent');
				this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', _("Choose an animalfolk card to swap with ")+fashionHint_args.card_name);
				break;
			case 'royalPrivilege':
				this.market!.setSelectionMode(1, undefined, 'daleofmerchants-wrap-purchase');
				this.myHand.setSelectionMode('singleAnimalfolk', 'toss', 'daleofmerchants-wrap-purchase', _("Choose an animalfolk card to toss"));
				break;
			case 'client_carefreeSwapper':
				const client_carefreeSwapper_args = (this.mainClientState.args as ClientGameStates['client_carefreeSwapper']);
				const client_carefreeSwapper_targets: DaleCard[] = [];
				for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
					if (+player_id != +this.player_id && pile.size > 0) {
						pile.setSelectionMode('noneCantViewContent');
						client_carefreeSwapper_targets.push(pile.peek()!);
					}
				}
				if (client_carefreeSwapper_targets.length == 0) {
					throw new Error("No valid targets for Carefree Swapper ('client_fizzle' should have been entered instead of 'client_carefreeSwapper')");
				}
				setTimeout((() => {
					new TargetingLine(
						new DaleCard(client_carefreeSwapper_args.technique_card_id),
						client_carefreeSwapper_targets,
						"daleofmerchants-line-source-technique",
						"daleofmerchants-line-target-technique",
						"daleofmerchants-line-technique",
						(source_id: number) => this.onCancelClient(),
						(source_id: number, target_id: number) => this.onCarefreeSwapper(target_id)
					)
				}).bind(this), 500);
				break;
			case 'client_matchingColours':
				//TODO: safely remove the 'whitelist' idea. It is better to let the player click on ANY card, not just the valid cards. The error message will guide them.
				//const client_matchingColours_args = (this.mainClientState.args as ClientGameStates['client_matchingColours']);
				//this.myHand.setWhitelist(this.getMatchingColoursHandTargets(client_matchingColours_args.technique_card_id));
				this.myHand.setSelectionMode('clickAnimalfolk', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to swap"));
				break;
			case 'client_cleverGuardian':
				this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>store</strong>"));
				break;
			case 'client_barricade':
				const client_barricade_args = (this.mainClientState.args as ClientGameStates['client_barricade']);
				this.myDiscard.setSelectionMode('multipleJunk', 'hand', "daleofmerchants-wrap-technique", client_barricade_args.nbr_junk);
				if (client_barricade_args.nbr_junk > 0) {
					this.myDiscard.openPopin();
				}
				break;
			case 'wheelbarrow':
				this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', _("Top card of your deck"));
				break;
			case 'vigilance':
				const vigilance_args = args.args as { _private: { cards: DbCard[] } };
				this.myDeck.setContent(vigilance_args._private.cards.map(DaleCard.of));
				this.myDeck.setSelectionMode('single');
				break;
			case 'tacticalMeasurement':
				this.myHand.setSelectionMode('multiple2', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 2 cards"));
				break;
			case 'meddlingMarketeer':
				this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to discard"));
				break;
			case 'client_meddlingMarketeer':
				this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to place on your deck"));
				break;
			case 'client_alternativePlan':
				this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
				break;
			case 'anchor':
			case 'shakyEnterprise':
				for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
					discard.setSelectionMode('noneCantViewContent');
				}
				this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to give"));
				break;
			case 'client_anchor':
				this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to place on your deck"));
				break;
			case 'manufacturedJoy':
				const manufacturedJoy_args = args.args as { _private: { cards: DbCard[] } };
				if (manufacturedJoy_args._private.cards.length == 0) {
					//no "enterOnStack", since we never want to return to this state
					this.mainClientState.enter('client_manufacturedJoy', {
						draw_card_id: -1,
						card_name: "Manufactured Joy"
					});
					return;
				}
				this.myDeck.setContent(manufacturedJoy_args._private.cards.map(DaleCard.of));
				this.myDeck.setSelectionMode('single');
				break;
			case 'client_manufacturedJoy':
				for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
					discard.setSelectionMode('noneCantViewContent');
				}
				this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to give"));
				break;
			case 'client_shakyEnterprise':
				this.myDiscard.setSelectionMode('multipleFromTopWithGaps', 'hand', 'daleofmerchants-wrap-technique', 3);
				this.myDiscard.openPopin();
				break;
			case 'client_spend':
				const client_spend_args = (this.mainClientState.args as ClientGameStates['client_spend']);
				const client_spend_wrap_class = client_spend_args.wrap_class ?? 'daleofmerchants-wrap-purchase';
				const client_spend_icon_type = client_spend_wrap_class == 'daleofmerchants-wrap-purchase' ? 'pileYellow' : 'pileBlue';
				this.coinManager.setSelectionMode('implicit', client_spend_wrap_class, _("Coins included"));
				this.coinManager.setCoinsToSpendImplicitly(this.myHand.getSelectedDaleCards(), client_spend_args.cost)
				this.myHand.setSelectionMode('multiple', client_spend_icon_type, client_spend_wrap_class, _("Choose cards to <strong>spend</strong>"));
				if ('passive_card_id' in this.mainClientState.args) {
					this.mySchedule.setSelectionMode('clickOnFinishAndSnack', undefined, 'daleofmerchants-wrap-technique');
				}
				break;
			case 'client_spendx':
				const client_spendx_args = (this.mainClientState.args as ClientGameStates['client_spend']);
				const client_spendx_wrap_class = client_spendx_args.wrap_class ?? 'daleofmerchants-wrap-purchase';
				const client_spendx_icon_type = client_spendx_wrap_class == 'daleofmerchants-wrap-purchase' ? 'pileYellow' : 'pileBlue';
				this.coinManager.setSelectionMode('explicit', client_spendx_wrap_class, _("Click to add coins"));
				this.myHand.setSelectionMode('multiple', client_spendx_icon_type, client_spendx_wrap_class, _("Choose cards to <strong>spend</strong>"));
				if ('passive_card_id' in this.mainClientState.args) {
					this.mySchedule.setSelectionMode('clickOnFinishAndSnack', undefined, 'daleofmerchants-wrap-technique');
				}
				break;
			case 'client_stove':
				const client_stove_args = (this.mainClientState.args as ClientGameStates['client_stove']);	
				this.coinManager.setSelectionMode('explicit', 'daleofmerchants-wrap-purchase', _("Click to add coins"));
				this.myHand.unselectAll();
				this.myHand.setSelectionMode('multipleExceptSecondary', 'pileYellow', 'daleofmerchants-wrap-purchase', _("Choose cards to <strong>spend</strong>"), 'build');
				for (let card_id of client_stove_args.stack_card_ids!.slice().reverse()) {
					this.myHand.selectItem(card_id, true);
				}
				const client_stove_discard_nbr = client_stove_args.stack_card_ids_from_discard?.length ?? 0;
				if (client_stove_discard_nbr > 0) {
					this.myDiscard.setSelectionMode('multipleProgrammatic', 'build', 'daleofmerchants-wrap-build', )
					for (let card_id of client_stove_args.stack_card_ids_from_discard!.slice().reverse()) {
						this.myDiscard.selectItem(card_id);
					}
					this.myDiscard.updateHTMLPublic();
				}
				break;
			case 'charmStove':
				this.coinManager.setSelectionMode('explicit', 'daleofmerchants-wrap-purchase', _("Click to add coins"));
				this.myHand.setSelectionMode('multiple', 'pileYellow', 'daleofmerchants-wrap-purchase', _("Choose cards to <strong>spend</strong>"), 'build');
				break;
			case 'client_cache':
				this.myDiscard.setSelectionMode('single', undefined, 'daleofmerchants-wrap-technique');
				break;
			case 'resourcefulAlly':
				this.myDiscard.setSelectionMode('multiple', 'resourcefulAlly', 'daleofmerchants-wrap-technique', 2);
				this.myDiscard.openPopin();
				break;
			case 'travelingEquipment':
				const travelingEquipment_label = this.format_dale_icons(
					_("Choose cards to <strong>toss</strong> (ICON) and discard (ICON)"),
					DaleIcons.getTravelingEquipmentTossIcon(),
					DaleIcons.getTravelingEquipmentDiscardIcon()
				);
				this.myHand.setSelectionMode('multiple2', 'travelingEquipment', 'daleofmerchants-wrap-technique', travelingEquipment_label);
				break;
			case 'fishing':
				this.myDiscard.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', 3);
				this.myDiscard.openPopin();
				break;
			case 'client_groundbreakingIdea':
				this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
				break;
			case 'groundbreakingIdea':
				this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
				break;
			case 'insight':
				this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to place on your deck"))
				break;
			case 'badOmen':
				this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
				break;
			case 'client_badOmen':
				this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to place on your deck"));
				break;
			case 'celestialGuidanceMarket':
				this.market!.setSelectionMode(1, undefined, "daleofmerchants-wrap-technique");
				break;
			case 'celestialGuidanceDiscard':
				this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
				break;
			case 'fumblingDreamer':
				const fumblingDreamer_args = args.args as {die_value1: number, die_value2: number};
				if (fumblingDreamer_args.die_value1 == DaleDie.DIE_DISCARD) {
					for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
						discard.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
					}
				}
				if (fumblingDreamer_args.die_value1 == DaleDie.DIE_DECK) {
					for (const [player_id, deck] of Object.entries(this.playerDecks)) {
						deck.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
					}
				}
				break;
			case 'client_selectPlayerPassive':
				const client_selectPlayerPassive_args = this.mainClientState.args as ClientGameStates['client_selectPlayerPassive'];
				if (client_selectPlayerPassive_args.via_deck) {
					for (const [player_id, deck] of Object.entries(this.playerDecks)) {
						deck.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
					}
				}
				break;
			case 'bouquets':
				this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to place on your deck"));
				break;
			case 'client_selectingContracts':
				this.myDiscard.setSelectionMode('multipleFromTopWithGaps', 'selectingContracts', "daleofmerchants-wrap-technique", 
					(this.mainClientState.args as ClientGameStates['client_selectingContracts']).nbr
				);
				this.myDiscard.openPopin();
				break;
			case 'trigger':
				this.mySchedule.setSelectionMode('clickOnTrigger', undefined, 'daleofmerchants-wrap-technique');
				break;
			case 'client_windOfChange':
				this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
				break;
			case 'client_bonsai':
				this.myHand.setSelectionMode('multipleJunk', 'pileBlue', "daleofmerchants-wrap-technique", _("Choose 2 junk cards to discard"), undefined, 2);
				break;
			case 'rake':
				this.setMainTitle(this.format_dale_icons($('pagemaintitletext')!.innerHTML,
					DaleIcons.getTossIcon(),
					DaleIcons.getBluePileIcon(0)
				));
				const raket_args = args.args as { _private: { cards: DbCard[] } };
				this.myDeck.setContent(raket_args._private.cards.map(DaleCard.of));
				this.myDeck.setSelectionMode('multiplePrimarySecondary', 'toss', "daleofmerchants-wrap-technique", 1, 'pileBlue', 2);
				this.myDeck.openPopin();
				break;
			case 'client_generationChange':
				if (this.myDiscard.size > 0) {
					this.myDiscard.setSelectionMode('multiple', 'hand', 'daleofmerchants-wrap-technique', 2);
					this.myDiscard.openPopin();
				}
				break;
		}
		//(~enteringstate)
	}

	/** @gameSpecific See {@link Gamegui.onLeavingState} for more information. */
	override onLeavingState(stateName: GameStateName): void
	{
		console.warn( 'Leaving state: '+stateName );

		if (this.isSpectator) {
			return;
		}
		
		if (this.chameleonArgs && stateName.substring(0, 9) != 'chameleon') {
			console.warn("this.chameleonArgs => don't turn off selection modes");
			return;
		}

		if (this.gamedatas.gamestate.args && 'passive_card_id' in this.gamedatas.gamestate.args) {
			this.setPassiveSelected((this.gamedatas.gamestate.args as any).passive_card_id, false);
		}

		//turn off selection mode(s)
		switch( stateName )
		{
			case 'turnStart':
				this.mySchedule.setSelectionMode('none');
				break;
			case 'cleanUpPhase':
				this.mainClientState.leaveAndDontReturn();
				break;
			case 'postCleanUpPhase':
				this.myHand.setSelectionMode('none');
				break;
			case 'client_purchase':
				const client_purchase_args = (this.mainClientState.args as ClientGameStates['client_purchase']);
				this.coinManager.setSelectionMode('none');
				this.market!.unselectAll();
				this.market!.setSelectionMode(0);
				this.marketDiscard.unselectTopCard();
				this.marketDiscard.setSelectionMode('none');
				this.myHand.setSelectionMode('none');
				this.myStall.setLeftPlaceholderClickable(false);
				if (client_purchase_args.optionalArgs?.calculations_card_ids === undefined) {
					this.market!.restoreArrangement();
				}
				break;
			case 'client_technique':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode('none');
				this.myStall.setLeftPlaceholderClickable(false);
				this.mySchedule.setSelectionMode('none');
				break;
			case 'client_build':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode('none');
				this.myStall.unselectLeftPlaceholder();
				this.myDiscard.setSelectionMode('none');
				this.mySchedule.setSelectionMode('none');
				break;
			case 'client_inventory':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode('none');
				this.myStall.setLeftPlaceholderClickable(false);
				break;
			case 'client_essentialPurchase':	
				this.market!.setSelectionMode(0);
				this.myHand.orderedSelection.secondaryToPrimary();
				break;
			case 'client_glue':
				this.market!.setSelectionMode(0);
				this.myHand.orderedSelection.secondaryToPrimary();
				break;
			case 'bonusBuild':
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
				TargetingLine.remove();
				break;
			case 'client_giftVoucher':
				TargetingLine.remove();
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
				TargetingLine.remove();
				break;
			case 'dirtyExchange':
				this.myHand.setSelectionMode('none');
				break;
			case 'sabotage':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'client_treasureHunter':
			case 'client_carefreeSwapper':
				for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
					if (+player_id != +this.player_id && pile.size > 0) {
						pile.setSelectionMode('none');
					}
				}
				TargetingLine.remove();
				break;
			case 'client_newSeason':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'client_accident':
				this.myHand.setSelectionMode('none');
				break;
			case 'client_blindfold':
				this.myHand.setSelectionMode('none');
				break;
			case 'blindfoldDecideValue':
				this.myHand.setSelectionMode('none');
				break;
			case 'chameleon_reflection':
				TargetingLine.remove();
				for (const [player_id, pile] of Object.entries(this.playerDiscards)) {
					if (+player_id != +this.player_id) {
						pile.setSelectionMode('none');
					}
				}
				break;
			case 'chameleon_goodoldtimes':
				TargetingLine.remove();
				this.marketDeck.setSelectionMode('none');
				this.marketDiscard.setSelectionMode('none');
				break;
			case 'chameleon_flexibleShopkeeper':
			case 'chameleon_trendsetting':
			case 'chameleon_seeingdoubles':
				TargetingLine.remove();
				break;
			case 'client_marketDiscovery':
				this.marketDeck.setSelectionMode('none');
				this.marketDiscard.setSelectionMode('none');
				break;
			case 'client_calculations':
				const client_calculations_to_client_purchase_args = (this.mainClientState.args as ClientGameStates['client_purchase']);
				this.market!.setSelectionMode(0);
				TargetingLine.remove();
				if (client_calculations_to_client_purchase_args.optionalArgs?.calculations_card_ids === undefined) {
					this.market!.restoreArrangement();
				}
				break;
			case 'client_safetyPrecaution':
				TargetingLine.remove();
				break;
			case 'magnet':
				this.myDeck.hideContent();
				this.myDeck.setSelectionMode('none');
				break;
			case 'dangerousTest':
				this.myHand.setSelectionMode('none');
				break;
			case 'client_shoppingJourney':
				this.market!.setSelectionMode(0);
				break;
			case 'client_houseCleaning':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'client_houseCleaningToss':
				this.myHand.setSelectionMode('none');
				break;
			case 'client_siesta':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'nightShift':
				for (const deck of Object.values(this.playerDecks)) {
					deck.setSelectionMode('none');
				}
				this.myLimbo.setSelectionMode('none');
				TargetingLine.remove();
				break;
			case 'client_ruthlessCompetition':
				for (const [player_id, deck] of Object.entries(this.playerDecks)) {
					if (+player_id != +this.player_id && deck.size > 0) {
						deck.setSelectionMode('none');
					}
				}
				TargetingLine.remove();
				break;
			case 'ruthlessCompetition':
				this.myHand.setSelectionMode('none');
				break;
			case 'cunningNeighbour':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'deprecated_cheer':
				this.myDeck.hideContent();
				this.myDeck.setSelectionMode('none');
				break;
			case 'client_blindfold':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'charity':
			case 'rumours':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'deprecated_tasters':
				this.market!.setSelectionMode(0);
				break;
			case 'tasters':
				this.market!.setSelectionMode(0);
				break;
			case 'daringAdventurer':
				this.myHand.setSelectionMode('none');
				break;
			case 'client_swank':
				this.myHand.setSelectionMode('none');
				break;
			case 'naturalSurvivor':
				this.myDeck.hideContent();
				this.myDeck.setSelectionMode('none');
				this.myHand.setSelectionMode('none');
				break;
			case 'duplicateEntry':
				this.myDeck.hideContent();
				this.myDeck.setSelectionMode('none');
				break;
			case 'client_historyLesson':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'culturalPreservation':
				this.myDeck.hideContent();
				this.myDeck.setSelectionMode('none');
				break;
			case 'client_sliceoflife':
				this.myHand.setSelectionMode('none');
				break;
			case 'client_spinningWheel':
				this.myHand.setSelectionMode('none');
				break;
			case 'refreshingDrink':
				this.myHand.setSelectionMode('none');
				break;
			case 'delightfulSurprise':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'client_replacement':
				this.myHand.setSelectionMode('none');
				break;
			case 'replacement':
				this.market!.setSelectionMode(0);
				break;
			case 'client_fashionHint':
				this.marketDeck.setSelectionMode('none');
				this.marketDiscard.setSelectionMode('none');
				break;
			case 'fashionHint':
				TargetingLine.remove();
				this.myDiscard.setSelectionMode('none');
				this.myHand.setSelectionMode('none');
				break;
			case 'royalPrivilege':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode('none');
				break;
			case 'pompousProfessional':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'delicacy':
			case 'umbrella':
				TargetingLine.remove();
				this.myLimbo.setSelectionMode('none');
				break;
			case 'client_velocipede':
				TargetingLine.remove();
				break;
			case 'client_matchingColours':
				this.myHand.setSelectionMode('none');
				TargetingLine.remove();
				break;
			case 'client_cleverGuardian':
				this.myHand.setSelectionMode('none');
				break;
			case 'client_barricade':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'wheelbarrow':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'vigilance':
				this.myDeck.hideContent();
				this.myDeck.setSelectionMode('none');
				break;
			case 'tacticalMeasurement':
				this.myHand.setSelectionMode('none');
				break;
			case 'meddlingMarketeer':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'client_meddlingMarketeer':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'client_alternativePlan':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'anchor':
			case 'shakyEnterprise':
				for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
					discard.setSelectionMode('none');
				}
				this.myLimbo.setSelectionMode('none');
				TargetingLine.remove();
				break;
			case 'client_anchor':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'manufacturedJoy':
				this.myDeck.hideContent();
				this.myDeck.setSelectionMode('none');
				break;
			case 'client_manufacturedJoy':
				for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
					discard.setSelectionMode('none');
				}
				this.myHand.setSelectionMode('none');
				TargetingLine.remove();
				//edge case: in replay, on an empty deck, 'manufacturedJoy' -> 'client_manufacturedJoy', without leaving the client state
				if (this.mainClientState.name == 'client_manufacturedJoy') {
					this.mainClientState.leaveAndDontReturn();
				}
				break;
			case 'client_shakyEnterprise':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'client_spend':
				this.coinManager.setSelectionMode('none');
				this.myHand.setSelectionMode('none');
				this.mySchedule.setSelectionMode('none');
				break;
			case 'client_spendx':
				this.coinManager.setSelectionMode('none');
				this.myHand.setSelectionMode('none');
				this.mySchedule.setSelectionMode('none');
				break;
			case 'client_stove':
				this.coinManager.setSelectionMode('none');
				this.myHand.orderedSelection.secondaryToPrimary();
				break;
			case 'charmStove':
				this.myLimbo.setSelectionMode('none');
				this.coinManager.setSelectionMode('none');
				this.myHand.setSelectionMode('none');
				break;
			case 'client_cache':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'resourcefulAlly':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'travelingEquipment':
				this.myHand.setSelectionMode('none');
				break;
			case 'fishing':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'client_groundbreakingIdea':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'groundbreakingIdea':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'insight':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'badOmen':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'client_badOmen':
				this.myLimbo.setSelectionMode('none');
				break;
			case 'celestialGuidanceMarket':
				this.market!.setSelectionMode(0);
				break;
			case 'celestialGuidanceDiscard':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'fumblingDreamer':
				for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
					discard.setSelectionMode('none');
				}
				for (const [player_id, deck] of Object.entries(this.playerDecks)) {
					deck.setSelectionMode('none');
				}
				break;
			case 'looseMarbles':
			case 'anotherFineMess':
				for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
					discard.setSelectionMode('none');
				}
				for (const [player_id, deck] of Object.entries(this.playerDecks)) {
					deck.setSelectionMode('none');
				}
				break;
			case 'client_selectPlayerPassive':
				for (const [player_id, deck] of Object.entries(this.playerDecks)) {
					deck.setSelectionMode('none');
				}
				break;
			case 'coffeeGrinder':
				const coffeeGrinder_args = (this.gamedatas.gamestate.args as { opponent_id: number });
				this.playerDecks[coffeeGrinder_args.opponent_id]!.setSelectionMode('none');
				break;
			case 'bouquets':
				this.myHand.setSelectionMode('none');
				break;
			case 'client_selectingContracts':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'trigger':
				this.mySchedule.setSelectionMode('none');
				break;
			case 'client_windOfChange':
				this.myDiscard.setSelectionMode('none');
				break;
			case 'client_bonsai':
				this.myHand.setSelectionMode('none');
				break;
			case 'rake':
				this.myDeck.hideContent();
				this.myDeck.setSelectionMode('none');
				break;
			case 'client_generationChange':
				this.myDiscard.setSelectionMode('none');
				break;
		}
		//(~leavingstate)
	}

	/** @gameSpecific See {@link Gamegui.onUpdateActionButtons} for more information. */
	override onUpdateActionButtons(stateName: GameStateName, args: AnyGameStateArgs | null): void
	{
		console.warn( 'onUpdateActionButtons: ' + stateName, args );

		if(!this.isCurrentPlayerActive())
			return;

		if (this.gamedatas.gamestate.args && 'passive_card_id' in this.gamedatas.gamestate.args) {
			this.setPassiveSelected((this.gamedatas.gamestate.args as any).passive_card_id, true);
		}

		switch( stateName )
		{
			case 'deckSelection':
				this.setMainTitle("SOLO MODE IS STILL IN EARLY DEVELOPMENT. PLEASE ONLY CONTINUE FOR TESTING PURPOSES.");
				this.addActionButton("submit-button", _("Vote"), "onSubmitPreference");
				this.addActionButton("abstain-button", _("Abstain"), "onSubmitPreferenceAbstain", undefined, false, 'gray');
				if (!this.gamedatas.debugMode) {
					this.addActionButton("debug-button", _("Enable Debug Mode"), "onEnableDebugMode", undefined, false, 'red');
				}
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
				if (this.myHand.count() == 0) {
					//Requested by Sami, but technically, you can still finish techniques
					this.setDescriptionOnMyTurn(_("${you} must"));
					this.addActionButton("confirm-button", _("Take an inventory action with 0 cards"), "onInventoryAction");
				}
				else {
					this.addActionButton("confirm-button", _("Take an inventory action"), "onRequestInventoryAction");
				}
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
				this.addActionButton("confirm-button", _("Toss selected junk"), "onPurchase");
				this.addActionButtonCancelClient();
				break;
			case 'bonusBuild':
				this.addActionButton("confirm-button", _("Build with selected"), "onBuild");
				const bonusBuild_args = args as { is_first_build: number };
				if (bonusBuild_args.is_first_build) {
					//the player is skipping their entire turn
					this.addActionButton("skip-button", _("Skip turn"), "onBonusBuildSkip", undefined, false, 'red');
				}
				else {
					//the player is skipping just a bonus action
					this.addActionButton("skip-button", _("Skip"), "onBonusBuildSkip", undefined, false, 'gray'); 
				}
				break;
			case 'client_swiftBroker':
				this.addActionButton("confirm-button", _("Discard all"), "onSwiftBroker");
				this.addActionButtonCancelClient();
				break;
			case 'client_shatteredRelic':
				this.addActionButtonCancelClient();
				break;
			case 'spyglass':
				this.addActionButton("confirm-button", _("Confirm selected"), "onSpyglass");
				break;
			case 'client_acorn':
				this.addActionButtonCancelClient();
				break;
			case 'client_giftVoucher':
				this.addActionButtonCancelClient();
				break;
			case 'client_loyalPartner':
				this.addActionButton("confirm-button", _("Toss selected"), "onLoyalPartner");
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
			case 'client_selectOpponentTechnique':
				this.addActionButtonsOpponent(this.onSelectOpponentTechnique.bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'client_selectPlayerTechnique':
				this.addActionButtonsOpponent(this.onSelectPlayerTechnique.bind(this), true);
				this.addActionButtonCancelClient();
				break;
			case 'client_selectOpponentPassive':
				this.addActionButtonsOpponent(this.onSelectOpponentPassive.bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'client_selectPlayerPassive':
				this.addActionButtonsOpponent(this.onSelectPlayerPassive.bind(this), true);
				this.addActionButtonCancelClient();
				break;
			case 'client_treasureHunter':
			case 'client_carefreeSwapper':
				this.addActionButtonCancelClient();
				break;
			case 'client_newSeason':
				this.addActionButtonCancelClient();
				break;
			case 'client_accident':
				if (this.unique_opponent_id) {
					this.addActionButton("confirm-button", _("Discard all"), "onAccident"); //only confirm discard order
				}
				else {
					this.addActionButtonsOpponentSelection(1);
					this.addActionButton("confirm-button", _("Confirm"), "onAccident"); //confirm opponent and discard order
				}
				this.addActionButtonCancelClient();
				break;
			case 'accident':
				this.addActionButton("whirligig-button", _("Next"), "onAccidentDoneLooking");
				break;
			case 'client_whirligig':
				this.addActionButtonsOpponent(this.onWhirligig.bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'client_gamble':
				this.addActionButtonsOpponent(this.onGamble.bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'client_blindfold':
				if (!this.unique_opponent_id) {
					this.addActionButtonsOpponentSelection(1);
					this.addActionButton("confirm-button", _("Confirm"), "onBlindfold"); //confirm opponent and card
				}
				this.addActionButtonCancelClient();
				break;
			case 'blindfold':
				const blindfold_args = (args as { possible_values: number[] });
				let blindfold_label = '';
				let blindfold_baseValue = 1;
				for (let value of blindfold_args.possible_values) {
					if (blindfold_baseValue > 5) {
						blindfold_label = `<span style='color:lightgreen'>${value}</span>`;
					}
					else if (value == blindfold_baseValue) {
						blindfold_label = String(value);
					}
					else {
						blindfold_label = `${blindfold_baseValue} (<span style='color:lightgreen'>${value}</span>)`;
					}
					this.addActionButton("button-"+value, blindfold_label, (() => this.onBlindfoldGuess(value)).bind(this));
					blindfold_baseValue += 1;
				}
				break;
			case 'blindfoldDecideValue':
				const blindfoldDecideValue_args = (args as { possible_values: number[], card_id: number });
				let blindfoldDecideValue_label = '';
				let blindfoldDecideValue_baseValue = 1;
				for (let value of blindfoldDecideValue_args.possible_values) {
					if (value == blindfoldDecideValue_baseValue) {
						blindfoldDecideValue_label = String(value);
					}
					else {
						blindfoldDecideValue_label = `${blindfoldDecideValue_baseValue} (<span style='color:lightgreen'>${value}</span>)`;
					}
					this.addActionButton("button-"+value, blindfoldDecideValue_label, (() => this.onBlindfoldDecideValue(value)).bind(this));
					blindfoldDecideValue_baseValue += 1;
				}
				this.myHand.setSelectionMode('noneRetainSelection', undefined, 'daleofmerchants-wrap-default');
				this.myHand.orderedSelection.setMaxSize(1);
				this.myHand.selectItem(blindfoldDecideValue_args.card_id);
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
					case 'tossOrCopy':
						this.addActionButton("copy-button", _("Copy"), "onGoodOldTimesBind");
						this.addActionButton("toss-button", _("Toss"), "onGoodOldTimesPassive");
						this.addActionButtonCancelClient();
						break;
					case 'tossOptional':
						this.addActionButton("toss-button", _("Toss"), "onGoodOldTimesPassive");
						this.addActionButton("skip-button", _("Skip"), "onGoodOldTimesPassiveSkip", undefined, false, 'gray');
						break;
					case 'tossMandatory':
						this.addActionButton("toss-button", _("Toss"), "onGoodOldTimesPassive");
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
			case 'client_choicelessTriggerTechniqueCard':
				this.onChoicelessTriggerTechniqueCard(); //immediately leave this state
				//this.addActionButton("confirm-button", _("Confirm"), "onChoicelessTriggerTechniqueCard");
				break;
			case 'client_choicelessTechniqueCard':
				const client_choicelessTechniqueCard_confirmation = this.getGameUserPreference(100); // "Confirm technique"
				if (client_choicelessTechniqueCard_confirmation == 1) {
					this.addActionButton("confirm-button", _("Confirm"), "onChoicelessTechniqueCard");
					this.addActionButtonCancelClient();
				}
				else {
					this.onChoicelessTechniqueCard(); //immediately leave this state
				}
				break;
			case 'client_fizzle':
				this.addActionButton("fizzle-button", _("Confirm"), "onFizzle");
				this.addActionButtonCancelClient();
				break;
			case 'client_triggerFizzle':
				this.onTriggerFizzle(); //immediately leave this state
				//this.addActionButton("fizzle-button", _("Confirm"), "onTriggerFizzle");
				break;
			case 'client_choicelessPassiveCard':
				this.onChoicelessPassiveCard(); //immediately leave this state
				break;
			case 'client_marketDiscovery':
				this.addActionButton("toss-button", _("Toss"), "onMarketDiscoveryToss");
				this.addActionButton("purchase-button", _("Purchase"), "onMarketDiscoveryPurchase");
				this.addActionButtonCancelClient();
				break;
			case 'specialOffer':
				this.addActionButton("confirm-button", _("Confirm selection"), "onSpecialOffer");
				break;
			case 'client_calculations':
				this.addActionButton("calculations-button", _("Purchase CARD_NAME"), "onCalculations");
				this.addActionButton("cancel-button", _("Cancel"), "onCalculationsCancel", undefined, false, 'gray');
				this.onCalculationsUpdateActionButton(null);
				break;
			case 'client_safetyPrecaution':
				this.addActionButtonCancelClient();
				break;
			case 'dangerousTest':
				this.addActionButton("confirm-button", _("Discard selected"), "onDangerousTest");
				break;
			case 'client_glue':
				this.addActionButton("keep-button", _("Keep"), "onPurchase");
				this.addActionButton("discard-button", _("Discard"), "onGlueDiscard");
				this.addActionButtonCancelClient();
				break;
			case 'client_houseCleaning':
				const client_houseCleaning_args = (this.mainClientState.args as ClientGameStates['client_houseCleaning']);
				const client_houseCleaning_label = (client_houseCleaning_args.nbr_junk == 0) ? _("Confirm") : _("Confirm selected");
				this.addActionButton("confirm-button", client_houseCleaning_label, "onHouseCleaning");
				this.addActionButtonCancelClient();
				break;
			case 'client_houseCleaningToss':
				this.addActionButton("skip-button", _("Skip"), "onHouseCleaningSkip", undefined, false, 'gray');
				this.addActionButtonCancelClient();
				break;
			case 'client_shoppingJourney':
				this.addActionButtonCancelClient();
				break;
			case 'client_siesta':
				//siesta skip is deprecated since the 10th anniversary
				//this.addActionButton("skip-button", _("Skip"), "onSiestaSkip", undefined, false, 'gray');
				this.addActionButtonCancelClient();
				break;
			case 'client_ruthlessCompetition':
				this.addActionButtonCancelClient();
				break;
			case 'cunningNeighbour':
				this.addActionButton("continue-button", _("Continue"), "onCunningNeighbour");
				break;
			case 'deprecated_cheer':
				//this needs to be in onUpdateActionButton (see https://studio.boardgamearena.com/doc/Game_interface_logic:_yourgamename.js)
				if (!this.isSpectator && this.myDeck.size > 0) {
					const cheer_args = args as { _private: { cards: DbCard[] } };
					this.myDeck.setContent(cheer_args._private.cards.map(DaleCard.of));
					this.myDeck.setSelectionMode('single');
				}
				break;
			case 'client_raffle':
				this.addActionButtonsOpponentLeftRight(this.onRaffle.bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'charity':
			case 'rumours':
				const charity_args = args as { player_ids: number[] };
				this.addActionButtonsOpponentSelection(0, charity_args.player_ids);
				this.max_opponents = 1; //ensure that no opponent is selected by default
				this.addActionButton("confirm-button", _("Confirm"), "onGiveCardsFromLimboToPlayers"); //confirm the opponent and the card
				break;
			case 'client_deprecated_tasters':
				this.addActionButtonsOpponentLeftRight(this.onDeprecatedTasters.bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'tasters':
				const tasters_args = args as { player_ids: number[] };
				this.addActionButtonsOpponentSelection(0, tasters_args.player_ids);
				this.max_opponents = 1; //ensure that no opponent is selected by default
				this.addActionButton("confirm-button", _("Confirm"), "onTasters"); //confirm the opponent and the card
				break;
			case 'daringAdventurer':
				this.addActionButton("confirm-button", _("Discard selected"), "onDaringAdventurer");
				break;
			case 'client_rareArtefact':
				this.addActionButtonCancelClient();
				break;
			case 'client_swank':
				this.addActionButtonCancelClient();
				break;
			case 'client_riskyBusiness':
				this.addActionButton("button-1", '1', (() => this.onRiskyBusiness(1)).bind(this));
				this.addActionButton("button-2", '2', (() => this.onRiskyBusiness(2)).bind(this));
				this.addActionButton("button-3", '3', (() => this.onRiskyBusiness(3)).bind(this));
				this.addActionButton("button-4", '4', (() => this.onRiskyBusiness(4)).bind(this));
				this.addActionButton("button-5", '5', (() => this.onRiskyBusiness(5)).bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'naturalSurvivor':
				this.addActionButton("confirm-button", _("Confirm"), "onNaturalSurvivor");
				break;
			case 'duplicateEntry':
				this.addActionButton("confirm-button", _("Confirm"), "onDuplicateEntry");
				break;
			case 'client_historyLesson':
				this.addActionButton("confirm-button", _("Confirm selected"), "onHistoryLesson");
				this.addActionButtonCancelClient();
				break;
			case 'culturalPreservation':
				this.addActionButton("confirm-button", _("Confirm selected"), "onCulturalPreservation");
				break;
			case 'client_sliceoflife':
				this.addActionButton("confirm-button", _("Confirm"), "onSliceOfLife");
				this.addActionButtonCancelClient();
				break;
			case 'client_spinningWheel':
				this.addActionButton("confirm-button", _("Confirm"), "onSpinningWheel");
				this.addActionButtonCancelClient();
				break;
			case 'client_replacement':
				this.addActionButtonCancelClient();
				break;
			case 'client_replacementFizzle':
				this.addActionButton("fizzle-button", _("Toss without replacement"), "onReplacementFizzle");
				this.addActionButtonCancelClient();
				break;
			case 'client_fashionHint':
				this.addActionButton("toss-button", _("Toss"), "onFashionHintToss");
				this.addActionButton("skip-button", _("Skip"), "onFashionHintTossSkip", undefined, false, 'gray');
				this.addActionButtonCancelClient();
				break;
			case 'fashionHint':
				this.addActionButton("skip-button", _("Skip"), "onFashionHintSwapSkip", undefined, false, 'gray');
				break;
			case 'royalPrivilege':
				this.addActionButton("toss-button", _("Purchase"), "onRoyalPrivilege");
				this.addActionButton("skip-button", _("Skip"), "onRoyalPrivilegeSkip", undefined, false, 'gray');
				break;
			case 'client_pompousProfessional':
				for (let animalfolk_id of this.gamedatas.animalfolkIds) {
					const callback = () => this.onPompousProfessional(animalfolk_id);
					this.addActionButton("animalfolk-button-"+animalfolk_id, this.getAnimalfolkName(animalfolk_id), callback.bind(this));
				}
				this.addActionButtonCancelClient();
				break;
			case 'pompousProfessional':
				if (this.myLimbo.count() == 0) {
					//onUpdateActionButtons will be called again by a notification
					this.setMainTitle(_("Pompous Professional: waiting..."));
					return;
				}
				this.removeActionButtons();
				const pompousProfessional_args = this.gamedatas.gamestate.args as { animalfolk_id: number, animalfolk_name: number };
				const pompousProfessional_is_taking_card = this.myLimbo.getAllItems().some(
					(item) => new DaleCard(item.id).effective_animalfolk_id == pompousProfessional_args.animalfolk_id
				);
				if (pompousProfessional_is_taking_card) {
					const pompousProfessional_label = _("Choose a '")+pompousProfessional_args.animalfolk_name+("' card to take");
					this.myLimbo.setSelectionMode('multiple', 'spyglass', 'daleofmerchants-wrap-technique', pompousProfessional_label, undefined, Infinity);
					this.addActionButton("confirm-button", _("Confirm"), "onPompousProfessionalTakeAndDiscard");
					this.restoreMainTitle();
				}
				else {
					this.setMainTitle(_("No '")+pompousProfessional_args.animalfolk_name+_("' found. You may choose the order to discard the cards"));
					this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Discard cards"));
					this.addActionButton("confirm-button", _("Discard"), "onPompousProfessionalDiscard");
				}
				break;
			case 'client_burglaryOpponentId':
				const burglaryOpponentId_args = (this.mainClientState.args as ClientGameStates['client_burglaryOpponentId']);
				//add a button for each opponent
				this.addActionButtonsOpponent((opponent_id: number) => {
					this.mainClientState.enter('client_burglaryValue', {
						technique_card_id: burglaryOpponentId_args.technique_card_id,
						opponent_id: opponent_id,
						opponent_name: this.gamedatas.players[opponent_id]!.name!
					})
				});
				//remove invalid opponents
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id) {
						const deck = this.playerDecks[player_id]!;
						const discard = this.playerDiscards[player_id]!;
						if (deck.size + discard.size == 0) {
							$("opponent-selection-button-"+player_id)?.remove();
						}
					}
				}
				this.addActionButtonCancelClient();
				break;
			case 'client_burglaryValue':
				this.addActionButton("button-1", '1', (() => this.onBurglary(1)).bind(this));
				this.addActionButton("button-2", '2', (() => this.onBurglary(2)).bind(this));
				this.addActionButton("button-3", '3', (() => this.onBurglary(3)).bind(this));
				this.addActionButton("button-4", '4', (() => this.onBurglary(4)).bind(this));
				this.addActionButton("button-5", '5', (() => this.onBurglary(5)).bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'client_graspOpponentId':
				const graspOpponentId_args = (this.mainClientState.args as ClientGameStates['client_graspOpponentId']);
				//add a button for each opponent
				this.addActionButtonsOpponent((opponent_id: number) => {
					this.mainClientState.enter('client_graspValue', {
						technique_card_id: graspOpponentId_args.technique_card_id,
						opponent_id: opponent_id,
						opponent_name: this.gamedatas.players[opponent_id]!.name!
					})
				});
				//remove invalid opponents
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id && this.playerHandSizes[player_id]!.getValue() <= 0) {
						$("opponent-selection-button-"+player_id)?.remove();
					}
				}
				this.addActionButtonCancelClient();
				break;
			case 'client_graspValue':
				this.addActionButton("button-1", '1', (() => this.onGrasp(1)).bind(this));
				this.addActionButton("button-2", '2', (() => this.onGrasp(2)).bind(this));
				this.addActionButton("button-3", '3', (() => this.onGrasp(3)).bind(this));
				this.addActionButton("button-4", '4', (() => this.onGrasp(4)).bind(this));
				this.addActionButton("button-5", '5', (() => this.onGrasp(5)).bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'client_suddenNap':
				this.addActionButtonsOpponent(this.onSuddenNap.bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'client_periscopeOpponentId':
				const periscopeOpponentId_args = (this.mainClientState.args as ClientGameStates['client_periscopeOpponentId']);
				//add a button for each opponent
				this.addActionButtonsOpponent((opponent_id: number) => {
					this.mainClientState.enter('client_periscopeAnimalfolkId', {
						technique_card_id: periscopeOpponentId_args.technique_card_id,
						opponent_id: opponent_id,
						opponent_name: this.gamedatas.players[opponent_id]!.name!
					})
				});
				//remove invalid opponents
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id) {
						const deck = this.playerDecks[player_id]!;
						const discard = this.playerDiscards[player_id]!;
						if (deck.size + discard.size == 0) {
							$("opponent-selection-button-"+player_id)?.remove();
						}
					}
				}
				this.addActionButtonCancelClient();
				break;
			case 'client_periscopeAnimalfolkId':
				for (let animalfolk_id of this.gamedatas.animalfolkIds) {
					const callback = () => this.onPeriscopeAnimalfolkId(animalfolk_id);
					this.addActionButton("animalfolk-button-"+animalfolk_id, this.getAnimalfolkName(animalfolk_id), callback.bind(this));
				}
				//this.addCardNameInputField($("pagemaintitletext")! as HTMLElement, "Confirm", this.onPeriscopeAnimalfolkId.bind(this));
				this.addActionButtonCancelClient();
				break;
			case 'client_periscopeValue':
				for (let value of [1, 2, 3, 4, 5]) {
					const callback = () => this.onPeriscopeValue(value);
					this.addActionButton("animalfolk-button-"+value, value.toString(), callback.bind(this));
				}
				this.addActionButtonCancelClient();
				break;
			case 'delicacy':
			case 'umbrella':
				const delicacy_args = (args as { opponent_name: string });
				const delicacy_action = stateName == 'delicacy' ? this.onDelicacy.bind(this) : this.onUmbrella.bind(this);
				this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', delicacy_args.opponent_name+_("'s cards"));
				setTimeout((() => {
					const delicacy_type = stateName == 'delicacy' ? DaleCard.CT_DELICACY : DaleCard.CT_UMBRELLA;
					const delicacy_targets: DaleCard[] = this.myLimbo.getAllItems().map(item => new DaleCard(item.id));
					if (delicacy_targets.length > 0) {
						new TargetingLine(
							this.getScheduledCardOfTypeId(delicacy_type),
							delicacy_targets,
							"daleofmerchants-line-source-technique",
							"daleofmerchants-line-target-technique",
							"daleofmerchants-line-technique",
							(source_id: number) => delicacy_action(-1),
							(source_id: number, target_id: number) => delicacy_action(target_id)
						)
					}
					else {
						//Sometimes the delicacy_targets are not yet available due to client-server delays
						//As a workaround, we will fall back on a click selection method
						console.warn("No targets found in limbo, TargetingLine will not be created");
						this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Click a card to swap"));
					}
				}).bind(this), stateName === 'umbrella' ? 750 : 1); //workaround to ensure that limbo is filled before the targeting line is created
				this.addActionButton("skip-button", _("Skip"), () => delicacy_action(-1), undefined, false, "gray");
				break;
			case 'client_velocipede':
				this.addActionButtonCancelClient();
				break;
			case 'client_matchingColours':
				this.addActionButtonCancelClient();
				break;
			case 'client_cleverGuardian':
				this.addActionButtonCancelClient();
				break;
			case 'client_barricade':
				this.addActionButton("confirm-button", _("Confirm"), "onBarricade");
				this.addActionButtonCancelClient();
				break;
			case 'wheelbarrow':
				this.addActionButton("wheelbarrow-toss-button", _("Toss"), "onWheelbarrowToss");
				this.addActionButton("wheelbarrow-store-button", _("Store"), "onWheelbarrowStore");
				// const wheelbarrow_toss = $("wheelbarrow-toss-button");
				// const wheelbarrow_or = document.createElement("span");
				// wheelbarrow_or.textContent = _(" or");
				// wheelbarrow_toss?.parentNode?.insertBefore(wheelbarrow_or, wheelbarrow_toss.nextSibling);
				break;
			case 'tacticalMeasurement':
				this.addActionButton("confirm-button", _("Confirm"), "onTacticalMeasurement");
				break;
			case 'meddlingMarketeer':
				this.addActionButton("confirm-button", _("Discard Selected"), "onMeddlingMarketeerDiscard");
				break;
			case 'client_meddlingMarketeer':
				this.addActionButton("confirm-button", _("Confirm"), "onMeddlingMarketeerDeck");
				this.addActionButton("undo-button", _("Undo"), "onMeddlingMarketeerUndo", undefined, false, "gray");
				break;
			case 'client_goodwillpresents':
				this.addActionButtonsOpponentSelection(2, this.gamedatas.playerorder.map(Number));
				this.addActionButton("confirm-button", '', "onGoodwillPresents");
				this.updateConfirmOpponentsButton();
				this.addActionButtonCancelClient();
				break;
			case 'client_alternativePlan':
				this.addActionButtonCancelClient();
				break;
			case 'client_anchor':
				this.addActionButton("confirm-button", _("Confirm"), "onAnchorDeck");
				this.addActionButton("undo-button", _("Undo"), "onAnchorUndo", undefined, false, "gray");
				break;
			case 'client_manufacturedJoy':
				const client_manufacturedJoy_args = (args as { draw_card_id: number });
				if (client_manufacturedJoy_args.draw_card_id != -1) {
					this.addActionButton("undo-button", _("Undo"), "onManufacturedJoyUndo", undefined, false, "gray");
				}
				break;
			case 'client_shakyEnterprise':
				this.addActionButton("confirm-button", _("Confirm selected"), "onShakyEnterprise");
				this.addActionButtonCancelClient();
				break;
			case 'client_spend':
				this.addActionButton("confirm-button", _("Confirm"), "onSpend");
				this.addActionButtonCancelClient();
				break;
			case 'client_spendx':
				this.addActionButton("confirm-button", _("Confirm"), "onSpend");
				this.updateSpendXButton();
				this.addActionButtonCancelClient();
				break;
			case 'client_stove':
				this.addActionButton("confirm-button", _("Confirm"), "onStove");
				this.updateStoveButton();
				this.addActionButtonCancelClient();
				break;
			case 'charmStove':
				this.myLimbo.setSelectionMode('none', undefined, "daleofmerchants-wrap-default", _("Card drawn by Charm"));
				this.addActionButton("confirm-button", _("Confirm"), "onCharmStove");
				this.updateStoveButton();
				break;
			case 'client_cache':
				this.addActionButtonCancelClient();
				break;
			case 'resourcefulAlly':
				this.addActionButton("confirm-button", _("Confirm"), "onResourcefulAlly");
				break;
			case 'travelingEquipment':
				this.addActionButton("confirm-button", _("Confirm"), "onTravelingEquipment");
				break;
			case 'fishing':
				this.addActionButton("confirm-button", _("Confirm"), "onFishing");
				break;
			case 'client_groundbreakingIdea':
				this.addActionButtonCancelClient();
				break;
			case 'insight':
				this.addActionButton("confirm-button", _("Confirm"), "onInsight");
				break;
			case 'badOmen':
				this.addActionButton("skip-button", _("Skip"), "onBadOmenSkip", undefined, false, 'gray');
				break;
			case 'client_badOmen':
				this.addActionButton("confirm-button", _("Confirm"), "onBadOmenDeck");
				this.addActionButton("undo-button", _("Undo"), "onBadOmenUndo", undefined, false, "gray");
				break;
			case 'fumblingDreamer':
				this.addActionButtonsOpponent(this.onFumblingDreamer.bind(this), true);
				break;
			case 'looseMarbles':
			case 'anotherFineMess':
				const looseMarbles_args = args as {die_value1: number, die_value2: number};
				if (looseMarbles_args.die_value1 == DaleDie.DIE_DISCARD) {
					for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
						discard.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
					}
				}
				if (looseMarbles_args.die_value1 == DaleDie.DIE_DECK) {
					for (const [player_id, deck] of Object.entries(this.playerDecks)) {
						deck.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
					}
				}
				if (looseMarbles_args.die_value1 == DaleDie.DIE_HAND) {
					const looseMarbles_hand_label = this.gamedatas.gamestate.name == 'anotherFineMess' ? 
						_("Click on your name in the top bar to move random cards from your hand") :
						_("Click on your name in the top bar to move a random card from your hand") ;
					this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', looseMarbles_hand_label);
					this.addActionButtonsOpponent(((opponent_id: number) => {
						this.onLooseMarblesBegin(opponent_id);
					}).bind(this), true, TranslatableStrings.s_hand);
				}
				else if (looseMarbles_args.die_value2 == DaleDie.DIE_HAND2) {
					const looseMarbles_fail_message = _("Please select the top card of a pile first");
					this.addActionButtonsOpponent(((opponent_id: number) => this.showMessage(looseMarbles_fail_message, "error")).bind(this), true, TranslatableStrings.s_hand);
				}
				break;
			case 'coffeeGrinder':
				this.addActionButton("confirm-button", _("Discard"), "onCoffeeGrinderDiscard");
				this.addActionButton("skip-button", _("Skip"), "onCoffeeGrinderSkip", undefined, false, 'gray');
				const coffeeGrinder_args = (args as { opponent_id: number });
				this.playerDecks[coffeeGrinder_args.opponent_id]!.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
				break;
			case 'client_dramaticRomantic':
				switch(this.myClock.getClock()) {
					case PlayerClock.CLOCK_DAWN:
						this.addActionButton("forward-button", DaleCard.format_string(_("forward (DAY)")), "onDramaticRomanticForward");
						break;
					case PlayerClock.CLOCK_DAY:
						this.addActionButton("forward-button", DaleCard.format_string(_("forward (NIGHT)")), "onDramaticRomanticForward");
						this.addActionButton("backward-button", DaleCard.format_string(_("backward (DAWN)")),  "onDramaticRomanticBackward");
						break;
					case PlayerClock.CLOCK_NIGHT:
						this.addActionButton("backward-button", DaleCard.format_string(_("backward (DAY)")),  "onDramaticRomanticBackward");
						break;
				}
				this.addActionButtonCancelClient();
				break;
			case 'client_selectingContracts':
				this.addActionButton("confirm-button", _("Confirm"), "onSelectingContracts");
				this.addActionButtonCancelClient();
				break;
			case 'client_windOfChange':
				this.addActionButton("skip-button", _("Skip"), "onWindOfChangeSkip", undefined, false, 'gray');
				this.addActionButtonCancelClient();
				break;
			case 'client_snack':
				this.market!.setSelectionMode(1, undefined, 'daleofmerchants-wrap-technique');
				this.addActionButtonCancelClient();
				break;
			case 'client_bonsai':
				this.addActionButton("confirm-button", _("Confirm"), "onBonsai");
				this.addActionButtonCancelClient();
				break;
			case 'rake':
				this.addActionButton("confirm-button", _("Confirm all"), "onRake");
				break;
			case 'client_generationChange':
				this.addActionButton("confirm-button", _("Confirm"), "onGenerationChange");
				this.addActionButtonCancelClient();
				break;
		}
		//(~actionbuttons)
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
			console.warn(this.chameleonArgs); //known bug: sometimes, chameleonArgs is not cleared when it should be
			this.chameleonArgs.pickTarget(card);
		}
		
		//set the chameleon client state name and args
		let chameleonStatename: keyof ClientGameStates;
		let args: ClientGameStates['chameleon_goodoldtimes'] = { mode: undefined };
		let tossAvailable = true;
		switch(card.effective_type_id) {
			case DaleCard.CT_FLEXIBLESHOPKEEPER:
				chameleonStatename = 'chameleon_flexibleShopkeeper'
				break;
			case DaleCard.CT_REFLECTION:
				chameleonStatename = 'chameleon_reflection'
				break;
			case DaleCard.CT_GOODOLDTIMES:
				tossAvailable = (this.chameleonArgs || !card.isPassiveUsed()) && (this.marketDeck.size > 0 || this.marketDiscard.size > 0);
				if (!tossAvailable) {
					args.mode = 'copy'
				}
				else if ((!this.chameleonArgs && this.marketDiscard.size == 0) || this.chameleonArgs?.onlyContainsGoodOldTimes) {
					args.mode = 'tossOptional'
				}
				else if ((!this.chameleonArgs || this.chameleonArgs.currentTargets.length == 2) && this.marketDiscard.size > 0) {
					args.mode = 'tossOrCopy'
				}
				else {
					args.mode = 'tossMandatory'
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
			console.warn(`'${card.name}' has ${this.chameleonArgs.currentTargets.length} direct target(s)`);
			console.warn(`'${card.name}' has ${targets.size} total target(s)`);
			console.warn(Array.from(targets).map(target => target instanceof HTMLElement ? target : target.div));
			if (targets.size == 0) {
				this.chameleonArgs = undefined;
				return true;
			}
			else if (this.chameleonArgs.onlyContainsGoodOldTimes) {
				if (tossAvailable) {
					args.mode = 'tossOptional'
					this.mainClientState.enterOnStack(chameleonStatename, args);
					return false;
				}
				else if (card.effective_type_id != DaleCard.CT_GOODOLDTIMES) {
					this.chameleonArgs = undefined;
					return true;
				}
			}
			else if (targets.size == 1) {
				this.mainClientState.enterOnStack('chameleon_autobind');
				//auto-bind to the first target in the chain
				const target = this.chameleonArgs.currentTargets[0];
				if (target instanceof DaleCard) {
					this.onConfirmChameleon(target.id);
				}
			}
			else {
				this.mainClientState.enterOnStack(chameleonStatename, args);
			}
		}
		else if (this.mainClientState.name == 'chameleon_autobind') {
			//auto-bind to the next target in the chain
			const target = this.chameleonArgs.currentTargets[0];
			if (target instanceof DaleCard) {
				this.onConfirmChameleon(target.id);
			}
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
						const card = new DaleCard(item.id);
						if (card.hasLocalBindingWithSeeingDoubles()) {
							continue; //see issue #109, players should copy switch up their ordering for this
						}
						targets.push(card);
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
			let type_id = new DaleCard(chameleon_card_id).effective_server_type_id;
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
	 * Sorts an unordered object of dbcards by their "location_arg"
	 * @param cards unsorted object of dbcards
	 * @param ascending indicates if the order should be ascending (`true`) or descending (`false`)
	 */
	public sortCardsByLocationArg(cards: {[card_id: number]: DbCard}, ascending: boolean): DbCard[] {
		let dbcards_sorted: DbCard[] = [];
		for (let i in cards) {
			dbcards_sorted.push(cards[i]!);
		}
		if (ascending) {
			dbcards_sorted.sort((dbcard1, dbcard2) => (+dbcard1.location_arg) - (+dbcard2.location_arg));
		}
		else {
			dbcards_sorted.sort((dbcard1, dbcard2) => (+dbcard2.location_arg) - (+dbcard1.location_arg));
		}
		return dbcards_sorted;
	}


	/**
	 * Replaces an html element with a new htmlElement of a new tag name newTagName
	 * @param oldElement an html element in the document
	 * @param tagName the new tag name of the element
	 * @returns an identical newElement with a new tag name
	 */
	updateTagName(oldElement: Element, tagName: string) {
		if (!oldElement.parentNode) {
			return oldElement;
		}
		const newElement = document.createElement(tagName);
		Array.from(oldElement.attributes).forEach(attr => {
			newElement.setAttribute(attr.name, attr.value);
		});
		newElement.innerHTML = oldElement.innerHTML;
		oldElement.parentNode.replaceChild(newElement, oldElement);
		return newElement;
	}

    /**
     * (de)select the specified passive card
     */
    public setPassiveSelected(passive_card_id: number, enable: boolean) {
		const div = DaleCard.divs.get(+passive_card_id);
		if (div) {
			if (enable) {
				div.classList.add("daleofmerchants-passive-selected");
			}
			else {
				div.classList.remove("daleofmerchants-passive-selected");
			}
		}
    }

	/**
	 * Set standard selection modes for purchase-based client states
	 */
	public setPurchaseSelectionModes(client_purchase_args: ClientGameStates['client_purchase']) {
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
		if (client_purchase_args.calculations_card_id !== undefined && this.myHand.orderedSelection.getSize() == 0) {
			this.myHand.selectItem(client_purchase_args.calculations_card_id);
		}
	}

	/**
	 * Replaces each "ICON" in the `text` with the respective `icons`
	 * @param text Text containing `n` occurrences of "ICON"
	 * @param icons `n` HTMLElement icons to replace each "ICON"
	 * @returns A new string with "ICON" replaced by each icon's HTML
	 */
	public format_dale_icons(text: string, ...icons: HTMLElement[]): string {
		const parts = text.split("ICON");
		if (parts.length - 1 !== icons.length) {
			console.warn("format_dale_icons: number of icons does not match number of 'ICON' placeholders");
			return text;
		}
		let result = "";
		for (let i = 0; i < icons.length; i++) {
			result += parts[i] + `<span class="daleofmerchants-log-span">${icons[i]!.outerHTML}</span>`;
		}
		result += parts[icons.length];
		return result;
	}

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
			if ('die_icon_source' in args) {
				const iconTpl = DaleDie.getIconTpl(args['die_icon_source']);
				args['die_icon_source'] = `<span class="daleofmerchants-log-span">${iconTpl}</span>`;
			}

			//parse die icon
			if ('die_icon' in args) {
				const iconTpl = DaleDie.getIconTpl(args['die_icon']);
				args['die_icon'] = `<span class="daleofmerchants-log-span">${iconTpl}</span>`;
			}

			//parse coin icon
			if ('coin_icon' in args) {
				const iconTpl = DaleIcons.getCoinIcon();
				args['coin_icon'] = `<span class="daleofmerchants-log-span">${iconTpl.outerHTML}</span>`;
			}

			//parse clock icon
			if ('clock' in args) {
				args['clock'] = PlayerClock.getClockLabelAndIconTpl(+args['clock']); 
			}

			//parse ocelot die
			if (log.includes('${ocelot}')) {
				args['ocelot'] = 'OCELOT_DIE_ICON';
				//args['ocelot'] = `<span class="daleofmerchants-log-span">${DaleIcons.getChameleonIcon().outerHTML}</span>`;
			}
		}
		return super.format_string_recursive(log, args)
	}

	private previousMainTitle: string = '';

	/**
	 * Restore the previous `pagemaintitletext` that was overwritten by `setMainTitle`
	 */
	restoreMainTitle() {
		if (this.previousMainTitle) {
			this.setMainTitle(this.previousMainTitle);
		}
	}

	/**
	 * Same as `setMainTitle`, but uses args
	 * Code copied from https://studio.boardgamearena.com/doc/BGA_Studio_Cookbook
	 * @param text new string to display at the main title
	 */
	setDescriptionOnMyTurn(text: string) {
		this.gamedatas.gamestate.descriptionmyturn = text;
		var tpl = dojo.clone(this.gamedatas.gamestate.args) as any;
		if (tpl === null) {
			tpl = {};
		}
		var title = "";
		if (this.isCurrentPlayerActive() && text !== null) {
			tpl.you = this.divYou(); 
		}
		title = this.format_string_recursive(text, tpl);

		if (!title) {
			this.setMainTitle(" ");
		} else {
			this.setMainTitle(title);
		}
    }

	/**
	 * Implementation of proper colored You with background in case of white or light colors
	 * Code copied from https://studio.boardgamearena.com/doc/BGA_Studio_Cookbook
	 * @returns formatted `you`
	 */
	divYou(): string {
		var color = this.gamedatas.players[this.player_id]!.color;
		var color_bg = "";
		if (this.gamedatas.players[this.player_id] && this.gamedatas.players[this.player_id]!.color_back) {
			color_bg = "background-color:#" + this.gamedatas.players[this.player_id]!.color_back + ";";
		}
		var you = "<span style=\"font-weight:bold;color:#" + color + ";" + color_bg + "\">" + __("lang_mainsite", "You") + "</span>";
		return you;
	}

	/**
	 * Update the state prompt message displayed
	 * Code copied from https://studio.boardgamearena.com/doc/BGA_Studio_Cookbook
	 * @param text new string to display at the main title
	 */
	setMainTitle(text: string) {
		this.previousMainTitle = $('pagemaintitletext')!.innerHTML;
		$('pagemaintitletext')!.innerHTML = text;
	}

	/**
	 * Asserts that a card of the given type id exists in the current player's schedule. Then returns it.
	 * @return DaleCard of the given type present in the current player's schedule
	 */
	getScheduledCardOfTypeId(type_id: number): DaleCard {
		for (let item of this.mySchedule.getAllItems()) {
			const card = new DaleCard(item.id);
			if (card.effective_type_id == type_id) {
				return card;
			}
		}
		throw new Error(`getScheduledCardOfTypeId expected a card of type id ${type_id}, but such a card was not found`);
	}

	/**
	 * Move a card from the specified stock to the specified pile
	 * @param card card to move
	 * @param stock stock to move from
	 * @param pile pile to move to
	 * @param delay
	*/
	stockToPile(card: DbCard | DaleCard, stock: DaleStock, pile: Pile, delay: number = 0, ignore_card_not_found: boolean = false) {
		const card_id = card.id;
		const item_name = stock.control_name + '_item_' + card_id;
		if ($(item_name)) {
			pile.push(new DaleCard(card_id), item_name, undefined, undefined, delay);
			stock.removeFromStockByIdNoAnimation(+card_id);
		}
		else {
			if (ignore_card_not_found) {
				console.warn(`Card ${card_id} does not exist in `+stock.control_name+", likely because the client already executed the action in a client state");
			}
			else {
				throw new Error(`Card ${card_id} does not exist in `+stock.control_name);
			}
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
		pile.push(DaleCard.of(card), 'overall_player_board_'+player_id, null, 500, delay);
	}

	/**
	 * Move a card from the player-specific stock to the specified pile
	 * @param card card to move
	 * @param stock player-specific stock. this should be a stock that each client has only 1 of (e.g. hand or limbo). 
	 * @param player_id owner of the stock
	 * @param pile pile to move to
	 * @param delay
	 * @param ignore_card_not_found (optional) - if true, ignore this function if the card is not found in the given stock
	*/
	playerStockToPile(card: DbCard, stock: DaleStock, player_id: number, pile: Pile, delay: number = 0, ignore_card_not_found: boolean = false) {
		if (+player_id == this.player_id) {
			this.stockToPile(card, stock, pile, delay, ignore_card_not_found);
		}
		else if (this.mono_hand_is_visible && stock == this.myHand) {
			this.stockToPile(card, this.myLimbo, pile, delay, ignore_card_not_found);
		}
		else {
			this.overallPlayerBoardToPile(card, player_id, pile, delay);
		}
	}

	/**
	 * Remove a card from a player-specific stock (fade out)
	 * @param card card to remove from hand
	 * @param stock player-specific stock. this should be a stock that each client has only 1 of (e.g. hand or limbo). 
	 * @param player_id owner of the hand
	 * @param ignore_card_not_found (optional) - if true, ignore this function if the card is not found in the given stock
	*/
	playerStockRemove(card: DbCard, stock: DaleStock, player_id: number, ignore_card_not_found: boolean = false){
		if (+player_id == this.player_id) {
			if (ignore_card_not_found && !stock.containsCardId(+card.id)) {
				console.warn(`Card ${card.id} does not exist in `+stock.control_name+", likely because the client already removed the card in a client state");
				return;
			}
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
	pileToStock(card: DbCard | DaleCard, pile: Pile, stock: DaleStock, location_arg?: number) {
		if (location_arg !== undefined) {
			//remove from index
			if (pile.removeAt(location_arg-1).id != +card.id) {
				throw new Error(`Card ${+card.id} was not found at index ${location_arg} in the pile of size ${pile.size}`);
			}
		}
		else {
			//remove from top
			if(pile.pop().id != +card.id) {
				throw new Error(`Card ${+card.id} was not found on top of the pile`);
			}
		}
		//add dale card to stock after popping to ensure the new div is not detached
		stock.addDaleCardToStock(DaleCard.of(card), pile.placeholderHTML);
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
			this.pileToStock(card, pile, stock, location_arg);
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

	///////////////////////////////////////////////////
	//// Opponent selection utilities 

	/*
		Here, I put all methods related to selecting opponents
	*/

	/**
	 * Add opponent buttons for adjacent opponents.
	 */
	addActionButtonsOpponentLeftRight(onDirectionHandler: (reverse_direction: boolean) => void) {
		if (this.unique_opponent_id) {
			throw new Error("addActionButtonsOpponentLeftRight should not be called in a 2-player game");
		}
		var raffle_prev_opponent_id = -1;
		var raffle_next_opponent_id = -1;
		for (let i = 0; i < this.gamedatas.playerorder.length; i++) {
			if (this.player_id == this.gamedatas.playerorder[i]!) {
				const raffle_i_prev = (i-1+this.gamedatas.playerorder.length) % this.gamedatas.playerorder.length;
				const raffle_i_next = (i+1+this.gamedatas.playerorder.length) % this.gamedatas.playerorder.length;
				raffle_prev_opponent_id = this.gamedatas.playerorder[raffle_i_prev]!;
				raffle_next_opponent_id = this.gamedatas.playerorder[raffle_i_next]!;
				break;
			}
		}
		this.addActionButtonsOpponent((opponent_id: number) => onDirectionHandler(opponent_id == raffle_prev_opponent_id));
		for (let i = 0; i < this.gamedatas.playerorder.length; i++) {
			//remove buttons for non-adjacent players
			const raffle_opponent_id = this.gamedatas.playerorder[i]!;
			if (raffle_opponent_id != raffle_prev_opponent_id && raffle_opponent_id != raffle_next_opponent_id) {
				$("opponent-selection-button-"+raffle_opponent_id)?.remove();
			}
		}
	}
	

	/** In a 2-player game, store the unique opponent here */
	unique_opponent_id: number | undefined;

	/**
	 * Add selection buttons to select a single opponent
	 */
	addActionButtonsOpponent(onOpponentHandler: (opponent_id: number) => void, include_player: boolean = false, suffix: string = "") {
		for(let opponent_id of this.gamedatas.playerorder) {
			if (include_player || opponent_id != this.player_id) {
				const name = this.gamedatas.players[opponent_id]!.name;
				const color = this.gamedatas.players[opponent_id]!.color;
				const label = `<span style="font-weight:bold;color:#${color};">${name}${suffix}</span>`;
				this.addActionButton("opponent-selection-button-"+opponent_id, label, () => {onOpponentHandler(opponent_id)}, undefined, false, 'gray');
			}
		}
	}

	/** Selected opponents */
	opponent_ids: number[] = [];
	max_opponents: number = 4;

	/**
	 * Add selection button to select up to `maxSize` opponents
	 * @param maxSize (optional) if provided, set a maximum number of opponents that can be selected
	 * @param player_ids (optional) if provided, make a button for exactly these players (even the current_player)
	 * @param auto_select (optional) default false - if `true`, automatically select the maximum number of opponents
	 */
	addActionButtonsOpponentSelection(maxSize?: number, player_ids?: number[], auto_select = false) {
		this.opponent_ids = [];
		this.max_opponents = maxSize ?? this.gamedatas.playerorder.length;
		for(let opponent_id of this.gamedatas.playerorder) {
			if ((opponent_id != this.player_id && player_ids === undefined) || player_ids?.includes(+opponent_id)) {
				const name = this.gamedatas.players[opponent_id]!.name;
				const color = this.gamedatas.players[opponent_id]!.color;
				const label = `<span style="font-weight:bold;color:#${color};">${name}</span>`;
				this.addActionButton("opponent-selection-button-"+opponent_id, label, "onToggleOpponent", undefined, false, 'gray');
				if (auto_select && this.opponent_ids.length < this.max_opponents) {
					this.opponent_ids.push(+opponent_id);
					$("opponent-selection-button-"+opponent_id)?.classList.add("daleofmerchants-bga-button-selected");
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
						$("opponent-selection-button-"+this.opponent_ids.pop())?.classList.remove("daleofmerchants-bga-button-selected");
					}
					this.opponent_ids.push(opponent_id);
					target.classList.add("daleofmerchants-bga-button-selected");
				}
				else if (this.max_opponents != 1) {
					this.opponent_ids.splice(index, 1);
					target.classList.remove("daleofmerchants-bga-button-selected");
				}
				this.updateConfirmOpponentsButton();
				console.warn(this.opponent_ids);
			}
		}
	}

	updateConfirmOpponentsButton() {
		if (this.max_opponents != 1) {
			const confirm_button = $("confirm-button");
			if (confirm_button) {
				(confirm_button as HTMLElement).innerText = _("Confirm Selection ")+`(${this.opponent_ids.length})`;
			}
		}
	}

	getAnimalfolkName(animalfolk_id: number) {
		return DaleCard.cardTypes[6*animalfolk_id]!.animalfolk_displayed;
	}

	/**
	 * Returns all cards in the current player's hand that can possibly be swapped using the "Matching Colous" technique card
	 * @param matchingColours_card_id the matching colors card that will be played. Should be excluded from the targets.
	 */
	getMatchingColoursHandTargets(matchingColours_card_id: number): DaleCard[] {
		const cards: DaleCard[] = [];
		const values: Set<number> = new Set();
		for (let player_id in this.gamedatas.players) {
			if (+player_id != this.player_id) {
				for (let stallCard of this.playerStalls[player_id]!.getCardsInStall()) {
					values.add(stallCard.original_value); //notice that we use the ORIGINAL value of the stall card...
				}
			}
		}
		for (let item of this.myHand.getAllItems()) {
			let chameleonTargets = [new DaleCard(item.id)];
			if (chameleonTargets[0]!.isUnboundChameleon()) {
				chameleonTargets = this.getChameleonTargets(chameleonTargets[0]!, true).filter(target => target instanceof DaleCard);
			}
			for (let handCard of chameleonTargets) {
				const isOtherAnimalfolk = handCard.isAnimalfolk() && handCard.id != matchingColours_card_id;
				if (isOtherAnimalfolk && values.has(handCard.effective_value)) { //...and the EFFECTIVE value of the hand card
					cards.push(handCard);
				}
			}
		}
		return cards;
	}

	/**
	 * Returns all cards in any opponent's stall that have the same value as the given hand card
	 * @param matchingColours_card_id the matching colors card that will be played. Should be excluded from the targets.
	 */
	getMatchingColoursStallTargets(handCard: DaleCard): DaleCard[] {
		const stallCards = [];
		for (let player_id in this.gamedatas.players) {
			if (+player_id != this.player_id) {
				for (let stallCard of this.playerStalls[player_id]!.getCardsInStall()) {
					if (stallCard.original_value == handCard.effective_value) { //original value of the stallCard, effective value of the handCard
						stallCards.push(stallCard);
					}
				}
			}
		}
		return stallCards;
	}

	/**
	 * Ensures that the first item in the limbo selection of 'pompousProfessional' is of the correct animalfolk_id
	 * @returns true if no cards needed to be unselected
	 */
	validatePompousProfessionalSelection(): boolean {
		const pompousProfessional_args = (this.gamedatas.gamestate.args as { animalfolk_id: number });
		const pompousProfessional_is_taking_card = this.myLimbo.getAllItems().some(
			(item) => new DaleCard(item.id).effective_animalfolk_id == pompousProfessional_args.animalfolk_id
		);
		if (pompousProfessional_is_taking_card) {
			if (this.myLimbo.orderedSelection.getSize() == 0) {
				return true;
			}
			const pompousProfessional_card = new DaleCard(this.myLimbo.orderedSelection.get().pop()!);
			if (pompousProfessional_card.effective_animalfolk_id != pompousProfessional_args.animalfolk_id) {
				this.myLimbo.unselectAll();
				return false;
			}
		}
		return true;
	}

	updateSpendXButton() {
		const confirm_button = $("confirm-button");
		if (confirm_button) {
			const args = this.mainClientState.args as ClientGameStates['client_spendx'];
			let value = this.coinManager.getCoinsToSpend() + this.myHand.getSelectedValue();
			if (value < args.cost_min) {
				value = args.cost_min;
			} 
			else if (value > args.cost_max) {
				value = args.cost_max;
			}
			(confirm_button as HTMLElement).innerText = _("Confirm")+` (x = ${value})`;
		}
	}

	updateStoveButton() {
		const confirm_button = $("confirm-button");
		if (confirm_button) {
			let value = this.coinManager.getCoinsToSpend() + this.myHand.getSelectedValue();
			if (value != 0) {
				(confirm_button as HTMLElement).innerText = _("Confirm")+` (x = ${value})`;
			}
			else {
				(confirm_button as HTMLElement).innerText = _("Skip");
			}
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

	onEnableDebugMode() {
		this.bgaPerformAction('actEnableDebugMode', {});
	}

	onSubmitPreference() {
		let animalfolk_ids = this.deckSelection!.orderedSelection.get().reverse();
		if (animalfolk_ids.length == 0) {
			this.showMessage(_("Please select at least 1 animalfolk to vote"), 'error');
			return;
		}
		console.warn("onSubmitPreference", this.arrayToNumberList(animalfolk_ids));
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
        console.warn(`Clicked on CardStack[${stack_index}, ${index}]`);

		switch(this.gamedatas.gamestate.name) {

		}
	}

	onMarketCardClick(card: DaleCard, pos: number) {
		pos = this.market!.getValidPos(pos);
		console.warn("onMarketCardClick");

		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
				const client_purchase_args = this.mainClientState.args as ClientGameStates['client_purchase'];
				if (client_purchase_args.pos == pos) {
					//user click on the same card again, return to the default client state
					this.mainClientState.leave();
				}
				else if (this.checkLock()) {
					//user clicked on a different card, enter a new client state
					client_purchase_args.pos = pos;
					client_purchase_args.market_discovery_card_id = undefined;
					client_purchase_args.card_name = card.name;
					client_purchase_args.cost = card.getCost(pos);
					this.mainClientState.enter('client_purchase', client_purchase_args);
				}
				break;
			case 'client_technique':
			case 'client_build':
			case 'client_inventory':
				if (this.checkLock()) {
					this.mainClientState.enter('client_purchase', {
						pos: pos,
						market_discovery_card_id: undefined,
						calculations_card_id: undefined,
						card_name: card.name,
						cost: card.getCost(pos),
						optionalArgs: {}
					});
				}
				break;
			case 'client_prepaidGood':
				this.playTechniqueCard<'client_prepaidGood'>({
					card_id: card.id
				});
				break;
			case 'client_calculations':
				if (!TargetingLine.exists()) {
					const calculations_args = this.mainClientState.args as ClientGameStates['client_calculations'];
					const calculations_targets: DaleCard[] = [];
					for (let target_id of calculations_args.card_ids) {
						if (target_id != card.id) {
							calculations_targets.push(new DaleCard(target_id));
						}
					}
					new TargetingLine(
						card,
						calculations_targets,
						'daleofmerchants-line-source-technique',
						'daleofmerchants-line-target-technique',
						'daleofmerchants-line-technique',
						(source_id: number) => TargetingLine.remove(),
						(source_id: number, target_id: number) => this.onCalculationsSwap(source_id, target_id)
					);
				}
				break;
			case 'client_shoppingJourney':
				this.resolveTechniqueCard<'client_shoppingJourney'>({
					card_id: card.id
				});
				break;
			case 'deprecated_tasters':
				this.bgaPerformAction('actDeprecatedTasters', {
					card_id: card.id
				})
				break;
			case 'replacement':
				this.bgaPerformAction('actReplacement', {
					card_id: card.id
				})
				break;
			case 'royalPrivilege':
				const royalPrivilege_selected = this.market!.getSelected(pos);
				this.market!.unselectAll();
				if (!royalPrivilege_selected) {
					this.market!.setSelected(pos);
				}
				break;
			case 'celestialGuidanceMarket':
				this.bgaPerformAction('actCelestialGuidanceMarket', {
					card_id: card.id
				})
				break;
			case 'client_snack':
				this.resolveTechniqueCard<'client_snack'>({
					card_id: card.id
				});
				break;
		}
	}

	onUnselectPileCard(pile: Pile, card_id: number) {
		console.warn("onUnselectPileCard");
		switch(this.gamedatas.gamestate.name) {
			case 'client_build':
				this.onBuildSelectionChanged();
				break;
		}
	}

	onSelectPileCard(pile: Pile, card_id?: number) {
		console.warn("onSelectPileCard");
		const card = card_id === undefined ? undefined : new DaleCard(card_id);
		if (pile === this.myDiscard) {
			this.onSelectMyDiscardPileCard(pile, card);
		}
		else if (pile === this.marketDiscard || pile === this.marketDeck) {
			this.onSelectMarketPileCard(pile, card);
		}
		else {
			this.onOtherPileSelectionChanged(pile, card);
		}
	}

	onSelectMyDiscardPileCard(pile: Pile, card?: DaleCard) {
		console.warn("onSelectMyDiscardPileCard");
		switch(this.gamedatas.gamestate.name) {
			case 'client_build':
				if (this.verifyChameleon(card!, pile)) {
					this.onBuildSelectionChanged();
				}
				break;
			case 'client_newSeason':
				this.playTechniqueCard<'client_newSeason'>({
					card_id: card!.id
				})
				break;
			case 'client_siesta':
				this.resolveTechniqueCard<'client_siesta'>({
					card_id: card!.id
				})
				break;
			case 'client_alternativePlan':
				this.playTechniqueCard<'client_alternativePlan'>({
					card_id: card!.id
				})
				break;
			case 'client_cache':
				this.playTechniqueCard<'client_cache'>({
					card_id: card!.id,
					...this.mainClientState.getSpendArgs()
				})
				break;
			case 'client_groundbreakingIdea':
				this.playTechniqueCard<'client_groundbreakingIdea'>({
					card_id: card!.id
				})
				break;
			case 'groundbreakingIdea':
				this.bgaPerformAction('actGroundbreakingIdea', {
					card_id: card!.id
				})
				.then(() => this.myDiscard.setSelectionMode('none')); //fixes the zindex for the discardToDeck animation
				break;
			case 'celestialGuidanceDiscard':
				this.bgaPerformAction('actCelestialGuidanceDiscard', {
					card_id: card!.id
				})
				break;
			case 'fumblingDreamer':
				this.onFumblingDreamer(pile.getPlayerId());
				break;
			case 'looseMarbles':
			case 'anotherFineMess':
				this.onLooseMarblesBegin(pile.getPlayerId(), pile);
				break;
			case 'client_windOfChange':
				this.resolveTechniqueCard<'client_windOfChange'>({
					card_id: card!.id
				})
				break;
		}
	}

	onSelectMarketPileCard(pile: Pile, card?: DaleCard) {
		console.warn("onSelectMarketPileCard");
		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
				this.mainClientState.leave();
				break;
			case 'client_marketDiscovery':
				if (pile === this.marketDeck) {
					this.onMarketDiscoveryToss();
				}
				else if (pile === this.marketDiscard) {
					this.onMarketDiscoveryPurchase();
				}
				break;
			case 'client_fashionHint':
				if (pile === this.marketDeck) {
					this.onFashionHintToss();
				}
				else if (pile === this.marketDiscard) {
					this.onFashionHintTossSkip();
				}
				break;
		}
	}

	onOtherPileSelectionChanged(pile: Pile, card?: DaleCard) {
		console.warn("onOtherPileSelectionChanged");
		switch(this.gamedatas.gamestate.name) {
			case 'magnet':
				this.bgaPerformAction('actMagnet', {
					card_id: card!.id
				})
				break
			case 'deprecated_cheer':
				this.bgaPerformAction('actDeprecatedCheer', {
					card_id: card!.id
				})
				this.myDeck.setSelectionMode('none');
				break
			case 'vigilance':
				this.bgaPerformAction('actVigilance', {
					card_id: card!.id
				})
				break
			case 'manufacturedJoy':
				this.mainClientState.enterOnStack('client_manufacturedJoy', {
					draw_card_id: card!.id,
					card_name: "Manufactured Joy"
				});
				//draw the card on the client-side (it is very important that this happens after switching states, otherwise the div will be detached)
				this.myHand.addDaleCardToStock(card!, this.myDeck.placeholderHTML);
				this.myDeck.pop();
				this.myHandSize.incValue(1);
				break;
			case 'fumblingDreamer':
				this.onFumblingDreamer(pile.getPlayerId());
				break;
			case 'looseMarbles':
			case 'anotherFineMess':
				this.onLooseMarblesBegin(pile.getPlayerId(), pile);
				break;
			case 'client_selectPlayerPassive':
				const client_selectPlayerPassive_args = this.mainClientState.args as ClientGameStates['client_selectPlayerPassive'];
				if (client_selectPlayerPassive_args.via_deck) {
					this.onSelectPlayerPassive(pile.getPlayerId());
				}
				break;
			case 'coffeeGrinder':
				this.onCoffeeGrinderDiscard();
				break;
		}
	}

	onUnselectHandCard(card_id: number) {
		console.warn("onUnselectHandCard: "+card_id);
		const card = new DaleCard(card_id);

		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
				this.onFundsSelectionChanged();
				break;
			case 'client_build':
				this.onBuildSelectionChanged();
				break;
			case 'bonusBuild':
				this.onBuildSelectionChanged();
				break;
			case 'client_glue':
				if (this.myHand.orderedSelection.getSize() == 0) {
					const client_glue_button = $("keep-button");
					if (client_glue_button) {
						dojo.setStyle(client_glue_button, 'display', 'none');
					}
				}
				break;
			case 'client_spend':
				this.onSpendSelectionChanged();
				break;
			case 'client_spendx':
				this.onSpendXSelectionChanged();
				break;
			case 'client_stove':
				this.updateStoveButton();
				break;
			case 'charmStove':
				this.updateStoveButton();
				break;
			case 'travelingEquipment':
				if (this.myHand.count() == 1 && card_id != -1) {
					this.myHand.orderedSelection.toggle(-1); //quick and dirty -1 trick
					this.myHand.selectItem(card_id);
				}
				break;
		}
	}

	onSelectHandCard(card_id: number) {
		console.warn("onSelectHandCard: "+card_id);
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
			case 'bonusBuild':
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
				this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', label);
				new TargetingLine(
					card,
					client_rottenFood_targets,
					"daleofmerchants-line-source-technique",
					"daleofmerchants-line-target-technique",
					"daleofmerchants-line-technique",
					(source_id: number) => this.onCancelClient(),
					(source_id: number, target_id: number) => this.onRottenFood(source_id, target_id)
				)
				break;
			case 'dirtyExchange':
				this.bgaPerformAction('actDirtyExchange', {
					card_id: card.id
				})
				break;
			case 'client_blindfold':
				if (this.verifyChameleon(new DaleCard(card_id))) {
					if (this.unique_opponent_id) {
						this.onBlindfold(card.id);
					}
				}
				break;
			case 'client_glue':
				const client_glue_button = $("keep-button");
				if (client_glue_button) {
					dojo.setStyle(client_glue_button, 'display', '');
				}
				break;
			case 'client_houseCleaningToss':
				this.resolveTechniqueCard<'client_houseCleaningToss'>({
					card_id: card!.id
				})
				break;
			case 'ruthlessCompetition':
				this.bgaPerformAction('actRuthlessCompetition', {
					card_id: card.id
				})
				break;
			case 'client_swank':
				this.playTechniqueCard<'client_swank'>({
					card_id: card!.id
				})
				break;
			case 'refreshingDrink':
				this.bgaPerformAction('actRefreshingDrink', {
					card_id: card.id
				})
				break;
			case 'client_replacement':
				if (this.verifyChameleon(new DaleCard(card_id))) {
					const client_replacement_value = card.effective_value;
					for (let market_card of this.market!.getCards()) {
						if (Math.abs(market_card.original_value - client_replacement_value) <= 1) {
							//a replacement for this card exists!
							this.playTechniqueCard<'client_replacement'>({
								card_id: card!.id
							})
							return;
						}
					}
					//warn the player a replacement for this card does not exist
					this.mainClientState.enter('client_replacementFizzle', {
						technique_card_id: (this.mainClientState.args as ClientGameStates['client_replacement']).technique_card_id,
						toss_card_id: card!.id,
						toss_card_name: card.name
					})
				}
				break;
			case 'client_matchingColours':
				if (this.verifyChameleon(card)) {
					const client_matchingColours_targets = this.getMatchingColoursStallTargets(card);
					if (client_matchingColours_targets.length == 0) {
						this.showMessage(_("No card in any oppponent's stall matches this card's value")+` (${card.effective_value})`, "error");
						return;
					}
					const client_matchingColours_label = _("Swap '") + card.name + _("' with an equal valued card in another player\'s stall");
					this.setMainTitle(client_matchingColours_label);
					this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', client_matchingColours_label);
					new TargetingLine(
						card,
						client_matchingColours_targets,
						"daleofmerchants-line-source-technique",
						"daleofmerchants-line-target-technique",
						"daleofmerchants-line-technique",
						(source_id: number) => this.onCancelClient(),
						(source_id: number, target_id: number) => this.onMatchingColours(source_id, target_id)
					)
				}
				break;
			case 'client_cleverGuardian':
				this.playTechniqueCard<'client_cleverGuardian'>({
					card_id: card!.id
				})
				break;
			case 'client_manufacturedJoy':
				const client_manufacturedJoy_targets = [];
				for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
					const target = discard.topCardHTML ?? discard.placeholderHTML
					target.dataset['target_id'] = player_id;
					client_manufacturedJoy_targets.push(target);
				}
				const client_manufacturedJoy_label = _("Place '") + card.name + _("' on a discard pile");
				this.setMainTitle(client_manufacturedJoy_label);
				this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', client_manufacturedJoy_label);
				new TargetingLine(
					card,
					client_manufacturedJoy_targets,
					"daleofmerchants-line-source-technique",
					"daleofmerchants-line-target-technique",
					"daleofmerchants-line-technique",
					(source_id: number) => this.onManufacturedJoyCancelTargetingLine(),
					(source_id: number, target_id: number) => this.onManufacturedJoy(source_id, target_id)
				)
				this.removeActionButtons();
				this.addActionButton("cancel-button", _("Cancel"), "onManufacturedJoyCancelTargetingLine", undefined, false, 'gray');
				break;
			case 'client_spend':
				this.onSpendSelectionChanged();
				break;
			case 'client_spendx':
				this.onSpendXSelectionChanged();
				break;
			case 'client_stove':
				this.updateStoveButton();
				break;
			case 'charmStove':
				this.updateStoveButton();
				break;
			case 'bouquets':
				this.bgaPerformAction('actBouquets', {
					card_id: card.id
				})
				break;
			case null:
				throw new Error("gamestate.name is null");
		}
	}

	onSelectLimboCard(card_id: number) {
		console.warn("onSelectLimboCard: "+card_id);
		const card = new DaleCard(card_id);

		switch(this.gamedatas.gamestate.name) {
			case 'sabotage':
				this.bgaPerformAction('actSabotage', {
					card_id: card.id
				})
				break;
			case 'nightShift':
				if (!TargetingLine.exists()) {
					const nightShift_args = (this.gamedatas.gamestate.args as { player_ids: number[] });
					const nightShift_targets = [];
					for (let player_id of nightShift_args.player_ids) {
						const deck = this.playerDecks[player_id]!;
						const target = deck.topCardHTML ?? deck.placeholderHTML
						target.dataset['target_id'] = String(player_id);
						nightShift_targets.push(target);
					}
					const label = _("Place '") + card.name + _("' on a deck");
					this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', label);
					new TargetingLine(
						card,
						nightShift_targets,
						"daleofmerchants-line-source-technique",
						"daleofmerchants-line-target-technique",
						"daleofmerchants-line-technique",
						(source_id: number) => this.onNightShiftNext(),
						(source_id: number, target_id: number) => this.onNightShift(source_id, target_id)
					)
				}
				break;
			case 'delightfulSurprise':
				this.bgaPerformAction('actDelightfulSurprise', {
					card_id: card.id
				})
				break;
			case 'pompousProfessional':
				const pompousProfessional_isValid = this.validatePompousProfessionalSelection();
				if (!pompousProfessional_isValid) {
					const pompousProfessional_args = this.gamedatas.gamestate.args as { animalfolk_id: number, animalfolk_name: number };
					this.showMessage(_("Please choose a '")+pompousProfessional_args.animalfolk_name+_("' card"), 'error');
					return;
				}
				break;
			case 'delicacy':
				this.onDelicacy(card.id);
				break;
			case 'umbrella':
				this.onUmbrella(card.id);
				break;
			case 'anchor':
			case 'shakyEnterprise':
				const anchor_targets = [];
				for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
					const target = discard.topCardHTML ?? discard.placeholderHTML
					target.dataset['target_id'] = player_id;
					anchor_targets.push(target);
				}
				const anchor_label = _("Place '") + card.name + _("' on a discard pile");
				this.setMainTitle(anchor_label);
				this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', anchor_label);
				new TargetingLine(
					card,
					anchor_targets,
					"daleofmerchants-line-source-technique",
					"daleofmerchants-line-target-technique",
					"daleofmerchants-line-technique",
					(source_id: number) => this.onAnchorCancelTargetingLine(),
					(source_id: number, target_id: number) => this.onAnchor(source_id, target_id)
				)
				this.addActionButton("undo-button", _("Cancel"), "onAnchorCancelTargetingLine", undefined, false, 'gray');
				break;
			case 'badOmen':
				if (card.isAnimalfolk()) {
					this.stockToPile(card, this.myLimbo, this.marketDiscard);
				}
				else {
					//warning: if specialty/trap cards exist, this should go somewhere else
					this.myLimbo.removeFromStockById(card.id);
				}
				const badOmen_args = this.gamedatas.gamestate.args as { resolving_card_name?: string }
				this.mainClientState.enterOnStack('client_badOmen', {
					toss_card_id: card.id,
					card_name: badOmen_args.resolving_card_name ?? "MISSING CARD NAME"
				});
				break;
		}
	}

	onUnselectLimboCard(card_id: number) {
		console.warn("onUnselectLimboCard: "+card_id);
		const card = new DaleCard(card_id);

		switch(this.gamedatas.gamestate.name) {
			case 'pompousProfessional':
				this.validatePompousProfessionalSelection();
				break;
		}
	}

	onSelectScheduleCard(card_id: number) {
		console.warn("onSelectScheduleCard: "+card_id);
		const card = new DaleCard(card_id);

		switch(this.gamedatas.gamestate.name) {
			case 'turnStart':
			case 'trigger':
				this.onTriggerTechnique(card_id);
				break;
			case 'client_technique':
				this.onTriggerTechnique(card_id); //finish or snack
				break;
			case 'client_spend':
			case 'client_spendx':
				const finish_card_id = (this.mainClientState.args as any).passive_card_id;
				this.mainClientState.leave();
				if (card_id != finish_card_id) {
					this.onTriggerTechnique(card_id); //select other finish card
				}
				break;
			case 'client_build':
				if (card.effective_type_id == DaleCard.CT_OVERTIME) {
					this.myDiscard.openPopin();
				}
				break;
		}
	}

	onTriggerTechnique(card_id: number) {
		const card = new DaleCard(card_id);
		let fizzle = true;
		switch(card.effective_type_id) {
			case DaleCard.CT_IMPULSIVEVISIONARY:
				this.clientFinishTechnique('resolveTechniqueCard', card.id, 1);
				break;
			case DaleCard.CT_COLLECTORSDESIRE:
				this.clientFinishTechnique('resolveTechniqueCard', card.id, 2);
				break;
			case DaleCard.CT_GROUNDBREAKINGIDEA:
				this.clientFinishTechnique('resolveTechniqueCard', card.id, 2);
				break;
			case DaleCard.CT_INSPIRATION:
				this.clientFinishTechnique('resolveTechniqueCard', card.id, 2);
				break;
			case DaleCard.CT_INSIGHT:
				this.clientFinishTechnique('resolveTechniqueCard', card.id, 2);
				break;
			case DaleCard.CT_PERFECTMOVE:
				this.clientFinishTechnique('resolveTechniqueCard', card.id, 3);
				break;
			case DaleCard.CT_SHOPPINGJOURNEY:
				fizzle = this.market!.getCards().length == 0;
				this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_shoppingJourney', card.id);
				break;
			case DaleCard.CT_HOUSECLEANING:
				fizzle = this.myHand.count() == 0;
				this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_houseCleaningToss', card.id);
				break;
			case DaleCard.CT_SIESTA:
			case DaleCard.CT_MASTERBUILDER:
				fizzle = this.myDiscard.size == 0;
				this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_siesta', card.id);
				break;
			case DaleCard.CT_SNACK:
				fizzle = this.market!.size == 0;
				this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_snack', card.id);
				break;
			case DaleCard.CT_WINDOFCHANGE:
				fizzle = this.myDiscard.size == 0;
				this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_windOfChange', card.id);
				break;
			default:
				this.clientTriggerTechnique('client_choicelessTriggerTechniqueCard', card.id);
				break;
		}
	}

	onFundsSelectionChanged() {
		const args = this.mainClientState.args as ClientGameStates['client_purchase'];
		this.coinManager.setCoinsToSpendImplicitly(this.myHand.getSelectedDaleCards(), args.cost, true);
	}

	onSpendSelectionChanged() {
		console.warn("onSpendSelectionChanged");
		const args = this.mainClientState.args as ClientGameStates['client_spend'];
		this.coinManager.setCoinsToSpendImplicitly(this.myHand.getSelectedDaleCards(), args.cost);
	}

	onSpendXSelectionChanged() {
		console.warn("onSpendXSelectionChanged");
		this.updateSpendXButton();
	}

	onPurchase() {
		//const args = {...(this.mainClientState.args as ClientGameStates['client_purchase'])};
		const args = this.mainClientState.args as ClientGameStates['client_purchase'];
		switch (this.gamedatas.gamestate.name) {
			case 'client_purchase':
				args.funds_card_ids = this.myHand.orderedSelection.get();
				break;
			case 'client_essentialPurchase':
				args.optionalArgs.essential_purchase_ids = this.myHand.orderedSelection.get();
				break;
			case 'client_glue':
				args.optionalArgs.glue_card_ids = this.myHand.orderedSelection.get();
				break;
			default:
				throw new Error(`You cannot purchase a card from gamestate '${this.gamedatas.gamestate}'`)
		}
		if (args.funds_card_ids === undefined) {
			throw new Error("onPurchase: funds_card_ids is undefined, but it was expected to be defined in '${this.gamedatas.gamestate}'")
		}

		var card_id;
		if (args.market_discovery_card_id === undefined) {
			card_id = this.market!.getCardId(args.pos);
			console.warn(card_id);
		}
		else {
			const card = this.marketDiscard.peek();
			if (!card) {
				throw new Error("Cannot purchase from the bin, as it is empty")
			}
			card_id = card.id;
		}
		if (!this.mainClientState.stackIncludes('client_glue') && DaleCard.containsTypeId(args.funds_card_ids, DaleCard.CT_GLUE)) {
			this.mainClientState.enterOnStack('client_glue', args);
		}
		else if (!this.mainClientState.stackIncludes('client_essentialPurchase') && new DaleCard(card_id).effective_type_id == DaleCard.CT_ESSENTIALPURCHASE) {
			this.mainClientState.enterOnStack('client_essentialPurchase', args);
		}
		else {
			this.bgaPerformAction('actPurchase', {
				funds_card_ids: this.arrayToNumberList(args.funds_card_ids),
				market_card_id: card_id,
				chameleons_json: DaleCard.getLocalChameleonsJSON(),
				args: JSON.stringify(args.optionalArgs)
			})
			while (this.gamedatas.gamestate.name != 'client_purchase') {
				this.mainClientState.leave(); //see issue #97.2 and #97.3
			}
		}
	}

	onMarketDiscoveryToss() {
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
			this.mainClientState.setPassiveSelected(false);
			this.mainClientState.enter('client_purchase', {
				pos: -1,
				market_discovery_card_id: market_discovery_card_id,
				calculations_card_id: undefined,
				card_name: card.name,
				cost: card.original_value,
				optionalArgs: {}
			});
		}
	}

	onFizzle() {
		this.playTechniqueCard<'client_fizzle'>({
			fizzle: true
		})
	}

	onTriggerFizzle() {
		this.resolveTechniqueCard<'client_triggerFizzle'>({
			fizzle: true
		})
	}

	onChoicelessTriggerTechniqueCard() {
		this.resolveTechniqueCard<'client_choicelessTriggerTechniqueCard'>({
			choiceless: true
		})
	}

	onChoicelessTechniqueCard() {
		this.playTechniqueCardWithServerState<'client_choicelessTechniqueCard'>({
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
		})?.catch(() => {
			//needed to catch the CT_COFFEEGRINDER error
			if (argsPassive?.keep_passive_selected) {
				this.setPassiveSelected(argsPassive.passive_card_id, false);
			}
		});
		const argsPassive = this.mainClientState.args as PassiveClientStates[K];
		this.mainClientState.leave();
		if (argsPassive.keep_passive_selected) {
			this.setPassiveSelected(argsPassive.passive_card_id, true);
		}
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
		}).then(
			() => this.mainClientState.leave()
		);
	}

	/**
	 * Locally schedule a technique, then open the related client technique choice state
	 */
	clientScheduleTechnique<K extends keyof ClientTechniqueChoice>(stateName: K, technique_card_id: number, args: any = {}) {
		if (this.checkLock()) {
			if ($(this.myHand.control_name+'_item_' + technique_card_id)) {
				this.mySchedule.addDaleCardToStock(new DaleCard(technique_card_id), this.myHand.control_name+'_item_'+technique_card_id)
				this.myHand.removeFromStockByIdNoAnimation(+technique_card_id);
			}
			else {
				throw new Error(`Cannot schedule the technique card. Card ${technique_card_id} does not exist in my hand`);
			}
			this.myHandSize.incValue(-1);
			this.mainClientState.enterOnStack(stateName, { technique_card_id: technique_card_id, ...args });
		}
	}

	/**
	 * Locally schedule a technique with a 'spend' ability, then open the related client technique choice state.
	 * Fizzle the technique if there is no way to cover the cost.
	 * @param next next state to goto after the spend cost is selected
	 * @param technique_card_id
	 * @param cost cost to pay
	 * @param max_cost (optional) - if provided, the spend ability has a range [`cost`, `max_cost`]
	 */
	clientScheduleSpendTechnique(next: ClientSpendNext, technique_card_id: number, cost: number, cost_max?: number) {
		const other_hand_cards = this.myHand.getAllDaleCards().filter(card => card.id != technique_card_id);
		const max_value = this.coinManager.getMaximumSpendValue(other_hand_cards);
		if (cost > max_value) {
			this.clientScheduleTechnique('client_fizzle', technique_card_id, {
				cost: cost,
				next: next
			});
		}
		else if (cost_max === undefined) {
			this.clientScheduleTechnique('client_spend', technique_card_id, {
				cost: cost,
				next: next
			});
		}
		else {
			this.clientScheduleTechnique('client_spendx', technique_card_id, {
				cost_min: cost,
				cost_max: cost_max,
				cost_displayed: (cost_max == Infinity) ? `${cost}+` : `${cost} - ${cost_max}`,
				next: next
			});
		}
	}

	/**
	 * Finish a technique using the 'spend' client states.
	 * Show a bga error if there is no way to cover the cost.
	 * @param next next state to goto after the spend cost is selected
	 * @param technique_card_id
	 * @param cost cost to pay
	 * @param max_cost (optional) - if provided, the spend ability has a range [`cost`, `max_cost`]
	 */
	clientFinishTechnique(next: ClientSpendNext, technique_card_id: number, cost: number, cost_max?: number) {
		const other_hand_cards = this.myHand.getAllDaleCards().filter(card => card.id != technique_card_id);
		const max_value = this.coinManager.getMaximumSpendValue(other_hand_cards);
		if (cost > max_value) {
			this.showMessage(_("Not enough funds to finish this card"), 'error');
			return;
		}
		else if (cost_max === undefined) {
			this.clientTriggerTechnique('client_spend', technique_card_id, {
				cost: cost,
				next: next
			});
		}
		else {
			this.clientTriggerTechnique('client_spendx', technique_card_id, {
				cost_min: cost,
				cost_max: cost_max,
				cost_displayed: (cost_max == Infinity) ? `${cost}+` : `${cost} - ${cost_max}`,
				next: next
			});
		}
	}


	/**
	 * Resolve a trigger technique card that is already locally inside your schedule for an open-information choice. Then proceed to an hidden-information server choice state.
	 * @param args result of the open-infomation choice to send to the server
	 */
	resolveTechniqueCardWithServerState<K extends keyof ClientTriggerTechniqueChoice>(args: ClientTriggerTechniqueChoice[K]) {
		//is this function even needed...?
		const card_id = (this.mainClientState.args as ClientGameStates[K]).technique_card_id;
		this.bgaPerformAction('actFullyResolveTechniqueCard', {
			card_id: card_id,
			chameleons_json: DaleCard.getLocalChameleonsJSON(),
			args: JSON.stringify(args)
		});
		this.mainClientState.leaveAndDontReturn();
	}
	
	/**
	 * Resolve a trigger technique card that is already locally inside your schedule for an open-information choice
	 * @param args result of the open-infomation choice to send to the server
	 */
	resolveTechniqueCard<K extends keyof ClientTriggerTechniqueChoice>(args: ClientTriggerTechniqueChoice[K]) {
		const card_id = (this.mainClientState.args as ClientGameStates[K]).technique_card_id;
		this.bgaPerformAction('actFullyResolveTechniqueCard', {
			card_id: card_id,
			chameleons_json: DaleCard.getLocalChameleonsJSON(),
			args: JSON.stringify(args)
		});
		this.mainClientState.leave();
	}

	/**
	 * Trigger and resolve an already scheduled technique
	 */
	clientTriggerTechnique<K extends keyof ClientTriggerTechniqueChoice>(stateName: K, technique_card_id: number, args: any = {}) {
		if (this.checkLock(true)) {
			if ($(this.mySchedule.control_name+'_item_' + technique_card_id)) {
				this.mainClientState.enterOnStack(stateName, { 
					technique_card_id: technique_card_id, 
					passive_card_id: technique_card_id, //for the blue outline
					is_trigger: true, 
					...args 
				});
			}
			else {
				throw new Error(`Cannot trigger and resolve the technique card. Card ${technique_card_id} does not exist in my schedule`);
			}
		}
	}

	onAcorn(source_id: number, target_id: number) {
		for (const [player_id, player_stall] of Object.entries(this.playerStalls)) {
			if (player_stall.contains(target_id)) {
				this.playTechniqueCard<'client_acorn'>({
					stall_player_id: +player_id,
					stall_card_id: target_id
				})
				break;
			}
		}
	}

	onGiftVoucher(source_id: number, target_id: number) {
		if (this.market!.contains(target_id)) {
			this.playTechniqueCard<'client_giftVoucher'>({
				market_card_id: target_id
			})
		}
	}

	onSafetyPrecaution(source_id: number, target_id: number) {
		if (this.myStall.contains(target_id)) {
			this.playTechniqueCard<'client_safetyPrecaution'>({
				card_id: target_id
			})
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
			case DaleCard.CT_FORTUNATEUPGRADE:
			case DaleCard.CT_GOLDENOPPORTUNITY:
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
			case DaleCard.CT_DELICACY:
			case DaleCard.CT_UMBRELLA:
				if (this.unique_opponent_id) {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				else {
					this.clientScheduleTechnique('client_selectOpponentTechnique', card.id);
				}
				break;
			case DaleCard.CT_FRESHSTART:
				this.clientScheduleTechnique('client_selectPlayerTechnique', card.id);
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
			case DaleCard.CT_NEWSEASON:
				fizzle = true
				for (let card of this.myDiscard.getCards()) {
					if (card.isAnimalfolk()) {
						fizzle = false;
					}
				}
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_newSeason', card.id);
				}
				break;
			case DaleCard.CT_ACCIDENT:
				fizzle = this.myHand.count() == 1;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_accident', card.id);
				}
				break;
			case DaleCard.CT_WHIRLIGIG:
				if (this.unique_opponent_id) {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				else {
					this.clientScheduleTechnique('client_whirligig', card.id);
				}
				break;
			case DaleCard.CT_CHARM:
			case DaleCard.CT_SPECIALOFFER:
			case DaleCard.CT_INHERITANCE:
				fizzle = (this.marketDiscard.size + this.marketDeck.size) == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_GAMBLE:
				if (this.unique_opponent_id) {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				else {
					this.clientScheduleTechnique('client_gamble', card.id);
				}
				break;
			case DaleCard.CT_BLINDFOLD:
				fizzle = this.myHand.count() == 1;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_blindfold', card.id);
				}
				break;
			case DaleCard.CT_TIRELESSTINKERER:
				fizzle = this.myDiscard.size == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_SAFETYPRECAUTION:
				fizzle = this.myStall.getNumberOfStacks() == 0
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.mainClientState.enterOnStack('client_safetyPrecaution', { technique_card_id: card.id });
				}
				break;
			case DaleCard.CT_MAGNET:
			case DaleCard.CT_RAKE:
			case DaleCard.CT_WHEELBARROW:
			case DaleCard.CT_VIGILANCE:
			case DaleCard.CT_SUPPLYDEPOT:
			case DaleCard.CT_MEDDLINGMARKETEER:
			case DaleCard.CT_ANCHOR:
			case DaleCard.CT_BADOMEN:
				fizzle = (this.myDiscard.size + this.myDeck.size) == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_HOUSECLEANING:
				let houseCleaningJunk = 0;
				for (let card of this.myDiscard.getCards()) {
					if (card.isJunk() && houseCleaningJunk < 3) {
						houseCleaningJunk++;
					}
				}
				this.clientScheduleTechnique('client_houseCleaning', card.id, {
					nbr_junk: houseCleaningJunk
				});
				break;
			case DaleCard.CT_NIGHTSHIFT:
			case DaleCard.CT_RUMOURS:
				for (let player_id of this.gamedatas.playerorder) {
					if (this.playerDiscards[player_id]!.size + this.playerDecks[player_id]!.size > 0) {
						fizzle = false;
					}
				}
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_RUTHLESSCOMPETITION:
				for (let player_id of this.gamedatas.playerorder) {
					if ((player_id != this.player_id) && this.playerDiscards[player_id]!.size + this.playerDecks[player_id]!.size > 0) {
						fizzle = false;
					}
				}
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_ruthlessCompetition', card.id);
				}
				break;
			case DaleCard.CT_RAFFLE:
				if (this.unique_opponent_id) {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				else {
					this.clientScheduleTechnique('client_raffle', card.id);
				}
				break;
			case DaleCard.CT_CHARITY:
				let charity_valid_players = 0;
				for (let player_id in this.gamedatas.players) {
					let grasp_hand_size = this.playerHandSizes[player_id]!.getValue();
					if (+player_id == this.player_id) {
						grasp_hand_size -= 1; //this card itself doesn't count
					}
					if (grasp_hand_size > 0) {
						charity_valid_players += 1;
					}
				}
				if (charity_valid_players == 0) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_DEPRECATED_TASTERS:
				const deprecated_tasters_nbr = this.market!.getCards().length;
				fizzle = deprecated_tasters_nbr == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else if (this.unique_opponent_id || deprecated_tasters_nbr == 1) {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				else {
					this.clientScheduleTechnique('client_deprecated_tasters', card.id);
				}
				break;
			case DaleCard.CT_TASTERS:
				const tasters_nbr = this.market!.getCards().length;
				fizzle = tasters_nbr == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_RAREARTEFACT:
				fizzle = this.myHand.count() == 1;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_rareArtefact', card.id);
				}
				break;
			case DaleCard.CT_SWANK:
				fizzle = this.myHand.count() == 1;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_swank', card.id);
				}
				break;
			case DaleCard.CT_RISKYBUSINESS:
				fizzle = (this.marketDiscard.size + this.marketDeck.size) == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_riskyBusiness', card.id);
				}
				break;
			case DaleCard.CT_NATURALSURVIVOR:
				fizzle = this.myDeck.size == 0 || this.myHand.count() <= 1;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_DUPLICATEENTRY:
				fizzle = (this.myDiscard.size + this.myDeck.size) == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_HISTORYLESSON:
				fizzle = this.myDiscard.size == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_historyLesson', card.id);
				}
				break;
			case DaleCard.CT_CULTURALPRESERVATION:
				fizzle = (this.myDiscard.size + this.myDeck.size) == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_VORACIOUSCONSUMER:
				fizzle = this.myDeck.size + this.myDiscard.size == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_REPLACEMENT:
				if (this.myHand.count() == 1) {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				else {
					this.clientScheduleTechnique('client_replacement', card.id);
				}
				break;
			case DaleCard.CT_FASHIONHINT:
				fizzle = (this.marketDiscard.size + this.marketDeck.size) == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_fashionHint', card.id);
				}
				break;
			case DaleCard.CT_POMPOUSPROFESSIONAL:
				fizzle = this.myDeck.size + this.myDiscard.size == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_pompousProfessional', card.id);
				}
				break;
			case DaleCard.CT_BURGLARY:
				let burglary_opponents_nbr = 0;
				let burglary_opponent_id = undefined;
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id) {
						const deck = this.playerDecks[player_id]!;
						const discard = this.playerDiscards[player_id]!;
						if (deck.size + discard.size > 0) {
							burglary_opponents_nbr += 1
							burglary_opponent_id = +player_id;
						}
					}
				}
				if (burglary_opponents_nbr == 0) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_burglaryOpponentId', card.id);
					//immediately go the the value selection state
					if (burglary_opponents_nbr == 1) {
						if (burglary_opponent_id === undefined) {
							throw new Error("Invariant Error: burglary_opponent_id should have been defined");
						}
						this.mainClientState.enter('client_burglaryValue', {
							technique_card_id: card.id,
							opponent_id: burglary_opponent_id,
							opponent_name: this.gamedatas.players[burglary_opponent_id]!.name!
						})
					}
				}
				break;
			case DaleCard.CT_GRASP:
				let grasp_opponents_nbr = 0;
				let grasp_opponent_id = undefined;
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id && this.playerHandSizes[player_id]!.getValue() > 0) {
						grasp_opponents_nbr += 1
						grasp_opponent_id = +player_id;
					}
				}
				if (grasp_opponents_nbr == 0) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_graspOpponentId', card.id);
					//immediately go the the value selection state
					if (grasp_opponents_nbr == 1) {
						if (grasp_opponent_id === undefined) {
							throw new Error("Invariant Error: grasp_opponent_id should have been defined");
						}
						this.mainClientState.enter('client_graspValue', {
							technique_card_id: card.id,
							opponent_id: grasp_opponent_id,
							opponent_name: this.gamedatas.players[grasp_opponent_id]!.name!
						})
					}
				}
				break;
			case DaleCard.CT_SUDDENNAP:
				this.clientScheduleTechnique('client_suddenNap', card.id);
				break;
			case DaleCard.CT_PERISCOPE:
				let periscope_opponents_nbr = 0;
				let periscope_opponent_id = undefined;
				for (let player_id in this.gamedatas.players) {
					if (+player_id != this.player_id) {
						const deck = this.playerDecks[player_id]!;
						const discard = this.playerDiscards[player_id]!;
						if (deck.size + discard.size > 0) {
							periscope_opponents_nbr += 1
							periscope_opponent_id = +player_id;
						}
					}
				}
				if (periscope_opponents_nbr == 0) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_periscopeOpponentId', card.id);
					//immediately go the the name selection state
					if (periscope_opponents_nbr == 1) {
						if (periscope_opponent_id === undefined) {
							throw new Error("Invariant Error: burglary_opponent_id should have been defined");
						}
						this.mainClientState.enter('client_periscopeAnimalfolkId', {
							technique_card_id: card.id,
							opponent_id: periscope_opponent_id,
							opponent_name: this.gamedatas.players[periscope_opponent_id]!.name!
						})
					}
				}
				break;
			case DaleCard.CT_CAREFREESWAPPER:
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
					this.clientScheduleTechnique('client_carefreeSwapper', card.id);
				}
				break;
			case DaleCard.CT_VELOCIPEDE:
				for (let player_id in this.gamedatas.players) {
					if (this.playerStalls[player_id]!.getNumberOfStacks() > 0) {
						fizzle = false;
						break;
					}
				}
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.mainClientState.enterOnStack('client_velocipede', { technique_card_id: card.id });
				}
				break;
			case DaleCard.CT_MATCHINGCOLOURS:
				fizzle = this.getMatchingColoursHandTargets(card.id).length == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_matchingColours', card.id);
				}
				break;
			case DaleCard.CT_CLEVERGUARDIAN:
				if (this.myHand.count() == 1) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_cleverGuardian', card.id);
				}
				break;
			case DaleCard.CT_GOODWILLPRESENTS:
				this.clientScheduleTechnique('client_goodwillpresents', card.id);
				break;
			case DaleCard.CT_ALTERNATIVEPLAN:
				if (this.myDiscard.size == 0) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_alternativePlan', card.id);
				}
				break;
			case DaleCard.CT_MANUFACTUREDJOY:
			case DaleCard.CT_BOUQUETS:
				fizzle = (this.myDiscard.size + this.myDeck.size + this.myHand.count()) <= 1;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_SHAKYENTERPRISE:
				fizzle = this.myDiscard.size == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					//client_shakyEnterprise lets a client select any of the top 3 cards of the discard pile
					this.clientScheduleTechnique('client_shakyEnterprise', card.id);
				}
				break;
			case DaleCard.CT_CACHE:
				fizzle = this.myDiscard.size == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					this.clientScheduleSpendTechnique('client_cache', card.id, 2);
				}
				break;
			case DaleCard.CT_DISPLAYOFPOWER:
				this.clientScheduleSpendTechnique('playTechniqueCard', card.id, 2);
				break;
			case DaleCard.CT_SAFEPROFITS:
				this.clientScheduleSpendTechnique('playTechniqueCard', card.id, 1, 10);
				break;
			case DaleCard.CT_RESOURCEFULALLY:
				this.clientScheduleSpendTechnique('playTechniqueCardWithServerState', card.id, 2);
				break;
			case DaleCard.CT_ICETRADE:
				this.clientScheduleSpendTechnique('playTechniqueCard', card.id, 1, Infinity);
				break;
			case DaleCard.CT_TRAVELINGEQUIPMENT:
				this.clientScheduleSpendTechnique('playTechniqueCardWithServerState', card.id, 1);
				break;
			case DaleCard.CT_FISHING:
				this.clientScheduleSpendTechnique('playTechniqueCardWithServerState', card.id, 1);
				break;
			case DaleCard.CT_GROUNDBREAKINGIDEA:
				if (this.myDiscard.size > 0) {
					this.clientScheduleTechnique('client_groundbreakingIdea', card.id);
				}
				else {
					this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				}
				break;
			case DaleCard.CT_SELECTINGCONTRACTS:
				fizzle = this.myDiscard.size == 0;
				if (fizzle) {
					this.clientScheduleTechnique('client_fizzle', card.id);
				}
				else {
					let client_selectingContracts_nbr = 0;
					switch (this.myClock.getClock()) {
						case PlayerClock.CLOCK_DAWN:
							client_selectingContracts_nbr = 2;
							break;
						case PlayerClock.CLOCK_DAY:
							client_selectingContracts_nbr = 4;
							break;
						case PlayerClock.CLOCK_NIGHT:
							client_selectingContracts_nbr = 1;
							break;
					}
					client_selectingContracts_nbr = Math.min(client_selectingContracts_nbr, this.myDiscard.size);
					this.clientScheduleTechnique('client_selectingContracts', card.id, {nbr: client_selectingContracts_nbr});
				}
				break;
			case DaleCard.CT_SERENADE:
				switch (this.myClock.getClock()) {
					case PlayerClock.CLOCK_DAWN:
						console.warn("Dawn: DaleCard.CT_SERENADE == DaleCard.CT_SAFETYPRECAUTION");
						for (let player_id in this.gamedatas.players) {
							if (this.playerStalls[player_id]!.getNumberOfStacks() > 0) {
								fizzle = false;
								break;
							}
						}
						if (fizzle) {
							this.clientScheduleTechnique('client_fizzle', card.id);
						}
						else {
							this.mainClientState.enterOnStack('client_safetyPrecaution', { technique_card_id: card.id });
						}
						break;
					case PlayerClock.CLOCK_DAY:
						console.warn("Day: DaleCard.CT_SERENADE == DaleCard.CT_ACORN");
						if (this.myStall.getNumberOfStacks() > 0) {
							fizzle = false;
						}
						if (fizzle) {
							this.clientScheduleTechnique('client_fizzle', card.id);
						}
						else {
							this.mainClientState.enterOnStack('client_acorn', { technique_card_id: card.id });
						}
						break;
					case PlayerClock.CLOCK_NIGHT:
						console.warn("Night: DaleCard.CT_SERENADE == DaleCard.CT_GIFTVOUCHER");
						fizzle = this.market!.getCards().length == 0;
						if (fizzle) {
							this.clientScheduleTechnique('client_fizzle', card.id);
						}
						else {
							this.mainClientState.enterOnStack('client_giftVoucher', { technique_card_id: card.id });
						}
						break;
					default:
						throw new Error("Serenade played with an invalid clock");
				}
				break;
			case DaleCard.CT_GENERATIONCHANGE:
				this.clientScheduleTechnique('client_generationChange', card.id, { 
					nbr: Math.min(2, this.myDiscard.size)
				});
				break;
			default:
				this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
				break;
			//(~schedule)
		}
	}

	/**
	 * The user clicked on a card with a passive ability. Jump to the related choice state
	 * @param card the card that wants to use its passive ability
	 */
	onClickPassive(card: DaleCard, postCleanUp: boolean = false) {
		const type_id = card.effective_type_id;
		if (type_id != DaleCard.CT_GOODOLDTIMES && type_id != DaleCard.CT_DEPRECATED_MARKETDISCOVERY) {
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
			case DaleCard.CT_DEPRECATED_MARKETDISCOVERY:
				if (this.gamedatas.gamestate.name == 'postCleanUpPhase') {
					if (card.isPassiveUsed()) {
						this.showMessage(_("This passive's ability was already used"), 'error');
					}
					else {
						this.mainClientState.enterOnStack('client_marketDiscovery', {passive_card_id: card.id});
						this.onMarketDiscoveryToss();
					}
				}
				else if (card.isPassiveUsed()) {
					this.onMarketDiscoveryPurchase(card.id);
				}
				else {
					this.mainClientState.enterOnStack('client_marketDiscovery', {passive_card_id: card.id});
				}
				break;
			case DaleCard.CT_CALCULATIONS:
				const client_calculations_card_ids = this.market!.saveArrangement();
				this.mainClientState.enterOnStack('client_calculations', {
					passive_card_id: card.id, 
					card_ids: client_calculations_card_ids, 
					card_id_last: client_calculations_card_ids[0]!
				});
				break;
			case DaleCard.CT_SLICEOFLIFE:
				if (this.myHand.count() < 2) {
					this.showMessage(_("Not enough cards to discard"), 'error');
					return;
				}
				this.mainClientState.enterOnStack('client_sliceoflife', { passive_card_id: card.id, disable_cancel_on_click: true });
				break;
			case DaleCard.CT_SPINNINGWHEEL:
				this.mainClientState.enterOnStack('client_spinningWheel', { passive_card_id: card.id, disable_cancel_on_click: true });
				break;
			case DaleCard.CT_CUNNINGNEIGHBOUR:
				if (this.unique_opponent_id) {
					this.mainClientState.enterOnStack('client_choicelessPassiveCard', {passive_card_id: card.id, keep_passive_selected: true});
				}
				else {
					this.mainClientState.enterOnStack('client_selectOpponentPassive', {passive_card_id: card.id, keep_passive_selected: true});
				}
				break;
			case DaleCard.CT_BARRICADE:
				let barricadeJunk = 0;
				for (let card of this.myDiscard.getCards()) {
					if (card.isJunk() && barricadeJunk < 2) {
						barricadeJunk++;
					}
				}
				this.mainClientState.enterOnStack('client_barricade', { passive_card_id: card.id, nbr_junk: barricadeJunk });
				break;
			case DaleCard.CT_GREED:
				this.mainClientState.enterOnStack('client_spend', { passive_card_id: card.id, 
					cost: 1, 
					next: 'playPassiveCard'
				} as unknown as ClientGameStates['client_spend']);
				break;
			case DaleCard.CT_COFFEEGRINDER:
				this.mainClientState.enterOnStack('client_selectPlayerPassive', { passive_card_id: card.id, via_deck: true, keep_passive_selected: true });
				break;
			case DaleCard.CT_DRAMATICROMANTIC:
				this.mainClientState.enterOnStack('client_dramaticRomantic', {passive_card_id: card.id});
				break;
			case DaleCard.CT_BONSAI:
				this.mainClientState.enterOnStack('client_bonsai', {passive_card_id: card.id});
				break;
			default:
				this.mainClientState.enterOnStack('client_choicelessPassiveCard', {passive_card_id: card.id});
				break;
		}
	}

	onClickCoinManager() {
		switch (this.mainClientState.name) {
			case 'client_spendx':
				this.updateSpendXButton();
				break;
			case 'client_stove':
				this.updateStoveButton();
				break;
		}
		if (this.gamedatas.gamestate.name == 'charmStove') {
			this.updateStoveButton();
		}
	}

	onBuildSelectionChanged(card?: DaleCard){
		console.warn("onBuildSelectionChanged");
		const card_ids = this.myHand.orderedSelection.get();
		let count_nostalgic_items = 0; 
		if (this.mySchedule.countTypeId(DaleCard.CT_OVERTIME) > 0) {
			//when an overtime is in schedule, any number of cards may be selected
			count_nostalgic_items = 999;
		}
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
		console.warn("count_nostalgic_items = "+count_nostalgic_items);
		if (count_nostalgic_items == 0) {
			this.myDiscard.setSelectionMode('none');
		}
		else {
			this.myDiscard.setSelectionMode('multiple', 'build', "daleofmerchants-wrap-build", count_nostalgic_items);
		}
		
	}

	onCharmStove() {
		const spend_card_ids = this.myHand.orderedSelection.get();
		const spend_coins = this.coinManager.getCoinsToSpend();
		this.bgaPerformAction('actCharmStove', {
			spend_card_ids: this.arrayToNumberList(spend_card_ids),
			spend_coins: spend_coins
		});
	}

	onStove() {
		const spend_card_ids = this.myHand.orderedSelection.get();
		const spend_coins = this.coinManager.getCoinsToSpend();
		const args = this.mainClientState.args as ClientGameStates['client_stove'];
		const stove_card_id = (args as ClientGameStates['client_stove']).passive_card_id;
		args.optionalArgs.stove_spend_args![stove_card_id]! = {
			spend_card_ids: spend_card_ids,
			spend_coins: spend_coins
		}
		this.onBuild();
	}

	onBuild() {
		const args = this.mainClientState.args as ClientGameStates['client_build'];
		console.warn("onBuild", args);
		switch (this.gamedatas.gamestate.name) {
			case 'client_stove':
				break; //already set by onStove()
			case 'client_build':
			case 'bonusBuild':
				args.stack_card_ids = this.myHand.orderedSelection.get();
				args.stack_card_ids_from_discard = this.myDiscard.orderedSelection.get();
				args.optionalArgs = {stove_spend_args: {}};
				for (const card_id of [...args.stack_card_ids, ...args.stack_card_ids_from_discard]) {
					if (new DaleCard(card_id).effective_type_id == DaleCard.CT_STOVE) {
						args.optionalArgs.stove_spend_args[card_id] = undefined;
					}
				}
				break;
		}
		if (args.stack_card_ids === undefined || args.stack_card_ids_from_discard == undefined) {
			throw new Error("onBuild: stack_card_ids and stack_card_ids_from_discard are undefined");
		}
		for (const card_id of Object.keys(args.optionalArgs.stove_spend_args)) {
			if (args.optionalArgs.stove_spend_args[+card_id] === undefined) {
				this.mainClientState.setPassiveSelected(false);
				this.mainClientState.enterOnStack('client_stove', {...args, passive_card_id: +card_id});
				this.myStall.selectLeftPlaceholder();
				return;
			}
		}
		this.bgaPerformAction('actBuild', {
			stack_card_ids: this.arrayToNumberList(args.stack_card_ids),
			stack_card_ids_from_discard: this.arrayToNumberList(args.stack_card_ids_from_discard),
			chameleons_json: DaleCard.getLocalChameleonsJSON(),
			args: JSON.stringify(args.optionalArgs)
		}).then(() => {
			//if the build is successful, nicely close the stack of client states
			while (this.gamedatas.gamestate.name != 'client_build' && this.gamedatas.gamestate.name != 'bonusBuild') {
				this.mainClientState.leave(); //see issue #97.2 and #97.3
			}
		});
	}
	
	onBonusBuildSkip() {
		if (this.myHand.orderedSelection.getSize() > 0) {
			//help players to not accidentally skip winter is coming if they intend to cancel their selection instead of skipping
			this.myHand.unselectAll();
		}
		else if(this.checkAction('actBonusBuildSkip')) {
			this.bgaPerformAction('actBonusBuildSkip', {})
		}
	}

	onCancelClient() {
		console.warn("onCancelClient");
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
		console.warn(this.mainClientState.args);
		if ('technique_card_id' in this.mainClientState.args && !('is_trigger' in this.mainClientState.args)) {
			//undo the technique choice state
			const card_id = this.mainClientState.args.technique_card_id
			const card = new DaleCard(card_id);
			const type_id = card.effective_type_id;
			if ((type_id != DaleCard.CT_ACORN && type_id != DaleCard.CT_GIFTVOUCHER && type_id != DaleCard.CT_SAFETYPRECAUTION && type_id != DaleCard.CT_VELOCIPEDE && type_id != DaleCard.CT_SERENADE) || this.mainClientState.name == 'client_fizzle') {
				this.myHand.addDaleCardToStock(card, this.mySchedule.control_name+'_item_'+card_id)
				this.mySchedule.removeFromStockByIdNoAnimation(card_id);
				this.myHandSize.incValue(1);
			}
		}
		this.mainClientState.leave();
	}

	/**
	 * To be called from within a chameleon client state. Confirms the user selection for the chameleon card and restores the server state.
	 * @param target_id target card to bind to
	 * @returns 
	 */
	onConfirmChameleon(target_id: number) {
		console.warn("onConfirmChameleon");
		const target = new DaleCard(target_id);
		const args = this.chameleonArgs!;
		console.warn(args);
		
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
		//check for snacks
		const snack_cards = this.mySchedule.getAllDaleCards().filter(card=>card.effective_type_id == DaleCard.CT_SNACK);
		if (snack_cards.length > 0) {
			//note: if the player wants to resolve snack_cards[1] instead, they should click on it in the schedule
			this.clientTriggerTechnique('client_snack', snack_cards[0]!.id);
			return;
		}
		//default behaviour
		switch(this.gamedatas.gamestate.name) {
			case 'client_purchase':
			case 'client_technique':
			case 'client_build':
			case 'client_inventory':
				this.mainClientState.enter('client_build', {
					stack_index_plus_1: this.myStall!.getNumberOfStacks()+1,
					optionalArgs: { stove_spend_args: {} }
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
		console.warn("Sending "+this.arrayToNumberList(card_ids));
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
		console.warn("Sending "+this.arrayToNumberList(card_ids));
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

	onSelectOpponentTechnique(opponent_id: number) {
		this.playTechniqueCardWithServerState<'client_selectOpponentTechnique'>({
			opponent_id: opponent_id
		})
	}

	onSelectPlayerTechnique(opponent_id: number) {
		this.playTechniqueCardWithServerState<'client_selectPlayerTechnique'>({
			opponent_id: opponent_id
		})
	}

	onSelectOpponentPassive(opponent_id: number) {
		this.playPassiveCard<'client_selectOpponentPassive'>({
			opponent_id: opponent_id
		})
	}

	onSelectPlayerPassive(opponent_id: number) {
		this.playPassiveCard<'client_selectPlayerPassive'>({
			opponent_id: opponent_id
		})
	}

	onTreasureHunter(card_id: number) {
		this.playTechniqueCard<'client_treasureHunter'>({
			card_id: card_id,
		})
	}

	onAccident() {
		var opponent_id;
		if (this.unique_opponent_id) {
			opponent_id = this.unique_opponent_id;
		}
		else if (this.opponent_ids.length == 1) {
			opponent_id = this.opponent_ids[0]!;
		}
		else {
			throw new Error("'addActionButtonsOpponentSelection' did not work as expected");
		}
		this.playTechniqueCard<'client_accident'> ({
			opponent_id: opponent_id,
			card_ids: this.myHand.orderedSelection.get()
		})
	}

	onAccidentDoneLooking() {
		this.bgaPerformAction('actAccident', {});
	}

	onWhirligig(opponent_id: number) {
		this.playTechniqueCardWithServerState<'client_whirligig'>({
			opponent_id: opponent_id
		})
	}

	onGamble(opponent_id: number) {
		this.playTechniqueCardWithServerState<'client_gamble'>({
			opponent_id: opponent_id
		})
	}

	onBlindfold(card_id?: number) {
		var opponent_id;
		if (this.unique_opponent_id) {
			opponent_id = this.unique_opponent_id;
		}
		else if (this.opponent_ids.length == 1) {
			opponent_id = this.opponent_ids[0]!;
		}
		else {
			throw new Error("'addActionButtonsOpponentSelection' did not work as expected");
		}
		card_id = (typeof card_id === 'number') ? card_id : this.myHand.orderedSelection.get()[0];
		if (!card_id) {
			this.showMessage(_("Please select a card from your hand"), 'error');
			return;
		}
		this.playTechniqueCardWithServerState<'client_blindfold'>({
			opponent_id: opponent_id,
			card_id: card_id
		})
	}

	onBlindfoldGuess(value: number) {
		this.bgaPerformAction('actBlindfold', {
			value: value
		});
	}

	onBlindfoldDecideValue(value: number) {
		console.warn("onBlindfoldDecideValue "+value);
		this.bgaPerformAction('actBlindfoldDecideValue', {
			value: value
		});
	}

	onCalculations() {
		if (this.checkLock()) {
			this.mainClientState.setPassiveSelected(false);
			const args = this.mainClientState.args as ClientGameStates['client_calculations'];
			const card = new DaleCard(args.card_id_last);
			const pos = args.card_ids.indexOf(args.card_id_last);
			this.mainClientState.enter('client_purchase', {
				pos: pos,
				market_discovery_card_id: undefined,
				calculations_card_id: args.passive_card_id,
				card_name: card.name,
				cost: card.getCost(pos),
				optionalArgs: {
					calculations_card_ids: args.card_ids,
				}
			});
		}
	}

	onCalculationsSwap(source_id: number, target_id: number) {
		const args = this.mainClientState.args as ClientGameStates['client_calculations'];
		const index_source = args.card_ids.indexOf(source_id);
		const index_target = args.card_ids.indexOf(target_id);
		if (index_source == -1 || index_target == -1) {
			throw new Error(`onCalculationsSwap failed to swap ${source_id} and ${target_id}`);
		}
		const temp = args.card_ids[index_source]!;
		args.card_ids[index_source] = args.card_ids[index_target]!;
		args.card_ids[index_target] = temp;
		this.market!.rearrange(args.card_ids);
		this.onCalculationsUpdateActionButton(source_id);
		TargetingLine.remove();
	}

	onCalculationsUpdateActionButton(card_id: number | null) {
		const button = $("calculations-button");
		if (card_id === null) {
			if (button) {
				dojo.setStyle(button, 'display', 'none');
			}
		}
		else {
			const args = this.mainClientState.args as ClientGameStates['client_calculations'];
			const card = new DaleCard(card_id);
			args.card_id_last = card_id;
			if (button) {
				button.innerHTML = _("Purchase ")+card.name;
				dojo.setStyle(button, 'display', '');
			}
		}
	}
	
	onCalculationsCancel() {
		if (TargetingLine.exists()) {
			TargetingLine.remove();
		}
		else {
			this.market!.restoreArrangement();
			this.onCancelClient();
		}
	}

	onDangerousTest() {
		const card_ids = this.myHand.orderedSelection.get();
		if (card_ids.length != 3) {
			this.showMessage(_("Please select exactly 3 cards to discard"), 'error');
			return;
		}
		this.bgaPerformAction('actDangerousTest', {
			card_ids: this.arrayToNumberList(card_ids)
		})
	}

	onGlueDiscard() {
		for (let card_id of this.myHand.orderedSelection.get()) {
			this.myHand.unselectItem(card_id);
		}
		this.onPurchase();
	}

	onHouseCleaning() {
		this.playTechniqueCard<'client_houseCleaning'>({
			card_ids: this.myDiscard.orderedSelection.get()
		})
	}

	onHouseCleaningSkip() {
		this.resolveTechniqueCard<'client_houseCleaningToss'>({});
	}

	//TODO: safely delete this
	// onSiestaSkip() {
	// 	this.resolveTechniqueCard<'client_siesta'>({});
	// }

	onNightShift(card_id: number, player_id: number) {
		const args = this.gamedatas.gamestate.args as { player_ids: number[] };
		const items = this.myLimbo.getAllItems();
		const card_ids = [card_id];
		const player_ids = [player_id];
		if (items.length == 2) {
			//automatically give the last card
			if (args.player_ids.length != 2) {
				throw new Error(`Night Shift: unable to give ${items.length} cards to ${args.player_ids.length} players`)
			}
			for (let item of items) {
				if (item.id != card_id) {
					card_ids.push(item.id);
				}
			}
			for (let arg_player_id of args.player_ids) {
				if (arg_player_id != player_id) {
					player_ids.push(arg_player_id);
				}
			}
		}
		this.bgaPerformAction('actNightShift', {
			card_ids: this.arrayToNumberList(card_ids),
			player_ids: this.arrayToNumberList(player_ids)
		});
		const index = args.player_ids.indexOf(player_id);
		if (index == -1) {
			throw new Error(`Night Shift: player ${player_id} is not authorized to receive a card`);
		}
		else {
			args.player_ids.splice(index, 1);
		}
		this.onNightShiftNext();
	}

	onNightShiftNext() {
		TargetingLine.remove();
		const label = _("Choose another card to place back");
		this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', label);
	}

	onRuthlessCompetition(opponent_id: number) {
		this.playTechniqueCardWithServerState<'client_ruthlessCompetition'>({
			opponent_id: opponent_id
		})
	}

	onCunningNeighbour() {
		this.bgaPerformAction('actCunningNeighbour', {
			place_on_deck: false //always false since the 10th anniversary rule change
		})
	}

	onRaffle(reverse_direction: boolean) {
		console.warn("onRaffle", reverse_direction ? "right" : "left");
		this.playTechniqueCard<'client_raffle'>({
			reverse_direction: reverse_direction
		})
	}

	onGiveCardsFromLimboToPlayers() {
		//get the selected card and opponent
		const card_id = this.myLimbo.orderedSelection.get()[0];
		if (!card_id) {
			this.showMessage(_("Please choose a card to give"), 'error');
			return;
		}
		const player_id = this.opponent_ids[0];
		if (player_id === undefined) {
			this.showMessage(_("Please choose the player that will receive ")+`'${new DaleCard(card_id).name}'`, 'error');
			return;
		}

		//automatically give the last card
		const args = this.gamedatas.gamestate.args as { player_ids: number[] };
		const items = this.myLimbo.getAllItems();
		const card_ids = [card_id];
		const player_ids = [player_id];
		if (items.length == 2) {
			//automatically give the last card
			if (args.player_ids.length != 2) {
				throw new Error(`Unable to give ${items.length} cards to ${args.player_ids.length} players`)
			}
			for (let item of items) {
				if (item.id != card_id) {
					card_ids.push(item.id);
				}
			}
			for (let arg_player_id of args.player_ids) {
				if (arg_player_id != player_id) {
					player_ids.push(arg_player_id);
				}
			}
		}
		this.bgaPerformAction('actGiveCardsFromLimboToPlayers', {
			card_ids: this.arrayToNumberList(card_ids),
			player_ids: this.arrayToNumberList(player_ids)
		});
		const index = args.player_ids.indexOf(player_id);
		if (index == -1) {
			throw new Error(`Player ${player_id} is not authorized to receive a card`);
		}
		else {
			args.player_ids.splice(index, 1);
			this.removeActionButtons();
			this.onUpdateActionButtons(this.gamedatas.gamestate.name, args);
		}
	}

	onDeprecatedTasters(reverse_direction: boolean) {
		console.warn("onDeprecatedTasters", reverse_direction ? "right" : "left");
		this.playTechniqueCardWithServerState<'client_deprecated_tasters'>({
			reverse_direction: reverse_direction
		})
	}

	onTasters() {
		//get the selected card and opponent
		const card_id = this.market!.orderedSelection.get()[0];
		if (!card_id) {
			this.showMessage(_("Please choose a card from the market"), 'error');
			return;
		}
		const player_id = this.opponent_ids[0];
		if (player_id === undefined) {
			this.showMessage(_("Please choose the player that will receive ")+`'${new DaleCard(card_id).name}'`, 'error');
			return;
		}
		const args = this.gamedatas.gamestate.args as { player_ids: number[] };
		const index = args.player_ids.indexOf(player_id);
		if (index == -1) {
			throw new Error(`Charity: player ${player_id} is not authorized to receive a card`);
		}
		else {
			args.player_ids.splice(index, 1);
			this.removeActionButtons();
			this.onUpdateActionButtons(this.gamedatas.gamestate.name, args);
		}
		//send the action (for now, one card at a time.
		// automatically giving the last card is not needed 
		// because having an equal number of players and cards in the market is super rare)
		this.bgaPerformAction('actTasters', {
			card_ids: this.arrayToNumberList([card_id]),
			player_ids: this.arrayToNumberList([player_id])
		});
	}

	onDaringAdventurer() {
		const card_ids = this.myHand.orderedSelection.get();
		const args = this.gamedatas.gamestate.args as { die_value: number };
		if (card_ids.length != args.die_value) {
			this.showMessage(_("Please select exactly ") + args.die_value + _(" card(s) to discard"), 'error');
			return;
		}
		this.bgaPerformAction('actDaringAdventurer', {
			card_ids: this.arrayToNumberList(card_ids)
		})

	}

	onRareArtefact(card_id: number) {
		if (this.verifyChameleon(new DaleCard(card_id))) {
			this.playTechniqueCard<'client_rareArtefact'>({
				card_id: card_id
			});
		}
	}
	
	onRiskyBusiness(value: number) {
		this.playTechniqueCard<'client_riskyBusiness'>({
			value: value
		})
	}

	onNaturalSurvivor() {
		const args = this.gamedatas.gamestate.args as { die_value: number }; 
		const hand_card_ids = this.myHand.orderedSelection.get();
		const deck_card_ids = this.myDeck.orderedSelection.get();
		if (hand_card_ids.length != args.die_value) {
			this.showMessage(_("Please select exactly ")+args.die_value+_(" card(s) from your hand"), 'error');
			return;
		}
		if (deck_card_ids.length != args.die_value) {
			this.showMessage(_("Please select exactly ")+args.die_value+_(" card(s) from your deck"), 'error');
			this.myDeck.openPopin();
			return;
		}
		this.bgaPerformAction('actNaturalSurvivor', {
			hand_card_ids: this.arrayToNumberList(hand_card_ids),
			deck_card_ids: this.arrayToNumberList(deck_card_ids)
		});
	}

	onDuplicateEntry() {
		this.bgaPerformAction('actDuplicateEntry', {
			card_ids: this.arrayToNumberList(this.myDeck.orderedSelection.get())
		});
	}

	onHistoryLesson() {
		this.playTechniqueCard<'client_historyLesson'>({
			card_ids: this.myDiscard.orderedSelection.get()
		})
	}

	onCulturalPreservation() {
		this.bgaPerformAction('actCulturalPreservation', {
			card_ids: this.arrayToNumberList(this.myDeck.orderedSelection.get())
		});
	}

	onSliceOfLife() {
		const card_ids = this.myHand.orderedSelection.get();
		if (card_ids.length != 2) {
			this.showMessage(_("Please select exactly ")+2+_(" cards from your hand"), 'error');
			return;
		}
		this.playPassiveCard<'client_sliceoflife'>({
			card_ids: card_ids
		})
	}

	onSpinningWheel() {
		const card_ids = this.myHand.orderedSelection.get();
		if (card_ids.length == 0) {
			this.showMessage(_("Please select at least 1 card from your hand"), 'error');
			return;
		}
		if (card_ids.length > 3) {
			this.showMessage(_("Please select at most 3 cards from your hand"), 'error');
			return;
		}
		this.playPassiveCard<'client_spinningWheel'>({
			card_ids: card_ids
		})
	}

	onReplacementFizzle() {
		const args = this.mainClientState.args as ClientGameStates['client_replacementFizzle'];
		this.playTechniqueCardWithServerState<'client_replacement'>({
			card_id: args.toss_card_id
		})
	}

	onFashionHintToss() {
		this.playTechniqueCardWithServerState<'client_fashionHint'>({
			toss: true
		});
	}

	onFashionHintTossSkip() {
		this.playTechniqueCardWithServerState<'client_fashionHint'>({
			toss: false
		});
	}

	onFashionHintSwap(card_id: number) {
		this.bgaPerformAction('actFashionHint', {
			card_id: card_id
		});
	}

	onFashionHintSwapSkip() {
		console.warn("onFashionHintSwapSkip");
		this.bgaPerformAction('actFashionHint', {
			card_id: -1
		});
	}

	onRoyalPrivilege() {
		const toss_card_id = this.myHand.orderedSelection.get()[0];
		if (!toss_card_id) {
			this.showMessage(_("Please select a hand card to toss"), 'error');
			return;
		}
		const market_card_id = this.market!.getSelectedCardId();
		if (!market_card_id) {
			this.showMessage(_("Please select a market card to purchase"), 'error');
			return;
		}
		this.bgaPerformAction('actRoyalPrivilege', {
			toss_card_id: toss_card_id,
			market_card_id: market_card_id
		});
	}

	onRoyalPrivilegeSkip() {
		this.bgaPerformAction('actRoyalPrivilege', {
			toss_card_id: -1,
			market_card_id: -1
		});
	}

	onPompousProfessional(animalfolk_id: number) {
		console.warn("onPompousProfessional ", animalfolk_id);
		this.playTechniqueCardWithServerState<'client_pompousProfessional'>({
			animalfolk_id: animalfolk_id
		});
	}

	onPompousProfessionalTakeAndDiscard() {
		const card_ids = this.arrayToNumberList(this.myLimbo.orderedSelection.get());
		if (card_ids.length == 0) {
			const pompousProfessional_args = this.gamedatas.gamestate.args as { animalfolk_id: number, animalfolk_name: number };
			this.showMessage(_("Please choose a '")+pompousProfessional_args.animalfolk_name+_("' card"), 'error');
			return;
		}
		this.bgaPerformAction('actPompousProfessional', {
			card_ids: card_ids,
			is_taking_card: true
		});
	}

	onPompousProfessionalDiscard() {
		const card_ids = this.arrayToNumberList(this.myLimbo.orderedSelection.get());
		this.bgaPerformAction('actPompousProfessional', {
			card_ids: card_ids,
			is_taking_card: false
		});
	}


	//TODO: safely remove this
	// onPompousProfessionalFizzle() {
	// 	this.bgaPerformAction('actPompousProfessional', {
	// 		card_id: -1
	// 	});
	// 	this.removeActionButtons();
	// }

	onBurglary(value: number) {
		const args = this.mainClientState.args as ClientTechniqueChoice['client_burglaryValue'];
		this.playTechniqueCard<'client_burglaryValue'>({
			opponent_id: args.opponent_id,
			value: value
		})
	}

	onGrasp(value: number) {
		const args = this.mainClientState.args as ClientTechniqueChoice['client_graspValue'];
		this.playTechniqueCard<'client_graspValue'>({
			opponent_id: args.opponent_id,
			value: value
		})
	}

	onSuddenNap(opponent_id: number) {
		this.playTechniqueCardWithServerState<'client_suddenNap'>({
			opponent_id: opponent_id
		})
	}

	onPeriscopeAnimalfolkId(animalfolk_id: number) {
		const args = this.mainClientState.args as ClientGameStates['client_periscopeAnimalfolkId'];
		this.mainClientState.enter('client_periscopeValue', {
			technique_card_id: args.technique_card_id,
			opponent_id: args.opponent_id,
			opponent_name: args.opponent_name,
			animalfolk_id: animalfolk_id
		})
	}

	onPeriscopeValue(value: number) {
		const args = this.mainClientState.args as ClientGameStates['client_periscopeValue'];
		this.playTechniqueCard<'client_periscopeValue'>({
			opponent_id: args.opponent_id,
			animalfolk_id: args.animalfolk_id,
			value: value
		})
	}
	
	onCarefreeSwapper(card_id: number) {
		this.playTechniqueCard<'client_carefreeSwapper'>({
			card_id: card_id,
		})
	}

	onDelicacy(card_id: number) {
		this.bgaPerformAction('actDelicacy', {
			card_id: card_id
		});
		TargetingLine.remove();
	}

	onUmbrella(card_id: number) {
		this.bgaPerformAction('actUmbrella', {
			card_id: card_id
		});
		TargetingLine.remove();
	}
	
	onMatchingColours(card_id: number, target_id: number) {
		for (const [player_id, player_stall] of Object.entries(this.playerStalls)) {
			if (player_stall.contains(target_id)) {
				this.playTechniqueCard<'client_matchingColours'>({
					card_id: card_id,
					stall_player_id: +player_id,
					stall_card_id: target_id
				})
				break;
			}
		}
	}

	onBarricade() {
		this.playPassiveCard<'client_barricade'>({
			card_ids: this.myDiscard.orderedSelection.get()
		})
	}

	onWheelbarrowToss() {
		this.bgaPerformAction('actWheelbarrow', {
			is_tossing: true
		});
	}

	onWheelbarrowStore() {
		this.bgaPerformAction('actWheelbarrow', {
			is_tossing: false
		});
	}

	onTacticalMeasurement() {
		this.bgaPerformAction('actTacticalMeasurement', {
			card_ids: this.arrayToNumberList(this.myHand.orderedSelection.get())
		})
	}

	onMeddlingMarketeerDiscard() {
		//move cards to the discard pile
		const card_ids = this.myLimbo.orderedSelection.get();
		const nbr_cards_remaining = this.myLimbo.count() - card_ids.length;
		let delay = 0;
		for (let card_id of card_ids) {
			this.stockToPile(new DaleCard(card_id), this.myLimbo, this.myDiscard, delay);
			delay += 75;
		}
		if (nbr_cards_remaining >= 1) {
			//let the player choose the order to place the other cards on top of their deck
			this.mainClientState.enterOnStack('client_meddlingMarketeer', {
				discard_card_ids: card_ids,
				card_name: "Meddling Marketeer"
			});
		}
		else {
			//skip the 2nd client state, no cards are placed on top of the deck
			this.bgaPerformAction('actMeddlingMarketeer', {
				discard_card_ids: this.arrayToNumberList(card_ids),
				deck_card_ids: this.arrayToNumberList([])
			});
		}
	}

	onMeddlingMarketeerUndo() {
		//return discarded cards to limbo
		const args = (this.mainClientState.args as ClientGameStates['client_meddlingMarketeer']);
		for (const _ in args.discard_card_ids) {
			//this is used over "pileToStock" to be independent of the order of args.discard_card_ids
			const card = this.myDiscard.pop();
			this.myLimbo.addDaleCardToStock(card, this.myDiscard.placeholderHTML);
			if (!args.discard_card_ids.includes(card.id)) {
				throw new Error(`Expected card ${card.id} within the top ${args.discard_card_ids.length} cards of the discard pile`);
			}
		}
		this.mainClientState.leave();
	}

	onMeddlingMarketeerDeck() {
		const args = (this.mainClientState.args as ClientGameStates['client_meddlingMarketeer']);
		const deck_card_ids = this.myLimbo.orderedSelection.get();
		this.bgaPerformAction('actMeddlingMarketeer', {
			discard_card_ids: this.arrayToNumberList(args.discard_card_ids),
			deck_card_ids: this.arrayToNumberList(deck_card_ids)
		});
		this.mainClientState.leave();
	}

	onGoodwillPresents() {
		if (this.opponent_ids.length == 0) {
			this.showMessage(_("Please select at least 1 player"), 'error');
			return;
		}
		this.playTechniqueCard<'client_goodwillpresents'>({
			opponent_ids: this.opponent_ids
		})
	}

	onAnchor(card_id: number, opponent_id: number) {
		const nbr_cards_remaining = this.myLimbo.count() - 1;
		this.stockToPile(new DaleCard(card_id), this.myLimbo, this.playerDiscards[opponent_id]!);
		if (nbr_cards_remaining >= 1) {
			this.mainClientState.enterOnStack('client_anchor', {
				opponent_id: opponent_id,
				opponent_name: this.gamedatas.players[opponent_id]!.name!,
				discard_card_id: card_id,
				card_name: "Anchor"
			});
		}
		else {
			//skip the 2nd client state, no cards are placed on top of the deck
			this.bgaPerformAction('actAnchor', {
				opponent_id: opponent_id,
				discard_card_id: card_id,
				deck_card_ids: this.arrayToNumberList([])
			});
		}
	}

	onAnchorCancelTargetingLine() {
		//cancel the targeting line
		for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
			discard.setSelectionMode('none');
		}
		this.myLimbo.setSelectionMode('none');
		TargetingLine.remove();
		this.restoreServerGameState();
	}

	onAnchorUndo() {
		//undo the discard
		const args = (this.mainClientState.args as ClientGameStates['client_anchor']);
		const discardPile = this.playerDiscards[args.opponent_id]!;
		const card = discardPile.pop();
		if (args.discard_card_id != card.id) {
			throw new Error(`Expected card ${card.id} on top of ${args.opponent_name}\'s discard pile`);
		}
		this.myLimbo.addDaleCardToStock(card, discardPile.placeholderHTML);
		this.mainClientState.leave();
	}

	onAnchorDeck() {
		const args = (this.mainClientState.args as ClientGameStates['client_anchor']);
		const deck_card_ids = this.myLimbo.orderedSelection.get();
		this.bgaPerformAction('actAnchor', {
			opponent_id: args.opponent_id,
			discard_card_id: args.discard_card_id,
			deck_card_ids: this.arrayToNumberList(deck_card_ids)
		});
		this.mainClientState.leave();
	}

	onManufacturedJoyUndo() {
		//undo the draw
		const args = (this.mainClientState.args as ClientGameStates['client_manufacturedJoy']);
		this.stockToPile(new DaleCard(args.draw_card_id), this.myHand, this.myDeck);
		this.myHandSize.incValue(-1);
		this.mainClientState.leave();
	}

	onManufacturedJoyCancelTargetingLine() {
		//cancel the targeting line
		for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
			discard.setSelectionMode('none');
		}
		this.myLimbo.setSelectionMode('none');
		TargetingLine.remove();
		this.mainClientState.enter(); //re-enter the client state
	}

	onManufacturedJoy(card_id: number, opponent_id: number) {
		//commit the draw and the discard
		const args = (this.mainClientState.args as ClientGameStates['client_manufacturedJoy']);
		this.bgaPerformAction('actManufacturedJoy', {
			draw_card_id: args.draw_card_id,
			discard_card_id: card_id,
			opponent_id: opponent_id
		});
		this.mainClientState.leave();
	}

	onShakyEnterprise() {
		const card_ids = this.myDiscard.orderedSelection.get();
		if (card_ids.length == 0) {
			//let the player confirm the fizzle
			const args = this.mainClientState.args as ClientGameStates['client_shakyEnterprise']
			this.mainClientState.enter('client_fizzle', { technique_card_id: args.technique_card_id });
		}
		else {
			//play as technique
			this.playTechniqueCardWithServerState<'client_shakyEnterprise'>({
				card_ids: this.myDiscard.orderedSelection.get()
			})
		}
	}

	onSpend() {
		//get args
		const args = this.mainClientState.args as ClientGameStates['client_spend'] | ClientGameStates['client_spendx'];
		const spend_card_ids = this.myHand.orderedSelection.get();
		const spend_coins = this.coinManager.getCoinsToSpend();
		if (spend_coins > this.coinManager.myCoins.getValue()) {
			this.showMessage(_("Not enough coins"), 'error');
			return;
		}

		//get cost range
		let cost_min = 0, cost_max = 0;
		switch(this.mainClientState.name) {
			case 'client_spend':
				cost_min = (args as ClientGameStates['client_spend']).cost;
				cost_max = (args as ClientGameStates['client_spend']).cost;
				break;
			case 'client_spendx':
				cost_min = (args as ClientGameStates['client_spendx']).cost_min;
				cost_max = (args as ClientGameStates['client_spendx']).cost_max;
				break;
			default:
				throw new Error("onSpend called during an unexpected client state: "+this.mainClientState.name);
		}

		//verifyCost on the client side
		let lowest_value = 1000;
		let total_value = spend_coins;
        for (const card_id of spend_card_ids) {
			const value = new DaleCard(card_id).effective_value;
            total_value += value
			lowest_value = Math.min(lowest_value, value);
        }
		if (total_value < cost_min) {
			this.showMessage(_("Insufficient funds")+` (${total_value}/${cost_min})`, 'error');
			return;
		}
		if (total_value - lowest_value >= cost_max) {
			this.showMessage(_("Please remove unnecessary cards"), 'error');
			return;
		}
		if (total_value > cost_max && this.coinManager.getCoinsToSpend() > 0) {
			this.showMessage(_("Please remove unnecessary coins"), 'error');
			return;
		}
		
		//go the the next state or action
		if (typeof args.next === 'function') {
			args.next(spend_card_ids, spend_coins);
			return;
		}
		switch (args.next) {
			case 'playPassiveCard':
				this.playPassiveCard<'client_choicelessPassiveCard'>({
					spend_coins: spend_coins,
					spend_card_ids: spend_card_ids
				})
				break;
			case 'playTechniqueCard':
				this.playTechniqueCard<'client_spend'>({
					spend_coins: spend_coins,
					spend_card_ids: spend_card_ids
				})
				break;
			case 'playTechniqueCardWithServerState':
				this.playTechniqueCardWithServerState<'client_spend'>({
					spend_coins: spend_coins,
					spend_card_ids: spend_card_ids
				})
				break;
			case 'resolveTechniqueCard':
				this.resolveTechniqueCard<'client_spend'>({
					spend_coins: spend_coins,
					spend_card_ids: spend_card_ids
				})
				break;
			default:
				this.mainClientState.enter(args.next, { 
					technique_card_id: args.technique_card_id, 
					spend_coins: spend_coins,
					spend_card_ids: spend_card_ids
				});
				break;
		}
	}

	onResourcefulAlly() {
		this.bgaPerformAction('actResourcefulAlly', {
			card_ids: this.arrayToNumberList(this.myDiscard.orderedSelection.get())
		})
	}

	onTravelingEquipment() {
		if (this.myHand.count() > 1) {
			//default case
			const card_ids = this.myHand.orderedSelection.get(); //warning: get() does a reverse()
			if (card_ids.length < 2) {
				this.showMessage(_("Please choose 1 card to toss and 1 card to discard"), 'error');
				return;
			}
			const toss_card_id = card_ids[1]!; //we undo the reverse() here
			const discard_card_id = card_ids[0]!;
			this.bgaPerformAction('actTravelingEquipment', {
				toss_card_id: toss_card_id,
				discard_card_id: discard_card_id
			})
			this.myHand.unselectAll();
		}
		else {
			//special case: the hand only contains 1 card (uses a quick and dirty -1 trick: to discard a card, '-1' is included in the selection)
			const only_card_id = this.myHand.getAllItems()[0]!.id;
			if (this.myHand.orderedSelection.getSize() == 0) {
				this.showMessage(_("Please choose whether to toss or discard the card in your hand"), 'error');
				return;
			}
			else if (this.myHand.orderedSelection.includes(-1)) {
				this.bgaPerformAction('actTravelingEquipment', {
					toss_card_id: -1,
					discard_card_id: only_card_id
				})
			}
			else {
				this.bgaPerformAction('actTravelingEquipment', {
					toss_card_id: only_card_id,
					discard_card_id: -1
				})
			}
			//this.myHand.unselectAll(); //important: do not unselectAll() at this point, it will get stuck in an infinite loop due to the -1 trick
		}
	}

	onFishing() {
		this.bgaPerformAction('actFishing', {
			card_ids: this.arrayToNumberList(this.myDiscard.orderedSelection.get())
		})
		.then(() => this.myDiscard.setSelectionMode('none')); //fixes the zindex for the discardToDeck animation
	}

	onInsight() {
		this.bgaPerformAction('actInsight', {
			card_ids: this.arrayToNumberList(this.myLimbo.orderedSelection.get())
		});
	}

	onBadOmenSkip() {
		const badOmen_args = this.gamedatas.gamestate.args as { resolving_card_name?: string }
		this.mainClientState.enterOnStack('client_badOmen', {
			toss_card_id: -1,
			card_name: badOmen_args.resolving_card_name ?? "MISSING CARD NAME"
		});
	}

	onBadOmenUndo() {
		const args = (this.mainClientState.args as ClientGameStates['client_badOmen']);
		if (args.toss_card_id != -1) {
			//undo the toss
			if (new DaleCard(args.toss_card_id).isAnimalfolk()) {
				const card = this.marketDiscard.pop();
				if (args.toss_card_id != card.id) {
					throw new Error(`Expected card ${card.id} on top of the bin`);
				}
				this.myLimbo.addDaleCardToStock(card, this.marketDiscard.placeholderHTML);
			}
			else {
				//warning: if specialty/trap cards exist, this come from somewhere else
				this.myLimbo.addDaleCardToStock(new DaleCard(args.toss_card_id), 'overall_player_board_'+this.player_id);
			}

		}
		this.mainClientState.leave();
	}

	onBadOmenDeck() {
		const args = (this.mainClientState.args as ClientGameStates['client_badOmen']);
		const deck_card_ids = this.myLimbo.orderedSelection.get();
		this.bgaPerformAction('actBadOmen', {
			toss_card_id: args.toss_card_id,
			deck_card_ids: this.arrayToNumberList(deck_card_ids)
		});
		this.mainClientState.leave();
	}
	
	onFumblingDreamer(opponent_id: number) {
		this.bgaPerformAction('actFumblingDreamer', {
			opponent_id: opponent_id,
		});
	}

	onLooseMarblesBegin(opponent_id: number, pile?: Pile) {
		if (TargetingLine.exists()) {
			return;
		}
		
		//remove the current selection modes
		this.onLeavingState(this.gamedatas.gamestate.name);

		//get the source (this should happen after "onLeavingState")
		let source: HTMLElement;
		if (pile) {
			pile.setSelectionMode('noneCantViewContent');
			source = pile.topCardHTML ?? pile.placeholderHTML;
			this.removeActionButtons();
		}
		else {
			source = $("opponent-selection-button-"+opponent_id)! as HTMLElement //source is a button
		}

		//get the targets
		const looseMarbles_args = this.gamedatas.gamestate.args as {die_value1: number, die_value2: number};
		const targets: (DaleCard | HTMLElement)[] = [];
		switch (looseMarbles_args.die_value2) {
			case DaleDie.DIE_DISCARD2:
				for (const [player_id, discard] of Object.entries(this.playerDiscards)) {
					discard.setSelectionMode('noneCantViewContent');
					const target = discard.topCardHTML ?? discard.placeholderHTML
					if (+player_id != opponent_id) {
						target.dataset['target_id'] = player_id;
						targets.push(target);
					}
				}
				break;
			case DaleDie.DIE_DECK2:
				for (const [player_id, deck] of Object.entries(this.playerDecks)) {
					deck.setSelectionMode('noneCantViewContent');
					const target = deck.topCardHTML ?? deck.placeholderHTML
					if (+player_id != opponent_id) {
						target.dataset['target_id'] = player_id;
						targets.push(target);
					}
				}
				break;
			case DaleDie.DIE_HAND2:
				if (looseMarbles_args.die_value1 != DaleDie.DIE_HAND) {
					this.addActionButtonsOpponent(((button_opponent_id: number) => {
						if (button_opponent_id == opponent_id) {
							this.showMessage(TranslatableStrings.please_select_a_different_player, 'error');
						}
					}).bind(this), true, TranslatableStrings.s_hand);
				}
				for (const [player_id, _] of Object.entries(this.playerHandSizes)) {
					const target = $("opponent-selection-button-"+player_id)! as HTMLElement;
					target.childNodes.forEach((node) => dojo.setStyle(node as HTMLElement, 'pointer-events','none'));
					if (+player_id != opponent_id) {
						target.dataset['target_id'] = player_id;
						targets.push(target);
					}
				}
				break;
			default:
				throw new Error("Unexpected destination die roll: "+looseMarbles_args.die_value2);
		}

		//create the targeting line
		new TargetingLine(
			source,
			targets,
			"daleofmerchants-line-source-technique",
			"daleofmerchants-line-target-technique",
			"daleofmerchants-line-technique",
			(source_id: number) => {
				this.onLeavingState(this.gamedatas.gamestate.name);
				this.removeActionButtons();
				this.onUpdateActionButtons(this.gamedatas.gamestate.name, this.gamedatas.gamestate.args);
			},
			(source_id: number, target_id: number) => {
				this.onLooseMarbles(opponent_id, target_id);
			}
		)
	}

	onLooseMarbles(source_id: number, destination_id: number) {
		switch(this.gamedatas.gamestate.name) {
			case 'looseMarbles':
				console.warn("actLooseMarbles");
				this.bgaPerformAction('actLooseMarbles', {
					source_id: source_id,
					destination_id: destination_id
				});
				break;
			case 'anotherFineMess':
				console.warn("actAnotherFineMess");
				this.bgaPerformAction('actAnotherFineMess', {
					source_id: source_id,
					destination_id: destination_id
				});
				break;
			default:
				throw new Error(`'onLooseMarbles' was called in an unexpected gamestate: '${this.gamedatas.gamestate.name}'`);
		}
	}
	
	onCoffeeGrinderDiscard() {
		this.bgaPerformAction('actCoffeeGrinder', {
			skip: false
		});
	}

	onCoffeeGrinderSkip() {
		this.bgaPerformAction('actCoffeeGrinder', {
			skip: true
		});
	}

	onDramaticRomanticForward() {
		this.playPassiveCard<'client_dramaticRomantic'>({
			forward: true
		});
	}

	onDramaticRomanticBackward() {
		this.playPassiveCard<'client_dramaticRomantic'>({
			forward: false
		});
	}

	onSelectingContracts() {
		const card_ids = this.myDiscard.orderedSelection.get();
		if (card_ids.length == 0) {
			this.showMessage(_("Please select at least 1 card from your discard"), 'error');
			this.myDiscard.openPopin();
			return;
		}
		this.playTechniqueCard<'client_selectingContracts'>({
			card_ids: card_ids
		})
	}

	onWindOfChangeSkip() {
		this.resolveTechniqueCard<'client_windOfChange'>({});
	}

	onBonsai() {
		const card_ids = this.myHand.orderedSelection.get();
		if (card_ids.length != 2) {
			this.showMessage(_("Please select exactly 2 junk cards"), "error");
			return;
		}
		this.playPassiveCard<'client_bonsai'>({
			card_ids: card_ids
		});
	}

	//safely remove this
	// onRakeSkip() {
	// 	const rake_args = this.gamedatas.gamestate.args as { resolving_card_name?: string }
	// 	this.mainClientState.enterOnStack('client_rake', {
	// 		toss_card_id: -1,
	// 		card_name: rake_args.resolving_card_name ?? "MISSING CARD NAME"
	// 	});
	// 	this.myDeck.openPopin();
	// }

	// onRakeUndo() {
	// 	const args = (this.mainClientState.args as ClientGameStates['client_badOmen']);
	// 	if (args.toss_card_id != -1) {
	// 		//undo the toss
	// 		if (new DaleCard(args.toss_card_id).isAnimalfolk()) {
	// 			const card = this.marketDiscard.pop();
	// 			if (args.toss_card_id != card.id) {
	// 				throw new Error(`Expected card ${card.id} on top of the bin`);
	// 			}
	// 			this.myDeck.push(card, this.marketDiscard.placeholderHTML);
	// 		}
	// 		else {
	// 			//warning: if specialty/trap cards exist, this come from somewhere else
	// 			this.myDeck.pushHiddenCards(1);
	// 		}
	// 	}
	// 	this.mainClientState.leave();
	// }

	// onRakeDiscard() {
	// 	const args = (this.mainClientState.args as ClientGameStates['client_rake']);
	// 	const discard_card_ids = this.myDeck.orderedSelection.get();
	// 	this.bgaPerformAction('actRake', {
	// 		toss_card_id: args.toss_card_id,
	// 		discard_card_ids: this.arrayToNumberList(discard_card_ids)
	// 	});
	// 	this.mainClientState.leave();
	// }

	onRake() {
		const toss_card_ids = this.myDeck.orderedSelection.get();
		const discard_card_ids = this.myDeck.orderedSelection.get(true);
		if (toss_card_ids.length > 1) {
			this.showMessage(_("Please select at most 1 card to toss"), "error");
			return;
		}
		if (discard_card_ids.length > 2) {
			this.showMessage(_("Please select at most 2 cards to toss"), "error");
			return;
		}
		this.bgaPerformAction('actRake', {
			toss_card_ids: this.arrayToNumberList(toss_card_ids),
			discard_card_ids: this.arrayToNumberList(discard_card_ids)
		});
	}

	onGenerationChange() {
		const card_ids = this.myDiscard.orderedSelection.get();
		const nbr = Math.min(2, this.myDiscard.size);
		if (card_ids.length != nbr) {
			this.showMessage(_("Please select exactly ")+nbr+_(" card(s) from your discard"), "error");
			this.myDiscard.openPopin();
			return;
		}
		this.playTechniqueCard<'client_generationChange'>({
			card_ids: card_ids
		});
	}

	//(~on)


	///////////////////////////////////////////////////
	//// Reaction to cometD notifications

	/** @gameSpecific See {@link Gamegui.setupNotifications} for more information. */
	override setupNotifications()
	{
		console.warn( 'notifications subscriptions setup42' );
		
		//[notif_type, duration, has_private_arguments]
		const notifs: ([keyof NotifTypes, number, boolean?])[] = [
			['deckSelectionResult', 				500],
			['delay', 								500],
			['startGame', 							500],
			['scheduleTechnique', 					1],
			['scheduleTechniqueDelay', 				500, true],
			['resolveTechnique', 					500],
			['cancelTechnique', 					500],
			['scheduleToHand',						500],
			['handToStoredCards', 					500, true],
			['deckToStoredCards', 					500, true],
			['storedCardsToHand',					500, true],
			['buildStack', 							500],
			['rearrangeMarket', 					500],
			['fillEmptyMarketSlots', 				1],
			['marketSlideRight', 					500],
			['marketToHand', 						500],
			['swapHandStall', 						1],
			['swapHandMarket', 						1],
			['instant_marketDiscardToHand', 		1],
			['marketDiscardToHand', 				500],
			['instant_discardToHand', 				1],
			['discardToHand', 						500],
			['discardToHandMultiple', 				500],
			['draw', 								500, true],
			['drawMultiple', 						500, true],
			['handToLimbo', 						500, true],
			['instant_limboToHand',					1, true],
			['limboToHand', 						500, true],
			['instant_playerHandToOpponentHand',	1, true],
			['instant_opponentHandToPlayerHand',	1, true],
			['playerHandToOpponentHand', 			500, true],
			['opponentHandToPlayerHand', 			500, true],
			['obtainNewJunkInHand', 				500],
			['obtainNewJunkInDiscard',				500],
			['obtainNewJunkOnDeck',					500],
			['instant_toss', 						1],
			['toss', 								500],
			['tossMultiple', 						500],
			['discard', 							500],
			['discardMultiple', 					750],
			['placeOnDeck',							500, true],
			['placeOnDeckMultiple', 				500, true],
			['shuffleDiscard',						500],
			['reshuffleDeck', 						1500],
			['wilyFellow', 							500],
			['accidentShuffle', 					1750],
			['accidentTakeBack', 					500, true],
			['cunningNeighbourWatch', 				500, true],
			['cunningNeighbourReturn', 				500, true],
			['monoShowHand', 						750],
			['monoHideHand', 						750],
			['tossFromDiscard', 					500],
			['tossFromDeck', 						500],
			['tossFromMarketDeck', 					500],
			['tossFromMarketBoard', 				500],
			['instant_deckToDeck', 					1],
			['deckToDeck', 							500],
			['instant_discardToDeck', 				1],
			['discardToDeck', 						500],
			['deckToDiscard', 						500],
			['discardToDiscard',					500],
			['rollDie', 							1000],
			['avidFinancierTakeCoin', 				500],
			['startSlotMachine',					1],
			['advanceClock',						1],
			['updateActionButtons',					1],
			['deselectPassive',						1],
			['gainCoins',							1],
			['selectBlindfold', 					1, true],
			['addEffect', 							1],
			['updateEffect', 						1],
			['expireEffects', 						1],
			['setScheduleCooldown', 				1],
			['message', 							1],
			['debugClient', 						1],
		];

		notifs.forEach((notif) => {
			dojo.subscribe(notif[0], this, `notif_${notif[0]}`);
			this.notifqueue.setSynchronous(notif[0], notif[1]);
			if (notif[2]) {
				const player_id = this.player_id;
				this.notifqueue.setIgnoreNotificationCheck(notif[0], (notif) => {
					if (notif.type == "history_history") {
						const isPublic = notif.channelorig.includes('table'); //TODO: see issue #130
						return !isPublic; //for 1 private message, there is exactly 1 public message
					}
					//"_private" and "opponent_id" are lost args in "history_history" notifications
					const args = notif.args as PrivateNotification;
					const isPublic = args._private === undefined;
					const alreadyReceivedPrivate = (player_id == args.player_id || player_id == args.opponent_id)
					return isPublic && alreadyReceivedPrivate;
				});
			}
		});
		
		console.warn( 'notifications subscriptions setup done' );

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
		console.warn( 'notif_cardPlayed', notif );
		// Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
	}
	*/

	notif_delay(notif: NotifAs<'delay'>) {
		console.warn("notif_delay (500ms)");
	}

	notif_deckSelectionResult(notif: NotifAs<'deckSelectionResult'>) {
		this.deckSelection!.setResult(notif.args.animalfolk_id);
		if (!this.gamedatas.animalfolkIds.includes(notif.args.animalfolk_id)) {
			this.gamedatas.animalfolkIds.push(notif.args.animalfolk_id);
		}
	}

	notif_startGame(notif: NotifAs<'startGame'>) {
		this.deckSelection!.remove();
		this.gamedatas.inDeckSelection = false;
		const n = Object.keys(this.gamedatas.players).length;
		this.marketDeck.pushHiddenCards(11*(n+1));
		for (let player_id in this.gamedatas.players) {
			this.playerDecks[+player_id]!.pushHiddenCards(10);
		}
		if (this.is_solo && this.unique_opponent_id) {
			this.playerDecks[this.unique_opponent_id]!.pushHiddenCards(3); //3 Mono cards
		}
		this.showAnimalfolkSpecificGameComponents();
		this.market!.onResize();
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
				console.warn("SKIP scheduling the technique: already done by client")
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

	notif_scheduleTechniqueDelay(notif: NotifAs<'scheduleTechniqueDelay'>) {
		console.warn("notif_scheduleTechniqueDelay");
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

	notif_scheduleToHand(notif: NotifAs<'scheduleToHand'>) {
		//schedule to hand
		if (notif.args.player_id == this.player_id) {
			//animate from my hand
			const stock = notif.args.to_limbo ? this.myLimbo : this.myHand; 
			const card_id = +notif.args.card.id;
			if ($(this.mySchedule.control_name+'_item_' + card_id)) {
				stock.addDaleCardToStock(DaleCard.of(notif.args.card), this.mySchedule.control_name+'_item_' + card_id)
				this.mySchedule.removeFromStockByIdNoAnimation(+card_id);
			}
			else {
				throw new Error(`scheduleToHand failed. Technique card ${card_id} does not exist in the schedule.`);
			}
		}
		else {
			//animate from player board
			const schedule = this.playerSchedules[notif.args.player_id]!;
			schedule.removeFromStockById(+notif.args.card.id, 'overall_player_board_'+notif.args.player_id);
		}
		//update the hand sizes
		if (!notif.args.to_limbo) {
			this.playerHandSizes[notif.args.player_id]!.incValue(1);
		}
	}

	notif_handToStoredCards(notif: NotifAs<'handToStoredCards'>) {
		if (notif.args.player_id == this.player_id) {
			//animate from my hand
			const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
			const card_id = +notif.args._private!.card.id;
			if ($(stock.control_name+'_item_' + card_id)) {
				this.myStoredCards.addDaleCardToStock(DaleCard.of(notif.args._private!.card), stock.control_name+'_item_'+card_id)
				stock.removeFromStockByIdNoAnimation(+card_id);
			}
			else {
				throw new Error(`Unable to store card ${card_id} from hand, because it does not exist in the hand`);
			}
		}
		else {
			//animate from player board
			const storedCards = this.playerStoredCards[notif.args.player_id]!;
			const cardBack = new DaleCard(-storedCards.count(), 0);
			storedCards.addDaleCardToStock(cardBack, 'overall_player_board_'+notif.args.player_id)
		}
		//update the hand sizes
		if (!notif.args.from_limbo) {
			this.playerHandSizes[notif.args.player_id]!.incValue(-1);
		}
	}

	notif_deckToStoredCards(notif: NotifAs<'deckToStoredCards'>) {
		const deck = this.playerDecks[notif.args.player_id]!;
		const storedCards = this.playerStoredCards[notif.args.player_id]!;
		const card = notif.args._private ? DaleCard.of(notif.args._private?.card) : new DaleCard(-storedCards.count(), 0);
		storedCards.addDaleCardToStock(card, deck.placeholderHTML);
		deck.pop();	
	}

	notif_storedCardsToHand(notif: NotifAs<'storedCardsToHand'>) {
		if (notif.args.player_id == this.player_id) {
			//animate from my hand
			for (let card_id in notif.args._private!.cards) {
				const dbcard = notif.args._private!.cards[card_id]!
				if ($(this.myStoredCards.control_name+'_item_' + card_id)) {
					this.myHand.addDaleCardToStock(DaleCard.of(dbcard), this.myStoredCards.control_name+'_item_' + card_id)
					this.myStoredCards.removeFromStockByIdNoAnimation(+card_id);
				}
				else {
					throw new Error(`storedCardsToHand failed. Stored card ${card_id} does not exist among the stored cards.`);
				}
			}
		}
		else {
			//animate from player board
			const storedCards = this.playerStoredCards[notif.args.player_id]!;
			for (let item of storedCards.getAllItems()) {
				storedCards.removeFromStockById(+item.id, 'overall_player_board_'+notif.args.player_id);
			}
		}
		//update the hand sizes
		const nbr = notif.args.nbr;
		this.playerHandSizes[notif.args.player_id]!.incValue(nbr);
	}

	notif_resolveTechnique(notif: NotifAs<'resolveTechnique'>) {
		//schedule to discard/deck
		console.warn(this.playerSchedules);
		const schedule = this.playerSchedules[notif.args.player_id]!;
		const card = DaleCard.of(notif.args.card);
		const from = schedule.control_name+'_item_'+card.id;
		switch(notif.args.to_prefix) {
			case 'disc':
				if (notif.args.to_suffix == 'mark') {
					this.marketDiscard.push(card, from, null, schedule.duration);
				}
				else {
					this.playerDiscards[notif.args.to_suffix]!.push(card, from, null, schedule.duration);
				}
				break;
			case 'deck':
				this.allDecks[notif.args.to_suffix]!.push(card, from, null, schedule.duration);
				break;
			case 'limb':
				//TODO: safely remove this
				// if (notif.args.player_id == this.player_id) {
				// 	//animate to limbo
				// 	const card_id = +notif.args.card.id;
				// 	this.myLimbo.addDaleCardToStock(card, this.mySchedule.control_name+'_item_'+card_id)
				// 	this.mySchedule.removeFromStockByIdNoAnimation(card_id);
				// }
				// else {
				// 	//animate to player board
				// 	const schedule = this.playerSchedules[notif.args.player_id]!;
				// 	schedule.addDaleCardToStock(card, 'overall_player_board_'+notif.args.player_id)
				// }
				break;
			default:
				throw new Error(`Unable to resolve the technique to '${notif.args.to_prefix}'`)
		}
		schedule.removeFromStockByIdNoAnimation(card.id);
	}

	notif_buildStack(notif: NotifAs<'buildStack'>) {
		console.warn("notif_buildStack");
		const stall = this.playerStalls[notif.args.player_id]!;
		const dbcards_desc = this.sortCardsByLocationArg(notif.args.cards, false);
		for (let dbcard of dbcards_desc) {
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
				case 'limb':
					if (notif.args.player_id == this.player_id) {
						if ($(this.myLimbo.control_name+'_item_' + card.id)) {
							stall.insertCard(card, notif.args.stack_index, undefined, this.myLimbo.control_name+'_item_' + card.id)
							this.myLimbo.removeFromStockByIdNoAnimation(+card.id);
						}
						else {
							throw new Error(`Cannot build a stack. Card ${card.id} does not exist in limbo.`);
						}
					}
					else {
						stall.insertCard(card, notif.args.stack_index, undefined, 'overall_player_board_'+notif.args.player_id)
					}
					break;
				case 'disc':
					const discard = this.playerDiscards[notif.args.player_id]!;
					const index = +dbcard.location_arg - 1; //-1 because location_args are 1-indexed and piles are 0-indexed
					stall.insertCard(card, notif.args.stack_index, undefined, discard.placeholderHTML)
					console.warn("index = "+index);
					const foundCard = discard.removeAt(index);
					if (foundCard.id != card.id) {
						//IMPORTANT: we remove cards from the discard from top to bottom: [(BottomCard, 1), (TopCard, 2)] -> [(BottomCard, 1)] -> []
						//if this causes issues, it might be time to refactor "removeAt(index)" to "remove(card)"
						throw new Error(`buildStack: discarded card ${card.id} was not found at its expected index`);
					}
					break;
				case 'deck':
					const deck = this.marketDeck;
					stall.insertCard(card, notif.args.stack_index, undefined, deck.placeholderHTML);
					this.marketDeck.pop();
					break;
				default:
					throw new Error(`Unable to build from '${notif.args.from}'`);
			}

		}

		//update the score
		this.scoreCtrl[notif.args.player_id]?.toValue(notif.args.stack_index_plus_1);

		//update the hand sizes
		if (notif.args.from == 'hand') {
			const nbr = Object.keys(notif.args.cards).length;
			this.playerHandSizes[notif.args.player_id]!.incValue(-nbr);
		}
	}

	notif_rearrangeMarket(notif: NotifAs<'rearrangeMarket'>) {
		this.market!.rearrange(notif.args.card_ids);
	}

	notif_fillEmptyMarketSlots(notif: NotifAs<'fillEmptyMarketSlots'>) {
		console.warn("notif_fillEmptyMarketSlots");
		console.warn(notif.args);
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
			//move card from market to hand (or limbo)
			this.market!.removeCard(notif.args.pos);
			if (notif.args.to_limbo) {
				this.myLimbo.addDaleCardToStock(daleCard, slotId);
				return; //don't update the hand size!
			}
			this.myHand.addDaleCardToStock(daleCard, slotId)
		}
		else if (this.mono_hand_is_visible) {
			//move card to mono's hand
			this.market!.removeCard(notif.args.pos);
			this.myLimbo.addDaleCardToStock(daleCard, slotId);
		}
		else {
			//move card to the overall player board
			this.market!.removeCard(notif.args.pos, 'overall_player_board_'+notif.args.player_id);
		}
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(1);
	}

	notif_swapHandStall(notif: NotifAs<'swapHandStall'>) {
		console.warn("swapHandStall");
		const stall = this.playerStalls[notif.args.stall_player_id]!;
		if (notif.args.player_id == this.player_id) {
			stall.swapWithStock(notif.args.stall_card_id, this.myHand, DaleCard.of(notif.args.card));
		}
		else {
			stall.swapWithOverallPlayerBoard(notif.args.stall_card_id, this.player_id, DaleCard.of(notif.args.card));
		}
	}

	notif_swapHandMarket(notif: NotifAs<'swapHandMarket'>) {
		console.warn("swapHandMarket");
		if (notif.args.player_id == this.player_id) {
			this.market!.swapWithStock(notif.args.market_card_id, this.myHand, DaleCard.of(notif.args.card));
		}
		else {
			this.market!.swapWithOverallPlayerBoard(notif.args.market_card_id, this.player_id, DaleCard.of(notif.args.card));
		}
	}

	notif_handToLimbo(notif: NotifAs<'handToLimbo'>) {
		console.warn("notif_handToLimbo");
		if (notif.args._private) {
			const card_id = +notif.args._private.card.id;
			if ($(this.myHand.control_name+'_item_' + card_id)) {
				console.warn(notif.args);
				this.myLimbo.addDaleCardToStock(DaleCard.of(notif.args._private.card), this.myHand.control_name+'_item_' + card_id)
				this.myHand.removeFromStockByIdNoAnimation(+card_id);
			}
			else {
				throw new Error(`Card ${card_id} does not exist in myHand.`);
			}
		}
		//update the hand sizes
		this.playerHandSizes[notif.args.player_id]!.incValue(-1);
	}

	notif_instant_limboToHand(notif: NotifAs<'limboToHand'>) {
		this.notif_limboToHand(notif);
	}

	notif_limboToHand(notif: NotifAs<'limboToHand'>) {
		console.warn("notif_limboToHand");
		if (notif.args._private) {
			const card_id = +notif.args._private.card.id;
			if ($(this.myLimbo.control_name+'_item_' + card_id)) {
				console.warn(notif.args);
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

	notif_instant_playerHandToOpponentHand(notif: NotifAs<'playerHandToOpponentHand'>) {
		this.notif_playerHandToOpponentHand(notif);
	}
	
	notif_playerHandToOpponentHand(notif: NotifAs<'playerHandToOpponentHand'>) {
		//Move a card from a `player_id`'s hand/limbo to an `opponent_id`'s hand/limbo
		const temp1 = notif.args.player_id;
		notif.args.player_id = notif.args.opponent_id;
		notif.args.opponent_id = temp1;
		this.notif_opponentHandToPlayerHand(notif);
	}

	notif_instant_opponentHandToPlayerHand(notif: NotifAs<'opponentHandToPlayerHand'>) {
		this.notif_opponentHandToPlayerHand(notif);
	}

	notif_opponentHandToPlayerHand(notif: NotifFrom<'opponentHandToPlayerHand'>) {
		console.warn("opponentHandToPlayerHand");
		console.warn(notif);
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

	notif_obtainNewJunkInDiscard(notif: NotifAs<'obtainNewJunkInDiscard'>) {
		const from_player_id = notif.args.from_player_id ?? notif.args.player_id;
		for (let i in notif.args.cards) {
			const card = notif.args.cards[i]!;
			this.overallPlayerBoardToPile(card, from_player_id, this.playerDiscards[notif.args.player_id]!);
		}
	}
	
	notif_obtainNewJunkOnDeck(notif: NotifAs<'obtainNewJunkOnDeck'>) {
		const from_player_id = notif.args.from_player_id ?? notif.args.player_id;
		let delay = 0;
		for (let i in notif.args.cards) {
			const card = notif.args.cards[i]!;
			this.overallPlayerBoardToPile(card, from_player_id, this.playerDecks[notif.args.player_id]!, delay);
			delay += 75;
		}
	}

	notif_instant_toss(notif: NotifAs<'toss'>) {
		this.notif_toss(notif);
	}

	notif_toss(notif: NotifAs<'toss'>) {
		const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
		if (DaleCard.of(notif.args.card).isAnimalfolk()) {
			this.playerStockToPile(notif.args.card, stock, notif.args.player_id, this.marketDiscard, 0, notif.args.ignore_card_not_found);
		}
		else {
			this.playerStockRemove(notif.args.card, stock, notif.args.player_id, notif.args.ignore_card_not_found);
		}
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(-1);
		}
	}

	notif_tossMultiple(notif: NotifAs<'tossMultiple'>) {
		let delay = 0;
		const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
		for (let id of notif.args.card_ids) {
			const card = notif.args.cards[id]!;
			if (DaleCard.of(card).isAnimalfolk()) {
				this.playerStockToPile(card, stock, notif.args.player_id, this.marketDiscard, delay);
			}
			else {
				this.playerStockRemove(card, stock, notif.args.player_id);
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
		this.playerStockToPile(notif.args.card, stock, notif.args.player_id, discardPile, 0, notif.args.ignore_card_not_found);
		if (!notif.args.from_limbo) {
			//update the hand sizes
			this.playerHandSizes[notif.args.player_id]!.incValue(-1);
		}
	}

	notif_discardMultiple(notif: NotifAs<'discardMultiple'>) {
		console.warn("discardMultiple", notif.args);
		this.coinManager.setSelectionMode('none'); //workaround for when the user selected 0 coins, but 'implicit' coin selection is still turned on
		const discard_id = notif.args.discard_id ?? notif.args.player_id;
		const discardPile = this.playerDiscards[discard_id]!;
		const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
		let delay = 0;
		for (let id of notif.args.card_ids) {
			let card = notif.args.cards[id]!;
			console.log(card);
			this.playerStockToPile(card, stock, notif.args.player_id, discardPile, delay, notif.args.ignore_card_not_found);
			delay += 75; //delay indicates that ordering matters
		}
		if (!notif.args.from_limbo) {
			//update the hand sizes
			this.playerHandSizes[notif.args.player_id]!.incValue(-notif.args.nbr);
		}
	}

	notif_placeOnDeck(notif: NotifAs<'placeOnDeck'>) {
		console.warn("placeOnDeck");
		const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
		if (notif.args._private) {
			//you GIVE the card
			const card = notif.args._private.card;
			const deck = this.allDecks[notif.args.deck_player_id ?? notif.args.player_id]!;
			this.stockToPile(card, stock, deck);
		}
		else  {
			//animate card to deck
			this.allDecks[notif.args.deck_player_id!]!.push(new DaleCard(0, 0), 'overall_player_board_' + notif.args.player_id);
		}
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(-1);
		}
	}

	notif_placeOnDeckMultiple(notif: NotifAs<'placeOnDeckMultiple'>) {
		console.warn("placeOnDeckMultiple");
		const stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
		if (notif.args._private) {
			//you GIVE the cards
			for (let id of notif.args._private.card_ids) {
				const card = notif.args._private.cards[id]!;
				const deck = this.allDecks[notif.args.deck_player_id ?? notif.args.player_id]!;
				this.stockToPile(card, stock, deck);
			}
		}
		else  {
			//animate cards to deck
			for (let i = 0; i < notif.args.nbr; i++) {
				this.allDecks[notif.args.deck_player_id!]!.push(new DaleCard(0, 0), 'overall_player_board_' + notif.args.player_id);
			}
		}
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(-notif.args.nbr);
		}
	}

	notif_instant_marketDiscardToHand(notif: NotifAs<'marketDiscardToHand'>) {
		this.notif_marketDiscardToHand(notif);
	}

	notif_marketDiscardToHand(notif: NotifAs<'marketDiscardToHand'>) {
		console.warn("notif_marketDiscardToHand");
		const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
		this.pileToPlayerStock(notif.args.card, this.marketDiscard, stock, notif.args.player_id);
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(1);
		}
	}

	notif_instant_discardToHand(notif: NotifAs<'discardToHand'>) {
		this.notif_discardToHand(notif);
	}

	notif_discardToHand(notif: NotifAs<'discardToHand'>) {
		console.warn("notif_discardToHand");
		const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
		const discardPile = this.playerDiscards[notif.args.discard_id ?? notif.args.player_id]!;
		this.pileToPlayerStock(notif.args.card, discardPile, stock, notif.args.player_id, +notif.args.card.location_arg);
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(1);
		}
	}
	
	notif_discardToHandMultiple(notif: NotifAs<'discardToHandMultiple'>) {
		console.warn("notif_discardToHandMultiple");
		const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
		const discardPile = this.playerDiscards[notif.args.discard_id ?? notif.args.player_id]!;
		const dbcards_desc = this.sortCardsByLocationArg(notif.args.cards, false); //we remove from top to bottom: [(BottomCard, 1), (TopCard, 2)] -> [(BottomCard, 1)] -> []
		for (let card of dbcards_desc) {
			this.pileToPlayerStock(card, discardPile, stock, notif.args.player_id, +card.location_arg);
		}
		//update the hand sizes
		if (stock === this.myHand) {
			this.playerHandSizes[notif.args.player_id]!.incValue(notif.args.nbr);
		}
	}

	notif_draw(notif: NotifAs<'draw'>) {
		console.warn("notif_draw");
		const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
		const deck = this.allDecks[notif.args.deck_player_id ?? notif.args.player_id]!
		if (notif.args._private) {
			//you drew the card
			let card = notif.args._private.card
			if (notif.args.ignore_if_already_handled && stock.containsCardId(+card.id)) {
				console.warn("Card "+card.id+" is already in this player's hand");
				return;
			}
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
		console.warn("notif_drawMultiple");
		console.warn(notif.args);
		const stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
		const deck = this.allDecks[notif.args.deck_player_id ?? notif.args.player_id]!
		console.warn(deck.size);
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

	notif_shuffleDiscard(notif: NotifAs<'shuffleDiscard'>) {
		const discard = this.playerDiscards[notif.args.player_id]!;
		//pop old cards
		while(discard.size > 0) {
			discard.pop();
		}
		//push new cards
		for (let i in notif.args.discardPile) {
			const card = notif.args.discardPile[+i]!;
			discard.push(DaleCard.of(card));
		}
	}

	notif_reshuffleDeck(notif: NotifAs<'reshuffleDeck'>) {
		console.warn(`reshuffleDeck [market=${notif.args.market}, player_id=${notif.args.player_id}]`);
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
		// 	console.warn(deck.placeholderHTML);
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

	
	notif_accidentShuffle(notif: NotifAs<'accidentShuffle'>) {
		console.warn("accidentShuffle");
		const player_nbr = notif.args.player_nbr;
		const opponent_nbr = notif.args.opponent_nbr;
		if (!this.isSpectator) {
			this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', _("Accident"));
			const nbr = notif.args.opponent_nbr + notif.args.player_nbr
			const hand_card_ids = this.myHand.getAllItems().map(item=>item.id).reverse();
			for (let i = 1; i <= nbr; i++) {
				if ((i%2 == 0 || notif.args.player_nbr == 0) && notif.args.opponent_nbr > 0) {
					notif.args.opponent_nbr -= 1;
					if (this.player_id == notif.args.opponent_id) {
						//from hand
						const opponent_card_id = hand_card_ids.pop()!;
						this.myLimbo.addDaleCardToStock(new DaleCard(-i,0), this.myHand.control_name+"_item_"+opponent_card_id);
						this.myHand.removeFromStockByIdNoAnimation(opponent_card_id);
					}
					else {
						//from overall player board
						this.myLimbo.addDaleCardToStock(new DaleCard(-i,0), "overall_player_board_"+notif.args.opponent_id);
					}
				}
				else {
					notif.args.player_nbr -= 1;
					if (this.player_id == notif.args.player_id) {
						//from hand
						const player_card_id = hand_card_ids.pop()!;
						this.myLimbo.addDaleCardToStock(new DaleCard(-i,0), this.myHand.control_name+"_item_"+player_card_id);
						this.myHand.removeFromStockByIdNoAnimation(player_card_id);
					}
					else {
						//from overall player board
						this.myLimbo.addDaleCardToStock(new DaleCard(-i,0), "overall_player_board_"+notif.args.player_id);
					}
				}
			}
			if (notif.args.opponent_nbr != 0 || notif.args.player_nbr != 0) {
				console.warn(`'accidentShuffle' failed:
					notif.args.opponent_nbr == ${notif.args.opponent_nbr}
					notif.args.player_nbr == ${notif.args.player_nbr}
				`)
			}
			setTimeout((() => {this.myLimbo.shuffleAnimation()}).bind(this), this.myLimbo.duration);
		}
		else {
			//update deck size for spectators
			for (let i = 0; i < notif.args.player_nbr; i++) {
				this.playerDecks[notif.args.player_id]!.pop();
			}
		}
	}

	notif_accidentTakeBack(notif: NotifAs<'accidentTakeBack'>) {
		console.warn("notif_accidentTakeBack");
		if (!this.isSpectator) {
			const limbo_card_ids = this.myLimbo.getAllItems().map(item=>item.id).sort(() => Math.random() - 0.5);
			if (notif.args._private) {
				const cards = Object.values(notif.args._private.cards);
				if (cards.length != notif.args.nbr) {
					throw new Error(`accidentTakeBack failed: expected ${notif.args.nbr} cards, got ${cards.length} cards`)
				}
				for (let card of cards) {
					//to hand
					const limbo_card_id = limbo_card_ids.pop()!;
					this.myHand.addDaleCardToStock(DaleCard.of(card), this.myLimbo.control_name+'_item_'+limbo_card_id);
					this.myLimbo.removeFromStockByIdNoAnimation(limbo_card_id);
				}
			}
			else {
				for (let i = 0; i < notif.args.nbr; i++) {
					//to player board
					const limbo_card_id = limbo_card_ids.pop()!;
					this.myLimbo.removeFromStockById(limbo_card_id, "overall_player_board_"+notif.args.player_id);
				}
			}
		}
	}

	notif_cunningNeighbourWatch(notif: NotifAs<'cunningNeighbourWatch'>) {
		console.warn("notif_cunningNeighbourWatch");
		if (notif.args.player_id == this.player_id) {
			//TODO: remove sorting the cards? This was needed for Mono. But that functionality was moved to monoShowHand
			const sortedCards = this.sortCardsByLocationArg(notif.args._private?.cards, true);
			for (let i in sortedCards) {
				let card = sortedCards[i]!;
				this.myLimbo.addDaleCardToStock(DaleCard.of(card), "overall_player_board_"+notif.args.opponent_id);
			}
		}
		else if (notif.args.opponent_id == this.player_id) {
			this.myHand.removeAllTo("overall_player_board_"+notif.args.player_id);
		}
	}

	notif_cunningNeighbourReturn(notif: NotifAs<'cunningNeighbourReturn'>) {
		if (notif.args.player_id == this.player_id) {
			this.myLimbo.removeAllTo("overall_player_board_"+notif.args.opponent_id);
		}
		else if (notif.args.opponent_id == this.player_id) {
			for (let i in notif.args._private?.cards) {
				let card = notif.args._private.cards[i]!;
				this.myHand.addDaleCardToStock(DaleCard.of(card), "overall_player_board_"+notif.args.player_id);
			}
		}
	}

	notif_monoShowHand(notif: NotifAs<'monoShowHand'>) {
		console.warn("notif_monoShowHand", notif.args);
		if (!this.is_solo || !this.unique_opponent_id) {
			throw new Error("notif_monoShowHand can only be called in a solo game with unique_opponent_id defined");
		}
		this.mono_hand_is_visible = true;
		this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-build', _("Mono's hand"));
		const sortedCards = this.sortCardsByLocationArg(notif.args.cards, true);
		for (let i in sortedCards) {
			let card = sortedCards[i]!;
			this.myLimbo.addDaleCardToStock(DaleCard.of(card), "overall_player_board_"+this.unique_opponent_id);
		}
		this.movePlayAreaOnTop(this.unique_opponent_id);
	}

	notif_monoHideHand(notif: NotifAs<'monoHideHand'>) {
		console.warn("notif_monoHideHand", notif.args);
		if (!this.is_solo || !this.unique_opponent_id) {
			throw new Error("notif_monoHideHand can only be called in a solo game with unique_opponent_id defined");
		}
		this.mono_hand_is_visible = false;
		const sortedCards = this.sortCardsByLocationArg(notif.args.cards, true);
		if (this.myLimbo.count() > sortedCards.length) {
			throw new Error(`Invariant Error: client says Mono's hand size is ${this.myLimbo.count()}, server says its ${sortedCards.length}`);
		}
		for (let i in sortedCards) {
			let card = sortedCards[i]!;
			if (!this.myLimbo.containsCardId(+card.id)) {
				throw new Error(`Invariant Error: server expected ${card.id} to be in Mono's hand.`);
			}
		}
		this.myLimbo.removeAllTo("overall_player_board_"+this.unique_opponent_id);
	}

	notif_tossFromDiscard(notif: NotifAs<'tossFromDiscard'>) {
		console.warn("notif_tossFromDiscard");
		const playerDiscard = this.playerDiscards[notif.args.player_id]!;
		const dbcard = notif.args.card;
		const card = DaleCard.of(dbcard);
		const index = +dbcard.location_arg - 1; //-1 because location_args are 1-indexed and piles are 0-indexed
		playerDiscard.removeAt(index);
		if (card.isAnimalfolk()) {
			this.marketDiscard.push(card, playerDiscard.placeholderHTML);
		}
		//TODO: animate tossing non-animalfolk cards
	}

	notif_tossFromDeck(notif: NotifAs<'tossFromDeck'>) {
		console.warn("notif_tossFromDeck");
		const playerDeck = this.playerDecks[notif.args.player_id]!;
		const dbcard = notif.args.card;
		const card = DaleCard.of(dbcard);
		if (card.isAnimalfolk()) {
			playerDeck.pop(); //pop a cardback
			this.marketDiscard.push(card, playerDeck.placeholderHTML);
		}
		else {
			//TODO: better animation for tossing non-animalfolk cards
			playerDeck.pop('overall_player_board_'+notif.args.player_id);
		}
	}

	notif_tossFromMarketDeck(notif: NotifAs<'tossFromMarketDeck'>) {
		this.marketDeck.pop!();
		this.marketDiscard.push(DaleCard.of(notif.args.card), this.marketDeck.placeholderHTML);
	}

	notif_tossFromMarketBoard(notif: NotifAs<'tossFromMarketBoard'>) {
		let delay = 0;
		for (let id of notif.args.card_ids) {
			const pos = this.market!.posOf(id);
			const slot_id = this.market!.getSlotId(pos);
			this.marketDiscard.push(new DaleCard(id), slot_id, undefined, undefined, delay);
			this.market!.removeCard(pos);
			delay += 75; //delay indicates that ordering matters
		}
	}

	notif_instant_deckToDeck(notif: NotifAs<'deckToDeck'>) {
		this.notif_deckToDeck(notif);
	}

	notif_deckToDeck(notif: NotifAs<'deckToDeck'>) {
		const from_deck = this.playerDecks[notif.args.from_player_id]!;
		const to_deck = this.playerDecks[notif.args.to_player_id]!;
		for (let index = 0; index < notif.args.nbr; index++) {
			from_deck.pop(to_deck.placeholderHTML, () => to_deck.pushHiddenCards(1));
		}
	}

	notif_instant_discardToDeck(notif: NotifAs<'discardToDeck'>) {
		this.notif_discardToDeck(notif);
	}

	notif_discardToDeck(notif: NotifAs<'discardToDeck'>) {
		const discard = this.playerDiscards[notif.args.player_id]!;
		const deck = this.playerDecks[notif.args.opponent_id ?? notif.args.player_id]!;
		discard.moveToTop(DaleCard.of(notif.args.card));
		if (notif.args.to_bottom && deck.placeholderHTML && deck.topCardHTML) {
			//slide the card underneath the stack
			const cover = deck.topCardHTML.cloneNode(true) as HTMLElement;
			deck.placeholderHTML.appendChild(cover);
			dojo.setStyle(cover, 'z-index', Images.Z_INDEX_DECK_ABOVE_SLIDING_CARD.toString());
			dojo.setStyle(cover, 'box-shadow', "0px 0px");
			discard.pop(deck.placeholderHTML, () => {
				deck.pushHiddenCards(1);
				cover.remove();
			});
		}
		else {
			//slide the card on top of the stack
			discard.pop(deck.placeholderHTML, () => deck.pushHiddenCards(1));
		}
	}

	notif_discardToDiscard(notif: NotifAs<'discardToDiscard'>) {
		const discard1 = this.playerDiscards[notif.args.from_player_id]!;
		const discard2 = this.playerDiscards[notif.args.to_player_id]!;
		const topCard = discard1.pop();
		discard2.push(topCard, discard1.placeholderHTML);
		if (topCard.id != +notif.args.card.id) {
			throw new Error(`Mismatch at the top of the discard pile: client found card ${topCard.id}, but server expected card ${notif.args.card.id}`);
		}
	}

	notif_deckToDiscard(notif: NotifAs<'deckToDiscard'>) {
		const discard = this.playerDiscards[notif.args.player_id]!;
		const deck = this.playerDecks[notif.args.opponent_id ?? notif.args.player_id]!;
		const card = DaleCard.of(notif.args.card);
		deck.pop();
		discard.push(card, deck.placeholderHTML);
	}

	notif_rollDie(notif: NotifAs<'rollDie'>) {
		console.warn("notif_rollDie", notif.args);
		const card = DaleCard.of(notif.args.card);
		const parent = DaleCard.divs.get(card.id); //only show die rolls of visible cards
		if (parent) {
			new DaleDie(notif.args.animalfolk_id, notif.args.d6, notif.args.die_label, parent);
		}
	}

	notif_startSlotMachine(notif: NotifAs<'startSlotMachine'>) {
		this.myLimbo.setSelectionMode('none', undefined, "daleofmerchants-wrap-default", _("Slot Machine"));
	}

	notif_advanceClock(notif: NotifAs<'advanceClock'>){
		const playerClock = this.playerClocks[+notif.args.player_id]!;
		playerClock.advanceClock(notif.args.nbr);
	}

	notif_updateActionButtons(notif: NotifAs<'updateActionButtons'>){
		this.removeActionButtons();
		this.onUpdateActionButtons(this.gamedatas.gamestate.name, this.gamedatas.gamestate.args);
	}

	notif_deselectPassive(notif: NotifAs<'deselectPassive'>){
		this.setPassiveSelected(notif.args.passive_card_id, false);
	}

	notif_gainCoins(notif: NotifAs<'gainCoins'>) {
		this.coinManager.addCoins(+notif.args.player_id, notif.args.nbr);
	}

	notif_avidFinancierTakeCoin(notif: NotifAs<'avidFinancierTakeCoin'>) {
		const card = new DaleCard(notif.args.card_id);
		const coin = card.div.querySelector(".daleofmerchants-avid-financier-coin-icon") as HTMLElement | undefined;
		if (coin) {
			//animation
			const to = $("daleofmerchants-coins-icon-"+notif.args.player_id)! as HTMLElement;
			const animSlide = this.slideToObject(coin, to, 500);
			const onEnd = (node: HTMLElement) => {
				node.remove();
			}
			const animCallback = dojo.animateProperty({ node: coin, duration: 0, onEnd: onEnd });
			const anim = dojo.fx.chain([animSlide as unknown as dojo._base.Animation, animCallback]);
			setTimeout(() => {this.coinManager.addCoins(+notif.args.player_id, 1);}, 500);
			anim.play();
			
		}
		else {
			//no animation
			console.warn("avidFinancierTakeCoin animation FAILED");
			this.coinManager.addCoins(+notif.args.player_id, 1);
		}
	}

	notif_selectBlindfold(notif: NotifAs<'selectBlindfold'>) {
		console.warn("notif_selectBlindfold");
		//TODO: refactor this to a 'message'
	}

	notif_addEffect(notif: NotifAs<'addEffect'>) {
		console.warn("notif_addEffect");
		const effect = new DbEffect(notif.args.effect);
		console.warn(effect);
		DaleCard.addEffect(effect);
	}

	notif_updateEffect(notif: NotifAs<'updateEffect'>) {
		console.warn("notif_updateEffect");
		const effect = new DbEffect(notif.args.effect);
		DaleCard.updateEffect(effect);
	}

	notif_expireEffects(notif: NotifAs<'expireEffects'>){
		console.warn("notif_expireEffects");
		const effects = notif.args.effects.map(effect => new DbEffect(effect));
		console.warn(effects);
		DaleCard.expireEffects(effects);
	}

	notif_setScheduleCooldown(notif: NotifAs<'setScheduleCooldown'>) {
		for (const card_id in notif.args.cards) {
			if (notif.args.status) {
				DaleCard.scheduleCooldownCardIds.add(+card_id);
			}
			else {
				DaleCard.scheduleCooldownCardIds.delete(+card_id);
			}
			if (notif.args.player_id == this.player_id) {
				this.mySchedule.setClickable(+card_id); //update the selection mode
			}
		}
	}

	notif_message(notif: NotifAs<'message'>) {
		return;
	}

	notif_debugClient(notif: NotifAs<'debugClient'>) {
		//this notification only exists for debugging purposes
		let arg = notif.args.arg;
		console.warn(`Debug with argument ${arg}`)
		if (arg == 'log') {
			console.warn("RECEIVED A DEBUG NOTIFICATION !");
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
			console.warn(notif.args.msg);
		}
		else if (arg == 'increaseDeckSize') {
			this.playerDecks[notif.args.player_id]!.pushHiddenCards(notif.args.nbr);
		}
		else if (arg == 'bindings') {
			console.warn(DaleCard.getLocalChameleonsJSON());
		}
		else if (arg == 'debugDaleCard') {
			console.warn(new DaleCard(notif.args.card_id));
		}
		else if (arg == 'divs') {
			console.warn(Array.from(DaleCard.divs.entries()).sort((a, b) => a[0] - b[0]));
		}
		else if (arg == 'enableDebugMode') {
			this.gamedatas.debugMode = true;
			this.removeActionButtons();
			this.onUpdateActionButtons(this.gamedatas.gamestate.name, {});
			this.addCardNameInputField(document.querySelector('.daleofmerchants-debugtools')!, _("Spawn Card"), this.spawnCard.bind(this));
		}
		else {
			throw new Error(`Unknown argument ${notif.args.arg}`)
		}	
	}

	///////////////////////////////////////////////////
	//// Animation

	/**
	 * Returns the player order starting from the specified player ID,
	 * preserving the order defined in `this.gamedatas.playerorder`.
	 * @param start_with_player_id - The player ID to start the order from
	 * @returns A rotated array of player IDs, starting with the specified one
	 */
	getPlayerOrderStartingWith(start_with_player_id: number | string): number[] {
		let order = this.gamedatas.playerorder.map(Number);
		if (this.isSpectator) {
			//workaround to get the player order in spectator mode
			order = [];
			document.querySelectorAll(".daleofmerchants-play-area").forEach((elem) => {
				const match = elem.id.match(/\d+/);
				if (match) {
					order.push(+match[0]);
				}
			})
		}
		let startIndex = order.indexOf(+start_with_player_id);

		if (startIndex === -1) {
			console.warn("------------------------------------------------------");
			console.warn(order);
			console.warn(`Player ID ${start_with_player_id} not found in player order.`);
			console.warn("------------------------------------------------------");
			startIndex = 0;
		}

		return [...order.slice(startIndex), ...order.slice(0, startIndex)];
	}

	/**
	 * Move the play area of the specified player above all other play areas
	 * @param start_with_player_id 
	 * @param duration default `1000ms` - duration of the animation in ms
	 */
	movePlayAreaOnTop(start_with_player_id: number, duration: number = 1000) {
		if (this.getGameUserPreference(101) == 0) {
			return;
		}

		// Step 1: Record current positions
		const container = document.querySelector(".daleofmerchants-play-area-container") as HTMLElement;
		const playAreas = Array.from(container.children) as HTMLElement[];
		const initialRects = new Map<HTMLElement, DOMRect>();
		playAreas.forEach(el => initialRects.set(el, el.getBoundingClientRect()));

		// Don't reorder if the starting player is already on top
		const topPlayerId = playAreas[0]?.id.split('-').pop();
		if (topPlayerId === start_with_player_id.toString()) {
			return;
		}

		// Step 2: Instantly reorder the containers
		for (let player_id of this.getPlayerOrderStartingWith(start_with_player_id)) {
			const top = container.querySelector(`#daleofmerchants-play-area-${player_id}`) as HTMLElement;
			if (player_id != this.player_id) {
				top.classList.add("daleofmerchants-play-area-opponent"); //add styling to quickly find your own play area
			}
			container.appendChild(top);
		}

		// Step 3: Record new positions and compute deltas
		const transitions: { el: HTMLElement, deltaY: number }[] = [];
		playAreas.forEach(el => {
			const initialRect = initialRects.get(el)!;
			const newRect = el.getBoundingClientRect();
			const deltaY = initialRect.top - newRect.top;
			if (deltaY !== 0) {
				transitions.push({ el, deltaY });
			}
		});

		// Step 4: Apply transform to reverse the movement
		transitions.forEach(({ el, deltaY }) => {
			el.style.transition = 'none';
			el.style.transform = `translateY(${deltaY}px)`;
		});

		// Force reflow
		void container.offsetHeight;

		// Step 5: Animate to natural position
		transitions.forEach(({ el }) => {
			el.style.transition = `transform ${duration}ms ease`;
			el.style.transform = '';
		});

		// Step 6: Cleanup after transition
		const cleanup = () => {
			transitions.forEach(({ el }) => {
				el.style.transition = '';
				el.style.transform = '';
				el.removeEventListener('transitionend', cleanup);
			});
		};

		// Add listener to one element to clean up after animation ends
		if (transitions.length) {
			transitions[0]!.el.addEventListener('transitionend', cleanup);
		}
    }
	
	///////////////////////////////////////////////////
	//// Debug functions

	/**
	 * Add an input field for a card name, along with a submit button
	 * @param parent Container to place the input field in
	 * @param button_label Label to display on the submit button
	 * @param callback Callback function that takes the written card name
	 */
	addCardNameInputField(parent: HTMLElement, button_label: string, callback: (card_name: string) => void) {
		// Get the words
		const wordExt: Map<string, string> = new Map<string, string>(); // wordExt holds extra information about the card (set + value)
		const words: string[] = [];
		for (let i in this.gamedatas.cardTypes) {
			const cardType = this.gamedatas.cardTypes[i]!;
			if (cardType.type_id > 4) {
				const cardName = cardType.name.toLowerCase();
				const cardNameExt = cardType.animalfolk_displayed.length > 0 ? ` (${cardType.animalfolk_displayed.toLowerCase()} ${cardType.value})` : "";
				words.push(cardName);
				wordExt.set(cardName, ` <span style="font-size: x-small;">${cardNameExt}</span>`);
			}
		}
		
		// Get the html elements
		parent.classList.remove("daleofmerchants-hidden");
		parent.innerHTML += `
			<span>
				<strong></strong>
				<div class="daleofmerchants-autocomplete-container">
					<input type="text" placeholder="Type a card name..." autocomplete="off">
					<div class="daleofmerchants-dropdown" style="display: none;"></div>
				</div>
				<button style="width: 120px;" class="action-button bgabutton bgabutton_blue">${button_label}</button>
			</span>
		`
		const container = parent.querySelector('.daleofmerchants-autocomplete-container')!;
		const inputField = container.querySelector('input')! as HTMLInputElement;
		const dropdown = container.querySelector('div')!;
		const button = parent.querySelector('button')!;
		console.log(container);

		// Function to populate the dropdown based on query
		function populateDropdown(query: string) {
			dropdown.innerHTML = ''; // Clear previous dropdown items
			const filteredWords = words.filter(word => word.toLowerCase().startsWith(query));
			if (filteredWords.length > 0) {
				filteredWords.forEach(word => {
					const option = document.createElement('div');
					//option.textContent = word + wordExt.get(word);
					option.innerHTML = word + wordExt.get(word);
					option.addEventListener('click', function() {
						inputField.value = word; // Set the selected word to the input field
						dropdown.style.display = 'none'; // Hide the dropdown
					});
					dropdown.appendChild(option);
				});
				dropdown.style.display = 'block'; // Show dropdown
			} else {
				dropdown.style.display = 'none'; // Hide dropdown if no matches
			}
		}
		inputField.addEventListener('input', function() {populateDropdown(this.value.toLowerCase());});
		inputField.addEventListener('focus', function() {populateDropdown(this.value.toLowerCase());});

		// actSpawn on enter or button click
		inputField.addEventListener('keydown', (event) => {
			if (event.key === "Enter") {
				callback(JSON.stringify(inputField.value));
			}
		});
		button.addEventListener('click', (event) => {
			callback(JSON.stringify(inputField.value));
		});
		

		// Hide the dropdown when clicking outside the input
		document.addEventListener('click', function(e) {
			if (!document.querySelector('.daleofmerchants-autocomplete-container')!.contains(e.target as HTMLElement)) {
				dropdown.style.display = 'none';
			}
		});
	}

	spawnCard(card_name: string) {
		console.warn("actSpawn");
		this.bgaPerformAction('actSpawn', {
			card_name: card_name
		})
	}
}


// The global 'bgagame.dale' class is instantiated when the page is loaded. The following code sets this variable to your game class.
dojo.setObject( "bgagame.daleofmerchants", DaleOfMerchants );

export { PrivateNotification };
// Same as: (window.bgagame ??= {}).daleofmerchants = DaleOfMerchants;