import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../rtk/authSlice/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
