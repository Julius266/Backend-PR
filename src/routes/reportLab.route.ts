import { Router } from 'express';
import { createReport, getAllReportLabs } from '../controllers/reportLab.controller';

const router = Router();

router.post('/create', createReport);

/**
 * @openapi
 * /reports/create:
 *   post:
 *     tags:
 *       - reports
 *     summary: "Crear un nuevo reporte"
 *     description: "Este endpoint crea un nuevo reporte en la base de datos"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               report_name:
 *                 type: string
 *                 example: Reporte de Laboratorio
 *               school:
 *                 type: string
 *                 example: Universidad XYZ
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-07-10T15:30:00Z
 *               course:
 *                 type: string
 *                 example: Física 101
 *               subject:
 *                 type: string
 *                 example: Mecánica
 *               student:
 *                 type: string
 *                 example: Juan Pérez
 *               title:
 *                 type: string
 *                 example: Experimento de Ley de Hooke
 *               objective:
 *                 type: string
 *                 example: Determinar la constante de elasticidad de un resorte.
 *               materials:
 *                 type: string
 *                 example: Resorte, pesas, regla
 *               procedure:
 *                 type: string
 *                 example: Colocar las pesas en el resorte y medir la elongación.
 *               dataResults:
 *                 type: string
 *                 example: Datos obtenidos de las mediciones.
 *               analysis:
 *                 type: string
 *                 example: Análisis de los resultados obtenidos.
 *               conclusions:
 *                 type: string
 *                 example: Conclusiones del experimento.
 *               references:
 *                 type: string
 *                 example: Referencias bibliográficas.
 *     responses:
 *       '201':
 *         description: "Reporte creado exitosamente"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 report_name:
 *                   type: string
 *                   example: Reporte de Laboratorio
 *                 school:
 *                   type: string
 *                   example: Universidad XYZ
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-07-10T15:30:00Z
 *                 course:
 *                   type: string
 *                   example: Física 101
 *                 subject:
 *                   type: string
 *                   example: Mecánica
 *                 student:
 *                   type: string
 *                   example: Juan Pérez
 *                 title:
 *                   type: string
 *                   example: Experimento de Ley de Hooke
 *                 objective:
 *                   type: string
 *                   example: Determinar la constante de elasticidad de un resorte.
 *                 materials:
 *                   type: string
 *                   example: Resorte, pesas, regla
 *                 procedure:
 *                   type: string
 *                   example: Colocar las pesas en el resorte y medir la elongación.
 *                 dataResults:
 *                   type: string
 *                   example: Datos obtenidos de las mediciones.
 *                 analysis:
 *                   type: string
 *                   example: Análisis de los resultados obtenidos.
 *                 conclusions:
 *                   type: string
 *                   example: Conclusiones del experimento.
 *                 references:
 *                   type: string
 *                   example: Referencias bibliográficas.
 *       '500':
 *         description: "Error creando el reporte"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error creando el reporte
 */


router.get('/all', getAllReportLabs);

export default router;
