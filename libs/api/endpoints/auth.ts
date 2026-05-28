import { baseApi } from "../baseApi";

export type UserDTO = {
  id: string | number;
  email: string;
  isActivated: boolean;
  role: string;
  // fullName может не приходить в DTO — зависит от твоего UserDTO на бэке
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string; // в ответе есть, но cookie тоже ставится (httpOnly)
  user: UserDTO;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),

    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),

    logout: build.mutation<{ token: unknown }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    refresh: build.query<AuthResponse, void>({
      query: () => ({
        url: "/refresh",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useLazyRefreshQuery,
  useRefreshQuery,
} = authApi;
