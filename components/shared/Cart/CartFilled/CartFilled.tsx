import { CardBasket } from "../CardBasket/CardBasket";

import style from "./CartFilled.module.scss";

export const CartFilled = () => {
  return (
    <div className={style.wrapper__cart}>
      <div>
        <CardBasket />
      </div>
    </div>
  );
};
