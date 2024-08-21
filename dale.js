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
        DaleIcons.getBluePileIcon = function (index) {
            return this.getIcon(0, index);
        };
        DaleIcons.getYellowPileIcon = function (index) {
            return this.getIcon(1, index);
        };
        DaleIcons.getRedPileIcon = function (index) {
            return this.getIcon(2, index);
        };
        DaleIcons.getDiscardIcon = function () {
            return this.getIcon(3, 0);
        };
        DaleIcons.getBuildIcon = function () {
            return this.getIcon(3, 1);
        };
        DaleIcons.getHandIcon = function () {
            return this.getIcon(3, 4);
        };
        DaleIcons.getChameleonIcon = function () {
            return this.getIcon(3, 5);
        };
        DaleIcons.getSpyglassIcon = function () {
            return this.getIcon(4, 0);
        };
        DaleIcons.getDitchIcon = function () {
            return this.getIcon(4, 1);
        };
        DaleIcons.ROWS = 5;
        DaleIcons.COLUMNS = 6;
        DaleIcons.ICON_WIDTH = 150;
        DaleIcons.ICON_HEIGHT = 150;
        DaleIcons.BACKGROUND_WIDTH = DaleIcons.ICON_WIDTH * DaleIcons.COLUMNS;
        DaleIcons.BACKGROUND_HEIGHT = DaleIcons.ICON_HEIGHT * DaleIcons.ROWS;
        return DaleIcons;
    }());
    exports.DaleIcons = DaleIcons;
});
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
        Images.setCardStyle = function (div, card_type_id) {
            dojo.setStyle(div, 'width', "".concat(Images.CARD_WIDTH_S, "px"));
            dojo.setStyle(div, 'height', "".concat(Images.CARD_HEIGHT_S, "px"));
            dojo.setStyle(div, 'background-size', "".concat(Images.SHEET_WIDTH_S, "px ").concat(Images.SHEET_HEIGHT_S, "px"));
            if (card_type_id !== undefined) {
                if (card_type_id >= 0 && card_type_id < Images.IMAGES_PER_ROW * Images.IMAGES_PER_COLUMN) {
                    var x = card_type_id % Images.IMAGES_PER_ROW;
                    var y = (card_type_id - x) / Images.IMAGES_PER_ROW;
                    dojo.setStyle(div, 'background-position', "-".concat(x, "00% -").concat(y, "00%"));
                }
                else {
                    console.error("Card with type id ".concat(card_type_id, " does not exist!"));
                }
            }
        };
        Images.getPlaceholder = function () {
            var placeholder = document.createElement('div');
            placeholder.setAttribute('style', "width:".concat(Images.CARD_WIDTH_S, "px; height:").concat(Images.CARD_HEIGHT_S, "px;"));
            placeholder.classList.add("dale-placeholder");
            return placeholder;
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
        Images.STACK_MIN_MARGIN_X = 0.05;
        Images.STACK_MAX_MARGIN_X = 0.1;
        Images.Z_INDEX_CARDBACK = 1;
        Images.Z_INDEX_CARDFRONT = 2;
        Images.Z_INDEX_HAND_CARD = 100;
        Images.Z_INDEX_LIMBO_CARD = 150;
        Images.Z_INDEX_SELECTED_CARD = 200;
        Images.Z_INDEX_SLIDING_CARD = 300;
        Images.Z_INDEX_DECK_ABOVE_SLIDING_CARD = 350;
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
define("components/DaleCard", ["require", "exports", "components/DaleIcons", "components/Images"], function (require, exports, DaleIcons_1, Images_1) {
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
            else if (!DaleCard.cardIdtoTypeId.has(id) && !DaleCard.cardIdtoEffectiveTypeId.has(id)) {
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
        DaleCard.prototype.isChameleon = function () {
            var type_id = this.effective_type_id;
            return (type_id == DaleCard.CT_FLEXIBLESHOPKEEPER ||
                type_id == DaleCard.CT_REFLECTION ||
                type_id == DaleCard.CT_GOODOLDTIMES ||
                type_id == DaleCard.CT_TRENDSETTING ||
                type_id == DaleCard.CT_SEEINGDOUBLES);
        };
        DaleCard.prototype.isBoundChameleon = function () {
            return DaleCard.cardIdtoEffectiveTypeIdLocal.has(this.id) || DaleCard.cardIdtoEffectiveTypeId.has(this.id);
        };
        DaleCard.prototype.isUnboundChameleon = function () {
            return !this.isBoundChameleon() && this.isChameleon();
        };
        DaleCard.prototype.bindChameleonLocal = function (effective_type_id) {
            DaleCard.cardIdtoEffectiveTypeIdLocal.set(this.id, effective_type_id);
            this.updateChameleonOverlay();
        };
        DaleCard.prototype.unbindChameleonLocal = function () {
            DaleCard.cardIdtoEffectiveTypeIdLocal.delete(this.id);
            this.updateChameleonOverlay();
        };
        DaleCard.unbindAllChameleonsLocal = function () {
            var card_ids = Array.from(DaleCard.cardIdtoEffectiveTypeIdLocal.keys());
            DaleCard.cardIdtoEffectiveTypeIdLocal.clear();
            for (var _i = 0, card_ids_1 = card_ids; _i < card_ids_1.length; _i++) {
                var card_id = card_ids_1[_i];
                new DaleCard(card_id).updateChameleonOverlay();
            }
            return card_ids.length;
        };
        DaleCard.bindChameleonFromServer = function (card_id, effective_type_id) {
            DaleCard.cardIdtoEffectiveTypeId.set(card_id, effective_type_id);
            new DaleCard(card_id).updateChameleonOverlay();
        };
        DaleCard.unbindChameleonFromServer = function (card_id) {
            DaleCard.cardIdtoEffectiveTypeId.delete(card_id);
            new DaleCard(card_id).updateChameleonOverlay();
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
            this.unbindAllChameleonsLocal();
            var card_ids = Array.from(DaleCard.cardIdtoEffectiveTypeId.keys());
            DaleCard.cardIdtoEffectiveTypeId.clear();
            for (var _i = 0, card_ids_2 = card_ids; _i < card_ids_2.length; _i++) {
                var card_id = card_ids_2[_i];
                new DaleCard(card_id).updateChameleonOverlay();
            }
        };
        DaleCard.prototype.getCost = function (pos) {
            return this.value + pos;
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
        DaleCard.prototype.removeTooltip = function () {
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
            this.removeTooltip();
            DaleCard.tooltips.set(this.id, tooltip);
        };
        DaleCard.prototype.updateChameleonOverlay = function (temp_div, fade) {
            if (fade === void 0) { fade = true; }
            console.log("updateChameleonOverlay for card_id=" + this.id);
            var div = temp_div !== null && temp_div !== void 0 ? temp_div : DaleCard.divs.get(this.id);
            if (!div) {
                return;
            }
            var old_overlay = div.querySelector(".dale-chameleon-overlay:not(.dale-fading)");
            if (old_overlay) {
                if (fade) {
                    old_overlay.classList.add("dale-fading");
                    dojo.fadeOut({ node: old_overlay, onEnd: function (node) { dojo.destroy(node); } }).play();
                }
                else {
                    div.remove();
                }
            }
            if (this.isBoundChameleon()) {
                var chameleon_icon = DaleIcons_1.DaleIcons.getChameleonIcon();
                chameleon_icon.classList.add("dale-chameleon-icon");
                var new_overlay = document.createElement("div");
                new_overlay.classList.add("dale-card");
                new_overlay.classList.add("dale-chameleon-overlay");
                new_overlay.setAttribute('style', Images_1.Images.getCardStyle(this.effective_type_id));
                new_overlay.appendChild(chameleon_icon);
                div.appendChild(new_overlay);
                if (fade) {
                    dojo.setStyle(new_overlay, 'opacity', '0');
                    dojo.fadeIn({ node: new_overlay }).play();
                }
                if (!temp_div) {
                    this.addTooltip(div);
                }
            }
        };
        DaleCard.prototype.updateHTML = function (temp_div) {
            var div = temp_div !== null && temp_div !== void 0 ? temp_div : DaleCard.divs.get(this.id);
            this.updateChameleonOverlay(div, false);
            if (!temp_div && div) {
                this.addTooltip(div);
            }
        };
        DaleCard.prototype.toDiv = function (parent_id) {
            var _a;
            var div = document.createElement("div");
            div.classList.add("dale-card");
            div.id = "dale-card-" + this.id;
            Images_1.Images.setCardStyle(div, this.original_type_id);
            if (parent_id) {
                (_a = $(parent_id)) === null || _a === void 0 ? void 0 : _a.appendChild(div);
                this.attachDiv(div);
            }
            else {
                this.updateHTML(div);
            }
            return div;
        };
        DaleCard.prototype.detachDiv = function () {
            this.removeTooltip();
            DaleCard.divs.delete(this.id);
        };
        DaleCard.prototype.attachDiv = function (div) {
            div.classList.add("dale-card");
            Images_1.Images.setCardStyle(div, this.original_type_id);
            DaleCard.divs.set(this.id, div);
            this.updateHTML();
        };
        DaleCard.of = function (card) {
            return new DaleCard(card.id, card.type_arg);
        };
        DaleCard.containsTypeId = function (card_ids, type_id) {
            for (var _i = 0, card_ids_3 = card_ids; _i < card_ids_3.length; _i++) {
                var card_id = card_ids_3[_i];
                if ((new DaleCard(card_id)).effective_type_id == type_id) {
                    return true;
                }
            }
            return false;
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
define("components/OrderedSelection", ["require", "exports", "components/DaleCard", "components/DaleIcons"], function (require, exports, DaleCard_1, DaleIcons_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrderedSelection = void 0;
    var OrderedSelection = (function () {
        function OrderedSelection() {
            this.card_ids = [];
            this.secondary_card_ids = [];
            this.maxSize = Number.POSITIVE_INFINITY;
            this.secondaryMaxSize = Number.POSITIVE_INFINITY;
        }
        OrderedSelection.prototype.onSelectionChanged = function (card_id, isAdded, secondary) {
            console.log("onSelectionChanged(card_id=".concat(card_id, ", added=").concat(isAdded, ", secondary=").concat(secondary, ")"));
        };
        OrderedSelection.prototype.getDiv = function (card_id) {
            return DaleCard_1.DaleCard.divs.get(card_id);
        };
        OrderedSelection.prototype.addIcon = function (card_id, index, secondary) {
            var iconType = secondary ? this.secondaryIconType : this.iconType;
            var div = this.getDiv(card_id);
            if (!div) {
                console.log("addIcon skipped, card is not on screen (likely because it is inside a pile)");
                return;
            }
            div.classList.add("dale-selected");
            var icon = undefined;
            switch (iconType) {
                case 'pileBlue':
                    icon = DaleIcons_2.DaleIcons.getBluePileIcon(Math.min(index, 5));
                    break;
                case 'pileYellow':
                    icon = DaleIcons_2.DaleIcons.getYellowPileIcon(Math.min(index, 5));
                    break;
                case 'pileRed':
                    icon = DaleIcons_2.DaleIcons.getRedPileIcon(Math.min(index, 5));
                    break;
                case 'ditch':
                    icon = DaleIcons_2.DaleIcons.getDitchIcon();
                    break;
                case 'build':
                    icon = DaleIcons_2.DaleIcons.getBuildIcon();
                    break;
                case 'spyglass':
                    icon = (index == 0) ? DaleIcons_2.DaleIcons.getSpyglassIcon() : DaleIcons_2.DaleIcons.getBluePileIcon(Math.min(index - 1, 5));
                    break;
            }
            if (icon) {
                if (secondary) {
                    icon.classList.add("dale-selection-icon-2");
                }
                else {
                    icon.classList.add("dale-selection-icon-1");
                }
                div.appendChild(icon);
            }
        };
        OrderedSelection.prototype.removeIcon = function (card_id, secondary) {
            var div = this.getDiv(card_id);
            if (!div) {
                console.log("removeIcon skipped, no icon on screen (likely because it is inside a pile)");
                return;
            }
            var primaryIcon = div === null || div === void 0 ? void 0 : div.querySelector(".dale-selection-icon-1");
            var secondaryIcon = div === null || div === void 0 ? void 0 : div.querySelector(".dale-selection-icon-2");
            if (secondary) {
                secondaryIcon === null || secondaryIcon === void 0 ? void 0 : secondaryIcon.remove();
                if (!primaryIcon) {
                    div === null || div === void 0 ? void 0 : div.classList.remove("dale-selected");
                }
            }
            else {
                primaryIcon === null || primaryIcon === void 0 ? void 0 : primaryIcon.remove();
                if (!secondaryIcon) {
                    div === null || div === void 0 ? void 0 : div.classList.remove("dale-selected");
                }
            }
        };
        OrderedSelection.prototype.setMaxSize = function (max, secondary) {
            console.log("setMaxSize: " + max);
            if (max < 0) {
                throw new Error("Maximum selection size must be non-negative");
            }
            if (secondary) {
                this.secondaryMaxSize = max;
            }
            else {
                this.maxSize = max;
            }
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            while (card_ids.length > max) {
                this.dequeue(secondary);
            }
        };
        OrderedSelection.prototype.getMaxSize = function (secondary) {
            if (secondary) {
                return this.secondaryMaxSize;
            }
            return this.maxSize;
        };
        OrderedSelection.prototype.getSize = function (secondary) {
            if (secondary) {
                return this.secondary_card_ids.length;
            }
            return this.card_ids.length;
        };
        OrderedSelection.prototype.dequeue = function (secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            var card_id = card_ids[0];
            if (!card_id) {
                return null;
            }
            this.unselectItem(card_id, secondary);
            return card_id;
        };
        OrderedSelection.prototype.selectItem = function (card_id, secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            var maxSize = secondary ? this.secondaryMaxSize : this.maxSize;
            if (maxSize == 0) {
                return;
            }
            card_ids.push(card_id);
            this.addIcon(card_id, card_ids.length - 1, secondary);
            while (card_ids.length > maxSize) {
                this.dequeue(secondary);
            }
            this.onSelectionChanged(card_id, true, secondary);
        };
        OrderedSelection.prototype.unselectItem = function (card_id, secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            var index = card_ids.indexOf(card_id);
            card_ids.splice(index, 1);
            if (index != -1) {
                this.removeIcon(card_id, secondary);
                this.onSelectionChanged(card_id, false, secondary);
            }
        };
        OrderedSelection.prototype.unselectAll = function () {
            while (this.card_ids.length > 0) {
                this.unselectItem(this.card_ids[this.card_ids.length - 1], false);
            }
            while (this.secondary_card_ids.length > 0) {
                this.unselectItem(this.secondary_card_ids[this.secondary_card_ids.length - 1], true);
            }
        };
        OrderedSelection.prototype.setIconType = function (iconType, secondaryIconType) {
            this.iconType = iconType;
            this.secondaryIconType = secondaryIconType;
        };
        OrderedSelection.prototype.updateIcons = function (secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            if (this.iconType) {
                for (var i = 0; i < card_ids.length; i++) {
                    var card_id = card_ids[i];
                    this.removeIcon(card_id, secondary);
                    this.addIcon(card_id, i, secondary);
                }
            }
        };
        OrderedSelection.prototype.toggle = function (card_id, secondary) {
            if (this.includes(card_id)) {
                this.unselectItem(card_id, secondary);
                this.updateIcons(secondary);
                return false;
            }
            else {
                this.selectItem(card_id, secondary);
                return true;
            }
        };
        OrderedSelection.prototype.includes = function (card_id, secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            return card_ids.includes(card_id);
        };
        OrderedSelection.prototype.get = function (secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            return card_ids.slice().reverse();
        };
        return OrderedSelection;
    }());
    exports.OrderedSelection = OrderedSelection;
});
define("components/DaleStock", ["require", "exports", "ebg/stock", "components/DaleCard", "components/Images", "components/OrderedSelection", "ebg/stock"], function (require, exports, Stock, DaleCard_2, Images_2, OrderedSelection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleStock = void 0;
    var DaleStock = (function (_super) {
        __extends(DaleStock, _super);
        function DaleStock() {
            var _this = _super.call(this) || this;
            _this.wrapClasses = ['dale-wrap-technique', 'dale-wrap-purchase', 'dale-wrap-build', 'dale-wrap-discard', 'dale-wrap-default'];
            _this.wrap = undefined;
            _this.actionLabel = undefined;
            _this.actionLabelDefaultText = "<DefaultText>";
            _this.selectionMode = 'none';
            _this.orderedSelection = new OrderedSelection_1.OrderedSelection();
            _this.jstpl_stock_item = '<div id="${id}" class="dale-card" style="top:${top}px;left:${left}px;width:${width}px;height:${height}px;${position};"></div>';
            return _this;
        }
        DaleStock.prototype.init = function (page, container, wrap, defaultText, onItemCreate, onItemDelete) {
            var _a;
            page.allDaleStocks.push(this);
            for (var i in page.gamedatas.cardTypes) {
                var type_id = page.gamedatas.cardTypes[i].type_id;
                this.addItemType(type_id, type_id);
            }
            this.create(page, container, Images_2.Images.CARD_WIDTH, Images_2.Images.CARD_HEIGHT);
            this.resizeItems(Images_2.Images.CARD_WIDTH_S, Images_2.Images.CARD_HEIGHT_S, Images_2.Images.SHEET_WIDTH_S, Images_2.Images.SHEET_HEIGHT_S);
            this.image_items_per_row = Images_2.Images.IMAGES_PER_ROW;
            this.create(page, container, Images_2.Images.CARD_WIDTH_S, Images_2.Images.CARD_HEIGHT_S);
            if (wrap) {
                dojo.setStyle(wrap, 'min-height', 2 * Images_2.Images.CARD_WIDTH_S + 'px');
                dojo.setStyle(wrap, 'max-height', 2 * Images_2.Images.CARD_WIDTH_S + 'px');
                this.wrap = wrap;
                this.actionLabel = (_a = wrap.querySelector(".dale-label")) !== null && _a !== void 0 ? _a : undefined;
                if (!this.actionLabel) {
                    throw new Error("initActionLabelWrap failed: no action label found");
                }
                if (defaultText) {
                    this.actionLabelDefaultText = defaultText;
                }
                this.apparenceBorderWidth = '0px';
                this.setWrapClass();
            }
            if (onItemCreate)
                this.onItemCreate = onItemCreate;
            if (onItemDelete)
                this.onItemDelete = onItemDelete;
        };
        DaleStock.prototype.onClick = function (card_id) {
            console.log("onClickOnCard(".concat(card_id, ")"));
        };
        DaleStock.prototype.onClickOnItem = function (evt) {
            console.log("onClickOnItem");
            evt.stopPropagation();
            var target = evt.currentTarget;
            if (target.classList.contains("dale-clickable")) {
                var match = target.id.match(/(\d+)$/);
                var item_id = +match[0];
                if (this.isClickable(item_id)) {
                    if (this.isClickSelectionMode()) {
                        this.onClick(item_id);
                    }
                    else {
                        this.orderedSelection.toggle(item_id);
                    }
                }
            }
        };
        DaleStock.prototype.isSelected = function (item_id) {
            return this.orderedSelection.includes(item_id);
        };
        DaleStock.prototype.selectItem = function (item_id, secondary) {
            this.orderedSelection.selectItem(+item_id, secondary);
            this.setClickable(item_id);
        };
        DaleStock.prototype.unselectItem = function (item_id, secondary) {
            this.orderedSelection.unselectItem(+item_id, secondary);
            this.setClickable(item_id);
        };
        DaleStock.prototype.unselectAll = function () {
            this.orderedSelection.unselectAll();
        };
        DaleStock.prototype.setSelectionMode = function (mode, iconType, wrapClass, actionLabelText, secondaryIconType) {
            this.selectionMode = mode;
            this.orderedSelection.setIconType(iconType, secondaryIconType);
            this.setSelectionMaxSize();
            this.setWrapClass(wrapClass, actionLabelText);
            for (var i in this.items) {
                var card_id = this.items[i].id;
                this.setClickable(card_id);
            }
        };
        DaleStock.prototype.isClickSelectionMode = function () {
            return (this.selectionMode == 'click' || this.selectionMode == 'clickTechnique' || this.selectionMode == 'clickRetainSelection');
        };
        DaleStock.prototype.setClickable = function (card_id) {
            var div = $(this.control_name + "_item_" + card_id);
            if (!div) {
                throw new Error("Card ".concat(card_id, " does not exist in hand, so setClickable cannot be set"));
            }
            if (this.isClickable(card_id)) {
                div.classList.add("dale-clickable");
            }
            else {
                div.classList.remove("dale-clickable");
            }
        };
        DaleStock.prototype.setSelectionMaxSize = function () {
            switch (this.selectionMode) {
                case 'none':
                    this.orderedSelection.setMaxSize(0);
                    break;
                case 'multiple':
                    this.orderedSelection.setMaxSize(Infinity);
                    break;
                case 'essentialPurchase':
                    this.orderedSelection.setMaxSize(3);
                    break;
            }
        };
        DaleStock.prototype.isClickable = function (card_id) {
            var card = new DaleCard_2.DaleCard(card_id);
            switch (this.selectionMode) {
                case 'none':
                    return false;
                case 'click':
                    return true;
                case 'clickTechnique':
                    return card.isPlayable();
                case 'clickRetainSelection':
                    return true;
                case 'multiple':
                    return true;
                case 'essentialPurchase':
                    return card.isJunk() && this.orderedSelection.get(true).includes(card.id);
                default:
                    var match = this.selectionMode.match(/^only_card_id(\d+)$/);
                    if (match) {
                        return card.id == +match[1];
                    }
                    throw new Error("isClickable has no definition for selectionMode '".concat(this.selectionMode, "'"));
            }
        };
        DaleStock.prototype.setWrapClass = function (wrapClass, labelText) {
            var _a;
            if (wrapClass === void 0) { wrapClass = 'dale-wrap-default'; }
            if (this.actionLabel && wrapClass != 'previous') {
                if (!labelText) {
                    labelText = this.actionLabelDefaultText;
                }
                this.actionLabel.innerHTML = labelText !== null && labelText !== void 0 ? labelText : this.actionLabelDefaultText;
                (_a = this.wrap.classList).remove.apply(_a, this.wrapClasses);
                if (wrapClass) {
                    this.wrap.classList.add(wrapClass);
                }
            }
        };
        DaleStock.prototype.addDaleCardToStock = function (card, from) {
            this.addToStockWithId(card.original_type_id, card.id, from);
            this.setClickable(card.id);
            var stockitem_div = $(this.control_name + '_item_' + card.id);
            card.attachDiv(stockitem_div);
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
            _super.prototype.updateDisplay.call(this, from);
            var div = undefined;
            for (var i in this.items) {
                var item = this.items[i];
                var index = +i + 1;
                div = $(this.getItemDivId(String(item.id)));
                div.dataset['arc'] = index + '/' + this.items.length;
                if (this.control_name.includes("hand")) {
                    dojo.setStyle(div, 'z-index', String(index + Images_2.Images.Z_INDEX_HAND_CARD));
                }
                else {
                    dojo.setStyle(div, 'z-index', String(index + Images_2.Images.Z_INDEX_LIMBO_CARD));
                }
            }
            if (this.item_margin < 0) {
                dojo.setStyle(this.container_div, 'left', "".concat(this.item_margin / 2, "px"));
            }
        };
        DaleStock.MAX_HORIZONTAL_OVERLAP = 85;
        return DaleStock;
    }(Stock));
    exports.DaleStock = DaleStock;
});
define("components/types/ChameleonClientStateArgs", ["require", "exports", "components/DaleCard", "components/Images", "components/Pile"], function (require, exports, DaleCard_3, Images_3, Pile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChameleonClientStateArgs = void 0;
    var ChameleonClientStateArgs = (function () {
        function ChameleonClientStateArgs(card, added, from, targets, callback, requiresPlayable, isChain) {
            if (requiresPlayable === void 0) { requiresPlayable = false; }
            if (isChain === void 0) { isChain = false; }
            this.card = card;
            this.added = added;
            this.from = from;
            this.targets = targets;
            this.callback = callback;
            this.requiresPlayable = requiresPlayable;
            this.isChain = isChain;
            this.line = $("dale-chameleon-line");
            if (from instanceof Pile_1.Pile) {
                this.line_origin = card.toDiv();
                this.line_origin.classList.add("dale-chameleon-selected");
                this.line_origin.classList.add("dale-clickable");
                from.placeholderHTML.appendChild(this.line_origin);
            }
            else {
                this.line_origin = card.div;
            }
            if (this.targets.length == 0 && card.effective_type_id != DaleCard_3.DaleCard.CT_GOODOLDTIMES) {
                throw new Error("Attempting to enter a chameleon state, but the chameleon card only has 0 targets");
            }
            for (var _i = 0, _a = this.targets; _i < _a.length; _i++) {
                var target = _a[_i];
                console.log("add chameleon target");
                console.log(target.div);
                target.div.classList.add("dale-chameleon-target");
            }
            var thiz = this;
            if (isChain) {
                thiz.line.classList.remove("dale-hidden");
            }
            else {
                thiz.line.classList.add("dale-hidden");
            }
            this.updateLine = function (evt) {
                thiz.line.classList.remove("dale-hidden");
                var rect = thiz.line_origin.getBoundingClientRect();
                var x1 = evt.pageX;
                var y1 = evt.pageY;
                var x2 = rect.left + window.scrollX + Images_3.Images.CARD_WIDTH_S / 2;
                var y2 = rect.top + window.scrollY + Images_3.Images.CARD_HEIGHT_S / 2;
                ;
                thiz.line.setAttribute("x1", String(x1));
                thiz.line.setAttribute("y1", String(y1));
                thiz.line.setAttribute("x2", String(x2));
                thiz.line.setAttribute("y2", String(y2));
            };
            addEventListener("mousemove", this.updateLine);
            this.line_origin.classList.add("dale-z-index-above-svg");
        }
        ChameleonClientStateArgs.prototype.selectChameleonCard = function () {
            this.line_origin.classList.add("dale-chameleon-selected");
        };
        ChameleonClientStateArgs.prototype.unselectChameleonCard = function () {
            this.line_origin.classList.remove("dale-chameleon-selected");
        };
        ChameleonClientStateArgs.prototype.remove = function () {
            for (var _i = 0, _a = this.targets; _i < _a.length; _i++) {
                var target = _a[_i];
                target.div.classList.remove("dale-chameleon-target");
            }
            this.line_origin.classList.remove("dale-z-index-above-svg");
            if (this.from instanceof Pile_1.Pile) {
                this.line_origin.remove();
                this.from.openPopin();
            }
            this.line.classList.add("dale-hidden");
            removeEventListener("mousemove", this.updateLine);
        };
        return ChameleonClientStateArgs;
    }());
    exports.ChameleonClientStateArgs = ChameleonClientStateArgs;
});
define("components/Pile", ["require", "exports", "components/Images", "components/DaleCard", "components/OrderedSelection"], function (require, exports, Images_4, DaleCard_4, OrderedSelection_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pile = void 0;
    var Pile = (function () {
        function Pile(page, pile_container_id, pile_name, player_id) {
            var _a;
            this.selectionMode = 'none';
            this.popin = new ebg.popindialog();
            this.isPopinOpen = false;
            this.cardIdToPopinDiv = new Map();
            page.allPiles.push(this);
            this.pile_container_id = pile_container_id;
            this.pile_name = pile_name;
            this.player_id = player_id;
            $(pile_container_id).innerHTML = "\n            ".concat(pile_name ? "<h3 class=\"dale-component-name\">".concat(pile_name, "</h3>") : "", "\n            <div class=\"pile\" style=\"").concat(Images_4.Images.getCardStyle(), "\">\n                <div class=\"dale-card\"></div>\n                <div class=\"dale-pile-size\"></div>\n                <div class=\"dale-pile-size dale-pile-selected-size\" style=\"top: 16%;\"></div>\n            </div>\n        ");
            this.page = page;
            this.containerHTML = $(pile_container_id);
            this.placeholderHTML = Images_4.Images.getPlaceholder();
            var sizeElements = this.containerHTML.querySelectorAll('.dale-pile-size');
            this.sizeHTML = sizeElements[0];
            this.selectedSizeHTML = sizeElements[1];
            this.cards = [];
            this._slidingCards = [];
            this.orderedSelection = new OrderedSelection_2.OrderedSelection();
            (_a = this.containerHTML.querySelector(".pile")) === null || _a === void 0 ? void 0 : _a.prepend(this.placeholderHTML);
            this.updateHTML();
            dojo.connect(this.orderedSelection, 'onSelectionChanged', this, 'onPileSelectionChanged');
        }
        Object.defineProperty(Pile.prototype, "size", {
            get: function () {
                return this.cards.length;
            },
            enumerable: false,
            configurable: true
        });
        Pile.prototype.getCards = function () {
            return this.cards.slice();
        };
        Pile.prototype.updateHTML = function () {
            var _a;
            var topCard = this.peek(true);
            if (this.selectionMode == 'multiple' && this.orderedSelection.getMaxSize() > 0) {
                this.selectedSizeHTML.classList.remove("dale-hidden");
                this.selectedSizeHTML.innerHTML = "(x ".concat(this.orderedSelection.getSize(), ")");
            }
            else {
                this.selectedSizeHTML.classList.add("dale-hidden");
            }
            this.sizeHTML.innerHTML = 'x ' + this.cards.length;
            if (!this.isPopinOpen) {
                (_a = this.topCardHTML) === null || _a === void 0 ? void 0 : _a.remove();
                if (topCard !== undefined) {
                    this.topCardHTML = topCard.toDiv(this.placeholderHTML);
                    this.topCardHTML.classList.add("dale-clickable");
                    dojo.connect(this.topCardHTML, 'onclick', this, "onClickTopCard");
                }
            }
        };
        Pile.prototype.setZIndex = function (slidingElement) {
            var z_index = Images_4.Images.Z_INDEX_SLIDING_CARD + this._slidingCards.length;
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
                this.cards.push(new DaleCard_4.DaleCard(0, 0));
            }
            this.updateHTML();
        };
        Pile.prototype.push = function (card, from, onEnd, duration, delay) {
            this.cards.push(card);
            if (from) {
                this._slidingCards.push(card);
                var slidingElement = card.toDiv();
                this.placeholderHTML.appendChild(slidingElement);
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
            if (to) {
                if (to instanceof Pile) {
                    to = to.placeholderHTML;
                }
                var slidingElement = this.peek().toDiv();
                this.placeholderHTML.appendChild(slidingElement);
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
        Pile.prototype.getPopinCardDiv = function (card_id) {
            return this.cardIdToPopinDiv.get(card_id);
        };
        Pile.prototype.openPopin = function () {
            var _a, _b;
            (_a = this.peek()) === null || _a === void 0 ? void 0 : _a.detachDiv();
            var player = this.player_id ? this.page.gamedatas.players[this.player_id] : undefined;
            var title_player = player ? "<span style=\"font-weight:bold;color:#".concat(player.color, "\">").concat(player.name, "</span>'s ") : "";
            var title_pile_name = (_b = this.pile_name) !== null && _b !== void 0 ? _b : "Unnamed Pile";
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
                if (this_1.selectionMode != 'none' && this_1.orderedSelection.getMaxSize() > 0) {
                    div.classList.add("dale-clickable");
                    var thiz_2 = this_1;
                    dojo.connect(div, 'onclick', function () {
                        thiz_2.onClickCard(card, div);
                    });
                }
                this_1.cardIdToPopinDiv.set(card.id, div);
            };
            var this_1 = this;
            for (var _i = 0, _c = this.cards; _i < _c.length; _i++) {
                var card = _c[_i];
                _loop_1(card);
            }
            dojo.connect($("popin_" + this.popin.id + "_close"), "onclick", this, "onClosePopin");
            this.isPopinOpen = true;
            this.popin.show();
            this.orderedSelection.updateIcons();
        };
        Pile.prototype.onClickTopCard = function () {
            if (this.selectionMode == 'top') {
                this.onPileSelectionChanged(this.peek().id, true);
                return;
            }
            this.openPopin();
        };
        Pile.prototype.onClickCard = function (card, div) {
            console.log("Clicked on a card in the popin");
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
                    this.orderedSelection.toggle(card.id);
                    this.updateHTML();
                    break;
            }
        };
        Pile.prototype.unselectItem = function (card_id) {
            this.orderedSelection.unselectItem(card_id);
        };
        Pile.prototype.selectItem = function (card_id) {
            this.orderedSelection.selectItem(card_id);
        };
        Pile.prototype.setSelectionMode = function (mode, iconType, max) {
            if (max === void 0) { max = 0; }
            if (mode != 'multiple') {
                this.orderedSelection.unselectAll();
            }
            this.orderedSelection.setIconType(iconType);
            this.orderedSelection.setMaxSize(max);
            this.selectionMode = mode;
            this.updateHTML();
        };
        Pile.prototype.closePopin = function () {
            this.popin.hide();
            this.onClosePopin();
        };
        Pile.prototype.onClosePopin = function () {
            console.log("onClosePopin");
            for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
                var card = _a[_i];
                card.detachDiv();
            }
            this.isPopinOpen = false;
            this.updateHTML();
        };
        Pile.prototype.onPileSelectionChanged = function (card_id, added) {
            this.page.onPileSelectionChanged(this, card_id, added);
        };
        return Pile;
    }());
    exports.Pile = Pile;
});
define("components/HiddenPile", ["require", "exports", "components/DaleCard", "components/Pile"], function (require, exports, DaleCard_5, Pile_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HiddenPile = void 0;
    var HiddenPile = (function (_super) {
        __extends(HiddenPile, _super);
        function HiddenPile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HiddenPile.prototype.push = function (_card, from, onEnd, duration, delay) {
            _super.prototype.push.call(this, new DaleCard_5.DaleCard(0, 0), from, onEnd, duration, delay);
        };
        return HiddenPile;
    }(Pile_2.Pile));
    exports.HiddenPile = HiddenPile;
});
define("components/CardSlot", ["require", "exports", "components/DaleCard"], function (require, exports, DaleCard_6) {
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
            this._container.classList.add("dale-selected");
            this.selected = true;
        };
        CardSlot.prototype.unselectItem = function () {
            this._container.classList.remove("dale-selected");
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
            this.insertCard(new DaleCard_6.DaleCard(card_id), div);
            stock.removeFromStockByIdNoAnimation(card_id);
        };
        CardSlot.UNIQUE_ID = 0;
        return CardSlot;
    }());
    exports.CardSlot = CardSlot;
});
define("components/MarketBoard", ["require", "exports", "components/Images", "components/CardSlot", "components/OrderedSelection"], function (require, exports, Images_5, CardSlot_1, OrderedSelection_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MarketBoard = void 0;
    var MarketBoard = (function () {
        function MarketBoard(page) {
            this.MAX_SIZE = 5;
            this.page = page;
            $("market-board-background").setAttribute("style", "\n            width: ".concat(Images_5.Images.MARKET_WIDTH_S - Images_5.Images.MARKET_PADDING_LEFT_S - Images_5.Images.MARKET_PADDING_RIGHT_S, "px;\n            height: ").concat(Images_5.Images.MARKET_HEIGHT_S - Images_5.Images.MARKET_PADDING_TOP_S - Images_5.Images.MARKET_PADDING_BOTTOM_S, "px;\n\t\t\tbackground-size: ").concat(Images_5.Images.MARKET_WIDTH_S, "px ").concat(Images_5.Images.MARKET_HEIGHT_S, "px;\n\t\t\tpadding-top: ").concat(Images_5.Images.MARKET_PADDING_TOP_S, "px;\n\t\t\tpadding-left: ").concat(Images_5.Images.MARKET_PADDING_LEFT_S, "px;\n            padding-bottom: ").concat(Images_5.Images.MARKET_PADDING_BOTTOM_S, "px;\n\t\t\tpadding-right: ").concat(Images_5.Images.MARKET_PADDING_RIGHT_S, "px;\n\t\t"));
            this.container = $("market-board-background").querySelector("#market-board");
            this.slots = [];
            for (var pos = this.MAX_SIZE - 1; pos >= 0; pos--) {
                var div = document.createElement("div");
                div.setAttribute('style', "".concat(Images_5.Images.getCardStyle(), ";\n                position: absolute;\n                left: ").concat(pos * (Images_5.Images.CARD_WIDTH_S + Images_5.Images.MARKET_ITEM_MARGIN_S), "px\n            "));
                this.container.appendChild(div);
                this.slots.push(new CardSlot_1.CardSlot(this, 4 - pos, div));
            }
            this.orderedSelection = new OrderedSelection_3.OrderedSelection();
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
        MarketBoard.prototype.getCards = function () {
            var cards = [];
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                if (slot.hasCard()) {
                    cards.push(slot.card);
                }
            }
            return cards;
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
define("components/Stall", ["require", "exports", "components/DaleCard", "components/Images", "components/CardSlot", "components/DaleIcons"], function (require, exports, DaleCard_7, Images_6, CardSlot_2, DaleIcons_3) {
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
            dojo.setStyle(this.container.parentElement, 'max-width', Images_6.Images.CARD_WIDTH_S * (1 + Images_6.Images.STACK_MAX_MARGIN_X) * Stall.MAX_STACKS + 'px');
            addEventListener("resize", this.onResize.bind(this));
            this.onResize();
        }
        Object.defineProperty(Stall.prototype, "leftMostPlaceholder", {
            get: function () {
                var placeholder = this.container.querySelector(".dale-placeholder");
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
                    prevStackContainer.setAttribute('style', "max-width: ".concat(Images_6.Images.CARD_WIDTH_S * (1 + Images_6.Images.STACK_MAX_MARGIN_X), "px;"));
                }
                var stackContainer = document.createElement("div");
                stackContainer.classList.add("stack-container");
                stackContainer.setAttribute('style', "min-width: ".concat(Images_6.Images.CARD_WIDTH_S, "px;"));
                var placeholder = Images_6.Images.getPlaceholder();
                if (this.slots.length > 0) {
                    stackContainer.classList.add("dale-grayed-out");
                    placeholder.classList.add("dale-placeholder-partially-covered");
                }
                var text = document.createElement("div");
                text.classList.add("dale-text");
                text.textContent = _("Build a new stack");
                placeholder.appendChild(text);
                var stackIndexDiv = document.createElement("div");
                stackIndexDiv.classList.add("dale-stack-index");
                stackIndexDiv.innerText = String(this.slots.length + 1);
                placeholder.append(stackIndexDiv);
                placeholder.appendChild(DaleIcons_3.DaleIcons.getBuildIcon());
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
                var y_offset = Images_6.Images.VERTICAL_STACK_OFFSET_S * (maxHeight - 1);
                console.log("Update height");
                console.log(stackContainer.getAttribute('style'));
                var prevStyleWithoutHeight = (_a = stackContainer.getAttribute('style')) === null || _a === void 0 ? void 0 : _a.replace(/height:.*px;/, '');
                console.log(prevStyleWithoutHeight);
                stackContainer.setAttribute('style', prevStyleWithoutHeight + "height: ".concat(Images_6.Images.CARD_HEIGHT_S + y_offset, "px;"));
            }
        };
        Stall.prototype.createNewSlot = function (stack_index, card) {
            if (stack_index < 0 || stack_index >= this.slots.length || stack_index >= this.stackContainers.length) {
                throw new Error("Cannot make a slot in non-existing stack ".concat(stack_index));
            }
            var stackContainer = this.stackContainers[stack_index];
            var stack = this.slots[stack_index];
            var index = stack.length;
            var y_offset = Images_6.Images.VERTICAL_STACK_OFFSET_S * index;
            var div = document.createElement("div");
            div.setAttribute('style', "".concat(Images_6.Images.getCardStyle(), ";\n            position: absolute;\n            top: ").concat(y_offset, "px\n        "));
            stackContainer.appendChild(div);
            var pos = this.getPos(stack_index, index);
            stack.push(new CardSlot_2.CardSlot(this, pos, div, card));
            this.updateHeight();
        };
        Stall.prototype.insertDbCard = function (card, from) {
            var pos = +card.location_arg;
            var index = pos % Stall.MAX_STACK_SIZE;
            var stack_index = (pos - index) / Stall.MAX_STACK_SIZE;
            this.insertCard(DaleCard_7.DaleCard.of(card), stack_index, index, from);
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
        Stall.prototype.getCardsInStack = function (stack_index) {
            var targets = [];
            if (stack_index >= 0 && stack_index < this.getNumberOfStacks()) {
                for (var _i = 0, _a = this.slots[stack_index]; _i < _a.length; _i++) {
                    var slot = _a[_i];
                    if (slot.card) {
                        targets.push(slot.card);
                    }
                }
            }
            return targets;
        };
        Stall.prototype.getCardsInStall = function () {
            var targets = [];
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var stack = _a[_i];
                for (var _b = 0, stack_1 = stack; _b < stack_1.length; _b++) {
                    var slot = stack_1[_b];
                    if (slot.card) {
                        targets.push(slot.card);
                    }
                }
            }
            return targets;
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
        Stall.prototype.onResize = function () {
            if (this.container.getBoundingClientRect().width < (1 + Images_6.Images.STACK_MIN_MARGIN_X) * Images_6.Images.CARD_WIDTH_S * Stall.MAX_STACKS) {
                for (var i = 1; i < this.slots.length; i++) {
                    var placeholder = this.stackContainers[i].querySelector(".dale-placeholder");
                    placeholder === null || placeholder === void 0 ? void 0 : placeholder.classList.add("dale-placeholder-partially-covered");
                }
            }
            else {
                for (var i = 1; i < this.slots.length; i++) {
                    var placeholder = this.stackContainers[i].querySelector(".dale-placeholder");
                    placeholder === null || placeholder === void 0 ? void 0 : placeholder.classList.remove("dale-placeholder-partially-covered");
                }
            }
        };
        Stall.MAX_STACK_SIZE = 1000;
        Stall.MAX_STACKS = 8;
        return Stall;
    }());
    exports.Stall = Stall;
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
            this._args = {};
        }
        Object.defineProperty(MainClientState.prototype, "args", {
            get: function () {
                if (Object.keys(this._args).length == 0) {
                    throw new Error("Client state ".concat(this.name, " has no args"));
                }
                return this._args;
            },
            enumerable: false,
            configurable: true
        });
        MainClientState.prototype.getDescription = function (state) {
            switch (state) {
                case 'client_technique':
                    return _("${you} must (a) purchase a card, (b) play a technique, (c) build a stack, or (d) take an inventory action");
                case 'client_purchase':
                    return _("${you} must pay ${cost} for ${card_name}");
                case 'client_build':
                    return _("${you} must select cards to build in stack ${stack_index_plus_1}");
                case 'client_inventory':
                    return _("${you} must discard any number of cards");
                case 'client_essentialPurchase':
                    return _("${you} may <stronger>ditch</stronger> up to 3 selected junk cards");
            }
            return "MISSING DESCRIPTION";
        };
        MainClientState.prototype.exit = function () {
            this.enterClientState('client_technique');
        };
        MainClientState.prototype.enterClientState = function (name, args) {
            if (name) {
                this.name = name;
            }
            if (args) {
                this._args = args !== null && args !== void 0 ? args : {};
            }
            this.page.setClientState(this.name, {
                descriptionmyturn: this.getDescription(this.name),
                args: this._args
            });
        };
        return MainClientState;
    }());
    exports.MainClientState = MainClientState;
});
define("bgagame/dale", ["require", "exports", "ebg/core/gamegui", "components/DaleStock", "components/Pile", "components/HiddenPile", "components/DaleCard", "components/MarketBoard", "components/Stall", "components/types/ChameleonClientStateArgs", "components/types/MainClientState", "components/Images", "ebg/counter", "ebg/stock", "ebg/counter"], function (require, exports, Gamegui, DaleStock_1, Pile_3, HiddenPile_1, DaleCard_8, MarketBoard_1, Stall_1, ChameleonClientStateArgs_1, MainClientState_1, Images_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dale = (function (_super) {
        __extends(Dale, _super);
        function Dale() {
            var _this = _super.call(this) || this;
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
            _this.myHand = new DaleStock_1.DaleStock();
            _this.myLimbo = new DaleStock_1.DaleStock();
            _this.mainClientState = new MainClientState_1.MainClientState(_this);
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
            var _a, _b, _c;
            console.log("Starting game setup");
            console.log("------ GAME DATAS ------ !");
            console.log(this.gamedatas);
            console.log("------------------------");
            var svgContainer = $("dale-svg-container");
            (_a = $("ebd-body")) === null || _a === void 0 ? void 0 : _a.appendChild(svgContainer);
            DaleCard_8.DaleCard.init(gamedatas.cardTypes);
            for (var player_id in gamedatas.players) {
                var player = gamedatas.players[player_id];
                var player_board_div = (_b = $('player_board_' + player_id)) === null || _b === void 0 ? void 0 : _b.querySelector(".player_score");
                dojo.place(this.format_block('jstpl_hand_size', {
                    player: player
                }), player_board_div, 'first');
                this.playerHandSizes[player_id] = new ebg.counter();
                this.playerHandSizes[player_id].create('handsize-' + player_id);
                this.playerHandSizes[player_id].setValue(gamedatas.handSizes[player_id]);
                this.addTooltip('dale-myhandsize-icon-' + player_id, _("Number of cards in hand."), '');
                this.addTooltip('icon_point_' + player_id, _("Number of stacks built."), '');
                (_c = player_board_div.querySelector(".player_score_value")) === null || _c === void 0 ? void 0 : _c.insertAdjacentText('afterend', "/8");
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
            this.myHand.init(this, $('dale-myhand'), $('dale-myhand-wrap'), _("Your hand"));
            this.myHand.centerItems = true;
            for (var i in gamedatas.hand) {
                var card = gamedatas.hand[i];
                this.myHand.addDaleCardToStock(DaleCard_8.DaleCard.of(card));
            }
            this.myHand.setSelectionMode('none');
            dojo.connect(this.myHand, 'onClick', this, 'onHandSelectionChanged');
            dojo.connect(this.myHand.orderedSelection, 'onSelectionChanged', this, 'onHandSelectionChanged');
            var thiz = this;
            var limboTransitionUpdateDisplay = function () {
                console.log("limboTransitionUpdateDisplay");
                setTimeout(function () { thiz.myLimbo.updateDisplay(); }, 1);
                setTimeout(function () { thiz.myHand.updateDisplay(); }, 1);
            };
            var onLimboItemCreate = function () {
                var classList = thiz.myLimbo.wrap.classList;
                if (classList.contains("dale-hidden")) {
                    classList.remove("dale-hidden");
                    limboTransitionUpdateDisplay();
                }
            };
            var onLimboItemDelete = function () {
                var classList = thiz.myLimbo.wrap.classList;
                if (thiz.myLimbo.count() <= 1) {
                    if (!classList.contains("dale-hidden")) {
                        classList.add("dale-hidden");
                        limboTransitionUpdateDisplay();
                    }
                }
            };
            this.myLimbo.init(this, $('dale-mylimbo'), $('dale-mylimbo-wrap'), _("Limbo"), onLimboItemCreate, onLimboItemDelete);
            this.myLimbo.wrap.classList.add("dale-hidden");
            this.myLimbo.centerItems = true;
            for (var i in gamedatas.limbo) {
                var card = gamedatas.limbo[i];
                this.myLimbo.addDaleCardToStock(DaleCard_8.DaleCard.of(card));
            }
            this.myLimbo.setSelectionMode('none');
            dojo.setStyle(this.myLimbo.wrap, 'min-width', 3 * Images_7.Images.CARD_WIDTH_S + 'px');
            dojo.connect(this.myLimbo, 'onOrderedSelectionChanged', this, 'onLimboSelectionChanged');
            for (var player_id in gamedatas.schedules) {
                var container = $('schedule-' + player_id);
                var wrap = $('schedule-wrap-' + player_id);
                dojo.setStyle(wrap, 'width', "".concat(1.5 * Images_7.Images.CARD_WIDTH_S, "px"));
                this.playerSchedules[player_id] = new DaleStock_1.DaleStock();
                this.playerSchedules[player_id].init(this, container);
                this.playerSchedules[player_id].setSelectionMode('none');
                this.playerSchedules[player_id].duration = 500;
                this.playerSchedules[player_id].centerItems = true;
                for (var card_id in gamedatas.schedules[player_id]) {
                    var card = gamedatas.schedules[+player_id][+card_id];
                    this.playerSchedules[player_id].addDaleCardToStock(DaleCard_8.DaleCard.of(card));
                }
            }
            console.log("DbEffects:");
            for (var i in gamedatas.effects) {
                var effect = gamedatas.effects[i];
                DaleCard_8.DaleCard.addEffect(effect);
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
                    this.myHand.setSelectionMode('multiple', 'pileYellow', 'dale-wrap-purchase', _("Click cards to use for <strong>purchasing</strong>"));
                    this.market.setSelectionMode(1);
                    if (client_purchase_args.on_market_board) {
                        this.market.setSelected(client_purchase_args.pos, true);
                    }
                    else {
                        throw new Error("NOT IMPLEMENTED: market discovery");
                    }
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_technique':
                    this.myHand.setSelectionMode('clickTechnique', 'pileBlue', 'dale-wrap-technique', _("Click cards to play <strong>techniques</strong>"));
                    this.market.setSelectionMode(1);
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_build':
                    this.myHand.setSelectionMode('multiple', 'build', 'dale-wrap-build', _("Click cards to <strong>build stacks</strong>"));
                    this.market.setSelectionMode(1);
                    this.myStall.selectLeftPlaceholder();
                    this.onBuildSelectionChanged();
                    break;
                case 'client_inventory':
                    this.myHand.setSelectionMode('multiple', 'pileRed', 'dale-wrap-discard', _("Click cards to <strong>discard</strong>"));
                    this.market.setSelectionMode(1);
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_essentialPurchase':
                    var client_essentialPurchase_args = this.mainClientState.args;
                    if (client_essentialPurchase_args.on_market_board) {
                        this.market.setSelected(client_essentialPurchase_args.pos, true);
                    }
                    else {
                        throw new Error("NOT IMPLEMENTED: interaction market discovery + essential purchase");
                    }
                    this.myHand.setSelectionMode('essentialPurchase', 'ditch', 'dale-wrap-purchase', _("Choose up to 3 junk cards to <strong>ditch</strong>"), 'pileYellow');
                    for (var _i = 0, _f = client_essentialPurchase_args.funds_card_ids.slice().reverse(); _i < _f.length; _i++) {
                        var card_id = _f[_i];
                        this.myHand.selectItem(card_id, true);
                    }
                    break;
                case 'winterIsComing':
                    this.myHand.setSelectionMode('multiple', 'build', 'dale-wrap-build', _("Click cards to <strong>build additional stacks</strong>"));
                    this.myStall.selectLeftPlaceholder();
                    this.onBuildSelectionChanged();
                    break;
                case 'swiftBroker':
                    this.myHand.setSelectionMode('multiple', 'pileBlue', 'dale-wrap-technique', _("Choose the order to discard your hand"));
                    break;
                case 'shatteredRelic':
                    this.myHand.setSelectionMode('click', undefined, 'dale-wrap-technique', _("Choose a card to <strong>ditch</strong>"));
                    break;
                case 'spyglass':
                    this.myLimbo.setSelectionMode('multiple', 'spyglass', 'dale-wrap-technique', _("Choose a card to take"));
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
                    this.myHand.setSelectionMode('clickRetainSelection', undefined, 'previous');
                    this.myStall.setSelectionMode('rightmoststack');
                    (_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.selectChameleonCard();
                    break;
                case 'chameleon_reflection':
                    this.myHand.setSelectionMode('clickRetainSelection', undefined, 'previous');
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            this.playerDiscards[player_id].setSelectionMode('top');
                        }
                    }
                    (_b = this.chameleonArgs) === null || _b === void 0 ? void 0 : _b.selectChameleonCard();
                    break;
                case 'chameleon_goodoldtimes':
                    this.myHand.setSelectionMode('clickRetainSelection', undefined, 'previous');
                    this.marketDiscard.setSelectionMode('top');
                    if (this.chameleonArgs.card.hasActiveAbility()) {
                        this.marketDeck.setSelectionMode('top');
                    }
                    (_c = this.chameleonArgs) === null || _c === void 0 ? void 0 : _c.selectChameleonCard();
                    break;
                case 'chameleon_trendsetting':
                    this.myHand.setSelectionMode('clickRetainSelection', undefined, 'previous');
                    this.market.setSelectionMode(1);
                    (_d = this.chameleonArgs) === null || _d === void 0 ? void 0 : _d.selectChameleonCard();
                    break;
                case 'chameleon_seeingdoubles':
                    this.myHand.setSelectionMode('clickRetainSelection', undefined, 'previous');
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
                    this.myHand.setSelectionMode('none');
                    this.myStall.setLeftPlaceholderClickable(false);
                    if (this.mainClientState.name != 'client_essentialPurchase') {
                        DaleCard_8.DaleCard.unbindAllChameleonsLocal();
                    }
                    break;
                case 'client_technique':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    this.myStall.setLeftPlaceholderClickable(false);
                    DaleCard_8.DaleCard.unbindAllChameleonsLocal();
                    break;
                case 'client_build':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    this.myStall.unselectLeftPlaceholder();
                    this.myDiscard.setSelectionMode('none');
                    DaleCard_8.DaleCard.unbindAllChameleonsLocal();
                    break;
                case 'client_inventory':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    this.myStall.setLeftPlaceholderClickable(false);
                    DaleCard_8.DaleCard.unbindAllChameleonsLocal();
                    break;
                case 'client_essentialPurchase':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    break;
                case 'winterIsComing':
                    this.myHand.setSelectionMode('none');
                    this.myStall.unselectLeftPlaceholder();
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'swiftBroker':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'shatteredRelic':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'spyglass':
                    this.myLimbo.setSelectionMode('none');
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
                case 'client_essentialPurchase':
                    this.addActionButton("confirm-button", _("Confirm Junk"), "onPurchase");
                    this.addActionButtonCancelClient();
                    break;
                case 'winterIsComing':
                    this.addActionButton("confirm-button", _("Confirm Selection"), "onBuild");
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
        Dale.prototype.handleChameleonCard = function (card, added, from, callback, requiresPlayable, isChain) {
            var _this = this;
            if (added === void 0) { added = true; }
            if (requiresPlayable === void 0) { requiresPlayable = false; }
            if (isChain === void 0) { isChain = false; }
            callback = callback.bind(this);
            if (!isChain && card.isBoundChameleon() && card.effective_type_id != DaleCard_8.DaleCard.CT_GOODOLDTIMES) {
                card.unbindChameleonLocal();
                callback(card, added);
                return;
            }
            if (!card.isChameleon()) {
                callback(card, added);
                return;
            }
            var targets = [];
            var chameleonStatename;
            var chameleonDescriptionmyturn;
            switch (card.effective_type_id) {
                case DaleCard_8.DaleCard.CT_FLEXIBLESHOPKEEPER:
                    targets = this.myStall.getCardsInStack(this.myStall.getNumberOfStacks() - 1);
                    chameleonStatename = 'chameleon_flexibleShopkeeper';
                    chameleonDescriptionmyturn = requiresPlayable ?
                        _("Flexible Shopkeeper: ${you} must copy a technique card from your rightmost stack") :
                        _("Flexible Shopkeeper: ${you} must copy a card from your rightmost stack");
                    break;
                case DaleCard_8.DaleCard.CT_REFLECTION:
                    for (var _i = 0, _a = Object.entries(this.playerDiscards); _i < _a.length; _i++) {
                        var _b = _a[_i], player_id = _b[0], pile = _b[1];
                        if (+player_id != +this.player_id && pile.size > 0) {
                            targets.push(pile.peek());
                            break;
                        }
                    }
                    chameleonStatename = 'chameleon_reflection';
                    chameleonDescriptionmyturn = requiresPlayable ?
                        _("Reflection: ${you} must copy a playable card from the top of another player's discard pile") :
                        _("Reflection: ${you} must copy a card from the top of another player's discard pile");
                    break;
                case DaleCard_8.DaleCard.CT_GOODOLDTIMES:
                    if (this.marketDiscard.size > 0) {
                        targets.push(this.marketDiscard.peek());
                    }
                    if (card.hasActiveAbility() && from == this.myHand) {
                        if (!isChain && !this.myHand.isSelected(card.id)) {
                            console.log("Deselected CT_GOODOLDTIMES");
                            callback(card, added);
                            return;
                        }
                        chameleonStatename = 'chameleon_goodoldtimes';
                        chameleonDescriptionmyturn = requiresPlayable ?
                            _("Good Old Times: ${you} may ditch the supply's top card or copy the bin's top card") :
                            _("Good Old Times: ${you} may ditch the supply's top card or copy the bin's top card to play as a technique");
                    }
                    else {
                        chameleonStatename = 'chameleon_goodoldtimes';
                        chameleonDescriptionmyturn = requiresPlayable ?
                            _("Good Old Times: ${you} must copy the bin's top card") :
                            _("Good Old Times: ${you} must copy the bin's top card to play as a technique");
                    }
                    break;
                case DaleCard_8.DaleCard.CT_TRENDSETTING:
                    for (var _c = 0, _d = this.market.getCards(); _c < _d.length; _c++) {
                        var card_1 = _d[_c];
                        targets.push(card_1);
                    }
                    chameleonStatename = 'chameleon_trendsetting';
                    chameleonDescriptionmyturn = requiresPlayable ?
                        _("Trendsetting: ${you} must copy a playable card in the market") :
                        _("Trendsetting: ${you} must copy a card in the market");
                    break;
                case DaleCard_8.DaleCard.CT_SEEINGDOUBLES:
                    var items = this.myHand.getAllItems();
                    for (var _e = 0, items_1 = items; _e < items_1.length; _e++) {
                        var item = items_1[_e];
                        if (item.id != card.id) {
                            targets.push(new DaleCard_8.DaleCard(item.id));
                        }
                    }
                    chameleonStatename = 'chameleon_seeingdoubles';
                    chameleonDescriptionmyturn = requiresPlayable ?
                        _("Seeing Doubles: ${you} must copy a playable card from your hand") :
                        _("Trendsetting: ${you} must copy another card in your hand");
                    break;
                default:
                    throw new Error("Unknown chameleon card: '".concat(card.name, "'"));
            }
            console.log("'".concat(card.name, "' has ").concat(targets.length, " target(s)"));
            if (targets.length == 0) {
                callback(card, added);
                return;
            }
            this.chameleonArgs = new ChameleonClientStateArgs_1.ChameleonClientStateArgs(card, added, from, targets, callback, requiresPlayable, isChain);
            this.setClientState(chameleonStatename, {
                descriptionmyturn: chameleonDescriptionmyturn
            });
            if (targets.length == 1) {
                this.onConfirmChameleon(targets[0]);
                return;
            }
            if (from instanceof Pile_3.Pile) {
                console.log("Add event listener to");
                console.log(this.chameleonArgs.line_origin);
                this.chameleonArgs.line_origin.addEventListener('click', function () { _this.onCancelChameleon(); });
                from.closePopin();
            }
        };
        Dale.prototype.setMainTitle = function (text) {
            $('pagemaintitletext').innerHTML = text;
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
            console.log("onMarketCardClick");
            console.log(this.gamedatas.gamestate.name);
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                    var client_purchase_args = this.mainClientState.args;
                    if (client_purchase_args.pos == pos) {
                        this.mainClientState.exit();
                    }
                    else {
                        this.mainClientState.enterClientState('client_purchase', {
                            pos: pos,
                            on_market_board: true,
                            card_name: card.name,
                            cost: card.getCost(pos)
                        });
                    }
                    break;
                case 'client_technique':
                case 'client_build':
                case 'client_inventory':
                    console.log("".concat(this.gamedatas.gamestate.name, " --> client_purchase"));
                    this.mainClientState.enterClientState('client_purchase', {
                        pos: pos,
                        on_market_board: true,
                        card_name: card.name,
                        cost: card.getCost(pos)
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
        Dale.prototype.onPileSelectionChanged = function (pile, card_id, added) {
            console.log("onPileSelectionChanged");
            var card = new DaleCard_8.DaleCard(card_id);
            if (pile === this.myDiscard) {
                this.onMyDiscardPileSelectionChanged(pile, card, added);
            }
            else if (pile === this.marketDiscard) {
                this.onMarketDiscardPileSelectionChanged(pile, card, added);
            }
            else if (pile === this.marketDeck) {
                this.onMarketDeckSelectionChanged(pile, card, added);
            }
            else {
                this.onOtherDiscardPileSelectionChanged(pile, card, added);
            }
        };
        Dale.prototype.onMyDiscardPileSelectionChanged = function (pile, card, added) {
            console.log("onMyDiscardPileSelectionChanged");
            switch (this.gamedatas.gamestate.name) {
                case 'client_build':
                    this.handleChameleonCard(card, added, pile, this.onBuildSelectionChanged);
                    break;
            }
        };
        Dale.prototype.onMarketDiscardPileSelectionChanged = function (pile, card, added) {
            console.log("onMarketDiscardPileSelectionChanged");
            switch (this.gamedatas.gamestate.name) {
                case 'chameleon_goodoldtimes':
                    this.onGoodOldTimesBind();
                    break;
            }
        };
        Dale.prototype.onMarketDeckSelectionChanged = function (pile, card, added) {
            console.log("onMarketDeckSelectionChanged");
            switch (this.gamedatas.gamestate.name) {
                case 'chameleon_goodoldtimes':
                    this.onGoodOldTimesPassive();
                    break;
            }
        };
        Dale.prototype.onOtherDiscardPileSelectionChanged = function (pile, card, added) {
            switch (this.gamedatas.gamestate.name) {
                case 'chameleon_reflection':
                    this.onConfirmChameleon(card);
                    break;
            }
        };
        Dale.prototype.onHandSelectionChanged = function (card_id, added) {
            console.log("onHandSelectionChanged: " + card_id);
            var card = new DaleCard_8.DaleCard(card_id);
            switch (this.gamedatas.gamestate.name) {
                case 'client_technique':
                    this.handleChameleonCard(card, true, this.myHand, this.onPlayCard, true);
                    break;
                case 'client_purchase':
                    this.handleChameleonCard(card, added, this.myHand, this.onFundsSelectionChanged);
                    break;
                case 'client_build':
                    this.handleChameleonCard(card, added, this.myHand, this.onBuildSelectionChanged);
                    break;
                case 'winterIsComing':
                    this.handleChameleonCard(card, added, this.myHand, this.onBuildSelectionChanged);
                    break;
                case 'shatteredRelic':
                    if (this.checkAction('actShatteredRelic')) {
                        this.bgaPerformAction('actShatteredRelic', {
                            card_id: card.id
                        });
                    }
                    break;
                case 'chameleon_flexibleShopkeeper':
                case 'chameleon_reflection':
                case 'chameleon_goodoldtimes':
                case 'chameleon_trendsetting':
                case 'chameleon_seeingdoubles':
                    var args = this.chameleonArgs;
                    if (args.card.id == card.id) {
                        this.onCancelChameleon(false);
                    }
                    else {
                        if (this.gamedatas.gamestate.name == 'chameleon_seeingdoubles') {
                            this.onConfirmChameleon(card);
                            this.myHand.unselectItem(card_id);
                        }
                        else {
                            this.showMessage(_("Please select a valid target for ") + "'".concat(args.card.name, "'"), "error");
                        }
                    }
                    break;
                case null:
                    throw new Error("gamestate.name is null");
            }
        };
        Dale.prototype.onLimboSelectionChanged = function (card_id) {
            console.log("onLimboSelectionChanged: " + card_id);
            switch (this.gamedatas.gamestate.name) {
                case null:
                    throw new Error("gamestate.name is null");
            }
        };
        Dale.prototype.onFundsSelectionChanged = function () {
        };
        Dale.prototype.onPurchase = function () {
            var args;
            var funds_card_ids;
            var essential_purchase_ids;
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                    args = this.mainClientState.args;
                    funds_card_ids = this.myHand.orderedSelection.get();
                    essential_purchase_ids = [];
                    break;
                case 'client_essentialPurchase':
                    args = this.mainClientState.args;
                    funds_card_ids = args.funds_card_ids;
                    essential_purchase_ids = this.myHand.orderedSelection.get();
                    break;
                default:
                    throw new Error("You cannot purchase a card from gamestate '".concat(this.gamedatas.gamestate, "'"));
            }
            var card_id;
            if (args.on_market_board) {
                card_id = this.market.getCardId(args.pos);
                console.log(card_id);
            }
            else {
                var card = this.marketDiscard.peek();
                if (!card) {
                    throw new Error("Cannot purchase from the bin, as it is empty");
                }
                card_id = card.id;
                throw new Error("NOT IMPLEMENTED: CT_MARKETDISCOVERY");
            }
            if (this.gamedatas.gamestate.name != 'client_essentialPurchase' && DaleCard_8.DaleCard.containsTypeId(funds_card_ids, DaleCard_8.DaleCard.CT_ESSENTIALPURCHASE)) {
                this.mainClientState.enterClientState('client_essentialPurchase', __assign({ funds_card_ids: funds_card_ids }, args));
            }
            else {
                console.log("PURCHASE!PURCHASE!PURCHASE!PURCHASE!PURCHASE!PURCHASE!PURCHASE!PURCHASE!PURCHASE!PURCHASE!PURCHASE!PURCHASE!");
                if (this.checkAction('actPurchase')) {
                    this.bgaPerformAction('actPurchase', __assign({ funds_card_ids: this.arrayToNumberList(funds_card_ids), market_card_id: card_id, essential_purchase_ids: this.arrayToNumberList(essential_purchase_ids) }, DaleCard_8.DaleCard.getLocalChameleons()));
                }
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
            else if (!card.isChameleon()) {
                this.showMessage(_("This card's ability was already used"), 'error');
            }
            else {
                this.showMessage(_("This chameleon card cannot be played"), 'error');
                card.unbindChameleonLocal();
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
            var card_ids = this.myHand.orderedSelection.get();
            var count_nostalgic_items = 0;
            for (var _i = 0, card_ids_4 = card_ids; _i < card_ids_4.length; _i++) {
                var card_id = card_ids_4[_i];
                var card_2 = new DaleCard_8.DaleCard(card_id);
                if (card_2.effective_type_id == DaleCard_8.DaleCard.CT_NOSTALGICITEM) {
                    count_nostalgic_items++;
                }
            }
            if (count_nostalgic_items > 0) {
                for (var _a = 0, _b = this.myDiscard.orderedSelection.get(); _a < _b.length; _a++) {
                    var card_id = _b[_a];
                    var card_3 = new DaleCard_8.DaleCard(card_id);
                    if (card_3.effective_type_id == DaleCard_8.DaleCard.CT_NOSTALGICITEM) {
                        count_nostalgic_items++;
                    }
                }
            }
            console.log("count_nostalgic_items = " + count_nostalgic_items);
            this.myDiscard.setSelectionMode('multiple', 'build', count_nostalgic_items);
        };
        Dale.prototype.onBuild = function () {
            if (this.checkAction('actBuild')) {
                this.bgaPerformAction('actBuild', __assign({ stack_card_ids: this.arrayToNumberList(this.myHand.orderedSelection.get()), stack_card_ids_from_discard: this.arrayToNumberList(this.myDiscard.orderedSelection.get()) }, DaleCard_8.DaleCard.getLocalChameleons()));
            }
        };
        Dale.prototype.onWinterIsComingSkip = function () {
            if (this.checkAction('actWinterIsComingSkip')) {
                this.bgaPerformAction('actWinterIsComingSkip', {});
            }
        };
        Dale.prototype.onCancel = function () {
            var _a;
            if (DaleCard_8.DaleCard.unbindAllChameleonsLocal()) {
                this.restoreServerGameState();
                (_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.remove();
                this.chameleonArgs = undefined;
            }
            else {
                if (this.checkAction('actCancel')) {
                    this.bgaPerformAction('actCancel', {});
                }
            }
        };
        Dale.prototype.onCancelClient = function () {
            var _a;
            console.log("onCancelClient");
            if (DaleCard_8.DaleCard.unbindAllChameleonsLocal()) {
                (_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.remove();
                this.chameleonArgs = undefined;
                for (var _i = 0, _b = this.allDaleStocks; _i < _b.length; _i++) {
                    var stock = _b[_i];
                    stock.unselectAll();
                }
            }
            else {
                this.mainClientState.exit();
            }
        };
        Dale.prototype.onCancelChameleon = function (unselect) {
            var _a;
            if (unselect === void 0) { unselect = true; }
            console.log("onCancelChameleon");
            console.log(this.chameleonArgs);
            var args = this.chameleonArgs;
            if (unselect) {
                args.from.unselectItem(args.card.id);
            }
            args.card.unbindChameleonLocal();
            this.restoreServerGameState();
            (_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.remove();
            this.chameleonArgs = undefined;
        };
        Dale.prototype.onConfirmChameleon = function (target) {
            var _a, _b;
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
                    (_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.remove();
                    this.chameleonArgs = undefined;
                    this.handleChameleonCard(args.card, args.added, args.from, args.callback, args.requiresPlayable, true);
                }
                else {
                    args.card.bindChameleonLocal(type_id);
                    args.callback(args.card);
                    (_b = this.chameleonArgs) === null || _b === void 0 ? void 0 : _b.remove();
                    this.chameleonArgs = undefined;
                }
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
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                case 'client_technique':
                case 'client_build':
                case 'client_inventory':
                    this.mainClientState.enterClientState('client_build', {
                        stack_index_plus_1: this.myStall.getNumberOfStacks() + 1
                    });
                    break;
            }
        };
        Dale.prototype.onRequestInventoryAction = function () {
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                case 'client_technique':
                case 'client_build':
                case 'client_inventory':
                    this.mainClientState.enterClientState('client_inventory');
                    break;
            }
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
            var card_ids = this.myLimbo.orderedSelection.get();
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
                ['limboToHand', 1000],
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
        Dale.prototype.notif_limboToHand = function (notif) {
            console.log("notif_limboToHand");
            if (notif.args._private) {
                var card_id = +notif.args._private.card.id;
                if ($(this.myLimbo.control_name + '_item_' + card_id)) {
                    console.log(notif.args);
                    this.myHand.addDaleCardToStock(DaleCard_8.DaleCard.of(notif.args._private.card), this.myLimbo.control_name + '_item_' + card_id);
                    this.myLimbo.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    throw new Error("Card ".concat(card_id, " does not exist in myLimbo."));
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
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
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
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
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
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
            this.playerStockToPile(notif.args.card, stock, notif.args.player_id, discardPile);
            this.playerHandSizes[notif.args.player_id].incValue(-1);
        };
        Dale.prototype.notif_discardMultiple = function (notif) {
            var _a;
            var discard_id = (_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id;
            var discardPile = this.playerDiscards[discard_id];
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
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
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
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
            var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
            var discardPile = this.playerDiscards[(_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : this.player_id];
            this.pileToPlayerStock(notif.args.card, discardPile, stock, notif.args.player_id);
            this.playerHandSizes[notif.args.player_id].incValue(1);
        };
        Dale.prototype.notif_discardToHandMultiple = function (notif) {
            var _a;
            console.log("notif_discardToHandMultiple");
            var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
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
            var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
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
            var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
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
        };
        Dale.prototype.notif_unbindChameleon = function (notif) {
            DaleCard_8.DaleCard.unbindChameleonFromServer(+notif.args.card_id);
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
            else if (arg == 'shuffleToDraw' || arg == 'shuffleToDeck') {
                this.marketDiscard.shuffleToDrawPile(this.marketDeck);
            }
            else if (arg == 'shuffle') {
                if (this.marketDeck.size < this.marketDiscard.size) {
                    this.marketDiscard.shuffleToDrawPile(this.marketDeck);
                }
                else {
                    this.marketDeck.shuffleToDrawPile(this.marketDiscard);
                }
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
            else if (arg == 'debugDaleCard') {
                console.log(new DaleCard_8.DaleCard(notif.args.card_id));
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
define("components/types/DbLocationPrefix", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
