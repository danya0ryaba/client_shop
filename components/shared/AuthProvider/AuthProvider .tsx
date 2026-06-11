"use client";

import { ReactNode, useEffect } from "react";
import { useLazyRefreshQuery } from "@/libs/api";
import { useAppDispatch, useAppSelector } from "@/libs/hooks/useReduxHooks";
import {
  clearCredentials,
  selectAuthInitialized,
  setCredentials,
} from "@/store/slices/authSlice";

export const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);
  const [refresh] = useLazyRefreshQuery();

  useEffect(() => {
    const init = async () => {
      try {
        const data = await refresh().unwrap();
        dispatch(
          setCredentials({ accessToken: data.accessToken, user: data.user }),
        );
      } catch {
        dispatch(clearCredentials());
      }
    };

    init();
  }, [dispatch, refresh]);

  // if (!initialized) return null;

  return children;
};
