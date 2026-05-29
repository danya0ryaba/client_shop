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
        await refresh().unwrap();
        router.replace("/cart");
      } catch {
        router.replace("/login");
      }
    })();
  }, [refresh, router]);

  return null;
}
