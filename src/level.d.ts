



interface LevelDB {
    del(key: string): Promise<any>;
    put(key: string, value: string, callback?: (err: Error) => void): Promise<any>
    get(key: string, callback?: (err: any, value: string) => void): Promise<any>
}

declare module 'level' {
    // type F = (path: string) => {};
    // (): boolean;
    // export =  Function
    // interface Level {
    //     (path: string): {}
    // }

    function Level(path: string): LevelDB;



    export = Level
}