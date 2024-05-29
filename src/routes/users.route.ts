import { Router } from "express";

import { createUser } from "../controllers/users.controller";
import { getAllUsers } from "../controllers/users.controller";
import { loginUser } from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.post('/create', createUser);
usersRouter.get('/get',getAllUsers);
usersRouter.post('/login', loginUser);


/**
 * @openapi
 * /users:
 *    post:
 *      tags:
 *        - users
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales 
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - ffofofof: []
 */

export default usersRouter;