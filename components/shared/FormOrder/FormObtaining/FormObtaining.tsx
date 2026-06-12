"use client";

import { House, Truck } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { useState } from "react";

import style from "./FormObtaining.module.scss";

type Delivery = "courier" | "pickup";

export const FormObtaining = () => {
  const [activeChoice, setActiveChoice] = useState<Delivery>("courier");

  const onChoiceHandler = (value: Delivery) => {
    setActiveChoice(value);
  };

  return (
    <div className={style.form__obtaining}>
      <div className={style.title}>
        <Truck className={style.title__svg} />
        <Title as="h4">Способ получения</Title>
      </div>

      <div className={style.choice}>
        <div
          className={`${style.choice__item} ${activeChoice === "courier" ? style.choice__item_active : ""}`}
          onClick={() => onChoiceHandler("courier")}
        >
          <Truck className={style.svg} />
          <span className={style.title}>Доставка курьером</span>
          <span className={style.desc}>
            Бесплатно при заказе от 200р, иначе +300р
          </span>
        </div>

        <div
          className={`${style.choice__item} ${activeChoice === "pickup" ? style.choice__item_active : ""}`}
          onClick={() => onChoiceHandler("pickup")}
        >
          <House className={style.svg} />
          <span className={style.title}>Самовывоз</span>
          <span className={style.desc}>Бесплатно ул.Кузнецова 7А</span>
        </div>
      </div>

      <span>на основе activeChoice показываю форму</span>
    </div>
  );
};
