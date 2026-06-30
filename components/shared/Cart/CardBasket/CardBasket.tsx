"use client";

import { Title } from "@/components/ui/Title";
import { Trash2 } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { CartItemDTO } from "@/libs/types/apiTypes";
import {
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
} from "@/libs/api";
import { toast } from "react-toastify";
import { useState } from "react";

import style from "./CardBasket.module.scss";

interface CardBasketI {
  item: CartItemDTO;
}

export const CardBasket: React.FC<CardBasketI> = ({ item }) => {
  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();

  const [updateQty, { isLoading: isUpdatingQty }] =
    useUpdateCartItemQuantityMutation();

  const removeProduct = async () => {
    try {
      await removeFromCart({ id: item.id }).unwrap();
      toast.success("Товар удален", { position: "top-right", autoClose: 3000 });
    } catch (e) {
      console.error(e);
      toast.error("Не удалось удалить товар");
    }
  };

  const changeQuantity = async (nextQty: number) => {
    const newQuantity = Math.max(1, Math.trunc(nextQty));
    const delta = newQuantity - item.quantity;
    if (delta === 0) return;
    try {
      await updateQty({ id: item.id, delta }).unwrap();
    } catch (e) {
      console.error(e);
      alert("Не удалось изменить количество");
    }
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL_IMAGES;

  const mainImageUrl =
    item.product.images?.length > 0
      ? `${API_URL}${item.product.images[0].url}`
      : "/placeholder.png";

  const disabled = isRemoving || isUpdatingQty;

  return (
    <div className={style.wrapper} aria-busy={disabled}>
      <div className={style.image}>
        <img src={mainImageUrl} alt={item.product.name} />
      </div>
      <div className={style.info}>
        <div className={style.info__block}>
          <div className={style.info__block_el}>
            <Title as="h5">{item.product.name}</Title>
            <span className={style.price}>{item.product.price} ₽ / кг</span>
          </div>
          <div className={style.info__block_el}>
            <div className={style.icon}>
              <Trash2 className={style.icon__svg} onClick={removeProduct} />
            </div>
          </div>
        </div>
        <div className={style.info__block}>
          <div className={style.info__block_counter}>
            <Counter
              value={item.quantity}
              onChange={changeQuantity}
              disabled={disabled}
            />
          </div>
          <div className={style.info__block_price}>
            {item.product.price * item.quantity} ₽
          </div>
        </div>
      </div>
    </div>
  );
};
