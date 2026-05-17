"use client";

import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

import style from "./Category.module.scss";

const category = ["Все категории", "Овощи", "Ягоды", "Зелень"];

export const Category = () => {
  const [activeCategory, setActiveCategory] = useState("Все категории");

  const onHandlerChangeCategory = (category: string) => {
    setActiveCategory(category);
    // alert(category);
  };

  return (
    <div className={style.category}>
      <Title as="h4">Категории</Title>
      <div className={style.categoryes}>
        {category.map((el, i) => (
          <Button
            active={el === activeCategory}
            key={el + i}
            onClick={() => onHandlerChangeCategory(el)}
          >
            {el}
          </Button>
        ))}
      </div>
    </div>
  );
};
