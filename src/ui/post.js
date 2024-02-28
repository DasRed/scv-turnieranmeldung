import get from './get.js';
import save from './save.js';
import template from './template/index.js';

export default async (config, params) => {
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
        return get(config, error);
    }

    if ((await save(params)) === false) {
        return get(config, 'Ihre Anmeldung konnte leider nicht gespeichert werden. Bitte versuchen sie es zu einem späteren Zeitpunkt noch einmal.');
    }

    return {
        statusCode: 303,
        headers:    {
            'Content-Type': 'text/html; charset=UTF-8',
            'Location':     './?success'
        },
        body:       template.body(template.success())
    };
}
