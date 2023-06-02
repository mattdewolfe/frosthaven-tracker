import express from 'express';
import { getCurrentInvoke } from '@vendia/serverless-express';
import expressMiddleware from '@vendia/serverless-express/src/middleware';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import url from 'url';
import router from './routes/index.js';
import jsonErrorHandler from './middleware/jsonErrorHandler';
import * as path from 'path';

const app = express();

const corsHandler = cors({
    allowedHeaders: ['Content-Type,Authorization,X-Api-Key'],
    exposedHeaders: ['Content-Type,Authorization,X-Api-Key'],
    origin: ['http://192.168.2.34:3002', 'http://localhost:3002'],
    methods: 'OPTIONS,POST,PUT,DELETE,GET'
});

app.options('*', corsHandler);
app.use(corsHandler);

app.use(morgan('combined'));

const customDomainAdapterMiddleware = (req, res, next) => {
    const { event, context } = getCurrentInvoke();

    if (event) {
        const searchParams = new URLSearchParams(event.queryStringParameters || {});
        const pathFromPathParameters = event.pathParameters || {};

        let { resource } = event;

        Object.keys(pathFromPathParameters).forEach((param) => {
            resource = resource.replace(`{${param === 'proxy' ? 'proxy+' : param}}`, pathFromPathParameters[param]);
        });

        const interpolatedResource = url.parse(path.join(`/${event.requestContext.stage}`, resource), true);
        interpolatedResource.search = searchParams.toString();

        req.originalUrl = url.format(interpolatedResource);
    }

    next();
};

if (process.env.LAMBDA_TASK_ROOT) {
    app.set('trust proxy', true);
    app.use(expressMiddleware.eventContext());
    app.use(customDomainAdapterMiddleware);
}

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Replace single quotes inside of strings with double quote to escape them inside of query,
// All other special characters are handled by the fact that its a '' wrapped string.
app.use(function (req, res, next) {
    if (req.query) {
        let keys = Object.keys(req.query);
        for (let prop of keys) {
            req.query[prop] = req.query[prop].replace(/'/g, `\'\'`);
        }
    }

    next();
});

app.use('/v1', router);
app.use(express.static('images'));

app.use(jsonErrorHandler);

export default app;
