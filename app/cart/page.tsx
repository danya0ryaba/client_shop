import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/routers/routers";
import { Title } from "@/components/ui/Title";
import { CardTotal } from "@/components/shared/Cart/CardTotal";
import { EmptyCart } from "@/components/shared/Cart/EmptyCart/EmptyCart";
import { CartFilled } from "@/components/shared/Cart/CartFilled/CartFilled";

import style from "./Cart.module.scss";

const arr = [1];

export default function Cart() {
  return (
    <div className={style.wrapper}>
      <Link href={ROUTES.HOME} className={style.wrapper__back}>
        <ArrowLeft /> Вернуться к покупкам
      </Link>
      <Title as="h1" className={style.wrapper__title}>
        Корзина
      </Title>
      {arr.length > 0 ? (
        <div className={style.available}>
          <div className={style.available__filled}>
            <CartFilled />
            <CartFilled />
          </div>
          <CardTotal />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
