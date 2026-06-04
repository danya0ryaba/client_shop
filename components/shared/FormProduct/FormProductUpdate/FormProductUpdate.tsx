"use client";

import { Input } from "@/components/ui/Input";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { InputDescription } from "@/components/ui/InputDescription";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { SubmitHandler, useForm } from "react-hook-form";
import { formSchemaCreateProduct, FormStateProductCreate } from "@/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import style from "./FormProductUpdate.module.scss";
import { useRouter } from "next/navigation";

const options = ["11", "12", "13", "14", "15"];

export const FormProductUpdate = ({
  product,
}: {
  product: Partial<FormStateProductCreate> | null;
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormStateProductCreate>({
    resolver: zodResolver(formSchemaCreateProduct),
    mode: "onChange",
    defaultValues: product || {
      name: "",
      category: "",
      price: "",
      unit: "",
      image: "",
      description: "",
      stock: false,
    },
  });

  const onSubmit: SubmitHandler<FormStateProductCreate> = (data) => {
    console.log("Submitted data:", data);
    // Логика отправки формы на сервер
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <Input
          text="Название товара"
          {...register("name")}
          error={errors.name?.message}
        />
        <div className={style.form__desc}>
          <Select
            text="Категория"
            options={options}
            className={style.form__desc_item}
            {...register("category")}
            error={errors.category?.message}
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
        <div>
          <Checkbox label="Товар в наличии" {...register("stock")} />
        </div>
        <div className={style.form__buttons}>
          <Button
            type="submit"
            theme={ButtonTheme.secondary}
            active
            big
            className={style.form__buttons_btn}
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
    </div>
  );
};
