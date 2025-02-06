"use strict";
// POST /order: Place an order with selected menu items and
// quantities.
// ■ GET /orders: Fetch all orders of a logged-in user.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_controller_1 = require("../Controller/Order.controller");
const Authentication_1 = require("../utils/Authentication");
const router = express_1.default.Router();
router.post('/order', Authentication_1.authenticatedUser, Order_controller_1.placeOrder);
router.get('/orders', Authentication_1.authenticatedUser, Order_controller_1.getOrders);
exports.default = router;
