import { Router } from "express";
import { CaucusController } from "../controllers";

const caucusRoutes = Router();

caucusRoutes.get('/', CaucusController.get);
caucusRoutes.post('/', CaucusController.post);
caucusRoutes.put('/', CaucusController.put);
caucusRoutes.delete('/', CaucusController.deleteById);

caucusRoutes.get('/members', CaucusController.getMembers);
caucusRoutes.post('/members', CaucusController.postMemberBatch);
caucusRoutes.put('/members', CaucusController.putMemberBatch);
caucusRoutes.delete('/members', CaucusController.deleteMemberById);

export default caucusRoutes;
