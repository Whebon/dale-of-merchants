<?php

require_once(APP_GAMEMODULE_PATH.'module/table/table.game.php');
require_once "DaleDeck.php";

abstract class DaleTableBasic extends Table {
    var $card_types; //Defined by the materials
    var $DISABLED_ANIMALFOLK_IDS; //Defined by the materials

    function __construct() {
        parent::__construct();
    }
}
