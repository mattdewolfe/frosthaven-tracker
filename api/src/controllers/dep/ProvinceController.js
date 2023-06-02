import {getDb} from '../database';
import BaseController from './BaseController';
import {province} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class ProvinceController extends BaseController {
    static getAll(req, res, next) {
        province
            .getAll({ ...req.query }, getDb())
            .then(async (provRecords) => {
                return res.status(200).json(provRecords);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
