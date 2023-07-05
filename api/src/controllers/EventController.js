import { getDb } from '../database';
import BaseController from './BaseController';
import { Event } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class EventController extends BaseController {
    static getById(req, res, next) {
        Event
            .getById({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getAll(req, res, next) {
        Event
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static put(req, res, next) {
        Event
            .put({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static post(req, res, next) {
        Event
            .post({ ...req.query, ...req.body }, getDb())
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
