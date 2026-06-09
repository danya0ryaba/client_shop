// import { Title } from "@/components/ui/Title";
// import { Button } from "@/components/ui/Button";
// import { useAppSelector } from "@/libs/hooks/useReduxHooks";
// import { useGetCartQuery } from "@/libs/api";

// import style from "./CardTotal.module.scss";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { ROUTES } from "@/routers/routers";

// export const CardTotal = ({}) => {
//   const routes = useRouter();

//   // const accessToken = useAppSelector((s) => s.auth.accessToken);

//   // const { totalQty, totalPrice, itemsCount } = useGetCartQuery(undefined, {
//   //   skip: !accessToken,
//   //   selectFromResult: ({ data }) => {
//   //     const items = data?.items ?? [];
//   //     const totalQty = items.reduce((sum, it) => sum + it.quantity, 0);
//   //     const totalPrice = items.reduce(
//   //       (sum, it) => sum + it.quantity * (it.product.price ?? 0),
//   //       0,
//   //     );
//   //     return {
//   //       totalQty,
//   //       totalPrice,
//   //       itemsCount: items.length,
//   //     };
//   //   },
//   // });

//   const accessToken = useAppSelector((s) => s.auth.accessToken);
//   const initialized = useAppSelector((s) => s.auth.initialized);
//   const { totalQty, totalPrice, itemsCount } = useGetCartQuery(undefined, {
//     skip: !initialized || !accessToken,
//     selectFromResult: ({ data }) => {
//       const items = data?.items ?? [];
//       const totalQty = items.reduce((sum, it) => sum + it.quantity, 0);
//       const totalPrice = items.reduce(
//         (sum, it) => sum + it.quantity * (it.product.price ?? 0),
//         0,
//       );
//       return {
//         totalQty,
//         totalPrice,
//         itemsCount: items.length,
//       };
//     },
//   });
//   if (!initialized) return null;
//   if (!accessToken) return null;

//   const onClickButton = () => {
//     toast.success("Заказ успешно оформлен");
//     routes.push(ROUTES.ORDER);
//   };

//   return (
//     <div className={style.wrapper}>
//       <Title as="h3" className={style.wrapper__title}>
//         Итого
//       </Title>
//       <div className={style.product__info}>
//         <div className={style.product__info_block}>
//           <span>Товары ({itemsCount})</span>
//           <span>{totalPrice} ₽</span>
//         </div>

//         <div className={style.product__info_block}>
//           <span>Доставка</span>
//           <span className={style.price}>Бесплатно</span>
//         </div>
//       </div>
//       <div className={style.total}>
//         <span>Всего</span>
//         <span>{totalPrice} ₽</span>
//       </div>
//       <Button active big onClick={onClickButton}>
//         Оформить заказ
//       </Button>
//       <span className={style.offer}>
//         Нажимая "Оформить заказ", вы соглашаетесь с условиями покупки
//       </span>
//     </div>
//   );
// };

"use client";

import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { useAppSelector } from "@/libs/hooks/useReduxHooks";
import { useGetCartQuery } from "@/libs/api";
import { toast } from "react-toastify";
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

      return {
        totalQty: items.reduce((sum, it) => sum + it.quantity, 0),
        totalPrice: items.reduce(
          (sum, it) => sum + it.quantity * (it.product.price ?? 0),
          0,
        ),
        itemsCount: items.length,
      };
    },
  });

  if (!initialized || !accessToken) return null;

  const onClickButton = () => {
    toast.success("Заказ успешно оформлен");
    router.push(ROUTES.ORDER);
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
