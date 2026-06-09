import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthState = {
  accessToken: string | null;
  user: any | null;
  initialized: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user?: any }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user ?? state.user;
      state.initialized = true;
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    setAuthInitialized: (state) => {
      state.initialized = true;
    },
  },
});

export const { setCredentials, clearCredentials, setAuthInitialized } =
  authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.accessToken);

export const selectAuthInitialized = (state: RootState) =>
  state.auth.initialized;
