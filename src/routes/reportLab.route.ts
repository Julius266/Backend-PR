import { Router } from 'express';
import { createReport, getAllReportLabs } from '../controllers/reportLab.controller';

const router = Router();

router.post('/create', createReport);
router.get('/all', getAllReportLabs);

export default router;
