import { Title } from "@/components/ui/Title";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { ShoppingBag } from "lucide-react";
import { ROUTES } from "@/routers/routers";

import style from "./EmptyCart.module.scss";

export const EmptyCart = () => {
  return (
    <div className={style.wrapper__cart}>
      <div className={style.icon}>
        <ShoppingBag className={style.icon_svg} />
      </div>
      <Title as="h3">Ваша корзина пуста</Title>
      <span className={style.desc}>
        Добавьте товары из каталога, чтобы начать покупки
      </span>
      <Button
        className={style.btn}
        theme={ButtonTheme.secondary}
        active
        big
        link={ROUTES.HOME}
      >
        Прейти в каталог
      </Button>
    </div>
  );
};
