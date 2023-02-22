import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loaded: false,
    editedUser: {},
  },
  reducers: {
    loadUsers: (state, action) => {
      state.users = action.payload;
      state.loaded = true;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload) || [];
    },
    createUser: (state, action) => {
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      const userIndex = state.users.findIndex(
        (u) => u.id === action.payload.id
      );
      state.users[userIndex] = action.payload;
    },
    getEditUser: (state, action) => {
      state.editedUser = action.payload;
    },
    toggleStatus: (state, action) => {
      const userIndex = state.users.findIndex(
        (u) => u.id === action.payload.id
      );
      state.users[userIndex].status = action.payload.status;
    },
  },
});

export const {
  loadUsers,
  removeUser,
  createUser,
  editUser,
  getEditUser,
  toggleStatus,
} = usersSlice.actions;

export const selectUsers = (state) => state.users.users;
export const selectUsersLoaded = (state) => state.users.loaded;
export const selectEditedUser = (state) => state.users.editedUser;
export const selectUsersLength = (state) => state.users.users.length;
export default usersSlice.reducer;
