import { Router } from "express";
import {
    ScenarioOutcome,
    CreatureLevel,
    CreatureClass,
    CharacterClass,
    StatusEffect
} from "../controllers";

const enumRoutes = Router();

enumRoutes.get('/scenario_outcomes', ScenarioOutcome.getAll);
enumRoutes.get('/creature_levels', CreatureLevel.getAll);
enumRoutes.get('/creature_classes', CreatureClass.getAll);
enumRoutes.get('/character_classes', CharacterClass.getAll);
enumRoutes.get('/status_effects', StatusEffect.getAll);

export default enumRoutes;
