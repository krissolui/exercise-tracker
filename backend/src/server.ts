import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import usersRouter from './routes/users';
import exercisesRouter from './routes/exercises';
// file deepcode ignore UseCsurfForExpress: <this app does not required user authentication>

const app = express();
const port = process.env.PORT ?? 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI ?? 'mongodb://127.0.0.1:27017/test';
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB databse connection established successfully');
});

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
