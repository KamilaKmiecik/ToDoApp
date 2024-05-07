import { Task } from './Task.interface';

export interface TaskColumnsProps {
  dailyTasks: Task[];
  oneTimeTasks: Task[];
  deleteTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
}