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
    <!-- Filter HTML by Sami Laakso -->
    <div class="daleofmerchants-filters">
        <button class="reset-filters" id="daleofmerchants-filter-title-reset-filters"> {RESET_FILTERS}</button>
        <h2>{FILTER_DECKS}</h2>
        <div class="filter">
            <h3 id="daleofmerchants-filter-title-complexity"> {COMPLEXITY}</h3>
            <div class="toggle-holder">
            <span data-filter="complexity: 0" class="toggle">{NONE}</span>
            <span data-filter="complexity: 1" class="toggle">{LOW}</span>
            <span data-filter="complexity: 2" class="toggle">{MEDIUM}</span>
            <span data-filter="complexity: 3" class="toggle">{HIGH}</span>
            <span data-filter="complexity: -1" class="toggle chosen">{ALL_DECKS}</span>
            </div>
        </div>
        <div class="filter">
            <h3 id="daleofmerchants-filter-title-interactivity"> {INTERACTIVITY}</h3>
            <div class="toggle-holder">
            <span data-filter="interactivity: 0" class="toggle">{NONE}</span>
            <span data-filter="interactivity: 1" class="toggle">{LOW}</span>
            <span data-filter="interactivity: 2" class="toggle">{MEDIUM}</span>
            <span data-filter="interactivity: 3" class="toggle">{HIGH}</span>
            <span data-filter="interactivity: -1" class="toggle chosen">{ALL_DECKS}</span>
            </div>
        </div>
        <div class="filter">
            <h3 id="daleofmerchants-filter-title-nastiness"> {NASTINESS}</h3>
            <div class="toggle-holder">
            <span data-filter="nastiness: 0" class="toggle">{NONE}</span>
            <span data-filter="nastiness: 1" class="toggle">{LOW}</span>
            <span data-filter="nastiness: 2" class="toggle">{MEDIUM}</span>
            <span data-filter="nastiness: 3" class="toggle">{HIGH}</span>
            <span data-filter="nastiness: -1" class="toggle chosen">{ALL_DECKS}</span>
            </div>
        </div>
        <div class="filter">
            <h3 id="daleofmerchants-filter-title-randomness"> {RANDOMNESS}</h3>
            <div class="toggle-holder">
            <span data-filter="randomness: 0" class="toggle">{NONE}</span>
            <span data-filter="randomness: 1" class="toggle">{LOW}</span>
            <span data-filter="randomness: 2" class="toggle">{MEDIUM}</span>
            <span data-filter="randomness: 3" class="toggle">{HIGH}</span>
            <span data-filter="randomness: -1" class="toggle chosen">{ALL_DECKS}</span>
            </div>
        </div>
        <div class="filter">
            <h3 id="daleofmerchants-filter-title-game"> {GAME}</h3>
            <div class="toggle-holder">
            <span data-filter="game: 1" class="toggle">1</span>
            <span data-filter="game: 2" class="toggle">2</span>
            <span data-filter="game: 3" class="toggle">3</span>
            <span data-filter="game: 4" class="toggle">4</span>
            <span data-filter="game: 5" class="toggle">5</span>
            <span data-filter="game: 6" class="toggle">6</span>
            <span data-filter="game: -1" class="toggle chosen">{ALL_GAMES}</span>
            </div>
        </div>
    </div>
    <!-- deck portaits go inside this container -->
    <div class="daleofmerchants-deck-selection-container"></div>
</div>

