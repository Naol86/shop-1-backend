"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successHandler = void 0;
const successHandler = (res, status, message, data) => {
    res.status(status).json({
        success: true,
        message: message,
        data: data,
    });
};
exports.successHandler = successHandler;
