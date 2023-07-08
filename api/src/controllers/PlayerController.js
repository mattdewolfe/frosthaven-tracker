import { getDb } from '../database';
import BaseController from './BaseController';
import { Player } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class PlayerController extends BaseController {
    static get(req, res, next) {
        Player
            .get({ ...req.query }, getDb())
            .then(async (records) => {
                console.log(records);
                return res.status(200).json(records);
            }, (e) => {
                console.log(e);
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
