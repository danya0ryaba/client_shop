import { Title } from "@/components/ui/Title";

import { Category } from "@/components/shared/Category/Category";
import { CartProduct } from "@/components/shared/CartProduct/CartProduct";
import { Suspense } from "react";
import { Slider } from "@/components/shared/Slider/Slider";

import style from "./Products.module.scss";
import Link from "next/link";
import { ROUTES } from "@/routers/routers";

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
