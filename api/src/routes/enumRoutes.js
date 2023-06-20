import { Router } from "express";
import {
    ScenarioOutcomeController,
    CreatureLevelController,
    CreatureClassController,
    CharacterClassController,
    StatusEffectController
} from "../controllers";

const enumRoutes = Router();

enumRoutes.get('/scenario_outcomes', ScenarioOutcomeController.getAll);
enumRoutes.get('/creature_levels', CreatureLevelController.getAll);
enumRoutes.get('/creature_classes', CreatureClassController.getAll);
enumRoutes.get('/character_classes', CharacterClassController.getAll);
enumRoutes.get('/status_effects', StatusEffectController.getAll);
// TODO:
//enumRoutes.get('/damage_sources', );
//enumRoutes.get('/elements', );

export default enumRoutes;
