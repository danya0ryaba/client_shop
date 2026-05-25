"use client";

import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/libs/api";
import { CategoryI } from "@/libs/types/apiTypes";

import style from "./Category.module.scss";

interface CategoryProps {
  activeCategory: string;
  setActiveCategory: (value: string) => void;
}

export const Category: React.FC<CategoryProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const { data: categoriesData, isError, isLoading } = useGetCategoriesQuery();

  const categories: CategoryI[] | undefined = categoriesData
    ? [{ id: -1, name: "Все категории", createdAt: "", updatedAt: "" }].concat(
        categoriesData,
      )
    : undefined;

  return (
    <div className={style.category}>
      <Title as="h4">Категории</Title>
      <div className={style.categoryes}>
        {categories?.map((el) => (
          <Button
            active={el.name === activeCategory}
            key={el.id}
            onClick={() => setActiveCategory(el.name)}
          >
            {el.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
