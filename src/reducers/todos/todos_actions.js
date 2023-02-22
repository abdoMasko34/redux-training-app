import {
  loadTodos,
  removeTodo,
  createTodo,
  editTodo,
  getEditedTodo,
  toggleStatus,
} from "./todos_slice";
import axios from "axios";
const todosService = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer de6bb15e2c64361f64fc38f705ddb783b03b259acec9ab2395c6183f84baf2e3",
  },
});

export const getTodosByIdAsync = (id, success, fail) => (dispatch) => {
  todosService
    .get(`/users/${id}/todos`)
    .then((res) => {
      console.log(res.data);
      dispatch(loadTodos(res.data));
      success(res.data);
    })
    .catch((err) => {
      fail(err);
    });
};
export const deleteUserAsync =
  ({ id }, success, fail) =>
  (dispatch) => {
    todosService
      .delete(`/todos/${id}`)
      .then((res) => {
        console.log(res);
        // if (res.status === 204) {
        dispatch(removeTodo(id));
        success(res.data);
        // }
      })
      .catch((err) => {
        fail(err);
      });
  };

export const createTodoAsync = (todo, success, fail) => (dispatch) => {
  todosService
    .post(`users/${todo.userId}/todos/`, { ...todo, user_id: todo.userId })
    .then((res) => {
      console.log("log data inside create a todo", res.data);
      dispatch(createTodo(res.data));
      success(res.data);
    })
    .catch((err) => {
      console.log(err.message);
      fail(err);
    });
};

export const editTodoAsync =
  ({ values, id }, success, fail) =>
  (dispatch) => {
    todosService
      .patch(`todos/${id}`, values)
      .then((res) => {
        dispatch(editTodo(res.data));
        success(res);
        console.log(res);
      })
      .catch((err) => {
        fail(err);
        console.log(err);
      });
  };

export const getEditedTodoAsync = (id, success, fail) => (dispatch) => {
  todosService
    .get(`todos/${id}`)
    .then((res) => {
      success(res.data);
      dispatch(getEditedTodo(res.data));
    })
    .catch((err) => {
      console.log("err => ", err.message);
      fail(err);
    });
};

export const toggleStatusAsync = (todo, success, fail) => (dispatch) => {
  todosService
    .put(`todos/${todo.id}`, todo)
    .then((res) => {
      dispatch(toggleStatus(res.data));
      success(res.data);
    })
    .catch((err) => {
      fail(err);
    });
};
