import { getDb } from '../database';
import BaseController from './BaseController';
import { CreatureClass } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class CreatureClassController extends BaseController {
    static getAll(req, res, next) {
        CreatureClass
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
