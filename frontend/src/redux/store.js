import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/auth/authSlices";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
