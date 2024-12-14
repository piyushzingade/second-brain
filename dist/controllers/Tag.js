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
exports.getAllTag = exports.createTag = void 0;
const Tag_model_1 = __importDefault(require("../models/Tag.model"));
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const tag = yield Tag_model_1.default.create({ title });
        res.json({
            success: true,
            message: "Tag created",
            data: tag
        });
    }
    catch (err) {
    }
});
exports.createTag = createTag;
const getAllTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield Tag_model_1.default.find({});
        res.json({
            success: true,
            tags: tags
        });
    }
    catch (err) {
    }
});
exports.getAllTag = getAllTag;
