import { BaseErrorHandler, errorClass as baseErrorClass } from './BaseErrorHandler.js';

const errorClass = {
    ...baseErrorClass,
    ERROR_CLASS_APPLICATION: 'DATABASE',
};

class NotFoundErrorHandler extends BaseErrorHandler {
    /**
     * @param {Error} error
     * @returns {BaseErrorHandler}
     */
    static constructFromError(error) {
        const classType = errorClass.ERROR_CLASS_APPLICATION;
        const type = 'DATABASE_NO_RESULTS';

        return new this(type, classType, error.message);
    }
}

NotFoundErrorHandler.errorClass = errorClass;

export default NotFoundErrorHandler;
