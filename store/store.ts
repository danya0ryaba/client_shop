import { baseApi } from "@/libs/api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});
