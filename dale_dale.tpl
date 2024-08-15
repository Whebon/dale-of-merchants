{OVERALL_GAME_HEADER}

<!-- 
--------
-- BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
-- Dale implementation : © Bart Swinkels bart-man99@hotmail.com
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------

    dale_dale.tpl
    
    This is the HTML template of your game.
    
    Everything you are writing in this file will be displayed in the HTML page of your game user interface,
    in the "main game zone" of the screen.
    
    You can use in this template:
    _ variables, with the format {MY_VARIABLE_ELEMENT}.
    _ HTML block, with the BEGIN/END format
    
    See your "view" PHP file to check how to set variables and control blocks
    
    Please REMOVE this comment before publishing your game on BGA
-->

<div id="market-wrap" class="whiteblock">
    <!-- Display the name of this area? <h3>{MARKET}</h3> -->
    <div style="display:flex; align-items: center;">
        <div id="market-discard" class="pile-container"></div>
        <div id="market-deck" class="pile-container"></div>
        <div id="market-board-background"><div id="market-board"></div></div>
    </div>
</div>

<div class="horizontal-flex">
    <div class="myhand-wrap whiteblock dale-no-vertical-margin">
        <h3> {YOUR_HAND} </h3>
        <div id="myhand"></div>
    </div> 
    <div id="mytemporary-wrap" class="whiteblock dale-no-vertical-margin dale-left-margin">
        <h3> {CARD_CHOICE} </h3>
        <div id="mytemporary"></div>
    </div>
</div> 

<!-- BEGIN stall -->
<div class="whiteblock">
    <h3><span style="color:#{PLAYER_COLOR};">{PLAYER_NAME_POSSESSIVE}</span> {PLAY_AREA} </h3>
    <div class="horizontal-flex">
        <div id="discard-{PLAYER_ID}" class="pile-container"></div>
        <div id="deck-{PLAYER_ID}" class="pile-container"></div>
        <div class="stall-wrap">
            <h3 class="name"> {STALL} </h3>
            <div id="stall-{PLAYER_ID}" class="stall-container"></div>
            <!-- <div class="stall-container">
                <div class="stack-container"></div>
                <div class="stack-container"></div>
                <div class="stack-container"></div>
                <div class="stack-container"></div>
                <div class="stack-container"></div>
                <div class="stack-container"></div>
                <div class="stack-container"></div>
                <div class="stack-container"></div>
            </div> -->
        </div>
        <div id="schedule-wrap-{PLAYER_ID}" class="margin-left-wrap">
            <h3> {SCHEDULE} </h3>
            <div id="schedule-{PLAYER_ID}"></div>
        </div>
    </div>
    <br>
    
</div>
<!-- END stall -->

<script type="text/javascript">

// Javascript HTML templates

var jstpl_hand_size = '<span id="handsize-${player.id}">0</span><i class="handsize-icon"></i>';

</script>

{OVERALL_GAME_FOOTER}
