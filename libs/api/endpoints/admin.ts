import { baseApi } from "../baseApi";
import type { Product } from "../../types/apiTypes";

export type ProductUpdateInput = {
  id: number;
  name?: string;
  imageUrl?: string;
  description?: string;
  price?: number;
  size?: number | null;
  categoryName?: string;
  unit?: string;
  quantity?: string;
};

export type ProductDeleteInput = {
  id: number;
};

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProductAdmin: build.mutation<Product, FormData>({
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
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "Product", id: "LIST" },
        { type: "Product", id: arg.id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateProductAdminMutation,
  useUpdateProductAdminMutation,
  useDeleteProductAdminMutation,
} = adminApi;
