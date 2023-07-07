import { Router } from 'express';
import { ElementController } from '../controllers';

const enumRoutes = Router();

enumRoutes.get('/generated/', ElementController.getAll);
enumRoutes.post('/generated', ElementController.postGeneratedBatch);
enumRoutes.delete('/generated', ElementController.deleteGeneratedById);
enumRoutes.delete('/generated/scenario', ElementController.deleteGeneratedByScenario);

export default enumRoutes;
