/* eslint-disable-next-line no-unused-vars */
export default (err, req, res, next) => {
    res.status(500);
    const error = {
        code: 0,
        success: false,
        message: err.message,
    };

    if (err.stack) {
        error.stack = err.stack;
    }

    res.json(error);
};
