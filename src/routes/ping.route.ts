import { Router } from "express";
import { ping } from "../controllers/ping.controller";

const pingRouter = Router();

pingRouter.get('/ping', ping);
/**
 * @openapi
 * /ping:
 *   get:
 *     summary: Check if the service is alive
 *     description: Returns a "pong" message to indicate that the service is running.
 *     responses:
 *       200:
 *         description: Service is alive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 */

export default pingRouter;
