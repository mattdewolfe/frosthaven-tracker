import { BaseErrorHandler, errorClass as baseErrorClass } from './BaseErrorHandler.js';

const errorClass = {
    ...baseErrorClass,
    ERROR_CLASS_APPLICATION: 'APPLICATION',
};

class InternalServerErrorHandler extends BaseErrorHandler {
    /**
     * @param {Error} error
     * @returns {BaseErrorHandler}
     */
    static constructFromError(error) {
        const classType = errorClass.ERROR_CLASS_APPLICATION;
        const type = 'INTERNAL_SERVER_ERROR';

        return new this(type, classType, error.message);
    }
}

InternalServerErrorHandler.errorClass = errorClass;

export default InternalServerErrorHandler;
