module.exports = {
    query,
    add,
    remove,
    getById,
    update,
    perormTask
}

const loggger = require('../../services/logger.service')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const COLLECTION_KEY = 'task'

async function query(filterBy = {}){
    const criteria = {};

    if (filterBy.name) {
        criteria.name = {$regex:'(?i)' + _quote(filterBy.name)}
    }

    if (filterBy.type) {
        criteria.type = filterBy.type;
    }
    if(filterBy.createdBy) {
        criteria.createdBy = filterBy.createdBy;
    }

    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        const tasks = await collection.find(criteria).toArray();
        const sorted = tasks.reverse()
        return sorted
    } catch (err) {
        loggger.error('cannot find tasks')
        throw err;
    }
}

function perormTask(task) {
    return new Promise((resolve, reject)=>{
    setTimeout(()=>{
    if (Math.random() > 0.5) resolve(parseInt(Math.random() * 100))
    else reject('Err');
    }, 0)
    })
   }

async function add(task) {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        const taskWithId = await collection.insertOne(task);
        return taskWithId;
    } catch (err) {
        logger.error(`cannot insert task`)
        throw err;
    }
}

async function remove(taskId) {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        await collection.deleteOne({"_id":ObjectId(taskId)})
    } catch (err) {
        logger.error(`cannot remove task ${taskId}`)
        throw err;
    }
}

async function update(task) {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        let taskId = task._id;
        delete task._id
        await collection.updateOne({"_id":ObjectId(taskId)}, {$set : task})
        return task
    } catch (err) {
        logger.error(`cannot update taskId ${task._id}`)
        throw err;
    }
}

async function getById(taskId) {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        const task = await collection.findOne({"_id":ObjectId(taskId)})
        return task
    } catch (err) {
        logger.error(`cannot find task ${taskId}`)
        throw err;
    }
}

function _quote(regex) {
    return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
  }

