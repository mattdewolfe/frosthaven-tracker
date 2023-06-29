import { Router } from "express";
import { EventController } from "../controllers";

const eventRoutes = Router();

eventRoutes.get('/', EventController.getAll);
eventRoutes.post('/', EventController.post);
eventRoutes.put('/', EventController.put);
eventRoutes.get('/id', EventController.getById);

export default eventRoutes;
