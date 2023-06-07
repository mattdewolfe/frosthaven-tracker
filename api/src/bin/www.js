#!/usr/bin/env node
import http from 'http';
import debugLib from 'debug';
import dotenv from 'dotenv';
import app from '../app.js';

if (process.env.DEBUG) {
    console.log(`Setting up ${process.env.APP_TARGET} environment variables`);
    dotenv.config({ path: `./.env.${process.env.APP_TARGET}` });
}

const debug = debugLib('parliament-api:server');

const port = process.env.PORT || '3002';
const server = http.createServer(app);

app.set('port', port);

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
};

const onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string'
        ? `pipe ${address}`
        : `port ${address.port}`;
    debug(`Listening on ${bind}`);
};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
