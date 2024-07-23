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
define("types/ImageConstants", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MARKET_HEIGHT_S = exports.MARKET_WIDTH_S = exports.MARKET_ITEM_MARGIN_S = exports.MARKET_PADDING_RIGHT_S = exports.MARKET_PADDING_LEFT_S = exports.MARKET_PADDING_BOTTOM_S = exports.MARKET_PADDING_TOP_S = exports.CARD_HEIGHT_S = exports.CARD_WIDTH_S = exports.SHEET_HEIGHT_S = exports.SHEET_WIDTH_S = exports.S_SCALE = exports.MARKET_HEIGHT = exports.MARKET_WIDTH = exports.MARKET_ITEM_MARGIN = exports.MARKET_PADDING_RIGHT = exports.MARKET_PADDING_LEFT = exports.MARKET_PADDING_BOTTOM = exports.MARKET_PADDING_TOP = exports.CARD_HEIGHT = exports.CARD_WIDTH = exports.SHEET_HEIGHT = exports.SHEET_WIDTH = exports.IMAGES_PER_COLUMN = exports.IMAGES_PER_ROW = void 0;
    exports.IMAGES_PER_ROW = 6;
    exports.IMAGES_PER_COLUMN = 6;
    exports.SHEET_WIDTH = 2694;
    exports.SHEET_HEIGHT = 4206;
    exports.CARD_WIDTH = exports.SHEET_WIDTH / exports.IMAGES_PER_COLUMN;
    exports.CARD_HEIGHT = exports.SHEET_HEIGHT / exports.IMAGES_PER_ROW;
    exports.MARKET_PADDING_TOP = 153;
    exports.MARKET_PADDING_BOTTOM = 45;
    exports.MARKET_PADDING_LEFT = 45;
    exports.MARKET_PADDING_RIGHT = 45;
    exports.MARKET_ITEM_MARGIN = 95;
    exports.MARKET_WIDTH = 2717;
    exports.MARKET_HEIGHT = 906;
    exports.S_SCALE = 0.37;
    exports.SHEET_WIDTH_S = exports.S_SCALE * exports.SHEET_WIDTH;
    exports.SHEET_HEIGHT_S = exports.S_SCALE * exports.SHEET_HEIGHT;
    exports.CARD_WIDTH_S = exports.S_SCALE * exports.CARD_WIDTH;
    exports.CARD_HEIGHT_S = exports.S_SCALE * exports.CARD_HEIGHT;
    exports.MARKET_PADDING_TOP_S = exports.S_SCALE * exports.MARKET_PADDING_TOP;
    exports.MARKET_PADDING_BOTTOM_S = exports.S_SCALE * exports.MARKET_PADDING_BOTTOM;
    exports.MARKET_PADDING_LEFT_S = exports.S_SCALE * exports.MARKET_PADDING_LEFT;
    exports.MARKET_PADDING_RIGHT_S = exports.S_SCALE * exports.MARKET_PADDING_RIGHT;
    exports.MARKET_ITEM_MARGIN_S = exports.S_SCALE * exports.MARKET_ITEM_MARGIN;
    exports.MARKET_WIDTH_S = exports.S_SCALE * exports.MARKET_WIDTH;
    exports.MARKET_HEIGHT_S = exports.S_SCALE * exports.MARKET_HEIGHT;
});
define("bgagame/dale", ["require", "exports", "ebg/core/gamegui", "types/ImageConstants", "ebg/counter", "ebg/stock"], function (require, exports, Gamegui, ImageConstants) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dale = (function (_super) {
        __extends(Dale, _super);
        function Dale() {
            var _this = _super.call(this) || this;
            _this.market = new ebg.stock();
            _this.hand = new ebg.stock();
            console.log('dale constructor');
            return _this;
        }
        Dale.prototype.setup = function (gamedatas) {
            var _a;
            console.log("Starting game setup");
            for (var player_id in gamedatas.players) {
                var player = gamedatas.players[player_id];
            }
            this.market.create(this, $('market'), ImageConstants.CARD_WIDTH, ImageConstants.CARD_HEIGHT);
            this.market.resizeItems(ImageConstants.CARD_WIDTH_S, ImageConstants.CARD_HEIGHT_S, ImageConstants.SHEET_WIDTH_S, ImageConstants.SHEET_HEIGHT_S);
            this.market.image_items_per_row = 6;
            this.market.item_margin = ImageConstants.MARKET_ITEM_MARGIN_S;
            console.log($('market'));
            (_a = $('market_background')) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "\n\t\t\tbackground-size: ".concat(ImageConstants.MARKET_WIDTH_S, "px ").concat(ImageConstants.MARKET_HEIGHT_S, "px;\n\t\t\tpadding-top: ").concat(ImageConstants.MARKET_PADDING_TOP_S, "px;\n\t\t\tpadding-left: ").concat(ImageConstants.MARKET_PADDING_LEFT_S, "px;\n\t\t"));
            this.hand.create(this, $('myhand'), ImageConstants.CARD_WIDTH, ImageConstants.CARD_HEIGHT);
            this.hand.resizeItems(ImageConstants.CARD_WIDTH_S, ImageConstants.CARD_HEIGHT_S, ImageConstants.SHEET_WIDTH_S, ImageConstants.SHEET_HEIGHT_S);
            this.hand.image_items_per_row = 6;
            for (var i = 0; i < 100; i++) {
                var card_type_id = i;
                this.market.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/cards_1.jpg', card_type_id);
                this.hand.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/cards_1.jpg', card_type_id);
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
                ['reshuffle', 1]
            ];
            notifs.forEach(function (notif) {
                dojo.subscribe(notif[0], _this, "notif_".concat(notif[0]));
                _this.notifqueue.setSynchronous(notif[0], notif[1]);
            });
            console.log('notifications subscriptions setup done');
        };
        Dale.prototype.notif_reshuffle = function (notif) {
            console.log("notif_reshuffle");
        };
        return Dale;
    }(Gamegui));
    dojo.setObject("bgagame.dale", Dale);
});
