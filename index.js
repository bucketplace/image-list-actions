const core = require('@actions/core')
const request = require("request");

async function run(){
    const app_name = core.getInput("app_name", { required: true });
    const input_repo = core.getInput("input_repo", { required: false });

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
    const baseUrl = getBaseUrl()

    let options;
    options = {
        'method': 'GET',
        'url': `${baseUrl}/api/v1/applications/${app_name}/`,
        'headers': {
            'accept': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
    };
    request(options, function(error, response, body){
        if(error) console.log(error);
        if(!error && response.statusCode == 200){
            let data = JSON.parse(body)
            if (typeof data.detail.image_repo_list === 'undefined' || data.detail.image_repo_list.length === 0){
                core.setFailed('## There is no data for image repo. ##')
            }
            if (`${input_repo}`){
                if(!data.detail.image_repo_list.includes(`${input_repo}`)){
                    core.setFailed('## The input image repo and the image repo registered in ops-monster are different. ##')
                }
                else{
                    console.log('## Input repo has been set as output ##')
                    core.setOutput('image_repo', `${input_repo}`)
                }
            }
            if (!`${input_repo}`){
                console.log('first repo has been set as output')
                console.log('## ECR Image Repo: ', data.detail.image_repo_list[0], ' ##')
                core.setOutput('image_repo', data.detail.image_repo_list[0])
            }
        }
    });


}


run().catch(err => {
    console.error(err);
    core.setFailed("Unexpected error");
});
