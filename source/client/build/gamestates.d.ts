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
		'descriptionmyturn': '${you} must (a) purchase a card, (b) play a technique, (c) build a stack, or (d) take an inventory action',
		'type': 'activeplayer',
		'possibleactions': {
			'actPurchase': [{
				'name': 'chameleon_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'chameleon_type_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'funds_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'market_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
			'actPlayTechniqueCard': [{
				'name': 'chameleon_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'chameleon_type_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
			'actUseActiveAbility': [{
				'name': 'chameleon_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'chameleon_type_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
			'actWinterIsComingSkip': [],
			'actBuild': [{
				'name': 'chameleon_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'chameleon_type_ids',
				'type': 'AT_numberlist',
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
			'trCancel': 30,
			'trActiveAbility': 30,
			'trFullyResolveTechnique': 33,
			'trWinterIsComing': 36,
			'trNextPlayer': 41,
			'trGameEnd': 99,
			'trSwiftBroker': 50,
			'trShatteredRelic': 51,
			'trSpyglass': 52,
			'trAcorn': 53,
			'trGiftVoucher': 54,
			'trLoyalPartner': 55,
			'trPrepaidGood': 56,
		},
	},
	33: {
		'name': 'fullyResolveTechnique',
		'description': '',
		'type': 'game',
		'action': 'stFullyResolveTechnique',
		'transitions': {
			'trSamePlayer': 30,
			'trNextPlayer': 41,
		},
	},
	34: {
		'name': 'fullyResolveTechniqueNoDiscard',
		'description': '',
		'type': 'game',
		'action': 'stFullyResolveTechniqueNoDiscard',
		'transitions': {
			'trSamePlayer': 30,
			'trNextPlayer': 41,
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
				'name': 'chameleon_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'chameleon_type_ids',
				'type': 'AT_numberlist',
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
			'actUseActiveAbility': [{
				'name': 'chameleon_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'chameleon_type_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
			'actWinterIsComingSkip': [],
		},
		'transitions': {
			'trActiveAbility': 36,
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
	50: {
		'name': 'swiftBroker',
		'description': 'Swift Broker: ${actplayer} must discard their hand',
		'descriptionmyturn': 'Swift Broker: ${you} must discard your hand',
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
			'trFullyResolveTechnique': 33,
		},
	},
	51: {
		'name': 'shatteredRelic',
		'description': 'Shattered Relic: ${actplayer} must <stronger>ditch</stronger> a card from their hand',
		'descriptionmyturn': 'Shattered Relic: ${you} must <stronger>ditch</stronger> a card from your hand',
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
			'trFullyResolveTechnique': 33,
		},
	},
	52: {
		'name': 'spyglass',
		'description': 'Spyglass: ${actplayer} must choose a card to place into their hand',
		'descriptionmyturn': 'Spyglass: ${you} must choose a card to place into your hand',
		'type': 'activeplayer',
		'possibleactions': {
			'actSpyglass': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trFullyResolveTechnique': 33,
		},
	},
	53: {
		'name': 'acorn',
		'description': 'Acorn: ${actplayer} must select a card from an opponent\\\'s stall to swap with',
		'descriptionmyturn': 'Acorn: ${you} must select a card from an opponent\\\'s stall to swap with',
		'type': 'activeplayer',
		'possibleactions': {
			'actAcorn': [{
				'name': 'stall_player_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'stall_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
			'actCancel': [],
		},
		'transitions': {
			'trCancel': 30,
			'trFullyResolveTechniqueNoDiscard': 34,
		},
	},
	54: {
		'name': 'giftVoucher',
		'description': 'Gift Voucher: ${actplayer} must select a card in the market to swap with',
		'descriptionmyturn': 'Gift Voucher: ${you} must select a card in the market to swap with',
		'type': 'activeplayer',
		'possibleactions': {
			'actGiftVoucher': [{
				'name': 'market_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
			'actCancel': [],
		},
		'transitions': {
			'trCancel': 30,
			'trFullyResolveTechniqueNoDiscard': 34,
		},
	},
	55: {
		'name': 'loyalPartner',
		'description': 'Loyal Partner: ${actplayer} must <stronger>ditch</stronger> all cards from the market',
		'descriptionmyturn': 'Loyal Partner: ${you} must <stronger>ditch</stronger> all cards from the market. Click on any cards to determine the order on the market discard pile',
		'type': 'activeplayer',
		'possibleactions': {
			'actLoyalPartner': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
			'actCancel': [],
		},
		'transitions': {
			'trCancel': 30,
			'trFullyResolveTechnique': 33,
		},
	},
	56: {
		'name': 'prepaidGood',
		'description': 'Prepaid Good: ${actplayer} must choose a card from the market',
		'descriptionmyturn': 'Prepaid Good: ${you} must choose a card from the market',
		'type': 'activeplayer',
		'possibleactions': {
			'actPrepaidGood': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
			'actCancel': [],
		},
		'transitions': {
			'trCancel': 30,
			'trFullyResolveTechnique': 33,
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