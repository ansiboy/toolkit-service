"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = {
    arugmentNull(name) {
        let msg = `Argument ${name} cannt be null or empty.`;
        return new Error(msg);
    },
    argumentTypeError(name, exepectedType, actualType) {
        let msg = `Argument ${name} expected ${exepectedType} type, actual is ${actualType} type.`;
    }
};
