import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/task_slice";
import usersReducer from "./users/users_slice";

export default configureStore({
  reducer: {
    todos: todosReducer,
    users: usersReducer,
  },
});