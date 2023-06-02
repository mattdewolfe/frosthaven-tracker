import { Router } from "express";
import {CommitteeController} from "../controllers";

const committeeRoutes = Router();

committeeRoutes.get('/', CommitteeController.get);
committeeRoutes.post('/', CommitteeController.post);
committeeRoutes.put('/', CommitteeController.put);
committeeRoutes.delete('/', CommitteeController.deleteById);

committeeRoutes.get('/members', CommitteeController.getMembers);
committeeRoutes.post('/members', CommitteeController.postMemberBatch);
committeeRoutes.put('/members', CommitteeController.putMemberBatch);
committeeRoutes.delete('/members', CommitteeController.deleteMemberById);

export default committeeRoutes;
