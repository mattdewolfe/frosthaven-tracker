// Basic error class for RestErrors from API calls.

class RestError extends Error {
    constructor(status = 0, errorCode = "", message = "", field = "", errors = []) {
        super(message);

        this.errors = errors;
        this.field = field;
        this.status = status;
        this.errorCode = errorCode;
        this.name = "RestError";
    }
}

export default RestError;