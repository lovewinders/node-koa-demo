import http from 'http'
import Koa from 'koa'
import path from 'path'
import convert from 'koa-convert'
import staticCache from 'koa-static-cache'
import cors from 'koa-cors'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import advice from './middleware/advice.js'
import config from './config'
import routers from './routers'

const app = new Koa();

// middlewares
app.use(Bodyparser({
    jsonLimit: '50mb'
}));

app.use(logger());

// static
app.use(staticCache(path.join(__dirname, '../public'), {
    gzip: true,
    // cache time
    maxAge: 365 * 24 * 60 * 60
}));

// global exception
app.use(advice);

// cross domain for ajax
app.use(convert(cors()));

// routers
app.use(routers.routes()).use(routers.allowedMethods());

// error logger
app.on('error', async (err, ctx) => {
    console.log('error occured:', err)
});

const port = parseInt(config.app.port || '3000');
const server = http.createServer(app.callback());

server.listen(port);
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(port + ' requires elevated privileges');
        process.exit(1);
    case 'EADDRINUSE':
        console.error(port + ' is already in use');
        process.exit(1);
    default:
        throw error
    }
});
server.on('listening', () => {
    console.log('Listening on port: %d', port)
});

export default app
