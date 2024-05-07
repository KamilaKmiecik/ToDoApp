import { createStore } from 'redux';
import { Task } from '../interfaces/Task.interface';

// Definicja akcji
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const TOGGLE_COMPLETION = 'TOGGLE_COMPLETION';

// Definicja akcji
interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: number; // id zadania
}

interface ToggleCompletionAction {
  type: typeof TOGGLE_COMPLETION;
  payload: number; // id zadania
}

// Definicja stanu
export interface TaskState {
  tasks: Task[];
}

// Stan początkowy
const initialState: TaskState = {
  tasks: [],
};

// Reduktor
const taskReducer = (state = initialState, action: AddTaskAction | DeleteTaskAction | ToggleCompletionAction): TaskState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case TOGGLE_COMPLETION:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    default:
      return state;
  }
};

// Tworzenie magazynu Redux
const store = createStore(taskReducer);

export default store;
