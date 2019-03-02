/**
 * 简单对象服务，用于保存，获取简单，很少需要写入的对象。
 */
export default class SimpleObject {
    put({ key, value }: {
        key: string;
        value: any;
    }): Promise<any>;
    get({ key }: {
        key: string;
    }): Promise<any>;
    delete({ key }: {
        key: string;
    }): Promise<any>;
}
