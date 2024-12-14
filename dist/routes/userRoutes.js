"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controllers/Auth");
const router = express_1.default.Router();
router.post("/signup", Auth_1.signUp);
router.post("/signin", Auth_1.sigin);
exports.default = router;
