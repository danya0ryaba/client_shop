"use client";

import { Pencil, Trash2 } from "lucide-react";
import { CartProductI } from "../../CartProduct/CartProduct";
import { useRouter } from "next/navigation";

import style from "./AdminTabletCeil.module.scss";
import { ROUTES } from "@/routers/routers";

export const AdminTabletCeil: React.FC<CartProductI> = ({
  id,
  name,
  price,
  imageUrl,
  description,
  size,
  category,
}) => {
  const router = useRouter();

  const removeProduct = () => {
    // TODO
  };

  const updateProduct = () => {
    router.push(ROUTES.ADMIN_PRODUCT_UPDATE(id));
  };

  return (
    <div className={style.row} role="row" data-id={id}>
      <div className={style.cellImg}>
        <img
          src={imageUrl || "https://placehold.co/140x100"}
          alt={name || "product"}
          loading="lazy"
        />
      </div>

      <div className={style.cellName}>
        <div className={style.name} title={name}>
          {name}
        </div>
        <div className={style.desc} title={description || ""}>
          {description}
        </div>
      </div>

      <div className={style.cell}>
        <span className={style.badge} title={category?.name}>
          {category?.name || "—"}
        </span>
      </div>

      <div className={style.cell}>
        <span className={style.badge}>{price} ₽</span>
      </div>

      <div className={style.cell}>
        <span className={style.badge}>{size || "кг"}</span>
      </div>

      <div className={style.cell}>
        <span className={style.badge}>Да</span>
      </div>

      <div className={style.cellActions}>
        <button
          onClick={updateProduct}
          className={style.iconBtn}
          type="button"
          aria-label="Редактировать"
        >
          <Pencil className={style.pencil} />
        </button>
        <button
          className={style.iconBtn}
          type="button"
          onClick={removeProduct}
          aria-label="Удалить"
        >
          <Trash2 className={style.trash} />
        </button>
      </div>
    </div>
  );
};
