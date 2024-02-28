import template from './template/index.js';

export default (config, error = undefined) => {
    return {
        statusCode: 200,
        headers:    {'Content-Type': 'text/html; charset=UTF-8'},
        body:       template.body(template.form({ages: config.ages, error}))
    };
}
