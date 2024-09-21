{OVERALL_GAME_HEADER}

<!-- 
--------
-- BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
-- DaleOfMerchants implementation : © Bart Swinkels bart-man99@hotmail.com
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------
-->

<div id="daleofmerchants-svg-container">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%"></svg>
</div>

<div id="daleofmerchants-page-deck-selection">
    <div class="daleofmerchants-deck-selection-container"></div>
</div>

<div id="daleofmerchants-page-game">
    <div id="daleofmerchants-market-wrap" class="whiteblock">
        <!-- Display the name of this area? <h3>{MARKET}</h3> -->
        <div style="display:flex; align-items: center; justify-content: space-evenly;">
            <div id="market-deck" class="daleofmerchants-pile-container"></div>
            <div id="daleofmerchants-market-board-background">
                <div id="daleofmerchants-market-board" class="daleofmerchants-stall-container"></div>
            </div>
            <div id="market-discard" class="daleofmerchants-pile-container"></div>
        </div>
    </div>

    <div id="daleofmerchants-hand-limbo-flex" class="daleofmerchants-horizontal-flex">
        <div id="daleofmerchants-myhand-wrap" class="whiteblock daleofmerchants-arc-stock daleofmerchants-no-vertical-margin">
            <div class="daleofmerchants-label"></div>
            <div id="daleofmerchants-myhand"></div>
        </div> 
        <div id="daleofmerchants-mylimbo-wrap" class="whiteblock daleofmerchants-arc-stock daleofmerchants-no-vertical-margin daleofmerchants-left-margin">
            <div class="daleofmerchants-label"></div>
            <div id="daleofmerchants-mylimbo"></div>
        </div>
    </div> 

    <!-- BEGIN stall -->
    <div class="whiteblock">
        <h3 class="daleofmerchants-play-area-title"><span style="color:#{PLAYER_COLOR};">{PLAYER_NAME_POSSESSIVE}</span> {PLAY_AREA} </h3>
        <div class="daleofmerchants-horizontal-flex">
            <div id="deck-{PLAYER_ID}" class="daleofmerchants-pile-container"></div>
            <div id="discard-{PLAYER_ID}" class="daleofmerchants-pile-container"></div>
            <div id="daleofmerchants-stall-wrap-landscape-{PLAYER_ID}" class="daleofmerchants-stall-wrap">
                <h3 class="daleofmerchants-component-name"> {STALL} </h3>
                <div id="daleofmerchants-stall-{PLAYER_ID}" class="daleofmerchants-stall-container"></div>
            </div>
            <div id="daleofmerchants-schedule-wrap-{PLAYER_ID}" class="daleofmerchants-flat-stock daleofmerchants-schedule">
                <div class="daleofmerchants-hidden daleofmerchants-label"></div> <!-- not used, but exists so this component can be a proper daleStock -->
                <h3 class="daleofmerchants-component-name"> {SCHEDULE} </h3>
                <div id="daleofmerchants-schedule-{PLAYER_ID}"></div>
            </div>
        </div>
        <div id="daleofmerchants-stall-wrap-portrait-{PLAYER_ID}" class="daleofmerchants-stall-wrap">
            <h3 class="daleofmerchants-component-name"> {STALL} </h3>
            <!-- on narrow screens, the stall will automatically be moved here -->
        </div>
        <br>
        
    </div>
    <!-- END stall -->

    <!---------------------------->
    <!--       Debug Tools      -->
    <!---------------------------->
    <div class="daleofmerchants-debugtools daleofmerchants-hidden whiteblock">
        <span>
            <strong></strong>
            <div class="daleofmerchants-autocomplete-container">
                <input type="text" placeholder="Type a card name..." autocomplete="off">
                <div class="daleofmerchants-dropdown" style="display: none;"></div>
            </div>
            <button id = "daleofmerchants-spawn-button" style="width: 120px;" class="action-button bgabutton bgabutton_blue">Spawn Card</button>
        </span>
    </div>
</div>



<script type="text/javascript">

// Javascript HTML templates
//var jstpl_hand_size = '<span id="handsize-${player.id}">0</span><i id="daleofmerchants-myhandsize-icon-${player.id}" class="daleofmerchants-myhandsize-icon"></i>';

</script>

{OVERALL_GAME_FOOTER}
