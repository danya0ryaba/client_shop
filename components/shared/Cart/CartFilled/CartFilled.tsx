import { CartItemDTO } from "@/libs/types/apiTypes";
import { CardBasket } from "../CardBasket/CardBasket";
import { Checkbox } from "@/components/ui/Checkbox";
import { useSelectProductMutation } from "@/libs/api";

import style from "./CartFilled.module.scss";

interface CartFilledI {
  item: CartItemDTO;
  className?: string;
}

export const CartFilled: React.FC<CartFilledI> = ({ item, className }) => {
  const [selectProduct] = useSelectProductMutation();

  const handleToggleSelect = async () => {
    try {
      await selectProduct({ id: item.id }).unwrap();
    } catch (e) {
      console.error("Ошибка выбора товара", e);
    }
  };
  return (
    <div className={`${style.wrapper__cart} ${className}`}>
      <Checkbox
        label=""
        className={style.checkbox}
        value={item.selected}
        onChange={handleToggleSelect}
      />
      <CardBasket item={item} />
    </div>
  );
};
