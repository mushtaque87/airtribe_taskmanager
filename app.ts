import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import taskRoutes from './src/routes/taskRoutes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use('/', taskRoutes);

export default app;
