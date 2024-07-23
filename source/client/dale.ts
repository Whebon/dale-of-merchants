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

import Gamegui = require('ebg/core/gamegui');
import "ebg/counter";
import "ebg/stock"; //needed for board game arena
import Stock = require('ebg/stock'); //needed for the IDE

import * as ImageConstants from './types/ImageConstants';

/** The root for all of your game code. */
class Dale extends Gamegui
{
	protected market: Stock = new ebg.stock(); 
	protected hand: Stock = new ebg.stock();

	/** @gameSpecific See {@link Gamegui} for more information. */
	constructor(){
		super();
		console.log('dale constructor');
	}

	/** @gameSpecific See {@link Gamegui.setup} for more information. */
	override setup(gamedatas: Gamedatas): void
	{
		console.log( "Starting game setup" );
		
		// Setting up player boards
		for( var player_id in gamedatas.players )
		{
			var player = gamedatas.players[player_id];
			// TODO: Setting up players boards if needed
		}

		// TODO: Set up your game interface here, according to "gamedatas"
		
		this.market.create( this, $('market'), ImageConstants.CARD_WIDTH, ImageConstants.CARD_HEIGHT);
		this.market.resizeItems(ImageConstants.CARD_WIDTH_S, ImageConstants.CARD_HEIGHT_S, ImageConstants.SHEET_WIDTH_S, ImageConstants.SHEET_HEIGHT_S);
		this.market.image_items_per_row = 6;
		this.market.item_margin = ImageConstants.MARKET_ITEM_MARGIN_S;
		console.log($('market'));
		$('market_background')?.setAttribute("style", `
			background-size: ${ImageConstants.MARKET_WIDTH_S}px ${ImageConstants.MARKET_HEIGHT_S}px;
			padding-top: ${ImageConstants.MARKET_PADDING_TOP_S}px;
			padding-left: ${ImageConstants.MARKET_PADDING_LEFT_S}px;
		`);

		this.hand.create( this, $('myhand'), ImageConstants.CARD_WIDTH, ImageConstants.CARD_HEIGHT);
		this.hand.resizeItems(ImageConstants.CARD_WIDTH_S, ImageConstants.CARD_HEIGHT_S, ImageConstants.SHEET_WIDTH_S, ImageConstants.SHEET_HEIGHT_S);
		this.hand.image_items_per_row = 6;

		// Create cards types
		for (var i = 0; i < 100; i++) {
			var card_type_id = i; //todo: add more card types, and make [card->number] and [number->card] functions
			this.market.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/cards_1.jpg', card_type_id);
			this.hand.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/cards_1.jpg', card_type_id);
		}

		// just to feel it: add 5 cards to market
		this.market.addToStockWithId(1, 1);
		this.market.addToStockWithId(2, 2);
		this.market.addToStockWithId(3, 3);
		this.market.addToStockWithId(4, 4);
		this.market.addToStockWithId(5, 5);

		// just to feel it: add 2 cards to hand
		this.hand.addToStockWithId(1, 6);
		this.hand.addToStockWithId(1, 7);


		// Todo: initial hand (from server)
		// for (var i in this.gamedatas.hand) {
		// 	var card = this.gamedatas.hand[i]!;
		// 	var color = card.type;
		// 	var value = card.type_arg;
		// 	this.playerHand.addToStockWithId(this.getCardUniqueType(color, value), card.id);
		// }

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
		
		switch( stateName )
		{
		case 'dummmy':
			break;
		}
	}

	/** @gameSpecific See {@link Gamegui.onLeavingState} for more information. */
	override onLeavingState(stateName: GameStateName): void
	{
		console.log( 'Leaving state: '+stateName );
		
		switch( stateName )
		{
		case 'dummmy':
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
		case 'dummmy':
			// Add buttons if needed
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
			['reshuffle', 1]
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
	
	notif_reshuffle(notif: NotifAs<'reshuffle'>) {
		console.log("notif_reshuffle")
	}
}


// The global 'bgagame.dale' class is instantiated when the page is loaded. The following code sets this variable to your game class.
dojo.setObject( "bgagame.dale", Dale );
// Same as: (window.bgagame ??= {}).dale = Dale;