"use client";

import { User } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { Input, InputPhone } from "@/components/ui/Input";
import { InputDescription } from "@/components/ui/InputDescription";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "@/libs/schema";

import style from "./FormOrder.module.scss";

interface FormOrderI {
  className?: string;
}

export const FormOrder: React.FC<FormOrderI> = ({ className }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  return (
    <div className={`${style.form} ${className || ""}`}>
      <div className={style.title}>
        <User className={style.title__svg} />
        <Title as="h4">Контактные данные</Title>
      </div>

      <div className={style.info__user}>
        <Input
          text="Имя *"
          className={style.info__user_input}
          {...register("name")}
          error={errors.name?.message}
        />

        <InputPhone<OrderFormValues>
          name="phone"
          control={control}
          text="Телефон *"
          className={style.info__user_input}
          error={errors.phone?.message}
        />
      </div>

      <div className="email">
        <Input
          text="E-mail (необязательно)"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <InputDescription
        text="Комментарий к заказу"
        placeholder="Например, позвоните за 30мин до доставки"
        {...register("comment")}
        error={errors.comment?.message}
      />
    </div>
  );
};
