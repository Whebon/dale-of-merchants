<?php

class DaleDeckSelection {
    private $game;

    function __construct($game) {
        $this->game = $game;
    }

    /**
     * Insert an effect into the db
     * @param int $player_id the player who made a preference
     * @param string $animalfolk the animalfolk where the preference was made for
     * @param int $score a score for this animalfolk (higher = more likely to be picked)
     */
    private function insert(int $player_id, string $animalfolk, int $score) {
        $sql = "INSERT INTO deckselection (player_id, animalfolk, score) VALUES (".addslashes($player_id).",'".addslashes($animalfolk)."',".addslashes($score).")";
        $this->game->DbQuery($sql);
    }

    /**
     * Submit a list of preferences for a player
     */
    function submitPreference(int $player_id, array $animalfolks) {
        $n = $this->game->getPlayersNumber();
        if (count($animalfolks) !== count(array_unique($animalfolks))) {
            throw new BgaVisibleSystemException("A player's deck selection preferences must be unique");
        }
        if (count($animalfolks) > $n+1) {
            throw new BgaVisibleSystemException("Players can only select up to n+1 preferences");
        }
        for ($i = 0; $i < count($animalfolks); $i++) { 
            $animalfolk = $animalfolks[$i];
            $score = pow($n + 1, $n + 1 - $i);
            $this->insert($player_id, $animalfolk, $score);
        }
    }

    /**
     * Returns the combined player preferences sorted by score (tied scores are randomized)
     */
    function getPreferences() {
        $sql = "SELECT animalfolk, SUM(score) AS total_score FROM deckselection GROUP BY animalfolk ORDER BY total_score DESC, RAND()";
        $collection = $this->game->getCollectionFromDB($sql);
        return array_keys($collection);
    }
}
