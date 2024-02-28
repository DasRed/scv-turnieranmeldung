import template from './template/index.js';
import {parse} from 'querystring';

export const handler = (event) => {
    return new Promise((resolve, reject) => {
        if (event?.requestContext?.http?.method === 'POST') {
            const params = parse(event.requestContext.isBase64Encoded ? atob(event.requestContext.body) : event.requestContext.body);

            console.log(event);
            console.log(params);

            resolve({
                statusCode: 200,
                body:       JSON.stringify(event)
            });

        }

        else {
            resolve({
                statusCode: 200,
                headers:    {'Content-Type': 'text/html; charset=UTF-8'},
                body:       template.body(template.form())
            });
        }
    });
};
