import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import axiosInstance from '../config/axiosConfig'; // Import Axios for API calls

function LandingPage() {
  // State for storing tasks and the new task input
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks function (GET)
  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task (POST)
  const addTask = async () => {
    if (newTask.trim() === '') return; // Prevent adding empty tasks

    try {
      await axiosInstance.post('/todos', { task: newTask });
      setNewTask('');
      fetchTasks(); // Refresh task list after adding
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Edit a task (PUT)
  const editTask = async (id, updatedTask) => {
    try {
      await axiosInstance.put(`/todos/${id}`, {
        task: updatedTask,
      });
      fetchTasks(); // Refresh task list after editing
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  // Delete a task (DELETE)
  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      fetchTasks(); // Refresh task list after deleting
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      <h1 className='text-center mt-5'>Todo App</h1>
      <div
        className='text-field mt-5'
        style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}
      >
        <Form.Control
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // Handle input change
          placeholder='Add your task'
        />
        <Button variant='primary' type='submit' className='mt-2' onClick={addTask}>
          Add
        </Button>
        <div className='table-div mt-5'>
          {tasks.length>0?( <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Todo Task</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.task}</td>
                  <td>
                    <Button
                      variant='warning'
                      onClick={() => editTask(task._id, prompt('Edit Task:', task.task))}
                    >
                      Edit
                    </Button>{' '}
                    <Button variant='danger' onClick={() => deleteTask(task._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>):(
            <h3 className='text-center'>No Task Found</h3>
          )}
         
        </div>
      </div>
    </>
  );
}

export default LandingPage;
