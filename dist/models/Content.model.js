"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ContentSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["image", "video", "article", "music", "youtube", "twitter", "link"],
        required: true,
    },
    description: {
        type: String
    },
    tags: [
        { type: mongoose_1.default.Types.ObjectId,
            ref: "Tag", }
    ],
    link: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });
exports.Content = mongoose_1.default.model("Content", ContentSchema);
