"use client";

import { useGetCartQuery } from "@/libs/api/endpoints/card";
import { CardTotal } from "../CardTotal";
import { CartFilled } from "../CartFilled/CartFilled";
import { EmptyCart } from "../EmptyCart/EmptyCart";

import style from "./WrapperCard.module.scss";
import { useAppSelector } from "@/libs/hooks/useReduxHooks";

const arr = [1];

export const WrapperCard = () => {
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const { data, isLoading, isError } = useGetCartQuery(undefined, {
    skip: !accessToken, // пока нет accessToken - не запрашиваем корзину
  });

  console.log(accessToken);
  if (!accessToken) return <EmptyCart />; // или "войдите"
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка</div>;
  return <div>{JSON.stringify(data)}</div>;

  //   return (
  //     <div>
  //       {arr.length > 0 ? (
  //         <div className={style.available}>
  //           <div className={style.available__filled}>
  //             <CartFilled />
  //             <CartFilled />
  //           </div>
  //           <CardTotal />
  //         </div>
  //       ) : (
  //         <EmptyCart />
  //       )}
  //     </div>
  //   );
};
// ebcb759929@emailinbo.live
