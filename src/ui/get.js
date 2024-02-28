import template from './template/index.js';

export default (config, error = undefined) => {
    return {
        statusCode: 200,
        headers:    {...config.headers},
        body:       template.body(template.form({ages: config.ages, error}))
    };
}
