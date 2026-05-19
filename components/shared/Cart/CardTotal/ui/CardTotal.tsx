import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";

import style from "./CardTotal.module.scss";

export const CardTotal = () => {
  return (
    <div className={style.wrapper}>
      <Title as="h3" className={style.wrapper__title}>
        Итого
      </Title>
      <div className={style.product__info}>
        {/*  */}
        <div className={style.product__info_block}>
          <span>Товары (1)</span>
          <span>378 ₽</span>
        </div>

        <div className={style.product__info_block}>
          <span>Доставка</span>
          <span className={style.price}>Бесплатно</span>
        </div>
        {/*  */}
      </div>
      <div className={style.total}>
        <span>Всего</span>
        <span>378 ₽</span>
      </div>
      <Button active big>
        Оформить заказ
      </Button>
      <span className={style.offer}>
        Нажимая "Оформить заказ", вы соглашаетесь с условиями покупки
      </span>
    </div>
  );
};
