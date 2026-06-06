import { baseApi } from "../baseApi";
import type {
  CategoryI,
  PaginatedProductsResponse,
  Product,
  ProductWithCategory,
} from "../../types/apiTypes";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query<
      PaginatedProductsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/product",
        params: { page, limit },
      }),
      providesTags: (result) =>
        result?.products
          ? [
              { type: "Product" as const, id: "LIST" },
              ...result.products.map((p) => ({
                type: "Product" as const,
                id: p.id,
              })),
            ]
          : [{ type: "Product" as const, id: "LIST" }],
    }),

    getProductById: build.query<ProductWithCategory, string | number>({
      query: (id) => `/product/${id}`,
      // providesTags: (_res, _err, id) => [{ type: "Product", id }],
    }),

    getProductsByCategory: build.query<ProductWithCategory[], string>({
      query: (categoryName) =>
        `/product/filter/${encodeURIComponent(categoryName)}`,
      // providesTags: ["Product"],
    }),

    getProductsByCategoryPaginated: build.query<
      PaginatedProductsResponse | ProductWithCategory[],
      { categoryName: string; page: number; limit: number }
    >({
      query: ({ categoryName, page, limit }) => ({
        url: `/product/filter/${encodeURIComponent(categoryName)}`,
        params: { page, limit },
      }),
      // providesTags: ["Product"],
    }),

    getCategories: build.query<CategoryI[], void>({
      query: () => "/categories",
      // providesTags: ["Category"],
    }),

    searchProductsByName: build.query<Product[], string>({
      query: (searchTerm) =>
        `/product-search?name=${encodeURIComponent(searchTerm)}`,
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByCategoryPaginatedQuery,
  useGetCategoriesQuery,
  useSearchProductsByNameQuery,
  useLazySearchProductsByNameQuery,
} = productsApi;
