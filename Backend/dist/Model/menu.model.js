"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const menuSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // "Appetizer", "Main Course", etc.
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true }
});
exports.default = mongoose_1.default.model("Menu", menuSchema);
