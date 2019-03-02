"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_node_mvc_1 = require("maishu-node-mvc");
/**
 * 简单对象服务，用于保存，获取简单类型的对象
 */
let SimpleObject = class SimpleObject {
    insert() {
        return "insert";
    }
    update() {
        return "update";
    }
    delete() {
    }
};
__decorate([
    maishu_node_mvc_1.action()
], SimpleObject.prototype, "insert", null);
__decorate([
    maishu_node_mvc_1.action()
], SimpleObject.prototype, "update", null);
__decorate([
    maishu_node_mvc_1.action()
], SimpleObject.prototype, "delete", null);
SimpleObject = __decorate([
    maishu_node_mvc_1.controller()
], SimpleObject);
exports.default = SimpleObject;
