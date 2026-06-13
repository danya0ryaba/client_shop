import { Title } from "@/components/ui/Title";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { Phone } from "lucide-react";
import Link from "next/link";

import style from "./TotalOrder.module.scss";

const list = Array.from({ length: 2 });

export const TotalOrder = () => {
  return (
    <>
      <div className={style.wrapper__total}>
        <Title as="h5">Ваш заказ</Title>
        <div className={style.list__card}>
          {list.map((_, i) => (
            <div className={style.card} key={i}>
              <div className={style.card__image}>
                <img src="https://placehold.co/100x70" alt="image" />
              </div>

              <div className={style.card__info}>
                <span className={style.card__info_name}>Помидоры свежие</span>
                <span className={style.card__info_price}>1 × 189 ₽</span>
              </div>

              <span className={style.card__price}>189 ₽</span>
            </div>
          ))}
        </div>

        <div className={style.result}>
          <div className={style.result__price}>
            <span>Итого</span>
            <span>389.00 ₽</span>
          </div>
          <Button big active className={style.result__btn}>
            Подтвердить заказ
          </Button>
        </div>
        <div className={style.result__info}>
          Нажимая кнопку, вы соглашаетесь с условиями обработки персональных
          данных
        </div>
      </div>
      <div className={style.connect}>
        <div className={style.connect__title}>
          <Phone />
          <span className={style.connect__title_title}>Есть вопросы?</span>
        </div>

        <div className={style.connect__title}>
          <Link className={style.connect__title_link} href={"ссылка на телегу"}>
            Telegram: @danya_ryaba
          </Link>
        </div>
        <div className={style.connect__title}>
          <Link className={style.connect__title_link} href={"ссылка на почту"}>
            Почта: evample@mail.ru
          </Link>
        </div>
      </div>
    </>
  );
};
