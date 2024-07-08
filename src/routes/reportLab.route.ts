import { Router } from 'express';
import { createReport, getReports } from '../controllers/reportLab.controller';

const router = Router();

router.post('/create', createReport);
router.get('/', getReports);

export default router;
