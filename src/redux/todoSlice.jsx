import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
  retryCount: 0,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    },
    addTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTodoSuccess: (state, action) => {
      state.todos.push(action.payload);
      state.loading = false;
    },
    updateTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTodoSuccess: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
      state.loading = false;
    },
    deleteTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTodoSuccess: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.retryCount += 1;
    },
    clearError: (state) => {
      state.error = null;
      state.retryCount = 0;
    }
  }
});

export const {
  fetchTodosStart,
  fetchTodosSuccess,
  addTodoStart,
  addTodoSuccess,
  updateTodoStart,
  updateTodoSuccess,
  deleteTodoStart,
  deleteTodoSuccess,
  setError,
  clearError
} = todoSlice.actions;

export default todoSlice.reducer;
