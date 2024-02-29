import {parse} from 'querystring';
import get from './get.js';
import post from './post.js';
import template from './template/index.js';

const config = {
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/html; charset=UTF-8'
    },
    ages: {
        U7:  'U7 Jg. 2017 - 14.07.2024 - 10:00',
        U8:  'U8 Jg. 2016 - 13.07.2024 - 12:30',
        U9:  'U9 Jg. 2015 - 13.07.2024 - 09:30',
        U10: 'U10 Jg. 2014 - 13.07.2024 - 14:30',
        U11: 'U11 Jg. 2013 - 14.07.2024 - 12:00'
    },
    errors: {
        1: 'Ihre Anmeldung konnte leider nicht gespeichert werden. Bitte versuchen sie es zu einem späteren Zeitpunkt noch einmal.',
        2: 'Bitte wählen sie eine gültige Alterklasse aus.',
        3: 'Bitte geben sie ihren Vereinsnamen an.',
        4: 'Bitte geben sie ihre Mannschaft an.',
        5: 'Bitte geben sie den Namen ihres Trainers an.',
        6: 'Bitte geben sie die Email ihres Trainers an.',
        7: 'Bitte geben sie die Telefonnummer ihres Trainers an.',
    },
    errorsMap: {
        SAVE_FAILED: 1,
        MISSING_AGE: 2,
        MISSING_ASSOCIATION: 3,
        MISSING_TEAM: 4,
        MISSING_COACH: 5,
        MISSING_EMAIL: 6,
        MISSING_MOBILE: 7,
    }
};

export const handler = (event) => {
    return new Promise(async (resolve) => {
        console.log(event);

        if (process.env.SCV_CLOSED === '1') {
            resolve({
                statusCode: 200,
                headers:    {...config.headers},
                body:       template.body(template.closed())
            });
        }

        // handle post
        if (event?.requestContext?.http?.method === 'POST') {
            resolve(await post(config, parse(event.isBase64Encoded ? atob(event.body) : event.body)));
        }

        // success
        else if (event?.queryStringParameters?.success !== undefined) {
            resolve({
                statusCode: 200,
                headers:    {...config.headers},
                body:       template.body(template.success())
            });
        }

        // error on save
        else if (event?.queryStringParameters?.error !== undefined && config.errors[event?.queryStringParameters?.error] !== undefined) {
            resolve(await get(config, config.errors[event?.queryStringParameters?.error]));
        }

        // deliver form
        else {
            resolve(await get(config));
        }
    });
};
