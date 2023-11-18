import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./Features/Api/baseApi";
import userSlice from "./Features/User/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
