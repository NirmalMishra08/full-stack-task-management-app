"use strict";
// GET /menu: Fetch all menu items.
// POST /menu: Add a new menu item.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuItems = getMenuItems;
exports.addMenuItem = addMenuItem;
const menu_model_1 = __importDefault(require("../Model/menu.model"));
function getMenuItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItems = yield menu_model_1.default.find({});
            return res.status(200).json({ message: "Menu items found", menuItems });
        }
        catch (err) {
            return res.status(400).json({ message: "Error occurred while fetching menu items: " + (err).message });
        }
    });
}
function addMenuItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, category, price, availability } = req.body;
            if (!name || !category || !price || !availability) {
                return res.status(400).json({ message: "Please provide all required fields (name, category, price, availability)" });
            }
            const newMenuItem = yield menu_model_1.default.create({ name, category, price, availability });
            return res.status(200).json({ message: "Menu item added successfully", newMenuItem });
        }
        catch (error) {
            return res.status(400).json({ message: (error).message });
        }
    });
}
