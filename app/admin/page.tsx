"use client";

import { Button, ButtonTheme } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { Plus } from "lucide-react";
import { AdminTabletCeil } from "@/components/shared/AdminTable/AdminTabletCeil/AdminTabletCeil";
import { useGetProductQuery } from "@/libs/api";
import { useRouter } from "next/navigation";

import style from "./admin.module.scss";

export default function AdminPage() {
  const router = useRouter();

  const { data, isError, isLoading } = useGetProductQuery({
    page: 1,
    limit: 10,
  });
  // мб записать все приходящие товары в стейт на клиенте и от туда уже доставать значения?

  const addProduct = () => {
    router.push("/admin/products/new");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.topBar}>
        <Title as="h1">Панель администратора</Title>
        <Button
          theme={ButtonTheme.secondary}
          icon={<Plus />}
          active
          onClick={addProduct}
        >
          Добавить товар
        </Button>
      </div>

      <div className={style.table}>
        <div className={style.headerRow} role="row">
          <div className={style.th}>Изображение</div>
          <div className={style.th}>Название</div>
          <div className={style.th}>Категория</div>
          <div className={style.th}>Цена</div>
          <div className={style.th}>Единица</div>
          <div className={style.th}>В наличии</div>
          <div className={style.thActions}>Действия</div>
        </div>

        <div className={style.body}>
          {isLoading && <div className={style.state}>Загрузка…</div>}
          {isError && <div className={style.stateError}>Ошибка загрузки</div>}

          {data?.products?.map((product) => (
            <AdminTabletCeil key={product.id} {...product} />
          ))}

          {!isLoading &&
            !isError &&
            (!data?.products || data.products.length === 0) && (
              <div className={style.state}>Пусто</div>
            )}
        </div>
      </div>
    </div>
  );
}
