"use client";
import { useEffect } from "react";
import { useLazyRefreshQuery } from "@/libs/api/endpoints/auth";
import { useRouter } from "next/navigation";

export default function ActivatedPage() {
  const [refresh] = useLazyRefreshQuery();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await refresh().unwrap(); // получит accessToken, положит в authSlice
        router.replace("/cart"); // или на главную
      } catch {
        router.replace("/login");
      }
    })();
  }, [refresh, router]);

  return null;
}
