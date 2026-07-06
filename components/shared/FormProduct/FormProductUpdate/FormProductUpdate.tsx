"use client";

import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { formSchemaUpdateProduct, FormStateProductUpdate } from "@/libs/schema";
import { ProductWithCategory } from "@/libs/types/apiTypes";
import {
  useGetCategoriesQuery,
  useUpdateProductAdminMutation,
} from "@/libs/api";
import { Input } from "@/components/ui/Input";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { InputDescription } from "@/components/ui/InputDescription";
import { Select } from "@/components/ui/Select";
import { units } from "@/libs/const/const";
import { Checkbox } from "@/components/ui/Checkbox";

import style from "./FormProductUpdate.module.scss";

export const FormProductUpdate = ({
  product,
}: {
  product: ProductWithCategory;
}) => {
  const router = useRouter();
  const [updateProductMutation] = useUpdateProductAdminMutation();
  const { data: categories } = useGetCategoriesQuery();

  const categoryOptions =
    categories?.map((c) => ({
      label: c.name,
      value: String(c.id),
    })) || [];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormStateProductUpdate>({
    resolver: zodResolver(formSchemaUpdateProduct),
    mode: "onChange",
    defaultValues: {
      name: "",
      categoryId: "",
      price: "",
      unit: "",
      description: "",
      quantityProduct: "",
      deliveryToCities: false,
    },
  });

  useEffect(() => {
    if (!product) return;

    reset({
      name: product.name ?? "",
      categoryId: product.categoryId ? String(product.categoryId) : "",
      price: product.price != null ? String(product.price) : "",
      unit: product.unit ?? "",
      description: product.description ?? "",
      quantityProduct:
        product.quantityProduct != null ? String(product.quantityProduct) : "",
      deliveryToCities: product.deliveryToCities ?? false,
    });
  }, [product, reset]);

  const onSubmit: SubmitHandler<FormStateProductUpdate> = async (data) => {
    try {
      await updateProductMutation({
        id: product.id,
        name: data.name,
        description: data.description,
        price: Number(data.price),
        categoryId: Number(data.categoryId),
        unit: data.unit,
        quantityProduct: Number(data.quantityProduct),
        deliveryToCities: data.deliveryToCities,
      }).unwrap();

      toast.success("Товар обновлен успешно");
      router.refresh();
    } catch (error) {
      console.error("Ошибка при обновлении товара:", error);
      toast.error("Не удалось обновить товар");
    }
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
          name="categoryId"
          render={({ field }) => (
            <Select
              text="Категория"
              options={categoryOptions}
              className={style.form__desc_item}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={errors.categoryId?.message}
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
              onBlur={field.onBlur}
              name={field.name}
              error={errors.unit?.message}
            />
          )}
        />
      </div>

      <InputDescription
        text="Описание"
        {...register("description")}
        error={errors.description?.message}
      />

      <Input
        text="Количество"
        {...register("quantityProduct")}
        error={errors.quantityProduct?.message}
      />

      <Controller
        control={control}
        name="deliveryToCities"
        render={({ field }) => (
          <Checkbox
            label="Доставка в другие города"
            value={field.value || false}
            onChange={() => field.onChange(!field.value)}
            error={errors.deliveryToCities?.message}
          />
        )}
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
