import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loaded: false,
    editedTodo: {},
  },
  reducers: {
    loadTodos: (state, action) => {
      state.todos = action.payload;
      state.loaded = true;
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((u) => u.id !== action.payload) || [];
    },
    createTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (u) => u.id === action.payload.id
      );
      state.todos[todoIndex] = action.payload;
    },
    getEditedTodo: (state, action) => {
      state.editedTodo = action.payload;
    },
    toggleStatus: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (u) => u.id === action.payload.id
      );
      state.todos[todoIndex].status = action.payload.status;
    },
  },
});

export const {
  loadTodos,
  removeTodo,
  createTodo,
  editTodo,
  getEditedTodo,
  toggleStatus,
} = todosSlice.actions;

export const selectTodos = (state) => state.todos.todos;
export const selectTodosLoaded = (state) => state.todos.loaded;
export const selectEditedTodo = (state) => state.todos.editedTodo;

export default todosSlice.reducer;
