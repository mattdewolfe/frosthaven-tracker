import { Router } from 'express';
import { ElementController } from '../controllers';

const elementRoutes = Router();

elementRoutes.get('/generated', ElementController.getAllGenerated);
elementRoutes.post('/generated', ElementController.postGeneratedBatch);
elementRoutes.delete('/generated', ElementController.deleteGeneratedById);
elementRoutes.delete('/generated/scenario', ElementController.deleteGeneratedByScenario);


elementRoutes.get('/consumed', ElementController.getAllConsumed);
elementRoutes.post('/consumed', ElementController.postConsumedBatch);
elementRoutes.delete('/consumed', ElementController.deleteConsumedById);
elementRoutes.delete('/consumed/scenario', ElementController.deleteConsumedByScenario);

export default elementRoutes;
