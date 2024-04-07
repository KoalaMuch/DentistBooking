import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import clinicReducer from "../features/clinic/clinicSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clinic: clinicReducer,
  },
});