<div id="daleofmerchants-page-game">
    <div id="daleofmerchants-market-wrap" class="whiteblock">
        <!-- Display the name of this area? <h3>{MARKET}</h3> -->
        <div style="display:flex; align-items: center; justify-content: space-evenly;">
            <div id="daleofmerchants-market-deck" class="daleofmerchants-pile-container"></div>
            <div id="daleofmerchants-market-board-background">
                <div id="daleofmerchants-market-board" class="daleofmerchants-stall-container"></div>
            </div>
            <div id="daleofmerchants-market-discard" class="daleofmerchants-pile-container"></div>
        </div>
    </div>

    <div id="daleofmerchants-hand-limbo-flex" class="daleofmerchants-horizontal-flex">
        <div id="daleofmerchants-myhand-wrap" class="whiteblock daleofmerchants-arc-stock daleofmerchants-no-bottom-margin">
            <div class="daleofmerchants-label"></div>
            <div id="daleofmerchants-myhand"></div>
        </div> 
        <div id="daleofmerchants-mylimbo-wrap" class="whiteblock daleofmerchants-arc-stock daleofmerchants-no-bottom-margin daleofmerchants-left-margin">
            <div class="daleofmerchants-label"></div>
            <div id="daleofmerchants-mylimbo"></div>
        </div>
    </div> 

    <div class = "daleofmerchants-play-area-container">
        <!-- BEGIN stall -->
        <div id="daleofmerchants-play-area-{PLAYER_ID}" class="daleofmerchants-play-area whiteblock">
            <span id="daleofmerchants-token-area-{PLAYER_ID}" class="daleofmerchants-token-area">
                <!-- only needed for coin-based animalfolk -->
                <span id="daleofmerchants-coins-wrap-{PLAYER_ID}" class="daleofmerchants-coins-wrap daleofmerchants-wrap-default daleofmerchants-hidden" >
                    <span class="daleofmerchants-label daleofmerchants-spending" >
                        Label
                    </span>
                    <span class="daleofmerchants-coins-to-spend-counter daleofmerchants-spending" style="font-size: x-large;">
                        0
                    </span>
                    <span class="daleofmerchants-spending" style="font-size: x-large;">
                        /
                    </span>
                    <span class="daleofmerchants-coins-counter" style="font-size: x-large;">
                        0
                    </span>
                </span>
                <!-- only needed for clock-based animalfolk -->
                <span id="daleofmerchants-clock-wrap-{PLAYER_ID}" class="daleofmerchants-clock-wrap daleofmerchants-hidden" >
                    <span id="daleofmerchants-clock-label-{PLAYER_ID}" class="daleofmerchants-clock-label">Clock</span>
                </span>
            </span>
            <h3 class="daleofmerchants-play-area-title"><span style="color:#{PLAYER_COLOR};">{PLAYER_NAME_POSSESSIVE}</span> {PLAY_AREA} </h3>
            <div class="daleofmerchants-horizontal-flex">
                <div id="daleofmerchants-deck-{PLAYER_ID}" class="daleofmerchants-pile-container"></div>
                <div id="daleofmerchants-discard-{PLAYER_ID}" class="daleofmerchants-pile-container"></div>
                <div id="daleofmerchants-stall-wrap-landscape-{PLAYER_ID}" class="daleofmerchants-stall-wrap">
                    <h3 class="daleofmerchants-component-name"> {STALL} </h3>
                    <div id="daleofmerchants-stall-{PLAYER_ID}" class="daleofmerchants-stall-container"></div>
                </div>
                <div id="daleofmerchants-schedule-wrap-{PLAYER_ID}" class="daleofmerchants-flat-stock daleofmerchants-schedule">
                    <div class="daleofmerchants-hidden daleofmerchants-label"></div> <!-- not used, but exists so this component can be a proper daleStock -->
                    <h3 class="daleofmerchants-component-name"> {SCHEDULE} </h3>
                    <div id="daleofmerchants-schedule-{PLAYER_ID}"></div>
                </div>
                <!-- only needed for the tree kangaroos -->
                <div id="daleofmerchants-stored-cards-wrap-{PLAYER_ID}" class="daleofmerchants-flat-stock daleofmerchants-stored-cards daleofmerchants-hidden">
                    <div class="daleofmerchants-hidden daleofmerchants-label"></div> <!-- not used, but exists so this component can be a proper daleStock -->
                    <h3 class="daleofmerchants-component-name"> {STORED_CARDS} </h3>
                    <div id="daleofmerchants-stored-cards-{PLAYER_ID}"></div>
                </div>
            </div>
            <div id="daleofmerchants-stall-wrap-portrait-{PLAYER_ID}" class="daleofmerchants-stall-wrap">
                <h3 class="daleofmerchants-component-name"> {STALL} </h3>
                <!-- on narrow screens, the stall will automatically be moved here -->
            </div>
            <br>
            
        </div>
        <!-- END stall -->
    </div>

    <!---------------------------->
    <!--       Debug Tools      -->
    <!---------------------------->
    <div class="daleofmerchants-debugtools daleofmerchants-hidden whiteblock"></div>
</div>



<script type="text/javascript">

// Javascript HTML templates
//var jstpl_hand_size = '<span id="handsize-${player.id}">0</span><i id="daleofmerchants-myhandsize-icon-${player.id}" class="daleofmerchants-myhandsize-icon"></i>';

</script>

{OVERALL_GAME_FOOTER}
