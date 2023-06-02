import {getDb} from '../database';
import BaseController from './BaseController';
import {testCase} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class UsageProfileController extends BaseController {
    static get(req, res, next) {
        testCase
            .get({ ...req.query }, getDb())
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static post(req, res, next) {
        testCase
            .post({ ...req.query }, getDb())
            .then((result) => {
                return res.status(200).json("Test Protocol Created");
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static putById(req, res, next) {
        testCase
            .putById({ ...req.query }, getDb())
            .then((result) => {
                return res.status(200).json("Test Protocol Updated");
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteById(req, res, next) {
        testCase
            .deleteById({ ...req.query }, getDb())
            .then((result) => {
                return res.status(200).json("Test Protocol Deleted");
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static postAssociatedDevices(req, res, next) {
        testCase
            .postAssociatedDevices({...req.query}, getDb())
            .then((result) => {
                return res.status(200).json("Test Protocol Associated Devices Updated");
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getDeviceAssociatedTests(req, res, next) {
        testCase
            .getDeviceAssociatedTests({...req.query}, getDb())
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getAssociatedDevices(req, res, next) {
        testCase
            .getAssociatedDevices({...req.query}, getDb())
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteAssociatedDevice(req, res, next) {
        testCase
            .deleteAssociatedDevice({...req.query }, getDb())
            .then((result) => {
                return res.status(200).json("Test Protocol Device Association Removed");
            })
            .catch((e) =>{
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
