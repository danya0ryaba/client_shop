import { Title } from "@/components/ui/Title";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { Phone } from "lucide-react";
import Link from "next/link";
import { CartItemDTO } from "@/libs/types/apiTypes";
import Image from "next/image";

import style from "./TotalOrder.module.scss";

interface TotalOrderI {
  items: CartItemDTO[];
  totalSum: number;
}

// При обновлении страницы заказа вылетаю, и становылюсь не авторизованным(хотя токен в куки есть)
export const TotalOrder: React.FC<TotalOrderI> = ({ items, totalSum }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL_IMAGES;

  if (items.length === 0) {
    return (
      <div className={style.wrapper__total}>
        <Title as="h5">Ваш заказ</Title>
        <p style={{ padding: "20px 0", color: "#888" }}>
          Вы не выбрали товары для оформления. Вернитесь в корзину.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={style.wrapper__total}>
        <Title as="h5">Ваш заказ</Title>
        <div className={style.list__card}>
          {items.map((item) => (
            <div className={style.card} key={item.id}>
              <div className={style.card__image}>
                {/* поправить стили */}
                <Image
                  src={API_URL + item.product.images[0].url}
                  alt={item.product.name}
                  width={100}
                  height={70}
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>

              <div className={style.card__info}>
                <span className={style.card__info_name}>
                  {item.product.name}
                </span>
                <span className={style.card__info_price}>
                  {item.quantity} × {item.product.price} ₽
                </span>
              </div>

              <span className={style.card__price}>
                {item.product.price * item.quantity} ₽
              </span>
            </div>
          ))}
        </div>

        <div className={style.result}>
          <div className={style.result__price}>
            <span>Итого</span>
            <span>{totalSum.toFixed(2)} ₽</span>
          </div>
          <Button big active className={style.result__btn} type="submit">
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
