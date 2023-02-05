import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loaded: false,
  },
  reducers: {
    loadTodos: (state, action) => {
      state.todos = action.payload;
      state.loaded = true;
    },
    //   removeUser: (state, action) => {
    //     state.values = state.values.filter((u) => u.id !== action.payload) || [];
    //   },
    //   addUser: (state, action) => {
    //     state.values.push(action.payload);
    //   },
    //   editUser: (state, action) => {
    //     const userIndex = state.values.findIndex(
    //       (u) => u.id === action.payload.id
    //     );
    //     state.values[userIndex] = action.payload;
    //   },
    // },
  },
});

export const loadUsersAsync = () => (dispatch) => {
  fetch("https://gorest.co.in/public/v2/todos")
    .then((res) => {
      return res.json();
    })
    .then((todos) => {
      console.log(todos);
      dispatch(loadTodos(todos));
    });
};

// export const deleteUserAsync = (userId) => (dispatch) => {
//   fetch(`http://localhost:8080/users/${userId}`, {
//     method: "DELETE",
//   }).then((res) => {
//     if (res.status === 200) {
//       dispatch(removeUser(userId));
//     }
//   });
// };

// export const createUserAsync = (user, success, fail) => (dispatch) => {
//   fetch("http://localhost:8080/users", {
//     method: "POST",
//     body: JSON.stringify(user),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((json) => {
//       if (json.message) {
//         fail(json.message);
//       } else {
//         success();
//         dispatch(addUser(json));
//       }
//     });
// };

// export const editUserAsync = (user, success, fail) => (dispatch) => {
//   fetch("http://localhost:8080/users", {
//     method: "PUT",
//     body: JSON.stringify(user),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((json) => {
//       if (json.message) {
//         fail(json.message);
//       } else {
//         success();
//         dispatch(editUser(json));
//       }
//     });
// };

const { loadTodos, removeUser, addUser, editUser } = todosSlice.actions;

export const selectTodos = (state) => state.todos.todos;
export const selectTodosLoaded = (state) => state.todos.loaded;

export default todosSlice.reducer;
