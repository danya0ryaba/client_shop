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
import { useGetCategoriesQuery } from "@/libs/api";

import style from "./FormProductUpdate.module.scss";

export const FormProductUpdate = ({
  product,
}: {
  product: ProductWithCategory;
}) => {
  const router = useRouter();
  const { data: category } = useGetCategoriesQuery();

  const categoryName = category?.map((c) => c.name) || [];
  console.log(categoryName);
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

  const onSubmit: SubmitHandler<FormStateProductUpdate> = (data) => {
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
        <Input
          text="Единица измерения"
          type="text"
          className={style.form__desc_item}
          {...register("unit")}
          error={errors.unit?.message}
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
