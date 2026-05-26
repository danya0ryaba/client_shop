"use client";

import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
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

  if (isLoading) return <div>Загрузка продуктов...</div>;
  if (isError || !categoriesData)
    return <div>Продукты не найдены или произошла ошибка</div>;

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
