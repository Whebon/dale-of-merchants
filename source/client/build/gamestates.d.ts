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
		'descriptionmyturn': '${you} must (a) purchase a card, (b) play a technique, (c) build a stack, or (d) pass',
		'type': 'activeplayer',
		'possibleactions': {
			'actRequestMarketAction': [{
				'name': 'market_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
			'actPlayCard': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
			'actRequestStallAction': [],
			'actRequestInventoryAction': [],
		},
		'transitions': {
			'trPurchase': 31,
			'trBuild': 35,
			'trInventory': 40,
			'trNextPlayer': 41,
			'trSwiftBroker': 50,
			'trShatteredRelic': 51,
		},
	},
	31: {
		'name': 'purchase',
		'description': '${actplayer} must pay ${cost} for ${card_name}',
		'descriptionmyturn': '${you} must pay ${cost} for ${card_name}',
		'type': 'activeplayer',
		'args': 'argSelectedCardInMarket',
		'argsType': {
			'card_name': string,
			'card_id': number,
			'cost': number,
			'pos': number,
		},
		'possibleactions': {
			'actPurchase': [{
				'name': 'funds_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
			'actCancel': [],
		},
		'transitions': {
			'trCancel': 30,
			'trNextPlayer': 41,
		},
	},
	35: {
		'name': 'build',
		'description': '${actplayer} must select cards to build in stack ${stack_index_plus_1}',
		'descriptionmyturn': '${you} must select cards to build in stack ${stack_index_plus_1}',
		'type': 'activeplayer',
		'args': 'argStackIndex',
		'possibleactions': {
			'actBuild': [{
				'name': 'stack_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
			'actCancel': [],
		},
		'transitions': {
			'trCancel': 30,
			'trNextPlayer': 41,
			'trGameEnd': 99,
		},
	},
	40: {
		'name': 'inventory',
		'description': '${actplayer} may discard any number of cards',
		'descriptionmyturn': '${you} may discard any number of cards',
		'type': 'activeplayer',
		'possibleactions': {
			'actInventoryAction': [{
				'name': 'ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
			'actCancel': [],
		},
		'transitions': {
			'trCancel': 30,
			'trNextPlayer': 41,
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
	50: {
		'name': 'swiftBroker',
		'description': 'Swift Broker: ${actplayer} must discard their hand',
		'descriptionmyturn': 'Swift Broker: ${you} must discard your hand. You may select which card(s) to put on top of your discard pile.',
		'type': 'activeplayer',
		'possibleactions': {
			'actSwiftBroker': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
			'actCancel': [],
		},
		'transitions': {
			'trCancel': 30,
			'trSamePlayer': 30,
		},
	},
	51: {
		'name': 'shatteredRelic',
		'description': 'Shattered Relic: ${actplayer} must throw away a card',
		'descriptionmyturn': 'Shattered Relic: ${you} must throw away a card',
		'type': 'activeplayer',
		'possibleactions': {
			'actShatteredRelic': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
			'actCancel': [],
		},
		'transitions': {
			'trCancel': 30,
			'trSamePlayer': 30,
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