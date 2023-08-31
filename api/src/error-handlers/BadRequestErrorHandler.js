import { BaseErrorHandler, errorClass as baseErrorClass } from './BaseErrorHandler.js';

const errorClass = {
    ...baseErrorClass,
    ERROR_CLASS_APPLICATION: 'USER',
};

class BadRequestErrorHandler extends BaseErrorHandler {
    /**
     * @param {Error} error
     * @returns {BaseErrorHandler}
     */
    static constructFromError(error) {
        const classType = errorClass.ERROR_CLASS_APPLICATION;
        const type = 'BAD_REQUEST_ERROR';

        return new this(type, classType, error.message);
    }
}

BadRequestErrorHandler.errorClass = errorClass;

export default BadRequestErrorHandler;
