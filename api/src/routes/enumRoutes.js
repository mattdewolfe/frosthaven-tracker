import { Router } from 'express';
import {
    ScenarioOutcomeController,
    CreatureLevelController,
    CreatureClassController,
    CharacterClassController,
    StatusEffectController,
    ElementController,
    DamageSourceController
} from '../controllers';

const enumRoutes = Router();

enumRoutes.get('/scenario_outcomes', ScenarioOutcomeController.getAll);
enumRoutes.get('/creature_levels', CreatureLevelController.getAll);
enumRoutes.get('/creature_classes', CreatureClassController.getAll);
enumRoutes.get('/character_classes', CharacterClassController.getAll);
enumRoutes.get('/status_effects', StatusEffectController.getAll);
enumRoutes.get('/elements', ElementController.getAll);
enumRoutes.get('/damage_sources', DamageSourceController.getAll);

export default enumRoutes;
