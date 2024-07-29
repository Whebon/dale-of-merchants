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
                    style += "background-position:-".concat(x, "00% -").concat(y, "00%;");
                    style += "z-index: ".concat(card_type_id == 0 ? Images.Z_INDEX_CARDBACK : Images.Z_INDEX_CARDFRONT, ";");
                }
                else {
                    console.error("Card with type id ".concat(card_type_id, " does not exist!"));
                }
            }
            return style;
        };
        Images.IMAGES_PER_ROW = 6;
        Images.IMAGES_PER_COLUMN = 7;
        Images.SHEET_WIDTH = 2694;
        Images.SHEET_HEIGHT = 4907;
        Images.CARD_WIDTH = Images.SHEET_WIDTH / Images.IMAGES_PER_ROW;
        Images.CARD_HEIGHT = Images.SHEET_HEIGHT / Images.IMAGES_PER_COLUMN;
        Images.MARKET_PADDING_TOP = 156;
        Images.MARKET_PADDING_BOTTOM = 42;
        Images.MARKET_PADDING_LEFT = 45;
        Images.MARKET_PADDING_RIGHT = 45;
        Images.MARKET_ITEM_MARGIN = 95;
        Images.MARKET_WIDTH = 2717;
        Images.MARKET_HEIGHT = 906;
        Images.Z_INDEX_CARDBACK = 4;
        Images.Z_INDEX_CARDFRONT = 5;
        Images.S_SCALE = 0.28;
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
define("components/types/CardType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/types/DbCard", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/DaleCard", ["require", "exports", "components/Images"], function (require, exports, Images_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleCard = void 0;
    var DaleCard = (function () {
        function DaleCard(id, type_id) {
            id = +id;
            this.id = id;
            if (type_id != undefined) {
                var prev_type_id = DaleCard.cardIdtoTypeId.get(id);
                if (prev_type_id == undefined) {
                    DaleCard.cardIdtoTypeId.set(id, +type_id);
                }
                else if (prev_type_id != type_id) {
                    throw new Error("Card id ".concat(id, " with type_id ").concat(prev_type_id, " cannot be set to a different type_id ").concat(type_id, "."));
                }
            }
            else if (!DaleCard.cardIdtoTypeId.has(id)) {
                console.log("cardIdtoTypeId");
                console.log(DaleCard.cardIdtoTypeId);
                throw new Error("The type_id of card_id ".concat(id, " is unknown. Therefore, a card with id ").concat(id, " cannot be instantiated."));
            }
        }
        DaleCard.init = function (cardTypes) {
            if (DaleCard.cardTypes) {
                throw new Error("Card types are only be initialized once");
            }
            DaleCard.cardTypes = Object.values(cardTypes);
        };
        Object.defineProperty(DaleCard.prototype, "type_id", {
            get: function () {
                var _type_id = DaleCard.cardIdtoTypeId.get(this.id);
                if (_type_id == undefined) {
                    console.warn("id ".concat(this.id, " does not have a corresponding type_id"));
                    return 0;
                }
                return _type_id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "name", {
            get: function () {
                return DaleCard.cardTypes[this.type_id].name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "text", {
            get: function () {
                return DaleCard.cardTypes[this.type_id].text;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "value", {
            get: function () {
                return DaleCard.cardTypes[this.type_id].value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "animalfolk", {
            get: function () {
                return DaleCard.cardTypes[this.type_id].animalfolk;
            },
            enumerable: false,
            configurable: true
        });
        DaleCard.prototype.toDiv = function () {
            var div = document.createElement("div");
            div.classList.add("card");
            div.setAttribute('style', Images_1.Images.getCardStyle(this.type_id));
            return div;
        };
        DaleCard.of = function (card) {
            return new DaleCard(card.id, card.type_arg);
        };
        DaleCard.cardIdtoTypeId = new Map();
        return DaleCard;
    }());
    exports.DaleCard = DaleCard;
});
define("components/DaleStock", ["require", "exports", "ebg/stock", "ebg/stock"], function (require, exports, Stock) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleStock = void 0;
    var DaleStock = (function (_super) {
        __extends(DaleStock, _super);
        function DaleStock() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DaleStock.prototype.addDaleCardToStock = function (card, from) {
            this.addToStockWithId(card.type_id, card.id, from);
        };
        DaleStock.prototype.removeFromStockByIdNoAnimation = function (id) {
            var stock = this;
            for (var i in stock.items) {
                var item = stock.items[i];
                if (item.id == id) {
                    var item_1 = stock.items[i];
                    if (stock.onItemDelete) {
                        stock.onItemDelete(stock.getItemDivId(item_1.id), item_1.type, item_1.id);
                    }
                    stock.items.splice(i, 1);
                    var item_id = stock.getItemDivId(item_1.id);
                    stock.unselectItem(item_1.id);
                    var item_div = $(item_id);
                    dojo.destroy(item_div);
                    stock.updateDisplay();
                    return true;
                }
            }
            return false;
        };
        return DaleStock;
    }(Stock));
    exports.DaleStock = DaleStock;
});
define("components/Pile", ["require", "exports", "components/Images", "components/DaleCard"], function (require, exports, Images_2, DaleCard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pile = void 0;
    var Pile = (function () {
        function Pile(page, pile_container_id, pile_name) {
            $(pile_container_id).innerHTML = "\n            ".concat(pile_name ? "<h3 class=\"name\">".concat(pile_name, "</h3>") : "", "\n            <div class=\"pile\" style=\"").concat(Images_2.Images.getCardStyle(), "\">\n                <div class=\"placeholder\" style=\"").concat(Images_2.Images.getCardStyle(), "\"></div>\n                <div class=\"card\"></div>\n                <div class=\"size\"></div>\n            </div>\n        ");
            this.page = page;
            this.containerHTML = $(pile_container_id);
            this.placeholderHTML = $(pile_container_id).querySelector('.placeholder');
            this.topCardHTML = $(pile_container_id).querySelector('.card');
            this.sizeHTML = $(pile_container_id).querySelector('.size');
            this.cards = [];
            this._slidingCards = [];
            this.updateHTML();
        }
        Pile.prototype.updateHTML = function () {
            this.sizeHTML.innerText = 'x ' + this.cards.length;
            var topCard = this.peek(true);
            if (topCard == undefined) {
                this.topCardHTML.setAttribute('style', "display: none");
            }
            else {
                this.topCardHTML.setAttribute('style', Images_2.Images.getCardStyle(topCard.type_id));
            }
        };
        Pile.prototype.pushHiddenCards = function (amount) {
            for (var i = 0; i < amount; i++) {
                this.cards.push(new DaleCard_1.DaleCard(0, 0));
            }
            this.updateHTML();
        };
        Pile.prototype.push = function (card, from, onEnd, duration, delay) {
            this.cards.push(card);
            if (from != null) {
                this._slidingCards.push(card);
                var slidingElement = card.toDiv();
                this.topCardHTML.insertAdjacentElement('afterend', slidingElement);
                var thiz_1 = this;
                var callback = function (node) {
                    dojo.destroy(node);
                    var i = thiz_1._slidingCards.indexOf(card);
                    if (i > -1) {
                        thiz_1._slidingCards.splice(i, 1);
                    }
                    thiz_1.updateHTML();
                    if (onEnd) {
                        onEnd(node);
                    }
                };
                this.page.placeOnObject(slidingElement, from);
                var slideAnimation = this.page.slideToObject(slidingElement, this.placeholderHTML, duration, delay);
                var fadeAnimation = dojo.fadeOut({ node: slidingElement, end: callback });
                dojo.fx.chain([slideAnimation, fadeAnimation]).play();
                dojo.addClass(slidingElement, 'to_be_destroyed');
            }
            this.updateHTML();
        };
        Pile.prototype.pop = function (to, onEnd, duration, delay) {
            if (this.cards.length == 0) {
                throw new Error('Cannot draw from an empty pile. The Server is responsible for reshuffling.');
            }
            if (to != null) {
                if (to instanceof Pile) {
                    to = to.placeholderHTML;
                }
                var slidingElement = this.topCardHTML.cloneNode();
                this.topCardHTML.insertAdjacentElement('afterend', slidingElement);
                var callback = function (node) {
                    dojo.destroy(node);
                    if (onEnd) {
                        onEnd(node);
                    }
                };
                var slideAnimation = this.page.slideToObject(slidingElement, to, duration, delay);
                var fadeAnimation = dojo.fadeOut({ node: slidingElement, end: callback });
                dojo.fx.chain([slideAnimation, fadeAnimation]).play();
                dojo.addClass(slidingElement, 'to_be_destroyed');
            }
            var card = this.cards.pop();
            this.updateHTML();
            return card;
        };
        Pile.prototype.shuffleToDrawPile = function (drawPile, duration) {
            if (duration === void 0) { duration = 1000; }
            if (this.cards.length == 0) {
                return;
            }
            if (this === drawPile) {
                throw new Error('Cannot shuffle to self.');
            }
            var n = this.cards.length;
            var durationPerPop = duration / n;
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
        Pile.prototype.peek = function (exclude_sliding_cards) {
            if (exclude_sliding_cards === void 0) { exclude_sliding_cards = false; }
            if (this.cards.length == 0) {
                return undefined;
            }
            var i = this.cards.length - 1;
            if (exclude_sliding_cards) {
                while (i >= 0 && this._slidingCards.indexOf(this.cards[i]) != -1) {
                    i--;
                }
                if (i == -1) {
                    return undefined;
                }
            }
            return this.cards[i];
        };
        return Pile;
    }());
    exports.Pile = Pile;
});
define("components/CardSlot", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CardSlot = void 0;
    var CardSlot = (function () {
        function CardSlot(parent, pos, container, card) {
            this.parent = parent;
            this.pos = pos;
            this.selected = false;
            this._container = container !== null && container !== void 0 ? container : document.createElement("div");
            this._card = card;
            if (this._container.onclick != null) {
                console.warn("CardSlot is given a container that already has an onclick handler. This handler will may be overwritten.");
            }
        }
        Object.defineProperty(CardSlot.prototype, "id", {
            get: function () {
                if (this._container.id == "") {
                    this._container.id = "card-slot-id-" + CardSlot.UNIQUE_ID++;
                }
                return this._container.id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CardSlot.prototype, "card", {
            get: function () {
                return this._card;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CardSlot.prototype, "card_div", {
            get: function () {
                if (!this.hasCard()) {
                    throw new Error("An empty slot has no card");
                }
                return this._container.firstChild;
            },
            enumerable: false,
            configurable: true
        });
        CardSlot.prototype.hasCard = function () {
            return this._card != undefined;
        };
        CardSlot.prototype.insertCard = function (card) {
            this.removeCard();
            this._container.appendChild(card.toDiv());
            this._card = card;
        };
        CardSlot.prototype.removeCard = function () {
            if (this.hasCard()) {
                var removedCard = this._card;
                this._container.replaceChildren();
                this._card = undefined;
                return removedCard;
            }
            return undefined;
        };
        CardSlot.prototype.setSelected = function (enable) {
            if (this.selected == enable)
                return;
            if (enable) {
                this._container.classList.add("card-slot-selected");
            }
            else {
                this._container.classList.remove("card-slot-selected");
            }
            this.selected = enable;
        };
        CardSlot.prototype.setClickable = function (enable) {
            if (enable) {
                var thiz_2 = this;
                this._container.onclick = function () {
                    thiz_2.parent.onCardSlotClick(thiz_2);
                };
                this._container.classList.add("clickable");
            }
            else {
                this._container.classList.remove("clickable");
                this._container.onclick = null;
            }
        };
        CardSlot.UNIQUE_ID = 0;
        return CardSlot;
    }());
    exports.CardSlot = CardSlot;
});
define("components/MarketBoard", ["require", "exports", "components/Images", "components/CardSlot"], function (require, exports, Images_3, CardSlot_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MarketBoard = void 0;
    var MarketBoard = (function () {
        function MarketBoard(page) {
            this.MAX_SIZE = 5;
            this.page = page;
            $("market-board-background").setAttribute("style", "\n            width: ".concat(Images_3.Images.MARKET_WIDTH_S - Images_3.Images.MARKET_PADDING_LEFT_S - Images_3.Images.MARKET_PADDING_RIGHT_S, "px;\n            height: ").concat(Images_3.Images.MARKET_HEIGHT_S - Images_3.Images.MARKET_PADDING_TOP_S - Images_3.Images.MARKET_PADDING_BOTTOM_S, "px;\n\t\t\tbackground-size: ").concat(Images_3.Images.MARKET_WIDTH_S, "px ").concat(Images_3.Images.MARKET_HEIGHT_S, "px;\n\t\t\tpadding-top: ").concat(Images_3.Images.MARKET_PADDING_TOP_S, "px;\n\t\t\tpadding-left: ").concat(Images_3.Images.MARKET_PADDING_LEFT_S, "px;\n            padding-bottom: ").concat(Images_3.Images.MARKET_PADDING_BOTTOM_S, "px;\n\t\t\tpadding-right: ").concat(Images_3.Images.MARKET_PADDING_RIGHT_S, "px;\n\t\t"));
            this.container = $("market-board-background").querySelector("#market-board");
            this.slots = [];
            for (var pos = this.MAX_SIZE - 1; pos >= 0; pos--) {
                var div = document.createElement("div");
                div.classList.add('grow');
                div.setAttribute('style', "".concat(Images_3.Images.getCardStyle(), ";\n                position: absolute;\n                left: ").concat(pos * (Images_3.Images.CARD_WIDTH_S + Images_3.Images.MARKET_ITEM_MARGIN_S), "px\n            "));
                this.container.appendChild(div);
                this.slots.push(new CardSlot_1.CardSlot(this, 4 - pos, div));
            }
            this.selectionMode = 0;
        }
        MarketBoard.prototype.insertCard = function (card, pos) {
            if (pos == undefined)
                pos = this.MAX_SIZE - 1;
            if (pos < 0 || pos >= this.MAX_SIZE) {
                console.warn("".concat(pos, " is an invalid market position."));
                pos = this.MAX_SIZE - 1;
            }
            this.slots[pos].insertCard(card);
        };
        MarketBoard.prototype.slideRight = function (duration, delay) {
            var emptyPos = 0;
            for (var pos = 0; pos < this.MAX_SIZE; pos++) {
                if (this.slots[pos].hasCard()) {
                    if (pos != emptyPos) {
                        console.log("".concat(pos, " slides to ").concat(emptyPos));
                        var card = this.slots[pos].removeCard();
                        this.slots[emptyPos].insertCard(card);
                        var target = this.slots[emptyPos].card_div;
                        var source = this.slots[pos].id;
                        var destination = this.slots[emptyPos].id;
                        this.page.placeOnObject(target, source);
                        this.page.slideToObject(target, destination, duration, delay).play();
                    }
                    emptyPos++;
                }
            }
        };
        MarketBoard.prototype.setSelectionMode = function (mode) {
            if (this.selectionMode == mode)
                return;
            this.unselectAll();
            this.selectionMode = mode;
            var clickable = mode != 0;
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.setClickable(clickable);
            }
        };
        MarketBoard.prototype.setSelected = function (pos, enable) {
            if (enable === void 0) { enable = true; }
            if (pos < 0 || pos >= 5) {
                console.error("select: Market position ".concat(pos, " does not exist, using position 0 instead"));
                pos = 0;
            }
            this.slots[pos].setSelected(enable);
        };
        MarketBoard.prototype.unselectAll = function () {
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.setSelected(false);
            }
        };
        MarketBoard.prototype.onCardSlotClick = function (slot) {
            if (slot.hasCard()) {
                this.page.onMarketCardClick(slot.card, slot.pos);
            }
            else {
                this.page.showMessage(_("This card is sold out!"), 'error');
            }
        };
        return MarketBoard;
    }());
    exports.MarketBoard = MarketBoard;
});
define("bgagame/dale", ["require", "exports", "ebg/core/gamegui", "components/DaleStock", "components/Images", "components/Pile", "components/DaleCard", "components/MarketBoard", "ebg/counter", "ebg/stock"], function (require, exports, Gamegui, DaleStock_1, Images_4, Pile_1, DaleCard_2, MarketBoard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dale = (function (_super) {
        __extends(Dale, _super);
        function Dale() {
            var _this = _super.call(this) || this;
            _this.marketDeck = new Pile_1.Pile(_this, 'market-deck', 'Market Deck');
            _this.marketDiscard = new Pile_1.Pile(_this, 'market-discard', 'Market Discard');
            _this.playerDecks = {};
            _this.playerDiscards = {};
            _this.market = null;
            _this.myHand = new DaleStock_1.DaleStock();
            _this.selectedCardIds = [];
            console.log('dale constructor');
            return _this;
        }
        Object.defineProperty(Dale.prototype, "myDeck", {
            get: function () {
                return this.playerDecks[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dale.prototype, "myDiscard", {
            get: function () {
                return this.playerDiscards[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
        Dale.prototype.setup = function (gamedatas) {
            console.log("Starting game setup");
            console.log("------ GAME DATAS ------");
            console.log(this.gamedatas);
            console.log("------------------------");
            for (var player_id in gamedatas.players) {
                var player = gamedatas.players[player_id];
                this.playerDecks[player_id] = new Pile_1.Pile(this, 'deck-' + player_id, 'Deck');
                this.playerDecks[player_id].pushHiddenCards(gamedatas.deckSizes[player_id]);
                this.playerDiscards[player_id] = new Pile_1.Pile(this, 'discard-' + player_id, 'Discard Pile');
                for (var i in gamedatas.discardPiles[player_id]) {
                    var card = gamedatas.discardPiles[player_id][+i];
                    this.playerDiscards[player_id].push(DaleCard_2.DaleCard.of(card));
                }
            }
            DaleCard_2.DaleCard.init(gamedatas.cardTypes);
            for (var i in gamedatas.cardTypes) {
                var type_id = gamedatas.cardTypes[i].type_id;
                this.myHand.addItemType(type_id, type_id, g_gamethemeurl + 'img/cards.jpg', type_id);
            }
            this.marketDeck.pushHiddenCards(gamedatas.deckSizes.market);
            for (var i in gamedatas.discardPiles.market) {
                var card = gamedatas.discardPiles.market[i];
                this.marketDiscard.push(DaleCard_2.DaleCard.of(card));
            }
            this.market = new MarketBoard_1.MarketBoard(this);
            for (var i in gamedatas.market) {
                var card = gamedatas.market[i];
                this.market.insertCard(DaleCard_2.DaleCard.of(card), +card.location_arg);
            }
            this.myHand.create(this, $('myhand'), Images_4.Images.CARD_WIDTH, Images_4.Images.CARD_HEIGHT);
            this.myHand.resizeItems(Images_4.Images.CARD_WIDTH_S, Images_4.Images.CARD_HEIGHT_S, Images_4.Images.SHEET_WIDTH_S, Images_4.Images.SHEET_HEIGHT_S);
            this.myHand.image_items_per_row = Images_4.Images.IMAGES_PER_ROW;
            for (var i in gamedatas.hand) {
                var card = gamedatas.hand[i];
                this.myHand.addDaleCardToStock(DaleCard_2.DaleCard.of(card));
            }
            dojo.connect(this.myHand, 'onChangeSelection', this, 'onHandSelectionChanged');
            this.setupNotifications();
            console.log("Ending game setup");
        };
        Dale.prototype.onEnteringState = function (stateName, args) {
            console.log('Entering state: ' + stateName);
            if (!this.isCurrentPlayerActive()) {
                this.market.setSelectionMode(0);
                this.myHand.setSelectionMode(0);
                return;
            }
            this.selectedCardIds = [];
            switch (stateName) {
                case 'playerTurn':
                    this.market.setSelectionMode(1);
                    this.myHand.setSelectionMode(1);
                    break;
                case 'purchase':
                    var purchaseArgs = args.args;
                    console.log(purchaseArgs);
                    this.myHand.setSelectionMode(2);
                    this.market.setSelected(purchaseArgs.pos, true);
                    break;
                case 'nextPlayer':
                    break;
                case 'inventory':
                    this.myHand.setSelectionMode(1);
                    break;
            }
        };
        Dale.prototype.onLeavingState = function (stateName) {
            console.log('Leaving state: ' + stateName);
            switch (stateName) {
                case 'playerTurn':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode(0);
                    break;
            }
        };
        Dale.prototype.onUpdateActionButtons = function (stateName, args) {
            console.log('onUpdateActionButtons: ' + stateName, args);
            if (!this.isCurrentPlayerActive())
                return;
            switch (stateName) {
                case 'playerTurn':
                    this.addActionButton("pass-button", _("Pass (inventory action)"), "onRequestInventoryAction");
                    break;
                case 'purchase':
                    this.addActionButton("confirm-button", _("Confirm Funds"), "onPurchase");
                    this.addActionButtonCancel();
                    break;
                case 'inventory':
                    this.addActionButton("pass-button", _("Done"), "onInventoryAction");
                    this.addActionButtonCancel();
                    break;
            }
        };
        Dale.prototype.handToPile = function (card_id, pile, assert_existence) {
            if (assert_existence === void 0) { assert_existence = true; }
            if ($('myhand_item_' + card_id)) {
                pile.push(new DaleCard_2.DaleCard(card_id), 'myhand_item_' + card_id);
                this.myHand.removeFromStockByIdNoAnimation(card_id);
            }
            else if (assert_existence) {
                throw new Error("Card ".concat(card_id, " does not exist in hand"));
            }
        };
        Dale.prototype.pileToHand = function (card_id, pile, assert_existence) {
            if (assert_existence === void 0) { assert_existence = true; }
            if (!(typeof card_id === 'number')) {
                card_id = card_id.id;
            }
            this.myHand.addDaleCardToStock(new DaleCard_2.DaleCard(card_id), pile.placeholderHTML);
            if (assert_existence && pile.pop().id != card_id) {
                throw new Error("Card ".concat(card_id, " was not found on top of the pile"));
            }
        };
        Dale.prototype.arrayToNumberList = function (array) {
            if (array.length == 0)
                return "";
            if (typeof array[0] !== "number") {
                array = array.map(function (item) { return item.id; });
            }
            return array.join(";");
        };
        Dale.prototype.addUndoButton = function () {
            var buttonId = "undo-selectedCardIds-button";
            if (!$(buttonId)) {
                var thiz_3 = this;
                var returnSelectedCardIdsToHand = function () {
                    var _a;
                    for (var i = thiz_3.selectedCardIds.length - 1; i >= 0; i--) {
                        var card_id = thiz_3.selectedCardIds[i];
                        thiz_3.pileToHand(card_id, thiz_3.myDiscard);
                    }
                    thiz_3.selectedCardIds = [];
                    (_a = $(buttonId)) === null || _a === void 0 ? void 0 : _a.remove();
                };
                this.addActionButton(buttonId, _("Undo"), returnSelectedCardIdsToHand, undefined, false, 'gray');
            }
        };
        Dale.prototype.addActionButtonCancel = function () {
            this.addActionButton("cancel-button", _("Cancel"), "onCancel", undefined, false, 'gray');
        };
        Dale.prototype.onMarketCardClick = function (card, pos) {
            if (pos < 0 || pos >= 5) {
                console.error("Market position ".concat(pos, " does not exist, using position 0 instead"));
                pos = 0;
            }
            switch (this.gamedatas.gamestate.name) {
                case 'playerTurn':
                    if (this.checkAction('actRequestMarketAction')) {
                        this.bgaPerformAction('actRequestMarketAction', {
                            market_card_id: card.id
                        });
                    }
                    break;
            }
        };
        Dale.prototype.onHandSelectionChanged = function () {
            var items = this.myHand.getSelectedItems();
            switch (this.gamedatas.gamestate.name) {
                case 'playerTurn':
                    if (items.length == 1) {
                        var card_id = items[0].id;
                        this.showMessage(_("actPlayCard: NOT IMPLEMENTED EXCEPTION"), 'error');
                    }
                    this.myHand.unselectAll();
                    break;
                case 'inventory':
                    if (items.length == 1) {
                        var card_id = items[0].id;
                        this.handToPile(card_id, this.myDiscard);
                        this.selectedCardIds.push(card_id);
                        this.addUndoButton();
                    }
                    this.myHand.unselectAll();
                    break;
                case null:
                    throw new Error("gamestate.name is null");
            }
        };
        Dale.prototype.onPurchase = function () {
            var items = this.myHand.getSelectedItems();
            if (this.checkAction('actPurchase')) {
                this.bgaPerformAction('actPurchase', {
                    funds_card_ids: this.arrayToNumberList(items)
                });
            }
        };
        Dale.prototype.onCancel = function () {
            if (this.checkAction('actCancel')) {
                this.bgaPerformAction('actCancel', {});
            }
        };
        Dale.prototype.onRequestInventoryAction = function () {
            if (this.checkAction('actRequestInventoryAction')) {
                this.bgaPerformAction('actRequestInventoryAction', {});
            }
        };
        Dale.prototype.onInventoryAction = function () {
            if (this.checkAction("actInventoryAction")) {
                console.log("Sending: actInventoryAction, with ids = ".concat(this.selectedCardIds.join(";")));
                this.bgaPerformAction('actInventoryAction', {
                    ids: this.arrayToNumberList(this.selectedCardIds)
                });
            }
        };
        Dale.prototype.setupNotifications = function () {
            var _this = this;
            console.log('notifications subscriptions setup2');
            var notifs = [
                ['draw', 100],
                ['obtainNewJunkInHand', 1],
                ['discard', 100],
                ['reshuffleDeck', 1500],
                ['debugClient', 1],
            ];
            notifs.forEach(function (notif) {
                dojo.subscribe(notif[0], _this, "notif_".concat(notif[0]));
                _this.notifqueue.setSynchronous(notif[0], notif[1]);
            });
            console.log('notifications subscriptions setup done');
        };
        Dale.prototype.notif_draw = function (notif) {
            var _a;
            if (notif.args._private) {
                for (var i in (_a = notif.args._private) === null || _a === void 0 ? void 0 : _a.cards) {
                    var card = notif.args._private.cards[i];
                    this.myHand.addDaleCardToStock(DaleCard_2.DaleCard.of(card), this.myDeck.placeholderHTML);
                    this.myDeck.pop();
                }
            }
            else {
                for (var i = 0; i < notif.args.nbr; i++) {
                    this.playerDecks[notif.args.player_id].pop();
                }
            }
        };
        Dale.prototype.notif_obtainNewJunkInHand = function (notif) {
            if (notif.args.player_id == this.player_id) {
                for (var i in notif.args.cards) {
                    var card = notif.args.cards[i];
                    this.myHand.addDaleCardToStock(DaleCard_2.DaleCard.of(card), 'overall_player_board_' + notif.args.player_id);
                }
            }
        };
        Dale.prototype.notif_discard = function (notif) {
            if (notif.args.player_id == this.player_id) {
                for (var _i = 0, _a = notif.args.card_ids; _i < _a.length; _i++) {
                    var id = _a[_i];
                    var card = notif.args.cards[id];
                    this.handToPile(card.id, this.myDiscard, false);
                }
            }
            else {
                var otherDiscard = this.playerDiscards[notif.args.player_id];
                var delay = 0;
                for (var _b = 0, _c = notif.args.card_ids; _b < _c.length; _b++) {
                    var id = _c[_b];
                    var card = notif.args.cards[id];
                    otherDiscard === null || otherDiscard === void 0 ? void 0 : otherDiscard.push(DaleCard_2.DaleCard.of(card), 'overall_player_board_' + notif.args.player_id, undefined, undefined, delay);
                    delay += 250;
                }
            }
        };
        Dale.prototype.notif_reshuffleDeck = function (notif) {
            if (notif.args.player_id == null) {
                this.marketDiscard.shuffleToDrawPile(this.marketDeck);
            }
            else {
                this.playerDiscards[notif.args.player_id].shuffleToDrawPile(this.playerDecks[notif.args.player_id]);
            }
        };
        Dale.prototype.notif_debugClient = function (notif) {
            var arg = notif.args.arg;
            console.log("Debug with argument ".concat(arg));
            if (arg == 'log') {
                console.log("RECEIVED A DEBUG NOTIFICATION !");
            }
            else if (arg == 'shuffleToDiscard') {
                this.marketDeck.shuffleToDrawPile(this.marketDiscard);
            }
            else if (arg == 'shuffleToDraw') {
                this.marketDiscard.shuffleToDrawPile(this.marketDeck);
            }
            else if (arg == 'slideRight') {
                this.market.slideRight();
            }
            else if (arg == 'addCard') {
                this.myHand.addDaleCardToStock(new DaleCard_2.DaleCard(0, 0));
            }
            else if (arg == '') {
            }
            else if (arg == '') {
            }
            else if (arg == '') {
            }
            else {
                throw new Error("Unknown argument ".concat(notif.args.arg));
            }
        };
        return Dale;
    }(Gamegui));
    dojo.setObject("bgagame.dale", Dale);
});
