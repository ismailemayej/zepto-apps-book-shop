import { configureStore } from "@reduxjs/toolkit";
import counterRouter from "../features/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterRouter,
  },
});
