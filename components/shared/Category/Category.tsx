"use client";

import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { useGetCategoriesQuery } from "@/libs/api";
import { CategoryI } from "@/libs/types/apiTypes";
import { useAppDispatch, useAppSelector } from "@/libs/hooks/useReduxHooks";

import style from "./Category.module.scss";
import { setActiveCategory } from "@/store/slices/categorySlice";

export const Category: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(
    (state) => state.category.activeCategory,
  );

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
            onClick={() => dispatch(setActiveCategory(el.name))}
          >
            {el.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
