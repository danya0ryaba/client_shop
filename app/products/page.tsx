import Link from "next/link";
import { Suspense } from "react";
import { ROUTES } from "@/routers/routers";
import { Title } from "@/components/ui/Title";
import { Slider } from "@/components/shared/Slider/Slider";
import { Category } from "@/components/shared/Category/Category";
import { CartProduct } from "@/components/shared/CartProduct/CartProduct";

import style from "./Products.module.scss";

const products = Array.from({ length: 12 });

export default function Products() {
  return (
    <>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <Slider />
      </Suspense>
      <Category />
      <main>
        <div className={style.info_category}>
          <Title as="h4">Все товары</Title>
          <span>Найдено товаров: 12</span>
        </div>
        <div className={style.list__product}>
          {products.map((_, i) => (
            <Link href={ROUTES.PRODUCT(i)} key={i}>
              <CartProduct productId={i} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
