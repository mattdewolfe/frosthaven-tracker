import { Router } from 'express';
import { StatusEffectController } from '../controllers';

const statusRoutes = Router();

statusRoutes.get('/applied', StatusEffectController.getAllApplied);
statusRoutes.post('/applied', StatusEffectController.postAppliedBatch);
statusRoutes.delete('/applied', StatusEffectController.deleteAppliedById);
statusRoutes.delete('/applied/scenario', StatusEffectController.deleteAppliedByScenario);

statusRoutes.get('/received', StatusEffectController.getAllReceived);
statusRoutes.post('/received', StatusEffectController.postReceivedBatch);
statusRoutes.delete('/received', StatusEffectController.deleteReceivedById);
statusRoutes.delete('/received/scenario', StatusEffectController.deleteReceivedByScenario);

export default statusRoutes;
