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
	28: {
		'name': 'trigger',
		'description': '${actplayer} must resolve triggered techniques',
		'descriptionmyturn': '${you} must resolve triggered techniques',
		'type': 'activeplayer',
		'action': 'stTrigger',
		'possibleactions': {
			'actFullyResolveTechniqueCard': [{
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
			'trSamePlayer': 28,
			'trChangeActivePlayer': 29,
			'trBonusBuild': 36,
		},
	},
	29: {
		'name': 'changeActivePlayer',
		'description': '',
		'type': 'game',
		'action': 'stChangeActivePlayer',
		'transitions': {
			'trSamePlayer': 30,
			'trDEPRECATED_Blindfold': 56,
			'trDEPRECATED_BlindfoldIncorrectGuess': 57,
			'trFullyResolve': 33,
			'trDEPRECATED_Tasters': 6500,
		},
	},
	30: {
		'name': 'playerTurn',
		'description': '${actplayer} must take an action',
		'descriptionmyturn': '${you} must take an action',
		'type': 'activeplayer',
		'possibleactions': {
			'actPurchase': [{
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
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'args',
				'type': 'AT_json',
				'typescriptType': string,
			}],
			'actUsePassiveAbility': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'args',
				'type': 'AT_json',
				'typescriptType': string,
			}],
			'actFullyResolveTechniqueCard': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'args',
				'type': 'AT_json',
				'typescriptType': string,
			}],
			'actBonusBuildSkip': [],
			'actBuild': [{
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
			'trBonusBuild': 36,
			'trDEPRECATED_RoyalPrivilege': 37,
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
			'trDEPRECATED_Cheer': 6300,
			'trCharity': 64,
			'trDEPRECATED_Tasters': 6500,
			'trTasters': 65,
			'trDaringAdventurer': 66,
			'trNaturalSurvivor': 67,
			'trDuplicateEntry': 68,
			'trDEPRECATED_CulturalPreservation': 69,
			'trRefreshingDrink': 70,
			'trDelightfulSurprise': 71,
			'trReplacement': 72,
			'trVelocipede': 73,
			'trDEPRECATED_Whirligig': 74,
			'trPompousProfessional': 75,
			'trDelicacy': 76,
			'trUmbrella': 77,
			'trRumours': 78,
			'trWheelbarrow': 79,
			'trVigilance': 80,
			'trMeddlingMarketeer': 82,
			'trAnchor': 83,
			'trManufacturedJoy': 84,
			'trShakyEnterprise': 85,
			'trCharmStove': 86,
			'trResourcefulAlly': 87,
			'trTravelingEquipment': 88,
			'trFishing': 89,
			'trGroundbreakingIdea': 90,
			'trDEPRECATED_Insight': 91,
			'trBadOmen': 92,
			'trCelestialGuidanceMarket': 93,
			'trCelestialGuidanceDiscard': 94,
			'trFumblingDreamer': 95,
			'trLooseMarbles': 96,
			'trAnotherFineMess': 97,
			'trCoffeeGrinder': 101,
			'trSerenade': 102,
			'trRake': 103,
			'trSoundDetectors': 104,
			'trBlindfold': 105,
			'trHistoryLesson': 106,
			'trFashionHint': 107,
			'trAccident': 108,
			'trSouvenirs': 109,
			'trInsightDiscard': 110,
			'trInsightTake': 111,
			'trCapuchin4': 112,
			'trCapuchin5a': 113,
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
		'name': 'bonusBuild',
		'description': '${bonus_build_name}: ${actplayer} may select cards to build in stack ${stack_index_plus_1}',
		'descriptionmyturn': '${bonus_build_name}: ${you} may select cards to build in stack ${stack_index_plus_1}',
		'type': 'activeplayer',
		'args': 'argStackIndex',
		'possibleactions': {
			'actBuild': [{
				'name': 'stack_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'stack_card_ids_from_discard',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
			'actUsePassiveAbility': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'args',
				'type': 'AT_json',
				'typescriptType': string,
			}],
			'actBonusBuildSkip': [],
		},
		'transitions': {
			'trPassiveAbility': 36,
			'trBonusBuild': 36,
			'trNextPlayer': 41,
			'trSamePlayer': 30,
			'trGameEnd': 98,
		},
	},
	37: {
		'name': 'DEPRECATED_royalPrivilege',
		'description': 'Royal Privilege: ${actplayer} may toss an animalfolk card to purchase an additional card for free',
		'descriptionmyturn': 'Royal Privilege: ${you} may toss an animalfolk card to purchase an additional card for free',
		'type': 'activeplayer',
		'possibleactions': {
			'actDEPRECATED_RoyalPrivilege': [{
				'name': 'toss_card_id',
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
			'trGameEnd': 98,
		},
	},
	42: {
		'name': 'postCleanUpPhase',
		'description': '${actplayer} must take an action',
		'descriptionmyturn': '${you} may use passive abilities',
		'type': 'activeplayer',
		'action': 'stPostCleanUpPhase',
		'possibleactions': {
			'actUsePassiveAbility': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'args',
				'type': 'AT_json',
				'typescriptType': string,
			}],
			'actFullyResolveTechniqueCard': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'args',
				'type': 'AT_json',
				'typescriptType': string,
			}],
			'actEndTurn': [],
		},
		'transitions': {
			'trSamePlayer': 41,
			'trNextPlayer': 41,
			'trPassiveAbility': 41,
			'trTacticalMeasurement': 81,
		},
	},
	52: {
		'name': 'spyglass',
		'description': 'Spyglass: ${actplayer} must choose 1 card to take and reorder the rest',
		'descriptionmyturn': 'Spyglass: ${you} must choose 1 card to take and reorder the rest',
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
		'description': '${resolving_card_name}: ${actplayer} must choose 1 card to take and toss the rest',
		'descriptionmyturn': '${resolving_card_name}: ${you} must choose 1 card to take and toss the rest',
		'type': 'activeplayer',
		'action': 'stSpecialOffer',
		'args': 'argResolvingCardName',
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
		'description': 'Sabotage: ${actplayer} must choose a card to toss for ${opponent_name}',
		'descriptionmyturn': 'Sabotage: ${you} must choose a card to toss for ${opponent_name}',
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
		'name': 'DEPRECATED_blindfold',
		'description': 'DEPRECATED_Blindfold: ${actplayer} must guess the value of ${opponent_name}\\\'s card',
		'descriptionmyturn': 'DEPRECATED_Blindfold: ${you} must guess the value of ${opponent_name}\\\'s card',
		'type': 'activeplayer',
		'action': 'stDEPRECATED_Blindfold',
		'args': 'argDEPRECATED_Blindfold',
		'possibleactions': {
			'actDEPRECATED_Blindfold': [{
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
		'name': 'DEPRECATED_blindfoldDecideValue',
		'description': 'DEPRECATED_Blindfold: ${actplayer} must decide the value of ${card_name}',
		'descriptionmyturn': 'DEPRECATED_Blindfold: ${you} must decide the value of ${card_name}',
		'type': 'activeplayer',
		'args': 'argDEPRECATED_BlindfoldDecideValue',
		'possibleactions': {
			'actDEPRECATED_BlindfoldDecideValue': [{
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
		'args': 'argOpponentNameAndPassiveCardId',
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
		'action': 'stTasters',
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
			'trChangeActivePlayer': 29,
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
		'description': 'Natural Survivor: ${actplayer} must search their hand and deck for ${die_value} card(s)',
		'descriptionmyturn': 'Natural Survivor: ${you} must search your hand and deck for ${die_value} card(s)',
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
		'description': 'Duplicate Entry: ${actplayer} must search your deck for 2 cards',
		'descriptionmyturn': 'Duplicate Entry: ${you} must search your deck for 2 cards',
		'type': 'activeplayer',
		'args': 'argMyDeckContent',
		'possibleactions': {
			'actDuplicateEntry': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trBadOmen': 92,
		},
	},
	69: {
		'name': 'DEPRECATED_culturalPreservation',
		'description': 'Cultural Preservation: ${actplayer} must search their deck for 3 cards',
		'descriptionmyturn': 'Cultural Preservation: ${you} must search your deck for 3 cards',
		'type': 'activeplayer',
		'args': 'argMyDeckContent',
		'possibleactions': {
			'actDEPRECATED_CulturalPreservation': [{
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
		'args': 'argPassiveCardId',
		'possibleactions': {
			'actRefreshingDrink': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
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
		'name': 'velocipede',
		'description': 'Velocipede: ${actplayer} may choose an animalfolk card from their hand to swap with ${card_name}',
		'descriptionmyturn': 'Velocipede: ${you} may choose an animalfolk card from your hand to swap with ${card_name}',
		'type': 'activeplayer',
		'args': 'argTopCardBin',
		'possibleactions': {
			'actVelocipede': [{
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
		'name': 'DEPRECATED_whirligig',
		'description': 'Whirligig: ${actplayer} may look at their drawn cards',
		'descriptionmyturn': 'Whirligig: ${you} may look at your drawn cards',
		'type': 'activeplayer',
		'action': 'stDEPRECATED_Whirligig',
		'possibleactions': {
			'actDEPRECATED_Whirligig': [],
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
		'description': 'Wheelbarrow: ${actplayer} must choose to toss or store the top card of their deck',
		'descriptionmyturn': 'Wheelbarrow: ${you} must choose to toss or store ${_private.card_name}',
		'type': 'activeplayer',
		'action': 'stWheelbarrow',
		'args': 'argCardNamePrivate',
		'possibleactions': {
			'actWheelbarrow': [{
				'name': 'is_tossing',
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
			'trCleanUpPhase': 41,
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
		'description': '${resolving_card_name}: ${actplayer} must place a card on any player\\\'s discard pile',
		'descriptionmyturn': '${resolving_card_name}: ${you} must place a card on any player\\\'s discard pile',
		'type': 'activeplayer',
		'action': 'stAnchor',
		'args': 'argResolvingCardName',
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
		'description': '${resolving_card_name}: ${actplayer} must place a card on any player\\\'s discard pile',
		'descriptionmyturn': '${resolving_card_name}: ${you} must place a card on any player\\\'s discard pile',
		'type': 'activeplayer',
		'args': 'argResolvingCardName',
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
	88: {
		'name': 'travelingEquipment',
		'description': 'Traveling Equipment: ${actplayer} must choose a card to toss',
		'descriptionmyturn': 'Traveling Equipment: ${you} must choose a card to toss',
		'type': 'activeplayer',
		'action': 'stTravelingEquipment',
		'possibleactions': {
			'actTravelingEquipment': [{
				'name': 'toss_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	89: {
		'name': 'fishing',
		'description': 'Fishing: ${actplayer} must place exactly ${die_value} cards from your discard on your deck',
		'descriptionmyturn': 'Fishing: ${you} must place exactly ${die_value} cards from your discard on your deck',
		'type': 'activeplayer',
		'args': 'argDie',
		'possibleactions': {
			'actFishing': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	90: {
		'name': 'groundbreakingIdea',
		'description': 'Groundbreaking Idea: ${actplayer} must place a card from their discard on their deck',
		'descriptionmyturn': 'Groundbreaking Idea: ${you} must place a card from your discard on your deck',
		'type': 'activeplayer',
		'possibleactions': {
			'actGroundbreakingIdea': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	91: {
		'name': 'DEPRECATED_insight',
		'description': 'DEPRECATED_Insight: ${actplayer} must choose the order to place all cards back on top of their deck',
		'descriptionmyturn': 'DEPRECATED_Insight: ${you} must choose the order to place all cards back on top of your deck',
		'type': 'activeplayer',
		'action': 'stDEPRECATED_Insight',
		'possibleactions': {
			'actDEPRECATED_Insight': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	92: {
		'name': 'badOmen',
		'description': '${resolving_card_name}: ${actplayer} may toss a card',
		'descriptionmyturn': '${resolving_card_name}: ${you} may toss a card',
		'type': 'activeplayer',
		'action': 'stBadOmen',
		'args': 'argResolvingCardName',
		'possibleactions': {
			'actBadOmen': [{
				'name': 'toss_card_id',
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
	93: {
		'name': 'celestialGuidanceMarket',
		'description': 'Celestial Guidance: ${actplayer} must take a card from the market',
		'descriptionmyturn': 'Celestial Guidance: ${you} must take a card from the market',
		'type': 'activeplayer',
		'possibleactions': {
			'actCelestialGuidanceMarket': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	94: {
		'name': 'celestialGuidanceDiscard',
		'description': 'Celestial Guidance: ${actplayer} must take a card from their discard pile',
		'descriptionmyturn': 'Celestial Guidance: ${you} must take a card from your discard pile',
		'type': 'activeplayer',
		'possibleactions': {
			'actCelestialGuidanceDiscard': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	95: {
		'name': 'fumblingDreamer',
		'description': 'Fumbling Dreamer: ${actplayer} must choose a player to move a card from their ${die_label_source} (${die_icon_source}) to their ${die_label} (${die_icon})',
		'descriptionmyturn': 'Fumbling Dreamer: ${you} must choose a player to move a card from their ${die_label_source} (${die_icon_source}) to their ${die_label} (${die_icon})',
		'type': 'activeplayer',
		'args': 'argPangolinDice',
		'possibleactions': {
			'actFumblingDreamer': [{
				'name': 'opponent_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	96: {
		'name': 'looseMarbles',
		'description': 'Loose Marbles: ${actplayer} must move a card from a ${die_label_source} (${die_icon_source}) to another player\\\'s ${die_label} (${die_icon})',
		'descriptionmyturn': 'Loose Marbles: ${you} must move a card from a ${die_label_source} (${die_icon_source}) to another player\\\'s ${die_label} (${die_icon})',
		'type': 'activeplayer',
		'args': 'argPangolinDice',
		'possibleactions': {
			'actLooseMarbles': [{
				'name': 'source_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'destination_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	97: {
		'name': 'anotherFineMess',
		'description': 'Another Fine Mess: ${actplayer} must move cards from a ${die_label_source} (${die_icon_source}) to another player\\\'s ${die_label} (${die_icon})',
		'descriptionmyturn': 'Another Fine Mess: ${you} must move cards from a ${die_label_source} (${die_icon_source}) to another player\\\'s ${die_label} (${die_icon})',
		'type': 'activeplayer',
		'args': 'argPangolinDice',
		'possibleactions': {
			'actAnotherFineMess': [{
				'name': 'source_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'destination_id',
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
	101: {
		'name': 'coffeeGrinder',
		'description': 'Coffee Grinder: ${actplayer} may discard another card from ${opponent_name}\\\'s deck (${die_value} left)',
		'descriptionmyturn': 'Coffee Grinder: ${you} may discard another card from ${opponent_name}\\\'s deck (${die_value} left)',
		'type': 'activeplayer',
		'args': 'argOpponentNameAndPassiveCardIdAndDie',
		'possibleactions': {
			'actCoffeeGrinder': [{
				'name': 'skip',
				'type': 'AT_bool',
				'typescriptType': boolean,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
			'trSameState': 101,
		},
	},
	102: {
		'name': 'serenade',
		'description': 'Serenade: ${actplayer} must choose 2 cards to place on their deck',
		'descriptionmyturn': 'Serenade: ${you} must choose 2 cards to place on your deck',
		'type': 'activeplayer',
		'action': 'stSerenade',
		'possibleactions': {
			'actSerenade': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	103: {
		'name': 'rake',
		'description': '${resolving_card_name}: ${actplayer} may toss 0-1 cards and discard 0-2 cards from their deck',
		'descriptionmyturn': '${resolving_card_name}: ${you} may toss (ICON) 0-1 cards and discard (ICON) 0-2 cards from your deck',
		'type': 'activeplayer',
		'args': 'argMyDeckContentAndResolvingCardName',
		'possibleactions': {
			'actRake': [{
				'name': 'toss_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}, {
				'name': 'discard_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	104: {
		'name': 'soundDetectors',
		'description': 'Sound Detectors: ${actplayer} must copy 1 of ${opponent_name}\\\'s cards',
		'descriptionmyturn': 'Sound Detectors: ${you} must copy 1 of ${opponent_name}\\\'s cards',
		'type': 'activeplayer',
		'args': 'argOpponentNameAndPassiveCardId',
		'action': 'stSoundDetectors',
		'possibleactions': {
			'actSoundDetectors': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	105: {
		'name': 'blindfold',
		'description': 'Blindfold: ${actplayer} must decide the value of ${card_name}${prior_modifications}',
		'descriptionmyturn': 'Blindfold: ${you} must decide the value of ${card_name}${prior_modifications}',
		'type': 'activeplayer',
		'args': 'argBlindfold',
		'possibleactions': {
			'actBlindfold': [{
				'name': 'value',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	106: {
		'name': 'historyLesson',
		'description': 'History Lesson: ${actplayer} must choose 1 card to take and reorder the rest',
		'descriptionmyturn': 'History Lesson: ${you} must choose 1 card to take and reorder the rest',
		'type': 'activeplayer',
		'action': 'stHistoryLesson',
		'possibleactions': {
			'actHistoryLesson': [{
				'name': 'card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	107: {
		'name': 'fashionHint',
		'description': 'Fashion Hint: ${actplayer} must choose to toss or keep the top card of the supply',
		'descriptionmyturn': 'Fashion Hint: ${you} must choose to toss or keep ${_private.card_name}',
		'type': 'activeplayer',
		'action': 'stFashionHint',
		'args': 'argCardNamePrivate',
		'possibleactions': {
			'actFashionHint': [{
				'name': 'is_tossing',
				'type': 'AT_bool',
				'typescriptType': boolean,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
			'trNextPlayer': 41,
		},
	},
	108: {
		'name': 'accident',
		'description': 'Accident: ${actplayer} must toss an animalfolk card',
		'descriptionmyturn': 'Accident: ${you} must toss an animalfolk card',
		'type': 'activeplayer',
		'action': 'stAccident',
		'possibleactions': {
			'actAccident': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	109: {
		'name': 'souvenirs',
		'description': 'Souvenirs: ${actplayer} must give back all drawn cards',
		'descriptionmyturn': 'Souvenirs: ${you} must choose a card and a player',
		'type': 'activeplayer',
		'action': 'stSouvenirs',
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
	110: {
		'name': 'insightDiscard',
		'description': 'Insight: ${actplayer} may discard another card from their deck (${die_value} left)',
		'descriptionmyturn': 'Insight: ${you} may discard another card from your deck (${die_value} left)',
		'type': 'activeplayer',
		'args': 'argDie',
		'possibleactions': {
			'actInsightDiscard': [{
				'name': 'skip',
				'type': 'AT_bool',
				'typescriptType': boolean,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
			'trSameState': 110,
		},
	},
	111: {
		'name': 'insightTake',
		'description': 'Insight: ${actplayer} must take a card from their discard',
		'descriptionmyturn': 'Insight: ${you} must take a card from your discard',
		'type': 'activeplayer',
		'possibleactions': {
			'actInsightTake': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	112: {
		'name': 'capuchin4',
		'description': 'INSERT_NAME: ${actplayer} may take a card from ${opponent_name}',
		'descriptionmyturn': 'INSERT_NAME: ${you} may take ${opponent_name}\\\'s ${_private.card_name}',
		'type': 'activeplayer',
		'args': 'argOpponentNameAndCardNamePrivate',
		'action': 'stCapuchin4',
		'possibleactions': {
			'actCapuchin4': [{
				'name': 'is_taking_card',
				'type': 'AT_bool',
				'typescriptType': boolean,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	113: {
		'name': 'capuchin5a',
		'description': 'INSERT_NAME: ${actplayer} may take a card from the top of ${opponent_name}\\\'s deck',
		'descriptionmyturn': 'INSERT_NAME: ${you} may take a card from the top of ${opponent_name}\\\'s deck',
		'type': 'activeplayer',
		'args': 'argOpponentName',
		'action': 'stCapuchin5a',
		'possibleactions': {
			'actCapuchin5a': [{
				'name': 'take_card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}, {
				'name': 'discard_card_ids',
				'type': 'AT_numberlist',
				'typescriptType': string,
			}],
		},
		'transitions': {
			'trSamePlayer': 30,
		},
	},
	6300: {
		'name': 'DEPRECATED_cheer',
		'description': 'DEPRECATED_Cheer: Other players are still searching their decks',
		'descriptionmyturn': 'DEPRECATED_Cheer: ${you} must search your deck for a card',
		'type': 'multipleactiveplayer',
		'action': 'stDEPRECATED_Cheer',
		'args': 'argDeckContent',
		'possibleactions': {
			'actDEPRECATED_Cheer': [{
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
		'name': 'DEPRECATED_tasters',
		'description': 'Tasters: ${actplayer} must take a card from the market',
		'descriptionmyturn': 'Tasters: ${you} must take a card from the market',
		'type': 'activeplayer',
		'possibleactions': {
			'actDEPRECATED_Tasters': [{
				'name': 'card_id',
				'type': 'AT_int',
				'typescriptType': number,
			}],
		},
		'transitions': {
			'trChangeActivePlayer': 29,
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