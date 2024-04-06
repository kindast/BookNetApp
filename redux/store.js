import { configureStore } from "@reduxjs/toolkit";
import settings from "./slices/settingsSlice";
import auth from "./slices/authSlice";

export const store = configureStore({
  reducer: { settings, auth },
});
