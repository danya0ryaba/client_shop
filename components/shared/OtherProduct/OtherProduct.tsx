import { Title } from "@/components/ui/Title";
import { CartProduct } from "../CartProduct/CartProduct";

import style from "./OtherProduct.module.scss";
import { ROUTES } from "@/routers/routers";
import Link from "next/link";

const products = Array.from({ length: 12 });

export const OtherProduct = () => {
  return (
    <div className={style.wrapper__other}>
      <Title as="h3" className={style.wrapper__other_title}>
        Похожие товары
      </Title>
      <div className={style.other}>
        <div className={style.other__slider}>
          {products.map((_, i) => (
            <Link href={ROUTES.PRODUCT(i)} key={i}>
              <CartProduct className={style.product} productId={i} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
