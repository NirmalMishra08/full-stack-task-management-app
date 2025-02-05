"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            menuItem: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Menu", required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalItem: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model("Order", orderSchema);
