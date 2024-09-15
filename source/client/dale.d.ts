/*
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * Dale implementation : © Bart Swinkels
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */

import { DaleCard } from './components/DaleCard';
import { CardType } from './components/types/CardType';
import { DbCard } from './components/types/DbCard';
import { DbEffect, RawDbEffect } from './components/types/DbEffect';
import { DbLocationPrefix } from './components/types/DbLocationPrefix';
import { Pile } from './components/Pile';
import { DaleStock } from './components/DaleStock';
import { MarketBoard } from './components/MarketBoard';
import { Stall } from './components/Stall';

// If you have any imports/exports in this file, 'declare global' is access/merge your game specific types with framework types. 'export {};' is used to avoid possible confusion with imports/exports.
declare global {

	/** @gameSpecific Add game specific notifications / arguments here. See {@link NotifTypes} for more information. */
	interface NotifTypes {
		'delay': {}
		'deckSelectionResult': {
			animalfolk_id: number
		},
		'startGame': {},
		'scheduleTechnique': {
			player_id: number
			card: DbCard
		},
		'scheduleTechniqueDelay': {
			player_id: number
			_private: true | undefined
		},
		'cancelTechnique': {
			player_id: number
			card: DbCard
		}
		'resolveTechnique': {
			player_id: number
			card: DbCard
			to_prefix: DbLocationPrefix
			to_suffix: number | 'mark'
		}
		'addEffect': {
			effect: RawDbEffect;
		}
		'expireEffects': {
			effects: RawDbEffect[];
		}
		'message': {
			//no args
		}
		'debugClient': {
			arg: string
			msg: string
			nbr: number
			player_id: number
			card_id: number
		}
		'reshuffleDeck': { 
			market: boolean
			player_id: number
		}
		'wilyFellow': {
			player_id: number 
			cards: {[card_id: number]: DbCard}
			card_ids: number[] //because ordering matters
		}
		'whirligigShuffle': {
			player_id: number,
			player_nbr: number,
			opponent_id: number,
			opponent_nbr: number
		}
		'whirligigTakeBack': {
			player_id: number,
			nbr: number,
			_private: {
				cards: {[card_id: number]: DbCard}
			}
		}
		'cunningNeighbourWatch': {
			player_id: number,
			opponent_id: number,
			_private: {
				cards: {[card_id: number]: DbCard}
			}
		}
		'cunningNeighbourReturn': {
			player_id: number,
			opponent_id: number,
			_private: {
				cards: {[card_id: number]: DbCard}
			}
		}
		'ditchFromDiscard': {
			player_id: number
			card: DbCard
		}
		'ditchFromDeck': {
			player_id: number
			card: DbCard
		}
		'ditchFromMarketDeck': {
			card: DbCard
		}
		'ditchFromMarketBoard': {
			cards: {[card_id: number]: DbCard}
			card_ids: number[] //because ordering matters
		}
		'instant_discardToDeck': {}
		'discardToDeck': {
			card: DbCard
			player_id: number,
			opponent_id?: number, //by default the same as the player_id
		}
		'deckToDiscard': {
			card: DbCard
			player_id: number,
			opponent_id?: number, //by default the same as the player_id
		}
		'rollDie': {
			player_id: number,
			animalfolk_id: number,
			card: DbCard,
			die_value: number,
			die_label: string,
			d6: 0|1|2|3|4|5
		}
		'selectBlindfold': {
			player_id: number,
			_private: {
				card_id: number
			}
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
		'swapHandStall': {
			player_id: number
			card: DbCard
			stall_player_id: number
			stall_card_id: number
		}
		'swapHandMarket': {
			player_id: number
			card: DbCard
			market_card_id: number
		}
		'ditch': {
			player_id: number 
			card: DbCard
			from_limbo?: boolean //by default, ditch from hand. if specified, ditch from limbo instead
		}
		'ditchMultiple': {
			player_id: number 
			cards: {[card_id: number]: DbCard}
			card_ids: number[] //because ordering matters
			from_limbo?: boolean
		}
		'discard': {
			player_id: number 
			card: DbCard
			discard_id?: number //by default, this is the same as player_id
			from_limbo?: boolean
		}
		'discardMultiple': {
			player_id: number 
			cards: {[card_id: number]: DbCard}
			card_ids: number[] //because ordering matters
			nbr: number,
			discard_id?: number //by default, this is the same as player_id
			from_limbo?: boolean
		}
		'placeOnDeckMultiple': {
			player_id: number
			_private?: {
				card_ids: number[] //because ordering matters
				cards: {[card_id: number]: DbCard}
			}
			deck_player_id: number | 'mark'
			nbr: number
			from_limbo?: boolean
		}
		'marketDiscardToHand': {
			player_id: number
			card: DbCard
			to_limbo?: boolean
		}
		'discardToHand': {
			player_id: number
			discard_id?: number
			card: DbCard
			to_limbo?: boolean
		}
		'discardToHandMultiple': {
			player_id: number
			discard_id?: number
			cards: {[card_id: number]: DbCard} //location_arg matters!
			nbr: number
			to_limbo?: boolean
		}
		'draw': {
			player_id: number 
			_private?: {
				card: DbCard
			}
			deck_player_id?: number | 'mark'
			to_limbo?: boolean
		}
		'drawMultiple': {
			player_id: number 
			nbr: number
			_private?: {
				cards: {[card_id: number]: DbCard}
			}
			deck_player_id?: number | 'mark'
			to_limbo?: boolean
		}
		'handToLimbo': {
			player_id: number 
			_private?: {
				card: DbCard
			}
		}
		'limboToHand': {
			player_id: number 
			_private?: {
				card: DbCard
			}
		}
		'instant_playerHandToOpponentHand': {}
		'playerHandToOpponentHand': {
			opponent_id: number 
			player_id: number
			from_limbo?: boolean
			to_limbo?: boolean
			_private?: {
				card: DbCard
			}
		}
		'instant_opponentHandToPlayerHand': {}
		'opponentHandToPlayerHand': {
			opponent_id: number 
			player_id: number
			from_limbo?: boolean
			to_limbo?: boolean
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
			from: DbLocationPrefix
		}
		'rearrangeMarket': {
			card_ids: number[]
		}
	}

	/** @gameSpecific Add game specific gamedatas arguments here. See {@link Gamedatas} for more information. */
	interface Gamedatas {
		// [key: string | number]: Record<keyof any, any>; // Uncomment to remove type safety on game state arguments
		'cardTypes': {[type_id: number]: CardType}

		'handSizes': {
			[player_id: number]: number
		}

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
		'limbo': {[card_id: number]: DbCard}
		'market': {[card_id: number]: DbCard}
		'effects': {[_index: number]: RawDbEffect}

		'inDeckSelection': boolean
	}

	type ClientChoiceSubsetValidation<T extends Record<keyof T, unknown>, U extends Record<string, unknown>> = {
		[K in keyof T]: K extends keyof U ? T[K] : never;
	};

	interface ClientTriggerTechniqueChoice {
		'client_triggerFizzle': { fizzle: boolean }
		'client_choicelessTriggerTechniqueCard': { choiceless: true }
		'client_shoppingJourney': { card_id: number }
		'client_houseCleaningDitch': { card_id?: number }
		'client_siesta': { card_id?: number }
	}
	
	/** @gameSpecific Add the choices to send to the server to resolve the technique */
	interface ClientTechniqueChoice {
		'client_fizzle': { fizzle: boolean }
		'client_choicelessTechniqueCard': { choiceless: true }
		'client_selectOpponentTechnique': { opponent_id: number }
		'client_swiftBroker': { card_ids: number[] }
		'client_shatteredRelic': { card_id?: number }
		'client_acorn': { stall_player_id: number, stall_card_id: number }
		'client_giftVoucher': { market_card_id: number }
		'client_loyalPartner': { card_ids: number[] }
		'client_prepaidGood': { card_id: number }
		'client_nuisance': { opponent_ids: number[] }
		'client_rottenFood': { card_id: number, opponent_id: number }
		'client_dirtyExchange': { opponent_id: number }
		'client_treasureHunter': { card_id: number }
		'client_newSeason': { card_id: number }
		'client_whirligig': { card_ids: number[], opponent_id: number }
		'client_gamble': { opponent_id: number }
		'client_blindfold': { card_id: number, opponent_id: number }
		'client_safetyPrecaution': { card_id: number }
		'client_houseCleaning': {card_ids: number[] }
		'client_ruthlessCompetition': { opponent_id: number }
		'client_raffle': { reverse_direction: boolean },
		'client_tasters': { reverse_direction: boolean }
		'client_rareArtefact': { card_id: number }
		'client_swank': { card_id: number }
		'client_riskyBusiness': { value: number }
		'client_historyLesson': { card_ids: number[] }
	}

	interface ClientPassiveChoice {
		'client_choicelessPassiveCard': {},
		'client_marketDiscovery': {},
		'client_calculations': {} //choice sent as purchase args
		'client_refreshingDrink': { card_id: number }
	}

	//add all client states with a ClientTechniqueChoice or ClientAbilityChoice
	type TriggerTechniqueClientStates = { [K in keyof ClientTriggerTechniqueChoice]: { technique_card_id: number } }
	type TechniqueClientStates = { [K in keyof ClientTechniqueChoice]: { technique_card_id: number } }
	type PassiveClientStates = { [K in keyof ClientPassiveChoice]: { passive_card_id: number } }

	/** @gameSpecific Add game specific client game states */
	interface ClientGameStates extends TriggerTechniqueClientStates, TechniqueClientStates, PassiveClientStates {
		'chameleon_autobind': {}
		'chameleon_flexibleShopkeeper': {}
		'chameleon_reflection': {}
		'chameleon_goodoldtimes': { mode: 'copy' | 'ditchOrCopy' | 'ditchOptional' | 'ditchMandatory' | undefined }
		'chameleon_trendsetting': {}
		'chameleon_seeingdoubles': {}
		'client_purchase' : { 
			pos: number, 
			market_discovery_card_id: number | undefined, 
			calculations_card_id: number | undefined, 
			cost: number, 
			card_name: string,
			funds_card_ids?: number[],
			optionalArgs: {
				essential_purchase_ids?: number[]
				calculations_card_ids?: number[]
				glue_card_ids?: number[]
			}
		}
		'client_technique': {}
		'client_build': { stack_index_plus_1: number }
		'client_inventory': {}
		'client_essentialPurchase': ClientGameStates['client_purchase']
		'client_calculations': { passive_card_id: number, card_ids: number[], card_id_last: number }
		'client_glue': ClientGameStates['client_purchase']
		'client_houseCleaning': { technique_card_id: number, nbr_junk: number }
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