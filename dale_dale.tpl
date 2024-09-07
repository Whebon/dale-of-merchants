{OVERALL_GAME_HEADER}

<!-- 
--------
-- BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
-- Dale implementation : © Bart Swinkels bart-man99@hotmail.com
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------
-->

<div id="dale-svg-container">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%"></svg>
</div>

<div id="dale-page-deck-selection">
    <div class="dale-deck-selection-container"></div>
</div>

<div id="dale-page-game">
    <div id="dale-market-wrap" class="whiteblock">
        <!-- Display the name of this area? <h3>{MARKET}</h3> -->
        <div style="display:flex; align-items: center; justify-content: space-evenly;">
            <div id="market-deck" class="dale-pile-container"></div>
            <div id="dale-market-board-background"><div id="dale-market-board"></div></div>
            <div id="market-discard" class="dale-pile-container"></div>
        </div>
    </div>

    <div class="dale-horizontal-flex">
        <div id="dale-myhand-wrap" class="whiteblock dale-arc-stock dale-no-vertical-margin">
            <div class="dale-label"></div>
            <div id="dale-myhand"></div>
        </div> 
        <div id="dale-mylimbo-wrap" class="whiteblock dale-arc-stock dale-no-vertical-margin dale-left-margin">
            <div class="dale-label"></div>
            <div id="dale-mylimbo"></div>
        </div>
    </div> 

    <!-- BEGIN stall -->
    <div class="whiteblock">
        <h3><span style="color:#{PLAYER_COLOR};">{PLAYER_NAME_POSSESSIVE}</span> {PLAY_AREA} </h3>
        <div class="dale-horizontal-flex">
            <div id="deck-{PLAYER_ID}" class="dale-pile-container"></div>
            <div id="discard-{PLAYER_ID}" class="dale-pile-container"></div>
            <div class="dale-stall-wrap">
                <h3 class="dale-component-name"> {STALL} </h3>
                <div id="stall-{PLAYER_ID}" class="dale-stall-container"></div>
                <!-- <div class="dale-stall-container">
                    <div class="dale-stack-container"></div>
                    <div class="dale-stack-container"></div>
                    <div class="dale-stack-container"></div>
                    <div class="dale-stack-container"></div>
                    <div class="dale-stack-container"></div>
                    <div class="dale-stack-container"></div>
                    <div class="dale-stack-container"></div>
                    <div class="dale-stack-container"></div>
                </div> -->
            </div>
            <div id="schedule-wrap-{PLAYER_ID}" class="dale-flat-stock margin-left-wrap">
                <h3 class="dale-component-name"> {SCHEDULE} </h3>
                <div id="schedule-{PLAYER_ID}"></div>
            </div>
        </div>
        <br>
        
    </div>
    <!-- END stall -->
</div>

<script type="text/javascript">

// Javascript HTML templates
//var jstpl_hand_size = '<span id="handsize-${player.id}">0</span><i id="dale-myhandsize-icon-${player.id}" class="dale-myhandsize-icon"></i>';

</script>

{OVERALL_GAME_FOOTER}
