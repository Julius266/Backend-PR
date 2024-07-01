import express from 'express';
import usersRouter from './routes/users.route';
import pingRouter from './routes/ping.route';
import intershipRouter from './routes/intership.route';
import reportRouter from './routes/reportLab.route';
import { PORT } from './config';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './swagger';

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use('/ping', pingRouter);
app.use('/intership', intershipRouter);
app.use('/report', reportRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
