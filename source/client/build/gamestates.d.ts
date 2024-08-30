/*
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. ANY CHANGES MADE DIRECTLY MAY BE OVERWRITTEN.
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * Dale implementation : © Bart Swinkels
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */

interface GameStates {
	1: {
		'name': 'gameSetup',
		'description': '',
		'type': 'manager',
		'action': 'stGameSetup',
		'transitions': {
			'': 30,
		},
	},
	30: {
		'name': 'playerTurn',
		'description': '${actplayer} must take an action',
		'descriptionmyturn': '${you} must take an action',
		'type': 'activeplayer',
		'possibleactions': {
			'actPurchase': [{
				'name': 'chameleons_json',
				'type': 'AT_json',
				'typescriptType': string,
			}, {
				'name': 'funds_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'market_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'essential_purchase_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
			'actPlayTechniqueCard': [{
				'name': 'chameleons_json',
				'type': 'AT_json',
				'typescriptType': string,
			}, {
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'args',
				'type': 'AT_json',
				'typescriptType': string,
			}],
			'actUsePassiveAbility': [{
				'name': 'chameleons_json',
				'type': 'AT_json',
				'typescriptType': string,
			}, {
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'args',
				'type': 'AT_json',
				'typescriptType': string,
			}],
			'actWinterIsComingSkip': [],
			'actBuild': [{
				'name': 'chameleons_json',
				'type': 'AT_json',
				'typescriptType': string,
			}, {
				'name': 'stack_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'stack_card_ids_from_discard',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
			'actInventoryAction': [{
				'name': 'ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trPassiveAbility': 30,
			'trWinterIsComing': 36,
			'trSamePlayer': 30,
			'trNextPlayer': 41,
			'trGameEnd': 99,
			'trSpyglass': 52,
			'trSpecialOffer': 53,
		},
	},
	36: {
		'name': 'winterIsComing',
		'description': 'Winter is Coming: ${actplayer} may select cards to build in stack ${stack_index_plus_1}',
		'descriptionmyturn': 'Winter is Coming: ${you} may select cards to build in stack ${stack_index_plus_1}',
		'type': 'activeplayer',
		'args': 'argStackIndex',
		'possibleactions': {
			'actBuild': [{
				'name': 'chameleons_json',
				'type': 'AT_json',
				'typescriptType': string,
			}, {
				'name': 'stack_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'stack_card_ids_from_discard',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
			'actUsePassiveAbility': [{
				'name': 'chameleons_json',
				'type': 'AT_json',
				'typescriptType': string,
			}, {
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'args',
				'type': 'AT_json',
				'typescriptType': string,
			}],
			'actWinterIsComingSkip': [],
		},
		'transitions': {
			'trPassiveAbility': 36,
			'trWinterIsComing': 36,
			'trNextPlayer': 41,
			'trGameEnd': 99,
		},
	},
	41: {
		'name': 'nextPlayer',
		'description': '',
		'type': 'game',
		'action': 'stNextPlayer',
		'updateGameProgression': true,
		'transitions': {
			'trNextPlayer': 30,
		},
	},
	52: {
		'name': 'spyglass',
		'description': 'Spyglass: ${actplayer} must choose a card to place into their hand',
		'descriptionmyturn': 'Spyglass: ${you} must choose a card to place into your hand',
		'type': 'activeplayer',
		'action': 'stSpyglass',
		'possibleactions': {
			'actSpyglass': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	53: {
		'name': 'specialOffer',
		'description': 'Special Offer: ${actplayer} must choose a card to take',
		'descriptionmyturn': 'Special Offer: ${you} must choose a card to take',
		'type': 'activeplayer',
		'action': 'stSpecialOffer',
		'possibleactions': {
			'actSpecialOffer': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trNextPlayer': 41,
		},
	},
	99: {
		'name': 'gameEnd',
		'description': 'End of game',
		'type': 'manager',
		'action': 'stGameEnd',
		'args': 'argGameEnd',
		'updateGameProgression': true,
		'argsType': object,
	},
}

type PullActionArgs<T extends readonly any[]> = T extends [] ? {} : AnyOf<{
	[arg in TupleIndices<T>]: {
		[argName in T[arg]['name']]: T[arg]['typescriptType']
	}
}[TupleIndices<T>]>;

interface PlayerActions extends AnyOf<{
	[K in keyof GameStates]:
		GameStates[K] extends { possibleactions: { [key: string]: any[] } } ?
		{
			[action in keyof GameStates[K]['possibleactions']]:
				PullActionArgs<GameStates[K]['possibleactions'][action]>
		} : {}
}[keyof GameStates]> {}