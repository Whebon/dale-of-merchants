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
			'trDeprecatedTasters': 6500,
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
			}, {
				'name': 'args',
				'type': 'AT_json',
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
			'trDeprecatedCheer': 6300,
			'trCharity': 64,
			'trDeprecatedTasters': 6500,
			'trTasters': 65,
			'trDaringAdventurer': 66,
			'trNaturalSurvivor': 67,
			'trDuplicateEntry': 68,
			'trCulturalPreservation': 69,
			'trRefreshingDrink': 70,
			'trDelightfulSurprise': 71,
			'trReplacement': 72,
			'trFashionHint': 73,
			'trDeprecatedWhirligig': 7400,
			'trPompousProfessional': 75,
			'trDelicacy': 76,
			'trUmbrella': 77,
			'trRumours': 78,
			'trWheelbarrow': 79,
			'trVigilance': 80,
			'trTacticalMeasurement': 81,
			'trMeddlingMarketeer': 82,
			'trAnchor': 83,
			'trManufacturedJoy': 84,
			'trShakyEnterprise': 85,
			'trCharmStove': 86,
			'trResourcefulAlly': 87,
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
			'trRefreshingDrink': 70,
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
		'description': 'Dangerous Test: ${actplayer} must discard 3 card(s)',
		'descriptionmyturn': 'Dangerous Test: ${you} must discard 3 card(s)',
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
		'descriptionmyturn': 'Cunning Neighbour: ${you} are looking at ${opponent_name}\\\'s hand',
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
	64: {
		'name': 'charity',
		'description': 'Charity: ${actplayer} must give back all drawn cards',
		'descriptionmyturn': 'Charity: ${you} must choose a card and a player',
		'type': 'activeplayer',
		'action': 'stCharity',
		'args': 'argPlayerIds',
		'possibleactions': {
			'actGiveCardsFromLimboToPlayers': [{
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
		'description': 'Tasters: ${actplayer} must give each player a card from the market',
		'descriptionmyturn': 'Tasters: ${you} must choose a card from the market and a player',
		'type': 'activeplayer',
		'args': 'argPlayerIds',
		'possibleactions': {
			'actTasters': [{
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
	66: {
		'name': 'daringAdventurer',
		'description': 'Daring Adventurer: ${actplayer} must discard ${die_value} card(s)',
		'descriptionmyturn': 'Daring Adventurer: ${you} must discard ${die_value} card(s)',
		'type': 'activeplayer',
		'args': 'argDie',
		'action': 'stDaringAdventurer',
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
		'description': 'Natural Survivor: ${actplayer} must search their deck for ${die_value} card(s)',
		'descriptionmyturn': 'Natural Survivor: ${you} must search your deck for ${die_value} card(s)',
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
		'description': 'Cultural Preservation: ${actplayer} must search their deck for 3 cards',
		'descriptionmyturn': 'Cultural Preservation: ${you} must search your deck for 3 cards',
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
		'name': 'refreshingDrink',
		'description': 'Refreshing Drink: ${actplayer} must discard a card',
		'descriptionmyturn': 'Refreshing Drink: ${you} must discard a card',
		'type': 'activeplayer',
		'action': 'stRefreshingDrink',
		'possibleactions': {
			'actRefreshingDrink': [{
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
	75: {
		'name': 'pompousProfessional',
		'description': 'Pompous Professional: ${actplayer} must choose a \\\'${animalfolk_name}\\\' card to place in their hand',
		'descriptionmyturn': 'Pompous Professional: ${you} must choose a \\\'${animalfolk_name}\\\' card to place in your hand',
		'type': 'activeplayer',
		'args': 'argAnimalfolk',
		'action': 'stPompousProfessional',
		'possibleactions': {
			'actPompousProfessional': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'is_taking_card',
				'type': 'AT_bool',
				'typescriptType': boolean,
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
	78: {
		'name': 'rumours',
		'description': 'Rumours: ${actplayer} must give back all drawn cards',
		'descriptionmyturn': 'Rumours: ${you} must choose a card and a player',
		'type': 'activeplayer',
		'action': 'stRumours',
		'args': 'argPlayerIds',
		'possibleactions': {
			'actGiveCardsFromLimboToPlayers': [{
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
	79: {
		'name': 'wheelbarrow',
		'description': 'Wheelbarrow: ${actplayer} must choose to ditch or store ${card_name}',
		'descriptionmyturn': 'Wheelbarrow: ${you} must choose to ditch or store ${card_name}',
		'type': 'activeplayer',
		'action': 'stWheelbarrow',
		'args': 'argCardName',
		'possibleactions': {
			'actWheelbarrow': [{
				'name': 'is_ditching',
				'type': 'AT_bool',
				'typescriptType': boolean,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	80: {
		'name': 'vigilance',
		'description': 'Vigilance: ${actplayer} must search their deck for a card',
		'descriptionmyturn': 'Vigilance: ${you} must search your deck for a card',
		'type': 'activeplayer',
		'args': 'argMyDeckContent',
		'possibleactions': {
			'actVigilance': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	81: {
		'name': 'tacticalMeasurement',
		'description': 'Tactical Measurement: ${actplayer} must place 2 cards on their deck',
		'descriptionmyturn': 'Tactical Measurement: ${you} must place 2 cards on your deck',
		'type': 'activeplayer',
		'action': 'stTacticalMeasurement',
		'possibleactions': {
			'actTacticalMeasurement': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	82: {
		'name': 'meddlingMarketeer',
		'description': 'Meddling Marketeer: ${actplayer} may discard any number of cards',
		'descriptionmyturn': 'Meddling Marketeer: ${you} may discard any number of cards',
		'type': 'activeplayer',
		'action': 'stMeddlingMarketeer',
		'possibleactions': {
			'actMeddlingMarketeer': [{
				'name': 'discard_card_ids',
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
	83: {
		'name': 'anchor',
		'description': 'Anchor: ${actplayer} must place a card on any player\\\'s discard pile',
		'descriptionmyturn': 'Anchor: ${you} must place a card on any player\\\'s discard pile',
		'type': 'activeplayer',
		'action': 'stAnchor',
		'possibleactions': {
			'actAnchor': [{
				'name': 'opponent_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'discard_card_id',
				'type': 'AT_int',
				'typescriptType': number,
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
	84: {
		'name': 'manufacturedJoy',
		'description': 'Manufactured Joy: ${actplayer} must search their deck for a card',
		'descriptionmyturn': 'Manufactured Joy: ${you} must search your deck for a card',
		'type': 'activeplayer',
		'args': 'argMyDeckContent',
		'possibleactions': {
			'actManufacturedJoy': [{
				'name': 'draw_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'discard_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'opponent_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	85: {
		'name': 'shakyEnterprise',
		'description': 'Shaky Enterprise: ${actplayer} must place a card on any player\\\'s discard pile',
		'descriptionmyturn': 'Shaky Enterprise: ${you} must place a card on any player\\\'s discard pile',
		'type': 'activeplayer',
		'possibleactions': {
			'actAnchor': [{
				'name': 'opponent_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'discard_card_id',
				'type': 'AT_int',
				'typescriptType': number,
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
	86: {
		'name': 'charmStove',
		'description': 'Stove: ${actplayer} may spend x to change the Stove\\\'s value',
		'descriptionmyturn': 'Stove: ${you} may spend x to change the Stove\\\'s value',
		'type': 'activeplayer',
		'action': 'stCharmStove',
		'possibleactions': {
			'actCharmStove': [{
				'name': 'spend_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'spend_coins',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
			'trGameEnd': 98,
		},
	},
	87: {
		'name': 'resourcefulAlly',
		'description': 'Resourceful Ally: ${actplayer} must place ${nbr} cards from your discard on the bottom of their deck',
		'descriptionmyturn': 'Resourceful Ally: ${you} must place ${nbr} cards from your discard on the bottom of your deck',
		'type': 'activeplayer',
		'args': 'argResourcefulAlly',
		'possibleactions': {
			'actResourcefulAlly': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
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
	6300: {
		'name': 'deprecated_cheer',
		'description': 'Other players are still searching their decks',
		'descriptionmyturn': '${you} must search your deck for a card',
		'type': 'multipleactiveplayer',
		'action': 'stDeprecatedCheer',
		'args': 'argDeckContent',
		'possibleactions': {
			'actDeprecatedCheer': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trChangeActivePlayer': 29,
		},
	},
	6500: {
		'name': 'deprecated_tasters',
		'description': 'Tasters: ${actplayer} must take a card from the market',
		'descriptionmyturn': 'Tasters: ${you} must take a card from the market',
		'type': 'activeplayer',
		'possibleactions': {
			'actDeprecatedTasters': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trChangeActivePlayer': 29,
		},
	},
	7400: {
		'name': 'deprecated_whirligig',
		'description': 'Whirligig: ${actplayer} may look at their drawn cards',
		'descriptionmyturn': 'Whirligig: ${you} may look at your drawn cards',
		'type': 'activeplayer',
		'action': 'stDeprecatedWhirligig',
		'possibleactions': {
			'actDeprecatedWhirligig': [],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
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