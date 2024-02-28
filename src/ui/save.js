import https from 'https';

export default (params) => {
    return new Promise((resolve) => {
        const request = https.request(
            {
                hostname:           process.env.SCV_API_HOST,
                path:               process.env.SCV_API_PATH ?? '/api/v1/store',
                port:               process.env.SCV_API_PORT ?? 443,
                method:             'POST',
                rejectUnauthorized: false,
                family:             6,
                headers:            {'Content-Type':  'application/json'},
            },
            (response) => {
                let body = '';
                response.setEncoding('utf8');
                response.on('data', (chunk) => body += chunk);
                response.on('end', () => {
                    if (response.status >= 400) {
                        return resolve(false);
                    }

                    resolve(true);
                });
            }
        );
        request.write(JSON.stringify(params));
        request.end();
    });
};
