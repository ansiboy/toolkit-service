import { startServer } from 'maishu-node-mvc'

interface Options {
    port: number
}

export function start(options: Options) {
    startServer({
        port: options.port,
        rootPath: __dirname
    })
}