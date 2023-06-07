import { getDb } from '../database';
import BaseController from './BaseController';
import { ScenarioOutcome } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class ScenarioOutcomeController extends BaseController {
    static getAll(req, res, next) {
        ScenarioOutcome
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
