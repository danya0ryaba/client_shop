"use client";

import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaUpdateProduct, FormStateProductUpdate } from "@/libs/schema";
import { ProductWithCategory } from "@/libs/types/apiTypes";
import { Input } from "@/components/ui/Input";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { InputDescription } from "@/components/ui/InputDescription";
import { Select } from "@/components/ui/Select";
import { useRouter } from "next/navigation";
import {
  useGetCategoriesQuery,
  useUpdateProductAdminMutation,
} from "@/libs/api";

import style from "./FormProductUpdate.module.scss";

const units = ["шт", "кг", "г", "л", "штк"];

export const FormProductUpdate = ({
  product,
}: {
  product: ProductWithCategory;
}) => {
  const router = useRouter();

  const [updateProductMutation] = useUpdateProductAdminMutation();

  const { data: category } = useGetCategoriesQuery();

  const categoryName = category?.map((c) => c.name) || [];

  // нужно менять "категорию", при обновлении она не меняется(хз, мб бэк чекнуть)
  // + типы(ProductCreateInput, ProductUpdateInput)

  // Проблемы с добавлением пользователем новых товаров в корзину
  // то есть пользователь регается и пытается добавить товар, который админ создал через форму и тут прилетает ошибка

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormStateProductUpdate>({
    resolver: zodResolver(formSchemaUpdateProduct),
    mode: "onChange",
  });

  useEffect(() => {
    if (!product) return;
    reset({
      name: product.name ?? "",
      description: product.description ?? "",
      image: product.imageUrl ?? "",
      price: product.price != null ? String(product.price) : "",
      // category: у тебя в продукте categoryId:number, а в форме register("category") — похоже string
      category: product.categoryId != null ? String(product.categoryId) : "",
      // unit/stock — в ProductWithCategory их нет, оставь дефолт или выведи из своих полей
      unit: "",
    });
  }, [product, reset]);

  const onSubmit: SubmitHandler<FormStateProductUpdate> = async (data) => {
    try {
      await updateProductMutation({
        id: product.id,
        name: data.name,
        imageUrl: data.image,
        description: data.description || "",
        price: Number(data.price),
        categoryName: data.category,
        unit: data.unit || "",
        quantity: data.quantity,
        // size: data.size ? Number(data.size) : null,
      }).unwrap();
      alert("Товар обновлен успешно");
    } catch (error) {
      console.error("Ошибка при обновлении товара:", error);
    }
    console.log("Submitted data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input
        text="Название товара"
        {...register("name")}
        error={errors.name?.message}
      />

      <div className={style.form__desc}>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              text="Категория"
              options={categoryName}
              className={style.form__desc_item}
              // value={field} // надо тут исправлять
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={errors.category?.message}
            />
          )}
        />
        <Input
          text="Цена (₽)"
          type="number"
          className={style.form__desc_item}
          {...register("price")}
          error={errors.price?.message}
        />
        <Controller
          control={control}
          name="unit"
          render={({ field }) => (
            <Select
              text="Единица измерения"
              options={units}
              className={style.form__desc_item}
              value={field.value}
              onChange={field.onChange}
              error={errors.unit?.message}
            />
          )}
        />
      </div>
      <Input
        text="URL изображения"
        type="url"
        {...register("image")}
        error={errors.image?.message}
      />
      <InputDescription
        text="Описание"
        {...register("description")}
        error={errors.description?.message}
      />
      <Input
        text="Количество"
        {...register("quantity")}
        error={errors.quantity?.message}
      />
      <div className={style.form__buttons}>
        <Button
          type="submit"
          theme={ButtonTheme.secondary}
          active
          big
          className={style.form__buttons_btn}
          disabled={!isValid}
        >
          Сохранить изменения
        </Button>
        <Button
          className={style.form__buttons_btn}
          big
          type="button"
          onClick={() => router.back()}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
};
