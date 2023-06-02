import { Router } from "express";
import { MinistryController } from "../controllers";

const ministryRoutes = Router();

ministryRoutes.get('/', MinistryController.get);
ministryRoutes.post('/', MinistryController.post);
ministryRoutes.put('/', MinistryController.put);
ministryRoutes.delete('/', MinistryController.deleteById);

ministryRoutes.get('/members', MinistryController.getMembers);
ministryRoutes.post('/members', MinistryController.postMemberBatch);
ministryRoutes.put('/members', MinistryController.putMemberBatch);
ministryRoutes.delete('/members', MinistryController.deleteMemberById);

export default ministryRoutes;
