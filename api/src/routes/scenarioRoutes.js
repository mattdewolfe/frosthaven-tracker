import { Router } from 'express';
import {
    ScenarioController
} from '../controllers';

const scenarioRoutes = Router();

scenarioRoutes.get('/', ScenarioController.get);
scenarioRoutes.post('/', ScenarioController.post);
scenarioRoutes.put('/', ScenarioController.put);

export default scenarioRoutes;
