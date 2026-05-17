"use client";

import { Title } from "@/components/ui/Title";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

import style from "./CartProduct.module.scss";

interface CartProductI {
  className?: string;
  productId: number;
}

export const CartProduct: React.FC<CartProductI> = ({
  className,
  productId,
}) => {
  const onClickButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("add to cart", productId);
  };

  return (
    <article className={`${style.cart} ${className}`}>
      <div className={style.image}>
        <img src="https://placehold.co/340x400" alt="Product" />
        <span className={style.name_product}>Клубника садовая</span>
      </div>

      <div className={style.info}>
        <span className={style.info__category}>Ягоды</span>

        <Title className={style.info__name} as="h6">
          Клубника садовая
        </Title>

        <span className={style.info__desc}>
          Ароматная спелая клубника с грядки
        </span>

        <div className={style.info__price}>
          <div className={style.info__price_block}>
            <Title as="h3">599 ₽</Title>
            <span className={style.info__price_many}>/кг</span>
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
