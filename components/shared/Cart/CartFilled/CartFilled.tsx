import { CardBasket } from "../CardBasket/CardBasket";

import style from "./CartFilled.module.scss";

interface CartFilledI {
  className?: string;
}

export const CartFilled: React.FC<CartFilledI> = ({ className }) => {
  return (
    <div className={`${style.wrapper__cart} ${className}`}>
      <CardBasket />
    </div>
  );
};
