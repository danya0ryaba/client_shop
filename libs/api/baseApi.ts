// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//   CategoryI,
//   PaginatedProductsResponse,
//   Product,
//   ProductWithCategory,
// } from "../types/apiTypes";

// export const api = createApi({
//   reducerPath: "GetProduct",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
//     credentials: "include",
//   }),
//   endpoints: (build) => ({
//     getProduct: build.query<
//       PaginatedProductsResponse,
//       { page: number; limit: number }
//     >({
//       query: ({ page, limit }) => ({
//         url: "/product",
//         params: { page, limit },
//       }),
//     }),

//     getProductById: build.query<ProductWithCategory, string | number>({
//       query: (id) => `/product/${id}`,
//     }),

//     getProductsByCategory: build.query<ProductWithCategory[], string>({
//       query: (categoryName) =>
//         `/product/filter/${encodeURIComponent(categoryName)}`,
//     }),

//     getCategories: build.query<CategoryI[], void>({
//       query: () => "/categories",
//     }),

//     // Поиск продукта по буквам (названию)
//     // Ожидаем строку поиска, возвращаем массив продуктов
//     searchProductsByName: build.query<Product[], string>({
//       query: (searchTerm) => `/product?search=${searchTerm}`,
//       // Примечание: вместо '?search=' ваш бэкенд может использовать '?name_like=', '?q=' и т.д.
//     }),
//   }),
// });

// export const {
//   useGetProductQuery,
//   useGetProductByIdQuery,
//   useGetProductsByCategoryQuery,
//   useSearchProductsByNameQuery,
//   useGetCategoriesQuery,
// } = api;

// libs/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoryI,
  PaginatedProductsResponse,
  Product,
  ProductWithCategory,
} from "../types/apiTypes";

export const api = createApi({
  reducerPath: "GetProduct",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getProduct: build.query<
      PaginatedProductsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/product",
        params: { page, limit },
      }),
    }),

    getProductById: build.query<ProductWithCategory, string | number>({
      query: (id) => `/product/${id}`,
    }),

    getProductsByCategory: build.query<ProductWithCategory[], string>({
      query: (categoryName) =>
        `/product/filter/${encodeURIComponent(categoryName)}`,
    }),

    getProductsByCategoryPaginated: build.query<
      PaginatedProductsResponse | ProductWithCategory[],
      { categoryName: string; page: number; limit: number }
    >({
      query: ({ categoryName, page, limit }) => ({
        url: `/product/filter/${encodeURIComponent(categoryName)}`,
        params: { page, limit },
      }),
    }),

    getCategories: build.query<CategoryI[], void>({
      query: () => "/categories",
    }),

    searchProductsByName: build.query<Product[], string>({
      query: (searchTerm) =>
        `/product?search=${encodeURIComponent(searchTerm)}`,
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByCategoryPaginatedQuery,
  useSearchProductsByNameQuery,
  useGetCategoriesQuery,
} = api;
