import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Rest of your application setup
