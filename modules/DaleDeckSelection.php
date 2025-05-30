<?php

class DaleDeckSelection {
    private $game;

    private ?array $cached_animalfolk_ids;

    function __construct($game) {
        $this->game = $game;
        $this->cached_animalfolk_ids = null;
    }

    /**
     * Insert an effect into the db
     * @param int $player_id the player who made a preference
     * @param string $animalfolk_id the animalfolk where the preference was made for
     * @param int $score a score for this animalfolk (higher = more likely to be picked)
     */
    private function insert(int $player_id, string $animalfolk_id, int $score) {
        $sql = "INSERT INTO deckselection (player_id, animalfolk_id, score) VALUES (".addslashes($player_id).",'".addslashes($animalfolk_id)."',".addslashes($score).")";
        $this->game->DbQuery($sql);
    }

    /**
     * Submit a list of preferences for a player
     */
    function submitPreference(int $player_id, array $animalfolk_ids) {
        $n = $this->game->getPlayersNumberInclMono();
        if (count($animalfolk_ids) !== count(array_unique($animalfolk_ids))) {
            throw new BgaVisibleSystemException("A player's deck selection preferences must be unique");
        }
        if (count($animalfolk_ids) > $n+1) {
            throw new BgaVisibleSystemException("Players can only select up to n+1 preferences, got ".count($animalfolk_ids));
        }
        for ($i = 0; $i < count($animalfolk_ids); $i++) { 
            $animalfolk_id = $animalfolk_ids[$i];
            $score = pow($n + 1, $n + 1 - $i);
            $this->insert($player_id, $animalfolk_id, $score);
        }
    }

    /**
     * @return array combined player preferences sorted by score (tied scores are randomized)
     */
    function getPreferences() {
        $sql = "SELECT animalfolk_id, SUM(score) AS total_score FROM deckselection GROUP BY animalfolk_id ORDER BY total_score DESC, RAND()";
        $collection = $this->game->getCollectionFromDB($sql);
        return array_keys($collection);
    }

    /**
     * @return array n+1 animalfolk_ids to play with (based on the preferences)
     */
    function selectAnimalfolkIds() {
        $animalfolk_ids = $this->getPreferences();
        $n = $this->game->getPlayersNumberInclMono();
        while(count($animalfolk_ids) < $n + 1) {
            //TODO: increase this range when new animalfolk are added (when ANIMALFOLK_SNOWMACAQUES are not the last anymore)
            $random_id = rand(ANIMALFOLK_MACAWS, ANIMALFOLK_SNOWMACAQUES);
            if (in_array($random_id, $this->game->DISABLED_ANIMALFOLK_IDS)) {
                continue;
            }
            if (!in_array($random_id, $animalfolk_ids)) {
                $animalfolk_ids[] = $random_id;
            }
        }
        foreach ($animalfolk_ids as $animalfolk_id) {
            //TODO: increase this range when new animalfolk are added (when ANIMALFOLK_SNOWMACAQUES are not the last anymore)
            if ($animalfolk_id < ANIMALFOLK_MACAWS || $animalfolk_id > ANIMALFOLK_SNOWMACAQUES) {
                throw new BgaSystemException($animalfolk_id+" is not a valid animalfolk_id");
            }
        }
        $cached_animalfolk_ids = array_slice($animalfolk_ids, 0, $n + 1);
        $this->submitPreference(0, $cached_animalfolk_ids); //0 means selected, this is needed for 'getAnimalfolkIds'
        return $cached_animalfolk_ids;
    }

    /**
     * @return array n+1 animalfolk_ids selected by 'selectAnimalfolkIds'
     */
    function getAnimalfolkIds() {
        if ($this->cached_animalfolk_ids !== null) {
            return $this->cached_animalfolk_ids;
        }
        $sql = "SELECT animalfolk_id FROM deckselection WHERE player_id = 0";
        $collection = $this->game->getCollectionFromDB($sql);
        $n = $this->game->getPlayersNumberInclMono();
        if (count($collection) != $n+1) {
            throw new BgaVisibleSystemException("'getAnimalfolkIds' failed, please ensure that 'selectAnimalfolkIds' was called exactly once");
        }
        $this->cached_animalfolk_ids = array_keys($collection);
        return $this->cached_animalfolk_ids;
    }

    /**
     * @param int $animalfolk_id animalfolk
     * @return bool true if `$animalfolk_id` was selected during deck selection
     */
    function includes(int $animalfolk_id): bool {
        return in_array($animalfolk_id, $this->getAnimalfolkIds(), true);
    }
}
