import { baseApi } from "../baseApi";
import type { CartItem, CartResponse } from "../../types/apiTypes";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Получение корзины текущего пользователя
    getCart: build.query<CartResponse, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // Добавление товара в корзину
    addToCart: build.mutation<
      { success: boolean; item?: CartItem },
      { productId: string | number; quantity?: number }
    >({
      query: ({ productId, quantity = 1 }) => ({
        url: `/cart/${productId}`,
        method: "POST",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"], // Инвалидируем кеш корзины после обновления
    }),

    // Обновление количества товара в корзине
    updateCartItem: build.mutation<
      CartItem,
      { productId: string | number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `/cart/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Удаление товара из корзины
    removeFromCart: build.mutation<{ success: boolean }, string | number>({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Очистка корзины
    clearCart: build.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
