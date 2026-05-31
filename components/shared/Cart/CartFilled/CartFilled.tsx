import { CartItemDTO } from "@/libs/types/apiTypes";
import { CardBasket } from "../CardBasket/CardBasket";

import style from "./CartFilled.module.scss";

interface CartFilledI {
  item: CartItemDTO;
  className?: string;
}

export const CartFilled: React.FC<CartFilledI> = ({ item, className }) => {
  return (
    <div className={`${style.wrapper__cart} ${className}`}>
      <CardBasket item={item} />
    </div>
  );
};
