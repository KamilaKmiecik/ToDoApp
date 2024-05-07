import React from 'react';
import { TotalCompletedProps } from '../interfaces/TotalCompletedProps.interface';

const TotalCompleted: React.FC<TotalCompletedProps> = ({ completedTasks }) => {
  return (
    <div className="total-completed">
      <h2>Zrobione Zadania</h2>
      <p>{completedTasks.length}</p>
    </div>
  );
};

export default TotalCompleted;