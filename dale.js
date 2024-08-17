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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        Images.STACK_MIN_OVERLAP_X = 0.25;
        Images.Z_INDEX_CARDBACK = 1;
        Images.Z_INDEX_CARDFRONT = 2;
        Images.Z_INDEX_HAND_CARD = 100;
        Images.Z_INDEX_SELECTED_CARD = 200;
        Images.Z_INDEX_SLIDING_CARD = 300;
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
define("components/types/DbEffect", ["require", "exports"], function (require, exports) {
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
                console.log("cardId2TypeId");
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
        DaleCard.addEffect = function (effect) {
            if (DaleCard.hasActiveAbility(+effect.type_id)) {
                if (+effect.type_id != DaleCard.CT_GOODOLDTIMES || +effect.target != DaleCard.CT_GOODOLDTIMES) {
                    var encoding = (+effect.card_id) * DaleCard.MAX_TYPES + (+effect.type_id);
                    DaleCard.usedActiveAbilities.add(encoding);
                }
            }
            switch (+effect.type_id) {
                case DaleCard.CT_FLEXIBLESHOPKEEPER:
                case DaleCard.CT_REFLECTION:
                case DaleCard.CT_GOODOLDTIMES:
                case DaleCard.CT_TRENDSETTING:
                case DaleCard.CT_SEEINGDOUBLES:
                    if (+effect.target != -1) {
                        console.log("Bind Chameleon: ".concat(+effect.card_id, " -> ").concat(+effect.target));
                        DaleCard.bindChameleonFromServer(+effect.card_id, +effect.target);
                    }
                    break;
                default:
                    break;
            }
        };
        DaleCard.removeEndOfTurnEffects = function () {
            console.log("removeEndOfTurnEffects");
            DaleCard.usedActiveAbilities.clear();
            DaleCard.unbindAllChameleons();
        };
        Object.defineProperty(DaleCard.prototype, "original_type_id", {
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
        Object.defineProperty(DaleCard.prototype, "effective_type_id", {
            get: function () {
                var _type_id = DaleCard.cardIdtoEffectiveTypeIdLocal.get(this.id);
                if (_type_id == undefined) {
                    _type_id = DaleCard.cardIdtoEffectiveTypeId.get(this.id);
                }
                if (_type_id == undefined) {
                    return this.original_type_id;
                }
                return _type_id;
            },
            enumerable: false,
            configurable: true
        });
        DaleCard.prototype.isBoundChameleon = function () {
            return DaleCard.cardIdtoEffectiveTypeIdLocal.has(this.id) || DaleCard.cardIdtoEffectiveTypeId.has(this.id);
        };
        DaleCard.prototype.isUnboundChameleon = function () {
            var type_id = this.effective_type_id;
            return !this.isBoundChameleon() && (type_id == DaleCard.CT_FLEXIBLESHOPKEEPER ||
                type_id == DaleCard.CT_REFLECTION ||
                type_id == DaleCard.CT_GOODOLDTIMES ||
                type_id == DaleCard.CT_TRENDSETTING ||
                type_id == DaleCard.CT_SEEINGDOUBLES);
        };
        DaleCard.prototype.bindChameleonLocal = function (effective_type_id) {
            console.log("BIND!");
            DaleCard.cardIdtoEffectiveTypeIdLocal.set(this.id, effective_type_id);
        };
        DaleCard.prototype.unbindChameleonLocal = function () {
            DaleCard.cardIdtoEffectiveTypeIdLocal.delete(this.id);
        };
        DaleCard.unbindAllChameleonsLocal = function () {
            var size = DaleCard.cardIdtoEffectiveTypeIdLocal.size;
            DaleCard.cardIdtoEffectiveTypeIdLocal.clear();
            return size;
        };
        DaleCard.bindChameleonFromServer = function (card_id, effective_type_id) {
            DaleCard.cardIdtoEffectiveTypeId.set(card_id, effective_type_id);
        };
        DaleCard.unbindChameleonFromServer = function (card_id) {
            DaleCard.cardIdtoEffectiveTypeId.delete(card_id);
        };
        DaleCard.getLocalChameleons = function () {
            var card_ids = [];
            var type_ids = [];
            DaleCard.cardIdtoEffectiveTypeIdLocal.forEach(function (type_id, card_id) {
                card_ids.push(card_id);
                type_ids.push(type_id);
            });
            return {
                chameleon_card_ids: card_ids.join(";"),
                chameleon_type_ids: type_ids.join(";")
            };
        };
        DaleCard.unbindAllChameleons = function () {
            DaleCard.cardIdtoEffectiveTypeId.clear();
            DaleCard.cardIdtoEffectiveTypeIdLocal.clear();
        };
        DaleCard.createChameleonIcon = function () {
            var div = document.createElement("div");
            div.classList.add("chameleon-icon");
            return div;
        };
        Object.defineProperty(DaleCard.prototype, "value", {
            get: function () {
                return DaleCard.cardTypes[this.effective_type_id].value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "animalfolk", {
            get: function () {
                return DaleCard.cardTypes[this.effective_type_id].animalfolk;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "name", {
            get: function () {
                return DaleCard.cardTypes[this.effective_type_id].name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "div", {
            get: function () {
                var div = DaleCard.divs.get(this.id);
                if (!div) {
                    throw new Error("No div exists for card_id=".concat(this.id));
                }
                return div;
            },
            enumerable: false,
            configurable: true
        });
        DaleCard.prototype.isJunk = function () {
            return (this.effective_type_id >= 1 && this.effective_type_id <= 5);
        };
        DaleCard.prototype.isTechnique = function () {
            return DaleCard.cardTypes[this.effective_type_id].is_technique;
        };
        DaleCard.prototype.isPlayable = function () {
            return DaleCard.cardTypes[this.effective_type_id].playable;
        };
        DaleCard.isPlayable = function (type_id) {
            return DaleCard.cardTypes[type_id].playable;
        };
        DaleCard.prototype.hasActiveAbility = function () {
            var type_id = this.effective_type_id;
            if (!DaleCard.hasActiveAbility(type_id)) {
                return false;
            }
            var encoding = this.id * DaleCard.MAX_TYPES + type_id;
            return !DaleCard.usedActiveAbilities.has(encoding);
        };
        DaleCard.hasActiveAbility = function (type_id) {
            return DaleCard.cardTypes[type_id].has_active;
        };
        DaleCard.prototype.getTooltipContent = function () {
            var cardType = DaleCard.cardTypes[this.effective_type_id];
            var animalfolkWithBull = cardType.animalfolk_displayed ? " • " + cardType.animalfolk_displayed : "";
            var chameleonName = this.isBoundChameleon() ? "<span class=chameleon-name>".concat(DaleCard.cardTypes[this.original_type_id].name, "</span> ") : "";
            return "<div class=\"card-tooltip\">\n            <h3>".concat(chameleonName).concat(cardType.name, "</h3>\n            <hr>\n            ").concat(cardType.value).concat(animalfolkWithBull, " \u2022 ").concat(cardType.type_displayed, " ").concat(cardType.has_plus ? "(+)" : "", "\n            <br><br>\n            <div class=\"text\">").concat(cardType.text, "</div>\n            <br style=\"line-height: 10px\" />\n        </div>");
        };
        DaleCard.prototype.destroyTooltip = function () {
            var _a;
            (_a = DaleCard.tooltips.get(this.id)) === null || _a === void 0 ? void 0 : _a.destroy();
        };
        DaleCard.prototype.addTooltip = function (tooltip_parent_id) {
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
            this.destroyTooltip();
            DaleCard.tooltips.set(this.id, tooltip);
        };
        DaleCard.prototype.toDiv = function (parent_id) {
            var _a;
            var div = document.createElement("div");
            div.id = "dale-card-" + this.id;
            div.classList.add("dale-card");
            div.setAttribute('style', Images_1.Images.getCardStyle(this.effective_type_id));
            if (parent_id) {
                (_a = $(parent_id)) === null || _a === void 0 ? void 0 : _a.appendChild(div);
                this.addTooltip(div.id);
            }
            if (this.isBoundChameleon()) {
                div.appendChild(DaleCard.createChameleonIcon());
            }
            DaleCard.divs.set(this.id, div);
            return div;
        };
        DaleCard.of = function (card) {
            return new DaleCard(card.id, card.type_arg);
        };
        DaleCard.cardIdtoTypeId = new Map();
        DaleCard.cardIdtoEffectiveTypeId = new Map();
        DaleCard.cardIdtoEffectiveTypeIdLocal = new Map();
        DaleCard.usedActiveAbilities = new Set();
        DaleCard.tooltips = new Map();
        DaleCard.divs = new Map();
        DaleCard.MAX_TYPES = 1000;
        DaleCard.CT_CARDBACK = 0;
        DaleCard.CT_JUNK = 1;
        DaleCard.CT_JUNK2 = 2;
        DaleCard.CT_JUNK3 = 3;
        DaleCard.CT_JUNK4 = 4;
        DaleCard.CT_JUNK5 = 5;
        DaleCard.CT_SWIFTBROKER = 6;
        DaleCard.CT_COOKIES = 7;
        DaleCard.CT_SHATTEREDRELIC = 8;
        DaleCard.CT_SPYGLASS = 9;
        DaleCard.CT_FLASHYSHOW = 10;
        DaleCard.CT_FAVORITETOY = 11;
        DaleCard.CT_LOYALPARTNER = 12;
        DaleCard.CT_PREPAIDGOOD = 13;
        DaleCard.CT_ESSENTIALPURCHASE = 14;
        DaleCard.CT_MARKETDISCOVERY = 15;
        DaleCard.CT_SPECIALOFFER = 16;
        DaleCard.CT_STOCKCLEARANCE = 17;
        DaleCard.CT_WILYFELLOW = 18;
        DaleCard.CT_NUISANCE = 19;
        DaleCard.CT_ROTTENFOOD = 20;
        DaleCard.CT_DIRTYEXCHANGE = 21;
        DaleCard.CT_SABOTAGE = 22;
        DaleCard.CT_TREASUREHUNTER = 23;
        DaleCard.CT_STASHINGVENDOR = 24;
        DaleCard.CT_EMPTYCHEST = 25;
        DaleCard.CT_NOSTALGICITEM = 26;
        DaleCard.CT_ACORN = 27;
        DaleCard.CT_ACCORDION = 28;
        DaleCard.CT_WINTERISCOMING = 29;
        DaleCard.CT_BOLDHAGGLER = 30;
        DaleCard.CT_NEWSEASON = 31;
        DaleCard.CT_WHIRLIGIG = 32;
        DaleCard.CT_CHARM = 33;
        DaleCard.CT_GAMBLE = 34;
        DaleCard.CT_BLINDFOLD = 35;
        DaleCard.CT_FLEXIBLESHOPKEEPER = 36;
        DaleCard.CT_REFLECTION = 37;
        DaleCard.CT_GOODOLDTIMES = 38;
        DaleCard.CT_GIFTVOUCHER = 39;
        DaleCard.CT_TRENDSETTING = 40;
        DaleCard.CT_SEEINGDOUBLES = 41;
        return DaleCard;
    }());
    exports.DaleCard = DaleCard;
});
define("components/types/DaleLocation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/OrderedSelection", ["require", "exports", "components/DaleCard"], function (require, exports, DaleCard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrderedSelection = void 0;
    var OrderedSelection = (function () {
        function OrderedSelection() {
            this.iconType = 'pileBlue';
            this.card_ids = [];
        }
        OrderedSelection.prototype.getDiv = function (card_id) {
            return new DaleCard_1.DaleCard(card_id).div;
        };
        OrderedSelection.prototype.addIcon = function (card_id, index) {
            var div = this.getDiv(card_id);
            div.classList.add("dale-selected");
            if (this.iconType == 'none') {
                return;
            }
            var offset = Math.min(7, index);
            if (this.iconType == 'pileBlue') {
                offset += 1;
            }
            var icon = document.createElement("div");
            icon.classList.add("selection-icon");
            icon.setAttribute('style', "\n            background-position: -".concat(offset, "00%;\n        "));
            div.appendChild(icon);
        };
        OrderedSelection.prototype.removeIcon = function (card_id) {
            var _a;
            var div = this.getDiv(card_id);
            div === null || div === void 0 ? void 0 : div.classList.remove("dale-selected");
            (_a = div === null || div === void 0 ? void 0 : div.querySelector(".selection-icon")) === null || _a === void 0 ? void 0 : _a.remove();
        };
        OrderedSelection.prototype.selectItem = function (card_id) {
            this.card_ids.push(card_id);
            console.log(this.card_ids);
            this.addIcon(card_id, this.card_ids.length - 1);
        };
        OrderedSelection.prototype.unselectItem = function (card_id) {
            var index = this.card_ids.indexOf(card_id);
            this.card_ids.splice(index, 1);
            console.log(this.card_ids);
            this.removeIcon(card_id);
        };
        OrderedSelection.prototype.unselectAll = function () {
            for (var _i = 0, _a = this.card_ids; _i < _a.length; _i++) {
                var card_id = _a[_i];
                this.unselectItem(card_id);
            }
        };
        OrderedSelection.prototype.setIconType = function (type) {
            this.iconType = type;
        };
        OrderedSelection.prototype.updateIcons = function () {
            console.log("updateIcons");
            if (this.iconType != 'none') {
                for (var i = 0; i < this.card_ids.length; i++) {
                    var card_id = this.card_ids[i];
                    this.removeIcon(card_id);
                    this.addIcon(card_id, i);
                }
            }
        };
        OrderedSelection.prototype.toggle = function (card_id) {
            if (this.includes(card_id)) {
                this.unselectItem(card_id);
                this.updateIcons();
                return false;
            }
            else {
                this.selectItem(card_id);
                return true;
            }
        };
        OrderedSelection.prototype.includes = function (card_id) {
            return this.card_ids.includes(card_id);
        };
        OrderedSelection.prototype.get = function () {
            return this.card_ids.slice().reverse();
        };
        return OrderedSelection;
    }());
    exports.OrderedSelection = OrderedSelection;
});
define("components/DaleStock", ["require", "exports", "ebg/stock", "components/DaleCard", "components/Images", "components/OrderedSelection", "ebg/stock"], function (require, exports, Stock, DaleCard_2, Images_2, OrderedSelection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleStock = void 0;
    var StockOrderedSelection = (function (_super) {
        __extends(StockOrderedSelection, _super);
        function StockOrderedSelection(stock) {
            var _this = _super.call(this) || this;
            _this._stock = stock;
            return _this;
        }
        StockOrderedSelection.prototype.getDiv = function (card_id) {
            return $(this._stock.control_name + "_item_" + card_id);
        };
        return StockOrderedSelection;
    }(OrderedSelection_1.OrderedSelection));
    var DaleStock = (function (_super) {
        __extends(DaleStock, _super);
        function DaleStock() {
            var _this = _super.call(this) || this;
            _this.actionLabelClasses = ['dale-label-technique', 'dale-label-purchase', 'dale-label-build', 'dale-label-discard', 'dale-label-text', 'dale-label-default'];
            _this.actionLabelWrap = undefined;
            _this.actionLabelText = undefined;
            _this.orderedSelection = new StockOrderedSelection(_this);
            _this.onChangeSelection = function (control_name, item_id) {
                if (item_id && !this.isSelected(item_id)) {
                    this.orderedSelection.updateIcons();
                }
            };
            return _this;
        }
        Object.defineProperty(DaleStock.prototype, "selectionMode", {
            get: function () {
                return this.selectable;
            },
            enumerable: false,
            configurable: true
        });
        DaleStock.prototype.init = function (page, container, hideOuterContainer, onItemCreate, onItemDelete) {
            page.allDaleStocks.push(this);
            for (var i in page.gamedatas.cardTypes) {
                var type_id = page.gamedatas.cardTypes[i].type_id;
                this.addItemType(type_id, type_id, g_gamethemeurl + 'img/cards.jpg', type_id);
            }
            this.create(page, container, Images_2.Images.CARD_WIDTH, Images_2.Images.CARD_HEIGHT);
            this.resizeItems(Images_2.Images.CARD_WIDTH_S, Images_2.Images.CARD_HEIGHT_S, Images_2.Images.SHEET_WIDTH_S, Images_2.Images.SHEET_HEIGHT_S);
            this.image_items_per_row = Images_2.Images.IMAGES_PER_ROW;
            this.onItemCreate = function (itemDiv, typeId, itemId) {
                if (hideOuterContainer) {
                    hideOuterContainer.classList.remove("dale-hidden");
                }
                if (onItemCreate) {
                    onItemCreate(itemDiv, typeId, itemId);
                }
            };
            this.onItemDelete = function (itemDiv, typeId, itemId) {
                if (hideOuterContainer && this.count() <= 1) {
                    hideOuterContainer.classList.add("dale-hidden");
                }
                if (onItemDelete) {
                    onItemDelete(itemDiv, typeId, itemId);
                }
            };
            hideOuterContainer === null || hideOuterContainer === void 0 ? void 0 : hideOuterContainer.classList.add("dale-hidden");
        };
        DaleStock.prototype.initActionLabelWrap = function (wrap) {
            var _a;
            dojo.setStyle(wrap, 'min-height', 2 * Images_2.Images.CARD_WIDTH_S + 'px');
            this.actionLabelWrap = wrap;
            this.actionLabelText = (_a = wrap.querySelector(".dale-label-text")) !== null && _a !== void 0 ? _a : undefined;
            this.apparenceBorderWidth = '0px';
        };
        DaleStock.prototype.selectItem = function (item_id) {
            _super.prototype.selectItem.call(this, item_id);
            this.orderedSelection.selectItem(+item_id);
        };
        DaleStock.prototype.unselectItem = function (item_id) {
            _super.prototype.unselectItem.call(this, item_id);
            this.orderedSelection.unselectItem(+item_id);
        };
        DaleStock.prototype.setSelectionMode = function (mode, iconType, actionLabel, actionLabelText) {
            var _a, _b;
            if (iconType === void 0) { iconType = 'none'; }
            this.orderedSelection.setIconType(iconType);
            this.setActionLabel(actionLabel, actionLabelText);
            _super.prototype.setSelectionMode.call(this, mode);
            for (var i in this.items) {
                var card_id = this.items[i].id;
                if (mode == 0) {
                    (_a = $(this.control_name + "_item_" + card_id)) === null || _a === void 0 ? void 0 : _a.classList.remove("dale-clickable");
                }
                else {
                    (_b = $(this.control_name + "_item_" + card_id)) === null || _b === void 0 ? void 0 : _b.classList.add("dale-clickable");
                }
            }
        };
        DaleStock.prototype.setActionLabel = function (label, text) {
            var _a;
            if (label === void 0) { label = 'dale-label-default'; }
            if (this.actionLabelWrap) {
                if (label == 'dale-label-text') {
                    if (!this.actionLabelText) {
                        throw new Error("Please correctly initialize actionLabelText");
                    }
                    this.actionLabelText.innerHTML = text !== null && text !== void 0 ? text : _("<Missing Text>");
                }
                (_a = this.actionLabelWrap.classList).remove.apply(_a, this.actionLabelClasses);
                if (label) {
                    this.actionLabelWrap.classList.add(label);
                }
            }
        };
        DaleStock.prototype.updateHTML = function (card) {
            console.log("updateHTML for DaleStock '".concat(this.control_name, "'"));
            if (card) {
                if (card.isBoundChameleon()) {
                    this.addChameleonOverlay(card);
                }
                else {
                    this.removeChameleonOverlay(card);
                }
            }
            else {
                for (var _i = 0, _a = this.getAllItems(); _i < _a.length; _i++) {
                    var item = _a[_i];
                    this.updateHTML(new DaleCard_2.DaleCard(item.id, item.type));
                }
            }
        };
        DaleStock.prototype.addChameleonOverlay = function (card, fadein) {
            if (fadein === void 0) { fadein = true; }
            var stockitem = $(this.control_name + "_item_" + card.id);
            if (!stockitem) {
                return;
            }
            var old_overlay = stockitem === null || stockitem === void 0 ? void 0 : stockitem.querySelector(".dale-card");
            if (old_overlay) {
                if (old_overlay.classList.contains("type-id-" + card.effective_type_id)) {
                    return;
                }
                this.removeChameleonOverlay(card);
            }
            var overlay = card.toDiv();
            overlay.classList.add("type-id-" + card.effective_type_id);
            overlay.classList.add("dale-overlay");
            stockitem.appendChild(overlay);
            if (fadein) {
                dojo.setStyle(overlay, 'opacity', '0');
                dojo.fadeIn({ node: overlay }).play();
            }
            card.addTooltip(stockitem);
        };
        DaleStock.prototype.removeChameleonOverlay = function (card) {
            var stockitem = $(this.control_name + "_item_" + card.id);
            var old_overlay = stockitem === null || stockitem === void 0 ? void 0 : stockitem.querySelector(".dale-card");
            if (old_overlay) {
                dojo.fadeOut({ node: old_overlay, onEnd: function (node) { dojo.destroy(node); } }).play();
                card.addTooltip(stockitem);
            }
        };
        DaleStock.prototype.addDaleCardToStock = function (card, from) {
            this.addToStockWithId(card.original_type_id, card.id, from);
            card.addTooltip(this.control_name + '_item_' + card.id);
            if (card.isBoundChameleon()) {
                this.addChameleonOverlay(card, false);
            }
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
        DaleStock.prototype.updateDisplay = function (from) {
            var containerWidth = dojo.marginBox(this.control_name).w;
            var totalWidth = this.item_width * this.items.length + 5;
            this.item_margin = (containerWidth - totalWidth) / Math.max(1, this.items.length - 1);
            this.item_margin = Math.min(-3, this.item_margin);
            if (this.item_margin != -3) {
                console.log(this.item_margin);
            }
            _super.prototype.updateDisplay.call(this, from);
            var div = undefined;
            for (var i in this.items) {
                var item = this.items[i];
                var index = +i + 1;
                div = $(this.getItemDivId(String(item.id)));
                div.dataset['arc'] = index + '/' + this.items.length;
                dojo.setStyle(div, 'z-index', String(Images_2.Images.Z_INDEX_HAND_CARD + index));
            }
            if (this.item_margin < 0) {
                console.log("GOT HERE");
                dojo.setStyle(this.container_div, 'left', "".concat(this.item_margin / 2, "px"));
            }
        };
        DaleStock.MAX_HORIZONTAL_OVERLAP = 85;
        return DaleStock;
    }(Stock));
    exports.DaleStock = DaleStock;
});
define("components/types/ChameleonClientStateArgs", ["require", "exports", "components/DaleStock", "components/Pile"], function (require, exports, DaleStock_1, Pile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChameleonClientStateArgs = void 0;
    var ChameleonClientStateArgs = (function () {
        function ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain) {
            if (requiresPlayable === void 0) { requiresPlayable = false; }
            if (isChain === void 0) { isChain = false; }
            this.card = card;
            this.location = from;
            this.callback = callback;
            this.requiresPlayable = requiresPlayable;
            this.isChain = isChain;
        }
        ChameleonClientStateArgs.prototype.selectChameleonCard = function () {
            var card_div = undefined;
            if (this.location instanceof DaleStock_1.DaleStock) {
                card_div = $(this.location.control_name + "_item_" + this.card.id);
            }
            else if (this.location instanceof Pile_1.Pile) {
                card_div = this.location.getPopinCardDiv(this.card.id);
                this.location.topCardHTML.classList.add("chameleon-selected");
            }
            card_div === null || card_div === void 0 ? void 0 : card_div.classList.add("chameleon-selected");
        };
        ChameleonClientStateArgs.prototype.unselectChameleonCard = function () {
            var card_div = undefined;
            if (this.location instanceof DaleStock_1.DaleStock) {
                card_div = $(this.location.control_name + "_item_" + this.card.id);
            }
            else if (this.location instanceof Pile_1.Pile) {
                card_div = this.location.getPopinCardDiv(this.card.id);
                this.location.topCardHTML.classList.remove("chameleon-selected");
            }
            card_div === null || card_div === void 0 ? void 0 : card_div.classList.remove("chameleon-selected");
        };
        return ChameleonClientStateArgs;
    }());
    exports.ChameleonClientStateArgs = ChameleonClientStateArgs;
});
define("components/Pile", ["require", "exports", "components/Images", "components/DaleCard"], function (require, exports, Images_3, DaleCard_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pile = void 0;
    var Pile = (function () {
        function Pile(page, pile_container_id, pile_name, player_id) {
            this.selectionMode = 'none';
            this.selectionMax = 0;
            this.popin = new ebg.popindialog();
            this.cardIdToPopinDiv = new Map();
            page.allPiles.push(this);
            this.pile_container_id = pile_container_id;
            this.pile_name = pile_name;
            this.player_id = player_id;
            $(pile_container_id).innerHTML = "\n            ".concat(pile_name ? "<h3 class=\"name\">".concat(pile_name, "</h3>") : "", "\n            <div class=\"pile\" style=\"").concat(Images_3.Images.getCardStyle(), "\">\n                <div class=\"placeholder\" style=\"").concat(Images_3.Images.getCardStyle(), "\"></div>\n                <div id=\"").concat(pile_container_id, "-top-card\" class=\"clickable dale-card\"></div>\n                <div class=\"size\"></div>\n                <div class=\"size\" style=\"top: 16%;\"></div>\n            </div>\n        ");
            this.page = page;
            this.containerHTML = $(pile_container_id);
            this.placeholderHTML = $(pile_container_id).querySelector('.placeholder');
            this.topCardHTML = $(pile_container_id).querySelector('.dale-card');
            var sizeElements = $(pile_container_id).querySelectorAll('.size');
            this.sizeHTML = sizeElements[0];
            this.selectedSizeHTML = sizeElements[1];
            this.cards = [];
            this._slidingCards = [];
            this.orderedSelectedCardIds = [];
            this.updateHTML();
            dojo.connect(this.topCardHTML, 'onclick', this, "onClickTopCard");
        }
        Object.defineProperty(Pile.prototype, "size", {
            get: function () {
                return this.cards.length;
            },
            enumerable: false,
            configurable: true
        });
        Pile.prototype.updateHTML = function (card) {
            var topCard = this.peek(true);
            if (card != undefined && card.id != (topCard === null || topCard === void 0 ? void 0 : topCard.id)) {
                return;
            }
            if (this.selectionMode == 'multiple' && this.selectionMax > 0) {
                this.selectedSizeHTML.classList.remove("dale-hidden");
                this.selectedSizeHTML.innerHTML = "<span style=\"color: red;\">(x ".concat(this.orderedSelectedCardIds.length, ")</span>");
            }
            else {
                this.selectedSizeHTML.classList.add("dale-hidden");
            }
            this.sizeHTML.innerHTML = 'x ' + this.cards.length;
            if (topCard == undefined) {
                this.topCardHTML.setAttribute('style', "display: none");
            }
            else {
                this.topCardHTML.innerHTML = '';
                this.topCardHTML.setAttribute('style', Images_3.Images.getCardStyle(topCard.effective_type_id));
                if (topCard.isBoundChameleon()) {
                    this.topCardHTML.replaceChildren(DaleCard_3.DaleCard.createChameleonIcon());
                }
            }
        };
        Pile.prototype.setZIndex = function (slidingElement) {
            var z_index = Images_3.Images.Z_INDEX_SLIDING_CARD + this._slidingCards.length;
            var style = slidingElement.getAttribute('style');
            slidingElement.setAttribute('style', style + "z-index: ".concat(z_index, ";"));
        };
        Pile.prototype.removeAt = function (index) {
            if (index == undefined) {
                return this.pop();
            }
            if (index > this.cards.length - 1) {
                throw new Error("Cannot remove a card in pile of size ".concat(this.cards.length, " at index ").concat(index));
            }
            else if (index == this.cards.length - 1) {
                return this.pop();
            }
            return this.cards.splice(index, 1)[0];
        };
        Pile.prototype.insert = function (card, index) {
            if (index > this.cards.length) {
                throw new Error("Cannot insert a card in pile of size ".concat(this.cards.length, " at index ").concat(index));
            }
            else if (index == this.cards.length) {
                this.push(card);
            }
            else {
                this.cards.splice(index, 0, card);
            }
        };
        Pile.prototype.pushHiddenCards = function (amount) {
            for (var i = 0; i < amount; i++) {
                this.cards.push(new DaleCard_3.DaleCard(0, 0));
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
            var _a;
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
            (_a = this.peek()) === null || _a === void 0 ? void 0 : _a.addTooltip(this.topCardHTML.id);
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
        Pile.prototype.getPopinCardDiv = function (card_id) {
            return this.cardIdToPopinDiv.get(card_id);
        };
        Pile.prototype.isPopinOpen = function () {
            return $(this.pile_container_id + '-popin') !== undefined;
        };
        Pile.prototype.onClickTopCard = function () {
            var _a, _b;
            if (this.selectionMode == 'top') {
                this.page.onPileSelectionChanged(this, this.peek());
                return;
            }
            var player = this.player_id ? this.page.gamedatas.players[this.player_id] : undefined;
            var title_player = player ? "<span style=\"font-weight:bold;color:#".concat(player.color, "\">").concat(player.name, "</span>'s ") : "";
            var title_pile_name = (_a = this.pile_name) !== null && _a !== void 0 ? _a : "Unnamed Pile";
            var title = title_player + title_pile_name;
            var popin_id = this.pile_container_id + '-popin';
            this.popin.create(popin_id);
            this.popin.setTitle(title);
            this.popin.setMaxWidth(1000);
            this.popin.setContent("<div id=\"".concat(popin_id, "-card-container\" class=\"popin-card-container\"></div>"));
            var container_id = popin_id + "-card-container";
            var _loop_1 = function (card) {
                var div = card.toDiv(container_id);
                div.classList.add("dale-relative");
                if (this_1.selectionMode != 'none') {
                    div.classList.add("dale-clickable");
                    var thiz_2 = this_1;
                    dojo.connect($(div.id), 'onclick', function () {
                        thiz_2.onClickCard(card, div);
                    });
                }
                if (this_1.orderedSelectedCardIds.includes(card.id)) {
                    div.classList.add("selected");
                }
                if (((_b = this_1.page.chameleonArgs) === null || _b === void 0 ? void 0 : _b.card.id) == card.id) {
                    div.classList.add("chameleon-selected");
                }
                this_1.cardIdToPopinDiv.set(card.id, div);
            };
            var this_1 = this;
            for (var _i = 0, _c = this.cards; _i < _c.length; _i++) {
                var card = _c[_i];
                _loop_1(card);
            }
            dojo.connect($("popin_" + this.popin.id + "_close"), "onclick", this, "onClosePopin");
            this.popin.show();
        };
        Pile.prototype.onClickCard = function (card, div) {
            var chameleonArgs = this.page.chameleonArgs;
            if (chameleonArgs) {
                if (chameleonArgs.card.id == card.id) {
                    this.page.onCancelChameleon();
                }
                else {
                    this.page.showMessage(_("Please select a valid target for ") + "'".concat(chameleonArgs.card.name, "'"), "error");
                }
                return;
            }
            switch (this.selectionMode) {
                case 'none':
                    return;
                case 'single':
                    this.popin.hide();
                    break;
                case 'multiple':
                    var card_id = +card.id;
                    var index = this.orderedSelectedCardIds.indexOf(card_id);
                    if (index == -1) {
                        if (this.orderedSelectedCardIds.length >= this.selectionMax) {
                            if (this.selectionMax == 0) {
                                this.page.showMessage(_("You cannot select cards from this pile!"), 'error');
                            }
                            else if (this.selectionMax == 1) {
                                this.page.showMessage(_("You can only select 1 card from this pile!"), 'error');
                            }
                            else {
                                this.page.showMessage(_("You already selected the maximum number of cards from this pile") + "[".concat(this.selectionMax, "]"), 'error');
                            }
                            return;
                        }
                        this.selectItem(card_id);
                    }
                    else {
                        this.unselectItem(card_id);
                    }
                    console.log(this.orderedSelectedCardIds);
                    this.updateHTML();
                    break;
            }
            this.page.onPileSelectionChanged(this, card);
        };
        Pile.prototype.unselectItem = function (card_id) {
            var div = this.cardIdToPopinDiv.get(card_id);
            if (div) {
                var index = this.orderedSelectedCardIds.indexOf(card_id);
                if (index == -1) {
                    console.error("card_id = ".concat(card_id, " was not found in the pile"));
                }
                div.classList.remove("selected");
                this.orderedSelectedCardIds.splice(index, 1);
            }
            console.log(this.orderedSelectedCardIds);
        };
        Pile.prototype.selectItem = function (card_id) {
            var _a;
            var div = this.cardIdToPopinDiv.get(card_id);
            if (div) {
                (_a = this.cardIdToPopinDiv.get(card_id)) === null || _a === void 0 ? void 0 : _a.classList.add("selected");
                this.orderedSelectedCardIds.push(card_id);
            }
            console.log(this.orderedSelectedCardIds);
        };
        Pile.prototype.setSelectionMode = function (mode, max) {
            if (max === void 0) { max = 0; }
            if (mode != 'multiple') {
                this.orderedSelectedCardIds = [];
            }
            if (max < this.selectionMax) {
                this.orderedSelectedCardIds = this.orderedSelectedCardIds.slice(0, max);
            }
            this.selectionMax = max;
            this.selectionMode = mode;
            this.updateHTML();
        };
        Pile.prototype.closePopin = function () {
            this.popin.hide();
            this.onClosePopin();
        };
        Pile.prototype.onClosePopin = function () {
            var _a;
            console.log("onClosePopin");
            for (var _i = 0, _b = this.cards; _i < _b.length; _i++) {
                var card = _b[_i];
                card.destroyTooltip();
            }
            (_a = this.cards[this.cards.length - 1]) === null || _a === void 0 ? void 0 : _a.addTooltip(this.topCardHTML.id);
        };
        return Pile;
    }());
    exports.Pile = Pile;
});
define("components/HiddenPile", ["require", "exports", "components/DaleCard", "components/Pile"], function (require, exports, DaleCard_4, Pile_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HiddenPile = void 0;
    var HiddenPile = (function (_super) {
        __extends(HiddenPile, _super);
        function HiddenPile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HiddenPile.prototype.push = function (_card, from, onEnd, duration, delay) {
            _super.prototype.push.call(this, new DaleCard_4.DaleCard(0, 0), from, onEnd, duration, delay);
        };
        return HiddenPile;
    }(Pile_2.Pile));
    exports.HiddenPile = HiddenPile;
});
define("components/CardSlot", ["require", "exports", "components/DaleCard"], function (require, exports, DaleCard_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CardSlot = void 0;
    var CardSlot = (function () {
        function CardSlot(parent, pos, container, card) {
            this.clickable = false;
            parent.page.allCardSlots.push(this);
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
        CardSlot.prototype.updateHTML = function () {
            var card = this.removeCard();
            if (card) {
                this.insertCard(card);
            }
        };
        CardSlot.prototype.hasCard = function () {
            return this._card != undefined;
        };
        CardSlot.prototype.insertCard = function (card, from, callback) {
            this.removeCard();
            var cardDiv = card.toDiv(this.id);
            this._container.appendChild(cardDiv);
            this._card = card;
            this.setClickable(this.clickable);
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
            var allCardSlots = this.parent.page.allCardSlots;
            var index = allCardSlots.indexOf(this);
            if (index > -1) {
                allCardSlots.splice(index, 1);
            }
            this.removeCard();
            this._container.remove();
        };
        CardSlot.prototype.selectItem = function () {
            this._container.classList.add("selected");
            this.selected = true;
        };
        CardSlot.prototype.unselectItem = function () {
            this._container.classList.remove("selected");
            this.selected = false;
        };
        CardSlot.prototype.setClickable = function (enable) {
            var _a;
            this.clickable = enable;
            var div = (_a = this._card) === null || _a === void 0 ? void 0 : _a.div;
            if (div) {
                if (enable) {
                    var thiz_3 = this;
                    div.onclick = function (evt) {
                        evt.stopPropagation();
                        thiz_3.parent.onCardSlotClick(thiz_3);
                    };
                    div.classList.add("dale-clickable");
                }
                else {
                    div.classList.remove("dale-clickable");
                    div.onclick = null;
                }
            }
        };
        CardSlot.prototype.swapWithStock = function (stock, card_id) {
            if (!this.hasCard()) {
                throw new Error("'swapWithStock' called on an empty slot");
            }
            if (!stock.getItemById(card_id)) {
                throw new Error("'swapWithStock' called with a card that is not in '".concat(stock.control_name, "' (card_id = ").concat(card_id, ")"));
            }
            var div = $(stock.control_name + "_item_" + card_id);
            stock.addDaleCardToStock(this._card, this._container);
            this.insertCard(new DaleCard_5.DaleCard(card_id), div);
            stock.removeFromStockByIdNoAnimation(card_id);
        };
        CardSlot.UNIQUE_ID = 0;
        return CardSlot;
    }());
    exports.CardSlot = CardSlot;
});
define("components/MarketBoard", ["require", "exports", "components/Images", "components/CardSlot", "components/OrderedSelection"], function (require, exports, Images_4, CardSlot_1, OrderedSelection_2) {
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
            this.orderedSelection = new OrderedSelection_2.OrderedSelection();
            this.selectionMode = 0;
        }
        Object.defineProperty(MarketBoard.prototype, "size", {
            get: function () {
                var nbr = 0;
                for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                    var slot = _a[_i];
                    if (slot.hasCard()) {
                        nbr++;
                    }
                }
                return nbr;
            },
            enumerable: false,
            configurable: true
        });
        MarketBoard.prototype.updateHTML = function (card) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var slot = _b[_i];
                if (card == undefined || card.id == ((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id)) {
                    slot.updateHTML();
                }
            }
        };
        MarketBoard.prototype.posOf = function (card_id) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var slot = _b[_i];
                if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                    return slot.pos;
                }
            }
            throw new Error("card ".concat(card_id, " does not exist in the market!"));
        };
        MarketBoard.prototype.getCardId = function (pos) {
            pos = this.getValidPos(pos);
            if (this.slots[pos].hasCard()) {
                return this.slots[pos].card.id;
            }
            throw new Error("There is no card in market slot ".concat(pos));
        };
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
        MarketBoard.prototype.setSelectionMode = function (mode, iconType) {
            if (iconType === void 0) { iconType = 'none'; }
            this.orderedSelection.setIconType(iconType);
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
            if (enable) {
                this.slots[pos].selectItem();
            }
            else {
                this.slots[pos].unselectItem();
            }
        };
        MarketBoard.prototype.selectItem = function (card_id) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var slot = _b[_i];
                if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                    slot.selectItem();
                    return;
                }
            }
            console.warn("Attempted to select a card (card_id = ".concat(card_id, ") that is not present in the market"));
        };
        MarketBoard.prototype.unselectItem = function (card_id) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var slot = _b[_i];
                if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                    slot.unselectItem();
                    return;
                }
            }
            console.warn("Attempted to unselect a card (card_id = ".concat(card_id, ") that is not present in the market"));
        };
        MarketBoard.prototype.unselectAll = function () {
            this.orderedSelection.unselectAll();
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.unselectItem();
            }
        };
        MarketBoard.prototype.onCardSlotClick = function (slot) {
            if (slot.hasCard()) {
                if (this.selectionMode == 2) {
                    this.orderedSelection.toggle(slot.card.id);
                }
                this.page.onMarketCardClick(slot.card, slot.pos);
            }
            else {
                this.page.showMessage(_("This card is sold out!"), 'error');
            }
        };
        MarketBoard.prototype.swapWithStock = function (card_id, stock, new_card_id) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var slot = _b[_i];
                if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                    slot.swapWithStock(stock, new_card_id);
                }
            }
        };
        return MarketBoard;
    }());
    exports.MarketBoard = MarketBoard;
});
define("components/DaleIcons", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleIcons = void 0;
    var DaleIcons = (function () {
        function DaleIcons() {
        }
        DaleIcons.getIcon = function (row, col) {
            var icon = document.createElement("i");
            icon.classList.add("dale-icon");
            icon.setAttribute('style', "\n            background-size: ".concat(DaleIcons.COLUMNS, "00% ").concat(DaleIcons.ROWS, "00%;\n            background-position: -").concat(col, "00% -").concat(row, "00%;\n        "));
            return icon;
        };
        DaleIcons.getBuildIcon = function () {
            return this.getIcon(2, 1);
        };
        DaleIcons.ROWS = 4;
        DaleIcons.COLUMNS = 6;
        DaleIcons.ICON_WIDTH = 150;
        DaleIcons.ICON_HEIGHT = 150;
        DaleIcons.BACKGROUND_WIDTH = DaleIcons.ICON_WIDTH * DaleIcons.COLUMNS;
        DaleIcons.BACKGROUND_HEIGHT = DaleIcons.ICON_HEIGHT * DaleIcons.ROWS;
        return DaleIcons;
    }());
    exports.DaleIcons = DaleIcons;
});
define("components/Stall", ["require", "exports", "components/DaleCard", "components/Images", "components/CardSlot", "components/DaleIcons"], function (require, exports, DaleCard_6, Images_5, CardSlot_2, DaleIcons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Stall = void 0;
    var Stall = (function () {
        function Stall(page, player_id) {
            this.page = page;
            this.player_id = player_id;
            this.container = $("stall-" + player_id);
            this.stackContainers = [];
            this.selectionMode = 'none';
            this.slots = [];
            this.numberOfStacks = 0;
            for (var i = 0; i < Stall.MAX_STACKS; i++) {
                this.createNewStack();
            }
            dojo.setStyle(this.container.parentElement, 'max-width', Images_5.Images.CARD_WIDTH_S * (1 - Images_5.Images.STACK_MIN_OVERLAP_X) * Stall.MAX_STACKS + 'px');
        }
        Object.defineProperty(Stall.prototype, "leftMostPlaceholder", {
            get: function () {
                var _a;
                var placeholder = (_a = this.container.querySelector(".dale-stack-placeholder-first")) !== null && _a !== void 0 ? _a : this.container.querySelector(".dale-stack-placeholder");
                if (placeholder) {
                    return placeholder;
                }
                console.warn("Failed to find a stall placeholder");
                return undefined;
            },
            enumerable: false,
            configurable: true
        });
        Stall.prototype.createNewStack = function () {
            if (this.slots.length < Stall.MAX_STACKS) {
                if (this.stackContainers.length > 0) {
                    var prevStackContainer = this.stackContainers[this.stackContainers.length - 1];
                    prevStackContainer.setAttribute('style', "max-width: ".concat(Images_5.Images.CARD_WIDTH_S * (1 - Images_5.Images.STACK_MIN_OVERLAP_X), "px;"));
                }
                var stackContainer = document.createElement("div");
                stackContainer.classList.add("stack-container");
                stackContainer.setAttribute('style', "min-width: ".concat(Images_5.Images.CARD_WIDTH_S, "px;"));
                var placeholder = document.createElement("div");
                if (this.slots.length == 0) {
                    placeholder.classList.add("dale-stack-placeholder-first");
                    var text = document.createElement("div");
                    text.classList.add("dale-text");
                    text.textContent = _("Build a new stack");
                    placeholder.appendChild(text);
                }
                else {
                    placeholder.classList.add("dale-stack-placeholder");
                    stackContainer.classList.add("dale-grayed-out");
                }
                placeholder.setAttribute('style', "".concat(Images_5.Images.getCardStyle(), ";"));
                var stackIndexDiv = document.createElement("div");
                stackIndexDiv.classList.add("dale-stack-index");
                stackIndexDiv.innerText = String(this.slots.length + 1);
                placeholder.append(stackIndexDiv);
                placeholder.appendChild(DaleIcons_1.DaleIcons.getBuildIcon());
                stackContainer.appendChild(placeholder);
                this.container.appendChild(stackContainer);
                this.stackContainers.push(stackContainer);
                this.slots.push([]);
            }
            else {
                throw new Error("Attempted to create stack index ".concat(this.slots.length, " (exceeding ").concat(Stall.MAX_STACKS, ")"));
            }
        };
        Stall.prototype.updateHeight = function () {
            var _a;
            var stackContainer = this.stackContainers[0];
            if (stackContainer) {
                var maxHeight = 0;
                for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                    var stack = _b[_i];
                    maxHeight = Math.max(maxHeight, stack.length);
                }
                var y_offset = Images_5.Images.VERTICAL_STACK_OFFSET_S * (maxHeight - 1);
                console.log("Update height");
                console.log(stackContainer.getAttribute('style'));
                var prevStyleWithoutHeight = (_a = stackContainer.getAttribute('style')) === null || _a === void 0 ? void 0 : _a.replace(/height:.*px;/, '');
                console.log(prevStyleWithoutHeight);
                stackContainer.setAttribute('style', prevStyleWithoutHeight + "height: ".concat(Images_5.Images.CARD_HEIGHT_S + y_offset, "px;"));
            }
        };
        Stall.prototype.updateHTML = function (card) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var stack = _b[_i];
                for (var _c = 0, stack_1 = stack; _c < stack_1.length; _c++) {
                    var slot = stack_1[_c];
                    if (card == undefined || card.id == ((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id)) {
                        slot.updateHTML();
                    }
                }
            }
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
            stackContainer.appendChild(div);
            var pos = this.getPos(stack_index, index);
            stack.push(new CardSlot_2.CardSlot(this, pos, div, card));
            this.updateHeight();
        };
        Stall.prototype.insertDbCard = function (card, from) {
            var pos = +card.location_arg;
            var index = pos % Stall.MAX_STACK_SIZE;
            var stack_index = (pos - index) / Stall.MAX_STACK_SIZE;
            this.insertCard(DaleCard_6.DaleCard.of(card), stack_index, index, from);
        };
        Stall.prototype.insertCard = function (card, stack_index, index, from) {
            var _a, _b;
            if (stack_index > this.numberOfStacks) {
                throw new Error("Cannot insert a card at stack index ".concat(stack_index, ", because only ").concat(this.numberOfStacks, " stacks exist"));
            }
            else if (stack_index == this.numberOfStacks) {
                (_a = this.leftMostPlaceholder) === null || _a === void 0 ? void 0 : _a.remove();
                this.numberOfStacks += 1;
            }
            var stackContainer = this.stackContainers[stack_index];
            stackContainer.classList.remove("dale-grayed-out");
            var stack = this.slots[stack_index];
            if (index == undefined) {
                index = 0;
                while ((_b = stack[index]) === null || _b === void 0 ? void 0 : _b.hasCard()) {
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
            return this.numberOfStacks;
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
                throw new Error("Cannot access index ".concat(index, " of stack ").concat(stack_index, " of size ").concat(stack.length, "."));
            }
            return stack[index];
        };
        Stall.prototype.getSlotId = function (pos) {
            var index = pos % Stall.MAX_STACK_SIZE;
            var stack_index = (pos - index) / Stall.MAX_STACK_SIZE;
            return this.getSlot(stack_index, index).id;
        };
        Stall.prototype.setSelectionMode = function (mode) {
            console.log("Stall setSelectionMode");
            console.log(mode);
            this.unselectAll();
            this.selectionMode = mode;
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var stack = _a[_i];
                for (var _b = 0, stack_2 = stack; _b < stack_2.length; _b++) {
                    var slot = stack_2[_b];
                    switch (mode) {
                        case 'none':
                            slot.setClickable(false);
                            break;
                        case 'single':
                            slot.setClickable(true);
                            break;
                        case 'rightmoststack':
                            slot.setClickable(stack === this.slots[this.numberOfStacks - 1]);
                            break;
                    }
                }
            }
        };
        Stall.prototype.setLeftPlaceholderClickable = function (enable) {
            var placeholder = this.leftMostPlaceholder;
            if (placeholder) {
                if (enable) {
                    placeholder.classList.add("dale-clickable");
                    placeholder.parentElement.classList.remove("dale-grayed-out");
                    placeholder.onclick = this.page.onRequestBuildAction.bind(this.page);
                }
                else {
                    placeholder.classList.remove("dale-clickable");
                    placeholder.parentElement.classList.add("dale-grayed-out");
                    placeholder.onclick = null;
                }
            }
        };
        Stall.prototype.selectLeftPlaceholder = function () {
            var placeholder = this.leftMostPlaceholder;
            if (placeholder) {
                placeholder.classList.add("dale-selected");
                placeholder.parentElement.classList.remove("dale-grayed-out");
            }
        };
        Stall.prototype.unselectLeftPlaceholder = function () {
            var placeholder = this.leftMostPlaceholder;
            if (placeholder) {
                placeholder.classList.remove("dale-selected");
                placeholder.parentElement.classList.add("dale-grayed-out");
            }
        };
        Stall.prototype.selectItem = function (card_id) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var stack = _b[_i];
                for (var _c = 0, stack_3 = stack; _c < stack_3.length; _c++) {
                    var slot = stack_3[_c];
                    if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                        slot.selectItem();
                        return;
                    }
                }
            }
            console.warn("Attempted to select a card (card_id = ".concat(card_id, ") that is not present in the stall"));
        };
        Stall.prototype.unselectItem = function (card_id) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var stack = _b[_i];
                for (var _c = 0, stack_4 = stack; _c < stack_4.length; _c++) {
                    var slot = stack_4[_c];
                    if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                        slot.unselectItem();
                        return;
                    }
                }
            }
            console.warn("Attempted to unselect a card (card_id = ".concat(card_id, ") that is not present in the stall"));
        };
        Stall.prototype.unselectAll = function () {
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var stack = _a[_i];
                for (var _b = 0, stack_5 = stack; _b < stack_5.length; _b++) {
                    var slot = stack_5[_b];
                    slot.unselectItem();
                }
            }
        };
        Stall.prototype.onCardSlotClick = function (slot) {
            var index = slot.pos % Stall.MAX_STACK_SIZE;
            var stack_index = (slot.pos - index) / Stall.MAX_STACK_SIZE;
            this.page.onStallCardClick(this, slot.card, stack_index, index);
        };
        Stall.prototype.swapWithStock = function (card_id, stock, new_card_id) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var stack = _b[_i];
                for (var _c = 0, stack_6 = stack; _c < stack_6.length; _c++) {
                    var slot = stack_6[_c];
                    if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                        slot.swapWithStock(stock, new_card_id);
                    }
                }
            }
        };
        Stall.MAX_STACK_SIZE = 1000;
        Stall.MAX_STACKS = 8;
        return Stall;
    }());
    exports.Stall = Stall;
});
define("components/DaleHand", ["require", "exports", "components/DaleCard", "components/OrderedSelection", "components/Images"], function (require, exports, DaleCard_7, OrderedSelection_3, Images_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleHand = void 0;
    var DaleHand = (function () {
        function DaleHand(page, wrap, container) {
            this.actionLabelClasses = ['dale-technique', 'dale-purchase', 'dale-build', 'dale-discard'];
            this.selectionMode = 'none';
            this.orderedSelection = new OrderedSelection_3.OrderedSelection();
            this.page = page;
            this.wrap = wrap;
            this.container = container;
            dojo.setStyle(wrap, 'min-height', Images_6.Images.CARD_WIDTH_S + 'px');
            this.addCard(new DaleCard_7.DaleCard(1000, 0));
            this.addCard(new DaleCard_7.DaleCard(1001, 1));
            this.addCard(new DaleCard_7.DaleCard(1002, 2));
        }
        DaleHand.prototype.addCard = function (card, from) {
            var div = card.toDiv(this.container);
            if (this.selectionMode != 'none') {
                div.classList.add("dale-clickable");
            }
            var thiz = this;
            div.addEventListener('click', function () {
                thiz.onClick(card);
            });
            if (from) {
                var top_1 = window.scrollY + div.getBoundingClientRect().top;
                top_1 += parseFloat(dojo.getStyle(div, 'top'));
                top_1 += -Images_6.Images.CARD_HEIGHT_S / 2;
                var left = window.scrollX + div.getBoundingClientRect().left;
                left += parseFloat(dojo.getStyle(div, 'left'));
                left += Images_6.Images.CARD_WIDTH_S / 2;
                var rotate = dojo.getStyle(div, 'rotate').replace('deg', '');
                dojo.setStyle(div, 'position', 'absolute');
                dojo.setStyle(div, 'z-index', '100');
                this.page.placeOnObject(div, from);
                var slideAnim = dojo.fx.slideTo({ node: div, top: top_1, left: left, delay: 0, onEnd: function () {
                        dojo.setStyle(div, 'top', '');
                        dojo.setStyle(div, 'left', '');
                        dojo.setStyle(div, 'position', '');
                        dojo.setStyle(div, 'z-index', '');
                    } });
                var rotateAnim = new dojo.Animation({
                    curve: [0, rotate],
                    duration: slideAnim.duration,
                    onAnimate: function (value) {
                        dojo.setStyle(div, 'rotate', "".concat(value, "deg"));
                    },
                    onEnd: function () {
                        dojo.setStyle(div, 'rotate', '');
                    }
                });
                dojo.fx.combine([slideAnim, rotateAnim]).play();
            }
        };
        DaleHand.prototype.removeCard = function (card, to, fade) {
            if (fade === void 0) { fade = false; }
            var div = card.div;
            if (!(this.container.contains(div))) {
                throw new Error("Card ".concat(card.id, " was not found in hand"));
            }
            var animSlide = undefined;
            var animFade = undefined;
            dojo.addClass(div, 'to_be_destroyed');
            if (to) {
                animSlide = this.page.slideToObject(div, to);
                ;
            }
            else if (fade) {
                animFade = dojo.fadeOut({ node: div });
            }
            if (animSlide) {
                if (animFade) {
                    dojo.fx.chain([animSlide, animFade]).play();
                }
                else {
                    animSlide.play();
                }
            }
            else if (animFade) {
                animFade.play();
            }
            else {
                div.remove();
            }
        };
        DaleHand.prototype.unselectAll = function () {
            this.orderedSelection.unselectAll();
        };
        DaleHand.prototype.onClick = function (card) {
            console.log(card.name);
            this.orderedSelection.toggle(card.id);
        };
        DaleHand.prototype.setLabel = function (label) {
            var _a;
            (_a = this.wrap.classList).remove.apply(_a, this.actionLabelClasses);
            if (label) {
                console.log("Add " + label);
                console.log(this.wrap);
                this.wrap.classList.add(label);
            }
        };
        DaleHand.prototype.setSelectionMode = function (mode, label) {
            console.log("setSelectionMode");
            this.selectionMode = mode;
            this.setLabel(label);
            this.unselectAll();
            if (mode == 'none') {
                this.container.querySelectorAll(".dale-card").forEach(function (div) {
                    div.classList.remove("dale-clickable");
                });
            }
            else {
                this.container.querySelectorAll(".dale-card").forEach(function (div) {
                    div.classList.add("dale-clickable");
                });
            }
        };
        return DaleHand;
    }());
    exports.DaleHand = DaleHand;
});
define("components/types/MainClientState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainClientState = void 0;
    var MainClientState = (function () {
        function MainClientState(page) {
            this.page = page;
            this.name = 'client_technique';
            this.descriptionmyturn = "";
            this.args = {};
        }
        MainClientState.prototype.exit = function () {
            this.enterClientState('client_technique');
        };
        MainClientState.prototype.enterClientState = function (name, args) {
            var _a;
            if (name) {
                this.name = name;
            }
            this.args = args !== null && args !== void 0 ? args : {};
            this.page.setClientState(this.name, {
                descriptionmyturn: (_a = MainClientState.DESCRIPTIONS.get(this.name)) !== null && _a !== void 0 ? _a : _("<missing client state description>")
            });
        };
        MainClientState.DESCRIPTIONS = new Map([
            ['client_technique', _("asdsad")]
        ]);
        return MainClientState;
    }());
    exports.MainClientState = MainClientState;
});
define("bgagame/dale", ["require", "exports", "ebg/core/gamegui", "components/DaleStock", "components/Pile", "components/HiddenPile", "components/DaleCard", "components/MarketBoard", "components/Stall", "components/types/ChameleonClientStateArgs", "components/DaleHand", "components/types/MainClientState", "ebg/counter", "ebg/stock", "ebg/counter"], function (require, exports, Gamegui, DaleStock_2, Pile_3, HiddenPile_1, DaleCard_8, MarketBoard_1, Stall_1, ChameleonClientStateArgs_1, DaleHand_1, MainClientState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dale = (function (_super) {
        __extends(Dale, _super);
        function Dale() {
            var _this = _super.call(this) || this;
            _this.n = 1000;
            _this.allPiles = [];
            _this.allDaleStocks = [];
            _this.allCardSlots = [];
            _this.marketDeck = new HiddenPile_1.HiddenPile(_this, 'market-deck', 'Supply');
            _this.marketDiscard = new Pile_3.Pile(_this, 'market-discard', 'Bin');
            _this.playerHandSizes = {};
            _this.playerDecks = {};
            _this.playerDiscards = {};
            _this.playerStalls = {};
            _this.playerSchedules = {};
            _this.market = null;
            _this.myHand = new DaleStock_2.DaleStock();
            _this.myHand2 = undefined;
            _this.myTemporary = new DaleStock_2.DaleStock();
            _this.mainClientState = new MainClientState_1.MainClientState(_this);
            console.log('dale constructor');
            return _this;
        }
        Dale.prototype.quick = function () {
            this.myHand2.addCard(new DaleCard_8.DaleCard(this.n + 3, this.n - 1000));
            this.n++;
        };
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
            var _a;
            console.log("Starting game setup");
            console.log("------ GAME DATAS ------ !");
            console.log(this.gamedatas);
            console.log("------------------------");
            DaleCard_8.DaleCard.init(gamedatas.cardTypes);
            console.log("DbEffects:");
            for (var i in gamedatas.effects) {
                var effect = gamedatas.effects[i];
                DaleCard_8.DaleCard.addEffect(effect);
            }
            for (var player_id in gamedatas.players) {
                var player = gamedatas.players[player_id];
                var player_board_div = (_a = $('player_board_' + player_id)) === null || _a === void 0 ? void 0 : _a.querySelector(".player_score");
                dojo.place(this.format_block('jstpl_hand_size', {
                    player: player
                }), player_board_div, 'first');
                this.playerHandSizes[player_id] = new ebg.counter();
                this.playerHandSizes[player_id].create('handsize-' + player_id);
                this.playerHandSizes[player_id].setValue(gamedatas.handSizes[player_id]);
                this.addTooltip('dale-myhandsize-icon-' + player_id, _("Number of cards in hand."), '');
                this.addTooltip('icon_point_' + player_id, _("Number of stacks built."), '');
                this.playerDecks[player_id] = new HiddenPile_1.HiddenPile(this, 'deck-' + player_id, 'Deck', +player_id);
                this.playerDecks[player_id].pushHiddenCards(gamedatas.deckSizes[player_id]);
                this.playerDiscards[player_id] = new Pile_3.Pile(this, 'discard-' + player_id, 'Discard', +player_id);
                for (var i in gamedatas.discardPiles[player_id]) {
                    var card = gamedatas.discardPiles[player_id][+i];
                    this.playerDiscards[player_id].push(DaleCard_8.DaleCard.of(card));
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
                this.marketDiscard.push(DaleCard_8.DaleCard.of(card));
            }
            this.market = new MarketBoard_1.MarketBoard(this);
            for (var i in gamedatas.market) {
                var card = gamedatas.market[i];
                this.market.insertCard(DaleCard_8.DaleCard.of(card), +card.location_arg);
            }
            this.myHand2 = new DaleHand_1.DaleHand(this, $('dale-myhand-wrap-2'), $("dale-myhand-2"));
            this.myHand.init(this, $('dale-myhand'));
            this.myHand.initActionLabelWrap($('dale-myhand-wrap'));
            this.myHand.centerItems = true;
            for (var i in gamedatas.hand) {
                var card = gamedatas.hand[i];
                this.myHand.addDaleCardToStock(DaleCard_8.DaleCard.of(card));
            }
            this.myHand.setSelectionMode(0);
            dojo.connect(this.myHand, 'onChangeSelection', this, 'onHandSelectionChanged');
            var myHand = this.myHand;
            var myHandUpdateDisplay = function () { setTimeout(function () { myHand.updateDisplay(); }, 1); };
            this.myTemporary.init(this, $('mytemporary'), $('mytemporary-wrap'), myHandUpdateDisplay, myHandUpdateDisplay);
            for (var i in gamedatas.temporary) {
                var card = gamedatas.temporary[i];
                this.myTemporary.addDaleCardToStock(DaleCard_8.DaleCard.of(card));
            }
            this.myTemporary.setSelectionMode(0);
            this.myTemporary.autowidth = true;
            dojo.connect(this.myTemporary, 'onChangeSelection', this, 'onTemporarySelectionChanged');
            for (var player_id in gamedatas.schedules) {
                var container = $('schedule-' + player_id);
                var wrap = $('schedule-wrap-' + player_id);
                this.playerSchedules[player_id] = new DaleStock_2.DaleStock();
                this.playerSchedules[player_id].init(this, container, wrap);
                this.playerSchedules[player_id].setSelectionMode(0);
                this.playerSchedules[player_id].autowidth = true;
                this.playerSchedules[player_id].duration = 500;
                for (var card_id in gamedatas.schedules[player_id]) {
                    var card = gamedatas.schedules[+player_id][+card_id];
                    this.playerSchedules[player_id].addDaleCardToStock(DaleCard_8.DaleCard.of(card));
                }
            }
            this.setupNotifications();
            console.log("Ending game setup");
        };
        Dale.prototype.onEnteringState = function (stateName, args) {
            var _a, _b, _c, _d, _e;
            console.log('Entering state: ' + stateName);
            if (stateName == 'nextPlayer') {
                console.log("nextPlayer, expire all effects that last until end of turn");
                DaleCard_8.DaleCard.removeEndOfTurnEffects();
                this.mainClientState.exit();
                this.updateHTML();
            }
            if (!this.isCurrentPlayerActive()) {
                return;
            }
            switch (stateName) {
                case 'playerTurn':
                    this.mainClientState.enterClientState();
                    break;
                case 'client_purchase':
                    var client_purchase_args = this.mainClientState.args;
                    this.myHand.setSelectionMode(2, 'pileYellow', 'dale-label-purchase');
                    this.market.setSelectionMode(1);
                    if (client_purchase_args.on_market_board) {
                        this.market.setSelected(client_purchase_args.pos, true);
                    }
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_technique':
                    this.myHand.setSelectionMode(1, 'pileBlue', 'dale-label-technique');
                    this.market.setSelectionMode(1);
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_build':
                    this.myHand.setSelectionMode(2, 'build', 'dale-label-build');
                    this.market.setSelectionMode(1);
                    this.myStall.selectLeftPlaceholder();
                    this.onBuildSelectionChanged();
                    break;
                case 'client_inventory':
                    this.myHand.setSelectionMode(2, 'pileBlue', 'dale-label-discard');
                    this.market.setSelectionMode(1);
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'winterIsComing':
                    this.myHand.setSelectionMode(2, 'build', 'dale-label-build');
                    this.myStall.selectLeftPlaceholder();
                    this.onBuildSelectionChanged();
                    break;
                case 'swiftBroker':
                    this.myHand.setSelectionMode(2, 'pileBlue', 'dale-label-text', _("Choose the order to discard your hand"));
                    break;
                case 'shatteredRelic':
                    this.myHand.setSelectionMode(1, 'none', 'dale-label-text', _("Choose a card to <strong>ditch</strong>"));
                    break;
                case 'spyglass':
                    this.myTemporary.setSelectionMode(2, 'hand');
                    break;
                case 'acorn':
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            this.playerStalls[player_id].setSelectionMode('single');
                        }
                    }
                    break;
                case 'giftVoucher':
                    this.market.setSelectionMode(1);
                    break;
                case 'loyalPartner':
                    this.market.setSelectionMode(2, 'pileBlue');
                    break;
                case 'prepaidGood':
                    this.market.setSelectionMode(1);
                    break;
                case 'chameleon_flexibleShopkeeper':
                    this.myStall.setSelectionMode('rightmoststack');
                    (_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.selectChameleonCard();
                    break;
                case 'chameleon_reflection':
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            this.playerDiscards[player_id].setSelectionMode('top');
                        }
                    }
                    (_b = this.chameleonArgs) === null || _b === void 0 ? void 0 : _b.selectChameleonCard();
                    break;
                case 'chameleon_goodoldtimes':
                    this.marketDiscard.setSelectionMode('top');
                    if (this.chameleonArgs.card.hasActiveAbility()) {
                        this.marketDeck.setSelectionMode('top');
                    }
                    (_c = this.chameleonArgs) === null || _c === void 0 ? void 0 : _c.selectChameleonCard();
                    break;
                case 'chameleon_trendsetting':
                    this.market.setSelectionMode(1);
                    (_d = this.chameleonArgs) === null || _d === void 0 ? void 0 : _d.selectChameleonCard();
                    break;
                case 'chameleon_seeingdoubles':
                    (_e = this.chameleonArgs) === null || _e === void 0 ? void 0 : _e.selectChameleonCard();
            }
        };
        Dale.prototype.onLeavingState = function (stateName) {
            var _a, _b, _c, _d, _e;
            console.log('Leaving state: ' + stateName);
            if (this.chameleonArgs && stateName.substring(0, 9) != 'chameleon') {
                console.log("this.chameleonArgs => don't turn off selection modes");
                return;
            }
            switch (stateName) {
                case 'playerTurn':
                    break;
                case 'client_purchase':
                    this.market.unselectAll();
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode(0);
                    this.myStall.setLeftPlaceholderClickable(false);
                    break;
                case 'client_technique':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode(0);
                    this.myStall.setLeftPlaceholderClickable(false);
                    break;
                case 'client_build':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode(0);
                    this.myStall.unselectLeftPlaceholder();
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'client_inventory':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode(0);
                    this.myStall.setLeftPlaceholderClickable(false);
                    break;
                case 'winterIsComing':
                    this.myHand.setSelectionMode(0);
                    this.myStall.unselectLeftPlaceholder();
                    this.myDiscard.setSelectionMode('none');
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
                case 'acorn':
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            this.playerStalls[player_id].setSelectionMode('none');
                        }
                    }
                    break;
                case 'giftVoucher':
                    this.market.setSelectionMode(0);
                    break;
                case 'loyalPartner':
                    this.market.setSelectionMode(0);
                    break;
                case 'prepaidGood':
                    this.market.setSelectionMode(0);
                    break;
                case 'chameleon_flexibleShopkeeper':
                    this.myStall.setSelectionMode('none');
                    (_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.unselectChameleonCard();
                    break;
                case 'chameleon_reflection':
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            this.playerDiscards[player_id].setSelectionMode('none');
                        }
                    }
                    (_b = this.chameleonArgs) === null || _b === void 0 ? void 0 : _b.unselectChameleonCard();
                    break;
                case 'chameleon_goodoldtimes':
                    this.marketDiscard.setSelectionMode('none');
                    this.marketDeck.setSelectionMode('none');
                    (_c = this.chameleonArgs) === null || _c === void 0 ? void 0 : _c.unselectChameleonCard();
                    break;
                case 'chameleon_trendsetting':
                    this.market.setSelectionMode(0);
                    (_d = this.chameleonArgs) === null || _d === void 0 ? void 0 : _d.unselectChameleonCard();
                    break;
                case 'chameleon_seeingdoubles':
                    (_e = this.chameleonArgs) === null || _e === void 0 ? void 0 : _e.unselectChameleonCard();
            }
        };
        Dale.prototype.onUpdateActionButtons = function (stateName, args) {
            console.log('onUpdateActionButtons: ' + stateName, args);
            if (!this.isCurrentPlayerActive())
                return;
            switch (stateName) {
                case 'playerTurn':
                    break;
                case 'client_technique':
                    this.addActionButton("confirm-button", _("Inventory Action"), "onRequestInventoryAction");
                    break;
                case 'client_purchase':
                    this.addActionButton("confirm-button", _("Confirm Funds"), "onPurchase");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_build':
                    this.addActionButton("confirm-button", _("Confirm Selection"), "onBuild");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_inventory':
                    this.addActionButton("confirm-button", _("Discard Selection"), "onInventoryAction");
                    this.addActionButtonCancelClient();
                    break;
                case 'winterIsComing':
                    this.addActionButton("skip-button", _("Skip"), "onWinterIsComingSkip", undefined, false, 'gray');
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
                case 'acorn':
                    this.addActionButtonCancel();
                    break;
                case 'giftVoucher':
                    this.addActionButtonCancel();
                    break;
                case 'loyalPartner':
                    this.addActionButton("confirm-button", _("Ditch All"), "onLoyalPartner");
                    this.addActionButtonCancel();
                    break;
                case 'prepaidGood':
                    this.addActionButtonCancel();
                    break;
                case 'chameleon_flexibleShopkeeper':
                    this.addActionButtonCancelChameleon();
                    break;
                case 'chameleon_reflection':
                    this.addActionButtonCancelChameleon();
                    break;
                case 'chameleon_goodoldtimes':
                    if (this.chameleonArgs.card.hasActiveAbility()) {
                        this.addActionButton("throw-away-button", _("Ditch"), "onGoodOldTimesPassive");
                    }
                    this.addActionButton("copy-button", _("Copy"), "onGoodOldTimesBind");
                    this.addActionButtonCancelChameleon();
                    break;
                case 'chameleon_trendsetting':
                    this.addActionButtonCancelChameleon();
                    break;
                case 'chameleon_seeingdoubles':
                    this.addActionButtonCancelChameleon();
                    break;
            }
        };
        Dale.prototype.handleChameleonCard = function (card, from, callback, requiresPlayable, isChain) {
            if (requiresPlayable === void 0) { requiresPlayable = false; }
            if (isChain === void 0) { isChain = false; }
            callback = callback.bind(this);
            if (!card || !this.checkLock()) {
                callback();
                return;
            }
            if (!isChain && card.isBoundChameleon() && card.effective_type_id != DaleCard_8.DaleCard.CT_GOODOLDTIMES) {
                card.unbindChameleonLocal();
                from.updateHTML(card);
                callback(card);
                return;
            }
            switch (card.effective_type_id) {
                case DaleCard_8.DaleCard.CT_FLEXIBLESHOPKEEPER:
                    if (this.myStall.getNumberOfStacks() == 0) {
                        console.log("No valid targets for CT_FLEXIBLESHOPKEEPER");
                        callback(card);
                        return;
                    }
                    this.chameleonArgs = new ChameleonClientStateArgs_1.ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain);
                    this.setClientState('chameleon_flexibleShopkeeper', {
                        descriptionmyturn: requiresPlayable ?
                            _("Flexible Shopkeeper: ${you} must copy a technique card from your rightmost stack") :
                            _("Flexible Shopkeeper: ${you} must copy a card from your rightmost stack")
                    });
                    break;
                case DaleCard_8.DaleCard.CT_REFLECTION:
                    var has_valid_target = false;
                    for (var _i = 0, _a = Object.entries(this.playerDiscards); _i < _a.length; _i++) {
                        var _b = _a[_i], player_id = _b[0], pile = _b[1];
                        if (+player_id != +this.player_id && pile.size > 0) {
                            has_valid_target = true;
                            break;
                        }
                    }
                    if (!has_valid_target) {
                        console.log("No valid targets for CT_REFLECTION");
                        callback(card);
                        return;
                    }
                    this.chameleonArgs = new ChameleonClientStateArgs_1.ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain);
                    this.setClientState('chameleon_reflection', {
                        descriptionmyturn: requiresPlayable ?
                            _("Reflection: ${you} must copy a playable card from the top of another player's discard pile") :
                            _("Reflection: ${you} must copy a card from the top of another player's discard pile")
                    });
                    break;
                case DaleCard_8.DaleCard.CT_GOODOLDTIMES:
                    this.chameleonArgs = new ChameleonClientStateArgs_1.ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain);
                    if (card.hasActiveAbility() && from == this.myHand) {
                        if (!isChain && !this.myHand.isSelected(card.id)) {
                            console.log("Deselected CT_GOODOLDTIMES");
                            callback(card);
                            return;
                        }
                        this.setClientState('chameleon_goodoldtimes', {
                            descriptionmyturn: _("Good Old Times: ${you} may ditch the supply's top card or copy bin's top card")
                        });
                    }
                    else {
                        if (this.marketDiscard.size == 0) {
                            console.log("No valid targets for CT_GOODOLDTIMES");
                            callback(card);
                            return;
                        }
                        this.setClientState('chameleon_goodoldtimes', {
                            descriptionmyturn: requiresPlayable ?
                                _("Good Old Times: ${you} must copy the bin's top card") :
                                _("Good Old Times: ${you} must copy the bin's top card")
                        });
                    }
                    break;
                case DaleCard_8.DaleCard.CT_TRENDSETTING:
                    if (this.market.size == 0) {
                        console.log("No valid targets for CT_TRENDSETTING");
                        callback(card);
                        return;
                    }
                    this.chameleonArgs = new ChameleonClientStateArgs_1.ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain);
                    this.setClientState('chameleon_trendsetting', {
                        descriptionmyturn: requiresPlayable ?
                            _("Trendsetting: ${you} must copy a playable card in the market") :
                            _("Trendsetting: ${you} must copy a card in the market")
                    });
                    break;
                case DaleCard_8.DaleCard.CT_SEEINGDOUBLES:
                    var items = this.myHand.getAllItems();
                    var has_another_card_in_hand = false;
                    for (var _c = 0, items_1 = items; _c < items_1.length; _c++) {
                        var item = items_1[_c];
                        if (item.id != card.id) {
                            has_another_card_in_hand = true;
                            break;
                        }
                    }
                    if (!has_another_card_in_hand) {
                        console.log("No valid targets for CT_SEEINGDOUBLES");
                        callback(card);
                        return;
                    }
                    this.chameleonArgs = new ChameleonClientStateArgs_1.ChameleonClientStateArgs(card, from, callback, requiresPlayable, isChain);
                    this.setClientState('chameleon_seeingdoubles', {
                        descriptionmyturn: requiresPlayable ?
                            _("Seeing Doubles: ${you} must copy a playable card from your hand") :
                            _("Trendsetting: ${you} must copy another card in your hand")
                    });
                    break;
                default:
                    callback(card);
                    break;
            }
        };
        Dale.prototype.setMainTitle = function (text) {
            $('pagemaintitletext').innerHTML = text;
        };
        Dale.prototype.updateHTML = function (location, card) {
            if (location) {
                location.updateHTML(card);
            }
            else {
                this.market.updateHTML(card);
                for (var _i = 0, _a = this.allPiles; _i < _a.length; _i++) {
                    var pile = _a[_i];
                    pile.updateHTML(card);
                }
                for (var _b = 0, _c = this.allDaleStocks; _b < _c.length; _b++) {
                    var stock = _c[_b];
                    stock.updateHTML(card);
                }
                for (var _d = 0, _e = Object.values(this.playerStalls); _d < _e.length; _d++) {
                    var stall = _e[_d];
                    stall.updateHTML(card);
                }
            }
        };
        Dale.prototype.stockToPile = function (card, stock, pile, delay) {
            if (delay === void 0) { delay = 0; }
            var card_id = card.id;
            var item_name = stock.control_name + '_item_' + card_id;
            if ($(item_name)) {
                pile.push(new DaleCard_8.DaleCard(card_id), item_name, undefined, undefined, delay);
                stock.removeFromStockByIdNoAnimation(+card_id);
            }
            else {
                throw new Error("Card ".concat(card_id, " does not exist in ") + stock.control_name);
            }
        };
        Dale.prototype.overallPlayerBoardToPile = function (card, player_id, pile, delay) {
            if (delay === void 0) { delay = 0; }
            pile.push(DaleCard_8.DaleCard.of(card), 'overall_player_board_' + player_id);
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
        Dale.prototype.pileToStock = function (card, pile, stock, location_arg) {
            stock.addDaleCardToStock(DaleCard_8.DaleCard.of(card), pile.placeholderHTML);
            if (location_arg !== undefined) {
                if (pile.removeAt(location_arg).id != +card.id) {
                    throw new Error("Card ".concat(+card.id, " was not found at index ").concat(location_arg, " in the pile of size ").concat(pile.size));
                }
            }
            else {
                if (pile.pop().id != +card.id) {
                    throw new Error("Card ".concat(+card.id, " was not found on top of the pile"));
                }
            }
        };
        Dale.prototype.pileToPlayerStock = function (card, pile, stock, player_id, location_arg) {
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
        Dale.prototype.addActionButtonCancelClient = function () {
            this.addActionButton("cancel-button", _("Cancel"), "onCancelClient", undefined, false, 'gray');
        };
        Dale.prototype.addActionButtonCancelChameleon = function () {
            this.addActionButton("cancel-chameleons-button", _("Cancel"), "onCancelChameleon", undefined, false, 'gray');
        };
        Dale.prototype.onStallCardClick = function (stall, card, stack_index, index) {
            console.log("Clicked on CardStack[".concat(stack_index, ", ").concat(index, "]"));
            switch (this.gamedatas.gamestate.name) {
                case 'acorn':
                    for (var _i = 0, _a = Object.entries(this.playerStalls); _i < _a.length; _i++) {
                        var _b = _a[_i], player_id = _b[0], player_stall = _b[1];
                        if (stall == player_stall) {
                            if (this.checkAction("actAcorn")) {
                                this.bgaPerformAction('actAcorn', {
                                    stall_player_id: +player_id,
                                    stall_card_id: card.id
                                });
                            }
                            break;
                        }
                    }
                    break;
                case 'chameleon_flexibleShopkeeper':
                    this.onConfirmChameleon(card);
                    break;
            }
        };
        Dale.prototype.onMarketCardClick = function (card, pos) {
            pos = this.market.getValidPos(pos);
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                case 'client_technique':
                case 'client_build':
                case 'client_inventory':
                    this.mainClientState.enterClientState('client_purchase', {
                        pos: pos,
                        on_market_board: true
                    });
                    break;
                case 'giftVoucher':
                    if (this.checkAction("actGiftVoucher")) {
                        this.bgaPerformAction('actGiftVoucher', {
                            market_card_id: card.id
                        });
                    }
                    break;
                case 'prepaidGood':
                    if (this.checkAction("actPrepaidGood")) {
                        this.bgaPerformAction('actPrepaidGood', {
                            card_id: card.id
                        });
                    }
                    break;
                case 'chameleon_trendsetting':
                    this.onConfirmChameleon(card);
                    break;
            }
        };
        Dale.prototype.onScheduleSelectionChanged = function () {
            console.log("You click on a card in the... schedule...?");
        };
        Dale.prototype.onPileSelectionChanged = function (pile, card) {
            console.log("onPileSelectionChanged");
            if (pile === this.myDiscard) {
                this.onMyDiscardPileSelectionChanged(pile, card);
            }
            else if (pile === this.marketDiscard) {
                this.onMarketDiscardPileSelectionChanged(pile, card);
            }
            else if (pile === this.marketDeck) {
                this.onMarketDeckSelectionChanged(pile, card);
            }
            else {
                this.onOtherDiscardPileSelectionChanged(pile, card);
            }
        };
        Dale.prototype.onMyDiscardPileSelectionChanged = function (pile, card) {
            console.log("onMyDiscardPileSelectionChanged");
            switch (this.gamedatas.gamestate.name) {
                case 'client_build':
                    this.handleChameleonCard(card, pile, this.onBuildSelectionChanged);
                    break;
            }
        };
        Dale.prototype.onMarketDiscardPileSelectionChanged = function (pile, card) {
            console.log("onMarketDiscardPileSelectionChanged");
            switch (this.gamedatas.gamestate.name) {
                case 'chameleon_goodoldtimes':
                    this.onGoodOldTimesBind();
                    break;
            }
        };
        Dale.prototype.onMarketDeckSelectionChanged = function (pile, card) {
            console.log("onMarketDeckSelectionChanged");
            switch (this.gamedatas.gamestate.name) {
                case 'chameleon_goodoldtimes':
                    this.onGoodOldTimesPassive();
                    break;
            }
        };
        Dale.prototype.onOtherDiscardPileSelectionChanged = function (pile, card) {
            switch (this.gamedatas.gamestate.name) {
                case 'chameleon_reflection':
                    this.onConfirmChameleon(card);
                    break;
            }
        };
        Dale.prototype.onHandSelectionChanged = function (control_name, card_id) {
            if (!card_id)
                return;
            var card = new DaleCard_8.DaleCard(card_id);
            var isAdded = this.myHand.isSelected(card_id);
            switch (this.gamedatas.gamestate.name) {
                case 'client_technique':
                    this.handleChameleonCard(card, this.myHand, this.onPlayCard, true);
                    this.myHand.unselectAll();
                    break;
                case 'client_purchase':
                    this.handleChameleonCard(card, this.myHand, this.onFundsSelectionChanged);
                    break;
                case 'client_build':
                    this.handleChameleonCard(card, this.myHand, this.onBuildSelectionChanged);
                    break;
                case 'winterIsComing':
                    this.handleChameleonCard(card, this.myHand, this.onBuildSelectionChanged);
                    break;
                case 'shatteredRelic':
                    if (this.checkAction('actShatteredRelic')) {
                        this.bgaPerformAction('actShatteredRelic', {
                            card_id: card.id
                        });
                    }
                    this.myHand.unselectAll();
                    break;
                case 'chameleon_flexibleShopkeeper':
                case 'chameleon_reflection':
                case 'chameleon_goodoldtimes':
                case 'chameleon_trendsetting':
                case 'chameleon_seeingdoubles':
                    var args = this.chameleonArgs;
                    if (args.card.id == card.id) {
                        this.onCancelChameleon();
                    }
                    else {
                        if (this.gamedatas.gamestate.name == 'chameleon_seeingdoubles') {
                            this.onConfirmChameleon(card);
                        }
                        else {
                            this.showMessage(_("Please select a valid target for ") + "'".concat(args.card.name, "'"), "error");
                        }
                        if (isAdded) {
                            this.myHand.unselectItem(card_id);
                        }
                        else {
                            this.myHand.selectItem(card_id);
                        }
                    }
                    break;
                case null:
                    throw new Error("gamestate.name is null");
            }
        };
        Dale.prototype.onTemporarySelectionChanged = function () {
            var items = this.myHand.getSelectedItems();
            if (!items[0])
                return;
            var card = new DaleCard_8.DaleCard(items[0].id);
            switch (this.gamedatas.gamestate.name) {
                case null:
                    throw new Error("gamestate.name is null");
            }
        };
        Dale.prototype.onFundsSelectionChanged = function () {
        };
        Dale.prototype.onPurchase = function () {
            if (this.gamedatas.gamestate.name != 'client_purchase') {
                this.showMessage(_("You cannot purchase a card from this gamestate") + " (".concat(this.gamedatas.gamestate, ")"), 'error');
            }
            var args = this.mainClientState.args;
            var card_id;
            if (args.on_market_board) {
                card_id = this.market.getCardId(args.pos);
            }
            else {
                var card = this.marketDiscard.peek();
                if (!card) {
                    throw new Error("Cannot purchase from the bin, as it is empty");
                }
                card_id = card.id;
            }
            if (this.checkAction('actPurchase')) {
                this.bgaPerformAction('actPurchase', __assign({ funds_card_ids: this.arrayToNumberList(this.myHand.orderedSelection.get()), market_card_id: card_id }, DaleCard_8.DaleCard.getLocalChameleons()));
            }
        };
        Dale.prototype.onPlayCard = function (card) {
            if (!card) {
                console.warn("Attempted to play 'undefined' card");
            }
            else if (!card.isPlayable()) {
                this.showMessage(_("This card cannot be played"), 'error');
            }
            else if (card.isTechnique()) {
                if (this.checkAction('actPlayTechniqueCard')) {
                    this.bgaPerformAction('actPlayTechniqueCard', __assign({ card_id: card.id }, DaleCard_8.DaleCard.getLocalChameleons()));
                }
            }
            else if (card.hasActiveAbility()) {
                this.onUseActiveAbility(card);
            }
            else {
                this.showMessage(_("This card's ability was already used"), 'error');
            }
            this.myHand.unselectAll();
        };
        Dale.prototype.onUseActiveAbility = function (card) {
            if (!card.hasActiveAbility()) {
                throw new Error("Card '".concat(card.name, "' has no active ability remaining"));
            }
            this.bgaPerformAction('actUseActiveAbility', __assign({ card_id: card.id }, DaleCard_8.DaleCard.getLocalChameleons()));
        };
        Dale.prototype.onBuildSelectionChanged = function (card) {
            console.log("onBuildSelectionChanged");
            var items = this.myHand.getSelectedItems();
            var count_nostalgic_items = 0;
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var item = items_2[_i];
                var card_1 = new DaleCard_8.DaleCard(item.id);
                if (card_1.effective_type_id == DaleCard_8.DaleCard.CT_NOSTALGICITEM) {
                    count_nostalgic_items++;
                }
            }
            if (count_nostalgic_items > 0) {
                for (var _a = 0, _b = this.myDiscard.orderedSelectedCardIds; _a < _b.length; _a++) {
                    var card_id = _b[_a];
                    var card_2 = new DaleCard_8.DaleCard(card_id);
                    if (card_2.effective_type_id == DaleCard_8.DaleCard.CT_NOSTALGICITEM) {
                        count_nostalgic_items++;
                    }
                }
            }
            console.log("count_nostalgic_items = " + count_nostalgic_items);
            this.myDiscard.setSelectionMode('multiple', count_nostalgic_items);
        };
        Dale.prototype.onBuild = function () {
            var autoSortedCards = this.myHand.getSelectedItems();
            if (this.checkAction('actBuild')) {
                this.bgaPerformAction('actBuild', __assign({ stack_card_ids: this.arrayToNumberList(autoSortedCards), stack_card_ids_from_discard: this.arrayToNumberList(this.myDiscard.orderedSelectedCardIds) }, DaleCard_8.DaleCard.getLocalChameleons()));
            }
        };
        Dale.prototype.onWinterIsComingSkip = function () {
            if (this.checkAction('actWinterIsComingSkip')) {
                this.bgaPerformAction('actWinterIsComingSkip', {});
            }
        };
        Dale.prototype.onCancel = function () {
            if (DaleCard_8.DaleCard.unbindAllChameleonsLocal()) {
                this.restoreServerGameState();
                this.chameleonArgs = undefined;
                this.updateHTML();
            }
            else {
                if (this.checkAction('actCancel')) {
                    this.bgaPerformAction('actCancel', {});
                }
            }
        };
        Dale.prototype.onCancelClient = function () {
            this.mainClientState.exit();
        };
        Dale.prototype.onCancelChameleon = function (unselect) {
            if (unselect === void 0) { unselect = true; }
            console.log("onCancelChameleon");
            console.log(this.chameleonArgs);
            var args = this.chameleonArgs;
            if (unselect) {
                args.location.unselectItem(args.card.id);
            }
            args.card.unbindChameleonLocal();
            this.restoreServerGameState();
            this.chameleonArgs = undefined;
            this.updateHTML();
        };
        Dale.prototype.onConfirmChameleon = function (target) {
            console.log("onConfirmChameleon");
            var args = this.chameleonArgs;
            var type_id = target.effective_type_id;
            var isDifferentUnboundChameleon = target.isUnboundChameleon() && type_id != args.card.effective_type_id;
            if (args.requiresPlayable && !DaleCard_8.DaleCard.isPlayable(type_id) && !isDifferentUnboundChameleon) {
                this.showMessage(_("Copy failed: this card cannot be played"), 'error');
                this.onCancelChameleon();
            }
            else {
                this.restoreServerGameState();
                if (isDifferentUnboundChameleon) {
                    console.log("isDifferentUnboundChameleon");
                    console.log("type_id = " + args.card.effective_type_id);
                    console.log("target_type_id = " + type_id);
                    args.card.bindChameleonLocal(type_id);
                    console.log("type_id = " + args.card.effective_type_id);
                    console.log(args.card);
                    this.chameleonArgs = undefined;
                    this.handleChameleonCard(args.card, args.location, args.callback, args.requiresPlayable, true);
                }
                else {
                    args.card.bindChameleonLocal(type_id);
                    args.callback(args.card);
                    this.chameleonArgs = undefined;
                }
                this.updateHTML(args.location, args.card);
            }
        };
        Dale.prototype.onGoodOldTimesPassive = function () {
            this.onUseActiveAbility(this.chameleonArgs.card);
            this.onCancelChameleon();
        };
        Dale.prototype.onGoodOldTimesBind = function () {
            console.log("onGoodOldTimesBind");
            var topCard = this.marketDiscard.peek();
            console.log(topCard);
            if (!topCard) {
                if (this.chameleonArgs.requiresPlayable) {
                    this.showMessage(_("Good Old Times has no valid target"), 'error');
                }
                this.onCancelChameleon(false);
                return;
            }
            this.onConfirmChameleon(topCard);
        };
        Dale.prototype.onRequestBuildAction = function () {
            this.mainClientState.enterClientState('client_build');
        };
        Dale.prototype.onRequestInventoryAction = function () {
            this.mainClientState.enterClientState('client_inventory');
        };
        Dale.prototype.onInventoryAction = function () {
            if (this.checkAction("actInventoryAction")) {
                this.bgaPerformAction('actInventoryAction', {
                    ids: this.arrayToNumberList(this.myHand.orderedSelection.get())
                });
            }
        };
        Dale.prototype.onSwiftBroker = function () {
            if (this.checkAction("actSwiftBroker")) {
                this.bgaPerformAction('actSwiftBroker', {
                    card_ids: this.arrayToNumberList(this.myHand.orderedSelection.get())
                });
            }
        };
        Dale.prototype.onSpyglass = function () {
            var card_ids = this.myTemporary.orderedSelection.get();
            console.log("Sending " + this.arrayToNumberList(card_ids));
            if (card_ids.length == 0) {
                this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
                return;
            }
            if (this.checkAction("actSpyglass")) {
                this.bgaPerformAction('actSpyglass', {
                    card_ids: this.arrayToNumberList(card_ids)
                });
            }
        };
        Dale.prototype.onLoyalPartner = function () {
            if (this.checkAction("actLoyalPartner")) {
                this.bgaPerformAction('actLoyalPartner', {
                    card_ids: this.arrayToNumberList(this.market.orderedSelection.get())
                });
            }
        };
        Dale.prototype.setupNotifications = function () {
            var _this = this;
            console.log('notifications subscriptions setup42');
            var notifs = [
                ['scheduleTechnique', 1000],
                ['resolveTechnique', 1000],
                ['cancelTechnique', 1000],
                ['buildStack', 1500],
                ['fillEmptyMarketSlots', 1],
                ['marketSlideRight', 1000],
                ['marketToHand', 1500],
                ['swapScheduleStall', 1],
                ['swapScheduleMarket', 1],
                ['discardToHand', 1000],
                ['discardToHandMultiple', 1000],
                ['draw', 1000],
                ['drawMultiple', 1000],
                ['temporaryToHand', 1000],
                ['obtainNewJunkInHand', 1000],
                ['ditch', 1000],
                ['ditchMultiple', 1000],
                ['discard', 1000],
                ['discardMultiple', 1000],
                ['placeOnDeckMultiple', 1000],
                ['reshuffleDeck', 1500],
                ['ditchFromMarketDeck', 1000],
                ['ditchFromMarketBoard', 1000],
                ['addEffect', 1],
                ['bindChameleon', 1],
                ['unbindChameleon', 1],
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
                if ($(this.myHand.control_name + '_item_' + card_id)) {
                    this.mySchedule.addDaleCardToStock(DaleCard_8.DaleCard.of(notif.args.card), this.myHand.control_name + '_item_' + card_id);
                    this.myHand.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    throw new Error("Card ".concat(card_id, " does not exist in my hand"));
                }
            }
            else {
                var schedule = this.playerSchedules[notif.args.player_id];
                schedule.addDaleCardToStock(DaleCard_8.DaleCard.of(notif.args.card), 'overall_player_board_' + notif.args.player_id);
            }
            this.playerHandSizes[notif.args.player_id].incValue(-1);
        };
        Dale.prototype.notif_cancelTechnique = function (notif) {
            if (notif.args.player_id == this.player_id) {
                var card_id = +notif.args.card.id;
                if ($(this.mySchedule.control_name + '_item_' + card_id)) {
                    this.myHand.addDaleCardToStock(DaleCard_8.DaleCard.of(notif.args.card), this.mySchedule.control_name + '_item_' + card_id);
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
            this.playerHandSizes[notif.args.player_id].incValue(1);
        };
        Dale.prototype.notif_resolveTechnique = function (notif) {
            console.log(this.playerSchedules);
            var schedule = this.playerSchedules[notif.args.player_id];
            var card = DaleCard_8.DaleCard.of(notif.args.card);
            var from = schedule.control_name + '_item_' + card.id;
            this.playerDiscards[notif.args.player_id].push(card, from, null, schedule.duration);
            schedule.removeFromStockByIdNoAnimation(card.id);
        };
        Dale.prototype.notif_buildStack = function (notif) {
            var _a;
            console.log("notif_buildStack");
            var stall = this.playerStalls[notif.args.player_id];
            for (var i in notif.args.cards) {
                var dbcard = notif.args.cards[i];
                var card = DaleCard_8.DaleCard.of(dbcard);
                switch (notif.args.from) {
                    case 'hand':
                        if (notif.args.player_id == this.player_id) {
                            if ($(this.myHand.control_name + '_item_' + card.id)) {
                                stall.insertCard(card, notif.args.stack_index, undefined, this.myHand.control_name + '_item_' + card.id);
                                this.myHand.removeFromStockByIdNoAnimation(+card.id);
                            }
                            else {
                                throw new Error("Cannot build a stack. Card ".concat(card.id, " does not exist in hand."));
                            }
                        }
                        else {
                            stall.insertCard(card, notif.args.stack_index, undefined, 'overall_player_board_' + notif.args.player_id);
                        }
                        break;
                    case 'disc':
                        var discard = this.playerDiscards[notif.args.player_id];
                        var index = +dbcard.location_arg - 1;
                        stall.insertCard(card, notif.args.stack_index, undefined, discard.placeholderHTML);
                        console.log("index = " + index);
                        discard.removeAt(index);
                        break;
                }
            }
            (_a = this.scoreCtrl[notif.args.player_id]) === null || _a === void 0 ? void 0 : _a.toValue(notif.args.stack_index_plus_1);
            if (notif.args.from == 'hand') {
                var nbr = Object.keys(notif.args.cards).length;
                this.playerHandSizes[notif.args.player_id].incValue(-nbr);
            }
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
                this.market.insertCard(DaleCard_8.DaleCard.of(cards[i]), positions[i], this.marketDeck.placeholderHTML);
                this.marketDeck.pop();
            }
        };
        Dale.prototype.notif_marketSlideRight = function (notif) {
            this.market.slideRight();
        };
        Dale.prototype.notif_marketToHand = function (notif) {
            var daleCard = new DaleCard_8.DaleCard(notif.args.market_card_id);
            var slotId = this.market.getSlotId(notif.args.pos);
            this.market.unselectAll();
            if (notif.args.player_id == this.player_id) {
                this.market.removeCard(notif.args.pos);
                this.myHand.addDaleCardToStock(daleCard, slotId);
            }
            else {
                this.market.removeCard(notif.args.pos, 'overall_player_board_' + notif.args.player_id);
            }
            this.playerHandSizes[notif.args.player_id].incValue(1);
        };
        Dale.prototype.notif_swapScheduleStall = function (notif) {
            var schedule = this.playerSchedules[notif.args.schedule_player_id];
            var stall = this.playerStalls[notif.args.stall_player_id];
            stall.swapWithStock(notif.args.stall_card_id, schedule, notif.args.schedule_card_id);
        };
        Dale.prototype.notif_swapScheduleMarket = function (notif) {
            var schedule = this.playerSchedules[notif.args.schedule_player_id];
            this.market.swapWithStock(notif.args.market_card_id, schedule, notif.args.schedule_card_id);
        };
        Dale.prototype.notif_temporaryToHand = function (notif) {
            console.log("notif_temporaryToHand");
            if (notif.args._private) {
                var card_id = +notif.args._private.card.id;
                if ($(this.myTemporary.control_name + '_item_' + card_id)) {
                    console.log(notif.args);
                    this.myHand.addDaleCardToStock(DaleCard_8.DaleCard.of(notif.args._private.card), this.myTemporary.control_name + '_item_' + card_id);
                    this.myTemporary.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    throw new Error("Card ".concat(card_id, " does not exist in myTemporary."));
                }
            }
            this.playerHandSizes[notif.args.player_id].incValue(1);
        };
        Dale.prototype.notif_obtainNewJunkInHand = function (notif) {
            if (notif.args.player_id == this.player_id) {
                for (var i in notif.args.cards) {
                    var card = notif.args.cards[i];
                    this.myHand.addDaleCardToStock(DaleCard_8.DaleCard.of(card), 'overall_player_board_' + notif.args.player_id);
                }
            }
            var nbr = Object.keys(notif.args.cards).length;
            this.playerHandSizes[notif.args.player_id].incValue(nbr);
        };
        Dale.prototype.notif_ditch = function (notif) {
            var stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
            if (DaleCard_8.DaleCard.of(notif.args.card).isJunk()) {
                this.playerStockRemove(notif.args.card, stock, notif.args.player_id);
            }
            else {
                this.playerStockToPile(notif.args.card, stock, notif.args.player_id, this.marketDiscard);
            }
            if (stock === this.myHand) {
                this.playerHandSizes[notif.args.player_id].incValue(-1);
            }
        };
        Dale.prototype.notif_ditchMultiple = function (notif) {
            var delay = 0;
            var stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
            for (var _i = 0, _a = notif.args.card_ids; _i < _a.length; _i++) {
                var id = _a[_i];
                var card = notif.args.cards[id];
                if (DaleCard_8.DaleCard.of(card).isJunk()) {
                    this.playerStockRemove(card, stock, notif.args.player_id);
                }
                else {
                    this.playerStockToPile(card, stock, notif.args.player_id, this.marketDiscard, delay);
                }
                delay += 75;
            }
            if (stock === this.myHand) {
                var nbr = Object.keys(notif.args.cards).length;
                this.playerHandSizes[notif.args.player_id].incValue(-nbr);
            }
        };
        Dale.prototype.notif_discard = function (notif) {
            var _a;
            var discard_id = (_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id;
            var discardPile = this.playerDiscards[discard_id];
            var stock = notif.args.from_temporary ? this.myTemporary : this.myHand;
            this.playerStockToPile(notif.args.card, stock, notif.args.player_id, discardPile);
            this.playerHandSizes[notif.args.player_id].incValue(-1);
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
            this.playerHandSizes[notif.args.player_id].incValue(-notif.args.nbr);
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
                this.playerDecks[notif.args.player_id].pushHiddenCards(notif.args.nbr);
            }
            if (stock === this.myHand) {
                this.playerHandSizes[notif.args.player_id].incValue(-notif.args.nbr);
            }
        };
        Dale.prototype.notif_discardToHand = function (notif) {
            var _a;
            console.log("notif_discardToHand");
            var stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
            var discardPile = this.playerDiscards[(_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : this.player_id];
            this.pileToPlayerStock(notif.args.card, discardPile, stock, notif.args.player_id);
            this.playerHandSizes[notif.args.player_id].incValue(1);
        };
        Dale.prototype.notif_discardToHandMultiple = function (notif) {
            var _a;
            console.log("notif_discardToHandMultiple");
            var stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
            var discardPile = this.playerDiscards[(_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : this.player_id];
            for (var i in notif.args.cards) {
                var card = notif.args.cards[i];
                this.pileToPlayerStock(card, discardPile, stock, notif.args.player_id, +card.location_arg);
            }
            this.playerHandSizes[notif.args.player_id].incValue(notif.args.nbr);
        };
        Dale.prototype.notif_draw = function (notif) {
            var _a;
            console.log("notif_draw");
            var stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
            var deck = notif.args.deck_player_id ? (_a = this.playerDecks[notif.args.deck_player_id]) !== null && _a !== void 0 ? _a : this.marketDeck : this.myDeck;
            if (notif.args._private) {
                var card = notif.args._private.card;
                stock.addDaleCardToStock(DaleCard_8.DaleCard.of(card), deck.placeholderHTML);
                deck.pop();
            }
            else {
                this.playerDecks[notif.args.player_id].pop('overall_player_board_' + notif.args.player_id);
            }
            if (stock === this.myHand) {
                this.playerHandSizes[notif.args.player_id].incValue(1);
            }
        };
        Dale.prototype.notif_drawMultiple = function (notif) {
            var _a, _b;
            console.log("notif_drawMultiple");
            console.log(notif.args);
            var stock = notif.args.to_temporary ? this.myTemporary : this.myHand;
            var deck = notif.args.deck_player_id ? (_a = this.playerDecks[notif.args.deck_player_id]) !== null && _a !== void 0 ? _a : this.marketDeck : this.myDeck;
            console.log(deck.size);
            if (notif.args._private) {
                for (var i in (_b = notif.args._private) === null || _b === void 0 ? void 0 : _b.cards) {
                    var card = notif.args._private.cards[i];
                    stock.addDaleCardToStock(DaleCard_8.DaleCard.of(card), deck.placeholderHTML);
                    deck.pop();
                }
            }
            else {
                for (var i = 0; i < notif.args.nbr; i++) {
                    this.playerDecks[notif.args.player_id].pop('overall_player_board_' + notif.args.player_id);
                }
            }
            if (stock === this.myHand) {
                this.playerHandSizes[notif.args.player_id].incValue(notif.args.nbr);
            }
        };
        Dale.prototype.notif_reshuffleDeck = function (notif) {
            console.log("reshuffleDeck [market=".concat(notif.args.market, ", player_id=").concat(notif.args.player_id, "]"));
            if (notif.args.market) {
                this.marketDiscard.shuffleToDrawPile(this.marketDeck);
            }
            else {
                this.playerDiscards[notif.args.player_id].shuffleToDrawPile(this.playerDecks[notif.args.player_id]);
            }
        };
        Dale.prototype.notif_ditchFromMarketDeck = function (notif) {
            this.marketDeck.pop();
            this.marketDiscard.push(DaleCard_8.DaleCard.of(notif.args.card), this.marketDeck.placeholderHTML);
        };
        Dale.prototype.notif_ditchFromMarketBoard = function (notif) {
            var delay = 0;
            for (var _i = 0, _a = notif.args.card_ids; _i < _a.length; _i++) {
                var id = _a[_i];
                var pos = this.market.posOf(id);
                var slot_id = this.market.getSlotId(pos);
                this.marketDiscard.push(new DaleCard_8.DaleCard(id), slot_id, undefined, undefined, delay);
                this.market.removeCard(pos);
                delay += 75;
            }
        };
        Dale.prototype.notif_addEffect = function (notif) {
            console.log("notif_addEffect");
            console.log(notif.args.effect);
            DaleCard_8.DaleCard.addEffect(notif.args.effect);
        };
        Dale.prototype.notif_bindChameleon = function (notif) {
            DaleCard_8.DaleCard.bindChameleonFromServer(+notif.args.card_id, +notif.args.type_id);
            DaleCard_8.DaleCard.unbindAllChameleonsLocal();
            this.updateHTML();
        };
        Dale.prototype.notif_unbindChameleon = function (notif) {
            DaleCard_8.DaleCard.unbindChameleonFromServer(+notif.args.card_id);
            this.updateHTML();
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
                this.myHand.addDaleCardToStock(new DaleCard_8.DaleCard(0, 0));
            }
            else if (arg == 'clientConsoleLog') {
                console.log(notif.args.msg);
            }
            else if (arg == 'increaseDeckSize') {
                this.playerDecks[notif.args.player_id].pushHiddenCards(notif.args.nbr);
            }
            else if (arg == 'bindings') {
                var bindings = DaleCard_8.DaleCard.getLocalChameleons();
                console.log("(Chameleon) cards_ids");
                console.log(bindings.chameleon_card_ids);
                console.log("Target type_ids");
                console.log(bindings.chameleon_type_ids);
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
define("components/types/DbLocationPrefix", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
