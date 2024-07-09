import express from 'express';

import userRoutes from './routes/users.route';
import reportLabRoutes from './routes/reportLab.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './swagger';

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes)


app.use('/reports', reportLabRoutes);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto a la URL de tu frontend si es diferente
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
