import { Router } from 'express';
import { IndexController } from '../controllers/index';

const indexRoutes = Router();

indexRoutes.get('/', IndexController.getAll);

export default indexRoutes;
