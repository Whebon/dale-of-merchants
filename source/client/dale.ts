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

//needed for BGA
import "ebg/counter";
import "ebg/stock"; 

import { DaleStock } from './components/DaleStock'
import { Pile } from './components/Pile';
import { DaleCard } from './components/DaleCard';
import { MarketBoard } from './components/MarketBoard'
import { Stall } from './components/Stall'
import { DbCard } from './components/types/DbCard';
import { ChameleonClientStateArgs } from './components/types/ChameleonClientStateArgs';
import { CardSlot } from './components/CardSlot';

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
	marketDeck: Pile = new Pile(this, 'market-deck', 'Market Deck');

	/** Ordered pile of known cards representing the market discard deck. */
	marketDiscard: Pile = new Pile(this, 'market-discard', 'Market Discard');

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

	/** Cards in this client's temporary card stock */
	myTemporary: DaleStock = new DaleStock();

	/** Argument for chameleon client states. This card needs to be highlighted while selecting a valid target for it. */
	chameleonArgs: ChameleonClientStateArgs | undefined;

	/** @gameSpecific See {@link Gamegui} for more information. */
	constructor(){
		super();
		console.log('dale constructor');
	}

	/** @gameSpecific See {@link Gamegui.setup} for more information. */
	override setup(gamedatas: Gamedatas): void
	{
		console.log( "Starting game setup" );
		console.log("------ GAME DATAS ------")
		console.log(this.gamedatas)
		console.log("------------------------")

		//initialize the card types
		DaleCard.init(gamedatas.cardTypes);

		//display any effects on the client-side (currently, only chameleon effects are used)
		console.log("DbEffects:");
		for (let i in gamedatas.effects) {
			const effect = gamedatas.effects[i]!;
			switch(+effect.type_id) {
				case DaleCard.CT_FLEXIBLESHOPKEEPER:
				case DaleCard.CT_REFLECTION:
				case DaleCard.CT_GOODOLDTIMES:
				case DaleCard.CT_TRENDSETTING:
				case DaleCard.CT_SEEINGDOUBLES:
					if (+effect.target != -1) {
						console.log(`Bind Chameleon: ${+effect.card_id} -> ${+effect.target}`);
						DaleCard.bindChameleonFromServer(+effect.card_id, +effect.target);
					}
					break;
				default:
					break;
			}
			console.log(effect);
		}

		//initialize the player boards
		for(let player_id in gamedatas.players ){
			let player = gamedatas.players[player_id];

			//deck per player
			this.playerDecks[player_id] = new Pile(this, 'deck-'+player_id, 'Deck', +player_id);
			this.playerDecks[player_id].pushHiddenCards(gamedatas.deckSizes[player_id]!);

			//discard pile per player
			this.playerDiscards[player_id] = new Pile(this, 'discard-'+player_id, 'Discard Pile', +player_id);
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
			this.playerStalls[player_id].createNewStack() //we always need a trailing empty stack
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
		this.myHand.init(this, $('myhand')!);
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
			const color = gamedatas.players[player_id]?.color ?? 'white';
			const recolor = (itemDiv: HTMLElement, typeId: number, itemId: number) => {
				//append color styling to new cards in the schedule
				itemDiv.setAttribute('style', itemDiv.getAttribute('style')+`;
					background-blend-mode: overlay;
					background-color: #${color}20;`
				);
				myHandUpdateDisplay();
			}
			this.playerSchedules[player_id] = new DaleStock();
			this.playerSchedules[player_id].init(this, container, wrap, recolor, myHandUpdateDisplay);
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

		//turn on selection mode(s)
		switch( stateName ){
			case 'playerTurn':
				this.market!.setSelectionMode(1);
				this.myHand.setSelectionMode(1);
				this.myStall.setSelectionMode("build");
				break;
			case 'purchase':
				const purchaseArgs = args.args as GameStateArgs<'purchase'>;
				console.log(purchaseArgs);
				this.myHand.setSelectionMode(2);
				this.market!.setSelected(purchaseArgs.pos, true);
				break;
			case 'build':
				this.myHand.setSelectionMode(2);
				this.myDiscard.setSelectionMode('multiple', 0);
				break;
			case 'inventory':
				this.myHand.setSelectionMode(2);
				break;
			case 'swiftBroker':
				this.myHand.setSelectionMode(2);
				break;
			case 'shatteredRelic':
				this.myHand.setSelectionMode(1);
				break;
			case 'spyglass':
				this.myTemporary.setSelectionMode(2);
				break;
			case 'client_trendsetting':
				this.market!.setSelectionMode(1);
				this.chameleonArgs?.card_div?.classList.add("chameleon-selected");
				break;
			case 'nextPlayer':
				console.log("nextPlayer, expire all effects that last until end of turn (chameleon bindings)");
				DaleCard.unbindAllChameleons();
				this.updateHTML();
		}
	}

	/** @gameSpecific See {@link Gamegui.onLeavingState} for more information. */
	override onLeavingState(stateName: GameStateName): void
	{
		console.log( 'Leaving state: '+stateName );
		
		if (this.chameleonArgs && stateName.substring(0, 6) != 'client') {
			console.log("this.chameleonArgs => don't turn off selection modes");
			return;
		}

		//turn off selection mode(s)
		switch( stateName )
		{
			case 'playerTurn':
				this.market!.setSelectionMode(0);
				this.myHand.setSelectionMode(0);
				this.myStall.setSelectionMode("none");
				break;
			case 'purchase':
				this.myHand.setSelectionMode(0);
				this.market!.unselectAll();
				break;
			case 'build':
				this.myHand.setSelectionMode(0);
				this.myDiscard.setSelectionMode('none');
				break;
			case 'inventory':
				this.myHand.setSelectionMode(0);
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
			case 'client_trendsetting':
				this.market!.setSelectionMode(0);
				this.chameleonArgs?.card_div?.classList.remove("chameleon-selected");
				break;
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
				// Add buttons if needed
				this.addActionButton("confirm-button", _("Pass"), "onRequestInventoryAction");
				break;
			case 'purchase':
				this.addActionButton("confirm-button", _("Confirm Funds"), "onPurchase");
				this.addActionButtonCancel();
				break;
			case 'build':
				this.addActionButton("confirm-button", _("Confirm Selection"), "onBuild");
				this.addActionButtonCancel();
				break;
			case 'inventory':
				this.addActionButton("confirm-button", _("Discard Selection"), "onInventoryAction");
				this.addActionButtonCancel();
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
			case 'client_trendsetting':
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
	 * If the card is an UNBOUND chameleon card, first set the client state to bind the chameleon, then all the `callback` with the bound `card`.
	 * 
	 * Otherwise, simply call the `callback` function with `card`.
	 * 
	 * @param card the card that potentially needs to be be bound. If null, immediately call the callback function without arguments
	 * @param from where is this card currently located?
	 * @param callback function is call if the card is bound. (non-chameleon cards are always 'bound')
	 * @param requiresPlayable (optional) default false. If true, when copying, the target must be a playable card
	 * @param saveSelection (optional) default false. If true, after copying, restored the saved selection
	 */
	handleChameleonCard(card: DaleCard | undefined, from: Pile | DaleStock | MarketBoard | Stall, callback: (card?: DaleCard) => void, requiresPlayable: boolean = false, saveSelection: boolean = false) {
		callback = callback.bind(this);
		if (!card || !this.checkLock()) {
			callback();
			return;
		}
		if (card.isBoundChameleon()) {
			card.unbindChameleonLocal();
			from.updateHTML(card);
			callback(card);
			return;
		}
		switch(card.effective_type_id) {
			case DaleCard.CT_TRENDSETTING:
				if (this.chameleonArgs !== undefined) {
					console.warn("Previous chameleon args will be overwritten!");
				}
				this.chameleonArgs = new ChameleonClientStateArgs(card, from, callback, requiresPlayable, saveSelection);
				this.setClientState('client_trendsetting', {
					descriptionmyturn: _("Trendsetting: ${you} must copy a card in the market")
				});
				break;
			default:
				//card is not a chameleon card, immediately execute the callback function
				console.log(DaleCard.getLocalChameleons());
				callback(card);
				break;
		}
	}

	/**
	 * Refreshes all html elements that represent cards. Should be called after chameleon bindings are changed.
	 * @param location (optional) - if provided, only update this location
	 * @param card (optional) - if provided, only update this html elements of this card
	 */
	updateHTML(location?: Pile | DaleStock | MarketBoard | Stall, card?: DaleCard) {
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



	//TODO: safely delete this
	// /**
	//  * Move a card from my hand to the specified pile
	//  * @param card card to move
	//  * @param pile pile to move to
	//  * @param delay
	// */
	// myHandToPile(card: DbCard, pile: Pile, delay: number = 0) {
	// 	const card_id = card.id;
	// 	if ($('myhand_item_' + card_id)) {
	// 		pile.push(new DaleCard(card_id), 'myhand_item_' + card_id, undefined, undefined, delay);
	// 		this.myHand.removeFromStockByIdNoAnimation(+card_id);
	// 	}
	// 	else {
	// 		throw new Error(`Card ${card_id} does not exist in my hand`);
	// 	}
	// }

	//TODO: sately delete this
	// /**
	//  * Move a card from any player's hand to the specified pile
	//  * @param card card to move
	//  * @param player_id owner of the hand to move from
	//  * @param pile pile to move to
	//  * @param delay
	// */
	// handToPile(card: DbCard, player_id: number, pile: Pile, delay: number = 0) {
	// 	this.playerStockToPile(card, this.myHand, player_id, pile, delay);
	// }

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

	onStallCardClick(card: DaleCard, stack_index: number, index: number) {
        console.log(`Clicked on CardStack[${stack_index}, ${index}]`);
		// this.myStall.createNewSlot(stack_index, new DaleCard(0, 0))
        // this.myStall.createNewSlot(stack_index, new DaleCard(0, 0))
        // this.myStall.createNewStack();

		switch(this.gamedatas.gamestate.name) {
			case 'playerTurn':
				if(this.checkAction('actRequestStallAction')) {
					this.bgaPerformAction('actRequestStallAction', {})
				}
				break;
		}
	}

	onMarketCardClick(card: DaleCard, pos: number) {
		pos = this.market!.getValidPos(pos);

		switch(this.gamedatas.gamestate.name) {
			case 'playerTurn':
				if(this.checkAction('actRequestMarketAction')) {
					//TODO: check if maximum available funds are sufficient
					this.bgaPerformAction('actRequestMarketAction', {
						market_card_id: card.id
					})
				}
				break;
			case 'client_trendsetting':
				this.onConfirmChameleon(card.effective_type_id);
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
	}

	onMyDiscardPileSelectionChanged(pile: Pile, card: DaleCard) {
		console.log("onMyDiscardPileSelectionChanged");
		switch(this.gamedatas.gamestate.name) {
			case 'build':
				this.onBuildSelectionChanged(card);
				break;
		}
	}

	onHandSelectionChanged(control_name: string, card_id?: number) {
		if (!card_id) return;
		const card = new DaleCard(card_id);
		const isAdded = this.myHand.isSelected(card_id);

		switch(this.gamedatas.gamestate.name) {
			case 'playerTurn':
				//play card action (technique or active passive)
				console.log("card.effective_type_id = " + card!.effective_type_id);
				this.handleChameleonCard(card, this.myHand, this.onPlayCard, true);
				break;
			case 'build':
				this.handleChameleonCard(card, this.myHand, this.onBuildSelectionChanged, false, true);
				break;
			case 'shatteredRelic':
				if(this.checkAction('actShatteredRelic')) {
					this.bgaPerformAction('actShatteredRelic', {
						card_id: card!.id
					})
				}
				this.myHand.unselectAll();
				break;
			case 'client_trendsetting':
				console.log("client_trendsetting");
				const args = this.chameleonArgs!;
				if (args.card.id == card.id) {
					this.onCancelChameleon();
				}
				else {
					this.showMessage(_("Please select a valid target for 'Trendsetting'"), "error");
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

	onPurchase() {
		if(this.checkAction('actPurchase')) {
			this.bgaPerformAction('actPurchase', {
				funds_card_ids: this.arrayToNumberList(this.myHand.orderedSelectedCardIds)
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
		else if(this.checkAction('actPlayCard')) {
			this.bgaPerformAction('actPlayCard', {
				card_id: card.id, 
				...DaleCard.getLocalChameleons()
			});
		}
		this.myHand.unselectAll();
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

	onCancel() {
		if (DaleCard.unbindAllChameleonsLocal()) {
			//undo client state
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
	
	onCancelChameleon() {
		console.log("ON CANCEL CHAMELEON !");
		//return from the chameleon client state
		const args = this.chameleonArgs!
		if (args.location instanceof DaleStock) {
			args.location.unselectItem(args.card.id);
		}
		this.restoreServerGameState();
		this.chameleonArgs = undefined;
		//DaleCard.unbindAllChameleonsLocal(); 	//TODO: is this really needed? maybe we don't need to unbind anything AT ALL?
		this.updateHTML();
	}

	/**
	 * To be called from within a chameleon client state. Confirms the user selection for the chameleon card and restores the server state.
	 * @param type_id new (target) type_id for the card
	 * @returns 
	 */
	onConfirmChameleon(type_id: number) {
		//return from the chameleon client state, but keep the local bindings
		const args = this.chameleonArgs!;
		if (args.requiresPlayable && !DaleCard.isPlayable(type_id)) {
			this.showMessage(_("Copy failed: this card cannot be played"), 'error');
			this.onCancelChameleon();
		}
		else {
			this.restoreServerGameState();
			args.card.bindChameleonLocal(type_id);
			this.updateHTML(args.location, args.card);
			args.callback(args.card);
			this.chameleonArgs = undefined;
		}
	}

	onRequestInventoryAction() {
		if(this.checkAction('actRequestInventoryAction')) {
			this.bgaPerformAction('actRequestInventoryAction', {})
		}
	}

	onInventoryAction() {
		if(this.checkAction("actInventoryAction")) {
			this.bgaPerformAction('actInventoryAction', {
				ids: this.arrayToNumberList(this.myHand.orderedSelectedCardIds)
			})
		}
	}

	onSwiftBroker() {
		if(this.checkAction("actSwiftBroker")) {
			this.bgaPerformAction('actSwiftBroker', {
				card_ids: this.arrayToNumberList(this.myHand.orderedSelectedCardIds)
			})
		}
	}

	onSpyglass() {
		console.log("Sending "+this.arrayToNumberList(this.myTemporary.orderedSelectedCardIds));
		if (this.myTemporary.orderedSelectedCardIds.length == 0) {
			this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
			return;
		}
		if(this.checkAction("actSpyglass")) {
			this.bgaPerformAction('actSpyglass', {
				card_ids: this.arrayToNumberList(this.myTemporary.orderedSelectedCardIds)
			})
		}
	}

	///////////////////////////////////////////////////
	//// Reaction to cometD notifications

	/** @gameSpecific See {@link Gamegui.setupNotifications} for more information. */
	override setupNotifications()
	{
		console.log( 'notifications subscriptions setup2' );
		
		const notifs: [keyof NotifTypes, number][] = [
			['scheduleTechnique', 1000],
			['resolveTechnique', 1000],
			['cancelTechnique', 1000],
			['buildStack', 1500],
			['fillEmptyMarketSlots', 1],
			['marketSlideRight', 1000],
			['marketToHand', 1500],
			['removeFromStall', 1000],
			['discardToHand', 1000],
			['discardToHandMultiple', 1000],
			['draw', 1000],
			['drawMultiple', 1000],
			['temporaryToHand', 1000],
			['obtainNewJunkInHand', 1000],
			['throwAway', 1000],
			['throwAwayMultiple', 1000],
			['discard', 1000],
			['discardMultiple', 1000],
			['placeOnDeckMultiple', 1000],
			['reshuffleDeck', 1500],
			['bindChameleon', 1],
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
			if ($('myhand_item_' + card_id)) {
				this.mySchedule.addDaleCardToStock(DaleCard.of(notif.args.card), 'myhand_item_' + card_id)
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
			// const newLocationArg = String(Stall.MAX_STACK_SIZE * notif.args.stack_index + index);
			// console.log(`Build stack: [${card.location}@${card.location_arg}] -> [<current_players_stall>@${newLocationArg}]`);
			// card.location_arg = newLocationArg;
			//stall.insertDbCard(card, 'myhand_item_' + card.id);
			switch(notif.args.from){
				case 'hand':
					if (notif.args.player_id == this.player_id) {
						if ($('myhand_item_' + card.id)) {
							stall.insertCard(card, notif.args.stack_index, undefined, 'myhand_item_' + card.id)
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
					//TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
					stall.insertCard(card, notif.args.stack_index, undefined, discard.placeholderHTML)
					console.log("index = "+index);
					discard.removeAt(index); 
					break;
			}

		}
		this.scoreCtrl[notif.args.player_id]?.toValue(notif.args.stack_index_plus_1);
		stall.createNewStack();
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
	}
	
	notif_removeFromStall(notif: NotifAs<'removeFromStall'>) {
		//TODO: currently unused, but could be used for CT_ACORN
		const stall = this.playerStalls[notif.args.player_id]!;
		for (let i in notif.args.cards) {
			const daleCard = DaleCard.of(notif.args.cards[i]!);
			const pos = +notif.args.cards[i]!.location_arg;
			const slotId = stall.getSlotId(pos);
			switch(notif.args.to) {
				case 'hand':
					if (notif.args.player_id == this.player_id) {
						//move card from market to hand
						this.myHand.addDaleCardToStock(daleCard, slotId);
						stall.removeCard(pos);
					}
					else {
						//move card to the overall player board
						stall.removeCard(pos);
					}
					break;
				default:
					console.error(`Invalid argument for removeFromStall: to = '${notif.args.to}'`)
					break;
			}
		}
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
		else {
			//TODO: increase player hand size
			return;
		}
	}
	
	notif_obtainNewJunkInHand(notif: NotifAs<'obtainNewJunkInHand'>) {
		if (notif.args.player_id == this.player_id) {
			//junk to hand
			for (let i in notif.args.cards) {
				let card = notif.args.cards[i]!;
				this.myHand.addDaleCardToStock(DaleCard.of(card), 'overall_player_board_'+notif.args.player_id);
			}
		}
		else {
			//TODO: increase player hand size
			return;
		}
	}

	notif_throwAway(notif: NotifAs<'throwAway'>) {
		const stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
		if (DaleCard.of(notif.args.card).isJunk()) {
			this.playerStockRemove(notif.args.card, stock, notif.args.player_id);
		}
		else {
			this.playerStockToPile(notif.args.card, stock, notif.args.player_id, this.marketDiscard);
		}
	}

	notif_throwAwayMultiple(notif: NotifAs<'throwAwayMultiple'>) {
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
	}

	notif_discard(notif: NotifAs<'discard'>) {
		const discard_id = notif.args.discard_id ?? notif.args.player_id;
		const discardPile = this.playerDiscards[discard_id]!;
		const stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
		this.playerStockToPile(notif.args.card, stock, notif.args.player_id, discardPile);
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
			this.myDeck.pushHiddenCards(1);
		}
	}

	notif_discardToHand(notif: NotifAs<'discardToHand'>) {
		console.log("notif_discardToHand");
		const stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
		const discardPile = this.playerDiscards[notif.args.discard_id ?? this.player_id]!;
		this.pileToPlayerStock(notif.args.card, discardPile, stock, notif.args.player_id);
	}
	
	notif_discardToHandMultiple(notif: NotifAs<'discardToHandMultiple'>) {
		console.log("notif_discardToHandMultiple");
		const stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
		const discardPile = this.playerDiscards[notif.args.discard_id ?? this.player_id]!;
		for (let i in notif.args.cards) {
			const card = notif.args.cards[i]!;
			this.pileToPlayerStock(card, discardPile, stock, notif.args.player_id, +card.location_arg);
		}
	}

	notif_draw(notif: NotifAs<'draw'>) {
		console.log("notif_draw");
		const stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
		if (notif.args._private) {
			//you drew the cards
			let card = notif.args._private.card
			stock.addDaleCardToStock(DaleCard.of(card), this.myDeck.placeholderHTML);
			this.myDeck.pop();
		}
		else {
			//another player drew cards, just remove a card from the deck
			this.playerDecks[notif.args.player_id]!.pop();
		}
	}
	
	notif_drawMultiple(notif: NotifAs<'drawMultiple'>) {
		console.log("notif_drawMultiple");
		console.log(notif.args);
		const stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
		if (notif.args._private) {
			//you drew the cards
			for (let i in notif.args._private?.cards) {
				let card = notif.args._private.cards[i]!;
				stock.addDaleCardToStock(DaleCard.of(card), this.myDeck.placeholderHTML);
				this.myDeck.pop();
			}
		}
		else {
			//another player drew cards, just remove cards from the deck
			for (let i = 0; i < notif.args.nbr; i++) {
				this.playerDecks[notif.args.player_id]!.pop();
			}
		}
	}

	notif_reshuffleDeck(notif: NotifAs<'reshuffleDeck'>) {
		if (notif.args.player_id == null) {
			this.marketDiscard.shuffleToDrawPile(this.marketDeck!);
		}
		else {
			this.playerDiscards[notif.args.player_id]!.shuffleToDrawPile(this.playerDecks[notif.args.player_id]!);
		}
	}

	notif_bindChameleon(notif: NotifAs<'bindChameleon'>) {
		DaleCard.bindChameleonFromServer(+notif.args.card_id, +notif.args.type_id);
		DaleCard.unbindAllChameleonsLocal();
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
			this.myDeck.pushHiddenCards(notif.args.nbr);
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