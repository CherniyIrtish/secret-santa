import bodyParser from 'body-parser';
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

import rootRouter from './router';
import { connectDB } from './models';

const port = 3000;
const server = express();

server.use(bodyParser.json());
server.use('/api', rootRouter);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
connectDB();



server.listen(port, () => {
    console.log(`Secret Santa app listening at http://localhost:${port}`);
});

