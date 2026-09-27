<?php

declare(strict_types=1);

namespace Bga\Games\DaleOfMerchants\States;

use Bga\Games\DaleOfMerchants\Game;

use Bga\GameFramework\GameResult\GameResult;
use Bga\GameFramework\GameResult\Player;
use Bga\GameFramework\StateType;

const ST_END_GAME = 99;

class FinalStatistics extends \Bga\GameFramework\States\GameState
{

    function __construct(
        protected Game $game,
    ) {
        parent::__construct($game,
            id: 98,
            type: StateType::GAME,
        );
    }

    /**
     * Game state action, example content.
     *
     * The onEnteringState method of state `FinalStatistics` is called just before the end of the game.
     */
    public function onEnteringState() {
        $this->game->stFinalStatistics();

        if ($this->game->isSoloGame()) {
            $playersDb = $this->game->getCollectionFromDb("SELECT * FROM `player`");
            $players = Player::fromPlayersDb($playersDb);
            $player = reset($players);
            return GameResult::solo($player, $player->score, $player->score >= MAX_STACKS);
        }
        else {
            return ST_END_GAME;
        }
    }
}