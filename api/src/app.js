import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';
import jsonErrorHandler from './middleware/jsonErrorHandler';

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

app.use('/', router);
app.use(express.static('images'));

app.use(jsonErrorHandler);

export default app;
