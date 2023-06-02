import { InternalServerErrorHandler, PostgresErrorHandler } from '../error-handlers';

export default class BaseController {
    static methodNotAllowed(req, res) {
        res.status(405).json({
            success: false,
            error: [{
                message: 'Method Not Allowed',
            }],
        });
    }

    static wrapTransactionToError(index, error) {
        let errorObject;

        switch (true) {
            case error instanceof TypeError:
                errorObject = InternalServerErrorHandler.constructFromError(error);
                break;
            default:
                errorObject = PostgresErrorHandler.constructFromError(error);
        }

        errorObject.message = `Error in transaction with entry [${index}]: ${errorObject.message}`;
        return errorObject;
    }

    static get(req, res) {
        return BaseController.methodNotAllowed(req, res);
    }

    static post(req, res) {
        return BaseController.methodNotAllowed(req, res);
    }

    static put(req, res) {
        return BaseController.methodNotAllowed(req, res);
    }

    static delete(req, res) {
        return BaseController.methodNotAllowed(req, res);
    }

    static patch(req, res) {
        return BaseController.methodNotAllowed(req, res);
    }

    static options(req, res) {
        return BaseController.methodNotAllowed(req, res);
    }

    static head(req, res) {
        return BaseController.methodNotAllowed(req, res);
    }
}
