"use client";

import { Title } from "@/components/ui/Title";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

import style from "./CartProduct.module.scss";
import { Product } from "@/libs/types/apiTypes";

interface CartProductI extends Omit<Product, "createdAt" | "updatedAt"> {
  className?: string;
}
// поправить верстку карточек(подстраивается по высоте описание)
export const CartProduct: React.FC<CartProductI> = ({
  className,
  id,
  name,
  price,
  imageUrl,
  description,
  categoryId,
  size,
}) => {
  const onClickButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("add to cart", id);
  };

  return (
    <article className={`${style.cart} ${className}`}>
      <div className={style.image}>
        <img
          // src={imageUrl || "https://placehold.co/340x400"}
          src={"https://placehold.co/340x400"}
          alt={name || "Product"}
        />
        <span className={style.name_product}>{name}</span>
      </div>
      <div className={style.info}>
        <span className={style.info__category}>Категория: {categoryId}</span>
        <Title className={style.info__name} as="h6">
          {name}
        </Title>
        <span className={style.info__desc}>{description}</span>
        <div className={style.info__price}>
          <div className={style.info__price_block}>
            <Title as="h3">{price} ₽</Title>
            {size && <span className={style.info__price_many}>/ {size} г</span>}
          </div>
          <Button
            onClick={onClickButton}
            icon={<ShoppingCart />}
            theme={ButtonTheme.secondary}
            iconOnly
          />
        </div>
      </div>
    </article>
  );
};
