import { Router } from 'express';
import { createResearchReport, getAllResearchReports } from '../controllers/research.controller';

const researchRouter = Router();

researchRouter.post('/create', createResearchReport);
researchRouter.get('/all', getAllResearchReports);

export default researchRouter;
