/*
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * Dale implementation : © Bart Swinkels
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */

import { Animalfolk } from './components/types/Animalfolk';
import { CardType } from './components/types/CardType';
import { DbCard } from './components/types/DbCard';

// If you have any imports/exports in this file, 'declare global' is access/merge your game specific types with framework types. 'export {};' is used to avoid possible confusion with imports/exports.
declare global {

	/** @gameSpecific Add game specific notifications / arguments here. See {@link NotifTypes} for more information. */
	interface NotifTypes {
		// [name: string]: any; // Uncomment to remove type safety on notification names and arguments
		'scheduleTechnique': {
			player_id: number
			card: DbCard
		},
		'cancelTechnique': {
			player_id: number
			card: DbCard
		}
		'resolveTechnique': {
			player_id: number
			card: DbCard
		}
		'message': {
			//no args
		}
		'debugClient': {
			arg: string
			msg: string
		}
		'reshuffleDeck': { 
			player_id?: number
		}
		'marketSlideRight': {
			//no args
		}
		'fillEmptyMarketSlots': {
			positions: number[]
			cards: DbCard[] //actually an array, not an object
		}
		'marketToHand': {
			// i18n: any
			// player_name: string
			// card_name: string
			player_id: number
			market_card_id: number
			pos: number
		}
		'throwAway': {
			player_id: number 
			card: DbCard
			from_temporary?: boolean //by default, throw away from hand. if specified, throw away from temporary instead
		}
		'throwAwayMultiple': {
			player_id: number 
			cards: {[card_id: number]: DbCard}
			card_ids: number[] //because ordering matters
			from_temporary?: boolean
		}
		'discard': {
			player_id: number 
			card: DbCard
			discard_id?: number //by default, this is the same as player_id
			from_temporary?: boolean
		}
		'discardMultiple': {
			player_id: number 
			cards: {[card_id: number]: DbCard}
			card_ids: number[] //because ordering matters
			discard_id?: number //by default, this is the same as player_id
			from_temporary?: boolean
		}
		'placeOnDeckMultiple': {
			player_id: number
			_private?: {
				card_ids: number[] //because ordering matters
				cards: {[card_id: number]: DbCard}
			}
			deck_player_id: number
			nbr: number
			from_temporary?: boolean
		}
		'discardToHand': {
			player_id: number
			discard_id?: number
			card: DbCard
		}
		'draw': {
			player_id: number 
			_private?: {
				card: DbCard
			}
			to_temporary?: boolean
		}
		'drawMultiple': {
			player_id: number 
			nbr: number
			_private?: {
				cards: {[card_id: number]: DbCard}
			}
			to_temporary?: boolean
		}
		'temporaryToHand': {
			player_id: number 
			_private?: {
				card: DbCard
			}
		}
		'obtainNewJunkInHand': {
			player_id: number
			player_name: string
			cards: {[card_id: number]: DbCard}
			nbr: number
		}
		'buildStack': {
			player_id: number 
            player_name: string
			stack_index: number 
			stack_index_plus_1: number
            cards: {[card_id: number]: DbCard}
		}
	}

	/** @gameSpecific Add game specific gamedatas arguments here. See {@link Gamedatas} for more information. */
	interface Gamedatas {
		// [key: string | number]: Record<keyof any, any>; // Uncomment to remove type safety on game state arguments
		'cardTypes': {[type_id: number]: CardType}

		'discardPiles': {
			"market": {[card_id: number]: DbCard}
			[player_id: number]: {[card_id: number]: DbCard}
		}

		'deckSizes': {
			"market": number
			[player_id: number]: number
		}

		'schedules': {
			[player_id: number]: {[card_id: number]: DbCard}
		}

		'stalls': {
			[player_id: number]: {[card_id: number]: DbCard}
		}
		
		'hand': {[card_id: number]: DbCard}
		'temporary': {[card_id: number]: DbCard}
		'market': {[card_id: number]: DbCard}
	}

	//
	// When gamestates.jsonc is enabled in the config, the following types are automatically generated. And you should not add to anything to 'GameStates' or 'PlayerActions'. If gamestates.jsonc is enabled, 'GameStates' and 'PlayerActions' can be removed from this file.
	//

	interface GameStates {
		// [id: number]: string | { name: string, argsType: object} | any; // Uncomment to remove type safety with ids, names, and arguments for game states
	}

	/** @gameSpecific Add game specific player actions / arguments here. See {@link PlayerActions} for more information. */
	interface PlayerActions {
		// [action: string]: Record<keyof any, any>; // Uncomment to remove type safety on player action names and arguments
	}
}

export {}; // Force this file to be a module.