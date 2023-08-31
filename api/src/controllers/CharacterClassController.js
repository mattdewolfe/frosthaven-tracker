import { getDb } from '../database';
import BaseController from './BaseController';
import { CharacterClass } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class CharacterClassController extends BaseController {
    static getAll(req, res, next) {
        CharacterClass
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
