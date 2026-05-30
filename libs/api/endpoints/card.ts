import { baseApi } from "../baseApi";
import type { CartItem, CartResponse } from "../../types/apiTypes";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<CartResponse, void>({
      query: () => ({ url: "/cart", method: "GET" }),
      providesTags: ["Cart"],
    }),

    // Добавление товара (как на бэке)
    addToCart: build.mutation<
      { success: boolean; data: CartItem },
      { productId: string | number; quantity?: number }
    >({
      query: ({ productId, quantity = 1 }) => ({
        url: `/cart-add-product/${productId}`,
        method: "GET",
        // хз, можеь бэк переписть?
        // ВНИМАНИЕ: GET body обычно игнорируется fetch.
        // Поэтому quantity надежнее передавать query-string (см. ниже).
        //params: { quantity }, // <-- fetchBaseQuery это поддерживает
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: build.mutation<
      { success: boolean; data: any },
      { id: number } // cartItemId
    >({
      query: ({ id }) => ({
        url: "/cart-remove-product",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Cart"],
    }),

    selectCartItem: build.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: "/cart-select-product",
        method: "PATCH",
        body: { id },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useSelectCartItemMutation,
} = cartApi;
