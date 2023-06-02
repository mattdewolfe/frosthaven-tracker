import { Router } from "express";
import {PartyController} from "../controllers";

const partyRoutes = Router();

partyRoutes.get('/members', PartyController.getMemberCount);
partyRoutes.get('/', PartyController.getPartyData);

export default partyRoutes;
