"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/users", users_route_1.default);
app.get("/ping", (req, res) => {
    res.json({ message: "pong" }).status(200);
});
app.listen(config_1.PORT, () => {
    console.log(`Server is running in port: ${config_1.PORT}`);
});
//# sourceMappingURL=index.js.map