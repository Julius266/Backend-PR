import express from 'express';
import usersRouter from './routes/users.route';
import { PORT } from './config';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);



app.get("/ping", (req, res) => {
    res.json({ message: "pong" }).status(200);
  });
  

app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`);
});