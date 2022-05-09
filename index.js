const core = require('@actions/core')
const request = require("request");

const app_name = core.getInput("app_name", { required: true });

function getBaseUrl() {
    let url = process.env.BASE_URL
    if (!url)
        core.setFailed('There is no url defined in the environment variables')
    if (url.endsWith('/')) url = url.slice(0, -1)
    return url
}

function getAuthToken() {
    const token = process.env.AUTH_TOKEN
    if (!token)
        core.setFailed(
            'There is no token defined in the environment variables'
        )
    return token
}


function doRequest(options) {
    return new Promise(function (resolve, reject) {
        request(options, function (error, response) {
            if (!error && response.statusCode == 200) {
                resolve(response);
            } else {
                reject(error);
            }
        });
    });
}
async function run(){

    let options;
    options = {
        'method': 'GET',
        'url': `${getBaseUrl()}/api/v1/applications/${app_name}/`,
        'headers': {
            'accept': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
    };
    doRequest(options).then(function (response) {
        console.log(response.json());
    });


}


run().catch(err => {
    console.error(err);
    core.setFailed("Unexpected error");
});