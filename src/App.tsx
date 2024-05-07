import React, { useState, useEffect } from 'react';
import './App.css';
import { Typography } from 'antd';
import TaskForm from './components/TaskForm.tsx';
import TaskColumns from './components/TaskColumns.tsx';
import TotalCompleted from './components/TotalCompleted.tsx';
import { Task } from './interfaces/Task.interface';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import store from './redux/store'; // Import magazynu Redux
import { Provider } from 'react-redux';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [category, setCategory] = useState<string>('Dzienne');
  const [taskInput, setTaskInput] = useState<string>('');
  const [isImportant, setIsImportant] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Błąd podczas pobierania danych:', error));
  };

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask: Task = {
        id: Math.random(),
        text: taskInput,
        category: category,
        completed: false,
        important: isImportant,
      };

      fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
      .then(() => {
        setTasks([...tasks, newTask]);
        setTaskInput('');
        setIsImportant(false);
      })
      .catch(error => console.error('Błąd podczas zapisywania danych:', error));
    }
  };

  const deleteTask = (taskId: number) => {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    })
    .then(() => {
      setTasks(tasks.filter(task => task.id !== taskId));
    })
    .catch(error => console.error('Błąd podczas usuwania danych:', error));
  };

  const toggleCompletion = (taskId: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    const updatedTask = updatedTasks.find(task => task.id === taskId);
    if (updatedTask) {
      fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      })
      .then(() => {
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Błąd podczas aktualizowania danych:', error));
    }
  };

  const toggleImportance = () => {
    setIsImportant(!isImportant);
  };

  useEffect(() => {
    const resetDailyTasks = () => {
      const currentTime = new Date();
      const resetTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 0, 0, 0);
      const timeUntilReset = resetTime.getTime() - currentTime.getTime();
      
      setTimeout(() => {
        setTasks(tasks.map(task => task.category === 'Dzienne' ? {...task, completed: false} : task));
      }, timeUntilReset);
    };

    const intervalId = setInterval(resetDailyTasks, 60000); 

    return () => {
      clearInterval(intervalId);
    };
  }, [tasks]);

  const dailyTasks = tasks.filter(task => task.category === 'Dzienne');
  const oneTimeTasks = tasks.filter(task => task.category === 'Jednorazowe');
  const completedTasks = tasks.filter(task => task.completed);

  const homeElement = (
    <>
      <Typography.Title level={1}>Witaj!</Typography.Title>
      <img src="https://www.shutterstock.com/image-photo/positive-hipster-girl-stylish-spectacles-260nw-744424510.jpg" alt="Welcome"  className="welcome-image"/>
    </>
  );

  const manageElement = (
    <>
     <Typography.Title level={1}>Dodaj do listy</Typography.Title>
      <TaskForm
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        category={category}
        setCategory={setCategory}
        isImportant={isImportant}
        toggleImportance={toggleImportance}
        addTask={addTask}
      />
      <TaskColumns
        dailyTasks={dailyTasks}
        oneTimeTasks={oneTimeTasks}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />
    </>
  );
  
  return (
    <Provider store={store}> {/* Dodaj Provider i przekaż magazyn Redux */}
      <BrowserRouter>
        <div className="App">
          <Typography.Title level={1}>To Do List</Typography.Title>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/manage">Manage tasks</Link>
              </li>
              <li>
                <Link to="/completed">Completed</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={homeElement} />
            <Route path="/manage" element={manageElement} />
            <Route path="/completed" element={<TotalCompleted completedTasks={completedTasks} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
