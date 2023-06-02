import { Router } from "express";
import {PersonController} from "../controllers";

const personRoutes = Router();

personRoutes.get('/', PersonController.getById);
personRoutes.post('/', PersonController.post);
personRoutes.put('/', PersonController.putById);
personRoutes.delete('/', PersonController.deleteById);

personRoutes.get('/caucus', PersonController.getCaucusRolesById);
personRoutes.get('/committee', PersonController.getCommitteeRolesById);
personRoutes.get('/ministry', PersonController.getMinistryRolesById);

export default personRoutes;
