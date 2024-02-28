import https from 'https';
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
                body:       template.body(template.form())
            });
        }

        //
        //const request = https.request(
        //    {
        //        hostname:           process.env.GDC_DRONE_HOST,
        //        path:               process.env.GDC_DRONE_PATH ?? '/hook',
        //        port:               process.env.GDC_DRONE_PORT ?? 443,
        //        method:             event.httpMethod,
        //        rejectUnauthorized: false,
        //        family:             6,
        //        headers:            {
        //            'accept':                                 '*/*',
        //            'Content-Type':                           event.headers['Content-Type'],
        //            'X-GitHub-Delivery':                      event.headers['X-GitHub-Delivery'],
        //            'X-GitHub-Event':                         event.headers['X-GitHub-Event'],
        //            'X-GitHub-Hook-ID':                       event.headers['X-GitHub-Hook-ID'],
        //            'X-GitHub-Hook-Installation-Target-ID':   event.headers['X-GitHub-Hook-Installation-Target-ID'],
        //            'X-GitHub-Hook-Installation-Target-Type': event.headers['X-GitHub-Hook-Installation-Target-Type'],
        //            'X-Hub-Signature':                        event.headers['X-Hub-Signature'],
        //            'X-Hub-Signature-256':                    event.headers['X-Hub-Signature-256'],
        //        }
        //    },
        //    (response) => {
        //        let body = '';
        //        response.setEncoding('utf8');
        //        response.on('data', (chunk) => body += chunk);
        //        response.on('end', () => {
        //            if (response.status >= 400) {
        //                return reject({
        //                    statusCode: response.statusCode || 500,
        //                    body:       body,
        //                });
        //            }
        //
        //            resolve({statusCode: 200});
        //        });
        //    }
        //);
        //request.write(event.body);
        //request.end();
    });
};
