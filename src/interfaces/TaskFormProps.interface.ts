import { Dispatch, SetStateAction } from 'react';

export interface TaskFormProps {
  taskInput: string;
  setTaskInput: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  isImportant: boolean;
  toggleImportance: () => void;
  addTask: () => void;
}