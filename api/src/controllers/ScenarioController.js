import { getDb } from '../database';
import BaseController from './BaseController';
import { Scenario } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class ScenarioController extends BaseController {
    static getAll(req, res, next) {
        Scenario
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getById(req, res, next) {
        Scenario
            .getById({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
<<<<<<< HEAD

    static post(req, res, next) {
        Scenario
            .post({ ...req.query }, getDb())
            .then(async (result) => {
                return res.status(200).json(result);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
=======
>>>>>>> dev
}
