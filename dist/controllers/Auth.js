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
exports.sigin = exports.signUp = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../models/User.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const reqbody = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6, { message: "Password must be at least 8 characters long." })
    // .max(32, { message: "Password must not exceed 32 characters." })
    // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    // .regex(/[0-9]/, { message: "Password must contain at least one number." })
    // .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character." })
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseData = reqbody.safeParse(req.body);
        console.log("zod verification ", parseData);
        if (!parseData.success) {
            res.status(400).json({
                success: false,
                message: parseData.error.errors[0].message
            });
            return;
        }
        const { email, password } = req.body;
        const existingUser = yield User_model_1.default.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already Exist "
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const user = yield User_model_1.default.create({ email, password: hashedPassword });
        res.status(200).json({
            success: true,
            user,
            message: "User Registered"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
            error: error
        });
    }
});
exports.signUp = signUp;
const sigin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield User_model_1.default.findOne({ email });
        if (!existingUser) {
            res.status(400).json({
                success: false,
                message: "User does not exist ,Sign up to continue "
            });
            return;
        }
        const parseData = reqbody.safeParse(req.body);
        if (!parseData.success) {
            res.status(400).json({
                success: false,
                errors: parseData.error.errors[0].message
            });
            return;
        }
        if (!existingUser.password) {
            res.status(400).json({
                success: false,
                message: "Password is not set for this user.",
            });
            return;
        }
        const isCorrect = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isCorrect) {
            res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET || "secret";
        if (!JWT_SECRET)
            return;
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id.toString() }, JWT_SECRET);
        res.status(200).json({
            success: true,
            message: "User logged in",
            token: token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
});
exports.sigin = sigin;
