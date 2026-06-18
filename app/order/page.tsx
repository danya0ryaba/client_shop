"use client";

import { Back } from "@/components/ui/Back";
import { Title } from "@/components/ui/Title";
import { FormOrder } from "@/components/shared/FormOrder/FormOrder";
import { FormObtaining } from "@/components/shared/FormOrder/FormObtaining/FormObtaining";
import { TotalOrder } from "@/components/shared/FormOrder/TotalOrder/TotalOrder";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormValues, orderSchema } from "@/libs/schema";

import style from "./order.module.scss";

export default function OrderPage() {
  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      comment: "",
      delivery: "courier",
      payment: "cart",
      address: null,
    },
    mode: "onBlur",
  });
  const onSubmit = (data: OrderFormValues) => {
    console.log("submit", data);
    console.log("submit", JSON.stringify(data));
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={style.wrapper}>
          <Back />
          <Title>Оформление заказа</Title>
        </div>
        <div className={style.wrapper__info}>
          <div className={style.wrapper__info_form}>
            <FormOrder />
            <FormObtaining />
          </div>
          <div className={style.wrapper__info_total}>
            <TotalOrder />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
