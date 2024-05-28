"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const users_controller_2 = require("../controllers/users.controller");
const users_controller_3 = require("../controllers/users.controller");
const usersRouter = (0, express_1.Router)();
usersRouter.post('/create', users_controller_1.createUser);
usersRouter.get('/get', users_controller_2.getAllUsers);
usersRouter.post('/login', users_controller_3.loginUser);
exports.default = usersRouter;
//# sourceMappingURL=users.route.js.map