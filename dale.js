var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("components/types/Animalfolk", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/Images", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Images = void 0;
    var Images = (function () {
        function Images() {
        }
        Images.getCardStyle = function (card_type_id) {
            var style = "width:".concat(Images.CARD_WIDTH_S, "px; height:").concat(Images.CARD_HEIGHT_S, "px;");
            if (card_type_id == null) {
                style += "background-size: ".concat(Images.CARD_WIDTH_S, "px ").concat(Images.CARD_HEIGHT_S, "px;");
            }
            else {
                style += "background-size: ".concat(Images.SHEET_WIDTH_S, "px ").concat(Images.SHEET_HEIGHT_S, "px;");
                if (card_type_id >= 0 && card_type_id < Images.IMAGES_PER_ROW * Images.IMAGES_PER_COLUMN) {
                    var x = card_type_id % Images.IMAGES_PER_ROW;
                    var y = (card_type_id - x) / Images.IMAGES_PER_ROW;
                    style += "background-position:-".concat(x, "00% -").concat(y, "00%");
                }
                else {
                    console.error("Card with type id ".concat(card_type_id, " does not exist!"));
                }
            }
            return style;
        };
        Images.getAnimalfolk = function (card_type_id) {
            if (card_type_id < Images.IMAGES_PER_ROW) {
                return null;
            }
            else if (card_type_id < 2 * Images.IMAGES_PER_ROW) {
                return "macaws";
            }
            else if (card_type_id < 3 * Images.IMAGES_PER_ROW) {
                return "pandas";
            }
            else if (card_type_id < 4 * Images.IMAGES_PER_ROW) {
                return "raccoons";
            }
            else if (card_type_id < 5 * Images.IMAGES_PER_ROW) {
                return "squirrels";
            }
            else if (card_type_id < 6 * Images.IMAGES_PER_ROW) {
                return "ocelots";
            }
            else if (card_type_id < 7 * Images.IMAGES_PER_ROW) {
                return "chameleons";
            }
            return null;
        };
        Images.IMAGES_PER_ROW = 7;
        Images.IMAGES_PER_COLUMN = 6;
        Images.SHEET_WIDTH = 2694;
        Images.SHEET_HEIGHT = 5112;
        Images.CARD_WIDTH = Images.SHEET_WIDTH / Images.IMAGES_PER_COLUMN;
        Images.CARD_HEIGHT = Images.SHEET_HEIGHT / Images.IMAGES_PER_ROW;
        Images.MARKET_PADDING_TOP = 153;
        Images.MARKET_PADDING_BOTTOM = 45;
        Images.MARKET_PADDING_LEFT = 45;
        Images.MARKET_PADDING_RIGHT = 45;
        Images.MARKET_ITEM_MARGIN = 95;
        Images.MARKET_WIDTH = 2717;
        Images.MARKET_HEIGHT = 906;
        Images.S_SCALE = 0.3;
        Images.SHEET_WIDTH_S = Images.S_SCALE * Images.SHEET_WIDTH;
        Images.SHEET_HEIGHT_S = Images.S_SCALE * Images.SHEET_HEIGHT;
        Images.CARD_WIDTH_S = Images.S_SCALE * Images.CARD_WIDTH;
        Images.CARD_HEIGHT_S = Images.S_SCALE * Images.CARD_HEIGHT;
        Images.MARKET_PADDING_TOP_S = Images.S_SCALE * Images.MARKET_PADDING_TOP;
        Images.MARKET_PADDING_BOTTOM_S = Images.S_SCALE * Images.MARKET_PADDING_BOTTOM;
        Images.MARKET_PADDING_LEFT_S = Images.S_SCALE * Images.MARKET_PADDING_LEFT;
        Images.MARKET_PADDING_RIGHT_S = Images.S_SCALE * Images.MARKET_PADDING_RIGHT;
        Images.MARKET_ITEM_MARGIN_S = Images.S_SCALE * Images.MARKET_ITEM_MARGIN;
        Images.MARKET_WIDTH_S = Images.S_SCALE * Images.MARKET_WIDTH;
        Images.MARKET_HEIGHT_S = Images.S_SCALE * Images.MARKET_HEIGHT;
        return Images;
    }());
    exports.Images = Images;
});
define("components/types/DbCard", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/Pile", ["require", "exports", "components/Images"], function (require, exports, Images_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pile = void 0;
    var Pile = (function () {
        function Pile(page, pile_container_id, pile_name) {
            $(pile_container_id).innerHTML = "\n            ".concat(pile_name ? "<h4 class=\"name\">".concat(pile_name, "</h4>") : "", "\n            <div class=\"pile\" style=\"").concat(Images_1.Images.getCardStyle(), "\">\n                <div class=\"pile-placeholder\" style=\"").concat(Images_1.Images.getCardStyle(), "\"></div>\n                <div class=\"pile-card\"></div>\n                <div class=\"size\"></div>\n            </div>\n        ");
            this.page = page;
            this.containerHTML = $(pile_container_id);
            this.placeholderHTML = $(pile_container_id).querySelector('.pile-placeholder');
            this.topCardHTML = $(pile_container_id).querySelector('.pile-card');
            this.sizeHTML = $(pile_container_id).querySelector('.size');
            this.cards = [];
            this.updateHTML();
        }
        Pile.prototype.updateHTML = function () {
            this.sizeHTML.innerText = 'x ' + this.cards.length;
            if (this.cards.length == 0) {
                this.topCardHTML.setAttribute('style', "display: none");
            }
            else {
                this.topCardHTML.setAttribute('style', Images_1.Images.getCardStyle(this.peek().type_arg));
            }
        };
        Pile.prototype.pushHiddenCards = function (amount) {
            for (var i = 0; i < amount; i++) {
                this.cards.push(Pile.HIDDEN_CARD);
            }
            this.updateHTML();
        };
        Pile.prototype.push = function (card) {
            this.cards.push(card);
            this.updateHTML();
        };
        Pile.prototype.pop = function (to, onEnd, duration, delay) {
            if (duration === void 0) { duration = 500; }
            if (delay === void 0) { delay = 0; }
            if (this.cards.length == 0) {
                throw new Error('Cannot draw from an empty pile. The Server is responsible for reshuffling.');
            }
            if (to != null) {
                if (to instanceof Pile) {
                    to = to.placeholderHTML;
                }
                var movingElement = this.topCardHTML.cloneNode();
                this.topCardHTML.insertAdjacentElement('afterend', movingElement);
                var callback = function (node) {
                    dojo.destroy(node);
                    if (onEnd) {
                        onEnd(node);
                    }
                };
                var slideAnimation = this.page.slideToObject(movingElement, to, duration, delay);
                ;
                var fadeAnimation = dojo.fadeOut({ node: movingElement, end: callback });
                dojo.fx.chain([slideAnimation, fadeAnimation]).play();
                dojo.addClass(movingElement, 'to_be_destroyed');
            }
            this.cards.pop();
            this.updateHTML();
        };
        Pile.prototype.shuffleToDrawPile = function (drawPile, duration) {
            if (duration === void 0) { duration = 1000; }
            if (this === drawPile) {
                throw new Error('Cannot shuffle to self.');
            }
            var n = this.cards.length;
            var durationPerPop = 2 * duration / n;
            var thiz = this;
            var callback = function (node) {
                if (thiz.cards.length > 0) {
                    thiz.pop(drawPile, callback, durationPerPop);
                }
                drawPile.pushHiddenCards(1);
            };
            if (n > 10) {
                durationPerPop *= 4;
                this.pop(drawPile, callback, durationPerPop);
                this.pop(drawPile, callback, durationPerPop, durationPerPop * 1 / 4);
                this.pop(drawPile, callback, durationPerPop, durationPerPop * 2 / 4);
                this.pop(drawPile, callback, durationPerPop, durationPerPop * 3 / 4);
            }
            else if (n > 5) {
                durationPerPop *= 2;
                this.pop(drawPile, callback, durationPerPop);
                this.pop(drawPile, callback, durationPerPop, durationPerPop * 1 / 4);
            }
            else {
                this.pop(drawPile, callback, durationPerPop);
            }
        };
        Pile.prototype.peek = function () {
            if (this.cards.length == 0) {
                throw new Error('Cannot peek at an empty Pile.');
            }
            return this.cards[this.cards.length - 1];
        };
        Pile.HIDDEN_CARD = {
            id: 0,
            type: "",
            type_arg: 0,
            location: "",
            location_arg: 0
        };
        return Pile;
    }());
    exports.Pile = Pile;
});
define("bgagame/dale", ["require", "exports", "ebg/core/gamegui", "components/Images", "components/Pile", "ebg/counter", "ebg/stock"], function (require, exports, Gamegui, Images_2, Pile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dale = (function (_super) {
        __extends(Dale, _super);
        function Dale() {
            var _this = _super.call(this) || this;
            _this.marketDeck = null;
            _this.marketDiscard = null;
            _this.market = new ebg.stock();
            _this.hand = new ebg.stock();
            console.log('dale constructor');
            return _this;
        }
        Dale.prototype.setup = function (gamedatas) {
            var _a;
            console.log("Starting game setup");
            console.log("------ GAME DATAS ------");
            console.log(this.gamedatas);
            console.log("------------------------");
            for (var player_id in gamedatas.players) {
                var player = gamedatas.players[player_id];
            }
            this.market.create(this, $('market'), Images_2.Images.CARD_WIDTH, Images_2.Images.CARD_HEIGHT);
            this.market.resizeItems(Images_2.Images.CARD_WIDTH_S, Images_2.Images.CARD_HEIGHT_S, Images_2.Images.SHEET_WIDTH_S, Images_2.Images.SHEET_HEIGHT_S);
            this.market.image_items_per_row = 6;
            this.market.item_margin = Images_2.Images.MARKET_ITEM_MARGIN_S;
            (_a = $('market-background')) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "\n\t\t\tbackground-size: ".concat(Images_2.Images.MARKET_WIDTH_S, "px ").concat(Images_2.Images.MARKET_HEIGHT_S, "px;\n\t\t\tpadding-top: ").concat(Images_2.Images.MARKET_PADDING_TOP_S, "px;\n\t\t\tpadding-left: ").concat(Images_2.Images.MARKET_PADDING_LEFT_S, "px;\n\t\t"));
            this.marketDeck = new Pile_1.Pile(this, 'marketdeck', 'Market Deck');
            this.marketDiscard = new Pile_1.Pile(this, 'marketdiscard', 'Market Discard');
            for (var _i = 0, _b = gamedatas.market; _i < _b.length; _i++) {
                var card_1 = _b[_i];
                this.market.addToStockWithId(card_1.id, card_1.type_arg);
            }
            this.marketDeck.pushHiddenCards(gamedatas.marketDeckSize);
            for (var i_1 in gamedatas.marketDiscard) {
                var card = gamedatas.marketDiscard[i_1];
                this.marketDiscard.push(card);
            }
            this.hand.create(this, $('myhand'), Images_2.Images.CARD_WIDTH, Images_2.Images.CARD_HEIGHT);
            this.hand.resizeItems(Images_2.Images.CARD_WIDTH_S, Images_2.Images.CARD_HEIGHT_S, Images_2.Images.SHEET_WIDTH_S, Images_2.Images.SHEET_HEIGHT_S);
            this.hand.image_items_per_row = Images_2.Images.IMAGES_PER_ROW;
            for (var i = 0; i < 100; i++) {
                var card_type_id = i;
                this.market.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/cards.jpg', card_type_id);
                this.hand.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/cards.jpg', card_type_id);
            }
            this.market.addToStockWithId(1, 1);
            this.market.addToStockWithId(2, 2);
            this.market.addToStockWithId(3, 3);
            this.market.addToStockWithId(4, 4);
            this.market.addToStockWithId(5, 5);
            this.hand.addToStockWithId(1, 6);
            this.hand.addToStockWithId(1, 7);
            this.setupNotifications();
            console.log("Ending game setup");
        };
        Dale.prototype.onEnteringState = function (stateName, args) {
            console.log('Entering state: ' + stateName);
            switch (stateName) {
                case 'dummmy':
                    break;
            }
        };
        Dale.prototype.onLeavingState = function (stateName) {
            console.log('Leaving state: ' + stateName);
            switch (stateName) {
                case 'dummmy':
                    break;
            }
        };
        Dale.prototype.onUpdateActionButtons = function (stateName, args) {
            console.log('onUpdateActionButtons: ' + stateName, args);
            if (!this.isCurrentPlayerActive())
                return;
            switch (stateName) {
                case 'dummmy':
                    break;
            }
        };
        Dale.prototype.setupNotifications = function () {
            var _this = this;
            console.log('notifications subscriptions setup2');
            var notifs = [
                ['debugClient', 1],
                ['reshuffleMarketDeck', 1]
            ];
            notifs.forEach(function (notif) {
                dojo.subscribe(notif[0], _this, "notif_".concat(notif[0]));
                _this.notifqueue.setSynchronous(notif[0], notif[1]);
            });
            console.log('notifications subscriptions setup done');
        };
        Dale.prototype.notif_debugClient = function (notif) {
            var _a, _b;
            if (notif.args.index == 0) {
                (_a = this.marketDeck) === null || _a === void 0 ? void 0 : _a.shuffleToDrawPile(this.marketDiscard);
            }
            if (notif.args.index == 1) {
                (_b = this.marketDiscard) === null || _b === void 0 ? void 0 : _b.shuffleToDrawPile(this.marketDeck);
            }
        };
        Dale.prototype.notif_reshuffleMarketDeck = function (notif) {
            var _a;
            (_a = this.marketDiscard) === null || _a === void 0 ? void 0 : _a.shuffleToDrawPile(this.marketDeck);
        };
        return Dale;
    }(Gamegui));
    dojo.setObject("bgagame.dale", Dale);
});
