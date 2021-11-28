import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

mongoose.connect('mongodb://localhost:27017/warmhomedb');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

routes(app);

export default app;