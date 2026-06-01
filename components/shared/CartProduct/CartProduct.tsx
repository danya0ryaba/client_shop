"use client";

import { Title } from "@/components/ui/Title";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { ProductWithCategory } from "@/libs/types/apiTypes";
import { useAddToCartMutation } from "@/libs/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routers/routers";

import style from "./CartProduct.module.scss";

interface CartProductI extends Omit<
  ProductWithCategory,
  "createdAt" | "updatedAt"
> {
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
  size,
  category,
  ...otherProps
}) => {
  const router = useRouter();
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const onClickButton = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart({ productId: id, quantity: 1 }).unwrap();
      toast.success("Добавлено в корзину");
    } catch (err) {
      const errorMessage = (err as { data?: { message: string } }).data
        ?.message;
      toast.error(`${errorMessage}`, {
        onClose: () => router.push(ROUTES.AUTH),
      });
    }
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
        <span className={style.info__category}>{category?.name}</span>
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
