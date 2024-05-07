import React from 'react';
import { TaskColumnsProps } from '../interfaces/TaskColumnsProps.interface';

const TaskColumns: React.FC<TaskColumnsProps> = ({ dailyTasks, oneTimeTasks, deleteTask, toggleCompletion }) => {
  return (
    <div className="task-columns">
      <div className="task-column">
        <h2>Codzienne</h2>
        <div className="tasks">
          {dailyTasks.map(task => (
            <div key={task.id} className={`task ${task.completed ? 'completed' : ''} ${task.important ? 'important' : ''}`}>
              <span>{task.text}</span>
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                />
                <button onClick={() => deleteTask(task.id)}>Usuń</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="task-column">
        <h2>Jednorazowe</h2>
        <div className="tasks">
          {oneTimeTasks.map(task => (
            <div key={task.id} className={`task ${task.completed ? 'completed' : ''} ${task.important ? 'important' : ''}`}>
              <span>{task.text}</span>
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                />
                <button onClick={() => deleteTask(task.id)}>Usuń</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskColumns;