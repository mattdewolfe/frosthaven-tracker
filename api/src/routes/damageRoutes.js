import { Router } from 'express';
import { DamageRecordsController } from '../controllers';

const damageRoutes = Router();

damageRoutes.get('/dealt', DamageRecordsController.getAllDealt);
damageRoutes.post('/dealt', DamageRecordsController.postDamageDealt);

damageRoutes.get('/taken', DamageRecordsController.getAllTaken);
damageRoutes.post('/taken', DamageRecordsController.postDamageTaken);

export default damageRoutes;
