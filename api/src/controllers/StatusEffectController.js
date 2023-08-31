import { getDb } from '../database';
import BaseController from './BaseController';
import { StatusEffect, StatusApplied, StatusReceived } from '../models';
import { BadRequestErrorHandler } from '../error-handlers';

export default class StatusEffectController extends BaseController {
    static getAll(req, res, next) {
        StatusEffect
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getAllApplied(req, res, next) {
        StatusApplied
            .getAllApplied({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteAppliedById(req, res, next) {
        StatusApplied
            .deleteById({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteAppliedByScenario(req, res, next) {
        StatusApplied
            .deleteByScenario({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static postAppliedBatch(req, res, next) {
        StatusApplied
            .postBatch({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getAllReceived(req, res, next) {
        StatusReceived
            .getAllReceived({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteReceivedById(req, res, next) {
        StatusReceived
            .deleteById({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteReceivedByScenario(req, res, next) {
        StatusReceived
            .deleteByScenario({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static postReceivedBatch(req, res, next) {
        StatusReceived
            .postBatch({ ...req.query, ...req.body }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
