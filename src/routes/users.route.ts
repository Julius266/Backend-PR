import { Router } from "express";

import { createUser } from "../controllers/users.controller";
import { getAllUsers } from "../controllers/users.controller";
import { loginUser } from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.post('/create', createUser);
/**
 * @openapi
 * /users/create:
 *   post:
 *     tags:
 *       - users
 *     summary: "User Creation"
 *     description: "This endpoint is to create the users"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/user"
 *     responses:
 *       '200':
 *         description: "Successful user creation"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     userid:
 *                       type: integer
 *                       example: 14
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-05-29T22:33:07.212Z"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "example@gmail.com"
 *                     name:
 *                       type: string
 *                       example: "Name"
 *                     lastname:
 *                       type: string
 *                       example: "Lastname"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$EQCJ3ERCayqxOXzWstELQuESOpApgI6oh9Q9Rigf4dL43LQDOmIly"
 *       '422':
 *         description: "Validation error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error message"
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *     security:
 *       - ffofofof: []
 */
usersRouter.get('/get',getAllUsers);
/**
 * @openapi
 * /users/get:
 *   get:
 *     tags:
 *       - users
 *     summary: "List users"
 *     description: "This endpoint is to list all users"
 *     responses:
 *       '200':
 *         description: "Returns the list of users"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userid:
 *                     type: integer
 *                     example: 14
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-05-29T22:33:07.212Z"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "zeusis@gmail.com"
 *                   name:
 *                     type: string
 *                     example: "Zeu"
 *                   lastname:
 *                     type: string
 *                     example: "Vinces"
 *       '422':
 *         description: "Validation error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *     security:
 *       - ffofofof: []
 */

usersRouter.post('/login', loginUser);
/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: "Iniciar sesión de usuario"
 *     description: "Autentica a un usuario con correo electrónico y contraseña, y devuelve un token JWT si las credenciales son correctas."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       '200':
 *         description: "Inicio de sesión exitoso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '401':
 *         description: "Credenciales incorrectas"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email or password is incorrect
 *       '500':
 *         description: "Error interno del servidor"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */




export default usersRouter;