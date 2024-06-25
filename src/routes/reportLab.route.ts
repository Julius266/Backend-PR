import { Router } from "express";
import { getAllSchoolReports } from "../controllers/reportLab.controller";
import { createSchoolReport } from "../controllers/reportLab.controller";

const reportRouter = Router();

reportRouter.get('/all', getAllSchoolReports);

reportRouter.post ('/create',createSchoolReport);

export default reportRouter;
