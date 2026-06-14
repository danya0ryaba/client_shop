"use client";

import { House, Truck, CreditCard, BanknoteArrowDown } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { useState } from "react";
import dynamic from "next/dynamic";
const AddressInput = dynamic(
  () => import("@/components/ui/AddressInput").then((mod) => mod.AddressInput),
  { ssr: false },
);

import style from "./FormObtaining.module.scss";

type Delivery = "courier" | "pickup";
type Payment = "cash" | "cart";

export const FormObtaining = () => {
  const [activeChoice, setActiveChoice] = useState<Delivery>("courier");
  const [activePayment, setPayment] = useState<Payment>("cart");

  const onChoiceDeliveryHandler = (value: Delivery) => {
    setActiveChoice(value);
  };

  const onPaymentHandler = (value: Payment) => {
    setPayment(value);
  };

  return (
    <>
      <div className={style.form__obtaining}>
        <div className={style.title}>
          <Truck className={style.title__svg} />
          <Title as="h4">Способ получения</Title>
        </div>

        <div className={style.choice}>
          <div
            className={`${style.choice__item} ${activeChoice === "courier" ? style.choice__item_active : ""}`}
            onClick={() => onChoiceDeliveryHandler("courier")}
          >
            <Truck className={style.svg} />
            <span className={style.title}>Доставка курьером</span>
            <span className={style.desc}>
              Бесплатно при заказе от 200р, иначе +300р
            </span>
          </div>

          <div
            className={`${style.choice__item} ${activeChoice === "pickup" ? style.choice__item_active : ""}`}
            onClick={() => onChoiceDeliveryHandler("pickup")}
          >
            <House className={style.svg} />
            <span className={style.title}>Самовывоз</span>
            <span className={style.desc}>Бесплатно ул.Кузнецова 7А</span>
          </div>
        </div>

        <div className={style.title}>
          <CreditCard className={style.title__svg} />
          <Title as="h4">Способ оплаты</Title>
        </div>
        <div className={style.choice}>
          <div
            className={`${style.choice__item} ${activePayment === "cash" ? style.choice__item_active : ""}`}
            onClick={() => onPaymentHandler("cash")}
          >
            <BanknoteArrowDown className={style.svg} />
            <span className={style.title}>Наличными</span>
            <span className={style.desc}>При получении заказа</span>
          </div>

          <div
            className={`${style.choice__item} ${activePayment === "cart" ? style.choice__item_active : ""}`}
            onClick={() => onPaymentHandler("cart")}
          >
            <CreditCard className={style.svg} />
            <span className={style.title}>Картой</span>
          </div>
        </div>

        <div>на основе activeChoice показываю форму </div>

        <AddressInput />
      </div>
    </>
  );
};
