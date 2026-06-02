"use client";

import { Button, ButtonTheme } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { Plus } from "lucide-react";
import { AdminTabletCeil } from "@/components/shared/AdminTable/AdminTabletCeil/AdminTabletCeil";
import { useGetProductQuery } from "@/libs/api";

import style from "./admin.module.scss";

export default function AdminPage() {
  const { data, isError, isLoading } = useGetProductQuery({
    page: 1,
    limit: 10,
  });

  return (
    <div className={style.wrapper__admin}>
      <div className={style.admin}>
        <Title as="h1">Панель администратора</Title>
        <Button theme={ButtonTheme.secondary} icon={<Plus />} active>
          Добавить товар
        </Button>
      </div>

      <div className={style.admin__name_col}>
        <div className={style.img_and_name}>
          <ul>
            <li>Изображение</li>
            <li>Название</li>
          </ul>
        </div>
        <ul>
          <li>Категория</li>
          <li>Цена</li>
          <li>Единица</li>
          <li>В наличии</li>
          <li>Действия</li>
        </ul>
      </div>

      {/* TABLET */}
      {data?.products.map((product, i) => (
        // <div key={i}>{i}</div>
        <AdminTabletCeil key={product.id} {...product} />
      ))}
    </div>
  );
}
