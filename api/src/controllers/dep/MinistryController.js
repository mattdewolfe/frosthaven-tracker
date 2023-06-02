import {getDb} from '../database';
import BaseController from './BaseController';
import {ministryMember, ministry} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class CaucusController extends BaseController {
    static postMemberBatch(req, res, next) {
        ministryMember
            .postBatch({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json("New Members Added");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static putMemberBatch(req, res, next) {
        ministryMember
            .putBatch({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json("Members Updated");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteMemberById(req, res, next) {
        ministryMember
            .deleteById({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json("Ministry Member Deleted");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getMembers(req, res, next) {
        ministryMember
            .getByMinistryId({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static get(req, res, next) {
        ministry
            .get({...req.query}, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static post(req, res, next) {
        ministry
            .post({ ...req.query }, getDb())
            .then(async (result) => {
                return res.status(200).json("New Ministry Added");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static put(req, res, next) {
        ministry
            .putById({ ...req.query }, getDb())
            .then(async (result) => {
                return res.status(200).json("Ministry Updated");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteById(req, res, next) {
        ministry
            .deleteById({ ...req.query }, getDb())
            .then(async (result) => {
                return res.status(200).json("Ministry Deleted");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
