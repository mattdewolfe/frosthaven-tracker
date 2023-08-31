import { getDb } from '../database';
import BaseController from './BaseController';
import { Scenario } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class IndexController extends BaseController {
    static getAll(req, res, next) {
        Scenario
            .getAll({ ...req.query }, getDb())
            .then(async (familyRecords) => {
                return res.status(200).json(familyRecords);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
