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
import { Images } from './components/Images';
import { Pile } from './components/Pile';
import { DaleCard } from './components/DaleCard';
import { MarketBoard } from './components/MarketBoard'
import { Stall } from './components/Stall'
import { DbCard } from './components/types/DbCard';

/** The root for all of your game code. */
class Dale extends Gamegui
{
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

		//initialize the player boards
		for(let player_id in gamedatas.players ){
			let player = gamedatas.players[player_id];

			//deck per player
			this.playerDecks[player_id] = new Pile(this, 'deck-'+player_id, 'Deck');
			this.playerDecks[player_id].pushHiddenCards(gamedatas.deckSizes[player_id]!);

			//discard pile per player
			this.playerDiscards[player_id] = new Pile(this, 'discard-'+player_id, 'Discard Pile');
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
		this.myHand.init(this, $('myhand')!);
		for (let i in gamedatas.hand) {
			let card = gamedatas.hand[i]!;
			this.myHand.addDaleCardToStock(DaleCard.of(card));
		}
		dojo.connect( this.myHand, 'onChangeSelection', this, 'onHandSelectionChanged' );

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
			}
			this.playerSchedules[player_id] = new DaleStock();
			this.playerSchedules[player_id].init(this, container, wrap, recolor);
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

		if (!this.isCurrentPlayerActive()) {
			this.market!.setSelectionMode(0);
			this.myHand.setSelectionMode(0);
			return;
		}

