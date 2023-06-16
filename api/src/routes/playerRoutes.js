import { Router } from "express";
import {
    PlayerCharacterController,
    PlayerController
} from "../controllers";

const playerRoutes = Router();

playerRoutes.get('/', PlayerController.get);
playerRoutes.get('/character', PlayerCharacterController);

export default playerRoutes;
