// src/libs/api/endpoints/admin.ts
import { baseApi } from "../baseApi";
import type { Product } from "../../types/apiTypes";

/**
 * Подстрой под свои реальные DTO на бэке.
 * Судя по коду Express:
 * POST  /product-create  body: { name, imageUrl, description, price, categoryName, size? }
 * PATCH /product-update  body: { id, name?, imageUrl?, description?, price?, size? }
 * DELETE /product-delete body: { id }
 */

export type ProductCreateInput = {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  categoryName: string;
  size?: number | null;
};

export type ProductUpdateInput = {
  id: number;
  name?: string;
  imageUrl?: string;
  description?: string;
  price?: number;
  size?: number | null;
};

export type ProductDeleteInput = {
  id: number;
};

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProductAdmin: build.mutation<Product, ProductCreateInput>({
      query: (body) => ({
        url: "/product-create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProductAdmin: build.mutation<Product, ProductUpdateInput>({
      query: (body) => ({
        url: "/product-update",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [{ type: "Product", id: arg.id }],
    }),

    deleteProductAdmin: build.mutation<Product, ProductDeleteInput>({
      query: (body) => ({
        url: "/product-delete",
        method: "DELETE",
        body, // ВАЖНО: у тебя на бэке delete читает id из req.body
      }),
      invalidatesTags: (_res, _err, arg) => [{ type: "Product", id: arg.id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateProductAdminMutation,
  useUpdateProductAdminMutation,
  useDeleteProductAdminMutation,
} = adminApi;
