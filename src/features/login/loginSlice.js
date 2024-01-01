import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

const initialState = {
  token: storedToken || "",
  user: storedUser || {},
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.access_token);
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
});

export const user = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const { setToken, clearToken } = loginSlice.actions;
export default loginSlice.reducer;
