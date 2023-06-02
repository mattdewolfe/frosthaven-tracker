import {getDb} from '../database';
import BaseController from './BaseController';
import {party} from '../models';
import {BadRequestErrorHandler} from '../error-handlers';

export default class PartyController extends BaseController {
    static getMemberCount(req, res, next) {
        party
            .getMemberCount({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getAll(req, res, next) {
        party
            .getAll({ ...req.query }, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }

    static getPartyData(req, res, next) {
        party
            .getById({...req.query}, getDb())
            .then(async (records) => {
                return res.status(200).json(records);
            }, (e) => {
                next(BadRequestErrorHandler.constructFromError(e));
            });
    }
}
