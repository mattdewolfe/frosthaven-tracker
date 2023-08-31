import { getDb } from '../database';
import BaseController from './BaseController';
import { PlayerCharacter } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class PlayerCharacterController extends BaseController {
    static get(req, res, next) {
        PlayerCharacter
            .get({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static put(req, res, next) {
        PlayerCharacter
            .put({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static post(req, res, next) {
        PlayerCharacter
            .post({ ...req.query, ...req.body }, getDb())
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
