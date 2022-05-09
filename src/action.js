const core = require('@actions/core')
const get_image_list = require('./get_image_list')


async function run(){
    let app_name = core.getInput('app_name', {required: true})
    await get_image_list.get_image_list(app_name)

}


run();