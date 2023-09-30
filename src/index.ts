import http from 'http';
import log from './utils/logs';
import router from './routes/taskRoutes';
import express from 'express';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';
import { connect } from './db';
import mongoose from 'mongoose';
import app from '../app';

const PORT = process.env.PORT || 9000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    log.info('Connected to MongoDB');
    app.listen(PORT, () => {
      log.info(`🚀 Server ready at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });

/* 
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

//connect();

app.get('/', (req, res) => {
  return res
    .status(200)
    .send('Airtribe TaskManager Project from \n\n- Mushtaque Ahmed');
});

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
// app.use(
//   cors<cors.CorsRequest>(),
//   json(),
//   bodyParser.json({ type: 'application/*+json' }),
// );

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(router);

//new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));

//log.info(`🚀 Server ready at http://localhost:${PORT}`);
*/
