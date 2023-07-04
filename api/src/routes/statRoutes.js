import { Router } from 'express';
import {
    CreatureKillController,
    EventController,
} from '../controllers';

// Will also handle damage dealt and damage taken routes
const statRoutes = Router();

statRoutes.get('/kill', CreatureKillController.getAll);
statRoutes.post('/kill', CreatureKillController.post);
statRoutes.put('/kill', CreatureKillController.put);

statRoutes.get('/events', EventController.getAll);

statRoutes.get('/event', EventController.getById);
statRoutes.post('/event', EventController.post);
statRoutes.put('/event', EventController.put);

export default statRoutes;
