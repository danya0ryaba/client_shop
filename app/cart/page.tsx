import { EmptyCart } from "@/components/shared/Cart/EmptyCart/EmptyCart";
import { Title } from "@/components/ui/Title";

import style from "./Cart.module.scss";
import { CartFilled } from "@/components/shared/Cart/CartFilled/CartFilled";
import { CardTotal } from "@/components/shared/Cart/CardTotal";

export default function Cart() {
  return (
    <div className={style.wrapper}>
      <Title as="h1" className={style.wrapper__title}>
        Корзина
      </Title>
      {/* <EmptyCart /> */}
      <CartFilled />
      <CardTotal />
    </div>
  );
}
