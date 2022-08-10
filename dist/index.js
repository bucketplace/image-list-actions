module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(324);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 324:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(949)
const request = __webpack_require__(359);

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

    let options;
    options = {
        'method': 'GET',
        'url': `${getBaseUrl()}/v1/applications/${app_name}/`,
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
                core.setFailed('### There is no data for image repo. ###')
            }
            if (`${input_repo}`){
                if(!data.detail.image_repo_list.includes(`${input_repo}`)){
                    core.setFailed('### The input image repo and the image repo registered in ops-monster are different. ###')
                }
                else{
                    console.log('### Input repo has been set as output ###')
                    core.setOutput('image_repo', `${input_repo}`)
                }
            }
            if (!`${input_repo}`){
                console.log('### first repo has been set as output ###')
                console.log('### ECR Repo Name: ', data.detail.image_repo_list[0], ' ###')
                core.setOutput('image_repo', data.detail.image_repo_list[0])
            }
        }
    });


}


run().catch(err => {
    console.error(err);
    core.setFailed("Unexpected error");
});


/***/ }),

/***/ 359:
/***/ (function(module) {

module.exports = eval("require")("request");


/***/ }),

/***/ 949:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ })

/******/ });