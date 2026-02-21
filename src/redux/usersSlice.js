import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: []
  },
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
    },

    addUser: (state, action) => {
      state.list.unshift(action.payload);
    },

    deleteUser: (state, action) => {
      state.list = state.list.filter(
        user => user.id !== action.payload
      );
    },

    updateUser: (state, action) => {
      const updatedUser = action.payload;

      state.list = state.list.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
    }
  }
});

export const {
  setUsers,
  addUser,
  deleteUser,
  updateUser
} = usersSlice.actions;

export default usersSlice.reducer;