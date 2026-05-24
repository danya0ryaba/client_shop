import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductWithCategory } from "../types/apiTypes";

export const api = createApi({
  reducerPath: "GetProduct",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getProduct: build.query<ProductWithCategory[], void>({
      query: () => "/product",
    }),

    getProductById: build.query<ProductWithCategory, string | number>({
      query: (id) => `/product/${id}`,
    }),

    getProductsByCategory: build.query<ProductWithCategory[], string>({
      query: (categoryName) =>
        `/product/filter/${encodeURIComponent(categoryName)}`,
    }),

    // Поиск продукта по буквам (названию)
    // Ожидаем строку поиска, возвращаем массив продуктов
    searchProductsByName: build.query<Product[], string>({
      query: (searchTerm) => `/product?search=${searchTerm}`,
      // Примечание: вместо '?search=' ваш бэкенд может использовать '?name_like=', '?q=' и т.д.
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsByNameQuery,
} = api;
