import {getDb} from '../database';
import BaseController from './BaseController';
import {people} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class IndexController extends BaseController {
    static getAll(req, res, next) {
        people
            .getAll({ ...req.query }, getDb())
            .then(async (familyRecords) => {
                return res.status(200).json(familyRecords);
            }, (e) => {
                console.log(e);
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
