import bodyParser from 'body-parser';
const express = require('express');


import rootRouter from './router';
import { connectDB } from './models';

const port = 3000;
const server = express();

server.use(bodyParser.json());

connectDB();

server.use('/api', rootRouter);

server.listen(port, () => {
    console.log(`Secret Santa app listening at http://localhost:${port}`);
});

