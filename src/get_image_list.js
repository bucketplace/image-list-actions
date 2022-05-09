const request = require('request');

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
        'url': `https://ops.co-workerhou.se/api/v1/applications/${app_name}/`,
        'headers': {
            'accept': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
    };
    print(options)
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
};