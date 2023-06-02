import {getDb} from '../database';
import BaseController from './BaseController';
import {people} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class PersonController extends BaseController {
    static getById(req, res, next) {
        people
            .getById({ ...req.query }, getDb())
            .then((entity) => {
                return res.status(200).json(entity);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static post(req, res, next) {
        people
            .post({ ...req.query }, getDb())
            .then(async () => {
                return res.status(200).json('Entity Created');
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteById(req, res, next) {
        people
            .deleteById({ ...req.query }, getDb())
            .then((result) => {
                return res.status(200).json('Entity Deleted');
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static putById(req, res, next) {
        people
            .putById({ ...req.query }, getDb())
            .then((result) => {
                return res.status(200).json('Entity Updated');
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getCaucusRolesById(req, res, next) {
        people
            .getCaucusRolesById({ ...req.query }, getDb())
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getCommitteeRolesById(req, res, next) {
        people
            .getCommitteeRolesById({ ...req.query }, getDb())
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getMinistryRolesById(req, res, next) {
        people
            .getMinistryRolesById({ ...req.query }, getDb())
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
