import { QueryResultError, queryResultErrorCode } from 'pg-promise/lib/errors/index.js';
import { BaseErrorHandler, errorClass as baseErrorClass } from '../BaseErrorHandler.js';

const errorClass = {
    ...baseErrorClass,
    DATABASE: 'DATABASE',
};

class PostgresErrorHandler extends BaseErrorHandler {
    static constructFromError(error) {
        switch (true) {
            case error instanceof QueryResultError:
                return this.handleQueryResultError(error);
            default:
                return this.handleError(error);
        }
    }

    static handleQueryResultError(error) {
        const classType = errorClass.DATABASE;

        let code = error.code !== undefined ? error.code : 'unknown';
        let message;

        switch (code) {
            case queryResultErrorCode.noData:
                code = 'EXPECTS_RESULTS';
                break;
            case queryResultErrorCode.notEmpty:
                code = 'EXPECTS_NO_RESULTS';
                break;
            case queryResultErrorCode.multiple:
                code = 'RESULTS_OUT_OF_RANGE';
                break;
            default:
                code = 'UNKNOWN';
        }

        const type = [classType, code].join('_').toUpperCase();

        return new this(type, classType, message || error.message);
    }

    static handleError(error) {
        const classType = errorClass.DATABASE;

        let code = error.code || 'unknown';
        let message;

        switch (code) {
            case 'EAI_AGAIN':
                message = `Could not resolve host [${error.host}:${error.port || null}]`;
                break;
            case 'ENOTFOUND':
                message = `Could not resolve host [${error.host || 'unknown'}:${error.port || null}]`;
                break;
            case '22P02':
            case '22003':
                code = 'TYPE';
                break;
            case '23502':
                code = 'REQUIRED';
                break;
            case '23503':
                code = 'CONSTRAINT';
                message = error.detail;
                break;
            case '23505':
                code = 'DUPLICATE_KEY';
                break;
            case '25P02':
                code = 'TRANSACTION_ABORTED';
                break;
            case '42P01':
            case '42P02':
                code = 'QUERY';
                break;
            default:
                code = 'UNKNOWN';
        }

        const type = [classType, code].join('_').toUpperCase();

        return new this(type, classType, message || error.message);
    }
}

PostgresErrorHandler.errorClass = errorClass;

export default PostgresErrorHandler;
