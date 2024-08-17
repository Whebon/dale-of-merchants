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

<div id="dale-market-wrap" class="whiteblock">
    <!-- Display the name of this area? <h3>{MARKET}</h3> -->
    <div style="display:flex; align-items: center;">
        <div id="market-deck" class="pile-container"></div>
        <div id="market-board-background"><div id="market-board"></div></div>
        <div id="market-discard" class="pile-container"></div>
    </div>
</div>

<div class="dale-horizontal-flex">
    <div id="dale-myhand-wrap" class="whiteblock dale-no-vertical-margin">
        <!-- <h3> {YOUR_HAND} </h3> -->
        <div class="dale-label dale-label-technique">{ACTION_LABEL_TECHNIQUE}</div>
        <div class="dale-label dale-label-purchase">{ACTION_LABEL_PURCHASE}</div>
        <div class="dale-label dale-label-build">{ACTION_LABEL_BUILD}</div>
        <div class="dale-label dale-label-discard">{ACTION_LABEL_DISCARD}</div>
        <div class="dale-label dale-label-text"></div>
        <div class="dale-label dale-label-default">{ACTION_LABEL_DEFAULT}</div>
        <div id="dale-myhand"></div>
    </div> 
    <div id="mytemporary-wrap" class="whiteblock dale-no-vertical-margin dale-left-margin">
        <h3> {CARD_CHOICE} </h3>
        <div id="mytemporary"></div>
    </div>
</div> 

<!-- BEGIN stall -->
<div class="whiteblock">
    <h3><span style="color:#{PLAYER_COLOR};">{PLAYER_NAME_POSSESSIVE}</span> {PLAY_AREA} </h3>
    <div class="dale-horizontal-flex">
        <div id="deck-{PLAYER_ID}" class="pile-container"></div>
        <div id="discard-{PLAYER_ID}" class="pile-container"></div>
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

var jstpl_hand_size = '<span id="handsize-${player.id}">0</span><i id="dale-myhandsize-icon-${player.id}" class="dale-myhandsize-icon"></i>';

</script>

{OVERALL_GAME_FOOTER}
