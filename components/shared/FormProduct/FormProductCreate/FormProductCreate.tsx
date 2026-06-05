"use client";

import { Button, ButtonTheme } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { InputDescription } from "@/components/ui/InputDescription";
import { Select } from "@/components/ui/Select";
import { useGetCategoriesQuery } from "@/libs/api";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { formSchemaCreateProduct, FormStateProductCreate } from "@/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import style from "../FormProductUpdate/FormProductUpdate.module.scss";

export const FormProductCreate = () => {
  const router = useRouter();

  const { data: category } = useGetCategoriesQuery();

  const categoryName = category?.map((c) => c.name) || [];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormStateProductCreate>({
    resolver: zodResolver(formSchemaCreateProduct),
    mode: "onTouched",
    defaultValues: {
      name: "",
      category: "",
      price: "",
      unit: "",
      image: "",
      description: "",
      quantity: "",
      size: "",
    },
  });

  const onSubmit: SubmitHandler<FormStateProductCreate> = (data) => {
    console.log(data);
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
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={errors.category?.message}
            />
          )}
        />

        <Input
          text="Цена (₽)"
          className={style.form__desc_item}
          {...register("price")}
          error={errors.price?.message}
        />
        <Input
          text="Единица измерения"
          className={style.form__desc_item}
          {...register("unit")}
          error={errors.unit?.message}
        />
      </div>
      <Input
        text="Размер"
        type="text"
        className={style.form__desc_item}
        {...register("size")}
        error={errors.size?.message}
      />

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

// нужно на бэк дописать unit(кг гр и тд)
