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
exports.checkStatus = exports.shareLink = exports.createLink = void 0;
const uuid_1 = require("uuid");
const Link_model_1 = require("../models/Link.model");
const Content_model_1 = require("../models/Content.model");
const createLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingLink = yield Link_model_1.Link.findOne({
            userId: req.userId,
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash,
            });
            return;
        }
        const randomUUID = (0, uuid_1.v4)();
        console.log(randomUUID);
        yield Link_model_1.Link.create({
            hash: randomUUID,
            userId: req.userId,
            live: "true",
        });
        res.json({
            hash: randomUUID,
            user: req.userId,
        });
    }
    catch (err) { }
});
exports.createLink = createLink;
const shareLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const hash = req.params.shareLink;
        console.log("hash", hash);
        const link = yield Link_model_1.Link.findOne({ hash: hash });
        console.log("Link", link);
        if (!link) {
            res.status(411).json({
                message: "Sorry incorrect input",
            });
            return;
        }
        const content = yield Content_model_1.Content.find({
            userId: link === null || link === void 0 ? void 0 : link.userId,
        }).populate("userId", "email").populate("tags");
        res.json({
            content,
        });
    }
    catch (err) {
        res.json({
            message: err,
        });
    }
});
exports.shareLink = shareLink;
const checkStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        console.log("From Chechk status");
        if (req.body.unLive) {
            const link = yield Link_model_1.Link.findOneAndDelete({ userId: userId });
            res.json({
                link
            });
            return;
        }
        else {
            const link = yield Link_model_1.Link.find({
                userId: userId,
            });
            if (!link) {
                res.json({
                    message: "link not found",
                });
                return;
            }
            res.json({
                message: "link found",
                link,
            });
        }
        return;
    }
    catch (err) {
        res.json({
            message: err,
        });
    }
});
exports.checkStatus = checkStatus;
