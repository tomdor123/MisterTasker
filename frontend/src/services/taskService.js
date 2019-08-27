export default {
    add,
    query,
    getById,
    remove,
    performAllTasks
}

import httpService from './httpService'

async function add(task) {
    return await httpService.post('task', task)
}

async function query(filterBy) {
    return await httpService.get('task', null, filterBy)
}

async function getById(id) {
    return await httpService.get(`task/${id}`)
}

async function remove(id) {
    return await httpService.delete(`task/${id}`)
}

async function performAllTasks() {
    return await httpService.get(`task/1234/start`)
}