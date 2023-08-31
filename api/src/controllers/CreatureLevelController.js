import { getDb } from '../database';
import BaseController from './BaseController';
import { CreatureLevel } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class CreatureLevelController extends BaseController {
    static getAll(req, res, next) {
        CreatureLevel
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
