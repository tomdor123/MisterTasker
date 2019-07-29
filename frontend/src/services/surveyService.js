export default {
    add,
    query,
    getById
}

import httpService from './httpService'

async function add(survey) {
    try {
        await _addUrlToSurvey(survey)
    } catch (err) { }
    return await httpService.post('survey', survey)
}

async function query(filterBy) {
    return await httpService.get('survey', null, filterBy)
}

async function getById(id) {
    return await httpService.get(`survey/${id}`)

}
