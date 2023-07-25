import { Router } from 'express';
import {
    CreatureKillController,
    CharacterTurnController,
    HealingController
} from '../controllers';

// Will also handle damage dealt and damage taken routes
const statRoutes = Router();

statRoutes.get('/kill', CreatureKillController.getAll);
statRoutes.post('/kill', CreatureKillController.post);
statRoutes.put('/kill', CreatureKillController.put);

statRoutes.get('/turns', CharacterTurnController.getAll);

statRoutes.get('/turn', CharacterTurnController.getById);
statRoutes.post('/turn', CharacterTurnController.post);
statRoutes.put('/turn', CharacterTurnController.put);

statRoutes.get('/heals', HealingController.getAll);

statRoutes.get('/healing', HealingController.getById);
statRoutes.post('/healing', HealingController.post);
statRoutes.put('/healing', HealingController.put);

export default statRoutes;
