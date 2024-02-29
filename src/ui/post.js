import save from './save.js';

export default async (config, params) => {
    let error = undefined;

    // validierung
    switch (true) {
        case config.ages[params.age] === undefined:
            error = config.errorsMap.MISSING_AGE;
            break;

        case params.association == null || params.association.length === 0 :
            error = config.errorsMap.MISSING_ASSOCIATION;
            break;

        case params.team == null || params.team.length === 0 :
            error = config.errorsMap.MISSING_TEAM;
            break;

        case params.coach == null || params.coach.length === 0 :
            error = config.errorsMap.MISSING_COACH;
            break;

        case params.email == null || params.email.length === 0 :
            error = config.errorsMap.MISSING_EMAIL;
            break;

        case params.mobile == null || params.mobile.length === 0 :
            error = config.errorsMap.MISSING_MOBILE;
            break;
    }

    if (error !== undefined) {
        console.log('error found in post parameters', {error});
        return {
            statusCode: 303,
            headers:    {
                ...config.headers,
                'Location':     './?error=' + error
            }
        };
    }

    if ((await save(params)) === false) {
        console.log('save post request failed');
        return {
            statusCode: 303,
            headers:    {
                ...config.headers,
                'Location':     './?error=' + config.errorsMap.SAVE_FAILED
            }
        };
    }

    console.log('save post request succeeded');
    return {
        statusCode: 303,
        headers:    {
            ...config.headers,
            'Location':     './?success'
        }
    };
}
