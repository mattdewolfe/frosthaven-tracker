import { getDb } from '../database';
import BaseController from './BaseController';
import { Element } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class ElementController extends BaseController {
    static getAll(req, res, next) {
        Element
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
