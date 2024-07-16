import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.route';
import reportLabRoutes from './routes/reportLab.route';
import intershipRoutes from './routes/intership.route';
import researchRoutes from './routes/research.route';
import essayRoutes from './routes/essay.route';  // Asegúrate de importar las rutas

import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './swagger';

const app = express();
// const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/reports', reportLabRoutes);
app.use('/internship', intershipRoutes);
app.use('/research', researchRoutes);
app.use('/essay', essayRoutes);  
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
