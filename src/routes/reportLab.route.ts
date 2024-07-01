import { Router } from 'express';
import { getAllSchoolReports, createSchoolReport } from '../controllers/reportLab.controller';

const reportRouter = Router();

reportRouter.get('/all', getAllSchoolReports);
reportRouter.post('/create', createSchoolReport);

export default reportRouter;
