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

export interface CartProductI extends Omit<
  ProductWithCategory,
  "createdAt" | "updatedAt"
> {
  className?: string;
}

export const CartProduct: React.FC<CartProductI> = ({
  className,
  id,
  name,
  price,
  images,
  description,
  size,
  quantityProduct,
  category,
}) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL_IMAGES;

  const mainImageUrl =
    images?.length > 0 ? `${API_URL}${images[0].url}` : "/placeholder.png";

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
        {/* не деплоить так (убрать unoptimized, и настроить оптимизацию) */}
        <Image
          src={mainImageUrl}
          alt={name || "Product"}
          fill
          className={style.image__img}
          unoptimized
          sizes="(max-width: 480px) 160px, (max-width: 768px) 220px, 320px"
        />

        <span className={style.name_product}>{name}</span>
      </div>
      <div className={style.info}>
        <span className={style.info__category}>{category?.name}</span>
        <Title className={style.info__name} as="h6">
          {name}
        </Title>
        <span className={style.info__desc}>{description}...</span>
        <div className={style.info__price}>
          <div className={style.info__price_block}>
            <Title as="h3">{price} ₽</Title>
            {size && <span className={style.info__price_many}>/ {size} г</span>}
          </div>
          <Button
            disabled={quantityProduct === 0}
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
