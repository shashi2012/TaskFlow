const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Route for getting all tasks and creating a task
router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

// Route for updating and deleting a specific task by ID
router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

module.exports = router;