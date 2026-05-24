import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "GetProduct",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getProduct: build.query<any, void>({
      query: () => "/product",
    }),
  }),
});

export const { useGetProductQuery } = api;
