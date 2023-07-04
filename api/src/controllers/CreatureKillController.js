import { getDb } from '../database';
import BaseController from './BaseController';
import { CreatureKilled } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class CreatureKillController extends BaseController {
    static getAll(req, res, next) {
        CreatureKilled
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static put(req, res, next) {
        CreatureKilled
            .put({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static post(req, res, next) {
        CreatureKilled
            .post({ ...req.query }, getDb())
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
