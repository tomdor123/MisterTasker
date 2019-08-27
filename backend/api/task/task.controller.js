module.exports = {
    query,
    add,
    remove,
    getById,
    performAllTasks
}

const taskService = require('./task.service')

async function query(req, res) {
    const filterBy = req.query;
    try {
        const tasks = await taskService.query(filterBy)
        res.json(tasks)
    } catch (error) {
        res.status(500).send({ error })
    }
}

async function performAllTasks(req, res) {
    try {
        const result = await taskService.performAllTasks()
        res.json(result)
    } catch (error) {
        res.status(500).send({ error })
    }
}

async function add(req, res) {
    const task = req.body
    try {
        const taskWithId = await taskService.add(task)
        res.json(taskWithId)
    } catch (error) {
        res.status(500).send({ error })
    }
}

async function remove(req, res) {
    const id = req.params.id
    try {
        await taskService.remove(id)
        res.json({})
    } catch (error) {
        res.status(500).send({ error })
    }
}

async function getById(req, res) {
    const id = req.params.id
    try {
        const foundtask = await taskService.getById(id)
        res.json(foundtask)
    } catch (error) {
        res.status(500).send({ error })
    }
}