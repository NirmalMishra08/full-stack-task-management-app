"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Menu_controller_1 = require("../Controller/Menu.controller");
const Authentication_1 = require("../utils/Authentication");
const router = express_1.default.Router();
router.get("/menu", Authentication_1.authenticatedUser, Menu_controller_1.getMenuItems);
router.post("/menu", Authentication_1.authenticatedUser, Menu_controller_1.addMenuItem);
router.put(`/menu/:id`, Authentication_1.authenticatedUser, Menu_controller_1.updateMenu);
router.delete(`/menu/:id`, Authentication_1.authenticatedUser, Menu_controller_1.deleteMenuItem);
exports.default = router;
