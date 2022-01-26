import { Router } from 'express';
import routing from './routing';

let rootRouter = Router();

rootRouter.use('/', routing);

export default rootRouter;
