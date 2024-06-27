const { constants } = require("./constants");

const errorHandler = (err, req, res, next) => { // So a response always returns with these four parameters
    const statusCode = res.statusCode ? res.statusCode : 500; // There is always a statusCode attached with the response
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            res.json({
                title: `Some kind of error with statusCode: ${res.statusCode}`,
                message: err.message,
                stackTrace: err.stack
            });
            console.log(`Error or no error with status code ${res.statusCode}`);
            break;
    }

};

module.exports = errorHandler;