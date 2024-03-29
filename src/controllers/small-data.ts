import { controller, action, formData } from "maishu-node-mvc";
import level = require("level");
import path = require('path')
import { constants } from "../common";
import { errors } from "./error";

let database = level(path.join(__dirname, "../small-data-db"))

/**
 * 简单对象服务，用于保存，获取简单，很少需要写入的对象。
 */
@controller(`/data`)
export default class SimpleObject {

    @action()
    public async put(@formData { key, value }: { key: string, value: any }) {
        if (!key) throw errors.arugmentNull('key')
        if (value == null) throw errors.arugmentNull("value")
        if (typeof value != 'object') throw errors.argumentTypeError('value', 'object', typeof value)

        let str = JSON.stringify(value)
        let r = await database.put(key, str)
        return r
    }

    @action()
    public async get(@formData { key }: { key: string }) {
        if (!key) throw errors.arugmentNull('key')
        try {
            let value = await database.get(key)
            return value
        }
        catch (err) {
            if (err.type == constants.dbNotFound) {
                return null
            }
            throw err
        }
    }

    @action()
    public delete(@formData { key }: { key: string }) {
        return database.del(key)
    }
}