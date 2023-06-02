import {getDb} from '../database';
import BaseController from './BaseController';
import {parliamentarianType} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class ParliamentarianTypeController extends BaseController {
    static getAll(req, res, next) {
        parliamentarianType
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
