"use client";

import {
  useGetCartQuery,
  useSelectProductMutation,
} from "@/libs/api/endpoints/card";
import { CardTotal } from "../CardTotal";
import { CartFilled } from "../CartFilled/CartFilled";
import { EmptyCart } from "../EmptyCart/EmptyCart";
import { useAppSelector } from "@/libs/hooks/useReduxHooks";
import { Checkbox } from "@/components/ui/Checkbox";

import style from "./WrapperCard.module.scss";

export const WrapperCard = () => {
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const initialized = useAppSelector((s) => s.auth.initialized);
  const [selectProduct] = useSelectProductMutation();

  const { data, isLoading, isError } = useGetCartQuery(undefined, {
    skip: !initialized || !accessToken,
  });

  if (!initialized) return <div>Проверка авторизации...</div>;
  if (!accessToken) return <div>Вы не вошли в свой аккаунт</div>;
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки корзины</div>;
  if (!data) return <div>Корзина не загружена</div>;

  const isAllSelected =
    data.items.length > 0 && data.items.every((item) => item.selected);

  const handleSelectAll = async () => {
    const targetState = !isAllSelected;

    const itemsToToggle = targetState
      ? data.items.filter((item) => !item.selected)
      : data.items.filter((item) => item.selected);
    await Promise.allSettled(
      itemsToToggle.map((item) => selectProduct({ id: item.id }).unwrap()),
    );
  };

  return (
    <div className={style.wrapper__card}>
      {data.items.length > 0 && (
        <Checkbox
          label="Выбрать все"
          value={isAllSelected}
          className={style.checkbox__all}
          onChange={handleSelectAll}
        />
      )}

      {data.items.length > 0 ? (
        <div className={style.available}>
          <div className={style.available__filled}>
            {data.items.map((el) => (
              <CartFilled key={el.id} item={el} />
            ))}
          </div>
          <CardTotal />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};
