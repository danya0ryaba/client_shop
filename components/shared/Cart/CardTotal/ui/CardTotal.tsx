import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { useAppSelector } from "@/libs/hooks/useReduxHooks";
import { useGetCartQuery } from "@/libs/api";

import style from "./CardTotal.module.scss";
import { toast } from "react-toastify";

export const CardTotal = ({}) => {
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const { totalQty, totalPrice, itemsCount } = useGetCartQuery(undefined, {
    skip: !accessToken,
    selectFromResult: ({ data }) => {
      const items = data?.items ?? [];
      const totalQty = items.reduce((sum, it) => sum + it.quantity, 0);
      const totalPrice = items.reduce(
        (sum, it) => sum + it.quantity * (it.product.price ?? 0),
        0,
      );
      return {
        totalQty,
        totalPrice,
        itemsCount: items.length,
      };
    },
  });
  if (!accessToken) return null;

  const onClickButton = () => {
    toast.success("Заказ успешно оформлен");
  };

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

        <div className={style.product__info_block}>
          <span>Доставка</span>
          <span className={style.price}>Бесплатно</span>
        </div>
      </div>
      <div className={style.total}>
        <span>Всего</span>
        <span>{totalPrice} ₽</span>
      </div>
      <Button active big onClick={onClickButton}>
        Оформить заказ
      </Button>
      <span className={style.offer}>
        Нажимая "Оформить заказ", вы соглашаетесь с условиями покупки
      </span>
    </div>
  );
};
