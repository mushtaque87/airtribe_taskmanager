import express from 'express';
// const path = require('path');
// const fs = require('fs');
const PORT = 9000;
import http from 'http';
import log from '../utils/logs';
import router from './route';

const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);
app.use(router);

app.get('/', (req, res) => {
  return res
    .status(200)
    .send('Airtribe TaskManager Project from \n\n- Mushtaque Ahmed');
});

new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));

log.info(`🚀 Server ready at http://localhost:${PORT}`);
