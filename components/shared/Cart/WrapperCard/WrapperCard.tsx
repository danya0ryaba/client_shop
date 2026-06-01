"use client";

import { useGetCartQuery } from "@/libs/api/endpoints/card";
import { CardTotal } from "../CardTotal";
import { CartFilled } from "../CartFilled/CartFilled";
import { EmptyCart } from "../EmptyCart/EmptyCart";
import { useAppSelector } from "@/libs/hooks/useReduxHooks";

import style from "./WrapperCard.module.scss";

export const WrapperCard = () => {
  const accessToken = useAppSelector((s) => s.auth.accessToken);

  const { data, isLoading, isError } = useGetCartQuery(undefined, {
    skip: !accessToken,
  });

  if (!accessToken) return <div>Вы не вошли в свой аккаунт</div>; // или "войдите"
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка</div>;

  // надо дописать стили для мальньких экранов + поправить поиск(выпадающий список в нем)
  return (
    <div>
      {data!.items.length > 0 ? (
        <div className={style.available}>
          <div className={style.available__filled}>
            {data?.items.map((el) => (
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
