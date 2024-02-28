import template from './template/index.js';

export const handler = (event) => {
    return new Promise((resolve, reject) => {
        if (event.httpMethod === 'POST') {
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
