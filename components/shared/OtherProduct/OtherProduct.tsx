import { Title } from "@/components/ui/Title";
import style from "./OtherProduct.module.scss";
import { CartProduct } from "../CartProduct/CartProduct";

export const OtherProduct = () => {
  return (
    <div className={style.wrapper__other}>
      <Title as="h3" className={style.wrapper__other_title}>
        Похожие товары
      </Title>
      <div className={style.other}>
        <div className={style.other__slider}>
          <CartProduct className={style.product} />
          <CartProduct className={style.product} />
          <CartProduct className={style.product} />
          <CartProduct className={style.product} />
          {/* <CartProduct className={style.product} />
          <CartProduct className={style.product} />
          <CartProduct className={style.product} /> */}
        </div>
      </div>
    </div>
  );
};
