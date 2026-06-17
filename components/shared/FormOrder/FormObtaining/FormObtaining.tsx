"use client";

import { House, Truck, CreditCard, BanknoteArrowDown } from "lucide-react";
import { Title } from "@/components/ui/Title";
import dynamic from "next/dynamic";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const AddressInput = dynamic(
  () => import("@/components/ui/AddressInput").then((mod) => mod.AddressInput),
  { ssr: false },
);

import style from "./FormObtaining.module.scss";
import { OrderFormValues } from "@/libs/schema";

export const FormObtaining = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  const delivery = useWatch({
    control,
    name: "delivery",
  });

  return (
    <div className={style.form__obtaining}>
      <div className={style.title}>
        <Truck className={style.title__svg} />
        <Title as="h4">Способ получения</Title>
      </div>

      <Controller
        name="delivery"
        control={control}
        render={({ field }) => (
          <div className={style.choice}>
            <div
              className={`${style.choice__item} ${
                field.value === "courier" ? style.choice__item_active : ""
              }`}
              onClick={() => field.onChange("courier")}
            >
              <Truck className={style.svg} />
              <span className={style.title}>Доставка курьером</span>
              <span className={style.desc}>
                Бесплатно при заказе от 200р, иначе +300р
              </span>
            </div>

            <div
              className={`${style.choice__item} ${
                field.value === "pickup" ? style.choice__item_active : ""
              }`}
              onClick={() => field.onChange("pickup")}
            >
              <House className={style.svg} />
              <span className={style.title}>Самовывоз</span>
              <span className={style.desc}>Бесплатно ул.Кузнецова 7А</span>
            </div>
          </div>
        )}
      />
      {errors.delivery?.message && (
        <span style={{ color: "red" }}>{errors.delivery.message}</span>
      )}

      <div className={style.title}>
        <CreditCard className={style.title__svg} />
        <Title as="h4">Способ оплаты</Title>
      </div>

      <Controller
        name="payment"
        control={control}
        render={({ field }) => (
          <div className={style.choice}>
            <div
              className={`${style.choice__item} ${
                field.value === "cash" ? style.choice__item_active : ""
              }`}
              onClick={() => field.onChange("cash")}
            >
              <BanknoteArrowDown className={style.svg} />
              <span className={style.title}>Наличными</span>
              <span className={style.desc}>При получении заказа</span>
            </div>

            <div
              className={`${style.choice__item} ${
                field.value === "cart" ? style.choice__item_active : ""
              }`}
              onClick={() => field.onChange("cart")}
            >
              <CreditCard className={style.svg} />
              <span className={style.title}>Картой</span>
            </div>
          </div>
        )}
      />
      {errors.payment?.message && (
        <span style={{ color: "red" }}>{errors.payment.message}</span>
      )}

      {delivery === "courier" && (
        <>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <AddressInput onChange={(value) => field.onChange(value)} />
            )}
          />
          {errors.address?.message && (
            <span style={{ color: "red" }}>{"errors.address.message"}</span>
          )}
        </>
      )}
    </div>
  );
};
