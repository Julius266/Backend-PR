import { Router } from "express";
import { getAllInternshipReports } from "../controllers/intership.controller";
import { createInternshipReport } from "../controllers/intership.controller";

const intershipRouter = Router();

intershipRouter.get('/all', getAllInternshipReports);
/**
 * @openapi
 * /intership/all:
 *   get:
 *     summary: Get all internship reports
 *     description: Retrieve a list of all internship reports.
 *     responses:
 *       200:
 *         description: A list of internship reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   student_name:
 *                     type: string
 *                     example: "John Doe"
 *                   student_year:
 *                     type: string
 *                     example: "4th year"
 *                   internship_period:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-25T00:00:00.000Z"
 *                   company_name:
 *                     type: string
 *                     example: "Company Inc."
 *                   company_address:
 *                     type: string
 *                     example: "1234 Main St."
 *                   company_phone:
 *                     type: string
 *                     example: "(123) 456-7890"
 *                   company_fax:
 *                     type: string
 *                     example: "(123) 456-7891"
 *                   company_email:
 *                     type: string
 *                     example: "email@company.com"
 *                   supervisor_name:
 *                     type: string
 *                     example: "Jane Smith"
 *                   supervisor_position:
 *                     type: string
 *                     example: "Supervisor"
 *                   supervisor_profession:
 *                     type: string
 *                     example: "Engineer"
 *                   supervisor_phone:
 *                     type: string
 *                     example: "(123) 456-7892"
 *                   supervisor_fax:
 *                     type: string
 *                     example: "(123) 456-7893"
 *                   supervisor_email:
 *                     type: string
 *                     example: "supervisor@company.com"
 *                   company_description:
 *                     type: string
 *                     example: "A company that does things."
 *                   company_location:
 *                     type: string
 *                     example: "City, Country"
 *                   company_access:
 *                     type: string
 *                     example: "Public transport"
 *                   company_resources:
 *                     type: string
 *                     example: "Computers, Office space"
 *                   company_economic_activity:
 *                     type: string
 *                     example: "Technology"
 *                   company_organizational_structure:
 *                     type: string
 *                     example: "Hierarchical"
 *                   useful_subjects:
 *                     type: string
 *                     example: "Accounting, Finance"
 *                   missing_topics:
 *                     type: string
 *                     example: "Advanced programming"
 *                   week_1:
 *                     type: string
 *                     example: "Week 1 activities"
 *                   week_2:
 *                     type: string
 *                     example: "Week 2 activities"
 *                   week_3:
 *                     type: string
 *                     example: "Week 3 activities"
 *                   week_4:
 *                     type: string
 *                     example: "Week 4 activities"
 *                   week_5:
 *                     type: string
 *                     example: "Week 5 activities"
 *                   week_6:
 *                     type: string
 *                     example: "Week 6 activities"
 *                   week_7:
 *                     type: string
 *                     example: "Week 7 activities"
 *                   department_name:
 *                     type: string
 *                     example: "Finance"
 *                   objectives:
 *                     type: string
 *                     example: "Learn about financial processes"
 *                   specific_functions:
 *                     type: string
 *                     example: "Handle daily transactions"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */

intershipRouter.post ('/create',createInternshipReport);

export default intershipRouter;
