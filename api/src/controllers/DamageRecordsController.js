import { getDb } from '../database';
import BaseController from './BaseController';
import { DamageDealt, DamageTaken } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class DamageRecordsController extends BaseController {
    static getAllTaken(req, res, next) {
        DamageTaken
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static postDamageTaken(req, res, next) {
        DamageTaken
            .post({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getAllDealt(req, res, next) {
        DamageDealt
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static postDamageDealt(req, res, next) {
        DamageDealt
            .post({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

}
