// controllers/todoController.js
const Todo = require('../model/Todo');

// Add a new Todo
exports.addTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
    });
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    console.error('Error in addTodo:', err); // Log the error
    res.status(500).json({ message: 'Error adding Todo', error: err.message });
  }
};


// Edit a Todo
exports.editTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task: req.body.task, completed: req.body.completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Error updating Todo' });
  }
};

// Delete a Todo
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting Todo' });
  }
};

// Get all Todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Todos' });
  }
};
