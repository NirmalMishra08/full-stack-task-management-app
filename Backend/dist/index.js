"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DB_1 = __importDefault(require("./utils/DB"));
const User_route_1 = __importDefault(require("./Routes/User.route"));
const Menu_route_1 = __importDefault(require("./Routes/Menu.route"));
const Order_route_1 = __importDefault(require("./Routes/Order.route"));
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/user", User_route_1.default);
app.use("/api/v1", Menu_route_1.default);
app.use("/api/v1", Order_route_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
(0, DB_1.default)().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
