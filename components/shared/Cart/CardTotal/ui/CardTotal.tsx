"use client";

import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { useAppSelector } from "@/libs/hooks/useReduxHooks";
import { useGetCartQuery } from "@/libs/api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routers/routers";

import style from "./CardTotal.module.scss";

export const CardTotal = () => {
  const router = useRouter();
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const initialized = useAppSelector((s) => s.auth.initialized);

  const { totalQty, totalPrice, itemsCount } = useGetCartQuery(undefined, {
    skip: !initialized || !accessToken,
    selectFromResult: ({ data }) => {
      const items = data?.items ?? [];
      const selectedItems = items.filter((item) => item.selected);
      return {
        totalQty: selectedItems.reduce((sum, it) => sum + it.quantity, 0),
        totalPrice: selectedItems.reduce(
          (sum, it) => sum + it.quantity * (it.product.price ?? 0),
          0,
        ),
        itemsCount: selectedItems.length,
      };
    },
  });

  if (!initialized || !accessToken) return null;

  return (
    <div className={style.wrapper}>
      <Title as="h3" className={style.wrapper__title}>
        Итого
      </Title>

      <div className={style.product__info}>
        <div className={style.product__info_block}>
          <span>Товары ({itemsCount})</span>
          <span>{totalPrice} ₽</span>
        </div>
      </div>

      <div className={style.total}>
        <span>Всего</span>
        <span>{totalPrice} ₽</span>
      </div>

      <Button active big onClick={() => router.push(ROUTES.ORDER)}>
        Оформить заказ
      </Button>

      <span className={style.offer}>
        Нажимая "Оформить заказ", вы соглашаетесь с условиями покупки
      </span>
    </div>
  );
};
