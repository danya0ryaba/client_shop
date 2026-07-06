import { baseApi } from "../baseApi";
import type { Product } from "../../types/apiTypes";

export type ProductUpdateInput = {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  unit: string;
  quantityProduct: number;
  deliveryToCities?: boolean;
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

    deleteProductAdmin: build.mutation<Product, number>({
      query: (id) => ({
        url: `/product-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Product", id: "LIST" },
        { type: "Product", id },
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
