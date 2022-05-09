const core = require('@actions/core')
const request = require("request");


async function run(){
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

    let res;
    res = {
        'method': 'GET',
        'url': `${getBaseUrl()}/api/v1/applications/${app_name}/`,
        'headers': {
            'accept': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
    };
    console.log(res.detail.image_repo_list[0])
    request(res, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}


run().catch(err => {
    console.error(err);
    core.setFailed("Unexpected error");
});