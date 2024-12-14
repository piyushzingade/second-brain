"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Link_1 = require("../controllers/Link");
const router = express_1.default.Router();
;
router.get("/:shareLink", Link_1.shareLink);
router.post("/share", Link_1.createLink);
// router.get("/:shareLink",shareLink)
exports.default = router;
