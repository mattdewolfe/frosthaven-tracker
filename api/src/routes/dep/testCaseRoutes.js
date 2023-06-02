import { Router } from 'express';
import {TestCaseController} from '../controllers';

const testCaseRoutes = Router();

testCaseRoutes.get('/', TestCaseController.get);
testCaseRoutes.post('/', TestCaseController.post);
testCaseRoutes.delete('/', TestCaseController.deleteById);
testCaseRoutes.put('/', TestCaseController.putById);

testCaseRoutes.get('/device', TestCaseController.getDeviceAssociatedTests);
testCaseRoutes.delete('/device', TestCaseController.deleteAssociatedDevice);
testCaseRoutes.post('/devices', TestCaseController.postAssociatedDevices);
testCaseRoutes.get('/devices', TestCaseController.getAssociatedDevices);

export default testCaseRoutes;
