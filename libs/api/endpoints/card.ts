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
    // updateCartItemQuantity: build.mutation<
    //   SuccessResponse<CartItemDTO>,
    //   { id: number; delta: number }
    // >({
    //   query: ({ id, delta }) => ({
    //     url: "/cart-change-quantity",
    //     method: "PATCH",
    //     body: { id, delta },
    //   }),
    // }),

    updateCartItemQuantity: build.mutation<
      SuccessResponse<CartItemDTO>,
      { id: number; delta: number }
    >({
      query: ({ id, delta }) => ({
        url: "/cart-change-quantity",
        method: "PATCH",
        body: { id, delta },
      }),
      async onQueryStarted({ id, delta }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const it = draft.items.find((x) => x.id === id);
            if (!it) return;

            const nextQty = it.quantity + Math.trunc(delta);

            // если ушли в 0 или меньше — удаляем item (как сервер)
            if (nextQty <= 0) {
              const price = it.product.price ?? 0;
              draft.items = draft.items.filter((x) => x.id !== id);
              // если у тебя нет totalQuantity/totalPrice в ответе — эти строки убери
              // или пересчитай ниже "в лоб"
              return;
            }

            it.quantity = nextQty;

            // Если ты не хранишь totals на клиенте — ничего больше не надо,
            // CardTotal сам пересчитает totals из draft.items
          }),
        );

        try {
          await queryFulfilled;
          // можно не делать invalidate, если оптимистика корректная
        } catch {
          patch.undo();
        }
      },
      // optional: invalidatesTags: ["Cart"], // можно включить, но будет лишний refetch
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
