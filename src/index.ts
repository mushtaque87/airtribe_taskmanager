const PORT = 9000;
import http from 'http';
import log from '../utils/logs';
import router from './route';
import express from 'express';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';

const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

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
new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));

log.info(`🚀 Server ready at http://localhost:${PORT}`);
