import { clearCredentials, setCredentials } from "@/store/slices/authSlice";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<any, { email: string; password: string }>({
      query: (body) => ({ url: "/login", method: "POST", body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({ accessToken: data.accessToken, user: data.user }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    register: build.mutation<
      any,
      { fullName: string; email: string; password: string }
    >({
      query: (body) => ({ url: "/register", method: "POST", body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({ accessToken: data.accessToken, user: data.user }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    refresh: build.query<any, void>({
      query: () => ({ url: "/refresh", method: "GET" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({ accessToken: data.accessToken, user: data.user }),
          );
        } catch (error) {
          dispatch(clearCredentials());
          console.log(error);
        }
      },
    }),

    logout: build.mutation<any, void>({
      query: () => ({ url: "/logout", method: "POST" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(clearCredentials());
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshQuery,
  useLazyRefreshQuery,
} = authApi;
