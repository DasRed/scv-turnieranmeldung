import {parse} from 'querystring';
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
    return new Promise((resolve, reject) => {
        if (event?.requestContext?.http?.method === 'POST') {
            const params = parse(event.isBase64Encoded ? atob(event.body) : event.body);

            let error = undefined;
            // validierung
            switch (true) {
                case config.ages[params.age] === undefined:
                    error = 'Bitte wählen sie eine gültige Alterklasse aus.';
                    break;

                case params.association == null || params.association.length === 0 :
                    error = 'Bitte geben sie ihren Vereinsnamen an.';
                    break;

                case params.team == null || params.team.length === 0 :
                    error = 'Bitte geben sie ihre Mannschaft an.';
                    break;

                case params.coach == null || params.coach.length === 0 :
                    error = 'Bitte geben sie den Namen ihres Trainers an.';
                    break;

                case params.email == null || params.email.length === 0 :
                    error = 'Bitte geben sie die Email ihres Trainers an.';
                    break;

                case params.mobile == null || params.mobile.length === 0 :
                    error = 'Bitte geben sie die Telefonnummer ihres Trainers an.';
                    break;
            }

            if (error !== undefined) {
                resolve({
                    statusCode: 200,
                    headers:    {'Content-Type': 'text/html; charset=UTF-8'},
                    body:       template.body(template.form({ages: config.ages, error}))
                });

                return;
            }

            resolve({
                statusCode: 200,
                body:       JSON.stringify(event)
            });

        }


        // deliver form
        else {
            resolve({
                statusCode: 200,
                headers:    {'Content-Type': 'text/html; charset=UTF-8'},
                body:       template.body(template.form({ages: config.ages}))
            });
        }
    });
};
