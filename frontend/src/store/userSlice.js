import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  errors: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignInStart: (state) => {
      state.loading = true;
      state.errors = {};
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.errors = {};
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});
export const { signInFailure, signInSuccess, SignInStart } = userSlice.actions;
export default userSlice.reducer;
