"use client";

import { Back } from "@/components/ui/Back";
import { Title } from "@/components/ui/Title";
import { FormOrder } from "@/components/shared/FormOrder/FormOrder";
import { FormObtaining } from "@/components/shared/FormOrder/FormObtaining/FormObtaining";
import { TotalOrder } from "@/components/shared/FormOrder/TotalOrder/TotalOrder";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormValues, orderSchema } from "@/libs/schema";
import { useGetCartQuery } from "@/libs/api";
import { CartItemDTO } from "@/libs/types/apiTypes";

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

  const { data: cartData, isLoading: isCartLoading } =
    useGetCartQuery(undefined);

  const selectedItems: CartItemDTO[] =
    cartData?.items.filter((item) => item.selected) || [];

  const totalSum = selectedItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const onSubmit = (data: OrderFormValues) => {
    if (selectedItems.length === 0) {
      alert("Вы не выбрали ни одного товара для оформления!");
      return;
    }

    // Собираем ID выбранных товаров (этот массив пойдет на бэкенд)
    const selectedCartItemIds = selectedItems.map((item) => item.id);
    console.log("Данные формы:", data);
    console.log("ID выбранных товаров для бэка:", selectedCartItemIds);
    // Здесь потом будет вызов RTK Query мутации:
    // makeOrder({ ...data, selectedCartItemIds }).unwrap()
  };

  if (isCartLoading) return <div>Загрузка товаров для оформления...</div>;

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
            <TotalOrder items={selectedItems} totalSum={totalSum} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
