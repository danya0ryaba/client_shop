import { Pencil, Trash2 } from "lucide-react";
import { CartProductI } from "../../CartProduct/CartProduct";

import style from "./AdminTabletCeil.module.scss";

// {
//             "id": 24,
//             "name": "Клубника 2",
//             "imageUrl": "https://example2.com/strawberry.jpg",
//             "description": "Сладкая домашняя клубника.",
//             "price": 100,
//             "size": null,
//             "quantityProduct": 1,
//             "categoryId": 18,
//             "createdAt": "2026-05-25T11:56:22.947Z",
//             "updatedAt": "2026-05-25T11:56:22.947Z",
//             "category": {
//                 "id": 18,
//                 "name": "Ягоды",
//                 "createdAt": "2026-05-25T11:56:22.862Z",
//                 "updatedAt": "2026-05-25T11:56:22.862Z"
//             }
//         },

export const AdminTabletCeil: React.FC<CartProductI> = ({
  id,
  name,
  price,
  imageUrl,
  description,
  size,
  category,
  ...otherProps
}) => {
  const removeProduct = () => {};
  const updateProduct = () => {};

  return (
    <div className={style.wrapper__ceil}>
      <div className={style.img_and_name}>
        <div className={style.img_and_name__img}>
          <img src="https://placehold.co/140x100" alt="placehold" />
        </div>
        <div className={style.img_and_name__text}>
          <div className={style.name}>{name}</div>
          <div className={style.desc}>{description}</div>
        </div>
      </div>

      <ul className={style.other}>
        <li className={style.other__item}>{category?.name}</li>
        <li className={style.other__item}>{price} ₽</li>
        <li className={style.other__item}>кг</li>
        <li className={style.other__item}>Да</li>
        <li className={`${style.other__item} ${style.other__item_icons}`}>
          <span>
            <Pencil className={style.pencil} onClick={updateProduct} />
          </span>
          <span>
            <Trash2 className={style.trash} onClick={removeProduct} />
          </span>
        </li>
      </ul>
    </div>
  );
};
