import bodyParser from 'body-parser';
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./router/swagger.json');

import rootRouter from './router';
import { connectDB } from './models';

const port: number = 3000;
const server = express();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }));
server.use(bodyParser.text({ type: 'text/html' }));
server.use('/api/v1', rootRouter);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
connectDB();

server.listen(port, () => {
    console.log(`Secret Santa app listening at http://localhost:${port}`);
});

module.exports = server;
