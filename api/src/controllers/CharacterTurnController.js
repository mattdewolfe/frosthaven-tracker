import { getDb } from '../database';
import BaseController from './BaseController';
import { CharacterTurn } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class CharacterTurnController extends BaseController {
    static getById(req, res, next) {
        CharacterTurn
            .getById({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getAll(req, res, next) {
        CharacterTurn
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static put(req, res, next) {
        CharacterTurn
            .put({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static post(req, res, next) {
        CharacterTurn
            .post({ ...req.query, ...req.body }, getDb())
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
