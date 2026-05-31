import { baseApi } from "../baseApi";
import type { CartItem, CartItemDTO, CartResponse } from "../../types/apiTypes";

type SuccessResponse<T> = { success: boolean; data: T };

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
      SuccessResponse<{ id: number }>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: "/cart-remove-product",
        method: "DELETE",
        body: { id },
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        // оптимистично убираем item из кэша getCart
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const idx = draft.items.findIndex((x) => x.id === id);
            if (idx === -1) return;
            const removed = draft.items[idx];
            draft.items.splice(idx, 1);
            // пересчет итогов (если нужно)
            draft.totalQuantity -= removed.quantity;
            draft.totalPrice -= removed.quantity * removed.product.price;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    // добавляем обновление количества
    updateCartItemQuantity: build.mutation<
      SuccessResponse<CartItemDTO>,
      { id: number; quantity: number }
    >({
      query: ({ id, quantity }) => ({
        url: "/cart-change-quantity",
        method: "PATCH",
        body: { id, quantity },
      }),
      async onQueryStarted({ id, quantity }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const item = draft.items.find((x) => x.id === id);
            if (!item) return;
            const prevQty = item.quantity;
            item.quantity = quantity;
            const diff = quantity - prevQty;
            draft.totalQuantity += diff;
            draft.totalPrice += diff * item.product.price;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
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
  useUpdateCartItemQuantityMutation,
} = cartApi;
