"use client";

import { Suspense } from "react";
import { useAppSelector } from "@/libs/hooks/useReduxHooks";
import { Title } from "@/components/ui/Title";
import { Slider } from "@/components/shared/Slider/Slider";
import { Category } from "@/components/shared/Category/Category";
import { ProductsBlock } from "@/components/shared/ProductsBlock/ProductsBlock";

import style from "./Products.module.scss";

export default function Products() {
  const activeCategory = useAppSelector(
    (state) => state.category.activeCategory,
  );

  return (
    <>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <Slider />
        <Category />
        <main>
          <div className={style.info_category}>
            <Title as="h4">Все товары</Title>
          </div>
          <ProductsBlock activeCategory={activeCategory} />
        </main>
      </Suspense>
    </>
  );
}
