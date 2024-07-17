import { Router } from 'express';
import { createEssayReport, getAllEssayReports } from '../controllers/essay.controller';

const essayRouter = Router();

essayRouter.post('/create', createEssayReport);
essayRouter.get('/all', getAllEssayReports);

export default essayRouter;
