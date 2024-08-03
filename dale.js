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
        Images.VERTICAL_STACK_OFFSET = Images.CARD_HEIGHT / 6;
        Images.Z_INDEX_CARDBACK = 1;
        Images.Z_INDEX_CARDFRONT = 2;
        Images.Z_INDEX_SLIDING_CARD = 4;
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
        Images.VERTICAL_STACK_OFFSET_S = Images.S_SCALE * Images.VERTICAL_STACK_OFFSET;
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
        DaleCard.prototype.isJunk = function () {
            return (this.type_id >= 1 && this.type_id <= 5);
        };
        DaleCard.prototype.isPlayable = function () {
            return DaleCard.cardTypes[this.type_id].playable;
        };
        DaleCard.prototype.getTooltipContent = function () {
            var cardType = DaleCard.cardTypes[this.type_id];
            var animalfolkWithBull = cardType.animalfolk_displayed ? " • " + cardType.animalfolk_displayed : "";
            return "<div class=\"card-tooltip\">\n            <h3>".concat(cardType.name, "</h3>\n            <hr>\n            ").concat(cardType.value).concat(animalfolkWithBull, " \u2022 ").concat(cardType.type_displayed, " ").concat(cardType.has_plus ? "(+)" : "", "\n            <br><br>\n            <div class=\"text\">").concat(cardType.text, "</div>\n        </div>");
        };
        DaleCard.prototype.addTooltip = function (tooltip_parent_id) {
            var _a;
            if (this.id == 0)
                return;
            var parent = $(tooltip_parent_id);
            if (!parent) {
                throw new Error("DomElement with id '".concat(tooltip_parent_id, "' does not exist. Cannot add a tooltip to non-existing parent."));
            }
            var tooltip = new dijit.Tooltip({
                connectId: [tooltip_parent_id],
                label: this.getTooltipContent(),
                showDelay: 400,
            });
            dojo.connect(parent, "mouseleave", function () {
                tooltip.close();
            });
            (_a = DaleCard.tooltips.get(this.id)) === null || _a === void 0 ? void 0 : _a.destroy();
            DaleCard.tooltips.set(this.id, tooltip);
        };
        DaleCard.prototype.toDiv = function (tooltip_parent_id) {
            var _a;
            var div = document.createElement("div");
            div.id = "dale-card-" + this.id;
            div.classList.add("card");
            div.setAttribute('style', Images_1.Images.getCardStyle(this.type_id));
            if (tooltip_parent_id) {
                (_a = $(tooltip_parent_id)) === null || _a === void 0 ? void 0 : _a.appendChild(div);
                this.addTooltip(tooltip_parent_id);
            }
            return div;
        };
        DaleCard.of = function (card) {
            return new DaleCard(card.id, card.type_arg);
        };
        DaleCard.cardIdtoTypeId = new Map();
        DaleCard.tooltips = new Map();
        return DaleCard;
    }());
    exports.DaleCard = DaleCard;
});
define("components/DaleStock", ["require", "exports", "ebg/stock", "components/Images", "ebg/stock"], function (require, exports, Stock, Images_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleStock = void 0;
    var DaleStock = (function (_super) {
        __extends(DaleStock, _super);
        function DaleStock() {
            var _this = _super.call(this) || this;
            _this.orderedSelectedCardIds = [];
            _this.onChangeSelection = function (control_name, item_id) {
                item_id = +item_id;
                var isSelected = this.isSelected(item_id);
                var index = this.orderedSelectedCardIds.indexOf(item_id);
                if (!item_id) {
                    this.orderedSelectedCardIds = [];
                }
                else if (isSelected && index == -1) {
                    this.orderedSelectedCardIds.push(item_id);
                }
                else if (!isSelected && index != -1) {
                    this.orderedSelectedCardIds.splice(index, 1);
                }
                else {
                    console.warn("orderedSelectedCardIds might be broken: " + this.orderedSelectedCardIds);
                    this.orderedSelectedCardIds = [];
                }
                console.log(this.orderedSelectedCardIds);
            };
            return _this;
        }
        DaleStock.prototype.init = function (page, container, hideOuterContainer, onItemCreate, onItemDelete) {
            for (var i in page.gamedatas.cardTypes) {
                var type_id = page.gamedatas.cardTypes[i].type_id;
                this.addItemType(type_id, type_id, g_gamethemeurl + 'img/cards.jpg', type_id);
            }
            this.create(page, container, Images_2.Images.CARD_WIDTH, Images_2.Images.CARD_HEIGHT);
            this.resizeItems(Images_2.Images.CARD_WIDTH_S, Images_2.Images.CARD_HEIGHT_S, Images_2.Images.SHEET_WIDTH_S, Images_2.Images.SHEET_HEIGHT_S);
            this.image_items_per_row = Images_2.Images.IMAGES_PER_ROW;
            this.onItemCreate = function (itemDiv, typeId, itemId) {
                if (hideOuterContainer) {
                    hideOuterContainer.classList.remove("hidden");
                }
                if (onItemCreate) {
                    onItemCreate(itemDiv, typeId, itemId);
                }
            };
            this.onItemDelete = function (itemDiv, typeId, itemId) {
                if (hideOuterContainer && this.count() <= 1) {
                    hideOuterContainer.classList.add("hidden");
                }
                if (onItemDelete) {
                    onItemDelete(itemDiv, typeId, itemId);
                }
            };
            hideOuterContainer === null || hideOuterContainer === void 0 ? void 0 : hideOuterContainer.classList.add("hidden");
        };
        DaleStock.prototype.setSelectionMode = function (mode) {
            _super.prototype.setSelectionMode.call(this, mode);
            this.orderedSelectedCardIds = [];
        };
        DaleStock.prototype.addDaleCardToStock = function (card, from) {
            this.addToStockWithId(card.type_id, card.id, from);
            card.addTooltip(this.control_name + '_item_' + card.id);
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
define("components/Pile", ["require", "exports", "components/Images", "components/DaleCard"], function (require, exports, Images_3, DaleCard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pile = void 0;
    var Pile = (function () {
        function Pile(page, pile_container_id, pile_name) {
            $(pile_container_id).innerHTML = "\n            ".concat(pile_name ? "<h3 class=\"name\">".concat(pile_name, "</h3>") : "", "\n            <div class=\"pile\" style=\"").concat(Images_3.Images.getCardStyle(), "\">\n                <div class=\"placeholder\" style=\"").concat(Images_3.Images.getCardStyle(), "\"></div>\n                <div class=\"card\"></div>\n                <div class=\"size\"></div>\n            </div>\n        ");
            this.page = page;
            this.containerHTML = $(pile_container_id);
            this.placeholderHTML = $(pile_container_id).querySelector('.placeholder');
            this.topCardHTML = $(pile_container_id).querySelector('.card');
            this.topCardHTML.id = "pile-".concat(Pile.UNIQUE_PILE_ID++, "-top-card");
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
                this.topCardHTML.setAttribute('style', Images_3.Images.getCardStyle(topCard.type_id));
            }
        };
        Pile.prototype.setZIndex = function (slidingElement) {
            var z_index = Images_3.Images.Z_INDEX_SLIDING_CARD + this._slidingCards.length;
            var style = slidingElement.getAttribute('style');
            slidingElement.setAttribute('style', style + "z-index: ".concat(z_index, ";"));
        };
        Pile.prototype.pushHiddenCards = function (amount) {
            for (var i = 0; i < amount; i++) {
                this.cards.push(new DaleCard_1.DaleCard(0, 0));
            }
            this.updateHTML();
        };
        Pile.prototype.push = function (card, from, onEnd, duration, delay) {
            this.cards.push(card);
            card.addTooltip(this.topCardHTML.id);
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
                this.setZIndex(slidingElement);
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
                this.setZIndex(slidingElement);
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
        Pile.UNIQUE_PILE_ID = 0;
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
            this._container = container;
            this._card = undefined;
            if (card) {
                this.insertCard(card);
            }
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
        CardSlot.prototype.insertCard = function (card, from, callback) {
            this.removeCard();
            var cardDiv = card.toDiv(this.id);
            this._container.appendChild(cardDiv);
            this._card = card;
            if (from) {
                this.parent.page.placeOnObject(cardDiv, from);
                var animSlide = this.parent.page.slideToObject(cardDiv, this._container);
                if (callback) {
                    var animCallback = dojo.animateProperty({ node: cardDiv, duration: 0, onEnd: callback });
                    var anim = dojo.fx.chain([animSlide, animCallback]);
                    anim.play();
                }
                else {
                    animSlide.play();
                }
            }
        };
        CardSlot.prototype.removeCard = function (to) {
            if (this.hasCard()) {
                var removedCard = this._card;
                this._container.replaceChildren();
                this._card = undefined;
                if (removedCard && to) {
                    this.parent.page.slideTemporaryObject(removedCard.toDiv(), this._container, this._container, to);
                }
                return removedCard;
            }
            return undefined;
        };
        CardSlot.prototype.remove = function () {
            this.removeCard();
            this._container.remove();
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
                this._container.onclick = function (evt) {
                    evt.stopPropagation();
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
define("components/MarketBoard", ["require", "exports", "components/Images", "components/CardSlot"], function (require, exports, Images_4, CardSlot_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MarketBoard = void 0;
    var MarketBoard = (function () {
        function MarketBoard(page) {
            this.MAX_SIZE = 5;
            this.page = page;
            $("market-board-background").setAttribute("style", "\n            width: ".concat(Images_4.Images.MARKET_WIDTH_S - Images_4.Images.MARKET_PADDING_LEFT_S - Images_4.Images.MARKET_PADDING_RIGHT_S, "px;\n            height: ").concat(Images_4.Images.MARKET_HEIGHT_S - Images_4.Images.MARKET_PADDING_TOP_S - Images_4.Images.MARKET_PADDING_BOTTOM_S, "px;\n\t\t\tbackground-size: ").concat(Images_4.Images.MARKET_WIDTH_S, "px ").concat(Images_4.Images.MARKET_HEIGHT_S, "px;\n\t\t\tpadding-top: ").concat(Images_4.Images.MARKET_PADDING_TOP_S, "px;\n\t\t\tpadding-left: ").concat(Images_4.Images.MARKET_PADDING_LEFT_S, "px;\n            padding-bottom: ").concat(Images_4.Images.MARKET_PADDING_BOTTOM_S, "px;\n\t\t\tpadding-right: ").concat(Images_4.Images.MARKET_PADDING_RIGHT_S, "px;\n\t\t"));
            this.container = $("market-board-background").querySelector("#market-board");
            this.slots = [];
            for (var pos = this.MAX_SIZE - 1; pos >= 0; pos--) {
                var div = document.createElement("div");
                div.setAttribute('style', "".concat(Images_4.Images.getCardStyle(), ";\n                position: absolute;\n                left: ").concat(pos * (Images_4.Images.CARD_WIDTH_S + Images_4.Images.MARKET_ITEM_MARGIN_S), "px\n            "));
                this.container.appendChild(div);
                this.slots.push(new CardSlot_1.CardSlot(this, 4 - pos, div));
            }
            this.selectionMode = 0;
        }
        MarketBoard.prototype.getValidPos = function (pos) {
            if (pos == undefined || pos < 0 || pos >= this.MAX_SIZE) {
                console.warn("".concat(pos, " is an invalid market position. Using market position ").concat(this.MAX_SIZE - 1, " instead."));
                pos = this.MAX_SIZE - 1;
            }
            return pos;
        };
        MarketBoard.prototype.insertCard = function (card, pos, from) {
            pos = this.getValidPos(pos);
            this.slots[pos].insertCard(card, from);
        };
        MarketBoard.prototype.removeCard = function (pos, to) {
            pos = this.getValidPos(pos);
            return this.slots[pos].removeCard(to);
        };
        MarketBoard.prototype.slideRight = function (duration, delay) {
            this.unselectAll();
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
        MarketBoard.prototype.getSlotId = function (pos) {
            pos = this.getValidPos(pos);
            return this.slots[pos].id;
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
            pos = this.getValidPos(pos);
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
define("components/Stall", ["require", "exports", "components/DaleCard", "components/Images", "components/CardSlot"], function (require, exports, DaleCard_2, Images_5, CardSlot_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Stall = void 0;
    var Stall = (function () {
        function Stall(page, player_id) {
            this.page = page;
            this.player_id = player_id;
            this.container = $("stall-" + player_id);
            this.stackContainers = [];
            this.selectionMode = "none";
            this.slots = [];
            this.createNewStack();
        }
        Stall.prototype.createNewStack = function () {
            if (this.stackContainers.length > 0) {
                var prevStackContainer = this.stackContainers[this.stackContainers.length - 1];
                prevStackContainer.setAttribute('style', "max-width: ".concat(Images_5.Images.CARD_WIDTH_S, "px;"));
            }
            var stackContainer = document.createElement("div");
            stackContainer.classList.add("stack-container");
            stackContainer.setAttribute('style', "min-width: ".concat(Images_5.Images.CARD_WIDTH_S, "px;"));
            var placeholder = document.createElement("div");
            placeholder.classList.add("placeholder");
            placeholder.setAttribute('style', "".concat(Images_5.Images.getCardStyle(), ";"));
            stackContainer.appendChild(placeholder);
            this.container.appendChild(stackContainer);
            this.stackContainers.push(stackContainer);
            this.slots.push([]);
            this.createNewSlot(this.slots.length - 1);
        };
        Stall.prototype.createNewSlot = function (stack_index, card) {
            if (stack_index < 0 || stack_index >= this.slots.length || stack_index >= this.stackContainers.length) {
                throw new Error("Cannot make a slot in non-existing stack ".concat(stack_index));
            }
            var stackContainer = this.stackContainers[stack_index];
            var stack = this.slots[stack_index];
            var index = stack.length;
            var y_offset = Images_5.Images.VERTICAL_STACK_OFFSET_S * index;
            var div = document.createElement("div");
            div.setAttribute('style', "".concat(Images_5.Images.getCardStyle(), ";\n            position: absolute;\n            top: ").concat(y_offset, "px\n        "));
            stackContainer.setAttribute('style', stackContainer.getAttribute('style') + "height: ".concat(Images_5.Images.CARD_HEIGHT_S + y_offset, "px;"));
            stackContainer.appendChild(div);
            var pos = this.getPos(stack_index, index);
            stack.push(new CardSlot_2.CardSlot(this, pos, div, card));
        };
        Stall.prototype.insertDbCard = function (card, from) {
            var pos = +card.location_arg;
            var index = pos % Stall.MAX_STACK_SIZE;
            var stack_index = (pos - index) / Stall.MAX_STACK_SIZE;
            this.insertCard(DaleCard_2.DaleCard.of(card), stack_index, index, from);
        };
        Stall.prototype.insertCard = function (card, stack_index, index, from) {
            var _a;
            if (stack_index >= Stall.MAX_STACKS) {
                throw new Error("Cannot build beyond the maximum number of ".concat(Stall.MAX_STACKS, " stacks"));
            }
            while (stack_index >= this.slots.length - 1 && this.slots.length < Stall.MAX_STACKS) {
                this.createNewStack();
            }
            var stack = this.slots[stack_index];
            if (index == undefined) {
                index = 0;
                while ((_a = stack[index]) === null || _a === void 0 ? void 0 : _a.hasCard()) {
                    index++;
                }
            }
            while (index >= stack.length) {
                this.createNewSlot(stack_index);
            }
            console.log("insertCard(stack_index=".concat(stack_index, ", index=").concat(index, ")"));
            stack[index].insertCard(card, from);
        };
        Stall.prototype.getNumberOfStacks = function () {
            return this.slots.length;
        };
        Stall.prototype.getPos = function (stack_index, index) {
            return stack_index * Stall.MAX_STACK_SIZE + index;
        };
        Stall.prototype.getSlot = function (stack_index, index) {
            if (stack_index < 0 || stack_index >= this.slots.length) {
                throw new Error("Cannot access stack_index ".concat(stack_index, ". Player ").concat(this.player_id, " only has ").concat(this.slots.length, " stacks."));
            }
            var stack = this.slots[stack_index];
            if (index < 0 || index >= stack.length) {
                throw new Error("Cannot access index ".concat(index, " of a stack of size ").concat(stack.length, "."));
            }
            return stack[index];
        };
        Stall.prototype.getSlotId = function (stack_index, index) {
            return this.getSlot(stack_index, index).id;
        };
        Stall.prototype.setSelectionMode = function (mode) {
            this.unselectAll();
            this.selectionMode = mode;
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var stack = _a[_i];
                for (var _b = 0, stack_1 = stack; _b < stack_1.length; _b++) {
                    var slot = stack_1[_b];
                    switch (mode) {
                        case "none":
                            slot.setClickable(false);
                            break;
                        case "single":
                            slot.setClickable(slot.hasCard());
                            break;
                        case "multiple":
                            slot.setClickable(slot.hasCard());
                            break;
                        case "build":
                            slot.setClickable(!slot.hasCard());
                            break;
                    }
                }
            }
        };
        Stall.prototype.unselectAll = function () {
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var stack = _a[_i];
                for (var _b = 0, stack_2 = stack; _b < stack_2.length; _b++) {
                    var slot = stack_2[_b];
                    slot.setSelected(false);
                }
            }
        };
        Stall.prototype.onCardSlotClick = function (slot) {
            var index = slot.pos % Stall.MAX_STACK_SIZE;
            var stack_index = (slot.pos - index) / Stall.MAX_STACK_SIZE;
            this.page.onStallCardClick(slot.card, stack_index, index);
        };
        Stall.MAX_STACK_SIZE = 1000;
        Stall.MAX_STACKS = 8;
        return Stall;
    }());
    exports.Stall = Stall;
});
define("bgagame/dale", ["require", "exports", "ebg/core/gamegui", "components/DaleStock", "components/Pile", "components/DaleCard", "components/MarketBoard", "components/Stall", "ebg/counter", "ebg/stock"], function (require, exports, Gamegui, DaleStock_1, Pile_1, DaleCard_3, MarketBoard_1, Stall_1) {
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
            _this.playerStalls = {};
            _this.playerSchedules = {};
            _this.market = null;
            _this.myHand = new DaleStock_1.DaleStock();
            _this.myTemporary = new DaleStock_1.DaleStock();
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
        Object.defineProperty(Dale.prototype, "myStall", {
            get: function () {
                return this.playerStalls[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dale.prototype, "mySchedule", {
            get: function () {
                return this.playerSchedules[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
        Dale.prototype.setup = function (gamedatas) {
            var _a, _b;
            console.log("Starting game setup");
            console.log("------ GAME DATAS ------");
            console.log(this.gamedatas);
            console.log("------------------------");
            DaleCard_3.DaleCard.init(gamedatas.cardTypes);
            for (var player_id in gamedatas.players) {
                var player = gamedatas.players[player_id];
                this.playerDecks[player_id] = new Pile_1.Pile(this, 'deck-' + player_id, 'Deck');
                this.playerDecks[player_id].pushHiddenCards(gamedatas.deckSizes[player_id]);
                this.playerDiscards[player_id] = new Pile_1.Pile(this, 'discard-' + player_id, 'Discard Pile');
                for (var i in gamedatas.discardPiles[player_id]) {
                    var card = gamedatas.discardPiles[player_id][+i];
                    this.playerDiscards[player_id].push(DaleCard_3.DaleCard.of(card));
                }
                this.playerStalls[player_id] = new Stall_1.Stall(this, +player_id);
                for (var i in gamedatas.stalls[player_id]) {
                    var card = gamedatas.stalls[player_id][+i];
                    this.playerStalls[player_id].insertDbCard(card);
                }
            }
            this.marketDeck.pushHiddenCards(gamedatas.deckSizes.market);
            for (var i in gamedatas.discardPiles.market) {
                var card = gamedatas.discardPiles.market[i];
                this.marketDiscard.push(DaleCard_3.DaleCard.of(card));
            }
            this.market = new MarketBoard_1.MarketBoard(this);
            for (var i in gamedatas.market) {
                var card = gamedatas.market[i];
                this.market.insertCard(DaleCard_3.DaleCard.of(card), +card.location_arg);
            }
            this.myHand.init(this, $('myhand'));
            for (var i in gamedatas.hand) {
                var card = gamedatas.hand[i];
                this.myHand.addDaleCardToStock(DaleCard_3.DaleCard.of(card));
            }
            this.myHand.setSelectionMode(0);
            dojo.connect(this.myHand, 'onChangeSelection', this, 'onHandSelectionChanged');
            this.myTemporary.init(this, $('mytemporary'), $('mytemporary-wrap'));
            for (var i in gamedatas.temporary) {
                var card = gamedatas.temporary[i];
                this.myTemporary.addDaleCardToStock(DaleCard_3.DaleCard.of(card));
            }
            this.myTemporary.setSelectionMode(0);
            this.myTemporary.autowidth = true;
            dojo.connect(this.myTemporary, 'onChangeSelection', this, 'onTemporarySelectionChanged');
            var _loop_1 = function (player_id) {
                var container = $('schedule-' + player_id);
                var wrap = $('schedule-wrap-' + player_id);
                var color = (_b = (_a = gamedatas.players[player_id]) === null || _a === void 0 ? void 0 : _a.color) !== null && _b !== void 0 ? _b : 'white';
                var recolor = function (itemDiv, typeId, itemId) {
                    itemDiv.setAttribute('style', itemDiv.getAttribute('style') + ";\n\t\t\t\t\tbackground-blend-mode: overlay;\n\t\t\t\t\tbackground-color: #".concat(color, "20;"));
                };
                this_1.playerSchedules[player_id] = new DaleStock_1.DaleStock();
                this_1.playerSchedules[player_id].init(this_1, container, wrap, recolor);
                this_1.playerSchedules[player_id].setSelectionMode(0);
                this_1.playerSchedules[player_id].autowidth = true;
                this_1.playerSchedules[player_id].duration = 500;
                for (var card_id in gamedatas.schedules[player_id]) {
                    var card = gamedatas.schedules[+player_id][+card_id];
                    this_1.playerSchedules[player_id].addDaleCardToStock(DaleCard_3.DaleCard.of(card));
                }
            };
            var this_1 = this;
            for (var player_id in gamedatas.schedules) {
                _loop_1(player_id);
            }
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
            switch (stateName) {
                case 'playerTurn':
                    this.market.setSelectionMode(1);
                    this.myHand.setSelectionMode(1);
                    this.myStall.setSelectionMode("build");
                    break;
                case 'purchase':
                    var purchaseArgs = args.args;
                    console.log(purchaseArgs);
                    this.myHand.setSelectionMode(2);
                    this.market.setSelected(purchaseArgs.pos, true);
                    break;
                case 'build':
                    this.myHand.setSelectionMode(2);
                    break;
                case 'inventory':
                    this.myHand.setSelectionMode(2);
                    break;
                case 'swiftBroker':
                    this.myHand.setSelectionMode(2);
                    break;
                case 'shatteredRelic':
                    this.myHand.setSelectionMode(1);
                    break;
                case 'spyglass':
                    this.myTemporary.setSelectionMode(2);
                    break;
            }
        };
        Dale.prototype.onLeavingState = function (stateName) {
            console.log('Leaving state: ' + stateName);
            switch (stateName) {
                case 'playerTurn':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode(0);
                    this.myStall.setSelectionMode("none");
                    break;
                case 'purchase':
                    this.myHand.setSelectionMode(0);
                    this.market.unselectAll();
                    break;
                case 'build':
                    this.myHand.setSelectionMode(0);
                    break;
                case 'inventory':
                    this.myHand.setSelectionMode(0);
                    break;
                case 'swiftBroker':
                    this.myHand.setSelectionMode(0);
                    break;
                case 'shatteredRelic':
                    this.myHand.setSelectionMode(0);
                    break;
                case 'spyglass':
                    this.myTemporary.setSelectionMode(0);
                    break;
            }
        };
        Dale.prototype.onUpdateActionButtons = function (stateName, args) {
            console.log('onUpdateActionButtons: ' + stateName, args);
            if (!this.isCurrentPlayerActive())
                return;
            switch (stateName) {
                case 'playerTurn':
                    this.addActionButton("confirm-button", _("Pass"), "onRequestInventoryAction");
                    break;
                case 'purchase':
                    this.addActionButton("confirm-button", _("Confirm Funds"), "onPurchase");
                    this.addActionButtonCancel();
                    break;
                case 'build':
                    this.addActionButton("confirm-button", _("Confirm Selection"), "onBuild");
                    this.addActionButtonCancel();
                    break;
                case 'inventory':
                    this.addActionButton("confirm-button", _("Discard Selection"), "onInventoryAction");
                    this.addActionButtonCancel();
                    break;
                case 'swiftBroker':
                    this.addActionButton("confirm-button", _("Discard All"), "onSwiftBroker");
                    this.addActionButtonCancel();
                    break;
                case 'shatteredRelic':
                    this.addActionButtonCancel();
                    break;
                case 'spyglass':
                    this.addActionButton("confirm-button", _("Confirm Selection"), "onSpyglass");
                    break;
            }
        };
        Dale.prototype.stockToPile = function (card, stock, pile, delay) {
            if (delay === void 0) { delay = 0; }
            var card_id = card.id;
            var item_name = stock.control_name + '_item_' + card_id;
            if ($(item_name)) {
                pile.push(new DaleCard_3.DaleCard(card_id), item_name, undefined, undefined, delay);
                stock.removeFromStockByIdNoAnimation(+card_id);
            }
            else {
                throw new Error("Card ".concat(card_id, " does not exist in ") + stock.control_name);
            }
        };
        Dale.prototype.overallPlayerBoardToPile = function (card, player_id, pile, delay) {
            if (delay === void 0) { delay = 0; }
            pile.push(DaleCard_3.DaleCard.of(card), 'overall_player_board_' + player_id);
        };
        Dale.prototype.playerStockToPile = function (card, stock, player_id, pile, delay) {
            if (delay === void 0) { delay = 0; }
            if (+player_id == this.player_id) {
                this.stockToPile(card, stock, pile, delay);
            }
            else {
                this.overallPlayerBoardToPile(card, player_id, pile);
            }
        };
        Dale.prototype.playerStockRemove = function (card, stock, player_id) {
            if (+player_id == this.player_id) {
                stock.removeFromStockById(+card.id);
            }
        };
        Dale.prototype.pileToStock = function (card, pile, stock) {
            stock.addDaleCardToStock(DaleCard_3.DaleCard.of(card), pile.placeholderHTML);
            if (pile.pop().id != +card.id) {
                throw new Error("Card ".concat(+card.id, " was not found on top of the pile"));
            }
        };
        Dale.prototype.pileToPlayerStock = function (card, pile, stock, player_id) {
            if (+player_id == this.player_id) {
                console.log("TO MY HAND!");
                this.pileToStock(card, pile, stock);
            }
            else {
                pile.pop('overall_player_board_' + player_id);
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
        Dale.prototype.addActionButtonCancel = function () {
            this.addActionButton("cancel-button", _("Cancel"), "onCancel", undefined, false, 'gray');
        };
        Dale.prototype.onStallCardClick = function (card, stack_index, index) {
            console.log("Clicked on CardStack[".concat(stack_index, ", ").concat(index, "]"));
            switch (this.gamedatas.gamestate.name) {
                case 'playerTurn':
                    if (this.checkAction('actRequestStallAction')) {
                        this.bgaPerformAction('actRequestStallAction', {});
                    }
                    break;
            }
        };
        Dale.prototype.onMarketCardClick = function (card, pos) {
            pos = this.market.getValidPos(pos);
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
        Dale.prototype.onScheduleSelectionChanged = function () {
            console.log("You click on a card in the... schedule...?");
        };
        Dale.prototype.onHandSelectionChanged = function () {
            var items = this.myHand.getSelectedItems();
            if (!items[0])
                return;
            var card = new DaleCard_3.DaleCard(items[0].id);
            switch (this.gamedatas.gamestate.name) {
                case 'playerTurn':
                    if (!card.isPlayable()) {
                        this.showMessage(_("This card cannot be played"), 'error');
                    }
                    else if (this.checkAction('actPlayCard')) {
                        this.bgaPerformAction('actPlayCard', {
                            card_id: card.id
                        });
                    }
                    this.myHand.unselectAll();
                    break;
                case 'shatteredRelic':
                    if (this.checkAction('actShatteredRelic')) {
                        this.bgaPerformAction('actShatteredRelic', {
                            card_id: card.id
                        });
                    }
                    this.myHand.unselectAll();
                    break;
                case null:
                    throw new Error("gamestate.name is null");
            }
        };
        Dale.prototype.onTemporarySelectionChanged = function () {
            var items = this.myHand.getSelectedItems();
            if (!items[0])
                return;
            var card = new DaleCard_3.DaleCard(items[0].id);
            switch (this.gamedatas.gamestate.name) {
                case null:
                    throw new Error("gamestate.name is null");
            }
        };
        Dale.prototype.onPurchase = function () {
            if (this.checkAction('actPurchase')) {
                this.bgaPerformAction('actPurchase', {
                    funds_card_ids: this.arrayToNumberList(this.myHand.orderedSelectedCardIds)
                });
            }
        };
        Dale.prototype.onBuild = function () {
            var autoSortedCards = this.myHand.getSelectedItems();
            if (this.checkAction('actBuild')) {
                this.bgaPerformAction('actBuild', {
                    stack_card_ids: this.arrayToNumberList(autoSortedCards)
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
                this.bgaPerformAction('actInventoryAction', {
                    ids: this.arrayToNumberList(this.myHand.orderedSelectedCardIds)
                });
            }
        };
        Dale.prototype.onSwiftBroker = function () {
            if (this.checkAction("actSwiftBroker")) {
                this.bgaPerformAction('actSwiftBroker', {
                    card_ids: this.arrayToNumberList(this.myHand.orderedSelectedCardIds)
                });
            }
        };
        Dale.prototype.onSpyglass = function () {
            console.log("Sending " + this.arrayToNumberList(this.myTemporary.orderedSelectedCardIds));
            if (this.myTemporary.orderedSelectedCardIds.length == 0) {
                this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
                return;
            }
            if (this.checkAction("actSpyglass")) {
                this.bgaPerformAction('actSpyglass', {
                    card_ids: this.arrayToNumberList(this.myTemporary.orderedSelectedCardIds)
                });
            }
        };
        Dale.prototype.setupNotifications = function () {
            var _this = this;
            console.log('notifications subscriptions setup2');
            var notifs = [
                ['scheduleTechnique', 1000],
                ['resolveTechnique', 1000],
                ['cancelTechnique', 1000],
                ['buildStack', 1500],
                ['fillEmptyMarketSlots', 1],
                ['marketSlideRight', 1000],
                ['marketToHand', 1500],
                ['discardToHand', 1000],
                ['draw', 1000],
                ['drawMultiple', 1000],
                ['temporaryToHand', 1000],
                ['obtainNewJunkInHand', 1000],
                ['throwAway', 1000],
                ['throwAwayMultiple', 1000],
                ['discard', 1000],
                ['discardMultiple', 1000],
                ['placeOnDeckMultiple', 1000],
                ['reshuffleDeck', 1500],
                ['message', 1],
                ['debugClient', 1],
            ];
            notifs.forEach(function (notif) {
                dojo.subscribe(notif[0], _this, "notif_".concat(notif[0]));
                _this.notifqueue.setSynchronous(notif[0], notif[1]);
            });
            console.log('notifications subscriptions setup done');
        };
        Dale.prototype.notif_scheduleTechnique = function (notif) {
            if (notif.args.player_id == this.player_id) {
                var card_id = +notif.args.card.id;
                if ($('myhand_item_' + card_id)) {
                    this.mySchedule.addDaleCardToStock(DaleCard_3.DaleCard.of(notif.args.card), 'myhand_item_' + card_id);
                    this.myHand.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    throw new Error("Card ".concat(card_id, " does not exist in my hand"));
                }
            }
            else {
                var schedule = this.playerSchedules[notif.args.player_id];
                schedule.addDaleCardToStock(DaleCard_3.DaleCard.of(notif.args.card), 'overall_player_board_' + notif.args.player_id);
            }
        };
        Dale.prototype.notif_cancelTechnique = function (notif) {
            if (notif.args.player_id == this.player_id) {
                var card_id = +notif.args.card.id;
                if ($(this.mySchedule.control_name + '_item_' + card_id)) {
                    this.myHand.addDaleCardToStock(DaleCard_3.DaleCard.of(notif.args.card), this.mySchedule.control_name + '_item_' + card_id);
                    this.mySchedule.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    throw new Error("Unable to cancel a techqniue. Techqniue card ".concat(card_id, " does not exist in the schedule."));
                }
            }
            else {
                var schedule = this.playerSchedules[notif.args.player_id];
                schedule.removeFromStockById(+notif.args.card.id, 'overall_player_board_' + notif.args.player_id);
            }
        };
        Dale.prototype.notif_resolveTechnique = function (notif) {
            console.log(this.playerSchedules);
            var schedule = this.playerSchedules[notif.args.player_id];
            var card = DaleCard_3.DaleCard.of(notif.args.card);
            var from = schedule.control_name + '_item_' + card.id;
            this.playerDiscards[notif.args.player_id].push(card, from, null, schedule.duration);
            schedule.removeFromStockByIdNoAnimation(card.id);
        };
        Dale.prototype.notif_buildStack = function (notif) {
            var _a;
            console.log("notif_buildStack");
            var stall = this.playerStalls[notif.args.player_id];
            for (var i in notif.args.cards) {
                var card = DaleCard_3.DaleCard.of(notif.args.cards[i]);
                if (notif.args.player_id == this.player_id) {
                    if ($('myhand_item_' + card.id)) {
                        stall.insertCard(card, notif.args.stack_index, undefined, 'myhand_item_' + card.id);
                        this.myHand.removeFromStockByIdNoAnimation(+card.id);
                    }
                    else {
                        throw new Error("Cannot build a stack. Card ".concat(card.id, " does not exist in hand."));
                    }
                }
                else {
                    stall.insertCard(card, notif.args.stack_index, undefined, 'overall_player_board_' + notif.args.player_id);
                }
            }
            (_a = this.scoreCtrl[notif.args.player_id]) === null || _a === void 0 ? void 0 : _a.toValue(notif.args.stack_index_plus_1);
        };
        Dale.prototype.notif_fillEmptyMarketSlots = function (notif) {
            console.log("notif_fillEmptyMarketSlots");
            console.log(notif.args);
            var cards = notif.args.cards;
            var positions = notif.args.positions;
            if (cards.length != positions.length) {
                throw new Error("notif_fillEmptyMarketSlots got invalid arguments");
            }
            for (var i = 0; i < cards.length; i++) {
                this.market.insertCard(DaleCard_3.DaleCard.of(cards[i]), positions[i], this.marketDeck.placeholderHTML);
                this.marketDeck.pop();
            }
        };
        Dale.prototype.notif_marketSlideRight = function (notif) {
            this.market.slideRight();
        };
        Dale.prototype.notif_marketToHand = function (notif) {
            var daleCard = new DaleCard_3.DaleCard(notif.args.market_card_id);
            var slotId = this.market.getSlotId(notif.args.pos);
            this.market.unselectAll();
            if (notif.args.player_id == this.player_id) {
                this.market.removeCard(notif.args.pos);
                this.myHand.addDaleCardToStock(daleCard, slotId);
            }
            else {
                this.market.removeCard(notif.args.pos, 'overall_player_board_' + notif.args.player_id);
            }
        };
        Dale.prototype.notif_temporaryToHand = function (notif) {
            console.log("notif_temporaryToHand");
            if (notif.args._private) {
                var card_id = +notif.args._private.card.id;
                if ($(this.myTemporary.control_name + '_item_' + card_id)) {
                    console.log(notif.args);
                    this.myHand.addDaleCardToStock(DaleCard_3.DaleCard.of(notif.args._private.card), this.myTemporary.control_name + '_item_' + card_id);
                    this.myTemporary.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    throw new Error("Card ".concat(card_id, " does not exist in myTemporary."));
                }
            }
            else {
                return;
            }
        };
        Dale.prototype.notif_obtainNewJunkInHand = function (notif) {
            if (notif.args.player_id == this.player_id) {
                for (var i in notif.args.cards) {
                    var card = notif.args.cards[i];
                    this.myHand.addDaleCardToStock(DaleCard_3.DaleCard.of(card), 'overall_player_board_' + notif.args.player_id);
                }
            }
            else {
                return;
            }
        };
        Dale.prototype.notif_throwAway = function (notif) {
            var stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
            if (DaleCard_3.DaleCard.of(notif.args.card).isJunk()) {
                this.playerStockRemove(notif.args.card, stock, notif.args.player_id);
            }
            else {
                this.playerStockToPile(notif.args.card, stock, notif.args.player_id, this.marketDiscard);
            }
        };
        Dale.prototype.notif_throwAwayMultiple = function (notif) {
            var delay = 0;
            var stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
            for (var _i = 0, _a = notif.args.card_ids; _i < _a.length; _i++) {
                var id = _a[_i];
                var card = notif.args.cards[id];
                if (DaleCard_3.DaleCard.of(card).isJunk()) {
                    this.playerStockRemove(card, stock, notif.args.player_id);
                }
                else {
                    this.playerStockToPile(card, stock, notif.args.player_id, this.marketDiscard, delay);
                }
                delay += 75;
            }
        };
        Dale.prototype.notif_discard = function (notif) {
            var _a;
            var discard_id = (_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id;
            var discardPile = this.playerDiscards[discard_id];
            var stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
            this.playerStockToPile(notif.args.card, stock, notif.args.player_id, discardPile);
        };
        Dale.prototype.notif_discardMultiple = function (notif) {
            var _a;
            var discard_id = (_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id;
            var discardPile = this.playerDiscards[discard_id];
            var stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
            var delay = 0;
            for (var _i = 0, _b = notif.args.card_ids; _i < _b.length; _i++) {
                var id = _b[_i];
                var card = notif.args.cards[id];
                this.playerStockToPile(card, stock, notif.args.player_id, discardPile, delay);
                delay += 75;
            }
        };
        Dale.prototype.notif_placeOnDeckMultiple = function (notif) {
            console.log("placeOnDeckMultiple");
            var stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
            if (notif.args._private) {
                for (var _i = 0, _a = notif.args._private.card_ids; _i < _a.length; _i++) {
                    var id = _a[_i];
                    var card = notif.args._private.cards[id];
                    var deck = this.playerDecks[notif.args.deck_player_id];
                    this.stockToPile(card, stock, deck);
                }
            }
            else {
                this.myDeck.pushHiddenCards(1);
            }
        };
        Dale.prototype.notif_discardToHand = function (notif) {
            var _a;
            console.log("notif_discardToHand");
            var discardPile = this.playerDiscards[(_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : this.player_id];
            this.pileToPlayerStock(notif.args.card, discardPile, this.myHand, notif.args.player_id);
        };
        Dale.prototype.notif_draw = function (notif) {
            console.log("notif_draw");
            var stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
            if (notif.args._private) {
                var card = notif.args._private.card;
                stock.addDaleCardToStock(DaleCard_3.DaleCard.of(card), this.myDeck.placeholderHTML);
                this.myDeck.pop();
            }
            else {
                this.playerDecks[notif.args.player_id].pop();
            }
        };
        Dale.prototype.notif_drawMultiple = function (notif) {
            var _a;
            console.log("notif_drawMultiple");
            console.log(notif.args);
            var stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
            if (notif.args._private) {
                for (var i in (_a = notif.args._private) === null || _a === void 0 ? void 0 : _a.cards) {
                    var card = notif.args._private.cards[i];
                    stock.addDaleCardToStock(DaleCard_3.DaleCard.of(card), this.myDeck.placeholderHTML);
                    this.myDeck.pop();
                }
            }
            else {
                for (var i = 0; i < notif.args.nbr; i++) {
                    this.playerDecks[notif.args.player_id].pop();
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
        Dale.prototype.notif_message = function (notif) {
            return;
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
                this.myHand.addDaleCardToStock(new DaleCard_3.DaleCard(0, 0));
            }
            else if (arg == 'clientConsoleLog') {
                console.log(notif.args.msg);
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
