const express = require('express');
const {query, getById, remove, add, performAllTasks} = require('./task.controller')

const router = express.Router()
module.exports = router

//TASK LIST
router.get('/', query)

//SINGLE TASK
router.get('/:id', getById)

//ADDING TASK
router.post('/', add)

//REMOVE TASK
router.delete('/:id', remove)

//PERFORM TASK
router.get('/1234/start', performAllTasks)
