import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.route';
import reportLabRoutes from './routes/reportLab.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/reports', reportLabRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
