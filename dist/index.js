"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const authUser_1 = require("./middlewares/authUser");
const Link_1 = require("./controllers/Link");
const cors_1 = __importDefault(require("cors"));
const Tag_1 = require("./controllers/Tag");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = 3000;
app.use(express_1.default.json());
app.get("/api/v1/tag", Tag_1.getAllTag);
app.get("/api/v1/brain/:shareLink", Link_1.shareLink);
app.use("/api/v1", userRoutes_1.default);
app.use("/api/v1/", authUser_1.authUser, contentRoutes_1.default);
app.post("/api/v1/auth/create-tag", authUser_1.authUser, Tag_1.createTag);
app.post("/api/v1/status", Link_1.checkStatus);
app.post("/api/v1/brain/share", authUser_1.authUser, Link_1.createLink);
app.get("/", (req, res) => {
    res.send("Hii there");
});
app.listen(PORT, () => {
    (0, connectDB_1.default)();
    console.log("App is up and running");
});
