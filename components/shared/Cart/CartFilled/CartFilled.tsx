import { CartItemDTO } from "@/libs/types/apiTypes";
import { CardBasket } from "../CardBasket/CardBasket";

import style from "./CartFilled.module.scss";
import { Checkbox } from "@/components/ui/Checkbox";

interface CartFilledI {
  item: CartItemDTO;
  className?: string;
}

export const CartFilled: React.FC<CartFilledI> = ({ item, className }) => {
  return (
    <div className={`${style.wrapper__cart} ${className}`}>
      <Checkbox label="" className={style.checkbox} />
      <CardBasket item={item} />
    </div>
  );
};
