import {getDb} from '../database';
import BaseController from './BaseController';
import {committeeRole} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class CommitteeRoleController extends BaseController {
    static getAll(req, res, next) {
        committeeRole
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
