import { Router } from 'express';
import {
    ScenarioOutcomeController,
    CreatureLevelController,
    CreatureClassController,
    CharacterClassController,
    StatusEffectController,
    ElementController,
    DamageSourceController,
    AttackModifierController
} from '../controllers';

const enumRoutes = Router();

enumRoutes.get('/scenario_outcomes', ScenarioOutcomeController.getAll);
enumRoutes.get('/creature_levels', CreatureLevelController.getAll);
enumRoutes.get('/creature_classes', CreatureClassController.getAll);
enumRoutes.get('/character_classes', CharacterClassController.getAll);
enumRoutes.get('/status_effects', StatusEffectController.getAll);
enumRoutes.get('/elements', ElementController.getAll);
enumRoutes.get('/damage_sources', DamageSourceController.getAll);
enumRoutes.get('/attack_modifiers', AttackModifierController.getAll)

export default enumRoutes;
