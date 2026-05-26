"use client";

import { Suspense, useState } from "react";
import { Title } from "@/components/ui/Title";
import { Slider } from "@/components/shared/Slider/Slider";
import { Category } from "@/components/shared/Category/Category";
import { ProductsBlock } from "@/components/shared/ProductsBlock/ProductsBlock";

import style from "./Products.module.scss";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("Все категории");

  return (
    <>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <Slider />
        <Category
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
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
