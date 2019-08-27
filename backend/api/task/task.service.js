module.exports = {
    query,
    add,
    remove,
    getById,
    update,
    performAllTasks
}

const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')
const q = require('../queue')();
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
        logger.error('cannot find tasks')
        throw err;
    }
}

async function performAllTasks(){
    let tasks;
    let result = {};
    try {
        tasks = await query();
    } catch(err){
        logger.error('had problems performing tasks')
    }
    if(tasks) tasks.forEach(task => q.enqueue(task))
    while(!q.isEmpty()){
        let task = q.dequeue();
        logger.info('performing task:' + task);
        try {
            let res = await _performTask(task);
            logger.info('success task is DONE')
            result[task.title] = res;
        } catch(err) {
            logger.error('Task Failed, putting it back at end of Queue')
            q.enqueue(task);
        }
    }
    return promise.resolve(result);
}

function _performTask(task) {
    return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        if (Math.random() > 0.5) resolve(parseInt(Math.random() * 100))
        else reject('error')
    }, 0)
    })
}

async function add(task) {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        task.createdAt = Date.now();
        const res = await collection.insertOne(task);
        return res.ops[0];
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

