"use client";

import { Button, ButtonTheme } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { InputDescription } from "@/components/ui/InputDescription";
import { Select } from "@/components/ui/Select";
import {
  useCreateProductAdminMutation,
  useGetCategoriesQuery,
} from "@/libs/api";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { formSchemaCreateProduct, FormStateProductCreate } from "@/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/routers/routers";

import style from "../FormProductUpdate/FormProductUpdate.module.scss";
import { toast } from "react-toastify";

const units = ["шт", "кг", "г", "л", "штк"];

export const FormProductCreate = () => {
  const router = useRouter();
  const [createProductMutation] = useCreateProductAdminMutation();
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
      unit: "шт", // Значение по умолчанию
      // image: "",
      description: "",
      quantity: "",
      size: "",
    },
  });

  const onSubmit: SubmitHandler<FormStateProductCreate> = async (data) => {
    // ЕСТЬ КАКАЯ-ТО ОШИБКА, МБ В ТИПАХ
    // ПОЧЕМУ-ТО КАЖДЫЙ РАЗ ИДЕТ ЗАПРОС НА product-create => ОН НЕУДАЧЕН, ЛОВЛЮ ОШИБКУ(401 Unauthorized {"message":"Пользователь не авторизован","errprs":[]})
    // и автоматом соответсвенно идет запрос на REFRESH и только после этого опять запрос на product-create и он правильный(работает)

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price);
      formData.append("categoryName", data.category);
      formData.append("unit", data.unit || "шт");

      if (data.size) formData.append("size", data.size);
      if (data.quantity) formData.append("quantityProduct", data.quantity);

      Array.from(data.image).forEach((file) => {
        formData.append("images", file);
      });

      console.log(formData);

      await createProductMutation(formData).unwrap();

      router.push(ROUTES.ADMIN);
      toast.success("Товар добавлен");
    } catch (error) {
      console.error("Ошибка при создании товара:", error);
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
        text="Размер"
        type="text"
        className={style.form__desc_item}
        {...register("size")}
        error={errors.size?.message}
      />

      <Input
        text="Изображения"
        type="file"
        accept="image/*"
        multiple
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
          Создать продукт
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

// на бэке 100% нужно

// name, imageUrl, description, price, categoryName, unit

// а на клиенте в форме приходит

// category :  "Другое"
// description : "Пробую создать новый товар как админ"
// image :  "http://localhost:3000/admin/create-product"
// name :  "новый товар"
// price :  "111"
// quantity :  "1"
// size :  "ф"
// unit :  "кг"
