// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controller/TodoController');

// GET all Todos
router.get('/todos', todoController.getTodos);

// POST a new Todo
router.post('/todos', todoController.addTodo);

// PUT (edit) a Todo
router.put('/todos/:id', todoController.editTodo);

// DELETE a Todo
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
