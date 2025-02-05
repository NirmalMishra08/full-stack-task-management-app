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
exports.register = register;
exports.login = login;
const user_model_1 = __importDefault(require("../Model/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ msg: "Please provide username and password" });
            }
            const user = yield user_model_1.default.findOne({ username: username });
            if (user) {
                return res.status(400).json({ msg: "Username already exists" });
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = yield user_model_1.default.create({ username: username, password: hashedPassword });
            res.status(200).json({ message: "User Successfully registered", newUser });
        }
        catch (err) {
            return res.status(400).json({ message: "Error occurred while : " + (err).message });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ msg: "Please provide username and password" });
            }
            const user = yield user_model_1.default.findOne({ username: username });
            if (!user) {
                return res.status(400).json({ msg: "User not found" });
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
            return res.status(200).json({ msg: "User authenticated successfully", user, token });
        }
        catch (error) {
            return res.status(400).json({ message: "Error occurred while" + (error).message });
        }
    });
}
