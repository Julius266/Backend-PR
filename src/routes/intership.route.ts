import { Router } from 'express';
import { createInternshipReport, getAllInternshipReports } from '../controllers/intership.controller';

const intershipRouter = Router();

intershipRouter.post('/create', createInternshipReport);
intershipRouter.get('/all', getAllInternshipReports);

export default intershipRouter;
