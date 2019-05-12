"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_node_mvc_1 = require("maishu-node-mvc");
const level = require("level");
const path = require("path");
const common_1 = require("../common");
const NUMBER_LENGTH = 6;
let database = level(path.join(__dirname, "../unique-number-db"));
class UniqueNumberGenerator {
    constructor(db, numberLength) {
        console.assert(db != null);
        this.avalidNumbers = [];
        this.db = db;
        this.numberLength = numberLength;
        this.initData(db, numberLength);
    }
    initData(db, numberLength) {
        db.get(`${numberLength}`, (err, value) => {
            if (err && err.type != common_1.constants.dbNotFound)
                throw err;
            if (err && err.type == common_1.constants.dbNotFound) {
                let arr = [];
                let min = Number.parseInt("1" + "0".repeat(numberLength - 1));
                let max = Number.parseInt("1" + "0".repeat(numberLength)) - 1;
                for (let i = min; i <= max; i++) {
                    arr.push(i);
                }
                this.shuffle(arr);
                value = arr.map(o => `${o}`).join(",");
                db.put(`${NUMBER_LENGTH}`, value);
            }
            this.avalidNumbers = value.split(",").map(o => Number.parseInt(o));
            this.startSaveTask();
        });
    }
    startSaveTask() {
        setInterval(() => {
            let value = this.avalidNumbers.map(o => `${o}`).join(",");
            this.db.put(`${this.numberLength}`, value);
        }, 1000 * 60);
    }
    getNumber() {
        if (this.avalidNumbers.length == 0)
            throw new Error("All the numbers are used.");
        let value = this.avalidNumbers.pop();
        if (value == null)
            throw new Error("data error");
        console.log(`还有 ${this.avalidNumbers.length} 个数字可用`);
        return value;
    }
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}
let uniqueNumberGenerator = new UniqueNumberGenerator(database, NUMBER_LENGTH);
let Controller = class Controller {
    main() {
        // return getUniqueNumber(database, NUMBER_LENGTH)
        return uniqueNumberGenerator.getNumber();
    }
};
__decorate([
    maishu_node_mvc_1.action("/unique-number")
], Controller.prototype, "main", null);
Controller = __decorate([
    maishu_node_mvc_1.controller()
], Controller);
exports.Controller = Controller;
