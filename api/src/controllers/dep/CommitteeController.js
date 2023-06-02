import {getDb} from '../database';
import BaseController from './BaseController';
import {committeeMember, committee} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class CommitteeController extends BaseController {
    static postMemberBatch(req, res, next) {
        committeeMember
            .postBatch({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json("New Members Added");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static putMemberBatch(req, res, next) {
        committeeMember
            .putBatch({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json("Members Updated");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteMemberById(req, res, next) {
        committeeMember
            .deleteById({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json("Committee Member Deleted");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getMembers(req, res, next) {
        committeeMember
            .getByCommitteeId({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static get(req, res, next) {
        committee
            .get({...req.query}, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static post(req, res, next) {
        committee
            .post({ ...req.query }, getDb())
            .then(async (result) => {
                return res.status(200).json("New Committee Added");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static put(req, res, next) {
        committee
            .putById({ ...req.query }, getDb())
            .then(async (result) => {
                return res.status(200).json("Committee Updated");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static deleteById(req, res, next) {
        committee
            .deleteById({ ...req.query }, getDb())
            .then(async (result) => {
                return res.status(200).json("Committee Deleted");
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
