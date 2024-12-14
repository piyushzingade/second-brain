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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editContent = exports.deleteContent = exports.getAllContent = exports.createContent = void 0;
const Content_model_1 = require("../models/Content.model");
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, title, type, description, tags } = req.body;
        if (!link || !type || !title || !description || !tags) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }
        yield Content_model_1.Content.create({
            link,
            type,
            title: title,
            description,
            userId: req.userId,
            tags,
        });
        const content = yield Content_model_1.Content.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Content added",
            user: req.userId,
            userContent: content
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error
        });
    }
});
exports.createContent = createContent;
const getAllContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const content = yield Content_model_1.Content.find({
            userId: userId,
        }).populate("userId", ["email"]).sort({ createdAt: -1 }).populate("tags");
        res.status(200).json({
            content,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err
        });
    }
});
exports.getAllContent = getAllContent;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.contentId;
        console.log({ "conetentID": contentId,
            "UserID": req.userId
        });
        yield Content_model_1.Content.deleteMany({
            _id: contentId,
            userId: req.userId,
        });
        res.status(200).json({
            message: "Deleted"
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err
        });
    }
});
exports.deleteContent = deleteContent;
const editContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, title, type, description, tags, id } = req.body;
        if (!link || !type || !title || !description || !tags || !id) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }
        const content = yield Content_model_1.Content.findOneAndUpdate({ _id: id }, {
            title, tags, type, description, link
        }, { new: true });
        res.status(200).json({
            success: true,
            updated_Content: content
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the content.",
            error: err,
        });
    }
});
exports.editContent = editContent;
