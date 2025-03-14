/*
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. ANY CHANGES MADE DIRECTLY MAY BE OVERWRITTEN.
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * DaleOfMerchants implementation : © Bart Swinkels
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
			'': 2,
		},
	},
	2: {
		'name': 'deckSelection',
		'description': 'Other players may vote for up to ${n_plus_1} animalfolk sets to play with',
		'descriptionmyturn': '${you} may vote for up to ${n_plus_1} animalfolk sets to play with',
		'args': 'argNumberOfPlayers',
		'type': 'multipleactiveplayer',
		'action': 'stDeckSelection',
		'possibleactions': {
			'actSubmitPreference': [{
				'name': 'animalfolk_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
			'actEnableDebugMode': [],
		},
		'transitions': {
			'trStartGame': 3,
		},
	},
	3: {
		'name': 'startGame',
		'description': '',
		'type': 'game',
		'action': 'stStartGame',
		'transitions': {
			'trStartGame': 31,
		},
	},
	29: {
		'name': 'changeActivePlayer',
		'description': '',
		'type': 'game',
		'action': 'stChangeActivePlayer',
		'transitions': {
			'trSamePlayer': 30,
			'trBlindfold': 56,
			'trBlindfoldIncorrectGuess': 57,
			'trFullyResolve': 33,
			'trTasters': 65,
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
				'name': 'args',
				'type': 'AT_json',
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
			'actFullyResolveTechniqueCard': [{
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
			'actSpawn': [{
				'name': 'card_name',
				'type': 'AT_json',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trChangeActivePlayer': 29,
			'trPassiveAbility': 30,
			'trWinterIsComing': 36,
			'trRoyalPrivilege': 37,
			'trSamePlayer': 30,
			'trNextPlayer': 41,
			'trGameEnd': 98,
			'trSpyglass': 52,
			'trSpecialOffer': 53,
			'trDirtyExchange': 54,
			'trSabotage': 55,
			'trMagnet': 58,
			'trDangerousTest': 59,
			'trNightShift': 60,
			'trRuthlessCompetition': 61,
			'trCunningNeighbour': 62,
			'trCheer': 63,
			'trCharity': 64,
			'trTasters': 65,
			'trDaringAdventurer': 66,
			'trNaturalSurvivor': 67,
			'trDuplicateEntry': 68,
			'trCulturalPreservation': 69,
			'trSliceOfLife': 70,
			'trDelightfulSurprise': 71,
			'trReplacement': 72,
			'trFashionHint': 73,
			'trWhirligig': 74,
			'trPompousProfessional': 75,
			'trDelicacy': 76,
			'trUmbrella': 77,
		},
	},
	31: {
		'name': 'turnStart',
		'description': '${actplayer} must take an action',
		'descriptionmyturn': '${you} must resolve scheduled techniques',
		'type': 'activeplayer',
		'action': 'stTurnStart',
		'possibleactions': {
			'actFullyResolveTechniqueCard': [{
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
		},
		'transitions': {
			'trSamePlayer': 31,
			'trSkipTurnStart': 30,
		},
	},
	33: {
		'name': 'fullyResolve',
		'description': '',
		'type': 'game',
		'action': 'stFullyResolve',
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
			'trSamePlayer': 30,
			'trGameEnd': 98,
		},
	},
	37: {
		'name': 'royalPrivilege',
		'description': 'Royal Privilege: ${actplayer} may ditch an animalfolk card to purchase an additional card for free',
		'descriptionmyturn': 'Royal Privilege: ${you} may ditch an animalfolk card to purchase an additional card for free',
		'type': 'activeplayer',
		'possibleactions': {
			'actRoyalPrivilege': [{
				'name': 'ditch_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'market_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trNextPlayer': 41,
		},
	},
	41: {
		'name': 'cleanUpPhase',
		'description': '',
		'type': 'game',
		'action': 'stCleanUpPhase',
		'updateGameProgression': true,
		'transitions': {
			'trNextPlayer': 31,
			'trPostCleanUpPhase': 42,
		},
	},
	42: {
		'name': 'postCleanUpPhase',
		'description': '${actplayer} must take an action',
		'descriptionmyturn': '${you} may use passive abilities',
		'type': 'activeplayer',
		'possibleactions': {
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
			'actPostCleanUpPhase': [{
				'name': 'chameleons_json',
				'type': 'AT_json',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trNextPlayer': 41,
			'trPassiveAbility': 41,
			'trSliceOfLife': 70,
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
	54: {
		'name': 'dirtyExchange',
		'description': 'Dirty Exchange: ${actplayer} must choose a card to give to ${opponent_name}',
		'descriptionmyturn': 'Dirty Exchange: ${you} must choose a card to give to ${opponent_name}',
		'type': 'activeplayer',
		'action': 'stDirtyExchange',
		'args': 'argOpponentName',
		'possibleactions': {
			'actDirtyExchange': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	55: {
		'name': 'sabotage',
		'description': 'Sabotage: ${actplayer} must choose a card to ditch for ${opponent_name}',
		'descriptionmyturn': 'Sabotage: ${you} must choose a card to ditch for ${opponent_name}',
		'type': 'activeplayer',
		'action': 'stSabotage',
		'args': 'argOpponentName',
		'possibleactions': {
			'actSabotage': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	56: {
		'name': 'blindfold',
		'description': 'Blindfold: ${actplayer} must guess the value of ${opponent_name}\\\'s card',
		'descriptionmyturn': 'Blindfold: ${you} must guess the value of ${opponent_name}\\\'s card',
		'type': 'activeplayer',
		'action': 'stBlindfold',
		'args': 'argBlindfold',
		'possibleactions': {
			'actBlindfold': [{
				'name': 'value',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trChangeActivePlayer': 29,
		},
	},
	57: {
		'name': 'blindfoldDecideValue',
		'description': 'Blindfold: ${actplayer} must decide the value of ${card_name}',
		'descriptionmyturn': 'Blindfold: ${you} must decide the value of ${card_name}',
		'type': 'activeplayer',
		'args': 'argBlindfoldDecideValue',
		'possibleactions': {
			'actBlindfoldDecideValue': [{
				'name': 'value',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	58: {
		'name': 'magnet',
		'description': 'Magnet: ${actplayer} must search their deck for a card',
		'descriptionmyturn': 'Magnet: ${you} must search your deck for a card',
		'type': 'activeplayer',
		'args': 'argMyDeckContent',
		'possibleactions': {
			'actMagnet': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	59: {
		'name': 'dangerousTest',
		'description': 'Dangerous Test: ${actplayer} must discard 3 cards',
		'descriptionmyturn': 'Dangerous Test: ${you} must discard 3 cards',
		'type': 'activeplayer',
		'action': 'stDangerousTest',
		'possibleactions': {
			'actDangerousTest': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	60: {
		'name': 'nightShift',
		'description': 'Night Shift: ${actplayer} must place a card on top of each player\\\'s deck',
		'descriptionmyturn': 'Night Shift: ${you} must place a card on top of each player\\\'s deck',
		'type': 'activeplayer',
		'action': 'stNightShift',
		'args': 'argPlayerIds',
		'possibleactions': {
			'actNightShift': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'player_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	61: {
		'name': 'ruthlessCompetition',
		'description': 'Ruthless Competition: ${actplayer} must place a card on top of ${opponent_name}\\\'s deck',
		'descriptionmyturn': 'Ruthless Competition: ${you} must place a card on top of ${opponent_name}\\\'s deck',
		'type': 'activeplayer',
		'action': 'stRuthlessCompetition',
		'args': 'argOpponentName',
		'possibleactions': {
			'actRuthlessCompetition': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	62: {
		'name': 'cunningNeighbour',
		'description': 'Cunning Neighbour: ${actplayer} is looking at ${opponent_name}\\\'s hand',
		'descriptionmyturn': 'Cunning Neighbour: ${you} are looking at ${opponent_name}\\\'s hand. Choose where to place Cunning Neighbour',
		'type': 'activeplayer',
		'action': 'stCunningNeighbour',
		'args': 'argOpponentName',
		'possibleactions': {
			'actCunningNeighbour': [{
				'name': 'place_on_deck',
				'type': 'AT_bool',
				'typescriptType': boolean,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	63: {
		'name': 'cheer',
		'description': 'Other players are still searching their decks',
		'descriptionmyturn': '${you} must search your deck for a card',
		'type': 'multipleactiveplayer',
		'action': 'stCheer',
		'args': 'argDeckContent',
		'possibleactions': {
			'actCheer': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trChangeActivePlayer': 29,
		},
	},
	64: {
		'name': 'charity',
		'description': 'Charity: ${actplayer} must give back all drawn cards',
		'descriptionmyturn': 'Charity: ${you} must choose a card and an opponent',
		'type': 'activeplayer',
		'action': 'stCharity',
		'args': 'argPlayerIds',
		'possibleactions': {
			'actCharity': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'player_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	65: {
		'name': 'tasters',
		'description': 'Tasters: ${actplayer} must take a card from the market',
		'descriptionmyturn': 'Tasters: ${you} must take a card from the market',
		'type': 'activeplayer',
		'possibleactions': {
			'actTasters': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trChangeActivePlayer': 29,
		},
	},
	66: {
		'name': 'daringAdventurer',
		'description': 'Daring Adventurer: ${actplayer} must ditch ${die_value} of cards from the market',
		'descriptionmyturn': 'Daring Adventurer: ${you} must ditch ${die_value} of cards from the market',
		'type': 'activeplayer',
		'args': 'argDie',
		'possibleactions': {
			'actDaringAdventurer': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	67: {
		'name': 'naturalSurvivor',
		'description': 'Natural Survivor: ${actplayer} must search their deck for ${die_value} cards',
		'descriptionmyturn': 'Natural Survivor: ${you} must search your deck for ${die_value} cards',
		'type': 'activeplayer',
		'args': 'argNaturalSurvivor',
		'possibleactions': {
			'actNaturalSurvivor': [{
				'name': 'hand_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'deck_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	68: {
		'name': 'duplicateEntry',
		'description': 'Duplicate Entry: ${actplayer} may ditch a card from their deck',
		'descriptionmyturn': 'Duplicate Entry: ${you} may ditch a card from your deck',
		'type': 'activeplayer',
		'args': 'argMyDeckContent',
		'possibleactions': {
			'actDuplicateEntry': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	69: {
		'name': 'culturalPreservation',
		'description': 'Cultural Preservation: ${actplayer} may search their deck for up to 3 cards',
		'descriptionmyturn': 'Cultural Preservation: ${you} may search your deck for up to 3 cards',
		'type': 'activeplayer',
		'args': 'argMyDeckContent',
		'possibleactions': {
			'actCulturalPreservation': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	70: {
		'name': 'sliceOfLife',
		'description': 'Slice of Life: ${actplayer} must discard a card',
		'descriptionmyturn': 'Slice of Life: ${you} must discard a card',
		'type': 'activeplayer',
		'action': 'stSliceOfLife',
		'possibleactions': {
			'actSliceOfLife': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
			'trCleanUpPhase': 41,
		},
	},
	71: {
		'name': 'delightfulSurprise',
		'description': 'Delightful Surprise: ${actplayer} must take a card',
		'descriptionmyturn': 'Delightful Surprise: ${you} must take a card',
		'type': 'activeplayer',
		'action': 'stDelightfulSurprise',
		'possibleactions': {
			'actDelightfulSurprise': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	72: {
		'name': 'replacement',
		'description': 'Replacement: ${actplayer} must choose a card from the market valued ${value_minus_1}, ${value} or ${value_plus_1}',
		'descriptionmyturn': 'Replacement: ${you} must choose a card from the market valued ${value_minus_1}, ${value} or ${value_plus_1}',
		'type': 'activeplayer',
		'args': 'argReplacement',
		'possibleactions': {
			'actReplacement': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	73: {
		'name': 'fashionHint',
		'description': 'Fashion Hint: ${actplayer} may choose an animalfolk card from their hand to swap with ${card_name}',
		'descriptionmyturn': 'Fashion Hint: ${you} may choose an animalfolk card from your hand to swap with ${card_name}',
		'type': 'activeplayer',
		'args': 'argTopCardBin',
		'possibleactions': {
			'actFashionHint': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	74: {
		'name': 'whirligig',
		'description': 'Whirligig: ${actplayer} may look at their drawn cards',
		'descriptionmyturn': 'Whirligig: ${you} may look at your drawn cards',
		'type': 'activeplayer',
		'action': 'stWhirligig',
		'possibleactions': {
			'actWhirligig': [],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	75: {
		'name': 'pompousProfessional',
		'description': 'Pompous Professional: ${actplayer} must choose a \\\'${animalfolk_name}\\\' card to place in their hand',
		'descriptionmyturn': 'Pompous Professional: ${you} must choose a \\\'${animalfolk_name}\\\' card to place in your hand',
		'type': 'activeplayer',
		'args': 'argAnimalfolk',
		'action': 'stPompousProfessional',
		'possibleactions': {
			'actPompousProfessional': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	76: {
		'name': 'delicacy',
		'description': 'Delicacy: ${actplayer} may swap with a card from ${opponent_name}\\\'s deck',
		'descriptionmyturn': 'Delicacy: ${you} may swap with a card from ${opponent_name}\\\'s deck',
		'type': 'activeplayer',
		'action': 'stDelicacy',
		'args': 'argOpponentName',
		'possibleactions': {
			'actDelicacy': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	77: {
		'name': 'umbrella',
		'description': 'Umbrella: ${actplayer} may swap with a card from ${opponent_name}\\\'s hand',
		'descriptionmyturn': 'Umbrella: ${you} may swap with a card from ${opponent_name}\\\'s hand',
		'type': 'activeplayer',
		'action': 'stUmbrella',
		'args': 'argOpponentName',
		'possibleactions': {
			'actUmbrella': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	98: {
		'name': 'finalStatistics',
		'description': '',
		'type': 'game',
		'action': 'stFinalStatistics',
		'transitions': {
			'trGameEnd': 99,
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