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

//
// function doRequest(options) {
//     return new Promise(function (resolve, reject) {
//         request(options, function (error, response) {
//             if (!error && response.statusCode == 200) {
//                 resolve(response);
//             } else {
//                 reject(error);
//             }
//         });
//     });
// }
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
    request(options, function(error, response, body){
        if(error) console.log(error);
        if(!error && response.statusCode == 200){
            let data = JSON.parse(body)
            console.log(data.detail.image_repo_list)
        }
    });


}


run().catch(err => {
    console.error(err);
    core.setFailed("Unexpected error");
});