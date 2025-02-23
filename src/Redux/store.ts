import { configureStore } from "@reduxjs/toolkit";
import weatherApiSlice from "./weatherApiSlice";

const store = configureStore({
  reducer: {
    weatherApiReducer: weatherApiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;