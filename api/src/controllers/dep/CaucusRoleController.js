import {getDb} from '../database';
import BaseController from './BaseController';
import {caucusRole} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class CaucusRoleController extends BaseController {
    static getAll(req, res, next) {
        caucusRole
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
