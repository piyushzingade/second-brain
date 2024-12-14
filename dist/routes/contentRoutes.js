"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Content_1 = require("../controllers/Content");
const router = express_1.default.Router();
router.post("/content", Content_1.createContent);
router.get("/content", Content_1.getAllContent);
router.delete("/content", Content_1.deleteContent);
router.put("/content", Content_1.editContent);
exports.default = router;
