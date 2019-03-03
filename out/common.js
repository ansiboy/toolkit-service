"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = {
    dbNotFound: 'NotFoundError'
};
exports.baseUrl = "/tool";
function setBaseUrl(value) {
    exports.baseUrl = value;
}
exports.setBaseUrl = setBaseUrl;
