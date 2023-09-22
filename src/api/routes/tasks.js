const express = require('express');

const Tasks = express.Router();

module.exports = Tasks;

const { getTasks, insertTask, insertTasks } = require('../controllers/tasksController');

Tasks.get('/get-tasks', getTasks);
Tasks.post('/insert-task', insertTask);
Tasks.post('/insert-tasks', insertTasks);
