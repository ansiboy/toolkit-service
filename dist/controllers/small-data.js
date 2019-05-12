"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_node_mvc_1 = require("maishu-node-mvc");
const level = require("level");
const path = require("path");
const common_1 = require("../common");
const error_1 = require("./error");
let database = level(path.join(__dirname, "../small-data-db"));
/**
 * 简单对象服务，用于保存，获取简单，很少需要写入的对象。
 */
let SimpleObject = class SimpleObject {
    put({ key, value }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!key)
                throw error_1.errors.arugmentNull('key');
            if (value == null)
                throw error_1.errors.arugmentNull("value");
            if (typeof value != 'object')
                throw error_1.errors.argumentTypeError('value', 'object', typeof value);
            let str = JSON.stringify(value);
            let r = yield database.put(key, str);
            return r;
        });
    }
    get({ key }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!key)
                throw error_1.errors.arugmentNull('key');
            try {
                let value = yield database.get(key);
                return value;
            }
            catch (err) {
                if (err.type == common_1.constants.dbNotFound) {
                    return null;
                }
                throw err;
            }
        });
    }
    delete({ key }) {
        return database.del(key);
    }
};
__decorate([
    maishu_node_mvc_1.action()
], SimpleObject.prototype, "put", null);
__decorate([
    maishu_node_mvc_1.action()
], SimpleObject.prototype, "get", null);
__decorate([
    maishu_node_mvc_1.action()
], SimpleObject.prototype, "delete", null);
SimpleObject = __decorate([
    maishu_node_mvc_1.controller(`/data`)
], SimpleObject);
exports.default = SimpleObject;
