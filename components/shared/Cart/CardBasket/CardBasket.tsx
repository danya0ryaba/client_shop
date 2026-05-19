"use client";

import { Title } from "@/components/ui/Title";
import { Trash2 } from "lucide-react";
import { Counter } from "@/components/ui/Counter";

import style from "./CardBasket.module.scss";

export const CardBasket = () => {
  const removeProduct = (id: string) => {
    alert(id);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.image}>
        <img src="https://placehold.co/200x150" alt="placehold" />
      </div>
      <div className={style.info}>
        <div className={style.info__block}>
          <div className={style.info__block_el}>
            <Title as="h5">Помидоры свежие</Title>
            <span className={style.price}>189 ₽ / кг</span>
          </div>
          <div className={style.info__block_el}>
            <div className={style.icon}>
              <Trash2
                className={style.icon__svg}
                onClick={() => removeProduct("2")}
              />
            </div>
          </div>
        </div>
        <div className={style.info__block}>
          <div className={style.info__block_counter}>
            <Counter />
          </div>
          <div className={style.info__block_price}>189 ₽</div>
        </div>
      </div>
    </div>
  );
};
