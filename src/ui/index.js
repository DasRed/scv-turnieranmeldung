import {parse} from 'querystring';
import get from './get.js';
import post from './post.js';
import template from './template/index.js';

const config = {
    ages: {
        U7:  'U7 Jg. 2017 - 14.07.2024 - 10:00',
        U8:  'U8 Jg. 2016 - 13.07.2024 - 12:30',
        U9:  'U9 Jg. 2015 - 13.07.2024 - 09:30',
        U10: 'U10 Jg. 2014 - 13.07.2024 - 14:30',
        U11: 'U11 Jg. 2013 - 14.07.2024 - 12:00'
    }
};

export const handler = (event) => {
    return new Promise(async (resolve) => {
        console.log(event);

        if (process.env.SCV_CLOSED === '1') {
            resolve({
                statusCode: 200,
                headers:    {'Content-Type': 'text/html; charset=UTF-8'},
                body:       template.body(template.closed())
            });
        }

        // handle post
        if (event?.requestContext?.http?.method === 'POST') {
            resolve(await post(config, parse(event.isBase64Encoded ? atob(event.body) : event.body)));
        }

        // success
        else if (event?.requestContext?.http?.method === 'PUT') {
            resolve({
                statusCode: 200,
                headers:    {'Content-Type': 'text/html; charset=UTF-8'},
                body:       template.body(template.success())
            });
        }

        // deliver form
        else {
            resolve(await get(config));
        }
    });
};
