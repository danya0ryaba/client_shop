import { Check } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/routers/routers";

import style from "./success.module.scss";

export default function SuccessPage() {
  return (
    <div className={style.wrapper__page}>
      <div className={style.icon}>
        <Check className={style.icon__svg} />
      </div>
      <Title as="h2">Заказ оформлен!</Title>
      <span className={style.desc}>Номер вашего заказа</span>
      <div className={style.number}>#583887</div>

      <div className={style.wrapper__info}>
        <ul className={style.list}>
          <li>
            Способ доставки: <span>Самовывоз</span>
          </li>
          <li>
            Время: <span>10:00 – 12:00</span>
          </li>
          <li>
            Оплата: <span>Наличными при получении</span>
          </li>
          <li>
            Сумма: <span>398.00 ₽</span>
          </li>
        </ul>
      </div>

      <p>
        Мы свяжемся с вами по номеру <b>97713323456767</b> для подтверждения
        заказа.
      </p>

      <Button link={ROUTES.HOME} active big className={style.btn}>
        Вернуться в каталог
      </Button>
    </div>
  );
}
