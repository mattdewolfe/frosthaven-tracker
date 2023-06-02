import { getDb } from '../database';
import BaseController from './BaseController';
import { StatusEffect } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class StatusEffectController extends BaseController {
    static getAll(req, res, next) {
        StatusEffect
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
