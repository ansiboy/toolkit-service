import { controller, action } from "maishu-node-mvc";
import level = require("level");
import path = require('path')
import { constants } from "../common";

const NUMBER_LENGTH = 6

let database = level(path.join(__dirname, "../unique-number-db"))
class UniqueNumberGenerator {
    private db: LevelDB;
    private avalidNumbers: number[];
    private numberLength: number;

    constructor(db: LevelDB, numberLength: number) {
        console.assert(db != null)

        this.avalidNumbers = []
        this.db = db
        this.numberLength = numberLength;
        this.initData(db, numberLength)
    }

    private initData(db: LevelDB, numberLength: number) {
        db.get(`${numberLength}`, (err: any, value) => {
            if (err && err.type != constants.dbNotFound)
                throw err

            if (err && err.type == constants.dbNotFound) {
                let arr = []
                let min = Number.parseInt("1" + "0".repeat(numberLength - 1))
                let max = Number.parseInt("1" + "0".repeat(numberLength)) - 1
                for (let i = min; i <= max; i++) {
                    arr.push(i)
                }
                this.shuffle(arr)
                value = arr.map(o => `${o}`).join(",")
                db.put(`${NUMBER_LENGTH}`, value)
            }

            this.avalidNumbers = value.split(",").map(o => Number.parseInt(o))
            this.startSaveTask()
        })
    }

    private startSaveTask() {
        setInterval(() => {
            let value = this.avalidNumbers.map(o => `${o}`).join(",")
            this.db.put(`${this.numberLength}`, value)
        }, 1000 * 60)
    }

    getNumber(): number {
        if (this.avalidNumbers.length == 0)
            throw new Error("All the numbers are used.")

        let value = this.avalidNumbers.pop()
        if (value == null)
            throw new Error("data error")

        console.log(`还有 ${this.avalidNumbers.length} 个数字可用`)
        return value
    }

    private shuffle(array: Array<any>) {
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

let uniqueNumberGenerator = new UniqueNumberGenerator(database, NUMBER_LENGTH)

@controller("/tool")
export class Controller {

    @action("unique-number")
    main() {
        // return getUniqueNumber(database, NUMBER_LENGTH)
        return uniqueNumberGenerator.getNumber()
    }
}