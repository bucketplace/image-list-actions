const request = require('request');

function getBaseUrl() {
    let url = process.env.BASE_URL
    if (!url)
        throw ReferenceError('There is no url defined in the environment variables')
    if (url.endsWith('/')) url = url.slice(0, -1)
    return url
}

function getAuthToken() {
    const token = process.env.AUTH_TOKEN
    if (!token)
        throw ReferenceError(
            'There is no token defined in the environment variables'
        )
    return token
}

export async function get_image_list(app_name){
    let options;
    options = {
        'method': 'GET',
        'url': `${getBaseUrl()}/api/v1/applications/${app_name}/`,
        'headers': {
            'accept': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
    };
    console.log(options)
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
};