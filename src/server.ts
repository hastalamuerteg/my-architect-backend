import 'reflect-metadata';
import cors from 'cors';
import express from 'express';

import { router } from './routes';
import { errorHandlerMiddleware } from 'middlewares/errorHandlerMiddleware';

const corsConfig = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();
app.use(cors(corsConfig));
app.use(express.json());
app.use(router);
app.use(errorHandlerMiddleware);
app.listen(3001, () => console.log('listening on port 3001'));
