import { Title } from "@/components/ui/Title";
import { Category } from "@/components/shared/Category/Category";
import { CartProduct } from "@/components/shared/CartProduct/CartProduct";

import style from "./Products.module.scss";

const products = Array.from({ length: 12 });

export default function Products() {
  return (
    <>
      <Category />
      <main>
        <div className={style.info_category}>
          <Title as="h4">Все товары</Title>
          <span>Найдено товаров: 12</span>
        </div>
        <div className={style.list__product}>
          {products.map((_, i) => (
            <CartProduct key={i} />
          ))}
        </div>
      </main>
    </>
  );
}
