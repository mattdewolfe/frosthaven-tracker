import { getDb } from '../database';
import BaseController from './BaseController';
import { DamageSource } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class DamageSourceController extends BaseController {
    static getAll(req, res, next) {
        DamageSource
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
