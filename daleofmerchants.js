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
define("components/DaleAnimalfolk", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleAnimalfolk = void 0;
    var DaleAnimalfolk = (function () {
        function DaleAnimalfolk() {
        }
        DaleAnimalfolk.ANIMALFOLK_NONE = 0;
        DaleAnimalfolk.ANIMALFOLK_MACAWS = 1;
        DaleAnimalfolk.ANIMALFOLK_PANDAS = 2;
        DaleAnimalfolk.ANIMALFOLK_RACCOONS = 3;
        DaleAnimalfolk.ANIMALFOLK_SQUIRRELS = 4;
        DaleAnimalfolk.ANIMALFOLK_OCELOTS = 5;
        DaleAnimalfolk.ANIMALFOLK_CHAMELEONS = 6;
        DaleAnimalfolk.ANIMALFOLK_PLATYPUSES = 7;
        DaleAnimalfolk.ANIMALFOLK_SLOTHS = 8;
        DaleAnimalfolk.ANIMALFOLK_CROCODILES = 9;
        DaleAnimalfolk.ANIMALFOLK_FOXES = 10;
        DaleAnimalfolk.ANIMALFOLK_POLECATS = 11;
        DaleAnimalfolk.ANIMALFOLK_OWLS = 12;
        DaleAnimalfolk.ANIMALFOLK_DESERTMONITORS = 13;
        DaleAnimalfolk.ANIMALFOLK_LEMURS = 14;
        DaleAnimalfolk.ANIMALFOLK_MAGPIES = 15;
        DaleAnimalfolk.ANIMALFOLK_ECHIDNAS = 16;
        DaleAnimalfolk.ANIMALFOLK_HARES = 17;
        DaleAnimalfolk.ANIMALFOLK_TREEKANGAROOS = 18;
        DaleAnimalfolk.ANIMALFOLK_TUATARAS = 19;
        DaleAnimalfolk.ANIMALFOLK_DODOS = 20;
        DaleAnimalfolk.ANIMALFOLK_CAPUCHINS = 21;
        DaleAnimalfolk.ANIMALFOLK_OLMS = 22;
        DaleAnimalfolk.ANIMALFOLK_PENGUINS = 23;
        DaleAnimalfolk.ANIMALFOLK_WOODTURTLES = 24;
        DaleAnimalfolk.ANIMALFOLK_SKINKS = 25;
        DaleAnimalfolk.ANIMALFOLK_BEAVERS = 26;
        DaleAnimalfolk.ANIMALFOLK_SNOWMACAQUES = 27;
        DaleAnimalfolk.ANIMALFOLK_GULLS = 28;
        DaleAnimalfolk.ANIMALFOLK_PANGOLINS = 29;
        DaleAnimalfolk.ANIMALFOLK_GLASSFROGS = 30;
        DaleAnimalfolk.ANIMALFOLK_GORILLAS = 31;
        DaleAnimalfolk.ANIMALFOLK_WALRUSES = 32;
        DaleAnimalfolk.ANIMALFOLK_TASMANIANDEVILS = 33;
        DaleAnimalfolk.ANIMALFOLK_JUNGLEFOWLS = 34;
        DaleAnimalfolk.ANIMALFOLK_MONGOOSES = 35;
        DaleAnimalfolk.ANIMALFOLK_BATS = 36;
        return DaleAnimalfolk;
    }());
    exports.DaleAnimalfolk = DaleAnimalfolk;
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
            icon.classList.add("daleofmerchants-icon");
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
            var icon = this.getIcon(3, 1);
            icon.classList.add("daleofmerchants-build-icon");
            return icon;
        };
        DaleIcons.getPompousProfessionalIcon = function () {
            return this.getIcon(3, 2);
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
        DaleIcons.getTastersIcon = function () {
            return this.getIcon(5, 5);
        };
        DaleIcons.getCostModificationIcon = function (market_position) {
            var index = market_position - 1;
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
        DaleIcons.getRandomIcon = function () {
            return this.getIcon(11, 3);
        };
        DaleIcons.getCapuchin5aIcon = function () {
            return this.getPompousProfessionalIcon();
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
                if (image_index >= 0 && sheet_index >= 0 && sheet_index <= 5) {
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
                if (card_type_id == 39) {
                    div.classList.add('daleofmerchants-sound-detector');
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
        }
        return DbEffect;
    }());
    exports.DbEffect = DbEffect;
});
define("components/DaleDie", ["require", "exports", "components/DaleAnimalfolk", "components/DaleIcons"], function (require, exports, DaleAnimalfolk_1, DaleIcons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DaleDie = void 0;
    var DaleDie = (function () {
        function DaleDie(animalfolk_id, d6, name_displayed, parentHTML) {
            var _this = this;
            var _a;
            switch (animalfolk_id) {
                case DaleAnimalfolk_1.DaleAnimalfolk.ANIMALFOLK_OCELOTS:
                    this.type = 'ocelot';
                    break;
                case DaleAnimalfolk_1.DaleAnimalfolk.ANIMALFOLK_POLECATS:
                    this.type = 'polecat';
                    break;
                case DaleAnimalfolk_1.DaleAnimalfolk.ANIMALFOLK_HARES:
                    this.type = 'hare';
                    break;
                case DaleAnimalfolk_1.DaleAnimalfolk.ANIMALFOLK_PANGOLINS:
                    this.type = 'pangolin1';
                    break;
                case DaleAnimalfolk_1.DaleAnimalfolk.ANIMALFOLK_PANGOLINS + 1:
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
                    return "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_1.DaleIcons.get3DDieOcelotIcon().outerHTML, "</span>");
                case 'polecat':
                    return "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_1.DaleIcons.get3DDiePolecatIcon().outerHTML, "</span>");
                case 'hare':
                    return "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_1.DaleIcons.get3DDieHareIcon().outerHTML, "</span>");
                case 'pangolin1':
                    return "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_1.DaleIcons.get3DDiePangolin1Icon().outerHTML, "</span>");
                case 'pangolin2':
                    return "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_1.DaleIcons.get3DDiePangolin2Icon().outerHTML, "</span>");
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
define("components/SelectionIconType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/AbstractOrderedSelection", ["require", "exports", "components/DaleIcons"], function (require, exports, DaleIcons_2) {
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
                    icon = DaleIcons_2.DaleIcons.getBluePileIcon(Math.min(index, 5));
                    break;
                case 'pileYellow':
                    icon = DaleIcons_2.DaleIcons.getYellowPileIcon(Math.min(index, 5));
                    break;
                case 'pileRed':
                    icon = DaleIcons_2.DaleIcons.getRedPileIcon(Math.min(index, 5));
                    break;
                case 'toss':
                    icon = DaleIcons_2.DaleIcons.getTossIcon();
                    break;
                case 'build':
                    icon = DaleIcons_2.DaleIcons.getBuildIcon();
                    break;
                case 'spyglass':
                    icon = (index == 0) ? DaleIcons_2.DaleIcons.getSpyglassIcon() : DaleIcons_2.DaleIcons.getBluePileIcon(Math.min(index - 1, 5));
                    break;
                case 'tasters':
                    icon = (index == 0) ? DaleIcons_2.DaleIcons.getTastersIcon() : DaleIcons_2.DaleIcons.getBluePileIcon(Math.min(index - 1, 5));
                    break;
                case 'pompousProfessional':
                    icon = (index == 0) ? DaleIcons_2.DaleIcons.getPompousProfessionalIcon() : DaleIcons_2.DaleIcons.getBluePileIcon(Math.min(index - 1, 5));
                    break;
                case 'historyLesson':
                    icon = (index == 0) ? DaleIcons_2.DaleIcons.getHistoryLessonIcon() : DaleIcons_2.DaleIcons.getBluePileIcon(Math.min(index - 1, 5));
                    break;
                case 'cheese':
                    icon = (index == 0) ? DaleIcons_2.DaleIcons.getCheeseIcon() : DaleIcons_2.DaleIcons.getBluePileIcon(Math.min(index - 1, 5));
                    break;
                case 'numbers':
                    icon = DaleIcons_2.DaleIcons.getNumberIcon(Math.min(index, 4));
                    break;
                case 'hand':
                    icon = DaleIcons_2.DaleIcons.getHandIcon();
                    break;
                case 'naturalSurvivor':
                    icon = DaleIcons_2.DaleIcons.getNaturalSurvivorIcon();
                    break;
                case 'duplicateEntry':
                    icon = DaleIcons_2.DaleIcons.getDuplicateEntry();
                    break;
                case 'DEPRECATED_historyLesson':
                    icon = DaleIcons_2.DaleIcons.getHistoryLessonIcon();
                    break;
                case 'resourcefulAlly':
                    icon = DaleIcons_2.DaleIcons.getBluePileIcon(Math.max(4 - index, 0));
                    break;
                case 'selectingContracts':
                    icon = (index == 0) ? DaleIcons_2.DaleIcons.getTossIcon() : DaleIcons_2.DaleIcons.getBluePileIcon(Math.min(index - 1, 5));
                    break;
                case 'capuchin5a':
                    icon = DaleIcons_2.DaleIcons.getCapuchin5aIcon();
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
        AbstractOrderedSelection.prototype.togglePrimarySecondary = function (card_id) {
            if (this.includes(card_id)) {
                if (this.getSize(true) < this.getMaxSize(true)) {
                    this.unselectItem(card_id);
                    this.selectItem(card_id, true);
                }
                else {
                    this.unselectItem(card_id);
                }
            }
            else if (this.includes(card_id, true)) {
                this.unselectItem(card_id, true);
            }
            else if (this.getSize() < this.getMaxSize()) {
                this.selectItem(card_id);
            }
            else {
                this.selectItem(card_id, true);
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
define("components/PlayerClock", ["require", "exports", "components/DaleIcons"], function (require, exports, DaleIcons_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerClock = void 0;
    var PlayerClock = (function () {
        function PlayerClock(page, player_id, is_mono) {
            if (is_mono === void 0) { is_mono = false; }
            this.player_id = 0;
            this.position = 0;
            this.is_mono = false;
            this.page = page;
            this.player_id = player_id;
            this.wrap = $('daleofmerchants-clock-wrap-' + player_id);
            this.label = $('daleofmerchants-clock-label-' + player_id);
            this.is_mono = is_mono;
            this.advanceClock(page.gamedatas.players[player_id].clock);
        }
        PlayerClock.prototype.advanceClock = function (steps) {
            var prevPostion = this.position;
            if (this.is_mono) {
                var newPosition = (prevPostion + steps) % 3;
                this.setClock(newPosition);
            }
            else {
                var newPosition = Math.max(PlayerClock.CLOCK_DAWN, Math.min(PlayerClock.CLOCK_NIGHT, prevPostion + steps));
                this.setClock(newPosition);
            }
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
            return content.replace('DAWN', "dawn (<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_3.DaleIcons.getDawnIcon().outerHTML, "</span>)"))
                .replace('DAY', "day (<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_3.DaleIcons.getDayIcon().outerHTML, "</span>)"))
                .replace('NIGHT', "night (<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_3.DaleIcons.getNightIcon().outerHTML, "</span>)"));
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
                    return DaleIcons_3.DaleIcons.getDawnIcon();
                case PlayerClock.CLOCK_DAY:
                    return DaleIcons_3.DaleIcons.getDayIcon();
                case PlayerClock.CLOCK_NIGHT:
                    return DaleIcons_3.DaleIcons.getNightIcon();
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
define("components/DaleCard", ["require", "exports", "components/DaleIcons", "components/Images", "components/DaleDie", "components/AbstractOrderedSelection", "components/PlayerClock"], function (require, exports, DaleIcons_4, Images_1, DaleDie_1, AbstractOrderedSelection_1, PlayerClock_1) {
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
    }(AbstractOrderedSelection_1.AbstractOrderedSelection));
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
            Images_1.Images.first_mono_type_id = DaleCard.CT_SWIFTMEMBER;
        };
        DaleCard.addEffect = function (effect) {
            console.warn("addEffect");
            console.warn(effect);
            DaleCard.effects.push(effect);
            if (effect.type_id == this.EFFECT_CHAMELEON_TYPE) {
                DaleCard.cardIdtoCopiedTypeId.set(effect.card_id, effect.arg);
            }
            switch (effect.type_id) {
                case DaleCard.CT_AVIDFINANCIER:
                    var avid_financier_card = DaleCard.divs.get(effect.card_id);
                    var avid_financier_coin_container = document.createElement("div");
                    avid_financier_coin_container.classList.add("daleofmerchants-avid-financier-coin-container");
                    avid_financier_card.append(avid_financier_coin_container);
                    for (var i = 0; i < effect.arg; i++) {
                        var avid_financier_coin = DaleIcons_4.DaleIcons.getCoinIcon();
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
                this.page.market.updateCostModificationHTML();
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
            var _loop_1 = function (effect) {
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
                if (effect.type_id == DaleCard.EFFECT_CHAMELEON_TYPE) {
                    DaleCard.cardIdtoCopiedTypeId.delete(effect.card_id);
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
                        for (var _a = 0, _b = this_1.page.gamedatas.playerorder; _a < _b.length; _a++) {
                            var player_id = _b[_a];
                            if (effect.arg != player_id) {
                                this_1.page.playerStalls[+player_id].increaseStackValue(-1);
                            }
                        }
                        break;
                }
            };
            var this_1 = this;
            for (var _i = 0, effects_1 = effects; _i < effects_1.length; _i++) {
                var effect = effects_1[_i];
                _loop_1(effect);
            }
            affected_card_ids = includes_global_effect ? Array.from(DaleCard.divs.keys()) : affected_card_ids;
            affected_card_ids.forEach(function (card_id) {
                DaleCard.updateHTML(card_id);
            });
            this.page.market.updateCostModificationHTML();
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
        DaleCard.prototype.isPassiveUsed = function () {
            console.warn("isPassiveUsed");
            var type_id = this.effective_type_id;
            if (!DaleCard.cardTypes[type_id].has_ability) {
                return true;
            }
            for (var _i = 0, _a = DaleCard.effects; _i < _a.length; _i++) {
                var effect = _a[_i];
                if (effect.card_id == this.id && effect.type_id == type_id) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperty(DaleCard.prototype, "effective_type_id", {
            get: function () {
                var _a;
                return (_a = DaleCard.cardIdtoCopiedTypeId.get(this.id)) !== null && _a !== void 0 ? _a : this.original_type_id;
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
                                break;
                            case DaleCard.CT_BOLDHAGGLER:
                            case DaleCard.CT_RESOURCEFULMEMBER:
                                value += effect.arg;
                                break;
                            case DaleCard.CT_BLINDFOLD:
                            case DaleCard.CT_DEPRECATED_BLINDFOLD:
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
                            case DaleCard.EFFECT_CHAMELEON_VALUE:
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
        DaleCard.getCostModification = function (market_position) {
            var _a, _b, _c;
            var cost = market_position;
            for (var _i = 0, _d = DaleCard.effects; _i < _d.length; _i++) {
                var effect = _d[_i];
                if (effect.effect_class == DaleCard.EC_GLOBAL) {
                    switch (effect.type_id) {
                        case DaleCard.CT_SCARYGUNFIGHT:
                            if (((_a = DaleCard.page) === null || _a === void 0 ? void 0 : _a.player_id) != effect.arg) {
                                cost += 2;
                            }
                            break;
                        case DaleCard.CT_ESSENTIALPURCHASE:
                            if (((_b = DaleCard.page) === null || _b === void 0 ? void 0 : _b.player_id) == effect.arg) {
                                cost -= 2;
                            }
                            break;
                        case DaleCard.CT_EXCLUSIVECONTACTS:
                            if (((_c = DaleCard.page) === null || _c === void 0 ? void 0 : _c.player_id) == effect.arg) {
                                cost += 2;
                            }
                            break;
                    }
                }
            }
            return cost;
        };
        DaleCard.prototype.isChameleon = function () {
            var type_id = this.effective_type_id;
            return (type_id == DaleCard.CT_FLEXIBLESHOPKEEPER ||
                type_id == DaleCard.CT_REFLECTION ||
                type_id == DaleCard.CT_GOODOLDTIMES ||
                type_id == DaleCard.CT_SOUNDDETECTORS ||
                type_id == DaleCard.CT_TRENDSETTING ||
                type_id == DaleCard.CT_SEEINGDOUBLES);
        };
        DaleCard.prototype.isBoundChameleon = function () {
            return DaleCard.cardIdtoCopiedTypeId.has(this.id);
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
            return Math.max(0, this.original_value + DaleCard.getCostModification(pos));
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
            return (this.effective_animalfolk_id != 0) && !this.isMonoCard();
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
        DaleCard.prototype.isPlayableFromHandPostCleanUp = function () {
            var type_id = this.effective_type_id;
            return DaleCard.cardTypes[type_id].playable && DaleCard.cardTypes[type_id].trigger == 'onCleanUp' && type_id != DaleCard.CT_SLICEOFLIFE;
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
                chameleonName += "<span class=daleofmerchants-chameleon-name>".concat(DaleCard.cardTypes[this.original_type_id].name, "</span><br>");
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
                text = text.replaceAll('CARDS3', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getCards3Icon().outerHTML, "</span>"));
            }
            if (text.includes('CARDS2')) {
                text = text.replaceAll('CARDS2', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getCards2Icon().outerHTML, "</span>"));
            }
            if (text.includes('CARD')) {
                text = text.replaceAll('CARD', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getCardIcon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_OCELOT')) {
                text = text.replaceAll('DIE_OCELOT', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.get3DDieOcelotIcon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_POLECAT')) {
                text = text.replaceAll('DIE_POLECAT', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.get3DDiePolecatIcon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_HARE')) {
                text = text.replaceAll('DIE_HARE', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.get3DDieHareIcon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_PANGOLINS')) {
                text = text.replaceAll('DIE_PANGOLINS', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.get3DDiePangolin1Icon().outerHTML).concat(DaleIcons_4.DaleIcons.get3DDiePangolin2Icon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_PANGOLIN1')) {
                text = text.replaceAll('DIE_PANGOLIN1', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.get3DDiePangolin1Icon().outerHTML, "</span>"));
            }
            if (text.includes('DIE_PANGOLIN2')) {
                text = text.replaceAll('DIE_PANGOLIN2', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.get3DDiePangolin2Icon().outerHTML, "</span>"));
            }
            if (text.includes('SOURCE')) {
                text = text.replaceAll('SOURCE', "<span style=\"color: var(--pangolin1); font-weight: bold;\">".concat(_("source"), "</span>"));
            }
            if (text.includes('DESTINATION')) {
                text = text.replaceAll('DESTINATION', "<span style=\"color: var(--pangolin2); font-weight: bold;\">".concat(_("destination"), "</span>"));
            }
            if (text.includes('COMET')) {
                text = text.replaceAll('COMET', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getCometIcon().outerHTML, "</span>"));
            }
            if (text.includes('PLANET')) {
                text = text.replaceAll('PLANET', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getPlanetIcon().outerHTML, "</span>"));
            }
            if (text.includes('STARS')) {
                text = text.replaceAll('STARS', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getStarsIcon().outerHTML, "</span>"));
            }
            if (text.includes('COIN')) {
                text = text.replaceAll('COIN', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getCoinIcon().outerHTML, "</span>"));
            }
            if (text.includes('DAWN')) {
                text = text.replace(/\[DAWN(.|\n)*?\]/g, function (match) {
                    return "<div class=\"daleofmerchants-tooltip-clock\" data-clock=\"0\">".concat(match.replace(/\[|\]/g, ''), "</div>");
                });
                text = text.replaceAll('DAWN', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getDawnIcon().outerHTML, "</span>"));
            }
            if (text.includes('DAY')) {
                text = text.replace(/\[DAY(.|\n)*?\]/g, function (match) {
                    return "<div class=\"daleofmerchants-tooltip-clock\" data-clock=\"1\">".concat(match.replace(/\[|\]/g, ''), "</div>");
                });
                text = text.replaceAll('DAY', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getDayIcon().outerHTML, "</span>"));
            }
            if (text.includes('NIGHT')) {
                text = text.replace(/\[NIGHT(.|\n)*?\]/g, function (match) {
                    return "<div class=\"daleofmerchants-tooltip-clock\" data-clock=\"2\">".concat(match.replace(/\[|\]/g, ''), "</div>");
                });
                text = text.replaceAll('NIGHT', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getNightIcon().outerHTML, "</span>"));
            }
            if (text.includes('CLOCK')) {
                text = text.replaceAll('CLOCK', "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getClockIcon().outerHTML, "</span>"));
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
            if (text.includes('DIE_PANGOLIN1') || text.includes('DIE_PANGOLINS')) {
                legend += "".concat(DaleDie_1.DaleDie.get3DDieTpl('pangolin1'), " <strong>:</strong> ").concat(DaleDie_1.DaleDie.getAllFacesTpl('pangolin1'), "<br style=\"line-height: 10px\" />");
            }
            if (text.includes('DIE_PANGOLIN2') || text.includes('DIE_PANGOLINS')) {
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
            if (text.includes(_('Finish')) || text.includes(_('finish'))) {
                legend += '<strong> ' + _('Finish') + ' : </strong> ' +
                    _('Resolve any effects in the card text that precede finish. During your action phase, you may spend the amount listed after finish to continue resolving the card.')
                    + '<br><br style="line-height: 10px" />';
            }
            if (text.includes(_('Spend')) || text.includes(_('spend')) || text.includes(_('Finish')) || text.includes(_('finish'))) {
                legend += '<strong> ' + _('Spend') + ' : </strong> ' +
                    DaleCard.format_string(_('You must first pay the amount listed after spend in any combination of cards from your hand and acquired gold COIN.'))
                    + '<br><br style="line-height: 10px" />';
            }
            if (text.includes('CLOCK')) {
                legend += "<span class=\"daleofmerchants-log-span\">".concat(DaleIcons_4.DaleIcons.getClockIcon().outerHTML, "</span> <strong>:</strong> ");
                legend += _("a clock that tracks the");
                legend += " ".concat(PlayerClock_1.PlayerClock.getClockLabelAndIconTpl(0), ", ").concat(PlayerClock_1.PlayerClock.getClockLabelAndIconTpl(1), " ") + _("and") + " ".concat(PlayerClock_1.PlayerClock.getClockLabelAndIconTpl(2));
                legend += '<br><br style="line-height: 10px" />';
            }
            if (text.includes(_('Copy')) || text.includes(_('copy'))) {
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
                var chameleon_icon = DaleIcons_4.DaleIcons.getChameleonIcon();
                chameleon_icon.classList.add("daleofmerchants-chameleon-icon");
                var new_overlay = document.createElement("div");
                new_overlay.classList.add("daleofmerchants-card");
                new_overlay.classList.add("daleofmerchants-chameleon-overlay");
                Images_1.Images.setCardStyle(new_overlay, this.effective_type_id);
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
            if ((DaleCard.page.isCurrentPlayerActive() && card_div.dataset['location'] == 'stock') ||
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
                if (value > this.original_value) {
                    value_div.classList.add("daleofmerchants-effective-value-high");
                    value_div.classList.remove("daleofmerchants-effective-value-low");
                }
                else {
                    value_div.classList.remove("daleofmerchants-effective-value-high");
                    value_div.classList.add("daleofmerchants-effective-value-low");
                }
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
            Images_1.Images.setCardStyle(div, this.original_type_id);
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
            Images_1.Images.setCardStyle(div, this.original_type_id);
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
            for (var _i = 0, card_ids_1 = card_ids; _i < card_ids_1.length; _i++) {
                var card_id = card_ids_1[_i];
                if ((new DaleCard(card_id)).effective_type_id == type_id) {
                    return true;
                }
            }
            return false;
        };
        DaleCard.countGlobalEffects = function (type_id) {
            var count = 0;
            for (var _i = 0, _a = DaleCard.effects; _i < _a.length; _i++) {
                var effect = _a[_i];
                if (effect.effect_class == this.EC_GLOBAL && effect.type_id == type_id) {
                    count += 1;
                }
            }
            return count;
        };
        DaleCard.cardIdtoTypeId = new Map();
        DaleCard.cardIdtoCopiedTypeId = new Map();
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
        DaleCard.CT_EXCLUSIVECONTACTS = 17;
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
        DaleCard.CT_RIGOROUSCHRONICLER = 78;
        DaleCard.CT_REFRESHINGDRINK = 79;
        DaleCard.CT_DUPLICATEENTRY = 80;
        DaleCard.CT_HISTORYLESSON = 81;
        DaleCard.CT_CULTURALPRESERVATION = 82;
        DaleCard.CT_SLICEOFLIFE = 83;
        DaleCard.CT_VORACIOUSCONSUMER = 84;
        DaleCard.CT_DELIGHTFULSURPRISE = 85;
        DaleCard.CT_FORTUNATEUPGRADE = 86;
        DaleCard.CT_REPLACEMENT = 87;
        DaleCard.CT_FASHIONHINT = 88;
        DaleCard.CT_ROYALPRIVILEGE = 89;
        DaleCard.CT_POMPOUSPROFESSIONAL = 90;
        DaleCard.CT_BRIBE = 91;
        DaleCard.CT_BURGLARY = 92;
        DaleCard.CT_GRASP = 93;
        DaleCard.CT_PERISCOPE = 94;
        DaleCard.CT_SUDDENNAP = 95;
        DaleCard.CT_CAREFREESWAPPER = 96;
        DaleCard.CT_BARGAINSEEKER = 97;
        DaleCard.CT_DELICACY = 98;
        DaleCard.CT_UMBRELLA = 99;
        DaleCard.CT_VELOCIPEDE = 100;
        DaleCard.CT_COLOURSWAP = 101;
        DaleCard.CT_ARCANESCHOLAR = 102;
        DaleCard.CT_BAROMETER = 103;
        DaleCard.CT_BADOMEN = 104;
        DaleCard.CT_FESTIVAL = 105;
        DaleCard.CT_CELESTIALGUIDANCE = 106;
        DaleCard.CT_CALENDAR = 107;
        DaleCard.CT_CLEVERGUARDIAN = 108;
        DaleCard.CT_BARRICADE = 109;
        DaleCard.CT_WHEELBARROW = 110;
        DaleCard.CT_VIGILANCE = 111;
        DaleCard.CT_SUPPLYDEPOT = 112;
        DaleCard.CT_TACTICALMEASUREMENT = 113;
        DaleCard.CT_AVIDFINANCIER = 114;
        DaleCard.CT_GREED = 115;
        DaleCard.CT_GOLDENOPPORTUNITY = 116;
        DaleCard.CT_CACHE = 117;
        DaleCard.CT_DISPLAYOFPOWER = 118;
        DaleCard.CT_SAFEPROFITS = 119;
        DaleCard.CT_DODO1 = 120;
        DaleCard.CT_DODO2 = 121;
        DaleCard.CT_DODO3 = 122;
        DaleCard.CT_DODO4 = 123;
        DaleCard.CT_DODO5A = 124;
        DaleCard.CT_DODO5B = 125;
        DaleCard.CT_CAPUCHIN1 = 126;
        DaleCard.CT_CAPUCHIN2 = 127;
        DaleCard.CT_CAPUCHIN3 = 128;
        DaleCard.CT_CAPUCHIN4 = 129;
        DaleCard.CT_CAPUCHIN5A = 130;
        DaleCard.CT_CAPUCHIN5B = 131;
        DaleCard.CT_OLM1 = 132;
        DaleCard.CT_OLM2 = 133;
        DaleCard.CT_OLM3 = 134;
        DaleCard.CT_OLM4 = 135;
        DaleCard.CT_OLM5A = 136;
        DaleCard.CT_OLM5B = 137;
        DaleCard.CT_RESOURCEFULALLY = 138;
        DaleCard.CT_ICETRADE = 139;
        DaleCard.CT_TRAVELINGEQUIPMENT = 140;
        DaleCard.CT_STOVE = 141;
        DaleCard.CT_FISHING = 142;
        DaleCard.CT_PRACTICALVALUES = 143;
        DaleCard.CT_IMPULSIVEVISIONARY = 144;
        DaleCard.CT_COLLECTORSDESIRE = 145;
        DaleCard.CT_GROUNDBREAKINGIDEA = 146;
        DaleCard.CT_INSPIRATION = 147;
        DaleCard.CT_INSIGHT = 148;
        DaleCard.CT_PERFECTMOVE = 149;
        DaleCard.CT_SKINK1 = 150;
        DaleCard.CT_SKINK2 = 151;
        DaleCard.CT_SKINK3 = 152;
        DaleCard.CT_SKINK4 = 153;
        DaleCard.CT_SKINK5A = 154;
        DaleCard.CT_SKINK5B = 155;
        DaleCard.CT_MASTERBUILDER = 156;
        DaleCard.CT_SNACK = 157;
        DaleCard.CT_WINDOFCHANGE = 158;
        DaleCard.CT_OVERTIME = 159;
        DaleCard.CT_ORDERINCHAOS = 160;
        DaleCard.CT_PRACTICE = 161;
        DaleCard.CT_PRISTINEOWNER = 162;
        DaleCard.CT_BONSAI = 163;
        DaleCard.CT_RAKE = 164;
        DaleCard.CT_SLOTMACHINE = 165;
        DaleCard.CT_GENERATIONCHANGE = 166;
        DaleCard.CT_WARMEMBRACE = 167;
        DaleCard.CT_MEDDLINGMARKETEER = 168;
        DaleCard.CT_GOODWILLPRESENTS = 169;
        DaleCard.CT_ALTERNATIVEPLAN = 170;
        DaleCard.CT_ANCHOR = 171;
        DaleCard.CT_MANUFACTUREDJOY = 172;
        DaleCard.CT_SHAKYENTERPRISE = 173;
        DaleCard.CT_FUMBLINGDREAMER = 174;
        DaleCard.CT_COFFEEGRINDER = 175;
        DaleCard.CT_ACCIDENT = 176;
        DaleCard.CT_LOOSEMARBLES = 177;
        DaleCard.CT_ANOTHERFINEMESS = 178;
        DaleCard.CT_SOUVENIRS = 179;
        DaleCard.CT_GLASSFROG1 = 180;
        DaleCard.CT_GLASSFROG2 = 181;
        DaleCard.CT_GLASSFROG3 = 182;
        DaleCard.CT_GLASSFROG4 = 183;
        DaleCard.CT_GLASSFROG5A = 184;
        DaleCard.CT_GLASSFROG5B = 185;
        DaleCard.CT_GORILLA1 = 186;
        DaleCard.CT_GORILLA2 = 187;
        DaleCard.CT_GORILLA3 = 188;
        DaleCard.CT_GORILLA4 = 189;
        DaleCard.CT_GORILLA5A = 190;
        DaleCard.CT_GORILLA5B = 191;
        DaleCard.CT_WALRUS1 = 192;
        DaleCard.CT_WALRUS2 = 193;
        DaleCard.CT_WALRUS3 = 194;
        DaleCard.CT_WALRUS4 = 195;
        DaleCard.CT_WALRUS5A = 196;
        DaleCard.CT_WALRUS5B = 197;
        DaleCard.CT_TASMANIANDEVIL1 = 198;
        DaleCard.CT_TASMANIANDEVIL2 = 199;
        DaleCard.CT_TASMANIANDEVIL3 = 200;
        DaleCard.CT_TASMANIANDEVIL4 = 201;
        DaleCard.CT_TASMANIANDEVIL5A = 202;
        DaleCard.CT_TASMANIANDEVIL5B = 203;
        DaleCard.CT_JUNGLEFOWL1 = 204;
        DaleCard.CT_JUNGLEFOWL2 = 205;
        DaleCard.CT_JUNGLEFOWL3 = 206;
        DaleCard.CT_JUNGLEFOWL4 = 207;
        DaleCard.CT_JUNGLEFOWL5A = 208;
        DaleCard.CT_JUNGLEFOWL5B = 209;
        DaleCard.CT_DRAMATICROMANTIC = 210;
        DaleCard.CT_SERENADE = 211;
        DaleCard.CT_SELECTINGCONTRACTS = 212;
        DaleCard.CT_BOUQUETS = 213;
        DaleCard.CT_SPINNINGWHEEL = 214;
        DaleCard.CT_INHERITANCE = 215;
        DaleCard.CT_SNEAKYSCOUT = 216;
        DaleCard.CT_FALSEALARM = 217;
        DaleCard.CT_HEROICDEED = 218;
        DaleCard.CT_SECRETMISSION = 219;
        DaleCard.CT_CAPTURE = 220;
        DaleCard.CT_PROVOCATION = 221;
        DaleCard.CT_SWIFTMEMBER = 222;
        DaleCard.CT_LOYALMEMBER = 223;
        DaleCard.CT_WILYMEMBER = 224;
        DaleCard.CT_STASHINGMEMBER = 225;
        DaleCard.CT_BOLDMEMBER = 226;
        DaleCard.CT_FLEXIBLEMEMBER = 227;
        DaleCard.CT_TIRELESSMEMBER = 228;
        DaleCard.CT_STEADYMEMBER = 229;
        DaleCard.CT_LITTLEMEMBER = 230;
        DaleCard.CT_CUNNINGMEMBER = 231;
        DaleCard.CT_DARINGMEMBER = 232;
        DaleCard.CT_WISEMEMBER = 233;
        DaleCard.CT_RIGOROUSMEMBER = 234;
        DaleCard.CT_VORACIOUSMEMBER = 235;
        DaleCard.CT_POMPOUSMEMBER = 236;
        DaleCard.CT_CAREFREEMEMBER = 237;
        DaleCard.CT_ARCANEMEMBER = 238;
        DaleCard.CT_CLEVERMEMBER = 239;
        DaleCard.CT_AVIDMEMBER = 240;
        DaleCard.CT_DODOMONO = 241;
        DaleCard.CT_CAPUCHINMONO = 242;
        DaleCard.CT_OLMMONO = 243;
        DaleCard.CT_RESOURCEFULMEMBER = 244;
        DaleCard.CT_IMPULSIVEMEMBER = 245;
        DaleCard.CT_SKINKMONO = 246;
        DaleCard.CT_MASTERMEMBER = 247;
        DaleCard.CT_PRISTINEMEMBER = 248;
        DaleCard.CT_MEDDLINGMEMBER = 249;
        DaleCard.CT_FUMBLINGMEMBER = 250;
        DaleCard.CT_GLASSFROGMONO = 251;
        DaleCard.CT_GORILLAMONO = 252;
        DaleCard.CT_WALRUSMONO = 253;
        DaleCard.CT_SHREWDMEMBER = 254;
        DaleCard.CT_JUNGLEFOWLMONO = 255;
        DaleCard.CT_DRAMATICMEMBER = 256;
        DaleCard.CT_STEALTHYMEMBER = 257;
        DaleCard.CT_DEPRECATED_MARKETDISCOVERY = 258;
        DaleCard.CT_DEPRECATED_CHEER = 259;
        DaleCard.CT_DEPRECATED_TASTERS = 260;
        DaleCard.CT_DEPRECATED_ESSENTIALPURCHASE = 261;
        DaleCard.CT_DEPRECATED_STOCKCLEARANCE = 262;
        DaleCard.CT_DEPRECATED_BLINDFOLD = 263;
        DaleCard.CT_DEPRECATED_HISTORYLESSON = 264;
        DaleCard.CT_DEPRECATED_CULTURALPRESERVATION = 265;
        DaleCard.CT_DEPRECATED_SLICEOFLIFE = 266;
        DaleCard.CT_DEPRECATED_VORACIOUSCONSUMER = 267;
        DaleCard.CT_DEPRECATED_ROYALPRIVILEGE = 268;
        DaleCard.CT_DEPRECATED_VELOCIPEDE = 269;
        DaleCard.CT_DEPRECATED_INSIGHT = 270;
        DaleCard.CT_DEPRECATED_WHIRLIGIG = 271;
        DaleCard.CT_DEPRECATED_FRESHSTART = 272;
        DaleCard.EFFECT_CHAMELEON_TYPE = 1000;
        DaleCard.EFFECT_CHAMELEON_VALUE = 1001;
        DaleCard.EFFECT_INCREASE_HAND_SIZE = 1002;
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
define("components/DaleStock", ["require", "exports", "ebg/stock", "components/DaleCard", "components/Images", "components/types/DaleWrapClass", "ebg/stock"], function (require, exports, Stock, DaleCard_1, Images_2, DaleWrapClass_1) {
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
            this.create(page, container, Images_2.Images.CARD_WIDTH, Images_2.Images.CARD_HEIGHT);
            this.resizeItems(Images_2.Images.CARD_WIDTH_S, Images_2.Images.CARD_HEIGHT_S, Images_2.Images.SHEET_WIDTH_S, Images_2.Images.SHEET_HEIGHT_S);
            this.image_items_per_row = Images_2.Images.IMAGES_PER_ROW;
            this.create(page, container, Images_2.Images.CARD_WIDTH_S, Images_2.Images.CARD_HEIGHT_S);
            if (wrap) {
                dojo.setStyle(wrap, 'min-height', 2 * Images_2.Images.CARD_WIDTH_S + 'px');
                dojo.setStyle(wrap, 'max-height', 2 * Images_2.Images.CARD_WIDTH_S + 'px');
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
                    else if (this.selectionMode == 'multiplePrimarySecondary') {
                        this.orderedSelection.togglePrimarySecondary(item_id);
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
                throw new Error("Card ".concat(card_id, " does not exist in ").concat(this.control_name, ", so setClickable cannot be set"));
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
                case 'multipleProgrammatic':
                    this.orderedSelection.setMaxSize(Infinity);
                    break;
                case 'multiplePrimarySecondary':
                    this.orderedSelection.setMaxSize(Infinity);
                    break;
                case 'deprecated_essentialPurchase':
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
                    return card.isPlayableFromHandPostCleanUp();
                case 'clickRetainSelection':
                    return true;
                case 'clickOnTurnStart':
                    return card.trigger == 'onTurnStart' && !card.inScheduleCooldown();
                case 'clickOnCleanUp':
                    return card.trigger == 'onCleanUp' && !card.inScheduleCooldown();
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
                case 'multipleProgrammatic':
                    return false;
                case 'multiplePrimarySecondary':
                    return true;
                case 'deprecated_essentialPurchase':
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
                    return card.isPlayableFromHandPostCleanUp() && !card.isPassiveUsed();
                case 'clickOnTurnStart':
                    return true;
                case 'clickOnCleanUp':
                    return true;
                case 'clickOnTrigger':
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
        DaleStock.prototype.onResize = function () {
            var _this = this;
            setTimeout((function () { return _this.updateDisplay(); }).bind(this), 1);
        };
        DaleStock.MAX_HORIZONTAL_OVERLAP = 85;
        return DaleStock;
    }(Stock));
    exports.DaleStock = DaleStock;
});
define("components/Pile", ["require", "exports", "components/Images", "components/DaleCard", "components/types/DaleWrapClass"], function (require, exports, Images_3, DaleCard_2, DaleWrapClass_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pile = void 0;
    var Pile = (function () {
        function Pile(page, pile_container_id, pile_name, player_id) {
            var _a;
            this.selectionMode = 'none';
            this.popin = new ebg.popindialog();
            this.isPopinOpen = false;
            this.openPopinCooldown = false;
            this.cardIdToPopinDiv = new Map();
            this.wrapClass = "daleofmerchants-wrap-default";
            this.showMainTitleBarInPopin = false;
            this.openPopinRequested = false;
            page.allPiles.push(this);
            this.pile_container_id = pile_container_id;
            this.pile_name = pile_name;
            this.player_id = player_id;
            $(pile_container_id).innerHTML = "\n            ".concat(pile_name ? "<h3 class=\"daleofmerchants-component-name\">".concat(pile_name, "</h3>") : "", "\n            <div class=\"daleofmerchants-pile\" style=\"").concat(Images_3.Images.getCardStyle(), "\">\n                <div class=\"daleofmerchants-pile-size\"></div>\n                <div class=\"daleofmerchants-pile-size daleofmerchants-pile-selected-size\" style=\"top: 16%;\"></div>\n            </div>\n        ");
            this.page = page;
            this.containerHTML = $(pile_container_id);
            this.placeholderHTML = Images_3.Images.getPlaceholder();
            var sizeElements = this.containerHTML.querySelectorAll('.daleofmerchants-pile-size');
            this.sizeHTML = sizeElements[0];
            this.selectedSizeHTML = sizeElements[1];
            this.cards = [];
            this._slidingCards = [];
            this.orderedSelection = new DaleCard_2.OrderedSelection();
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
            var z_index = Images_3.Images.Z_INDEX_SLIDING_CARD + this._slidingCards.length;
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
                this.cards.push(new DaleCard_2.DaleCard(0, 0));
            }
            this.updateHTML();
        };
        Pile.prototype.push = function (card, from, onEnd, duration, delay) {
            this.cards.push(card);
            if (from) {
                if (from instanceof Pile) {
                    from = from.placeholderHTML;
                }
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
        Pile.prototype.shuffleToPile = function (discardPile, duration) {
            if (duration === void 0) { duration = 1000; }
            if (this.cards.length == 0) {
                return;
            }
            if (this === discardPile) {
                throw new Error('Cannot shuffle to self.');
            }
            var n = this.cards.length;
            var durationPerPop = duration / n;
            for (var i = 0; i < n; i++) {
                var card = this.pop();
                if (card.id == 0) {
                    throw new Error("shuffleToPile can only be used on piles with known contents. If this is a HiddenPile, call setContent first");
                }
                discardPile.push(card, this, null, durationPerPop, durationPerPop * i);
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
            if (this.isPopinOpen || this.openPopinCooldown) {
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
            var _loop_2 = function (card) {
                var div = card.toDiv(container_id, 'stock');
                div.classList.add("daleofmerchants-relative");
                if (this_2.isClickable(card)) {
                    div.classList.add("daleofmerchants-clickable");
                    if (this_2.isClickableHighPriority(card)) {
                        div.classList.add("daleofmerchants-high-priority");
                    }
                    else {
                        div.classList.remove("daleofmerchants-high-priority");
                    }
                    var thiz_3 = this_2;
                    dojo.connect(div, 'onclick', function () {
                        thiz_3.onClickCard(card, div);
                    });
                }
                else if (this_2.isGrayedOut(card)) {
                    div.classList.add("daleofmerchants-card-grayed-out");
                }
                this_2.cardIdToPopinDiv.set(card.id, div);
            };
            var this_2 = this;
            for (var _i = 0, _h = this.cards.slice().reverse(); _i < _h.length; _i++) {
                var card = _h[_i];
                _loop_2(card);
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
            switch (this.selectionMode) {
                case 'none':
                    return;
                case 'single':
                case 'singleAnimalfolk':
                case 'sliceOfLife':
                case 'singleFromTopX':
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
                    this.orderedSelection.updateIcons();
                    this.updateHTML();
                    break;
                case 'multiplePrimarySecondary':
                    this.orderedSelection.togglePrimarySecondary(card.id);
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
                case 'singleFromTopX':
                    this.showMainTitleBarInPopin = true;
                    this.containerHTML.classList.add("daleofmerchants-blinking");
                    break;
                case 'sliceOfLife':
                    for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
                        var card = _a[_i];
                        if (card.effective_type_id == DaleCard_2.DaleCard.CT_SLICEOFLIFE && !card.isPassiveUsed()) {
                            this.containerHTML.classList.add("daleofmerchants-blinking");
                            break;
                        }
                    }
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
                case 'singleFromTopX':
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
                case 'singleFromTopX':
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
                case 'sliceOfLife':
                    return card.effective_type_id == DaleCard_2.DaleCard.CT_SLICEOFLIFE;
                default:
                    return false;
            }
        };
        Pile.prototype.isClickableHighPriority = function (card) {
            switch (this.selectionMode) {
                case 'sliceOfLife':
                    return this.isClickable(card);
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
            var _this = this;
            var _a;
            console.warn("onClosePopin");
            for (var _i = 0, _b = this.cards; _i < _b.length; _i++) {
                var card = _b[_i];
                card.detachDiv();
            }
            this.openPopinCooldown = true;
            setTimeout(function () {
                _this.openPopinCooldown = false;
            }, 500);
            this.isPopinOpen = false;
            this.updateHTML();
            var topCard = this.peek(true);
            if (topCard && this.topCardHTML) {
                topCard.attachDiv(this.topCardHTML);
            }
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
define("components/HiddenPile", ["require", "exports", "components/DaleCard", "components/Pile"], function (require, exports, DaleCard_3, Pile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HiddenPile = void 0;
    var HiddenPile = (function (_super) {
        __extends(HiddenPile, _super);
        function HiddenPile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HiddenPile.prototype.push = function (_card, from, onEnd, duration, delay) {
            _super.prototype.push.call(this, new DaleCard_3.DaleCard(0, 0), from, onEnd, duration, delay);
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
            return _super.prototype.peek.call(this, exclude_sliding_cards) ? new DaleCard_3.DaleCard(0, 0) : undefined;
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
define("components/CardSlot", ["require", "exports", "components/Images"], function (require, exports, Images_4) {
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
                    dojo.setStyle(temp_div, 'z-index', String(Images_4.Images.Z_INDEX_SLIDING_CARD));
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
define("components/MarketBoard", ["require", "exports", "components/DaleCard", "components/Images", "components/CardSlot", "components/types/DaleWrapClass", "components/DaleIcons"], function (require, exports, DaleCard_4, Images_5, CardSlot_1, DaleWrapClass_3, DaleIcons_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MarketBoard = void 0;
    var MarketBoard = (function () {
        function MarketBoard(page) {
            this.MAX_SIZE = 5;
            this.previousEffectiveCosts = [];
            this.page = page;
            $("daleofmerchants-market-board-background").setAttribute("style", "\n            width: ".concat(Images_5.Images.MARKET_WIDTH_S - Images_5.Images.MARKET_PADDING_LEFT_S - Images_5.Images.MARKET_PADDING_RIGHT_S, "px;\n            height: ").concat(Images_5.Images.MARKET_HEIGHT_S - Images_5.Images.MARKET_PADDING_TOP_S - Images_5.Images.MARKET_PADDING_BOTTOM_S, "px;\n\t\t\tpadding-top: ").concat(Images_5.Images.MARKET_PADDING_TOP_S, "px;\n\t\t\tpadding-left: ").concat(Images_5.Images.MARKET_PADDING_LEFT_S, "px;\n            padding-bottom: ").concat(Images_5.Images.MARKET_PADDING_BOTTOM_S, "px;\n\t\t\tpadding-right: ").concat(Images_5.Images.MARKET_PADDING_RIGHT_S, "px;\n\t\t"));
            this.container = $("daleofmerchants-market-board-background").querySelector("#daleofmerchants-market-board");
            this.stackContainers = [];
            this.slots = [];
            for (var pos = this.MAX_SIZE - 1; pos >= 0; pos--) {
                var stackContainer = document.createElement("div");
                stackContainer.classList.add("daleofmerchants-stack-container");
                if (pos == 0) {
                    stackContainer.setAttribute('style', "min-width: ".concat(Images_5.Images.CARD_WIDTH_S, "px;margin-left: ").concat(Images_5.Images.MARKET_ITEM_MARGIN_S, "px;"));
                }
                else {
                    stackContainer.setAttribute('style', "max-width: ".concat(Images_5.Images.CARD_WIDTH_S, "px;margin-left: ").concat(pos == 4 ? 0 : Images_5.Images.MARKET_ITEM_MARGIN_S, "px;"));
                }
                var slotDiv = Images_5.Images.getPlaceholder();
                slotDiv.classList.add("daleofmerchants-placeholder-market");
                stackContainer.appendChild(slotDiv);
                this.container.appendChild(stackContainer);
                this.stackContainers.unshift(stackContainer);
                this.slots.unshift(new CardSlot_1.CardSlot(this, pos, slotDiv));
            }
            this.orderedSelection = new DaleCard_4.OrderedSelection();
            this.selectionMode = 0;
            this.updateCostModificationHTML();
            var thiz = this;
            addEventListener("resize", function () { return setTimeout(function () { return thiz.onResize(); }, 1); });
        }
        MarketBoard.prototype.updateCostModificationHTML = function () {
            var _a, _b, _c;
            var pos = 0;
            var anythingChanged = false;
            for (var _i = 0, _d = this.stackContainers; _i < _d.length; _i++) {
                var stackContainer = _d[_i];
                var originalCostModification = pos;
                var effectiveCostModification = DaleCard_4.DaleCard.getCostModification(pos);
                if (this.previousEffectiveCosts[pos] != effectiveCostModification) {
                    this.previousEffectiveCosts[pos] = effectiveCostModification;
                    anythingChanged = true;
                }
                else {
                    continue;
                }
                if (effectiveCostModification == originalCostModification) {
                    (_a = stackContainer.querySelector(".daleofmerchants-effective-value")) === null || _a === void 0 ? void 0 : _a.remove();
                    if (effectiveCostModification != 0 && !stackContainer.querySelector(".daleofmerchants-icon")) {
                        stackContainer.appendChild(DaleIcons_5.DaleIcons.getCostModificationIcon(effectiveCostModification));
                    }
                }
                else {
                    (_b = stackContainer.querySelector(".daleofmerchants-icon")) === null || _b === void 0 ? void 0 : _b.remove();
                    var value_div = (_c = stackContainer.querySelector(".daleofmerchants-effective-value")) !== null && _c !== void 0 ? _c : document.createElement('div');
                    value_div.classList.add("daleofmerchants-effective-value");
                    stackContainer.appendChild(value_div);
                    if (effectiveCostModification >= 0) {
                        value_div.innerHTML = "+".concat(effectiveCostModification);
                    }
                    else {
                        value_div.innerHTML = "".concat(effectiveCostModification);
                    }
                    if (effectiveCostModification > originalCostModification) {
                        value_div.classList.add("daleofmerchants-effective-value-high");
                        value_div.classList.remove("daleofmerchants-effective-value-low");
                    }
                    else {
                        value_div.classList.remove("daleofmerchants-effective-value-high");
                        value_div.classList.add("daleofmerchants-effective-value-low");
                    }
                }
                pos += 1;
            }
            if (anythingChanged) {
                this.onResize();
            }
        };
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
            console.warn("rearrange", card_ids);
            if (this.getCards().length != card_ids.length) {
                throw new Error("market.rearrange failed: the number of cards must remain the same after rearranging.                 Current: ".concat(this.getCards().length, ". After rearranging: ").concat(card_ids.length));
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
                    var new_card = new DaleCard_4.DaleCard(card_ids[pos]);
                    this.insertCard(new_card, pos, froms.get(new_card.id));
                }
            }
        };
        MarketBoard.prototype.onResize = function () {
            var _a, _b, _c, _d, _e, _f;
            var totalWidth = this.container.getBoundingClientRect().width;
            if (totalWidth < (1 + Images_5.Images.STACK_MIN_MARGIN_X) * Images_5.Images.CARD_WIDTH_S * this.MAX_SIZE) {
                for (var i = 1; i < this.slots.length; i++) {
                    (_a = this.slots[i]) === null || _a === void 0 ? void 0 : _a.container.classList.add("daleofmerchants-placeholder-partially-covered");
                }
            }
            else {
                for (var i = 1; i < this.slots.length; i++) {
                    (_b = this.slots[i]) === null || _b === void 0 ? void 0 : _b.container.classList.remove("daleofmerchants-placeholder-partially-covered");
                }
            }
            var overlap = Math.max(0, Images_5.Images.CARD_WIDTH_S - totalWidth / this.MAX_SIZE);
            var left = Math.round((Images_5.Images.CARD_WIDTH_S - overlap) / 2) + 'px';
            for (var pos = 0; pos < this.MAX_SIZE; pos++) {
                var icon = (_d = (_c = this.slots[pos]) === null || _c === void 0 ? void 0 : _c.container.parentElement) === null || _d === void 0 ? void 0 : _d.querySelector(".daleofmerchants-icon");
                var override = (_f = (_e = this.slots[pos]) === null || _e === void 0 ? void 0 : _e.container.parentElement) === null || _f === void 0 ? void 0 : _f.querySelector(".daleofmerchants-effective-value");
                if (icon) {
                    dojo.setStyle(icon, 'left', left);
                }
                if (override) {
                    dojo.setStyle(override, 'left', left);
                }
            }
        };
        return MarketBoard;
    }());
    exports.MarketBoard = MarketBoard;
});
define("components/Stall", ["require", "exports", "components/DaleCard", "components/Images", "components/CardSlot", "components/DaleIcons"], function (require, exports, DaleCard_5, Images_6, CardSlot_2, DaleIcons_6) {
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
            dojo.setStyle(this.container.parentElement, 'max-width', Images_6.Images.CARD_WIDTH_S * (1 + Images_6.Images.STACK_MAX_MARGIN_X) * Stall.MAX_STACKS + 'px');
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
                    prevStackContainer.setAttribute('style', "max-width: ".concat(Images_6.Images.CARD_WIDTH_S * (1 + Images_6.Images.STACK_MAX_MARGIN_X), "px;"));
                }
                var stackContainer = document.createElement("div");
                stackContainer.classList.add("daleofmerchants-stack-container");
                stackContainer.setAttribute('style', "min-width: ".concat(Images_6.Images.CARD_WIDTH_S, "px;"));
                var placeholder = Images_6.Images.getPlaceholder();
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
                placeholder.appendChild(DaleIcons_6.DaleIcons.getBuildIcon());
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
                var y_offset = Images_6.Images.VERTICAL_STACK_OFFSET_S * (maxHeight - 1);
                console.warn("Update height");
                console.warn(stackContainer.getAttribute('style'));
                var prevStyleWithoutHeight = (_a = stackContainer.getAttribute('style')) === null || _a === void 0 ? void 0 : _a.replace(/height:.*px;/, '');
                console.warn(prevStyleWithoutHeight);
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
            this.insertCard(DaleCard_5.DaleCard.of(card), stack_index, index, from);
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
            this.stackContainers.forEach(function (stack) {
                var stackIndexDiv = stack.querySelector(".daleofmerchants-stack-index");
                if (stackIndexDiv) {
                    stackIndexDiv.classList.toggle("daleofmerchants-effective-value", isEffectiveValue);
                    stackIndexDiv.innerText = String(i);
                }
                i++;
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
            if (this.container.getBoundingClientRect().width < (1 + Images_6.Images.STACK_MIN_MARGIN_X) * Images_6.Images.CARD_WIDTH_S * Stall.MAX_STACKS) {
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
define("components/types/MainClientState", ["require", "exports", "components/DaleCard", "components/DaleIcons"], function (require, exports, DaleCard_6, DaleIcons_7) {
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
        MainClientState.prototype.getTechniqueCardId = function () {
            if ('technique_card_id' in this._args) {
                return this._args.technique_card_id;
            }
            throw new Error("Current state has no 'technique_card_id'");
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
                    case 'client_deprecated_essentialPurchase':
                        return _("Essential Purchase: ${you} may <stronger>toss</stronger> up to 3 selected junk cards");
                    case 'client_glue':
                        return _("Glue: ${you} may keep Glue in your hand");
                    case 'chameleon_flexibleShopkeeper':
                        return _("Flexible Shopkeeper: ${you} may copy a card from your rightmost stack");
                    case 'chameleon_reflection':
                        return _("Reflection: ${you} may copy the top card of another player's discard pile.");
                    case 'chameleon_goodoldtimes':
                        return _("Good Old Times: ${you} may copy the top card of the bin.");
                    case 'chameleon_trendsetting':
                        return _("Trendsetting: ${you} may copy a card in the market");
                    case 'chameleon_seeingdoubles':
                        return _("Seeing Doubles: ${you} may show and copy another card in your hand");
                    case 'client_choicelessPassiveCard':
                        return _("${card_name}: ${you} may use this card's ability");
                    case 'client_selectOpponentPassive':
                        return _("${card_name}: ${you} must choose an opponent");
                    case 'client_selectPlayerPassive':
                        return _("${card_name}: ${you} must choose a player");
                    case 'client_DEPRECATED_marketDiscovery':
                        return _("${card_name}: ${you} may <strong>toss</strong> the supply's top card or purchase the bin's top card");
                    case 'client_calculations':
                        return _("${card_name}: ${you} may rearrange any cards in the market");
                    case 'client_DEPRECATED_sliceOfLife':
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
                    case 'client_skink2':
                        return _("${card_name}: ${you} must choose an animalfolk card to <stronger>toss</stronger>");
                    case 'client_shatteredRelic':
                        return _("${card_name}: ${you} must choose a card to <stronger>toss</stronger>");
                    case 'client_skink3':
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
                    case 'client_DEPRECATED_whirligig':
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
                        return _("${card_name}: ${you} must guess the printed value of the top card of your deck");
                    case 'client_DEPRECATED_blindfold':
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
                    case 'client_DEPRECATED_tasters':
                        return _("${card_name}: ${you} must choose who takes a card from the market directly after you");
                    case 'client_rareArtefact':
                        return _("${card_name}: ${you} must choose a card to multiply its value");
                    case 'client_swank':
                        return _("${card_name}: ${you} must choose a card to <stronger>toss</stronger>");
                    case 'client_riskyBusiness':
                        return _("${card_name}: ${you} must guess the top card's value from the supply");
                    case 'client_DEPRECATED_historyLesson':
                        return _("${card_name}: ${you} may select up to 3 cards from the top of your discard pile");
                    case 'client_replacement':
                        return _("${card_name}: ${you} must choose an animalfolk card to <stronger>toss</stronger>");
                    case 'client_replacementFizzle':
                        return _("${card_name}: Are you sure you want to toss '${toss_card_name}'? The market has no valid replacement for this card");
                    case 'client_velocipede':
                        return _("${card_name}: ${you} may <stronger>toss</stronger> a card from the supply");
                    case 'client_pompousProfessional':
                        return _("${card_name}: ${you} must choose a set");
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
                        return _("${card_name}: ${you} must choose a set");
                    case 'client_periscopeValue':
                        return _("${card_name}: ${you} must choose a value");
                    case 'client_carefreeSwapper':
                        return _("${card_name}: ${you} must swap this card with a card from another player's discard pile");
                    case 'client_DEPRECATED_velocipede':
                        return _("${card_name}: ${you} must choose a card from any stall to swap with");
                    case 'client_colourSwap':
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
                            return this._page.format_dale_icons(_("${card_name}: ${you} must <stronger>toss</stronger> (ICON) one of the top ${nbr} cards of your discard and place the rest on your deck (ICON)"), DaleIcons_7.DaleIcons.getTossIcon(), DaleIcons_7.DaleIcons.getBluePileIcon(0));
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
                    case 'client_royalPrivilege':
                        return _("${card_name}: ${you} must discard 1 animalfolk card");
                    case 'client_capuchin3':
                        return _("${card_name}: ${you} must choose a card to give to an opponent");
                    case 'client_spendSelectOpponentTechnique':
                        return _("${card_name}: ${you} must choose an opponent");
                    case 'client_capuchin5b':
                        return _("${card_name}: ${you} must take a card from an opponent\'s discard");
                    case 'client_DEPRECATED_capuchin5b_SINGLEDISCARD':
                        return _("${card_name}: ${you} must take a card from the top two cards of ${opponent_name}\'s discard");
                    case 'client_skink1':
                        return _("${card_name}: ${you} must place the top 0-2 cards from your discard on your deck");
                    case 'client_skink5a':
                        return _("${card_name}: ${you} must choose ${nbr} cards to discard");
                    case 'client_skink5b':
                        return _("${card_name}: ${you} may choose a card to swap with ${card_name} from your discard");
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
                    args = __assign({ card_name: new DaleCard_6.DaleCard(args.technique_card_id).name }, args);
                }
                if ('passive_card_id' in args) {
                    args = __assign({ card_name: new DaleCard_6.DaleCard(args.passive_card_id).name }, args);
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
                var div = DaleCard_6.DaleCard.divs.get(this._args.passive_card_id);
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
define("components/TargetingLine", ["require", "exports", "components/DaleCard"], function (require, exports, DaleCard_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TargetingLine = void 0;
    var TargetingLine = (function () {
        function TargetingLine(source, targets, sourceClass, targetClass, lineClass, onSource, onTarget, pile, enable_clicking_on_source) {
            if (enable_clicking_on_source === void 0) { enable_clicking_on_source = true; }
            var _this = this;
            TargetingLine.targetingLines.push(this);
            this.svg = $("daleofmerchants-svg-container").querySelector("svg");
            this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            this.line.classList.add(lineClass);
            this.svg.appendChild(this.line);
            this.sourceClass = sourceClass;
            this.targetClass = targetClass;
            var thiz = this;
            var source_id = source instanceof DaleCard_7.DaleCard ? source.id : 0;
            if (!(source instanceof DaleCard_7.DaleCard)) {
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
            if (enable_clicking_on_source) {
                this.onSource = function () {
                    _this.remove();
                    onSource(source_id);
                };
            }
            else {
                this.onSource = function () {
                    onSource(source_id);
                };
            }
            this.cardDiv.addEventListener("click", this.onSource);
            this.targetDivs = [];
            this.onTargets = [];
            var _loop_3 = function (targetCard) {
                var card_div = targetCard instanceof DaleCard_7.DaleCard ? targetCard.div : targetCard;
                card_div.classList.add("daleofmerchants-line-target", this_3.targetClass);
                this_3.targetDivs.push(card_div);
                var target_id = targetCard instanceof DaleCard_7.DaleCard ? targetCard.id : +targetCard.dataset['target_id'];
                var finalOnTarget = function () {
                    _this.remove();
                    onTarget(source_id, target_id);
                };
                this_3.onTargets.push(finalOnTarget);
                card_div.addEventListener("click", finalOnTarget);
            };
            var this_3 = this;
            for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                var targetCard = targets_1[_i];
                _loop_3(targetCard);
            }
            this.updateLine = function (evt) {
                var _a, _b;
                if (!document.body.contains(thiz.cardDiv) && source instanceof DaleCard_7.DaleCard) {
                    if (!DaleCard_7.DaleCard.divs.has(source.id)) {
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
                var _loop_4 = function (targetCard) {
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
                    _loop_4(targetCard);
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
            var row = AnimalfolkDetails.TABLE[animalfolk_id - 1];
            if (!row) {
                throw new Error("AnimalfolkDetails is missing a values for animalfolk_id = ".concat(animalfolk_id));
            }
            return row[column];
        };
        AnimalfolkDetails.getFlavourText = function (animalfolk_id) {
            if (AnimalfolkDetails.FLAVOUR_TEXTS.length == 0) {
                AnimalfolkDetails.FLAVOUR_TEXTS = [
                    _("Macaws help you manage your hand of cards. New players like their opportunistic nature while seasoned players use them to optimise their play."),
                    _("Pandas are close friends with the market keepers and benefit from that. They're great for beginners and players wanting a more peaceful game."),
                    _("Raccoons are a great addition for players wanting some conflict. They don't care about the definition of 'ownership'. You have been warned!"),
                    _("No one can set up their stall faster than squirrels. Inexperienced players like these hoarders, while experts can pull off nice combos with them."),
                    _("Ocelots can give you an edge if luck is on your side. Add these to the game when you want to introduce a little havoc to your contest!"),
                    _("Chameleons make you play your cards as if they're other cards in the game. They are recommended for more experienced players with long-term plans."),
                    _("Platypuses get the right cards into their hands at the right time. Rookies grasp platypuses quickly and experienced players like to try out new things with them."),
                    _("You need to make plans with sloths if you don't want to waste their delayed effects. Feel free to include them even in your first game - just don't expect to be able to unleash their full potential right away!"),
                    _("Crocodiles bully other competitors by stealing their property and making threats. Invite crocodiles if you want interaction and conflict!"),
                    _("Foxes love to get everyone involved. Other folks are wary of their seemingly friendly gestures, but can't resist foxes' tempting aid. Playing with them requires skill as timing can be critical with foxes."),
                    _("No mountain is too tall or ocean too deep for polecats! These brave adventurers live for danger and aren't afraid of taking chances. Feeling lucky?"),
                    _("Owls wait patiently for their target to make a move before making their own. They are great at adding more interaction between players and will keep you on your toes. Stay vigilant!"),
                    _("Monitors excel at manipulating their discard piles. Do you have great cards in your discard and useless junk in your deck? You can fix that in no time with the monitors!"),
                    _("Getting rid of old items and trying out new things is second nature to the rather impatient lemurs. Don't get too attached to your cards and introduce them to your game!"),
                    _("Magpies are choosy thieves. They try to steal only specific items and nothing more. You need to keep an eye on your opponents to utilise magpies to their full potential. For advanced players only!"),
                    _("Echidnas borrow cards from everyone, but at least they always leave something as a replacement. Add them in when you want a lot of interaction between players without straight-out stealing."),
                    _("Statistics and calculations or blind trust in beliefs from previous generations? Hares introduce luck, but you can do a lot to play around it with precise timing and careful preparations."),
                    _("Kangaroos are excellent at hiding their valuables and creating diversions for mischief makers. However, their techniques are useful even when no one is playing dirty."),
                    _("Tuataras benefit from the riches gathered by their ancestors. You can save up gold and gain new options, including purchasing expensive cards more easily."),
                    _("nan"),
                    _("Capuchins"),
                    _("nan"),
                    _("Penguins give you potent effects for tough situations. Their power comes at a cost which seasoned players can turn into an advantage."),
                    _("Turtles like to play new techniques but struggle to finish them. If you're not careful, everything can come to a standstill. You will have to think around this."),
                    _("Skinks"),
                    _("Do you have what it takes to create a plan and then execute it with precision? Master beavers to unleash awesome combos! They are recommended for a bit more experienced players."),
                    _("nan"),
                    _("Gulls absolutely love gifting junk to their opponents to slow them down! Novices can get the hang of them pretty fast. Just be prepared for a slightly slower game."),
                    _("Pangolins cause destruction by being so absent-minded. Even more skilled players may have trouble exploiting their potential without it backfiring."),
                    _("nan"),
                    _("nan"),
                    _("nan"),
                    _("Tasmanian devils are your best bet if you want to mess up your opponents' plans! They're not ones to steal, but they do enhance it if you invite those that are."),
                    _("Junglefowls"),
                    _("Mongooses work hard during the day. Managing your tempo becomes increasingly important as you try to benefit more from them than your opponents do."),
                    _("Bats appear innocent during the day, but just wait for the night to set in! Your possessions will end up either missing or destroyed by the time dawn approaches.")
                ];
            }
            var text = AnimalfolkDetails.FLAVOUR_TEXTS[animalfolk_id - 1];
            return text !== null && text !== void 0 ? text : "MISSING FLAVOUR TEXT";
        };
        AnimalfolkDetails.COMPLEXITY = 1;
        AnimalfolkDetails.INTERACTIVITY = 2;
        AnimalfolkDetails.NASTINESS = 3;
        AnimalfolkDetails.RANDOMNESS = 4;
        AnimalfolkDetails.GAME = 5;
        AnimalfolkDetails.TABLE = [
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
            [13, 1, 1, 0, 1, 3],
            [14, 1, 1, 0, 2, 3],
            [15, 3, 3, 3, 2, 3],
            [16, 2, 3, 1, 2, 3],
            [17, 2, 1, 0, 3, 3],
            [18, 2, 1, 0, 1, 3],
            [19, 2, 1, 0, 1, 4],
            [20, 2, 1, 0, 1, 4],
            [21, 2, 3, 3, 1, 4],
            [22, 2, 3, 2, 2, 4],
            [23, 2, 1, 0, 1, 4],
            [24, 3, 1, 0, 1, 4],
            [25, 2, 1, 0, 1, 5],
            [26, 3, 1, 0, 1, 5],
            [27, 2, 1, 0, 2, 5],
            [28, 1, 2, 1, 1, 5],
            [29, 3, 3, 3, 3, 5],
            [30, 3, 1, 0, 1, 5],
            [31, 1, 1, 0, 1, 6],
            [32, 1, 2, 0, 1, 6],
            [33, 2, 3, 1, 2, 6],
            [34, 2, 1, 0, 1, 6],
            [35, 3, 1, 0, 1, 6],
            [36, 3, 3, 3, 2, 6]
        ];
        AnimalfolkDetails.FLAVOUR_TEXTS = [];
        return AnimalfolkDetails;
    }());
    exports.AnimalfolkDetails = AnimalfolkDetails;
});
define("components/DaleDeckSelection", ["require", "exports", "components/DaleIcons", "components/Images", "components/AbstractOrderedSelection", "components/types/AnimalfolkDetails", "components/DaleCard", "components/DaleAnimalfolk"], function (require, exports, DaleIcons_8, Images_7, AbstractOrderedSelection_2, AnimalfolkDetails_1, DaleCard_8, DaleAnimalfolk_2) {
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
    }(AbstractOrderedSelection_2.AbstractOrderedSelection));
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
            this.page = page;
            this.deckSelectionHTML = deckSelectionHTML;
            this.gameHTML = gameHTML;
            this.filterContainer = this.deckSelectionHTML.querySelector(".daleofmerchants-filters");
            this.resetFiltersButton = this.filterContainer.querySelector("#daleofmerchants-filter-title-reset-filters");
            this.pickRandomButton = this.filterContainer.querySelector("#daleofmerchants-pick-random");
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
            var _loop_5 = function (animalfolk_id) {
                var card_div = document.createElement('div');
                card_div.id = "deck-" + animalfolk_id;
                card_div.classList.add("daleofmerchants-card", "daleofmerchants-relative", "daleofmerchants-clickable", "daleofmerchants-deck-selection");
                this_4.cardContainer.appendChild(card_div);
                Images_7.Images.setCardStyleForDeckSelection(card_div, animalfolk_id);
                this_4.card_divs.set(animalfolk_id, card_div);
                var tooltip = new dijit.Tooltip({
                    connectId: [card_div.id],
                    label: this_4.getTooltipContent(animalfolk_id),
                    showDelay: 400,
                });
                dojo.connect(card_div, "mouseleave", function () {
                    tooltip.close();
                });
                this_4.tooltips.push(tooltip);
                var unavailable = page.gamedatas.disabledAnimalfolkIds.includes(animalfolk_id);
                if (unavailable) {
                    card_div.classList.add("daleofmerchants-deck-selection-unavailable");
                }
                var thiz = this_4;
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
            var this_4 = this;
            for (var animalfolk_id = DaleAnimalfolk_2.DaleAnimalfolk.ANIMALFOLK_MACAWS; animalfolk_id <= DaleAnimalfolk_2.DaleAnimalfolk.ANIMALFOLK_BATS; animalfolk_id++) {
                _loop_5(animalfolk_id);
            }
            for (var _i = 0, _a = page.gamedatas.disabledAnimalfolkIds; _i < _a.length; _i++) {
                var disabled_animalfolk_id = _a[_i];
                console.log("deck-" + disabled_animalfolk_id);
                this.cardContainer.appendChild($("deck-" + disabled_animalfolk_id));
            }
            this.setupFilters();
        }
        DaleDeckSelection.prototype.getTooltipContent = function (animalfolk_id) {
            var disabled = this.page.gamedatas.disabledAnimalfolkIds.includes(animalfolk_id);
            var flavour_text = AnimalfolkDetails_1.AnimalfolkDetails.getFlavourText(animalfolk_id);
            var footer = "";
            if (disabled) {
                footer = "<hr> <strong>".concat(_("This animalfolk is unavailable on BGA"), "</strong>");
            }
            else if (this.page.is_solo) {
                var type_id = Images_7.Images.first_mono_type_id + animalfolk_id - 1;
                var cardType = DaleCard_8.DaleCard.cardTypes[type_id];
                footer = "<hr>\n                <strong>".concat(cardType.name, " \u2022 ").concat(cardType.type_displayed, " ").concat(cardType.has_plus ? "(+)" : "", "</strong><br>\n                ").concat(DaleCard_8.DaleCard.format_string(cardType.text), " <br><br style=\"line-height: 10px\" />");
            }
            return "<div class=\"daleofmerchants-card-tooltip\">\n            <div class=\"daleofmerchants-card-tooltip-text\">".concat(flavour_text, "</div>\n            <div class=\"daleofmerchants-card-tooltip-text\">").concat(footer, "</div>\n        </div>");
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
                ["daleofmerchants-filter-title-reset-filters", DaleIcons_8.DaleIcons.getResetFiltersDisabledIcon()],
                ["daleofmerchants-filter-title-complexity", DaleIcons_8.DaleIcons.getComplexityIcon()],
                ["daleofmerchants-filter-title-interactivity", DaleIcons_8.DaleIcons.getInteractivityIcon()],
                ["daleofmerchants-filter-title-nastiness", DaleIcons_8.DaleIcons.getNastinessIcon()],
                ["daleofmerchants-filter-title-randomness", DaleIcons_8.DaleIcons.getRandomnessIcon()],
                ["daleofmerchants-filter-title-game", DaleIcons_8.DaleIcons.getGameIcon()],
                ["daleofmerchants-pick-random", DaleIcons_8.DaleIcons.getRandomIcon()],
            ];
            for (var _i = 0, icons_1 = icons; _i < icons_1.length; _i++) {
                var _b = icons_1[_i], html_id = _b[0], icon = _b[1];
                $(html_id).insertAdjacentHTML('afterbegin', "<span class=\"daleofmerchants-log-span\">".concat(icon.outerHTML, "</span>"));
            }
            var warningIcon = DaleIcons_8.DaleIcons.getWarningIcon();
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
            this.pickRandomButton.addEventListener("click", function () {
                _this.pickRandom();
            });
            (_a = this.filterContainer.querySelector("h2")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                _this.filterContainer.classList.toggle("daleofmerchants-collapsed");
            });
            this.filterContainer.classList.add("daleofmerchants-collapsed");
        };
        DaleDeckSelection.prototype.resetFilters = function () {
            this.filterContainer.querySelectorAll(".toggle").forEach(function (toggle) {
                if (!toggle.classList.contains("chosen")) {
                    toggle.click();
                }
            });
        };
        DaleDeckSelection.prototype.getSelectableAnimalfolkIds = function () {
            var animalfolk_ids = [];
            for (var animalfolk_id = DaleAnimalfolk_2.DaleAnimalfolk.ANIMALFOLK_MACAWS; animalfolk_id <= DaleAnimalfolk_2.DaleAnimalfolk.ANIMALFOLK_BATS; animalfolk_id++) {
                var div = this.card_divs.get(animalfolk_id);
                var isHidden = div.classList.contains("daleofmerchants-hidden");
                var isFilteredOut = div.classList.contains("daleofmerchants-filtered-out");
                var isDisabled = div.classList.contains("daleofmerchants-deck-selection-unavailable");
                var isAlreadySelected = this.orderedSelection.includes(animalfolk_id);
                if (!isHidden && !isFilteredOut && !isDisabled && !isAlreadySelected) {
                    animalfolk_ids.push(animalfolk_id);
                }
            }
            return animalfolk_ids;
        };
        DaleDeckSelection.prototype.pickRandom = function () {
            var animalfolk_ids = this.getSelectableAnimalfolkIds();
            if (animalfolk_ids.length > 0) {
                var random_index = Math.floor(Math.random() * animalfolk_ids.length);
                var animalfolk_id = animalfolk_ids[random_index];
                this.orderedSelection.selectItem(animalfolk_id);
            }
        };
        DaleDeckSelection.prototype.updateResetFiltersButton = function () {
            var hasActiveFilter = Array.from(this.filterBlacklists.values()).some(function (blacklist) { return blacklist.length > 0; });
            this.resetFiltersButton.classList.toggle("active", hasActiveFilter);
            var prevIcon = this.resetFiltersButton.querySelector(".daleofmerchants-icon");
            if (prevIcon) {
                var newIcon = hasActiveFilter ? DaleIcons_8.DaleIcons.getResetFiltersEnabledIcon() : DaleIcons_8.DaleIcons.getResetFiltersDisabledIcon();
                prevIcon.insertAdjacentHTML('beforebegin', newIcon.outerHTML);
                prevIcon.remove();
            }
        };
        DaleDeckSelection.prototype.updateFilters = function () {
            var _a;
            var _loop_6 = function (animalfolk_id) {
                var isHidden = false;
                this_5.filterBlacklists.forEach(function (blacklist, category) {
                    if (blacklist.includes(AnimalfolkDetails_1.AnimalfolkDetails.get(animalfolk_id, category))) {
                        isHidden = true;
                    }
                });
                (_a = this_5.card_divs.get(animalfolk_id)) === null || _a === void 0 ? void 0 : _a.classList.toggle("daleofmerchants-filtered-out", isHidden);
            };
            var this_5 = this;
            for (var animalfolk_id = DaleAnimalfolk_2.DaleAnimalfolk.ANIMALFOLK_MACAWS; animalfolk_id <= DaleAnimalfolk_2.DaleAnimalfolk.ANIMALFOLK_BATS; animalfolk_id++) {
                _loop_6(animalfolk_id);
            }
        };
        return DaleDeckSelection;
    }());
    exports.DaleDeckSelection = DaleDeckSelection;
});
define("components/CoinManager", ["require", "exports", "components/DaleIcons", "components/types/DaleWrapClass", "components/DaleCard", "components/Images"], function (require, exports, DaleIcons_9, DaleWrapClass_4, DaleCard_9, Images_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CoinManager = void 0;
    var CoinManager = (function () {
        function CoinManager() {
            this.selectionMode = 'none';
            this.playerCoins = {};
            this.playerCoinIcon = {};
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
                this.playerCoinIcon[player_id] = coins_icon;
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
                if (is_purchase && card.effective_type_id == DaleCard_9.DaleCard.CT_VORACIOUSCONSUMER) {
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
        CoinManager.prototype.stealCoins = function (gain_player_id, lose_player_id, nbr) {
            this.addCoins(lose_player_id, -nbr);
            this.addCoins(gain_player_id, nbr, this.playerCoinIcon[lose_player_id]);
        };
        CoinManager.prototype.addCoins = function (player_id, nbr, animate_from) {
            var _this = this;
            if (animate_from === void 0) { animate_from = undefined; }
            if (animate_from && nbr > 0) {
                var max_delay = 250;
                var duration = 500;
                var nbr_icons = Math.min(nbr, 100);
                for (var i = 0; i < nbr_icons; i++) {
                    var coin = DaleIcons_9.DaleIcons.getCoinIcon();
                    dojo.setStyle(coin, 'position', 'absolute');
                    dojo.setStyle(coin, 'z-index', String(Images_8.Images.Z_INDEX_SLIDING_CARD));
                    dojo.setStyle(coin, 'width', '50px');
                    dojo.setStyle(coin, 'height', '50px');
                    $("overall-content").append(coin);
                    this.page.placeOnObject(coin, animate_from);
                    var delay = i / nbr_icons * max_delay;
                    var animSlide = this.page.slideToObject(coin, this.playerCoinIcon[player_id], duration, delay);
                    var onEnd = function (node) {
                        node.remove();
                        _this.playerCoins[player_id].incValue(1);
                    };
                    var animCallback = dojo.animateProperty({ node: coin, duration: 0, onEnd: onEnd });
                    var anim = dojo.fx.chain([animSlide, animCallback]);
                    anim.play();
                }
            }
            else {
                this.playerCoins[player_id].incValue(nbr);
                this.setSelectionMode('none');
            }
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
define("bgagame/daleofmerchants", ["require", "exports", "ebg/core/gamegui", "components/DaleAnimalfolk", "components/DaleStock", "components/Pile", "components/HiddenPile", "components/DaleCard", "components/MarketBoard", "components/Stall", "components/types/MainClientState", "components/Images", "components/TargetingLine", "components/types/DbEffect", "components/DaleDeckSelection", "components/DaleDie", "components/DaleIcons", "components/CoinManager", "components/PlayerClock", "components/types/TranslatableStrings", "ebg/counter", "ebg/stock"], function (require, exports, Gamegui, DaleAnimalfolk_3, DaleStock_1, Pile_2, HiddenPile_1, DaleCard_10, MarketBoard_1, Stall_1, MainClientState_1, Images_9, TargetingLine_1, DbEffect_1, DaleDeckSelection_1, DaleDie_2, DaleIcons_10, CoinManager_1, PlayerClock_2, TranslatableStrings_1) {
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
            _this.buildActionSuccessful = false;
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
            DaleCard_10.DaleCard.init(this, gamedatas.cardTypes);
            this.deckSelection = new DaleDeckSelection_1.DaleDeckSelection(this, $("daleofmerchants-page-deck-selection"), $("daleofmerchants-page-game"), gamedatas.inDeckSelection);
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
                this.playerClocks[player_id] = new PlayerClock_2.PlayerClock(this, +player_id, this.isMonoPlayer(+player_id));
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
                dojo.setStyle(this.myLimbo.wrap, 'min-width', 3 * Images_9.Images.CARD_WIDTH_S + 'px');
                dojo.connect(this.myLimbo, 'onClick', this, 'onSelectLimboCard');
                dojo.connect(this.myLimbo.orderedSelection, 'onSelect', this, 'onSelectLimboCard');
                dojo.connect(this.myLimbo.orderedSelection, 'onUnselect', this, 'onUnselectLimboCard');
            }
            for (var player_id in gamedatas.schedules) {
                var container = $('daleofmerchants-schedule-' + player_id);
                var wrap = $('daleofmerchants-schedule-wrap-' + player_id);
                dojo.setStyle(wrap, 'min-width', "".concat(1.75 * Images_9.Images.CARD_WIDTH_S, "px"));
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
                dojo.setStyle(wrap, 'min-width', "".concat(1.5 * Images_9.Images.CARD_WIDTH_S, "px"));
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
                DaleCard_10.DaleCard.addEffect(new DbEffect_1.DbEffect(effect));
            }
            if (gamedatas.monoHand) {
                this.monoShowHand(gamedatas.monoHand);
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
                if (this.gamedatas.animalfolkIds.includes(DaleAnimalfolk_3.DaleAnimalfolk.ANIMALFOLK_TREEKANGAROOS)) {
                    var stored_cards_wrap = $('daleofmerchants-stored-cards-wrap-' + player_id);
                    stored_cards_wrap.classList.remove("daleofmerchants-hidden");
                }
                if (this.gamedatas.animalfolkIds.includes(DaleAnimalfolk_3.DaleAnimalfolk.ANIMALFOLK_TUATARAS) ||
                    this.gamedatas.animalfolkIds.includes(DaleAnimalfolk_3.DaleAnimalfolk.ANIMALFOLK_DODOS) ||
                    this.gamedatas.animalfolkIds.includes(DaleAnimalfolk_3.DaleAnimalfolk.ANIMALFOLK_CAPUCHINS)) {
                    var coins_wrap = $('daleofmerchants-coins-wrap-' + player_id);
                    coins_wrap.classList.remove("daleofmerchants-hidden");
                }
                if (this.gamedatas.animalfolkIds.includes(DaleAnimalfolk_3.DaleAnimalfolk.ANIMALFOLK_JUNGLEFOWLS) ||
                    this.gamedatas.animalfolkIds.includes(DaleAnimalfolk_3.DaleAnimalfolk.ANIMALFOLK_MONGOOSES) ||
                    this.gamedatas.animalfolkIds.includes(DaleAnimalfolk_3.DaleAnimalfolk.ANIMALFOLK_BATS)) {
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
            if (!this.isCurrentPlayerActive()) {
                switch (stateName) {
                    case 'playerTurn':
                        this.mainClientState.leaveAll();
                        break;
                    case 'DEPRECATED_blindfold':
                        var DEPRECATED_blindfold_args = args.args;
                        if ((_a = DEPRECATED_blindfold_args._private) === null || _a === void 0 ? void 0 : _a.card_id) {
                            var card = new DaleCard_10.DaleCard(DEPRECATED_blindfold_args._private.card_id);
                            this.myHand.setSelectionMode('noneRetainSelection', undefined, 'daleofmerchants-wrap-default', _("Your opponent is guessing the value of ") + card.name);
                            this.myHand.orderedSelection.setMaxSize(1);
                            this.myHand.selectItem(DEPRECATED_blindfold_args._private.card_id);
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
                    this.mySchedule.setSelectionMode('clickOnCleanUp', undefined, 'daleofmerchants-wrap-technique');
                    this.myHand.setSelectionMode('clickAbilityPostCleanup', 'pileBlue', 'daleofmerchants-wrap-technique', _("Click cards to use <strong>passive abilities</strong>"));
                    this.myDiscard.setSelectionMode('sliceOfLife', undefined, 'daleofmerchants-wrap-technique');
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
                    var client_technique_label = _("Click cards to use their effects");
                    this.myHand.setSelectionMode('clickTechnique', 'pileBlue', 'daleofmerchants-wrap-technique', client_technique_label);
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
                    this.myStall.setLeftPlaceholderClickable(true);
                    this.mySchedule.setSelectionMode('clickOnFinishAndSnack', undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'client_build':
                    this.myHand.setSelectionMode('multiple', 'build', 'daleofmerchants-wrap-build', _("Click cards to <strong>build stacks</strong>"));
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
                    this.myStall.selectLeftPlaceholder();
                    this.onBuildSelectionChanged();
                    if (!this.buildActionSuccessful && DaleCard_10.DaleCard.countGlobalEffects(DaleCard_10.DaleCard.CT_CULTURALPRESERVATION) > 0) {
                        this.myDiscard.openPopin();
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
                    if (!this.buildActionSuccessful && DaleCard_10.DaleCard.countGlobalEffects(DaleCard_10.DaleCard.CT_CULTURALPRESERVATION) > 0) {
                        this.myDiscard.openPopin();
                    }
                    break;
                case 'client_inventory':
                    this.myHand.setSelectionMode('multiple', 'pileRed', 'daleofmerchants-wrap-discard', _("Click cards to <strong>discard</strong>"));
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-purchase");
                    this.myStall.setLeftPlaceholderClickable(true);
                    break;
                case 'client_deprecated_essentialPurchase':
                    var client_deprecated_essentialPurchase_args = this.mainClientState.args;
                    this.setPurchaseSelectionModes(client_deprecated_essentialPurchase_args);
                    this.myHand.unselectAll();
                    this.myHand.setSelectionMode('deprecated_essentialPurchase', 'toss', 'daleofmerchants-wrap-purchase', _("Choose up to 3 junk cards to <strong>toss</strong>"), 'pileYellow');
                    var junk_selected = 0;
                    var client_essentialPurchase_skip = true;
                    for (var _i = 0, _h = client_deprecated_essentialPurchase_args.funds_card_ids.slice().reverse(); _i < _h.length; _i++) {
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
                case 'client_swiftBroker':
                    this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose the order to discard your hand"));
                    break;
                case 'client_skink2':
                    this.myHand.setSelectionMode('clickAnimalfolk', undefined, 'daleofmerchants-wrap-technique', _("Choose an animalfolk card to <strong>toss</strong>"));
                    break;
                case 'client_shatteredRelic':
                case 'client_skink3':
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
                    break;
                case 'spyglass':
                    this.myLimbo.setSelectionMode('multiple', 'spyglass', 'daleofmerchants-wrap-technique', this.format_dale_icons(_("Choose cards to take (ICON) and place back (ICON)"), DaleIcons_10.DaleIcons.getSpyglassIcon(), DaleIcons_10.DaleIcons.getBluePileIcon(0)));
                    break;
                case 'historyLesson':
                    this.myLimbo.setSelectionMode('multiple', 'historyLesson', 'daleofmerchants-wrap-technique', this.format_dale_icons(_("Choose cards to take (ICON) and discard (ICON)"), DaleIcons_10.DaleIcons.getHistoryLessonIcon(), DaleIcons_10.DaleIcons.getBluePileIcon(0)));
                    break;
                case 'client_acorn':
                case 'client_DEPRECATED_velocipede':
                    var client_acorn_targets = [];
                    for (var player_id in this.gamedatas.players) {
                        if (stateName == 'client_DEPRECATED_velocipede' || +player_id != this.player_id) {
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
                case 'client_DEPRECATED_whirligig':
                    this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose the order to discard your hand"));
                    break;
                case 'client_DEPRECATED_blindfold':
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
                    var chameleon_args = this.mainClientState.args;
                    var chameleon_source = new DaleCard_10.DaleCard(chameleon_args.passive_card_id);
                    var chameleon_targets = this.getChameleonTargets(chameleon_source);
                    if (chameleon_targets.length > 0) {
                        if (stateName == 'chameleon_reflection') {
                            for (var _r = 0, _s = Object.entries(this.playerDiscards); _r < _s.length; _r++) {
                                var _t = _s[_r], player_id = _t[0], discard_pile = _t[1];
                                var deck = this.playerDecks[+player_id];
                                if (+player_id != +this.player_id) {
                                    discard_pile.setSelectionMode('noneCantViewContent');
                                    deck.setSelectionMode('noneCantViewContent');
                                }
                            }
                        }
                        else if (stateName == 'chameleon_goodoldtimes') {
                            this.marketDeck.setSelectionMode('noneCantViewContent');
                            this.marketDiscard.setSelectionMode('noneCantViewContent');
                        }
                        this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique');
                        new TargetingLine_1.TargetingLine(chameleon_source, chameleon_targets, "daleofmerchants-line-source-chameleon", "daleofmerchants-line-target-chameleon", "daleofmerchants-line-chameleon", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onChameleon(target_id); });
                    }
                    else {
                        this.onCancelClient();
                        this.showMessage(_("No valid targets to copy"), "error");
                    }
                    break;
                case 'soundDetectors':
                    var soundDetector_args_1 = args.args;
                    this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', soundDetector_args_1.opponent_name + _("'s cards"));
                    setTimeout((function () {
                        var soundDetector_source = new DaleCard_10.DaleCard(soundDetector_args_1.passive_card_id);
                        var soundDetector_targets = _this.getChameleonTargets(soundDetector_source);
                        if (soundDetector_targets.length > 0) {
                            new TargetingLine_1.TargetingLine(soundDetector_source, soundDetector_targets, "daleofmerchants-line-source-chameleon", "daleofmerchants-line-target-chameleon", "daleofmerchants-line-chameleon", function (source_id) { _this.showMessage(_("This effect cannot be canceled"), 'error'); }, function (source_id, target_id) { return _this.onSoundDetectors(target_id); }, undefined, false);
                        }
                        else {
                            console.warn("No targets found in limbo, TargetingLine will not be created");
                            _this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Click a card to copy"));
                        }
                    }).bind(this), 750);
                    break;
                case 'client_DEPRECATED_marketDiscovery':
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
                case 'skink4':
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
                case 'insightTake':
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
                case 'souvenirs':
                    this.myLimbo.setSelectionMode('single', undefined, 'daleofmerchants-wrap-technique', _("Choose a card"));
                    break;
                case 'DEPRECATED_tasters':
                    this.market.setSelectionMode(1, undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'tasters':
                    this.market.setSelectionMode(2, 'tasters', "daleofmerchants-wrap-technique");
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
                case 'client_DEPRECATED_historyLesson':
                    this.myDiscard.setSelectionMode('multipleFromTopWithGaps', 'DEPRECATED_historyLesson', 'daleofmerchants-wrap-technique', 3);
                    this.myDiscard.openPopin();
                    break;
                case 'DEPRECATED_culturalPreservation':
                    var DEPRECATED_culturalPreservation_args = args.args;
                    this.myDeck.setContent(DEPRECATED_culturalPreservation_args._private.cards.map(DaleCard_10.DaleCard.of));
                    this.myDeck.setSelectionMode('multiple', 'spyglass', 'daleofmerchants-wrap-technique', 3);
                    this.myDeck.openPopin();
                    break;
                case 'client_DEPRECATED_sliceOfLife':
                    this.myHand.setSelectionMode('multiple2', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 2 cards to discard"));
                    break;
                case 'client_spinningWheel':
                    this.myHand.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 1-3 cards to discard"), undefined, 3);
                    break;
                case 'refreshingDrink':
                    this.myHand.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to discard"));
                    break;
                case 'client_royalPrivilege':
                    this.myHand.setSelectionMode('clickAnimalfolk', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to discard"));
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
                case 'client_velocipede':
                    this.marketDeck.setSelectionMode('top', undefined, 'daleofmerchants-wrap-technique');
                    this.marketDiscard.setSelectionMode('top', undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'velocipede':
                    var velocipede_args = args.args;
                    new TargetingLine_1.TargetingLine(new DaleCard_10.DaleCard(velocipede_args.card_id), this.myHand.getAllItems().map(function (item) { return new DaleCard_10.DaleCard(item.id); }).filter(function (card) { return card.isAnimalfolk(); }), "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onVelocipedeSwapSkip(); }, function (source_id, target_id) { return _this.onVelocipedeSwap(target_id); });
                    this.marketDiscard.setSelectionMode('noneCantViewContent');
                    this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', _("Choose an animalfolk card to swap with ") + velocipede_args.card_name);
                    break;
                case 'DEPRECATED_royalPrivilege':
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
                case 'client_colourSwap':
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
                case 'fashionHint':
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
                    this.myHand.setSelectionMode('single', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
                    break;
                case 'fishing':
                    var fishing_args = args.args;
                    this.myDiscard.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', fishing_args.die_value);
                    this.myDiscard.openPopin();
                    break;
                case 'client_groundbreakingIdea':
                    this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'groundbreakingIdea':
                    this.myDiscard.setSelectionMode('single', undefined, "daleofmerchants-wrap-technique");
                    break;
                case 'DEPRECATED_insight':
                    this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to place on your deck"));
                    break;
                case 'badOmen':
                    this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
                    break;
                case 'client_badOmen':
                    this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose cards to place on your deck"));
                    break;
                case 'coffeeGrinder':
                    var coffeeGrinder_args = args.args;
                    this.playerDecks[coffeeGrinder_args.opponent_id].setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
                    break;
                case 'insightDiscard':
                    this.myDeck.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
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
                case 'serenade':
                    this.myHand.setSelectionMode('multiple2', 'pileBlue', 'daleofmerchants-wrap-technique', _("Choose 2 cards to place on your deck"));
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
                    var rake_args = args.args;
                    this.myDeck.setContent(rake_args._private.cards.map(DaleCard_10.DaleCard.of));
                    this.myDeck.setSelectionMode('multiplePrimarySecondary', 'toss', "daleofmerchants-wrap-technique", 1, 'pileBlue', 2);
                    this.myDeck.openPopin();
                    break;
                case 'client_generationChange':
                    if (this.myDiscard.size > 0) {
                        this.myDiscard.setSelectionMode('multiple', 'hand', 'daleofmerchants-wrap-technique', 2);
                        this.myDiscard.openPopin();
                    }
                    break;
                case 'accident':
                    this.myHand.setSelectionMode('clickAnimalfolk', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to <strong>toss</strong>"));
                    break;
                case 'client_capuchin3':
                    this.myHand.setSelectionMode('single', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to give"));
                    break;
                case 'client_spendSelectOpponentTechnique':
                    this.myHand.setSelectionMode('multipleProgrammatic', "pileYellow", undefined);
                    var client_spendSelectOpponentTechnique_args = this.mainClientState.getSpendArgs();
                    for (var _20 = 0, _21 = client_spendSelectOpponentTechnique_args.spend_card_ids.reverse(); _20 < _21.length; _20++) {
                        var card_id = _21[_20];
                        this.myHand.selectItem(card_id);
                    }
                    this.coinManager.setSelectionMode('implicit', undefined, _("Coins included"));
                    this.coinManager.setCoinsToSpendImplicitly([], client_spendSelectOpponentTechnique_args.spend_coins, false);
                    var client_spendSelectOpponentTechnique_type_id = new DaleCard_10.DaleCard(this.mainClientState.getTechniqueCardId()).effective_type_id;
                    var client_spendSelectOpponentTechnique_piles = null;
                    if (client_spendSelectOpponentTechnique_type_id == DaleCard_10.DaleCard.CT_CAPUCHIN5A) {
                        client_spendSelectOpponentTechnique_piles = this.playerDecks;
                    }
                    else if (client_spendSelectOpponentTechnique_type_id == DaleCard_10.DaleCard.CT_CAPUCHIN5B) {
                        client_spendSelectOpponentTechnique_piles = this.playerDiscards;
                    }
                    if (client_spendSelectOpponentTechnique_piles) {
                        for (var _22 = 0, _23 = Object.entries(client_spendSelectOpponentTechnique_piles); _22 < _23.length; _22++) {
                            var _24 = _23[_22], player_id = _24[0], pile = _24[1];
                            if (+player_id != +this.player_id) {
                                pile.setSelectionMode('top', undefined, "daleofmerchants-wrap-technique");
                            }
                        }
                    }
                    break;
                case 'client_capuchin5b':
                    this.myHand.setSelectionMode('multipleProgrammatic', "pileYellow", undefined);
                    var client_capuchin5b_args = this.mainClientState.getSpendArgs();
                    for (var _25 = 0, _26 = client_capuchin5b_args.spend_card_ids.reverse(); _25 < _26.length; _25++) {
                        var card_id = _26[_25];
                        this.myHand.selectItem(card_id);
                    }
                    this.coinManager.setSelectionMode('implicit', undefined, _("Coins included"));
                    this.coinManager.setCoinsToSpendImplicitly([], client_capuchin5b_args.spend_coins, false);
                    for (var _27 = 0, _28 = Object.entries(this.playerDiscards); _27 < _28.length; _27++) {
                        var _29 = _28[_27], player_id = _29[0], discard = _29[1];
                        if (+player_id != +this.player_id) {
                            discard.setSelectionMode('singleFromTopX', undefined, "daleofmerchants-wrap-technique", 2);
                        }
                    }
                    break;
                case 'client_DEPRECATED_capuchin5b_SINGLEDISCARD':
                    var client_DEPRECATED_capuchin5b_SINGLEDISCARD_opponent_id = this.mainClientState.getArgs().opponent_id;
                    var client_DEPRECATED_capuchin5b_SINGLEDISCARD_discard = this.playerDiscards[client_DEPRECATED_capuchin5b_SINGLEDISCARD_opponent_id];
                    client_DEPRECATED_capuchin5b_SINGLEDISCARD_discard.setSelectionMode('singleFromTopX', undefined, "daleofmerchants-wrap-technique", 2);
                    client_DEPRECATED_capuchin5b_SINGLEDISCARD_discard.openPopin();
                    break;
                case 'client_skink1':
                    this.myDiscard.setSelectionMode('multipleFromTopNoGaps', 'pileBlue', "daleofmerchants-wrap-technique", 2);
                    this.myDiscard.openPopin();
                    break;
                case 'client_skink5a':
                    var client_skink5a_label = this.myHand.count() == 1 ? _("Discard 1 card") : _("Discard 2 cards");
                    this.myHand.setSelectionMode('multiple2', 'pileBlue', "daleofmerchants-wrap-technique", client_skink5a_label);
                    break;
                case 'client_skink5b':
                    var skink5b_args = this.mainClientState.getArgs();
                    new TargetingLine_1.TargetingLine(this.myDiscard.peek(), this.myHand.getAllItems().map(function (item) { return new DaleCard_10.DaleCard(item.id); }), "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onSkink5b(target_id); });
                    this.myDiscard.setSelectionMode('noneCantViewContent');
                    this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', _("Choose a card to swap with ") + skink5b_args.card_name);
                    break;
            }
        };
        DaleOfMerchants.prototype.onLeavingState = function (stateName) {
            var _a, _b;
            console.warn('Leaving state: ' + stateName);
            if (this.isSpectator) {
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
                    this.mySchedule.setSelectionMode('none');
                    this.myHand.setSelectionMode('none');
                    this.myDiscard.setSelectionMode('none');
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
                    break;
                case 'client_inventory':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    this.myStall.setLeftPlaceholderClickable(false);
                    break;
                case 'client_deprecated_essentialPurchase':
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
                case 'client_skink2':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_shatteredRelic':
                case 'client_skink3':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'spyglass':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'historyLesson':
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
                case 'client_DEPRECATED_whirligig':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'blindfold':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_DEPRECATED_blindfold':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'DEPRECATED_blindfoldDecideValue':
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
                case 'soundDetectors':
                    TargetingLine_1.TargetingLine.remove();
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'client_DEPRECATED_marketDiscovery':
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
                case 'skink4':
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
                case 'insightTake':
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
                case 'DEPRECATED_cheer':
                    this.myDeck.hideContent();
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'client_DEPRECATED_blindfold':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'charity':
                case 'rumours':
                case 'souvenirs':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'DEPRECATED_tasters':
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
                case 'client_DEPRECATED_historyLesson':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'DEPRECATED_culturalPreservation':
                    this.myDeck.hideContent();
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'client_DEPRECATED_sliceOfLife':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_spinningWheel':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'refreshingDrink':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_royalPrivilege':
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
                case 'client_velocipede':
                    this.marketDeck.setSelectionMode('none');
                    this.marketDiscard.setSelectionMode('none');
                    break;
                case 'velocipede':
                    TargetingLine_1.TargetingLine.remove();
                    this.marketDiscard.setSelectionMode('none');
                    this.myHand.setSelectionMode('none');
                    break;
                case 'DEPRECATED_royalPrivilege':
                    this.market.setSelectionMode(0);
                    this.myHand.setSelectionMode('none');
                    break;
                case 'pompousProfessional':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'capuchin5a':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'delicacy':
                case 'umbrella':
                    TargetingLine_1.TargetingLine.remove();
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'client_DEPRECATED_velocipede':
                    TargetingLine_1.TargetingLine.remove();
                    break;
                case 'client_colourSwap':
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
                case 'fashionHint':
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
                case 'DEPRECATED_insight':
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
                case 'insightDiscard':
                    this.myDeck.setSelectionMode('none');
                    break;
                case 'serenade':
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
                case 'accident':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_capuchin3':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'capuchin4':
                    this.myLimbo.setSelectionMode('none');
                    break;
                case 'client_spendSelectOpponentTechnique':
                    this.myHand.setSelectionMode('none');
                    this.coinManager.setSelectionMode('none');
                    for (var _18 = 0, _19 = Object.entries(this.playerDiscards); _18 < _19.length; _18++) {
                        var _20 = _19[_18], player_id = _20[0], discard = _20[1];
                        discard.setSelectionMode('none');
                    }
                    for (var _21 = 0, _22 = Object.entries(this.playerDecks); _21 < _22.length; _21++) {
                        var _23 = _22[_21], player_id = _23[0], deck = _23[1];
                        deck.setSelectionMode('none');
                    }
                    break;
                case 'client_capuchin5b':
                    this.myHand.setSelectionMode('none');
                    this.coinManager.setSelectionMode('none');
                    for (var _24 = 0, _25 = Object.entries(this.playerDiscards); _24 < _25.length; _24++) {
                        var _26 = _25[_24], player_id = _26[0], discard = _26[1];
                        discard.setSelectionMode('none');
                    }
                    break;
                case 'client_DEPRECATED_capuchin5b_SINGLEDISCARD':
                    for (var _27 = 0, _28 = Object.entries(this.playerDiscards); _27 < _28.length; _27++) {
                        var _29 = _28[_27], player_id = _29[0], discard = _29[1];
                        discard.setSelectionMode('none');
                    }
                    break;
                case 'client_skink1':
                    this.myDiscard.setSelectionMode('none');
                    break;
                case 'client_skink5a':
                    this.myHand.setSelectionMode('none');
                    break;
                case 'client_skink5b':
                    TargetingLine_1.TargetingLine.remove();
                    this.myDiscard.setSelectionMode('none');
                    this.myHand.setSelectionMode('none');
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
                    var postCleanUpPhase_hasPassiveAbilities = false;
                    var _loop_7 = function (card) {
                        if (card.effective_type_id == DaleCard_10.DaleCard.CT_SLICEOFLIFE && !card.isPassiveUsed()) {
                            var label = _("Use") + " " + card.name + " " + _("(from discard)");
                            this_6.statusBar.addActionButton(label, function () { return _this.onClickPassive(card); });
                            postCleanUpPhase_hasPassiveAbilities = true;
                        }
                    };
                    var this_6 = this;
                    for (var _i = 0, _d = this.myDiscard.getCards(); _i < _d.length; _i++) {
                        var card = _d[_i];
                        _loop_7(card);
                    }
                    var _loop_8 = function (card) {
                        if (card.isPlayableFromHandPostCleanUp() && !card.isPassiveUsed()) {
                            var label = _("Use") + " " + card.name;
                            this_7.statusBar.addActionButton(label, function () { return _this.onClickPassive(card); });
                            postCleanUpPhase_hasPassiveAbilities = true;
                        }
                    };
                    var this_7 = this;
                    for (var _e = 0, _f = this.myHand.getAllDaleCards(); _e < _f.length; _e++) {
                        var card = _f[_e];
                        _loop_8(card);
                    }
                    var postCleanUpPhase_hasScheduledTechniques = false;
                    var _loop_9 = function (card) {
                        if (card.trigger == 'onCleanUp' && !card.inScheduleCooldown()) {
                            var label = _("Resolve") + " " + card.name;
                            this_8.statusBar.addActionButton(label, function () { return _this.onTriggerTechnique(card.id); });
                            postCleanUpPhase_hasScheduledTechniques = true;
                        }
                    };
                    var this_8 = this;
                    for (var _g = 0, _h = this.mySchedule.getAllDaleCards(); _g < _h.length; _g++) {
                        var card = _h[_g];
                        _loop_9(card);
                    }
                    if (postCleanUpPhase_hasScheduledTechniques) {
                        if (postCleanUpPhase_hasPassiveAbilities) {
                            this.setDescriptionOnMyTurn(_("${you} must take an action"));
                        }
                        else {
                            this.setDescriptionOnMyTurn(_("${you} must resolve scheduled techniques"));
                        }
                    }
                    else {
                        this.addActionButton("end-turn-button", _("End turn"), "onEndTurn");
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
                    break;
                case 'client_purchase':
                    this.addActionButton("confirm-button", _("Confirm funds"), "onPurchase");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_build':
                    this.addActionButton("confirm-button", _("Build with selected"), "onBuild");
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
                case 'client_inventory':
                    this.addActionButton("confirm-button", _("Discard selected"), "onInventoryAction");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_deprecated_essentialPurchase':
                    this.addActionButton("confirm-button", _("Toss selected junk"), "onPurchase");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_swiftBroker':
                    this.addActionButton("confirm-button", _("Discard all"), "onSwiftBroker");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_skink2':
                    var client_client_skink2_args = this.mainClientState.getArgs();
                    var client_client_skink2_technique_card = new DaleCard_10.DaleCard(client_client_skink2_args.technique_card_id);
                    this.addActionButton("confirm-button", _("Toss") + " " + client_client_skink2_technique_card.name, "onSkink2");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_shatteredRelic':
                case 'client_skink3':
                    this.addActionButtonCancelClient();
                    break;
                case 'spyglass':
                    this.addActionButton("confirm-button", _("Confirm selected"), "onSpyglass");
                    break;
                case 'historyLesson':
                    this.addActionButton("confirm-button", _("Confirm selected"), "onHistoryLesson");
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
                case 'client_spendSelectOpponentTechnique':
                    var client_spendSelectOpponentTechnique_args = this.mainClientState.getArgs();
                    this.addActionButtonsOpponent(this.onSpendSelectOpponentTechnique.bind(this), undefined, undefined, client_spendSelectOpponentTechnique_args.player_ids);
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
                case 'client_DEPRECATED_whirligig':
                    if (this.unique_opponent_id) {
                        this.addActionButton("confirm-button", _("Discard all"), "onDEPRECATED_Whirligig");
                    }
                    else {
                        this.addActionButtonsOpponentSelection(1);
                        this.addActionButton("confirm-button", _("Confirm"), "onDEPRECATED_Whirligig");
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'DEPRECATED_whirligig':
                    this.addActionButton("whirligig-button", _("Next"), "onDEPRECATED_WhirligigDoneLooking");
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
                    var _loop_10 = function (value) {
                        this_9.addActionButton("button-" + value, String(value), (function () { return _this.onClientBlindfold(value); }));
                    };
                    var this_9 = this;
                    for (var _j = 0, _k = [1, 2, 3, 4, 5]; _j < _k.length; _j++) {
                        var value = _k[_j];
                        _loop_10(value);
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'blindfold':
                    var blindfold_args = args;
                    var _loop_11 = function (value) {
                        this_10.addActionButton("button-" + value, String(value), (function () { return _this.onBlindfold(value); }));
                    };
                    var this_10 = this;
                    for (var _l = 0, _m = [1, 2, 3, 4, 5]; _l < _m.length; _l++) {
                        var value = _m[_l];
                        _loop_11(value);
                    }
                    var blindfold_cardName = new DaleCard_10.DaleCard(blindfold_args.card_id).name;
                    this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', _("Decide the value of ") + blindfold_cardName);
                    break;
                case 'client_DEPRECATED_blindfold':
                    if (!this.unique_opponent_id) {
                        this.addActionButtonsOpponentSelection(1);
                        this.addActionButton("confirm-button", _("Confirm"), "onDEPRECATED_Blindfold");
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'DEPRECATED_blindfold':
                    var DEPRECATED_blindfold_args = args;
                    var DEPRECATED_blindfold_label = '';
                    var DEPRECATED_blindfold_baseValue = 1;
                    var _loop_12 = function (value) {
                        if (DEPRECATED_blindfold_baseValue > 5) {
                            DEPRECATED_blindfold_label = "<span style='color:lightgreen'>".concat(value, "</span>");
                        }
                        else if (value == DEPRECATED_blindfold_baseValue) {
                            DEPRECATED_blindfold_label = String(value);
                        }
                        else {
                            DEPRECATED_blindfold_label = "".concat(DEPRECATED_blindfold_baseValue, " (<span style='color:lightgreen'>").concat(value, "</span>)");
                        }
                        this_11.addActionButton("button-" + value, DEPRECATED_blindfold_label, (function () { return _this.onDEPRECATED_BlindfoldGuess(value); }).bind(this_11));
                        DEPRECATED_blindfold_baseValue += 1;
                    };
                    var this_11 = this;
                    for (var _o = 0, _p = DEPRECATED_blindfold_args.possible_values; _o < _p.length; _o++) {
                        var value = _p[_o];
                        _loop_12(value);
                    }
                    break;
                case 'DEPRECATED_blindfoldDecideValue':
                    var DEPRECATED_blindfoldDecideValue_args = args;
                    var DEPRECATED_blindfoldDecideValue_label = '';
                    var DEPRECATED_blindfoldDecideValue_baseValue = 1;
                    var _loop_13 = function (value) {
                        if (value == DEPRECATED_blindfoldDecideValue_baseValue) {
                            DEPRECATED_blindfoldDecideValue_label = String(value);
                        }
                        else {
                            DEPRECATED_blindfoldDecideValue_label = "".concat(DEPRECATED_blindfoldDecideValue_baseValue, " (<span style='color:lightgreen'>").concat(value, "</span>)");
                        }
                        this_12.addActionButton("button-" + value, DEPRECATED_blindfoldDecideValue_label, (function () { return _this.onDEPRECATED_BlindfoldDecideValue(value); }).bind(this_12));
                        DEPRECATED_blindfoldDecideValue_baseValue += 1;
                    };
                    var this_12 = this;
                    for (var _q = 0, _r = DEPRECATED_blindfoldDecideValue_args.possible_values; _q < _r.length; _q++) {
                        var value = _r[_q];
                        _loop_13(value);
                    }
                    this.myHand.setSelectionMode('noneRetainSelection', undefined, 'daleofmerchants-wrap-default');
                    this.myHand.orderedSelection.setMaxSize(1);
                    this.myHand.selectItem(DEPRECATED_blindfoldDecideValue_args.card_id);
                    break;
                case 'chameleon_flexibleShopkeeper':
                    this.addActionButtonCancelClient();
                    break;
                case 'chameleon_reflection':
                    this.addActionButtonCancelClient();
                    break;
                case 'chameleon_goodoldtimes':
                    this.addActionButtonCancelClient();
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
                case 'client_DEPRECATED_marketDiscovery':
                    this.addActionButton("toss-button", _("Toss"), "onDEPRECATED_MarketDiscoveryToss");
                    this.addActionButton("purchase-button", _("Purchase"), "onDEPRECATED_MarketDiscoveryPurchase");
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
                case 'DEPRECATED_cheer':
                    if (!this.isSpectator && this.myDeck.size > 0) {
                        var DEPRECATED_cheer_args = args;
                        this.myDeck.setContent(DEPRECATED_cheer_args._private.cards.map(DaleCard_10.DaleCard.of));
                        this.myDeck.setSelectionMode('single');
                    }
                    break;
                case 'client_raffle':
                    this.addActionButtonsOpponentLeftRight(this.onRaffle.bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'charity':
                case 'rumours':
                case 'souvenirs':
                    var charity_args = args;
                    this.addActionButtonsOpponentSelection(1, charity_args.player_ids);
                    this.max_opponents = 1;
                    this.addActionButton("confirm-button", _("Confirm"), "onGiveCardsFromLimboToPlayers");
                    break;
                case 'client_DEPRECATED_tasters':
                    this.addActionButtonsOpponentLeftRight(this.onDEPRECATED_Tasters.bind(this));
                    this.addActionButtonCancelClient();
                    break;
                case 'tasters':
                    var tasters_args = args;
                    this.addActionButtonsOpponentSelection(1, tasters_args.player_ids);
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
                case 'client_DEPRECATED_historyLesson':
                    this.addActionButton("confirm-button", _("Confirm selected"), "onDEPRECATED_HistoryLesson");
                    this.addActionButtonCancelClient();
                    break;
                case 'DEPRECATED_culturalPreservation':
                    this.addActionButton("confirm-button", _("Confirm selected"), "onDEPRECATED_CulturalPreservation");
                    break;
                case 'client_DEPRECATED_sliceOfLife':
                    this.addActionButton("confirm-button", _("Confirm"), "onDEPRECATED_SliceOfLife");
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
                case 'client_velocipede':
                    this.addActionButton("toss-button", _("Toss"), "onVelocipedeToss");
                    if (this.marketDiscard.size > 0) {
                        this.addActionButton("skip-button", _("Skip"), "onVelocipedeTossSkip", undefined, false, 'gray');
                    }
                    else {
                        this.addActionButton("skip-button", _("Resolve without effect"), "onVelocipedeTossSkip", undefined, false, 'gray');
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'velocipede':
                    this.addActionButton("skip-button", _("Skip"), "onVelocipedeSwapSkip", undefined, false, 'gray');
                    break;
                case 'DEPRECATED_royalPrivilege':
                    this.addActionButton("toss-button", _("Purchase"), "onDEPRECATED_RoyalPrivilege");
                    this.addActionButton("skip-button", _("Skip"), "onDEPRECATED_RoyalPrivilegeSkip", undefined, false, 'gray');
                    break;
                case 'client_pompousProfessional':
                    this.addActionButton("animalfolk-button-0", this.getAnimalfolkName(0), function () { return _this.onPompousProfessional(0); });
                    var _loop_14 = function (animalfolk_id) {
                        var animalfolk_name = this_13.getAnimalfolkName(animalfolk_id);
                        this_13.addActionButton("animalfolk-button-" + animalfolk_id, animalfolk_name, function () { return _this.onPompousProfessional(animalfolk_id); });
                    };
                    var this_13 = this;
                    for (var _s = 0, _t = this.gamedatas.animalfolkIds; _s < _t.length; _s++) {
                        var animalfolk_id = _t[_s];
                        _loop_14(animalfolk_id);
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
                        this.myLimbo.setSelectionMode('multiple', 'pompousProfessional', 'daleofmerchants-wrap-technique', pompousProfessional_label, undefined, Infinity);
                        this.addActionButton("confirm-button", _("Confirm"), "onPompousProfessionalTakeAndDiscard");
                        this.restoreMainTitle();
                    }
                    else {
                        this.setMainTitle(_("No '") + pompousProfessional_args_1.animalfolk_name + _("' found. You may choose the order to discard the cards"));
                        this.myLimbo.setSelectionMode('multiple', 'pileBlue', 'daleofmerchants-wrap-technique', _("Discard cards"));
                        this.addActionButton("confirm-button", _("Discard"), "onPompousProfessionalDiscard");
                    }
                    break;
                case 'capuchin5a':
                    var capuchin5a_args = this.gamedatas.gamestate.args;
                    var capuchin5a_label = this.format_dale_icons(_("Choose cards to take (ICON) and discard (ICON)"), DaleIcons_10.DaleIcons.getCapuchin5aIcon(), DaleIcons_10.DaleIcons.getBluePileIcon(0));
                    this.myLimbo.setSelectionMode('multiplePrimarySecondary', 'capuchin5a', "daleofmerchants-wrap-technique", capuchin5a_label, 'pileBlue', 1);
                    this.addActionButton("confirm-button", _("Confirm"), "onCapuchin5a");
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
                    this.addActionButton("animalfolk-button-0", this.getAnimalfolkName(0), function () { return _this.onPeriscopeAnimalfolkId(0); });
                    var _loop_15 = function (animalfolk_id) {
                        var animalfolk_name = this_14.getAnimalfolkName(animalfolk_id);
                        this_14.addActionButton("animalfolk-button-" + animalfolk_id, animalfolk_name, function () { return _this.onPeriscopeAnimalfolkId(animalfolk_id); });
                    };
                    var this_14 = this;
                    for (var _u = 0, _v = this.gamedatas.animalfolkIds; _u < _v.length; _u++) {
                        var animalfolk_id = _v[_u];
                        _loop_15(animalfolk_id);
                    }
                    this.addActionButtonCancelClient();
                    break;
                case 'client_periscopeValue':
                    var _loop_16 = function (value) {
                        var callback = function () { return _this.onPeriscopeValue(value); };
                        this_15.addActionButton("animalfolk-button-" + value, value.toString(), callback.bind(this_15));
                    };
                    var this_15 = this;
                    for (var _w = 0, _x = [1, 2, 3, 4, 5]; _w < _x.length; _w++) {
                        var value = _x[_w];
                        _loop_16(value);
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
                case 'client_DEPRECATED_velocipede':
                    this.addActionButtonCancelClient();
                    break;
                case 'client_colourSwap':
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
                case 'fashionHint':
                    this.addActionButton("fashionHint-store-button", _("Toss"), "onFashionHintToss");
                    this.addActionButton("fashionHint-toss-button", _("Keep and end turn"), "onFashionHintKeep");
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
                case 'fishing':
                    this.addActionButton("confirm-button", _("Confirm"), "onFishing");
                    break;
                case 'client_groundbreakingIdea':
                    this.addActionButtonCancelClient();
                    break;
                case 'DEPRECATED_insight':
                    this.addActionButton("confirm-button", _("Confirm"), "onDEPRECATED_Insight");
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
                        for (var _y = 0, _z = Object.entries(this.playerDiscards); _y < _z.length; _y++) {
                            var _0 = _z[_y], player_id = _0[0], discard = _0[1];
                            discard.setSelectionMode('topIncludingEmpty', undefined, 'daleofmerchants-wrap-technique');
                        }
                    }
                    if (looseMarbles_args.die_value1 == DaleDie_2.DaleDie.DIE_DECK) {
                        for (var _1 = 0, _2 = Object.entries(this.playerDecks); _1 < _2.length; _1++) {
                            var _3 = _2[_1], player_id = _3[0], deck = _3[1];
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
                    break;
                case 'insightDiscard':
                    this.addActionButton("confirm-button", _("Discard"), "onInsightDiscard");
                    this.addActionButton("skip-button", _("Skip"), "onInsightSkip", undefined, false, 'gray');
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
                case 'serenade':
                    this.addActionButton("confirm-button", _("Confirm"), "onSerenade");
                    break;
                case 'client_capuchin3':
                    if (!this.unique_opponent_id) {
                        this.addActionButtonsOpponentSelection(1);
                    }
                    else {
                        this.opponent_ids = [this.unique_opponent_id];
                    }
                    this.addActionButton("confirm-button", _("Confirm"), "onCapuchin3");
                    this.addActionButtonCancelClient();
                    break;
                case 'capuchin4':
                    var capuchin4_args = args;
                    var capuchin4_label = capuchin4_args.opponent_name + "\'s " + _("card");
                    this.myLimbo.setSelectionMode('click', undefined, 'daleofmerchants-wrap-technique', capuchin4_label);
                    this.addActionButton("confirm-button", _("Take"), "onCapuchin4Take");
                    this.addActionButton("skip-button", _("Skip"), "onCapuchin4Skip", undefined, false, 'gray');
                    break;
                case 'client_DEPRECATED_capuchin5b_SINGLEDISCARD':
                    this.addActionButtonCancelClient(undefined, false);
                    break;
                case 'client_capuchin5b':
                    var client_capuchin5b_player_ids = [];
                    for (var _4 = 0, _5 = Object.entries(this.playerDiscards); _4 < _5.length; _4++) {
                        var _6 = _5[_4], player_id = _6[0], pile = _6[1];
                        if (+player_id != +this.player_id && pile.size > 0) {
                            client_capuchin5b_player_ids.push(+player_id);
                        }
                    }
                    this.addActionButtonsOpponent(this.onCapuchin5bOpenDiscard.bind(this), false, undefined, client_capuchin5b_player_ids);
                    this.addActionButtonCancelClient();
                    break;
                case 'client_skink1':
                    this.addActionButton("confirm-button", _("Confirm"), "onSkink1");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_skink5a':
                    this.addActionButton("confirm-button", _("Confirm"), "onSkink5a");
                    this.addActionButtonCancelClient();
                    break;
                case 'client_skink5b':
                    this.addActionButtonCancelClient();
                    break;
            }
        };
        DaleOfMerchants.prototype.getChameleonTargets = function (card, type_id) {
            var _a, _b, _c;
            var targets = [];
            switch (type_id !== null && type_id !== void 0 ? type_id : card.effective_type_id) {
                case DaleCard_10.DaleCard.CT_FLEXIBLESHOPKEEPER:
                    targets = this.myStall.getCardsInStack(this.myStall.getNumberOfStacks() - 1);
                    break;
                case DaleCard_10.DaleCard.CT_REFLECTION:
                    for (var _i = 0, _d = Object.entries(this.playerDiscards); _i < _d.length; _i++) {
                        var _e = _d[_i], player_id = _e[0], discard_pile = _e[1];
                        var deck = this.playerDecks[+player_id];
                        if (+player_id != +this.player_id) {
                            if (player_id == "0") {
                                this.showMessage("CT_REFLECTION does not work properly for player_id == 0", "Error");
                            }
                            if (discard_pile.size > 0) {
                                var target = (_a = discard_pile.topCardHTML) !== null && _a !== void 0 ? _a : discard_pile.placeholderHTML;
                                target.dataset['target_id'] = player_id;
                                targets.push(target);
                            }
                            if (deck.size > 0 || discard_pile.size > 0) {
                                var target = (_b = deck.topCardHTML) !== null && _b !== void 0 ? _b : deck.placeholderHTML;
                                target.dataset['target_id'] = "-" + player_id;
                                targets.push(target);
                            }
                        }
                    }
                    break;
                case DaleCard_10.DaleCard.CT_GOODOLDTIMES:
                    if (this.marketDiscard.size > 0) {
                        targets.push(this.marketDiscard.peek());
                    }
                    if (this.marketDeck.size > 0 || this.marketDiscard.size > 0) {
                        var target = (_c = this.marketDeck.topCardHTML) !== null && _c !== void 0 ? _c : this.marketDeck.placeholderHTML;
                        target.dataset['target_id'] = '0';
                        targets.push(target);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SOUNDDETECTORS:
                    for (var _f = 0, _g = this.myLimbo.getAllDaleCards(); _f < _g.length; _f++) {
                        var card_1 = _g[_f];
                        targets.push(card_1);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_TRENDSETTING:
                    for (var _h = 0, _j = this.market.getCards(); _h < _j.length; _h++) {
                        var card_2 = _j[_h];
                        targets.push(card_2);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SEEINGDOUBLES:
                    var items = this.myHand.getAllItems();
                    for (var _k = 0, items_1 = items; _k < items_1.length; _k++) {
                        var item = items_1[_k];
                        if (item.id != card.id) {
                            var card_3 = new DaleCard_10.DaleCard(item.id);
                            targets.push(card_3);
                        }
                    }
                    break;
            }
            return targets;
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
            else {
                var parent_1 = $('overall_player_board_' + player_id);
                var daleCard = DaleCard_10.DaleCard.of(card);
                var div_1 = daleCard.toDiv(parent_1);
                this.placeOnObject(div_1.id, 'overall_player_board_' + player_id);
                setTimeout((function () {
                    dojo.fadeOut({ node: div_1, onEnd: function (node) { dojo.destroy(node); } }).play();
                }), 250);
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
        DaleOfMerchants.prototype.addActionButtonCancelClient = function (label, undo_schedule) {
            if (undo_schedule === void 0) { undo_schedule = true; }
            var method = undo_schedule ? "onCancelClient" : "onCancelClientWithoutUndoingSchedule";
            this.addActionButton("cancel-button", label !== null && label !== void 0 ? label : _("Cancel"), method, undefined, false, 'gray');
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
            var _loop_17 = function (opponent_id) {
                if (include_player || opponent_id != this_16.player_id) {
                    var name_1 = this_16.gamedatas.players[opponent_id].name;
                    var color = this_16.gamedatas.players[opponent_id].color;
                    var label = "<span style=\"font-weight:bold;color:#".concat(color, ";\">").concat(name_1).concat(suffix, "</span>");
                    this_16.addActionButton("opponent-selection-button-" + opponent_id, label, function () { onOpponentHandler(+opponent_id); }, undefined, false, 'gray');
                }
            };
            var this_16 = this;
            for (var _i = 0, player_ids_1 = player_ids; _i < player_ids_1.length; _i++) {
                var opponent_id = player_ids_1[_i];
                _loop_17(opponent_id);
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
        DaleOfMerchants.prototype.getColourSwapHandTargets = function (colourSwap_card_id) {
            var cards = [];
            var values = new Set();
            for (var player_id in this.gamedatas.players) {
                for (var _i = 0, _a = this.playerStalls[player_id].getCardsInStall(); _i < _a.length; _i++) {
                    var stallCard = _a[_i];
                    values.add(stallCard.original_value);
                }
            }
            for (var _b = 0, _c = this.myHand.getAllItems(); _b < _c.length; _b++) {
                var item = _c[_b];
                var handCard = new DaleCard_10.DaleCard(item.id);
                var isOtherAnimalfolk = handCard.isAnimalfolk() && handCard.id != colourSwap_card_id;
                if (isOtherAnimalfolk && values.has(handCard.effective_value)) {
                    cards.push(handCard);
                }
            }
            return cards;
        };
        DaleOfMerchants.prototype.getColourSwapStallTargets = function (handCard) {
            var stallCards = [];
            for (var player_id in this.gamedatas.players) {
                for (var _i = 0, _a = this.playerStalls[player_id].getCardsInStall(); _i < _a.length; _i++) {
                    var stallCard = _a[_i];
                    if (stallCard.original_value == handCard.effective_value) {
                        stallCards.push(stallCard);
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
        DaleOfMerchants.prototype.onEndTurn = function () {
            this.bgaPerformAction('actEndTurn', {});
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
                        new TargetingLine_1.TargetingLine(card, calculations_targets, 'daleofmerchants-line-source-technique', 'daleofmerchants-line-target-technique', 'daleofmerchants-line-technique', function (source_id) { return _this.onCalculationsDoubleClick(source_id); }, function (source_id, target_id) { return _this.onCalculationsSwap(source_id, target_id); });
                    }
                    break;
                case 'client_shoppingJourney':
                    this.resolveTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'DEPRECATED_tasters':
                    this.bgaPerformAction('actDEPRECATED_Tasters', {
                        card_id: card.id
                    });
                    break;
                case 'replacement':
                    this.bgaPerformAction('actReplacement', {
                        card_id: card.id
                    });
                    break;
                case 'DEPRECATED_royalPrivilege':
                    var DEPRECATED_royalPrivilege_selected = this.market.getSelected(pos);
                    this.market.unselectAll();
                    if (!DEPRECATED_royalPrivilege_selected) {
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
                case 'postCleanUpPhase':
                    this.onClickPassive(card);
                    break;
                case 'client_build':
                    this.onBuildSelectionChanged();
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
                case 'insightTake':
                    this.bgaPerformAction('actInsightTake', {
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
                case 'client_DEPRECATED_marketDiscovery':
                    if (pile === this.marketDeck) {
                        this.onDEPRECATED_MarketDiscoveryToss();
                    }
                    else if (pile === this.marketDiscard) {
                        this.onDEPRECATED_MarketDiscoveryPurchase();
                    }
                    break;
                case 'client_velocipede':
                    if (pile === this.marketDeck) {
                        this.onVelocipedeToss();
                    }
                    else if (pile === this.marketDiscard) {
                        this.onVelocipedeTossSkip();
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
                case 'skink4':
                    this.bgaPerformAction('actSkink4', {
                        card_id: card.id
                    });
                    break;
                case 'DEPRECATED_cheer':
                    this.bgaPerformAction('actDEPRECATED_Cheer', {
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
                case 'insightDiscard':
                    this.onInsightDiscard();
                    break;
                case 'client_spendSelectOpponentTechnique':
                    this.onSpendSelectOpponentTechnique(pile.getPlayerId());
                    break;
                case 'client_DEPRECATED_capuchin5b_SINGLEDISCARD':
                    this.playTechniqueCard(__assign({ opponent_id: this.mainClientState.getArgs().opponent_id, card_id: card.id }, this.mainClientState.getSpendArgs()));
                    break;
                case 'client_capuchin5b':
                    this.playTechniqueCard(__assign({ opponent_id: pile.getPlayerId(), card_id: card.id }, this.mainClientState.getSpendArgs()));
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
            }
        };
        DaleOfMerchants.prototype.onSelectHandCard = function (card_id) {
            var _this = this;
            var _a, _b;
            console.warn("onSelectHandCard: " + card_id);
            var card = new DaleCard_10.DaleCard(card_id);
            switch (this.gamedatas.gamestate.name) {
                case 'postCleanUpPhase':
                    this.onClickPassive(card);
                    break;
                case 'client_technique':
                    if (card.isTechnique()) {
                        this.onClickTechnique(card);
                    }
                    else {
                        this.onClickPassive(card);
                    }
                    break;
                case 'client_purchase':
                    this.onFundsSelectionChanged();
                    break;
                case 'client_build':
                case 'bonusBuild':
                    if (DaleCard_10.DaleCard.countGlobalEffects(DaleCard_10.DaleCard.CT_CULTURALPRESERVATION) > 0) {
                        this.myHand.unselectItem(card_id);
                        this.showMessage(_("Cultural Preservation: you may only build using cards from your discard"), "error");
                    }
                    else {
                        this.onBuildSelectionChanged();
                    }
                    break;
                case 'client_shatteredRelic':
                    this.playTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'client_skink2':
                    this.resolveTechniqueCard({
                        card_id: card.id
                    });
                    break;
                case 'client_skink3':
                    this.resolveTechniqueCard({
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
                case 'client_DEPRECATED_blindfold':
                    if (this.unique_opponent_id) {
                        this.onDEPRECATED_Blindfold(card.id);
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
                case 'client_royalPrivilege':
                    this.playPassiveCard({
                        card_id: card.id
                    });
                    break;
                case 'client_replacement':
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
                    break;
                case 'client_colourSwap':
                    var client_colourSwap_targets = this.getColourSwapStallTargets(card);
                    if (client_colourSwap_targets.length == 0) {
                        this.showMessage(_("No card in any oppponent's stall matches this card's value") + " (".concat(card.effective_value, ")"), "error");
                        return;
                    }
                    var client_colourSwap_label = _("Swap '") + card.name + _("' with an equal valued card in another player\'s stall");
                    this.setMainTitle(client_colourSwap_label);
                    this.myHand.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', client_colourSwap_label);
                    new TargetingLine_1.TargetingLine(card, client_colourSwap_targets, "daleofmerchants-line-source-technique", "daleofmerchants-line-target-technique", "daleofmerchants-line-technique", function (source_id) { return _this.onCancelClient(); }, function (source_id, target_id) { return _this.onColourSwap(source_id, target_id); });
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
                case 'travelingEquipment':
                    this.bgaPerformAction('actTravelingEquipment', {
                        toss_card_id: card.id,
                    });
                    break;
                case 'accident':
                    this.bgaPerformAction('actAccident', {
                        card_id: card.id,
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
                case 'soundDetectors':
                    this.onSoundDetectors(card.id);
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
                case 'capuchin4':
                    this.onCapuchin4Take();
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
                case 'postCleanUpPhase':
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
                case DaleCard_10.DaleCard.CT_DEPRECATED_INSIGHT:
                    this.clientFinishTechnique('resolveTechniqueCard', card.id, 2);
                    break;
                case DaleCard_10.DaleCard.CT_INSIGHT:
                    this.clientFinishTechnique('resolveTechniqueCard', card.id, 3);
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
                case DaleCard_10.DaleCard.CT_SKINK1:
                    fizzle = this.myDiscard.size == 0;
                    this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_skink1', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_SKINK2:
                    this.clientTriggerTechnique('client_skink2', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_SKINK3:
                    if (this.myHand.count() == 1) {
                        this.clientTriggerTechnique('client_choicelessTriggerTechniqueCard', card.id);
                    }
                    else {
                        this.clientTriggerTechnique('client_skink3', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SKINK4:
                    fizzle = (this.myDiscard.size + this.myDeck.size) == 0;
                    if (fizzle) {
                        this.clientTriggerTechnique('client_triggerFizzle', card.id);
                    }
                    else {
                        this.clientTriggerTechnique('client_choicelessTriggerTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_SKINK5A:
                    var skink5a_nbr = Math.min(2, this.myHand.count());
                    fizzle = skink5a_nbr == 0;
                    this.clientTriggerTechnique(fizzle ? 'client_triggerFizzle' : 'client_skink5a', card.id, { nbr: skink5a_nbr });
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
            var _this = this;
            var args = this.mainClientState.args;
            switch (this.gamedatas.gamestate.name) {
                case 'client_purchase':
                    args.funds_card_ids = this.myHand.orderedSelection.get();
                    break;
                case 'client_deprecated_essentialPurchase':
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
            else if (!this.mainClientState.stackIncludes('client_deprecated_essentialPurchase') && new DaleCard_10.DaleCard(card_id).effective_type_id == DaleCard_10.DaleCard.CT_DEPRECATED_ESSENTIALPURCHASE) {
                this.mainClientState.enterOnStack('client_deprecated_essentialPurchase', args);
            }
            else {
                this.bgaPerformAction('actPurchase', {
                    funds_card_ids: this.arrayToNumberList(args.funds_card_ids),
                    market_card_id: card_id,
                    args: JSON.stringify(args.optionalArgs)
                }).then(function () {
                    while (_this.gamedatas.gamestate.name != 'client_purchase') {
                        _this.mainClientState.leave();
                    }
                });
            }
        };
        DaleOfMerchants.prototype.onDEPRECATED_MarketDiscoveryToss = function () {
            this.playPassiveCard({});
        };
        DaleOfMerchants.prototype.onDEPRECATED_MarketDiscoveryPurchase = function (market_discovery_card_id) {
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
            var argsPassive = this.mainClientState.args;
            (_a = this.bgaPerformAction('actUsePassiveAbility', {
                card_id: argsPassive.passive_card_id,
                args: JSON.stringify(args)
            })) === null || _a === void 0 ? void 0 : _a.catch(function () {
                if (argsPassive === null || argsPassive === void 0 ? void 0 : argsPassive.keep_passive_selected) {
                    _this.setPassiveSelected(argsPassive.passive_card_id, false);
                }
            });
            this.mainClientState.leave();
            if (argsPassive.keep_passive_selected) {
                this.setPassiveSelected(argsPassive.passive_card_id, true);
            }
        };
        DaleOfMerchants.prototype.playTechniqueCardWithServerState = function (args) {
            this.bgaPerformAction('actPlayTechniqueCard', {
                card_id: this.mainClientState.args.technique_card_id,
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
        DaleOfMerchants.prototype.clientScheduleSpendTechnique = function (next, technique_card_id, cost, cost_max, next_args) {
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
                    next: next,
                    next_args: next_args
                });
            }
            else {
                this.clientScheduleTechnique('client_spendx', technique_card_id, {
                    cost_min: cost,
                    cost_max: cost_max,
                    cost_displayed: (cost_max == Infinity) ? "".concat(cost, "+") : "".concat(cost, " - ").concat(cost_max),
                    next: next,
                    next_args: next_args
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
                args: JSON.stringify(args)
            });
            this.mainClientState.leaveAndDontReturn();
        };
        DaleOfMerchants.prototype.resolveTechniqueCard = function (args) {
            var card_id = this.mainClientState.args.technique_card_id;
            this.bgaPerformAction('actFullyResolveTechniqueCard', {
                card_id: card_id,
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
                case DaleCard_10.DaleCard.CT_ESSENTIALPURCHASE:
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
                case DaleCard_10.DaleCard.CT_SUDDENNAP:
                case DaleCard_10.DaleCard.CT_SABOTAGE:
                case DaleCard_10.DaleCard.CT_DELICACY:
                case DaleCard_10.DaleCard.CT_UMBRELLA:
                case DaleCard_10.DaleCard.CT_CAPUCHIN1:
                    if (this.unique_opponent_id) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_selectOpponentTechnique', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_DEPRECATED_FRESHSTART:
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
                        var card_4 = _c[_b];
                        if (card_4.isAnimalfolk()) {
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
                case DaleCard_10.DaleCard.CT_DEPRECATED_WHIRLIGIG:
                    fizzle = this.myHand.count() == 1;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_DEPRECATED_whirligig', card.id);
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
                case DaleCard_10.DaleCard.CT_SOUVENIRS:
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
                    fizzle = (this.marketDiscard.size + this.marketDeck.size) == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_blindfold', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_DEPRECATED_BLINDFOLD:
                    fizzle = this.myHand.count() == 1;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_DEPRECATED_blindfold', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_TIRELESSTINKERER:
                case DaleCard_10.DaleCard.CT_RIGOROUSCHRONICLER:
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
                case DaleCard_10.DaleCard.CT_SPYGLASS:
                case DaleCard_10.DaleCard.CT_HISTORYLESSON:
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
                        var card_5 = _e[_d];
                        if (card_5.isJunk() && houseCleaningJunk < 3) {
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
                    var DEPRECATED_tasters_nbr = this.market.getCards().length;
                    fizzle = DEPRECATED_tasters_nbr == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else if (this.unique_opponent_id || DEPRECATED_tasters_nbr == 1) {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_DEPRECATED_tasters', card.id);
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
                case DaleCard_10.DaleCard.CT_DEPRECATED_HISTORYLESSON:
                    fizzle = this.myDiscard.size == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_DEPRECATED_historyLesson', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_DEPRECATED_CULTURALPRESERVATION:
                    fizzle = (this.myDiscard.size + this.myDeck.size) == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_DEPRECATED_VORACIOUSCONSUMER:
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
                case DaleCard_10.DaleCard.CT_VELOCIPEDE:
                    fizzle = (this.marketDiscard.size + this.marketDeck.size) == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_velocipede', card.id);
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
                case DaleCard_10.DaleCard.CT_DEPRECATED_VELOCIPEDE:
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
                        this.mainClientState.enterOnStack('client_DEPRECATED_velocipede', { technique_card_id: card.id });
                    }
                    break;
                case DaleCard_10.DaleCard.CT_COLOURSWAP:
                    fizzle = this.getColourSwapHandTargets(card.id).length == 0;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_colourSwap', card.id);
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
                case DaleCard_10.DaleCard.CT_SERENADE:
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
                    this.clientScheduleSpendTechnique('playTechniqueCardWithServerState', card.id, 1);
                    break;
                case DaleCard_10.DaleCard.CT_ICETRADE:
                    this.clientScheduleSpendTechnique('playTechniqueCard', card.id, 1, Infinity);
                    break;
                case DaleCard_10.DaleCard.CT_TRAVELINGEQUIPMENT:
                    this.clientScheduleSpendTechnique('playTechniqueCardWithServerState', card.id, 2);
                    break;
                case DaleCard_10.DaleCard.CT_FISHING:
                    this.clientScheduleSpendTechnique('playTechniqueCardWithServerState', card.id, 1, Infinity);
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
                case DaleCard_10.DaleCard.CT_BOUQUETS:
                    switch (this.myClock.getClock()) {
                        case PlayerClock_2.PlayerClock.CLOCK_DAWN:
                            console.warn("Dawn: DaleCard.CT_BOUQUETS == DaleCard.CT_SAFETYPRECAUTION");
                            fizzle = true;
                            if (this.myStall.getNumberOfStacks() > 0) {
                                fizzle = false;
                            }
                            if (fizzle) {
                                this.clientScheduleTechnique('client_fizzle', card.id);
                            }
                            else {
                                this.mainClientState.enterOnStack('client_safetyPrecaution', { technique_card_id: card.id });
                            }
                            break;
                        case PlayerClock_2.PlayerClock.CLOCK_DAY:
                            console.warn("Day: DaleCard.CT_BOUQUETS == DaleCard.CT_ACORN");
                            fizzle = true;
                            for (var player_id in this.gamedatas.players) {
                                if (+player_id != +this.player_id && this.playerStalls[player_id].getNumberOfStacks() > 0) {
                                    fizzle = false;
                                    break;
                                }
                            }
                            if (fizzle) {
                                this.clientScheduleTechnique('client_fizzle', card.id);
                            }
                            else {
                                this.mainClientState.enterOnStack('client_acorn', { technique_card_id: card.id });
                            }
                            break;
                        case PlayerClock_2.PlayerClock.CLOCK_NIGHT:
                            console.warn("Night: DaleCard.CT_BOUQUETS == DaleCard.CT_GIFTVOUCHER");
                            fizzle = this.market.getCards().length == 0;
                            if (fizzle) {
                                this.clientScheduleTechnique('client_fizzle', card.id);
                            }
                            else {
                                this.mainClientState.enterOnStack('client_giftVoucher', { technique_card_id: card.id });
                            }
                            break;
                        default:
                            throw new Error("Bouquets played with an invalid clock");
                    }
                    break;
                case DaleCard_10.DaleCard.CT_GENERATIONCHANGE:
                    this.clientScheduleTechnique('client_generationChange', card.id, {
                        nbr: Math.min(2, this.myDiscard.size)
                    });
                    break;
                case DaleCard_10.DaleCard.CT_ACCIDENT:
                    fizzle = (this.marketDeck.size + this.marketDiscard.size + this.myHand.count()) <= 1;
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_CAPUCHIN3:
                    this.clientScheduleTechnique('client_capuchin3', card.id);
                    break;
                case DaleCard_10.DaleCard.CT_CAPUCHIN4:
                case DaleCard_10.DaleCard.CT_CAPUCHIN5A:
                    if (this.unique_opponent_id) {
                        this.clientScheduleSpendTechnique('playTechniqueCardWithServerState', card.id, 2);
                    }
                    else {
                        this.clientScheduleSpendTechnique('client_spendSelectOpponentTechnique', card.id, 2);
                    }
                    break;
                case DaleCard_10.DaleCard.CT_CAPUCHIN5B:
                    fizzle = true;
                    for (var _o = 0, _p = Object.entries(this.playerDiscards); _o < _p.length; _o++) {
                        var _q = _p[_o], player_id = _q[0], pile = _q[1];
                        if (+player_id != +this.player_id && pile.size > 0) {
                            fizzle = false;
                        }
                    }
                    if (fizzle) {
                        this.clientScheduleTechnique('client_fizzle', card.id);
                    }
                    else {
                        this.clientScheduleSpendTechnique('client_capuchin5b', card.id, 2);
                    }
                    break;
                default:
                    this.clientScheduleTechnique('client_choicelessTechniqueCard', card.id);
                    break;
            }
        };
        DaleOfMerchants.prototype.onClickPassive = function (card, postCleanUp) {
            if (postCleanUp === void 0) { postCleanUp = false; }
            var type_id = card.effective_type_id;
            if (type_id != DaleCard_10.DaleCard.CT_DEPRECATED_MARKETDISCOVERY) {
                if (card.isPassiveUsed()) {
                    this.showMessage(_("This passive's ability was already used"), 'error');
                    return;
                }
            }
            switch (card.effective_type_id) {
                case DaleCard_10.DaleCard.CT_DEPRECATED_MARKETDISCOVERY:
                    if (this.gamedatas.gamestate.name == 'postCleanUpPhase') {
                        if (card.isPassiveUsed()) {
                            this.showMessage(_("This passive's ability was already used"), 'error');
                        }
                        else {
                            this.mainClientState.enterOnStack('client_DEPRECATED_marketDiscovery', { passive_card_id: card.id });
                            this.onDEPRECATED_MarketDiscoveryToss();
                        }
                    }
                    else if (card.isPassiveUsed()) {
                        this.onDEPRECATED_MarketDiscoveryPurchase(card.id);
                    }
                    else {
                        this.mainClientState.enterOnStack('client_DEPRECATED_marketDiscovery', { passive_card_id: card.id });
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
                case DaleCard_10.DaleCard.CT_DEPRECATED_SLICEOFLIFE:
                    if (this.myHand.count() < 2) {
                        this.showMessage(_("Not enough cards to discard"), 'error');
                        return;
                    }
                    this.mainClientState.enterOnStack('client_DEPRECATED_sliceOfLife', { passive_card_id: card.id, disable_cancel_on_click: true });
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
                        var card_6 = _a[_i];
                        if (card_6.isJunk() && barricadeJunk < 2) {
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
                case DaleCard_10.DaleCard.CT_FLEXIBLESHOPKEEPER:
                    this.mainClientState.enterOnStack('chameleon_flexibleShopkeeper', { passive_card_id: card.id });
                    break;
                case DaleCard_10.DaleCard.CT_REFLECTION:
                    this.mainClientState.enterOnStack('chameleon_reflection', { passive_card_id: card.id });
                    break;
                case DaleCard_10.DaleCard.CT_GOODOLDTIMES:
                    this.mainClientState.enterOnStack('chameleon_goodoldtimes', { passive_card_id: card.id });
                    break;
                case DaleCard_10.DaleCard.CT_SOUNDDETECTORS:
                    if (this.unique_opponent_id) {
                        this.mainClientState.enterOnStack('client_choicelessPassiveCard', { passive_card_id: card.id, keep_passive_selected: true });
                    }
                    else {
                        this.mainClientState.enterOnStack('client_selectOpponentPassive', { passive_card_id: card.id, keep_passive_selected: true });
                    }
                    break;
                case DaleCard_10.DaleCard.CT_TRENDSETTING:
                    this.mainClientState.enterOnStack('chameleon_trendsetting', { passive_card_id: card.id });
                    break;
                case DaleCard_10.DaleCard.CT_SEEINGDOUBLES:
                    this.mainClientState.enterOnStack('chameleon_seeingdoubles', { passive_card_id: card.id });
                    break;
                case DaleCard_10.DaleCard.CT_ROYALPRIVILEGE:
                    this.mainClientState.enterOnStack('client_royalPrivilege', { passive_card_id: card.id });
                    break;
                case DaleCard_10.DaleCard.CT_SKINK5B:
                    if (this.myDiscard.size == 0) {
                        this.showMessage(_("This passive has no effect"), "error");
                    }
                    else {
                        this.mainClientState.enterOnStack('client_skink5b', { passive_card_id: card.id, disable_cancel_on_click: true, card_name: this.myDiscard.peek().name });
                    }
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
            if (DaleCard_10.DaleCard.countGlobalEffects(DaleCard_10.DaleCard.CT_CULTURALPRESERVATION) > 0) {
                this.myDiscard.setSelectionMode('multiple', 'build', "daleofmerchants-wrap-build", 999);
                return;
            }
            var count_nostalgic_items = 0;
            for (var _i = 0, card_ids_2 = card_ids; _i < card_ids_2.length; _i++) {
                var card_id = card_ids_2[_i];
                var card_7 = new DaleCard_10.DaleCard(card_id);
                if (card_7.effective_type_id == DaleCard_10.DaleCard.CT_NOSTALGICITEM) {
                    count_nostalgic_items++;
                }
            }
            if (count_nostalgic_items > 0) {
                for (var _a = 0, _b = this.myDiscard.orderedSelection.get(); _a < _b.length; _a++) {
                    var card_id = _b[_a];
                    var card_8 = new DaleCard_10.DaleCard(card_id);
                    if (card_8.effective_type_id == DaleCard_10.DaleCard.CT_NOSTALGICITEM) {
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
                args: JSON.stringify(args.optionalArgs)
            }).then(function () {
                _this.buildActionSuccessful = true;
                while (_this.gamedatas.gamestate.name != 'client_build' && _this.gamedatas.gamestate.name != 'bonusBuild') {
                    _this.mainClientState.leave();
                }
                _this.buildActionSuccessful = false;
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
            TargetingLine_1.TargetingLine.removeAll();
            if ('technique_card_id' in this.mainClientState.args && !('is_trigger' in this.mainClientState.args)) {
                var card_id = this.mainClientState.args.technique_card_id;
                var card = new DaleCard_10.DaleCard(card_id);
                var type_id = card.effective_type_id;
                if ((type_id != DaleCard_10.DaleCard.CT_ACORN && type_id != DaleCard_10.DaleCard.CT_GIFTVOUCHER && type_id != DaleCard_10.DaleCard.CT_SAFETYPRECAUTION && type_id != DaleCard_10.DaleCard.CT_DEPRECATED_VELOCIPEDE && type_id != DaleCard_10.DaleCard.CT_BOUQUETS) || this.mainClientState.name == 'client_fizzle') {
                    this.myHand.addDaleCardToStock(card, this.mySchedule.control_name + '_item_' + card_id);
                    this.mySchedule.removeFromStockByIdNoAnimation(card_id);
                    this.myHandSize.incValue(1);
                }
            }
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onCancelClientWithoutUndoingSchedule = function () {
            TargetingLine_1.TargetingLine.removeAll();
            this.mainClientState.leave();
        };
        DaleOfMerchants.prototype.onChameleon = function (target_id) {
            switch (this.mainClientState.name) {
                case 'chameleon_reflection':
                    var opponent_id = Math.abs(target_id);
                    var should_discard = target_id < 0;
                    this.playPassiveCard({
                        opponent_id: opponent_id,
                        should_discard: should_discard
                    });
                    break;
                case 'chameleon_flexibleShopkeeper':
                case 'chameleon_goodoldtimes':
                case 'chameleon_trendsetting':
                case 'chameleon_seeingdoubles':
                    this.playPassiveCard({
                        target_id: target_id
                    });
                    break;
                default:
                    console.error("onChameleon should not be called in ".concat(this.mainClientState.name));
                    break;
            }
        };
        DaleOfMerchants.prototype.onSoundDetectors = function (target_id) {
            this.bgaPerformAction('actSoundDetectors', {
                card_id: target_id,
            });
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
            if (card_ids.length == 0) {
                this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
                return;
            }
            this.bgaPerformAction('actSpyglass', {
                card_ids: this.arrayToNumberList(card_ids)
            });
        };
        DaleOfMerchants.prototype.onHistoryLesson = function () {
            var card_ids = this.myLimbo.orderedSelection.get();
            if (card_ids.length == 0) {
                this.showMessage(_("Select at least 1 card to place into your hand"), 'error');
                return;
            }
            this.bgaPerformAction('actHistoryLesson', {
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
        DaleOfMerchants.prototype.onDEPRECATED_Whirligig = function () {
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
        DaleOfMerchants.prototype.onDEPRECATED_WhirligigDoneLooking = function () {
            this.bgaPerformAction('actDEPRECATED_Whirligig', {});
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
        DaleOfMerchants.prototype.onClientBlindfold = function (value) {
            this.playTechniqueCard({
                value: value,
            });
        };
        DaleOfMerchants.prototype.onBlindfold = function (value) {
            this.bgaPerformAction('actBlindfold', {
                value: value
            });
        };
        DaleOfMerchants.prototype.onDEPRECATED_Blindfold = function (card_id) {
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
        DaleOfMerchants.prototype.onDEPRECATED_BlindfoldGuess = function (value) {
            this.bgaPerformAction('actDEPRECATED_Blindfold', {
                value: value
            });
        };
        DaleOfMerchants.prototype.onDEPRECATED_BlindfoldDecideValue = function (value) {
            console.warn("onDEPRECATED_BlindfoldDecideValue " + value);
            this.bgaPerformAction('actDEPRECATED_BlindfoldDecideValue', {
                value: value
            });
        };
        DaleOfMerchants.prototype.onCalculationsDoubleClick = function (click_card_id) {
            var args = this.mainClientState.args;
            args.card_id_last = click_card_id;
            this.onCalculations();
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
            if (items.length == 2 && args.player_ids.length == 2) {
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
        DaleOfMerchants.prototype.onDEPRECATED_Tasters = function (reverse_direction) {
            console.warn("onDEPRECATED_Tasters", reverse_direction ? "right" : "left");
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
            this.playTechniqueCard({
                card_id: card_id
            });
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
        DaleOfMerchants.prototype.onDEPRECATED_HistoryLesson = function () {
            this.playTechniqueCard({
                card_ids: this.myDiscard.orderedSelection.get()
            });
        };
        DaleOfMerchants.prototype.onDEPRECATED_CulturalPreservation = function () {
            this.bgaPerformAction('actDEPRECATED_CulturalPreservation', {
                card_ids: this.arrayToNumberList(this.myDeck.orderedSelection.get())
            });
        };
        DaleOfMerchants.prototype.onDEPRECATED_SliceOfLife = function () {
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
        DaleOfMerchants.prototype.onVelocipedeToss = function () {
            this.playTechniqueCardWithServerState({
                toss: true
            });
        };
        DaleOfMerchants.prototype.onVelocipedeTossSkip = function () {
            this.playTechniqueCardWithServerState({
                toss: false
            });
        };
        DaleOfMerchants.prototype.onVelocipedeSwap = function (card_id) {
            this.bgaPerformAction('actVelocipede', {
                card_id: card_id
            });
        };
        DaleOfMerchants.prototype.onVelocipedeSwapSkip = function () {
            console.warn("onVelocipedeSwapSkip");
            this.bgaPerformAction('actVelocipede', {
                card_id: -1
            });
        };
        DaleOfMerchants.prototype.onDEPRECATED_RoyalPrivilege = function () {
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
            this.bgaPerformAction('actDEPRECATED_RoyalPrivilege', {
                toss_card_id: toss_card_id,
                market_card_id: market_card_id
            });
        };
        DaleOfMerchants.prototype.onDEPRECATED_RoyalPrivilegeSkip = function () {
            this.bgaPerformAction('actDEPRECATED_RoyalPrivilege', {
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
        DaleOfMerchants.prototype.onColourSwap = function (card_id, target_id) {
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
        DaleOfMerchants.prototype.onFashionHintToss = function () {
            this.bgaPerformAction('actFashionHint', {
                is_tossing: true
            });
        };
        DaleOfMerchants.prototype.onFashionHintKeep = function () {
            this.bgaPerformAction('actFashionHint', {
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
            for (var _i = 0, card_ids_3 = card_ids; _i < card_ids_3.length; _i++) {
                var card_id = card_ids_3[_i];
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
                var anchor_args = this.gamedatas.gamestate.args;
                this.mainClientState.enterOnStack('client_anchor', {
                    opponent_id: opponent_id,
                    opponent_name: this.gamedatas.players[opponent_id].name,
                    discard_card_id: card_id,
                    card_name: anchor_args.resolving_card_name
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
            var _a;
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
                    this.mainClientState.enter(args.next, __assign({ technique_card_id: args.technique_card_id, spend_coins: spend_coins, spend_card_ids: spend_card_ids }, ((_a = args.next_args) !== null && _a !== void 0 ? _a : {})));
                    break;
            }
        };
        DaleOfMerchants.prototype.onResourcefulAlly = function () {
            this.bgaPerformAction('actResourcefulAlly', {
                card_ids: this.arrayToNumberList(this.myDiscard.orderedSelection.get())
            });
        };
        DaleOfMerchants.prototype.onFishing = function () {
            var _this = this;
            var fishing_args = this.gamedatas.gamestate.args;
            if (fishing_args.die_value != this.myDiscard.orderedSelection.get().length) {
                this.showMessage(_("Please select exactly ") + fishing_args.die_value + _(" card(s) from your discard"), 'error');
                this.myDiscard.openPopin();
                return;
            }
            this.bgaPerformAction('actFishing', {
                card_ids: this.arrayToNumberList(this.myDiscard.orderedSelection.get())
            })
                .then(function () { return _this.myDiscard.setSelectionMode('none'); });
        };
        DaleOfMerchants.prototype.onDEPRECATED_Insight = function () {
            this.bgaPerformAction('actDEPRECATED_Insight', {
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
        DaleOfMerchants.prototype.onInsightDiscard = function () {
            this.bgaPerformAction('actInsightDiscard', {
                skip: false
            });
        };
        DaleOfMerchants.prototype.onInsightSkip = function () {
            this.bgaPerformAction('actInsightDiscard', {
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
        DaleOfMerchants.prototype.onSerenade = function () {
            var card_ids = this.myHand.orderedSelection.get();
            this.bgaPerformAction('actSerenade', {
                card_ids: this.arrayToNumberList(card_ids)
            });
        };
        DaleOfMerchants.prototype.onClickActionButtonPostCleanUpPhase = function (evt) {
            var _a;
            var button_id = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.id;
            if (!button_id) {
                throw new Error("Invalid button id: ".concat(button_id));
            }
        };
        DaleOfMerchants.prototype.onCapuchin3 = function () {
            var card_id = this.myHand.orderedSelection.get()[0];
            if (!card_id) {
                this.showMessage(_("Please choose a card to give"), 'error');
                return;
            }
            var opponent_id = this.opponent_ids[0];
            if (opponent_id === undefined) {
                this.showMessage(_("Please choose the opponent that will receive ") + "'".concat(new DaleCard_10.DaleCard(card_id).name, "'"), 'error');
                return;
            }
            this.playTechniqueCard({
                opponent_id: opponent_id,
                card_id: card_id
            });
        };
        DaleOfMerchants.prototype.onSpendSelectOpponentTechnique = function (opponent_id) {
            var args = this.mainClientState.getArgs();
            if (new DaleCard_10.DaleCard(args.technique_card_id).effective_type_id == DaleCard_10.DaleCard.CT_CAPUCHIN5B) {
                this.mainClientState.enterOnStack('client_DEPRECATED_capuchin5b_SINGLEDISCARD', __assign({ technique_card_id: args.technique_card_id, opponent_id: opponent_id, opponent_name: this.gamedatas.players[opponent_id].name }, this.mainClientState.getSpendArgs()));
            }
            else {
                this.playTechniqueCardWithServerState(__assign({ opponent_id: opponent_id }, this.mainClientState.getSpendArgs()));
            }
        };
        DaleOfMerchants.prototype.onCapuchin4Take = function () {
            this.bgaPerformAction('actCapuchin4', {
                is_taking_card: true
            });
        };
        DaleOfMerchants.prototype.onCapuchin4Skip = function () {
            this.bgaPerformAction('actCapuchin4', {
                is_taking_card: false
            });
        };
        DaleOfMerchants.prototype.onCapuchin5a = function () {
            var take_card_ids = this.myLimbo.orderedSelection.get();
            var discard_card_ids = this.myLimbo.orderedSelection.get(true);
            if (take_card_ids.length > 1) {
                this.showMessage(_("Please select at most 1 card to take"), "error");
                return;
            }
            if (discard_card_ids.length > 2) {
                this.showMessage(_("Please select at most 2 cards to discard"), "error");
                return;
            }
            this.bgaPerformAction('actCapuchin5a', {
                take_card_id: take_card_ids.length == 0 ? -1 : take_card_ids[0],
                discard_card_ids: this.arrayToNumberList(discard_card_ids)
            });
        };
        DaleOfMerchants.prototype.onCapuchin5bOpenDiscard = function (opponent_id) {
            for (var _i = 0, _a = Object.entries(this.playerDiscards); _i < _a.length; _i++) {
                var _b = _a[_i], player_id = _b[0], pile = _b[1];
                if (+player_id != opponent_id) {
                    console.log("closing", player_id);
                    this.playerDiscards[+player_id].closePopin();
                }
            }
            this.playerDiscards[opponent_id].openPopin();
        };
        DaleOfMerchants.prototype.onSkink1 = function () {
            this.resolveTechniqueCard({
                card_ids: this.myDiscard.orderedSelection.get()
            });
        };
        DaleOfMerchants.prototype.onSkink2 = function () {
            this.resolveTechniqueCard({
                card_id: -1
            });
        };
        DaleOfMerchants.prototype.onSkink5a = function () {
            var card_ids = this.myHand.orderedSelection.get();
            var nbr = Math.min(2, this.myHand.count());
            if (card_ids.length < nbr) {
                this.showMessage(_("Please select exactly ") + nbr + _(" card(s) from your hand"), 'error');
                return;
            }
            this.resolveTechniqueCard({
                card_ids: card_ids
            });
        };
        DaleOfMerchants.prototype.onSkink5b = function (card_id) {
            this.playPassiveCard({
                card_id: card_id
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
                ['discardToSchedule', 500],
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
                ['discardEntireDeck', 1000],
                ['wilyFellow', 500],
                ['DEPRECATED_whirligigShuffle', 1750],
                ['DEPRECATED_whirligigTakeBack', 500, true],
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
                ['stealCoins', 250],
                ['gainCoins', 250],
                ['startSlotMachine', 1],
                ['advanceClock', 1],
                ['updateActionButtons', 1],
                ['deselectPassive', 1],
                ['selectDEPRECATED_Blindfold', 1, true],
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
            var _a, _b;
            var deck = this.playerDecks[notif.args.player_id];
            var storedCards = this.playerStoredCards[notif.args.player_id];
            var card = ((_a = notif.args._private) === null || _a === void 0 ? void 0 : _a.card) ? DaleCard_10.DaleCard.of((_b = notif.args._private) === null || _b === void 0 ? void 0 : _b.card) : new DaleCard_10.DaleCard(-storedCards.count(), 0);
            storedCards.addDaleCardToStock(card, deck.placeholderHTML);
            deck.pop();
        };
        DaleOfMerchants.prototype.notif_storedCardsToHand = function (notif) {
            if (this.isMonoPlayer(notif.args.player_id)) {
                var storedCards = this.playerStoredCards[notif.args.player_id];
                var dummy_card_ids = storedCards.getAllItems().map(function (item) { return item.id; });
                var cards = Object.values(notif.args._private.cards).map(DaleCard_10.DaleCard.of);
                if (dummy_card_ids.length != cards.length) {
                    throw new Error("Mismatch in number of stored cards for Mono: client says ".concat(dummy_card_ids.length, ", server says ").concat(Object.keys(notif.args._private.cards).length, " "));
                }
                for (var i = 0; i < cards.length; i++) {
                    var dummy_card_id = dummy_card_ids[i];
                    var card = cards[i];
                    var storedCards_1 = this.playerStoredCards[notif.args.player_id];
                    if ($(storedCards_1.control_name + '_item_' + dummy_card_id)) {
                        this.myLimbo.addDaleCardToStock(card, storedCards_1.control_name + '_item_' + dummy_card_id);
                        storedCards_1.removeFromStockByIdNoAnimation(+dummy_card_id);
                    }
                    else {
                        throw new Error("storedCardsToHand failed. Dummy stored card ".concat(dummy_card_id, " does not exist among the stored cards."));
                    }
                }
            }
            else if (notif.args.player_id == this.player_id) {
                for (var card_id in notif.args._private.cards) {
                    var dbcard = notif.args._private.cards[card_id];
                    var storedCards = this.playerStoredCards[notif.args.player_id];
                    if ($(storedCards.control_name + '_item_' + card_id)) {
                        this.myHand.addDaleCardToStock(DaleCard_10.DaleCard.of(dbcard), storedCards.control_name + '_item_' + card_id);
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
            console.warn("notif_rearrangeMarket", notif.args);
            this.market.rearrange(notif.args.card_ids);
        };
        DaleOfMerchants.prototype.notif_fillEmptyMarketSlots = function (notif) {
            console.warn("notif_fillEmptyMarketSlots", notif.args);
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
            if (!notif.args.from_limbo) {
                this.playerHandSizes[notif.args.opponent_id].incValue(-1);
            }
            if (!notif.args.to_limbo) {
                this.playerHandSizes[notif.args.player_id].incValue(1);
            }
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
            console.warn("placeOnDeckMultiple", notif.args);
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
            console.warn("notif_discardToHand", notif.args);
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
        DaleOfMerchants.prototype.notif_discardToSchedule = function (notif) {
            var _a;
            console.warn("discardToSchedule", notif);
            var discardPile = this.playerDiscards[(_a = notif.args.discard_id) !== null && _a !== void 0 ? _a : notif.args.player_id];
            var schedule = this.playerSchedules[notif.args.player_id];
            this.pileToStock(notif.args.card, discardPile, schedule, +notif.args.card.location_arg);
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
            console.warn("notif_drawMultiple", notif.args);
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
        DaleOfMerchants.prototype.notif_discardEntireDeck = function (notif) {
            console.warn("discardEntireDeck", notif);
            var deck = this.playerDecks[notif.args.player_id];
            var discard = this.playerDiscards[notif.args.player_id];
            var cards = [];
            if (notif.args.card_ids.length != deck.size) {
                throw new Error("Server says decksize = ".concat(notif.args.card_ids.length, ", client says decksize = ").concat(deck.size));
            }
            for (var i = 0; i < notif.args.card_ids.length; i++) {
                var card_id = notif.args.card_ids[i];
                var dbcard = notif.args.cards[card_id];
                if (!dbcard) {
                    throw new Error("discardEntireDeck should receive an associative array of dbcards with keys matching the card_ids. card_id ".concat(card_id, " was not found as a key."));
                }
                var card = DaleCard_10.DaleCard.of(dbcard);
                cards.push(card);
            }
            deck.setContent(cards.map(DaleCard_10.DaleCard.of));
            deck.shuffleToPile(discard);
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
        DaleOfMerchants.prototype.notif_DEPRECATED_whirligigShuffle = function (notif) {
            var _this = this;
            console.warn("DEPRECATED_whirligigShuffle");
            var player_nbr = notif.args.player_nbr;
            var opponent_nbr = notif.args.opponent_nbr;
            if (!this.isSpectator) {
                this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-default', _("Whirligig"));
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
                    console.warn("'DEPRECATED_whirligigShuffle' failed:\n\t\t\t\t\tnotif.args.opponent_nbr == ".concat(notif.args.opponent_nbr, "\n\t\t\t\t\tnotif.args.player_nbr == ").concat(notif.args.player_nbr, "\n\t\t\t\t"));
                }
                setTimeout((function () { _this.myLimbo.shuffleAnimation(); }).bind(this), this.myLimbo.duration);
            }
            else {
                for (var i = 0; i < notif.args.player_nbr; i++) {
                    this.playerDecks[notif.args.player_id].pop();
                }
            }
        };
        DaleOfMerchants.prototype.notif_DEPRECATED_whirligigTakeBack = function (notif) {
            console.warn("notif_DEPRECATED_whirligigTakeBack");
            if (!this.isSpectator) {
                var limbo_card_ids = this.myLimbo.getAllItems().map(function (item) { return item.id; }).sort(function () { return Math.random() - 0.5; });
                if (notif.args._private) {
                    var cards = Object.values(notif.args._private.cards);
                    if (cards.length != notif.args.nbr) {
                        throw new Error("DEPRECATED_whirligigTakeBack failed: expected ".concat(notif.args.nbr, " cards, got ").concat(cards.length, " cards"));
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
            this.monoShowHand(notif.args.cards);
        };
        DaleOfMerchants.prototype.monoShowHand = function (cards) {
            if (!this.is_solo || !this.unique_opponent_id) {
                throw new Error("notif_monoShowHand can only be called in a solo game with unique_opponent_id defined");
            }
            if (this.mono_hand_is_visible) {
                return;
            }
            this.mono_hand_is_visible = true;
            this.myLimbo.enableSortItems = false;
            this.myLimbo.setSelectionMode('none', undefined, 'daleofmerchants-wrap-technique', _("Mono's hand"));
            var sortedCards = this.sortCardsByLocationArg(cards, true);
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
                dojo.setStyle(cover_1, 'z-index', Images_9.Images.Z_INDEX_DECK_ABOVE_SLIDING_CARD.toString());
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
            console.warn("notif_advanceClock", notif.args);
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
        DaleOfMerchants.prototype.notif_stealCoins = function (notif) {
            this.coinManager.stealCoins(+notif.args.player_id, +notif.args.opponent_id, notif.args.nbr);
        };
        DaleOfMerchants.prototype.notif_gainCoins = function (notif) {
            if (notif.args.source_card) {
                var div_maybe = DaleCard_10.DaleCard.divs.get(+notif.args.source_card.id);
                this.coinManager.addCoins(+notif.args.player_id, notif.args.nbr, div_maybe);
            }
            else {
                this.coinManager.addCoins(+notif.args.player_id, notif.args.nbr);
            }
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
        DaleOfMerchants.prototype.notif_selectDEPRECATED_Blindfold = function (notif) {
            console.warn("notif_selectDEPRECATED_Blindfold");
        };
        DaleOfMerchants.prototype.notif_addEffect = function (notif) {
            console.warn("notif_addEffect");
            var effect = new DbEffect_1.DbEffect(notif.args.effect);
            console.warn(effect);
            DaleCard_10.DaleCard.addEffect(effect);
        };
        DaleOfMerchants.prototype.notif_updateEffect = function (notif) {
            console.warn("notif_updateEffect");
            var effect = new DbEffect_1.DbEffect(notif.args.effect);
            DaleCard_10.DaleCard.updateEffect(effect);
        };
        DaleOfMerchants.prototype.notif_expireEffects = function (notif) {
            console.warn("notif_expireEffects");
            var effects = notif.args.effects.map(function (effect) { return new DbEffect_1.DbEffect(effect); });
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
                                    var high_priority_divs = Array();
                                    if (args.highlight_limbo_cards !== undefined) {
                                        for (var card_id in args.highlight_limbo_cards) {
                                            var dbcard = args.highlight_limbo_cards[card_id];
                                            _this.myLimbo.selectItem(+dbcard.id);
                                            DaleCard_10.DaleCard.of(dbcard).div.classList.add("daleofmerchants-high-priority");
                                            high_priority_divs.push(DaleCard_10.DaleCard.of(dbcard).div);
                                        }
                                    }
                                    if (args.highlight_hand_cards !== undefined) {
                                        for (var card_id in args.highlight_hand_cards) {
                                            var dbcard = args.highlight_hand_cards[card_id];
                                            _this.myHand.selectItem(+dbcard.id);
                                            DaleCard_10.DaleCard.of(dbcard).div.classList.add("daleofmerchants-high-priority");
                                            high_priority_divs.push(DaleCard_10.DaleCard.of(dbcard).div);
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
                                        for (var _i = 0, high_priority_divs_1 = high_priority_divs; _i < high_priority_divs_1.length; _i++) {
                                            var div = high_priority_divs_1[_i];
                                            div.classList.remove("daleofmerchants-high-priority");
                                        }
                                        _this.myLimbo.setSelectionMode('none');
                                        _this.myHand.setSelectionMode('none');
                                        _this.monoSchedule.setSelectionMode('none');
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
