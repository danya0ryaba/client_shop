import { Check, Leaf, ShoppingCart } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { Button, ButtonTheme } from "@/components/ui/Button";

import style from "./CurrentProduct.module.scss";

export const CurrentProduct = () => {
  return (
    <div className={style.wrapper__product}>
      {/*  */}
      <div className={style.slider}>
        <div className={style.slider__slider}></div>
        <div className={style.slider__icons}>
          <div className={style.icon}>
            <div className={style.icon__svg}>
              <Leaf className={style.svg} />
            </div>
            <span className={style.icon__text}>Органика</span>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={style.info}>
        <span className={style.info__category}>Овощи</span>
        <Title as="h2">Помидоры свежие</Title>
        <span className={style.info__text}>
          Спелые сочные помидоры из собственного сада
        </span>
        <div className={style.info__price}>
          <div>
            <span className={style.info__price_value}>189 ₽</span>
            <span className={style.info__price_scope}>/ кг</span>
          </div>
          <div className={style.stock}>
            <Check /> <span>В наличии</span>
          </div>
        </div>

        <Button
          className={style.info__btn}
          theme={ButtonTheme.secondary}
          big
          icon={<ShoppingCart />}
        >
          Добавить в корзину
        </Button>

        <div className={style.about__product}>
          <span>О продукте</span>
          <ul>
            <li>
              <span>
                Выращено на собственном участке без использования химических
                удобрений
              </span>
            </li>
            <li>
              <span>Собрано в день отправки для максимальной свежести</span>
            </li>
            <li>
              <span>Экологически чистый продукт с сертификацией</span>
            </li>
            <li>
              <span>Идеально для здорового питания всей семьи</span>
            </li>
          </ul>
        </div>

        <div className={`${style.about__product} ${style.about__product_last}`}>
          <span>Условия доставки</span>
          <ul>
            <li>
              <span>Бесплатная доставка при заказе от 1500 ₽</span>
            </li>
            <li>
              <span>Доставка в течение 1-2 дней</span>
            </li>
            <li>
              <span>Возврат товара в течение 24 часов при несоответствии</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
