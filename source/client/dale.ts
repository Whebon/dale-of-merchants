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

	/** Current player's draw pile (this client's draw pil) */
	get myDeck(): Pile {
		return this.playerDecks[this.player_id]!;
	}

	/** Current player's discard pile (this client's discard pile) */
	get myDiscard(): Pile {
		return this.playerDiscards[this.player_id]!;
	}

	/** Ordered pile of known cards representing the market discard deck. */
	market: MarketBoard | null = null;

	/** Cards in this client's player hand */
	myHand: DaleStock = new DaleStock()

	/** State-specific utility array for states that have something to do with sending card ids. WARNING: resets on entering a new state.*/
	selectedCardIds: number[] = [];

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
		}
		
		//initialize the card types
		DaleCard.init(gamedatas.cardTypes);
		for (let i in gamedatas.cardTypes) {
			let type_id = gamedatas.cardTypes[i]!.type_id;
			this.myHand.addItemType(type_id, type_id, g_gamethemeurl + 'img/cards.jpg', type_id);
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
		this.myHand.create( this, $('myhand'), Images.CARD_WIDTH, Images.CARD_HEIGHT);
		this.myHand.resizeItems(Images.CARD_WIDTH_S, Images.CARD_HEIGHT_S, Images.SHEET_WIDTH_S, Images.SHEET_HEIGHT_S);
		this.myHand.image_items_per_row = Images.IMAGES_PER_ROW;
		for (let i in gamedatas.hand) {
			let card = gamedatas.hand[i]!;
			this.myHand.addDaleCardToStock(DaleCard.of(card));
		}
		dojo.connect( this.myHand, 'onChangeSelection', this, 'onHandSelectionChanged' );

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
		this.selectedCardIds = [];
		switch( stateName ){
			case 'playerTurn':
				this.market!.setSelectionMode(1);
				this.myHand.setSelectionMode(1);
				break;
			case 'purchase':
				const purchaseArgs = args.args as GameStateArgs<'purchase'>;
				console.log(purchaseArgs);
				this.myHand.setSelectionMode(2);
				this.market!.setSelected(purchaseArgs.pos, true);
				break;
			case 'nextPlayer':
				break;
			case 'inventory':
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
				this.addActionButton("pass-button", _("Pass (inventory action)"), "onRequestInventoryAction");
				break;
			case 'purchase':
				this.addActionButton("confirm-button", _("Confirm Funds"), "onPurchase");
				this.addActionButtonCancel();
				break;
			case 'inventory':
				this.addActionButton("pass-button", _("Done"), "onInventoryAction");
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
	 * Move a card from the hand to the specified pile
	 * @param card_id card id to move
	 * @param assert_existence (optional) default true. throw an exception if the specified card does not exist in the players' hand.
	*/
	handToPile(card_id: number, pile: Pile, assert_existence = true) {
		if ($('myhand_item_' + card_id)) {
			pile.push(new DaleCard(card_id), 'myhand_item_' + card_id);
			this.myHand.removeFromStockByIdNoAnimation(card_id);
		}
		else if(assert_existence) {
			throw new Error(`Card ${card_id} does not exist in hand`);
		}
	}

	/**
	 * Move a card from the top of the specified pile to the hand
	 * @param card_id card id to move
	 * @param assert_existence (optional) default true. throw an exception if the specified card does not exist on top of the pile
	*/
	pileToHand(card_id: number | DbCard, pile: Pile, assert_existence = true) {
		if (!(typeof card_id === 'number')) {
			card_id = card_id.id;
		}
		this.myHand.addDaleCardToStock(new DaleCard(card_id), pile.placeholderHTML);
		if(assert_existence && pile.pop().id != card_id) {
			throw new Error(`Card ${card_id} was not found on top of the pile`);
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
	 * Add an undo button that returns the selectedCardIds to the draw pile
	*/
	addUndoButton() {
		let buttonId = "undo-selectedCardIds-button";
		if (!$(buttonId)) {
			let thiz = this;
			let returnSelectedCardIdsToHand  = function() {
				for (let i = thiz.selectedCardIds.length - 1; i >= 0; i--) {
					const card_id = thiz.selectedCardIds[i]!;
					thiz.pileToHand(card_id, thiz.myDiscard);
				}
				thiz.selectedCardIds = []
				$(buttonId)?.remove();
			}
			this.addActionButton(buttonId, _("Undo"), returnSelectedCardIdsToHand, undefined, false, 'gray');
		}
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

	onMarketCardClick(card: DaleCard, pos: number) {
		if (pos < 0 || pos >= 5 ){
			console.error(`Market position ${pos} does not exist, using position 0 instead`)
			pos = 0;
		}

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

	onHandSelectionChanged() {
		//if (!this.isCurrentPlayerActive()) return;
		let items = this.myHand.getSelectedItems();

		switch(this.gamedatas.gamestate.name) {
			case 'playerTurn':
				//play cards
				if (items.length == 1) {
					let card_id = items[0]!.id;
					this.showMessage( _("actPlayCard: NOT IMPLEMENTED EXCEPTION"), 'error');
					// if(this.checkAction('actPlayCard')) {
					// 	this.bgaPerformAction('actPlayCard', {})
					// }
				}
				this.myHand.unselectAll();
				break;
			case 'inventory':
				//move to the discard pile one at a time
				if (items.length == 1) {
					let card_id = items[0]!.id;
					this.handToPile(card_id, this.myDiscard);
					this.selectedCardIds.push(card_id);
					this.addUndoButton();
				}
				this.myHand.unselectAll();
				break;
			case null:
				throw new Error("gamestate.name is null")
		}
	}

	onPurchase() {
		let items = this.myHand.getSelectedItems();
		if(this.checkAction('actPurchase')) {
			this.bgaPerformAction('actPurchase', {
				funds_card_ids: this.arrayToNumberList(items)
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
			console.log(`Sending: actInventoryAction, with ids = ${this.selectedCardIds.join(";")}`)
			this.bgaPerformAction('actInventoryAction', {
				ids: this.arrayToNumberList(this.selectedCardIds)
			})
		}
	}
	
	/*
	Example:
	onMyMethodToCall1( evt: Event )
	{
		console.log( 'onMyMethodToCall1' );

		// Preventing default browser reaction
		evt.preventDefault();

		//	With base Gamegui class...

		// Check that this action is possible (see "possibleactions" in states.inc.php)
		if(!this.checkAction( 'myAction' ))
			return;

		this.ajaxcall( "/yourgamename/yourgamename/myAction.html", { 
			lock: true, 
			myArgument1: arg1,
			myArgument2: arg2,
		}, this, function( result ) {
			// What to do after the server call if it succeeded
			// (most of the time: nothing)
		}, function( is_error) {

			// What to do after the server call in anyway (success or failure)
			// (most of the time: nothing)
		} );


		//	With GameguiCookbook::Common...
		this.ajaxAction( 'myAction', { myArgument1: arg1, myArgument2: arg2 }, (is_error) => {} );
	}
	*/

	///////////////////////////////////////////////////
	//// Reaction to cometD notifications

	/** @gameSpecific See {@link Gamegui.setupNotifications} for more information. */
	override setupNotifications()
	{
		console.log( 'notifications subscriptions setup2' );
		
		const notifs: [keyof NotifTypes, number][] = [
			['draw', 100],
			['obtainNewJunkInHand', 1],
			['discard', 100],
			['reshuffleDeck', 1500],
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

	notif_draw(notif: NotifAs<'draw'>) {
		if (notif.args._private) {
			//you drew the cards
			for (let i in notif.args._private?.cards) {
				let card = notif.args._private.cards[i]!;
				this.myHand.addDaleCardToStock(DaleCard.of(card), this.myDeck.placeholderHTML);
				this.myDeck.pop();
			}
		}
		else {
			//another player drew cards
			for (let i = 0; i < notif.args.nbr; i++) {
				this.playerDecks[notif.args.player_id]!.pop();
			}
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

	notif_discard(notif: NotifAs<'discard'>) {
		if (notif.args.player_id == this.player_id) {
			//discard cards from hand if not done already
			for (let id of notif.args.card_ids) {
				let card = notif.args.cards[id]!;
				this.handToPile(card.id, this.myDiscard, false);
			}
		}
		else {
			//animate from overall player board
			let otherDiscard = this.playerDiscards[notif.args.player_id];
			let delay = 0;
			for (let id of notif.args.card_ids) {
				let card = notif.args.cards[id]!;
				otherDiscard?.push(DaleCard.of(card), 'overall_player_board_'+notif.args.player_id, undefined, undefined, delay);
				delay += 250;
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