		//reset the selected cards array
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
		}
	}

	/** @gameSpecific See {@link Gamegui.onLeavingState} for more information. */
	override onLeavingState(stateName: GameStateName): void
	{
		console.log( 'Leaving state: '+stateName );
		
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
		}
	}

	///////////////////////////////////////////////////
	//// Utility methods
	
	/*
		Here, you can defines some utility methods that you can use everywhere in your typescript
		script.
	*/

	/**
	 * Move a card from my hand to the specified pile
	 * @param card card to move
	 * @param pile pile to move to
	 * @param delay
	*/
	myHandToPile(card: DbCard, pile: Pile, delay: number = 0) {
		const card_id = card.id;
		if ($('myhand_item_' + card_id)) {
			pile.push(new DaleCard(card_id), 'myhand_item_' + card_id, undefined, undefined, delay);
			this.myHand.removeFromStockByIdNoAnimation(+card_id);
		}
		else {
			throw new Error(`Card ${card_id} does not exist in my hand`);
		}
	}

	/**
	 * Move a card from any player's hand to the specified pile
	 * @param card card to move
	 * @param player_id owner of the hand to move from
	 * @param pile pile to move to
	 * @param delay
	*/
	anyHandToPile(card: DbCard, player_id: number, pile: Pile, delay: number = 0) {
		if (+player_id == this.player_id) {
			this.myHandToPile(card, pile, delay);
		}
		else {
			pile.push(DaleCard.of(card), 'overall_player_board_'+player_id);
		}
	}

	/**
	 * Move a card from the top of the specified pile to the hand
	 * @param card card to move
	 * @param pile pile to move from
	*/
	pileToMyHand(card: DbCard, pile: Pile) {
		//WARNING: UNTESTED & NEVER USED
		this.myHand.addDaleCardToStock(DaleCard.of(card), pile.placeholderHTML);
		if(pile.pop().id != +card.id) {
			throw new Error(`Card ${+card.id} was not found on top of the pile`);
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
		}
	}
	
	onScheduleSelectionChanged() {
		//should not be possible at the moment
		console.log("You click on a card in the... schedule...?");
	}

	onHandSelectionChanged() {
		let items = this.myHand.getSelectedItems();
		if (!items[0]) return;
		const card = new DaleCard(items[0].id);

		switch(this.gamedatas.gamestate.name) {
			case 'playerTurn':
				//play card action (technique or active passive)
				if (!card.isPlayable()) {
					this.showMessage(_("This card cannot be played"), 'error');
				}
				else if(this.checkAction('actPlayCard')) {
					this.bgaPerformAction('actPlayCard', {
						card_id: card.id
					})
				}
				this.myHand.unselectAll();
				break;
			case 'shatteredRelic':
				if(this.checkAction('actShatteredRelic')) {
					this.bgaPerformAction('actShatteredRelic', {
						card_id: card.id
					})
				}
				this.myHand.unselectAll();
				break;
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

	onBuild() {
		const autoSortedCards = this.myHand.getSelectedItems();
		if(this.checkAction('actBuild')) {
			this.bgaPerformAction('actBuild', {
				stack_card_ids: this.arrayToNumberList(autoSortedCards)
			})
		}
	}

	onCancel() {
		if(this.checkAction('actCancel')) {
			this.bgaPerformAction('actCancel', {})
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
			['draw', 1000],
			['drawMultiple', 1000],
			['obtainNewJunkInHand', 1000],
			['throwAway', 1000],
			['throwAwayMultiple', 1000],
			['discard', 1000],
			['discardMultiple', 1000],
			['reshuffleDeck', 1500],
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
			const card = DaleCard.of(notif.args.cards[i]!);
			// const newLocationArg = String(Stall.MAX_STACK_SIZE * notif.args.stack_index + index);
			// console.log(`Build stack: [${card.location}@${card.location_arg}] -> [<current_players_stall>@${newLocationArg}]`);
			// card.location_arg = newLocationArg;
			//stall.insertDbCard(card, 'myhand_item_' + card.id);
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
		}
		this.scoreCtrl[notif.args.player_id]?.toValue(notif.args.stack_index_plus_1);
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
		let daleCard = new DaleCard(notif.args.market_card_id);
		let slotId = this.market!.getSlotId(notif.args.pos);
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
	
	notif_obtainNewJunkInHand(notif: NotifAs<'obtainNewJunkInHand'>) {
		//other players are not interested in an animation for this
		if (notif.args.player_id == this.player_id) {
			for (let i in notif.args.cards) {
				let card = notif.args.cards[i]!;
				this.myHand.addDaleCardToStock(DaleCard.of(card), 'overall_player_board_'+notif.args.player_id);
			}
		}
	}

	notif_throwAway(notif: NotifAs<'throwAway'>) {
		this.anyHandToPile(notif.args.card, notif.args.player_id, this.marketDiscard);
	}

	notif_throwAwayMultiple(notif: NotifAs<'throwAwayMultiple'>) {
		let delay = 0;
		for (let id of notif.args.card_ids) {
			let card = notif.args.cards[id]!;
			this.anyHandToPile(card, notif.args.player_id, this.marketDiscard, delay);
			delay += 75; //delay indicates that ordering matters
		}
	}

	notif_discard(notif: NotifAs<'discard'>) {
		const discard_id = notif.args.discard_id ?? notif.args.player_id;
		const discardPile = this.playerDiscards[discard_id]!;
		this.anyHandToPile( notif.args.card, notif.args.player_id, discardPile);
	}

	notif_discardMultiple(notif: NotifAs<'discardMultiple'>) {
		const discard_id = notif.args.discard_id ?? notif.args.player_id;
		const discardPile = this.playerDiscards[discard_id]!;
		let delay = 0;
		for (let id of notif.args.card_ids) {
			let card = notif.args.cards[id]!;
			this.anyHandToPile(card, notif.args.player_id, discardPile, delay);
			delay += 75; //delay indicates that ordering matters
		}
	}
	
	notif_draw(notif: NotifAs<'draw'>) {
		console.log("notif_draw");
		if (notif.args._private) {
			//you drew the cards
			let card = notif.args._private.card
			this.myHand.addDaleCardToStock(DaleCard.of(card), this.myDeck.placeholderHTML);
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
		if (notif.args._private) {
			//you drew the cards
			for (let i in notif.args._private?.cards) {
				let card = notif.args._private.cards[i]!;
				this.myHand.addDaleCardToStock(DaleCard.of(card), this.myDeck.placeholderHTML);
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