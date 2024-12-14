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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/brainly";
if (!URL) {
    throw new Error("MONGODB_URL is undefined. Please check your .env file.");
}
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default
        .connect(URL)
        .then(() => {
        console.log("Connection Established");
    })
        .catch((e) => {
        console.log("COnnection Failed", e);
    });
});
exports.default = connectDb;
