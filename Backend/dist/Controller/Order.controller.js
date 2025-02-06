"use strict";
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
exports.getOrders = void 0;
exports.placeOrder = placeOrder;
const menu_model_1 = __importDefault(require("../Model/menu.model"));
const order_model_1 = __importDefault(require("../Model/order.model"));
function placeOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { items } = req.body;
            const userId = req.userId.id;
            console.log(userId);
            if (!items || !Array.isArray(items) || items.length == 0) {
                return res.status(400).json({ message: "Order must contain at least one item" });
            }
            let totalPrice = 0;
            for (const item of items) {
                const menuItem = yield menu_model_1.default.findById(item.menuItem);
                if (!menuItem) {
                    return res.status(404).json({ message: `Menu item ${item.menuItem} not found` });
                }
                totalPrice += menuItem.price * item.quantity;
            }
            const newOrder = yield order_model_1.default.create({ userId, items, totalAmount: totalPrice });
            return res.status(200).json({ message: "Order placed successfully", newOrder });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId.id;
        const orders = yield order_model_1.default.find({ userId }).populate("items.menuItem");
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getOrders = getOrders;
