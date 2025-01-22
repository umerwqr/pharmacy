"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodbConnection_1 = __importDefault(require("./config/mongodbConnection"));
const index_1 = __importDefault(require("./router/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: 'https://pharmacy-react-khaki.vercel.app', // Vercel domain
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
(0, index_1.default)(app);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
});
app.listen(port, () => {
    console.log("Server is running on port 5000");
    (0, mongodbConnection_1.default)();
});
