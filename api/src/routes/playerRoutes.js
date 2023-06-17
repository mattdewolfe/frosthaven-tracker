import { Router } from "express";
import {
    PlayerCharacterController,
    PlayerController
} from "../controllers";

const playerRoutes = Router();

playerRoutes.get('/', PlayerController.get);
playerRoutes.get('/character', PlayerCharacterController.get);
playerRoutes.post('/character', PlayerCharacterController.post);
playerRoutes.put('/character', PlayerCharacterController.put);

export default playerRoutes;
