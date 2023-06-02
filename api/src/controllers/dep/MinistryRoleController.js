import {getDb} from '../database';
import BaseController from './BaseController';
import {ministryRole} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class MinistryRoleController extends BaseController {
    static getAll(req, res, next) {
        ministryRole
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
