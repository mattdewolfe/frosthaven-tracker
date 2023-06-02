import serverlessExpress from '@vendia/serverless-express';
import aws from 'aws-sdk';
import AWSXRay from 'aws-xray-sdk';
import app from './app';
import { BaseErrorHandler } from './error-handlers';

const AWS = AWSXRay.captureAWS(aws);

// Create client outside of handler to reuse
// eslint-disable-next-line no-unused-vars
const lambda = new AWS.Lambda();

export function handler(event, context, callback) {
    try {
        return serverlessExpress({ app })(event, context, callback);
    } catch (error) {
        return callback(null, {
            statusCode: 500,
            headers: {},
            body: JSON.stringify({
                success: false,
                errors: [
                    BaseErrorHandler.constructFromError(error),
                ],
            }),
        });
    }
};
