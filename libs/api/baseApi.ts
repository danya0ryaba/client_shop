import { clearCredentials, setCredentials } from "@/store/slices/authSlice";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL, // например http://localhost:5000/api
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as any;
    const token = state.auth?.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // пробуем обновить токен
    const refreshResult = await rawBaseQuery(
      { url: "/refresh", method: "GET" },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // ожидаем, что /refresh вернёт { accessToken, user }
      const data = refreshResult.data as any;
      api.dispatch(
        setCredentials({ accessToken: data.accessToken, user: data.user }),
      );

      // повторяем оригинальный запрос уже с новым accessToken
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Product", "Category", "Cart"],
});
