"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_node_mvc_1 = require("maishu-node-mvc");
function start(options) {
    maishu_node_mvc_1.startServer({
        port: options.port,
        rootPath: __dirname
    });
}
exports.start = start;
