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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
            icon.classList.add("daleofmerchants-icon");
            icon.setAttribute('style', "\n            background-size: ".concat(DaleIcons.COLUMNS, "00% ").concat(DaleIcons.ROWS, "00%;\n            background-position: -").concat(col, "00% -").concat(row, "00%;\n        "));
            return icon;
        };
        DaleIcons.getTravelingEquipmentTossIcon = function () {
            return this.getTossIcon();
        };
        DaleIcons.getTravelingEquipmentDiscardIcon = function () {
            return this.getBluePileIcon(0);
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
            var icon = this.getIcon(3, 1);
            icon.classList.add("daleofmerchants-build-icon");
            return icon;
        };
        DaleIcons.getDuplicateEntry = function () {
            return this.getIcon(3, 3);
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
        DaleIcons.getTossIcon = function () {
            return this.getIcon(4, 1);
        };
        DaleIcons.getCheeseIcon = function () {
            return this.getIcon(4, 2);
        };
        DaleIcons.getHistoryLessonIcon = function () {
            return this.getIcon(4, 3);
        };
        DaleIcons.getNaturalSurvivorIcon = function () {
            return this.getIcon(4, 4);
        };
        DaleIcons.getBluePileFullIcon = function () {
            return this.getIcon(4, 5);
        };
        DaleIcons.getNumberIcon = function (index) {
            return this.getIcon(5, index);
        };
        DaleIcons.getCostModificationIcon = function (index) {
            if (index >= 4) {
                throw new Error("CostModificationIcon " + index + " does not exist");
            }
            return this.getIcon(6, index);
        };
        DaleIcons.getCoinIcon = function () {
            return this.getIcon(6, 4);
        };
        DaleIcons.getCardIcon = function () {
            return this.getIcon(7, 0);
        };
        DaleIcons.getCards2Icon = function () {
            return this.getIcon(7, 1);
        };
        DaleIcons.getCards3Icon = function () {
            return this.getIcon(7, 2);
        };
        DaleIcons.getCometIcon = function () {
            return this.getIcon(7, 3);
        };
        DaleIcons.getPlanetIcon = function () {
            return this.getIcon(7, 4);
        };
        DaleIcons.getStarsIcon = function () {
            return this.getIcon(7, 5);
        };
        DaleIcons.getDawnIcon = function () {
            return this.getIcon(8, 0);
        };
        DaleIcons.getDayIcon = function () {
            return this.getIcon(8, 1);
        };
        DaleIcons.getNightIcon = function () {
            return this.getIcon(8, 2);
        };
        DaleIcons.getClockIcon = function () {
            return this.getIcon(8, 3);
        };
        DaleIcons.get3DDieOcelotIcon = function () {
            return this.getIcon(9, 0);
        };
        DaleIcons.get3DDiePolecatIcon = function () {
            return this.getIcon(9, 1);
        };
        DaleIcons.get3DDieHareIcon = function () {
            return this.getIcon(9, 2);
        };
        DaleIcons.get3DDiePangolin1Icon = function () {
            return this.getIcon(9, 3);
        };
        DaleIcons.get3DDiePangolin2Icon = function () {
            return this.getIcon(9, 4);
        };
        DaleIcons.getComplexityIcon = function () {
            return this.getIcon(10, 0);
        };
        DaleIcons.getInteractivityIcon = function () {
            return this.getIcon(10, 1);
        };
        DaleIcons.getNastinessIcon = function () {
            return this.getIcon(10, 2);
        };
        DaleIcons.getRandomnessIcon = function () {
            return this.getIcon(10, 3);
        };
        DaleIcons.getGameIcon = function () {
            return this.getIcon(10, 4);
        };
        DaleIcons.getResetFiltersDisabledIcon = function () {
            return this.getIcon(11, 0);
        };
        DaleIcons.getResetFiltersEnabledIcon = function () {
            return this.getIcon(11, 1);
        };
        DaleIcons.getWarningIcon = function () {
            return this.getIcon(11, 2);
        };
        DaleIcons.ROWS = 12;
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
                    throw new Error("Card with type id ".concat(card_type_id, " does not exist! (use setCardStyle instead)"));
                }
            }
            return style;
        };
        Images.setCardStyle = function (div, card_type_id) {
            dojo.setStyle(div, 'width', "".concat(Images.CARD_WIDTH_S, "px"));
            dojo.setStyle(div, 'height', "".concat(Images.CARD_HEIGHT_S, "px"));
            dojo.setStyle(div, 'background-size', "".concat(Images.IMAGES_PER_ROW, "00% ").concat(Images.IMAGES_PER_COLUMN, "00%"));
            if (card_type_id !== undefined) {
                if (card_type_id >= Images.first_mono_type_id) {
                    div.classList.add('daleofmerchants-card-sheet-mono');
                    card_type_id -= Images.first_mono_type_id;
                }
                var image_index = card_type_id % (Images.IMAGES_PER_ROW * Images.IMAGES_PER_COLUMN);
                var sheet_index = (card_type_id - image_index) / (Images.IMAGES_PER_ROW * Images.IMAGES_PER_COLUMN);
                if (image_index >= 0 && sheet_index >= 0 && sheet_index <= 4) {
                    var x = card_type_id % Images.IMAGES_PER_ROW;
                    var y = (card_type_id - x) / Images.IMAGES_PER_ROW;
                    dojo.setStyle(div, 'background-position', "-".concat(x, "00% -").concat(y, "00%"));
                    if (sheet_index > 0) {
                        div.classList.add('daleofmerchants-card-sheet-' + sheet_index);
                    }
                }
                else {
                    throw new Error("Card with type id ".concat(card_type_id, " does not exist!"));
                }
            }
        };
        Images.setCardStyleForDeckSelection = function (div, animalfolk_id) {
            Images.setCardStyle(div, animalfolk_id - 1);
            dojo.setStyle(div, 'background-size', "".concat(Images.DECK_SELECTION_IMAGES_PER_ROW, "00% ").concat(Images.DECK_SELECTION_IMAGES_PER_COLUMN, "00%"));
            dojo.setStyle(div, 'width', "".concat(Images.DECK_SELECTION_CARD_WIDTH_S, "px"));
            dojo.setStyle(div, 'height', "".concat(Images.DECK_SELECTION_CARD_HEIGHT_S, "px"));
        };
        Images.getPlaceholder = function () {
            var placeholder = document.createElement('div');
            placeholder.setAttribute('style', "width:".concat(Images.CARD_WIDTH_S, "px; height:").concat(Images.CARD_HEIGHT_S, "px;"));
            placeholder.classList.add("daleofmerchants-placeholder");
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
        Images.S_SCALE = 0.27;
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
        Images.DECK_SELECTION_S_SCALE = 0.22;
        Images.DECK_SELECTION_IMAGES_PER_ROW = 6;
        Images.DECK_SELECTION_IMAGES_PER_COLUMN = 7;
        Images.DECK_SELECTION_CARD_WIDTH = 661;
        Images.DECK_SELECTION_CARD_HEIGHT = 787;
        Images.DECK_SELECTION_CARD_WIDTH_S = Math.round(Images.DECK_SELECTION_CARD_WIDTH * Images.DECK_SELECTION_S_SCALE);
        Images.DECK_SELECTION_CARD_HEIGHT_S = Math.round(Images.DECK_SELECTION_CARD_HEIGHT * Images.DECK_SELECTION_S_SCALE);
        Images.first_mono_type_id = Infinity;
        return Images;
    }());
    exports.Images = Images;
});
define("components/types/DaleTrigger", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("components/SelectionIconType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/AbstractOrderedSelection", ["require", "exports", "components/DaleIcons"], function (require, exports, DaleIcons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractOrderedSelection = void 0;
    var AbstractOrderedSelection = (function () {
        function AbstractOrderedSelection() {
            this.card_ids = [];
            this.secondary_card_ids = [];
            this.maxSize = Number.POSITIVE_INFINITY;
            this.secondaryMaxSize = Number.POSITIVE_INFINITY;
        }
        AbstractOrderedSelection.prototype.onSelect = function (card_id, secondary) {
            console.warn("onSelect(card_id=".concat(card_id, ", secondary=").concat(secondary, ")"));
        };
        AbstractOrderedSelection.prototype.onUnselect = function (card_id, secondary) {
            console.warn("onUnselect(card_id=".concat(card_id, ", secondary=").concat(secondary, ")"));
        };
        AbstractOrderedSelection.prototype.addIcon = function (card_id, index, secondary) {
            var iconType = secondary ? this.secondaryIconType : this.iconType;
            var div = this.getDiv(card_id);
            if (!div) {
                console.warn("addIcon skipped, card is not on screen (likely because it is inside a pile)");
                return;
            }
            div.classList.add("daleofmerchants-selected");
            var icon = undefined;
            switch (iconType) {
                case 'pileBlue':
                    icon = DaleIcons_1.DaleIcons.getBluePileIcon(Math.min(index, 5));
                    break;
                case 'pileYellow':
                    icon = DaleIcons_1.DaleIcons.getYellowPileIcon(Math.min(index, 5));
                    break;
                case 'pileRed':
                    icon = DaleIcons_1.DaleIcons.getRedPileIcon(Math.min(index, 5));
                    break;
                case 'toss':
                    icon = DaleIcons_1.DaleIcons.getTossIcon();
                    break;
                case 'build':
                    icon = DaleIcons_1.DaleIcons.getBuildIcon();
                    break;
                case 'spyglass':
                    icon = (index == 0) ? DaleIcons_1.DaleIcons.getSpyglassIcon() : DaleIcons_1.DaleIcons.getBluePileIcon(Math.min(index - 1, 5));
                    break;
                case 'cheese':
                    icon = (index == 0) ? DaleIcons_1.DaleIcons.getCheeseIcon() : DaleIcons_1.DaleIcons.getBluePileIcon(Math.min(index - 1, 5));
                    break;
                case 'numbers':
                    icon = DaleIcons_1.DaleIcons.getNumberIcon(Math.min(index, 4));
                    break;
                case 'hand':
                    icon = DaleIcons_1.DaleIcons.getHandIcon();
                    break;
                case 'naturalSurvivor':
                    icon = DaleIcons_1.DaleIcons.getNaturalSurvivorIcon();
                    break;
                case 'duplicateEntry':
                    icon = DaleIcons_1.DaleIcons.getDuplicateEntry();
                    break;
                case 'historyLesson':
                    icon = DaleIcons_1.DaleIcons.getHistoryLessonIcon();
                    break;
                case 'resourcefulAlly':
                    icon = DaleIcons_1.DaleIcons.getBluePileIcon(Math.max(4 - index, 0));
                    break;
                case 'travelingEquipment':
                    icon = index == 0 ? DaleIcons_1.DaleIcons.getTravelingEquipmentTossIcon() : DaleIcons_1.DaleIcons.getTravelingEquipmentDiscardIcon();
                    break;
                case 'selectingContracts':
                    icon = (index == 0) ? DaleIcons_1.DaleIcons.getTossIcon() : DaleIcons_1.DaleIcons.getBluePileIcon(Math.min(index - 1, 5));
                    break;
            }
            if (icon) {
                if (secondary) {
                    icon.classList.add("daleofmerchants-selection-icon-2");
                }
                else {
                    icon.classList.add("daleofmerchants-selection-icon-1");
                }
                div.prepend(icon);
            }
        };
        AbstractOrderedSelection.prototype.removeIcon = function (card_id, secondary) {
            var div = this.getDiv(card_id);
            if (!div) {
                console.warn("removeIcon skipped, no icon on screen (likely because it is inside a pile)");
                return;
            }
            var primaryIcon = div === null || div === void 0 ? void 0 : div.querySelector(".daleofmerchants-selection-icon-1");
            var secondaryIcon = div === null || div === void 0 ? void 0 : div.querySelector(".daleofmerchants-selection-icon-2");
            if (secondary) {
                secondaryIcon === null || secondaryIcon === void 0 ? void 0 : secondaryIcon.remove();
                if (!primaryIcon) {
                    div === null || div === void 0 ? void 0 : div.classList.remove("daleofmerchants-selected");
                }
            }
            else {
                primaryIcon === null || primaryIcon === void 0 ? void 0 : primaryIcon.remove();
                if (!secondaryIcon) {
                    div === null || div === void 0 ? void 0 : div.classList.remove("daleofmerchants-selected");
                }
            }
        };
        AbstractOrderedSelection.prototype.setMaxSize = function (max, secondary) {
            console.warn("setMaxSize: " + max);
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
        AbstractOrderedSelection.prototype.getMaxSize = function (secondary) {
            if (secondary) {
                return this.secondaryMaxSize;
            }
            return this.maxSize;
        };
        AbstractOrderedSelection.prototype.getSize = function (secondary) {
            if (secondary) {
                return this.secondary_card_ids.length;
            }
            return this.card_ids.length;
        };
        AbstractOrderedSelection.prototype.dequeue = function (secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            var card_id = card_ids[0];
            if (card_id === undefined) {
                return null;
            }
            this.unselectItem(card_id, secondary);
            return card_id;
        };
        AbstractOrderedSelection.prototype.pop = function (secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            var card_id = card_ids[card_ids.length - 1];
            if (card_id === undefined) {
                return null;
            }
            this.unselectItem(card_id, secondary);
            return card_id;
        };
        AbstractOrderedSelection.prototype.selectItem = function (card_id, secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            var maxSize = secondary ? this.secondaryMaxSize : this.maxSize;
            if (maxSize == 0) {
                return;
            }
            if (card_ids.includes(card_id)) {
                return;
            }
            while (card_ids.length >= maxSize) {
                this.pop(secondary);
            }
            card_ids.push(card_id);
            this.addIcon(card_id, card_ids.length - 1, secondary);
            this.onSelect(card_id, secondary);
        };
        AbstractOrderedSelection.prototype.unselectItem = function (card_id, secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            var index = card_ids.indexOf(card_id);
            if (index != -1) {
                card_ids.splice(index, 1);
                this.removeIcon(card_id, secondary);
                this.onUnselect(card_id, secondary);
            }
        };
        AbstractOrderedSelection.prototype.unselectAll = function (secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            while (card_ids.length > 0) {
                this.unselectItem(card_ids[card_ids.length - 1], secondary);
            }
        };
        AbstractOrderedSelection.prototype.setIconType = function (iconType, secondaryIconType) {
            this.iconType = iconType;
            this.secondaryIconType = secondaryIconType;
        };
        AbstractOrderedSelection.prototype.updateIcons = function (secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            var iconType = secondary ? this.secondaryIconType : this.iconType;
            if (iconType) {
                for (var i = 0; i < card_ids.length; i++) {
                    var card_id = card_ids[i];
                    this.removeIcon(card_id, secondary);
                    this.addIcon(card_id, i, secondary);
                }
            }
        };
        AbstractOrderedSelection.prototype.toggle = function (card_id, secondary) {
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
        AbstractOrderedSelection.prototype.includes = function (card_id, secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            return card_ids.includes(card_id);
        };
        AbstractOrderedSelection.prototype.get = function (secondary) {
            var card_ids = secondary ? this.secondary_card_ids : this.card_ids;
            return card_ids.slice().reverse();
        };
        AbstractOrderedSelection.prototype.secondaryToPrimary = function () {
            this.unselectAll();
            this.iconType = this.secondaryIconType;
            this.maxSize = this.secondaryMaxSize;
            for (var _i = 0, _a = this.secondary_card_ids.slice(); _i < _a.length; _i++) {
                var card_id = _a[_i];
                this.unselectItem(card_id, true);
                this.selectItem(card_id);
            }
        };
        return AbstractOrderedSelection;
    }());
    exports.AbstractOrderedSelection = AbstractOrderedSelection;
});
define("components/types/AnimalfolkDetails", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnimalfolkDetails = void 0;
    var AnimalfolkDetails = (function () {
        function AnimalfolkDetails() {
        }
        AnimalfolkDetails.getColumnIndex = function (categoryName) {
            switch (categoryName) {
                case 'complexity':
                    return AnimalfolkDetails.COMPLEXITY;
                case 'interactivity':
                    return AnimalfolkDetails.INTERACTIVITY;
                case 'nastiness':
                    return AnimalfolkDetails.NASTINESS;
                case 'randomness':
                    return AnimalfolkDetails.RANDOMNESS;
                case 'game':
                    return AnimalfolkDetails.GAME;
                default:
                    throw new Error("Category '".concat(categoryName, "' is not a valid AnimalfolkDetails category"));
            }
        };
        AnimalfolkDetails.get = function (animalfolk_id, column) {
            var row = AnimalfolkDetails.table[animalfolk_id - 1];
            if (!row) {
                throw new Error("AnimalfolkDetails is missing a values for animalfolk_id = ".concat(animalfolk_id));
            }
            return row[column];
        };
        AnimalfolkDetails.COMPLEXITY = 1;
        AnimalfolkDetails.INTERACTIVITY = 2;
        AnimalfolkDetails.NASTINESS = 3;
        AnimalfolkDetails.RANDOMNESS = 4;
        AnimalfolkDetails.GAME = 5;
        AnimalfolkDetails.table = [
            [1, 1, 1, 0, 1, 1],
            [2, 1, 2, 0, 1, 1],
            [3, 1, 3, 3, 2, 1],
            [4, 1, 2, 0, 1, 1],
            [5, 2, 3, 2, 3, 1],
            [6, 3, 2, 0, 1, 1],
            [7, 1, 1, 0, 1, 2],
            [8, 2, 1, 0, 1, 2],
            [9, 2, 3, 3, 1, 2],
            [10, 3, 3, 2, 2, 2],
            [11, 1, 2, 0, 3, 2],
            [12, 3, 3, 0, 1, 2],
            [13, 3, 1, 0, 1, 5],
            [14, 1, 1, 0, 1, 3],
            [15, 1, 1, 0, 2, 3],
            [16, 3, 3, 3, 2, 3],
            [17, 2, 3, 1, 2, 3],
            [18, 2, 1, 0, 3, 3],
            [19, 2, 1, 0, 1, 3],
            [20, 2, 1, 0, 1, 4],
            [21, 2, 1, 0, 1, 4],
            [22, 3, 1, 0, 1, 4],
            [23, 2, 3, 1, 2, 6],
            [24, 3, 3, 3, 3, 5],
            [25, 1, 2, 1, 1, 5],
            [26, 3, 1, 0, 1, 6],
            [27, 3, 3, 3, 2, 6],
            [28, 2, 1, 0, 2, 5],
            [29, 2, 1, 0, 1, 4],
            [30, 2, 3, 3, 1, 4],
            [31, 2, 3, 2, 2, 4],
            [32, 2, 1, 0, 1, 5],
            [33, 3, 1, 0, 1, 5],
            [34, 1, 1, 0, 1, 6],
            [35, 2, 1, 0, 1, 6],
            [36, 1, 1, 0, 1, 6]
        ];
        return AnimalfolkDetails;
    }());
    exports.AnimalfolkDetails = AnimalfolkDetails;
});
define("components/DaleDeckSelection", ["require", "exports", "components/DaleIcons", "components/Images", "components/AbstractOrderedSelection", "components/types/AnimalfolkDetails"], function (require, exports, DaleIcons_2, Images_1, AbstractOrderedSelection_1, AnimalfolkDetails_1) {
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
    }(AbstractOrderedSelection_1.AbstractOrderedSelection));
    var DaleDeckSelection = (function () {
        function DaleDeckSelection(page, deckSelectionHTML, gameHTML, inDeckSelection) {
            this.orderedSelection = new OrderedDeckSelection();
            this.card_divs = new Map();
            this.filterBlacklists = new Map([
                [AnimalfolkDetails_1.AnimalfolkDetails.COMPLEXITY, []],
                [AnimalfolkDetails_1.AnimalfolkDetails.INTERACTIVITY, []],
                [AnimalfolkDetails_1.AnimalfolkDetails.NASTINESS, []],
                [AnimalfolkDetails_1.AnimalfolkDetails.RANDOMNESS, []],
                [AnimalfolkDetails_1.AnimalfolkDetails.GAME, []]
            ]);
            this.tooltips = [];
            this.deckSelectionHTML = deckSelectionHTML;
            this.gameHTML = gameHTML;
            this.filterContainer = this.deckSelectionHTML.querySelector(".daleofmerchants-filters");
            this.resetFiltersButton = this.filterContainer.querySelector(".reset-filters");
            this.cardContainer = this.deckSelectionHTML.querySelector(".daleofmerchants-deck-selection-container");
            this.cardContainer.classList.add("daleofmerchants-wrap-technique");
            if (!inDeckSelection) {
                this.deckSelectionHTML.classList.add("daleofmerchants-hidden");
                return;
            }
            this.gameHTML.classList.add("daleofmerchants-hidden");
            var n = Math.max(2, Object.values(page.gamedatas.players).length);
            this.orderedSelection.setIconType('numbers');
            this.orderedSelection.setMaxSize(n + 1);
            var _loop_1 = function (animalfolk_id) {
                var card_div = document.createElement('div');
                card_div.id = "deck-" + animalfolk_id;
                card_div.classList.add("daleofmerchants-card", "daleofmerchants-relative", "daleofmerchants-clickable", "daleofmerchants-deck-selection");
                this_1.cardContainer.appendChild(card_div);
                Images_1.Images.setCardStyleForDeckSelection(card_div, animalfolk_id);
                this_1.card_divs.set(animalfolk_id, card_div);
                var tooltip = new dijit.Tooltip({
                    connectId: [card_div.id],
                    label: this_1.getTooltipContent(animalfolk_id),
                    showDelay: 400,
                });
                dojo.connect(card_div, "mouseleave", function () {
                    tooltip.close();
                });
                this_1.tooltips.push(tooltip);
                var unavailable = page.gamedatas.disabledAnimalfolkIds.includes(animalfolk_id);
                if (unavailable) {
                    card_div.classList.add("daleofmerchants-deck-selection-unavailable");
                }
                var thiz = this_1;
                var card_id = animalfolk_id;
                card_div.addEventListener('click', function () {
                    if (unavailable) {
                        page.showMessage(_("This animalfolk is unavailable"), 'error');
                        return;
                    }
                    if (page.isCurrentPlayerActive()) {
                        thiz.orderedSelection.toggle(card_id);
                    }
                });
            };
            var this_1 = this;
            for (var animalfolk_id = DaleDeckSelection.ANIMALFOLK_MACAWS; animalfolk_id <= DaleDeckSelection.ANIMALFOLK_UNKNOWN; animalfolk_id++) {
                _loop_1(animalfolk_id);
            }
            for (var _i = 0, _a = page.gamedatas.disabledAnimalfolkIds; _i < _a.length; _i++) {
                var disabled_animalfolk_id = _a[_i];
                console.log("deck-" + disabled_animalfolk_id);
                this.cardContainer.appendChild($("deck-" + disabled_animalfolk_id));
            }
            this.setupFilters();
        }
        DaleDeckSelection.prototype.getTooltipContent = function (animalfolk_id) {
            return "TODO: TOOLTIP";
        };
        DaleDeckSelection.prototype.remove = function () {
            this.filterContainer.remove();
            this.cardContainer.remove();
            for (var _i = 0, _a = this.tooltips; _i < _a.length; _i++) {
                var tooltip = _a[_i];
                tooltip.destroy();
            }
            this.gameHTML.classList.remove("daleofmerchants-hidden");
        };
        DaleDeckSelection.prototype.setResult = function (animalfolk_id) {
            if (this.cardContainer.classList.contains("daleofmerchants-wrap-technique")) {
                this.cardContainer.classList.remove("daleofmerchants-wrap-technique");
                this.cardContainer.classList.add("daleofmerchants-wrap-purchase");
                this.orderedSelection.unselectAll();
                this.orderedSelection.setIconType(undefined);
                this.cardContainer.querySelectorAll(".daleofmerchants-deck-selection").forEach(function (card_div) {
                    card_div.classList.add("daleofmerchants-deck-selection-unavailable");
                    card_div.classList.add("daleofmerchants-hidden");
                });
            }
            var card_div = this.card_divs.get(animalfolk_id);
            if (card_div) {
                card_div.classList.remove("daleofmerchants-deck-selection-unavailable");
                if (card_div.classList.contains("daleofmerchants-hidden")) {
                    card_div.classList.remove("daleofmerchants-hidden");
                    this.cardContainer.append(card_div);
                }
            }
            this.orderedSelection.selectItem(animalfolk_id);
        };
        DaleDeckSelection.prototype.setupFilters = function () {
            var _this = this;
            var _a;
            var icons = [
                ["daleofmerchants-filter-title-reset-filters", DaleIcons_2.DaleIcons.getResetFiltersDisabledIcon()],
                ["daleofmerchants-filter-title-complexity", DaleIcons_2.DaleIcons.getComplexityIcon()],
                ["daleofmerchants-filter-title-interactivity", DaleIcons_2.DaleIcons.getInteractivityIcon()],
                ["daleofmerchants-filter-title-nastiness", DaleIcons_2.DaleIcons.getNastinessIcon()],
                ["daleofmerchants-filter-title-randomness", DaleIcons_2.DaleIcons.getRandomnessIcon()],
                ["daleofmerchants-filter-title-game", DaleIcons_2.DaleIcons.getGameIcon()]
            ];
            for (var _i = 0, icons_1 = icons; _i < icons_1.length; _i++) {
                var _b = icons_1[_i], html_id = _b[0], icon = _b[1];
                $(html_id).insertAdjacentHTML('afterbegin', "<span class=\"daleofmerchants-log-span\">".concat(icon.outerHTML, "</span>"));
            }
            var warningIcon = DaleIcons_2.DaleIcons.getWarningIcon();
            this.filterContainer.querySelectorAll(".daleofmerchants-warning").forEach(function (elem) {
                elem.insertAdjacentHTML('afterbegin', "<span class=\"daleofmerchants-log-span\">".concat(warningIcon.outerHTML, "</span>"));
            });
            this.filterContainer.querySelectorAll(".toggle").forEach(function (toggle) {
                var _a, _b, _c;
                var rawData = (_a = toggle.dataset['filter']) !== null && _a !== void 0 ? _a : "";
                if (!rawData.includes(":")) {
                    console.error(toggle);
                    console.error("The toggle was expected to hold 'data-filter' of format 'category: value'");
                    return;
                }
                var _d = rawData.split(":").map(function (s) { return s.trim(); }), categoryName = _d[0], rawValue = _d[1];
                var value = +rawValue;
                var warningElement = (_c = (_b = toggle.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector(".daleofmerchants-warning");
                toggle.addEventListener("click", function () {
                    var _a;
                    var columnIndex = AnimalfolkDetails_1.AnimalfolkDetails.getColumnIndex(categoryName);
                    var blacklist = _this.filterBlacklists.get(columnIndex);
                    var valueIndex = blacklist.indexOf(value);
                    if (valueIndex !== -1) {
                        blacklist.splice(valueIndex, 1);
                        toggle.classList.add("chosen");
                        warningElement === null || warningElement === void 0 ? void 0 : warningElement.classList.add("daleofmerchants-hidden");
                    }
                    else {
                        blacklist.push(value);
                        toggle.classList.remove("chosen");
                        if (!((_a = toggle.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".chosen"))) {
                            warningElement === null || warningElement === void 0 ? void 0 : warningElement.classList.remove("daleofmerchants-hidden");
                        }
                    }
                    _this.updateResetFiltersButton();
                    _this.updateFilters();
                });
            });
            this.resetFiltersButton.addEventListener("click", function () {
                _this.resetFilters();
            });
            (_a = this.filterContainer.querySelector("h2")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                _this.filterContainer.classList.toggle("daleofmerchants-collapsed");
            });
        };
        DaleDeckSelection.prototype.resetFilters = function () {
            this.filterContainer.querySelectorAll(".toggle").forEach(function (toggle) {
                if (!toggle.classList.contains("chosen")) {
                    toggle.click();
                }
            });
        };
        DaleDeckSelection.prototype.updateResetFiltersButton = function () {
            var hasActiveFilter = Array.from(this.filterBlacklists.values()).some(function (blacklist) { return blacklist.length > 0; });
            this.resetFiltersButton.classList.toggle("active", hasActiveFilter);
            var prevIcon = this.resetFiltersButton.querySelector(".daleofmerchants-icon");
            if (prevIcon) {
                var newIcon = hasActiveFilter ? DaleIcons_2.DaleIcons.getResetFiltersEnabledIcon() : DaleIcons_2.DaleIcons.getResetFiltersDisabledIcon();
                prevIcon.insertAdjacentHTML('beforebegin', "<span class=\"daleofmerchants-log-span\">".concat(newIcon.outerHTML, "</span>"));
                prevIcon.remove();
            }
        };
        DaleDeckSelection.prototype.updateFilters = function () {
            var _a;
            var _loop_2 = function (animalfolk_id) {
                var isHidden = false;
                this_2.filterBlacklists.forEach(function (blacklist, category) {
                    if (blacklist.includes(AnimalfolkDetails_1.AnimalfolkDetails.get(animalfolk_id, category))) {
                        isHidden = true;
                    }
                });
                (_a = this_2.card_divs.get(animalfolk_id)) === null || _a === void 0 ? void 0 : _a.classList.toggle("daleofmerchants-hidden", isHidden);
            };
            var this_2 = this;
            for (var animalfolk_id = DaleDeckSelection.ANIMALFOLK_MACAWS; animalfolk_id <= DaleDeckSelection.ANIMALFOLK_UNKNOWN; animalfolk_id++) {
                _loop_2(animalfolk_id);
            }
        };
        DaleDeckSelection.ANIMALFOLK_NONE = 0;
        DaleDeckSelection.ANIMALFOLK_MACAWS = 1;
        DaleDeckSelection.ANIMALFOLK_PANDAS = 2;
        DaleDeckSelection.ANIMALFOLK_RACCOONS = 3;
        DaleDeckSelection.ANIMALFOLK_SQUIRRELS = 4;
        DaleDeckSelection.ANIMALFOLK_OCELOTS = 5;
        DaleDeckSelection.ANIMALFOLK_CHAMELEONS = 6;
        DaleDeckSelection.ANIMALFOLK_PLATYPUSES = 7;
        DaleDeckSelection.ANIMALFOLK_SLOTHS = 8;
        DaleDeckSelection.ANIMALFOLK_CROCODILES = 9;
        DaleDeckSelection.ANIMALFOLK_FOXES = 10;
        DaleDeckSelection.ANIMALFOLK_POLECATS = 11;
        DaleDeckSelection.ANIMALFOLK_OWLS = 12;
        DaleDeckSelection.ANIMALFOLK_BEAVERS = 13;
        DaleDeckSelection.ANIMALFOLK_DESERTMONITORS = 14;
        DaleDeckSelection.ANIMALFOLK_LEMURS = 15;
        DaleDeckSelection.ANIMALFOLK_MAGPIES = 16;
        DaleDeckSelection.ANIMALFOLK_ECHIDNAS = 17;
        DaleDeckSelection.ANIMALFOLK_HARES = 18;
        DaleDeckSelection.ANIMALFOLK_TREEKANGAROOS = 19;
        DaleDeckSelection.ANIMALFOLK_PENGUINS = 20;
        DaleDeckSelection.ANIMALFOLK_TUATARAS = 21;
        DaleDeckSelection.ANIMALFOLK_WOODTURTLES = 22;
        DaleDeckSelection.ANIMALFOLK_TASMANIANDEVILS = 23;
        DaleDeckSelection.ANIMALFOLK_PANGOLINS = 24;
        DaleDeckSelection.ANIMALFOLK_GULLS = 25;
        DaleDeckSelection.ANIMALFOLK_MONGOOSES = 26;
        DaleDeckSelection.ANIMALFOLK_BATS = 27;
        DaleDeckSelection.ANIMALFOLK_SNOWMACAQUES = 28;
        DaleDeckSelection.ANIMALFOLK_DODOS = 29;
        DaleDeckSelection.ANIMALFOLK_CAPUCHINMONKIES = 30;
        DaleDeckSelection.ANIMALFOLK_MARKETMANIPULATION = 31;
        DaleDeckSelection.ANIMALFOLK_ENDOFTURN = 32;
        DaleDeckSelection.ANIMALFOLK_REPEAT = 33;
        DaleDeckSelection.ANIMALFOLK_GORILLA = 34;
        DaleDeckSelection.ANIMALFOLK_MORNING = 35;
        DaleDeckSelection.ANIMALFOLK_UNKNOWN = 36;
        return DaleDeckSelection;
    }());
    exports.DaleDeckSelection = DaleDeckSelection;
});
define("components/DaleDie", ["require", "exports", "components/DaleDeckSelection", "components/DaleIcons"], function (require, exports, DaleDeckSelection_1, DaleIcons_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleDie = void 0;
    var DaleDie = (function () {
        function DaleDie(animalfolk_id, d6, name_displayed, parentHTML) {
            var _this = this;
            var _a;
            switch (animalfolk_id) {
                case DaleDeckSelection_1.DaleDeckSelection.ANIMALFOLK_OCELOTS:
                    this.type = 'ocelot';
                    break;
                case DaleDeckSelection_1.DaleDeckSelection.ANIMALFOLK_POLECATS:
                    this.type = 'polecat';
                    break;
                case DaleDeckSelection_1.DaleDeckSelection.ANIMALFOLK_HARES:
                    this.type = 'hare';
                    break;
                case DaleDeckSelection_1.DaleDeckSelection.ANIMALFOLK_PANGOLINS:
                    this.type = 'pangolin1';
                    break;
                case DaleDeckSelection_1.DaleDeckSelection.ANIMALFOLK_PANGOLINS + 1:
                    this.type = 'pangolin2';
                    break;
                default:
                    throw new Error("Animalfolk ".concat(animalfolk_id, " has no die"));
            }
            this.parent = parentHTML;
            this.container = document.createElement('div');
            this.container.classList.add("daleofmerchants-die-container");
            this.container.dataset['die_type'] = this.type;
            this.container.innerHTML = "\n            <div class=\"daleofmerchants-die\" type=\"".concat(this.type, "\" side=\"1\">\n                <div class=\"daleofmerchants-die-side daleofmerchants-die-side-1\"></div>\n                <div class=\"daleofmerchants-die-side daleofmerchants-die-side-2\"></div>\n                <div class=\"daleofmerchants-die-side daleofmerchants-die-side-3\"></div>\n                <div class=\"daleofmerchants-die-side daleofmerchants-die-side-4\"></div>\n                <div class=\"daleofmerchants-die-side daleofmerchants-die-side-5\"></div>\n                <div class=\"daleofmerchants-die-side daleofmerchants-die-side-6\"></div>\n            </div>\n            <div class=\"daleofmerchants-die-result\"></div>\n        ");
            this.parent.appendChild(this.container);
            this.die = this.container.querySelector(".daleofmerchants-die");
            this.die.setAttribute('side', String(Math.floor(Math.random() * 6) + 1));
            setTimeout((function () {
                _this.die.setAttribute('side', String(d6 + 1));
                _this.die.classList.toggle('daleofmerchants-roll');
            }).bind(this), 1);
            var resultLabel = (_a = this.die.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.daleofmerchants-die-result');
            if (resultLabel) {
                resultLabel.classList.remove('daleofmerchants-die-reveal');
                resultLabel.classList.add('daleofmerchants-die-hide');
                if (this.type != 'pangolin1' && this.type != 'pangolin2') {
                    resultLabel.innerHTML = "Rolled ".concat(name_displayed);
                }
                else {
                    resultLabel.innerHTML = name_displayed;
                }
                setTimeout(function () {
                    resultLabel.classList.add('daleofmerchants-die-reveal');
                    resultLabel.classList.remove('daleofmerchants-die-hide');
                }, 1000);
            }
            if (this.type != 'pangolin1' && this.type != 'pangolin2') {
                var thiz_1 = this;
                setTimeout((function () {
                    dojo.fadeOut({ node: thiz_1.container, onEnd: function (node) { dojo.destroy(node); } }).play();
                }), 1500);
            }
        }
        DaleDie.getIconTpl = function (die_icon) {
            var col, row;
            switch (die_icon) {
                case DaleDie.DIE_OCELOT_0:
                    row = 0;
                    col = 0;
                    break;
                case DaleDie.DIE_OCELOT_1:
                    row = 0;
                    col = 1;
                    break;
                case DaleDie.DIE_OCELOT_2:
                    row = 0;
                    col = 3;
                    break;
                case DaleDie.DIE_OCELOT_3:
                    row = 0;
                    col = 5;
                    break;
                case DaleDie.DIE_POLECAT_1:
                    row = 1;
                    col = 0;
                    break;
                case DaleDie.DIE_POLECAT_2:
                    row = 1;
                    col = 2;
                    break;
                case DaleDie.DIE_POLECAT_3:
                    row = 1;
                    col = 4;
                    break;
                case DaleDie.DIE_STARS:
                    row = 2;
                    col = 0;
                    break;
                case DaleDie.DIE_PLANET:
                    row = 2;
                    col = 2;
                    break;
                case DaleDie.DIE_COMET:
                    row = 2;
                    col = 5;
                    break;
                case DaleDie.DIE_DISCARD:
                    row = 3;
                    col = 0;
                    break;
                case DaleDie.DIE_DECK:
                    row = 3;
                    col = 2;
                    break;
                case DaleDie.DIE_HAND:
                    row = 3;
                    col = 5;
                    break;
                case DaleDie.DIE_DISCARD2:
                    row = 4;
                    col = 0;
                    break;
                case DaleDie.DIE_DECK2:
                    row = 4;
                    col = 2;
                    break;
                case DaleDie.DIE_HAND2:
                    row = 4;
                    col = 5;
                    break;
            }
            return "<i class=\"daleofmerchants-die-side daleofmerchants-icon\" style=\"background-position: -".concat(col, "00% -").concat(row, "00%;\"></i>");
        };
        DaleDie.getAllFacesTpl = function (die) {
            switch (die) {
                case 'ocelot':
                    return "<span class=\"daleofmerchants-log-span\">\n                    ".concat(DaleDie.getIconTpl(DaleDie.DIE_OCELOT_0), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_OCELOT_1), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_OCELOT_2), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_OCELOT_2), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_OCELOT_3), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_OCELOT_3), "\n                </span>");
                case 'polecat':
                    return "<span class=\"daleofmerchants-log-span\">\n                    ".concat(DaleDie.getIconTpl(DaleDie.DIE_POLECAT_1), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_POLECAT_1), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_POLECAT_2), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_POLECAT_2), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_POLECAT_3), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_POLECAT_3), "\n                </span>");
                case 'hare':
                    return "<span class=\"daleofmerchants-log-span\">\n                    ".concat(DaleDie.getIconTpl(DaleDie.DIE_STARS), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_STARS), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_PLANET), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_PLANET), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_PLANET), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_COMET), "\n                </span>");
                case 'pangolin1':
                    return "<span class=\"daleofmerchants-log-span\">\n                    ".concat(DaleDie.getIconTpl(DaleDie.DIE_DISCARD), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_DISCARD), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_DECK), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_DECK), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_DECK), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_HAND), "\n                </span>");
                case 'pangolin2':
                    return "<span class=\"daleofmerchants-log-span\">\n                    ".concat(DaleDie.getIconTpl(DaleDie.DIE_DISCARD2), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_DISCARD2), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_DECK2), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_DECK2), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_DECK2), "\n                    ").concat(DaleDie.getIconTpl(DaleDie.DIE_HAND2), "\n                </span>");
            }
        };
        DaleDie.get3DDieTpl = function (die) {
            switch (die) {
                case 'ocelot':
                    return "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_3.DaleIcons.get3DDieOcelotIcon().outerHTML, "</span>");
                case 'polecat':
                    return "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_3.DaleIcons.get3DDiePolecatIcon().outerHTML, "</span>");
                case 'hare':
                    return "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_3.DaleIcons.get3DDieHareIcon().outerHTML, "</span>");
                case 'pangolin1':
                    return "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_3.DaleIcons.get3DDiePangolin1Icon().outerHTML, "</span>");
                case 'pangolin2':
                    return "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_3.DaleIcons.get3DDiePangolin2Icon().outerHTML, "</span>");
            }
        };
        DaleDie.DIE_OCELOT_0 = 1;
        DaleDie.DIE_OCELOT_1 = 2;
        DaleDie.DIE_OCELOT_2 = 3;
        DaleDie.DIE_OCELOT_3 = 4;
        DaleDie.DIE_POLECAT_1 = 5;
        DaleDie.DIE_POLECAT_2 = 6;
        DaleDie.DIE_POLECAT_3 = 7;
        DaleDie.DIE_STARS = 8;
        DaleDie.DIE_PLANET = 9;
        DaleDie.DIE_COMET = 10;
        DaleDie.DIE_DISCARD = 11;
        DaleDie.DIE_DECK = 12;
        DaleDie.DIE_HAND = 13;
        DaleDie.DIE_DISCARD2 = 14;
        DaleDie.DIE_DECK2 = 15;
        DaleDie.DIE_HAND2 = 16;
        return DaleDie;
    }());
    exports.DaleDie = DaleDie;
});
define("components/PlayerClock", ["require", "exports", "components/DaleIcons"], function (require, exports, DaleIcons_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerClock = void 0;
    var PlayerClock = (function () {
        function PlayerClock(page, player_id) {
            this.player_id = 0;
            this.position = 0;
            this.page = page;
            this.player_id = player_id;
            this.wrap = $('daleofmerchants-clock-wrap-' + player_id);
            this.label = $('daleofmerchants-clock-label-' + player_id);
            this.advanceClock(page.gamedatas.players[player_id].clock);
        }
        PlayerClock.prototype.advanceClock = function (steps) {
            var prevPostion = this.position;
            var newPosition = Math.max(PlayerClock.CLOCK_DAWN, Math.min(PlayerClock.CLOCK_NIGHT, prevPostion + steps));
            this.setClock(newPosition);
        };
        PlayerClock.prototype.getClock = function () {
            return this.position;
        };
        PlayerClock.prototype.setClock = function (newPosition) {
            var _a;
            this.position = newPosition;
            this.wrap.dataset['clock'] = this.position.toString();
            (_a = this.icon) === null || _a === void 0 ? void 0 : _a.remove();
            this.icon = PlayerClock.getClockIcon(this.position);
            this.icon.id = 'daleofmerchants-clock-icon-' + this.player_id;
            this.wrap.prepend(this.icon);
            this.page.addTooltip('daleofmerchants-clock-icon-' + this.player_id, PlayerClock.getClockTooltip(this.position), '');
            this.label.innerText = PlayerClock.getClockLabel(this.position);
        };
        PlayerClock.getClockTooltip = function (position) {
            var content = "";
            switch (position) {
                case PlayerClock.CLOCK_DAWN:
                    content += _("It is DAWN time. After playing a technique, move your clock to DAY time.");
                    break;
                case PlayerClock.CLOCK_DAY:
                    content += _("It is DAY time. After playing a technique, move your clock to NIGHT time.");
                    break;
                case PlayerClock.CLOCK_NIGHT:
                    content += _("It is NIGHT time. At the start of your next turn, your clock resets to DAWN time.");
                    break;
                default:
                    throw new Error("Invalid clock position " + position);
            }
            return content.replace('DAWN', "dawn (<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getDawnIcon().outerHTML, "</span>)"))
                .replace('DAY', "day (<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getDayIcon().outerHTML, "</span>)"))
                .replace('NIGHT', "night (<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getNightIcon().outerHTML, "</span>)"));
        };
        PlayerClock.getClockLabel = function (position) {
            switch (position) {
                case PlayerClock.CLOCK_DAWN:
                    return _("Dawn");
                case PlayerClock.CLOCK_DAY:
                    return _("Day");
                case PlayerClock.CLOCK_NIGHT:
                    return _("Night");
                default:
                    throw new Error("Invalid clock position " + position);
            }
        };
        PlayerClock.getClockIcon = function (position) {
            switch (position) {
                case PlayerClock.CLOCK_DAWN:
                    return DaleIcons_4.DaleIcons.getDawnIcon();
                case PlayerClock.CLOCK_DAY:
                    return DaleIcons_4.DaleIcons.getDayIcon();
                case PlayerClock.CLOCK_NIGHT:
                    return DaleIcons_4.DaleIcons.getNightIcon();
                default:
                    throw new Error("Invalid clock position " + position);
            }
        };
        PlayerClock.getClockLabelAndIconTpl = function (position) {
            var label = PlayerClock.getClockLabel(position).toLowerCase();
            var iconTpl = PlayerClock.getClockIcon(position);
            return "".concat(label, " (<span class=\"daleofmerchants-log-span\">").concat(iconTpl.outerHTML, "</span>)");
        };
        PlayerClock.CLOCK_DAWN = 0;
        PlayerClock.CLOCK_DAY = 1;
        PlayerClock.CLOCK_NIGHT = 2;
        return PlayerClock;
    }());
    exports.PlayerClock = PlayerClock;
});
define("components/DaleCard", ["require", "exports", "components/DaleIcons", "components/Images", "components/types/DbEffect", "components/types/ChameleonChain", "components/DaleDie", "components/AbstractOrderedSelection", "components/PlayerClock"], function (require, exports, DaleIcons_5, Images_2, DbEffect_1, ChameleonChain_1, DaleDie_1, AbstractOrderedSelection_2, PlayerClock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleCard = exports.OrderedSelection = void 0;
    var OrderedSelection = (function (_super) {
        __extends(OrderedSelection, _super);
        function OrderedSelection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OrderedSelection.prototype.getDiv = function (card_id) {
            return DaleCard.divs.get(card_id);
        };
        return OrderedSelection;
    }(AbstractOrderedSelection_2.AbstractOrderedSelection));
    exports.OrderedSelection = OrderedSelection;
    var DaleCard = (function () {
        function DaleCard(id, type_id) {
            id = +id;
            this.id = id;
            if (+id <= 0) {
                return;
            }
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
            Images_2.Images.first_mono_type_id = DaleCard.CT_SWIFTMEMBER;
        };
        DaleCard.addEffect = function (effect) {
            console.warn("addEffect");
            console.warn(effect);
            DaleCard.effects.push(effect);
            if (effect.chameleon_target_id != null) {
                var target_card_id = effect.chameleon_target_id;
                var target_type_id = effect.arg;
                var target = new DaleCard(target_card_id, target_type_id);
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
            switch (effect.type_id) {
                case DaleCard.CT_AVIDFINANCIER:
                    var avid_financier_card = DaleCard.divs.get(effect.card_id);
                    var avid_financier_coin_container = document.createElement("div");
                    avid_financier_coin_container.classList.add("daleofmerchants-avid-financier-coin-container");
                    avid_financier_card.append(avid_financier_coin_container);
                    for (var i = 0; i < effect.arg; i++) {
                        var avid_financier_coin = DaleIcons_5.DaleIcons.getCoinIcon();
                        avid_financier_coin.classList.add("daleofmerchants-avid-financier-coin-icon");
                        avid_financier_coin_container.append(avid_financier_coin);
                        var player_id = this.page.isSpectator ? this.page.gamedatas.playerorder[0] : this.page.player_id;
                        var source = 'overall_player_board_' + player_id;
                        this.page.placeOnObject(avid_financier_coin, source);
                        var duration = 500;
                        var delay = 250 * i;
                        var animSlide = this.page.slideToObject(avid_financier_coin, avid_financier_card, duration, delay);
                        var onEnd = function (node) {
                            dojo.setStyle(node, 'left', '');
                            dojo.setStyle(node, 'top', '');
                        };
                        var animCallback = dojo.animateProperty({ node: avid_financier_coin, duration: 0, onEnd: onEnd });
                        var anim = dojo.fx.chain([animSlide, animCallback]);
                        anim.play();
                    }
                    break;
                case DaleCard.CT_NASTYTHREAT:
                    for (var _i = 0, _a = this.page.gamedatas.playerorder; _i < _a.length; _i++) {
                        var player_id = _a[_i];
                        if (effect.arg != player_id) {
                            this.page.playerStalls[+player_id].increaseStackValue(1);
                        }
                    }
                    break;
            }
            if (effect.effect_class == DaleCard.EC_GLOBAL) {
                for (var _b = 0, _c = Array.from(DaleCard.divs.keys()); _b < _c.length; _b++) {
                    var card_id = _c[_b];
                    try {
                        DaleCard.updateHTML(card_id);
                    }
                    catch (error) {
                        console.warn("WARNING: skipped a global effect of type ".concat(effect.type_id, " applying to an unknown card ").concat(effect.card_id));
                    }
                }
            }
            else {
                try {
                    DaleCard.updateHTML(effect.card_id);
                }
                catch (error) {
                    console.warn("WARNING: skipped a modification effect of type ".concat(effect.type_id, " applying to an unknown card ").concat(effect.card_id));
                }
            }
        };
        DaleCard.expireEffects = function (effects) {
            var includes_global_effect = false;
            var affected_card_ids = new Set();
            var _loop_3 = function (effect) {
                var index = DaleCard.effects.findIndex(function (e) { return e.effect_id == effect.effect_id; });
                if (index == -1) {
                    console.warn("Known effects:");
                    console.warn(DaleCard.effects);
                    console.warn("Expired effect:");
                    console.warn(effect);
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
                switch (effect.type_id) {
                    case DaleCard.CT_AVIDFINANCIER:
                        for (var i = 0; i < effect.arg; i++) {
                            var avid_financier_card = DaleCard.divs.get(effect.card_id);
                            avid_financier_card.querySelectorAll(".daleofmerchants-avid-financier-coin-icon").forEach(function (icon) {
                                icon.remove();
                            });
                        }
                        break;
                    case DaleCard.CT_NASTYTHREAT:
                        for (var _a = 0, _b = this_3.page.gamedatas.playerorder; _a < _b.length; _a++) {
                            var player_id = _b[_a];
                            if (effect.arg != player_id) {
                                this_3.page.playerStalls[+player_id].increaseStackValue(-1);
                            }
                        }
                        break;
                }
            };
            var this_3 = this;
            for (var _i = 0, effects_1 = effects; _i < effects_1.length; _i++) {
                var effect = effects_1[_i];
                _loop_3(effect);
            }
            affected_card_ids = includes_global_effect ? Array.from(DaleCard.divs.keys()) : affected_card_ids;
            affected_card_ids.forEach(function (card_id) {
                DaleCard.updateHTML(card_id);
            });
        };
        DaleCard.updateEffect = function (effect) {
            switch (effect.type_id) {
                case DaleCard.CT_AVIDFINANCIER:
                    console.warn("updateEffect ignored, this is already handled by 'avidFinancierTakeCoin'");
                    break;
                default:
                    DaleCard.expireEffects([effect]);
                    DaleCard.addEffect(effect);
                    break;
            }
        };
        DaleCard.prototype.isPassiveUsed = function (argNonNull) {
            if (argNonNull === void 0) { argNonNull = false; }
            console.warn("isPassiveUsed");
            var type_id = this.effective_type_id;
            if (!DaleCard.cardTypes[type_id].has_ability) {
                return true;
            }
            var chameleonEffect = this.getChameleonDbEffect();
            if (chameleonEffect === null || chameleonEffect === void 0 ? void 0 : chameleonEffect.chameleon_target_id) {
                if (new DaleCard(chameleonEffect.chameleon_target_id).isPassiveUsed(true)) {
                    return true;
                }
            }
            for (var _i = 0, _a = DaleCard.effects; _i < _a.length; _i++) {
                var effect = _a[_i];
                if (effect.card_id == this.id && effect.type_id == type_id && effect.chameleon_target_id == null) {
                    if (argNonNull && effect.arg == null) {
                        continue;
                    }
                    return true;
                }
            }
            return false;
        };
        DaleCard.prototype.hasLocalBindingWithSeeingDoubles = function () {
            var chain = DaleCard.cardIdToChameleonChainLocal.get(this.id);
            if (!chain) {
                return false;
            }
            if (this.original_type_id == DaleCard.CT_SEEINGDOUBLES) {
                return true;
            }
            for (var _i = 0, _a = chain.type_ids; _i < _a.length; _i++) {
                var type_id = _a[_i];
                if (type_id == DaleCard.CT_SEEINGDOUBLES) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperty(DaleCard.prototype, "effective_server_type_id", {
            get: function () {
                var _a, _b;
                return (_b = (_a = DaleCard.cardIdToChameleonChain.get(this.id)) === null || _a === void 0 ? void 0 : _a.type_id) !== null && _b !== void 0 ? _b : this.original_type_id;
            },
            enumerable: false,
            configurable: true
        });
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
                var chameleonEffects = [];
                var chameleonEffect = this.getChameleonDbEffect();
                while (chameleonEffect) {
                    chameleonEffects.push(chameleonEffect);
                    chameleonEffect = new DaleCard(chameleonEffect.chameleon_target_id).getChameleonDbEffect();
                }
                for (var _i = 0, _a = DaleCard.effects; _i < _a.length; _i++) {
                    var effect = _a[_i];
                    var isCopiedEffect = false;
                    for (var _b = 0, chameleonEffects_1 = chameleonEffects; _b < chameleonEffects_1.length; _b++) {
                        var chameleonEffect_1 = chameleonEffects_1[_b];
                        if ((effect.card_id == chameleonEffect_1.chameleon_target_id) && (effect.effect_id < chameleonEffect_1.effect_id)) {
                            isCopiedEffect = true;
                            break;
                        }
                    }
                    if (effect.card_id == this.id || effect.effect_class == DaleCard.EC_GLOBAL || isCopiedEffect) {
                        switch (effect.type_id) {
                            case DaleCard.CT_FLASHYSHOW:
                                value += 1;
                                break;
                            case DaleCard.CT_BOLDHAGGLER:
                                value += effect.arg;
                                break;
                            case DaleCard.CT_BLINDFOLD:
                                value = effect.arg;
                                break;
                            case DaleCard.CT_RAREARTEFACT:
                            case DaleCard.CT_DARINGMEMBER:
                                value *= effect.arg;
                                break;
                            case DaleCard.CT_STOVE:
                                value = effect.arg;
                                break;
                            case DaleCard.CT_PRACTICALVALUES:
                                if (value >= 1 && value <= 5) {
                                    value = 6 - value;
                                }
                                break;
                            case DaleCard.CT_BAROMETER:
                                value = effect.arg;
                                break;
                        }
                    }
                }
                return value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "effective_cost", {
            get: function () {
                var _a;
                var cost = this.original_value;
                for (var _i = 0, _b = DaleCard.effects; _i < _b.length; _i++) {
                    var effect = _b[_i];
                    if (effect.effect_class == DaleCard.EC_GLOBAL) {
                        switch (effect.type_id) {
                            case DaleCard.CT_SCARYGUNFIGHT:
                                if (((_a = DaleCard.page) === null || _a === void 0 ? void 0 : _a.player_id) != effect.arg) {
                                    cost += 2;
                                }
                                break;
                        }
                    }
                }
                return cost;
            },
            enumerable: false,
            configurable: true
        });
        DaleCard.prototype.getChameleonDbEffect = function () {
            if (!this.isBoundChameleon()) {
                return null;
            }
            if (DaleCard.cardIdToChameleonChainLocal.has(this.id)) {
                var chain = DaleCard.cardIdToChameleonChainLocal.get(this.id);
                return new DbEffect_1.DbEffect({
                    effect_id: Infinity,
                    effect_class: DaleCard.EC_MODIFICATION,
                    card_id: this.id,
                    type_id: this.original_type_id,
                    arg: chain.type_id,
                    chameleon_target_id: chain.card_id
                });
            }
            var chameleon_effect = null;
            for (var _i = 0, _a = DaleCard.effects; _i < _a.length; _i++) {
                var effect = _a[_i];
                if (this.id == 74) {
                    console.warn(effect);
                }
                if (effect.card_id == this.id && effect.chameleon_target_id != null) {
                    chameleon_effect = effect;
                }
            }
            return chameleon_effect;
        };
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
            console.warn("countChameleonsLocal");
            console.warn(DaleCard.cardIdToChameleonChainLocal);
            return DaleCard.cardIdToChameleonChainLocal.size;
        };
        DaleCard.getLocalChameleonsEntries = function () {
            return Array.from(this.cardIdToChameleonChainLocal.entries());
        };
        DaleCard.getLocalChameleonsJSON = function () {
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
                    if (this.id > 0) {
                        console.warn("id ".concat(this.id, " does not have a corresponding type_id"));
                    }
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
            return this.effective_cost + pos;
        };
        Object.defineProperty(DaleCard.prototype, "trigger", {
            get: function () {
                return DaleCard.cardTypes[this.effective_type_id].trigger;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "effective_animalfolk_id", {
            get: function () {
                return DaleCard.cardTypes[this.effective_type_id].animalfolk_id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "original_animalfolk_id", {
            get: function () {
                return DaleCard.cardTypes[this.original_type_id].animalfolk_id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleCard.prototype, "animalfolk_displayed", {
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
        DaleCard.prototype.isAnimalfolk = function () {
            return (this.original_animalfolk_id != 0) && !this.isMonoCard();
        };
        DaleCard.prototype.isMonoCard = function () {
            return DaleCard.cardTypes[this.effective_type_id].is_mono;
        };
        DaleCard.prototype.isTechnique = function () {
            return DaleCard.cardTypes[this.effective_type_id].is_technique;
        };
        DaleCard.prototype.isPlayable = function () {
            return this.isTechnique() || (DaleCard.cardTypes[this.effective_type_id].playable && DaleCard.cardTypes[this.effective_type_id].trigger == null);
        };
        DaleCard.prototype.isPlayablePostCleanUp = function () {
            return DaleCard.cardTypes[this.effective_type_id].playable && DaleCard.cardTypes[this.effective_type_id].trigger == 'onCleanUp';
        };
        DaleCard.isPlayable = function (type_id) {
            return DaleCard.cardTypes[type_id].playable;
        };
        DaleCard.prototype.inScheduleCooldown = function () {
            return DaleCard.scheduleCooldownCardIds.has(this.id);
        };
        DaleCard.prototype.getTooltipContent = function () {
            var cardType = DaleCard.cardTypes[this.effective_type_id];
            var animalfolkWithBull = cardType.animalfolk_displayed ? " • " + cardType.animalfolk_displayed : "";
            var chameleonName = "";
            if (this.isBoundChameleon()) {
                var type_ids = [this.original_type_id];
                var chain = ChameleonChain_1.ChameleonChain.concat(DaleCard.cardIdToChameleonChain.get(this.id), DaleCard.cardIdToChameleonChainLocal.get(this.id));
                for (var i = 0; i < chain.length - 1; i++) {
                    type_ids.push(chain.type_ids[i]);
                }
                for (var _i = 0, type_ids_1 = type_ids; _i < type_ids_1.length; _i++) {
                    var type_id = type_ids_1[_i];
                    chameleonName += "<span class=daleofmerchants-chameleon-name>".concat(DaleCard.cardTypes[type_id].name, "</span><br>");
                }
            }
            var effective_value = this.effective_value;
            if (effective_value != cardType.value) {
                effective_value = "(<span class=daleofmerchants-original-value>".concat(cardType.value, "</span>) ").concat(effective_value);
            }
            var legend = this.getLegend(cardType.text);
            return "<div class=\"daleofmerchants-card-tooltip\">\n            <h3>".concat(chameleonName).concat(cardType.name, "</h3>\n            <hr>\n            ").concat(effective_value).concat(animalfolkWithBull, " \u2022 ").concat(cardType.type_displayed, " ").concat(cardType.has_plus ? "(+)" : "", "\n            <br><br>\n            <div class=\"daleofmerchants-card-tooltip-text\">").concat(DaleCard.format_string(cardType.text), "</div>\n            <div style=\"color:gray\" class=\"daleofmerchants-card-tooltip-text\">").concat(legend ? '<hr>' + legend : '<br style="line-height: 10px" />', "</div>\n        </div>");
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
        DaleCard.format_string = function (text) {
            if (text.includes('CARDS3')) {
                text = text.replaceAll('CARDS3', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getCards3Icon().outerHTML, "</span>"));
            }
            if (text.includes('CARDS2')) {
                text = text.replaceAll('CARDS2', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getCards2Icon().outerHTML, "</span>"));
            }
            if (text.includes('CARD')) {
                text = text.replaceAll('CARD', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getCardIcon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_OCELOT')) {
                text = text.replaceAll('DIE_OCELOT', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.get3DDieOcelotIcon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_POLECAT')) {
                text = text.replaceAll('DIE_POLECAT', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.get3DDiePolecatIcon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_HARE')) {
                text = text.replaceAll('DIE_HARE', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.get3DDieHareIcon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_PANGOLIN1')) {
                text = text.replaceAll('DIE_PANGOLIN1', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.get3DDiePangolin1Icon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_PANGOLIN2')) {
                text = text.replaceAll('DIE_PANGOLIN2', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.get3DDiePangolin2Icon().outerHTML, "</span>"));
            }
            if (text.includes('SOURCE')) {
                text = text.replaceAll('SOURCE', "<span style=\"color: var(--pangolin1); font-weight: bold;\">".concat(_("source"), "</span>"));
            }
            if (text.includes('DESTINATION')) {
                text = text.replaceAll('DESTINATION', "<span style=\"color: var(--pangolin2); font-weight: bold;\">".concat(_("destination"), "</span>"));
            }
            if (text.includes('COMET')) {
                text = text.replaceAll('COMET', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getCometIcon().outerHTML, "</span>"));
            }
            if (text.includes('PLANET')) {
                text = text.replaceAll('PLANET', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getPlanetIcon().outerHTML, "</span>"));
            }
            if (text.includes('STARS')) {
                text = text.replaceAll('STARS', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getStarsIcon().outerHTML, "</span>"));
            }
            if (text.includes('COIN')) {
                text = text.replaceAll('COIN', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getCoinIcon().outerHTML, "</span>"));
            }
            if (text.includes('DAWN')) {
                text = text.replace(/\[DAWN(.|\n)*?\]/g, function (match) {
                    return "<div class=\"daleofmerchants-tooltip-clock\" data-clock=\"0\">".concat(match.replace(/\[|\]/g, ''), "</div>");
                });
                text = text.replaceAll('DAWN', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getDawnIcon().outerHTML, "</span>"));
            }
            if (text.includes('DAY')) {
                text = text.replace(/\[DAY(.|\n)*?\]/g, function (match) {
                    return "<div class=\"daleofmerchants-tooltip-clock\" data-clock=\"1\">".concat(match.replace(/\[|\]/g, ''), "</div>");
                });
                text = text.replaceAll('DAY', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getDayIcon().outerHTML, "</span>"));
            }
            if (text.includes('NIGHT')) {
                text = text.replace(/\[NIGHT(.|\n)*?\]/g, function (match) {
                    return "<div class=\"daleofmerchants-tooltip-clock\" data-clock=\"2\">".concat(match.replace(/\[|\]/g, ''), "</div>");
                });
                text = text.replaceAll('NIGHT', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getNightIcon().outerHTML, "</span>"));
            }
            if (text.includes('CLOCK')) {
                text = text.replaceAll('CLOCK', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getClockIcon().outerHTML, "</span>"));
            }
            return text;
        };
        DaleCard.prototype.getLegend = function (text) {
            var legend = '';
            if (text.includes('DIE_OCELOT')) {
                legend += "".concat(DaleDie_1.DaleDie.get3DDieTpl('ocelot'), " <strong>:</strong> ").concat(DaleDie_1.DaleDie.getAllFacesTpl('ocelot'), "<br style=\"line-height: 10px\" />");
            }
            if (text.includes('DIE_POLECAT')) {
                legend += "".concat(DaleDie_1.DaleDie.get3DDieTpl('polecat'), " <strong>:</strong> ").concat(DaleDie_1.DaleDie.getAllFacesTpl('polecat'), "<br style=\"line-height: 10px\" />");
            }
            if (text.includes('DIE_HARE')) {
                legend += "".concat(DaleDie_1.DaleDie.get3DDieTpl('hare'), " <strong>:</strong> ").concat(DaleDie_1.DaleDie.getAllFacesTpl('hare'), "<br style=\"line-height: 10px\" />");
            }
            if (text.includes('DIE_PANGOLIN1')) {
                legend += "".concat(DaleDie_1.DaleDie.get3DDieTpl('pangolin1'), " <strong>:</strong> ").concat(DaleDie_1.DaleDie.getAllFacesTpl('pangolin1'), "<br style=\"line-height: 10px\" />");
            }
            if (text.includes('DIE_PANGOLIN2')) {
                legend += "".concat(DaleDie_1.DaleDie.get3DDieTpl('pangolin2'), " <strong>:</strong> ").concat(DaleDie_1.DaleDie.getAllFacesTpl('pangolin2'), "<br style=\"line-height: 10px\" />");
            }
            if (text.includes(_('Acquire')) || text.includes(_('acquire'))) {
                legend += '<strong> ' + _('Acquire') + ' : </strong> ' +
                    _('If Mono played a Mono card with the acquire keyword and Mono has more stacks than you, it prioritises the market action.')
                    + '<br><br style="line-height: 10px" />';
            }
            if (text.includes(_('Store')) || text.includes(_('store'))) {
                legend += '<strong> ' + _('Store') + ' : </strong> ' +
                    _('At the start of your next turn, place stored cards into your hand.')
                    + '<br><br style="line-height: 10px" />';
            }
            if (text.includes(_('Toss')) || text.includes(_('toss'))) {
                legend += '<strong> ' + _('Toss') + ' : </strong> ' +
                    _('Tossed animalfolk cards are placed in the bin. Tossed junk cards are removed from the game.')
                    + (DaleCard.page.is_solo ? ' ' + _('Tossed Mono cards are placed on Mono\'s discard.') : '')
                    + '<br><br style="line-height: 10px" />';
            }
            if (text.includes(_('Finish'))) {
                legend += '<strong> ' + _('Finish') + ' : </strong> ' +
                    _('Resolve any effects in the card text that precede finish. During your action phase, you may spend the amount listed after finish to continue resolving the card.')
                    + '<br><br style="line-height: 10px" />';
            }
            if (text.includes(_('Spend')) || text.includes(_('Finish'))) {
                legend += '<strong> ' + _('Spend') + ' : </strong> ' +
                    DaleCard.format_string(_('You must first pay the amount listed after spend in any combination of cards from your hand and acquired gold COIN.'))
                    + '<br><br style="line-height: 10px" />';
            }
            if (text.includes('CLOCK')) {
                legend += "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_5.DaleIcons.getClockIcon().outerHTML, "</span> <strong>:</strong> ");
                legend += _("a clock that tracks the");
                legend += " ".concat(PlayerClock_1.PlayerClock.getClockLabelAndIconTpl(0), ", ").concat(PlayerClock_1.PlayerClock.getClockLabelAndIconTpl(1), " ") + _("and") + " ".concat(PlayerClock_1.PlayerClock.getClockLabelAndIconTpl(2));
                legend += '<br><br style="line-height: 10px" />';
            }
            if (this.isChameleon()) {
                legend += '<strong> ' + _('Copy') + ' : </strong> ' +
                    _('During your action phase, this card may become an identical copy of one valid card for all purposes of play.')
                    + '<br><br style="line-height: 10px" />';
            }
            return legend;
        };
        DaleCard.prototype.updateChameleonOverlay = function (temp_div, fade) {
            if (fade === void 0) { fade = true; }
            var div = temp_div !== null && temp_div !== void 0 ? temp_div : DaleCard.divs.get(this.id);
            if (!div) {
                return;
            }
            var old_overlay = div.querySelector(".daleofmerchants-chameleon-overlay:not(.daleofmerchants-fading)");
            if (old_overlay) {
                if (fade) {
                    old_overlay.classList.add("daleofmerchants-fading");
                    dojo.fadeOut({ node: old_overlay, onEnd: function (node) { dojo.destroy(node); } }).play();
                }
                else {
                    old_overlay.remove();
                }
            }
            if (this.isBoundChameleon()) {
                var chameleon_icon = DaleIcons_5.DaleIcons.getChameleonIcon();
                chameleon_icon.classList.add("daleofmerchants-chameleon-icon");
                var new_overlay = document.createElement("div");
                new_overlay.classList.add("daleofmerchants-card");
                new_overlay.classList.add("daleofmerchants-chameleon-overlay");
                Images_2.Images.setCardStyle(new_overlay, this.effective_type_id);
                new_overlay.appendChild(chameleon_icon);
                div.appendChild(new_overlay);
                if (fade) {
                    dojo.setStyle(new_overlay, 'opacity', '0');
                    dojo.fadeIn({ node: new_overlay }).play();
                }
            }
        };
        DaleCard.prototype.updateEffectiveValue = function (card_div) {
            var _a, _b;
            var value = this.original_value;
            if (card_div.dataset['location'] == 'market') {
                value = this.effective_cost;
            }
            else if ((DaleCard.page.isCurrentPlayerActive() && card_div.dataset['location'] == 'stock') ||
                (card_div.dataset['location'] == 'moving') ||
                ((DaleCard.page.mono_hand_is_visible && card_div.id.includes("limbo")))) {
                value = this.effective_value;
            }
            if (value == this.original_value) {
                (_a = card_div.querySelector(".daleofmerchants-effective-value")) === null || _a === void 0 ? void 0 : _a.remove();
            }
            else {
                var value_div = (_b = card_div.querySelector(".daleofmerchants-effective-value")) !== null && _b !== void 0 ? _b : document.createElement('div');
                value_div.classList.add("daleofmerchants-effective-value");
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
            if (this.id <= 0) {
                return;
            }
            var div = temp_div !== null && temp_div !== void 0 ? temp_div : DaleCard.divs.get(this.id);
            this.updateChameleonOverlay(div, fade);
            if (!temp_div && div) {
                this.addTooltip(div);
            }
            if (div) {
                this.updateEffectiveValue(div);
            }
        };
        DaleCard.prototype.updateLocation = function (dataLocation) {
            var div = DaleCard.divs.get(this.id);
            if (div) {
                div.dataset['location'] = dataLocation;
                this.updateHTML(div, true);
            }
        };
        DaleCard.prototype.toDiv = function (parent_id, dataLocation) {
            var _a;
            var div = document.createElement("div");
            div.classList.add("daleofmerchants-card");
            div.id = "daleofmerchants-card-" + this.id;
            Images_2.Images.setCardStyle(div, this.original_type_id);
            if (dataLocation) {
                div.dataset['location'] = dataLocation;
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
        DaleCard.prototype.detachDiv = function (specific_div) {
            if (specific_div === undefined || specific_div == DaleCard.divs.get(this.id)) {
                this.removeTooltip();
                DaleCard.divs.delete(this.id);
            }
        };
        DaleCard.prototype.attachDiv = function (div) {
            div.classList.add("daleofmerchants-card");
            Images_2.Images.setCardStyle(div, this.original_type_id);
            DaleCard.divs.set(this.id, div);
            this.updateHTML();
        };
        DaleCard.of = function (card) {
            if (card instanceof DaleCard) {
                return card;
            }
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
        DaleCard.cardIdToOverlay = new Map();
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
        DaleCard.CT_GIFTVOUCHER = 15;
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
        DaleCard.CT_SOUNDDETECTORS = 39;
        DaleCard.CT_TRENDSETTING = 40;
        DaleCard.CT_SEEINGDOUBLES = 41;
        DaleCard.CT_TIRELESSTINKERER = 42;
        DaleCard.CT_CALCULATIONS = 43;
        DaleCard.CT_SAFETYPRECAUTION = 44;
        DaleCard.CT_MAGNET = 45;
        DaleCard.CT_DANGEROUSTEST = 46;
        DaleCard.CT_GLUE = 47;
        DaleCard.CT_STEADYACHIEVER = 48;
        DaleCard.CT_SHOPPINGJOURNEY = 49;
        DaleCard.CT_HOUSECLEANING = 50;
        DaleCard.CT_SIESTA = 51;
        DaleCard.CT_LUNCHBREAK = 52;
        DaleCard.CT_IRONING = 53;
        DaleCard.CT_LITTLEVILLAIN = 54;
        DaleCard.CT_SCARYGUNFIGHT = 55;
        DaleCard.CT_NIGHTSHIFT = 56;
        DaleCard.CT_RUTHLESSCOMPETITION = 57;
        DaleCard.CT_NASTYTHREAT = 58;
        DaleCard.CT_LOSTSHIPMENTS = 59;
        DaleCard.CT_CUNNINGNEIGHBOUR = 60;
        DaleCard.CT_CHEER = 61;
        DaleCard.CT_RAFFLE = 62;
        DaleCard.CT_CHARITY = 63;
        DaleCard.CT_TASTERS = 64;
        DaleCard.CT_RUMOURS = 65;
        DaleCard.CT_DARINGADVENTURER = 66;
        DaleCard.CT_RAREARTEFACT = 67;
        DaleCard.CT_SWANK = 68;
        DaleCard.CT_RISKYBUSINESS = 69;
        DaleCard.CT_NATURALSURVIVOR = 70;
        DaleCard.CT_SOFA = 71;
        DaleCard.CT_WISESPY = 72;
        DaleCard.CT_ANCIENTKNOWLEDGE = 73;
        DaleCard.CT_QUALITYINSPECTION = 74;
        DaleCard.CT_BINOCULARS = 75;
        DaleCard.CT_BALANCING = 76;
        DaleCard.CT_EXTRAREMARKS = 77;
        DaleCard.CT_MASTERBUILDER = 78;
        DaleCard.CT_SNACK = 79;
        DaleCard.CT_WINDOFCHANGE = 80;
        DaleCard.CT_OVERTIME = 81;
        DaleCard.CT_ORDERINCHAOS = 82;
        DaleCard.CT_PRACTICE = 83;
        DaleCard.CT_RIGOROUSCHRONICLER = 84;
        DaleCard.CT_REFRESHINGDRINK = 85;
        DaleCard.CT_DUPLICATEENTRY = 86;
        DaleCard.CT_HISTORYLESSON = 87;
        DaleCard.CT_CULTURALPRESERVATION = 88;
        DaleCard.CT_SLICEOFLIFE = 89;
        DaleCard.CT_VORACIOUSCONSUMER = 90;
        DaleCard.CT_DELIGHTFULSURPRISE = 91;
        DaleCard.CT_FORTUNATEUPGRADE = 92;
        DaleCard.CT_REPLACEMENT = 93;
        DaleCard.CT_FASHIONHINT = 94;
        DaleCard.CT_ROYALPRIVILEGE = 95;
        DaleCard.CT_POMPOUSPROFESSIONAL = 96;
        DaleCard.CT_BRIBE = 97;
        DaleCard.CT_BURGLARY = 98;
        DaleCard.CT_GRASP = 99;
        DaleCard.CT_PERISCOPE = 100;
        DaleCard.CT_SUDDENNAP = 101;
        DaleCard.CT_CAREFREESWAPPER = 102;
        DaleCard.CT_BARGAINSEEKER = 103;
        DaleCard.CT_DELICACY = 104;
        DaleCard.CT_UMBRELLA = 105;
        DaleCard.CT_VELOCIPEDE = 106;
        DaleCard.CT_MATCHINGCOLOURS = 107;
        DaleCard.CT_ARCANESCHOLAR = 108;
        DaleCard.CT_BAROMETER = 109;
        DaleCard.CT_BADOMEN = 110;
        DaleCard.CT_FESTIVAL = 111;
        DaleCard.CT_CELESTIALGUIDANCE = 112;
        DaleCard.CT_CALENDAR = 113;
        DaleCard.CT_CLEVERGUARDIAN = 114;
        DaleCard.CT_BARRICADE = 115;
        DaleCard.CT_WHEELBARROW = 116;
        DaleCard.CT_VIGILANCE = 117;
        DaleCard.CT_SUPPLYDEPOT = 118;
        DaleCard.CT_TACTICALMEASUREMENT = 119;
        DaleCard.CT_RESOURCEFULALLY = 120;
        DaleCard.CT_ICETRADE = 121;
        DaleCard.CT_TRAVELINGEQUIPMENT = 122;
        DaleCard.CT_STOVE = 123;
        DaleCard.CT_FISHING = 124;
        DaleCard.CT_PRACTICALVALUES = 125;
        DaleCard.CT_AVIDFINANCIER = 126;
        DaleCard.CT_GREED = 127;
        DaleCard.CT_GOLDENOPPORTUNITY = 128;
        DaleCard.CT_CACHE = 129;
        DaleCard.CT_DISPLAYOFPOWER = 130;
        DaleCard.CT_SAFEPROFITS = 131;
        DaleCard.CT_IMPULSIVEVISIONARY = 132;
        DaleCard.CT_COLLECTORSDESIRE = 133;
        DaleCard.CT_GROUNDBREAKINGIDEA = 134;
        DaleCard.CT_INSPIRATION = 135;
        DaleCard.CT_INSIGHT = 136;
        DaleCard.CT_PERFECTMOVE = 137;
        DaleCard.CT_SHREWDTRICKSTER = 138;
        DaleCard.CT_DISRUPTIVESPEECH = 139;
        DaleCard.CT_TITFORTAT = 140;
        DaleCard.CT_SHAMELESSRUMMAGE = 141;
        DaleCard.CT_PUBLICHUMILIATION = 142;
        DaleCard.CT_EQUALITY = 143;
        DaleCard.CT_FUMBLINGDREAMER = 144;
        DaleCard.CT_COFFEEGRINDER = 145;
        DaleCard.CT_ACCIDENT = 146;
        DaleCard.CT_LOOSEMARBLES = 147;
        DaleCard.CT_ANOTHERFINEMESS = 148;
        DaleCard.CT_FRESHSTART = 149;
        DaleCard.CT_MEDDLINGMARKETEER = 150;
        DaleCard.CT_GOODWILLPRESENTS = 151;
        DaleCard.CT_ALTERNATIVEPLAN = 152;
        DaleCard.CT_ANCHOR = 153;
        DaleCard.CT_MANUFACTUREDJOY = 154;
        DaleCard.CT_SHAKYENTERPRISE = 155;
        DaleCard.CT_DRAMATICROMANTIC = 156;
        DaleCard.CT_BOUQUETS = 157;
        DaleCard.CT_SELECTINGCONTRACTS = 158;
        DaleCard.CT_SERENADE = 159;
        DaleCard.CT_SPINNINGWHEEL = 160;
        DaleCard.CT_INHERITANCE = 161;
        DaleCard.CT_SNEAKYSCOUT = 162;
        DaleCard.CT_FALSEALARM = 163;
        DaleCard.CT_HEROICDEED = 164;
        DaleCard.CT_SECRETMISSION = 165;
        DaleCard.CT_CAPTURE = 166;
        DaleCard.CT_PROVOCATION = 167;
        DaleCard.CT_PRISTINEOWNER = 168;
        DaleCard.CT_BONSAI = 169;
        DaleCard.CT_RAKE = 170;
        DaleCard.CT_SLOTMACHINE = 171;
        DaleCard.CT_GENERATIONCHANGE = 172;
        DaleCard.CT_WARMEMBRACE = 173;
        DaleCard.CT_SWIFTMEMBER = 174;
        DaleCard.CT_LOYALMEMBER = 175;
        DaleCard.CT_WILYMEMBER = 176;
        DaleCard.CT_STASHINGMEMBER = 177;
        DaleCard.CT_BOLDMEMBER = 178;
        DaleCard.CT_FLEXIBLEMEMBER = 179;
        DaleCard.CT_TIRELESSMEMBER = 180;
        DaleCard.CT_STEADYMEMBER = 181;
        DaleCard.CT_LITTLEMEMBER = 182;
        DaleCard.CT_CUNNINGMEMBER = 183;
        DaleCard.CT_DARINGMEMBER = 184;
        DaleCard.CT_WISEMEMBER = 185;
        DaleCard.CT_MASTERMEMBER = 186;
        DaleCard.CT_RIGOROUSMEMBER = 187;
        DaleCard.CT_VORACIOUSMEMBER = 188;
        DaleCard.CT_POMPOUSMEMBER = 189;
        DaleCard.CT_CAREFREEMEMBER = 190;
        DaleCard.CT_ARCANEMEMBER = 191;
        DaleCard.CT_CLEVERMEMBER = 192;
        DaleCard.CT_RESOURCEFULMEMBER = 193;
        DaleCard.CT_AVIDMEMBER = 194;
        DaleCard.CT_IMPULSIVEMEMBER = 195;
        DaleCard.CT_SHREWDMEMBER = 196;
        DaleCard.CT_FUMBLINGMEMBER = 197;
        DaleCard.CT_MEDDLINGMEMBER = 198;
        DaleCard.CT_DRAMATICMEMBER = 199;
        DaleCard.CT_STEALTHYMEMBER = 200;
        DaleCard.CT_PRISTINEMEMBER = 201;
        DaleCard.CT_DEPRECATED_MARKETDISCOVERY = 202;
        DaleCard.CT_DEPRECATED_CHEER = 203;
        DaleCard.CT_DEPRECATED_TASTERS = 204;
        DaleCard.scheduleCooldownCardIds = new Set();
        return DaleCard;
    }());
    exports.DaleCard = DaleCard;
});
define("components/types/DaleLocation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/types/DaleWrapClass", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DALE_WRAP_CLASSES = void 0;
    exports.DALE_WRAP_CLASSES = ['daleofmerchants-wrap-technique', 'daleofmerchants-wrap-purchase', 'daleofmerchants-wrap-build', 'daleofmerchants-wrap-discard', 'daleofmerchants-wrap-default'];
});
define("components/DaleStock", ["require", "exports", "ebg/stock", "components/DaleCard", "components/Images", "components/types/DaleWrapClass", "ebg/stock"], function (require, exports, Stock, DaleCard_1, Images_3, DaleWrapClass_1) {
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
            _this.whitelist = [];
            _this.enableSortItems = true;
            _this._shuffle_animation = false;
            _this.duration = 500;
            _this.orderedSelection = new DaleCard_1.OrderedSelection();
            _this.jstpl_stock_item = '<div id="${id}" class="daleofmerchants-card" style="top:${top}px;left:${left}px;width:${width}px;height:${height}px;${position};"></div>';
            addEventListener("resize", _this.onResize.bind(_this));
            _this.onResize();
            return _this;
        }
        DaleStock.prototype.init = function (page, container, wrap, defaultText, onItemCreate, onItemDelete) {
            var _a;
            this.page = page;
            page.allDaleStocks.push(this);
            for (var i in page.gamedatas.cardTypes) {
                var type_id = page.gamedatas.cardTypes[i].type_id;
                this.addItemType(type_id, type_id);
            }
            this.create(page, container, Images_3.Images.CARD_WIDTH, Images_3.Images.CARD_HEIGHT);
            this.resizeItems(Images_3.Images.CARD_WIDTH_S, Images_3.Images.CARD_HEIGHT_S, Images_3.Images.SHEET_WIDTH_S, Images_3.Images.SHEET_HEIGHT_S);
            this.image_items_per_row = Images_3.Images.IMAGES_PER_ROW;
            this.create(page, container, Images_3.Images.CARD_WIDTH_S, Images_3.Images.CARD_HEIGHT_S);
            if (wrap) {
                dojo.setStyle(wrap, 'min-height', 2 * Images_3.Images.CARD_WIDTH_S + 'px');
                dojo.setStyle(wrap, 'max-height', 2 * Images_3.Images.CARD_WIDTH_S + 'px');
                this.wrap = wrap;
                this.actionLabel = (_a = wrap.querySelector(".daleofmerchants-label")) !== null && _a !== void 0 ? _a : undefined;
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
            setTimeout(this.updateDisplay.bind(this), 1000);
        };
        DaleStock.prototype.onClick = function (card_id) {
            console.warn("onClickOnCard(".concat(card_id, ")"));
        };
        DaleStock.prototype.onClickOnItem = function (evt) {
            console.warn("onClickOnItem");
            evt.stopPropagation();
            var target = evt.currentTarget;
            if (target.classList.contains("daleofmerchants-clickable")) {
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
        DaleStock.prototype.setSelectionMode = function (mode, iconType, wrapClass, actionLabelText, secondaryIconType, selectionMax) {
            this.selectionMode = mode;
            this.orderedSelection.setIconType(iconType, secondaryIconType);
            this.setSelectionMaxSize();
            if (selectionMax !== undefined) {
                this.orderedSelection.setMaxSize(selectionMax);
            }
            this.unselectAll(true);
            this.setWrapClass(wrapClass, actionLabelText);
            for (var i in this.items) {
                var card_id = this.items[i].id;
                this.setClickable(card_id);
            }
        };
        DaleStock.prototype.setWhitelist = function (cards) {
            this.whitelist = cards;
        };
        DaleStock.prototype.isClickSelectionMode = function () {
            return this.selectionMode.substring(0, 5) == 'click';
        };
        DaleStock.prototype.setClickable = function (card_id) {
            var div = $(this.control_name + "_item_" + card_id);
            if (!div) {
                throw new Error("Card ".concat(card_id, " does not exist in hand, so setClickable cannot be set"));
            }
            if (this.isClickable(card_id)) {
                div.classList.add("daleofmerchants-clickable");
                if (this.isClickableHighPriority(card_id)) {
                    div.classList.add("daleofmerchants-high-priority");
                }
                else {
                    div.classList.remove("daleofmerchants-high-priority");
                }
            }
            else {
                div.classList.remove("daleofmerchants-clickable");
                div.classList.remove("daleofmerchants-high-priority");
            }
        };
        DaleStock.prototype.setSelectionMaxSize = function () {
            switch (this.selectionMode) {
                case 'none':
                    this.orderedSelection.setMaxSize(0);
                    break;
                case 'single':
                    this.orderedSelection.setMaxSize(1);
                    break;
                case 'singleAnimalfolk':
                    this.orderedSelection.setMaxSize(1);
                    break;
                case 'multiple':
                    this.orderedSelection.setMaxSize(Infinity);
                    break;
                case 'multiple2':
                    this.orderedSelection.setMaxSize(2);
                    break;
                case 'multiple3':
                    this.orderedSelection.setMaxSize(3);
                    break;
                case 'multipleExceptSecondary':
                    this.orderedSelection.setMaxSize(Infinity);
                    break;
                case 'essentialPurchase':
                    this.orderedSelection.setMaxSize(3);
                    break;
                case 'glue':
                    this.orderedSelection.setMaxSize(Infinity);
                    break;
            }
        };
        DaleStock.prototype.getUniqueClickableCardId = function () {
            var unique_id = undefined;
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                if (this.isClickable(item.id)) {
                    if (unique_id === undefined) {
                        unique_id = item.id;
                    }
                    else {
                        return undefined;
                    }
                }
            }
            return unique_id;
        };
        DaleStock.prototype.getAllDaleCards = function () {
            var cards = [];
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                cards.push(new DaleCard_1.DaleCard(item.id));
            }
            return cards;
        };
        DaleStock.prototype.getSelectedValue = function () {
            var value = 0;
            for (var _i = 0, _a = this.orderedSelection.get(); _i < _a.length; _i++) {
                var card_id = _a[_i];
                value += new DaleCard_1.DaleCard(card_id).effective_value;
            }
            return value;
        };
        DaleStock.prototype.getTotalValue = function () {
            var value = 0;
            for (var _i = 0, _a = this.getAllDaleCards(); _i < _a.length; _i++) {
                var card = _a[_i];
                value += card.effective_value;
            }
            return value;
        };
        DaleStock.prototype.getSelectedDaleCards = function () {
            var cards = [];
            for (var _i = 0, _a = this.orderedSelection.get(); _i < _a.length; _i++) {
                var card_id = _a[_i];
                cards.push(new DaleCard_1.DaleCard(card_id));
            }
            return cards;
        };
        DaleStock.prototype.getAllClickableCardIds = function () {
            var card_ids = [];
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                if (this.isClickable(item.id)) {
                    card_ids.push(item.id);
                }
            }
            return card_ids;
        };
        DaleStock.prototype.isClickable = function (card_id) {
            var card = new DaleCard_1.DaleCard(card_id);
            switch (this.selectionMode) {
                case 'none':
                    return false;
                case 'noneRetainSelection':
                    return false;
                case 'click':
                    return true;
                case 'clickTechnique':
                    return card.isPlayable();
                case 'clickAbility':
                    return card.isPlayable() && !card.isTechnique();
                case 'clickAbilityPostCleanup':
                    return card.isPlayablePostCleanUp();
                case 'clickRetainSelection':
                    return true;
                case 'clickOnTurnStart':
                    return card.trigger == 'onTurnStart' && !card.inScheduleCooldown();
                case 'clickOnTrigger':
                    return card.trigger != null && !card.inScheduleCooldown();
                case 'clickOnFinish':
                    return card.trigger == 'onFinish';
                case 'clickOnFinishAndSnack':
                    return card.trigger == 'onFinish' || card.effective_type_id == DaleCard_1.DaleCard.CT_SNACK;
                case 'clickAnimalfolk':
                    return card.isAnimalfolk();
                case 'clickWhitelist':
                    for (var _i = 0, _a = this.whitelist; _i < _a.length; _i++) {
                        var whitelistCard = _a[_i];
                        if (card.id == whitelistCard.id) {
                            return true;
                        }
                    }
                    return false;
                case 'clickOvertime':
                    return card.effective_type_id == DaleCard_1.DaleCard.CT_OVERTIME;
                case 'single':
                    return true;
                case 'singleAnimalfolk':
                    return card.isAnimalfolk();
                case 'multiple':
                    return true;
                case 'multiple2':
                    return true;
                case 'multiple3':
                    return true;
                case 'multipleJunk':
                    return card.isEffectiveJunk();
                case 'multipleExceptSecondary':
                    return !this.orderedSelection.includes(card_id, true);
                case 'essentialPurchase':
                    return card.isEffectiveJunk() && this.orderedSelection.get(true).includes(card.id);
                case 'glue':
                    return card.effective_type_id == DaleCard_1.DaleCard.CT_GLUE && this.orderedSelection.get(true).includes(card.id);
                default:
                    var only_card_id_match = this.selectionMode.match(/^only_card_id(\d+)$/);
                    if (only_card_id_match) {
                        return card.id == +only_card_id_match[1];
                    }
                    var clickAnimalfolk_match = this.selectionMode.match(/^clickAnimalfolk(\d+)$/);
                    if (clickAnimalfolk_match) {
                        return card.effective_animalfolk_id == +clickAnimalfolk_match[1];
                    }
                    throw new Error("isClickable has no definition for selectionMode '".concat(this.selectionMode, "'"));
            }
        };
        DaleStock.prototype.isClickableHighPriority = function (card_id) {
            var card = new DaleCard_1.DaleCard(card_id);
            switch (this.selectionMode) {
                case 'clickAbilityPostCleanup':
                    return card.isPlayablePostCleanUp() && !card.isPassiveUsed();
                case 'clickOnTurnStart':
                    return true;
                case 'clickOnTrigger':
                    return true;
                case 'clickOvertime':
                    return true;
                default:
                    return false;
            }
        };
        DaleStock.prototype.setWrapClass = function (wrapClass, labelText) {
            var _a;
            if (wrapClass === void 0) { wrapClass = 'daleofmerchants-wrap-default'; }
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
        DaleStock.prototype.containsCardId = function (card_id) {
            for (var i in this.items) {
                var item = this.items[i];
                if (card_id == item.id) {
                    return true;
                }
            }
            return false;
        };
        DaleStock.prototype.containsTrigger = function (trigger) {
            for (var i in this.items) {
                var item = this.items[i];
                if (new DaleCard_1.DaleCard(item.id).trigger == trigger) {
                    return true;
                }
            }
            return false;
        };
        DaleStock.prototype.countTypeId = function (type_id) {
            var nbr = 0;
            for (var i in this.items) {
                var item = this.items[i];
                if (new DaleCard_1.DaleCard(item.id).effective_type_id == type_id) {
                    nbr++;
                }
            }
            return nbr;
        };
        DaleStock.prototype.sortItems = function () {
            if (this.enableSortItems) {
                _super.prototype.sortItems.call(this);
            }
        };
        DaleStock.prototype.addDaleCardToStock = function (card, from) {
            this.addToStockWithId(card.original_type_id, card.id, from);
            if (!this.enableSortItems) {
                var last = this.items.pop();
                this.items.unshift(last);
                this.updateDisplay();
            }
            this.setClickable(card.id);
            var stockitem_div = $(this.control_name + '_item_' + card.id);
            card.attachDiv(stockitem_div);
            card.updateLocation('stock');
        };
        DaleStock.prototype.removeFromStockById = function (itemId, to, noupdate) {
            _super.prototype.removeFromStockById.call(this, itemId, to, noupdate);
            new DaleCard_1.DaleCard(itemId).detachDiv();
        };
        DaleStock.prototype.removeFromStockByIdNoAnimation = function (id) {
            var stock = this;
            for (var i in stock.items) {
                var item = stock.items[i];
                if (item.id == id) {
                    var item_1 = stock.items[i];
                    var specific_div = $(this.control_name + "_item_" + item_1.id);
                    new DaleCard_1.DaleCard(item_1.id).detachDiv(specific_div);
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
        DaleStock.prototype.shuffleAnimation = function () {
            var _this = this;
            this._shuffle_animation = true;
            dojo.setStyle(this.container_div, 'transform', 'translateX(50%)');
            dojo.setStyle(this.container_div, 'transition', "transform ".concat(this.duration / 1000, "s ease-in-out, left ").concat(this.duration / 1000, "s ease-in-out"));
            this.updateDisplay();
            setTimeout((function () {
                _this._shuffle_animation = false;
                _this.updateDisplay();
                dojo.setStyle(_this.container_div, 'transform', '');
                setTimeout((function () {
                    dojo.setStyle(_this.container_div, 'transition', '');
                }).bind(_this), _this.duration);
            }), this.duration);
        };
        DaleStock.prototype.updateDisplay = function (from) {
            if (!this.control_name) {
                return;
            }
            var containerWidth = dojo.marginBox(this.control_name).w;
            var totalWidth = this.item_width * this.items.length + 5;
            this.item_margin = (containerWidth - totalWidth) / Math.max(1, this.items.length - 1);
            this.item_margin = Math.min(-3, this.item_margin);
            if (this._shuffle_animation) {
                this.item_margin = -this.item_width;
            }
            _super.prototype.updateDisplay.call(this, from);
            var div = undefined;
            for (var i in this.items) {
                var item = this.items[i];
                var index = +i + 1;
                div = $(this.getItemDivId(String(item.id)));
                div.dataset['arc'] = index + '/' + this.items.length;
                if (this.control_name.includes("hand")) {
                    dojo.setStyle(div, 'z-index', String(index + Images_3.Images.Z_INDEX_HAND_CARD));
                }
                else {
                    dojo.setStyle(div, 'z-index', String(index + Images_3.Images.Z_INDEX_LIMBO_CARD));
                }
            }
            if (this.item_margin < 0) {
                dojo.setStyle(this.container_div, 'left', "".concat(this.item_margin / 2, "px"));
            }
        };
        DaleStock.prototype.onResize = function () {
            var _this = this;
            setTimeout((function () { return _this.updateDisplay(); }).bind(this), 1);
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
define("components/types/ChameleonArgs", ["require", "exports", "components/DaleCard", "components/types/ChameleonChain"], function (require, exports, DaleCard_2, ChameleonChain_2) {
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
            console.warn("pickTarget");
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
            if (tree.card instanceof HTMLElement || !tree.card.isChameleon()) {
                validTargets.add(tree.card);
                return validTargets;
            }
            for (var i = 0; i < tree.children.length; i++) {
                var child = tree.children[i];
                var childValidTargets = this.getAllTargets(child);
                if (childValidTargets.size > 0 || (child === null || child === void 0 ? void 0 : child.card) instanceof HTMLElement || (child === null || child === void 0 ? void 0 : child.card.effective_type_id) == DaleCard_2.DaleCard.CT_GOODOLDTIMES) {
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
                    if (!(target instanceof HTMLElement) && target.effective_type_id != DaleCard_2.DaleCard.CT_GOODOLDTIMES) {
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
define("components/Pile", ["require", "exports", "components/Images", "components/DaleCard", "components/types/DaleWrapClass"], function (require, exports, Images_4, DaleCard_3, DaleWrapClass_2) {
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
            this.wrapClass = "daleofmerchants-wrap-default";
            this.showMainTitleBarInPopin = false;
            this.openPopinRequested = false;
            page.allPiles.push(this);
            this.pile_container_id = pile_container_id;
            this.pile_name = pile_name;
            this.player_id = player_id;
            $(pile_container_id).innerHTML = "\n            ".concat(pile_name ? "<h3 class=\"daleofmerchants-component-name\">".concat(pile_name, "</h3>") : "", "\n            <div class=\"daleofmerchants-pile\" style=\"").concat(Images_4.Images.getCardStyle(), "\">\n                <div class=\"daleofmerchants-pile-size\"></div>\n                <div class=\"daleofmerchants-pile-size daleofmerchants-pile-selected-size\" style=\"top: 16%;\"></div>\n            </div>\n        ");
            this.page = page;
            this.containerHTML = $(pile_container_id);
            this.placeholderHTML = Images_4.Images.getPlaceholder();
            var sizeElements = this.containerHTML.querySelectorAll('.daleofmerchants-pile-size');
            this.sizeHTML = sizeElements[0];
            this.selectedSizeHTML = sizeElements[1];
            this.cards = [];
            this._slidingCards = [];
            this.orderedSelection = new DaleCard_3.OrderedSelection();
            (_a = this.containerHTML.querySelector(".daleofmerchants-pile")) === null || _a === void 0 ? void 0 : _a.prepend(this.placeholderHTML);
            this.updateHTML();
            dojo.connect(this.orderedSelection, 'onSelect', this, 'onSelectPileCard');
            dojo.connect(this.orderedSelection, 'onUnselect', this, 'onUnselectPileCard');
            dojo.connect(this.placeholderHTML, 'onclick', this, "onClickPlaceholder");
        }
        Object.defineProperty(Pile.prototype, "size", {
            get: function () {
                return this.cards.length;
            },
            enumerable: false,
            configurable: true
        });
        Pile.prototype.getPlayerId = function () {
            if (this.player_id === undefined) {
                throw new Error("Pile ".concat(this.pile_container_id, " has no player_id"));
            }
            return this.player_id;
        };
        Pile.prototype.getCards = function () {
            return this.cards.slice();
        };
        Pile.prototype.updateHTMLPublic = function () {
            this.updateHTML();
        };
        Pile.prototype.updateHTML = function () {
            var _a;
            var topCard = this.peek(true);
            if ((this.selectionMode == 'multiple' || this.selectionMode == 'multipleJunk' || this.selectionMode == 'multipleFromTopWithGaps' || this.selectionMode == 'multipleFromTopNoGaps' || this.selectionMode == 'multipleProgrammatic' || this.selectionMode == 'multiplePrimarySecondary') && this.orderedSelection.getMaxSize() > 0) {
                var selectionSize = this.orderedSelection.getSize() + this.orderedSelection.getSize(true);
                var selectionMaxSize = this.orderedSelection.getMaxSize() + this.orderedSelection.getMaxSize(true);
                if (selectionSize < selectionMaxSize) {
                    this.containerHTML.classList.add("daleofmerchants-blinking");
                }
                else {
                    this.containerHTML.classList.remove("daleofmerchants-blinking");
                }
                this.selectedSizeHTML.classList.remove("daleofmerchants-hidden");
                this.selectedSizeHTML.innerHTML = "(x ".concat(selectionSize, ")");
            }
            else {
                this.selectedSizeHTML.classList.add("daleofmerchants-hidden");
            }
            this.sizeHTML.innerHTML = 'x ' + this.cards.length;
            if (!this.isPopinOpen && this.previousTopCard != topCard) {
                (_a = this.topCardHTML) === null || _a === void 0 ? void 0 : _a.remove();
                this.topCardHTML = undefined;
                if (topCard !== undefined) {
                    this.topCardHTML = topCard.toDiv(this.placeholderHTML, 'pile');
                    this.topCardHTML.classList.add("daleofmerchants-clickable");
                    dojo.connect(this.topCardHTML, 'onclick', this, "onClickTopCard");
                }
                this.previousTopCard = topCard;
            }
            if (this.selectionMode == 'topIncludingEmpty') {
                this.placeholderHTML.classList.add("daleofmerchants-clickable");
            }
            else {
                this.placeholderHTML.classList.remove("daleofmerchants-clickable");
            }
        };
        Pile.prototype.setZIndex = function (slidingElement) {
            var z_index = Images_4.Images.Z_INDEX_SLIDING_CARD + this._slidingCards.length;
            var style = slidingElement.getAttribute('style');
            slidingElement.setAttribute('style', style + "z-index: ".concat(z_index, ";"));
        };
        Pile.prototype.moveToTop = function (card) {
            if (this.cards.length == 0) {
                throw new Error("moveToTop failed: empty pile");
            }
            if (this.cards[this.cards.length - 1].id == card.id) {
                return;
            }
            for (var index = 0; index < this.cards.length - 1; index++) {
                if (this.cards[index].id == card.id) {
                    this.removeAt(index);
                    this.push(card);
                    return;
                }
            }
            console.warn(card);
            throw new Error("moveToTop failed: card not found");
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
            var card = this.cards.splice(index, 1)[0];
            this.updateHTML();
            return card;
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
            if (from) {
                this._slidingCards.push(card);
                var slidingElement = card.toDiv(this.placeholderHTML);
                this.placeholderHTML.appendChild(slidingElement);
                var thiz_2 = this;
                var callback = function (node) {
                    dojo.destroy(node);
                    var i = thiz_2._slidingCards.indexOf(card);
                    if (i > -1) {
                        thiz_2._slidingCards.splice(i, 1);
                    }
                    thiz_2.updateHTML();
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
            card.detachDiv(this.topCardHTML);
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
        Pile.prototype.cloneEventHandlers = function (source, clone) {
            var _this = this;
            var sourceElements = source.querySelectorAll("a");
            var cloneElements = clone.querySelectorAll("a");
            if (sourceElements.length != cloneElements.length) {
                console.warn(sourceElements);
                console.warn(cloneElements);
                console.warn("cloneEventHandlers failed: unequal amount of anchor elements found");
                clone.remove();
                return;
            }
            sourceElements.forEach(function (sourceElement, index) {
                var cloneElement = cloneElements[index];
                if (cloneElement.id != sourceElement.id) {
                    console.warn(sourceElements);
                    console.warn(cloneElements);
                    console.warn("cloneEventHandlers failed: '".concat(cloneElement.id, "' != '").concat(sourceElement.id, "'"));
                    clone.remove();
                    return;
                }
                dojo.connect(cloneElement, "onclick", function () {
                    console.warn("Redirect onclick to the related 'maintitlebar_content' button");
                    _this.openPopinRequested = false;
                    sourceElement.click();
                    if (!_this.openPopinRequested) {
                        _this.closePopin();
                    }
                });
            });
        };
        Pile.prototype.openPopin = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g;
            this.openPopinRequested = true;
            if (this.isPopinOpen) {
                return;
            }
            console.warn("openPopin");
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
            var maintitlebar = null;
            if (this.showMainTitleBarInPopin) {
                maintitlebar = (_e = $("maintitlebar_content")) === null || _e === void 0 ? void 0 : _e.cloneNode(true);
                maintitlebar.id = "maintitlebar_content_clone";
                setTimeout(function () {
                    _this.cloneEventHandlers($("maintitlebar_content"), $("maintitlebar_content_clone"));
                }, 1);
                (_f = $("maintitlebar_content")) === null || _f === void 0 ? void 0 : _f.classList.add("daleofmerchants-transparent");
            }
            this.popin.setContent("".concat((_g = maintitlebar === null || maintitlebar === void 0 ? void 0 : maintitlebar.outerHTML) !== null && _g !== void 0 ? _g : "", "<div id=\"").concat(popin_id, "-card-container\" class=\"popin-card-container ").concat(this.wrapClass, "\"></div>"));
            var container_id = popin_id + "-card-container";
            var _loop_4 = function (card) {
                var div = card.toDiv(container_id, 'stock');
                div.classList.add("daleofmerchants-relative");
                if (this_4.isClickable(card)) {
                    div.classList.add("daleofmerchants-clickable");
                    var thiz_3 = this_4;
                    dojo.connect(div, 'onclick', function () {
                        thiz_3.onClickCard(card, div);
                    });
                }
                else if (this_4.isGrayedOut(card)) {
                    div.classList.add("daleofmerchants-card-grayed-out");
                }
                this_4.cardIdToPopinDiv.set(card.id, div);
            };
            var this_4 = this;
            for (var _i = 0, _h = this.cards.slice().reverse(); _i < _h.length; _i++) {
                var card = _h[_i];
                _loop_4(card);
            }
            dojo.connect($("popin_" + this.popin.id + "_close"), "onclick", this, "onClosePopin");
            this.isPopinOpen = true;
            this.popin.show();
            this.orderedSelection.updateIcons();
            this.orderedSelection.updateIcons(true);
        };
        Pile.prototype.onClickTopCard = function () {
            switch (this.selectionMode) {
                case 'top':
                case 'topIncludingEmpty':
                    this.page.onSelectPileCard(this, this.peek().id);
                    break;
                case 'noneCantViewContent':
                    break;
                default:
                    this.openPopin();
                    break;
            }
        };
        Pile.prototype.onClickPlaceholder = function () {
            if (this.size != 0) {
                return;
            }
            switch (this.selectionMode) {
                case 'topIncludingEmpty':
                    this.page.onSelectPileCard(this, undefined);
                    break;
            }
        };
        Pile.prototype.onUnselectPileCard = function (card_id) {
            this.page.onUnselectPileCard(this, card_id);
        };
        Pile.prototype.onSelectPileCard = function (card_id) {
            this.page.onSelectPileCard(this, card_id);
        };
        Pile.prototype.onClickCard = function (card, div) {
            console.warn("Clicked on a card in the popin");
            var chameleonArgs = this.page.chameleonArgs;
            if (chameleonArgs) {
                this.page.showMessage(_("Please select a valid target for ") + "'".concat(chameleonArgs.currentSource.name, "'"), "error");
                return;
            }
            switch (this.selectionMode) {
                case 'none':
                    return;
                case 'single':
                case 'singleAnimalfolk':
                    this.page.onSelectPileCard(this, card.id);
                    this.closePopin();
                    break;
                case 'multiple':
                case 'multipleJunk':
                    this.orderedSelection.toggle(card.id);
                    this.updateHTML();
                    break;
                case 'multipleFromTopWithGaps':
                    var multipleFromTopWithGaps_nbr = this.orderedSelection.getMaxSize();
                    var multipleFromTopWithGaps_index = -1;
                    for (var i = Math.max(0, this.cards.length - multipleFromTopWithGaps_nbr); i < this.cards.length; i++) {
                        if (this.cards[i].id == card.id) {
                            multipleFromTopWithGaps_index = i;
                            break;
                        }
                    }
                    if (multipleFromTopWithGaps_index == -1) {
                        this.page.showMessage(_("This card is not within the top cards of the pile") + " (top ".concat(multipleFromTopWithGaps_nbr, ")"), 'error');
                        return;
                    }
                    this.orderedSelection.toggle(card.id);
                    this.updateHTML();
                    break;
                case 'multipleFromTopNoGaps':
                    var multipleFromTopNoGaps_nbr = this.orderedSelection.getMaxSize();
                    var multipleFromTopNoGaps_index = -1;
                    for (var i = Math.max(0, this.cards.length - multipleFromTopNoGaps_nbr); i < this.cards.length; i++) {
                        if (this.cards[i].id == card.id) {
                            multipleFromTopNoGaps_index = i;
                            break;
                        }
                    }
                    if (multipleFromTopNoGaps_index == -1) {
                        this.page.showMessage(_("This card is not within the top cards of the pile") + " (top ".concat(multipleFromTopNoGaps_nbr, ")"), 'error');
                        return;
                    }
                    if (this.orderedSelection.includes(card.id)) {
                        var deselect_self = true;
                        for (var i = Math.max(0, this.cards.length - multipleFromTopNoGaps_nbr); i < multipleFromTopNoGaps_index; i++) {
                            if (this.orderedSelection.includes(this.cards[i].id)) {
                                deselect_self = false;
                            }
                            this.orderedSelection.unselectItem(this.cards[i].id);
                        }
                        if (deselect_self) {
                            this.orderedSelection.unselectItem(this.cards[multipleFromTopNoGaps_index].id);
                        }
                    }
                    else {
                        for (var i = multipleFromTopNoGaps_index; i < this.cards.length; i++) {
                            this.orderedSelection.selectItem(this.cards[i].id);
                        }
                    }
                    this.updateHTML();
                    break;
                case 'multiplePrimarySecondary':
                    if (this.orderedSelection.includes(card.id)) {
                        if (this.orderedSelection.getSize(true) < this.orderedSelection.getMaxSize(true)) {
                            this.orderedSelection.unselectItem(card.id);
                            this.orderedSelection.selectItem(card.id, true);
                        }
                        else {
                            this.orderedSelection.unselectItem(card.id);
                        }
                    }
                    else if (this.orderedSelection.includes(card.id, true)) {
                        this.orderedSelection.unselectItem(card.id, true);
                    }
                    else if (this.orderedSelection.getSize() < this.orderedSelection.getMaxSize()) {
                        this.orderedSelection.selectItem(card.id);
                    }
                    else {
                        this.orderedSelection.selectItem(card.id, true);
                    }
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
            (_a = this.containerHTML) === null || _a === void 0 ? void 0 : _a.classList.remove("daleofmerchants-selected");
        };
        Pile.prototype.selectTopCard = function () {
            var _a;
            (_a = this.containerHTML) === null || _a === void 0 ? void 0 : _a.classList.add("daleofmerchants-selected");
        };
        Pile.prototype.setWrapClass = function (wrapClass) {
            var _a;
            if (wrapClass === void 0) { wrapClass = 'daleofmerchants-wrap-default'; }
            if (wrapClass != 'previous') {
                (_a = this.containerHTML.classList).remove.apply(_a, DaleWrapClass_2.DALE_WRAP_CLASSES);
                if (wrapClass) {
                    this.containerHTML.classList.add(wrapClass);
                }
                this.wrapClass = wrapClass;
            }
        };
        Pile.prototype.setSelectionMode = function (mode, iconType, wrapClass, max, secondaryIconType, secondaryMax) {
            if (wrapClass === void 0) { wrapClass = 'daleofmerchants-wrap-default'; }
            if (max === void 0) { max = 0; }
            if (secondaryMax === void 0) { secondaryMax = 0; }
            this.setWrapClass(wrapClass);
            this.orderedSelection.setMaxSize(max);
            this.orderedSelection.setMaxSize(secondaryMax, true);
            this.orderedSelection.setIconType(iconType, secondaryIconType);
            this.selectionMode = mode;
            this.showMainTitleBarInPopin = false;
            switch (mode) {
                case 'noneCantViewContent':
                    return;
                case 'multiple':
                case 'multipleJunk':
                case 'multipleFromTopWithGaps':
                case 'multipleFromTopNoGaps':
                case 'multipleProgrammatic':
                case 'multiplePrimarySecondary':
                    this.showMainTitleBarInPopin = true;
                    if (this.orderedSelection.getSize() < this.orderedSelection.getMaxSize()) {
                        this.containerHTML.classList.add("daleofmerchants-blinking");
                    }
                    else {
                        this.containerHTML.classList.remove("daleofmerchants-blinking");
                    }
                    break;
                case 'single':
                case 'singleAnimalfolk':
                    this.showMainTitleBarInPopin = true;
                    this.containerHTML.classList.add("daleofmerchants-blinking");
                    this.openPopin();
                    break;
                default:
                    this.containerHTML.classList.remove("daleofmerchants-blinking");
                    this.orderedSelection.unselectAll();
                    this.closePopin();
                    break;
            }
            this.updateHTML();
        };
        Pile.prototype.isGrayedOut = function (card) {
            switch (this.selectionMode) {
                case 'singleAnimalfolk':
                case 'multipleFromTopWithGaps':
                case 'multipleFromTopNoGaps':
                case 'multipleJunk':
                    return !this.isClickable(card);
                default:
                    return false;
            }
        };
        Pile.prototype.isClickable = function (card) {
            switch (this.selectionMode) {
                case 'single':
                    return true;
                case 'singleAnimalfolk':
                    return card.isAnimalfolk();
                case 'multiple':
                    return this.orderedSelection.getMaxSize() > 0;
                case 'multipleJunk':
                    return card.isJunk();
                case 'multipleFromTopWithGaps':
                case 'multipleFromTopNoGaps':
                    var multipleFromTop_nbr = this.orderedSelection.getMaxSize();
                    for (var i = Math.max(0, this.cards.length - multipleFromTop_nbr); i < this.cards.length; i++) {
                        var topCard = this.cards[i];
                        if (card === topCard) {
                            return true;
                        }
                    }
                    return false;
                case 'multiplePrimarySecondary':
                    return true;
                default:
                    return false;
            }
        };
        Pile.prototype.closePopin = function () {
            if (this.isPopinOpen) {
                console.warn("closePopin");
                this.popin.hide();
                this.onClosePopin();
            }
        };
        Pile.prototype.onClosePopin = function () {
            var _a;
            console.warn("onClosePopin");
            for (var _i = 0, _b = this.cards; _i < _b.length; _i++) {
                var card = _b[_i];
                card.detachDiv();
            }
            this.isPopinOpen = false;
            this.updateHTML();
            (_a = $("maintitlebar_content")) === null || _a === void 0 ? void 0 : _a.classList.remove("daleofmerchants-transparent");
            var clone = $("maintitlebar_content_clone");
            if (clone) {
                clone.id = "maintitlebar_content_clone_closed";
            }
        };
        return Pile;
    }());
    exports.Pile = Pile;
});
define("components/HiddenPile", ["require", "exports", "components/DaleCard", "components/Pile"], function (require, exports, DaleCard_4, Pile_1) {
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
        HiddenPile.prototype.openPopin = function () {
            if (this.cards[0] === undefined || this.cards[0].id == 0) {
                this.page.showMessage(_("This deck contains ") + this.size + _(" card(s)"), 'info');
            }
            else {
                _super.prototype.openPopin.call(this);
            }
        };
        HiddenPile.prototype.peek = function (exclude_sliding_cards) {
            if (exclude_sliding_cards === void 0) { exclude_sliding_cards = false; }
            return _super.prototype.peek.call(this, exclude_sliding_cards) ? new DaleCard_4.DaleCard(0, 0) : undefined;
        };
        HiddenPile.prototype.setContent = function (cards) {
            if (this.cards.length != cards.length) {
                throw Error("Client expected a deck of size ".concat(this.cards.length, ", but got size ").concat(cards.length, " from the server"));
            }
            this.cards = cards;
            this.updateHTML();
        };
        HiddenPile.prototype.hideContent = function () {
            this.closePopin();
            var size = this.cards.length;
            this.cards = [];
            this.pushHiddenCards(size);
        };
        return HiddenPile;
    }(Pile_1.Pile));
    exports.HiddenPile = HiddenPile;
});
define("components/CardSlot", ["require", "exports", "components/Images"], function (require, exports, Images_5) {
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
            this.container = container;
            this.container.classList.add("daleofmerchants-slot");
            this._card = undefined;
            if (card) {
                this.insertCard(card);
            }
            if (this.container.onclick != null) {
                console.warn("CardSlot is given a container that already has an onclick handler. This handler will may be overwritten.");
            }
        }
        Object.defineProperty(CardSlot.prototype, "id", {
            get: function () {
                if (this.container.id == "") {
                    this.container.id = "card-slot-id-" + CardSlot.UNIQUE_ID++;
                }
                return this.container.id;
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
                return this.container.firstChild;
            },
            enumerable: false,
            configurable: true
        });
        CardSlot.prototype.hasCard = function () {
            return this._card != undefined;
        };
        CardSlot.prototype.insertCard = function (card, from, callback) {
            this.removeCard();
            var cardDiv = card.toDiv(this.id, from ? 'moving' : undefined);
            this.container.appendChild(cardDiv);
            this._card = card;
            this.setClickable(this.clickable);
            if (from) {
                this.parent.page.placeOnObject(cardDiv, from);
                var animSlide = this.parent.page.slideToObject(cardDiv, this.container);
                var onEnd = function (node) {
                    dojo.setStyle(node, 'left', '0px');
                    dojo.setStyle(node, 'top', '0px');
                    if (callback) {
                        callback(node);
                    }
                };
                var animCallback = dojo.animateProperty({ node: cardDiv, duration: 0, onEnd: onEnd });
                var anim = dojo.fx.chain([animSlide, animCallback]);
                anim.play();
            }
        };
        CardSlot.prototype.removeCard = function (to) {
            if (this.hasCard()) {
                var removedCard = this._card;
                this.container.replaceChildren();
                this._card = undefined;
                if (removedCard && to) {
                    var temp_div = removedCard.toDiv();
                    dojo.setStyle(temp_div, 'z-index', String(Images_5.Images.Z_INDEX_SLIDING_CARD));
                    this.parent.page.slideTemporaryObject(temp_div, this.container, this.container, to);
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
            this.container.remove();
        };
        CardSlot.prototype.selectItem = function () {
            this.container.classList.add("daleofmerchants-selected");
            this.selected = true;
        };
        CardSlot.prototype.unselectItem = function () {
            this.container.classList.remove("daleofmerchants-selected");
            this.selected = false;
        };
        CardSlot.prototype.setClickable = function (enable) {
            var _a;
            this.clickable = enable;
            var div = (_a = this._card) === null || _a === void 0 ? void 0 : _a.div;
            if (div) {
                if (enable) {
                    var thiz_4 = this;
                    div.onclick = function (evt) {
                        evt.stopPropagation();
                        thiz_4.parent.onCardSlotClick(thiz_4);
                    };
                    div.classList.add("daleofmerchants-clickable");
                }
                else {
                    div.classList.remove("daleofmerchants-clickable");
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
            stock.addDaleCardToStock(this._card, this.container);
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
define("components/MarketBoard", ["require", "exports", "components/DaleCard", "components/Images", "components/CardSlot", "components/types/DaleWrapClass", "components/DaleIcons"], function (require, exports, DaleCard_5, Images_6, CardSlot_1, DaleWrapClass_3, DaleIcons_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MarketBoard = void 0;
    var MarketBoard = (function () {
        function MarketBoard(page) {
            this.MAX_SIZE = 5;
            this.page = page;
            $("daleofmerchants-market-board-background").setAttribute("style", "\n            width: ".concat(Images_6.Images.MARKET_WIDTH_S - Images_6.Images.MARKET_PADDING_LEFT_S - Images_6.Images.MARKET_PADDING_RIGHT_S, "px;\n            height: ").concat(Images_6.Images.MARKET_HEIGHT_S - Images_6.Images.MARKET_PADDING_TOP_S - Images_6.Images.MARKET_PADDING_BOTTOM_S, "px;\n\t\t\tpadding-top: ").concat(Images_6.Images.MARKET_PADDING_TOP_S, "px;\n\t\t\tpadding-left: ").concat(Images_6.Images.MARKET_PADDING_LEFT_S, "px;\n            padding-bottom: ").concat(Images_6.Images.MARKET_PADDING_BOTTOM_S, "px;\n\t\t\tpadding-right: ").concat(Images_6.Images.MARKET_PADDING_RIGHT_S, "px;\n\t\t"));
            this.container = $("daleofmerchants-market-board-background").querySelector("#daleofmerchants-market-board");
            this.slots = [];
            for (var pos = this.MAX_SIZE - 1; pos >= 0; pos--) {
                var stackContainer = document.createElement("div");
                stackContainer.classList.add("daleofmerchants-stack-container");
                if (pos == 0) {
                    stackContainer.setAttribute('style', "min-width: ".concat(Images_6.Images.CARD_WIDTH_S, "px;margin-left: ").concat(Images_6.Images.MARKET_ITEM_MARGIN_S, "px;"));
                }
                else {
                    stackContainer.setAttribute('style', "max-width: ".concat(Images_6.Images.CARD_WIDTH_S, "px;margin-left: ").concat(pos == 4 ? 0 : Images_6.Images.MARKET_ITEM_MARGIN_S, "px;"));
                }
                var slotDiv = Images_6.Images.getPlaceholder();
                slotDiv.classList.add("daleofmerchants-placeholder-market");
                stackContainer.appendChild(slotDiv);
                if (pos > 0) {
                    stackContainer.appendChild(DaleIcons_6.DaleIcons.getCostModificationIcon(pos - 1));
                }
                this.container.appendChild(stackContainer);
                this.slots.unshift(new CardSlot_1.CardSlot(this, pos, slotDiv));
            }
            this.orderedSelection = new DaleCard_5.OrderedSelection();
            this.selectionMode = 0;
            var thiz = this;
            addEventListener("resize", function () { return setTimeout(function () { return thiz.onResize(); }, 1); });
            this.onResize();
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
            var _a;
            pos = this.getValidPos(pos);
            console.warn("INSERT CARD IN POS " + pos);
            this.slots[pos].insertCard(card, from);
            (_a = this.slots[pos].card) === null || _a === void 0 ? void 0 : _a.updateLocation('market');
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
                        console.warn("".concat(pos, " slides to ").concat(emptyPos));
                        var card = this.slots[pos].removeCard();
                        this.insertCard(card, emptyPos);
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
            if (wrapClass === void 0) { wrapClass = 'daleofmerchants-wrap-default'; }
            if (wrapClass != 'previous') {
                (_a = this.container.classList).remove.apply(_a, DaleWrapClass_3.DALE_WRAP_CLASSES);
                if (wrapClass) {
                    this.container.classList.add(wrapClass);
                }
            }
        };
        MarketBoard.prototype.setSelectionMode = function (mode, iconType, wrapClass) {
            if (wrapClass === void 0) { wrapClass = "daleofmerchants-wrap-default"; }
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
        MarketBoard.prototype.setClickableForReplacement = function (value) {
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                if (!slot.card) {
                    slot.setClickable(false);
                }
                else {
                    slot.setClickable(Math.abs(slot.card.original_value - value) <= 1);
                }
            }
        };
        MarketBoard.prototype.getSelectedCardId = function () {
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                if (slot.selected && slot.hasCard()) {
                    return slot.card.id;
                }
            }
            return null;
        };
        MarketBoard.prototype.getSelected = function (pos) {
            pos = this.getValidPos(pos);
            return this.slots[pos].selected;
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
                    new_card.updateLocation('market');
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
        MarketBoard.prototype.contains = function (card_id) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var slot = _b[_i];
                if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                    return true;
                }
            }
            return false;
        };
        MarketBoard.prototype.saveArrangement = function () {
            var card_ids = [];
            for (var _i = 0, _a = this.getCards(); _i < _a.length; _i++) {
                var card = _a[_i];
                card_ids.push(card.id);
            }
            this.saved_arrangement = card_ids;
            return card_ids.slice();
        };
        MarketBoard.prototype.restoreArrangement = function () {
            if (this.saved_arrangement) {
                this.rearrange(this.saved_arrangement);
                this.saved_arrangement = undefined;
            }
        };
        MarketBoard.prototype.rearrange = function (card_ids) {
            if (this.getCards().length != card_ids.length) {
                throw new Error("market.rearrange failed: the number of cards must remain the same after rearranging");
            }
            var arrangementChanged = false;
            var froms = new Map();
            for (var pos = 0; pos < this.MAX_SIZE; pos++) {
                var slot = this.slots[pos];
                var old_card = slot.card;
                if (old_card) {
                    if (!card_ids.includes(old_card.id)) {
                        throw new Error("market.rearrange failed: card ".concat(old_card.id, " does not exist in the new arrangement"));
                    }
                    if (card_ids[pos] != old_card.id) {
                        arrangementChanged = true;
                    }
                    froms.set(old_card.id, slot.container);
                }
            }
            if (arrangementChanged) {
                for (var pos = 0; pos < this.MAX_SIZE; pos++) {
                    var new_card = new DaleCard_5.DaleCard(card_ids[pos]);
                    this.insertCard(new_card, pos, froms.get(new_card.id));
                }
            }
        };
        MarketBoard.prototype.onResize = function () {
            var _a, _b, _c, _d;
            var totalWidth = this.container.getBoundingClientRect().width;
            if (totalWidth < (1 + Images_6.Images.STACK_MIN_MARGIN_X) * Images_6.Images.CARD_WIDTH_S * this.MAX_SIZE) {
                for (var i = 1; i < this.slots.length; i++) {
                    (_a = this.slots[i]) === null || _a === void 0 ? void 0 : _a.container.classList.add("daleofmerchants-placeholder-partially-covered");
                }
            }
            else {
                for (var i = 1; i < this.slots.length; i++) {
                    (_b = this.slots[i]) === null || _b === void 0 ? void 0 : _b.container.classList.remove("daleofmerchants-placeholder-partially-covered");
                }
            }
            var overlap = Math.max(0, Images_6.Images.CARD_WIDTH_S - totalWidth / this.MAX_SIZE);
            var left = Math.round((Images_6.Images.CARD_WIDTH_S - overlap) / 2) + 'px';
            for (var pos = 1; pos < this.MAX_SIZE; pos++) {
                var icon = (_d = (_c = this.slots[pos]) === null || _c === void 0 ? void 0 : _c.container.parentElement) === null || _d === void 0 ? void 0 : _d.querySelector(".daleofmerchants-icon");
                if (icon) {
                    dojo.setStyle(icon, 'left', left);
                }
            }
        };
        return MarketBoard;
    }());
    exports.MarketBoard = MarketBoard;
});
define("components/Stall", ["require", "exports", "components/DaleCard", "components/Images", "components/CardSlot", "components/DaleIcons"], function (require, exports, DaleCard_6, Images_7, CardSlot_2, DaleIcons_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Stall = void 0;
    var Stall = (function () {
        function Stall(page, player_id) {
            this.page = page;
            this.player_id = player_id;
            this.wrapPortrait = $("daleofmerchants-stall-wrap-portrait-" + player_id);
            this.wrapLandscape = $("daleofmerchants-stall-wrap-landscape-" + player_id);
            console.warn(this.wrapPortrait);
            console.warn(this.wrapLandscape);
            this.container = $("daleofmerchants-stall-" + player_id);
            this.stackContainers = [];
            this.selectionMode = 'none';
            this.slots = [];
            this.numberOfStacks = 0;
            this.firstStackValue = 1;
            for (var i = 0; i < Stall.MAX_STACKS; i++) {
                this.createNewStack();
            }
            dojo.setStyle(this.container.parentElement, 'max-width', Images_7.Images.CARD_WIDTH_S * (1 + Images_7.Images.STACK_MAX_MARGIN_X) * Stall.MAX_STACKS + 'px');
            this.updateHeight();
            var thiz = this;
            addEventListener("resize", function () { return setTimeout(function () { return thiz.onResize(); }, 1); });
            this.onResize();
        }
        Object.defineProperty(Stall.prototype, "leftMostPlaceholder", {
            get: function () {
                var placeholder = this.container.querySelector(".daleofmerchants-placeholder");
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
                    prevStackContainer.setAttribute('style', "max-width: ".concat(Images_7.Images.CARD_WIDTH_S * (1 + Images_7.Images.STACK_MAX_MARGIN_X), "px;"));
                }
                var stackContainer = document.createElement("div");
                stackContainer.classList.add("daleofmerchants-stack-container");
                stackContainer.setAttribute('style', "min-width: ".concat(Images_7.Images.CARD_WIDTH_S, "px;"));
                var placeholder = Images_7.Images.getPlaceholder();
                placeholder.classList.add("daleofmerchants-placeholder-stall");
                if (this.slots.length > 0) {
                    stackContainer.classList.add("daleofmerchants-grayed-out");
                    placeholder.classList.add("daleofmerchants-placeholder-partially-covered");
                }
                var text = document.createElement("div");
                text.classList.add("daleofmerchants-text");
                text.textContent = _("Build a new stack");
                placeholder.appendChild(text);
                var stackIndexDiv = document.createElement("div");
                stackIndexDiv.classList.add("daleofmerchants-stack-index");
                stackIndexDiv.innerText = String(this.slots.length + 1);
                placeholder.append(stackIndexDiv);
                placeholder.appendChild(DaleIcons_7.DaleIcons.getBuildIcon());
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
                var maxHeight = 1;
                for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                    var stack = _b[_i];
                    maxHeight = Math.max(maxHeight, stack.length);
                }
                var y_offset = Images_7.Images.VERTICAL_STACK_OFFSET_S * (maxHeight - 1);
                console.warn("Update height");
                console.warn(stackContainer.getAttribute('style'));
                var prevStyleWithoutHeight = (_a = stackContainer.getAttribute('style')) === null || _a === void 0 ? void 0 : _a.replace(/height:.*px;/, '');
                console.warn(prevStyleWithoutHeight);
                stackContainer.setAttribute('style', prevStyleWithoutHeight + "height: ".concat(Images_7.Images.CARD_HEIGHT_S + y_offset, "px;"));
            }
        };
        Stall.prototype.createNewSlot = function (stack_index, card) {
            if (stack_index < 0 || stack_index >= this.slots.length || stack_index >= this.stackContainers.length) {
                throw new Error("Cannot make a slot in non-existing stack ".concat(stack_index));
            }
            var stackContainer = this.stackContainers[stack_index];
            var stack = this.slots[stack_index];
            var index = stack.length;
            var y_offset = Images_7.Images.VERTICAL_STACK_OFFSET_S * index;
            var div = document.createElement("div");
            div.setAttribute('style', "".concat(Images_7.Images.getCardStyle(), ";\n            position: absolute;\n            top: ").concat(y_offset, "px\n        "));
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
            stackContainer.classList.remove("daleofmerchants-grayed-out");
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
            console.warn("insertCard(stack_index=".concat(stack_index, ", index=").concat(index, ")"));
            stack[index].insertCard(card, from);
            setTimeout(function () {
                var _a;
                (_a = stack[index].card) === null || _a === void 0 ? void 0 : _a.updateLocation('stall');
            }, 750);
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
            console.warn("Stall setSelectionMode");
            console.warn(mode);
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
                    placeholder.classList.add("daleofmerchants-clickable");
                    placeholder.parentElement.classList.remove("daleofmerchants-grayed-out");
                    placeholder.onclick = this.page.onRequestBuildAction.bind(this.page);
                }
                else {
                    placeholder.classList.remove("daleofmerchants-clickable");
                    placeholder.parentElement.classList.add("daleofmerchants-grayed-out");
                    placeholder.onclick = null;
                }
            }
        };
        Stall.prototype.selectLeftPlaceholder = function () {
            var placeholder = this.leftMostPlaceholder;
            if (placeholder) {
                placeholder.classList.add("daleofmerchants-selected");
                placeholder.parentElement.classList.remove("daleofmerchants-grayed-out");
            }
        };
        Stall.prototype.unselectLeftPlaceholder = function () {
            var placeholder = this.leftMostPlaceholder;
            if (placeholder) {
                placeholder.classList.remove("daleofmerchants-selected");
                placeholder.parentElement.classList.add("daleofmerchants-grayed-out");
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
                        new_card.updateLocation('stall');
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
        Stall.prototype.contains = function (card_id) {
            var _a;
            for (var _i = 0, _b = this.slots; _i < _b.length; _i++) {
                var stack = _b[_i];
                for (var _c = 0, stack_8 = stack; _c < stack_8.length; _c++) {
                    var slot = stack_8[_c];
                    if (((_a = slot.card) === null || _a === void 0 ? void 0 : _a.id) == card_id) {
                        return true;
                    }
                }
            }
            return false;
        };
        Stall.prototype.increaseStackValue = function (nbr) {
            this.firstStackValue += nbr;
            var i = this.firstStackValue;
            var isEffectiveValue = this.firstStackValue != 1;
            console.log("isEffectiveValue = ", isEffectiveValue);
            this.container.querySelectorAll(".daleofmerchants-stack-index").forEach(function (stackIndexDiv) {
                stackIndexDiv.classList.toggle("daleofmerchants-effective-value", isEffectiveValue);
                stackIndexDiv.innerText = String(i++);
            });
        };
        Stall.prototype.onResize = function () {
            if (window.innerWidth < 1250) {
                this.wrapPortrait.appendChild(this.container);
                this.wrapPortrait.classList.remove("daleofmerchants-hidden");
                this.wrapLandscape.classList.add("daleofmerchants-hidden");
            }
            else {
                this.wrapLandscape.appendChild(this.container);
                this.wrapLandscape.classList.remove("daleofmerchants-hidden");
                this.wrapPortrait.classList.add("daleofmerchants-hidden");
            }
            if (this.container.getBoundingClientRect().width < (1 + Images_7.Images.STACK_MIN_MARGIN_X) * Images_7.Images.CARD_WIDTH_S * Stall.MAX_STACKS) {
                for (var i = 1; i < this.slots.length; i++) {
                    var placeholder = this.stackContainers[i].querySelector(".daleofmerchants-placeholder");
                    placeholder === null || placeholder === void 0 ? void 0 : placeholder.classList.add("daleofmerchants-placeholder-partially-covered");
                }
            }
            else {
                for (var i = 1; i < this.slots.length; i++) {
                    var placeholder = this.stackContainers[i].querySelector(".daleofmerchants-placeholder");
                    placeholder === null || placeholder === void 0 ? void 0 : placeholder.classList.remove("daleofmerchants-placeholder-partially-covered");
                }
            }
        };
        Stall.MAX_STACK_SIZE = 1000;
        Stall.MAX_STACKS = 8;
        return Stall;
    }());
    exports.Stall = Stall;
});
define("components/types/MainClientState", ["require", "exports", "components/DaleCard", "components/DaleIcons"], function (require, exports, DaleCard_7, DaleIcons_8) {
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
        MainClientState.prototype.getArgs = function () {
            return this._args;
        };
        MainClientState.prototype.getSpendArgs = function () {
            if (!('spend_coins' in this._args && 'spend_card_ids' in this._args)) {
                console.warn(this._stack);
                console.warn(this._args);
                throw new Error("getSpendArgs requires state '".concat(this._name, "' to have keys 'spend_coins' and 'spend_card_ids'"));
            }
            return {
                spend_coins: this._args.spend_coins,
                spend_card_ids: this._args.spend_card_ids
            };
        };
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
                        return _("Essential Purchase: ${you} may <stronger>toss</stronger> up to 3 selected junk cards");
                    case 'client_glue':
                        return _("Glue: ${you} may keep Glue in your hand");
                    case 'chameleon_flexibleShopkeeper':
                        return _("Flexible Shopkeeper: ${you} must copy a card from your rightmost stack");
                    case 'chameleon_reflection':
                        return _("Reflection: ${you} must copy a card from the top of another player's discard pile");
                    case 'chameleon_goodoldtimes':
                        switch (this._args.mode) {
                            case 'copy':
                                return _("Good Old Times: ${you} must copy the bin's top card");
                            case 'tossOrCopy':
                                return _("Good Old Times: ${you} must copy the bin's top card or toss the supply's top card");
                            case 'tossOptional':
                                return _("Good Old Times: ${you} may toss the supply's top card");
                            case 'tossMandatory':
                                return _("Good Old Times: ${you} must toss the supply's top card");
                            default:
                                throw new Error("Unexpected CT_GOODOLDTIMES mode");
                        }
                    case 'chameleon_trendsetting':
                        return _("Trendsetting: ${you} must copy a card in the market");
                    case 'chameleon_seeingdoubles':
                        return _("Seeing Doubles: ${you} must copy another card in your hand");
                    case 'client_choicelessPassiveCard':
                        return _("${card_name}: ${you} may use this card's ability");
                    case 'client_selectOpponentPassive':
                        return _("${card_name}: ${you} must choose an opponent");
                    case 'client_selectPlayerPassive':
                        return _("${card_name}: ${you} must choose a player");
                    case 'client_marketDiscovery':
                        return _("${card_name}: ${you} may <strong>toss</strong> the supply's top card or purchase the bin's top card");
                    case 'client_calculations':
                        return _("${card_name}: ${you} may rearrange any cards in the market");
                    case 'client_sliceoflife':
                        return _("${card_name}: ${you} must choose 2 cards to discard");
                    case 'client_spinningWheel':
                        return _("${card_name}: ${you} must choose 1-3 cards to discard");
                    case 'client_barricade':
                        if (this._args.nbr_junk == 0) {
                            return _("${card_name}: Are you sure you want to use this passive ability without any effects?");
                        }
                        else {
                            return _("${card_name}: ${you} may search your discard pile for up to ${nbr_junk} junk cards");
                        }
                    case 'client_fizzle':
                        return _("${card_name}: Are you sure you want to play this technique without any effects?");
                    case 'client_triggerFizzle':
                        return _("${card_name}: Are you sure you want to resolve this technique without any effects?");
                    case 'client_selectOpponentTechnique':
                        return _("${card_name}: ${you} must choose an opponent");
                    case 'client_selectPlayerTechnique':
                        return _("${card_name}: ${you} must choose a player");
                    case 'client_choicelessTechniqueCard':
                        return _("${card_name}: ${you} may play this card as a technique");
                    case 'client_choicelessTriggerTechniqueCard':
                        return _("${card_name}: ${you} must resolve this technique");
                    case 'client_spend':
                        return _("${card_name}: ${you} must <stronger>spend</stronger> ${cost}");
                    case 'client_spendx':
                        return _("${card_name}: ${you} must <stronger>spend</stronger> ${cost_displayed}");
                    case 'client_stove':
                        return _("${card_name}: ${you} may <stronger>spend</stronger> x to change this card's value");
                    case 'client_swiftBroker':
                        return _("${card_name}: ${you} may choose the order to discard your hand");
                    case 'client_shatteredRelic':
                        return _("${card_name}: ${you} must choose a card to <stronger>toss</stronger>");
                    case 'client_acorn':
                        return _("${card_name}: ${you} must choose a card from an opponent's stall to swap with");
                    case 'client_giftVoucher':
                        return _("${card_name}: ${you} must choose a card from the market to swap with");
                    case 'client_loyalPartner':
                        return _("${card_name}: ${you} may choose to <stronger>toss</stronger> any number of cards from the market");
                    case 'client_prepaidGood':
                        return _("${card_name}: ${you} must choose a card from the market");
                    case 'client_nuisance':
                        return _("${card_name}: ${you} must choose 1-2 opponent(s)");
                    case 'client_rottenFood':
                        return _("${card_name}: ${you} must choose a card to place on another player\'s deck");
                    case 'client_dirtyExchange':
                        return _("${card_name}: ${you} must choose an opponent to take a card from");
                    case 'client_treasureHunter':
                        return _("${card_name}: ${you} must take the top card of another player's deck or discard");
                    case 'client_newSeason':
                        return _("${card_name}: ${you} must <stronger>toss</stronger> an animalfolk card from your discard pile");
                    case 'client_accident':
                        if (this._page.unique_opponent_id) {
                            return _("${card_name}: ${you} may choose the order to discard your hand");
                        }
                        else {
                            return _("${card_name}: ${you} must choose an opponent");
                        }
                    case 'client_whirligig':
                        return _("${card_name}: ${you} must choose another player to swap cards with");
                    case 'client_gamble':
                        return _("${card_name}: ${you} must choose an opponent");
                    case 'client_blindfold':
                        if (this._page.unique_opponent_id) {
                            return _("${card_name}: ${you} must choose a card");
                        }
                        else {
                            return _("${card_name}: ${you} must choose a card and an opponent");
                        }
                    case 'client_safetyPrecaution':
                        return _("${card_name}: ${you} must choose a card from your stall to swap with");
                    case 'client_shoppingJourney':
                        return _("${card_name}: ${you} must choose a card from the market");
                    case 'client_houseCleaning':
                        if (this._args.nbr_junk == 0) {
                            return _("${card_name}: ${you} may schedule this technique without immediate effects");
                        }
                        else {
                            return _("${card_name}: ${you} may search your discard pile for up to ${nbr_junk} junk cards");
                        }
                    case 'client_houseCleaningToss':
                        return _("${card_name}: ${you} may <stronger>toss</stronger> a card from your hand");
                    case 'client_siesta':
                        return _("${card_name}: ${you} must take a card from your discard pile");
                    case 'client_ruthlessCompetition':
                        return _("${card_name}: ${you} must draw a card from an opponent\'s deck");
                    case 'client_raffle':
                        return _("${card_name}: ${you} take a card from");
                    case 'client_deprecated_tasters':
                        return _("${card_name}: ${you} must choose who takes a card from the market directly after you");
                    case 'client_rareArtefact':
                        return _("${card_name}: ${you} must choose a card to multiply its value");
                    case 'client_swank':
                        return _("${card_name}: ${you} must choose a card to <stronger>toss</stronger>");
                    case 'client_riskyBusiness':
                        return _("${card_name}: ${you} must guess the top card's value from the supply");
                    case 'client_historyLesson':
                        return _("${card_name}: ${you} may select up to 3 cards from the top of your discard pile");
                    case 'client_replacement':
                        return _("${card_name}: ${you} must choose an animalfolk card to <stronger>toss</stronger>");
                    case 'client_replacementFizzle':
                        return _("${card_name}: Are you sure you want to toss '${toss_card_name}'? The market has no valid replacement for this card");
                    case 'client_fashionHint':
                        return _("${card_name}: ${you} may <stronger>toss</stronger> a card from the supply");
                    case 'client_pompousProfessional':
                        return _("${card_name}: ${you} must choose an animalfolk set");
                    case 'client_burglaryOpponentId':
                        return _("${card_name}: ${you} must choose an opponent");
                    case 'client_burglaryValue':
                        return _("${card_name}: ${you} must guess the value of the top card of ${opponent_name}\'s deck");
                    case 'client_graspOpponentId':
                        return _("${card_name}: ${you} must choose an opponent");
                    case 'client_graspValue':
                        return _("${card_name}: ${you} must guess the value of a card from ${opponent_name}\'s hand");
                    case 'client_periscopeOpponentId':
                        return _("${card_name}: ${you} must choose an opponent");
                    case 'client_periscopeAnimalfolkId':
                        return _("${card_name}: ${you} must choose an animalfolk set");
                    case 'client_periscopeValue':
                        return _("${card_name}: ${you} must choose a value");
                    case 'client_suddenNap':
                        return _("${card_name}: ${you} must choose an opponent");
                    case 'client_carefreeSwapper':
                        return _("${card_name}: ${you} must swap this card with a card from another player's discard pile");
                    case 'client_velocipede':
                        return _("${card_name}: ${you} must choose a card from any stall to swap with");
                    case 'client_matchingColours':
                        return _("${card_name}: ${you} must swap an animalfolk from your hand with a card of equal value from an opponent's stall");
                    case 'client_cleverGuardian':
                        return _("${card_name}: ${you} must choose a card to <stronger>store</stronger>");
                    case 'client_meddlingMarketeer':
                        return _("${card_name}: ${you} may choose the order to place cards on top of your deck");
                    case 'client_goodwillpresents':
                        return _("${card_name}: ${you} must choose 1-2 players");
                    case 'client_alternativePlan':
                        return _("${card_name}: ${you} must toss a card from your discard pile");
                    case 'client_anchor':
                        return _("${card_name}: ${you} may choose the order to place cards on top of your deck");
                    case 'client_manufacturedJoy':
                        return _("${card_name}: ${you} must place a card on any player\'s discard pile");
                    case 'client_shakyEnterprise':
                        return _("${card_name}: ${you} must take any of the top 3 cards of your discard pile");
                    case 'client_cache':
                        return _("${card_name}: ${you} must take 1 card from your discard pile");
                    case 'client_groundbreakingIdea':
                        return _("${card_name}: ${you} must choose a card to <stronger>toss</stronger>");
                    case 'client_badOmen':
                        return _("${card_name}: ${you} may choose the order to place cards on top of your deck");
                    case 'client_dramaticRomantic':
                        return _("${card_name}: ${you} move your clock");
                    case 'client_selectingContracts':
                        if (this._args.nbr == 1) {
                            return _("${card_name}: ${you} must <stronger>toss</stronger> the top card of your discard");
                        }
                        else {
                            return this._page.format_dale_icons(_("${card_name}: ${you} must <stronger>toss</stronger> (ICON) one of the top ${nbr} cards of your discard and place the rest on your deck (ICON)"), DaleIcons_8.DaleIcons.getTossIcon(), DaleIcons_8.DaleIcons.getBluePileIcon(0));
                        }
                    case 'client_windOfChange':
                        return _("${card_name}: ${you} may toss a card from your discard");
                    case 'client_snack':
                        return _("${card_name}: ${you} must take a card from the market");
                    case 'client_bonsai':
                        return _("${card_name}: ${you} must discard 2 junk cards");
                    case 'client_generationChange':
                        switch (this._args.nbr) {
                            case 0:
                                return _("${card_name}: Are you sure you want to place 2 junk cards on your deck?");
                            case 1:
                                return _("${card_name}: ${you} must take 1 card from your discard");
                            default:
                                return _("${card_name}: ${you} must take 2 cards from your discard");
                        }
                }
                return "MISSING DESCRIPTION";
            },
            enumerable: false,
            configurable: true
        });
        MainClientState.prototype.leaveAndDontReturn = function () {
            console.warn("mainClientState: leaveAndDontReturn");
            var previous = this._stack.pop();
            this._name = 'client_technique';
            this._args = {};
            if (previous instanceof PreviousState) {
                this._name = previous.name;
                if (previous.args) {
                    this._args = previous.args;
                }
            }
        };
        MainClientState.prototype.leave = function () {
            console.warn("mainClientState: leave");
            var previous = this._stack.pop();
            this.setPassiveSelected(false);
            this._name = 'client_technique';
            this._args = {};
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
        MainClientState.prototype.leaveAll = function () {
            console.warn("mainClientState: leaveAll");
            while (this._stack.length > 0) {
                this.leave();
            }
            this.enter('client_technique');
        };
        MainClientState.prototype.enter = function (name, args) {
            if (name) {
                this._name = name;
            }
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
        MainClientState.prototype.stackIncludes = function (name) {
            if (this.name == name || this._page.gamedatas.gamestate.name == name) {
                return true;
            }
            for (var _i = 0, _a = this._stack; _i < _a.length; _i++) {
                var state = _a[_i];
                if (state instanceof PreviousState) {
                    if (state.name == name) {
                        return true;
                    }
                }
            }
            return false;
        };
        MainClientState.prototype.setPassiveSelected = function (enable) {
            console.warn("setPassiveSelected", enable, this._args);
            if ('passive_card_id' in this._args) {
                var div = DaleCard_7.DaleCard.divs.get(this._args.passive_card_id);
                var cancelOnCardClick = (this._name != 'client_spend' && this._name != 'client_spendx' && this._name != 'client_stove' && !('disable_cancel_on_click' in this._args));
                if (div) {
                    if (enable) {
                        div.classList.add("daleofmerchants-passive-selected");
                        if (cancelOnCardClick) {
                            div.addEventListener('click', this.leaveThis);
                        }
                    }
                    else {
                        div.classList.remove("daleofmerchants-passive-selected");
                        if (cancelOnCardClick) {
                            div.removeEventListener('click', this.leaveThis);
                        }
                    }
                }
            }
        };
        return MainClientState;
    }());
    exports.MainClientState = MainClientState;
});
define("components/TargetingLine", ["require", "exports", "components/DaleCard"], function (require, exports, DaleCard_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TargetingLine = void 0;
    var TargetingLine = (function () {
        function TargetingLine(source, targets, sourceClass, targetClass, lineClass, onSource, onTarget, pile) {
            var _this = this;
            TargetingLine.targetingLines.push(this);
            this.svg = $("daleofmerchants-svg-container").querySelector("svg");
            this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            this.line.classList.add(lineClass);
            this.svg.appendChild(this.line);
            this.sourceClass = sourceClass;
            this.targetClass = targetClass;
            var thiz = this;
            var source_id = source instanceof DaleCard_8.DaleCard ? source.id : 0;
            if (!(source instanceof DaleCard_8.DaleCard)) {
                this.cardDiv = source;
            }
            else if (pile) {
                this.pile = pile;
                this.pile.closePopin();
                this.cardDiv = source.toDiv();
                this.pile.placeholderHTML.appendChild(this.cardDiv);
            }
            else {
                this.cardDiv = source.div;
            }
            this.cardDiv.classList.add("daleofmerchants-line-source", this.sourceClass);
            this.onSource = function () {
                _this.remove();
                onSource(source_id);
            };
            this.cardDiv.addEventListener("click", this.onSource);
            this.targetDivs = [];
            this.onTargets = [];
            var _loop_5 = function (targetCard) {
                var card_div = targetCard instanceof DaleCard_8.DaleCard ? targetCard.div : targetCard;
                card_div.classList.add("daleofmerchants-line-target", this_5.targetClass);
                this_5.targetDivs.push(card_div);
                var target_id = targetCard instanceof DaleCard_8.DaleCard ? targetCard.id : +targetCard.dataset['target_id'];
                var finalOnTarget = function () {
                    _this.remove();
                    onTarget(source_id, target_id);
                };
                this_5.onTargets.push(finalOnTarget);
                card_div.addEventListener("click", finalOnTarget);
            };
            var this_5 = this;
            for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                var targetCard = targets_1[_i];
                _loop_5(targetCard);
            }
            this.updateLine = function (evt) {
                var _a, _b;
                if (!document.body.contains(thiz.cardDiv) && source instanceof DaleCard_8.DaleCard) {
                    if (!DaleCard_8.DaleCard.divs.has(source.id)) {
                        return;
                    }
                    thiz.cardDiv = source.div;
                    thiz.cardDiv.classList.add("daleofmerchants-line-source", thiz.sourceClass);
                    thiz.cardDiv.addEventListener("click", thiz.onSource);
                }
                var sourceRect = thiz.cardDiv.getBoundingClientRect();
                var currTarget = evt.target;
                if (currTarget == thiz.prevTargetSnap) {
                    return;
                }
                (_a = thiz.prevTargetHover) === null || _a === void 0 ? void 0 : _a.classList.remove("daleofmerchants-line-source", thiz.sourceClass);
                (_b = thiz.prevTargetHover) === null || _b === void 0 ? void 0 : _b.classList.add("daleofmerchants-line-target", thiz.targetClass);
                thiz.prevTargetHover = undefined;
                thiz.prevTargetSnap = undefined;
                var x1 = sourceRect.left + window.scrollX + sourceRect.width / 2;
                var y1 = sourceRect.top + window.scrollY + sourceRect.height / 2;
                var x2 = evt.pageX;
                var y2 = evt.pageY;
                var _loop_6 = function (targetCard) {
                    if (currTarget == targetCard) {
                        var snapToTarget = function () {
                            var _a;
                            if (!TargetingLine.targetingLines.includes(thiz)) {
                                return;
                            }
                            if (currTarget == ((_a = TargetingLine.previousMouseEvent) === null || _a === void 0 ? void 0 : _a.target)) {
                                var targetRect = currTarget.getBoundingClientRect();
                                targetCard.classList.add("daleofmerchants-line-source", thiz.sourceClass);
                                targetCard.classList.remove("daleofmerchants-line-target", thiz.targetClass);
                                x2 = targetRect.left + window.scrollX + targetRect.width / 2;
                                y2 = targetRect.top + window.scrollY + targetRect.height / 2;
                                thiz.line.setAttribute("x2", String(x2));
                                thiz.line.setAttribute("y2", String(y2));
                            }
                            thiz.prevTargetSnap = currTarget;
                        };
                        if (targetCard.dataset['location'] == 'stall') {
                            setTimeout(snapToTarget, 300);
                        }
                        else {
                            snapToTarget();
                        }
                        thiz.prevTargetHover = currTarget;
                    }
                };
                for (var _i = 0, _c = thiz.targetDivs; _i < _c.length; _i++) {
                    var targetCard = _c[_i];
                    _loop_6(targetCard);
                }
                thiz.line.setAttribute("x1", String(x1));
                thiz.line.setAttribute("y1", String(y1));
                thiz.line.setAttribute("x2", String(x2));
                thiz.line.setAttribute("y2", String(y2));
            };
            addEventListener("mousemove", this.updateLine);
            if (TargetingLine.previousMouseEvent) {
                this.updateLine.call(window, TargetingLine.previousMouseEvent);
            }
        }
        TargetingLine.prototype.remove = function () {
            removeEventListener("mousemove", this.updateLine);
            this.cardDiv.classList.remove("daleofmerchants-line-source", this.sourceClass);
            this.cardDiv.removeEventListener("click", this.onSource);
            if (this.pile) {
                this.cardDiv.remove();
                this.pile.openPopin();
            }
            for (var i = 0; i < this.targetDivs.length; i++) {
                this.targetDivs[i].classList.remove("daleofmerchants-line-source", this.sourceClass);
                this.targetDivs[i].classList.remove("daleofmerchants-line-target", this.targetClass);
                this.targetDivs[i].removeEventListener("click", this.onTargets[i]);
            }
            this.line.remove();
            var index = TargetingLine.targetingLines.indexOf(this);
            if (index != -1) {
                TargetingLine.targetingLines.splice(index, 1);
            }
        };
        TargetingLine.remove = function () {
            if (TargetingLine.targetingLines.length > 0) {
                TargetingLine.targetingLines[TargetingLine.targetingLines.length - 1].remove();
            }
        };
        TargetingLine.exists = function () {
            return TargetingLine.targetingLines.length > 0;
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
define("components/CoinManager", ["require", "exports", "components/DaleIcons", "components/types/DaleWrapClass", "components/DaleCard"], function (require, exports, DaleIcons_9, DaleWrapClass_4, DaleCard_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CoinManager = void 0;
    var CoinManager = (function () {
        function CoinManager() {
            this.selectionMode = 'none';
            this.playerCoins = {};
        }
        Object.defineProperty(CoinManager.prototype, "defaultActionLabelText", {
            get: function () {
                return _("Click to add coins");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CoinManager.prototype, "myCoins", {
            get: function () {
                var counter = this.playerCoins[this.page.player_id];
                if (counter == undefined && !this.page.isSpectator) {
                    throw new Error("myCoins should be defined for non-spectators");
                }
                return counter;
            },
            enumerable: false,
            configurable: true
        });
        CoinManager.prototype.init = function (page) {
            this.page = page;
            for (var player_id in page.gamedatas.players) {
                var coins_wrap = $('daleofmerchants-coins-wrap-' + player_id);
                var coins_span = coins_wrap.querySelector('.daleofmerchants-coins-counter');
                var coins_icon = DaleIcons_9.DaleIcons.getCoinIcon();
                coins_icon.id = 'daleofmerchants-coins-icon-' + player_id;
                coins_wrap.append(coins_icon);
                this.playerCoins[player_id] = new ebg.counter();
                this.playerCoins[player_id].create(coins_span);
                this.playerCoins[player_id].setValue(page.gamedatas.players[player_id].coins);
                page.addTooltip('daleofmerchants-coins-icon-' + player_id, _("Number of coins"), '');
            }
            if (!page.isSpectator) {
                this.wrap = $('daleofmerchants-coins-wrap-' + page.player_id);
                this.actionLabel = this.wrap.querySelector(".daleofmerchants-label");
                this.coinsToSpendSpan = this.wrap.querySelector('.daleofmerchants-coins-to-spend-counter');
                this.setCoinsToSpend(0);
                this.actionLabel.addEventListener('click', this.onClickWrap.bind(this));
            }
        };
        CoinManager.prototype.setWrapClass = function (wrapClass, actionLabelText) {
            var _a;
            if (wrapClass === void 0) { wrapClass = 'daleofmerchants-wrap-default'; }
            if (!this.wrap || !this.actionLabel) {
                return;
            }
            (_a = this.wrap.classList).remove.apply(_a, DaleWrapClass_4.DALE_WRAP_CLASSES);
            if (wrapClass) {
                this.wrap.classList.add(wrapClass);
                this.actionLabel.innerHTML = actionLabelText !== null && actionLabelText !== void 0 ? actionLabelText : this.defaultActionLabelText;
            }
        };
        CoinManager.prototype.getMaximumSpendValue = function (funds) {
            var max_value = this.myCoins.getValue();
            for (var _i = 0, funds_1 = funds; _i < funds_1.length; _i++) {
                var card = funds_1[_i];
                max_value += card.effective_value;
            }
            return max_value;
        };
        CoinManager.prototype.getCoinsToSpend = function () {
            return +this.coinsToSpendSpan.innerText;
        };
        CoinManager.prototype.setCoinsToSpendImplicitly = function (funds, total, is_purchase) {
            if (is_purchase === void 0) { is_purchase = false; }
            console.warn("setCoinsToSpendImplicitly");
            if (this.selectionMode != 'implicit') {
                return;
            }
            var remaining = total;
            for (var _i = 0, funds_2 = funds; _i < funds_2.length; _i++) {
                var card = funds_2[_i];
                remaining -= card.effective_value;
                if (is_purchase && card.effective_type_id == DaleCard_9.DaleCard.CT_RIGOROUSCHRONICLER) {
                    remaining -= 2;
                }
            }
            this.setCoinsToSpend(remaining);
        };
        CoinManager.prototype.setCoinsToSpend = function (amount) {
            var _a, _b;
            if (amount <= 0) {
                if (this.selectionMode != 'explicit') {
                    (_a = this.wrap) === null || _a === void 0 ? void 0 : _a.classList.add("daleofmerchants-wrap-default");
                }
                this.coinsToSpendSpan.innerHTML = '0';
                return;
            }
            (_b = this.wrap) === null || _b === void 0 ? void 0 : _b.classList.remove("daleofmerchants-wrap-default");
            this.coinsToSpendSpan.innerHTML = amount.toString();
            dojo.setStyle(this.coinsToSpendSpan, 'color', amount > this.myCoins.getValue() ? 'red' : 'black');
        };
        CoinManager.prototype.onClickWrap = function () {
            console.warn("onClickWrap", this.selectionMode);
            switch (this.selectionMode) {
                case 'explicit':
                    var amount = this.getCoinsToSpend();
                    if (amount >= this.myCoins.getValue()) {
                        this.setCoinsToSpend(0);
                    }
                    else {
                        this.setCoinsToSpend(this.getCoinsToSpend() + 1);
                    }
                    this.page.onClickCoinManager();
                    break;
            }
        };
        CoinManager.prototype.setSelectionMode = function (mode, wrapClass, actionLabelText) {
            var _a, _b, _c;
            if (wrapClass === void 0) { wrapClass = "daleofmerchants-wrap-default"; }
            if (mode == this.selectionMode) {
                return;
            }
            this.selectionMode = mode;
            if (mode != 'none' && ((_a = this.myCoins) === null || _a === void 0 ? void 0 : _a.getValue()) == 0) {
                this.setSelectionMode('none', "daleofmerchants-wrap-default");
                return;
            }
            this.setCoinsToSpend(0);
            this.setWrapClass(wrapClass, actionLabelText);
            switch (this.selectionMode) {
                case 'explicit':
                    (_b = this.actionLabel) === null || _b === void 0 ? void 0 : _b.classList.add("daleofmerchants-clickable");
                    break;
                case 'none':
                    (_c = this.actionLabel) === null || _c === void 0 ? void 0 : _c.classList.remove("daleofmerchants-clickable");
                    break;
            }
        };
        CoinManager.prototype.addCoins = function (player_id, nbr) {
            this.playerCoins[player_id].incValue(nbr);
            this.setSelectionMode('none');
        };
        return CoinManager;
    }());
    exports.CoinManager = CoinManager;
});
define("components/types/PrivateNotification", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/types/TranslatableStrings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TranslatableStrings = void 0;
    var TranslatableStrings = (function () {
        function TranslatableStrings() {
        }
        Object.defineProperty(TranslatableStrings, "please_select_a_different_player", {
            get: function () {
                return _("Please select a different player");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TranslatableStrings, "s_hand", {
            get: function () {
                return _("\'s hand");
            },
            enumerable: false,
            configurable: true
        });
        return TranslatableStrings;
    }());
    exports.TranslatableStrings = TranslatableStrings;
});
define("bgagame/daleofmerchants", ["require", "exports", "ebg/core/gamegui", "components/DaleStock", "components/Pile", "components/HiddenPile", "components/DaleCard", "components/MarketBoard", "components/Stall", "components/types/ChameleonArgs", "components/types/MainClientState", "components/Images", "components/TargetingLine", "components/types/DbEffect", "components/DaleDeckSelection", "components/DaleDie", "components/DaleIcons", "components/CoinManager", "components/PlayerClock", "components/types/TranslatableStrings", "ebg/counter", "ebg/stock"], function (require, exports, Gamegui, DaleStock_1, Pile_2, HiddenPile_1, DaleCard_10, MarketBoard_1, Stall_1, ChameleonArgs_1, MainClientState_1, Images_8, TargetingLine_1, DbEffect_2, DaleDeckSelection_2, DaleDie_2, DaleIcons_10, CoinManager_1, PlayerClock_2, TranslatableStrings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DaleOfMerchants = (function (_super) {
        __extends(DaleOfMerchants, _super);
        function DaleOfMerchants() {
            var _this = _super.call(this) || this;
            _this.allPiles = [];
            _this.allDaleStocks = [];
            _this.allCardSlots = [];
            _this.marketDeck = new HiddenPile_1.HiddenPile(_this, "daleofmerchants-market-deck", 'Supply');
            _this.marketDiscard = new Pile_2.Pile(_this, "daleofmerchants-market-discard", 'Bin');
            _this.playerClocks = {};
            _this.playerHandSizes = {};
            _this.playerDecks = {};
            _this.playerDiscards = {};
            _this.playerStalls = {};
            _this.playerSchedules = {};
            _this.playerStoredCards = {};
            _this.allDecks = { 'mark': _this.marketDeck };
            _this.mono_hand_is_visible = false;
            _this.coinManager = new CoinManager_1.CoinManager();
            _this.market = null;
            _this.myHand = new DaleStock_1.DaleStock();
            _this.myLimbo = new DaleStock_1.DaleStock();
            _this.mainClientState = new MainClientState_1.MainClientState(_this);
            _this.previousMainTitle = '';
            _this.opponent_ids = [];
            _this.max_opponents = 4;
            console.warn('dale constructor');
            return _this;
        }
        Object.defineProperty(DaleOfMerchants.prototype, "monoDiscard", {
            get: function () {
                if (!this.is_solo || !this.unique_opponent_id) {
                    throw new Error("monoDiscard is only defined in solo games");
                }
                return this.playerDiscards[this.unique_opponent_id];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleOfMerchants.prototype, "monoSchedule", {
            get: function () {
                if (!this.is_solo || !this.unique_opponent_id) {
                    throw new Error("monoSchedule is only defined in solo games");
                }
                return this.playerSchedules[this.unique_opponent_id];
            },
            enumerable: false,
            configurable: true
        });
        DaleOfMerchants.prototype.isMonoPlayer = function (player_id) {
            return this.is_solo && player_id == this.unique_opponent_id;
        };
        Object.defineProperty(DaleOfMerchants.prototype, "myClock", {
            get: function () {
                return this.playerClocks[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleOfMerchants.prototype, "myHandSize", {
            get: function () {
                return this.playerHandSizes[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleOfMerchants.prototype, "myDeck", {
            get: function () {
                return this.playerDecks[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleOfMerchants.prototype, "myDiscard", {
            get: function () {
                return this.playerDiscards[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleOfMerchants.prototype, "myStall", {
            get: function () {
                return this.playerStalls[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaleOfMerchants.prototype, "mySchedule", {
            get: function () {
                return this.playerSchedules[this.player_id];
            },
            enumerable: false,
            configurable: true
        });
        DaleOfMerchants.prototype.setup = function (gamedatas) {
            var _a, _b, _c, _d;
            console.warn("Starting game setup");
            console.warn("------ GAME DATAS ------ !");
            console.warn(this.gamedatas);
            console.warn("------------------------");
            if (gamedatas.debugMode) {
                this.addCardNameInputField(document.querySelector('.daleofmerchants-debugtools'), _("Spawn Card"), this.spawnCard.bind(this));
            }
            if (this.isSpectator) {
                (_a = $("daleofmerchants-hand-limbo-flex")) === null || _a === void 0 ? void 0 : _a.classList.add("daleofmerchants-hidden");
            }
            var svgContainer = $("daleofmerchants-svg-container");
            (_b = $("overall-content")) === null || _b === void 0 ? void 0 : _b.appendChild(svgContainer);
            addEventListener("mousemove", function (evt) { TargetingLine_1.TargetingLine.previousMouseEvent = evt; });
            this.deckSelection = new DaleDeckSelection_2.DaleDeckSelection(this, $("daleofmerchants-page-deck-selection"), $("daleofmerchants-page-game"), gamedatas.inDeckSelection);
            DaleCard_10.DaleCard.init(this, gamedatas.cardTypes);
            this.setupMono(gamedatas);
            if (gamedatas.playerorder.length == 2) {
                for (var _i = 0, _e = gamedatas.playerorder; _i < _e.length; _i++) {
                    var player_id = _e[_i];
                    if (player_id != this.player_id) {
                        this.unique_opponent_id = player_id;
                    }
                }
            }
            this.setPlayAreaStyling();
            if (gamedatas.gamestate.type == 'activeplayer') {
                this.movePlayAreaOnTop(gamedatas.gamestate.active_player);
            }
            this.coinManager.init(this);
            for (var player_id in gamedatas.players) {
                var player = gamedatas.players[player_id];
                this.playerClocks[player_id] = new PlayerClock_2.PlayerClock(this, +player_id);
                var handsize_span = document.createElement('span');
                var handsize_icon = DaleIcons_10.DaleIcons.getHandIcon();
                var player_board_div = (_c = $('player_board_' + player_id)) === null || _c === void 0 ? void 0 : _c.querySelector(".player_score");
                handsize_icon.id = 'daleofmerchants-myhandsize-icon-' + player_id;
                player_board_div.prepend(handsize_icon);
                player_board_div.prepend(handsize_span);
                handsize_span.innerText = '0';
                this.playerHandSizes[player_id] = new ebg.counter();
                this.playerHandSizes[player_id].create(handsize_span);
                this.playerHandSizes[player_id].setValue(gamedatas.handSizes[player_id]);
                this.addTooltip('daleofmerchants-myhandsize-icon-' + player_id, _("Number of cards in hand."), '');
                this.addTooltip('icon_point_' + player_id, _("Number of stacks built."), '');
                (_d = player_board_div.querySelector(".player_score_value")) === null || _d === void 0 ? void 0 : _d.insertAdjacentText('afterend', "/8");
                console.log("Create deck for player " + player_id);
                this.playerDecks[player_id] = new HiddenPile_1.HiddenPile(this, "daleofmerchants-deck-" + player_id, 'Deck', +player_id);
                this.playerDecks[player_id].pushHiddenCards(gamedatas.deckSizes[player_id]);
                this.allDecks[player_id] = this.playerDecks[player_id];
                this.playerDiscards[player_id] = new Pile_2.Pile(this, "daleofmerchants-discard-" + player_id, 'Discard', +player_id);
                for (var i in gamedatas.discardPiles[player_id]) {
                    var card = gamedatas.discardPiles[player_id][+i];
                    this.playerDiscards[player_id].push(DaleCard_10.DaleCard.of(card));
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
                this.marketDiscard.push(DaleCard_10.DaleCard.of(card));
            }
            this.market = new MarketBoard_1.MarketBoard(this);
            for (var i in gamedatas.market) {
                var card = gamedatas.market[i];
                this.market.insertCard(DaleCard_10.DaleCard.of(card), +card.location_arg);
            }
            if (!this.isSpectator) {
                this.myHand.init(this, $('daleofmerchants-myhand'), $('daleofmerchants-myhand-wrap'), _("Your hand"));
                this.myHand.centerItems = true;
                for (var i in gamedatas.hand) {
                    var card = gamedatas.hand[i];
                    this.myHand.addDaleCardToStock(DaleCard_10.DaleCard.of(card));
                }
                this.myHand.setSelectionMode('none');
                dojo.connect(this.myHand, 'onClick', this, 'onSelectHandCard');
                dojo.connect(this.myHand.orderedSelection, 'onSelect', this, 'onSelectHandCard');
                dojo.connect(this.myHand.orderedSelection, 'onUnselect', this, 'onUnselectHandCard');
                this.myLimbo.init(this, $('daleofmerchants-mylimbo'), $('daleofmerchants-mylimbo-wrap'), _("Limbo"), this.onLimboItemCreate.bind(this), this.onLimboItemDelete.bind(this));
                this.myLimbo.wrap.classList.add("daleofmerchants-hidden");
                this.myLimbo.centerItems = true;
                for (var i in gamedatas.limbo) {
                    var card = gamedatas.limbo[i];
                    this.myLimbo.addDaleCardToStock(DaleCard_10.DaleCard.of(card));
                }
                this.myLimbo.setSelectionMode('none');
                dojo.setStyle(this.myLimbo.wrap, 'min-width', 3 * Images_8.Images.CARD_WIDTH_S + 'px');
                dojo.connect(this.myLimbo, 'onClick', this, 'onSelectLimboCard');
                dojo.connect(this.myLimbo.orderedSelection, 'onSelect', this, 'onSelectLimboCard');
                dojo.connect(this.myLimbo.orderedSelection, 'onUnselect', this, 'onUnselectLimboCard');
            }
            for (var player_id in gamedatas.schedules) {
                var container = $('daleofmerchants-schedule-' + player_id);
                var wrap = $('daleofmerchants-schedule-wrap-' + player_id);
                dojo.setStyle(wrap, 'min-width', "".concat(1.75 * Images_8.Images.CARD_WIDTH_S, "px"));
                this.playerSchedules[player_id] = new DaleStock_1.DaleStock();
                this.playerSchedules[player_id].init(this, container, wrap, _("Schedule"));
                this.playerSchedules[player_id].setSelectionMode('none');
                this.playerSchedules[player_id].centerItems = true;
                for (var card_id in gamedatas.schedules[player_id]) {
                    var card = gamedatas.schedules[+player_id][+card_id];
                    this.playerSchedules[player_id].addDaleCardToStock(DaleCard_10.DaleCard.of(card));
                }
                for (var card_id in gamedatas.schedulesCooldown[player_id]) {
                    var card = gamedatas.schedulesCooldown[+player_id][+card_id];
                    this.playerSchedules[player_id].addDaleCardToStock(DaleCard_10.DaleCard.of(card));
                    DaleCard_10.DaleCard.scheduleCooldownCardIds.add(+card.id);
                }
            }
            if (!this.isSpectator) {
                dojo.connect(this.mySchedule, 'onClick', this, 'onSelectScheduleCard');
                dojo.connect(this.mySchedule.orderedSelection, 'onSelect', this, 'onSelectScheduleCard');
            }
            for (var player_id in gamedatas.storedCards) {
                var container = $('daleofmerchants-stored-cards-' + player_id);
                var wrap = $('daleofmerchants-stored-cards-wrap-' + player_id);
                if (!container || !wrap) {
                    console.warn("Skipped stored cards for ".concat(player_id, " (probably a spectator)"));
                    console.warn('daleofmerchants-stored-cards-wrap-' + player_id);
                    continue;
                }
                dojo.setStyle(wrap, 'min-width', "".concat(1.5 * Images_8.Images.CARD_WIDTH_S, "px"));
                this.playerStoredCards[player_id] = new DaleStock_1.DaleStock();
                this.playerStoredCards[player_id].init(this, container, wrap, _("Stored Cards"));
                this.playerStoredCards[player_id].setSelectionMode('none');
                this.playerStoredCards[player_id].centerItems = true;
                if (typeof gamedatas.storedCards[player_id] == "number") {
                    var n = gamedatas.storedCards[player_id];
                    gamedatas.storedCards[player_id] = {};
                    for (var i = 0; i < n; i++) {
                        var cardBack = new DaleCard_10.DaleCard(-i, 0);
                        this.playerStoredCards[player_id].addDaleCardToStock(cardBack);
                        wrap.classList.remove("daleofmerchants-hidden");
                    }
                }
                else {
                    var storedCards = gamedatas.storedCards[player_id];
                    for (var card_id in storedCards) {
                        var card = storedCards[+card_id];
                        this.playerStoredCards[player_id].addDaleCardToStock(DaleCard_10.DaleCard.of(card));
                        wrap.classList.remove("daleofmerchants-hidden");
                    }
                }
            }
            console.warn("DbEffects:");
            for (var i in gamedatas.effects) {
                var effect = gamedatas.effects[i];
                DaleCard_10.DaleCard.addEffect(new DbEffect_2.DbEffect(effect));
            }
            this.showAnimalfolkSpecificGameComponents();
            this.setupNotifications();
            console.warn("Ending game setup");
        };
        DaleOfMerchants.prototype.limboTransitionUpdateDisplay = function () {
            var _this = this;
            setTimeout(function () { _this.myLimbo.updateDisplay(); }, 1);
            setTimeout(function () { _this.myHand.updateDisplay(); }, 1);
        };
        DaleOfMerchants.prototype.onLimboItemCreate = function () {
            var classList = this.myLimbo.wrap.classList;
            if (classList.contains("daleofmerchants-hidden")) {
                classList.remove("daleofmerchants-hidden");
                this.limboTransitionUpdateDisplay();
            }
        };
        DaleOfMerchants.prototype.onLimboItemDelete = function () {
            var _this = this;
            var classList = this.myLimbo.wrap.classList;
            if (this.myLimbo.count() <= 1 && !this.mono_hand_is_visible) {
                setTimeout(function () {
                    if (!classList.contains("daleofmerchants-hidden")) {
                        classList.add("daleofmerchants-hidden");
                        _this.limboTransitionUpdateDisplay();
                    }
                }, this.myLimbo.duration);
            }
        };
        DaleOfMerchants.prototype.setupMono = function (gamedatas) {
            var _a;
            if (!this.is_solo) {
                console.warn("setupMono skipped (multiplayer game)");
                return;
            }
            console.warn("setupMono !!!");
            var player_id = (_a = gamedatas.playerorder[0]) !== null && _a !== void 0 ? _a : this.getActivePlayers()[0];
            var player_panel = $('overall_player_board_' + player_id);
            if (!player_panel) {
                throw new Error("Unable to setup a player panel for Mono");
            }
            var mono = undefined;
            for (var mono_player_id in this.gamedatas.players) {
                if (player_id != +mono_player_id) {
                    mono = gamedatas.players[mono_player_id];
                    gamedatas.playerorder.push(+mono_player_id);
                }
            }
            if (gamedatas.playerorder.length != 2) {
                console.warn(gamedatas.playerorder.length);
                throw new Error("A solo-game should consists of only 1 player and 1 Mono, found ".concat(gamedatas.playerorder.length, " players instead"));
            }
            if (!mono) {
                throw new Error("Mono not found");
            }
            var xclone = player_panel.outerHTML;
            var player = gamedatas.players[player_id];
            xclone = xclone.replaceAll(String(player.id), String(mono.id));
            xclone = xclone.replaceAll(player.name, mono.name);
            xclone = xclone.replaceAll(player.color, mono.color);
            dojo.place(xclone, 'player_boards');
            var avatar = $("avatar_".concat(mono.id));
            if (avatar) {
                avatar.classList.add("daleofmerchants-mono-avatar");
                this.updateTagName(avatar, "div");
            }
        };
        DaleOfMerchants.prototype.showAnimalfolkSpecificGameComponents = function () {
            var _a;
            if (!this.gamedatas.inDeckSelection) {
                (_a = $("daleofmerchants-market-wrap")) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement('afterend', $("page-title"));
            }
            for (var player_id in this.gamedatas.players) {
                if (this.gamedatas.animalfolkIds.includes(DaleDeckSelection_2.DaleDeckSelection.ANIMALFOLK_TREEKANGAROOS)) {
                    var stored_cards_wrap = $('daleofmerchants-stored-cards-wrap-' + player_id);
                    stored_cards_wrap.classList.remove("daleofmerchants-hidden");
                }
                if (this.gamedatas.animalfolkIds.includes(DaleDeckSelection_2.DaleDeckSelection.ANIMALFOLK_TUATARAS)) {
                    var coins_wrap = $('daleofmerchants-coins-wrap-' + player_id);
                    coins_wrap.classList.remove("daleofmerchants-hidden");
                }
                if (this.gamedatas.animalfolkIds.includes(DaleDeckSelection_2.DaleDeckSelection.ANIMALFOLK_MONGOOSES) ||
                    this.gamedatas.animalfolkIds.includes(DaleDeckSelection_2.DaleDeckSelection.ANIMALFOLK_BATS)) {
                    var clock_wrap = $('daleofmerchants-clock-wrap-' + player_id);
                    clock_wrap.classList.remove("daleofmerchants-hidden");
                }
            }
        };
        DaleOfMerchants.prototype.onEnteringState = function (stateName, args) {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g;
            console.warn('Entering state: ' + stateName);
            if (stateName == 'turnStart' || stateName == 'postCleanUpPhase') {
                this.movePlayAreaOnTop(args.active_player);
            }
            if (this.isSpectator) {
                return;
            }
            if (stateName.substring(0, 6) != 'client' && stateName.substring(0, 9) != 'chameleon') {
                console.warn("Revalidate all local chameleons");
                this.validateChameleonsLocal();
            }
            if (!this.isCurrentPlayerActive()) {
                switch (stateName) {
                    case 'playerTurn':
                        DaleCard_10.DaleCard.unbindAllChameleonsLocal();
                        this.mainClientState.leaveAll();
                        break;
                    case 'blindfold':
                        var blindfold_args = args.args;
                        if ((_a = blindfold_args._private) === null || _a === void 0 ? void 0 : _a.card_id) {
                            var card = new DaleCard_10.DaleCard(blindfold_args._private.card_id);
                            this.myHand.setSelectionMode('noneRetainSelection', undefined, 'daleofmerchants-wrap-default', _("Your opponent is guessing the value of ") + card.name);
                            this.myHand.orderedSelection.setMaxSize(1);
                            this.myHand.selectItem(blindfold_args._private.card_id);
                        }
                        break;
                }
                return;
            }
            switch (stateName) {
                case 'turnStart':
                    this.mySchedule.setSelectionMode('clickOnTurnStart', undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'postCleanUpPhase':
                    this.myHand.setSelectionMode('clickAbilityPostCleanup', 'pileBlue', 'daleofmerchants-wrap-technique', _("Click cards to use <strong>passive abilities</strong>"));
                    break;
                case 'playerTurn':
                    this.mainClientState.enter();
                    break;
                case 'client_purchase':
                    this.coinManager.setSelectionMode('implicit', 'daleofmerchants-wrap-purchase', _("Coins in this purchase"));
                    this.coinManager.setCoinsToSpendImplicitly(this.myHand.getSelectedDaleCards(), this.mainClientState.args.cost, true);
                    this.myHand.setSelectionMode('multiple', 'pileYellow', 'daleofmerchants-wrap-purchase', _("Click cards to use for <strong>purchasing</strong>"));
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
                    this.setPurchaseSelectionModes(this.mainClientState.args);
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_technique':
                    this.myHand.setSelectionMode('clickTechnique', 'pileBlue', 'daleofmerchants-wrap-technique', _("Click cards to play <strong>techniques</strong>"));
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
                    this.myStall.setLeftPlaceholderClickable(true);
                    this.mySchedule.setSelectionMode('clickOnFinishAndSnack', undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'client_build':
                    this.myHand.setSelectionMode('multiple', 'build', 'daleofmerchants-wrap-build', _("Click cards to <strong>build stacks</strong>"));
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
                    this.myStall.selectLeftPlaceholder();
                    this.mySchedule.setSelectionMode('clickOvertime');
                    this.onBuildSelectionChanged();
                    break;
                case 'client_inventory':
                    this.myHand.setSelectionMode('multiple', 'pileRed', 'daleofmerchants-wrap-discard', _("Click cards to <strong>discard</strong>"));
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_essentialPurchase':
                    var client_essentialPurchase_args = this.mainClientState.args;
                    this.setPurchaseSelectionModes(client_essentialPurchase_args);
                    this.myHand.unselectAll();
                    this.myHand.setSelectionMode('essentialPurchase', 'toss', 'daleofmerchants-wrap-purchase', _("Choose up to 3 junk cards to <strong>toss</strong>"), 'pileYellow');
                    var junk_selected = 0;
                    var client_essentialPurchase_skip = true;
                    for (var _i = 0, _h = client_essentialPurchase_args.funds_card_ids.slice().reverse(); _i < _h.length; _i++) {
                        var card_id = _h[_i];
                        this.myHand.selectItem(card_id, true);
                        if (junk_selected < 3 && new DaleCard_10.DaleCard(card_id).isJunk()) {
                            this.myHand.selectItem(card_id);
                            junk_selected++;
                        }
                        if (new DaleCard_10.DaleCard(card_id).isEffectiveJunk()) {
                            client_essentialPurchase_skip = false;
                        }
                    }
                    if (client_essentialPurchase_skip) {
                        this.onPurchase();
                    }
                    break;
                case 'client_glue':
                    var client_glue_args = this.mainClientState.args;
                    this.setPurchaseSelectionModes(client_glue_args);
                    this.myHand.unselectAll();
                    this.myHand.setSelectionMode('glue', 'hand', 'daleofmerchants-wrap-purchase', _("Choose Glue cards to keep in your hand"), 'pileYellow');
                    for (var _j = 0, _k = client_glue_args.funds_card_ids.slice().reverse(); _j < _k.length; _j++) {
                        var card_id = _k[_j];
                        this.myHand.selectItem(card_id, true);
                        if (new DaleCard_10.DaleCard(card_id).effective_type_id == DaleCard_10.DaleCard.CT_GLUE) {
                            this.myHand.selectItem(card_id);
                        }
                    }
                    break;
                case 'bonusBuild':
                    var bonusBuild_args = args.args;
                    var bonusBuildLabel = bonusBuild_args.is_first_build ?
                        _("Click cards to <strong>build stacks</strong>") :
                        _("Click cards to <strong>build additional stacks</strong>");
                    this.myHand.setSelectionMode('multiple', 'build', 'daleofmerchants-wrap-build', bonusBuildLabel);
                    this.myStall.selectLeftPlaceholder();
                    this.onBuildSelectionChanged();
                    break;
                case 'client_swiftBroker':
                    this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose the order to discard your hand"));
                    break;
                case 'client_shatteredRelic':
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
                    break;
                case 'spyglass':
                    this.myLimbo.setSelectionMode('multiple', 'spyglass', 'daleofmerchants-wrap-technique', this.format_dale_icons(_("Choose cards to take (ICON) and place back (ICON)"), DaleIcons_10.DaleIcons.getSpyglassIcon(), DaleIcons_10.DaleIcons.getBluePileIcon(0)));
                    break;
                case 'client_acorn':
                case 'client_velocipede':
                    var client_acorn_targets = [];
                    for (var player_id in this.gamedatas.players) {
                        if (stateName == 'client_velocipede' || +player_id != this.player_id) {
                            client_acorn_targets = client_acorn_targets.concat(this.playerStalls[player_id].getCardsInStall());
                        }
                    }
                    var client_acorn_args = this.mainClientState.args;
                    new TargetingLine_1.TargetingLine(new DaleCard_10.DaleCard(client_acorn_args.technique_card_id), client_acorn_targets, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onAcorn(source_id, target_id); });
                    break;
                case 'client_giftVoucher':
                    var client_giftVoucher_args = this.mainClientState.args;
                    new TargetingLine_1.TargetingLine(new DaleCard_10.DaleCard(client_giftVoucher_args.technique_card_id), this.market.getCards(), "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onGiftVoucher(source_id, target_id); });
                    break;
                case 'client_loyalPartner':
                    this.market.setSelectionMode(2, 'pileBlue', "daleofmerchants-wrap-technique");
                    break;
                case 'client_prepaidGood':
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'specialOffer':
                    this.myLimbo.setSelectionMode('multiple', 'cheese', 'daleofmerchants-wrap-technique', this.format_dale_icons(_("Choose cards to take (ICON) and toss (ICON)"), DaleIcons_10.DaleIcons.getCheeseIcon(), DaleIcons_10.DaleIcons.getBluePileIcon(0)));
                    break;
                case 'client_rottenFood':
                    for (var _l = 0, _m = Object.entries(this.allDecks); _l < _m.length; _l++) {
                        var _o = _m[_l], player_id = _o[0], deck = _o[1];
                        if (+player_id != this.player_id) {
                            deck.setSelectionMode('noneCantViewContent');
                        }
                    }
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to give"));
                    break;
                case 'dirtyExchange':
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to give"));
                    break;
                case 'sabotage':
                    this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
                    break;
                case 'client_treasureHunter':
                    var client_treasureHunter_args_1 = this.mainClientState.args;
                    var client_treasureHunter_targets_1 = [];
                    for (var _p = 0, _q = this.gamedatas.playerorder; _p < _q.length; _p++) {
                        var player_id = _q[_p];
                        var deck = this.playerDecks[player_id];
                        var discard = this.playerDiscards[player_id];
                        if (player_id != this.player_id && deck.size + discard.size > 0) {
                            var deck_1 = this.playerDecks[player_id];
                            deck_1.setSelectionMode('noneCantViewContent');
                            var client_treasureHunter_target = (_b = deck_1.topCardHTML) !== null && _b !== void 0 ? _b : deck_1.placeholderHTML;
                            client_treasureHunter_targets_1.push(client_treasureHunter_target);
                            client_treasureHunter_target.dataset['target_id'] = String(-player_id);
                            if (discard.size > 0 && discard.topCardHTML) {
                                discard.setSelectionMode('noneCantViewContent');
                                client_treasureHunter_targets_1.push(discard.topCardHTML);
                                discard.topCardHTML.dataset['target_id'] = String(player_id);
                            }
                        }
                    }
                    if (client_treasureHunter_targets_1.length == 0) {
                        throw new Error("No valid targets for Treasure Hunter ('client_fizzle' should have been entered instead of 'client_treasureHunter')");
                    }
                    setTimeout((function () {
                        new TargetingLine_1.TargetingLine(new DaleCard_10.DaleCard(client_treasureHunter_args_1.technique_card_id), client_treasureHunter_targets_1, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onTreasureHunter(target_id); });
                    }).bind(this), 500);
                    break;
                case 'client_newSeason':
                    this.myDiscard.setSelectionMode('singleAnimalfolk', undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'client_accident':
                    this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose the order to discard your hand"));
                    break;
                case 'client_blindfold':
                    if (this.unique_opponent_id) {
                        this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card"));
                    }
                    else {
                        this.myHand.setSelectionMode('single', undefined, 'daleofmerchants-wrap-technique', _("Choose a card"));
                    }
                    break;
                case 'chameleon_flexibleShopkeeper':
                case 'chameleon_reflection':
                case 'chameleon_goodoldtimes':
                case 'chameleon_trendsetting':
                case 'chameleon_seeingdoubles':
                    if (stateName == 'chameleon_reflection') {
                        for (var _r = 0, _s = Object.entries(this.playerDiscards); _r < _s.length; _r++) {
                            var _t = _s[_r], player_id = _t[0], pile = _t[1];
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
                    new TargetingLine_1.TargetingLine(this.chameleonArgs.firstSource, this.chameleonArgs.currentTargets, "daleofmerchants-line-source-chameleon", "daleofmerchants-line-target-chameleon", "daleofmerchants-line-chameleon", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onConfirmChameleon(target_id); }, this.chameleonArgs.pile);
                    break;
                case 'client_marketDiscovery':
                    this.marketDeck.setSelectionMode('top', undefined, 'daleofmerchants-wrap-technique');
                    this.marketDiscard.setSelectionMode('top', undefined, 'daleofmerchants-wrap-purchase');
                    break;
                case 'client_calculations':
                    this.market.setSelectionMode(1, undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'client_safetyPrecaution':
                    var client_safetyPrecaution_args = this.mainClientState.args;
                    new TargetingLine_1.TargetingLine(new DaleCard_10.DaleCard(client_safetyPrecaution_args.technique_card_id), this.myStall.getCardsInStall(), "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onSafetyPrecaution(source_id, target_id); });
                    break;
                case 'magnet':
                    var magnet_args = args.args;
                    this.myDeck.setContent(magnet_args._private.cards.map(DaleCard_10.DaleCard.of));
                    this.myDeck.setSelectionMode('single');
                    break;
                case 'dangerousTest':
                    this.myHand.setSelectionMode('multiple3', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 3 cards to discard"));
                    break;
                case 'client_shoppingJourney':
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'client_houseCleaning':
                    var client_houseCleaning_args = this.mainClientState.args;
                    this.myDiscard.setSelectionMode('multipleJunk', 'hand', "daleofmerchants-wrap-technique", client_houseCleaning_args.nbr_junk);
                    if (client_houseCleaning_args.nbr_junk > 0) {
                        this.myDiscard.openPopin();
                    }
                    break;
                case 'client_houseCleaningToss':
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
                    break;
                case 'client_siesta':
                    this.myDiscard.setSelectionMode('single', 'hand', "daleofmerchants-wrap-technique");
                    break;
                case 'nightShift':
                    for (var _u = 0, _v = Object.values(this.playerDecks); _u < _v.length; _u++) {
                        var deck = _v[_u];
                        deck.setSelectionMode('noneCantViewContent');
                    }
                    this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to place back"));
                    break;
                case 'client_ruthlessCompetition':
                    var client_ruthlessCompetition_args_1 = this.mainClientState.args;
                    var client_ruthlessCompetition_targets_1 = [];
                    for (var _w = 0, _x = this.gamedatas.playerorder; _w < _x.length; _w++) {
                        var player_id = _x[_w];
                        if ((player_id != this.player_id) && this.playerDiscards[player_id].size + this.playerDecks[player_id].size > 0) {
                            var deck = this.playerDecks[player_id];
                            deck.setSelectionMode('noneCantViewContent');
                            var client_ruthlessCompetition_target = (_c = deck.topCardHTML) !== null && _c !== void 0 ? _c : deck.placeholderHTML;
                            client_ruthlessCompetition_targets_1.push(client_ruthlessCompetition_target);
                            client_ruthlessCompetition_target.dataset['target_id'] = String(player_id);
                        }
                    }
                    if (client_ruthlessCompetition_targets_1.length == 0) {
                        throw new Error("No valid targets ('client_fizzle' should have been entered instead of 'client_ruthlessCompetition')");
                    }
                    else if (client_ruthlessCompetition_targets_1.length == 1) {
                        this.onRuthlessCompetition(+client_ruthlessCompetition_targets_1[0].dataset['target_id']);
                    }
                    else {
                        setTimeout((function () {
                            new TargetingLine_1.TargetingLine(new DaleCard_10.DaleCard(client_ruthlessCompetition_args_1.technique_card_id), client_ruthlessCompetition_targets_1, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onRuthlessCompetition(target_id); });
                        }).bind(this), 500);
                    }
                    break;
                case 'ruthlessCompetition':
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to place back"));
                    break;
                case 'cunningNeighbour':
                    this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', _("Opponent's hand"));
                    break;
                case 'charity':
                case 'rumours':
                    this.myLimbo.setSelectionMode('single', undefined, 'daleofmerchants-wrap-technique', _("Choose a card"));
                    break;
                case 'deprecated_tasters':
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'tasters':
                    this.market.setSelectionMode(2, 'cheese', "daleofmerchants-wrap-technique");
                    this.market.orderedSelection.setMaxSize(1);
                    break;
                case 'daringAdventurer':
                    var daringAdventurer_args = args.args;
                    this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to discard"));
                    this.myHand.orderedSelection.setMaxSize(daringAdventurer_args.die_value);
                    break;
                case 'client_rareArtefact':
                    var client_rareArtefact_args_1 = this.mainClientState.args;
                    setTimeout((function () {
                        new TargetingLine_1.TargetingLine(new DaleCard_10.DaleCard(client_rareArtefact_args_1.technique_card_id), _this.myHand.getAllItems().map(function (item) { return new DaleCard_10.DaleCard(item.id); }), "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onRareArtefact(target_id); });
                    }).bind(this), 500);
                    break;
                case 'client_swank':
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
                    break;
                case 'naturalSurvivor':
                    var naturalSurvivor_args = args.args;
                    this.myDeck.setContent(naturalSurvivor_args._private.cards.map(DaleCard_10.DaleCard.of));
                    this.myDeck.setSelectionMode('multiple', 'naturalSurvivor', 'daleofmerchants-wrap-technique', naturalSurvivor_args.die_value);
                    this.myHand.setSelectionMode('multiple', 'naturalSurvivor', 'daleofmerchants-wrap-technique', undefined, undefined, naturalSurvivor_args.die_value);
                    break;
                case 'duplicateEntry':
                    var duplicateEntry_args = args.args;
                    this.myDeck.setContent(duplicateEntry_args._private.cards.map(DaleCard_10.DaleCard.of));
                    this.myDeck.setSelectionMode('multiple', 'duplicateEntry', 'daleofmerchants-wrap-technique', 2);
                    this.myDeck.openPopin();
                    this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
                    break;
                case 'client_historyLesson':
                    this.myDiscard.setSelectionMode('multipleFromTopWithGaps', 'historyLesson', 'daleofmerchants-wrap-technique', 3);
                    this.myDiscard.openPopin();
                    break;
                case 'culturalPreservation':
                    var culturalPreservation_args = args.args;
                    this.myDeck.setContent(culturalPreservation_args._private.cards.map(DaleCard_10.DaleCard.of));
                    this.myDeck.setSelectionMode('multiple', 'spyglass', 'daleofmerchants-wrap-technique', 3);
                    this.myDeck.openPopin();
                    break;
                case 'client_sliceoflife':
                    this.myHand.setSelectionMode('multiple2', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 2 cards to discard"));
                    break;
                case 'client_spinningWheel':
                    this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 1-3 cards to discard"), undefined, 3);
                    break;
                case 'refreshingDrink':
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to discard"));
                    break;
                case 'delightfulSurprise':
                    this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to take"));
                    break;
                case 'client_replacement':
                    this.myHand.setSelectionMode('clickAnimalfolk', undefined, 'daleofmerchants-wrap-technique', _("Choose an animalfolk card to <strong>toss</strong>"));
                    break;
                case 'replacement':
                    var replacement_args = args.args;
                    this.market.setSelectionMode(1, undefined, 'daleofmerchants-wrap-technique');
                    this.market.setClickableForReplacement(replacement_args.value);
                    break;
                case 'client_fashionHint':
                    this.marketDeck.setSelectionMode('top', undefined, 'daleofmerchants-wrap-technique');
                    this.marketDiscard.setSelectionMode('top', undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'fashionHint':
                    var fashionHint_args = args.args;
                    new TargetingLine_1.TargetingLine(new DaleCard_10.DaleCard(fashionHint_args.card_id), this.myHand.getAllItems().map(function (item) { return new DaleCard_10.DaleCard(item.id); }).filter(function (card) { return card.isAnimalfolk(); }), "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onFashionHintSwapSkip(); }, function (source_id, target_id) { return _this.onFashionHintSwap(target_id); });
                    this.myDiscard.setSelectionMode('noneCantViewContent');
                    this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', _("Choose an animalfolk card to swap with ") + fashionHint_args.card_name);
                    break;
                case 'royalPrivilege':
                    this.market.setSelectionMode(1, undefined, 'daleofmerchants-wrap-purchase');
                    this.myHand.setSelectionMode('singleAnimalfolk', 'toss', 'daleofmerchants-wrap-purchase', _("Choose an animalfolk card to toss"));
                    break;
                case 'client_carefreeSwapper':
                    var client_carefreeSwapper_args_1 = this.mainClientState.args;
                    var client_carefreeSwapper_targets_1 = [];
                    for (var _y = 0, _z = Object.entries(this.playerDiscards); _y < _z.length; _y++) {
                        var _0 = _z[_y], player_id = _0[0], pile = _0[1];
                        if (+player_id != +this.player_id && pile.size > 0) {
                            pile.setSelectionMode('noneCantViewContent');
                            client_carefreeSwapper_targets_1.push(pile.peek());
                        }
                    }
                    if (client_carefreeSwapper_targets_1.length == 0) {
                        throw new Error("No valid targets for Carefree Swapper ('client_fizzle' should have been entered instead of 'client_carefreeSwapper')");
                    }
                    setTimeout((function () {
                        new TargetingLine_1.TargetingLine(new DaleCard_10.DaleCard(client_carefreeSwapper_args_1.technique_card_id), client_carefreeSwapper_targets_1, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onCarefreeSwapper(target_id); });
                    }).bind(this), 500);
                    break;
                case 'client_matchingColours':
                    this.myHand.setSelectionMode('clickAnimalfolk', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to swap"));
                    break;
                case 'client_cleverGuardian':
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>store</strong>"));
                    break;
                case 'client_barricade':
                    var client_barricade_args = this.mainClientState.args;
                    this.myDiscard.setSelectionMode('multipleJunk', 'hand', "daleofmerchants-wrap-technique", client_barricade_args.nbr_junk);
                    if (client_barricade_args.nbr_junk > 0) {
                        this.myDiscard.openPopin();
                    }
                    break;
                case 'wheelbarrow':
                    this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', _("Top card of your deck"));
                    break;
                case 'vigilance':
                    var vigilance_args = args.args;
                    this.myDeck.setContent(vigilance_args._private.cards.map(DaleCard_10.DaleCard.of));
                    this.myDeck.setSelectionMode('single');
                    break;
                case 'tacticalMeasurement':
                    this.myHand.setSelectionMode('multiple2', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 2 cards"));
                    break;
                case 'meddlingMarketeer':
                    this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to discard"));
                    break;
                case 'client_meddlingMarketeer':
                    this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to place on your deck"));
                    break;
                case 'client_alternativePlan':
                    this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'anchor':
                case 'shakyEnterprise':
                    for (var _1 = 0, _2 = Object.entries(this.playerDiscards); _1 < _2.length; _1++) {
                        var _3 = _2[_1], player_id = _3[0], discard = _3[1];
                        discard.setSelectionMode('noneCantViewContent');
                    }
                    this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to give"));
                    break;
                case 'client_anchor':
                    this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to place on your deck"));
                    break;
                case 'manufacturedJoy':
                    var manufacturedJoy_args = args.args;
                    if (manufacturedJoy_args._private.cards.length == 0) {
                        this.mainClientState.enter('client_manufacturedJoy', {
                            draw_card_id: -1,
                            card_name: "Manufactured Joy"
                        });
                        return;
                    }
                    this.myDeck.setContent(manufacturedJoy_args._private.cards.map(DaleCard_10.DaleCard.of));
                    this.myDeck.setSelectionMode('single');
                    break;
                case 'client_manufacturedJoy':
                    for (var _4 = 0, _5 = Object.entries(this.playerDiscards); _4 < _5.length; _4++) {
                        var _6 = _5[_4], player_id = _6[0], discard = _6[1];
                        discard.setSelectionMode('noneCantViewContent');
                    }
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to give"));
                    break;
                case 'client_shakyEnterprise':
                    this.myDiscard.setSelectionMode('multipleFromTopWithGaps', 'hand', 'daleofmerchants-wrap-technique', 3);
                    this.myDiscard.openPopin();
                    break;
                case 'client_spend':
                    var client_spend_args = this.mainClientState.args;
                    var client_spend_wrap_class = (_d = client_spend_args.wrap_class) !== null && _d !== void 0 ? _d : 'daleofmerchants-wrap-purchase';
                    var client_spend_icon_type = client_spend_wrap_class == 'daleofmerchants-wrap-purchase' ? 'pileYellow' : 'pileBlue';
                    this.coinManager.setSelectionMode('implicit', client_spend_wrap_class, _("Coins included"));
                    this.coinManager.setCoinsToSpendImplicitly(this.myHand.getSelectedDaleCards(), client_spend_args.cost);
                    this.myHand.setSelectionMode('multiple', client_spend_icon_type, client_spend_wrap_class, _("Choose cards to <strong>spend</strong>"));
                    if ('passive_card_id' in this.mainClientState.args) {
                        this.mySchedule.setSelectionMode('clickOnFinishAndSnack', undefined, 'daleofmerchants-wrap-technique');
                    }
                    break;
                case 'client_spendx':
                    var client_spendx_args = this.mainClientState.args;
                    var client_spendx_wrap_class = (_e = client_spendx_args.wrap_class) !== null && _e !== void 0 ? _e : 'daleofmerchants-wrap-purchase';
                    var client_spendx_icon_type = client_spendx_wrap_class == 'daleofmerchants-wrap-purchase' ? 'pileYellow' : 'pileBlue';
                    this.coinManager.setSelectionMode('explicit', client_spendx_wrap_class, _("Click to add coins"));
                    this.myHand.setSelectionMode('multiple', client_spendx_icon_type, client_spendx_wrap_class, _("Choose cards to <strong>spend</strong>"));
                    if ('passive_card_id' in this.mainClientState.args) {
                        this.mySchedule.setSelectionMode('clickOnFinishAndSnack', undefined, 'daleofmerchants-wrap-technique');
                    }
                    break;
                case 'client_stove':
                    var client_stove_args = this.mainClientState.args;
                    this.coinManager.setSelectionMode('explicit', 'daleofmerchants-wrap-purchase', _("Click to add coins"));
                    this.myHand.unselectAll();
                    this.myHand.setSelectionMode('multipleExceptSecondary', 'pileYellow', 'daleofmerchants-wrap-purchase', _("Choose cards to <strong>spend</strong>"), 'build');
                    for (var _7 = 0, _8 = client_stove_args.stack_card_ids.slice().reverse(); _7 < _8.length; _7++) {
                        var card_id = _8[_7];
                        this.myHand.selectItem(card_id, true);
                    }
                    var client_stove_discard_nbr = (_g = (_f = client_stove_args.stack_card_ids_from_discard) === null || _f === void 0 ? void 0 : _f.length) !== null && _g !== void 0 ? _g : 0;
                    if (client_stove_discard_nbr > 0) {
                        this.myDiscard.setSelectionMode('multipleProgrammatic', 'build', 'daleofmerchants-wrap-build');
                        for (var _9 = 0, _10 = client_stove_args.stack_card_ids_from_discard.slice().reverse(); _9 < _10.length; _9++) {
                            var card_id = _10[_9];
                            this.myDiscard.selectItem(card_id);
                        }
                        this.myDiscard.updateHTMLPublic();
                    }
                    break;
                case 'charmStove':
                    this.coinManager.setSelectionMode('explicit', 'daleofmerchants-wrap-purchase', _("Click to add coins"));
                    this.myHand.setSelectionMode('multiple', 'pileYellow', 'daleofmerchants-wrap-purchase', _("Choose cards to <strong>spend</strong>"), 'build');
                    break;
                case 'client_cache':
                    this.myDiscard.setSelectionMode('single', undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'resourcefulAlly':
                    this.myDiscard.setSelectionMode('multiple', 'resourcefulAlly', 'daleofmerchants-wrap-technique', 2);
                    this.myDiscard.openPopin();
                    break;
                case 'travelingEquipment':
                    var travelingEquipment_label = this.format_dale_icons(_("Choose cards to <strong>toss</strong> (ICON) and discard (ICON)"), DaleIcons_10.DaleIcons.getTravelingEquipmentTossIcon(), DaleIcons_10.DaleIcons.getTravelingEquipmentDiscardIcon());
                    this.myHand.setSelectionMode('multiple2', 'travelingEquipment', 'daleofmerchants-wrap-technique', travelingEquipment_label);
                    break;
                case 'fishing':
                    this.myDiscard.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', 3);
                    this.myDiscard.openPopin();
                    break;
                case 'client_groundbreakingIdea':
                    this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'groundbreakingIdea':
                    this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'insight':
                    this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to place on your deck"));
                    break;
                case 'badOmen':
                    this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
                    break;
                case 'client_badOmen':
                    this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to place on your deck"));
                    break;
                case 'celestialGuidanceMarket':
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'celestialGuidanceDiscard':
                    this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'fumblingDreamer':
                    var fumblingDreamer_args = args.args;
                    if (fumblingDreamer_args.die_value1 == DaleDie_2.DaleDie.DIE_DISCARD) {
                        for (var _11 = 0, _12 = Object.entries(this.playerDiscards); _11 < _12.length; _11++) {
                            var _13 = _12[_11], player_id = _13[0], discard = _13[1];
                            discard.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
                        }
                    }
                    if (fumblingDreamer_args.die_value1 == DaleDie_2.DaleDie.DIE_DECK) {
                        for (var _14 = 0, _15 = Object.entries(this.playerDecks); _14 < _15.length; _14++) {
                            var _16 = _15[_14], player_id = _16[0], deck = _16[1];
                            deck.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
                        }
                    }
                    break;
                case 'client_selectPlayerPassive':
                    var client_selectPlayerPassive_args = this.mainClientState.args;
                    if (client_selectPlayerPassive_args.via_deck) {
                        for (var _17 = 0, _18 = Object.entries(this.playerDecks); _17 < _18.length; _17++) {
                            var _19 = _18[_17], player_id = _19[0], deck = _19[1];
                            deck.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
                        }
                    }
                    break;
                case 'bouquets':
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to place on your deck"));
                    break;
                case 'client_selectingContracts':
                    this.myDiscard.setSelectionMode('multipleFromTopWithGaps', 'selectingContracts', "daleofmerchants-wrap-technique", this.mainClientState.args.nbr);
                    this.myDiscard.openPopin();
                    break;
                case 'trigger':
                    this.mySchedule.setSelectionMode('clickOnTrigger', undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'client_windOfChange':
                    this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'client_bonsai':
                    this.myHand.setSelectionMode('multipleJunk', 'pileBlue', "daleofmerchants-wrap-technique", _("Choose 2 junk cards to discard"), undefined, 2);
                    break;
                case 'rake':
                    this.setMainTitle(this.format_dale_icons($('pagemaintitletext').innerHTML, DaleIcons_10.DaleIcons.getTossIcon(), DaleIcons_10.DaleIcons.getBluePileIcon(0)));
                    var raket_args = args.args;
                    this.myDeck.setContent(raket_args._private.cards.map(DaleCard_10.DaleCard.of));
                    this.myDeck.setSelectionMode('multiplePrimarySecondary', 'toss', "daleofmerchants-wrap-technique", 1, 'pileBlue', 2);
                    this.myDeck.openPopin();
                    break;
                case 'client_generationChange':
                    if (this.myDiscard.size > 0) {
                        this.myDiscard.setSelectionMode('multiple', 'hand', 'daleofmerchants-wrap-technique', 2);
                        this.myDiscard.openPopin();
                    }
                    break;
            }
        };
        DaleOfMerchants.prototype.onLeavingState = function (stateName) {
            var _a, _b;
            console.warn('Leaving state: ' + stateName);
            if (this.isSpectator) {
                return;
            }
            if (this.chameleonArgs && stateName.substring(0, 9) != 'chameleon') {
                console.warn("this.chameleonArgs => don't turn off selection modes");
                return;
            }
            if (this.gamedatas.gamestate.args && 'passive_card_id' in this.gamedatas.gamestate.args) {
                this.setPassiveSelected(this.gamedatas.gamestate.args.passive_card_id, false);
            }
            switch (stateName) {
                case 'turnStart':
                    this.mySchedule.setSelectionMode('none');
                    break;
                case 'cleanUpPhase':
                    this.mainClientState.leaveAndDontReturn();
                    break;
                case 'postCleanUpPhase':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_purchase':
                    var client_purchase_args = this.mainClientState.args;
                    this.coinManager.setSelectionMode('none');
                    this.market.unselectAll();
                    this.market.setSelectionMode(0);
                    this.marketDiscard.unselectTopCard();
                    this.marketDiscard.setSelectionMode('none');
                    this.myHand.setSelectionMode('none');
                    this.myStall.setLeftPlaceholderClickable(false);
                    if (((_a = client_purchase_args.optionalArgs) === null || _a === void 0 ? void 0 : _a.calculations_card_ids) === undefined) {
                        this.market.restoreArrangement();
                    }
                    break;
                case 'client_technique':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    this.myStall.setLeftPlaceholderClickable(false);
                    this.mySchedule.setSelectionMode('none');
                    break;
                case 'client_build':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    this.myStall.unselectLeftPlaceholder();
                    this.myDiscard.setSelectionMode('none');
                    this.mySchedule.setSelectionMode('none');
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
                case 'client_glue':
                    this.market.setSelectionMode(0);
                    this.myHand.orderedSelection.secondaryToPrimary();
                    break;
                case 'bonusBuild':
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
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'client_giftVoucher':
                    TargetingLine_1.TargetingLine.remove();
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
                case 'client_rottenFood':
                    for (var _i = 0, _c = Object.entries(this.allDecks); _i < _c.length; _i++) {
                        var _d = _c[_i], player_id = _d[0], deck = _d[1];
                        if (+player_id != this.player_id) {
                            deck.setSelectionMode('none');
                        }
                    }
                    this.myHand.setSelectionMode('none');
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'dirtyExchange':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'sabotage':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'client_treasureHunter':
                    for (var _e = 0, _f = Object.entries(this.playerDiscards); _e < _f.length; _e++) {
                        var _g = _f[_e], player_id = _g[0], discard = _g[1];
                        discard.setSelectionMode('none');
                    }
                    for (var _h = 0, _j = Object.entries(this.playerDecks); _h < _j.length; _h++) {
                        var _k = _j[_h], player_id = _k[0], deck = _k[1];
                        deck.setSelectionMode('none');
                    }
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'client_carefreeSwapper':
                    for (var _l = 0, _m = Object.entries(this.playerDiscards); _l < _m.length; _l++) {
                        var _o = _m[_l], player_id = _o[0], pile = _o[1];
                        if (+player_id != +this.player_id && pile.size > 0) {
                            pile.setSelectionMode('none');
                        }
                    }
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'client_newSeason':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'client_accident':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_blindfold':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'blindfoldDecideValue':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'chameleon_reflection':
                    TargetingLine_1.TargetingLine.remove();
                    for (var _p = 0, _q = Object.entries(this.playerDiscards); _p < _q.length; _p++) {
                        var _r = _q[_p], player_id = _r[0], pile = _r[1];
                        if (+player_id != +this.player_id) {
                            pile.setSelectionMode('none');
                        }
                    }
                    break;
                case 'chameleon_goodoldtimes':
                    TargetingLine_1.TargetingLine.remove();
                    this.marketDeck.setSelectionMode('none');
                    this.marketDiscard.setSelectionMode('none');
                    break;
                case 'chameleon_flexibleShopkeeper':
                case 'chameleon_trendsetting':
                case 'chameleon_seeingdoubles':
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'client_marketDiscovery':
                    this.marketDeck.setSelectionMode('none');
                    this.marketDiscard.setSelectionMode('none');
                    break;
                case 'client_calculations':
                    var client_calculations_to_client_purchase_args = this.mainClientState.args;
                    this.market.setSelectionMode(0);
                    TargetingLine_1.TargetingLine.remove();
                    if (((_b = client_calculations_to_client_purchase_args.optionalArgs) === null || _b === void 0 ? void 0 : _b.calculations_card_ids) === undefined) {
                        this.market.restoreArrangement();
                    }
                    break;
                case 'client_safetyPrecaution':
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'magnet':
                    this.myDeck.hideContent();
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'dangerousTest':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_shoppingJourney':
                    this.market.setSelectionMode(0);
                    break;
                case 'client_houseCleaning':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'client_houseCleaningToss':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_siesta':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'nightShift':
                    for (var _s = 0, _t = Object.values(this.playerDecks); _s < _t.length; _s++) {
                        var deck = _t[_s];
                        deck.setSelectionMode('none');
                    }
                    this.myLimbo.setSelectionMode('none');
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'client_ruthlessCompetition':
                    for (var _u = 0, _v = Object.entries(this.playerDecks); _u < _v.length; _u++) {
                        var _w = _v[_u], player_id = _w[0], deck = _w[1];
                        if (+player_id != +this.player_id && deck.size > 0) {
                            deck.setSelectionMode('none');
                        }
                    }
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'ruthlessCompetition':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'cunningNeighbour':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'deprecated_cheer':
                    this.myDeck.hideContent();
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'client_blindfold':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'charity':
                case 'rumours':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'deprecated_tasters':
                    this.market.setSelectionMode(0);
                    break;
                case 'tasters':
                    this.market.setSelectionMode(0);
                    break;
                case 'daringAdventurer':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_swank':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'naturalSurvivor':
                    this.myDeck.hideContent();
                    this.myDeck.setSelectionMode('none');
                    this.myHand.setSelectionMode('none');
                    break;
                case 'duplicateEntry':
                    this.myDeck.hideContent();
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'client_historyLesson':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'culturalPreservation':
                    this.myDeck.hideContent();
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'client_sliceoflife':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_spinningWheel':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'refreshingDrink':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'delightfulSurprise':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'client_replacement':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'replacement':
                    this.market.setSelectionMode(0);
                    break;
                case 'client_fashionHint':
                    this.marketDeck.setSelectionMode('none');
                    this.marketDiscard.setSelectionMode('none');
                    break;
                case 'fashionHint':
                    TargetingLine_1.TargetingLine.remove();
                    this.myDiscard.setSelectionMode('none');
                    this.myHand.setSelectionMode('none');
                    break;
                case 'royalPrivilege':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    break;
                case 'pompousProfessional':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'delicacy':
                case 'umbrella':
                    TargetingLine_1.TargetingLine.remove();
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'client_velocipede':
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'client_matchingColours':
                    this.myHand.setSelectionMode('none');
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'client_cleverGuardian':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_barricade':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'wheelbarrow':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'vigilance':
                    this.myDeck.hideContent();
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'tacticalMeasurement':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'meddlingMarketeer':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'client_meddlingMarketeer':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'client_alternativePlan':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'anchor':
                case 'shakyEnterprise':
                    for (var _x = 0, _y = Object.entries(this.playerDiscards); _x < _y.length; _x++) {
                        var _z = _y[_x], player_id = _z[0], discard = _z[1];
                        discard.setSelectionMode('none');
                    }
                    this.myLimbo.setSelectionMode('none');
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'client_anchor':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'manufacturedJoy':
                    this.myDeck.hideContent();
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'client_manufacturedJoy':
                    for (var _0 = 0, _1 = Object.entries(this.playerDiscards); _0 < _1.length; _0++) {
                        var _2 = _1[_0], player_id = _2[0], discard = _2[1];
                        discard.setSelectionMode('none');
                    }
                    this.myHand.setSelectionMode('none');
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'client_shakyEnterprise':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'client_spend':
                    this.coinManager.setSelectionMode('none');
                    this.myHand.setSelectionMode('none');
                    this.mySchedule.setSelectionMode('none');
                    break;
                case 'client_spendx':
                    this.coinManager.setSelectionMode('none');
                    this.myHand.setSelectionMode('none');
                    this.mySchedule.setSelectionMode('none');
                    break;
                case 'client_stove':
                    this.coinManager.setSelectionMode('none');
                    this.myHand.orderedSelection.secondaryToPrimary();
                    break;
                case 'charmStove':
                    this.myLimbo.setSelectionMode('none');
                    this.coinManager.setSelectionMode('none');
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_cache':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'resourcefulAlly':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'travelingEquipment':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'fishing':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'client_groundbreakingIdea':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'groundbreakingIdea':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'insight':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'badOmen':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'client_badOmen':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'celestialGuidanceMarket':
                    this.market.setSelectionMode(0);
                    break;
                case 'celestialGuidanceDiscard':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'fumblingDreamer':
                    for (var _3 = 0, _4 = Object.entries(this.playerDiscards); _3 < _4.length; _3++) {
                        var _5 = _4[_3], player_id = _5[0], discard = _5[1];
                        discard.setSelectionMode('none');
                    }
                    for (var _6 = 0, _7 = Object.entries(this.playerDecks); _6 < _7.length; _6++) {
                        var _8 = _7[_6], player_id = _8[0], deck = _8[1];
                        deck.setSelectionMode('none');
                    }
                    break;
                case 'looseMarbles':
                case 'anotherFineMess':
                    for (var _9 = 0, _10 = Object.entries(this.playerDiscards); _9 < _10.length; _9++) {
                        var _11 = _10[_9], player_id = _11[0], discard = _11[1];
                        discard.setSelectionMode('none');
                    }
                    for (var _12 = 0, _13 = Object.entries(this.playerDecks); _12 < _13.length; _12++) {
                        var _14 = _13[_12], player_id = _14[0], deck = _14[1];
                        deck.setSelectionMode('none');
                    }
                    break;
                case 'client_selectPlayerPassive':
                    for (var _15 = 0, _16 = Object.entries(this.playerDecks); _15 < _16.length; _15++) {
                        var _17 = _16[_15], player_id = _17[0], deck = _17[1];
                        deck.setSelectionMode('none');
                    }
                    break;
                case 'coffeeGrinder':
                    var coffeeGrinder_args = this.gamedatas.gamestate.args;
                    this.playerDecks[coffeeGrinder_args.opponent_id].setSelectionMode('none');
                    break;
                case 'bouquets':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_selectingContracts':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'trigger':
                    this.mySchedule.setSelectionMode('none');
                    break;
                case 'client_windOfChange':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'client_bonsai':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'rake':
                    this.myDeck.hideContent();
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'client_generationChange':
                    this.myDiscard.setSelectionMode('none');
                    break;
            }
        };
        DaleOfMerchants.prototype.onUpdateActionButtons = function (stateName, args) {
            var _this = this;
            var _a, _b, _c;
            console.warn('onUpdateActionButtons: ' + stateName, args);
            if (!this.isCurrentPlayerActive())
                return;
            if (this.gamedatas.gamestate.args && 'passive_card_id' in this.gamedatas.gamestate.args) {
                this.setPassiveSelected(this.gamedatas.gamestate.args.passive_card_id, true);
            }
            switch (stateName) {
                case 'deckSelection':
                    if (this.is_solo) {
                        this.setDescriptionOnMyTurn("${you} may choose up to ${n_plus_1} animalfolk sets to play with");
                    }
                    this.addActionButton("submit-button", this.is_solo ? _("Confirm") : _("Vote"), "onSubmitPreference");
                    this.addActionButton("abstain-button", this.is_solo ? _("Skip") : _("Abstain"), "onSubmitPreferenceAbstain", undefined, false, 'gray');
                    if (!this.gamedatas.debugMode) {
                        this.addActionButton("debug-button", _("Enable Debug Mode"), "onEnableDebugMode", undefined, false, 'red');
                    }
                    break;
                case 'postCleanUpPhase':
                    this.addActionButton("end-turn-button", _("End turn"), "onPostCleanUpPhase");
                    if (DaleCard_10.DaleCard.countChameleonsLocal() > 0) {
                        this.addActionButton("undo-chameleon-button", _("Undo"), "onUnbindChameleons", undefined, false, 'gray');
                    }
                    break;
                case 'playerTurn':
                    break;
                case 'client_technique':
                    if (this.myHand.count() == 0) {
                        this.setDescriptionOnMyTurn(_("${you} must"));
                        this.addActionButton("confirm-button", _("Take an inventory action with 0 cards"), "onInventoryAction");
                    }
                    else {
                        this.addActionButton("confirm-button", _("Take an inventory action"), "onRequestInventoryAction");
                    }
                    if (DaleCard_10.DaleCard.countChameleonsLocal() > 0) {
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
                    this.addActionButton("confirm-button", _("Toss selected junk"), "onPurchase");
                    this.addActionButtonCancelClient();
                    break;
                case 'bonusBuild':
                    this.addActionButton("confirm-button", _("Build with selected"), "onBuild");
                    var bonusBuild_args = args;
                    if (bonusBuild_args.is_first_build) {
                        this.addActionButton("skip-button", _("Skip turn"), "onBonusBuildSkip", undefined, false, 'red');
                    }
                    else {
                        this.addActionButton("skip-button", _("Skip"), "onBonusBuildSkip", undefined, false, 'gray');
                    }
                    break;
                case 'client_swiftBroker':
                    this.addActionButton("confirm-button", _("Discard all"), "onSwiftBroker");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_shatteredRelic':
                    this.addActionButtonCancelClient();
                    break;
                case 'spyglass':
                    this.addActionButton("confirm-button", _("Confirm selected"), "onSpyglass");
                    break;
                case 'client_acorn':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_giftVoucher':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_loyalPartner':
                    this.addActionButton("confirm-button", _("Toss selected"), "onLoyalPartner");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_prepaidGood':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_nuisance':
                    this.addActionButtonsOpponentSelection(2);
                    this.addActionButton("confirm-button", '', "onNuisance");
                    this.updateConfirmOpponentsButton();
                    this.addActionButtonCancelClient();
                    break;
                case 'client_rottenFood':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_dirtyExchange':
                    this.addActionButtonsOpponent(this.onDirtyExchange.bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'client_selectOpponentTechnique':
                    this.addActionButtonsOpponent(this.onSelectOpponentTechnique.bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'client_selectPlayerTechnique':
                    this.addActionButtonsOpponent(this.onSelectPlayerTechnique.bind(this), true);
                    this.addActionButtonCancelClient();
                    break;
                case 'client_selectOpponentPassive':
                    this.addActionButtonsOpponent(this.onSelectOpponentPassive.bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'client_selectPlayerPassive':
                    this.addActionButtonsOpponent(this.onSelectPlayerPassive.bind(this), true);
                    this.addActionButtonCancelClient();
                    break;
                case 'client_treasureHunter':
                case 'client_carefreeSwapper':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_newSeason':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_accident':
                    if (this.unique_opponent_id) {
                        this.addActionButton("confirm-button", _("Discard all"), "onAccident");
                    }
                    else {
                        this.addActionButtonsOpponentSelection(1);
                        this.addActionButton("confirm-button", _("Confirm"), "onAccident");
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'accident':
                    this.addActionButton("whirligig-button", _("Next"), "onAccidentDoneLooking");
                    break;
                case 'client_whirligig':
                    this.addActionButtonsOpponent(this.onWhirligig.bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'client_gamble':
                    this.addActionButtonsOpponent(this.onGamble.bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'client_blindfold':
                    if (!this.unique_opponent_id) {
                        this.addActionButtonsOpponentSelection(1);
                        this.addActionButton("confirm-button", _("Confirm"), "onBlindfold");
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'blindfold':
                    var blindfold_args = args;
                    var blindfold_label = '';
                    var blindfold_baseValue = 1;
                    var _loop_7 = function (value) {
                        if (blindfold_baseValue > 5) {
                            blindfold_label = "<span style='color:lightgreen'>".concat(value, "</span>");
                        }
                        else if (value == blindfold_baseValue) {
                            blindfold_label = String(value);
                        }
                        else {
                            blindfold_label = "".concat(blindfold_baseValue, " (<span style='color:lightgreen'>").concat(value, "</span>)");
                        }
                        this_6.addActionButton("button-" + value, blindfold_label, (function () { return _this.onBlindfoldGuess(value); }).bind(this_6));
                        blindfold_baseValue += 1;
                    };
                    var this_6 = this;
                    for (var _i = 0, _d = blindfold_args.possible_values; _i < _d.length; _i++) {
                        var value = _d[_i];
                        _loop_7(value);
                    }
                    break;
                case 'blindfoldDecideValue':
                    var blindfoldDecideValue_args = args;
                    var blindfoldDecideValue_label = '';
                    var blindfoldDecideValue_baseValue = 1;
                    var _loop_8 = function (value) {
                        if (value == blindfoldDecideValue_baseValue) {
                            blindfoldDecideValue_label = String(value);
                        }
                        else {
                            blindfoldDecideValue_label = "".concat(blindfoldDecideValue_baseValue, " (<span style='color:lightgreen'>").concat(value, "</span>)");
                        }
                        this_7.addActionButton("button-" + value, blindfoldDecideValue_label, (function () { return _this.onBlindfoldDecideValue(value); }).bind(this_7));
                        blindfoldDecideValue_baseValue += 1;
                    };
                    var this_7 = this;
                    for (var _e = 0, _f = blindfoldDecideValue_args.possible_values; _e < _f.length; _e++) {
                        var value = _f[_e];
                        _loop_8(value);
                    }
                    this.myHand.setSelectionMode('noneRetainSelection', undefined, 'daleofmerchants-wrap-default');
                    this.myHand.orderedSelection.setMaxSize(1);
                    this.myHand.selectItem(blindfoldDecideValue_args.card_id);
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
                        case 'tossOrCopy':
                            this.addActionButton("copy-button", _("Copy"), "onGoodOldTimesBind");
                            this.addActionButton("toss-button", _("Toss"), "onGoodOldTimesPassive");
                            this.addActionButtonCancelClient();
                            break;
                        case 'tossOptional':
                            this.addActionButton("toss-button", _("Toss"), "onGoodOldTimesPassive");
                            this.addActionButton("skip-button", _("Skip"), "onGoodOldTimesPassiveSkip", undefined, false, 'gray');
                            break;
                        case 'tossMandatory':
                            this.addActionButton("toss-button", _("Toss"), "onGoodOldTimesPassive");
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
                case 'client_choicelessTriggerTechniqueCard':
                    this.onChoicelessTriggerTechniqueCard();
                    break;
                case 'client_choicelessTechniqueCard':
                    var client_choicelessTechniqueCard_confirmation = this.getGameUserPreference(100);
                    if (client_choicelessTechniqueCard_confirmation == 1) {
                        this.addActionButton("confirm-button", _("Confirm"), "onChoicelessTechniqueCard");
                        this.addActionButtonCancelClient();
                    }
                    else {
                        this.onChoicelessTechniqueCard();
                    }
                    break;
                case 'client_fizzle':
                    this.addActionButton("fizzle-button", _("Confirm"), "onFizzle");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_triggerFizzle':
                    this.onTriggerFizzle();
                    break;
                case 'client_choicelessPassiveCard':
                    this.onChoicelessPassiveCard();
                    break;
                case 'client_marketDiscovery':
                    this.addActionButton("toss-button", _("Toss"), "onMarketDiscoveryToss");
                    this.addActionButton("purchase-button", _("Purchase"), "onMarketDiscoveryPurchase");
                    this.addActionButtonCancelClient();
                    break;
                case 'specialOffer':
                    this.addActionButton("confirm-button", _("Confirm selection"), "onSpecialOffer");
                    break;
                case 'client_calculations':
                    this.addActionButton("calculations-button", _("Purchase CARD_NAME"), "onCalculations");
                    this.addActionButton("cancel-button", _("Cancel"), "onCalculationsCancel", undefined, false, 'gray');
                    this.onCalculationsUpdateActionButton(null);
                    break;
                case 'client_safetyPrecaution':
                    this.addActionButtonCancelClient();
                    break;
                case 'dangerousTest':
                    this.addActionButton("confirm-button", _("Discard selected"), "onDangerousTest");
                    break;
                case 'client_glue':
                    this.addActionButton("keep-button", _("Keep"), "onPurchase");
                    this.addActionButton("discard-button", _("Discard"), "onGlueDiscard");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_houseCleaning':
                    var client_houseCleaning_args = this.mainClientState.args;
                    var client_houseCleaning_label = (client_houseCleaning_args.nbr_junk == 0) ? _("Confirm") : _("Confirm selected");
                    this.addActionButton("confirm-button", client_houseCleaning_label, "onHouseCleaning");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_houseCleaningToss':
                    this.addActionButton("skip-button", _("Skip"), "onHouseCleaningSkip", undefined, false, 'gray');
                    this.addActionButtonCancelClient();
                    break;
                case 'client_shoppingJourney':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_siesta':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_ruthlessCompetition':
                    this.addActionButtonCancelClient();
                    break;
                case 'cunningNeighbour':
                    this.addActionButton("continue-button", _("Continue"), "onCunningNeighbour");
                    break;
                case 'deprecated_cheer':
                    if (!this.isSpectator && this.myDeck.size > 0) {
                        var cheer_args = args;
                        this.myDeck.setContent(cheer_args._private.cards.map(DaleCard_10.DaleCard.of));
                        this.myDeck.setSelectionMode('single');
                    }
                    break;
                case 'client_raffle':
                    this.addActionButtonsOpponentLeftRight(this.onRaffle.bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'charity':
                case 'rumours':
                    var charity_args = args;
                    this.addActionButtonsOpponentSelection(0, charity_args.player_ids);
                    this.max_opponents = 1;
                    this.addActionButton("confirm-button", _("Confirm"), "onGiveCardsFromLimboToPlayers");
                    break;
                case 'client_deprecated_tasters':
                    this.addActionButtonsOpponentLeftRight(this.onDeprecatedTasters.bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'tasters':
                    var tasters_args = args;
                    this.addActionButtonsOpponentSelection(0, tasters_args.player_ids);
                    this.max_opponents = 1;
                    this.addActionButton("confirm-button", _("Confirm"), "onTasters");
                    break;
                case 'daringAdventurer':
                    this.addActionButton("confirm-button", _("Discard selected"), "onDaringAdventurer");
                    break;
                case 'client_rareArtefact':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_swank':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_riskyBusiness':
                    this.addActionButton("button-1", '1', (function () { return _this.onRiskyBusiness(1); }).bind(this));
                    this.addActionButton("button-2", '2', (function () { return _this.onRiskyBusiness(2); }).bind(this));
                    this.addActionButton("button-3", '3', (function () { return _this.onRiskyBusiness(3); }).bind(this));
                    this.addActionButton("button-4", '4', (function () { return _this.onRiskyBusiness(4); }).bind(this));
                    this.addActionButton("button-5", '5', (function () { return _this.onRiskyBusiness(5); }).bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'naturalSurvivor':
                    this.addActionButton("confirm-button", _("Confirm"), "onNaturalSurvivor");
                    break;
                case 'duplicateEntry':
                    this.addActionButton("confirm-button", _("Confirm"), "onDuplicateEntry");
                    break;
                case 'client_historyLesson':
                    this.addActionButton("confirm-button", _("Confirm selected"), "onHistoryLesson");
                    this.addActionButtonCancelClient();
                    break;
                case 'culturalPreservation':
                    this.addActionButton("confirm-button", _("Confirm selected"), "onCulturalPreservation");
                    break;
                case 'client_sliceoflife':
                    this.addActionButton("confirm-button", _("Confirm"), "onSliceOfLife");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_spinningWheel':
                    this.addActionButton("confirm-button", _("Confirm"), "onSpinningWheel");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_replacement':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_replacementFizzle':
                    this.addActionButton("fizzle-button", _("Toss without replacement"), "onReplacementFizzle");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_fashionHint':
                    this.addActionButton("toss-button", _("Toss"), "onFashionHintToss");
                    this.addActionButton("skip-button", _("Skip"), "onFashionHintTossSkip", undefined, false, 'gray');
                    this.addActionButtonCancelClient();
                    break;
                case 'fashionHint':
                    this.addActionButton("skip-button", _("Skip"), "onFashionHintSwapSkip", undefined, false, 'gray');
                    break;
                case 'royalPrivilege':
                    this.addActionButton("toss-button", _("Purchase"), "onRoyalPrivilege");
                    this.addActionButton("skip-button", _("Skip"), "onRoyalPrivilegeSkip", undefined, false, 'gray');
                    break;
                case 'client_pompousProfessional':
                    var _loop_9 = function (animalfolk_id) {
                        var callback = function () { return _this.onPompousProfessional(animalfolk_id); };
                        this_8.addActionButton("animalfolk-button-" + animalfolk_id, this_8.getAnimalfolkName(animalfolk_id), callback.bind(this_8));
                    };
                    var this_8 = this;
                    for (var _g = 0, _h = this.gamedatas.animalfolkIds; _g < _h.length; _g++) {
                        var animalfolk_id = _h[_g];
                        _loop_9(animalfolk_id);
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'pompousProfessional':
                    if (this.myLimbo.count() == 0) {
                        this.setMainTitle(_("Pompous Professional: waiting..."));
                        return;
                    }
                    this.removeActionButtons();
                    var pompousProfessional_args_1 = this.gamedatas.gamestate.args;
                    var pompousProfessional_is_taking_card = this.myLimbo.getAllItems().some(function (item) { return new DaleCard_10.DaleCard(item.id).effective_animalfolk_id == pompousProfessional_args_1.animalfolk_id; });
                    if (pompousProfessional_is_taking_card) {
                        var pompousProfessional_label = _("Choose a '") + pompousProfessional_args_1.animalfolk_name + ("' card to take");
                        this.myLimbo.setSelectionMode('multiple', 'spyglass', 'daleofmerchants-wrap-technique', pompousProfessional_label, undefined, Infinity);
                        this.addActionButton("confirm-button", _("Confirm"), "onPompousProfessionalTakeAndDiscard");
                        this.restoreMainTitle();
                    }
                    else {
                        this.setMainTitle(_("No '") + pompousProfessional_args_1.animalfolk_name + _("' found. You may choose the order to discard the cards"));
                        this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Discard cards"));
                        this.addActionButton("confirm-button", _("Discard"), "onPompousProfessionalDiscard");
                    }
                    break;
                case 'client_burglaryOpponentId':
                    var burglaryOpponentId_args_1 = this.mainClientState.args;
                    this.addActionButtonsOpponent(function (opponent_id) {
                        _this.mainClientState.enter('client_burglaryValue', {
                            technique_card_id: burglaryOpponentId_args_1.technique_card_id,
                            opponent_id: opponent_id,
                            opponent_name: _this.gamedatas.players[opponent_id].name
                        });
                    });
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            var deck = this.playerDecks[player_id];
                            var discard = this.playerDiscards[player_id];
                            if (deck.size + discard.size == 0) {
                                (_a = $("opponent-selection-button-" + player_id)) === null || _a === void 0 ? void 0 : _a.remove();
                            }
                        }
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'client_burglaryValue':
                    this.addActionButton("button-1", '1', (function () { return _this.onBurglary(1); }).bind(this));
                    this.addActionButton("button-2", '2', (function () { return _this.onBurglary(2); }).bind(this));
                    this.addActionButton("button-3", '3', (function () { return _this.onBurglary(3); }).bind(this));
                    this.addActionButton("button-4", '4', (function () { return _this.onBurglary(4); }).bind(this));
                    this.addActionButton("button-5", '5', (function () { return _this.onBurglary(5); }).bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'client_graspOpponentId':
                    var graspOpponentId_args_1 = this.mainClientState.args;
                    this.addActionButtonsOpponent(function (opponent_id) {
                        _this.mainClientState.enter('client_graspValue', {
                            technique_card_id: graspOpponentId_args_1.technique_card_id,
                            opponent_id: opponent_id,
                            opponent_name: _this.gamedatas.players[opponent_id].name
                        });
                    });
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id && this.playerHandSizes[player_id].getValue() <= 0) {
                            (_b = $("opponent-selection-button-" + player_id)) === null || _b === void 0 ? void 0 : _b.remove();
                        }
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'client_graspValue':
                    this.addActionButton("button-1", '1', (function () { return _this.onGrasp(1); }).bind(this));
                    this.addActionButton("button-2", '2', (function () { return _this.onGrasp(2); }).bind(this));
                    this.addActionButton("button-3", '3', (function () { return _this.onGrasp(3); }).bind(this));
                    this.addActionButton("button-4", '4', (function () { return _this.onGrasp(4); }).bind(this));
                    this.addActionButton("button-5", '5', (function () { return _this.onGrasp(5); }).bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'client_suddenNap':
                    this.addActionButtonsOpponent(this.onSuddenNap.bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'client_periscopeOpponentId':
                    var periscopeOpponentId_args_1 = this.mainClientState.args;
                    this.addActionButtonsOpponent(function (opponent_id) {
                        _this.mainClientState.enter('client_periscopeAnimalfolkId', {
                            technique_card_id: periscopeOpponentId_args_1.technique_card_id,
                            opponent_id: opponent_id,
                            opponent_name: _this.gamedatas.players[opponent_id].name
                        });
                    });
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            var deck = this.playerDecks[player_id];
                            var discard = this.playerDiscards[player_id];
                            if (deck.size + discard.size == 0) {
                                (_c = $("opponent-selection-button-" + player_id)) === null || _c === void 0 ? void 0 : _c.remove();
                            }
                        }
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'client_periscopeAnimalfolkId':
                    var _loop_10 = function (animalfolk_id) {
                        var callback = function () { return _this.onPeriscopeAnimalfolkId(animalfolk_id); };
                        this_9.addActionButton("animalfolk-button-" + animalfolk_id, this_9.getAnimalfolkName(animalfolk_id), callback.bind(this_9));
                    };
                    var this_9 = this;
                    for (var _j = 0, _k = this.gamedatas.animalfolkIds; _j < _k.length; _j++) {
                        var animalfolk_id = _k[_j];
                        _loop_10(animalfolk_id);
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'client_periscopeValue':
                    var _loop_11 = function (value) {
                        var callback = function () { return _this.onPeriscopeValue(value); };
                        this_10.addActionButton("animalfolk-button-" + value, value.toString(), callback.bind(this_10));
                    };
                    var this_10 = this;
                    for (var _l = 0, _m = [1, 2, 3, 4, 5]; _l < _m.length; _l++) {
                        var value = _m[_l];
                        _loop_11(value);
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'delicacy':
                case 'umbrella':
                    var delicacy_args = args;
                    var delicacy_action_1 = stateName == 'delicacy' ? this.onDelicacy.bind(this) : this.onUmbrella.bind(this);
                    this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', delicacy_args.opponent_name + _("'s cards"));
                    setTimeout((function () {
                        var delicacy_type = stateName == 'delicacy' ? DaleCard_10.DaleCard.CT_DELICACY : DaleCard_10.DaleCard.CT_UMBRELLA;
                        var delicacy_targets = _this.myLimbo.getAllItems().map(function (item) { return new DaleCard_10.DaleCard(item.id); });
                        if (delicacy_targets.length > 0) {
                            new TargetingLine_1.TargetingLine(_this.getScheduledCardOfTypeId(delicacy_type), delicacy_targets, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return delicacy_action_1(-1); }, function (source_id, target_id) { return delicacy_action_1(target_id); });
                        }
                        else {
                            console.warn("No targets found in limbo, TargetingLine will not be created");
                            _this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Click a card to swap"));
                        }
                    }).bind(this), stateName === 'umbrella' ? 750 : 1);
                    this.addActionButton("skip-button", _("Skip"), function () { return delicacy_action_1(-1); }, undefined, false, "gray");
                    break;
                case 'client_velocipede':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_matchingColours':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_cleverGuardian':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_barricade':
                    this.addActionButton("confirm-button", _("Confirm"), "onBarricade");
                    this.addActionButtonCancelClient();
                    break;
                case 'wheelbarrow':
                    this.addActionButton("wheelbarrow-toss-button", _("Toss"), "onWheelbarrowToss");
                    this.addActionButton("wheelbarrow-store-button", _("Store"), "onWheelbarrowStore");
                    break;
                case 'tacticalMeasurement':
                    this.addActionButton("confirm-button", _("Confirm"), "onTacticalMeasurement");
                    break;
                case 'meddlingMarketeer':
                    this.addActionButton("confirm-button", _("Discard Selected"), "onMeddlingMarketeerDiscard");
                    break;
                case 'client_meddlingMarketeer':
                    this.addActionButton("confirm-button", _("Confirm"), "onMeddlingMarketeerDeck");
                    this.addActionButton("undo-button", _("Undo"), "onMeddlingMarketeerUndo", undefined, false, "gray");
                    break;
                case 'client_goodwillpresents':
                    this.addActionButtonsOpponentSelection(2, this.gamedatas.playerorder.map(Number));
                    this.addActionButton("confirm-button", '', "onGoodwillPresents");
                    this.updateConfirmOpponentsButton();
                    this.addActionButtonCancelClient();
                    break;
                case 'client_alternativePlan':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_anchor':
                    this.addActionButton("confirm-button", _("Confirm"), "onAnchorDeck");
                    this.addActionButton("undo-button", _("Undo"), "onAnchorUndo", undefined, false, "gray");
                    break;
                case 'client_manufacturedJoy':
                    var client_manufacturedJoy_args = args;
                    if (client_manufacturedJoy_args.draw_card_id != -1) {
                        this.addActionButton("undo-button", _("Undo"), "onManufacturedJoyUndo", undefined, false, "gray");
                    }
                    break;
                case 'client_shakyEnterprise':
                    this.addActionButton("confirm-button", _("Confirm selected"), "onShakyEnterprise");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_spend':
                    this.addActionButton("confirm-button", _("Confirm"), "onSpend");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_spendx':
                    this.addActionButton("confirm-button", _("Confirm"), "onSpend");
                    this.updateSpendXButton();
                    this.addActionButtonCancelClient();
                    break;
                case 'client_stove':
                    this.addActionButton("confirm-button", _("Confirm"), "onStove");
                    this.updateStoveButton();
                    this.addActionButtonCancelClient();
                    break;
                case 'charmStove':
                    this.myLimbo.setSelectionMode('none', undefined, "daleofmerchants-wrap-default", _("Card drawn by Charm"));
                    this.addActionButton("confirm-button", _("Confirm"), "onCharmStove");
                    this.updateStoveButton();
                    break;
                case 'client_cache':
                    this.addActionButtonCancelClient();
                    break;
                case 'resourcefulAlly':
                    this.addActionButton("confirm-button", _("Confirm"), "onResourcefulAlly");
                    break;
                case 'travelingEquipment':
                    this.addActionButton("confirm-button", _("Confirm"), "onTravelingEquipment");
                    break;
                case 'fishing':
                    this.addActionButton("confirm-button", _("Confirm"), "onFishing");
                    break;
                case 'client_groundbreakingIdea':
                    this.addActionButtonCancelClient();
                    break;
                case 'insight':
                    this.addActionButton("confirm-button", _("Confirm"), "onInsight");
                    break;
                case 'badOmen':
                    this.addActionButton("skip-button", _("Skip"), "onBadOmenSkip", undefined, false, 'gray');
                    break;
                case 'client_badOmen':
                    this.addActionButton("confirm-button", _("Confirm"), "onBadOmenDeck");
                    this.addActionButton("undo-button", _("Undo"), "onBadOmenUndo", undefined, false, "gray");
                    break;
                case 'fumblingDreamer':
                    this.addActionButtonsOpponent(this.onFumblingDreamer.bind(this), true);
                    break;
                case 'looseMarbles':
                case 'anotherFineMess':
                    var looseMarbles_args = args;
                    if (looseMarbles_args.die_value1 == DaleDie_2.DaleDie.DIE_DISCARD) {
                        for (var _o = 0, _p = Object.entries(this.playerDiscards); _o < _p.length; _o++) {
                            var _q = _p[_o], player_id = _q[0], discard = _q[1];
                            discard.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
                        }
                    }
                    if (looseMarbles_args.die_value1 == DaleDie_2.DaleDie.DIE_DECK) {
                        for (var _r = 0, _s = Object.entries(this.playerDecks); _r < _s.length; _r++) {
                            var _t = _s[_r], player_id = _t[0], deck = _t[1];
                            deck.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
                        }
                    }
                    if (looseMarbles_args.die_value1 == DaleDie_2.DaleDie.DIE_HAND) {
                        var looseMarbles_hand_label = this.gamedatas.gamestate.name == 'anotherFineMess' ?
                            _("Click on your name in the top bar to move random cards from your hand") :
                            _("Click on your name in the top bar to move a random card from your hand");
                        this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', looseMarbles_hand_label);
                        this.addActionButtonsOpponent((function (opponent_id) {
                            _this.onLooseMarblesBegin(opponent_id);
                        }).bind(this), true, TranslatableStrings_1.TranslatableStrings.s_hand);
                    }
                    else if (looseMarbles_args.die_value2 == DaleDie_2.DaleDie.DIE_HAND2) {
                        var looseMarbles_fail_message_1 = _("Please select the top card of a pile first");
                        this.addActionButtonsOpponent((function (opponent_id) { return _this.showMessage(looseMarbles_fail_message_1, "error"); }).bind(this), true, TranslatableStrings_1.TranslatableStrings.s_hand);
                    }
                    break;
                case 'coffeeGrinder':
                    this.addActionButton("confirm-button", _("Discard"), "onCoffeeGrinderDiscard");
                    this.addActionButton("skip-button", _("Skip"), "onCoffeeGrinderSkip", undefined, false, 'gray');
                    var coffeeGrinder_args = args;
                    this.playerDecks[coffeeGrinder_args.opponent_id].setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'client_dramaticRomantic':
                    switch (this.myClock.getClock()) {
                        case PlayerClock_2.PlayerClock.CLOCK_DAWN:
                            this.addActionButton("forward-button", DaleCard_10.DaleCard.format_string(_("forward (DAY)")), "onDramaticRomanticForward");
                            break;
                        case PlayerClock_2.PlayerClock.CLOCK_DAY:
                            this.addActionButton("forward-button", DaleCard_10.DaleCard.format_string(_("forward (NIGHT)")), "onDramaticRomanticForward");
                            this.addActionButton("backward-button", DaleCard_10.DaleCard.format_string(_("backward (DAWN)")), "onDramaticRomanticBackward");
                            break;
                        case PlayerClock_2.PlayerClock.CLOCK_NIGHT:
                            this.addActionButton("backward-button", DaleCard_10.DaleCard.format_string(_("backward (DAY)")), "onDramaticRomanticBackward");
                            break;
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'client_selectingContracts':
                    this.addActionButton("confirm-button", _("Confirm"), "onSelectingContracts");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_windOfChange':
                    this.addActionButton("skip-button", _("Skip"), "onWindOfChangeSkip", undefined, false, 'gray');
                    this.addActionButtonCancelClient();
                    break;
                case 'client_snack':
                    this.market.setSelectionMode(1, undefined, 'daleofmerchants-wrap-technique');
                    this.addActionButtonCancelClient();
                    break;
                case 'client_bonsai':
                    this.addActionButton("confirm-button", _("Confirm"), "onBonsai");
                    this.addActionButtonCancelClient();
                    break;
                case 'rake':
                    this.addActionButton("confirm-button", _("Confirm all"), "onRake");
                    break;
                case 'client_generationChange':
                    this.addActionButton("confirm-button", _("Confirm"), "onGenerationChange");
                    this.addActionButtonCancelClient();
                    break;
            }
        };
        DaleOfMerchants.prototype.verifyChameleon = function (card, pile) {
            var _a;
            if (!card.isChameleon()) {
                return true;
            }
            if (!this.checkLock()) {
                return false;
            }
            if (this.chameleonArgs) {
                console.warn(this.chameleonArgs);
                this.chameleonArgs.pickTarget(card);
            }
            var chameleonStatename;
            var args = { mode: undefined };
            var tossAvailable = true;
            switch (card.effective_type_id) {
                case DaleCard_10.DaleCard.CT_FLEXIBLESHOPKEEPER:
                    chameleonStatename = 'chameleon_flexibleShopkeeper';
                    break;
                case DaleCard_10.DaleCard.CT_REFLECTION:
                    chameleonStatename = 'chameleon_reflection';
                    break;
                case DaleCard_10.DaleCard.CT_GOODOLDTIMES:
                    tossAvailable = (this.chameleonArgs || !card.isPassiveUsed()) && (this.marketDeck.size > 0 || this.marketDiscard.size > 0);
                    if (!tossAvailable) {
                        args.mode = 'copy';
                    }
                    else if ((!this.chameleonArgs && this.marketDiscard.size == 0) || ((_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.onlyContainsGoodOldTimes)) {
                        args.mode = 'tossOptional';
                    }
                    else if ((!this.chameleonArgs || this.chameleonArgs.currentTargets.length == 2) && this.marketDiscard.size > 0) {
                        args.mode = 'tossOrCopy';
                    }
                    else {
                        args.mode = 'tossMandatory';
                    }
                    chameleonStatename = 'chameleon_goodoldtimes';
                    break;
                case DaleCard_10.DaleCard.CT_TRENDSETTING:
                    chameleonStatename = 'chameleon_trendsetting';
                    break;
                case DaleCard_10.DaleCard.CT_SEEINGDOUBLES:
                    chameleonStatename = 'chameleon_seeingdoubles';
                    break;
                default:
                    throw new Error("Unknown chameleon card: '".concat(card.name, "'"));
            }
            if (!this.chameleonArgs) {
                this.chameleonArgs = new ChameleonArgs_1.ChameleonArgs(this.createChameleonTree(card), pile);
                var targets = this.chameleonArgs.getAllTargets();
                console.warn("'".concat(card.name, "' has ").concat(this.chameleonArgs.currentTargets.length, " direct target(s)"));
                console.warn("'".concat(card.name, "' has ").concat(targets.size, " total target(s)"));
                console.warn(Array.from(targets).map(function (target) { return target instanceof HTMLElement ? target : target.div; }));
                if (targets.size == 0) {
                    this.chameleonArgs = undefined;
                    return true;
                }
                else if (this.chameleonArgs.onlyContainsGoodOldTimes) {
                    if (tossAvailable) {
                        args.mode = 'tossOptional';
                        this.mainClientState.enterOnStack(chameleonStatename, args);
                        return false;
                    }
                    else if (card.effective_type_id != DaleCard_10.DaleCard.CT_GOODOLDTIMES) {
                        this.chameleonArgs = undefined;
                        return true;
                    }
                }
                else if (targets.size == 1) {
                    this.mainClientState.enterOnStack('chameleon_autobind');
                    var target = this.chameleonArgs.currentTargets[0];
                    if (target instanceof DaleCard_10.DaleCard) {
                        this.onConfirmChameleon(target.id);
                    }
                }
                else {
                    this.mainClientState.enterOnStack(chameleonStatename, args);
                }
            }
            else if (this.mainClientState.name == 'chameleon_autobind') {
                var target = this.chameleonArgs.currentTargets[0];
                if (target instanceof DaleCard_10.DaleCard) {
                    this.onConfirmChameleon(target.id);
                }
            }
            else {
                this.mainClientState.enter(chameleonStatename, args);
            }
            return false;
        };
        DaleOfMerchants.prototype.createChameleonTree = function (card, visited_ids) {
            var tree = {
                card: card,
                children: []
            };
            if (card instanceof HTMLElement) {
                return tree;
            }
            visited_ids = visited_ids !== null && visited_ids !== void 0 ? visited_ids : [];
            visited_ids.push(card.id);
            for (var _i = 0, _a = this.getChameleonTargets(card, visited_ids.length == 1); _i < _a.length; _i++) {
                var target = _a[_i];
                if (target instanceof HTMLElement || !visited_ids.includes(target.id)) {
                    var child = this.createChameleonTree(target, visited_ids);
                    tree.children.push(child);
                }
            }
            visited_ids.pop();
            return tree;
        };
        DaleOfMerchants.prototype.getChameleonTargets = function (card, isRoot, type_id) {
            var _a;
            var targets = [];
            switch (type_id !== null && type_id !== void 0 ? type_id : card.effective_type_id) {
                case DaleCard_10.DaleCard.CT_FLEXIBLESHOPKEEPER:
                    targets = this.myStall.getCardsInStack(this.myStall.getNumberOfStacks() - 1);
                    break;
                case DaleCard_10.DaleCard.CT_REFLECTION:
                    for (var _i = 0, _b = Object.entries(this.playerDiscards); _i < _b.length; _i++) {
                        var _c = _b[_i], player_id = _c[0], pile = _c[1];
                        if (+player_id != +this.player_id && pile.size > 0) {
                            targets.push(pile.peek());
                        }
                    }
                    break;
                case DaleCard_10.DaleCard.CT_GOODOLDTIMES:
                    if (this.marketDiscard.size > 0) {
                        targets.push(this.marketDiscard.peek());
                    }
                    if ((this.marketDeck.size > 0 || this.marketDiscard.size > 0) && (!isRoot || !card.isPassiveUsed())) {
                        var target = (_a = this.marketDeck.topCardHTML) !== null && _a !== void 0 ? _a : this.marketDeck.placeholderHTML;
                        target.dataset['target_id'] = '0';
                        targets.push(target);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_TRENDSETTING:
                    for (var _d = 0, _e = this.market.getCards(); _d < _e.length; _d++) {
                        var card_1 = _e[_d];
                        targets.push(card_1);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SEEINGDOUBLES:
                    var items = this.myHand.getAllItems();
                    for (var _f = 0, items_1 = items; _f < items_1.length; _f++) {
                        var item = items_1[_f];
                        if (item.id != card.id) {
                            var card_2 = new DaleCard_10.DaleCard(item.id);
                            if (card_2.hasLocalBindingWithSeeingDoubles()) {
                                continue;
                            }
                            targets.push(card_2);
                        }
                    }
                    break;
            }
            return targets;
        };
        DaleOfMerchants.prototype.validateChameleonsLocal = function () {
            for (var _i = 0, _a = DaleCard_10.DaleCard.getLocalChameleonsEntries(); _i < _a.length; _i++) {
                var _b = _a[_i], chameleon_card_id = _b[0], chain = _b[1];
                var isValid = false;
                var isRoot = true;
                var card_id = chameleon_card_id;
                var type_id = new DaleCard_10.DaleCard(chameleon_card_id).effective_server_type_id;
                for (var i = 0; i < chain.length; i++) {
                    var target_id = chain.card_ids[i];
                    var valid_target_ids = this.getChameleonTargets(new DaleCard_10.DaleCard(card_id), isRoot, type_id);
                    isValid = false;
                    for (var _c = 0, valid_target_ids_1 = valid_target_ids; _c < valid_target_ids_1.length; _c++) {
                        var valid_target = valid_target_ids_1[_c];
                        if (target_id == valid_target.id) {
                            isValid = true;
                            break;
                        }
                    }
                    card_id = chain.card_ids[i];
                    type_id = chain.type_ids[i];
                    isRoot = false;
                    if (!isValid)
                        break;
                }
                if (!isValid) {
                    new DaleCard_10.DaleCard(chameleon_card_id).unbindChameleonLocal();
                }
            }
        };
        DaleOfMerchants.prototype.sortCardsByLocationArg = function (cards, ascending) {
            var dbcards_sorted = [];
            for (var i in cards) {
                dbcards_sorted.push(cards[i]);
            }
            if (ascending) {
                dbcards_sorted.sort(function (dbcard1, dbcard2) { return (+dbcard1.location_arg) - (+dbcard2.location_arg); });
            }
            else {
                dbcards_sorted.sort(function (dbcard1, dbcard2) { return (+dbcard2.location_arg) - (+dbcard1.location_arg); });
            }
            return dbcards_sorted;
        };
        DaleOfMerchants.prototype.updateTagName = function (oldElement, tagName) {
            if (!oldElement.parentNode) {
                return oldElement;
            }
            var newElement = document.createElement(tagName);
            Array.from(oldElement.attributes).forEach(function (attr) {
                newElement.setAttribute(attr.name, attr.value);
            });
            newElement.innerHTML = oldElement.innerHTML;
            oldElement.parentNode.replaceChild(newElement, oldElement);
            return newElement;
        };
        DaleOfMerchants.prototype.setPassiveSelected = function (passive_card_id, enable) {
            var div = DaleCard_10.DaleCard.divs.get(+passive_card_id);
            if (div) {
                if (enable) {
                    div.classList.add("daleofmerchants-passive-selected");
                }
                else {
                    div.classList.remove("daleofmerchants-passive-selected");
                }
            }
        };
        DaleOfMerchants.prototype.setPurchaseSelectionModes = function (client_purchase_args) {
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
            if (client_purchase_args.calculations_card_id !== undefined && this.myHand.orderedSelection.getSize() == 0) {
                this.myHand.selectItem(client_purchase_args.calculations_card_id);
            }
        };
        DaleOfMerchants.prototype.format_dale_icons = function (text) {
            var icons = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                icons[_i - 1] = arguments[_i];
            }
            var parts = text.split("ICON");
            if (parts.length - 1 !== icons.length) {
                console.warn("format_dale_icons: number of icons does not match number of 'ICON' placeholders");
                return text;
            }
            var result = "";
            for (var i = 0; i < icons.length; i++) {
                result += parts[i] + "<span class=\"daleofmerchants-log-span\">".concat(icons[i].outerHTML, "</span>");
            }
            result += parts[icons.length];
            return result;
        };
        DaleOfMerchants.prototype.format_string_recursive = function (log, args) {
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
                if ('die_icon_source' in args) {
                    var iconTpl = DaleDie_2.DaleDie.getIconTpl(args['die_icon_source']);
                    args['die_icon_source'] = "<span class=\"daleofmerchants-log-span\">".concat(iconTpl, "</span>");
                }
                if ('die_icon' in args) {
                    var iconTpl = DaleDie_2.DaleDie.getIconTpl(args['die_icon']);
                    args['die_icon'] = "<span class=\"daleofmerchants-log-span\">".concat(iconTpl, "</span>");
                }
                if ('coin_icon' in args) {
                    var iconTpl = DaleIcons_10.DaleIcons.getCoinIcon();
                    args['coin_icon'] = "<span class=\"daleofmerchants-log-span\">".concat(iconTpl.outerHTML, "</span>");
                }
                if ('clock' in args) {
                    args['clock'] = PlayerClock_2.PlayerClock.getClockLabelAndIconTpl(+args['clock']);
                }
                if (log.includes('${ocelot}')) {
                    args['ocelot'] = 'OCELOT_DIE_ICON';
                }
            }
            return _super.prototype.format_string_recursive.call(this, log, args);
        };
        DaleOfMerchants.prototype.restoreMainTitle = function () {
            if (this.previousMainTitle) {
                this.setMainTitle(this.previousMainTitle);
            }
        };
        DaleOfMerchants.prototype.setDescriptionOnMyTurn = function (text, args) {
            this.gamedatas.gamestate.descriptionmyturn = text;
            var tpl = dojo.clone(this.gamedatas.gamestate.args);
            if (tpl === null) {
                tpl = {};
            }
            if (args !== null) {
                tpl = __assign(__assign({}, tpl), args);
            }
            var title = "";
            if (this.isCurrentPlayerActive() && text !== null) {
                tpl.you = this.divYou();
            }
            title = this.format_string_recursive(text, tpl);
            if (!title) {
                this.setMainTitle(" ");
            }
            else {
                this.setMainTitle(title);
            }
        };
        DaleOfMerchants.prototype.divYou = function () {
            var color = this.gamedatas.players[this.player_id].color;
            var color_bg = "";
            if (this.gamedatas.players[this.player_id] && this.gamedatas.players[this.player_id].color_back) {
                color_bg = "background-color:#" + this.gamedatas.players[this.player_id].color_back + ";";
            }
            var you = "<span style=\"font-weight:bold;color:#" + color + ";" + color_bg + "\">" + __("lang_mainsite", "You") + "</span>";
            return you;
        };
        DaleOfMerchants.prototype.setMainTitle = function (text) {
            this.previousMainTitle = $('pagemaintitletext').innerHTML;
            $('pagemaintitletext').innerHTML = text;
        };
        DaleOfMerchants.prototype.getScheduledCardOfTypeId = function (type_id) {
            for (var _i = 0, _a = this.mySchedule.getAllItems(); _i < _a.length; _i++) {
                var item = _a[_i];
                var card = new DaleCard_10.DaleCard(item.id);
                if (card.effective_type_id == type_id) {
                    return card;
                }
            }
            throw new Error("getScheduledCardOfTypeId expected a card of type id ".concat(type_id, ", but such a card was not found"));
        };
        DaleOfMerchants.prototype.stockToPile = function (card, stock, pile, delay, ignore_card_not_found) {
            if (delay === void 0) { delay = 0; }
            if (ignore_card_not_found === void 0) { ignore_card_not_found = false; }
            var card_id = card.id;
            var item_name = stock.control_name + '_item_' + card_id;
            if ($(item_name)) {
                pile.push(new DaleCard_10.DaleCard(card_id), item_name, undefined, undefined, delay);
                stock.removeFromStockByIdNoAnimation(+card_id);
            }
            else {
                if (ignore_card_not_found) {
                    console.warn("Card ".concat(card_id, " does not exist in ") + stock.control_name + ", likely because the client already executed the action in a client state");
                }
                else {
                    throw new Error("Card ".concat(card_id, " does not exist in ") + stock.control_name);
                }
            }
        };
        DaleOfMerchants.prototype.overallPlayerBoardToPile = function (card, player_id, pile, delay) {
            if (delay === void 0) { delay = 0; }
            pile.push(DaleCard_10.DaleCard.of(card), 'overall_player_board_' + player_id, null, 500, delay);
        };
        DaleOfMerchants.prototype.playerStockToPile = function (card, stock, player_id, pile, delay, ignore_card_not_found) {
            if (delay === void 0) { delay = 0; }
            if (ignore_card_not_found === void 0) { ignore_card_not_found = false; }
            if (+player_id == this.player_id) {
                this.stockToPile(card, stock, pile, delay, ignore_card_not_found);
            }
            else if (this.mono_hand_is_visible && stock == this.myHand) {
                this.stockToPile(card, this.myLimbo, pile, delay, ignore_card_not_found);
            }
            else {
                this.overallPlayerBoardToPile(card, player_id, pile, delay);
            }
        };
        DaleOfMerchants.prototype.playerStockRemove = function (card, stock, player_id, ignore_card_not_found) {
            if (ignore_card_not_found === void 0) { ignore_card_not_found = false; }
            if (+player_id == this.player_id) {
                if (ignore_card_not_found && !stock.containsCardId(+card.id)) {
                    console.warn("Card ".concat(card.id, " does not exist in ") + stock.control_name + ", likely because the client already removed the card in a client state");
                    return;
                }
                stock.removeFromStockById(+card.id);
            }
        };
        DaleOfMerchants.prototype.pileToStock = function (card, pile, stock, location_arg) {
            if (location_arg !== undefined) {
                if (pile.removeAt(location_arg - 1).id != +card.id) {
                    throw new Error("Card ".concat(+card.id, " was not found at index ").concat(location_arg, " in the pile of size ").concat(pile.size));
                }
            }
            else {
                if (pile.pop().id != +card.id) {
                    throw new Error("Card ".concat(+card.id, " was not found on top of the pile"));
                }
            }
            stock.addDaleCardToStock(DaleCard_10.DaleCard.of(card), pile.placeholderHTML);
        };
        DaleOfMerchants.prototype.pileToPlayerStock = function (card, pile, stock, player_id, location_arg) {
            if (+player_id == this.player_id) {
                this.pileToStock(card, pile, stock, location_arg);
            }
            else if (this.mono_hand_is_visible && stock == this.myHand) {
                this.pileToStock(card, pile, this.myLimbo, location_arg);
            }
            else {
                pile.pop('overall_player_board_' + player_id);
            }
        };
        DaleOfMerchants.prototype.arrayToNumberList = function (array) {
            if (array.length == 0)
                return "";
            if (typeof array[0] !== "number") {
                array = array.map(function (item) { return item.id; });
            }
            return array.join(";");
        };
        DaleOfMerchants.prototype.addActionButtonCancelClient = function (label) {
            this.addActionButton("cancel-button", label !== null && label !== void 0 ? label : _("Cancel"), "onCancelClient", undefined, false, 'gray');
        };
        DaleOfMerchants.prototype.addActionButtonsOpponentLeftRight = function (onDirectionHandler) {
            var _a;
            if (this.unique_opponent_id) {
                throw new Error("addActionButtonsOpponentLeftRight should not be called in a 2-player game");
            }
            var raffle_prev_opponent_id = -1;
            var raffle_next_opponent_id = -1;
            for (var i = 0; i < this.gamedatas.playerorder.length; i++) {
                if (this.player_id == this.gamedatas.playerorder[i]) {
                    var raffle_i_prev = (i - 1 + this.gamedatas.playerorder.length) % this.gamedatas.playerorder.length;
                    var raffle_i_next = (i + 1 + this.gamedatas.playerorder.length) % this.gamedatas.playerorder.length;
                    raffle_prev_opponent_id = this.gamedatas.playerorder[raffle_i_prev];
                    raffle_next_opponent_id = this.gamedatas.playerorder[raffle_i_next];
                    break;
                }
            }
            this.addActionButtonsOpponent(function (opponent_id) { return onDirectionHandler(opponent_id == raffle_prev_opponent_id); });
            for (var i = 0; i < this.gamedatas.playerorder.length; i++) {
                var raffle_opponent_id = this.gamedatas.playerorder[i];
                if (raffle_opponent_id != raffle_prev_opponent_id && raffle_opponent_id != raffle_next_opponent_id) {
                    (_a = $("opponent-selection-button-" + raffle_opponent_id)) === null || _a === void 0 ? void 0 : _a.remove();
                }
            }
        };
        DaleOfMerchants.prototype.addActionButtonsOpponent = function (onOpponentHandler, include_player, suffix, player_ids) {
            if (include_player === void 0) { include_player = false; }
            if (suffix === void 0) { suffix = ""; }
            player_ids = player_ids !== null && player_ids !== void 0 ? player_ids : this.gamedatas.playerorder;
            var _loop_12 = function (opponent_id) {
                if (include_player || opponent_id != this_11.player_id) {
                    var name_1 = this_11.gamedatas.players[opponent_id].name;
                    var color = this_11.gamedatas.players[opponent_id].color;
                    var label = "<span style=\"font-weight:bold;color:#".concat(color, ";\">").concat(name_1).concat(suffix, "</span>");
                    this_11.addActionButton("opponent-selection-button-" + opponent_id, label, function () { onOpponentHandler(+opponent_id); }, undefined, false, 'gray');
                }
            };
            var this_11 = this;
            for (var _i = 0, player_ids_1 = player_ids; _i < player_ids_1.length; _i++) {
                var opponent_id = player_ids_1[_i];
                _loop_12(opponent_id);
            }
        };
        DaleOfMerchants.prototype.addActionButtonsOpponentSelection = function (maxSize, player_ids, auto_select) {
            var _a;
            if (auto_select === void 0) { auto_select = false; }
            this.opponent_ids = [];
            this.max_opponents = maxSize !== null && maxSize !== void 0 ? maxSize : this.gamedatas.playerorder.length;
            for (var _i = 0, _b = this.gamedatas.playerorder; _i < _b.length; _i++) {
                var opponent_id = _b[_i];
                if ((opponent_id != this.player_id && player_ids === undefined) || (player_ids === null || player_ids === void 0 ? void 0 : player_ids.includes(+opponent_id))) {
                    var name_2 = this.gamedatas.players[opponent_id].name;
                    var color = this.gamedatas.players[opponent_id].color;
                    var label = "<span style=\"font-weight:bold;color:#".concat(color, ";\">").concat(name_2, "</span>");
                    this.addActionButton("opponent-selection-button-" + opponent_id, label, "onToggleOpponent", undefined, false, 'gray');
                    if (auto_select && this.opponent_ids.length < this.max_opponents) {
                        this.opponent_ids.push(+opponent_id);
                        (_a = $("opponent-selection-button-" + opponent_id)) === null || _a === void 0 ? void 0 : _a.classList.add("daleofmerchants-bga-button-selected");
                    }
                }
            }
        };
        DaleOfMerchants.prototype.onToggleOpponent = function (evt) {
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
                            (_a = $("opponent-selection-button-" + this.opponent_ids.pop())) === null || _a === void 0 ? void 0 : _a.classList.remove("daleofmerchants-bga-button-selected");
                        }
                        this.opponent_ids.push(opponent_id);
                        target.classList.add("daleofmerchants-bga-button-selected");
                    }
                    else if (this.max_opponents != 1) {
                        this.opponent_ids.splice(index, 1);
                        target.classList.remove("daleofmerchants-bga-button-selected");
                    }
                    this.updateConfirmOpponentsButton();
                    console.warn(this.opponent_ids);
                }
            }
        };
        DaleOfMerchants.prototype.updateConfirmOpponentsButton = function () {
            if (this.max_opponents != 1) {
                var confirm_button = $("confirm-button");
                if (confirm_button) {
                    confirm_button.innerText = _("Confirm Selection ") + "(".concat(this.opponent_ids.length, ")");
                }
            }
        };
        DaleOfMerchants.prototype.getAnimalfolkName = function (animalfolk_id) {
            return DaleCard_10.DaleCard.cardTypes[6 * animalfolk_id].animalfolk_displayed;
        };
        DaleOfMerchants.prototype.getMatchingColoursHandTargets = function (matchingColours_card_id) {
            var cards = [];
            var values = new Set();
            for (var player_id in this.gamedatas.players) {
                if (+player_id != this.player_id) {
                    for (var _i = 0, _a = this.playerStalls[player_id].getCardsInStall(); _i < _a.length; _i++) {
                        var stallCard = _a[_i];
                        values.add(stallCard.original_value);
                    }
                }
            }
            for (var _b = 0, _c = this.myHand.getAllItems(); _b < _c.length; _b++) {
                var item = _c[_b];
                var chameleonTargets = [new DaleCard_10.DaleCard(item.id)];
                if (chameleonTargets[0].isUnboundChameleon()) {
                    chameleonTargets = this.getChameleonTargets(chameleonTargets[0], true).filter(function (target) { return target instanceof DaleCard_10.DaleCard; });
                }
                for (var _d = 0, chameleonTargets_1 = chameleonTargets; _d < chameleonTargets_1.length; _d++) {
                    var handCard = chameleonTargets_1[_d];
                    var isOtherAnimalfolk = handCard.isAnimalfolk() && handCard.id != matchingColours_card_id;
                    if (isOtherAnimalfolk && values.has(handCard.effective_value)) {
                        cards.push(handCard);
                    }
                }
            }
            return cards;
        };
        DaleOfMerchants.prototype.getMatchingColoursStallTargets = function (handCard) {
            var stallCards = [];
            for (var player_id in this.gamedatas.players) {
                if (+player_id != this.player_id) {
                    for (var _i = 0, _a = this.playerStalls[player_id].getCardsInStall(); _i < _a.length; _i++) {
                        var stallCard = _a[_i];
                        if (stallCard.original_value == handCard.effective_value) {
                            stallCards.push(stallCard);
                        }
                    }
                }
            }
            return stallCards;
        };
        DaleOfMerchants.prototype.validatePompousProfessionalSelection = function () {
            var pompousProfessional_args = this.gamedatas.gamestate.args;
            var pompousProfessional_is_taking_card = this.myLimbo.getAllItems().some(function (item) { return new DaleCard_10.DaleCard(item.id).effective_animalfolk_id == pompousProfessional_args.animalfolk_id; });
            if (pompousProfessional_is_taking_card) {
                if (this.myLimbo.orderedSelection.getSize() == 0) {
                    return true;
                }
                var pompousProfessional_card = new DaleCard_10.DaleCard(this.myLimbo.orderedSelection.get().pop());
                if (pompousProfessional_card.effective_animalfolk_id != pompousProfessional_args.animalfolk_id) {
                    this.myLimbo.unselectAll();
                    return false;
                }
            }
            return true;
        };
        DaleOfMerchants.prototype.updateSpendXButton = function () {
            var confirm_button = $("confirm-button");
            if (confirm_button) {
                var args = this.mainClientState.args;
                var value = this.coinManager.getCoinsToSpend() + this.myHand.getSelectedValue();
                if (value < args.cost_min) {
                    value = args.cost_min;
                }
                else if (value > args.cost_max) {
                    value = args.cost_max;
                }
                confirm_button.innerText = _("Confirm") + " (x = ".concat(value, ")");
            }
        };
        DaleOfMerchants.prototype.updateStoveButton = function () {
            var confirm_button = $("confirm-button");
            if (confirm_button) {
                var value = this.coinManager.getCoinsToSpend() + this.myHand.getSelectedValue();
                if (value != 0) {
                    confirm_button.innerText = _("Confirm") + " (x = ".concat(value, ")");
                }
                else {
                    confirm_button.innerText = _("Skip");
                }
            }
        };
        DaleOfMerchants.prototype.onEnableDebugMode = function () {
            this.bgaPerformAction('actEnableDebugMode', {});
        };
        DaleOfMerchants.prototype.onSubmitPreference = function () {
            var animalfolk_ids = this.deckSelection.orderedSelection.get().reverse();
            if (animalfolk_ids.length == 0) {
                this.showMessage(_("Please select at least 1 animalfolk to vote"), 'error');
                return;
            }
            console.warn("onSubmitPreference", this.arrayToNumberList(animalfolk_ids));
            this.bgaPerformAction('actSubmitPreference', {
                animalfolk_ids: this.arrayToNumberList(animalfolk_ids)
            });
        };
        DaleOfMerchants.prototype.onSubmitPreferenceAbstain = function () {
            this.bgaPerformAction('actSubmitPreference', {
                animalfolk_ids: ''
            });
        };
        DaleOfMerchants.prototype.onPostCleanUpPhase = function () {
            this.bgaPerformAction('actPostCleanUpPhase', {
                chameleons_json: DaleCard_10.DaleCard.getLocalChameleonsJSON()
            });
        };
        DaleOfMerchants.prototype.onStallCardClick = function (stall, card, stack_index, index) {
            console.warn("Clicked on CardStack[".concat(stack_index, ", ").concat(index, "]"));
            switch (this.gamedatas.gamestate.name) {
            }
        };
        DaleOfMerchants.prototype.onMarketCardClick = function (card, pos) {
            var _this = this;
            pos = this.market.getValidPos(pos);
            console.warn("onMarketCardClick");
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                    var client_purchase_args = this.mainClientState.args;
                    if (client_purchase_args.pos == pos) {
                        this.mainClientState.leave();
                    }
                    else if (this.checkLock()) {
                        client_purchase_args.pos = pos;
                        client_purchase_args.market_discovery_card_id = undefined;
                        client_purchase_args.card_name = card.name;
                        client_purchase_args.cost = card.getCost(pos);
                        this.mainClientState.enter('client_purchase', client_purchase_args);
                    }
                    break;
                case 'client_technique':
                case 'client_build':
                case 'client_inventory':
                    if (this.checkLock()) {
                        this.mainClientState.enter('client_purchase', {
                            pos: pos,
                            market_discovery_card_id: undefined,
                            calculations_card_id: undefined,
                            card_name: card.name,
                            cost: card.getCost(pos),
                            optionalArgs: {}
                        });
                    }
                    break;
                case 'client_prepaidGood':
                    this.playTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'client_calculations':
                    if (!TargetingLine_1.TargetingLine.exists()) {
                        var calculations_args = this.mainClientState.args;
                        var calculations_targets = [];
                        for (var _i = 0, _a = calculations_args.card_ids; _i < _a.length; _i++) {
                            var target_id = _a[_i];
                            if (target_id != card.id) {
                                calculations_targets.push(new DaleCard_10.DaleCard(target_id));
                            }
                        }
                        new TargetingLine_1.TargetingLine(card, calculations_targets, 'daleofmerchants-line-source-technique', 'daleofmerchants-line-target-technique', 'daleofmerchants-line-technique', function (source_id) { return TargetingLine_1.TargetingLine.remove(); }, function (source_id, target_id) { return _this.onCalculationsSwap(source_id, target_id); });
                    }
                    break;
                case 'client_shoppingJourney':
                    this.resolveTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'deprecated_tasters':
                    this.bgaPerformAction('actDeprecatedTasters', {
                        card_id: card.id
                    });
                    break;
                case 'replacement':
                    this.bgaPerformAction('actReplacement', {
                        card_id: card.id
                    });
                    break;
                case 'royalPrivilege':
                    var royalPrivilege_selected = this.market.getSelected(pos);
                    this.market.unselectAll();
                    if (!royalPrivilege_selected) {
                        this.market.setSelected(pos);
                    }
                    break;
                case 'celestialGuidanceMarket':
                    this.bgaPerformAction('actCelestialGuidanceMarket', {
                        card_id: card.id
                    });
                    break;
                case 'client_snack':
                    this.resolveTechniqueCard({
                        card_id: card.id
                    });
                    break;
            }
        };
        DaleOfMerchants.prototype.onUnselectPileCard = function (pile, card_id) {
            console.warn("onUnselectPileCard");
            switch (this.gamedatas.gamestate.name) {
                case 'client_build':
                    this.onBuildSelectionChanged();
                    break;
            }
        };
        DaleOfMerchants.prototype.onSelectPileCard = function (pile, card_id) {
            console.warn("onSelectPileCard");
            var card = card_id === undefined ? undefined : new DaleCard_10.DaleCard(card_id);
            if (pile === this.myDiscard) {
                this.onSelectMyDiscardPileCard(pile, card);
            }
            else if (pile === this.marketDiscard || pile === this.marketDeck) {
                this.onSelectMarketPileCard(pile, card);
            }
            else {
                this.onOtherPileSelectionChanged(pile, card);
            }
        };
        DaleOfMerchants.prototype.onSelectMyDiscardPileCard = function (pile, card) {
            var _this = this;
            console.warn("onSelectMyDiscardPileCard");
            switch (this.gamedatas.gamestate.name) {
                case 'client_build':
                    if (this.verifyChameleon(card, pile)) {
                        this.onBuildSelectionChanged();
                    }
                    break;
                case 'client_newSeason':
                    this.playTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'client_siesta':
                    this.resolveTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'client_alternativePlan':
                    this.playTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'client_cache':
                    this.playTechniqueCard(__assign({ card_id: card.id }, this.mainClientState.getSpendArgs()));
                    break;
                case 'client_groundbreakingIdea':
                    this.playTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'groundbreakingIdea':
                    this.bgaPerformAction('actGroundbreakingIdea', {
                        card_id: card.id
                    })
                        .then(function () { return _this.myDiscard.setSelectionMode('none'); });
                    break;
                case 'celestialGuidanceDiscard':
                    this.bgaPerformAction('actCelestialGuidanceDiscard', {
                        card_id: card.id
                    });
                    break;
                case 'fumblingDreamer':
                    this.onFumblingDreamer(pile.getPlayerId());
                    break;
                case 'looseMarbles':
                case 'anotherFineMess':
                    this.onLooseMarblesBegin(pile.getPlayerId(), pile);
                    break;
                case 'client_windOfChange':
                    this.resolveTechniqueCard({
                        card_id: card.id
                    });
                    break;
            }
        };
        DaleOfMerchants.prototype.onSelectMarketPileCard = function (pile, card) {
            console.warn("onSelectMarketPileCard");
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                    this.mainClientState.leave();
                    break;
                case 'client_marketDiscovery':
                    if (pile === this.marketDeck) {
                        this.onMarketDiscoveryToss();
                    }
                    else if (pile === this.marketDiscard) {
                        this.onMarketDiscoveryPurchase();
                    }
                    break;
                case 'client_fashionHint':
                    if (pile === this.marketDeck) {
                        this.onFashionHintToss();
                    }
                    else if (pile === this.marketDiscard) {
                        this.onFashionHintTossSkip();
                    }
                    break;
            }
        };
        DaleOfMerchants.prototype.onOtherPileSelectionChanged = function (pile, card) {
            console.warn("onOtherPileSelectionChanged");
            switch (this.gamedatas.gamestate.name) {
                case 'magnet':
                    this.bgaPerformAction('actMagnet', {
                        card_id: card.id
                    });
                    break;
                case 'deprecated_cheer':
                    this.bgaPerformAction('actDeprecatedCheer', {
                        card_id: card.id
                    });
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'vigilance':
                    this.bgaPerformAction('actVigilance', {
                        card_id: card.id
                    });
                    break;
                case 'manufacturedJoy':
                    this.mainClientState.enterOnStack('client_manufacturedJoy', {
                        draw_card_id: card.id,
                        card_name: "Manufactured Joy"
                    });
                    this.myHand.addDaleCardToStock(card, this.myDeck.placeholderHTML);
                    this.myDeck.pop();
                    this.myHandSize.incValue(1);
                    break;
                case 'fumblingDreamer':
                    this.onFumblingDreamer(pile.getPlayerId());
                    break;
                case 'looseMarbles':
                case 'anotherFineMess':
                    this.onLooseMarblesBegin(pile.getPlayerId(), pile);
                    break;
                case 'client_selectPlayerPassive':
                    var client_selectPlayerPassive_args = this.mainClientState.args;
                    if (client_selectPlayerPassive_args.via_deck) {
                        this.onSelectPlayerPassive(pile.getPlayerId());
                    }
                    break;
                case 'coffeeGrinder':
                    this.onCoffeeGrinderDiscard();
                    break;
            }
        };
        DaleOfMerchants.prototype.onUnselectHandCard = function (card_id) {
            console.warn("onUnselectHandCard: " + card_id);
            var card = new DaleCard_10.DaleCard(card_id);
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                    this.onFundsSelectionChanged();
                    break;
                case 'client_build':
                    this.onBuildSelectionChanged();
                    break;
                case 'bonusBuild':
                    this.onBuildSelectionChanged();
                    break;
                case 'client_glue':
                    if (this.myHand.orderedSelection.getSize() == 0) {
                        var client_glue_button = $("keep-button");
                        if (client_glue_button) {
                            dojo.setStyle(client_glue_button, 'display', 'none');
                        }
                    }
                    break;
                case 'client_spend':
                    this.onSpendSelectionChanged();
                    break;
                case 'client_spendx':
                    this.onSpendXSelectionChanged();
                    break;
                case 'client_stove':
                    this.updateStoveButton();
                    break;
                case 'charmStove':
                    this.updateStoveButton();
                    break;
                case 'travelingEquipment':
                    if (this.myHand.count() == 1 && card_id != -1) {
                        this.myHand.orderedSelection.toggle(-1);
                        this.myHand.selectItem(card_id);
                    }
                    break;
            }
        };
        DaleOfMerchants.prototype.onSelectHandCard = function (card_id) {
            var _this = this;
            var _a, _b;
            console.warn("onSelectHandCard: " + card_id);
            var card = new DaleCard_10.DaleCard(card_id);
            switch (this.gamedatas.gamestate.name) {
                case 'postCleanUpPhase':
                    if (this.verifyChameleon(card)) {
                        this.onClickPassive(card);
                    }
                    break;
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
                case 'bonusBuild':
                    if (this.verifyChameleon(card)) {
                        this.onBuildSelectionChanged();
                    }
                    break;
                case 'client_shatteredRelic':
                    this.playTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'client_rottenFood':
                    var client_rottenFood_targets = [];
                    for (var _i = 0, _c = Object.entries(this.playerDecks); _i < _c.length; _i++) {
                        var _d = _c[_i], player_id = _d[0], deck = _d[1];
                        if (+player_id != this.player_id) {
                            var target = (_a = deck.topCardHTML) !== null && _a !== void 0 ? _a : deck.placeholderHTML;
                            target.dataset['target_id'] = player_id;
                            client_rottenFood_targets.push(target);
                        }
                    }
                    var label = _("Place '") + card.name + _("' on another player\'s deck");
                    this.setMainTitle(label);
                    this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', label);
                    new TargetingLine_1.TargetingLine(card, client_rottenFood_targets, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onRottenFood(source_id, target_id); });
                    this.removeActionButtons();
                    this.addActionButtonsOpponent(function (opponent_id) { _this.onRottenFood(card.id, opponent_id); }, false, _("\'s deck"));
                    this.addActionButtonCancelClient();
                    break;
                case 'dirtyExchange':
                    this.bgaPerformAction('actDirtyExchange', {
                        card_id: card.id
                    });
                    break;
                case 'client_blindfold':
                    if (this.verifyChameleon(new DaleCard_10.DaleCard(card_id))) {
                        if (this.unique_opponent_id) {
                            this.onBlindfold(card.id);
                        }
                    }
                    break;
                case 'client_glue':
                    var client_glue_button = $("keep-button");
                    if (client_glue_button) {
                        dojo.setStyle(client_glue_button, 'display', '');
                    }
                    break;
                case 'client_houseCleaningToss':
                    this.resolveTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'ruthlessCompetition':
                    this.bgaPerformAction('actRuthlessCompetition', {
                        card_id: card.id
                    });
                    break;
                case 'client_swank':
                    this.playTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'refreshingDrink':
                    this.bgaPerformAction('actRefreshingDrink', {
                        card_id: card.id
                    });
                    break;
                case 'client_replacement':
                    if (this.verifyChameleon(new DaleCard_10.DaleCard(card_id))) {
                        var client_replacement_value = card.effective_value;
                        for (var _e = 0, _f = this.market.getCards(); _e < _f.length; _e++) {
                            var market_card = _f[_e];
                            if (Math.abs(market_card.original_value - client_replacement_value) <= 1) {
                                this.playTechniqueCard({
                                    card_id: card.id
                                });
                                return;
                            }
                        }
                        this.mainClientState.enter('client_replacementFizzle', {
                            technique_card_id: this.mainClientState.args.technique_card_id,
                            toss_card_id: card.id,
                            toss_card_name: card.name
                        });
                    }
                    break;
                case 'client_matchingColours':
                    if (this.verifyChameleon(card)) {
                        var client_matchingColours_targets = this.getMatchingColoursStallTargets(card);
                        if (client_matchingColours_targets.length == 0) {
                            this.showMessage(_("No card in any oppponent's stall matches this card's value") + " (".concat(card.effective_value, ")"), "error");
                            return;
                        }
                        var client_matchingColours_label = _("Swap '") + card.name + _("' with an equal valued card in another player\'s stall");
                        this.setMainTitle(client_matchingColours_label);
                        this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', client_matchingColours_label);
                        new TargetingLine_1.TargetingLine(card, client_matchingColours_targets, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onMatchingColours(source_id, target_id); });
                    }
                    break;
                case 'client_cleverGuardian':
                    this.playTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'client_manufacturedJoy':
                    var client_manufacturedJoy_targets = [];
                    for (var _g = 0, _h = Object.entries(this.playerDiscards); _g < _h.length; _g++) {
                        var _j = _h[_g], player_id = _j[0], discard = _j[1];
                        var target = (_b = discard.topCardHTML) !== null && _b !== void 0 ? _b : discard.placeholderHTML;
                        target.dataset['target_id'] = player_id;
                        client_manufacturedJoy_targets.push(target);
                    }
                    var client_manufacturedJoy_label = _("Place '") + card.name + _("' on a discard pile");
                    this.setMainTitle(client_manufacturedJoy_label);
                    this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', client_manufacturedJoy_label);
                    new TargetingLine_1.TargetingLine(card, client_manufacturedJoy_targets, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onManufacturedJoyCancelTargetingLine(); }, function (source_id, target_id) { return _this.onManufacturedJoy(source_id, target_id); });
                    this.removeActionButtons();
                    this.addActionButtonsOpponent(function (opponent_id) { _this.onManufacturedJoy(card.id, opponent_id); }, true, _("\'s discard"));
                    this.addActionButton("cancel-button", _("Cancel"), "onManufacturedJoyCancelTargetingLine", undefined, false, 'gray');
                    break;
                case 'client_spend':
                    this.onSpendSelectionChanged();
                    break;
                case 'client_spendx':
                    this.onSpendXSelectionChanged();
                    break;
                case 'client_stove':
                    this.updateStoveButton();
                    break;
                case 'charmStove':
                    this.updateStoveButton();
                    break;
                case 'bouquets':
                    this.bgaPerformAction('actBouquets', {
                        card_id: card.id
                    });
                    break;
                case null:
                    throw new Error("gamestate.name is null");
            }
        };
        DaleOfMerchants.prototype.onSelectLimboCard = function (card_id) {
            var _this = this;
            var _a, _b, _c;
            console.warn("onSelectLimboCard: " + card_id);
            var card = new DaleCard_10.DaleCard(card_id);
            switch (this.gamedatas.gamestate.name) {
                case 'sabotage':
                    this.bgaPerformAction('actSabotage', {
                        card_id: card.id
                    });
                    break;
                case 'nightShift':
                    if (!TargetingLine_1.TargetingLine.exists()) {
                        var nightShift_args = this.gamedatas.gamestate.args;
                        var nightShift_targets = [];
                        for (var _i = 0, _d = nightShift_args.player_ids; _i < _d.length; _i++) {
                            var player_id = _d[_i];
                            var deck = this.playerDecks[player_id];
                            var target = (_a = deck.topCardHTML) !== null && _a !== void 0 ? _a : deck.placeholderHTML;
                            target.dataset['target_id'] = String(player_id);
                            nightShift_targets.push(target);
                        }
                        var label = _("Place '") + card.name + _("' on a deck");
                        this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', label);
                        new TargetingLine_1.TargetingLine(card, nightShift_targets, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onNightShiftNext(); }, function (source_id, target_id) { return _this.onNightShift(source_id, target_id); });
                        this.removeActionButtons();
                        this.addActionButtonsOpponent(function (opponent_id) { _this.onNightShift(card.id, opponent_id); }, true, _("\'s deck"), nightShift_args.player_ids);
                    }
                    break;
                case 'delightfulSurprise':
                    this.bgaPerformAction('actDelightfulSurprise', {
                        card_id: card.id
                    });
                    break;
                case 'pompousProfessional':
                    var pompousProfessional_isValid = this.validatePompousProfessionalSelection();
                    if (!pompousProfessional_isValid) {
                        var pompousProfessional_args = this.gamedatas.gamestate.args;
                        this.showMessage(_("Please choose a '") + pompousProfessional_args.animalfolk_name + _("' card"), 'error');
                        return;
                    }
                    break;
                case 'delicacy':
                    this.onDelicacy(card.id);
                    break;
                case 'umbrella':
                    this.onUmbrella(card.id);
                    break;
                case 'anchor':
                case 'shakyEnterprise':
                    var anchor_targets = [];
                    for (var _e = 0, _f = Object.entries(this.playerDiscards); _e < _f.length; _e++) {
                        var _g = _f[_e], player_id = _g[0], discard = _g[1];
                        var target = (_b = discard.topCardHTML) !== null && _b !== void 0 ? _b : discard.placeholderHTML;
                        target.dataset['target_id'] = player_id;
                        anchor_targets.push(target);
                    }
                    var anchor_label = _("Place '") + card.name + _("' on a discard pile");
                    this.setMainTitle(anchor_label);
                    this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', anchor_label);
                    new TargetingLine_1.TargetingLine(card, anchor_targets, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onAnchorCancelTargetingLine(); }, function (source_id, target_id) { return _this.onAnchor(source_id, target_id); });
                    this.addActionButtonsOpponent(function (opponent_id) { _this.onAnchor(card.id, opponent_id); }, true, _("\'s discard"));
                    this.addActionButton("undo-button", _("Cancel"), "onAnchorCancelTargetingLine", undefined, false, 'gray');
                    break;
                case 'badOmen':
                    if (card.isAnimalfolk()) {
                        this.stockToPile(card, this.myLimbo, this.marketDiscard);
                    }
                    else if (card.isMonoCard()) {
                        this.stockToPile(card, this.myLimbo, this.monoDiscard);
                    }
                    else {
                        this.myLimbo.removeFromStockById(card.id);
                    }
                    var badOmen_args = this.gamedatas.gamestate.args;
                    this.mainClientState.enterOnStack('client_badOmen', {
                        toss_card_id: card.id,
                        card_name: (_c = badOmen_args.resolving_card_name) !== null && _c !== void 0 ? _c : "MISSING CARD NAME"
                    });
                    break;
            }
        };
        DaleOfMerchants.prototype.onUnselectLimboCard = function (card_id) {
            console.warn("onUnselectLimboCard: " + card_id);
            var card = new DaleCard_10.DaleCard(card_id);
            switch (this.gamedatas.gamestate.name) {
                case 'pompousProfessional':
                    this.validatePompousProfessionalSelection();
                    break;
            }
        };
        DaleOfMerchants.prototype.onSelectScheduleCard = function (card_id) {
            console.warn("onSelectScheduleCard: " + card_id);
            var card = new DaleCard_10.DaleCard(card_id);
            switch (this.gamedatas.gamestate.name) {
                case 'turnStart':
                case 'trigger':
                    this.onTriggerTechnique(card_id);
                    break;
                case 'client_technique':
                    this.onTriggerTechnique(card_id);
                    break;
                case 'client_spend':
                case 'client_spendx':
                    var finish_card_id = this.mainClientState.args.passive_card_id;
                    this.mainClientState.leave();
                    if (card_id != finish_card_id) {
                        this.onTriggerTechnique(card_id);
                    }
                    break;
                case 'client_build':
                    if (card.effective_type_id == DaleCard_10.DaleCard.CT_OVERTIME) {
                        this.myDiscard.openPopin();
                    }
                    break;
            }
        };
        DaleOfMerchants.prototype.onTriggerTechnique = function (card_id) {
            var card = new DaleCard_10.DaleCard(card_id);
            var fizzle = true;
            switch (card.effective_type_id) {
                case DaleCard_10.DaleCard.CT_IMPULSIVEVISIONARY:
                    this.clientFinishTechnique('resolveTechniqueCard', card.id, 1);
                    break;
                case DaleCard_10.DaleCard.CT_COLLECTORSDESIRE:
                    this.clientFinishTechnique('resolveTechniqueCard', card.id, 2);
                    break;
                case DaleCard_10.DaleCard.CT_GROUNDBREAKINGIDEA:
                    this.clientFinishTechnique('resolveTechniqueCard', card.id, 2);
                    break;
                case DaleCard_10.DaleCard.CT_INSPIRATION:
                    this.clientFinishTechnique('resolveTechniqueCard', card.id, 2);
                    break;
                case DaleCard_10.DaleCard.CT_INSIGHT:
                    this.clientFinishTechnique('resolveTechniqueCard', card.id, 2);
                    break;
                case DaleCard_10.DaleCard.CT_PERFECTMOVE:
                    this.clientFinishTechnique('resolveTechniqueCard', card.id, 3);
                    break;
                case DaleCard_10.DaleCard.CT_SHOPPINGJOURNEY:
                    fizzle = this.market.getCards().length == 0;
                    this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_shoppingJourney', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_HOUSECLEANING:
                    fizzle = this.myHand.count() == 0;
                    this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_houseCleaningToss', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_SIESTA:
                case DaleCard_10.DaleCard.CT_MASTERBUILDER:
                    fizzle = this.myDiscard.size == 0;
                    this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_siesta', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_SNACK:
                    fizzle = this.market.size == 0;
                    this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_snack', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_WINDOFCHANGE:
                    fizzle = this.myDiscard.size == 0;
                    this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_windOfChange', card.id);
                    break;
                default:
                    this.clientTriggerTechnique('client_choicelessTriggerTechniqueCard', card.id);
                    break;
            }
        };
        DaleOfMerchants.prototype.onFundsSelectionChanged = function () {
            var args = this.mainClientState.args;
            this.coinManager.setCoinsToSpendImplicitly(this.myHand.getSelectedDaleCards(), args.cost, true);
        };
        DaleOfMerchants.prototype.onSpendSelectionChanged = function () {
            console.warn("onSpendSelectionChanged");
            var args = this.mainClientState.args;
            this.coinManager.setCoinsToSpendImplicitly(this.myHand.getSelectedDaleCards(), args.cost);
        };
        DaleOfMerchants.prototype.onSpendXSelectionChanged = function () {
            console.warn("onSpendXSelectionChanged");
            this.updateSpendXButton();
        };
        DaleOfMerchants.prototype.onPurchase = function () {
            var args = this.mainClientState.args;
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                    args.funds_card_ids = this.myHand.orderedSelection.get();
                    break;
                case 'client_essentialPurchase':
                    args.optionalArgs.essential_purchase_ids = this.myHand.orderedSelection.get();
                    break;
                case 'client_glue':
                    args.optionalArgs.glue_card_ids = this.myHand.orderedSelection.get();
                    break;
                default:
                    throw new Error("You cannot purchase a card from gamestate '".concat(this.gamedatas.gamestate, "'"));
            }
            if (args.funds_card_ids === undefined) {
                throw new Error("onPurchase: funds_card_ids is undefined, but it was expected to be defined in '${this.gamedatas.gamestate}'");
            }
            var card_id;
            if (args.market_discovery_card_id === undefined) {
                card_id = this.market.getCardId(args.pos);
                console.warn(card_id);
            }
            else {
                var card = this.marketDiscard.peek();
                if (!card) {
                    throw new Error("Cannot purchase from the bin, as it is empty");
                }
                card_id = card.id;
            }
            if (!this.mainClientState.stackIncludes('client_glue') && DaleCard_10.DaleCard.containsTypeId(args.funds_card_ids, DaleCard_10.DaleCard.CT_GLUE)) {
                this.mainClientState.enterOnStack('client_glue', args);
            }
            else if (!this.mainClientState.stackIncludes('client_essentialPurchase') && new DaleCard_10.DaleCard(card_id).effective_type_id == DaleCard_10.DaleCard.CT_ESSENTIALPURCHASE) {
                this.mainClientState.enterOnStack('client_essentialPurchase', args);
            }
            else {
                this.bgaPerformAction('actPurchase', {
                    funds_card_ids: this.arrayToNumberList(args.funds_card_ids),
                    market_card_id: card_id,
                    chameleons_json: DaleCard_10.DaleCard.getLocalChameleonsJSON(),
                    args: JSON.stringify(args.optionalArgs)
                });
                while (this.gamedatas.gamestate.name != 'client_purchase') {
                    this.mainClientState.leave();
                }
            }
        };
        DaleOfMerchants.prototype.onMarketDiscoveryToss = function () {
            this.playPassiveCard({});
        };
        DaleOfMerchants.prototype.onMarketDiscoveryPurchase = function (market_discovery_card_id) {
            if (market_discovery_card_id == undefined || market_discovery_card_id instanceof PointerEvent) {
                market_discovery_card_id = this.mainClientState.args.passive_card_id;
            }
            var card = this.marketDiscard.peek();
            if (!card) {
                this.showMessage(_("The bin is empty"), 'error');
                return;
            }
            if (this.checkLock()) {
                this.mainClientState.setPassiveSelected(false);
                this.mainClientState.enter('client_purchase', {
                    pos: -1,
                    market_discovery_card_id: market_discovery_card_id,
                    calculations_card_id: undefined,
                    card_name: card.name,
                    cost: card.original_value,
                    optionalArgs: {}
                });
            }
        };
        DaleOfMerchants.prototype.onFizzle = function () {
            this.playTechniqueCard({
                fizzle: true
            });
        };
        DaleOfMerchants.prototype.onTriggerFizzle = function () {
            this.resolveTechniqueCard({
                fizzle: true
            });
        };
        DaleOfMerchants.prototype.onChoicelessTriggerTechniqueCard = function () {
            this.resolveTechniqueCard({
                choiceless: true
            });
        };
        DaleOfMerchants.prototype.onChoicelessTechniqueCard = function () {
            this.playTechniqueCardWithServerState({
                choiceless: true
            });
        };
        DaleOfMerchants.prototype.onChoicelessPassiveCard = function () {
            this.playPassiveCard({});
        };
        DaleOfMerchants.prototype.playPassiveCard = function (args) {
            var _this = this;
            var _a;
            (_a = this.bgaPerformAction('actUsePassiveAbility', {
                card_id: this.mainClientState.args.passive_card_id,
                chameleons_json: DaleCard_10.DaleCard.getLocalChameleonsJSON(),
                args: JSON.stringify(args)
            })) === null || _a === void 0 ? void 0 : _a.catch(function () {
                if (argsPassive === null || argsPassive === void 0 ? void 0 : argsPassive.keep_passive_selected) {
                    _this.setPassiveSelected(argsPassive.passive_card_id, false);
                }
            });
            var argsPassive = this.mainClientState.args;
            this.mainClientState.leave();
            if (argsPassive.keep_passive_selected) {
                this.setPassiveSelected(argsPassive.passive_card_id, true);
            }
        };
        DaleOfMerchants.prototype.playTechniqueCardWithServerState = function (args) {
            this.bgaPerformAction('actPlayTechniqueCard', {
                card_id: this.mainClientState.args.technique_card_id,
                chameleons_json: DaleCard_10.DaleCard.getLocalChameleonsJSON(),
                args: JSON.stringify(args)
            });
            this.mainClientState.leaveAndDontReturn();
        };
        DaleOfMerchants.prototype.playTechniqueCard = function (args) {
            var _this = this;
            var prev_name = this.mainClientState.name;
            var prev_args = this.mainClientState.args;
            this.mainClientState.leave();
            this.bgaPerformAction('actPlayTechniqueCard', {
                card_id: prev_args.technique_card_id,
                chameleons_json: DaleCard_10.DaleCard.getLocalChameleonsJSON(),
                args: JSON.stringify(args)
            }).catch(function () {
                if (_this.mainClientState.name != prev_name) {
                    _this.mainClientState.enter(prev_name, prev_args);
                }
            });
        };
        DaleOfMerchants.prototype.clientScheduleTechnique = function (stateName, technique_card_id, args) {
            if (args === void 0) { args = {}; }
            if (this.checkLock()) {
                if ($(this.myHand.control_name + '_item_' + technique_card_id)) {
                    this.mySchedule.addDaleCardToStock(new DaleCard_10.DaleCard(technique_card_id), this.myHand.control_name + '_item_' + technique_card_id);
                    this.myHand.removeFromStockByIdNoAnimation(+technique_card_id);
                }
                else {
                    throw new Error("Cannot schedule the technique card. Card ".concat(technique_card_id, " does not exist in my hand"));
                }
                this.myHandSize.incValue(-1);
                this.mainClientState.enterOnStack(stateName, __assign({ technique_card_id: technique_card_id }, args));
            }
        };
        DaleOfMerchants.prototype.clientScheduleSpendTechnique = function (next, technique_card_id, cost, cost_max) {
            var other_hand_cards = this.myHand.getAllDaleCards().filter(function (card) { return card.id != technique_card_id; });
            var max_value = this.coinManager.getMaximumSpendValue(other_hand_cards);
            if (cost > max_value) {
                this.clientScheduleTechnique('client_fizzle', technique_card_id, {
                    cost: cost,
                    next: next
                });
            }
            else if (cost_max === undefined) {
                this.clientScheduleTechnique('client_spend', technique_card_id, {
                    cost: cost,
                    next: next
                });
            }
            else {
                this.clientScheduleTechnique('client_spendx', technique_card_id, {
                    cost_min: cost,
                    cost_max: cost_max,
                    cost_displayed: (cost_max == Infinity) ? "".concat(cost, "+") : "".concat(cost, " - ").concat(cost_max),
                    next: next
                });
            }
        };
        DaleOfMerchants.prototype.clientFinishTechnique = function (next, technique_card_id, cost, cost_max) {
            var other_hand_cards = this.myHand.getAllDaleCards().filter(function (card) { return card.id != technique_card_id; });
            var max_value = this.coinManager.getMaximumSpendValue(other_hand_cards);
            if (cost > max_value) {
                this.showMessage(_("Not enough funds to finish this card"), 'error');
                return;
            }
            else if (cost_max === undefined) {
                this.clientTriggerTechnique('client_spend', technique_card_id, {
                    cost: cost,
                    next: next
                });
            }
            else {
                this.clientTriggerTechnique('client_spendx', technique_card_id, {
                    cost_min: cost,
                    cost_max: cost_max,
                    cost_displayed: (cost_max == Infinity) ? "".concat(cost, "+") : "".concat(cost, " - ").concat(cost_max),
                    next: next
                });
            }
        };
        DaleOfMerchants.prototype.resolveTechniqueCardWithServerState = function (args) {
            var card_id = this.mainClientState.args.technique_card_id;
            this.bgaPerformAction('actFullyResolveTechniqueCard', {
                card_id: card_id,
                chameleons_json: DaleCard_10.DaleCard.getLocalChameleonsJSON(),
                args: JSON.stringify(args)
            });
            this.mainClientState.leaveAndDontReturn();
        };
        DaleOfMerchants.prototype.resolveTechniqueCard = function (args) {
            var card_id = this.mainClientState.args.technique_card_id;
            this.bgaPerformAction('actFullyResolveTechniqueCard', {
                card_id: card_id,
                chameleons_json: DaleCard_10.DaleCard.getLocalChameleonsJSON(),
                args: JSON.stringify(args)
            });
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.clientTriggerTechnique = function (stateName, technique_card_id, args) {
            if (args === void 0) { args = {}; }
            if (this.checkLock(true)) {
                if ($(this.mySchedule.control_name + '_item_' + technique_card_id)) {
                    this.mainClientState.enterOnStack(stateName, __assign({ technique_card_id: technique_card_id, passive_card_id: technique_card_id, is_trigger: true }, args));
                }
                else {
                    throw new Error("Cannot trigger and resolve the technique card. Card ".concat(technique_card_id, " does not exist in my schedule"));
                }
            }
        };
        DaleOfMerchants.prototype.onAcorn = function (source_id, target_id) {
            for (var _i = 0, _a = Object.entries(this.playerStalls); _i < _a.length; _i++) {
                var _b = _a[_i], player_id = _b[0], player_stall = _b[1];
                if (player_stall.contains(target_id)) {
                    this.playTechniqueCard({
                        stall_player_id: +player_id,
                        stall_card_id: target_id
                    });
                    break;
                }
            }
        };
        DaleOfMerchants.prototype.onGiftVoucher = function (source_id, target_id) {
            if (this.market.contains(target_id)) {
                this.playTechniqueCard({
                    market_card_id: target_id
                });
            }
        };
        DaleOfMerchants.prototype.onSafetyPrecaution = function (source_id, target_id) {
            if (this.myStall.contains(target_id)) {
                this.playTechniqueCard({
                    card_id: target_id
                });
            }
        };
        DaleOfMerchants.prototype.onClickTechnique = function (card) {
            var fizzle = true;
            switch (card.effective_type_id) {
                case DaleCard_10.DaleCard.CT_SWIFTBROKER:
                    this.clientScheduleTechnique('client_swiftBroker', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_SHATTEREDRELIC:
                case DaleCard_10.DaleCard.CT_FORTUNATEUPGRADE:
                case DaleCard_10.DaleCard.CT_GOLDENOPPORTUNITY:
                    if (this.myHand.count() == 1) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_shatteredRelic', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_ACORN:
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
                case DaleCard_10.DaleCard.CT_GIFTVOUCHER:
                    fizzle = this.market.getCards().length == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.mainClientState.enterOnStack('client_giftVoucher', { technique_card_id: card.id });
                    }
                    break;
                case DaleCard_10.DaleCard.CT_LOYALPARTNER:
                    this.clientScheduleTechnique('client_loyalPartner', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_PREPAIDGOOD:
                    fizzle = this.market.getCards().length == 0;
                    this.clientScheduleTechnique(fizzle ? 'client_fizzle' : 'client_prepaidGood', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_NUISANCE:
                    this.clientScheduleTechnique('client_nuisance', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_ROTTENFOOD:
                    fizzle = this.myHand.count() == 1;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_rottenFood', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_DIRTYEXCHANGE:
                    if (this.unique_opponent_id) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_dirtyExchange', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SABOTAGE:
                case DaleCard_10.DaleCard.CT_DELICACY:
                case DaleCard_10.DaleCard.CT_UMBRELLA:
                    if (this.unique_opponent_id) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_selectOpponentTechnique', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_FRESHSTART:
                    this.clientScheduleTechnique('client_selectPlayerTechnique', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_TREASUREHUNTER:
                    fizzle = true;
                    for (var _i = 0, _a = this.gamedatas.playerorder; _i < _a.length; _i++) {
                        var player_id = _a[_i];
                        if (+player_id != +this.player_id && this.playerDecks[+player_id].size + this.playerDiscards[+player_id].size > 0) {
                            fizzle = false;
                            break;
                        }
                    }
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_treasureHunter', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_NEWSEASON:
                    fizzle = true;
                    for (var _b = 0, _c = this.myDiscard.getCards(); _b < _c.length; _b++) {
                        var card_3 = _c[_b];
                        if (card_3.isAnimalfolk()) {
                            fizzle = false;
                        }
                    }
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_newSeason', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_ACCIDENT:
                    fizzle = this.myHand.count() == 1;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_accident', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_WHIRLIGIG:
                    if (this.unique_opponent_id) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_whirligig', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_CHARM:
                case DaleCard_10.DaleCard.CT_SPECIALOFFER:
                case DaleCard_10.DaleCard.CT_INHERITANCE:
                    fizzle = (this.marketDiscard.size + this.marketDeck.size) == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_GAMBLE:
                    if (this.unique_opponent_id) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_gamble', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_BLINDFOLD:
                    fizzle = this.myHand.count() == 1;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_blindfold', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_TIRELESSTINKERER:
                    fizzle = this.myDiscard.size == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SAFETYPRECAUTION:
                    fizzle = this.myStall.getNumberOfStacks() == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.mainClientState.enterOnStack('client_safetyPrecaution', { technique_card_id: card.id });
                    }
                    break;
                case DaleCard_10.DaleCard.CT_MAGNET:
                case DaleCard_10.DaleCard.CT_RAKE:
                case DaleCard_10.DaleCard.CT_WHEELBARROW:
                case DaleCard_10.DaleCard.CT_VIGILANCE:
                case DaleCard_10.DaleCard.CT_SUPPLYDEPOT:
                case DaleCard_10.DaleCard.CT_MEDDLINGMARKETEER:
                case DaleCard_10.DaleCard.CT_ANCHOR:
                case DaleCard_10.DaleCard.CT_BADOMEN:
                    fizzle = (this.myDiscard.size + this.myDeck.size) == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_HOUSECLEANING:
                    var houseCleaningJunk = 0;
                    for (var _d = 0, _e = this.myDiscard.getCards(); _d < _e.length; _d++) {
                        var card_4 = _e[_d];
                        if (card_4.isJunk() && houseCleaningJunk < 3) {
                            houseCleaningJunk++;
                        }
                    }
                    this.clientScheduleTechnique('client_houseCleaning', card.id, {
                        nbr_junk: houseCleaningJunk
                    });
                    break;
                case DaleCard_10.DaleCard.CT_NIGHTSHIFT:
                case DaleCard_10.DaleCard.CT_RUMOURS:
                    for (var _f = 0, _g = this.gamedatas.playerorder; _f < _g.length; _f++) {
                        var player_id = _g[_f];
                        if (this.playerDiscards[player_id].size + this.playerDecks[player_id].size > 0) {
                            fizzle = false;
                        }
                    }
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_RUTHLESSCOMPETITION:
                    for (var _h = 0, _j = this.gamedatas.playerorder; _h < _j.length; _h++) {
                        var player_id = _j[_h];
                        if ((player_id != this.player_id) && this.playerDiscards[player_id].size + this.playerDecks[player_id].size > 0) {
                            fizzle = false;
                        }
                    }
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_ruthlessCompetition', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_RAFFLE:
                    if (this.unique_opponent_id) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_raffle', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_CHARITY:
                    var charity_valid_players = 0;
                    for (var player_id in this.gamedatas.players) {
                        var grasp_hand_size = this.playerHandSizes[player_id].getValue();
                        if (+player_id == this.player_id) {
                            grasp_hand_size -= 1;
                        }
                        if (grasp_hand_size > 0) {
                            charity_valid_players += 1;
                        }
                    }
                    if (charity_valid_players == 0) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_DEPRECATED_TASTERS:
                    var deprecated_tasters_nbr = this.market.getCards().length;
                    fizzle = deprecated_tasters_nbr == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else if (this.unique_opponent_id || deprecated_tasters_nbr == 1) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_deprecated_tasters', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_TASTERS:
                    var tasters_nbr = this.market.getCards().length;
                    fizzle = tasters_nbr == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_RAREARTEFACT:
                    fizzle = this.myHand.count() == 1;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_rareArtefact', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SWANK:
                    fizzle = this.myHand.count() == 1;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_swank', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_RISKYBUSINESS:
                    fizzle = (this.marketDiscard.size + this.marketDeck.size) == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_riskyBusiness', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_NATURALSURVIVOR:
                    fizzle = this.myDeck.size + this.myDiscard.size == 0 || this.myHand.count() <= 1;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_DUPLICATEENTRY:
                    fizzle = (this.myDiscard.size + this.myDeck.size) == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_HISTORYLESSON:
                    fizzle = this.myDiscard.size == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_historyLesson', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_CULTURALPRESERVATION:
                    fizzle = (this.myDiscard.size + this.myDeck.size) == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_VORACIOUSCONSUMER:
                    fizzle = this.myDeck.size + this.myDiscard.size == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_REPLACEMENT:
                    if (this.myHand.count() == 1) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_replacement', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_FASHIONHINT:
                    fizzle = (this.marketDiscard.size + this.marketDeck.size) == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_fashionHint', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_POMPOUSPROFESSIONAL:
                    fizzle = this.myDeck.size + this.myDiscard.size == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_pompousProfessional', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_BURGLARY:
                    var burglary_opponents_nbr = 0;
                    var burglary_opponent_id = undefined;
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            var deck = this.playerDecks[player_id];
                            var discard = this.playerDiscards[player_id];
                            if (deck.size + discard.size > 0) {
                                burglary_opponents_nbr += 1;
                                burglary_opponent_id = +player_id;
                            }
                        }
                    }
                    if (burglary_opponents_nbr == 0) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_burglaryOpponentId', card.id);
                        if (burglary_opponents_nbr == 1) {
                            if (burglary_opponent_id === undefined) {
                                throw new Error("Invariant Error: burglary_opponent_id should have been defined");
                            }
                            this.mainClientState.enter('client_burglaryValue', {
                                technique_card_id: card.id,
                                opponent_id: burglary_opponent_id,
                                opponent_name: this.gamedatas.players[burglary_opponent_id].name
                            });
                        }
                    }
                    break;
                case DaleCard_10.DaleCard.CT_GRASP:
                    var grasp_opponents_nbr = 0;
                    var grasp_opponent_id = undefined;
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id && this.playerHandSizes[player_id].getValue() > 0) {
                            grasp_opponents_nbr += 1;
                            grasp_opponent_id = +player_id;
                        }
                    }
                    if (grasp_opponents_nbr == 0) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_graspOpponentId', card.id);
                        if (grasp_opponents_nbr == 1) {
                            if (grasp_opponent_id === undefined) {
                                throw new Error("Invariant Error: grasp_opponent_id should have been defined");
                            }
                            this.mainClientState.enter('client_graspValue', {
                                technique_card_id: card.id,
                                opponent_id: grasp_opponent_id,
                                opponent_name: this.gamedatas.players[grasp_opponent_id].name
                            });
                        }
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SUDDENNAP:
                    this.clientScheduleTechnique('client_suddenNap', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_PERISCOPE:
                    var periscope_opponents_nbr = 0;
                    var periscope_opponent_id = undefined;
                    for (var player_id in this.gamedatas.players) {
                        if (+player_id != this.player_id) {
                            var deck = this.playerDecks[player_id];
                            var discard = this.playerDiscards[player_id];
                            if (deck.size + discard.size > 0) {
                                periscope_opponents_nbr += 1;
                                periscope_opponent_id = +player_id;
                            }
                        }
                    }
                    if (periscope_opponents_nbr == 0) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_periscopeOpponentId', card.id);
                        if (periscope_opponents_nbr == 1) {
                            if (periscope_opponent_id === undefined) {
                                throw new Error("Invariant Error: burglary_opponent_id should have been defined");
                            }
                            this.mainClientState.enter('client_periscopeAnimalfolkId', {
                                technique_card_id: card.id,
                                opponent_id: periscope_opponent_id,
                                opponent_name: this.gamedatas.players[periscope_opponent_id].name
                            });
                        }
                    }
                    break;
                case DaleCard_10.DaleCard.CT_CAREFREESWAPPER:
                    fizzle = true;
                    for (var _k = 0, _l = Object.entries(this.playerDiscards); _k < _l.length; _k++) {
                        var _m = _l[_k], player_id = _m[0], pile = _m[1];
                        if (+player_id != +this.player_id && pile.size > 0) {
                            fizzle = false;
                        }
                    }
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_carefreeSwapper', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_VELOCIPEDE:
                    for (var player_id in this.gamedatas.players) {
                        if (this.playerStalls[player_id].getNumberOfStacks() > 0) {
                            fizzle = false;
                            break;
                        }
                    }
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.mainClientState.enterOnStack('client_velocipede', { technique_card_id: card.id });
                    }
                    break;
                case DaleCard_10.DaleCard.CT_MATCHINGCOLOURS:
                    fizzle = this.getMatchingColoursHandTargets(card.id).length == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_matchingColours', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_CLEVERGUARDIAN:
                    if (this.myHand.count() == 1) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_cleverGuardian', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_GOODWILLPRESENTS:
                    this.clientScheduleTechnique('client_goodwillpresents', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_ALTERNATIVEPLAN:
                    if (this.myDiscard.size == 0) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_alternativePlan', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_MANUFACTUREDJOY:
                case DaleCard_10.DaleCard.CT_BOUQUETS:
                    fizzle = (this.myDiscard.size + this.myDeck.size + this.myHand.count()) <= 1;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SHAKYENTERPRISE:
                    fizzle = this.myDiscard.size == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_shakyEnterprise', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_CACHE:
                    fizzle = this.myDiscard.size == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleSpendTechnique('client_cache', card.id, 2);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_DISPLAYOFPOWER:
                    this.clientScheduleSpendTechnique('playTechniqueCard', card.id, 2);
                    break;
                case DaleCard_10.DaleCard.CT_SAFEPROFITS:
                    this.clientScheduleSpendTechnique('playTechniqueCard', card.id, 1, 10);
                    break;
                case DaleCard_10.DaleCard.CT_RESOURCEFULALLY:
                    this.clientScheduleSpendTechnique('playTechniqueCardWithServerState', card.id, 2);
                    break;
                case DaleCard_10.DaleCard.CT_ICETRADE:
                    this.clientScheduleSpendTechnique('playTechniqueCard', card.id, 1, Infinity);
                    break;
                case DaleCard_10.DaleCard.CT_TRAVELINGEQUIPMENT:
                    this.clientScheduleSpendTechnique('playTechniqueCardWithServerState', card.id, 1);
                    break;
                case DaleCard_10.DaleCard.CT_FISHING:
                    this.clientScheduleSpendTechnique('playTechniqueCardWithServerState', card.id, 1);
                    break;
                case DaleCard_10.DaleCard.CT_GROUNDBREAKINGIDEA:
                    if (this.myDiscard.size > 0) {
                        this.clientScheduleTechnique('client_groundbreakingIdea', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SELECTINGCONTRACTS:
                    fizzle = this.myDiscard.size == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        var client_selectingContracts_nbr = 0;
                        switch (this.myClock.getClock()) {
                            case PlayerClock_2.PlayerClock.CLOCK_DAWN:
                                client_selectingContracts_nbr = 2;
                                break;
                            case PlayerClock_2.PlayerClock.CLOCK_DAY:
                                client_selectingContracts_nbr = 4;
                                break;
                            case PlayerClock_2.PlayerClock.CLOCK_NIGHT:
                                client_selectingContracts_nbr = 1;
                                break;
                        }
                        client_selectingContracts_nbr = Math.min(client_selectingContracts_nbr, this.myDiscard.size);
                        this.clientScheduleTechnique('client_selectingContracts', card.id, { nbr: client_selectingContracts_nbr });
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SERENADE:
                    switch (this.myClock.getClock()) {
                        case PlayerClock_2.PlayerClock.CLOCK_DAWN:
                            console.warn("Dawn: DaleCard.CT_SERENADE == DaleCard.CT_SAFETYPRECAUTION");
                            for (var player_id in this.gamedatas.players) {
                                if (this.playerStalls[player_id].getNumberOfStacks() > 0) {
                                    fizzle = false;
                                    break;
                                }
                            }
                            if (fizzle) {
                                this.clientScheduleTechnique('client_fizzle', card.id);
                            }
                            else {
                                this.mainClientState.enterOnStack('client_safetyPrecaution', { technique_card_id: card.id });
                            }
                            break;
                        case PlayerClock_2.PlayerClock.CLOCK_DAY:
                            console.warn("Day: DaleCard.CT_SERENADE == DaleCard.CT_ACORN");
                            if (this.myStall.getNumberOfStacks() > 0) {
                                fizzle = false;
                            }
                            if (fizzle) {
                                this.clientScheduleTechnique('client_fizzle', card.id);
                            }
                            else {
                                this.mainClientState.enterOnStack('client_acorn', { technique_card_id: card.id });
                            }
                            break;
                        case PlayerClock_2.PlayerClock.CLOCK_NIGHT:
                            console.warn("Night: DaleCard.CT_SERENADE == DaleCard.CT_GIFTVOUCHER");
                            fizzle = this.market.getCards().length == 0;
                            if (fizzle) {
                                this.clientScheduleTechnique('client_fizzle', card.id);
                            }
                            else {
                                this.mainClientState.enterOnStack('client_giftVoucher', { technique_card_id: card.id });
                            }
                            break;
                        default:
                            throw new Error("Serenade played with an invalid clock");
                    }
                    break;
                case DaleCard_10.DaleCard.CT_GENERATIONCHANGE:
                    this.clientScheduleTechnique('client_generationChange', card.id, {
                        nbr: Math.min(2, this.myDiscard.size)
                    });
                    break;
                default:
                    this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    break;
            }
        };
        DaleOfMerchants.prototype.onClickPassive = function (card, postCleanUp) {
            if (postCleanUp === void 0) { postCleanUp = false; }
            var type_id = card.effective_type_id;
            if (type_id != DaleCard_10.DaleCard.CT_GOODOLDTIMES && type_id != DaleCard_10.DaleCard.CT_DEPRECATED_MARKETDISCOVERY) {
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
                case DaleCard_10.DaleCard.CT_GOODOLDTIMES:
                    if (card.isPassiveUsed()) {
                        this.showMessage(_("This passive's ability was already used"), 'error');
                    }
                    else {
                        this.showMessage(_("This passive's ability has no valid target"), 'error');
                    }
                    break;
                case DaleCard_10.DaleCard.CT_DEPRECATED_MARKETDISCOVERY:
                    if (this.gamedatas.gamestate.name == 'postCleanUpPhase') {
                        if (card.isPassiveUsed()) {
                            this.showMessage(_("This passive's ability was already used"), 'error');
                        }
                        else {
                            this.mainClientState.enterOnStack('client_marketDiscovery', { passive_card_id: card.id });
                            this.onMarketDiscoveryToss();
                        }
                    }
                    else if (card.isPassiveUsed()) {
                        this.onMarketDiscoveryPurchase(card.id);
                    }
                    else {
                        this.mainClientState.enterOnStack('client_marketDiscovery', { passive_card_id: card.id });
                    }
                    break;
                case DaleCard_10.DaleCard.CT_CALCULATIONS:
                    var client_calculations_card_ids = this.market.saveArrangement();
                    this.mainClientState.enterOnStack('client_calculations', {
                        passive_card_id: card.id,
                        card_ids: client_calculations_card_ids,
                        card_id_last: client_calculations_card_ids[0]
                    });
                    break;
                case DaleCard_10.DaleCard.CT_REFRESHINGDRINK:
                    this.mainClientState.enterOnStack('client_choicelessPassiveCard', { passive_card_id: card.id, keep_passive_selected: true });
                    break;
                case DaleCard_10.DaleCard.CT_SLICEOFLIFE:
                    if (this.myHand.count() < 2) {
                        this.showMessage(_("Not enough cards to discard"), 'error');
                        return;
                    }
                    this.mainClientState.enterOnStack('client_sliceoflife', { passive_card_id: card.id, disable_cancel_on_click: true });
                    break;
                case DaleCard_10.DaleCard.CT_SPINNINGWHEEL:
                    this.mainClientState.enterOnStack('client_spinningWheel', { passive_card_id: card.id, disable_cancel_on_click: true });
                    break;
                case DaleCard_10.DaleCard.CT_CUNNINGNEIGHBOUR:
                    if (this.unique_opponent_id) {
                        this.mainClientState.enterOnStack('client_choicelessPassiveCard', { passive_card_id: card.id, keep_passive_selected: true });
                    }
                    else {
                        this.mainClientState.enterOnStack('client_selectOpponentPassive', { passive_card_id: card.id, keep_passive_selected: true });
                    }
                    break;
                case DaleCard_10.DaleCard.CT_BARRICADE:
                    var barricadeJunk = 0;
                    for (var _i = 0, _a = this.myDiscard.getCards(); _i < _a.length; _i++) {
                        var card_5 = _a[_i];
                        if (card_5.isJunk() && barricadeJunk < 2) {
                            barricadeJunk++;
                        }
                    }
                    this.mainClientState.enterOnStack('client_barricade', { passive_card_id: card.id, nbr_junk: barricadeJunk });
                    break;
                case DaleCard_10.DaleCard.CT_GREED:
                    this.mainClientState.enterOnStack('client_spend', { passive_card_id: card.id,
                        cost: 1,
                        next: 'playPassiveCard'
                    });
                    break;
                case DaleCard_10.DaleCard.CT_COFFEEGRINDER:
                    this.mainClientState.enterOnStack('client_selectPlayerPassive', { passive_card_id: card.id, via_deck: true, keep_passive_selected: true });
                    break;
                case DaleCard_10.DaleCard.CT_DRAMATICROMANTIC:
                    this.mainClientState.enterOnStack('client_dramaticRomantic', { passive_card_id: card.id });
                    break;
                case DaleCard_10.DaleCard.CT_BONSAI:
                    this.mainClientState.enterOnStack('client_bonsai', { passive_card_id: card.id });
                    break;
                default:
                    this.mainClientState.enterOnStack('client_choicelessPassiveCard', { passive_card_id: card.id });
                    break;
            }
        };
        DaleOfMerchants.prototype.onClickCoinManager = function () {
            switch (this.mainClientState.name) {
                case 'client_spendx':
                    this.updateSpendXButton();
                    break;
                case 'client_stove':
                    this.updateStoveButton();
                    break;
            }
            if (this.gamedatas.gamestate.name == 'charmStove') {
                this.updateStoveButton();
            }
        };
        DaleOfMerchants.prototype.onBuildSelectionChanged = function (card) {
            console.warn("onBuildSelectionChanged");
            var card_ids = this.myHand.orderedSelection.get();
            var count_nostalgic_items = 0;
            if (this.mySchedule.countTypeId(DaleCard_10.DaleCard.CT_OVERTIME) > 0) {
                count_nostalgic_items = 999;
            }
            for (var _i = 0, card_ids_4 = card_ids; _i < card_ids_4.length; _i++) {
                var card_id = card_ids_4[_i];
                var card_6 = new DaleCard_10.DaleCard(card_id);
                if (card_6.effective_type_id == DaleCard_10.DaleCard.CT_NOSTALGICITEM) {
                    count_nostalgic_items++;
                }
            }
            if (count_nostalgic_items > 0) {
                for (var _a = 0, _b = this.myDiscard.orderedSelection.get(); _a < _b.length; _a++) {
                    var card_id = _b[_a];
                    var card_7 = new DaleCard_10.DaleCard(card_id);
                    if (card_7.effective_type_id == DaleCard_10.DaleCard.CT_NOSTALGICITEM) {
                        count_nostalgic_items++;
                    }
                }
            }
            console.warn("count_nostalgic_items = " + count_nostalgic_items);
            if (count_nostalgic_items == 0) {
                this.myDiscard.setSelectionMode('none');
            }
            else {
                this.myDiscard.setSelectionMode('multiple', 'build', "daleofmerchants-wrap-build", count_nostalgic_items);
            }
        };
        DaleOfMerchants.prototype.onCharmStove = function () {
            var spend_card_ids = this.myHand.orderedSelection.get();
            var spend_coins = this.coinManager.getCoinsToSpend();
            this.bgaPerformAction('actCharmStove', {
                spend_card_ids: this.arrayToNumberList(spend_card_ids),
                spend_coins: spend_coins
            });
        };
        DaleOfMerchants.prototype.onStove = function () {
            var spend_card_ids = this.myHand.orderedSelection.get();
            var spend_coins = this.coinManager.getCoinsToSpend();
            var args = this.mainClientState.args;
            var stove_card_id = args.passive_card_id;
            args.optionalArgs.stove_spend_args[stove_card_id] = {
                spend_card_ids: spend_card_ids,
                spend_coins: spend_coins
            };
            this.onBuild();
        };
        DaleOfMerchants.prototype.onBuild = function () {
            var _this = this;
            var args = this.mainClientState.args;
            console.warn("onBuild", args);
            switch (this.gamedatas.gamestate.name) {
                case 'client_stove':
                    break;
                case 'client_build':
                case 'bonusBuild':
                    args.stack_card_ids = this.myHand.orderedSelection.get();
                    args.stack_card_ids_from_discard = this.myDiscard.orderedSelection.get();
                    args.optionalArgs = { stove_spend_args: {} };
                    for (var _i = 0, _a = __spreadArray(__spreadArray([], args.stack_card_ids, true), args.stack_card_ids_from_discard, true); _i < _a.length; _i++) {
                        var card_id = _a[_i];
                        if (new DaleCard_10.DaleCard(card_id).effective_type_id == DaleCard_10.DaleCard.CT_STOVE) {
                            args.optionalArgs.stove_spend_args[card_id] = undefined;
                        }
                    }
                    break;
            }
            if (args.stack_card_ids === undefined || args.stack_card_ids_from_discard == undefined) {
                throw new Error("onBuild: stack_card_ids and stack_card_ids_from_discard are undefined");
            }
            for (var _b = 0, _c = Object.keys(args.optionalArgs.stove_spend_args); _b < _c.length; _b++) {
                var card_id = _c[_b];
                if (args.optionalArgs.stove_spend_args[+card_id] === undefined) {
                    this.mainClientState.setPassiveSelected(false);
                    this.mainClientState.enterOnStack('client_stove', __assign(__assign({}, args), { passive_card_id: +card_id }));
                    this.myStall.selectLeftPlaceholder();
                    return;
                }
            }
            this.bgaPerformAction('actBuild', {
                stack_card_ids: this.arrayToNumberList(args.stack_card_ids),
                stack_card_ids_from_discard: this.arrayToNumberList(args.stack_card_ids_from_discard),
                chameleons_json: DaleCard_10.DaleCard.getLocalChameleonsJSON(),
                args: JSON.stringify(args.optionalArgs)
            }).then(function () {
                while (_this.gamedatas.gamestate.name != 'client_build' && _this.gamedatas.gamestate.name != 'bonusBuild') {
                    _this.mainClientState.leave();
                }
            });
        };
        DaleOfMerchants.prototype.onBonusBuildSkip = function () {
            if (this.myHand.orderedSelection.getSize() > 0) {
                this.myHand.unselectAll();
            }
            else if (this.checkAction('actBonusBuildSkip')) {
                this.bgaPerformAction('actBonusBuildSkip', {});
            }
        };
        DaleOfMerchants.prototype.onCancelClient = function () {
            console.warn("onCancelClient");
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
            console.warn(this.mainClientState.args);
            if ('technique_card_id' in this.mainClientState.args && !('is_trigger' in this.mainClientState.args)) {
                var card_id = this.mainClientState.args.technique_card_id;
                var card = new DaleCard_10.DaleCard(card_id);
                var type_id = card.effective_type_id;
                if ((type_id != DaleCard_10.DaleCard.CT_ACORN && type_id != DaleCard_10.DaleCard.CT_GIFTVOUCHER && type_id != DaleCard_10.DaleCard.CT_SAFETYPRECAUTION && type_id != DaleCard_10.DaleCard.CT_VELOCIPEDE && type_id != DaleCard_10.DaleCard.CT_SERENADE) || this.mainClientState.name == 'client_fizzle') {
                    this.myHand.addDaleCardToStock(card, this.mySchedule.control_name + '_item_' + card_id);
                    this.mySchedule.removeFromStockByIdNoAnimation(card_id);
                    this.myHandSize.incValue(1);
                }
            }
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onConfirmChameleon = function (target_id) {
            console.warn("onConfirmChameleon");
            var target = new DaleCard_10.DaleCard(target_id);
            var args = this.chameleonArgs;
            console.warn(args);
            if (target.isCardBack()) {
                if (args.currentSource.effective_type_id != DaleCard_10.DaleCard.CT_GOODOLDTIMES) {
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
        DaleOfMerchants.prototype.onGoodOldTimesPassive = function () {
            this.bgaPerformAction('actUsePassiveAbility', {
                card_id: this.chameleonArgs.firstSource.id,
                chameleons_json: DaleCard_10.DaleCard.getLocalChameleonsJSON(),
                args: JSON.stringify({})
            });
            this.onCancelClient();
        };
        DaleOfMerchants.prototype.onGoodOldTimesPassiveSkip = function () {
            var _a;
            TargetingLine_1.TargetingLine.removeAll();
            (_a = this.chameleonArgs) === null || _a === void 0 ? void 0 : _a.firstSource.unbindChameleonLocal();
            this.chameleonArgs = undefined;
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onGoodOldTimesBind = function () {
            var discardTopCard = this.marketDiscard.peek();
            if (discardTopCard) {
                TargetingLine_1.TargetingLine.removeAll();
                this.onConfirmChameleon(discardTopCard.id);
            }
            else {
                this.onCancelClient();
            }
        };
        DaleOfMerchants.prototype.onUnbindChameleons = function () {
            DaleCard_10.DaleCard.unbindAllChameleonsLocal();
            this.restoreServerGameState();
        };
        DaleOfMerchants.prototype.onRequestBuildAction = function () {
            var snack_cards = this.mySchedule.getAllDaleCards().filter(function (card) { return card.effective_type_id == DaleCard_10.DaleCard.CT_SNACK; });
            if (snack_cards.length > 0) {
                this.clientTriggerTechnique('client_snack', snack_cards[0].id);
                return;
            }
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                case 'client_technique':
                case 'client_build':
                case 'client_inventory':
                    this.mainClientState.enter('client_build', {
                        stack_index_plus_1: this.myStall.getNumberOfStacks() + 1,
                        optionalArgs: { stove_spend_args: {} }
                    });
                    break;
            }
        };
        DaleOfMerchants.prototype.onRequestInventoryAction = function () {
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                case 'client_technique':
                case 'client_build':
                case 'client_inventory':
                    this.mainClientState.enter('client_inventory');
                    break;
            }
        };
        DaleOfMerchants.prototype.onInventoryAction = function () {
            if (this.checkAction("actInventoryAction")) {
                this.bgaPerformAction('actInventoryAction', {
                    ids: this.arrayToNumberList(this.myHand.orderedSelection.get())
                });
            }
        };
        DaleOfMerchants.prototype.onSwiftBroker = function () {
            this.playTechniqueCard({
                card_ids: this.myHand.orderedSelection.get()
            });
        };
        DaleOfMerchants.prototype.onSpyglass = function () {
            var card_ids = this.myLimbo.orderedSelection.get();
            console.warn("Sending " + this.arrayToNumberList(card_ids));
            if (card_ids.length == 0) {
                this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
                return;
            }
            this.bgaPerformAction('actSpyglass', {
                card_ids: this.arrayToNumberList(card_ids)
            });
        };
        DaleOfMerchants.prototype.onLoyalPartner = function () {
            this.playTechniqueCard({
                card_ids: this.market.orderedSelection.get()
            });
        };
        DaleOfMerchants.prototype.onSpecialOffer = function () {
            var card_ids = this.myLimbo.orderedSelection.get();
            console.warn("Sending " + this.arrayToNumberList(card_ids));
            if (card_ids.length == 0) {
                this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
                return;
            }
            this.bgaPerformAction('actSpecialOffer', {
                card_ids: this.arrayToNumberList(card_ids)
            });
        };
        DaleOfMerchants.prototype.onNuisance = function () {
            if (this.opponent_ids.length == 0) {
                this.showMessage(_("Please select at least 1 target"), "error");
                return;
            }
            this.playTechniqueCard({
                opponent_ids: this.opponent_ids
            });
        };
        DaleOfMerchants.prototype.onRottenFood = function (card_id, opponent_id) {
            this.playTechniqueCard({
                card_id: card_id,
                opponent_id: opponent_id
            });
        };
        DaleOfMerchants.prototype.onDirtyExchange = function (opponent_id) {
            this.playTechniqueCardWithServerState({
                opponent_id: opponent_id
            });
        };
        DaleOfMerchants.prototype.onSelectOpponentTechnique = function (opponent_id) {
            this.playTechniqueCardWithServerState({
                opponent_id: opponent_id
            });
        };
        DaleOfMerchants.prototype.onSelectPlayerTechnique = function (opponent_id) {
            this.playTechniqueCardWithServerState({
                opponent_id: opponent_id
            });
        };
        DaleOfMerchants.prototype.onSelectOpponentPassive = function (opponent_id) {
            this.playPassiveCard({
                opponent_id: opponent_id
            });
        };
        DaleOfMerchants.prototype.onSelectPlayerPassive = function (opponent_id) {
            this.playPassiveCard({
                opponent_id: opponent_id
            });
        };
        DaleOfMerchants.prototype.onTreasureHunter = function (opponent_id) {
            this.playTechniqueCard({
                opponent_id: Math.abs(opponent_id),
                from_deck: opponent_id < 0
            });
        };
        DaleOfMerchants.prototype.onAccident = function () {
            var opponent_id;
            if (this.unique_opponent_id) {
                opponent_id = this.unique_opponent_id;
            }
            else if (this.opponent_ids.length == 1) {
                opponent_id = this.opponent_ids[0];
            }
            else {
                throw new Error("'addActionButtonsOpponentSelection' did not work as expected");
            }
            this.playTechniqueCard({
                opponent_id: opponent_id,
                card_ids: this.myHand.orderedSelection.get()
            });
        };
        DaleOfMerchants.prototype.onAccidentDoneLooking = function () {
            this.bgaPerformAction('actAccident', {});
        };
        DaleOfMerchants.prototype.onWhirligig = function (opponent_id) {
            this.playTechniqueCardWithServerState({
                opponent_id: opponent_id
            });
        };
        DaleOfMerchants.prototype.onGamble = function (opponent_id) {
            this.playTechniqueCardWithServerState({
                opponent_id: opponent_id
            });
        };
        DaleOfMerchants.prototype.onBlindfold = function (card_id) {
            var opponent_id;
            if (this.unique_opponent_id) {
                opponent_id = this.unique_opponent_id;
            }
            else if (this.opponent_ids.length == 1) {
                opponent_id = this.opponent_ids[0];
            }
            else {
                throw new Error("'addActionButtonsOpponentSelection' did not work as expected");
            }
            card_id = (typeof card_id === 'number') ? card_id : this.myHand.orderedSelection.get()[0];
            if (!card_id) {
                this.showMessage(_("Please select a card from your hand"), 'error');
                return;
            }
            this.playTechniqueCardWithServerState({
                opponent_id: opponent_id,
                card_id: card_id
            });
        };
        DaleOfMerchants.prototype.onBlindfoldGuess = function (value) {
            this.bgaPerformAction('actBlindfold', {
                value: value
            });
        };
        DaleOfMerchants.prototype.onBlindfoldDecideValue = function (value) {
            console.warn("onBlindfoldDecideValue " + value);
            this.bgaPerformAction('actBlindfoldDecideValue', {
                value: value
            });
        };
        DaleOfMerchants.prototype.onCalculations = function () {
            if (this.checkLock()) {
                this.mainClientState.setPassiveSelected(false);
                var args = this.mainClientState.args;
                var card = new DaleCard_10.DaleCard(args.card_id_last);
                var pos = args.card_ids.indexOf(args.card_id_last);
                this.mainClientState.enter('client_purchase', {
                    pos: pos,
                    market_discovery_card_id: undefined,
                    calculations_card_id: args.passive_card_id,
                    card_name: card.name,
                    cost: card.getCost(pos),
                    optionalArgs: {
                        calculations_card_ids: args.card_ids,
                    }
                });
            }
        };
        DaleOfMerchants.prototype.onCalculationsSwap = function (source_id, target_id) {
            var args = this.mainClientState.args;
            var index_source = args.card_ids.indexOf(source_id);
            var index_target = args.card_ids.indexOf(target_id);
            if (index_source == -1 || index_target == -1) {
                throw new Error("onCalculationsSwap failed to swap ".concat(source_id, " and ").concat(target_id));
            }
            var temp = args.card_ids[index_source];
            args.card_ids[index_source] = args.card_ids[index_target];
            args.card_ids[index_target] = temp;
            this.market.rearrange(args.card_ids);
            this.onCalculationsUpdateActionButton(source_id);
            TargetingLine_1.TargetingLine.remove();
        };
        DaleOfMerchants.prototype.onCalculationsUpdateActionButton = function (card_id) {
            var button = $("calculations-button");
            if (card_id === null) {
                if (button) {
                    dojo.setStyle(button, 'display', 'none');
                }
            }
            else {
                var args = this.mainClientState.args;
                var card = new DaleCard_10.DaleCard(card_id);
                args.card_id_last = card_id;
                if (button) {
                    button.innerHTML = _("Purchase ") + card.name;
                    dojo.setStyle(button, 'display', '');
                }
            }
        };
        DaleOfMerchants.prototype.onCalculationsCancel = function () {
            if (TargetingLine_1.TargetingLine.exists()) {
                TargetingLine_1.TargetingLine.remove();
            }
            else {
                this.market.restoreArrangement();
                this.onCancelClient();
            }
        };
        DaleOfMerchants.prototype.onDangerousTest = function () {
            var card_ids = this.myHand.orderedSelection.get();
            if (card_ids.length != 3) {
                this.showMessage(_("Please select exactly 3 cards to discard"), 'error');
                return;
            }
            this.bgaPerformAction('actDangerousTest', {
                card_ids: this.arrayToNumberList(card_ids)
            });
        };
        DaleOfMerchants.prototype.onGlueDiscard = function () {
            for (var _i = 0, _a = this.myHand.orderedSelection.get(); _i < _a.length; _i++) {
                var card_id = _a[_i];
                this.myHand.unselectItem(card_id);
            }
            this.onPurchase();
        };
        DaleOfMerchants.prototype.onHouseCleaning = function () {
            this.playTechniqueCard({
                card_ids: this.myDiscard.orderedSelection.get()
            });
        };
        DaleOfMerchants.prototype.onHouseCleaningSkip = function () {
            this.resolveTechniqueCard({});
        };
        DaleOfMerchants.prototype.onNightShift = function (card_id, player_id) {
            var args = this.gamedatas.gamestate.args;
            var items = this.myLimbo.getAllItems();
            var card_ids = [card_id];
            var player_ids = [player_id];
            if (items.length == 2) {
                if (args.player_ids.length != 2) {
                    throw new Error("Night Shift: unable to give ".concat(items.length, " cards to ").concat(args.player_ids.length, " players"));
                }
                for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                    var item = items_2[_i];
                    if (item.id != card_id) {
                        card_ids.push(item.id);
                    }
                }
                for (var _a = 0, _b = args.player_ids; _a < _b.length; _a++) {
                    var arg_player_id = _b[_a];
                    if (arg_player_id != player_id) {
                        player_ids.push(arg_player_id);
                    }
                }
            }
            this.bgaPerformAction('actNightShift', {
                card_ids: this.arrayToNumberList(card_ids),
                player_ids: this.arrayToNumberList(player_ids)
            });
            var index = args.player_ids.indexOf(player_id);
            if (index == -1) {
                throw new Error("Night Shift: player ".concat(player_id, " is not authorized to receive a card"));
            }
            else {
                args.player_ids.splice(index, 1);
            }
            this.onNightShiftNext();
        };
        DaleOfMerchants.prototype.onNightShiftNext = function () {
            TargetingLine_1.TargetingLine.remove();
            this.removeActionButtons();
            var label = _("Choose another card to place back");
            this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', label);
        };
        DaleOfMerchants.prototype.onRuthlessCompetition = function (opponent_id) {
            this.playTechniqueCardWithServerState({
                opponent_id: opponent_id
            });
        };
        DaleOfMerchants.prototype.onCunningNeighbour = function () {
            this.bgaPerformAction('actCunningNeighbour', {
                place_on_deck: false
            });
        };
        DaleOfMerchants.prototype.onRaffle = function (reverse_direction) {
            console.warn("onRaffle", reverse_direction ? "right" : "left");
            this.playTechniqueCard({
                reverse_direction: reverse_direction
            });
        };
        DaleOfMerchants.prototype.onGiveCardsFromLimboToPlayers = function () {
            var card_id = this.myLimbo.orderedSelection.get()[0];
            if (!card_id) {
                this.showMessage(_("Please choose a card to give"), 'error');
                return;
            }
            var player_id = this.opponent_ids[0];
            if (player_id === undefined) {
                this.showMessage(_("Please choose the player that will receive ") + "'".concat(new DaleCard_10.DaleCard(card_id).name, "'"), 'error');
                return;
            }
            var args = this.gamedatas.gamestate.args;
            var items = this.myLimbo.getAllItems();
            var card_ids = [card_id];
            var player_ids = [player_id];
            if (items.length == 2) {
                if (args.player_ids.length != 2) {
                    throw new Error("Unable to give ".concat(items.length, " cards to ").concat(args.player_ids.length, " players"));
                }
                for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                    var item = items_3[_i];
                    if (item.id != card_id) {
                        card_ids.push(item.id);
                    }
                }
                for (var _a = 0, _b = args.player_ids; _a < _b.length; _a++) {
                    var arg_player_id = _b[_a];
                    if (arg_player_id != player_id) {
                        player_ids.push(arg_player_id);
                    }
                }
            }
            this.bgaPerformAction('actGiveCardsFromLimboToPlayers', {
                card_ids: this.arrayToNumberList(card_ids),
                player_ids: this.arrayToNumberList(player_ids)
            });
            var index = args.player_ids.indexOf(player_id);
            if (index == -1) {
                throw new Error("Player ".concat(player_id, " is not authorized to receive a card"));
            }
            else {
                args.player_ids.splice(index, 1);
                this.removeActionButtons();
                this.onUpdateActionButtons(this.gamedatas.gamestate.name, args);
            }
        };
        DaleOfMerchants.prototype.onDeprecatedTasters = function (reverse_direction) {
            console.warn("onDeprecatedTasters", reverse_direction ? "right" : "left");
            this.playTechniqueCardWithServerState({
                reverse_direction: reverse_direction
            });
        };
        DaleOfMerchants.prototype.onTasters = function () {
            var card_id = this.market.orderedSelection.get()[0];
            if (!card_id) {
                this.showMessage(_("Please choose a card from the market"), 'error');
                return;
            }
            var player_id = this.opponent_ids[0];
            if (player_id === undefined) {
                this.showMessage(_("Please choose the player that will receive ") + "'".concat(new DaleCard_10.DaleCard(card_id).name, "'"), 'error');
                return;
            }
            var args = this.gamedatas.gamestate.args;
            var index = args.player_ids.indexOf(player_id);
            if (index == -1) {
                throw new Error("Charity: player ".concat(player_id, " is not authorized to receive a card"));
            }
            else {
                args.player_ids.splice(index, 1);
                this.removeActionButtons();
                this.onUpdateActionButtons(this.gamedatas.gamestate.name, args);
            }
            this.bgaPerformAction('actTasters', {
                card_ids: this.arrayToNumberList([card_id]),
                player_ids: this.arrayToNumberList([player_id])
            });
        };
        DaleOfMerchants.prototype.onDaringAdventurer = function () {
            var card_ids = this.myHand.orderedSelection.get();
            var args = this.gamedatas.gamestate.args;
            if (card_ids.length != args.die_value) {
                this.showMessage(_("Please select exactly ") + args.die_value + _(" card(s) to discard"), 'error');
                return;
            }
            this.bgaPerformAction('actDaringAdventurer', {
                card_ids: this.arrayToNumberList(card_ids)
            });
        };
        DaleOfMerchants.prototype.onRareArtefact = function (card_id) {
            if (this.verifyChameleon(new DaleCard_10.DaleCard(card_id))) {
                this.playTechniqueCard({
                    card_id: card_id
                });
            }
        };
        DaleOfMerchants.prototype.onRiskyBusiness = function (value) {
            this.playTechniqueCard({
                value: value
            });
        };
        DaleOfMerchants.prototype.onNaturalSurvivor = function () {
            var args = this.gamedatas.gamestate.args;
            var hand_card_ids = this.myHand.orderedSelection.get();
            var deck_card_ids = this.myDeck.orderedSelection.get();
            if (hand_card_ids.length != args.die_value) {
                this.showMessage(_("Please select exactly ") + args.die_value + _(" card(s) from your hand"), 'error');
                return;
            }
            if (deck_card_ids.length != args.die_value) {
                this.showMessage(_("Please select exactly ") + args.die_value + _(" card(s) from your deck"), 'error');
                this.myDeck.openPopin();
                return;
            }
            this.bgaPerformAction('actNaturalSurvivor', {
                hand_card_ids: this.arrayToNumberList(hand_card_ids),
                deck_card_ids: this.arrayToNumberList(deck_card_ids)
            });
        };
        DaleOfMerchants.prototype.onDuplicateEntry = function () {
            this.bgaPerformAction('actDuplicateEntry', {
                card_ids: this.arrayToNumberList(this.myDeck.orderedSelection.get())
            });
        };
        DaleOfMerchants.prototype.onHistoryLesson = function () {
            this.playTechniqueCard({
                card_ids: this.myDiscard.orderedSelection.get()
            });
        };
        DaleOfMerchants.prototype.onCulturalPreservation = function () {
            this.bgaPerformAction('actCulturalPreservation', {
                card_ids: this.arrayToNumberList(this.myDeck.orderedSelection.get())
            });
        };
        DaleOfMerchants.prototype.onSliceOfLife = function () {
            var card_ids = this.myHand.orderedSelection.get();
            if (card_ids.length != 2) {
                this.showMessage(_("Please select exactly ") + 2 + _(" cards from your hand"), 'error');
                return;
            }
            this.playPassiveCard({
                card_ids: card_ids
            });
        };
        DaleOfMerchants.prototype.onSpinningWheel = function () {
            var card_ids = this.myHand.orderedSelection.get();
            if (card_ids.length == 0) {
                this.showMessage(_("Please select at least 1 card from your hand"), 'error');
                return;
            }
            if (card_ids.length > 3) {
                this.showMessage(_("Please select at most 3 cards from your hand"), 'error');
                return;
            }
            this.playPassiveCard({
                card_ids: card_ids
            });
        };
        DaleOfMerchants.prototype.onReplacementFizzle = function () {
            var args = this.mainClientState.args;
            this.playTechniqueCardWithServerState({
                card_id: args.toss_card_id
            });
        };
        DaleOfMerchants.prototype.onFashionHintToss = function () {
            this.playTechniqueCardWithServerState({
                toss: true
            });
        };
        DaleOfMerchants.prototype.onFashionHintTossSkip = function () {
            this.playTechniqueCardWithServerState({
                toss: false
            });
        };
        DaleOfMerchants.prototype.onFashionHintSwap = function (card_id) {
            this.bgaPerformAction('actFashionHint', {
                card_id: card_id
            });
        };
        DaleOfMerchants.prototype.onFashionHintSwapSkip = function () {
            console.warn("onFashionHintSwapSkip");
            this.bgaPerformAction('actFashionHint', {
                card_id: -1
            });
        };
        DaleOfMerchants.prototype.onRoyalPrivilege = function () {
            var toss_card_id = this.myHand.orderedSelection.get()[0];
            if (!toss_card_id) {
                this.showMessage(_("Please select a hand card to toss"), 'error');
                return;
            }
            var market_card_id = this.market.getSelectedCardId();
            if (!market_card_id) {
                this.showMessage(_("Please select a market card to purchase"), 'error');
                return;
            }
            this.bgaPerformAction('actRoyalPrivilege', {
                toss_card_id: toss_card_id,
                market_card_id: market_card_id
            });
        };
        DaleOfMerchants.prototype.onRoyalPrivilegeSkip = function () {
            this.bgaPerformAction('actRoyalPrivilege', {
                toss_card_id: -1,
                market_card_id: -1
            });
        };
        DaleOfMerchants.prototype.onPompousProfessional = function (animalfolk_id) {
            console.warn("onPompousProfessional ", animalfolk_id);
            this.playTechniqueCardWithServerState({
                animalfolk_id: animalfolk_id
            });
        };
        DaleOfMerchants.prototype.onPompousProfessionalTakeAndDiscard = function () {
            var card_ids = this.arrayToNumberList(this.myLimbo.orderedSelection.get());
            if (card_ids.length == 0) {
                var pompousProfessional_args = this.gamedatas.gamestate.args;
                this.showMessage(_("Please choose a '") + pompousProfessional_args.animalfolk_name + _("' card"), 'error');
                return;
            }
            this.bgaPerformAction('actPompousProfessional', {
                card_ids: card_ids,
                is_taking_card: true
            });
        };
        DaleOfMerchants.prototype.onPompousProfessionalDiscard = function () {
            var card_ids = this.arrayToNumberList(this.myLimbo.orderedSelection.get());
            this.bgaPerformAction('actPompousProfessional', {
                card_ids: card_ids,
                is_taking_card: false
            });
        };
        DaleOfMerchants.prototype.onBurglary = function (value) {
            var args = this.mainClientState.args;
            this.playTechniqueCard({
                opponent_id: args.opponent_id,
                value: value
            });
        };
        DaleOfMerchants.prototype.onGrasp = function (value) {
            var args = this.mainClientState.args;
            this.playTechniqueCard({
                opponent_id: args.opponent_id,
                value: value
            });
        };
        DaleOfMerchants.prototype.onSuddenNap = function (opponent_id) {
            this.playTechniqueCardWithServerState({
                opponent_id: opponent_id
            });
        };
        DaleOfMerchants.prototype.onPeriscopeAnimalfolkId = function (animalfolk_id) {
            var args = this.mainClientState.args;
            this.mainClientState.enter('client_periscopeValue', {
                technique_card_id: args.technique_card_id,
                opponent_id: args.opponent_id,
                opponent_name: args.opponent_name,
                animalfolk_id: animalfolk_id
            });
        };
        DaleOfMerchants.prototype.onPeriscopeValue = function (value) {
            var args = this.mainClientState.args;
            this.playTechniqueCard({
                opponent_id: args.opponent_id,
                animalfolk_id: args.animalfolk_id,
                value: value
            });
        };
        DaleOfMerchants.prototype.onCarefreeSwapper = function (card_id) {
            this.playTechniqueCard({
                card_id: card_id,
            });
        };
        DaleOfMerchants.prototype.onDelicacy = function (card_id) {
            this.bgaPerformAction('actDelicacy', {
                card_id: card_id
            });
            TargetingLine_1.TargetingLine.remove();
        };
        DaleOfMerchants.prototype.onUmbrella = function (card_id) {
            this.bgaPerformAction('actUmbrella', {
                card_id: card_id
            });
            TargetingLine_1.TargetingLine.remove();
        };
        DaleOfMerchants.prototype.onMatchingColours = function (card_id, target_id) {
            for (var _i = 0, _a = Object.entries(this.playerStalls); _i < _a.length; _i++) {
                var _b = _a[_i], player_id = _b[0], player_stall = _b[1];
                if (player_stall.contains(target_id)) {
                    this.playTechniqueCard({
                        card_id: card_id,
                        stall_player_id: +player_id,
                        stall_card_id: target_id
                    });
                    break;
                }
            }
        };
        DaleOfMerchants.prototype.onBarricade = function () {
            this.playPassiveCard({
                card_ids: this.myDiscard.orderedSelection.get()
            });
        };
        DaleOfMerchants.prototype.onWheelbarrowToss = function () {
            this.bgaPerformAction('actWheelbarrow', {
                is_tossing: true
            });
        };
        DaleOfMerchants.prototype.onWheelbarrowStore = function () {
            this.bgaPerformAction('actWheelbarrow', {
                is_tossing: false
            });
        };
        DaleOfMerchants.prototype.onTacticalMeasurement = function () {
            this.bgaPerformAction('actTacticalMeasurement', {
                card_ids: this.arrayToNumberList(this.myHand.orderedSelection.get())
            });
        };
        DaleOfMerchants.prototype.onMeddlingMarketeerDiscard = function () {
            var card_ids = this.myLimbo.orderedSelection.get();
            var nbr_cards_remaining = this.myLimbo.count() - card_ids.length;
            var delay = 0;
            for (var _i = 0, card_ids_5 = card_ids; _i < card_ids_5.length; _i++) {
                var card_id = card_ids_5[_i];
                this.stockToPile(new DaleCard_10.DaleCard(card_id), this.myLimbo, this.myDiscard, delay);
                delay += 75;
            }
            if (nbr_cards_remaining >= 1) {
                this.mainClientState.enterOnStack('client_meddlingMarketeer', {
                    discard_card_ids: card_ids,
                    card_name: "Meddling Marketeer"
                });
            }
            else {
                this.bgaPerformAction('actMeddlingMarketeer', {
                    discard_card_ids: this.arrayToNumberList(card_ids),
                    deck_card_ids: this.arrayToNumberList([])
                });
            }
        };
        DaleOfMerchants.prototype.onMeddlingMarketeerUndo = function () {
            var args = this.mainClientState.args;
            for (var _ in args.discard_card_ids) {
                var card = this.myDiscard.pop();
                this.myLimbo.addDaleCardToStock(card, this.myDiscard.placeholderHTML);
                if (!args.discard_card_ids.includes(card.id)) {
                    throw new Error("Expected card ".concat(card.id, " within the top ").concat(args.discard_card_ids.length, " cards of the discard pile"));
                }
            }
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onMeddlingMarketeerDeck = function () {
            var args = this.mainClientState.args;
            var deck_card_ids = this.myLimbo.orderedSelection.get();
            this.bgaPerformAction('actMeddlingMarketeer', {
                discard_card_ids: this.arrayToNumberList(args.discard_card_ids),
                deck_card_ids: this.arrayToNumberList(deck_card_ids)
            });
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onGoodwillPresents = function () {
            if (this.opponent_ids.length == 0) {
                this.showMessage(_("Please select at least 1 player"), 'error');
                return;
            }
            this.playTechniqueCard({
                opponent_ids: this.opponent_ids
            });
        };
        DaleOfMerchants.prototype.onAnchor = function (card_id, opponent_id) {
            var nbr_cards_remaining = this.myLimbo.count() - 1;
            this.stockToPile(new DaleCard_10.DaleCard(card_id), this.myLimbo, this.playerDiscards[opponent_id]);
            if (nbr_cards_remaining >= 1) {
                this.mainClientState.enterOnStack('client_anchor', {
                    opponent_id: opponent_id,
                    opponent_name: this.gamedatas.players[opponent_id].name,
                    discard_card_id: card_id,
                    card_name: "Anchor"
                });
            }
            else {
                this.bgaPerformAction('actAnchor', {
                    opponent_id: opponent_id,
                    discard_card_id: card_id,
                    deck_card_ids: this.arrayToNumberList([])
                });
            }
        };
        DaleOfMerchants.prototype.onAnchorCancelTargetingLine = function () {
            for (var _i = 0, _a = Object.entries(this.playerDiscards); _i < _a.length; _i++) {
                var _b = _a[_i], player_id = _b[0], discard = _b[1];
                discard.setSelectionMode('none');
            }
            this.myLimbo.setSelectionMode('none');
            TargetingLine_1.TargetingLine.remove();
            this.restoreServerGameState();
        };
        DaleOfMerchants.prototype.onAnchorUndo = function () {
            var args = this.mainClientState.args;
            var discardPile = this.playerDiscards[args.opponent_id];
            var card = discardPile.pop();
            if (args.discard_card_id != card.id) {
                throw new Error("Expected card ".concat(card.id, " on top of ").concat(args.opponent_name, "'s discard pile"));
            }
            this.myLimbo.addDaleCardToStock(card, discardPile.placeholderHTML);
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onAnchorDeck = function () {
            var args = this.mainClientState.args;
            var deck_card_ids = this.myLimbo.orderedSelection.get();
            this.bgaPerformAction('actAnchor', {
                opponent_id: args.opponent_id,
                discard_card_id: args.discard_card_id,
                deck_card_ids: this.arrayToNumberList(deck_card_ids)
            });
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onManufacturedJoyUndo = function () {
            var args = this.mainClientState.args;
            this.stockToPile(new DaleCard_10.DaleCard(args.draw_card_id), this.myHand, this.myDeck);
            this.myHandSize.incValue(-1);
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onManufacturedJoyCancelTargetingLine = function () {
            for (var _i = 0, _a = Object.entries(this.playerDiscards); _i < _a.length; _i++) {
                var _b = _a[_i], player_id = _b[0], discard = _b[1];
                discard.setSelectionMode('none');
            }
            this.myLimbo.setSelectionMode('none');
            TargetingLine_1.TargetingLine.remove();
            this.mainClientState.enter();
        };
        DaleOfMerchants.prototype.onManufacturedJoy = function (card_id, opponent_id) {
            var args = this.mainClientState.args;
            this.bgaPerformAction('actManufacturedJoy', {
                draw_card_id: args.draw_card_id,
                discard_card_id: card_id,
                opponent_id: opponent_id
            });
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onShakyEnterprise = function () {
            var card_ids = this.myDiscard.orderedSelection.get();
            if (card_ids.length == 0) {
                var args = this.mainClientState.args;
                this.mainClientState.enter('client_fizzle', { technique_card_id: args.technique_card_id });
            }
            else {
                this.playTechniqueCardWithServerState({
                    card_ids: this.myDiscard.orderedSelection.get()
                });
            }
        };
        DaleOfMerchants.prototype.onSpend = function () {
            var args = this.mainClientState.args;
            var spend_card_ids = this.myHand.orderedSelection.get();
            var spend_coins = this.coinManager.getCoinsToSpend();
            if (spend_coins > this.coinManager.myCoins.getValue()) {
                this.showMessage(_("Not enough coins"), 'error');
                return;
            }
            var cost_min = 0, cost_max = 0;
            switch (this.mainClientState.name) {
                case 'client_spend':
                    cost_min = args.cost;
                    cost_max = args.cost;
                    break;
                case 'client_spendx':
                    cost_min = args.cost_min;
                    cost_max = args.cost_max;
                    break;
                default:
                    throw new Error("onSpend called during an unexpected client state: " + this.mainClientState.name);
            }
            var lowest_value = 1000;
            var total_value = spend_coins;
            for (var _i = 0, spend_card_ids_1 = spend_card_ids; _i < spend_card_ids_1.length; _i++) {
                var card_id = spend_card_ids_1[_i];
                var value = new DaleCard_10.DaleCard(card_id).effective_value;
                total_value += value;
                lowest_value = Math.min(lowest_value, value);
            }
            if (total_value < cost_min) {
                this.showMessage(_("Insufficient funds") + " (".concat(total_value, "/").concat(cost_min, ")"), 'error');
                return;
            }
            if (total_value - lowest_value >= cost_max) {
                this.showMessage(_("Please remove unnecessary cards"), 'error');
                return;
            }
            if (total_value > cost_max && this.coinManager.getCoinsToSpend() > 0) {
                this.showMessage(_("Please remove unnecessary coins"), 'error');
                return;
            }
            if (typeof args.next === 'function') {
                args.next(spend_card_ids, spend_coins);
                return;
            }
            switch (args.next) {
                case 'playPassiveCard':
                    this.playPassiveCard({
                        spend_coins: spend_coins,
                        spend_card_ids: spend_card_ids
                    });
                    break;
                case 'playTechniqueCard':
                    this.playTechniqueCard({
                        spend_coins: spend_coins,
                        spend_card_ids: spend_card_ids
                    });
                    break;
                case 'playTechniqueCardWithServerState':
                    this.playTechniqueCardWithServerState({
                        spend_coins: spend_coins,
                        spend_card_ids: spend_card_ids
                    });
                    break;
                case 'resolveTechniqueCard':
                    this.resolveTechniqueCard({
                        spend_coins: spend_coins,
                        spend_card_ids: spend_card_ids
                    });
                    break;
                default:
                    this.mainClientState.enter(args.next, {
                        technique_card_id: args.technique_card_id,
                        spend_coins: spend_coins,
                        spend_card_ids: spend_card_ids
                    });
                    break;
            }
        };
        DaleOfMerchants.prototype.onResourcefulAlly = function () {
            this.bgaPerformAction('actResourcefulAlly', {
                card_ids: this.arrayToNumberList(this.myDiscard.orderedSelection.get())
            });
        };
        DaleOfMerchants.prototype.onTravelingEquipment = function () {
            if (this.myHand.count() > 1) {
                var card_ids = this.myHand.orderedSelection.get();
                if (card_ids.length < 2) {
                    this.showMessage(_("Please choose 1 card to toss and 1 card to discard"), 'error');
                    return;
                }
                var toss_card_id = card_ids[1];
                var discard_card_id = card_ids[0];
                this.bgaPerformAction('actTravelingEquipment', {
                    toss_card_id: toss_card_id,
                    discard_card_id: discard_card_id
                });
                this.myHand.unselectAll();
            }
            else {
                var only_card_id = this.myHand.getAllItems()[0].id;
                if (this.myHand.orderedSelection.getSize() == 0) {
                    this.showMessage(_("Please choose whether to toss or discard the card in your hand"), 'error');
                    return;
                }
                else if (this.myHand.orderedSelection.includes(-1)) {
                    this.bgaPerformAction('actTravelingEquipment', {
                        toss_card_id: -1,
                        discard_card_id: only_card_id
                    });
                }
                else {
                    this.bgaPerformAction('actTravelingEquipment', {
                        toss_card_id: only_card_id,
                        discard_card_id: -1
                    });
                }
            }
        };
        DaleOfMerchants.prototype.onFishing = function () {
            var _this = this;
            this.bgaPerformAction('actFishing', {
                card_ids: this.arrayToNumberList(this.myDiscard.orderedSelection.get())
            })
                .then(function () { return _this.myDiscard.setSelectionMode('none'); });
        };
        DaleOfMerchants.prototype.onInsight = function () {
            this.bgaPerformAction('actInsight', {
                card_ids: this.arrayToNumberList(this.myLimbo.orderedSelection.get())
            });
        };
        DaleOfMerchants.prototype.onBadOmenSkip = function () {
            var _a;
            var badOmen_args = this.gamedatas.gamestate.args;
            this.mainClientState.enterOnStack('client_badOmen', {
                toss_card_id: -1,
                card_name: (_a = badOmen_args.resolving_card_name) !== null && _a !== void 0 ? _a : "MISSING CARD NAME"
            });
        };
        DaleOfMerchants.prototype.onBadOmenUndo = function () {
            var args = this.mainClientState.args;
            if (args.toss_card_id != -1) {
                if (new DaleCard_10.DaleCard(args.toss_card_id).isAnimalfolk()) {
                    var card = this.marketDiscard.pop();
                    if (args.toss_card_id != card.id) {
                        throw new Error("Expected card ".concat(card.id, " on top of the bin"));
                    }
                    this.myLimbo.addDaleCardToStock(card, this.marketDiscard.placeholderHTML);
                }
                else if (new DaleCard_10.DaleCard(args.toss_card_id).isMonoCard()) {
                    var card = this.monoDiscard.pop();
                    if (args.toss_card_id != card.id) {
                        throw new Error("Expected card ".concat(card.id, " on top of Mono's discard"));
                    }
                    this.myLimbo.addDaleCardToStock(card, this.monoDiscard.placeholderHTML);
                }
                else {
                    this.myLimbo.addDaleCardToStock(new DaleCard_10.DaleCard(args.toss_card_id), 'overall_player_board_' + this.player_id);
                }
            }
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onBadOmenDeck = function () {
            var args = this.mainClientState.args;
            var deck_card_ids = this.myLimbo.orderedSelection.get();
            this.bgaPerformAction('actBadOmen', {
                toss_card_id: args.toss_card_id,
                deck_card_ids: this.arrayToNumberList(deck_card_ids)
            });
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onFumblingDreamer = function (opponent_id) {
            this.bgaPerformAction('actFumblingDreamer', {
                opponent_id: opponent_id,
            });
        };
        DaleOfMerchants.prototype.onLooseMarblesBegin = function (opponent_id, pile) {
            var _this = this;
            var _a, _b, _c;
            if (TargetingLine_1.TargetingLine.exists()) {
                return;
            }
            this.onLeavingState(this.gamedatas.gamestate.name);
            var source;
            if (pile) {
                pile.setSelectionMode('noneCantViewContent');
                source = (_a = pile.topCardHTML) !== null && _a !== void 0 ? _a : pile.placeholderHTML;
                this.removeActionButtons();
            }
            else {
                source = $("opponent-selection-button-" + opponent_id);
            }
            var looseMarbles_args = this.gamedatas.gamestate.args;
            var targets = [];
            switch (looseMarbles_args.die_value2) {
                case DaleDie_2.DaleDie.DIE_DISCARD2:
                    for (var _i = 0, _d = Object.entries(this.playerDiscards); _i < _d.length; _i++) {
                        var _e = _d[_i], player_id = _e[0], discard = _e[1];
                        discard.setSelectionMode('noneCantViewContent');
                        var target = (_b = discard.topCardHTML) !== null && _b !== void 0 ? _b : discard.placeholderHTML;
                        if (+player_id != opponent_id) {
                            target.dataset['target_id'] = player_id;
                            targets.push(target);
                        }
                    }
                    break;
                case DaleDie_2.DaleDie.DIE_DECK2:
                    for (var _f = 0, _g = Object.entries(this.playerDecks); _f < _g.length; _f++) {
                        var _h = _g[_f], player_id = _h[0], deck = _h[1];
                        deck.setSelectionMode('noneCantViewContent');
                        var target = (_c = deck.topCardHTML) !== null && _c !== void 0 ? _c : deck.placeholderHTML;
                        if (+player_id != opponent_id) {
                            target.dataset['target_id'] = player_id;
                            targets.push(target);
                        }
                    }
                    break;
                case DaleDie_2.DaleDie.DIE_HAND2:
                    if (looseMarbles_args.die_value1 != DaleDie_2.DaleDie.DIE_HAND) {
                        this.addActionButtonsOpponent((function (button_opponent_id) {
                            if (button_opponent_id == opponent_id) {
                                _this.showMessage(TranslatableStrings_1.TranslatableStrings.please_select_a_different_player, 'error');
                            }
                        }).bind(this), true, TranslatableStrings_1.TranslatableStrings.s_hand);
                    }
                    for (var _j = 0, _k = Object.entries(this.playerHandSizes); _j < _k.length; _j++) {
                        var _l = _k[_j], player_id = _l[0], _ = _l[1];
                        var target = $("opponent-selection-button-" + player_id);
                        target.childNodes.forEach(function (node) { return dojo.setStyle(node, 'pointer-events', 'none'); });
                        if (+player_id != opponent_id) {
                            target.dataset['target_id'] = player_id;
                            targets.push(target);
                        }
                    }
                    break;
                default:
                    throw new Error("Unexpected destination die roll: " + looseMarbles_args.die_value2);
            }
            new TargetingLine_1.TargetingLine(source, targets, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) {
                _this.onLeavingState(_this.gamedatas.gamestate.name);
                _this.removeActionButtons();
                _this.onUpdateActionButtons(_this.gamedatas.gamestate.name, _this.gamedatas.gamestate.args);
            }, function (source_id, target_id) {
                _this.onLooseMarbles(opponent_id, target_id);
            });
        };
        DaleOfMerchants.prototype.onLooseMarbles = function (source_id, destination_id) {
            switch (this.gamedatas.gamestate.name) {
                case 'looseMarbles':
                    console.warn("actLooseMarbles");
                    this.bgaPerformAction('actLooseMarbles', {
                        source_id: source_id,
                        destination_id: destination_id
                    });
                    break;
                case 'anotherFineMess':
                    console.warn("actAnotherFineMess");
                    this.bgaPerformAction('actAnotherFineMess', {
                        source_id: source_id,
                        destination_id: destination_id
                    });
                    break;
                default:
                    throw new Error("'onLooseMarbles' was called in an unexpected gamestate: '".concat(this.gamedatas.gamestate.name, "'"));
            }
        };
        DaleOfMerchants.prototype.onCoffeeGrinderDiscard = function () {
            this.bgaPerformAction('actCoffeeGrinder', {
                skip: false
            });
        };
        DaleOfMerchants.prototype.onCoffeeGrinderSkip = function () {
            this.bgaPerformAction('actCoffeeGrinder', {
                skip: true
            });
        };
        DaleOfMerchants.prototype.onDramaticRomanticForward = function () {
            this.playPassiveCard({
                forward: true
            });
        };
        DaleOfMerchants.prototype.onDramaticRomanticBackward = function () {
            this.playPassiveCard({
                forward: false
            });
        };
        DaleOfMerchants.prototype.onSelectingContracts = function () {
            var card_ids = this.myDiscard.orderedSelection.get();
            if (card_ids.length == 0) {
                this.showMessage(_("Please select at least 1 card from your discard"), 'error');
                this.myDiscard.openPopin();
                return;
            }
            this.playTechniqueCard({
                card_ids: card_ids
            });
        };
        DaleOfMerchants.prototype.onWindOfChangeSkip = function () {
            this.resolveTechniqueCard({});
        };
        DaleOfMerchants.prototype.onBonsai = function () {
            var card_ids = this.myHand.orderedSelection.get();
            if (card_ids.length != 2) {
                this.showMessage(_("Please select exactly 2 junk cards"), "error");
                return;
            }
            this.playPassiveCard({
                card_ids: card_ids
            });
        };
        DaleOfMerchants.prototype.onRake = function () {
            var toss_card_ids = this.myDeck.orderedSelection.get();
            var discard_card_ids = this.myDeck.orderedSelection.get(true);
            if (toss_card_ids.length > 1) {
                this.showMessage(_("Please select at most 1 card to toss"), "error");
                return;
            }
            if (discard_card_ids.length > 2) {
                this.showMessage(_("Please select at most 2 cards to toss"), "error");
                return;
            }
            this.bgaPerformAction('actRake', {
                toss_card_ids: this.arrayToNumberList(toss_card_ids),
                discard_card_ids: this.arrayToNumberList(discard_card_ids)
            });
        };
        DaleOfMerchants.prototype.onGenerationChange = function () {
            var card_ids = this.myDiscard.orderedSelection.get();
            var nbr = Math.min(2, this.myDiscard.size);
            if (card_ids.length != nbr) {
                this.showMessage(_("Please select exactly ") + nbr + _(" card(s) from your discard"), "error");
                this.myDiscard.openPopin();
                return;
            }
            this.playTechniqueCard({
                card_ids: card_ids
            });
        };
        DaleOfMerchants.prototype.setupNotifications = function () {
            var _this = this;
            console.warn('notifications subscriptions setup42');
            var notifs = [
                ['deckSelectionResult', 500],
                ['delay', 500],
                ['startGame', 500],
                ['scheduleTechnique', 1],
                ['scheduleTechniqueDelay', 500, true],
                ['resolveTechnique', 500],
                ['cancelTechnique', 500],
                ['scheduleToHand', 500],
                ['handToStoredCards', 500, true],
                ['deckToStoredCards', 500, true],
                ['storedCardsToHand', 500, true],
                ['buildStack', 500],
                ['rearrangeMarket', 500],
                ['fillEmptyMarketSlots', 500],
                ['marketSlideRight', 500],
                ['marketToHand', 500],
                ['swapHandStall', 1],
                ['swapHandMarket', 1],
                ['instant_marketDiscardToHand', 1],
                ['marketDiscardToHand', 500],
                ['instant_discardToHand', 1],
                ['discardToHand', 500],
                ['discardToHandMultiple', 500],
                ['draw', 500, true],
                ['drawMultiple', 500, true],
                ['handToLimbo', 500, true],
                ['instant_limboToHand', 1, true],
                ['limboToHand', 500, true],
                ['instant_playerHandToOpponentHand', 1, true],
                ['instant_opponentHandToPlayerHand', 1, true],
                ['playerHandToOpponentHand', 500, true],
                ['opponentHandToPlayerHand', 500, true],
                ['obtainNewJunkInHand', 500],
                ['obtainNewJunkInDiscard', 500],
                ['obtainNewJunkOnDeck', 500],
                ['instant_toss', 1],
                ['toss', 500],
                ['tossMultiple', 500],
                ['discard', 500],
                ['discardMultiple', 750],
                ['placeOnDeck', 500, true],
                ['placeOnDeckMultiple', 500, true],
                ['shuffleDiscard', 500],
                ['reshuffleDeck', 1500],
                ['wilyFellow', 500],
                ['accidentShuffle', 1750],
                ['accidentTakeBack', 500, true],
                ['cunningNeighbourWatch', 500, true],
                ['cunningNeighbourReturn', 500, true],
                ['monoShowHand', 750],
                ['instant_monoHideHand', 1],
                ['monoHideHand', 500],
                ['tossFromDiscard', 500],
                ['tossFromDeck', 500],
                ['tossFromMarketDeck', 500],
                ['tossFromMarketBoard', 500],
                ['instant_deckToDeck', 1],
                ['deckToDeck', 500],
                ['instant_discardToDeck', 1],
                ['discardToDeck', 500],
                ['deckToDiscard', 500],
                ['discardToDiscard', 500],
                ['rollDie', 1000],
                ['avidFinancierTakeCoin', 500],
                ['startSlotMachine', 1],
                ['advanceClock', 1],
                ['updateActionButtons', 1],
                ['deselectPassive', 1],
                ['gainCoins', 1],
                ['selectBlindfold', 1, true],
                ['addEffect', 1],
                ['updateEffect', 1],
                ['expireEffects', 1],
                ['setScheduleCooldown', 1],
                ['message', 1],
                ['debugClient', 1],
            ];
            notifs.forEach(function (notif) {
                dojo.subscribe(notif[0], _this, "notif_".concat(notif[0]));
                _this.notifqueue.setSynchronous(notif[0], notif[1]);
                if (notif[2]) {
                    var player_id_1 = _this.player_id;
                    _this.notifqueue.setIgnoreNotificationCheck(notif[0], function (notif) {
                        if (notif.type == "history_history") {
                            var isPublic_1 = notif.channelorig.includes('table');
                            return !isPublic_1;
                        }
                        var args = notif.args;
                        var isPublic = args._private === undefined;
                        var alreadyReceivedPrivate = (player_id_1 == args.player_id || player_id_1 == args.opponent_id || (_this.isMonoPlayer(args.player_id) && _this.mono_hand_is_visible));
                        return isPublic && alreadyReceivedPrivate;
                    });
                }
            });
            this.bgaSetupPromiseNotifications({
                prefix: 'promise_notif_',
                minDuration: 1,
                minDurationNoText: 1
            });
            console.warn('notifications subscriptions setup done');
        };
        DaleOfMerchants.prototype.notif_delay = function (notif) {
            console.warn("notif_delay (500ms)");
        };
        DaleOfMerchants.prototype.notif_deckSelectionResult = function (notif) {
            this.deckSelection.setResult(notif.args.animalfolk_id);
            if (!this.gamedatas.animalfolkIds.includes(notif.args.animalfolk_id)) {
                this.gamedatas.animalfolkIds.push(notif.args.animalfolk_id);
            }
        };
        DaleOfMerchants.prototype.notif_startGame = function (notif) {
            this.deckSelection.remove();
            this.gamedatas.inDeckSelection = false;
            var n = Object.keys(this.gamedatas.players).length;
            this.marketDeck.pushHiddenCards(11 * (n + 1));
            for (var player_id in this.gamedatas.players) {
                this.playerDecks[+player_id].pushHiddenCards(10);
            }
            if (this.is_solo && this.unique_opponent_id) {
                this.playerDecks[this.unique_opponent_id].pushHiddenCards(3);
            }
            this.showAnimalfolkSpecificGameComponents();
            this.market.onResize();
        };
        DaleOfMerchants.prototype.notif_scheduleTechnique = function (notif) {
            if (notif.args.player_id == this.player_id) {
                var card_id = +notif.args.card.id;
                if ($(this.myHand.control_name + '_item_' + card_id)) {
                    this.mySchedule.addDaleCardToStock(DaleCard_10.DaleCard.of(notif.args.card), this.myHand.control_name + '_item_' + card_id);
                    this.myHand.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    console.warn("SKIP scheduling the technique: already done by client");
                    return;
                }
            }
            else if (this.mono_hand_is_visible) {
                var card_id = +notif.args.card.id;
                if ($(this.myLimbo.control_name + '_item_' + card_id)) {
                    this.monoSchedule.addDaleCardToStock(DaleCard_10.DaleCard.of(notif.args.card), this.myLimbo.control_name + '_item_' + card_id);
                    this.myLimbo.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    console.warn("Mono: SKIP scheduling the technique: already done by client");
                    return;
                }
            }
            else {
                var schedule = this.playerSchedules[notif.args.player_id];
                schedule.addDaleCardToStock(DaleCard_10.DaleCard.of(notif.args.card), 'overall_player_board_' + notif.args.player_id);
            }
            this.playerHandSizes[notif.args.player_id].incValue(-1);
        };
        DaleOfMerchants.prototype.notif_scheduleTechniqueDelay = function (notif) {
            console.warn("notif_scheduleTechniqueDelay");
        };
        DaleOfMerchants.prototype.notif_cancelTechnique = function (notif) {
            if (notif.args.player_id == this.player_id) {
                var card_id = +notif.args.card.id;
                if ($(this.mySchedule.control_name + '_item_' + card_id)) {
                    this.myHand.addDaleCardToStock(DaleCard_10.DaleCard.of(notif.args.card), this.mySchedule.control_name + '_item_' + card_id);
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
        DaleOfMerchants.prototype.notif_scheduleToHand = function (notif) {
            if (notif.args.player_id == this.player_id) {
                var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
                var card_id = +notif.args.card.id;
                if ($(this.mySchedule.control_name + '_item_' + card_id)) {
                    stock.addDaleCardToStock(DaleCard_10.DaleCard.of(notif.args.card), this.mySchedule.control_name + '_item_' + card_id);
                    this.mySchedule.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    throw new Error("scheduleToHand failed. Technique card ".concat(card_id, " does not exist in the schedule."));
                }
            }
            else {
                var schedule = this.playerSchedules[notif.args.player_id];
                schedule.removeFromStockById(+notif.args.card.id, 'overall_player_board_' + notif.args.player_id);
            }
            if (!notif.args.to_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(1);
            }
        };
        DaleOfMerchants.prototype.notif_handToStoredCards = function (notif) {
            if (notif.args.player_id == this.player_id || this.isMonoPlayer(notif.args.player_id)) {
                var stock = notif.args.from_limbo || this.isMonoPlayer(notif.args.player_id) ? this.myLimbo : this.myHand;
                var card_id = +notif.args._private.card.id;
                if ($(stock.control_name + '_item_' + card_id)) {
                    this.playerStoredCards[notif.args.player_id].addDaleCardToStock(DaleCard_10.DaleCard.of(notif.args._private.card), stock.control_name + '_item_' + card_id);
                    stock.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    throw new Error("Unable to store card ".concat(card_id, " from hand, because it does not exist in the hand"));
                }
            }
            else {
                var storedCards = this.playerStoredCards[notif.args.player_id];
                var cardBack = new DaleCard_10.DaleCard(-storedCards.count(), 0);
                storedCards.addDaleCardToStock(cardBack, 'overall_player_board_' + notif.args.player_id);
            }
            if (!notif.args.from_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(-1);
            }
        };
        DaleOfMerchants.prototype.notif_deckToStoredCards = function (notif) {
            var _a;
            var deck = this.playerDecks[notif.args.player_id];
            var storedCards = this.playerStoredCards[notif.args.player_id];
            var card = notif.args._private ? DaleCard_10.DaleCard.of((_a = notif.args._private) === null || _a === void 0 ? void 0 : _a.card) : new DaleCard_10.DaleCard(-storedCards.count(), 0);
            storedCards.addDaleCardToStock(card, deck.placeholderHTML);
            deck.pop();
        };
        DaleOfMerchants.prototype.notif_storedCardsToHand = function (notif) {
            if (notif.args.player_id == this.player_id || this.isMonoPlayer(notif.args.player_id)) {
                for (var card_id in notif.args._private.cards) {
                    var dbcard = notif.args._private.cards[card_id];
                    var stock = this.isMonoPlayer(notif.args.player_id) ? this.myLimbo : this.myHand;
                    var storedCards = this.playerStoredCards[notif.args.player_id];
                    if ($(storedCards.control_name + '_item_' + card_id)) {
                        stock.addDaleCardToStock(DaleCard_10.DaleCard.of(dbcard), storedCards.control_name + '_item_' + card_id);
                        storedCards.removeFromStockByIdNoAnimation(+card_id);
                    }
                    else {
                        throw new Error("storedCardsToHand failed. Stored card ".concat(card_id, " does not exist among the stored cards."));
                    }
                }
            }
            else {
                var storedCards = this.playerStoredCards[notif.args.player_id];
                for (var _i = 0, _a = storedCards.getAllItems(); _i < _a.length; _i++) {
                    var item = _a[_i];
                    storedCards.removeFromStockById(+item.id, 'overall_player_board_' + notif.args.player_id);
                }
            }
            var nbr = notif.args.nbr;
            this.playerHandSizes[notif.args.player_id].incValue(nbr);
        };
        DaleOfMerchants.prototype.notif_resolveTechnique = function (notif) {
            console.warn(this.playerSchedules);
            var schedule = this.playerSchedules[notif.args.player_id];
            var card = DaleCard_10.DaleCard.of(notif.args.card);
            var from = schedule.control_name + '_item_' + card.id;
            switch (notif.args.to_prefix) {
                case 'disc':
                    if (notif.args.to_suffix == 'mark') {
                        this.marketDiscard.push(card, from, null, schedule.duration);
                    }
                    else {
                        this.playerDiscards[notif.args.to_suffix].push(card, from, null, schedule.duration);
                    }
                    break;
                case 'deck':
                    this.allDecks[notif.args.to_suffix].push(card, from, null, schedule.duration);
                    break;
                case 'limb':
                    break;
                default:
                    throw new Error("Unable to resolve the technique to '".concat(notif.args.to_prefix, "'"));
            }
            schedule.removeFromStockByIdNoAnimation(card.id);
        };
        DaleOfMerchants.prototype.notif_buildStack = function (notif) {
            var _a;
            console.warn("notif_buildStack");
            var stall = this.playerStalls[notif.args.player_id];
            var dbcards_desc = this.sortCardsByLocationArg(notif.args.cards, false);
            for (var _i = 0, dbcards_desc_1 = dbcards_desc; _i < dbcards_desc_1.length; _i++) {
                var dbcard = dbcards_desc_1[_i];
                var card = DaleCard_10.DaleCard.of(dbcard);
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
                        else if (this.mono_hand_is_visible) {
                            if ($(this.myLimbo.control_name + '_item_' + card.id)) {
                                stall.insertCard(card, notif.args.stack_index, undefined, this.myLimbo.control_name + '_item_' + card.id);
                                this.myLimbo.removeFromStockByIdNoAnimation(+card.id);
                            }
                            else {
                                throw new Error("Cannot build a stack. Card ".concat(card.id, " does not exist in Mono's hand."));
                            }
                        }
                        else {
                            stall.insertCard(card, notif.args.stack_index, undefined, 'overall_player_board_' + notif.args.player_id);
                        }
                        break;
                    case 'limb':
                        if (notif.args.player_id == this.player_id) {
                            if ($(this.myLimbo.control_name + '_item_' + card.id)) {
                                stall.insertCard(card, notif.args.stack_index, undefined, this.myLimbo.control_name + '_item_' + card.id);
                                this.myLimbo.removeFromStockByIdNoAnimation(+card.id);
                            }
                            else {
                                throw new Error("Cannot build a stack. Card ".concat(card.id, " does not exist in limbo."));
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
                        console.warn("index = " + index);
                        var foundCard = discard.removeAt(index);
                        if (foundCard.id != card.id) {
                            throw new Error("buildStack: discarded card ".concat(card.id, " was not found at its expected index"));
                        }
                        break;
                    case 'deck':
                        var deck = this.marketDeck;
                        stall.insertCard(card, notif.args.stack_index, undefined, deck.placeholderHTML);
                        this.marketDeck.pop();
                        break;
                    default:
                        throw new Error("Unable to build from '".concat(notif.args.from, "'"));
                }
            }
            (_a = this.scoreCtrl[notif.args.player_id]) === null || _a === void 0 ? void 0 : _a.toValue(notif.args.stack_index_plus_1);
            if (notif.args.from == 'hand') {
                var nbr = Object.keys(notif.args.cards).length;
                this.playerHandSizes[notif.args.player_id].incValue(-nbr);
            }
        };
        DaleOfMerchants.prototype.notif_rearrangeMarket = function (notif) {
            this.market.rearrange(notif.args.card_ids);
        };
        DaleOfMerchants.prototype.notif_fillEmptyMarketSlots = function (notif) {
            console.warn("notif_fillEmptyMarketSlots");
            console.warn(notif.args);
            var cards = notif.args.cards;
            var positions = notif.args.positions;
            if (cards.length != positions.length) {
                throw new Error("notif_fillEmptyMarketSlots got invalid arguments");
            }
            for (var i = 0; i < cards.length; i++) {
                this.market.insertCard(DaleCard_10.DaleCard.of(cards[i]), positions[i], this.marketDeck.placeholderHTML);
                this.marketDeck.pop();
            }
        };
        DaleOfMerchants.prototype.notif_marketSlideRight = function (notif) {
            this.market.slideRight();
        };
        DaleOfMerchants.prototype.notif_marketToHand = function (notif) {
            var daleCard = new DaleCard_10.DaleCard(notif.args.market_card_id);
            var slotId = this.market.getSlotId(notif.args.pos);
            this.market.unselectAll();
            if (notif.args.player_id == this.player_id) {
                this.market.removeCard(notif.args.pos);
                if (notif.args.to_limbo) {
                    this.myLimbo.addDaleCardToStock(daleCard, slotId);
                    return;
                }
                this.myHand.addDaleCardToStock(daleCard, slotId);
            }
            else if (this.mono_hand_is_visible) {
                this.market.removeCard(notif.args.pos);
                this.myLimbo.addDaleCardToStock(daleCard, slotId);
            }
            else {
                this.market.removeCard(notif.args.pos, 'overall_player_board_' + notif.args.player_id);
            }
            this.playerHandSizes[notif.args.player_id].incValue(1);
        };
        DaleOfMerchants.prototype.notif_swapHandStall = function (notif) {
            console.warn("swapHandStall");
            var stall = this.playerStalls[notif.args.stall_player_id];
            if (notif.args.player_id == this.player_id) {
                stall.swapWithStock(notif.args.stall_card_id, this.myHand, DaleCard_10.DaleCard.of(notif.args.card));
            }
            else {
                stall.swapWithOverallPlayerBoard(notif.args.stall_card_id, this.player_id, DaleCard_10.DaleCard.of(notif.args.card));
            }
        };
        DaleOfMerchants.prototype.notif_swapHandMarket = function (notif) {
            console.warn("swapHandMarket");
            if (notif.args.player_id == this.player_id) {
                this.market.swapWithStock(notif.args.market_card_id, this.myHand, DaleCard_10.DaleCard.of(notif.args.card));
            }
            else {
                this.market.swapWithOverallPlayerBoard(notif.args.market_card_id, this.player_id, DaleCard_10.DaleCard.of(notif.args.card));
            }
        };
        DaleOfMerchants.prototype.notif_handToLimbo = function (notif) {
            console.warn("notif_handToLimbo");
            if (notif.args._private) {
                var card_id = +notif.args._private.card.id;
                if ($(this.myHand.control_name + '_item_' + card_id)) {
                    console.warn(notif.args);
                    this.myLimbo.addDaleCardToStock(DaleCard_10.DaleCard.of(notif.args._private.card), this.myHand.control_name + '_item_' + card_id);
                    this.myHand.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    throw new Error("Card ".concat(card_id, " does not exist in myHand."));
                }
            }
            this.playerHandSizes[notif.args.player_id].incValue(-1);
        };
        DaleOfMerchants.prototype.notif_instant_limboToHand = function (notif) {
            this.notif_limboToHand(notif);
        };
        DaleOfMerchants.prototype.notif_limboToHand = function (notif) {
            console.warn("notif_limboToHand");
            if (notif.args._private) {
                var card_id = +notif.args._private.card.id;
                if ($(this.myLimbo.control_name + '_item_' + card_id)) {
                    console.warn(notif.args);
                    this.myHand.addDaleCardToStock(DaleCard_10.DaleCard.of(notif.args._private.card), this.myLimbo.control_name + '_item_' + card_id);
                    this.myLimbo.removeFromStockByIdNoAnimation(+card_id);
                }
                else {
                    throw new Error("Card ".concat(card_id, " does not exist in myLimbo."));
                }
            }
            this.playerHandSizes[notif.args.player_id].incValue(1);
        };
        DaleOfMerchants.prototype.notif_instant_playerHandToOpponentHand = function (notif) {
            this.notif_playerHandToOpponentHand(notif);
        };
        DaleOfMerchants.prototype.notif_playerHandToOpponentHand = function (notif) {
            var temp1 = notif.args.player_id;
            notif.args.player_id = notif.args.opponent_id;
            notif.args.opponent_id = temp1;
            this.notif_opponentHandToPlayerHand(notif);
        };
        DaleOfMerchants.prototype.notif_instant_opponentHandToPlayerHand = function (notif) {
            this.notif_opponentHandToPlayerHand(notif);
        };
        DaleOfMerchants.prototype.notif_opponentHandToPlayerHand = function (notif) {
            console.warn("opponentHandToPlayerHand");
            console.warn(notif);
            if (notif.args._private) {
                if (this.mono_hand_is_visible) {
                    var card_id = +notif.args._private.card.id;
                    var from = (this.player_id == notif.args.opponent_id) ? this.myHand : this.myLimbo;
                    var to = (this.player_id == notif.args.opponent_id) ? this.myLimbo : this.myHand;
                    to.addDaleCardToStock(DaleCard_10.DaleCard.of(notif.args._private.card), from.control_name + '_item_' + card_id);
                    from.removeFromStockByIdNoAnimation(card_id);
                }
                else if (this.player_id == notif.args.opponent_id) {
                    var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
                    var card = DaleCard_10.DaleCard.of(notif.args._private.card);
                    stock.removeFromStockById(card.id, 'overall_player_board_' + notif.args.player_id);
                }
                else if (this.player_id == notif.args.player_id) {
                    var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
                    var card = DaleCard_10.DaleCard.of(notif.args._private.card);
                    stock.addDaleCardToStock(card, 'overall_player_board_' + notif.args.opponent_id);
                }
                else {
                    throw new Error("Accidentally received private arguments intended for ".concat(notif.args.opponent_id, " and ").concat(notif.args.player_id));
                }
            }
            else if (this.player_id == notif.args.opponent_id || this.player_id == notif.args.player_id) {
                throw new Error("Expected private arguments for 'opponentHandToPlayerHand'");
            }
            this.playerHandSizes[notif.args.opponent_id].incValue(-1);
            this.playerHandSizes[notif.args.player_id].incValue(1);
        };
        DaleOfMerchants.prototype.notif_obtainNewJunkInHand = function (notif) {
            if (notif.args.player_id == this.player_id) {
                for (var i in notif.args.cards) {
                    var card = notif.args.cards[i];
                    this.myHand.addDaleCardToStock(DaleCard_10.DaleCard.of(card), 'overall_player_board_' + notif.args.player_id);
                }
            }
            var nbr = Object.keys(notif.args.cards).length;
            this.playerHandSizes[notif.args.player_id].incValue(nbr);
        };
        DaleOfMerchants.prototype.notif_obtainNewJunkInDiscard = function (notif) {
            var _a;
            var from_player_id = (_a = notif.args.from_player_id) !== null && _a !== void 0 ? _a : notif.args.player_id;
            for (var i in notif.args.cards) {
                var card = notif.args.cards[i];
                this.overallPlayerBoardToPile(card, from_player_id, this.playerDiscards[notif.args.player_id]);
            }
        };
        DaleOfMerchants.prototype.notif_obtainNewJunkOnDeck = function (notif) {
            var _a;
            var from_player_id = (_a = notif.args.from_player_id) !== null && _a !== void 0 ? _a : notif.args.player_id;
            var delay = 0;
            for (var i in notif.args.cards) {
                var card = notif.args.cards[i];
                this.overallPlayerBoardToPile(card, from_player_id, this.playerDecks[notif.args.player_id], delay);
                delay += 75;
            }
        };
        DaleOfMerchants.prototype.notif_instant_toss = function (notif) {
            this.notif_toss(notif);
        };
        DaleOfMerchants.prototype.notif_toss = function (notif) {
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
            if (DaleCard_10.DaleCard.of(notif.args.card).isAnimalfolk()) {
                this.playerStockToPile(notif.args.card, stock, notif.args.player_id, this.marketDiscard, 0, notif.args.ignore_card_not_found);
            }
            else if (DaleCard_10.DaleCard.of(notif.args.card).isMonoCard()) {
                this.playerStockToPile(notif.args.card, stock, notif.args.player_id, this.monoDiscard, 0, notif.args.ignore_card_not_found);
            }
            else {
                this.playerStockRemove(notif.args.card, stock, notif.args.player_id, notif.args.ignore_card_not_found);
            }
            if (!notif.args.from_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(-1);
            }
        };
        DaleOfMerchants.prototype.notif_tossMultiple = function (notif) {
            var delay = 0;
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
            for (var _i = 0, _a = notif.args.card_ids; _i < _a.length; _i++) {
                var id = _a[_i];
                var card = notif.args.cards[id];
                if (DaleCard_10.DaleCard.of(card).isAnimalfolk()) {
                    this.playerStockToPile(card, stock, notif.args.player_id, this.marketDiscard, delay);
                }
                else if (DaleCard_10.DaleCard.of(card).isMonoCard()) {
                    this.playerStockToPile(card, stock, notif.args.player_id, this.monoDiscard, delay);
                }
                else {
                    this.playerStockRemove(card, stock, notif.args.player_id);
                }
                delay += 75;
            }
            if (!notif.args.from_limbo) {
                var nbr = Object.keys(notif.args.cards).length;
                this.playerHandSizes[notif.args.player_id].incValue(-nbr);
            }
        };
        DaleOfMerchants.prototype.notif_discard = function (notif) {
            var _a;
            console.warn("discard", notif.args);
            if (this.mainClientState.name == 'client_manufacturedJoy') {
                this.mainClientState.leaveAndDontReturn();
            }
            var discard_id = (_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id;
            var discardPile = this.playerDiscards[discard_id];
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
            this.playerStockToPile(notif.args.card, stock, notif.args.player_id, discardPile, 0, notif.args.ignore_card_not_found);
            if (!notif.args.from_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(-1);
            }
        };
        DaleOfMerchants.prototype.notif_discardMultiple = function (notif) {
            var _a;
            console.warn("discardMultiple", notif.args);
            this.coinManager.setSelectionMode('none');
            var discard_id = (_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id;
            var discardPile = this.playerDiscards[discard_id];
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
            var delay = 0;
            for (var _i = 0, _b = notif.args.card_ids; _i < _b.length; _i++) {
                var id = _b[_i];
                var card = notif.args.cards[id];
                this.playerStockToPile(card, stock, notif.args.player_id, discardPile, delay, notif.args.ignore_card_not_found);
                delay += 75;
            }
            if (!notif.args.from_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(-notif.args.nbr);
            }
        };
        DaleOfMerchants.prototype.notif_placeOnDeck = function (notif) {
            var _a;
            console.warn("placeOnDeck");
            var stock = notif.args.from_limbo ? this.myLimbo : this.myHand;
            if (notif.args._private) {
                var card = notif.args._private.card;
                var deck = this.allDecks[(_a = notif.args.deck_player_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
                this.playerStockToPile(card, stock, notif.args.player_id, deck);
            }
            else {
                this.allDecks[notif.args.deck_player_id].push(new DaleCard_10.DaleCard(0, 0), 'overall_player_board_' + notif.args.player_id);
            }
            if (!notif.args.from_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(-1);
            }
        };
        DaleOfMerchants.prototype.notif_placeOnDeckMultiple = function (notif) {
            var _a;
            console.warn("placeOnDeckMultiple");
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
                for (var i = 0; i < notif.args.nbr; i++) {
                    this.allDecks[notif.args.deck_player_id].push(new DaleCard_10.DaleCard(0, 0), 'overall_player_board_' + notif.args.player_id);
                }
            }
            if (!notif.args.from_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(-notif.args.nbr);
            }
        };
        DaleOfMerchants.prototype.notif_instant_marketDiscardToHand = function (notif) {
            this.notif_marketDiscardToHand(notif);
        };
        DaleOfMerchants.prototype.notif_marketDiscardToHand = function (notif) {
            console.warn("notif_marketDiscardToHand");
            var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
            this.pileToPlayerStock(notif.args.card, this.marketDiscard, stock, notif.args.player_id);
            if (!notif.args.to_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(1);
            }
        };
        DaleOfMerchants.prototype.notif_instant_discardToHand = function (notif) {
            this.notif_discardToHand(notif);
        };
        DaleOfMerchants.prototype.notif_discardToHand = function (notif) {
            var _a;
            console.warn("notif_discardToHand");
            var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
            var discardPile = this.playerDiscards[(_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
            this.pileToPlayerStock(notif.args.card, discardPile, stock, notif.args.player_id, +notif.args.card.location_arg);
            if (!notif.args.to_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(1);
            }
        };
        DaleOfMerchants.prototype.notif_discardToHandMultiple = function (notif) {
            var _a;
            console.warn("notif_discardToHandMultiple");
            var stock = notif.args.to_limbo ? this.myLimbo : this.myHand;
            var discardPile = this.playerDiscards[(_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
            var dbcards_desc = this.sortCardsByLocationArg(notif.args.cards, false);
            for (var _i = 0, dbcards_desc_2 = dbcards_desc; _i < dbcards_desc_2.length; _i++) {
                var card = dbcards_desc_2[_i];
                this.pileToPlayerStock(card, discardPile, stock, notif.args.player_id, +card.location_arg);
            }
            if (!notif.args.to_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(notif.args.nbr);
            }
        };
        DaleOfMerchants.prototype.notif_draw = function (notif) {
            var _a;
            console.warn("notif_draw");
            var stock = notif.args.to_limbo || this.isMonoPlayer(notif.args.player_id) ? this.myLimbo : this.myHand;
            var deck = this.allDecks[(_a = notif.args.deck_player_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
            if (notif.args._private) {
                var card = notif.args._private.card;
                if (notif.args.ignore_if_already_handled && stock.containsCardId(+card.id)) {
                    console.warn("Card " + card.id + " is already in this player's hand");
                    return;
                }
                stock.addDaleCardToStock(DaleCard_10.DaleCard.of(card), deck.placeholderHTML);
                deck.pop();
            }
            else {
                deck.pop('overall_player_board_' + notif.args.player_id);
            }
            if (!notif.args.to_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(1);
            }
        };
        DaleOfMerchants.prototype.notif_drawMultiple = function (notif) {
            var _a, _b;
            console.warn("notif_drawMultiple");
            console.warn(notif.args);
            var stock = notif.args.to_limbo || this.isMonoPlayer(notif.args.player_id) ? this.myLimbo : this.myHand;
            var deck = this.allDecks[(_a = notif.args.deck_player_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
            console.warn(deck.size);
            if (notif.args._private) {
                for (var i in (_b = notif.args._private) === null || _b === void 0 ? void 0 : _b.cards) {
                    var card = notif.args._private.cards[i];
                    stock.addDaleCardToStock(DaleCard_10.DaleCard.of(card), deck.placeholderHTML);
                    deck.pop();
                }
            }
            else {
                for (var i = 0; i < notif.args.nbr; i++) {
                    deck.pop('overall_player_board_' + notif.args.player_id);
                }
            }
            if (!notif.args.to_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(notif.args.nbr);
            }
        };
        DaleOfMerchants.prototype.notif_shuffleDiscard = function (notif) {
            var discard = this.playerDiscards[notif.args.player_id];
            while (discard.size > 0) {
                discard.pop();
            }
            for (var i in notif.args.discardPile) {
                var card = notif.args.discardPile[+i];
                discard.push(DaleCard_10.DaleCard.of(card));
            }
        };
        DaleOfMerchants.prototype.notif_reshuffleDeck = function (notif) {
            console.warn("reshuffleDeck [market=".concat(notif.args.market, ", player_id=").concat(notif.args.player_id, "]"));
            if (notif.args.market) {
                this.marketDiscard.shuffleToDrawPile(this.marketDeck);
            }
            else {
                this.playerDiscards[notif.args.player_id].shuffleToDrawPile(this.playerDecks[notif.args.player_id]);
            }
        };
        DaleOfMerchants.prototype.notif_wilyFellow = function (notif) {
            var discard = this.playerDiscards[notif.args.player_id];
            var deck = this.playerDecks[notif.args.player_id];
            var decksize = deck.size;
            var discardsize = discard.size;
            if (notif.args.card_ids.length != decksize) {
                this.showMessage(_("Wily Fellow detected that the client and server have different deck sizes. Please refresh."), 'error');
                return;
            }
            var newDiscardTop = decksize > 0 ? DaleCard_10.DaleCard.of(notif.args.cards[notif.args.card_ids[notif.args.card_ids.length - 1]]) : undefined;
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
                    deck.push(new DaleCard_10.DaleCard(0, 0));
                }
                for (var i = 0; i < decksize; i++) {
                    var card_id = notif.args.card_ids[i];
                    var card = DaleCard_10.DaleCard.of(notif.args.cards[card_id]);
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
        DaleOfMerchants.prototype.notif_accidentShuffle = function (notif) {
            var _this = this;
            console.warn("accidentShuffle");
            var player_nbr = notif.args.player_nbr;
            var opponent_nbr = notif.args.opponent_nbr;
            if (!this.isSpectator) {
                this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', _("Accident"));
                var nbr = notif.args.opponent_nbr + notif.args.player_nbr;
                var hand_card_ids = this.myHand.getAllItems().map(function (item) { return item.id; }).reverse();
                for (var i = 1; i <= nbr; i++) {
                    if ((i % 2 == 0 || notif.args.player_nbr == 0) && notif.args.opponent_nbr > 0) {
                        notif.args.opponent_nbr -= 1;
                        if (this.player_id == notif.args.opponent_id) {
                            var opponent_card_id = hand_card_ids.pop();
                            this.myLimbo.addDaleCardToStock(new DaleCard_10.DaleCard(-i, 0), this.myHand.control_name + "_item_" + opponent_card_id);
                            this.myHand.removeFromStockByIdNoAnimation(opponent_card_id);
                        }
                        else {
                            this.myLimbo.addDaleCardToStock(new DaleCard_10.DaleCard(-i, 0), "overall_player_board_" + notif.args.opponent_id);
                        }
                    }
                    else {
                        notif.args.player_nbr -= 1;
                        if (this.player_id == notif.args.player_id) {
                            var player_card_id = hand_card_ids.pop();
                            this.myLimbo.addDaleCardToStock(new DaleCard_10.DaleCard(-i, 0), this.myHand.control_name + "_item_" + player_card_id);
                            this.myHand.removeFromStockByIdNoAnimation(player_card_id);
                        }
                        else {
                            this.myLimbo.addDaleCardToStock(new DaleCard_10.DaleCard(-i, 0), "overall_player_board_" + notif.args.player_id);
                        }
                    }
                }
                if (notif.args.opponent_nbr != 0 || notif.args.player_nbr != 0) {
                    console.warn("'accidentShuffle' failed:\n\t\t\t\t\tnotif.args.opponent_nbr == ".concat(notif.args.opponent_nbr, "\n\t\t\t\t\tnotif.args.player_nbr == ").concat(notif.args.player_nbr, "\n\t\t\t\t"));
                }
                setTimeout((function () { _this.myLimbo.shuffleAnimation(); }).bind(this), this.myLimbo.duration);
            }
            else {
                for (var i = 0; i < notif.args.player_nbr; i++) {
                    this.playerDecks[notif.args.player_id].pop();
                }
            }
        };
        DaleOfMerchants.prototype.notif_accidentTakeBack = function (notif) {
            console.warn("notif_accidentTakeBack");
            if (!this.isSpectator) {
                var limbo_card_ids = this.myLimbo.getAllItems().map(function (item) { return item.id; }).sort(function () { return Math.random() - 0.5; });
                if (notif.args._private) {
                    var cards = Object.values(notif.args._private.cards);
                    if (cards.length != notif.args.nbr) {
                        throw new Error("accidentTakeBack failed: expected ".concat(notif.args.nbr, " cards, got ").concat(cards.length, " cards"));
                    }
                    for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
                        var card = cards_1[_i];
                        var limbo_card_id = limbo_card_ids.pop();
                        this.myHand.addDaleCardToStock(DaleCard_10.DaleCard.of(card), this.myLimbo.control_name + '_item_' + limbo_card_id);
                        this.myLimbo.removeFromStockByIdNoAnimation(limbo_card_id);
                    }
                }
                else {
                    for (var i = 0; i < notif.args.nbr; i++) {
                        var limbo_card_id = limbo_card_ids.pop();
                        this.myLimbo.removeFromStockById(limbo_card_id, "overall_player_board_" + notif.args.player_id);
                    }
                }
            }
        };
        DaleOfMerchants.prototype.notif_cunningNeighbourWatch = function (notif) {
            var _a;
            console.warn("notif_cunningNeighbourWatch");
            if (notif.args.player_id == this.player_id) {
                var sortedCards = this.sortCardsByLocationArg((_a = notif.args._private) === null || _a === void 0 ? void 0 : _a.cards, true);
                for (var i in sortedCards) {
                    var card = sortedCards[i];
                    this.myLimbo.addDaleCardToStock(DaleCard_10.DaleCard.of(card), "overall_player_board_" + notif.args.opponent_id);
                }
            }
            else if (notif.args.opponent_id == this.player_id) {
                this.myHand.removeAllTo("overall_player_board_" + notif.args.player_id);
            }
        };
        DaleOfMerchants.prototype.notif_cunningNeighbourReturn = function (notif) {
            var _a;
            if (notif.args.player_id == this.player_id) {
                this.myLimbo.removeAllTo("overall_player_board_" + notif.args.opponent_id);
            }
            else if (notif.args.opponent_id == this.player_id) {
                for (var i in (_a = notif.args._private) === null || _a === void 0 ? void 0 : _a.cards) {
                    var card = notif.args._private.cards[i];
                    this.myHand.addDaleCardToStock(DaleCard_10.DaleCard.of(card), "overall_player_board_" + notif.args.player_id);
                }
            }
        };
        DaleOfMerchants.prototype.notif_monoShowHand = function (notif) {
            console.warn("notif_monoShowHand", notif.args);
            if (!this.is_solo || !this.unique_opponent_id) {
                throw new Error("notif_monoShowHand can only be called in a solo game with unique_opponent_id defined");
            }
            this.myLimbo.enableSortItems = false;
            this.mono_hand_is_visible = true;
            this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', _("Mono's hand"));
            var sortedCards = this.sortCardsByLocationArg(notif.args.cards, true);
            for (var i in sortedCards) {
                var card = sortedCards[i];
                this.myLimbo.addDaleCardToStock(DaleCard_10.DaleCard.of(card), "overall_player_board_" + this.unique_opponent_id);
            }
            this.movePlayAreaOnTop(this.unique_opponent_id);
        };
        DaleOfMerchants.prototype.notif_instant_monoHideHand = function (notif) {
            this.notif_monoHideHand(notif);
        };
        DaleOfMerchants.prototype.notif_monoHideHand = function (notif) {
            console.warn("notif_monoHideHand", notif.args);
            if (!this.is_solo || !this.unique_opponent_id) {
                throw new Error("notif_monoHideHand can only be called in a solo game with unique_opponent_id defined");
            }
            this.myLimbo.enableSortItems = true;
            this.mono_hand_is_visible = false;
            this.onLimboItemDelete();
            var sortedCards = this.sortCardsByLocationArg(notif.args.cards, true);
            if (this.myLimbo.count() > sortedCards.length) {
                throw new Error("Invariant Error: Mono's hand size. Client says it's ".concat(this.myLimbo.count(), ", server says it's ").concat(sortedCards.length));
            }
            for (var i in sortedCards) {
                var card = sortedCards[i];
                if (!this.myLimbo.containsCardId(+card.id)) {
                    throw new Error("Invariant Error: server expected ".concat(card.id, " to be in Mono's hand."));
                }
            }
            this.myLimbo.removeAllTo("overall_player_board_" + this.unique_opponent_id);
        };
        DaleOfMerchants.prototype.notif_tossFromDiscard = function (notif) {
            console.warn("notif_tossFromDiscard");
            var playerDiscard = this.playerDiscards[notif.args.player_id];
            var dbcard = notif.args.card;
            var card = DaleCard_10.DaleCard.of(dbcard);
            var index = +dbcard.location_arg - 1;
            playerDiscard.removeAt(index);
            if (card.isAnimalfolk()) {
                this.marketDiscard.push(card, playerDiscard.placeholderHTML);
            }
        };
        DaleOfMerchants.prototype.notif_tossFromDeck = function (notif) {
            console.warn("notif_tossFromDeck");
            var playerDeck = this.playerDecks[notif.args.player_id];
            var dbcard = notif.args.card;
            var card = DaleCard_10.DaleCard.of(dbcard);
            if (card.isAnimalfolk()) {
                playerDeck.pop();
                this.marketDiscard.push(card, playerDeck.placeholderHTML);
            }
            else {
                playerDeck.pop('overall_player_board_' + notif.args.player_id);
            }
        };
        DaleOfMerchants.prototype.notif_tossFromMarketDeck = function (notif) {
            this.marketDeck.pop();
            this.marketDiscard.push(DaleCard_10.DaleCard.of(notif.args.card), this.marketDeck.placeholderHTML);
        };
        DaleOfMerchants.prototype.notif_tossFromMarketBoard = function (notif) {
            var delay = 0;
            for (var _i = 0, _a = notif.args.card_ids; _i < _a.length; _i++) {
                var id = _a[_i];
                var pos = this.market.posOf(id);
                var slot_id = this.market.getSlotId(pos);
                this.marketDiscard.push(new DaleCard_10.DaleCard(id), slot_id, undefined, undefined, delay);
                this.market.removeCard(pos);
                delay += 75;
            }
        };
        DaleOfMerchants.prototype.notif_instant_deckToDeck = function (notif) {
            this.notif_deckToDeck(notif);
        };
        DaleOfMerchants.prototype.notif_deckToDeck = function (notif) {
            var from_deck = this.playerDecks[notif.args.from_player_id];
            var to_deck = this.playerDecks[notif.args.to_player_id];
            for (var index = 0; index < notif.args.nbr; index++) {
                from_deck.pop(to_deck.placeholderHTML, function () { return to_deck.pushHiddenCards(1); });
            }
        };
        DaleOfMerchants.prototype.notif_instant_discardToDeck = function (notif) {
            this.notif_discardToDeck(notif);
        };
        DaleOfMerchants.prototype.notif_discardToDeck = function (notif) {
            var _a;
            var discard = this.playerDiscards[notif.args.player_id];
            var deck = this.playerDecks[(_a = notif.args.opponent_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
            discard.moveToTop(DaleCard_10.DaleCard.of(notif.args.card));
            if (notif.args.to_bottom && deck.placeholderHTML && deck.topCardHTML) {
                var cover_1 = deck.topCardHTML.cloneNode(true);
                deck.placeholderHTML.appendChild(cover_1);
                dojo.setStyle(cover_1, 'z-index', Images_8.Images.Z_INDEX_DECK_ABOVE_SLIDING_CARD.toString());
                dojo.setStyle(cover_1, 'box-shadow', "0px 0px");
                discard.pop(deck.placeholderHTML, function () {
                    deck.pushHiddenCards(1);
                    cover_1.remove();
                });
            }
            else {
                discard.pop(deck.placeholderHTML, function () { return deck.pushHiddenCards(1); });
            }
        };
        DaleOfMerchants.prototype.notif_discardToDiscard = function (notif) {
            var discard1 = this.playerDiscards[notif.args.from_player_id];
            var discard2 = this.playerDiscards[notif.args.to_player_id];
            if (notif.args.card) {
                discard1.moveToTop(DaleCard_10.DaleCard.of(notif.args.card));
            }
            var topCard = discard1.pop();
            discard2.push(topCard, discard1.placeholderHTML);
            if (topCard.id != +notif.args.card.id) {
                throw new Error("Mismatch at the top of the discard pile: client found card ".concat(topCard.id, ", but server expected card ").concat(notif.args.card.id));
            }
        };
        DaleOfMerchants.prototype.notif_deckToDiscard = function (notif) {
            var _a;
            var discard = this.playerDiscards[notif.args.player_id];
            var deck = this.playerDecks[(_a = notif.args.opponent_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
            var card = DaleCard_10.DaleCard.of(notif.args.card);
            deck.pop();
            discard.push(card, deck.placeholderHTML);
        };
        DaleOfMerchants.prototype.notif_rollDie = function (notif) {
            console.warn("notif_rollDie", notif.args);
            var card = DaleCard_10.DaleCard.of(notif.args.card);
            var parent = DaleCard_10.DaleCard.divs.get(card.id);
            if (parent) {
                new DaleDie_2.DaleDie(notif.args.animalfolk_id, notif.args.d6, notif.args.die_label, parent);
            }
        };
        DaleOfMerchants.prototype.notif_startSlotMachine = function (notif) {
            this.myLimbo.setSelectionMode('none', undefined, "daleofmerchants-wrap-default", _("Slot Machine"));
        };
        DaleOfMerchants.prototype.notif_advanceClock = function (notif) {
            var playerClock = this.playerClocks[+notif.args.player_id];
            playerClock.advanceClock(notif.args.nbr);
        };
        DaleOfMerchants.prototype.notif_updateActionButtons = function (notif) {
            this.removeActionButtons();
            this.onUpdateActionButtons(this.gamedatas.gamestate.name, this.gamedatas.gamestate.args);
        };
        DaleOfMerchants.prototype.notif_deselectPassive = function (notif) {
            this.setPassiveSelected(notif.args.passive_card_id, false);
        };
        DaleOfMerchants.prototype.notif_gainCoins = function (notif) {
            this.coinManager.addCoins(+notif.args.player_id, notif.args.nbr);
        };
        DaleOfMerchants.prototype.notif_avidFinancierTakeCoin = function (notif) {
            var _this = this;
            var card = new DaleCard_10.DaleCard(notif.args.card_id);
            var coin = card.div.querySelector(".daleofmerchants-avid-financier-coin-icon");
            if (coin) {
                var to = $("daleofmerchants-coins-icon-" + notif.args.player_id);
                var animSlide = this.slideToObject(coin, to, 500);
                var onEnd = function (node) {
                    node.remove();
                };
                var animCallback = dojo.animateProperty({ node: coin, duration: 0, onEnd: onEnd });
                var anim = dojo.fx.chain([animSlide, animCallback]);
                setTimeout(function () { _this.coinManager.addCoins(+notif.args.player_id, 1); }, 500);
                anim.play();
            }
            else {
                console.warn("avidFinancierTakeCoin animation FAILED");
                this.coinManager.addCoins(+notif.args.player_id, 1);
            }
        };
        DaleOfMerchants.prototype.notif_selectBlindfold = function (notif) {
            console.warn("notif_selectBlindfold");
        };
        DaleOfMerchants.prototype.notif_addEffect = function (notif) {
            console.warn("notif_addEffect");
            var effect = new DbEffect_2.DbEffect(notif.args.effect);
            console.warn(effect);
            DaleCard_10.DaleCard.addEffect(effect);
        };
        DaleOfMerchants.prototype.notif_updateEffect = function (notif) {
            console.warn("notif_updateEffect");
            var effect = new DbEffect_2.DbEffect(notif.args.effect);
            DaleCard_10.DaleCard.updateEffect(effect);
        };
        DaleOfMerchants.prototype.notif_expireEffects = function (notif) {
            console.warn("notif_expireEffects");
            var effects = notif.args.effects.map(function (effect) { return new DbEffect_2.DbEffect(effect); });
            console.warn(effects);
            DaleCard_10.DaleCard.expireEffects(effects);
        };
        DaleOfMerchants.prototype.notif_setScheduleCooldown = function (notif) {
            for (var card_id in notif.args.cards) {
                if (notif.args.status) {
                    DaleCard_10.DaleCard.scheduleCooldownCardIds.add(+card_id);
                }
                else {
                    DaleCard_10.DaleCard.scheduleCooldownCardIds.delete(+card_id);
                }
                if (notif.args.player_id == this.player_id) {
                    this.mySchedule.setClickable(+card_id);
                }
            }
        };
        DaleOfMerchants.prototype.notif_message = function (notif) {
            return;
        };
        DaleOfMerchants.prototype.notif_debugClient = function (notif) {
            var arg = notif.args.arg;
            console.warn("Debug with argument ".concat(arg));
            if (arg == 'log') {
                console.warn("RECEIVED A DEBUG NOTIFICATION !");
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
                this.myHand.addDaleCardToStock(new DaleCard_10.DaleCard(0, 0));
            }
            else if (arg == 'clientConsoleLog') {
                console.warn(notif.args.msg);
            }
            else if (arg == 'increaseDeckSize') {
                this.playerDecks[notif.args.player_id].pushHiddenCards(notif.args.nbr);
            }
            else if (arg == 'bindings') {
                console.warn(DaleCard_10.DaleCard.getLocalChameleonsJSON());
            }
            else if (arg == 'debugDaleCard') {
                console.warn(new DaleCard_10.DaleCard(notif.args.card_id));
            }
            else if (arg == 'divs') {
                console.warn(Array.from(DaleCard_10.DaleCard.divs.entries()).sort(function (a, b) { return a[0] - b[0]; }));
            }
            else if (arg == 'enableDebugMode') {
                this.gamedatas.debugMode = true;
                this.removeActionButtons();
                this.onUpdateActionButtons(this.gamedatas.gamestate.name, {});
                this.addCardNameInputField(document.querySelector('.daleofmerchants-debugtools'), _("Spawn Card"), this.spawnCard.bind(this));
            }
            else {
                throw new Error("Unknown argument ".concat(notif.args.arg));
            }
        };
        DaleOfMerchants.prototype.promise_notif_monoConfirmAction = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.warn("monoConfirmAction", args);
                            return [4, new Promise(function (resolve) {
                                    if (args.highlight_market_pos !== undefined) {
                                        _this.market.setSelected(args.highlight_market_pos);
                                    }
                                    if (args.wrap_class !== undefined) {
                                        var icon = undefined;
                                        switch (args.wrap_class) {
                                            case 'daleofmerchants-wrap-build':
                                                icon = 'build';
                                                break;
                                            case 'daleofmerchants-wrap-purchase':
                                                icon = 'pileYellow';
                                                break;
                                            case 'daleofmerchants-wrap-discard':
                                                icon = 'pileRed';
                                                break;
                                        }
                                        _this.myLimbo.setSelectionMode('none', icon, args.wrap_class, _("Mono's hand"), undefined, Infinity);
                                    }
                                    if (args.highlight_limbo_cards !== undefined) {
                                        for (var card_id in args.highlight_limbo_cards) {
                                            var dbcard = args.highlight_limbo_cards[card_id];
                                            _this.myLimbo.selectItem(+dbcard.id);
                                            DaleCard_10.DaleCard.of(dbcard).div.classList.add("daleofmerchants-high-priority");
                                        }
                                    }
                                    if (args.highlight_schedule_card !== undefined) {
                                        _this.monoSchedule.setSelectionMode('none', undefined, "daleofmerchants-wrap-technique", undefined, undefined, Infinity);
                                        _this.monoSchedule.selectItem(+args.highlight_schedule_card["id"]);
                                    }
                                    if (_this.getGameUserPreference(102) == 1) {
                                        resolve();
                                        return;
                                    }
                                    _this.removeActionButtons();
                                    _this.setDescriptionOnMyTurn(args.description, args);
                                    dojo.removeClass("ebd-body", "lockedInterface");
                                    _this.addActionButton("mono-confirm-action-button", _("Confirm"), function () {
                                        _this.removeActionButtons();
                                        _this.restoreMainTitle();
                                        resolve();
                                    });
                                })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        DaleOfMerchants.prototype.getPlayerOrderStartingWith = function (start_with_player_id) {
            var order = this.gamedatas.playerorder.map(Number);
            if (this.isSpectator) {
                order = [];
                document.querySelectorAll(".daleofmerchants-play-area").forEach(function (elem) {
                    var match = elem.id.match(/\d+/);
                    if (match) {
                        order.push(+match[0]);
                    }
                });
            }
            var startIndex = order.indexOf(+start_with_player_id);
            if (startIndex === -1) {
                console.warn("------------------------------------------------------");
                console.warn(order);
                console.warn("Player ID ".concat(start_with_player_id, " not found in player order."));
                console.warn("------------------------------------------------------");
                startIndex = 0;
            }
            return __spreadArray(__spreadArray([], order.slice(startIndex), true), order.slice(0, startIndex), true);
        };
        DaleOfMerchants.prototype.setPlayAreaStyling = function () {
            if (this.getGameUserPreference(101) == 0) {
                return;
            }
            for (var _i = 0, _a = this.getPlayerOrderStartingWith(this.player_id); _i < _a.length; _i++) {
                var player_id = _a[_i];
                var play_area = document.querySelector("#daleofmerchants-play-area-".concat(player_id));
                if (player_id != this.player_id) {
                    play_area === null || play_area === void 0 ? void 0 : play_area.classList.add("daleofmerchants-play-area-opponent");
                }
            }
        };
        DaleOfMerchants.prototype.movePlayAreaOnTop = function (start_with_player_id, duration) {
            var _a;
            if (duration === void 0) { duration = 1000; }
            if (this.getGameUserPreference(101) == 0) {
                return;
            }
            var container = document.querySelector(".daleofmerchants-play-area-container");
            var playAreas = Array.from(container.children);
            var initialRects = new Map();
            playAreas.forEach(function (el) { return initialRects.set(el, el.getBoundingClientRect()); });
            var topPlayerId = (_a = playAreas[0]) === null || _a === void 0 ? void 0 : _a.id.split('-').pop();
            if (topPlayerId === start_with_player_id.toString()) {
                return;
            }
            for (var _i = 0, _b = this.getPlayerOrderStartingWith(start_with_player_id); _i < _b.length; _i++) {
                var player_id = _b[_i];
                var top_1 = container.querySelector("#daleofmerchants-play-area-".concat(player_id));
                container.appendChild(top_1);
            }
            var transitions = [];
            playAreas.forEach(function (el) {
                var initialRect = initialRects.get(el);
                var newRect = el.getBoundingClientRect();
                var deltaY = initialRect.top - newRect.top;
                if (deltaY !== 0) {
                    transitions.push({ el: el, deltaY: deltaY });
                }
            });
            transitions.forEach(function (_a) {
                var el = _a.el, deltaY = _a.deltaY;
                el.style.transition = 'none';
                el.style.transform = "translateY(".concat(deltaY, "px)");
            });
            void container.offsetHeight;
            transitions.forEach(function (_a) {
                var el = _a.el;
                el.style.transition = "transform ".concat(duration, "ms ease");
                el.style.transform = '';
            });
            var cleanup = function () {
                transitions.forEach(function (_a) {
                    var el = _a.el;
                    el.style.transition = '';
                    el.style.transform = '';
                    el.removeEventListener('transitionend', cleanup);
                });
            };
            if (transitions.length) {
                transitions[0].el.addEventListener('transitionend', cleanup);
            }
        };
        DaleOfMerchants.prototype.addCardNameInputField = function (parent, button_label, callback) {
            var wordExt = new Map();
            var words = [];
            for (var i in this.gamedatas.cardTypes) {
                var cardType = this.gamedatas.cardTypes[i];
                if (cardType.type_id > 4) {
                    var cardName = cardType.name.toLowerCase();
                    var cardNameExt = cardType.animalfolk_displayed.length > 0 ? " (".concat(cardType.animalfolk_displayed.toLowerCase(), " ").concat(cardType.value, ")") : "";
                    words.push(cardName);
                    wordExt.set(cardName, " <span style=\"font-size: x-small;\">".concat(cardNameExt, "</span>"));
                }
            }
            parent.classList.remove("daleofmerchants-hidden");
            parent.innerHTML += "\n\t\t\t<span>\n\t\t\t\t<strong></strong>\n\t\t\t\t<div class=\"daleofmerchants-autocomplete-container\">\n\t\t\t\t\t<input type=\"text\" placeholder=\"Type a card name...\" autocomplete=\"off\">\n\t\t\t\t\t<div class=\"daleofmerchants-dropdown\" style=\"display: none;\"></div>\n\t\t\t\t</div>\n\t\t\t\t<button style=\"width: 120px;\" class=\"action-button bgabutton bgabutton_blue\">".concat(button_label, "</button>\n\t\t\t</span>\n\t\t");
            var container = parent.querySelector('.daleofmerchants-autocomplete-container');
            var inputField = container.querySelector('input');
            var dropdown = container.querySelector('div');
            var button = parent.querySelector('button');
            console.log(container);
            function populateDropdown(query) {
                dropdown.innerHTML = '';
                var filteredWords = words.filter(function (word) { return word.toLowerCase().startsWith(query); });
                if (filteredWords.length > 0) {
                    filteredWords.forEach(function (word) {
                        var option = document.createElement('div');
                        option.innerHTML = word + wordExt.get(word);
                        option.addEventListener('click', function () {
                            inputField.value = word;
                            dropdown.style.display = 'none';
                        });
                        dropdown.appendChild(option);
                    });
                    dropdown.style.display = 'block';
                }
                else {
                    dropdown.style.display = 'none';
                }
            }
            inputField.addEventListener('input', function () { populateDropdown(this.value.toLowerCase()); });
            inputField.addEventListener('focus', function () { populateDropdown(this.value.toLowerCase()); });
            inputField.addEventListener('keydown', function (event) {
                if (event.key === "Enter") {
                    callback(JSON.stringify(inputField.value));
                }
            });
            button.addEventListener('click', function (event) {
                callback(JSON.stringify(inputField.value));
            });
            document.addEventListener('click', function (e) {
                if (!document.querySelector('.daleofmerchants-autocomplete-container').contains(e.target)) {
                    dropdown.style.display = 'none';
                }
            });
        };
        DaleOfMerchants.prototype.spawnCard = function (card_name) {
            console.warn("actSpawn");
            this.bgaPerformAction('actSpawn', {
                card_name: card_name
            });
        };
        return DaleOfMerchants;
    }(Gamegui));
    dojo.setObject("bgagame.daleofmerchants", DaleOfMerchants);
});
define("components/types/DbLocationPrefix", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
