"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ERROR_STATUSES = {
    OK: {
        code: 200,
        description: 'Ok',
    },
    Created: {
        code: 201,
        description: 'Created',
    },
    Unauthorized: {
        code: 401,
        description: 'Unauthorized',
    },
    Forbidden: {
        code: 403,
        description: 'Forbidden',
    },
    'Unprocessable Entity': {
        code: 422,
        description: 'Unprocessable Entity',
    },
    'Not Found': {
        code: 404,
        description: 'Not Found',
    },
    'Internal Server Error': {
        code: 500,
        description: 'Internal Server Error',
    },
};
exports.default = ERROR_STATUSES;
//# sourceMappingURL=errorStatutes.js.map