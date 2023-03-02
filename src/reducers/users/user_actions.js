import {
  loadUsers,
  removeUser,
  createUser,
  editUser,
  getEditUser,
  toggleStatus,
} from "./users_slice";
import axios from "axios";

export const userService = axios.create({
  baseURL: "https://gorest.co.in/public/v2/users",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer de6bb15e2c64361f64fc38f705ddb783b03b259acec9ab2395c6183f84baf2e3",
  },
});

export const loadUsersAsync = (success, fail) => (dispatch) => {
  userService
    .get()
    .then(({ data }) => {
      dispatch(loadUsers(data));
      success();
      console.log("data => ", data);
    })
    .catch((err) => {
      fail(err);
      console.log("err => ", err.message);
    });
};

export const deleteUserAsync = (userId, success, fail) => (dispatch) => {
  userService
    .delete(`/${userId}`)
    .then((res) => {
      if (res.status === 204) {
        dispatch(removeUser(userId));
        success();
      }
    })
    .catch((err) => {
      console.log(err);
      fail(err);
    });
};

export const createUserAsync = (user, success, fail) => (dispatch) => {
  console.log("log user", user);
  userService
    .post("/", user)
    .then((res) => {
      dispatch(createUser(res.data));
      console.log(res);
      success(res);
    })
    .catch((error) => {
      fail(error);
      console.log(error);
    });
};

export const editUserAsync =
  ({ values, id }, success, fail) =>
  (dispatch) => {
    userService
      .patch(`/${id}`, values)
      .then((res) => {
        dispatch(editUser(res.data));
        success(res);
        console.log(res);
      })
      .catch((err) => {
        fail(err);
        console.log(err);
      });
  };
export const getEditUserAsync = (id, success, fail) => (dispatch) => {
  userService
    .get(`/${id}`)
    .then((res) => {
      success(res.data);
      dispatch(getEditUser(res.data));
    })
    .catch((err) => {
      console.log("err => ", err.message);
      fail(err);
    });
};

export const toggleStatusAsync = (user, success, fail) => (dispatch) => {
  userService
    .put(`/${user.id}`, user)
    .then((res) => {
      dispatch(toggleStatus(res.data));
      success(res.data);
    })
    .catch((err) => {
      fail(err);
    });
};
