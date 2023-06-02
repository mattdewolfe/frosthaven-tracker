import { Router } from 'express';
import { ProvinceController } from '../controllers';

const provinceRoutes = Router();

provinceRoutes.get('/', ProvinceController.getAll);

export default provinceRoutes;
