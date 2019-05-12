import { startServer } from 'maishu-node-mvc'
import path = require('path')

startServer({
    port: 1295,
    controllerDirectories: [path.join(__dirname, 'modules')]
})