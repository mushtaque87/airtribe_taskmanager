import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import taskRoutes from './src/routes/taskRoutes';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(cors());
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use('/', taskRoutes);

export default app;
