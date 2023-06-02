import {getDb} from '../database';
import BaseController from './BaseController';
import {caucus, caucusMember} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class CaucusController extends BaseController {
    static postMemberBatch(req, res, next) {
        caucusMember
            .postBatch({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json("New Members Added");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static putMemberBatch(req, res, next) {
        caucusMember
            .putBatch({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json("Members Updated");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteMemberById(req, res, next) {
        caucusMember
            .deleteById({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json("Caucus Member Deleted");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getMembers(req, res, next) {
        caucusMember
            .getByCaucusId({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static get(req, res, next) {
        caucus
            .get({...req.query}, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static post(req, res, next) {
        caucus
            .post({ ...req.query }, getDb())
            .then(async (result) => {
                return res.status(200).json("New Caucus Added");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static put(req, res, next) {
        caucus
            .putById({ ...req.query }, getDb())
            .then(async (result) => {
                return res.status(200).json("Caucus Updated");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteById(req, res, next) {
        caucus
            .deleteById({ ...req.query }, getDb())
            .then(async (result) => {
                return res.status(200).json("Caucus Deleted");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
