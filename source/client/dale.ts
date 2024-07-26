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

/** The root for all of your game code. */
class Dale extends Gamegui
{
	/** Pile of hidden cards representing the market deck. */
	marketDeck: Pile = new Pile(this, 'market-deck', 'Market Deck');

	/** Ordered pile of known cards representing the market discard deck. */
	marketDiscard: Pile = new Pile(this, 'market-discard', 'Market Discard');

	/** Ordered pile of known cards representing the market discard deck. */
	market: MarketBoard | null = null;

	/** Cards in this client's player hand */
	hand: DaleStock = new DaleStock()

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

		// TODO: Setting up player boards
		for( var player_id in gamedatas.players )
			{
				var player = gamedatas.players[player_id];
				// TODO: Setting up players boards if needed
			}
		
		//initialize the card types
		DaleCard.init(gamedatas.cardTypes);
		for (let i in gamedatas.cardTypes) {
			let type_id = gamedatas.cardTypes[i]!.type_id;
			this.hand.addItemType(type_id, type_id, g_gamethemeurl + 'img/cards.jpg', type_id);
		}

		//initialize the market deck
		this.marketDeck.pushHiddenCards(gamedatas.marketDeckSize);

		//initialize the market discard pile
		for (let i in gamedatas.marketDiscard) {
			var card = gamedatas.marketDiscard[i]!;
			this.marketDiscard.push(DaleCard.of(card));
		}
		
		//initialize the market board
		this.market = new MarketBoard(this);
		for (let i in gamedatas.market) {
			let card = gamedatas.market[i]!;
			this.market.insertCard(DaleCard.of(card), +card.location_arg);
		}

		//initialize the hand
		this.hand.create( this, $('myhand'), Images.CARD_WIDTH, Images.CARD_HEIGHT);
		this.hand.resizeItems(Images.CARD_WIDTH_S, Images.CARD_HEIGHT_S, Images.SHEET_WIDTH_S, Images.SHEET_HEIGHT_S);
		this.hand.image_items_per_row = Images.IMAGES_PER_ROW;
		for (let i in gamedatas.hand) {
			let card = gamedatas.hand[i]!;
			this.hand.addDaleCardToStock(DaleCard.of(card));
		}
		dojo.connect( this.hand, 'onChangeSelection', this, 'onHandSelectionChanged' );

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

		//reset the selected cards array
		this.selectedCardIds = [];
		
		switch( stateName )
		{
			case 'inventory':
				this.hand.unselectAll();
				break;
		}
	}

	/** @gameSpecific See {@link Gamegui.onLeavingState} for more information. */
	override onLeavingState(stateName: GameStateName): void
	{
		console.log( 'Leaving state: '+stateName );
		
		// switch( stateName )
		// {
		// case 'dummmy':
		// 	break;
		// }
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
			case 'inventory':
				this.addActionButton("pass-button", _("Done"), "onInventoryAction");
				break;
		}
	}

	///////////////////////////////////////////////////
	//// Utility methods
	
	/*
		Here, you can defines some utility methods that you can use everywhere in your typescript
		script.
	*/


	///////////////////////////////////////////////////
	//// Player's action
	
	/*
		Here, you are defining methods to handle player's action (ex: results of mouse click on game objects).
		
		Most of the time, these methods:
		- check the action is possible at this game state.
		- make a call to the game server
	*/

	onHandSelectionChanged() {
		let items = this.hand.getSelectedItems();

		switch(this.gamedatas.gamestate.name) {
			case 'inventory':
				//move to the discard pile one at a time
				if (items.length > 1) {
					this.hand.unselectAll();
				}
				if (items.length == 1) {
					let card_id = items[0]!.id;

					//move the card from the hand to the discard pile
					if ($('myhand_item_' + card_id)) {
						this.marketDiscard.push(new DaleCard(card_id), 'myhand_item_' + card_id);
						this.hand.removeFromStockByIdNoAnimation(card_id);
					}
					else {
						throw new Error(`Card ${card_id} does not exist in hand`)
					}

					this.selectedCardIds.push(card_id);
					this.hand.unselectAll();
				}
				break;
			case null:
				throw new Error("gamestate.name is null")
		}
	}

	onRequestInventoryAction() {
		if( this.checkAction('actRequestInventoryAction') ) {
			this.bgaPerformAction('actRequestInventoryAction', {})
		}
	}

	onInventoryAction() {
		if( this.checkAction("actInventoryAction") ) {
			console.log(`Sending: actInventoryAction, with ids = ${this.selectedCardIds.join(";")}`)
			this.bgaPerformAction('actInventoryAction', {
				ids: String(this.selectedCardIds.join(";"))
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
		
		// TODO: here, associate your game notifications with local methods

		const notifs: [keyof NotifTypes, number][] = [
			['discardCards', 1],
			['reshuffleMarketDeck', 1],
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

	notif_discardCards(notif: NotifAs<'discardCards'>) {
		//TODO: discard cards if not done already
	}

	notif_reshuffleMarketDeck(notif: NotifAs<'reshuffleMarketDeck'>) {
		this.marketDiscard.shuffleToDrawPile(this.marketDeck!);
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
			this.hand.addDaleCardToStock(new DaleCard(0, 0));
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