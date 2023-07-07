import { getDb } from '../database';
import BaseController from './BaseController';
import { Element, ElementGenerated, ElementConsumed } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class ElementController extends BaseController {
    static getAll(req, res, next) {
        Element
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getAllGenerated(req, res, next) {
        ElementGenerated
            .getAllGenerated({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteGeneratedById(req, res, next) {
        ElementGenerated
            .deleteById({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteGeneratedByScenario(req, res, next) {
        ElementGenerated
            .deleteByScenario({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static postGeneratedBatch(req, res, next) {
        ElementGenerated
            .postBatch({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getAllConsumed(req, res, next) {
        ElementConsumed
            .getAllConsumed({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteConsumedById(req, res, next) {
        ElementConsumed
            .deleteById({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteConsumedByScenario(req, res, next) {
        ElementConsumed
            .deleteByScenario({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static postConsumedBatch(req, res, next) {
        ElementConsumed
            .postBatch({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
