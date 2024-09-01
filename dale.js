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
        DaleIcons.getNumberIcon = function (index) {
            return this.getIcon(5, index);
        };
        DaleIcons.ROWS = 6;
        DaleIcons.COLUMNS = 6;
        DaleIcons.ICON_WIDTH = 150;
        DaleIcons.ICON_HEIGHT = 150;
        DaleIcons.BACKGROUND_WIDTH = DaleIcons.ICON_WIDTH * DaleIcons.COLUMNS;
        DaleIcons.BACKGROUND_HEIGHT = DaleIcons.ICON_HEIGHT * DaleIcons.ROWS;
        return DaleIcons;
    }());
    exports.DaleIcons = DaleIcons;
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
                style += "background-size: ".concat(Images.IMAGES_PER_ROW, "00% ").concat(Images.IMAGES_PER_COLUMN, "00%;");
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
            dojo.setStyle(div, 'background-size', "".concat(Images.IMAGES_PER_ROW, "00% ").concat(Images.IMAGES_PER_COLUMN, "00%"));
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
        Images.setCardStyleForDeckSelection = function (div, animalfolk_id) {
            Images.setCardStyle(div, animalfolk_id - 1);
            dojo.setStyle(div, 'background-size', "".concat(Images.DECK_SELECTION_IMAGES_PER_ROW, "00% ").concat(Images.DECK_SELECTION_IMAGES_PER_COLUMN, "00%"));
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
        Images.CARD_WIDTH_S = Math.round(Images.S_SCALE * Images.CARD_WIDTH);
        Images.CARD_HEIGHT_S = Math.round(Images.S_SCALE * Images.CARD_HEIGHT);
        Images.SHEET_WIDTH_S = Images.CARD_WIDTH_S * Images.IMAGES_PER_ROW;
        Images.SHEET_HEIGHT_S = Images.CARD_HEIGHT_S * Images.IMAGES_PER_COLUMN;
        Images.MARKET_PADDING_TOP_S = Images.S_SCALE * Images.MARKET_PADDING_TOP;
        Images.MARKET_PADDING_BOTTOM_S = Images.S_SCALE * Images.MARKET_PADDING_BOTTOM;
        Images.MARKET_PADDING_LEFT_S = Images.S_SCALE * Images.MARKET_PADDING_LEFT;
        Images.MARKET_PADDING_RIGHT_S = Images.S_SCALE * Images.MARKET_PADDING_RIGHT;
        Images.MARKET_ITEM_MARGIN_S = Images.S_SCALE * Images.MARKET_ITEM_MARGIN;
        Images.MARKET_WIDTH_S = Images.S_SCALE * Images.MARKET_WIDTH;
        Images.MARKET_HEIGHT_S = Images.S_SCALE * Images.MARKET_HEIGHT;
        Images.VERTICAL_STACK_OFFSET_S = Images.S_SCALE * Images.VERTICAL_STACK_OFFSET;
        Images.DECK_SELECTION_IMAGES_PER_ROW = 6;
        Images.DECK_SELECTION_IMAGES_PER_COLUMN = 5;
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
    exports.DbEffect = void 0;
    var DbEffect = (function () {
        function DbEffect(effect) {
            this.effect_id = +effect.effect_id;
            this.effect_class = +effect.effect_class;
            this.card_id = +effect.card_id;
            this.type_id = +effect.type_id;
            this.arg = (effect.arg == null || effect.arg == "NULL") ? null : +effect.arg;
            this.chameleon_target_id = (effect.chameleon_target_id == null || effect.chameleon_target_id == "NULL") ? null : +effect.chameleon_target_id;
        }
        return DbEffect;
    }());
    exports.DbEffect = DbEffect;
});
define("components/types/ChameleonChain", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChameleonChain = void 0;
    var ChameleonChain = (function () {
        function ChameleonChain(card_id, type_id) {
            this.card_ids = [];
            this.type_ids = [];
            if (card_id !== undefined && type_id !== undefined) {
                this.push(card_id, type_id);
            }
        }
        Object.defineProperty(ChameleonChain.prototype, "card_id", {
            get: function () {
                return this.card_ids[this.card_ids.length - 1];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ChameleonChain.prototype, "type_id", {
            get: function () {
                return this.type_ids[this.type_ids.length - 1];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ChameleonChain.prototype, "length", {
            get: function () {
                return this.card_ids.length;
            },
            enumerable: false,
            configurable: true
        });
        ChameleonChain.prototype.push = function (card_id, type_id) {
            this.card_ids.push(card_id);
            this.type_ids.push(type_id);
        };
        ChameleonChain.prototype.containsCardId = function (card_id) {
            return this.card_ids.includes(card_id);
        };
        ChameleonChain.prototype.expireTargetId = function (chameleon_target_id) {
            for (var i = 0; i < this.type_ids.length; i++) {
                if (this.card_ids[i] == chameleon_target_id) {
                    this.card_ids.length = i;
                    this.type_ids.length = i;
                    break;
                }
            }
        };
        ChameleonChain.concat = function () {
            var chains = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                chains[_i] = arguments[_i];
            }
            var newChain = new ChameleonChain();
            for (var _a = 0, chains_1 = chains; _a < chains_1.length; _a++) {
                var chain = chains_1[_a];
                if (chain) {
                    for (var i = 0; i < chain.type_ids.length; i++) {
                        newChain.push(chain.card_ids[i], chain.type_ids[i]);
                    }
                }
            }
            return newChain;
        };
        return ChameleonChain;
    }());
    exports.ChameleonChain = ChameleonChain;
});
define("components/DaleCard", ["require", "exports", "components/DaleIcons", "components/Images", "components/types/ChameleonChain"], function (require, exports, DaleIcons_1, Images_1, ChameleonChain_1) {
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
                throw new Error("The type_id of card_id ".concat(id, " is unknown. Therefore, a card with id ").concat(id, " cannot be instantiated."));
            }
        }
        DaleCard.init = function (page, cardTypes) {
            if (DaleCard.cardTypes) {
                throw new Error("Card types are only be initialized once");
            }
            DaleCard.cardTypes = Object.values(cardTypes);
            DaleCard.page = page;
        };
        DaleCard.addEffect = function (effect) {
            console.log("addEffect");
            console.log(effect);
            DaleCard.effects.push(effect);
            if (effect.chameleon_target_id != null) {
                var target_card_id = effect.chameleon_target_id;
                var target_type_id = effect.arg;
                var chain = DaleCard.cardIdToChameleonChain.get(effect.card_id);
                if (chain) {
                    chain.push(target_card_id, target_type_id);
                }
                else {
                    chain = new ChameleonChain_1.ChameleonChain(target_card_id, target_type_id);
                    DaleCard.cardIdToChameleonChain.set(effect.card_id, chain);
                    if (DaleCard.cardIdToChameleonChainLocal.delete(effect.card_id)) {
                        return;
                    }
                }
            }
            if (effect.effect_class == DaleCard.EC_GLOBAL) {
                for (var _i = 0, _a = Array.from(DaleCard.divs.keys()); _i < _a.length; _i++) {
                    var card_id = _a[_i];
                    DaleCard.updateHTML(card_id);
                }
            }
            else {
                DaleCard.updateHTML(effect.card_id);
            }
        };
        DaleCard.expireEffects = function (effects) {
            var includes_global_effect = false;
            var affected_card_ids = new Set();
            var _loop_1 = function (effect) {
                var index = DaleCard.effects.findIndex(function (e) { return e.effect_id == effect.effect_id; });
                if (index == -1) {
                    console.log("Known effects:");
                    console.log(DaleCard.effects);
                    console.log("Expired effect:");
                    console.log(effect);
                    throw new Error("Attempted to remove a non-existing effect");
                }
                if (effect.effect_class == DaleCard.EC_GLOBAL) {
                    includes_global_effect = true;
                }
                affected_card_ids.add(DaleCard.effects[index].card_id);
                DaleCard.effects.splice(index, 1);
                if (effect.chameleon_target_id != null) {
                    var chain = DaleCard.cardIdToChameleonChain.get(effect.card_id);
                    if (chain) {
                        chain.expireTargetId(effect.chameleon_target_id);
                        if (chain.length == 0) {
                            DaleCard.cardIdToChameleonChain.delete(effect.card_id);
                        }
                    }
                }
            };
            for (var _i = 0, effects_1 = effects; _i < effects_1.length; _i++) {
                var effect = effects_1[_i];
                _loop_1(effect);
            }
            affected_card_ids = includes_global_effect ? Array.from(DaleCard.divs.keys()) : affected_card_ids;
            affected_card_ids.forEach(function (card_id) {
                DaleCard.updateHTML(card_id);
            });
        };
        DaleCard.prototype.isPassiveUsed = function () {
            console.log("isPassiveUsed");
            var type_id = this.effective_type_id;
            if (!DaleCard.cardTypes[type_id].has_ability) {
                return true;
            }
            for (var _i = 0, _a = DaleCard.effects; _i < _a.length; _i++) {
                var effect = _a[_i];
                if (effect.card_id == this.id && effect.type_id == type_id && effect.chameleon_target_id == null) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperty(DaleCard.prototype, "effective_type_id", {
            get: function () {
                var _a, _b, _c, _d;
                return (_d = (_b = (_a = DaleCard.cardIdToChameleonChainLocal.get(this.id)) === null || _a === void 0 ? void 0 : _a.type_id) !== null && _b !== void 0 ? _b : (_c = DaleCard.cardIdToChameleonChain.get(this.id)) === null || _c === void 0 ? void 0 : _c.type_id) !== null && _d !== void 0 ? _d : this.original_type_id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "effective_value", {
            get: function () {
                var value = this.original_value;
                for (var _i = 0, _a = DaleCard.effects; _i < _a.length; _i++) {
                    var effect = _a[_i];
                    if (effect.card_id == this.id || effect.effect_class == DaleCard.EC_GLOBAL) {
                        switch (effect.type_id) {
                            case DaleCard.CT_FLASHYSHOW:
                                value += 1;
                        }
                    }
                }
                return value;
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
            return DaleCard.cardIdToChameleonChainLocal.has(this.id) || DaleCard.cardIdToChameleonChain.has(this.id);
        };
        DaleCard.prototype.isUnboundChameleon = function () {
            return !this.isBoundChameleon() && this.isChameleon();
        };
        DaleCard.prototype.bindChameleonLocal = function (chain) {
            DaleCard.cardIdToChameleonChainLocal.delete(this.id);
            DaleCard.cardIdToChameleonChainLocal.set(this.id, chain);
            DaleCard.updateHTML(this.id);
        };
        DaleCard.prototype.unbindChameleonLocal = function () {
            DaleCard.cardIdToChameleonChainLocal.delete(this.id);
            DaleCard.updateHTML(this.id);
        };
        DaleCard.unbindAllChameleonsLocal = function () {
            var card_ids = Array.from(DaleCard.cardIdToChameleonChainLocal.keys());
            DaleCard.cardIdToChameleonChainLocal.clear();
            for (var _i = 0, card_ids_1 = card_ids; _i < card_ids_1.length; _i++) {
                var card_id = card_ids_1[_i];
                DaleCard.updateHTML(card_id);
            }
            return card_ids.length;
        };
        DaleCard.countChameleonsLocal = function () {
            console.log("countChameleonsLocal");
            console.log(DaleCard.cardIdToChameleonChainLocal);
            return DaleCard.cardIdToChameleonChainLocal.size;
        };
        DaleCard.getLocalChameleonsJSON = function () {
            console.log(this.cardIdToChameleonChain);
            console.log(this.cardIdToChameleonChainLocal);
            var array = Array.from(this.cardIdToChameleonChainLocal.entries()).map(function (_a) {
                var card_id = _a[0], target = _a[1];
                return ({
                    card_id: card_id,
                    chameleon_target_ids: target.card_ids,
                    target_type_ids: target.type_ids
                });
            });
            return JSON.stringify(array);
        };
        DaleCard.unbindAllChameleons = function () {
            this.unbindAllChameleonsLocal();
            var card_ids = Array.from(DaleCard.cardIdToChameleonChain.keys());
            DaleCard.cardIdToChameleonChain.clear();
            for (var _i = 0, card_ids_2 = card_ids; _i < card_ids_2.length; _i++) {
                var card_id = card_ids_2[_i];
                DaleCard.updateHTML(card_id);
            }
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
        Object.defineProperty(DaleCard.prototype, "original_value", {
            get: function () {
                return DaleCard.cardTypes[this.effective_type_id].value;
            },
            enumerable: false,
            configurable: true
        });
        DaleCard.prototype.getCost = function (pos) {
            return this.original_value + pos;
        };
        Object.defineProperty(DaleCard.prototype, "animalfolk", {
            get: function () {
                return DaleCard.cardTypes[this.effective_type_id].animalfolk_displayed;
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
        DaleCard.prototype.isCardBack = function () {
            return this.original_type_id == 0;
        };
        DaleCard.prototype.isJunk = function () {
            return (this.original_type_id >= 1 && this.original_type_id <= 5);
        };
        DaleCard.prototype.isEffectiveJunk = function () {
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
        DaleCard.prototype.getTooltipContent = function () {
            var cardType = DaleCard.cardTypes[this.effective_type_id];
            var animalfolkWithBull = cardType.animalfolk_displayed ? " • " + cardType.animalfolk_displayed : "";
            var chameleonName = "";
            var reminderText = "";
            if (this.isBoundChameleon()) {
                var type_ids = [this.original_type_id];
                var chain = ChameleonChain_1.ChameleonChain.concat(DaleCard.cardIdToChameleonChain.get(this.id), DaleCard.cardIdToChameleonChainLocal.get(this.id));
                for (var i = 0; i < chain.length - 1; i++) {
                    type_ids.push(chain.type_ids[i]);
                }
                for (var _i = 0, type_ids_1 = type_ids; _i < type_ids_1.length; _i++) {
                    var type_id = type_ids_1[_i];
                    chameleonName += "<span class=chameleon-name>".concat(DaleCard.cardTypes[type_id].name, "</span><br>");
                }
            }
            if (this.isChameleon()) {
                reminderText += _("<br><br>A passive chameleon card <strong>you use</strong> is an identical copy of one valid card for all purposes of play. If there is a valid card, you <strong>must</strong> copy it before using the chameleon card.");
            }
            var effective_value = this.effective_value;
            if (effective_value != cardType.value) {
                effective_value = "<span class=dale-original-value>".concat(cardType.value, "</span> ").concat(effective_value);
            }
            return "<div class=\"dale-card-tooltip\">\n            <h3>".concat(chameleonName).concat(cardType.name, "</h3>\n            <hr>\n            ").concat(effective_value).concat(animalfolkWithBull, " \u2022 ").concat(cardType.type_displayed, " ").concat(cardType.has_plus ? "(+)" : "", "\n            <br><br>\n            <div class=\"text\">").concat(cardType.text).concat(reminderText, "</div>\n            <br style=\"line-height: 10px\" />\n        </div>");
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
                    old_overlay.remove();
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
            }
        };
        DaleCard.prototype.updateEffectiveValue = function (card_div) {
            var _a, _b, _c;
            var value = this.original_value;
            if (((_a = DaleCard.page) === null || _a === void 0 ? void 0 : _a.isCurrentPlayerActive()) && card_div.dataset['value'] == 'effective') {
                value = this.effective_value;
            }
            if (value == this.original_value) {
                (_b = card_div.querySelector(".dale-effective-value")) === null || _b === void 0 ? void 0 : _b.remove();
            }
            else {
                var value_div = (_c = card_div.querySelector(".dale-effective-value")) !== null && _c !== void 0 ? _c : document.createElement('div');
                value_div.classList.add("dale-effective-value");
                value_div.innerHTML = String(value);
                card_div.append(value_div);
            }
        };
        DaleCard.updateHTML = function (card_id) {
            if (DaleCard.divs.has(card_id)) {
                new DaleCard(card_id).updateHTML(undefined, true);
            }
        };
        DaleCard.prototype.updateHTML = function (temp_div, fade) {
            if (fade === void 0) { fade = false; }
            var div = temp_div !== null && temp_div !== void 0 ? temp_div : DaleCard.divs.get(this.id);
            this.updateChameleonOverlay(div, fade);
            if (!temp_div && div) {
                this.addTooltip(div);
            }
            if (div) {
                this.updateEffectiveValue(div);
            }
        };
        DaleCard.prototype.toDiv = function (parent_id, dataValue) {
            var _a;
            var div = document.createElement("div");
            div.classList.add("dale-card");
            div.id = "dale-card-" + this.id;
            Images_1.Images.setCardStyle(div, this.original_type_id);
            if (dataValue) {
                div.dataset['value'] = dataValue;
            }
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
        DaleCard.cardIdToChameleonChain = new Map();
        DaleCard.cardIdToChameleonChainLocal = new Map();
        DaleCard.tooltips = new Map();
        DaleCard.divs = new Map();
        DaleCard.effects = [];
        DaleCard.EC_GLOBAL = 0;
        DaleCard.EC_MODIFICATION = 1;
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
        OrderedSelection.prototype.onSelect = function (card_id, secondary) {
            console.log("onSelect(card_id=".concat(card_id, ", secondary=").concat(secondary, ")"));
        };
        OrderedSelection.prototype.onUnselect = function (card_id, secondary) {
            console.log("onUnselect(card_id=".concat(card_id, ", secondary=").concat(secondary, ")"));
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
                case 'numbers':
                    icon = DaleIcons_2.DaleIcons.getNumberIcon(Math.min(index, 4));
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
                this.pop(secondary);
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
            if (card_id === undefined) {
                return null;
            }
            this.unselectItem(card_id, secondary);
            return card_id;
        };
        OrderedSelection.prototype.pop = function (secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            var card_id = card_ids[card_ids.length - 1];
            if (card_id === undefined) {
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
            while (card_ids.length >= maxSize) {
                this.pop(secondary);
            }
            card_ids.push(card_id);
            this.addIcon(card_id, card_ids.length - 1, secondary);
            this.onSelect(card_id, secondary);
        };
        OrderedSelection.prototype.unselectItem = function (card_id, secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            var index = card_ids.indexOf(card_id);
            if (index != -1) {
                card_ids.splice(index, 1);
                this.removeIcon(card_id, secondary);
                this.onUnselect(card_id, secondary);
            }
        };
        OrderedSelection.prototype.unselectAll = function (secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            while (card_ids.length > 0) {
                this.unselectItem(card_ids[card_ids.length - 1], secondary);
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
        OrderedSelection.prototype.secondaryToPrimary = function () {
            this.unselectAll();
            this.iconType = this.secondaryIconType;
            this.maxSize = this.secondaryMaxSize;
            for (var _i = 0, _a = this.secondary_card_ids.slice(); _i < _a.length; _i++) {
                var card_id = _a[_i];
                this.unselectItem(card_id, true);
                this.selectItem(card_id);
            }
        };
        return OrderedSelection;
    }());
    exports.OrderedSelection = OrderedSelection;
});
define("components/types/DaleWrapClass", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DALE_WRAP_CLASSES = void 0;
    exports.DALE_WRAP_CLASSES = ['dale-wrap-technique', 'dale-wrap-purchase', 'dale-wrap-build', 'dale-wrap-discard', 'dale-wrap-default'];
});
define("components/DaleStock", ["require", "exports", "ebg/stock", "components/DaleCard", "components/Images", "components/OrderedSelection", "components/types/DaleWrapClass", "ebg/stock"], function (require, exports, Stock, DaleCard_2, Images_2, OrderedSelection_1, DaleWrapClass_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleStock = void 0;
    var DaleStock = (function (_super) {
        __extends(DaleStock, _super);
        function DaleStock() {
            var _this = _super.call(this) || this;
            _this.wrap = undefined;
            _this.actionLabel = undefined;
            _this.actionLabelDefaultText = "<DefaultText>";
            _this.selectionMode = 'none';
            _this.duration = 500;
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
        DaleStock.prototype.unselectAll = function (secondary) {
            this.orderedSelection.unselectAll(secondary);
        };
        DaleStock.prototype.setSelectionMode = function (mode, iconType, wrapClass, actionLabelText, secondaryIconType) {
            this.selectionMode = mode;
            this.orderedSelection.setIconType(iconType, secondaryIconType);
            this.setSelectionMaxSize();
            this.unselectAll(true);
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
                case 'noneRetainSelection':
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
                    return card.isEffectiveJunk() && this.orderedSelection.get(true).includes(card.id);
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
                (_a = this.wrap.classList).remove.apply(_a, DaleWrapClass_1.DALE_WRAP_CLASSES);
                if (wrapClass) {
                    this.wrap.classList.add(wrapClass);
                }
            }
        };
        DaleStock.prototype.addDaleCardToStock = function (card, from) {
            this.addToStockWithId(card.original_type_id, card.id, from);
            this.setClickable(card.id);
            var stockitem_div = $(this.control_name + '_item_' + card.id);
            stockitem_div.dataset['value'] = 'effective';
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
define("components/types/ChameleonTree", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/types/ChameleonArgs", ["require", "exports", "components/DaleCard", "components/types/ChameleonChain"], function (require, exports, DaleCard_3, ChameleonChain_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChameleonArgs = void 0;
    var ChameleonArgs = (function () {
        function ChameleonArgs(tree, pile) {
            this.firstSource = tree.card;
            this.currentSource = tree.card;
            this.chain = new ChameleonChain_2.ChameleonChain();
            this.tree = tree;
            this.pile = pile;
        }
        Object.defineProperty(ChameleonArgs.prototype, "currentTargets", {
            get: function () {
                return this.tree.children.map(function (child) { return child.card; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ChameleonArgs.prototype, "onlyContainsGoodOldTimes", {
            get: function () {
                if (this._onlyContainsGoodOldTimes === undefined) {
                    throw new Error("'_onlyContainsGoodOldTimes' was not setup");
                }
                return this._onlyContainsGoodOldTimes;
            },
            enumerable: false,
            configurable: true
        });
        ChameleonArgs.prototype.pickTarget = function (target) {
            console.log("pickTarget");
            for (var _i = 0, _a = this.tree.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (target.id == child.card.id) {
                    this.chain.push(target.id, target.effective_type_id);
                    this.tree = child;
                    this.firstSource.bindChameleonLocal(this.chain);
                    this.currentSource = target;
                    return;
                }
            }
            throw new Error("Card ".concat(target.id, " is not a valid chameleon target"));
        };
        ChameleonArgs.prototype.getAllTargets = function (tree) {
            tree = tree !== null && tree !== void 0 ? tree : this.tree;
            var validTargets = new Set();
            if (!tree.card.isChameleon()) {
                validTargets.add(tree.card);
                return validTargets;
            }
            for (var i = 0; i < tree.children.length; i++) {
                var child = tree.children[i];
                var childValidTargets = this.getAllTargets(child);
                if (childValidTargets.size > 0 || (child === null || child === void 0 ? void 0 : child.card.effective_type_id) == DaleCard_3.DaleCard.CT_GOODOLDTIMES) {
                    validTargets = validTargets.union(childValidTargets);
                }
                else {
                    tree.children.splice(i, 1);
                    i--;
                }
            }
            if (tree === this.tree) {
                this._onlyContainsGoodOldTimes = true;
                for (var _i = 0, _a = Array.from(validTargets); _i < _a.length; _i++) {
                    var target = _a[_i];
                    if (!target.isCardBack() && target.effective_type_id != DaleCard_3.DaleCard.CT_GOODOLDTIMES) {
                        this._onlyContainsGoodOldTimes = false;
                        break;
                    }
                }
            }
            return validTargets;
        };
        return ChameleonArgs;
    }());
    exports.ChameleonArgs = ChameleonArgs;
});
define("components/Pile", ["require", "exports", "components/Images", "components/DaleCard", "components/OrderedSelection", "components/types/DaleWrapClass"], function (require, exports, Images_3, DaleCard_4, OrderedSelection_2, DaleWrapClass_2) {
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
            this.wrapClass = "dale-wrap-default";
            page.allPiles.push(this);
            this.pile_container_id = pile_container_id;
            this.pile_name = pile_name;
            this.player_id = player_id;
            $(pile_container_id).innerHTML = "\n            ".concat(pile_name ? "<h3 class=\"dale-component-name\">".concat(pile_name, "</h3>") : "", "\n            <div class=\"pile\" style=\"").concat(Images_3.Images.getCardStyle(), "\">\n                <div class=\"dale-card\"></div>\n                <div class=\"dale-pile-size\"></div>\n                <div class=\"dale-pile-size dale-pile-selected-size\" style=\"top: 16%;\"></div>\n            </div>\n        ");
            this.page = page;
            this.containerHTML = $(pile_container_id);
            this.placeholderHTML = Images_3.Images.getPlaceholder();
            var sizeElements = this.containerHTML.querySelectorAll('.dale-pile-size');
            this.sizeHTML = sizeElements[0];
            this.selectedSizeHTML = sizeElements[1];
            this.cards = [];
            this._slidingCards = [];
            this.orderedSelection = new OrderedSelection_2.OrderedSelection();
            (_a = this.containerHTML.querySelector(".pile")) === null || _a === void 0 ? void 0 : _a.prepend(this.placeholderHTML);
            this.updateHTML();
            dojo.connect(this.orderedSelection, 'onSelect', this, 'onSelectPileCard');
            dojo.connect(this.orderedSelection, 'onUnselect', this, 'onUnselectPileCard');
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
            if (!this.isPopinOpen && this.previousTopCard != topCard) {
                (_a = this.topCardHTML) === null || _a === void 0 ? void 0 : _a.remove();
                if (topCard !== undefined) {
                    var dataValue = this.player_id == this.page.player_id ? 'effective' : undefined;
                    this.topCardHTML = topCard.toDiv(this.placeholderHTML, dataValue);
                    this.topCardHTML.classList.add("dale-clickable");
                    dojo.connect(this.topCardHTML, 'onclick', this, "onClickTopCard");
                }
                this.previousTopCard = topCard;
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
                this.cards.push(new DaleCard_4.DaleCard(0, 0));
            }
            this.updateHTML();
        };
        Pile.prototype.push = function (card, from, onEnd, duration, delay) {
            this.cards.push(card);
            if (from) {
                this._slidingCards.push(card);
                var slidingElement = card.toDiv(this.placeholderHTML);
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
        Pile.prototype.shuffleToDrawPile = function (drawPile, duration, maxAmount) {
            if (duration === void 0) { duration = 1000; }
            if (maxAmount === void 0) { maxAmount = Infinity; }
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
                maxAmount -= 1;
                if (thiz.cards.length > 0 && maxAmount > 0) {
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
            var _a, _b, _c, _d;
            (_a = this.peek()) === null || _a === void 0 ? void 0 : _a.detachDiv();
            var player = this.player_id ? this.page.gamedatas.players[this.player_id] : undefined;
            var title = "";
            if (player) {
                if (this.player_id == this.page.player_id) {
                    title = "<span style=\"font-weight:bold;color:#".concat(player.color, "\">Your</span> ");
                }
                else {
                    title = "<span style=\"font-weight:bold;color:#".concat(player.color, "\">").concat(player.name, "</span>'s ");
                }
                title += (_c = (_b = this.pile_name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : "unnamed pile";
            }
            else {
                title += (_d = this.pile_name) !== null && _d !== void 0 ? _d : "Unnamed pile";
            }
            var popin_id = this.pile_container_id + '-popin';
            this.popin.create(popin_id);
            this.popin.setTitle(title);
            this.popin.setMaxWidth(1000);
            this.popin.setContent("<div id=\"".concat(popin_id, "-card-container\" class=\"popin-card-container ").concat(this.wrapClass, "\"></div>"));
            var container_id = popin_id + "-card-container";
            var _loop_2 = function (card) {
                var div = card.toDiv(container_id, 'effective');
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
            for (var _i = 0, _e = this.cards; _i < _e.length; _i++) {
                var card = _e[_i];
                _loop_2(card);
            }
            dojo.connect($("popin_" + this.popin.id + "_close"), "onclick", this, "onClosePopin");
            this.isPopinOpen = true;
            this.popin.show();
            this.orderedSelection.updateIcons();
        };
        Pile.prototype.onClickTopCard = function () {
            if (this.selectionMode == 'top') {
                this.page.onSelectPileCard(this, this.peek().id);
                return;
            }
            if (this.selectionMode == 'noneCantViewContent') {
                return;
            }
            this.openPopin();
        };
        Pile.prototype.onUnselectPileCard = function (card_id) {
            this.page.onUnselectPileCard(this, card_id);
        };
        Pile.prototype.onSelectPileCard = function (card_id) {
            this.page.onSelectPileCard(this, card_id);
        };
        Pile.prototype.onClickCard = function (card, div) {
            console.log("Clicked on a card in the popin");
            var chameleonArgs = this.page.chameleonArgs;
            if (chameleonArgs) {
                this.page.showMessage(_("Please select a valid target for ") + "'".concat(chameleonArgs.currentSource.name, "'"), "error");
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
        Pile.prototype.unselectTopCard = function () {
            var _a;
            (_a = this.containerHTML) === null || _a === void 0 ? void 0 : _a.classList.remove("dale-selected");
        };
        Pile.prototype.selectTopCard = function () {
            var _a;
            (_a = this.containerHTML) === null || _a === void 0 ? void 0 : _a.classList.add("dale-selected");
        };
        Pile.prototype.setWrapClass = function (wrapClass) {
            var _a;
            if (wrapClass === void 0) { wrapClass = 'dale-wrap-default'; }
            if (wrapClass != 'previous') {
                (_a = this.containerHTML.classList).remove.apply(_a, DaleWrapClass_2.DALE_WRAP_CLASSES);
                if (wrapClass) {
                    this.containerHTML.classList.add(wrapClass);
                }
                this.wrapClass = wrapClass;
            }
        };
        Pile.prototype.setSelectionMode = function (mode, iconType, wrapClass, max) {
            if (wrapClass === void 0) { wrapClass = 'dale-wrap-default'; }
            if (max === void 0) { max = 0; }
            this.setWrapClass(wrapClass);
            this.orderedSelection.setMaxSize(max);
            this.orderedSelection.setIconType(iconType);
            this.selectionMode = mode;
            switch (mode) {
                case 'noneCantViewContent':
                    return;
                case 'multiple':
                    if (this.orderedSelection.getSize() < this.orderedSelection.getMaxSize()) {
                        this.containerHTML.classList.add("dale-blinking");
                    }
                    else {
                        this.containerHTML.classList.remove("dale-blinking");
                    }
                    break;
                case 'single':
                    this.containerHTML.classList.add("dale-blinking");
                    break;
                default:
                    this.containerHTML.classList.remove("dale-blinking");
                    this.orderedSelection.unselectAll();
                    break;
            }
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
        return Pile;
    }());
    exports.Pile = Pile;
});
define("components/HiddenPile", ["require", "exports", "components/DaleCard", "components/Pile"], function (require, exports, DaleCard_5, Pile_1) {
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
        HiddenPile.prototype.openPopin = function () {
            this.page.showMessage(_("This deck contains ") + this.size + _(" cards"), 'info');
        };
        return HiddenPile;
    }(Pile_1.Pile));
    exports.HiddenPile = HiddenPile;
});
define("components/CardSlot", ["require", "exports"], function (require, exports) {
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
        CardSlot.prototype.swapWithStock = function (stock, new_card) {
            if (!this.hasCard()) {
                throw new Error("'swapWithStock' called on an empty slot");
            }
            if (!stock.getItemById(new_card.id)) {
                throw new Error("'swapWithStock' called with a card that is not in '".concat(stock.control_name, "' (card_id = ").concat(new_card.id, ")"));
            }
            var div = $(stock.control_name + "_item_" + new_card.id);
            stock.addDaleCardToStock(this._card, this._container);
            this.insertCard(new_card, div);
            stock.removeFromStockByIdNoAnimation(new_card.id);
        };
        CardSlot.prototype.swapWithOverallPlayerBoard = function (player_id, new_card) {
            if (!this.hasCard()) {
                throw new Error("'swapWithOverallPlayerBoard' called on an empty slot");
            }
            var player_board = $('overall_player_board_' + player_id);
            this.removeCard(player_board);
            this.insertCard(new_card, player_board);
        };
        CardSlot.UNIQUE_ID = 0;
        return CardSlot;
    }());
    exports.CardSlot = CardSlot;
});
define("components/MarketBoard", ["require", "exports", "components/Images", "components/CardSlot", "components/OrderedSelection", "components/types/DaleWrapClass"], function (require, exports, Images_4, CardSlot_1, OrderedSelection_3, DaleWrapClass_3) {
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
            this.slots[pos].card_div.dataset['value'] = 'market';
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
        MarketBoard.prototype.setWrapClass = function (wrapClass) {
            var _a;
            if (wrapClass === void 0) { wrapClass = 'dale-wrap-default'; }
            if (wrapClass != 'previous') {
                (_a = this.container.classList).remove.apply(_a, DaleWrapClass_3.DALE_WRAP_CLASSES);
                if (wrapClass) {
                    this.container.classList.add(wrapClass);
                }
            }
        };
        MarketBoard.prototype.setSelectionMode = function (mode, iconType, wrapClass) {
            if (wrapClass === void 0) { wrapClass = "dale-wrap-default"; }
            this.orderedSelection.setIconType(iconType);
            if (this.selectionMode == mode)
                return;
            this.setWrapClass(wrapClass);
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
        MarketBoard.prototype.swapWithStock = function (card_id, stock, new_card) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var slot = _b[_i];
                if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                    slot.swapWithStock(stock, new_card);
                }
            }
        };
        MarketBoard.prototype.swapWithOverallPlayerBoard = function (card_id, player_id, new_card) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var slot = _b[_i];
                if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                    slot.swapWithOverallPlayerBoard(player_id, new_card);
                }
            }
        };
        MarketBoard.prototype.contains = function (card) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var slot = _b[_i];
                if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card.id) {
                    return true;
                }
            }
            return false;
        };
        return MarketBoard;
    }());
    exports.MarketBoard = MarketBoard;
});
define("components/Stall", ["require", "exports", "components/DaleCard", "components/Images", "components/CardSlot", "components/DaleIcons"], function (require, exports, DaleCard_6, Images_5, CardSlot_2, DaleIcons_3) {
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
            dojo.setStyle(this.container.parentElement, 'max-width', Images_5.Images.CARD_WIDTH_S * (1 + Images_5.Images.STACK_MAX_MARGIN_X) * Stall.MAX_STACKS + 'px');
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
                    prevStackContainer.setAttribute('style', "max-width: ".concat(Images_5.Images.CARD_WIDTH_S * (1 + Images_5.Images.STACK_MAX_MARGIN_X), "px;"));
                }
                var stackContainer = document.createElement("div");
                stackContainer.classList.add("stack-container");
                stackContainer.setAttribute('style', "min-width: ".concat(Images_5.Images.CARD_WIDTH_S, "px;"));
                var placeholder = Images_5.Images.getPlaceholder();
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
                var y_offset = Images_5.Images.VERTICAL_STACK_OFFSET_S * (maxHeight - 1);
                console.log("Update height");
                console.log(stackContainer.getAttribute('style'));
                var prevStyleWithoutHeight = (_a = stackContainer.getAttribute('style')) === null || _a === void 0 ? void 0 : _a.replace(/height:.*px;/, '');
                console.log(prevStyleWithoutHeight);
                stackContainer.setAttribute('style', prevStyleWithoutHeight + "height: ".concat(Images_5.Images.CARD_HEIGHT_S + y_offset, "px;"));
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
        Stall.prototype.swapWithStock = function (card_id, stock, new_card) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var stack = _b[_i];
                for (var _c = 0, stack_6 = stack; _c < stack_6.length; _c++) {
                    var slot = stack_6[_c];
                    if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                        slot.swapWithStock(stock, new_card);
                    }
                }
            }
        };
        Stall.prototype.swapWithOverallPlayerBoard = function (card_id, player_id, new_card) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var stack = _b[_i];
                for (var _c = 0, stack_7 = stack; _c < stack_7.length; _c++) {
                    var slot = stack_7[_c];
                    if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                        slot.swapWithOverallPlayerBoard(player_id, new_card);
                    }
                }
            }
        };
        Stall.prototype.contains = function (card) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var stack = _b[_i];
                for (var _c = 0, stack_8 = stack; _c < stack_8.length; _c++) {
                    var slot = stack_8[_c];
                    if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card.id) {
                        return true;
                    }
                }
            }
            return false;
        };
        Stall.prototype.onResize = function () {
            if (this.container.getBoundingClientRect().width < (1 + Images_5.Images.STACK_MIN_MARGIN_X) * Images_5.Images.CARD_WIDTH_S * Stall.MAX_STACKS) {
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
define("components/types/MainClientState", ["require", "exports", "components/DaleCard"], function (require, exports, DaleCard_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainClientState = void 0;
    var ServerState = (function () {
        function ServerState() {
        }
        return ServerState;
    }());
    var PreviousState = (function () {
        function PreviousState(name, args) {
            this.name = name;
            this.args = args;
        }
        return PreviousState;
    }());
    var MainClientState = (function () {
        function MainClientState(page) {
            this._page = page;
            this._name = 'client_technique';
            this._args = {};
            this._stack = [];
            this.leaveThis = this.leave.bind(this);
        }
        Object.defineProperty(MainClientState.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MainClientState.prototype, "args", {
            get: function () {
                return this._args;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MainClientState.prototype, "_descriptionmyturn", {
            get: function () {
                switch (this._name) {
                    case 'client_technique':
                        return _("${you} must play a technique, purchase, build, or");
                    case 'client_purchase':
                        return _("${you} must pay ${cost} for ${card_name}");
                    case 'client_build':
                        return _("${you} must select cards to build in stack ${stack_index_plus_1}");
                    case 'client_inventory':
                        return _("${you} must select any number of cards to discard");
                    case 'client_essentialPurchase':
                        return _("${you} may <stronger>ditch</stronger> up to 3 selected junk cards");
                    case 'chameleon_flexibleShopkeeper':
                        return _("Flexible Shopkeeper: ${you} must copy a card from your rightmost stack");
                    case 'chameleon_reflection':
                        return _("Reflection: ${you} must copy a card from the top of another player's discard pile");
                    case 'chameleon_goodoldtimes':
                        switch (this._args.mode) {
                            case 'copy':
                                return _("Good Old Times: ${you} must copy the bin's top card");
                            case 'ditchOrCopy':
                                return _("Good Old Times: ${you} must copy the bin's top card or ditch the supply's top card");
                            case 'ditchOptional':
                                return _("Good Old Times: ${you} may ditch the supply's top card");
                            case 'ditchMandatory':
                                return _("Good Old Times: ${you} must ditch the supply's top card");
                        }
                        break;
                    case 'chameleon_trendsetting':
                        return _("Trendsetting: ${you} must copy a card in the market");
                    case 'chameleon_seeingdoubles':
                        return _("Seeing Doubles: ${you} must copy another card in your hand");
                    case 'client_choicelessPassiveCard':
                        return _("${card_name}: ${you} may use this card's ability");
                    case 'client_marketDiscovery':
                        return _("${card_name}: ${you} may <strong>ditch</strong> the supply's top card or purchase the bin's top card");
                    case 'client_fizzle':
                        return _("${card_name}: Are you sure you want to play this technique without any effects?");
                    case 'client_choicelessTechniqueCard':
                        return _("${card_name}: ${you} may play this card as a technique");
                    case 'client_swiftBroker':
                        return _("${card_name}: ${you} may choose the order to discard your hand");
                    case 'client_shatteredRelic':
                        return _("${card_name}: ${you} must <stronger>ditch</stronger> a card from your hand");
                    case 'client_acorn':
                        return _("${card_name}: ${you} must select a card from an opponent's stall to swap with");
                    case 'client_giftVoucher':
                        return _("${card_name}: ${you} must select a card from the market to swap with");
                    case 'client_loyalPartner':
                        return _("${card_name}: ${you} may choose the order to <stronger>ditch</stronger> all cards from the market");
                    case 'client_prepaidGood':
                        return _("${card_name}: ${you} must choose a card from the market");
                    case 'client_nuisance':
                        return _("${card_name}: ${you} may choose up to 2 opponents");
                }
                return "MISSING DESCRIPTION";
            },
            enumerable: false,
            configurable: true
        });
        MainClientState.prototype.leave = function () {
            var previous = this._stack.pop();
            if (previous instanceof ServerState) {
                this._page.restoreServerGameState();
            }
            else if (previous instanceof PreviousState) {
                this.enter(previous.name, previous.args);
            }
            else {
                this.enter('client_technique');
            }
        };
        MainClientState.prototype.cancelAll = function () {
            this._stack = [];
            this.enter('client_technique');
        };
        MainClientState.prototype.enter = function (name, args) {
            if (name) {
                this._name = name;
            }
            this.setPassiveSelected(false);
            if (args) {
                if ('technique_card_id' in args) {
                    args = __assign({ card_name: new DaleCard_7.DaleCard(args.technique_card_id).name }, args);
                }
                if ('passive_card_id' in args) {
                    args = __assign({ card_name: new DaleCard_7.DaleCard(args.passive_card_id).name }, args);
                }
                this._args = args !== null && args !== void 0 ? args : {};
            }
            this.setPassiveSelected(true);
            this._page.setClientState(this._name, {
                descriptionmyturn: this._descriptionmyturn,
                args: this._args
            });
        };
        MainClientState.prototype.enterOnStack = function (name, args) {
            if (this._page.checkLock()) {
                if (this._page.gamedatas.gamestate.name == this._name) {
                    this._stack.push(new PreviousState(this._name, this._args));
                }
                else {
                    this._stack.push(new ServerState());
                }
                this.enter(name, args);
            }
        };
        MainClientState.prototype.isStackEmpty = function () {
            return this._stack.length == 0;
        };
        MainClientState.prototype.setPassiveSelected = function (enable) {
            if ('passive_card_id' in this._args) {
                var div = new DaleCard_7.DaleCard(this._args.passive_card_id).div;
                if (div) {
                    if (enable) {
                        div.classList.add("dale-passive-selected");
                        div.addEventListener('click', this.leaveThis);
                    }
                    else {
                        div.classList.remove("dale-passive-selected");
                        div.removeEventListener('click', this.leaveThis);
                    }
                }
            }
        };
        return MainClientState;
    }());
    exports.MainClientState = MainClientState;
});
define("components/TargetingLine", ["require", "exports", "components/Images"], function (require, exports, Images_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TargetingLine = void 0;
    var TargetingLine = (function () {
        function TargetingLine(source, targets, sourceClass, targetClass, lineClass, onSource, onTarget, pile) {
            TargetingLine.targetingLines.push(this);
            this.svg = $("dale-svg-container").querySelector("svg");
            this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            this.line.classList.add(lineClass);
            this.svg.appendChild(this.line);
            this.sourceClass = sourceClass;
            this.targetClass = targetClass;
            var thiz = this;
            var finalSource = source;
            if (pile) {
                this.pile = pile;
                this.pile.closePopin();
                this.cardDiv = source.toDiv();
                this.pile.placeholderHTML.appendChild(this.cardDiv);
            }
            else {
                this.cardDiv = source.div;
            }
            this.cardDiv.classList.add("dale-line-source", this.sourceClass);
            this.onSource = function () {
                thiz.remove();
                onSource(finalSource);
            };
            this.cardDiv.addEventListener("click", this.onSource);
            this.targetDivs = [];
            this.onTargets = [];
            var _loop_3 = function (targetCard) {
                targetCard.div.classList.add("dale-line-target", this_2.targetClass);
                this_2.targetDivs.push(targetCard.div);
                var finalTarget = targetCard;
                var finalOnTarget = function () {
                    thiz.remove();
                    onTarget(finalSource, finalTarget);
                };
                this_2.onTargets.push(finalOnTarget);
                targetCard.div.addEventListener("click", finalOnTarget);
            };
            var this_2 = this;
            for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                var targetCard = targets_1[_i];
                _loop_3(targetCard);
            }
            var readjustments = 0;
            this.updateLine = function (evt) {
                var _a, _b;
                var sourceRect = thiz.cardDiv.getBoundingClientRect();
                var x1 = sourceRect.left + window.scrollX + Images_6.Images.CARD_WIDTH_S / 2;
                var y1 = sourceRect.top + window.scrollY + Images_6.Images.CARD_HEIGHT_S / 2;
                var currTarget = evt.target;
                var x2 = evt.pageX;
                var y2 = evt.pageY;
                if (currTarget != thiz.prevTarget) {
                    readjustments = 0;
                    (_a = thiz.prevTarget) === null || _a === void 0 ? void 0 : _a.classList.remove("dale-line-source", thiz.sourceClass);
                    (_b = thiz.prevTarget) === null || _b === void 0 ? void 0 : _b.classList.add("dale-line-target", thiz.targetClass);
                }
                for (var _i = 0, _c = thiz.targetDivs; _i < _c.length; _i++) {
                    var targetCard = _c[_i];
                    if (currTarget == targetCard) {
                        if (currTarget == thiz.prevTarget && readjustments >= 3) {
                            break;
                        }
                        readjustments += 1;
                        var targetRect = currTarget.getBoundingClientRect();
                        x2 = targetRect.left + window.scrollX + Images_6.Images.CARD_WIDTH_S / 2;
                        y2 = targetRect.top + window.scrollY + Images_6.Images.CARD_HEIGHT_S / 2;
                        targetCard.classList.add("dale-line-source", thiz.sourceClass);
                        targetCard.classList.remove("dale-line-target", thiz.targetClass);
                        thiz.prevTarget = currTarget;
                    }
                }
                thiz.line.setAttribute("x1", String(x1));
                thiz.line.setAttribute("y1", String(y1));
                if (readjustments < 3) {
                    thiz.line.setAttribute("x2", String(x2));
                    thiz.line.setAttribute("y2", String(y2));
                }
                if (!document.body.contains(thiz.cardDiv)) {
                    thiz.onSource();
                }
            };
            addEventListener("mousemove", this.updateLine);
            if (TargetingLine.previousMouseEvent) {
                this.updateLine.call(window, TargetingLine.previousMouseEvent);
            }
        }
        TargetingLine.prototype.remove = function () {
            removeEventListener("mousemove", this.updateLine);
            this.cardDiv.classList.remove("dale-line-source", this.sourceClass);
            this.cardDiv.removeEventListener("click", this.onSource);
            if (this.pile) {
                this.cardDiv.remove();
                this.pile.openPopin();
            }
            for (var i = 0; i < this.targetDivs.length; i++) {
                this.targetDivs[i].classList.remove("dale-line-source", this.sourceClass);
                this.targetDivs[i].classList.remove("dale-line-target", this.targetClass);
                this.targetDivs[i].removeEventListener("click", this.onTargets[i]);
            }
            this.line.remove();
            var index = TargetingLine.targetingLines.indexOf(this);
            if (index != -1) {
                TargetingLine.targetingLines.splice(index, 1);
            }
        };
        TargetingLine.removeAll = function () {
            for (var _i = 0, _a = TargetingLine.targetingLines.slice(); _i < _a.length; _i++) {
                var line = _a[_i];
                line.remove();
            }
        };
        TargetingLine.targetingLines = [];
        return TargetingLine;
    }());
    exports.TargetingLine = TargetingLine;
});
define("components/DaleDeckSelection", ["require", "exports", "components/Images", "components/OrderedSelection"], function (require, exports, Images_7, OrderedSelection_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleDeckSelection = void 0;
    var OrderedDeckSelection = (function (_super) {
        __extends(OrderedDeckSelection, _super);
        function OrderedDeckSelection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OrderedDeckSelection.prototype.getDiv = function (card_id) {
            return document.querySelector("#deck-".concat(card_id));
        };
        return OrderedDeckSelection;
    }(OrderedSelection_4.OrderedSelection));
    var DaleDeckSelection = (function () {
        function DaleDeckSelection(page, deckSelectionHTML, gameHTML, inDeckSelection) {
            this.orderedSelection = new OrderedDeckSelection();
            this.tooltips = [];
            this.deckSelectionHTML = deckSelectionHTML;
            this.gameHTML = gameHTML;
            this.cardContainer = this.deckSelectionHTML.querySelector(".dale-deck-selection-container");
            this.cardContainer.classList.add("dale-wrap-technique");
            if (!inDeckSelection) {
                this.deckSelectionHTML.classList.add("dale-hidden");
                return;
            }
            this.gameHTML.classList.add("dale-hidden");
            this.orderedSelection.setIconType('numbers');
            this.orderedSelection.setMaxSize(Object.values(page.gamedatas.players).length + 1);
            var _loop_4 = function (animalfolk_id) {
                var card_div = document.createElement('div');
                card_div.id = "deck-" + animalfolk_id;
                card_div.classList.add("dale-card", "dale-relative", "dale-clickable", "dale-deck-selection");
                this_3.cardContainer.appendChild(card_div);
                Images_7.Images.setCardStyleForDeckSelection(card_div, animalfolk_id);
                var tooltip = new dijit.Tooltip({
                    connectId: [card_div.id],
                    label: this_3.getTooltipContent(animalfolk_id),
                    showDelay: 400,
                });
                dojo.connect(card_div, "mouseleave", function () {
                    tooltip.close();
                });
                this_3.tooltips.push(tooltip);
                var unavailable = (animalfolk_id < 1 || animalfolk_id > 6);
                if (unavailable) {
                    card_div.classList.add("dale-deck-selection-unavailable");
                }
                var thiz = this_3;
                var card_id = animalfolk_id;
                card_div.addEventListener('click', function () {
                    if (unavailable) {
                        page.showMessage(_("This animalfolk does not exist"), 'error');
                        return;
                    }
                    if (page.isCurrentPlayerActive()) {
                        thiz.orderedSelection.toggle(card_id);
                    }
                });
            };
            var this_3 = this;
            for (var animalfolk_id = 1; animalfolk_id < 27; animalfolk_id++) {
                _loop_4(animalfolk_id);
            }
        }
        DaleDeckSelection.prototype.getTooltipContent = function (animalfolk_id) {
            return "TODO: TOOLTIP";
        };
        DaleDeckSelection.prototype.remove = function () {
            this.cardContainer.remove();
            for (var _i = 0, _a = this.tooltips; _i < _a.length; _i++) {
                var tooltip = _a[_i];
                tooltip.destroy();
            }
            this.gameHTML.classList.remove("dale-hidden");
        };
        DaleDeckSelection.prototype.setResult = function (animalfolk_id) {
            var _a;
            if (this.cardContainer.classList.contains("dale-wrap-technique")) {
                this.cardContainer.classList.remove("dale-wrap-technique");
                this.cardContainer.classList.add("dale-wrap-purchase");
                this.orderedSelection.unselectAll();
                this.orderedSelection.setIconType(undefined);
                this.cardContainer.querySelectorAll(".dale-deck-selection").forEach(function (card_div) {
                    card_div.classList.add("dale-deck-selection-unavailable");
                });
            }
            (_a = $("deck-" + animalfolk_id)) === null || _a === void 0 ? void 0 : _a.classList.remove("dale-deck-selection-unavailable");
            this.orderedSelection.selectItem(animalfolk_id);
        };
        return DaleDeckSelection;
    }());
    exports.DaleDeckSelection = DaleDeckSelection;
});
define("bgagame/dale", ["require", "exports", "ebg/core/gamegui", "components/DaleStock", "components/Pile", "components/HiddenPile", "components/DaleCard", "components/MarketBoard", "components/Stall", "components/types/ChameleonArgs", "components/types/MainClientState", "components/Images", "components/TargetingLine", "components/types/DbEffect", "components/DaleDeckSelection", "ebg/counter", "ebg/stock", "ebg/counter"], function (require, exports, Gamegui, DaleStock_1, Pile_2, HiddenPile_1, DaleCard_8, MarketBoard_1, Stall_1, ChameleonArgs_1, MainClientState_1, Images_8, TargetingLine_1, DbEffect_1, DaleDeckSelection_1) {
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
            _this.marketDiscard = new Pile_2.Pile(_this, 'market-discard', 'Bin');
            _this.playerHandSizes = {};
            _this.playerDecks = {};
            _this.playerDiscards = {};
            _this.playerStalls = {};
            _this.playerSchedules = {};
            _this.allDecks = { 'mark': _this.marketDeck };
            _this.market = null;
            _this.myHand = new DaleStock_1.DaleStock();
            _this.myLimbo = new DaleStock_1.DaleStock();
            _this.mainClientState = new MainClientState_1.MainClientState(_this);
            _this.opponent_ids = [];
            _this.max_opponents = 4;
            console.log('dale constructor');
            return _this;
        }
        Object.defineProperty(Dale.prototype, "myHandSize", {
            get: function () {
                return this.playerHandSizes[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
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
            (_a = $("overall-content")) === null || _a === void 0 ? void 0 : _a.appendChild(svgContainer);
            addEventListener("mousemove", function (evt) { TargetingLine_1.TargetingLine.previousMouseEvent = evt; });
            this.deckSelection = new DaleDeckSelection_1.DaleDeckSelection(this, $("dale-page-deck-selection"), $("dale-page-game"), gamedatas.inDeckSelection);
            DaleCard_8.DaleCard.init(this, gamedatas.cardTypes);
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
                this.allDecks[player_id] = this.playerDecks[player_id];
                this.playerDiscards[player_id] = new Pile_2.Pile(this, 'discard-' + player_id, 'Discard', +player_id);
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
            dojo.connect(this.myHand, 'onClick', this, 'onSelectHandCard');
            dojo.connect(this.myHand.orderedSelection, 'onSelect', this, 'onSelectHandCard');
            dojo.connect(this.myHand.orderedSelection, 'onUnselect', this, 'onUnselectHandCard');
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
            dojo.setStyle(this.myLimbo.wrap, 'min-width', 3 * Images_8.Images.CARD_WIDTH_S + 'px');
            dojo.connect(this.myLimbo, 'onClick', this, 'onSelectLimboCard');
            dojo.connect(this.myLimbo.orderedSelection, 'onSelect', this, 'onSelectLimboCard');
            for (var player_id in gamedatas.schedules) {
                var container = $('schedule-' + player_id);
                var wrap = $('schedule-wrap-' + player_id);
                dojo.setStyle(wrap, 'width', "".concat(1.5 * Images_8.Images.CARD_WIDTH_S, "px"));
                this.playerSchedules[player_id] = new DaleStock_1.DaleStock();
                this.playerSchedules[player_id].init(this, container);
                this.playerSchedules[player_id].setSelectionMode('none');
                this.playerSchedules[player_id].centerItems = true;
                for (var card_id in gamedatas.schedules[player_id]) {
                    var card = gamedatas.schedules[+player_id][+card_id];
                    this.playerSchedules[player_id].addDaleCardToStock(DaleCard_8.DaleCard.of(card));
                }
            }
            console.log("DbEffects:");
            for (var i in gamedatas.effects) {
                var effect = gamedatas.effects[i];
                DaleCard_8.DaleCard.addEffect(new DbEffect_1.DbEffect(effect));
            }
            this.setupNotifications();
            console.log("Ending game setup");
        };
        Dale.prototype.onEnteringState = function (stateName, args) {
            var _this = this;
            console.log('Entering state: ' + stateName);
            if (stateName.substring(0, 6) != 'client' && stateName.substring(0, 9) != 'chameleon') {
                console.log("SERVER STATE, remove all local chameleons");
                DaleCard_8.DaleCard.unbindAllChameleonsLocal();
            }
            if (stateName == 'nextPlayer') {
                console.log("nextPlayer, expire all effects that last until end of turn");
                this.mainClientState.cancelAll();
            }
            if (!this.isCurrentPlayerActive()) {
                return;
            }
            switch (stateName) {
                case 'playerTurn':
                    this.mainClientState.enter();
                    break;
                case 'client_purchase':
                    var client_purchase_args = this.mainClientState.args;
                    this.myHand.setSelectionMode('multiple', 'pileYellow', 'dale-wrap-purchase', _("Click cards to use for <strong>purchasing</strong>"));
                    this.market.setSelectionMode(1, undefined, "dale-wrap-purchase");
                    if (client_purchase_args.market_discovery_card_id === undefined) {
                        this.market.setSelected(client_purchase_args.pos, true);
                    }
                    else {
                        if (this.myHand.orderedSelection.getSize() == 0) {
                            this.myHand.selectItem(client_purchase_args.market_discovery_card_id);
                        }
                        this.marketDiscard.selectTopCard();
                        this.marketDiscard.setSelectionMode("top");
                    }
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_technique':
                    this.myHand.setSelectionMode('clickTechnique', 'pileBlue', 'dale-wrap-technique', _("Click cards to play <strong>techniques</strong>"));
                    this.market.setSelectionMode(1, undefined, "dale-wrap-purchase");
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_build':
                    this.myHand.setSelectionMode('multiple', 'build', 'dale-wrap-build', _("Click cards to <strong>build stacks</strong>"));
                    this.market.setSelectionMode(1, undefined, "dale-wrap-purchase");
                    this.myStall.selectLeftPlaceholder();
                    this.onBuildSelectionChanged();
                    break;
                case 'client_inventory':
                    this.myHand.setSelectionMode('multiple', 'pileRed', 'dale-wrap-discard', _("Click cards to <strong>discard</strong>"));
                    this.market.setSelectionMode(1, undefined, "dale-wrap-purchase");
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_essentialPurchase':
                    var client_essentialPurchase_args = this.mainClientState.args;
                    if (client_essentialPurchase_args.market_discovery_card_id) {
                        throw new Error("NOT IMPLEMENTED: interaction market discovery + essential purchase");
                    }
                    else {
                        this.market.setSelected(client_essentialPurchase_args.pos, true);
                    }
                    this.myHand.setSelectionMode('essentialPurchase', 'ditch', 'dale-wrap-purchase', _("Choose up to 3 junk cards to <strong>ditch</strong>"), 'pileYellow');
                    var junk_selected = 0;
                    for (var _i = 0, _a = client_essentialPurchase_args.funds_card_ids.slice().reverse(); _i < _a.length; _i++) {
                        var card_id = _a[_i];
                        this.myHand.selectItem(card_id, true);
                        if (junk_selected < 3 && new DaleCard_8.DaleCard(card_id).isJunk()) {
                            this.myHand.selectItem(card_id);
                            junk_selected++;
                        }
                    }
                    break;
                case 'winterIsComing':
                    this.myHand.setSelectionMode('multiple', 'build', 'dale-wrap-build', _("Click cards to <strong>build additional stacks</strong>"));
                    this.myStall.selectLeftPlaceholder();
                    this.onBuildSelectionChanged();
                    break;
                case 'client_swiftBroker':
                    this.myHand.setSelectionMode('multiple', 'pileBlue', 'dale-wrap-technique', _("Choose the order to discard your hand"));
                    break;
                case 'client_shatteredRelic':
                    this.myHand.setSelectionMode('click', undefined, 'dale-wrap-technique', _("Choose a card to <strong>ditch</strong>"));
                    break;
                case 'spyglass':
                    this.myLimbo.setSelectionMode('multiple', 'spyglass', 'dale-wrap-technique', _("Choose a card to take"));
                    break;
                case 'client_acorn':
                    var client_acorn_targets = [];
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            client_acorn_targets = client_acorn_targets.concat(this.playerStalls[player_id].getCardsInStall());
                        }
                    }
                    var client_acorn_args = this.mainClientState.args;
                    this.targetingLine = new TargetingLine_1.TargetingLine(new DaleCard_8.DaleCard(client_acorn_args.technique_card_id), client_acorn_targets, "dale-line-source-technique", "dale-line-target-technique", "dale-line-technique", function (source) { return _this.onCancelClient(); }, function (source, target) { return _this.onAcorn(source, target); });
                    break;
                case 'client_giftVoucher':
                    var client_giftVoucher_args = this.mainClientState.args;
                    this.targetingLine = new TargetingLine_1.TargetingLine(new DaleCard_8.DaleCard(client_giftVoucher_args.technique_card_id), this.market.getCards(), "dale-line-source-technique", "dale-line-target-technique", "dale-line-technique", function (source) { return _this.onCancelClient(); }, function (source, target) { return _this.onGiftVoucher(source, target); });
                    break;
                case 'client_loyalPartner':
                    this.market.setSelectionMode(2, 'pileBlue', "dale-wrap-technique");
                    break;
                case 'client_prepaidGood':
                    this.market.setSelectionMode(1, undefined, "dale-wrap-technique");
                    break;
                case 'specialOffer':
                    this.myLimbo.setSelectionMode('multiple', 'spyglass', 'dale-wrap-technique', _("Choose a card to take"));
                    break;
                case 'chameleon_flexibleShopkeeper':
                case 'chameleon_reflection':
                case 'chameleon_goodoldtimes':
                case 'chameleon_trendsetting':
                case 'chameleon_seeingdoubles':
                    if (stateName == 'chameleon_reflection') {
                        for (var _b = 0, _c = Object.entries(this.playerDiscards); _b < _c.length; _b++) {
                            var _d = _c[_b], player_id = _d[0], pile = _d[1];
                            if (+player_id != +this.player_id) {
                                pile.setSelectionMode('noneCantViewContent');
                            }
                        }
                    }
                    else if (stateName == 'chameleon_goodoldtimes') {
                        this.marketDeck.setSelectionMode('noneCantViewContent');
                        this.marketDiscard.setSelectionMode('noneCantViewContent');
                    }
                    this.myHand.setSelectionMode('noneRetainSelection', undefined, 'previous');
                    this.targetingLine = new TargetingLine_1.TargetingLine(this.chameleonArgs.firstSource, this.chameleonArgs.currentTargets, "dale-line-source-chameleon", "dale-line-target-chameleon", "dale-line-chameleon", function (source) { return _this.onCancelClient(); }, function (source, target) { return _this.onConfirmChameleon(target); }, this.chameleonArgs.pile);
                    break;
                case 'client_marketDiscovery':
                    this.marketDeck.setSelectionMode('top', undefined, 'dale-wrap-technique');
                    this.marketDiscard.setSelectionMode('top', undefined, 'dale-wrap-purchase');
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
                    this.marketDiscard.unselectTopCard();
                    this.marketDiscard.setSelectionMode('none');
                    this.myHand.setSelectionMode('none');
                    this.myStall.setLeftPlaceholderClickable(false);
                    break;
                case 'client_technique':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    this.myStall.setLeftPlaceholderClickable(false);
                    break;
                case 'client_build':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    this.myStall.unselectLeftPlaceholder();
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'client_inventory':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    this.myStall.setLeftPlaceholderClickable(false);
                    break;
                case 'client_essentialPurchase':
                    this.market.setSelectionMode(0);
                    this.myHand.orderedSelection.secondaryToPrimary();
                    break;
                case 'winterIsComing':
                    this.myHand.setSelectionMode('none');
                    this.myStall.unselectLeftPlaceholder();
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'client_swiftBroker':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_shatteredRelic':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'spyglass':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'client_acorn':
                    (_a = this.targetingLine) === null || _a === void 0 ? void 0 : _a.remove();
                    break;
                case 'client_giftVoucher':
                    (_b = this.targetingLine) === null || _b === void 0 ? void 0 : _b.remove();
                    break;
                case 'client_loyalPartner':
                    this.market.setSelectionMode(0);
                    break;
                case 'client_prepaidGood':
                    this.market.setSelectionMode(0);
                    break;
                case 'specialOffer':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'chameleon_reflection':
                    (_c = this.targetingLine) === null || _c === void 0 ? void 0 : _c.remove();
                    for (var _i = 0, _f = Object.entries(this.playerDiscards); _i < _f.length; _i++) {
                        var _g = _f[_i], player_id = _g[0], pile = _g[1];
                        if (+player_id != +this.player_id) {
                            pile.setSelectionMode('none');
                        }
                    }
                    break;
                case 'chameleon_goodoldtimes':
                    (_d = this.targetingLine) === null || _d === void 0 ? void 0 : _d.remove();
                    this.marketDeck.setSelectionMode('none');
                    this.marketDiscard.setSelectionMode('none');
                    break;
                case 'chameleon_flexibleShopkeeper':
                case 'chameleon_trendsetting':
                case 'chameleon_seeingdoubles':
                    (_e = this.targetingLine) === null || _e === void 0 ? void 0 : _e.remove();
                    break;
                case 'client_marketDiscovery':
                    this.marketDeck.setSelectionMode('none');
                    this.marketDiscard.setSelectionMode('none');
            }
        };
        Dale.prototype.onUpdateActionButtons = function (stateName, args) {
            console.log('onUpdateActionButtons: ' + stateName, args);
            if (!this.isCurrentPlayerActive())
                return;
            switch (stateName) {
                case 'deckSelection':
                    this.addActionButton("submit-button", _("Vote"), "onSubmitPreference");
                    this.addActionButton("abstain-button", _("Abstain"), "onSubmitPreferenceAbstain", undefined, false, 'gray');
                    break;
                case 'playerTurn':
                    break;
                case 'client_technique':
                    this.addActionButton("confirm-button", _("Take an inventory action"), "onRequestInventoryAction");
                    if (DaleCard_8.DaleCard.countChameleonsLocal() > 0) {
                        this.addActionButton("undo-chameleon-button", _("Undo"), "onUnbindChameleons", undefined, false, 'gray');
                    }
                    break;
                case 'client_purchase':
                    this.addActionButton("confirm-button", _("Confirm funds"), "onPurchase");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_build':
                    this.addActionButton("confirm-button", _("Build with selected"), "onBuild");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_inventory':
                    this.addActionButton("confirm-button", _("Discard selected"), "onInventoryAction");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_essentialPurchase':
                    this.addActionButton("confirm-button", _("Ditch selected junk"), "onPurchase");
                    this.addActionButtonCancelClient();
                    break;
                case 'winterIsComing':
                    this.addActionButton("confirm-button", _("Build with selected"), "onBuild");
                    this.addActionButton("skip-button", _("Skip"), "onWinterIsComingSkip", undefined, false, 'gray');
                    break;
                case 'client_swiftBroker':
                    this.addActionButton("confirm-button", _("Discard all"), "onSwiftBroker");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_shatteredRelic':
                    this.addActionButtonCancelClient();
                    break;
                case 'spyglass':
                    this.addActionButton("confirm-button", _("Confirm selection"), "onSpyglass");
                    break;
                case 'client_acorn':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_giftVoucher':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_loyalPartner':
                    this.addActionButton("confirm-button", _("Ditch all"), "onLoyalPartner");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_prepaidGood':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_nuisance':
                    this.addActionButtonsOpponentSelection(2);
                    this.addActionButton("confirm-button", _("Confirm selection"), "onNuisance");
                    this.addActionButtonCancelClient();
                    break;
                case 'chameleon_flexibleShopkeeper':
                    this.addActionButtonCancelClient();
                    break;
                case 'chameleon_reflection':
                    this.addActionButtonCancelClient();
                    break;
                case 'chameleon_goodoldtimes':
                    switch (this.mainClientState.args.mode) {
                        case 'copy':
                            this.addActionButton("copy-button", _("Copy"), "onGoodOldTimesBind");
                            this.addActionButtonCancelClient();
                            break;
                        case 'ditchOrCopy':
                            this.addActionButton("copy-button", _("Copy"), "onGoodOldTimesBind");
                            this.addActionButton("ditch-button", _("Ditch"), "onGoodOldTimesPassive");
                            this.addActionButtonCancelClient();
                            break;
                        case 'ditchOptional':
                            this.addActionButton("ditch-button", _("Ditch"), "onGoodOldTimesPassive");
                            this.addActionButton("skip-button", _("Skip"), "onGoodOldTimesPassiveSkip", undefined, false, 'gray');
                            break;
                        case 'ditchMandatory':
                            this.addActionButton("ditch-button", _("Ditch"), "onGoodOldTimesPassive");
                            this.addActionButtonCancelClient();
                            break;
                    }
                    break;
                case 'chameleon_trendsetting':
                    this.addActionButtonCancelClient();
                    break;
                case 'chameleon_seeingdoubles':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_choicelessTechniqueCard':
                    this.onChoicelessTechniqueCard();
                    break;
                case 'client_fizzle':
                    this.addActionButton("fizzle-button", _("Confirm"), "onFizzle");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_choicelessPassiveCard':
                    this.addActionButton("confirm-button", _("Play"), "onChoicelessPassiveCard");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_marketDiscovery':
                    this.addActionButton("ditch-button", _("Ditch"), "onMarketDiscoveryDitch");
                    this.addActionButton("buy-button", _("Purchase"), "onMarketDiscoveryPurchase");
                    this.addActionButtonCancelClient();
                    break;
                case 'specialOffer':
                    this.addActionButton("confirm-button", _("Confirm selection"), "onSpecialOffer");
                    break;
            }
        };
        Dale.prototype.verifyChameleon = function (card, pile) {
            var _a;
            if (!card.isChameleon()) {
                return true;
            }
            if (!this.checkLock()) {
                return false;
            }
            if (this.chameleonArgs) {
                this.chameleonArgs.pickTarget(card);
            }
            var chameleonStatename;
            var args = { mode: undefined };
            var ditchAvailable = false;
            switch (card.effective_type_id) {
                case DaleCard_8.DaleCard.CT_FLEXIBLESHOPKEEPER:
                    chameleonStatename = 'chameleon_flexibleShopkeeper';
                    break;
                case DaleCard_8.DaleCard.CT_REFLECTION:
                    chameleonStatename = 'chameleon_reflection';
                    break;
                case DaleCard_8.DaleCard.CT_GOODOLDTIMES:
                    ditchAvailable = (this.chameleonArgs || !card.isPassiveUsed()) && (this.marketDeck.size > 0 || this.marketDiscard.size > 0);
                    if (!ditchAvailable) {
                        args.mode = 'copy';
                    }
                    else if ((!this.chameleonArgs && this.marketDiscard.size == 0) || ((_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.onlyContainsGoodOldTimes)) {
                        args.mode = 'ditchOptional';
                    }
                    else if ((!this.chameleonArgs || this.chameleonArgs.currentTargets.includes(card)) && this.marketDiscard.size > 0) {
                        args.mode = 'ditchOrCopy';
                    }
                    else {
                        args.mode = 'ditchMandatory';
                    }
                    chameleonStatename = 'chameleon_goodoldtimes';
                    break;
                case DaleCard_8.DaleCard.CT_TRENDSETTING:
                    chameleonStatename = 'chameleon_trendsetting';
                    break;
                case DaleCard_8.DaleCard.CT_SEEINGDOUBLES:
                    chameleonStatename = 'chameleon_seeingdoubles';
                    break;
                default:
                    throw new Error("Unknown chameleon card: '".concat(card.name, "'"));
            }
            if (!this.chameleonArgs) {
                this.chameleonArgs = new ChameleonArgs_1.ChameleonArgs(this.createChameleonTree(card), pile);
                var targets = this.chameleonArgs.getAllTargets();
                console.log("'".concat(card.name, "' has ").concat(this.chameleonArgs.currentTargets.length, " direct target(s)"));
                console.log("'".concat(card.name, "' has ").concat(targets.size, " total target(s)"));
                console.log(Array.from(targets).map(function (target) { return target.div; }));
                if (this.chameleonArgs.onlyContainsGoodOldTimes) {
                    if (ditchAvailable) {
                        args.mode = 'ditchOptional';
                    }
                    else {
                        this.chameleonArgs = undefined;
                        return true;
                    }
                }
                else if (targets.size == 0) {
                    this.chameleonArgs = undefined;
                    return true;
                }
                this.mainClientState.enterOnStack(chameleonStatename, args);
            }
            else {
                this.mainClientState.enter(chameleonStatename, args);
            }
            return false;
        };
        Dale.prototype.createChameleonTree = function (card, visited_ids) {
            visited_ids = visited_ids !== null && visited_ids !== void 0 ? visited_ids : [];
            visited_ids.push(card.id);
            var tree = {
                card: card,
                children: []
            };
            for (var _i = 0, _a = this.getChameleonTargets(card, visited_ids.length == 1); _i < _a.length; _i++) {
                var target = _a[_i];
                if (!visited_ids.includes(target.id)) {
                    var child = this.createChameleonTree(target, visited_ids);
                    tree.children.push(child);
                }
            }
            visited_ids.pop();
            return tree;
        };
        Dale.prototype.getChameleonTargets = function (card, isRoot) {
            var targets = [];
            switch (card.effective_type_id) {
                case DaleCard_8.DaleCard.CT_FLEXIBLESHOPKEEPER:
                    targets = this.myStall.getCardsInStack(this.myStall.getNumberOfStacks() - 1);
                    break;
                case DaleCard_8.DaleCard.CT_REFLECTION:
                    for (var _i = 0, _a = Object.entries(this.playerDiscards); _i < _a.length; _i++) {
                        var _b = _a[_i], player_id = _b[0], pile = _b[1];
                        if (+player_id != +this.player_id && pile.size > 0) {
                            targets.push(pile.peek());
                        }
                    }
                    break;
                case DaleCard_8.DaleCard.CT_GOODOLDTIMES:
                    if (this.marketDiscard.size > 0) {
                        targets.push(this.marketDiscard.peek());
                    }
                    if ((this.marketDeck.size > 0 || this.marketDiscard.size > 0) && (!isRoot || !card.isPassiveUsed())) {
                        var cardBack = this.marketDeck.peek();
                        if (cardBack) {
                            cardBack.attachDiv(this.marketDeck.topCardHTML);
                            targets.push(cardBack);
                        }
                    }
                    break;
                case DaleCard_8.DaleCard.CT_TRENDSETTING:
                    for (var _c = 0, _d = this.market.getCards(); _c < _d.length; _c++) {
                        var card_1 = _d[_c];
                        targets.push(card_1);
                    }
                    break;
                case DaleCard_8.DaleCard.CT_SEEINGDOUBLES:
                    var items = this.myHand.getAllItems();
                    for (var _e = 0, items_1 = items; _e < items_1.length; _e++) {
                        var item = items_1[_e];
                        if (item.id != card.id) {
                            targets.push(new DaleCard_8.DaleCard(item.id));
                        }
                    }
                    break;
            }
            return targets;
        };
        Dale.prototype.format_string_recursive = function (log, args) {
            var _a;
            if (log && args && !args['processed']) {
                args['processed'] = true;
                if ('opponent_name' in args) {
                    var opponent_name = args['opponent_name'];
                    var opponent_color = "000000";
                    for (var player_id in this.gamedatas.players) {
                        if (((_a = this.gamedatas.players[player_id]) === null || _a === void 0 ? void 0 : _a.name) == opponent_name) {
                            opponent_color = this.gamedatas.players[player_id].color;
                        }
                    }
                    args['opponent_name'] = "<span class=\"playername\" style=\"color:#".concat(opponent_color, ";\">").concat(opponent_name, "</span>");
                }
            }
            return _super.prototype.format_string_recursive.call(this, log, args);
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
                console.log("GOT HERE!");
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
        Dale.prototype.addActionButtonCancelClient = function () {
            this.addActionButton("cancel-button", _("Cancel"), "onCancelClient", undefined, false, 'gray');
        };
        Dale.prototype.addActionButtonsOpponentSelection = function (maxSize) {
            var _a;
            this.opponent_ids = [];
            this.max_opponents = maxSize !== null && maxSize !== void 0 ? maxSize : this.gamedatas.playerorder.length;
            for (var _i = 0, _b = this.gamedatas.playerorder; _i < _b.length; _i++) {
                var opponent_id = _b[_i];
                if (opponent_id != this.player_id) {
                    var name_1 = this.gamedatas.players[opponent_id].name;
                    var color = this.gamedatas.players[opponent_id].color;
                    var label = "<span style=\"font-weight:bold;color:#".concat(color, ";\">").concat(name_1, "</span>");
                    this.addActionButton("opponent-selection-button-" + opponent_id, label, "onToggleOpponent", undefined, false, 'gray');
                    if (this.opponent_ids.length < this.max_opponents) {
                        this.opponent_ids.push(opponent_id);
                        (_a = $("opponent-selection-button-" + opponent_id)) === null || _a === void 0 ? void 0 : _a.classList.add("dale-bga-button-selected");
                    }
                }
            }
        };
        Dale.prototype.onToggleOpponent = function (evt) {
            var _a;
            var target = evt.target;
            if (target.parentElement.id.startsWith("opponent-selection-button-")) {
                target = target.parentElement;
            }
            if (target.id.startsWith("opponent-selection-button-")) {
                var match = target.id.match(/\d+/);
                if (match) {
                    var opponent_id = parseInt(match[0], 10);
                    var index = this.opponent_ids.indexOf(opponent_id);
                    if (index == -1) {
                        if (this.opponent_ids.length >= this.max_opponents) {
                            (_a = $("opponent-selection-button-" + this.opponent_ids.pop())) === null || _a === void 0 ? void 0 : _a.classList.remove("dale-bga-button-selected");
                        }
                        this.opponent_ids.push(opponent_id);
                        target.classList.add("dale-bga-button-selected");
                    }
                    else {
                        this.opponent_ids.splice(index, 1);
                        target.classList.remove("dale-bga-button-selected");
                    }
                    console.log(this.opponent_ids);
                }
            }
        };
        Dale.prototype.onSubmitPreference = function () {
            var animalfolk_ids = this.deckSelection.orderedSelection.get().reverse();
            if (animalfolk_ids.length == 0) {
                this.showMessage(_("Please select at least 1 animalfolk to vote"), 'error');
                return;
            }
            this.bgaPerformAction('actSubmitPreference', {
                animalfolk_ids: this.arrayToNumberList(animalfolk_ids)
            });
        };
        Dale.prototype.onSubmitPreferenceAbstain = function () {
            this.bgaPerformAction('actSubmitPreference', {
                animalfolk_ids: ''
            });
        };
        Dale.prototype.onStallCardClick = function (stall, card, stack_index, index) {
            console.log("Clicked on CardStack[".concat(stack_index, ", ").concat(index, "]"));
            switch (this.gamedatas.gamestate.name) {
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
                        this.mainClientState.leave();
                    }
                    else if (this.checkLock()) {
                        this.mainClientState.enter('client_purchase', {
                            pos: pos,
                            market_discovery_card_id: undefined,
                            card_name: card.name,
                            cost: card.getCost(pos)
                        });
                    }
                    break;
                case 'client_technique':
                case 'client_build':
                case 'client_inventory':
                    if (this.checkLock()) {
                        this.mainClientState.enter('client_purchase', {
                            pos: pos,
                            market_discovery_card_id: undefined,
                            card_name: card.name,
                            cost: card.getCost(pos)
                        });
                    }
                    break;
                case 'client_prepaidGood':
                    this.playTechniqueCard({
                        card_id: card.id
                    });
                    break;
            }
        };
        Dale.prototype.onScheduleSelectionChanged = function () {
            console.log("You click on a card in the... schedule...?");
        };
        Dale.prototype.onUnselectPileCard = function (pile, card_id) {
            console.log("onUnselectPileCard");
            switch (this.gamedatas.gamestate.name) {
                case 'client_build':
                    this.onBuildSelectionChanged();
                    break;
            }
        };
        Dale.prototype.onSelectPileCard = function (pile, card_id) {
            console.log("onSelectPileCard");
            var card = new DaleCard_8.DaleCard(card_id);
            if (pile === this.myDiscard) {
                this.onSelectMyDiscardPileCard(pile, card);
            }
            else if (pile === this.marketDiscard || pile === this.marketDeck) {
                this.onSelectMarketPileCard(pile, card);
            }
            else {
                this.onOtherDiscardPileSelectionChanged(pile, card);
            }
        };
        Dale.prototype.onSelectMyDiscardPileCard = function (pile, card) {
            console.log("onSelectMyDiscardPileCard");
            switch (this.gamedatas.gamestate.name) {
                case 'client_build':
                    if (this.verifyChameleon(card, pile)) {
                        this.onBuildSelectionChanged();
                    }
                    break;
            }
        };
        Dale.prototype.onSelectMarketPileCard = function (pile, card) {
            console.log("onSelectMarketPileCard");
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                    this.mainClientState.leave();
                    break;
                case 'client_marketDiscovery':
                    if (pile === this.marketDeck) {
                        this.onMarketDiscoveryDitch();
                    }
                    else if (pile === this.marketDiscard) {
                        this.onMarketDiscoveryPurchase();
                    }
            }
        };
        Dale.prototype.onOtherDiscardPileSelectionChanged = function (pile, card) {
            console.log("onOtherDiscardPileSelectionChanged");
            switch (this.gamedatas.gamestate.name) {
            }
        };
        Dale.prototype.onUnselectHandCard = function (card_id) {
            console.log("onUnselectHandCard: " + card_id);
            var card = new DaleCard_8.DaleCard(card_id);
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                    this.onFundsSelectionChanged();
                    break;
                case 'client_build':
                    this.onBuildSelectionChanged();
                    break;
                case 'winterIsComing':
                    this.onBuildSelectionChanged();
                    break;
            }
        };
        Dale.prototype.onSelectHandCard = function (card_id) {
            console.log("onSelectHandCard: " + card_id);
            var card = new DaleCard_8.DaleCard(card_id);
            switch (this.gamedatas.gamestate.name) {
                case 'client_technique':
                    if (this.verifyChameleon(card)) {
                        if (card.isTechnique()) {
                            this.onClickTechnique(card);
                        }
                        else {
                            this.onClickPassive(card);
                        }
                    }
                    break;
                case 'client_purchase':
                    if (this.verifyChameleon(card)) {
                        this.onFundsSelectionChanged();
                    }
                    break;
                case 'client_build':
                    if (this.verifyChameleon(card)) {
                        this.onBuildSelectionChanged();
                    }
                    break;
                case 'winterIsComing':
                    if (this.verifyChameleon(card)) {
                        this.onBuildSelectionChanged();
                    }
                    break;
                case 'client_shatteredRelic':
                    this.playTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case null:
                    throw new Error("gamestate.name is null");
            }
        };
        Dale.prototype.onSelectLimboCard = function (card_id) {
            console.log("onSelectLimboCard: " + card_id);
            switch (this.gamedatas.gamestate.name) {
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
            if (args.market_discovery_card_id === undefined) {
                card_id = this.market.getCardId(args.pos);
                console.log(card_id);
            }
            else {
                var card = this.marketDiscard.peek();
                if (!card) {
                    throw new Error("Cannot purchase from the bin, as it is empty");
                }
                card_id = card.id;
            }
            if (this.gamedatas.gamestate.name != 'client_essentialPurchase' && new DaleCard_8.DaleCard(card_id).effective_type_id == DaleCard_8.DaleCard.CT_ESSENTIALPURCHASE) {
                this.mainClientState.enterOnStack('client_essentialPurchase', __assign({ funds_card_ids: funds_card_ids }, args));
            }
            else {
                this.bgaPerformAction('actPurchase', {
                    funds_card_ids: this.arrayToNumberList(funds_card_ids),
                    market_card_id: card_id,
                    essential_purchase_ids: this.arrayToNumberList(essential_purchase_ids),
                    chameleons_json: DaleCard_8.DaleCard.getLocalChameleonsJSON()
                });
            }
        };
        Dale.prototype.onMarketDiscoveryDitch = function () {
            this.playPassiveCard({});
        };
        Dale.prototype.onMarketDiscoveryPurchase = function (market_discovery_card_id) {
            if (market_discovery_card_id == undefined || market_discovery_card_id instanceof PointerEvent) {
                market_discovery_card_id = this.mainClientState.args.passive_card_id;
            }
            var card = this.marketDiscard.peek();
            if (!card) {
                this.showMessage(_("The bin is empty"), 'error');
                return;
            }
            if (this.checkLock()) {
                this.mainClientState.enter('client_purchase', {
                    pos: -1,
                    market_discovery_card_id: market_discovery_card_id,
                    card_name: card.name,
                    cost: card.getCost(0)
                });
            }
        };
        Dale.prototype.onFizzle = function () {
            this.playTechniqueCard({
                fizzle: true
            });
        };
        Dale.prototype.onChoicelessTechniqueCard = function () {
            this.playTechniqueCard({
                choiceless: true
            });
        };
        Dale.prototype.onChoicelessPassiveCard = function () {
            this.playPassiveCard({});
        };
        Dale.prototype.playPassiveCard = function (args) {
            this.bgaPerformAction('actUsePassiveAbility', {
                card_id: this.mainClientState.args.passive_card_id,
                chameleons_json: DaleCard_8.DaleCard.getLocalChameleonsJSON(),
                args: JSON.stringify(args)
            });
            this.mainClientState.leave();
        };
        Dale.prototype.playTechniqueCard = function (args) {
            this.bgaPerformAction('actPlayTechniqueCard', {
                card_id: this.mainClientState.args.technique_card_id,
                chameleons_json: DaleCard_8.DaleCard.getLocalChameleonsJSON(),
                args: JSON.stringify(args)
            });
            this.mainClientState.leave();
        };
        Dale.prototype.clientScheduleTechnique = function (stateName, technique_card_id) {
            if (this.checkLock()) {
                if ($(this.myHand.control_name + '_item_' + technique_card_id)) {
                    this.mySchedule.addDaleCardToStock(new DaleCard_8.DaleCard(technique_card_id), this.myHand.control_name + '_item_' + technique_card_id);
                    this.myHand.removeFromStockByIdNoAnimation(+technique_card_id);
                }
                else {
                    throw new Error("Cannot schedule the technique card. Card ".concat(technique_card_id, " does not exist in my hand"));
                }
                this.myHandSize.incValue(-1);
                this.mainClientState.enterOnStack(stateName, { technique_card_id: technique_card_id });
            }
        };
        Dale.prototype.onAcorn = function (source, target) {
            for (var _i = 0, _a = Object.entries(this.playerStalls); _i < _a.length; _i++) {
                var _b = _a[_i], player_id = _b[0], player_stall = _b[1];
                if (player_stall.contains(target)) {
                    this.playTechniqueCard({
                        stall_player_id: +player_id,
                        stall_card_id: target.id
                    });
                    break;
                }
            }
        };
        Dale.prototype.onGiftVoucher = function (source, target) {
            if (this.market.contains(target)) {
                this.playTechniqueCard({
                    market_card_id: target.id
                });
            }
        };
        Dale.prototype.onClickTechnique = function (card) {
            var fizzle = true;
            switch (card.effective_type_id) {
                case DaleCard_8.DaleCard.CT_SWIFTBROKER:
                    this.clientScheduleTechnique('client_swiftBroker', card.id);
                    break;
                case DaleCard_8.DaleCard.CT_SHATTEREDRELIC:
                    if (this.myHand.count() == 1) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_shatteredRelic', card.id);
                    }
                    break;
                case DaleCard_8.DaleCard.CT_ACORN:
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            if (this.playerStalls[player_id].getNumberOfStacks() > 0) {
                                fizzle = false;
                                break;
                            }
                        }
                    }
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.mainClientState.enterOnStack('client_acorn', { technique_card_id: card.id });
                    }
                    break;
                case DaleCard_8.DaleCard.CT_GIFTVOUCHER:
                    fizzle = this.market.getCards().length == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.mainClientState.enterOnStack('client_giftVoucher', { technique_card_id: card.id });
                    }
                    break;
                case DaleCard_8.DaleCard.CT_LOYALPARTNER:
                    this.clientScheduleTechnique('client_loyalPartner', card.id);
                    break;
                case DaleCard_8.DaleCard.CT_PREPAIDGOOD:
                    fizzle = this.market.getCards().length == 0;
                    this.clientScheduleTechnique(fizzle ? 'client_fizzle' : 'client_prepaidGood', card.id);
                    break;
                case DaleCard_8.DaleCard.CT_NUISANCE:
                    this.clientScheduleTechnique('client_nuisance', card.id);
                    break;
                default:
                    this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    break;
            }
        };
        Dale.prototype.onClickPassive = function (card) {
            var type_id = card.effective_type_id;
            if (type_id != DaleCard_8.DaleCard.CT_GOODOLDTIMES && type_id != DaleCard_8.DaleCard.CT_MARKETDISCOVERY) {
                if (card.isChameleon()) {
                    this.showMessage(_("This chameleon card has no valid targets"), 'error');
                    return;
                }
                if (card.isPassiveUsed()) {
                    this.showMessage(_("This passive's ability was already used"), 'error');
                    return;
                }
            }
            switch (card.effective_type_id) {
                case DaleCard_8.DaleCard.CT_GOODOLDTIMES:
                    if (card.isPassiveUsed()) {
                        this.showMessage(_("This passive's ability was already used"), 'error');
                    }
                    else {
                        throw new Error("INTERNAL ERROR: the client should have been redirected to a chameleon state by 'verifyChameleon'");
                    }
                    break;
                case DaleCard_8.DaleCard.CT_MARKETDISCOVERY:
                    if (card.isPassiveUsed()) {
                        this.onMarketDiscoveryPurchase(card.id);
                    }
                    else {
                        this.mainClientState.enterOnStack('client_marketDiscovery', { passive_card_id: card.id });
                    }
                    break;
                default:
                    this.mainClientState.enterOnStack('client_choicelessPassiveCard', { passive_card_id: card.id });
                    break;
            }
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
            if (count_nostalgic_items == 0) {
                this.myDiscard.setSelectionMode('none');
            }
            else {
                this.myDiscard.setSelectionMode('multiple', 'build', "dale-wrap-build", count_nostalgic_items);
            }
        };
        Dale.prototype.onBuild = function () {
            if (this.checkAction('actBuild')) {
                this.bgaPerformAction('actBuild', {
                    stack_card_ids: this.arrayToNumberList(this.myHand.orderedSelection.get()),
                    stack_card_ids_from_discard: this.arrayToNumberList(this.myDiscard.orderedSelection.get()),
                    chameleons_json: DaleCard_8.DaleCard.getLocalChameleonsJSON()
                });
            }
        };
        Dale.prototype.onWinterIsComingSkip = function () {
            if (this.checkAction('actWinterIsComingSkip')) {
                this.bgaPerformAction('actWinterIsComingSkip', {});
            }
        };
        Dale.prototype.onCancelClient = function () {
            console.log("onCancelClient");
            TargetingLine_1.TargetingLine.removeAll();
            if (this.chameleonArgs) {
                this.chameleonArgs.firstSource.unbindChameleonLocal();
                if (this.chameleonArgs.pile) {
                    this.chameleonArgs.pile.unselectItem(this.chameleonArgs.firstSource.id);
                }
                else {
                    this.myHand.unselectItem(this.chameleonArgs.firstSource.id);
                }
                this.chameleonArgs = undefined;
            }
            console.log(this.mainClientState.args);
            if ('technique_card_id' in this.mainClientState.args) {
                var card_id = this.mainClientState.args.technique_card_id;
                var card = new DaleCard_8.DaleCard(card_id);
                var type_id = card.effective_type_id;
                if ((type_id != DaleCard_8.DaleCard.CT_ACORN && type_id != DaleCard_8.DaleCard.CT_GIFTVOUCHER) || this.mainClientState.name == 'client_fizzle') {
                    this.myHand.addDaleCardToStock(card, this.mySchedule.control_name + '_item_' + card_id);
                    this.mySchedule.removeFromStockByIdNoAnimation(card_id);
                    this.myHandSize.incValue(1);
                }
            }
            this.mainClientState.leave();
        };
        Dale.prototype.onConfirmChameleon = function (target) {
            console.log("onConfirmChameleon");
            var args = this.chameleonArgs;
            console.log(args);
            if (target.isCardBack()) {
                if (args.currentSource.effective_type_id != DaleCard_8.DaleCard.CT_GOODOLDTIMES) {
                    throw new Error("Only 'Good Old Times' can use the 'Good Old Times' ability");
                }
                this.onGoodOldTimesPassive();
            }
            else if (this.verifyChameleon(target)) {
                args.pickTarget(target);
                TargetingLine_1.TargetingLine.removeAll();
                this.chameleonArgs = undefined;
                this.mainClientState.leave();
            }
        };
        Dale.prototype.onGoodOldTimesPassive = function () {
            this.bgaPerformAction('actUsePassiveAbility', {
                card_id: this.chameleonArgs.firstSource.id,
                chameleons_json: DaleCard_8.DaleCard.getLocalChameleonsJSON(),
                args: JSON.stringify({})
            });
            this.onCancelClient();
        };
        Dale.prototype.onGoodOldTimesPassiveSkip = function () {
            var _a;
            TargetingLine_1.TargetingLine.removeAll();
            (_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.firstSource.unbindChameleonLocal();
            this.chameleonArgs = undefined;
            this.mainClientState.leave();
        };
        Dale.prototype.onGoodOldTimesBind = function () {
            var discardTopCard = this.marketDiscard.peek();
            if (discardTopCard) {
                TargetingLine_1.TargetingLine.removeAll();
                this.onConfirmChameleon(discardTopCard);
            }
            else {
                this.onCancelClient();
            }
        };
        Dale.prototype.onUnbindChameleons = function () {
            DaleCard_8.DaleCard.unbindAllChameleonsLocal();
            this.mainClientState.enter();
        };
        Dale.prototype.onRequestBuildAction = function () {
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                case 'client_technique':
                case 'client_build':
                case 'client_inventory':
                    this.mainClientState.enter('client_build', {
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
                    this.mainClientState.enter('client_inventory');
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
            this.playTechniqueCard({
                card_ids: this.myHand.orderedSelection.get()
            });
        };
        Dale.prototype.onSpyglass = function () {
            var card_ids = this.myLimbo.orderedSelection.get();
            console.log("Sending " + this.arrayToNumberList(card_ids));
            if (card_ids.length == 0) {
                this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
                return;
            }
            this.bgaPerformAction('actSpyglass', {
                card_ids: this.arrayToNumberList(card_ids)
            });
        };
        Dale.prototype.onLoyalPartner = function () {
            this.playTechniqueCard({
                card_ids: this.market.orderedSelection.get()
            });
        };
        Dale.prototype.onSpecialOffer = function () {
            var card_ids = this.myLimbo.orderedSelection.get();
            console.log("Sending " + this.arrayToNumberList(card_ids));
            if (card_ids.length == 0) {
                this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
                return;
            }
            this.bgaPerformAction('actSpecialOffer', {
                card_ids: this.arrayToNumberList(card_ids)
            });
        };
        Dale.prototype.onNuisance = function () {
            this.playTechniqueCard({
                opponent_ids: this.opponent_ids
            });
        };
        Dale.prototype.setupNotifications = function () {
            var _this = this;
            console.log('notifications subscriptions setup42');
            var notifs = [
                ['deckSelectionResult', 500],
                ['delay', 500],
                ['startGame', 500],
                ['instant_scheduleTechnique', 1],
                ['scheduleTechnique', 500],
                ['resolveTechnique', 500],
                ['cancelTechnique', 500],
                ['buildStack', 500],
                ['fillEmptyMarketSlots', 1],
                ['marketSlideRight', 500],
                ['marketToHand', 500],
                ['swapHandStall', 1],
                ['swapHandMarket', 1],
                ['marketDiscardToHand', 500],
                ['discardToHand', 500],
                ['discardToHandMultiple', 500],
                ['draw', 500],
                ['drawMultiple', 500],
                ['limboToHand', 500],
                ['obtainNewJunkInHand', 500],
                ['ditch', 500],
                ['ditchMultiple', 500],
                ['discard', 500],
                ['discardMultiple', 500],
                ['placeOnDeckMultiple', 500],
                ['reshuffleDeck', 1500],
                ['wilyFellow', 500],
                ['ditchFromMarketDeck', 500],
                ['ditchFromMarketBoard', 500],
                ['addEffect', 1],
                ['expireEffects', 1],
                ['message', 1],
                ['debugClient', 1],
            ];
            notifs.forEach(function (notif) {
                dojo.subscribe(notif[0], _this, "notif_".concat(notif[0]));
                _this.notifqueue.setSynchronous(notif[0], notif[1]);
            });
            console.log('notifications subscriptions setup done');
        };
        Dale.prototype.notif_delay = function (notif) {
            console.log("notif_delay (500ms)");
        };
        Dale.prototype.notif_deckSelectionResult = function (notif) {
            this.deckSelection.setResult(notif.args.animalfolk_id);
        };
        Dale.prototype.notif_startGame = function (notif) {
            this.deckSelection.remove();
            var n = Object.keys(this.gamedatas.players).length;
            this.marketDeck.pushHiddenCards(11 * (n + 1));
            for (var player_id in this.gamedatas.players) {
                this.playerDecks[+player_id].pushHiddenCards(10);
            }
        };
        Dale.prototype.notif_instant_scheduleTechnique = function (notif) {
            this.notif_scheduleTechnique(notif);
        };
        Dale.prototype.notif_scheduleTechnique = function (notif) {
            if (notif.args.player_id == this.player_id) {
                var card_id = +notif.args.card.id;
                if ($(this.myHand.control_name + '_item_' + card_id)) {
                    this.mySchedule.addDaleCardToStock(DaleCard_8.DaleCard.of(notif.args.card), this.myHand.control_name + '_item_' + card_id);
                    this.myHand.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    console.log("SKIP scheduling the technique: already done by client");
                    return;
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
                    throw new Error("Unable to cancel a technique. Technique card ".concat(card_id, " does not exist in the schedule."));
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
        Dale.prototype.notif_swapHandStall = function (notif) {
            console.log("swapHandStall");
            var stall = this.playerStalls[notif.args.stall_player_id];
            if (notif.args.player_id == this.player_id) {
                stall.swapWithStock(notif.args.stall_card_id, this.myHand, DaleCard_8.DaleCard.of(notif.args.card));
            }
            else {
                stall.swapWithOverallPlayerBoard(notif.args.stall_card_id, this.player_id, DaleCard_8.DaleCard.of(notif.args.card));
            }
        };
        Dale.prototype.notif_swapHandMarket = function (notif) {
            console.log("swapHandMarket");
            if (notif.args.player_id == this.player_id) {
                this.market.swapWithStock(notif.args.market_card_id, this.myHand, DaleCard_8.DaleCard.of(notif.args.card));
            }
            else {
                this.market.swapWithOverallPlayerBoard(notif.args.market_card_id, this.player_id, DaleCard_8.DaleCard.of(notif.args.card));
            }
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
            console.log("discardMultiple");
            console.log(notif.args);
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
            var _a;
            console.log("placeOnDeckMultiple");
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
            if (notif.args._private) {
                for (var _i = 0, _b = notif.args._private.card_ids; _i < _b.length; _i++) {
                    var id = _b[_i];
                    var card = notif.args._private.cards[id];
                    var deck = this.allDecks[(_a = notif.args.deck_player_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
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
        Dale.prototype.notif_marketDiscardToHand = function (notif) {
            console.log("notif_marketDiscardToHand");
            var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
            this.pileToPlayerStock(notif.args.card, this.marketDiscard, stock, notif.args.player_id);
            this.playerHandSizes[notif.args.player_id].incValue(1);
        };
        Dale.prototype.notif_discardToHand = function (notif) {
            var _a;
            console.log("notif_discardToHand");
            var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
            var discardPile = this.playerDiscards[(_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
            this.pileToPlayerStock(notif.args.card, discardPile, stock, notif.args.player_id);
            this.playerHandSizes[notif.args.player_id].incValue(1);
        };
        Dale.prototype.notif_discardToHandMultiple = function (notif) {
            var _a;
            console.log("notif_discardToHandMultiple");
            var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
            var discardPile = this.playerDiscards[(_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
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
            var deck = this.allDecks[(_a = notif.args.deck_player_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
            if (notif.args._private) {
                var card = notif.args._private.card;
                stock.addDaleCardToStock(DaleCard_8.DaleCard.of(card), deck.placeholderHTML);
                deck.pop();
            }
            else {
                deck.pop('overall_player_board_' + notif.args.player_id);
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
            var deck = this.allDecks[(_a = notif.args.deck_player_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
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
                    deck.pop('overall_player_board_' + notif.args.player_id);
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
        Dale.prototype.notif_wilyFellow = function (notif) {
            var discard = this.playerDiscards[notif.args.player_id];
            var deck = this.playerDecks[notif.args.player_id];
            var decksize = deck.size;
            var discardsize = discard.size;
            if (notif.args.card_ids.length != decksize) {
                this.showMessage(_("Wily Fellow detected that the client and server have different deck sizes. Please refresh."), 'error');
                return;
            }
            var newDiscardTop = decksize > 0 ? DaleCard_8.DaleCard.of(notif.args.cards[notif.args.card_ids[notif.args.card_ids.length - 1]]) : undefined;
            var newDeckTop = discard.peek(true);
            while (discard.size > 0) {
                discard.pop();
            }
            while (deck.size > 0) {
                deck.pop();
            }
            var numberOfAnimations = 0;
            var dataSwap = function () {
                if (numberOfAnimations > 0) {
                    numberOfAnimations -= 1;
                    return;
                }
                if (newDiscardTop) {
                    discard.pop();
                }
                if (newDeckTop) {
                    deck.pop();
                }
                for (var i = 0; i < discardsize; i++) {
                    deck.push(new DaleCard_8.DaleCard(0, 0));
                }
                for (var i = 0; i < decksize; i++) {
                    var card_id = notif.args.card_ids[i];
                    var card = DaleCard_8.DaleCard.of(notif.args.cards[card_id]);
                    discard.push(card);
                }
            };
            var duration = 400;
            if (newDiscardTop) {
                numberOfAnimations++;
                discard.push(newDiscardTop, deck.placeholderHTML, dataSwap, duration);
            }
            if (newDeckTop) {
                numberOfAnimations++;
                deck.push(newDeckTop, discard.placeholderHTML, dataSwap, duration);
            }
            dataSwap();
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
            var effect = new DbEffect_1.DbEffect(notif.args.effect);
            console.log(effect);
            DaleCard_8.DaleCard.addEffect(effect);
        };
        Dale.prototype.notif_expireEffects = function (notif) {
            console.log("notif_expireEffects");
            var effects = notif.args.effects.map(function (effect) { return new DbEffect_1.DbEffect(effect); });
            console.log(effects);
            DaleCard_8.DaleCard.expireEffects(effects);
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
                console.log(DaleCard_8.DaleCard.getLocalChameleonsJSON());
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
