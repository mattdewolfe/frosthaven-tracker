const errorClass = {
    ERROR_CLASS_APPLICATION: 'APPLICATION',
};

class BaseErrorHandler {
    constructor(type, classType, message) {
        this.type = type;
        this.class = classType;
        this.message = message;
    }

    /**
   * @param {Error} error
   * @returns {BaseErrorHandler}
   */
    static constructFromError(error) {
        const classType = errorClass.ERROR_CLASS_APPLICATION;

        let code = error.code || 'unknown';

        switch (code) {
            case 'ERR_INVALID_ARG_TYPE':
                code = 'error';
                break;
            default:
                code = 'unknown';
                break;
        }

        const type = [classType, code || 'unknown'].join('_').toUpperCase();

        return new this(type, classType, error.message);
    }
}

export {
    BaseErrorHandler,
    errorClass,
};
