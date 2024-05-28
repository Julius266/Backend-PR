import { Router } from "express";

import { createUser } from "../controllers/users.controller";
import { getAllUsers } from "../controllers/users.controller";
import { loginUser } from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.post('/create', createUser);
usersRouter.get('/get',getAllUsers);
usersRouter.post('/login', loginUser);
export default usersRouter;