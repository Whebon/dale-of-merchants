<?php

require_once(APP_GAMEMODULE_PATH.'module/table/table.game.php');
require_once "DaleDeck.php";

abstract class DaleTableBasic extends Table {
    var $card_types; //Defined by the materials

    function __construct() {
        parent::__construct();
    }

    /**
     * Quick and dirty DEBUG utility to get to know the php files on the server.
     */
    function get_file($filename_suffix) {
        //$filename_suffix = 'module/common/deck.game.php'
        $filename = APP_GAMEMODULE_PATH.$filename_suffix;

        if (is_dir($filename)) {
            // Filename is a directory, print content
            $this->debug( "Directory content:");
            $files = scandir($filename);
            $msg = "[ ";
            foreach ($files as $file) {
                $this->debug( $file );
                $msg .= $file.", ";
            }
            $msg .= " ]";
            die("SUCCESS: directory: $msg");
        } 
        else if (file_exists($filename)) {
            // Filename exists, print the content
            $content = file_get_contents($filename);
            $this->debug("File Content:");
            $this->debug(nl2br(htmlspecialchars($content)));
            die("SUCCESS: File Content Logged");
        } 
        else {
            die("FAIL: File ./$filename_suffix does not exist");
        }
    }
}
