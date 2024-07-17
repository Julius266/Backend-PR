// src/routes/report.routes.ts
import { Router } from 'express';
import { downloadReportPDF } from '../controllers/report.controller';

const router = Router();

router.get('/download/:reportType/:reportId', downloadReportPDF);

export default router;
