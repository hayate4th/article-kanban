"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Card_1 = __importDefault(require("../Card"));
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var styled_components_1 = __importDefault(require("styled-components"));
var utils_1 = require("../../utils");
var CardList = function (_a) {
    var isEditMode = _a.isEditMode;
    var _b = react_1.useState({
        cards: [
            {
                id: "content-1",
                title: "Introducing Hooks",
                url: "https://reactjs.org/docs/hooks-intro.html",
                registeredDate: "2019/09/06"
            },
            {
                id: "content-2",
                title: "Hooks at a Glance",
                url: "https://reactjs.org/docs/hooks-overview.html",
                registeredDate: "2019/09/07"
            },
            {
                id: "content-3",
                title: "Using the State Hook",
                url: "https://reactjs.org/docs/hooks-state.html",
                registeredDate: "2019/09/07"
            }
        ]
    }), state = _b[0], setState = _b[1];
    var onDragEnd = function (result) {
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
        }
        var cards = utils_1.reorder(state.cards, result.source.index, result.destination.index);
        setState({ cards: cards });
    };
    return (react_1.default.createElement(StyledDiv, null,
        react_1.default.createElement(react_beautiful_dnd_1.DragDropContext, { onDragEnd: onDragEnd },
            react_1.default.createElement(react_beautiful_dnd_1.Droppable, { droppableId: "list" }, function (provided) { return (react_1.default.createElement("div", __assign({ ref: provided.innerRef }, provided.droppableProps),
                state.cards.map(function (card, index) { return (react_1.default.createElement(Card_1.default, { card: card, index: index, key: card.id, isEditMode: isEditMode })); }),
                provided.placeholder)); }))));
};
var StyledDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: 2px solid blue;\n  border-radius: 3px;\n  padding: 20px 20px 20px;\n  width: 204px;\n"], ["\n  border: 2px solid blue;\n  border-radius: 3px;\n  padding: 20px 20px 20px;\n  width: 204px;\n"])));
exports.default = CardList;
var templateObject_1;
